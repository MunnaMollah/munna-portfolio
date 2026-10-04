import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '@/components/ui/SectionHeading'

export default function AboutPreview() {
  return (
    <section
      style={{
        padding: 'var(--section-padding) clamp(20px, 5vw, 80px)',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="About Munna Mollah"
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'center',
        }}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              borderRadius: '4px',
              overflow: 'hidden',
              aspectRatio: '4 / 5',
              background: '#111',
            }}
          >
            <img
              src="/assets/photos/about-camera.jpg"
              alt="Munna Mollah holding a camera on a gimbal"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
          {/* Accent line */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '60%',
              height: '4px',
              background: 'linear-gradient(to right, #c8a96e, transparent)',
              borderRadius: '2px',
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1], delay: 0.1 }}
        >
          <SectionHeading
            label="About"
            title={
              <>
                A Freelancer.<br />
                A Video Editor.<br />
                A Creator.
              </>
            }
          />

          <p
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: '#8a8a8a',
              lineHeight: 1.75,
              marginBottom: '24px',
            }}
          >
            I'm Munna, a freelance video editor and content creator from Bangladesh, working with
            clients worldwide since 2020. I've worked across a wide range of content — from
            short-form social videos and gaming edits to advertisements, talking-head content and
            travel projects.
          </p>
          <p
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: '#666',
              lineHeight: 1.75,
              marginBottom: '40px',
            }}
          >
            My approach is simple: understand what the content needs to achieve, then build the
            edit around pacing, storytelling, sound and visual detail.
          </p>

          {/* Software tags */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['Premiere Pro', 'After Effects', 'DaVinci Resolve'].map((tool) => (
              <span
                key={tool}
                style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: '#8a8a8a',
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          <Link
            to="/about"
            id="about-preview-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#c8a96e',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,110,0.4)',
              paddingBottom: '2px',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c8a96e')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)')}
          >
            More About Me
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
