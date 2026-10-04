import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Play } from 'lucide-react'
import { getProjectBySlug, getRelatedProjects } from '@/services/projectService'
import ProjectCard from '@/components/project/ProjectCard'

// Map stored aspect_ratio string to a CSS padding-bottom percentage
// for the classic padding-trick iframe embed
function ratioPaddingBottom(ratio) {
  const map = {
    '16:9': '56.25%',
    '9:16': '177.78%',
    '4:5':  '125%',
    '1:1':  '100%',
    '4:3':  '75%',
    '16:10':'62.5%',
    'other':'56.25%',
  }
  return map[ratio] || '56.25%'
}

const PORTRAIT_RATIOS = new Set(['9:16', '4:5'])

/**
 * Video embed respecting native aspect ratio.
 * Portrait players (9:16, 4:5) are capped in width so they
 * don't stretch across the full viewport on desktop.
 */
function VideoEmbed({ url, aspectRatio = '16:9' }) {
  if (!url) return null

  const isPortrait = PORTRAIT_RATIOS.has(aspectRatio)
  const paddingBottom = ratioPaddingBottom(aspectRatio)

  // Max width for portrait so it looks phone-sized and natural
  const containerStyle = {
    margin: isPortrait ? '0 auto' : undefined,
    maxWidth: isPortrait ? '360px' : undefined,
    width: '100%',
  }

  const makeIframeWrapper = (src, title, allowStr) => (
    <div style={containerStyle}>
      <div
        style={{
          position: 'relative',
          paddingBottom,
          height: 0,
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: isPortrait ? '0 24px 64px rgba(0,0,0,0.6)' : undefined,
        }}
      >
        <iframe
          src={src}
          title={title}
          allow={allowStr}
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  )

  // YouTube
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return makeIframeWrapper(
      `https://www.youtube.com/embed/${ytMatch[1]}`,
      'Project video',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    )
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return makeIframeWrapper(
      `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      'Project video',
      'autoplay; fullscreen; picture-in-picture'
    )
  }

  // Direct link fallback
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        background: 'rgba(200,169,110,0.1)',
        border: '1px solid rgba(200,169,110,0.25)',
        borderRadius: '3px',
        color: '#c8a96e',
        fontFamily: 'DM Sans, Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: '0.05em',
      }}
    >
      <Play size={14} /> Watch Video <ExternalLink size={12} />
    </a>
  )
}

function MetaItem({ label, value }) {
  if (!value) return null
  if (Array.isArray(value) && value.length === 0) return null
  return (
    <div>
      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>
        {label}
      </p>
      {Array.isArray(value) ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {value.map((v, i) => (
            <span
              key={i}
              style={{
                padding: '4px 12px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '12px',
                color: '#8a8a8a',
              }}
            >
              {v}
            </span>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: '#f2f0eb', fontWeight: 500 }}>{value}</p>
      )}
    </div>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProjectBySlug(slug).then(({ data, error }) => {
      if (error || !data) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setProject(data)
      setLoading(false)
      if (data.category) {
        getRelatedProjects(data.id, data.category, 3).then(({ data: rel }) => {
          setRelated(rel || [])
        })
      }
    })
  }, [slug])

  if (loading) {
    return (
      <div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#444', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading…</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <p style={{ fontSize: '48px', fontWeight: 800, color: '#222' }}>404</p>
        <p style={{ color: '#555', fontSize: '14px' }}>Project not found.</p>
        <Link to="/work" style={{ color: '#c8a96e', fontSize: '13px', textDecoration: 'none' }}>← Back to Work</Link>
      </div>
    )
  }

  const ratio = project.aspect_ratio || '16:9'
  const isPortrait = PORTRAIT_RATIOS.has(ratio)

  return (
    <>
      <Helmet>
        <title>{project.title} — Munna Mollah</title>
        <meta name="description" content={project.description || `${project.title} — ${project.category} project by Munna Mollah.`} />
        <meta property="og:title" content={`${project.title} — Munna Mollah`} />
        <meta property="og:image" content={project.thumbnail_url || '/assets/photos/hero.jpg'} />
        <link rel="canonical" href={`https://munnamollah.com/work/${project.slug}`} />
      </Helmet>

      <article style={{ paddingTop: '72px', background: '#0a0a0a', minHeight: '100vh' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        {isPortrait ? (
          // Portrait hero: thumbnail centred with blurred backdrop, no crop
          <div
            style={{
              position: 'relative',
              width: '100%',
              background: '#0f0f0f',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'clamp(320px, 55vh, 620px)',
            }}
          >
            {/* Blurred background fill */}
            {project.thumbnail_url && (
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
                  filter: 'blur(28px) brightness(0.25) saturate(1.1)',
                  transform: 'scale(1.1)',
                }}
              />
            )}
            {/* Centred portrait thumbnail */}
            {project.thumbnail_url && (
              <img
                src={project.thumbnail_url}
                alt={project.title}
                fetchpriority="high"
                style={{
                  position: 'relative',
                  zIndex: 1,
                  height: 'clamp(280px, 50vh, 560px)',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '4px',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                }}
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.95) 100%)', zIndex: 2 }} />

            {/* Back link */}
            <div style={{ position: 'absolute', top: '24px', left: 'clamp(20px, 5vw, 80px)', zIndex: 10 }}>
              <Link
                to="/work"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <ArrowLeft size={14} /> Back to Work
              </Link>
            </div>

            {/* Overlay text */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 80px)', zIndex: 3 }}>
              <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
                {project.project_type === 'personal' && (
                  <span style={{ padding: '4px 12px', borderRadius: '100px', background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '16px', display: 'inline-block' }}>
                    Personal Project
                  </span>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f2f0eb', lineHeight: 1.05 }}
                >
                  {project.title}
                </motion.h1>
                <p style={{ fontSize: '13px', color: '#888', marginTop: '10px', letterSpacing: '0.04em' }}>
                  {project.category}{project.year && ` · ${project.year}`}{project.client && ` · ${project.client}`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Landscape hero: full-width cover image
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: '70vh',
              overflow: 'hidden',
              background: '#0f0f0f',
            }}
          >
            {project.thumbnail_url && (
              <img
                src={project.thumbnail_url}
                alt={project.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                fetchpriority="high"
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)' }} />

            {/* Back link */}
            <div style={{ position: 'absolute', top: '24px', left: 'clamp(20px, 5vw, 80px)', zIndex: 2 }}>
              <Link
                to="/work"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <ArrowLeft size={14} /> Back to Work
              </Link>
            </div>

            {/* Overlay text */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 80px)' }}>
              <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
                {project.project_type === 'personal' && (
                  <span style={{ padding: '4px 12px', borderRadius: '100px', background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.3)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '16px', display: 'inline-block' }}>
                    Personal Project
                  </span>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(28px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f2f0eb', lineHeight: 1.05 }}
                >
                  {project.title}
                </motion.h1>
                <p style={{ fontSize: '13px', color: '#888', marginTop: '10px', letterSpacing: '0.04em' }}>
                  {project.category}{project.year && ` · ${project.year}`}{project.client && ` · ${project.client}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 80px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(48px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            {/* Main content */}
            <div>
              {project.description && (
                <div style={{ marginBottom: '48px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '16px' }}>
                    About This Project
                  </p>
                  <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#8a8a8a', lineHeight: 1.75 }}>
                    {project.description}
                  </p>
                </div>
              )}

              {project.video_url && (
                <div style={{ marginBottom: '48px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '16px' }}>
                    Watch
                  </p>
                  <VideoEmbed url={project.video_url} aspectRatio={ratio} />
                </div>
              )}
            </div>

            {/* Sidebar meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <MetaItem label="Category" value={project.category} />
              <MetaItem label="Role" value={project.role} />
              <MetaItem label="Client" value={project.client} />
              <MetaItem label="Year" value={project.year} />
              <MetaItem label="Services" value={project.services} />
              <MetaItem label="Tools" value={project.tools} />
            </div>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div style={{ marginTop: 'clamp(60px, 8vw, 100px)', paddingTop: 'clamp(40px, 5vw, 60px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '32px' }}>
                Related Projects
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', alignItems: 'start' }}>
                {related.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom nav */}
          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              to="/work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f0eb')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
            >
              <ArrowLeft size={14} /> All Work
            </Link>
            <Link
              to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c8a96e', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Start a Project <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
