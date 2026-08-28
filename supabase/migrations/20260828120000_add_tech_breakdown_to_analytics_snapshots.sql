-- Device/browser/OS breakdown per snapshot, for spotting bot/scraper traffic
-- (a pile of sessions on one obscure browser+OS combo with near-zero
-- engagement is the signature to look for).
alter table public.analytics_snapshots
  add column if not exists tech_breakdown jsonb not null default '[]'::jsonb;
