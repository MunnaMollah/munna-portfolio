import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const FOOTER_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const SOCIAL_LINKS = [
  { href: 'https://www.fiverr.com/s/WeE4mQX',                    label: 'Fiverr',    external: true },
  { href: 'https://www.linkedin.com/in/munna-molla',             label: 'LinkedIn',  external: true },
  { href: 'https://www.instagram.com/munna_ahmed_films/',        label: 'Instagram', external: true },
  { href: 'https://www.youtube.com/@MunnaMollah_Films',          label: 'YouTube',   external: true },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) 40px',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#f2f0eb',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Munna Mollah
            </Link>
            <p
              style={{
                fontSize: '13px',
                color: '#555',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}
            >
              Video Editor & Content Creator
              <br />
              Bangladesh · Worldwide
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#444',
                marginBottom: '20px',
              }}
            >
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FOOTER_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      style={{
                        fontSize: '14px',
                        color: '#8a8a8a',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#f2f0eb')}
                      onMouseLeave={(e) => (e.target.style.color = '#8a8a8a')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#444',
                marginBottom: '20px',
              }}
            >
              Connect
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      color: '#8a8a8a',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f0eb')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
                  >
                    {link.label}
                    {link.external && <ExternalLink size={11} opacity={0.5} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#444',
                marginBottom: '20px',
              }}
            >
              Start a Project
            </p>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: 1.6 }}>
              Ready to work together?
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f2f0eb',
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '3px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8a96e'
                e.currentTarget.style.color = '#c8a96e'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#f2f0eb'
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '12px', color: '#333' }}>
            © {year} Munna Mollah. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#333' }}>
            Video Editor & Content Creator · Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}
