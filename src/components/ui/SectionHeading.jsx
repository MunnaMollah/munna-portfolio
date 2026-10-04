import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionHeading({ label, title, subtitle, centered = false, light = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      style={{
        textAlign: centered ? 'center' : 'left',
        marginBottom: 'clamp(40px, 6vw, 72px)',
      }}
    >
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            marginBottom: '16px',
          }}
        >
          {label}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay: 0.06 }}
        style={{
          fontFamily: 'DM Sans, Inter, sans-serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: light ? '#f2f0eb' : '#f2f0eb',
          marginBottom: subtitle ? '20px' : 0,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.12 }}
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: '#8a8a8a',
            maxWidth: centered ? '560px' : '480px',
            margin: centered ? '0 auto' : '0',
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
