-- Keep cms_content.updated_at current on every edit (admin CMS or raw SQL),
-- so the hourly "rebuild if content changed" cron job can detect changes.
-- Reuses update_updated_at_column() from the analytics_snapshots migration.
drop trigger if exists cms_content_updated_at on public.cms_content;
create trigger cms_content_updated_at
  before update on public.cms_content
  for each row execute function public.update_updated_at_column();
