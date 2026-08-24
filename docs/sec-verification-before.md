# Security verification — BEFORE evidence (TASK-002)

- **Date:** 2026-08-24
- **Captured by:** Nikhil (web dev), branch `fix/critical-security`
- **Purpose:** baseline proof of what the public anon (publishable) key can read
  via PostgREST *before* MJ applies `supabase/security-hotfix.sql`. Meera re-runs
  the same probes after the SQL is applied for the AFTER evidence.
- **Redaction:** no row values are recorded anywhere — only HTTP status, the
  `content-range` row count, and column names. No PII left this capture.

## Method

Read-only `GET` against the project REST endpoint, one probe per table:

```
curl -s -i "https://rlfansvalprvofpuqmsb.supabase.co/rest/v1/<table>?select=*&limit=1" \
  -H "apikey: <anon publishable key from src/integrations/supabase/client.ts>" \
  -H "Authorization: Bearer <same key>" \
  -H "Prefer: count=exact" \
  -H "Range: 0-0"
```

`content-range: 0-0/N` → N rows visible to anon. `*/0` → zero rows visible.
No write probes were performed (a write probe would pollute live data).

## Results (2026-08-24)

| Table | HTTP | Rows visible to anon | Fields exposed |
|---|---|---|---|
| `inquiries` | 200 | **0** (`*/0`) | none returned |
| `cms_content` | 206 | **12** (`0-0/12`) | `id`, `section`, `data`, `created_at`, `updated_at` |
| `images` | 200 | **0** (`*/0`) | none returned |

## Interpretation — read carefully

1. **The SEC-1 lead-PII dump is NOT reproducible today.** The 2026-07-13 audit
   confirmed full `inquiries` rows (name, email, phone, company, message) were
   anon-readable. Today anon SELECT returns 0 rows. Two possible explanations,
   indistinguishable from outside:
   - the hotfix SQL from the July session (now committed as
     `supabase/migrations/20260729120000_lock_down_rls.sql`, commit `a41fe13`)
     was already pasted into the SQL editor, **or**
   - the table is genuinely empty.

   `images` is in the same ambiguous state (0 rows visible — but that earlier
   migration did *not* cover `images`, so if anything it is more likely simply
   empty or was locked down separately).

2. **`cms_content` anon-read of 12 rows is by design** (the site renders this
   content publicly). Read access alone does not show whether anon can *write*;
   writability was not probed to avoid modifying live data. The stored-XSS risk
   (SEC-3) is about the write path.

3. **Running `supabase/security-hotfix.sql` is correct in every scenario** — it
   is idempotent, re-states SEC-1/SEC-3, and adds the SEC-5 `images` policies
   that the July script lacked.

## What Meera should verify AFTER MJ runs the SQL

1. **Dashboard ground truth (removes the ambiguity above):** in Supabase
   Dashboard → Table Editor, confirm `inquiries` actually contains rows
   (service-role view), and Database → Tables shows RLS **enabled** on
   `inquiries`, `cms_content`, `images` with exactly the policies named in
   `supabase/security-hotfix.sql`.
2. Re-run the three probes above (same command, same redaction rules):
   - `inquiries` → `*/0`, no fields
   - `cms_content` → still readable (row count unchanged)
   - `images` → `*/0`, no fields
3. Anon INSERT still works: submit the live contact form (or DealPulse early
   access form) with a clearly-labelled test entry and confirm success UI; MJ
   can delete the test row from the dashboard afterwards.
4. Anon write to `cms_content` fails: from the browser console on the public
   site (anon session), attempt
   `supabase.from('cms_content').update({ updated_at: new Date().toISOString() }).eq('section','heroSection')`
   and confirm it errors or affects 0 rows.
5. Public site regression: homepage renders (Testimonials / SuccessMetrics /
   WhyChooseUs titles show styled brand spans, not raw HTML), no error toasts,
   no console crash from the CMS provider.
6. `/admin` (as admin user): inquiries list loads, CMS editor saves, image
   gallery works.
7. Storage: review `cms` bucket policies per the commented section 6 of the
   hotfix SQL (uploads/deletes admin-only).

## Notes

- A `supabase migration list` check against the linked project was not possible
  in this session (CLI call blocked by sandbox policy), which is why point 1 of
  the AFTER checklist asks Meera to confirm applied state in the dashboard.
- The anon key used is the publishable key shipped in the client bundle
  (`src/integrations/supabase/client.ts`) — nothing secret was used or stored.
