import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/staticData'

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#0f0f0f',
      }}
      aria-label="Statistics"
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(32px, 5vw, 60px)',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.25, 0, 0, 1], delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#f2f0eb',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#555',
              }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
