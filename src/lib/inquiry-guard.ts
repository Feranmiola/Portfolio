/**
 * Input hygiene for the "Start a project" form.
 *
 * Nothing submitted here touches a database or is rendered as HTML by this
 * site: it is forwarded as JSON and ends up in an inbox. So the guard cares
 * about what could do harm there (smuggled attachments, mail-header
 * injection, markup that would render as phishing content) and also turns
 * away the usual probing payloads (SQL, shell, template injection). Those
 * have no business in a project description, so they are rejected rather
 * than delivered.
 *
 * Pure functions with no imports, so they can be tested in isolation.
 */

export type InquiryField = "name" | "email" | "type" | "message";
export type Inquiry = Record<InquiryField, string>;

export type Verdict =
  | { ok: true; data: Inquiry }
  | {
      ok: false;
      errors: Partial<Record<InquiryField, string>>;
      /** Set when the submission looked hostile, e.g. "message:sql". */
      blocked?: string;
    };

export const FIELD_LIMITS: Record<InquiryField, number> = {
  name: 80,
  email: 120,
  type: 40,
  message: 2000,
};

const MAX_LINKS = 3;

/** Everything a genuine submission may carry; `website` is the honeypot. */
const ALLOWED_KEYS = new Set(["name", "email", "type", "message", "website"]);

const MESSAGES = {
  attachment: "Attachments aren't accepted here. Describe the project in plain text.",
  shape: "That submission couldn't be read. Reload the page and try again.",
  code: "That reads like code or markup rather than a project description. Plain text only, please.",
  links: "That's a lot of links. Keep it to three at most.",
  name: "Use letters, numbers and simple punctuation only.",
};

/* ------------------------------------------------------------------ */
/*  Shape: exactly the expected text fields, and nothing else          */
/* ------------------------------------------------------------------ */

