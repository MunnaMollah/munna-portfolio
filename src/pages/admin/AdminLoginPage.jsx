import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const { user, signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: err } = await signIn(email, password)
    if (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Helmet>
        <title>Admin Login — Munna Mollah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        style={{
          minHeight: '100vh',
          background: '#0f0f0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f2f0eb' }}>
              Munna Mollah
            </p>
            <p style={{ fontSize: '11px', color: '#444', marginTop: '4px', letterSpacing: '0.06em' }}>
              Admin Dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h1 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f2f0eb', marginBottom: '4px' }}>
              Sign in
            </h1>

            {error && (
              <div style={{ padding: '12px 16px', background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: '4px', fontSize: '13px', color: '#ff6b6b' }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="admin-email" className="admin-label">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="admin-input"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="admin-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="admin-input"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#444',
                    padding: '4px',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              id="admin-login-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: submitting ? '#8a7148' : '#c8a96e',
                color: '#0a0a0a',
                fontFamily: 'DM Sans, Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                marginTop: '4px',
              }}
            >
              <LogIn size={15} />
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
