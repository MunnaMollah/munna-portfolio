import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectForm from '@/components/project/ProjectForm'
import { getAllProjectsAdmin, updateProject } from '@/services/projectService'
import toast from 'react-hot-toast'

export default function AdminEditProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getAllProjectsAdmin().then(({ data }) => {
      const found = data?.find((p) => p.id === id)
      if (!found) {
        toast.error('Project not found')
        navigate('/admin/projects')
        return
      }
      setProject(found)
      setLoading(false)
    })
  }, [id, navigate])

  const handleSubmit = async (data) => {
    setSubmitting(true)
    const { error } = await updateProject(id, data)
    if (error) {
      toast.error('Update failed: ' + error.message)
    } else {
      toast.success('Project updated!')
      navigate('/admin/projects')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>Edit Project — Admin · Munna Mollah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ padding: '32px', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/admin/projects')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '13px', padding: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft size={14} /> Projects
          </button>
          <span style={{ color: '#333' }}>/</span>
          <h1 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f2f0eb' }}>
            {loading ? 'Loading…' : `Edit: ${project?.title}`}
          </h1>
        </div>

        {loading ? (
          <p style={{ color: '#444', fontSize: '13px' }}>Loading project…</p>
        ) : (
          <ProjectForm
            initialData={project}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </>
  )
}
