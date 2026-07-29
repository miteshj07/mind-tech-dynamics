-- ============================================================
-- Migration: lock_down_rls
-- Created:   2026-07-29
-- Purpose:   Tighten Row Level Security on the public-facing tables.
--
--            A permissive policy on the live database allowed the
--            anon (publishable) key, which ships in the client
--            bundle, to UPDATE blog_posts. This migration replaces
--            whatever policies currently exist with an explicit,
--            minimal, role-scoped set so the anon role can only do
--            what the public site genuinely needs:
--
--              blog_posts          anon: SELECT published only
--              cms_content         anon: SELECT (site content is public)
--              inquiries           anon: INSERT only (form submissions)
--              analytics_snapshots anon: nothing
--
--            All INSERT/UPDATE/DELETE beyond the above is limited to
--            the authenticated admin (role = 'admin' in user_roles).
--            The service_role key (content + analytics edge jobs)
--            bypasses RLS entirely and is unaffected.
--
--            Idempotent: safe to run more than once, and safe to run
--            directly in the Supabase SQL editor.
-- ============================================================


-- ── 1. Admin helper ─────────────────────────────────────────
-- SECURITY DEFINER so the user_roles lookup inside a policy is not
-- itself blocked by user_roles' RLS. STABLE, fixed search_path.

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


-- ── 2. Drop every existing policy on the four tables ────────
-- Clears any stray permissive policy (however it was named or
-- created) so the explicit set below is the complete story.

DO $$
DECLARE
  t   text;
  pol record;
BEGIN
  FOREACH t IN ARRAY ARRAY['blog_posts', 'cms_content', 'inquiries', 'analytics_snapshots']
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


-- ── 3. blog_posts ───────────────────────────────────────────
-- Public: read published posts only. Admin: full control.

CREATE POLICY "blog_posts public read published"
  ON public.blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "blog_posts admin all"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ── 4. cms_content ──────────────────────────────────────────
-- Public: read (the site renders this to every visitor).
-- Admin: full control (the CMS editor in /admin).

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


-- ── 5. inquiries ────────────────────────────────────────────
-- Public: INSERT only (contact + early-access forms). No public
-- read, so lead data stays private. Admin: full control.

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


-- ── 6. analytics_snapshots ──────────────────────────────────
-- No public access at all. Admin: read. Writes come from the
-- analytics edge function via service_role (bypasses RLS).

CREATE POLICY "analytics_snapshots admin read"
  ON public.analytics_snapshots
  FOR SELECT
  TO authenticated
  USING (public.is_admin());


-- ── 7. Apply notes ──────────────────────────────────────────
-- Run in the Supabase SQL editor (recommended, avoids CLI
-- migration-history drift), or via:  supabase db push
-- After applying, verify:
--   * anon UPDATE on blog_posts is rejected
--   * public site still reads blog_posts + cms_content
--   * form submissions still INSERT into inquiries
--   * the /admin dashboard can still read and edit
