-- ============================================================
-- SECURITY MIGRATION — Run this in Supabase SQL Editor
-- ============================================================
-- This script:
--   1. Drops the overly-permissive "authenticated" write policy
--   2. Replaces it with a policy locked to YOUR specific admin UID
--   3. Deletes the 3 seeded placeholder projects (which reference
--      local /assets/thumbnails/ paths that don't exist in production)
--
-- BEFORE RUNNING:
--   → Go to Supabase Dashboard → Authentication → Users
--   → Click your admin account → copy the UUID
--   → Replace 'YOUR_ADMIN_USER_UUID_HERE' below with that UUID
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- STEP 1: Drop the old permissive policy
-- ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Authenticated users have full access" ON public.projects;


-- ─────────────────────────────────────────────────────────────
-- STEP 2: Create a helper function to identify your admin UID
-- (Easier to maintain than repeating the UUID in every policy)
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid() = '7f7c8fb7-1c06-4bc2-8fd7-93befa46a5dc'::uuid;
$$;

-- Grant execute to authenticated role so policies can call it
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- ─────────────────────────────────────────────────────────────
-- STEP 3: Create tightly-scoped admin-only write policies
-- (Split by operation for clarity and auditability)
-- ─────────────────────────────────────────────────────────────

-- Admin can SELECT all projects (including drafts/unpublished)
CREATE POLICY "Admin can read all projects"
  ON public.projects
  FOR SELECT
  USING (public.is_admin());

-- Admin can INSERT new projects
CREATE POLICY "Admin can insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Admin can UPDATE existing projects
CREATE POLICY "Admin can update projects"
  ON public.projects
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin can DELETE projects
CREATE POLICY "Admin can delete projects"
  ON public.projects
  FOR DELETE
  USING (public.is_admin());


-- ─────────────────────────────────────────────────────────────
-- STEP 4: Remove the 3 seeded placeholder projects
-- These reference local /assets/thumbnails/ paths that only
-- exist on your local machine, not in Supabase Storage.
-- You will re-add these via the Admin Dashboard with real
-- uploaded thumbnails.
-- ─────────────────────────────────────────────────────────────
DELETE FROM public.projects
WHERE slug IN ('my-year-2024', 'sreemangal', 'sabdi');


-- ─────────────────────────────────────────────────────────────
-- VERIFY: Check your final policies
-- ─────────────────────────────────────────────────────────────
SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'projects'
ORDER BY policyname;
