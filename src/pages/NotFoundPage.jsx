import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found · Munna Mollah</title>
      </Helmet>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
          background: '#0a0a0a',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: '120px', fontWeight: 900, color: '#111', lineHeight: 1, marginBottom: '24px', letterSpacing: '-0.05em', fontFamily: 'DM Sans, Inter, sans-serif' }}
        >
          404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#f2f0eb', marginBottom: '16px' }}
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          style={{ fontSize: '15px', color: '#555', marginBottom: '40px' }}
        >
          This page doesn't exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            to="/"
            style={{
              padding: '12px 28px',
              background: '#c8a96e',
              color: '#0a0a0a',
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '3px',
              textDecoration: 'none',
            }}
          >
            Go Home
          </Link>
          <Link
            to="/work"
            style={{
              padding: '12px 28px',
              background: 'transparent',
              color: '#f2f0eb',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: '3px',
              textDecoration: 'none',
            }}
          >
            View Work
          </Link>
        </motion.div>
      </div>
    </>
  )
}
