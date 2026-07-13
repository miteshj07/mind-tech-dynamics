# meethemind.com — Website Backlog

Audit date: **2026-07-13**. Covers **Security**, **SEO**, and **GEO** (AI-answer-engine readiness).
Tags: `[SEC]` security · `[SEO]` search · `[GEO]` generative-engine · `[PERF]` performance.
Status: ⬜ open · 🔧 fix provided (apply pending) · ✅ done.

## Two root causes explain most of this
1. **Tables created via the dashboard without migrations** → their RLS was never set, so several are publicly readable/writable (`inquiries`, `cms_content`, `images`, `newsletter_subscribers`; `user_roles` was outright missing). *Fix pattern: enable RLS + explicit policies, and check migrations into the repo.*
2. **Prerendering is disabled on Vercel** (`scripts/prerender.mjs` exits when `VERCEL` is set) → every URL serves an empty `<div id="root">` shell. Non-JS crawlers (AI engines, social unfurlers, Bing first pass) see only the **homepage** `<head>` on every page. *This one fix unlocks ~half the SEO + GEO backlog.*

---

## 🔴 CRITICAL — do first

### SEC-1 · Contact-lead PII is publicly readable `[SEC]` 🔧
- **Confirmed:** the public anon key returns full `inquiries` rows (name, email, phone, company, message). Anyone can dump every lead.
- **Where:** `public.inquiries` (no migration); written at `src/hooks/useContactForm.ts:29`, `src/components/dealpulse/EarlyAccessForm.tsx:51`.
- **Fix:** enable RLS; keep `INSERT` open (form still works), make `SELECT` admin-only. *(Hotfix SQL already provided in chat.)*

### SEC-2 · `user_roles` was unprotected = admin-takeover risk `[SEC]` ✅
- The authorization table itself. If writable, any user could grant themselves `admin`.
- **Status: fixed this session** — recreated with RLS on, read-own-role only, no public write policy.

### SEC-3 · `cms_content` publicly writable → stored XSS `[SEC]` ⬜
- `cms_content` is anon-readable (confirmed) and likely anon-**writable** (the app writes defaults with the anon key: `src/cms/context/CmsContext.tsx:39-42`). Three homepage titles render it as raw HTML via `dangerouslySetInnerHTML` — `src/components/home/Testimonials.tsx:51`, `SuccessMetrics.tsx:26`, `WhyChooseUs.tsx:101`. An attacker could overwrite a title with `<img src=x onerror=…>` → script runs for **every visitor, including the admin**.
- **Fix (two layers):** (1) RLS — public `SELECT`, admin-only writes. (2) Stop rendering CMS strings as HTML — drop `dangerouslySetInnerHTML` (render as text) or sanitize with DOMPurify.

---

## 🟠 HIGH

### RENDER-1 · Production ships an empty SPA shell to non-JS crawlers `[SEO][GEO]` ⬜
- **Highest-leverage item.** `scripts/prerender.mjs:14-17` skips react-snap on Vercel; `vercel.json` rewrites `/(.*)` → `/index.html`. Result: every route's `<body>` is `<div id="root"></div>`, and every page inherits the **homepage** title/description/canonical. AI engines (GPTBot, ClaudeBot, PerplexityBot) and social unfurlers see no per-page content — and a canonical pointing back to `/` (self-cannibalization).
- **Fix:** real static generation that runs on Vercel — `vite-react-ssg` (recommended), or re-enable react-snap with a Vercel-compatible headless Chromium (`puppeteer-core` + `@sparticuz/chromium`). Verify `dist/agentforce/index.html` etc. contain real body text + per-page JSON-LD.
- **Files:** `scripts/prerender.mjs`, `vercel.json`, `index.html`, `src/components/layout/Seo.tsx`.

### RENDER-2 · Blog posts are client-fetched → doubly invisible `[SEO][GEO]` ⬜
- `src/pages/BlogPost.tsx:28-59` fetches article body from Supabase in `useEffect`; blog routes aren't in `reactSnap.include`. Your most citeable/shareable content renders as a "Loading…" shell to crawlers.
- **Fix:** generate static HTML per slug at build time (query `blog_posts` where `status='published'`), with markdown pre-rendered + `BlogPosting` JSON-LD.

