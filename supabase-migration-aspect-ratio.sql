-- ============================================================
-- Migration: Add aspect_ratio column to projects table
-- Run this once in Supabase SQL Editor → SQL Editor tab
-- ============================================================
--
-- What this does:
--   Adds an optional aspect_ratio column to the existing
--   projects table. All existing rows default to '16:9'.
--   No existing data is changed. RLS policies are untouched.
--
-- Valid values:
--   '16:9'  → YouTube videos, films, landscape content (DEFAULT)
--   '9:16'  → Short-form Reels, TikTok, Instagram Stories
--   '1:1'   → Square content
--   '4:5'   → Portrait (Instagram portrait posts)
--   'other' → Anything else / custom ratio
--
-- Frontend behaviour:
--   - ProjectCard: all cards use a uniform 16:9 container.
--     Portrait thumbnails (9:16, 4:5) display with object-fit:contain
--     plus a blurred backdrop instead of being cropped.
--   - ProjectDetailPage: the video player and hero image both
--     adapt to the native aspect ratio. Portrait videos are
--     centred at ~360px width; landscape fills the column.
-- ============================================================

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS aspect_ratio TEXT NOT NULL DEFAULT '16:9'
    CHECK (aspect_ratio IN ('16:9', '9:16', '1:1', '4:5', 'other'));

COMMENT ON COLUMN public.projects.aspect_ratio IS
  'Native video/thumbnail aspect ratio. Used by the frontend to render the correct player size and thumbnail presentation.';

-- ── Verify the column was added ─────────────────────────────
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'projects'
  AND column_name  = 'aspect_ratio';
