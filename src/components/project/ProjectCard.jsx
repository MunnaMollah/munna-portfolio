import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// All cards use a uniform 16:9 container so the grid stays clean and consistent.
// Portrait thumbnails (9:16, 4:5) use object-fit: contain + a blurred backdrop
// rather than destructive cropping, preserving composition at editorial quality.
const PORTRAIT_RATIOS = new Set(['9:16', '4:5'])

export default function ProjectCard({ project, index = 0 }) {
  const isPersonal = project.project_type === 'personal'
  const isPlaceholder = project.project_type === 'placeholder'
  const isPortrait = PORTRAIT_RATIOS.has(project.aspect_ratio)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.25, 0, 0, 1], delay: (index % 3) * 0.08 }}
    >
      <Link
        to={`/work/${project.slug}`}
        style={{ display: 'block', textDecoration: 'none' }}
        aria-label={`View project: ${project.title}`}
      >
        {/* Uniform 16:9 card container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            background: '#111',
            aspectRatio: '16 / 9',
          }}
          className="project-card-image"
        >
          {project.thumbnail_url ? (
            <>
              {/* ── Portrait backdrop ────────────────────────────────────────
                  Less blur + higher brightness than before so the card is
                  filled with rich colour instead of a near-black void.
                  The radial vignette draws the eye toward the centred portrait.
              ── */}
              {isPortrait && (
                <>
                  {/* Blurred colour fill */}
                  <img
                    src={project.thumbnail_url}
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'blur(8px) brightness(0.55) saturate(1.5)',
                      transform: 'scale(1.12)', // prevent blur-edge bleed
                    }}
                  />
                  {/* Radial vignette — darkens corners, bright centre */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(ellipse 55% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)',
                      zIndex: 1,
                    }}
                  />
                </>
              )}
              {/* Main thumbnail */}
              <img
                src={project.thumbnail_url}
                alt={project.title}
                loading="lazy"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  objectFit: isPortrait ? 'contain' : 'cover',
                  // Subtle drop-shadow makes the portrait pop against the backdrop
                  filter: isPortrait ? 'drop-shadow(0 6px 24px rgba(0,0,0,0.7))' : undefined,
                  transition: 'transform 0.6s cubic-bezier(0.25, 0, 0, 1)',
                }}
                className="card-img"
              />
            </>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1a1a1a, #111)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '11px', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                No Image
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div
            className="card-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              background: 'rgba(0,0,0,0)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '24px',
              transition: 'background 0.4s ease',
            }}
          >
            <div
              className="card-arrow"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#c8a96e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transform: 'scale(0.7)',
                transition: 'all 0.3s cubic-bezier(0.25, 0, 0, 1)',
              }}
            >
              <ArrowUpRight size={18} color="#0a0a0a" />
            </div>
          </div>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {isPersonal && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: 'rgba(200, 169, 110, 0.15)',
                  border: '1px solid rgba(200, 169, 110, 0.3)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#c8a96e',
                }}
              >
                Personal Project
              </span>
            )}
            {isPlaceholder && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#555',
                }}
              >
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Card info */}
        <div style={{ padding: '20px 4px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#555',
                  marginBottom: '6px',
                }}
              >
                {project.category}
                {project.year && ` · ${project.year}`}
              </p>
              <h3
                style={{
                  fontFamily: 'DM Sans, Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#f2f0eb',
                  lineHeight: 1.25,
                }}
              >
                {project.title}
              </h3>
              {project.client && (
                <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  {project.client}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <style>{`
        article:hover .card-img { transform: scale(1.04); }
        article:hover .card-overlay { background: rgba(0,0,0,0.35) !important; }
        article:hover .card-arrow { opacity: 1 !important; transform: scale(1) !important; }
      `}</style>
    </motion.article>
  )
}
