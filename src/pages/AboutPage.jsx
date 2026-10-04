import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Munna Mollah Video Editor & Content Creator</title>
        <meta name="description" content="Munna Mollah is a freelance video editor and content creator from Bangladesh. 600+ projects, 5+ years experience, working with clients worldwide." />
        <link rel="canonical" href="https://munnamollah.com/about" />
      </Helmet>

      <div style={{ paddingTop: '72px', background: '#0a0a0a', minHeight: '100vh' }}>
        {/* Header */}
        <div
          style={{
            padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 80px)',
            maxWidth: '1320px',
            margin: '0 auto',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '20px' }}
          >
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06 }}
            style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: '#f2f0eb', marginBottom: '0' }}
          >
            A FREELANCER.
            <br />
            A VIDEO EDITOR.
            <br />
            <span style={{ color: '#c8a96e' }}>A CREATOR.</span>
          </motion.h1>
        </div>

        {/* Main content */}
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 80px)',
          }}
        >
          {/* Grid: photo + text */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(48px, 7vw, 90px)',
              alignItems: 'start',
              paddingBottom: 'clamp(60px, 8vw, 100px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/5', background: '#111', position: 'relative' }}>
                <img
                  src="/assets/photos/about-camera.jpg"
                  alt="Munna Mollah holding a camera and gimbal"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              {/* Caption */}
              <p style={{ fontSize: '12px', color: '#333', marginTop: '12px', letterSpacing: '0.04em' }}>
                Munna Mollah · Video Editor & Content Creator
              </p>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              style={{ paddingTop: 'clamp(0px, 4vw, 40px)' }}
            >
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: '#8a8a8a', lineHeight: 1.8, marginBottom: '28px' }}>
                I'm Munna, a freelance video editor and content creator from Bangladesh, working with clients worldwide since 2020. I started freelancing through online platforms and have worked across a wide range of content — from short-form social videos and gaming edits to advertisements, talking-head content and travel projects.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#555', lineHeight: 1.8, marginBottom: '28px' }}>
                My approach is simple: understand what the content needs to achieve, then build the edit around pacing, storytelling, sound and visual detail.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#555', lineHeight: 1.8, marginBottom: '48px' }}>
                Beyond client work, I'm also interested in filmmaking, photography and travel — creating my own visual projects and continuing to develop my storytelling style.
              </p>

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px', padding: '32px', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
                {[
                  { val: '600+', label: 'Projects Completed' },
                  { val: '5+', label: 'Years Freelancing' },
                  { val: 'Level 2', label: 'Fiverr Seller' },
                  { val: '2020', label: 'Started Freelancing' },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#f2f0eb', marginBottom: '4px' }}>{s.val}</p>
                    <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '14px' }}>Software</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve'].map((t) => (
                    <span key={t} style={{ padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '12px', color: '#8a8a8a' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '13px 28px',
                    background: '#c8a96e',
                    color: '#0a0a0a',
                    fontFamily: 'DM Sans, Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#d4b87a'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#c8a96e'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Work With Me <ArrowRight size={15} />
                </Link>
                <a
                  href="https://www.fiverr.com/s/WeE4mQX"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '13px 24px',
                    background: 'transparent',
                    color: '#8a8a8a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'DM Sans, Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f2f0eb'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8a8a8a'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  Fiverr Profile <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Second photo — portrait layout, centred */}
          <div style={{ padding: 'clamp(60px, 8vw, 100px) 0', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                width: 'clamp(280px, 45vw, 580px)',
                aspectRatio: '3 / 4',
                flexShrink: 0,
              }}
            >
              <img
                src="/assets/photos/about-forest.jpg"
                alt="Munna Mollah looking up through forest canopy"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 65%',
                  display: 'block',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
