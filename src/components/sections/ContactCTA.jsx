import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section
      style={{
        padding: 'var(--section-padding) clamp(20px, 5vw, 80px)',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
      }}
      aria-label="Contact call to action"
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            marginBottom: '24px',
          }}
        >
          Work With Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
          style={{
            fontFamily: 'DM Sans, Inter, sans-serif',
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#f2f0eb',
            marginBottom: '24px',
          }}
        >
          HAVE A PROJECT
          <br />
          IN MIND?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: '#666',
            lineHeight: 1.7,
            marginBottom: '48px',
          }}
        >
          Tell me what you're working on and what you need. I'll get back to you with the best way to approach the edit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/contact"
            id="cta-start-project"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
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
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(200,169,110,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#c8a96e'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start a Project
            <ArrowRight size={16} />
          </Link>

          <a
            href="mailto:munna.mollah39@gmail.com"
            id="cta-email"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              background: 'transparent',
              color: '#f2f0eb',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <Mail size={15} />
            Email Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            marginTop: '48px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { label: 'Fiverr',    href: 'https://www.fiverr.com/s/WeE4mQX' },
            { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/munna-molla' },
            { label: 'Instagram', href: 'https://www.instagram.com/munna_ahmed_films/' },
            { label: 'YouTube',   href: 'https://www.youtube.com/@MunnaMollah_Films' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#444',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#c8a96e')}
              onMouseLeave={(e) => (e.target.style.color = '#444')}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
