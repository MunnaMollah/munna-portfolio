import { motion } from 'framer-motion'
import { Zap, Gamepad2, Share2, Megaphone, Mic2, Layers, MapPin, Play } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES } from '@/lib/staticData'

const ICONS = { Zap, Gamepad2, Share2, Megaphone, Mic2, Layers, MapPin, Play }

export default function Services() {
  return (
    <section
      style={{
        padding: 'var(--section-padding) clamp(20px, 5vw, 80px)',
        background: '#0f0f0f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-label="Services"
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <SectionHeading
          label="What I Do"
          title="Services"
          subtitle="From short clips to long-form content — every edit is built around pacing, storytelling and the platform it lives on."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px, 25vw, 300px), 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] || Play
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                style={{
                  padding: 'clamp(24px, 3vw, 36px)',
                  background: '#0f0f0f',
                  transition: 'background 0.25s ease',
                  cursor: 'default',
                }}
                whileHover={{ backgroundColor: '#141414' }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(200, 169, 110, 0.08)',
                    border: '1px solid rgba(200, 169, 110, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Icon size={18} color="#c8a96e" />
                </div>
                <h3
                  style={{
                    fontFamily: 'DM Sans, Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: '#f2f0eb',
                    marginBottom: '8px',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.65,
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
