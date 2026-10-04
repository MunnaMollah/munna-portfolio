import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/project/ProjectCard'
import { getPublishedProjects } from '@/services/projectService'
import { WORK_FILTERS } from '@/lib/staticData'

export default function WorkPage() {
  const [projects, setProjects] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublishedProjects().then(({ data }) => {
      setProjects(data || [])
      setFiltered(data || [])
      setLoading(false)
    })
  }, [])

  const applyFilters = useCallback(
    (filterLabel, query) => {
      let result = [...projects]

      // Find the filter definition
      const filterDef = WORK_FILTERS.find((f) => f.label === filterLabel) || WORK_FILTERS[0]

      if (filterDef.match === 'category') {
        result = result.filter((p) => p.category === filterDef.value)
      } else if (filterDef.match === 'type') {
        result = result.filter((p) => p.project_type === filterDef.value)
      }
      // 'all' → no filter

      if (query.trim()) {
        const q = query.toLowerCase()
        result = result.filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        )
      }

      setFiltered(result)
    },
    [projects]
  )

  useEffect(() => {
    applyFilters(activeFilter, search)
  }, [activeFilter, search, applyFilters])

  return (
    <>
      <Helmet>
        <title>Work — Munna Mollah Video Editor</title>
        <meta name="description" content="Browse all video editing projects by Munna Mollah — short-form reels, gaming, advertising, travel, personal films and more." />
        <meta property="og:title" content="Work — Munna Mollah Video Editor" />
        <link rel="canonical" href="https://munnamollah.com/work" />
      </Helmet>

      <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#0a0a0a' }}>
        {/* Page header */}
        <div
          style={{
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) clamp(40px, 5vw, 60px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            maxWidth: '1320px',
            margin: '0 auto',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '16px' }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            style={{
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#f2f0eb',
              marginBottom: '24px',
            }}
          >
            All Work
          </motion.h1>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{ marginBottom: '32px', maxWidth: '360px' }}
          >
            <input
              type="search"
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="work-search"
              aria-label="Search projects"
              style={{
                width: '100%',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '10px 16px',
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '14px',
                color: '#f2f0eb',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </motion.div>

          {/* Filter pills — fixed list from WORK_FILTERS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
            role="group"
            aria-label="Filter by category"
          >
            {WORK_FILTERS.map((f) => {
              const isActive = activeFilter === f.label
              return (
                <button
                  key={f.label}
                  onClick={() => setActiveFilter(f.label)}
                  aria-pressed={isActive}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    background: isActive ? 'rgba(200,169,110,0.1)' : 'transparent',
                    fontFamily: 'DM Sans, Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isActive ? '#c8a96e' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Grid — single unified grid, consistent card sizing */}
        <div
          style={{
            padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px)',
            maxWidth: '1320px',
            margin: '0 auto',
          }}
        >
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={{ aspectRatio: '16/9', background: '#111', borderRadius: '4px' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '13px', color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                No projects found
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 28vw, 400px), 1fr))',
                gap: 'clamp(16px, 2.5vw, 32px)',
                alignItems: 'start',
              }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
