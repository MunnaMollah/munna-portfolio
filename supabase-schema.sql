-- ============================================================
-- Munna Mollah Portfolio — Supabase Schema (Reference)
-- This is the REFERENCE schema only.
-- The database is already created and running.
-- For security changes, run: supabase-migration-security.sql
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  category        TEXT,
  project_type    TEXT NOT NULL DEFAULT 'client'
                  CHECK (project_type IN ('client', 'personal', 'placeholder')),
  client          TEXT,
  year            INTEGER,
  description     TEXT,
  role            TEXT DEFAULT 'Video Editor',
  thumbnail_url   TEXT,
  video_url       TEXT,
  services        TEXT[] DEFAULT '{}',
  tools           TEXT[] DEFAULT '{}',
  featured        BOOLEAN DEFAULT false,
  published       BOOLEAN DEFAULT false,
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_projects_published     ON public.projects (published);
CREATE INDEX IF NOT EXISTS idx_projects_featured      ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category      ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_project_type  ON public.projects (project_type);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects (display_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug          ON public.projects (slug);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public visitors — read published projects only
CREATE POLICY "Public can read published projects"
  ON public.projects
  FOR SELECT
  USING (published = true);

-- Policy 2: Admin can read ALL projects (including drafts)
-- NOTE: Replace 'YOUR_ADMIN_USER_UUID_HERE' with your actual Supabase user UUID
-- Find it: Supabase Dashboard → Authentication → Users → click your account → copy UUID
CREATE POLICY "Admin can read all projects"
  ON public.projects
  FOR SELECT
  USING (public.is_admin());

-- Policy 3: Admin can insert new projects
CREATE POLICY "Admin can insert projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Policy 4: Admin can update projects
CREATE POLICY "Admin can update projects"
  ON public.projects
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Policy 5: Admin can delete projects
CREATE POLICY "Admin can delete projects"
  ON public.projects
  FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- ADMIN HELPER FUNCTION
-- ============================================================
-- Returns true only when the calling session belongs to the admin user.
-- Replace 'YOUR_ADMIN_USER_UUID_HERE' with your Supabase user UUID.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT auth.uid() = 'YOUR_ADMIN_USER_UUID_HERE'::uuid;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ============================================================
-- STORAGE BUCKET
-- Create manually in Supabase Dashboard:
-- ============================================================
-- 1. Go to Storage → New Bucket
-- 2. Name: project-assets
-- 3. Public: YES
-- 4. Add policy: Allow only admin UID to upload/update/delete

-- ============================================================
-- NOTE: Do NOT use the seed data below in production.
-- Add your 3 personal projects via the Admin Dashboard instead
-- so you can upload real thumbnails to Supabase Storage.
-- ============================================================