### SEC-4 · `send-contact-email` is an open, unauthenticated endpoint `[SEC]` ⬜
- `verify_jwt=false` + CORS `*` + no rate-limit/captcha, and email HTML is built from unescaped input (`supabase/functions/send-contact-email/index.ts:42-50`). Anyone can spam `RESEND_TO` or inject phishing HTML into the admin's notification email.
- **Fix:** HTML-escape every interpolated value; validate `email`; add abuse control (Turnstile/hCaptcha token, per-IP rate limit, or a shared header secret from the site).

### SEC-5 · `images` metadata table anon read/write `[SEC]` ⬜
- Anon-readable (confirmed); leaks storage paths/filenames, and if writable lets anyone pollute/delete the gallery. `src/services/supabase-service.ts:206/235/269`.
- **Fix:** RLS admin-only `FOR ALL`. Also review the `cms` Storage bucket policies on `storage.objects` (uploads/deletes should be admin-only).

### PERF-1 · No code-splitting → one ~1.5 MB JS bundle `[SEO][PERF]` ⬜
- `src/App.tsx` imports all ~23 pages statically; no `manualChunks`. Admin-only recharts + DealPulse media ship to every visitor. Hurts LCP/TBT (Core Web Vitals = ranking factor).
- **Fix:** route-based `React.lazy` + `<Suspense>` (start with `Admin`, `DealPulse`, `BlogPost`); add `build.rollupOptions.manualChunks` for react/framer-motion/recharts/supabase/react-markdown. Files: `vite.config.ts`, `src/App.tsx`.

### SEO-1 · Five service pages missing from the sitemap `[SEO][GEO]` ⬜
- `scripts/generate-sitemap.mjs:11-23` omits `/agentforce-implementation`, `/apollo-io-salesforce-integration`, `/salesforce-revops`, `/salesforce-health-check`, `/salesforce-data-cloud` — the high-intent pages your nav promotes.
- **Fix:** add the 5 routes (and see SEO-3 to make the list dynamic).

---

## 🟡 MEDIUM

### GEO-1 · No real `llms.txt` `[GEO]` ⬜
- The live `HTTP 200` is a false positive — the catch-all rewrite returns the HTML shell. No file exists.
- **Fix:** add `public/llms.txt` (served before the SPA rewrite) — a concise company/services/contact summary; later an `llms-full.txt` once RENDER-1 lands.

### SEC-6 · `newsletter_subscribers` — verify no anon SELECT `[SEC]` ⬜
- Anon read returned `[]` (empty today, or RLS-filtered — ambiguous). Same class as `inquiries`. `src/components/blog/NewsletterSignup.tsx:23`.
- **Fix:** RLS — anon `INSERT WITH CHECK (true)`, no anon `SELECT` (admin-only).

### SEO-2 · Duplicate / inconsistent Organization schema `[SEO][GEO]` ⬜
- `index.html` (`ProfessionalService #organization`, reviews, `sameAs`=Twitter only) vs `src/pages/Index.tsx:20-69` (`Organization` no `@id`, `sameAs`=LinkedIn/X/Trailblazer) → two unlinked org entities, conflicting handles (`@meetthemindtech` vs `x.com/MeetTheMind`), LinkedIn/Trailblazer missing from the static one.
- **Fix:** one canonical Organization in static `index.html` with stable `@id`, full `sameAs`, `foundingDate`, `knowsAbout`; make the client graph reference the same `@id`. Also drop the self-serving org-level `aggregateRating` (against Google guidelines).

### SEO-3 · Hardcoded route/slug lists drift `[SEO]` ⬜
- `generate-sitemap.mjs` hardcodes `STATIC_ROUTES` (already 5 behind) and `BLOG_SLUGS` (7 slugs) while posts live in Supabase → new posts never enter the sitemap.
- **Fix:** derive routes from `App.tsx`; fetch published slugs from Supabase at build.

