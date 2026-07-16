import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import Banner from '@/app/(frontend)/components/banner/Banner'
import LatestProjectsSection from '@/app/(frontend)/components/latest-projects/LatestProjectsSection'
import CompletedProjectsSection from '@/app/(frontend)/components/completed-projects/CompletedProjectsSection'
import WhoWeAreSection from '@/app/(frontend)/components/who-we-are/WhoWeAreSection'
import HowWeBuildSection from '@/app/(frontend)/components/how-we-build/HowWeBuildSection'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import HeroReveal from '@/components/animation/HeroReveal'
import ScrollReveal from '@/components/animation/ScrollReveal'
import styles from './page.module.scss'

export const revalidate = 3600

export async function generateMetadata() {
  try {
    const payload = await getPayload({ config })
    const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })

  const seo = home?.seo || {}
  const metaTitle = seo.metaTitle || 'Visvas - Luxury Properties in Madurai'
  const metaDesc = seo.metaDescription || 'Discover luxury apartments, villas, and plotted developments in Madurai. Investment-ready properties with premium amenities.'

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: seo.ogTitle || metaTitle,
      description: seo.ogDescription || metaDesc,
      image: toImageKitUrl(seo.ogImage?.url) || undefined,
    },
    twitter: {
      title: seo.twitterTitle || seo.ogTitle || metaTitle,
      description: seo.twitterDescription || seo.ogDescription || metaDesc,
    },
  }
  } catch {
    return { title: 'Visvas - Luxury Properties in Madurai' }
  }
}

export default async function Home() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home-page', depth: 3 })

  const {
    hero = {},
    latestProjectsSection = {},
    whoWeAreSection = {},
    howWeBuildSection = {},
    ongoingProjectsSection = {},
    commitmentSection = {},
    completedProjectsSection = {},
    testimonialsSectionHeading = 'Stories Built on Trust',
    featuredTestimonials = [],
    seo = {},
  } = home || {}

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Visvas',
    url: 'https://www.visvas.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.visvas.in/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Visvas',
    url: 'https://www.visvas.in',
    logo: 'https://www.visvas.in/logo.png',
    description: 'Luxury property developer in Madurai',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '84, TPK Main Road',
      addressLocality: 'Madurai',
      addressRegion: 'Tamil Nadu',
      postalCode: '625016',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 95432 24411',
      email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@example.com',
    },
  }

  return (
    <main className={styles['home']}>
      <Banner />
      <LatestProjectsSection />
      <WhoWeAreSection section={whoWeAreSection} />
      <HowWeBuildSection section={howWeBuildSection} />
      <CompletedProjectsSection />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </main>
  )
}
