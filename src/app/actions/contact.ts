"use server";

import { headers } from "next/headers";
import { inquiry, site } from "@/lib/content";
import {
  inspectShape,
  vetInquiry,
  type Inquiry,
  type InquiryField,
} from "@/lib/inquiry-guard";

export type InquiryState = {
  status: "idle" | "sent" | "invalid" | "failed";
  errors?: Partial<Record<InquiryField, string>>;
  /** Prefilled mail link, so nothing is lost when delivery fails. */
  mailto?: string;
};

/*
 * Best-effort throttle per IP. Lives in memory, so it resets with the
 * instance. Every attempt counts once; one that looked hostile counts for
 * more, so probing locks itself out quickly.
 */
const WINDOW = 10 * 60_000;
const MAX_ATTEMPTS = 8;
const HOSTILE_COST = 4;
const attempts = new Map<string, number[]>();

function record(ip: string, cost = 1) {
  const now = Date.now();
  const hits = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW);
  for (let i = 0; i < cost; i++) hits.push(now);
  if (attempts.size > 5000) attempts.clear();
  attempts.set(ip, hits);
  return hits.length > MAX_ATTEMPTS;
}

/**
 * Handles the "Start a project" form: checks the shape of the request, cleans
 * and validates the text (see lib/inquiry-guard), then delivers it. Web3Forms
 * emails it to the inbox its access key belongs to, or a generic webhook gets
 * the raw JSON. When neither is possible the visitor gets a mailto: draft.
 */
export async function sendInquiry(formData: FormData): Promise<InquiryState> {
  // Honeypot: people never see this field, so anything in it is a bot.
  if (formData.get("website")) return { status: "sent" };

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-real-ip") ||
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const block = (reason: string, errors: InquiryState["errors"]): InquiryState => {
    // The reason only: payloads never go into the logs.
    console.warn(`[contact] blocked (${reason}) from ${ip}`);
    record(ip, HOSTILE_COST);
    return { status: "invalid", errors };
  };

  const shape = inspectShape(formData.entries());
  if (shape) return block(shape.reason, { message: shape.message });

  const field = (name: InquiryField) => String(formData.get(name) ?? "");
  const verdict = vetInquiry(
    { name: field("name"), email: field("email"), type: field("type"), message: field("message") },
    inquiry.types
  );
  if (!verdict.ok) {
    if (verdict.blocked) return block(verdict.blocked, verdict.errors);
    record(ip);
    return { status: "invalid", errors: verdict.errors };
  }

  const data = verdict.data;
  const subject = `Project inquiry: ${data.type}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hi Feranmi,\n\n${data.message}\n\n— ${data.name}\n${data.email}`
  )}`;

  if (record(ip)) return { status: "failed", mailto };

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
        // Stops "@everyone" in a message from pinging a Discord channel.
        allowed_mentions: { parse: [] },
        source: site.url,
        receivedAt: new Date().toISOString(),
      },
    };
  }

  return null;
}
