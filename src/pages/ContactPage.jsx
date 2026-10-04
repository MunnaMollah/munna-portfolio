import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Send, Mail, ExternalLink } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build mailto link as reliable fallback
    const subject = encodeURIComponent(`Project Inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.project}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:munna.mollah39@gmail.com?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <>
      <Helmet>
        <title>Contact Ã¢â‚¬â€ Munna Mollah Video Editor</title>
        <meta name="description" content="Start a video editing project with Munna Mollah. Get in touch to discuss your content needs." />
        <link rel="canonical" href="https://munnamollah.com/contact" />
      </Helmet>

      <div style={{ paddingTop: '72px', background: '#0a0a0a', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 'clamp(60px, 8vw, 100px)', alignItems: 'start' }}>
            {/* Left: heading + info */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '20px' }}
              >
                Contact
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.06 }}
                style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: '#f2f0eb', marginBottom: '28px' }}
              >
                LET'S
                <br />
                WORK
                <br />
                TOGETHER
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', color: '#666', lineHeight: 1.75, marginBottom: '48px', maxWidth: '380px' }}
              >
                Tell me what you're working on and what you need. I'll get back to you with the best way to approach the edit.
              </motion.p>

              {/* Direct links */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <a
                  href="mailto:munna.mollah39@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#8a8a8a', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f0eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
                >
                  <Mail size={16} color="#c8a96e" />
                  munna.mollah39@gmail.com
                </a>

                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
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
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#444',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#c8a96e')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
                    >
                      {link.label} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              {status === 'sent' ? (
                <div
                  style={{
                    padding: '48px',
                    background: '#0f0f0f',
                    border: '1px solid rgba(200,169,110,0.2)',
                    borderRadius: '6px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '32px', marginBottom: '16px' }}>Ã¢Å“â€œ</p>
                  <p style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '18px', fontWeight: 700, color: '#f2f0eb', marginBottom: '12px' }}>
                    Message Opened
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
                    Your email client should have opened. If not, email me directly at munna.mollah39@gmail.com
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  noValidate
                >
                  {[
                    { name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Full name' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
                    { name: 'project', label: 'Project Type', type: 'text', required: false, placeholder: 'e.g. YouTube video, Reels, Gaming highlightsÃ¢â‚¬Â¦' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={`contact-${field.name}`}
                        style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}
                      >
                        {field.label} {field.required && <span style={{ color: '#c8a96e' }}>*</span>}
                      </label>
                      <input
                        id={`contact-${field.name}`}
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        style={{
                          width: '100%',
                          background: '#0f0f0f',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '4px',
                          padding: '12px 16px',
                          fontFamily: 'DM Sans, Inter, sans-serif',
                          fontSize: '14px',
                          color: '#f2f0eb',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}
                    >
                      Message <span style={{ color: '#c8a96e' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project, timeline and any specific requirementsÃ¢â‚¬Â¦"
                      style={{
                        width: '100%',
                        background: '#0f0f0f',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px',
                        padding: '12px 16px',
                        fontFamily: 'DM Sans, Inter, sans-serif',
                        fontSize: '14px',
                        color: '#f2f0eb',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.65,
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
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
                    Send Message <Send size={15} />
                  </button>

                  <p style={{ fontSize: '12px', color: '#333', lineHeight: 1.6 }}>
                    This will open your email client. Alternatively, email me directly at{' '}
                    <a href="mailto:munna.mollah39@gmail.com" style={{ color: '#555' }}>
                      munna.mollah39@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}



