import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '@/components/ui/SectionHeading'
import { getPersonalProjects } from '@/services/projectService'

export default function PersonalProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPersonalProjects().then(({ data }) => {
      setProjects(data || [])
      setLoading(false)
    })
  }, [])

  if (loading || !projects.length) return null

  return (
    <section
      style={{
        padding: 'var(--section-padding) clamp(20px, 5vw, 80px)',
        background: '#0f0f0f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="Personal Projects"
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <SectionHeading
          label="Beyond Client Work"
          title="Personal Projects"
          subtitle="Outside client work, I use filmmaking and photography as a way to experiment, travel and develop my own visual style."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 30vw, 400px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay: i * 0.1 }}
            >
              <Link
                to={`/work/${project.slug}`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#111',
                  }}
                  className="personal-card"
                >
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25,0,0,1)',
                    }}
                    className="pc-img"
                  />
                  {/* Overlay */}
                  <div
                    className="pc-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0)',
                      transition: 'background 0.4s',
                    }}
                  />
                  {/* Arrow */}
                  <div
                    className="pc-arrow"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#c8a96e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transform: 'scale(0.6)',
                      transition: 'all 0.3s cubic-bezier(0.25,0,0,1)',
                    }}
                  >
                    <ArrowUpRight size={16} color="#0a0a0a" />
                  </div>

                  {/* Category badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: 'rgba(200,169,110,0.12)',
                      border: '1px solid rgba(200,169,110,0.25)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c8a96e',
                    }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '16px 2px 0' }}>
                  <p style={{ fontSize: '11px', color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {project.year}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'DM Sans, Inter, sans-serif',
                      fontSize: 'clamp(16px, 2vw, 19px)',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#f2f0eb',
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#555',
                        marginTop: '6px',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {project.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .personal-card:hover .pc-img { transform: scale(1.04); }
        .personal-card:hover .pc-overlay { background: rgba(0,0,0,0.3) !important; }
        .personal-card:hover .pc-arrow { opacity: 1 !important; transform: scale(1) !important; }
      `}</style>
    </section>
  )
}
