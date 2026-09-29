"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "./Icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); fall back to mail.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-[4px] border border-ink-700 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-300 transition-colors hover:border-lime hover:text-lime"
    >
      {copied ? <Check size={14} className="text-lime" /> : <Copy size={14} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
