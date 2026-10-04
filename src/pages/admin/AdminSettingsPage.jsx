import { Helmet } from 'react-helmet-async'

export default function AdminSettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings — Admin · Munna Mollah</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ padding: '32px', maxWidth: '700px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '22px', fontWeight: 700, color: '#f2f0eb', marginBottom: '4px' }}>
            Settings
          </h1>
          <p style={{ fontSize: '13px', color: '#555' }}>Site configuration and content settings.</p>
        </div>

        {/* Sections */}
        {[
          {
            title: 'Contact Info',
            fields: [
              { label: 'Email Address', placeholder: 'munna.mollah39@gmail.com', type: 'email' },
              { label: 'Fiverr Profile URL', placeholder: 'https://www.fiverr.com/s/WeE4mQX', type: 'url' },
              { label: 'LinkedIn URL', placeholder: 'https://www.linkedin.com/in/munna-molla', type: 'url' },
              { label: 'Instagram URL', placeholder: 'https://www.instagram.com/munna_ahmed_films/', type: 'url' },
              { label: 'YouTube Channel URL', placeholder: 'https://www.youtube.com/@MunnaMollah_Films', type: 'url' },
            ],
          },
          {
            title: 'Hero Content',
            fields: [
              { label: 'Hero Tagline', placeholder: 'Turning raw footage into content people actually want to watch.', type: 'text' },
            ],
          },
          {
            title: 'SEO',
            fields: [
              { label: 'Site Title', placeholder: 'Munna Mollah — Video Editor & Content Creator', type: 'text' },
              { label: 'Meta Description', placeholder: 'Freelance video editor...', type: 'text' },
            ],
          },
        ].map((section) => (
          <div
            key={section.title}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f2f0eb', marginBottom: '20px' }}>
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {section.fields.map((field) => (
                <div key={field.label}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#555',
                      marginBottom: '6px',
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled
                    style={{
                      width: '100%',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      fontFamily: 'DM Sans, Inter, sans-serif',
                      fontSize: '14px',
                      color: '#555',
                      cursor: 'not-allowed',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Coming soon note */}
        <div
          style={{
            padding: '16px 20px',
            background: 'rgba(200,169,110,0.05)',
            border: '1px solid rgba(200,169,110,0.15)',
            borderRadius: '6px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#c8a96e', lineHeight: 1.6 }}>
            ⚡ Settings persistence will be available in a future update. For now, update site content directly in the source or via the Supabase dashboard.
          </p>
        </div>
      </div>
    </>
  )
}
