# HANDOFF

Status of the marketing-site SEO / pre-rendering work on `feature/part-c`.

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
  emits 4 pages (`/`, `/privacy`, `/terms`, `/work`) plus `sitemap.xml`. The
  `/work` HTML contains the canonical + breadcrumb/FAQ JSON-LD and the
  empty-state copy; the prerendered homepage no longer contains any of the
  removed client names (A-Z Discount Flooring, Tracy Smith, Scheduler Pro,
  KIDZ, "Also shipped").

### Verification
- `npm run typecheck` — pass.
- `npm run build` — pass (client build → SSR build → prerender).
- Pre-rendered HTML confirmed to contain the full visible copy inside `#root`
  for `/`, `/privacy`, `/terms` (title, meta description, JSON-LD, section
  headings, CTA "Book a free call", phone `314-660-2890`, email
  `info@thecdscloud.com` all present). `sitemap.xml` lists only `/`, `/privacy`,
  `/terms`. `/app`, `/admin`, `/portal`, `/login`, `/unauthorized`,
  `/property-transfer` are **not** pre-rendered (SPA). `dist/404.html` present.
- `npm test` — no-op stub ("No test runner configured yet"), exit 0.
- ⚠️ `npm run lint` — fails with 66 pre-existing errors in files **not** touched
  by C1 (`AuthProvider`, router, admin/portal/records features,
  `PropertyTransfer`, `LeadForm`, `src/pages/.gitkeep.ts`, etc.). The files
  changed in C1 pass `npx eslint` cleanly. Recommend a separate lint-cleanup
  commit (out of C1 scope).

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

Current email path (verified in code): the lead form
(`functions/src/callable/submitContactForm.ts`) saves to Firestore and fires a
Google Apps Script webhook (`APPS_SCRIPT_WEBHOOK_URL`); the Apps Script
(`apps-script/Code.gs`, `scripts/google-apps-script.js`) sends via
`GmailApp.sendEmail` from Jason's Google account.

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

## Decisions needed from Jason
1. `npm run lint` is failing with 66 pre-existing errors (unrelated to C1).
   Fix them in a separate cleanup commit?
2. Kept `/login`, `/unauthorized`, `/property-transfer` as SPA fallbacks in
   `vercel.json` (removing them would break auth refresh and the
   property-transfer page). `/property-transfer` is also pending the C2
   remove/move/noindex decision.
3. Footer year is `new Date().getFullYear()` (HomePage and WorkPage). SSR bakes
   the build year, hydrate reads the visit year — a mismatch only at a year
   boundary. Consider freezing it to a constant (or leaving as-is).
4. E-1: confirm the exact Gmail OAuth scope and Google Cloud project.
5. `.clinerules` and `docs/` are still untracked in git (created in an earlier
   phase). Commit them (process files) or add them to `.gitignore`?
