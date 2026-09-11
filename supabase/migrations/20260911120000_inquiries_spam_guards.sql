-- Contact form is getting hit by a spam/scraper bot (random-junk submissions,
-- no CAPTCHA or rate-limit on the open `inquiries` INSERT policy). Two
-- independent guards, both server-side so they can't be bypassed by a bot
-- calling the API directly (a client-side-only honeypot wouldn't help there):
--
-- 1. Rate limit: reject an INSERT if 5+ rows were already created in the
--    last 5 minutes, site-wide. Real traffic here never bursts that fast;
--    bots do.
-- 2. Honeypot: a hidden `website` column real users never fill (the form
--    field stays empty/hidden). Any INSERT with it set is a bot filling
--    every field it can see.

alter table public.inquiries
  add column if not exists website text;

create or replace function public.enforce_inquiry_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(new.website, '') <> '' then
    raise exception 'submission rejected';
  end if;

  if (
    select count(*) from public.inquiries
    where created_at > now() - interval '5 minutes'
  ) >= 5 then
    raise exception 'too many submissions, please try again in a few minutes';
  end if;

  return new;
end;
$$;

drop trigger if exists inquiries_spam_guard on public.inquiries;
create trigger inquiries_spam_guard
  before insert on public.inquiries
  for each row execute function public.enforce_inquiry_rate_limit();
