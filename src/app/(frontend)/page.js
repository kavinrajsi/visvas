import { getPayload } from 'payload'
import config from '@payload-config'
import Image from "next/image";
import styles from "./page.module.css";

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
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>To get started, edit the page.js file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
