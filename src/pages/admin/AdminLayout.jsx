import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, FolderOpen, Plus, Settings, LogOut, ExternalLink } from 'lucide-react'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/admin/projects/new', icon: Plus, label: 'Add Project' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          minHeight: '100vh',
          background: '#111',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Brand */}
        <div style={{ padding: '0 20px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f2f0eb' }}>
            Munna Mollah
          </p>
          <p style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>Admin</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? '#f2f0eb' : '#666',
                background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                transition: 'all 0.15s',
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 500, color: '#444', transition: 'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
          >
            <ExternalLink size={14} /> View Site
          </a>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#444', transition: 'color 0.15s', textAlign: 'left' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  )
}
