import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 clamp(20px, 5vw, 80px)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'DM Sans, Inter, sans-serif',
            fontWeight: 700,
            fontSize: '15px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#f2f0eb',
            textDecoration: 'none',
          }}
          aria-label="Munna Mollah — Home"
        >
          Munna Mollah
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? '#f2f0eb' : '#8a8a8a',
                textDecoration: 'none',
                transition: 'color 0.2s',
              })}
              onMouseEnter={(e) => (e.target.style.color = '#f2f0eb')}
              onMouseLeave={(e) => {
                if (!e.target.classList.contains('active')) e.target.style.color = '#8a8a8a'
              }}
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '9px 20px',
              background: '#c8a96e',
              color: '#0a0a0a',
              fontFamily: 'DM Sans, Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '3px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
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
            Let's Work Together
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#f2f0eb',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="show-mobile"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <style>{`
          @media (max-width: 768px) {
            .hidden-mobile { display: none !important; }
            .show-mobile { display: flex !important; }
          }
          @media (min-width: 769px) {
            .show-mobile { display: none !important; }
          }
        `}</style>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0, 0, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: '#0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <NavLink
                  to={link.to}
                  style={({ isActive }) => ({
                    fontFamily: 'DM Sans, Inter, sans-serif',
                    fontSize: '32px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: isActive ? '#c8a96e' : '#f2f0eb',
                    textDecoration: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 32px',
                  background: '#c8a96e',
                  color: '#0a0a0a',
                  fontFamily: 'DM Sans, Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  textDecoration: 'none',
                }}
              >
                Let's Work Together
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
