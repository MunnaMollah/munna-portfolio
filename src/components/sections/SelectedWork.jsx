import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/project/ProjectCard'
import { getFeaturedProjects } from '@/services/projectService'

export default function SelectedWork() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProjects(8).then(({ data }) => {
      setProjects(data || [])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section style={{ padding: 'var(--section-padding) clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ aspectRatio: '16/10', background: '#111', borderRadius: '4px', animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!projects.length) return null

  return (
    <section
      style={{
        padding: 'var(--section-padding) clamp(20px, 5vw, 80px)',
        background: '#0a0a0a',
      }}
      id="selected-work"
      aria-label="Selected Work"
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <SectionHeading
            label="Portfolio"
            title="Selected Work"
            subtitle="Recent editing and filmmaking work across social content, advertising, gaming and visual storytelling."
          />
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/work"
              id="selected-work-view-all"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#8a8a8a',
                textDecoration: 'none',
                transition: 'color 0.2s',
                paddingBottom: '2px',
                borderBottom: '1px solid #333',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f2f0eb'
                e.currentTarget.style.borderColor = '#f2f0eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8a8a8a'
                e.currentTarget.style.borderColor = '#333'
              }}
            >
              View All Work
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Adaptive grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: projects.length === 1
              ? '1fr'
              : projects.length === 2
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fill, minmax(clamp(280px, 30vw, 420px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 32px)',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
