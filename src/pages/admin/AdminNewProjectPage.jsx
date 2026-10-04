import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ProjectForm from '@/components/project/ProjectForm'
import { createProject } from '@/services/projectService'
import toast from 'react-hot-toast'

export default function AdminNewProjectPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    setSubmitting(true)
    const { data: created, error } = await createProject(data)
    if (error) {
      toast.error('Failed to create project: ' + error.message)
    } else {
      toast.success('Project created!')
      navigate('/admin/projects')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>New Project — Admin · Munna Mollah</title>
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
            New Project
          </h1>
        </div>

        <ProjectForm onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </>
  )
}
