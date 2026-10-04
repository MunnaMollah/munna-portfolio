import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0, 0, 1] } },
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}
      aria-label="Hero — Munna Mollah Video Editor"
    >
      {/* Hero image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/assets/photos/hero.jpg"
          alt="Munna Mollah — filmmaker at sunset on the beach"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
          fetchpriority="high"
        />
        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0) 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(100px, 15vw, 160px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
          maxWidth: '1320px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c8a96e',
              marginBottom: '24px',
            }}
          >
            Video Editor & Content Creator
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: 'clamp(48px, 8vw, 110px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#f2f0eb',
              marginBottom: '28px',
              maxWidth: '900px',
            }}
          >
            MUNNA
            <br />
            MOLLAH
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: 'rgba(242, 240, 235, 0.75)',
              fontWeight: 300,
              maxWidth: '520px',
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            Turning raw footage into content people actually want to watch.
          </motion.p>

          {/* Positioning tags */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'rgba(242, 240, 235, 0.4)',
              textTransform: 'uppercase',
              marginBottom: '48px',
            }}
          >
            Short-form · Gaming · Advertising · Social Media · Visual Storytelling
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link
              to="/work"
              id="hero-view-work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 32px',
                background: '#c8a96e',
                color: '#0a0a0a',
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '3px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d4b87a'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,169,110,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#c8a96e'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View My Work
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              id="hero-contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 32px',
                background: 'transparent',
                color: '#f2f0eb',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '3px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Let's Work Together
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: 'clamp(20px, 5vw, 80px)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
