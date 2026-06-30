import { getPayload } from 'payload'
import config from '@payload-config'

export async function generateMetadata() {
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
      image: seo.ogImage?.url || undefined,
    },
    twitter: {
      title: seo.twitterTitle || seo.ogTitle || metaTitle,
      description: seo.twitterDescription || seo.ogDescription || metaDesc,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  }
}

export default function Home() {
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
      telephone: '+91-94038-93898',
      email: 'enquiry@visvaspromoters.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
