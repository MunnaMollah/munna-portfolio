# Munna Mollah — Portfolio Website

**Video Editor & Content Creator**  
React + Vite + Tailwind CSS + Framer Motion + Supabase

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **Never commit `.env`** — it is in `.gitignore`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> **Note:** The site works without Supabase configured — it will display the 3 personal projects from static data. Configure Supabase to unlock the admin dashboard.

---

## ☁️ Supabase Setup

### Step 1: Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a region close to you
3. Save the database password

### Step 2: Create the database tables

1. In your Supabase dashboard → **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run**

This creates:
- `projects` table with all required fields
- Row Level Security (RLS) policies
- Indexes for performance
- Auto `updated_at` trigger
- Seeds your 3 personal projects

### Step 3: Create a Storage bucket

1. Supabase → **Storage** → **New Bucket**
2. Name: `project-assets`
3. Toggle **Public** → ON
4. Add upload policy:
   - Policy name: `Authenticated upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`

### Step 4: Enable Authentication

1. Supabase → **Authentication** → **Settings**
2. Site URL: your deployed URL (or `http://localhost:5173` for local)
3. Create your admin account:
   - **Authentication → Users → Invite User**
   - Enter your email
   - Check email for magic link → set password

### Step 5: Get API keys

1. Supabase → **Settings → API**
2. Copy `Project URL` → `VITE_SUPABASE_URL`
3. Copy `anon / public` key → `VITE_SUPABASE_ANON_KEY`

> ⚠️ **Never use the `service_role` key in frontend code.**

---

## 🔐 Admin Dashboard

Access: `/admin/login`

After logging in you can:
- View dashboard stats
- Add / edit / delete projects
- Upload thumbnails to Supabase Storage
- Toggle published / featured per project
- Set display order

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/munna-portfolio.git
git push -u origin main

# 2. Go to vercel.com → Import project → Connect GitHub repo
# 3. Add environment variables:
#    VITE_SUPABASE_URL
#    VITE_SUPABASE_ANON_KEY
# 4. Deploy
```

### Cloudflare Pages

```bash
# 1. Push to GitHub (same as above)
# 2. Cloudflare → Pages → Connect to Git → Select repo
# 3. Build settings:
#    Build command: npm run build
#    Output directory: dist
# 4. Add environment variables in Cloudflare dashboard
# 5. Deploy
```

### Architecture

```
GitHub Repository (source code)
        ↓
  Vercel / Cloudflare Pages (hosting)
        ↓
  Live Portfolio Website
        ↓
  Supabase (backend)
  ├── PostgreSQL (projects database)
  ├── Authentication (admin login)
  └── Storage (thumbnails)
```

The site stays online even when your computer is off.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PublicLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── SelectedWork.jsx
│   │   ├── Services.jsx
│   │   ├── AboutPreview.jsx
│   │   ├── PersonalProjects.jsx
│   │   └── ContactCTA.jsx
│   ├── project/
│   │   ├── ProjectCard.jsx
│   │   └── ProjectForm.jsx
│   └── ui/
│       └── SectionHeading.jsx
├── hooks/
│   └── useAuth.js
├── lib/
│   ├── supabase.js
│   └── staticData.js
├── pages/
│   ├── HomePage.jsx
│   ├── WorkPage.jsx
│   ├── ProjectDetailPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── NotFoundPage.jsx
│   └── admin/
│       ├── AdminLoginPage.jsx
│       ├── AdminLayout.jsx
│       ├── AdminDashboard.jsx
│       ├── AdminProjectsPage.jsx
│       ├── AdminNewProjectPage.jsx
│       ├── AdminEditProjectPage.jsx
│       └── AdminSettingsPage.jsx
├── services/
│   └── projectService.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📦 Adding a New Project (No code required)

1. Log in at `/admin/login`
2. Click **Add Project**
3. Fill in: title, category, description, video URL
4. Upload thumbnail
5. Set project type: `client`, `personal`, or `placeholder`
6. Toggle **Published** ON
7. Save

The project appears on the public site automatically.

---

## 🗂️ Project Types

| Type | Description |
|------|-------------|
| `personal` | Real personal filmmaking projects (displayed prominently) |
| `client` | Real client work |
| `placeholder` | Temporary content (clearly marked) |

---

## 🛡️ Security

- Row Level Security (RLS) is enabled on all tables
- Public visitors: read-only access to published projects
- Admin (authenticated): full CRUD access
- Admin routes are blocked by `ProtectedRoute`
- `robots.txt` disallows `/admin/` from search crawlers
- Service role key is **never** used in frontend

---

## 🔗 Public Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/work` | All projects |
| `/work/:slug` | Project detail |
| `/about` | About page |
| `/contact` | Contact |

## 🔒 Admin Routes

| Path | Page |
|------|------|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard |
| `/admin/projects` | Project list |
| `/admin/projects/new` | Add project |
| `/admin/projects/edit/:id` | Edit project |
| `/admin/settings` | Settings |

---

## 📸 Assets

| File | Used As |
|------|---------|
| `public/assets/photos/hero.jpg` | Hero section background |
| `public/assets/photos/about-camera.jpg` | About page main photo |
| `public/assets/photos/about-forest.jpg` | About page secondary photo |
| `public/assets/thumbnails/my-year-2024.jpg` | Personal project thumbnail |
| `public/assets/thumbnails/sreemangal.jpg` | Personal project thumbnail |
| `public/assets/thumbnails/sabdi.jpg` | Personal project thumbnail |

---

## 📋 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Utility styling |
| Framer Motion | Animations |
| React Router | Routing |
| Supabase | Database + Auth + Storage |
| react-helmet-async | SEO meta tags |
| react-hot-toast | Notifications |
| react-dropzone | Image upload |
| Lucide React | Icons |

---

## 📧 Contact

**Munna Mollah**  
Video Editor & Content Creator  
Bangladesh · Worldwide  
[Fiverr](https://www.fiverr.com/munnamolla)
