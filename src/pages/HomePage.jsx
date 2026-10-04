import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import SelectedWork from '@/components/sections/SelectedWork'
import Services from '@/components/sections/Services'
import AboutPreview from '@/components/sections/AboutPreview'
import PersonalProjects from '@/components/sections/PersonalProjects'
import ContactCTA from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Munna Mollah — Video Editor & Content Creator</title>
        <meta
          name="description"
          content="Freelance video editor and content creator specializing in short-form content, gaming edits, social media, advertising and visual storytelling. Based in Bangladesh, working worldwide since 2020."
        />
        <meta property="og:title" content="Munna Mollah — Video Editor & Content Creator" />
        <meta
          property="og:description"
          content="Turning raw footage into content people actually want to watch. 600+ projects. 5+ years. Worldwide."
        />
        <meta property="og:image" content="/assets/photos/hero.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Munna Mollah — Video Editor & Content Creator" />
        <meta
          name="twitter:description"
          content="Turning raw footage into content people actually want to watch."
        />
        <link rel="canonical" href="https://munnamollah.com" />
      </Helmet>

      <Hero />
      <Stats />
      <SelectedWork />
      <Services />
      <AboutPreview />
      <PersonalProjects />
      <ContactCTA />
    </>
  )
}
