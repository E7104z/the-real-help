# HANDOFF

Status of the marketing-site SEO / pre-rendering work on `feature/part-c`.

## Part D — conversion fixes

- **D1 (tracking):** `src/lib/track.ts` + `api/event.js` record every
  `cta_click`, `form_view`, and `form_submit` (Call/Book/Email clicks, form
  views, form submits) with `page`, `location`, `form`, `result`, UTM params,
  partner `ref`, referrer host and a random session id. No IP or user agent.
- **D2 (capture):** homepage hero lead form above the fold; footer form
  simplified to name, contact, chore, business.
- **D3 (offer pages):** `/offer/<slug>` campaign pages, first `quick-fix`,
  driven by `src/content/offers.ts` (single source of truth). Isolated layout
  (brand-only header, one `tel:` CTA, bottom lead form, legal footer — no
  nav / Book / Email / MobileBar), `noindex, follow`, self-canonical, excluded
  from `sitemap.xml`; unknown slugs 404.
- **D4 (cleanup):** `api/lead.js` forwards to AgentLab with `waitUntil`
  (`@vercel/functions`) so it never blocks the response; removed the dead
  Firestore callable `submitContactForm` (nothing in `src/` calls it; the
  `leads` / `pendingClients` collections are left untouched).

### Where events land
`cta_click`, `form_view`, and `form_submit` land in the **`Events`** tab of the
leads Google Sheet (second tab, after the leads tab), attributed by `page`,
`location`, and `utm_source`. Lead submissions still write to the first (leads)
tab with a `source` value (e.g. `offer-quick-fix`).

### How to add an offer page
Edit `src/content/offers.ts` — add an object to `OFFERS` with `slug`,
`metaTitle`, `metaDescription`, `headline`, `lede`, `bullets`, `priceLine`.
Routing, pre-render, `noindex`, canonical, and sitemap exclusion are automatic.


## Done this phase

### C1 — real pre-rendering with hydration
- `src/entry-server.tsx` now exports `renderBody(url)` which renders the three
  marketing pages (`/`, `/privacy`, `/terms`) with `renderToString` (not
  `renderToStaticMarkup`), so the client can **hydrate** instead of re-drawing.
- `src/main.tsx` hydrates pre-rendered marketing routes with `hydrateRoot` and
  keeps `createRoot` for `/app`, `/admin`, `/portal` (and every other SPA route).
- `scripts/prerender.mjs` injects the rendered body into `<div id="root">` for
  each public route and regenerates `sitemap.xml` (public routes only).
- `vercel.json`: removed the `/(.*)` catch-all so unknown paths now 404. Only
  `/app/*`, `/admin/*`, `/portal/*` — plus the existing `/login`,
  `/unauthorized`, `/property-transfer` shells — fall back to `index.html`.
- `public/404.html`: new static, `noindex`ed "Page not found" page.

### C3 — /work page + gated case studies
- Added `/work` as a full public route: `src/pages/WorkPage.tsx` (new), wired
  into `src/app/router/index.tsx`, `src/main.tsx` (lazy loader), and
  `src/entry-server.tsx` (`META` + `MARKETING_BODIES`), so it is pre-rendered
  with its own title, meta description, canonical, keywords, breadcrumb
  JSON-LD and FAQ JSON-LD.
- New `src/content/case-studies.ts` is the single source of truth for case
  studies (`CASE_STUDIES`), intentionally empty until claims are approved in
  `docs/approved-claims.md`.
- Removed the hardcoded client claims from the homepage "Receipts" section:
  `Work` type, `WORK` and `ALSO_SHIPPED` are gone from
  `src/pages/home/content.ts`. The homepage and `/work` now render an honest
  empty state ("We only publish work we have permission to share") when
  `CASE_STUDIES` is empty — no unapproved client names anywhere.
- Homepage nav "Receipts" now links to `/work`.
- Added `.rh-work-empty` styles to `src/pages/home/home.css`.
- **Verified:** `npm run typecheck` and `npm run build` pass; prerender now
  emits 8 pages (`/`, `/privacy`, `/terms`, `/work`, `/services`, `/pricing`,
  `/about`, `/st-louis`) plus `sitemap.xml`. The
  `/work` HTML contains the canonical + breadcrumb/FAQ JSON-LD and the
  empty-state copy; the prerendered homepage no longer contains any of the
  removed client names (A-Z Discount Flooring, Tracy Smith, Scheduler Pro,
  KIDZ, "Also shipped").

### C3a — /services, /pricing, /about, /st-louis pages
- Added four public marketing pages — `/services`, `/pricing`, `/about`,
  `/st-louis` — each with a full `<h1>` and pre-rendered copy, wired into
  `src/app/router/index.tsx`, `src/main.tsx` (lazy loader), and
  `src/entry-server.tsx` (`META` + `MARKETING_BODIES`) with title, meta
  description, canonical, keywords and breadcrumb JSON-LD (`/pricing` also
  gets FAQ JSON-LD).
