import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getDashboardStats } from '@/services/projectService'
import { FolderOpen, Star, User, Eye, EyeOff, Plus, Clock } from 'lucide-react'

function StatCard({ value, label, icon: Icon, color = '#c8a96e' }) {
  return (
    <div
      style={{
        background: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>{label}</p>
        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={14} color={color} />
        </div>
      </div>
      <p style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '32px', fontWeight: 800, color: '#f2f0eb', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </p>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardStats().then(({ data }) => {
      setStats(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard — Admin · Munna Mollah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ padding: '32px', maxWidth: '1000px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#f2f0eb', marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ fontSize: '13px', color: '#555' }}>Overview of your portfolio content.</p>
        </div>

        {loading ? (
          <p style={{ color: '#444', fontSize: '13px' }}>Loading…</p>
        ) : stats ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              <StatCard value={stats.total} label="Total Projects" icon={FolderOpen} />
              <StatCard value={stats.published} label="Published" icon={Eye} color="#4ade80" />
              <StatCard value={stats.drafts} label="Drafts" icon={EyeOff} color="#888" />
              <StatCard value={stats.featured} label="Featured" icon={Star} color="#c8a96e" />
              <StatCard value={stats.personal} label="Personal" icon={User} color="#818cf8" />
              <StatCard value={stats.placeholder} label="Placeholders" icon={Clock} color="#555" />
            </div>

            {/* Quick actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <Link
                to="/admin/projects/new"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#c8a96e',
                  color: '#0a0a0a',
                  fontFamily: 'DM Sans, Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <Plus size={15} /> Add Project
              </Link>
              <Link
                to="/admin/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#1a1a1a',
                  color: '#f2f0eb',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'DM Sans, Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                Manage Projects
              </Link>
            </div>

            {/* Recent projects */}
            {stats.recent?.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
                  Recent Projects
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {stats.recent.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '6px',
                        gap: '16px',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#f2f0eb', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.title}
                        </p>
                        <p style={{ fontSize: '12px', color: '#444' }}>{p.category}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '100px',
                          fontSize: '11px',
                          fontWeight: 500,
                          background: p.published ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
                          color: p.published ? '#4ade80' : '#555',
                          border: `1px solid ${p.published ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.06)'}`,
                        }}>
                          {p.published ? 'Live' : 'Draft'}
                        </span>
                        <Link to={`/admin/projects/edit/${p.id}`} style={{ fontSize: '12px', color: '#c8a96e', textDecoration: 'none' }}>
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  )
}
