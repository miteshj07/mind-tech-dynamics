-- ============================================================
-- SECURITY HOTFIX — SEC-1, SEC-3, SEC-5  (BACKLOG.md, audit 2026-07-13)
-- Created: 2026-08-24 (TASK-002)
--
-- ONE paste-ready script for the Supabase SQL editor. Do NOT run
-- via `supabase db push` — this file intentionally lives outside
-- supabase/migrations/ so it never enters CLI migration history.
--
-- What it enforces:
--   SEC-1  inquiries    anon/auth: INSERT only (contact + early-access
--                       forms keep working). SELECT/UPDATE/DELETE:
--                       admin only. Stops the public lead-PII dump.
--   SEC-3  cms_content  anon/auth: SELECT (the site renders it to
--                       every visitor). INSERT/UPDATE/DELETE: admin
--                       only. Closes the stored-XSS write path.
--   SEC-5  images       admin only FOR ALL (metadata table is used
--                       exclusively by the /admin gallery; the public
--                       site loads images via Storage public URLs).
--
-- Overlap note: supabase/migrations/20260729120000_lock_down_rls.sql
-- (commit a41fe13) already covers inquiries + cms_content (plus
-- blog_posts and analytics_snapshots). This hotfix re-states those
-- two and ADDS images, so pasting this one file is sufficient even
-- if the earlier script was never applied. Everything here is
-- idempotent — safe to run repeatedly, safe if the earlier script
-- already ran.
--
-- The service_role key (edge functions / build jobs) bypasses RLS
-- and is unaffected.
-- ============================================================


-- ── 1. Admin helper ─────────────────────────────────────────
-- SECURITY DEFINER so the user_roles lookup inside a policy is not
-- itself blocked by user_roles' RLS. STABLE, fixed search_path.
-- (Same definition as in 20260729120000_lock_down_rls.sql.)

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM   public.user_roles
    WHERE  user_id = auth.uid()
    AND    role    = 'admin'
  );
$$;


-- ── 2. Enable RLS + drop every existing policy on the 3 tables ──
-- Clears any stray permissive policy (however it was named or
-- created via the dashboard) so the explicit set below is the
-- complete story.

DO $$
DECLARE
  t   text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY['inquiries', 'cms_content', 'images']
  LOOP
    -- Skip tables that do not exist in this project.
    IF to_regclass(format('public.%I', t)) IS NULL THEN
      CONTINUE;
    END IF;

    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);

    FOR pol IN
      SELECT policyname
      FROM   pg_policies
      WHERE  schemaname = 'public'
      AND    tablename  = t
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, t);
    END LOOP;
  END LOOP;
END $$;


-- ── 3. SEC-1 · inquiries ────────────────────────────────────
-- Public: INSERT only (src/hooks/useContactForm.ts and
-- src/components/dealpulse/EarlyAccessForm.tsx only ever insert).
-- No public read, so lead PII stays private. Admin: full control.

CREATE POLICY "inquiries public insert"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "inquiries admin all"
  ON public.inquiries
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ── 4. SEC-3 · cms_content ──────────────────────────────────
-- Public: read (every visitor renders this content).
-- Admin: full control (the CMS editor in /admin).
-- The client-side default-seeding writes in
-- src/cms/context/CmsContext.tsx now fail soft for anon visitors
-- (fixed in the same TASK-002 branch), so blocking anon writes
-- does not break the public site.

CREATE POLICY "cms_content public read"
  ON public.cms_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "cms_content admin all"
  ON public.cms_content
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ── 5. SEC-5 · images ───────────────────────────────────────
-- Admin only, all operations. The public site never queries this
-- table (it loads images through Storage public URLs); only the
-- /admin gallery reads/writes it via an authenticated session.

CREATE POLICY "images admin all"
  ON public.images
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ── 6. SEC-5 follow-up · `cms` Storage bucket (REVIEW IN DASHBOARD) ──
-- Storage access is governed by policies on storage.objects, which
-- this script deliberately does NOT modify (bucket policies are
-- managed via Dashboard → Storage → cms → Policies, and dashboard-
-- created policies can conflict with SQL-created ones).
--
-- Review checklist for the `cms` bucket:
--   * SELECT (download): public read is OK — the site hot-links
--     public URLs for CMS images.
--   * INSERT (upload), UPDATE, DELETE: must be admin-only. If any
--     policy currently grants these to anon (or to all
--     authenticated users without an is_admin() check), tighten it.
--     Example shape, if managing via SQL instead of the dashboard:
--
--       CREATE POLICY "cms bucket admin write"
--         ON storage.objects
--         FOR ALL
--         TO authenticated
--         USING (bucket_id = 'cms' AND public.is_admin())
--         WITH CHECK (bucket_id = 'cms' AND public.is_admin());
--
--     …after dropping any existing permissive write policies
--     scoped to bucket_id = 'cms'.


-- ── 7. Verify after running (see docs/sec-verification-before.md) ──
--   * anon GET  /rest/v1/inquiries?select=*      → []   (no rows)
--   * anon GET  /rest/v1/cms_content?select=*    → rows (public read OK)
--   * anon GET  /rest/v1/images?select=*         → []   (no rows)
--   * anon POST /rest/v1/inquiries               → 201  (forms still work)
--   * anon PATCH/POST/DELETE on cms_content and images → 401/42501 or 0 rows
--   * /admin (logged in as admin) can still read inquiries and edit content
