import supabase from '@/lib/supabase'
import { PERSONAL_PROJECTS } from '@/lib/staticData'

const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
  )
}

// ============================================
// PUBLIC PROJECT QUERIES
// ============================================

export async function getPublishedProjects(filters = {}) {
  if (!isSupabaseConfigured()) {
    let projects = [...PERSONAL_PROJECTS]
    if (filters.category && filters.category !== 'All') {
      projects = projects.filter((p) => p.category === filters.category)
    }
    return { data: projects, error: null }
  }

  let query = supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category)
  }
  if (filters.project_type) {
    query = query.eq('project_type', filters.project_type)
  }
  if (filters.featured) {
    query = query.eq('featured', true)
  }

  const { data, error } = await query
  return { data: data || [], error }
}

export async function getFeaturedProjects(limit = 6) {
  if (!isSupabaseConfigured()) {
    return { data: PERSONAL_PROJECTS.slice(0, limit), error: null }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .neq('project_type', 'placeholder')
    .order('display_order', { ascending: true })
    .limit(limit)

  return { data: data || [], error }
}

export async function getProjectBySlug(slug) {
  if (!isSupabaseConfigured()) {
    const project = PERSONAL_PROJECTS.find((p) => p.slug === slug)
    return { data: project || null, error: project ? null : { message: 'Not found' } }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return { data, error }
}

export async function getRelatedProjects(currentId, category, limit = 3) {
  if (!isSupabaseConfigured()) {
    return {
      data: PERSONAL_PROJECTS.filter((p) => p.id !== currentId).slice(0, limit),
      error: null,
    }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, category, thumbnail_url, year, project_type')
    .eq('published', true)
    .eq('category', category)
    .neq('id', currentId)
    .limit(limit)

  return { data: data || [], error }
}

export async function getPersonalProjects() {
  if (!isSupabaseConfigured()) {
    return { data: PERSONAL_PROJECTS, error: null }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('project_type', 'personal')
    .order('display_order', { ascending: true })

  return { data: data || [], error }
}

// ============================================
// ADMIN PROJECT QUERIES
// ============================================

export async function getAllProjectsAdmin() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createProject(projectData) {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single()
  return { data, error }
}

export async function updateProject(id, projectData) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteProject(id) {
  // Fetch first to get thumbnail URL for storage cleanup
  const { data: project } = await supabase
    .from('projects')
    .select('id, thumbnail_url')
    .eq('id', id)
    .single()

  // Storage cleanup — non-blocking; never prevents DB deletion
  if (project?.thumbnail_url) {
    await deleteThumbnailFromStorage(project.thumbnail_url).catch((err) => {
      console.warn('[deleteProject] Storage cleanup failed (non-fatal):', err)
    })
  }

  // Delete and use .select() so a silent RLS block (data: [], error: null) is detectable
  const { data: deleted, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) return { error }

  if (!deleted || deleted.length === 0) {
    return {
      error: {
        message:
          'Delete was blocked — 0 rows removed. Ensure you are signed in as the admin account.',
      },
    }
  }

  return { error: null }
}

/**
 * Remove a thumbnail from Supabase Storage.
 * Accepts either a full public URL or just the storage path.
 * This is intentionally separate from deleteProject so it can be
 * called independently if needed.
 */
export async function deleteThumbnailFromStorage(thumbnailUrl) {
  if (!thumbnailUrl) return { error: null }

  // Extract the storage path from the full public URL.
  // Public URLs look like:
  //   https://<project>.supabase.co/storage/v1/object/public/project-assets/thumbnails/xyz.jpg
  // We need the path after the bucket name: thumbnails/xyz.jpg
  let storagePath = thumbnailUrl
  const marker = '/project-assets/'
  const markerIndex = thumbnailUrl.indexOf(marker)
  if (markerIndex !== -1) {
    storagePath = thumbnailUrl.slice(markerIndex + marker.length)
  } else {
    // Not a Supabase Storage URL — skip silently
    return { error: null }
  }

  const { error } = await supabase.storage
    .from('project-assets')
    .remove([storagePath])

  return { error }
}

export async function toggleProjectPublished(id, published) {
  return updateProject(id, { published })
}

export async function toggleProjectFeatured(id, featured) {
  return updateProject(id, { featured })
}

export async function getDashboardStats() {
  if (!isSupabaseConfigured()) {
    return {
      data: {
        total: PERSONAL_PROJECTS.length,
        published: PERSONAL_PROJECTS.filter((p) => p.published).length,
        drafts: 0,
        featured: PERSONAL_PROJECTS.filter((p) => p.featured).length,
        personal: PERSONAL_PROJECTS.filter((p) => p.project_type === 'personal').length,
        placeholder: 0,
        recent: PERSONAL_PROJECTS.slice(0, 5),
      },
      error: null,
    }
  }

  const { data: projects, error } = await supabase.from('projects').select('*')
  if (error) return { data: null, error }

  return {
    data: {
      total: projects.length,
      published: projects.filter((p) => p.published).length,
      drafts: projects.filter((p) => !p.published).length,
      featured: projects.filter((p) => p.featured).length,
      personal: projects.filter((p) => p.project_type === 'personal').length,
      placeholder: projects.filter((p) => p.project_type === 'placeholder').length,
      recent: [...projects].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5),
    },
    error: null,
  }
}

// ============================================
// STORAGE
// ============================================

export async function uploadThumbnail(file, projectId) {
  const ext = file.name.split('.').pop()
  const fileName = `thumbnails/${projectId}-${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from('project-assets')
    .upload(fileName, file, { upsert: true })

  if (error) return { url: null, error }

  const { data: urlData } = supabase.storage
    .from('project-assets')
    .getPublicUrl(fileName)

  return { url: urlData.publicUrl, error: null }
}
