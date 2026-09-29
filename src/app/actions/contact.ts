"use server";

import { headers } from "next/headers";
import { inquiry, site } from "@/lib/content";

type Field = "name" | "email" | "type" | "message";
type Inquiry = Record<Field, string>;

export type InquiryState = {
  status: "idle" | "sent" | "invalid" | "failed";
  errors?: Partial<Record<Field, string>>;
  /** Prefilled mail link, so nothing is lost when delivery fails. */
  mailto?: string;
};

const LIMITS: Record<Field, number> = {
  name: 80,
  email: 120,
  type: 40,
  message: 2000,
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort throttle per IP. Lives in memory, so it resets with the instance.
const recent = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  if (recent.size > 5000) recent.clear();
  recent.set(ip, hits);
  return hits.length > 5;
}

/**
 * Handles the "Start a project" form. Validates, then delivers the inquiry:
 * Web3Forms emails it to the inbox its access key belongs to, or a generic
 * webhook gets the raw JSON. When neither is possible the visitor gets a
 * mailto: draft instead.
 */
export async function sendInquiry(formData: FormData): Promise<InquiryState> {
  // Honeypot: people never see this field, so anything in it is a bot.
  if (formData.get("website")) return { status: "sent" };

  const read = (field: Field) =>
    String(formData.get(field) ?? "")
      .trim()
      .slice(0, LIMITS[field] + 1);
  const data: Inquiry = {
    name: read("name"),
    email: read("email"),
    type: read("type"),
    message: read("message"),
  };

  const errors: InquiryState["errors"] = {};
  if (!data.name) errors.name = "Tell me who you are.";
  else if (data.name.length > LIMITS.name) errors.name = "Keep your name under 80 characters.";
  if (!EMAIL.test(data.email) || data.email.length > LIMITS.email) {
    errors.email = "Enter an email I can reply to.";
  }
  if (!inquiry.types.includes(data.type)) errors.type = "Pick what you're building.";
  if (data.message.length < 20) {
    errors.message = "Give me a little more to go on (20+ characters).";
  } else if (data.message.length > LIMITS.message) {
    errors.message = "Keep it under 2,000 characters.";
  }
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const subject = `Project inquiry: ${data.type}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hi Feranmi,\n\n${data.message}\n\n— ${data.name}\n${data.email}`
  )}`;

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) return { status: "failed", mailto };

  const delivery = pickDelivery(data, subject);
  if (!delivery) {
    console.warn(
      "[contact] Set WEB3FORMS_ACCESS_KEY (or CONTACT_WEBHOOK_URL); inquiry was not delivered."
    );
    return { status: "failed", mailto };
  }

  try {
    const response = await fetch(delivery.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Web3Forms sits behind Cloudflare, which challenges Node's default
        // "node" agent (and spoofed browser ones); an honest one gets through.
        "User-Agent": `${new URL(site.url).host} contact form (+${site.url})`,
      },
      body: JSON.stringify(delivery.body),
      signal: AbortSignal.timeout(8000),
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`${delivery.name} responded ${response.status}: ${text.slice(0, 300)}`);
    }
    if (delivery.name === "web3forms") {
      const result = JSON.parse(text) as { success?: boolean; message?: string };
      if (!result.success) throw new Error(`web3forms: ${result.message ?? "rejected"}`);
    }
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return { status: "failed", mailto };
  }
}

function pickDelivery(data: Inquiry, subject: string) {
  const host = new URL(site.url).host;

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (key) {
    return {
      name: "web3forms" as const,
      url: "https://api.web3forms.com/submit",
      // Web3Forms uses `email` as the reply-to and lists every other field.
      body: { access_key: key, subject, from_name: `${data.name} via ${host}`, ...data },
    };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    return {
      name: "webhook" as const,
      url: webhook,
      body: {
        ...data,
        // `content` is what Discord-style webhooks render; others ignore it.
        content: `${subject}\nFrom: ${data.name} <${data.email}>\n\n${data.message}`,
        source: site.url,
        receivedAt: new Date().toISOString(),
      },
    };
  }

  return null;
}
