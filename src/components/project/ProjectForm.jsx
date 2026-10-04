import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image } from 'lucide-react'
import { uploadThumbnail } from '@/services/projectService'

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const CATEGORIES = [
  'Short-form', 'Gaming', 'Advertising', 'Social Media', 'Travel',
  'Talking Head', 'Long-form', 'Personal Film', 'Travel Film', 'Cinematic Film',
  'UGC', 'Motion Graphics', 'Other',
]

const PROJECT_TYPES = [
  { value: 'client', label: 'Client Work' },
  { value: 'personal', label: 'Personal Project' },
  { value: 'placeholder', label: 'Placeholder' },
]

const TOOLS_LIST = ['Adobe Premiere Pro', 'Adobe After Effects', 'DaVinci Resolve', 'Final Cut Pro']
const SERVICES_LIST = [
  'Video Editing', 'Color Grading', 'Sound Design', 'Motion Graphics',
  'Captions / Subtitles', 'Thumbnail Design', 'Cinematography', 'Drone Footage',
  'Visual Storytelling',
]

export default function ProjectForm({ initialData = {}, onSubmit, submitting }) {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    project_type: 'client',
    client: '',
    year: new Date().getFullYear(),
    description: '',
    role: 'Video Editor',
    thumbnail_url: '',
    video_url: '',
    aspect_ratio: '16:9',
    services: [],
    tools: [],
    featured: false,
    published: false,
    display_order: 0,
    ...initialData,
  })
  const [uploadingThumb, setUploadingThumb] = useState(false)
  const [thumbPreview, setThumbPreview] = useState(initialData.thumbnail_url || '')

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleTitleChange = (val) => {
    set('title', val)
    if (!initialData.slug) {
      set('slug', slugify(val))
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return
      const preview = URL.createObjectURL(file)
      setThumbPreview(preview)
      setUploadingThumb(true)
      const projectId = form.id || Date.now().toString()
      const { url, error } = await uploadThumbnail(file, projectId)
      setUploadingThumb(false)
      if (url) {
        set('thumbnail_url', url)
      } else {
        // Fallback: use local preview (won't persist but shows intent)
        set('thumbnail_url', preview)
      }
    },
    [form.id]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const toggleArr = (field, val) => {
    set(field, form[field].includes(val) ? form[field].filter((v) => v !== val) : [...form[field], val])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  const inputStyle = {
    width: '100%',
    background: '#111',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    padding: '10px 14px',
    fontFamily: 'DM Sans, Inter, sans-serif',
    fontSize: '14px',
    color: '#f2f0eb',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#666',
    marginBottom: '6px',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Grid: left main | right sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '28px', alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Title */}
          <div>
            <label style={labelStyle} htmlFor="pf-title">Title *</label>
            <input
              id="pf-title"
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Project title"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle} htmlFor="pf-slug">Slug *</label>
            <input
              id="pf-slug"
              type="text"
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              required
              placeholder="url-friendly-slug"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '13px' }}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle} htmlFor="pf-category">Category *</label>
            <select
              id="pf-category"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              required
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle} htmlFor="pf-description">Description</label>
            <textarea
              id="pf-description"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={5}
              placeholder="Project description…"
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Client + Year */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '16px' }}>
            <div>
              <label style={labelStyle} htmlFor="pf-client">Client</label>
              <input
                id="pf-client"
                type="text"
                value={form.client}
                onChange={(e) => set('client', e.target.value)}
                placeholder="Client name (optional)"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="pf-year">Year</label>
              <input
                id="pf-year"
                type="number"
                value={form.year}
                onChange={(e) => set('year', parseInt(e.target.value))}
                min={2000}
                max={2099}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label style={labelStyle} htmlFor="pf-role">Role</label>
            <input
              id="pf-role"
              type="text"
              value={form.role}
              onChange={(e) => set('role', e.target.value)}
              placeholder="e.g. Video Editor"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Video URL */}
          <div>
            <label style={labelStyle} htmlFor="pf-video">Video URL</label>
            <input
              id="pf-video"
              type="url"
              value={form.video_url}
              onChange={(e) => set('video_url', e.target.value)}
              placeholder="YouTube or Vimeo URL"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Aspect Ratio */}
          <div>
            <label style={labelStyle}>Aspect Ratio</label>
            <p style={{ fontSize: '11px', color: '#555', marginBottom: '10px', lineHeight: 1.5 }}>
              Match the shape of your video/thumbnail.
              Short-form Reels → <strong style={{ color: '#888' }}>9:16</strong> ·
              YouTube/films → <strong style={{ color: '#888' }}>16:9</strong> ·
              Square → <strong style={{ color: '#888' }}>1:1</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { value: '16:9', label: '16:9', sub: 'YouTube / Films' },
                { value: '9:16', label: '9:16', sub: 'Reels / TikTok' },
                { value: '1:1',  label: '1:1',  sub: 'Square' },
                { value: '4:5',  label: '4:5',  sub: 'Portrait' },
                { value: 'other',label: 'Other', sub: 'Custom' },
              ].map((opt) => {
                const selected = (form.aspect_ratio || '16:9') === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set('aspect_ratio', opt.value)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '6px',
                      border: `1px solid ${selected ? '#c8a96e' : 'rgba(255,255,255,0.08)'}`,
                      background: selected ? 'rgba(200,169,110,0.12)' : 'transparent',
                      color: selected ? '#c8a96e' : '#666',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '3px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>{opt.label}</span>
                    <span style={{ fontSize: '10px', color: selected ? '#a08050' : '#444' }}>{opt.sub}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Thumbnail URL fallback */}
          <div>
            <label style={labelStyle} htmlFor="pf-thumb-url">Thumbnail URL (or use upload above)</label>
            <input
              id="pf-thumb-url"
              type="text"
              value={form.thumbnail_url}
              onChange={(e) => {
                set('thumbnail_url', e.target.value)
                setThumbPreview(e.target.value)
              }}
              placeholder="https://… or /assets/…"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {/* Services */}
          <div>
            <label style={labelStyle}>Services</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES_LIST.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleArr('services', s)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '100px',
                    border: `1px solid ${form.services.includes(s) ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    background: form.services.includes(s) ? 'rgba(200,169,110,0.1)' : 'transparent',
                    color: form.services.includes(s) ? '#c8a96e' : '#666',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <label style={labelStyle}>Tools</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TOOLS_LIST.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleArr('tools', t)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '100px',
                    border: `1px solid ${form.tools.includes(t) ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    background: form.tools.includes(t) ? 'rgba(200,169,110,0.1)' : 'transparent',
                    color: form.tools.includes(t) ? '#c8a96e' : '#666',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Thumbnail upload */}
          <div>
            <label style={labelStyle}>Thumbnail</label>
            <div
              {...getRootProps()}
              style={{
                border: `2px dashed ${isDragActive ? '#c8a96e' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragActive ? 'rgba(200,169,110,0.05)' : '#111',
                transition: 'all 0.2s',
                marginBottom: thumbPreview ? '12px' : 0,
              }}
            >
              <input {...getInputProps()} />
              {uploadingThumb ? (
                <p style={{ fontSize: '13px', color: '#888' }}>Uploading…</p>
              ) : (
                <>
                  <Upload size={20} color="#444" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '12px', color: '#555' }}>
                    {isDragActive ? 'Drop it here' : 'Click or drag to upload'}
                  </p>
                  <p style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>JPG, PNG, WebP · Max 10MB</p>
                </>
              )}
            </div>
            {thumbPreview && (
              <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', aspectRatio: '16/10', background: '#111' }}>
                <img src={thumbPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => { setThumbPreview(''); set('thumbnail_url', '') }}
                  style={{ position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Project type */}
          <div>
            <label style={labelStyle}>Project Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PROJECT_TYPES.map((pt) => (
                <label key={pt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="project_type"
                    value={pt.value}
                    checked={form.project_type === pt.value}
                    onChange={() => set('project_type', pt.value)}
                    style={{ accentColor: '#c8a96e' }}
                  />
                  <span style={{ fontSize: '13px', color: '#888' }}>{pt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { field: 'published', label: 'Published', hint: 'Visible on public site' },
              { field: 'featured', label: 'Featured', hint: 'Show in selected work' },
            ].map(({ field, label, hint }) => (
              <div key={field} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#111', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#f2f0eb', fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: '11px', color: '#444' }}>{hint}</p>
                </div>
                <button
                  type="button"
                  onClick={() => set(field, !form[field])}
                  aria-pressed={form[field]}
                  style={{
                    width: '40px',
                    height: '22px',
                    borderRadius: '100px',
                    background: form[field] ? '#c8a96e' : '#2a2a2a',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    left: form[field] ? '20px' : '2px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                    display: 'block',
                  }} />
                </button>
              </div>
            ))}
          </div>

          {/* Display order */}
          <div>
            <label style={labelStyle} htmlFor="pf-order">Display Order</label>
            <input
              id="pf-order"
              type="number"
              value={form.display_order}
              onChange={(e) => set('display_order', parseInt(e.target.value) || 0)}
              min={0}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#c8a96e')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
            <p style={{ fontSize: '11px', color: '#444', marginTop: '4px' }}>Lower = shown first</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
        <button
          type="submit"
          disabled={submitting}
          id="project-form-submit"
          style={{
            padding: '12px 28px',
            background: submitting ? '#8a7148' : '#c8a96e',
            color: '#0a0a0a',
            fontFamily: 'DM Sans, Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: '6px',
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Saving…' : 'Save Project'}
        </button>
      </div>
    </form>
  )
}
