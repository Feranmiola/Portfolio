# feranmiola.com

Portfolio of Feranmi Ola: frontend, blockchain and Roblox developer.

Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion and Lenis.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run typecheck` runs the TypeScript compiler; `npm run build` produces the production bundle.

## Editing content

All copy and data (projects, services, stack, socials, hero lines) live in
[`src/lib/content.ts`](src/lib/content.ts). Layout code never hardcodes text,
so that file is the only place to update when the portfolio changes.

Project screenshots and the portrait are hosted on Cloudinary; the allowed host
is set in [`next.config.mjs`](next.config.mjs).

## Contact form

"Start a project" opens a form handled by a server action
([`src/app/actions/contact.ts`](src/app/actions/contact.ts)). It validates the
submission, drops honeypot hits and throttles by IP, then delivers it.

Quickest setup (free, no account): [Web3Forms](https://web3forms.com) emails
every submission to your inbox, with the sender as reply-to.

1. Enter your email on web3forms.com and copy the access key they send you.
2. `cp .env.example .env.local` and set `WEB3FORMS_ACCESS_KEY`.
3. Add the same variable to your host (Vercel → Settings → Environment Variables).

Alternatively set `CONTACT_WEBHOOK_URL` to POST the raw JSON to a Make/n8n
webhook, a Discord webhook, or your own API. If nothing is configured or
delivery fails, visitors get a prefilled `mailto:` draft so nothing typed is lost.

## Security

The form has no file input and the site has no database, so what matters is
what reaches the inbox. Everything is enforced on the server, in
[`src/lib/inquiry-guard.ts`](src/lib/inquiry-guard.ts):

- **Shape**: a request may carry the four text fields (plus the honeypot) and
  nothing else. Files, extra fields and duplicates are refused.
- **Size**: server action bodies are capped at 32 KB.
- **Cleaning**: control characters, zero-width characters and bidi overrides
  are stripped; single-line fields lose their line breaks.
- **Attack signatures**: markup and script URLs, mail headers, MIME parts,
  data URIs and encoded blobs, SQL, shell and template-injection payloads are
  rejected with a plain-text-only message. Ordinary prose ("select products
  from a catalogue", "budget < 5000") passes.
- **Throttling**: eight attempts per IP per ten minutes; a hostile attempt
  counts as four.

Responses also carry a Content-Security-Policy and the usual hardening headers
(see [`next.config.mjs`](next.config.mjs)). If you add an external script,
font, image host or analytics later, it has to be allowed there first.

## Structure

```
src/app            layout, page, 404, sitemap, robots, server actions
src/components
  hero/            dot field, name frame, typewriter, interactive terminal
  sections/        Hero, Work (+WorkStack), Services, Contact
  contact/         form provider, dialog, "Start a project" button
  layout/          Header, Footer
  ui/              buttons, icons, cursor, reveal animations, misc
  providers/       Lenis smooth scroll + reduced-motion config
src/lib            content.ts (all copy), inquiry-guard.ts (form hygiene), cn.ts
```
