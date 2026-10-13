-- send-contact-email only sends for a real, recent, not-yet-notified inquiry
-- row, and stamps it here. One email per inserted row, so the honeypot and
-- rate-limit on inquiries now also bound the notification emails.
alter table public.inquiries
  add column if not exists notified_at timestamptz;
