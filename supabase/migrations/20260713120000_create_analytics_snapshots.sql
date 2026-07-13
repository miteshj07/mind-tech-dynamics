-- ============================================================
-- Migration: create_analytics_snapshots
-- Created:   2026-07-13
-- Purpose:   Daily snapshot of website traffic for the /admin
--            Analytics dashboard. One row per day is written by
--            the `analytics-snapshot` edge function (service_role
--            key → bypasses RLS), which pulls GA4 Data API +
--            Google Search Console. The dashboard only ever READS
--            the most recent row — it never calls Google directly.
-- ============================================================


-- ── 1. Main table ────────────────────────────────────────────

CREATE TABLE analytics_snapshots (

  -- Identity
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Upsert key: the UTC day the snapshot was taken. UNIQUE so the
  -- edge function can upsert (onConflict: snapshot_date) and re-runs
  -- on the same day overwrite rather than duplicate → idempotent.
  snapshot_date  DATE        NOT NULL UNIQUE,

  -- The reporting windows the data covers. GA4 and GSC lag by
  -- different amounts (GA4 → yesterday, GSC → ~3 days), so these
  -- describe the GA4 window; per-source ranges also live in the JSON.
  range_start    DATE,
  range_end      DATE,

  -- Pulled data (see src/types/analytics.ts for the shapes)
  kpis           JSONB       NOT NULL DEFAULT '{}'::jsonb,   -- sessions, users, engagementRate, etc. (+ prior-period deltas)
  channels       JSONB       NOT NULL DEFAULT '[]'::jsonb,   -- [{ channel, sessions, activeUsers }]
  top_pages      JSONB       NOT NULL DEFAULT '[]'::jsonb,   -- [{ path, title, views, engagementDuration, sessions, engagementRate }]
  top_queries    JSONB       NOT NULL DEFAULT '[]'::jsonb,   -- [{ query, clicks, impressions, ctr, position }]
  gsc_totals     JSONB       NOT NULL DEFAULT '{}'::jsonb,   -- { clicks, impressions, ctr, position, rangeStart, rangeEnd }

  -- Partial-failure flags: GA4 and GSC are pulled independently, so
  -- a broken GSC permission still leaves a usable GA4 dashboard.
  ga4_ok         BOOLEAN     NOT NULL DEFAULT false,
  gsc_ok         BOOLEAN     NOT NULL DEFAULT false,
  error          TEXT,                                       -- last error message (if any)

  -- Timestamps
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()

);


-- ── 2. Auto-update updated_at ────────────────────────────────
-- Reuses update_updated_at_column(), created by the blog_posts
-- migration (20260610000001).

CREATE TRIGGER analytics_snapshots_updated_at
  BEFORE UPDATE ON analytics_snapshots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ── 3. Indexes ───────────────────────────────────────────────

-- Dashboard reads the newest snapshot: ORDER BY snapshot_date DESC LIMIT 1
CREATE INDEX idx_analytics_snapshots_date
  ON analytics_snapshots (snapshot_date DESC);


-- ── 4. Row Level Security ────────────────────────────────────
-- Writes come exclusively from the edge function via the
-- service_role key, which BYPASSES RLS — so there is deliberately
-- NO insert/update policy. Reads are admin-only.

ALTER TABLE analytics_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read analytics snapshots"
  ON analytics_snapshots
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM   user_roles
      WHERE  user_id = auth.uid()
      AND    role    = 'admin'
    )
  );


-- ── 5. Scheduling extensions ─────────────────────────────────
-- Needed so pg_cron can invoke the edge function daily via pg_net.
-- The actual cron.schedule(...) call is run MANUALLY in the SQL
-- editor (see below) so the CRON_SECRET literal never lands in git.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;


-- ── 6. Comments ──────────────────────────────────────────────
-- Apply this migration:
--   supabase db push
-- (or paste into the Supabase dashboard SQL editor).
--
-- Then, ONCE, run this in the SQL editor to schedule the daily pull
-- (contains the shared secret — keep it OUT of git):
--
--   select cron.schedule(
--     'daily-analytics-snapshot',
--     '15 8 * * *',                        -- 08:15 UTC daily
--     $$
--     select net.http_post(
--       url     := 'https://rlfansvalprvofpuqmsb.supabase.co/functions/v1/analytics-snapshot',
--       headers := jsonb_build_object(
--         'Content-Type',  'application/json',
--         'x-cron-secret', '<CRON_SECRET_VALUE>'
--       ),
--       body    := '{}'::jsonb
--     );
--     $$
--   );
--
-- Inspect / remove later:
--   select jobname, schedule, active from cron.job;
--   select cron.unschedule('daily-analytics-snapshot');