export function inspectShape(
  entries: Iterable<[string, unknown]>
): { reason: string; message: string } | null {
  const seen = new Set<string>();
  for (const [key, value] of entries) {
    // A File or Blob: someone added an upload to a form that has none.
    if (typeof value !== "string") {
      return { reason: "attachment", message: MESSAGES.attachment };
    }
    if (!ALLOWED_KEYS.has(key)) {
      return { reason: "unexpected-field", message: MESSAGES.shape };
    }
    if (seen.has(key)) {
      return { reason: "duplicate-field", message: MESSAGES.shape };
    }
    seen.add(key);
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Cleaning                                                           */
/* ------------------------------------------------------------------ */

/*
 * Characters that never belong in a message: control characters (tab and
 * line breaks aside), plus the zero-width and bidi-override characters used
 * to disguise text. Written as code points so none of them appear in here.
 */
const isUnwanted = (code: number) =>
  (code < 0x20 && code !== 0x09 && code !== 0x0a) ||
  (code >= 0x7f && code <= 0x9f) ||
  (code >= 0x200b && code <= 0x200f) ||
  (code >= 0x202a && code <= 0x202e) ||
  (code >= 0x2060 && code <= 0x2069) ||
  code === 0xfeff;

/** Unicode's own line and paragraph separators. */
const isLineBreak = (code: number) => code === 0x2028 || code === 0x2029;

export function cleanText(value: string, multiline: boolean) {
  let text = "";
  for (const char of value.normalize("NFC").replace(/\r\n?/g, "\n")) {
    const code = char.codePointAt(0) ?? 0;
    if (isLineBreak(code)) text += "\n";
    else if (!isUnwanted(code)) text += char;
  }

  // Single-line fields lose their line breaks: those are what header
  // injection relies on.
  return (multiline ? text.replace(/\n{4,}/g, "\n\n\n") : text.replace(/[\n\t]+/g, " ")).trim();
}

/** Angle brackets that survive validation are made inert, as a second line of defence. */
const FULLWIDTH_LT = String.fromCodePoint(0xff1c);
const FULLWIDTH_GT = String.fromCodePoint(0xff1e);
const neutralise = (text: string) =>
  text.replace(/</g, FULLWIDTH_LT).replace(/>/g, FULLWIDTH_GT);

/* ------------------------------------------------------------------ */
/*  Attack signatures                                                  */
/* ------------------------------------------------------------------ */

const HANDLERS =
  "abort|blur|change|click|dblclick|error|focus\\w*|input|key(?:down|press|up)|load\\w*|mouse\\w+|pointer\\w+|submit|toggle|unload|animation\\w+|transition\\w+|wheel|drag\\w*|drop|paste|copy|cut|touch\\w+|begin|end|repeat|resize|scroll";

const THREATS: ReadonlyArray<{ reason: string; pattern: RegExp }> = [
  // Anything shaped like a tag, comment, processing instruction or server tag.
  // No whitespace allowed after "<", so "budget < 5000" and "a < b" still pass.
  { reason: "markup", pattern: /<[a-z!/?%]/i },
  { reason: "script-url", pattern: /\b(?:javascript|vbscript|livescript)\s*:/i },
  { reason: "event-handler", pattern: new RegExp(`\\bon(?:${HANDLERS})\\s*=`, "i") },

  // Attachments in disguise.
  { reason: "data-uri", pattern: /\bdata:[a-z]+\/[a-z0-9.+-]+\s*[;,]/i },
  { reason: "encoded-blob", pattern: /[A-Za-z0-9+/]{160,}/ },
  {
    reason: "mime",
    pattern:
      /\b(?:content-(?:type|disposition|transfer-encoding)|mime-version)\s*:|\bfilename\*?\s*=\s*["']?[\w.-]/i,
  },

  // A line that reads like a mail header carrying an address.
  {
    reason: "mail-header",
    pattern: /(?:^|\n)[ \t]*(?:to|cc|bcc|from|reply-to|sender|subject)[ \t]*:[ \t]*\S*@/i,
  },

  {
    reason: "sql",
    // Shapes that only SQL takes. Prose like "select products from a
    // catalogue" or "delete from their cart" is left alone.
    pattern: new RegExp(
      `\\b(?:${[
        "union\\s+(?:all\\s+)?select\\b",
        "select\\s+\\*[\\s\\S]{0,40}?\\bfrom\\s+[\\w.]",
        "select\\s+(?:distinct\\s+)?[\\w.]+\\s*(?:,\\s*[\\w.]+\\s*)*\\s+from\\s+[\\w.]+\\s*(?:where\\b|limit\\b|order\\s+by\\b|group\\s+by\\b|(?:inner\\s+|left\\s+|right\\s+)?join\\b|;|--|union\\b)",
        "select\\s+(?:count|sum|min|max|avg)\\s*\\(",
        "insert\\s+into\\s+[\\w.]+\\s*(?:\\(|values\\b|select\\b)",
        "delete\\s+from\\s+[\\w.]+\\s*(?:where\\b|;)",
        "update\\s+[\\w.]+\\s+set\\s+[\\w.]+\\s*=",
        "drop\\s+(?:table|database|schema|view)\\s+\\w",
        "truncate\\s+table\\b",
        "alter\\s+table\\b",
        "exec(?:ute)?\\s+(?:xp|sp)_\\w+",
        "xp_cmdshell",
        "information_schema",
        "(?:pg_)?sleep\\s*\\(\\s*\\d",
        "benchmark\\s*\\(\\s*\\d",
        "waitfor\\s+delay\\b",
        "load_file\\s*\\(",
        "into\\s+(?:out|dump)file\\b",
      ].join("|")})`,
      "i"
    ),
  },
  {
    // The punctuation of an injection attempt: ' OR 1=1, '; DROP…, admin'--
    reason: "sql-probe",
    pattern:
      /['"`]\s*\)?\s*(?:or|and)\s+['"`(]?\w+['"`)]?\s*(?:=|<>|like\b)\s*['"`(]?\w|['"`]\s*\)?\s*;\s*(?:--|\/\*|(?:drop|delete|insert|update|select|exec|shutdown)\b)|['"`]\s*\)?\s*--\s*(?:\n|$)|\/\*[\s\S]{0,40}?\*\/\s*(?:or|and|union|select)\b/i,
  },

  { reason: "template", pattern: /\$\{\s*(?:jndi|env|sys|java|lower|upper)\s*:/i },
  {
    reason: "shell",
    pattern:
      /(?:\.\.[\\/]){2,}|[\\/]etc[\\/](?:passwd|shadow|hosts)\b|\bcmd(?:\.exe)?\s+\/c\b|\bpowershell(?:\.exe)?\s+-\w|\b(?:wget|curl)\s[^\n|]{0,120}\|\s*(?:sh|bash)\b|;\s*rm\s+-\w*r\w*\s|\$\(\s*(?:curl|wget|cat|rm)\b|`\s*(?:curl|wget|cat|rm)\s/i,
  },
];

/** The reason a piece of text looks hostile, or null when it looks fine. */
export function findThreat(text: string): string | null {
  for (const { reason, pattern } of THREATS) {
    if (pattern.test(text)) return reason;
  }
  const links = text.match(/\bhttps?:\/\/|\bwww\./gi)?.length ?? 0;
  return links > MAX_LINKS ? "too-many-links" : null;
}

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

// Letters and digits from any script, plus the punctuation real names use.
const NAME = /^[\p{L}\p{N}][\p{L}\p{M}\p{N} .,'’&()-]*$/u;
const EMAIL =
  /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export function vetInquiry(raw: Inquiry, allowedTypes: readonly string[]): Verdict {
  const errors: Partial<Record<InquiryField, string>> = {};
  let blocked: string | undefined;

  // Bound the work before any pattern runs over it.
  const capped = (field: InquiryField) => raw[field].slice(0, FIELD_LIMITS[field] * 4);

  // Scanned with line breaks intact, so an injected header line is still visible.
  const hostile = (field: InquiryField) => {
    const reason = findThreat(cleanText(capped(field), true));
    if (reason) {
      blocked ??= `${field}:${reason}`;
      errors[field] = reason === "too-many-links" ? MESSAGES.links : MESSAGES.code;
    }
    return reason !== null;
  };

  const name = cleanText(capped("name"), false);
  const email = cleanText(capped("email"), false);
  const type = cleanText(capped("type"), false);
  const message = cleanText(capped("message"), true);

  if (!hostile("name")) {
    if (!name) errors.name = "Tell me who you are.";
    else if (name.length > FIELD_LIMITS.name) errors.name = "Keep your name under 80 characters.";
    else if (!NAME.test(name)) errors.name = MESSAGES.name;
  }

  if (!hostile("email")) {
    if (email.length > FIELD_LIMITS.email || !EMAIL.test(email)) {
      errors.email = "Enter an email I can reply to.";
    }
  }

  if (!allowedTypes.includes(type)) errors.type = "Pick what you're building.";

  if (!hostile("message")) {
    if (message.length < 20) {
      errors.message = "Give me a little more to go on (20+ characters).";
    } else if (message.length > FIELD_LIMITS.message) {
      errors.message = "Keep it under 2,000 characters.";
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors, blocked };

  return {
    ok: true,
    data: { name: neutralise(name), email, type, message: neutralise(message) },
  };
}
