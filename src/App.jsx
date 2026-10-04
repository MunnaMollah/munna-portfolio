import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layouts
import PublicLayout from '@/components/layout/PublicLayout'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

// Public pages
import HomePage from '@/pages/HomePage'
import WorkPage from '@/pages/WorkPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import NotFoundPage from '@/pages/NotFoundPage'

// Admin pages
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import AdminLayout from '@/pages/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage'
import AdminNewProjectPage from '@/pages/admin/AdminNewProjectPage'
import AdminEditProjectPage from '@/pages/admin/AdminEditProjectPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

export default function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#f2f0eb',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'DM Sans, Inter, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#c8a96e', secondary: '#0a0a0a' },
          },
          error: {
            iconTheme: { primary: '#ff6b6b', secondary: '#0a0a0a' },
          },
        }}
      />

      <Routes>
        {/* ─── Public Routes ─── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* ─── Admin Auth ─── */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ─── Protected Admin Routes ─── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="projects/new" element={<AdminNewProjectPage />} />
          <Route path="projects/edit/:id" element={<AdminEditProjectPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* ─── 404 ─── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