### SEO-4 · Stale committed `public/sitemap.xml` `[SEO]` ⬜
- 9 URLs, no `<lastmod>`; overwritten at build but misleading and the fallback if `postbuild` fails.
- **Fix:** delete it (rely on the generator) or keep it in sync.

### SEO-5 · No `BreadcrumbList` schema/UI `[SEO][GEO]` ⬜
- Missed rich-result + internal-linking signal for Services→page, Blog→post, Apps→DealPulse.
- **Fix:** breadcrumb component + `BreadcrumbList` JSON-LD on nested pages.

### SEO-6 · Soft 404s (unknown URLs return 200) `[SEO]` ⬜
- `vercel.json` rewrites everything to 200; `NotFound.tsx` and blog-not-found have no `noindex`.
- **Fix:** `noindex` meta on those states (via `Seo`); ideally a real 404 status (needs SSR/edge).

### SEO-7 · No per-page `og:image` / Twitter card `[SEO]` ⬜
- `Seo.tsx` sets `og:title/description/url` but not `og:image` or `twitter:*`; deep links unfurl with homepage image.
- **Fix:** extend `Seo.tsx` to set `og:image` + `twitter:card/title/description/image` per page (blog → `featured_image`). Depends on RENDER-1 to reach unfurlers.

### GEO-2 · Blog author E-E-A-T is generic `[GEO][SEO]` ⬜
- `BlogPost.tsx:47/90` defaults author to `'MeetTheMind'` generic `Person`. The real asset — Mitesh Jain, 5× Salesforce certified, Agentblazer Innovator 2025 — isn't surfaced.
- **Fix:** attribute posts to a named `Person` with `sameAs` (LinkedIn, Trailblazer) + credentials.

---

## 🟢 LOW / polish

- **SEC-7 · Debug logging leaks PII `[SEC]`** — remove the stray `console.log("==== Ankit ", userId)` at `src/context/AuthContext.tsx:78`; gate the rest behind `import.meta.env.DEV`; strip PII from function logs (`useContactForm.ts:25`, `send-contact-email:21`).
- **SEC-8 · Outdated edge deps `[SEC]`** — `resend@1.0.0`, `deno.land/std@0.168.0`; bump.
- **SEO-8 · Images not lazy-loaded `[SEO][PERF]`** — only 1/26 uses `loading="lazy"`; add to below-fold images (keep hero eager).
- **SEO-9 · `Apps`/`Careers` have no JSON-LD** — add `CollectionPage`/`ItemList` / `JobPosting`.
- **SEO-10 · `reactSnap.include` omits 7 routes** — moot until RENDER-1; fix alongside it.
- **SEO-11 · Confirm non-www → www 301** at the Vercel domain level (canonicals already use www).
- **GEO-3 · NAP is India-only** while targeting US/UK/UAE/AUS — consider regional `contactPoint`s or explicit "remote-first, serving…" in schema. (`areaServed` is already set correctly.)
- **A11Y · Verify image `alt` coverage** — the SEO and GEO passes disagreed (all-present vs ~17 missing); spot-check `DealPulse.tsx`, `CaseStudies.tsx`, `DealPulseTeaser.tsx`, `HeroSection`, `Footer`, `Navigation`.

---

## Suggested order of attack
1. **Security SQL sweep (1 sitting):** SEC-1, SEC-3, SEC-5, SEC-6 — all RLS fixes in the SQL editor; SEC-2 is already done. Then SEC-4 (harden the email function) + SEC-7 (drop debug logs).
2. **RENDER-1** — the prerendering/SSG fix. Biggest SEO+GEO win; unlocks RENDER-2, SEO-6/7, GEO-1.
3. **Quick SEO wins:** SEO-1 (+ SEO-3 dynamic), GEO-1 (llms.txt), SEO-2 (consolidate schema).
4. **PERF-1** code-splitting, then the rest of MEDIUM/LOW.
