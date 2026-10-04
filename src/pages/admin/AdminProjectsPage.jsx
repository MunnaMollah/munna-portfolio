import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getAllProjectsAdmin, deleteProject, toggleProjectPublished, toggleProjectFeatured } from '@/services/projectService'
import { Plus, Trash2, Edit, Eye, EyeOff, Star, StarOff, ExternalLink, AlertTriangle, X } from 'lucide-react'
import toast from 'react-hot-toast'

const TYPE_COLORS = {
  personal: { bg: 'rgba(129,140,248,0.1)', color: '#818cf8', border: 'rgba(129,140,248,0.2)' },
  client: { bg: 'rgba(74,222,128,0.08)', color: '#4ade80', border: 'rgba(74,222,128,0.15)' },
  placeholder: { bg: 'rgba(255,255,255,0.04)', color: '#555', border: 'rgba(255,255,255,0.06)' },
}

function Badge({ type, label }) {
  const style = TYPE_COLORS[type] || TYPE_COLORS.placeholder
  return (
    <span style={{ padding: '3px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 500, background: style.bg, color: style.color, border: `1px solid ${style.border}` }}>
      {label || type}
    </span>
  )
}

/** Inline confirm panel — rendered inside the project row, replaces window.confirm */
function DeleteConfirm({ project, onConfirm, onCancel, deleting }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        background: 'rgba(255,107,107,0.06)',
        border: '1px solid rgba(255,107,107,0.2)',
        borderRadius: '6px',
        flexWrap: 'wrap',
      }}
    >
      <AlertTriangle size={15} color="#ff6b6b" style={{ flexShrink: 0 }} />
      <p style={{ fontSize: '13px', color: '#f2f0eb', flex: 1, minWidth: '160px' }}>
        Delete <strong>"{project.title}"</strong>? This cannot be undone.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={onCancel}
          disabled={deleting}
          id={`cancel-delete-${project.id}`}
          style={{
            padding: '6px 14px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            color: '#888',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          id={`confirm-delete-${project.id}`}
          style={{
            padding: '6px 16px',
            background: deleting ? '#7f3232' : '#ef4444',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: deleting ? 'not-allowed' : 'pointer',
          }}
        >
          {deleting ? 'Deleting…' : 'Yes, Delete'}
        </button>
      </div>
    </div>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)       // id currently being deleted
  const [confirmId, setConfirmId] = useState(null)     // id with confirm panel open

  const load = () => {
    setLoading(true)
    getAllProjectsAdmin().then(({ data }) => {
      setProjects(data || [])
      setLoading(false)
    })
  }

  useEffect(load, [])

  const handleDeleteRequest = (project) => {
    setConfirmId(project.id)
  }

  const handleDeleteCancel = () => {
    setConfirmId(null)
  }

  const handleDeleteConfirm = async (project) => {
    setDeleting(project.id)
    const toastId = toast.loading(`Deleting "${project.title}"…`)

    try {
      const { error } = await deleteProject(project.id)
      if (error) {
        toast.error(error.message || 'Delete failed. Please try again.', { id: toastId })
      } else {
        toast.success('Project deleted', { id: toastId })
        setProjects((prev) => prev.filter((p) => p.id !== project.id))
      }
    } catch (err) {
      toast.error('Unexpected error: ' + (err?.message || 'Unknown error'), { id: toastId })
    } finally {
      setDeleting(null)
      setConfirmId(null)
    }
  }

  const handleTogglePublish = async (project) => {
    const newVal = !project.published
    const { error } = await toggleProjectPublished(project.id, newVal)
    if (error) {
      toast.error('Update failed')
    } else {
      setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, published: newVal } : p))
      toast.success(newVal ? 'Published' : 'Unpublished')
    }
  }

  const handleToggleFeatured = async (project) => {
    const newVal = !project.featured
    const { error } = await toggleProjectFeatured(project.id, newVal)
    if (error) {
      toast.error('Update failed')
    } else {
      setProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, featured: newVal } : p))
      toast.success(newVal ? 'Marked as featured' : 'Removed from featured')
    }
  }

  return (
    <>
      <Helmet>
        <title>Projects — Admin · Munna Mollah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '22px', fontWeight: 700, color: '#f2f0eb', marginBottom: '4px' }}>Projects</h1>
            <p style={{ fontSize: '13px', color: '#555' }}>{projects.length} total</p>
          </div>
          <Link
            to="/admin/projects/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              background: '#c8a96e',
              color: '#0a0a0a',
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            <Plus size={15} /> Add Project
          </Link>
        </div>

        {loading ? (
          <p style={{ color: '#444', fontSize: '13px' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#444' }}>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>No projects yet.</p>
            <Link to="/admin/projects/new" style={{ color: '#c8a96e', textDecoration: 'none', fontSize: '13px' }}>Add your first project →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.map((project) => (
              <div key={project.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Main row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: confirmId === project.id ? '#1f1010' : '#1a1a1a',
                    border: `1px solid ${confirmId === project.id ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: confirmId === project.id ? '8px 8px 0 0' : '8px',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: '72px', height: '46px', borderRadius: '4px', overflow: 'hidden', background: '#111', flexShrink: 0 }}>
                    {project.thumbnail_url ? (
                      <img src={project.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#222' }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>
                        {project.title}
                      </p>
                      <Badge type={project.project_type} label={project.project_type} />
                      {project.featured && <span style={{ fontSize: '11px', color: '#c8a96e' }}>★ Featured</span>}
                    </div>
                    <p style={{ fontSize: '12px', color: '#444' }}>
                      {project.category}
                      {project.year && ` · ${project.year}`}
                      {project.slug && ` · /${project.slug}`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    {/* Publish toggle */}
                    <button
                      onClick={() => handleTogglePublish(project)}
                      title={project.published ? 'Unpublish' : 'Publish'}
                      aria-label={project.published ? 'Unpublish project' : 'Publish project'}
                      style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: project.published ? '#4ade80' : '#555', transition: 'color 0.15s' }}
                    >
                      {project.published ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>

                    {/* Featured toggle */}
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                      aria-label={project.featured ? 'Remove from featured' : 'Mark as featured'}
                      style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: project.featured ? '#c8a96e' : '#555', transition: 'color 0.15s' }}
                    >
                      {project.featured ? <Star size={15} fill="#c8a96e" /> : <StarOff size={15} />}
                    </button>

                    {/* View on site */}
                    {project.published && (
                      <a
                        href={`/work/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on site"
                        style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: '#555', display: 'inline-flex', textDecoration: 'none' }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {/* Edit */}
                    <Link
                      to={`/admin/projects/edit/${project.id}`}
                      title="Edit project"
                      style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: '#888', display: 'inline-flex', textDecoration: 'none', transition: 'color 0.15s' }}
                    >
                      <Edit size={15} />
                    </Link>

                    {/* Delete — opens inline confirm, no window.confirm */}
                    {confirmId === project.id ? (
                      <button
                        onClick={handleDeleteCancel}
                        title="Cancel delete"
                        aria-label="Cancel delete"
                        style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: '#ff6b6b' }}
                      >
                        <X size={15} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteRequest(project)}
                        disabled={deleting === project.id}
                        title="Delete project"
                        aria-label="Delete project"
                        id={`delete-btn-${project.id}`}
                        style={{ padding: '6px 8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px', color: '#444', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline confirm panel */}
                {confirmId === project.id && (
                  <DeleteConfirm
                    project={project}
                    onConfirm={() => handleDeleteConfirm(project)}
                    onCancel={handleDeleteCancel}
                    deleting={deleting === project.id}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