- New `src/pages/marketing/SiteChrome.tsx` centralizes header, footer,
  mobile bar, call/book/email buttons, CTA row and price-card button so the
  four pages stay consistent with `/` and `/work`.
- Copy uses only approved facts (Quick Fix $500 + $30/mo, Custom Build fixed
  quote, St. Louis MO, Jason Griffin, booking/phone/email). No invented
  claims; case studies remain gated on `docs/approved-claims.md`.

### Verification
- `npm run typecheck` — pass.
- `npm run build` — pass (client build → SSR build → prerender).
- Pre-rendered HTML confirmed to contain the full visible copy inside `#root`
  for the 8 public routes (title, meta description, JSON-LD, section headings,
  CTA "Book a free call", phone `314-660-2890`, email `info@thecdscloud.com`
  all present). `sitemap.xml` lists only the 8 public routes. `/app`, `/admin`,
  `/portal`, `/login`, `/unauthorized`, `/property-transfer` are **not**
  pre-rendered (SPA). `dist/404.html` present.
- `npm test` — no-op stub ("No test runner configured yet"), exit 0.
- ✅ `npm run lint` — 0 errors (4 pre-existing `react-refresh` warnings in
  `AuthProvider` and `router` remain). The 66 errors were resolved in a
  separate lint-cleanup commit across 18 files.

## Next phases

Order: open C2 items → C5 (Lighthouse reports in `docs/seo-reports/`).

- **C2 open items** — decide remove/move/noindex for `/property-transfer`
  (currently client-rendered and `noindex`ed via robots.txt); image dimensions;
  Lighthouse.
- **C5** — Lighthouse screenshots into `docs/seo-reports/`.
- **Case studies** — gated on `docs/approved-claims.md`. Once Jason approves
  claims in writing, add them to `src/content/case-studies.ts`; the homepage
  "Receipts" section and `/work` render them automatically.

## E-1 Gmail OAuth & env setup (prep — not started)

Current email path (verified in code): the lead form posts to `api/lead.js`
(`POST /api/lead`), which appends the lead to the Google Sheet through the Apps
Script web app (`LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET`, see
`apps-script/Code.gs`) and forwards a copy to AgentLab. Outbound email
(notification, auto-reply, follow-ups, bulk campaigns) is sent from
`scripts/google-apps-script.js` via `GmailApp.sendEmail` from Jason's Google
account.

E-1 will move sending to `googleapis` / `@googleapis/gmail` (pre-approved) using
an OAuth refresh token. Env vars E-1 needs (per `.clinerules` Part A):

- `GMAIL_REFRESH_TOKEN_MAIN` — Gmail OAuth refresh token (pending — Jason)
- `ANTHROPIC_API_KEY` — for AI drafting (pending — Jason)
- `MODEL` (default `claude-haiku-5-5`), `MODEL_WRITER` (default `claude-sonnet-5-5`)

### OAuth refresh-token generation (standard steps)
1. Google Cloud Console → enable the **Gmail API** for the project that will send.
2. **OAuth consent screen** → External → add the Gmail send scope
   (`https://www.googleapis.com/auth/gmail.send` — confirm exact scope with Jason).
3. **Credentials → Create OAuth 2.0 Client ID** → application type **Desktop app**.
   Record the Client ID and Client Secret.
4. Generate a refresh token using Google's OAuth 2.0 Playground (or a one-off
   script) with the same scope. Save the refresh token.
5. Store the refresh token as `GMAIL_REFRESH_TOKEN_MAIN` in Vercel env vars /
   Secret Manager (never in git). Add key names to `.env.example` only — no values.

### Env var key names to add to `.env.example` when E-1 starts
- `GMAIL_REFRESH_TOKEN_MAIN`
- `GMAIL_CLIENT_ID`
- `GMAIL_CLIENT_SECRET`
- `ANTHROPIC_API_KEY`
- `MODEL`, `MODEL_WRITER` (if not already present)

## Resolved this phase
- Lint: 66 pre-existing errors fixed in a separate cleanup commit (`npm run
  lint` now 0 errors, 4 warnings).
- Footer year: frozen to `COPYRIGHT_YEAR` in `src/lib/constants/site.ts`
  (used by HomePage, WorkPage, PortalLayout, SiteChrome).
- `.clinerules` and `docs/` committed.

## Decisions needed from Jason
1. `/property-transfer` — still client-rendered and `noindex`ed. Confirm the
   C2 remove/move/noindex decision.
2. E-1: confirm the exact Gmail OAuth scope and Google Cloud project, and
   provide `GMAIL_REFRESH_TOKEN_MAIN` / `ANTHROPIC_API_KEY`.
3. Receipts/case studies — gated on `docs/approved-claims.md` (empty). Do not
   open a PR to `master` until preview checks pass and this is settled.
