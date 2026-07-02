import Image from 'next/image'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { STATUS_LABELS, PROJECT_TYPE_LABELS } from '@/app/(frontend)/projects/helpers'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import HeroReveal from '@/components/animation/HeroReveal'
import ScrollReveal from '@/components/animation/ScrollReveal'
import ProjectStickyNav from './ProjectStickyNav'
import ProjectEnquiryForm from './ProjectEnquiryForm'
import ProjectFAQ from './ProjectFAQ'
import ProjectMediaTabs from './ProjectMediaTabs'
import ProjectPageClient from './ProjectPageClient'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'
export const dynamicParams = false
export const revalidate = 3600

export async function generateMetadata({ params: paramsPromise }) {
  try {
    const params = await paramsPromise
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: params.slug } },
      limit: 1,
    })

    const project = result.docs[0]
    if (!project) {
      return { title: 'Project Not Found' }
    }

    const seo = project
    const metaTitle = seo.metaTitle || project.name
    const metaDesc = seo.metaDescription || project.name

    return {
      title: metaTitle,
      description: metaDesc,
      openGraph: {
        title: seo.ogTitle || metaTitle,
        description: seo.ogDescription || metaDesc,
        image: toImageKitUrl(seo.ogImage?.url || project.coverImage?.url),
        type: 'website',
      },
      twitter: {
        card: seo.twitterCard || 'summary_large_image',
        title: seo.twitterTitle || seo.ogTitle || metaTitle,
        description: seo.twitterDescription || seo.ogDescription || metaDesc,
        image: toImageKitUrl(seo.ogImage?.url || project.coverImage?.url),
      },
      alternates: {
      canonical: seo.canonicalUrl || `/projects/${params.slug}`,
    },
  }
  } catch {
    return { title: 'Project | Visvas' }
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 1000,
      select: { slug: true },
    })
    return result.docs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

async function getProject(slug) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  return result.docs[0]
}

export default async function ProjectDetailPage({ params: paramsPromise }) {
  const params = await paramsPromise
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const amenities = project.amenities || []
  const faqs = project.faq || []
  const transports = project.keyTransports || []

  return (
    <>
      <ProjectPageClient project={project} />
      <main className={styles['project-detail']}>
      {/* Hero */}
      <HeroReveal className={styles['project-detail__hero']}>
        <Image
          src={toImageKitUrl(project.coverImage?.url)}
          alt={project.name}
          className={styles['project-detail__hero-img']}
          priority
          fill
          sizes="100vw"
        />
      </HeroReveal>

      {/* Sticky Nav */}
      <ProjectStickyNav />

      {/* About Section */}
      <section id="about" className={styles['project-detail__about']}>
        <div className={styles['project-detail__about-main']}>
          <div className={styles['project-detail__header']}>
            <div className={styles['project-detail__location-row']}>
              <svg
                className={styles['project-detail__location-icon']}
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8c0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
                  fill="currentColor"
                />
              </svg>
              <h2 className={styles['project-detail__location']}>
                {project.location}
              </h2>
            </div>
            <h1 className={styles['project-detail__name']}>{project.name}</h1>
          </div>

          {/* Facts Grid */}
          <ScrollReveal className={styles['project-detail__facts-grid']} stagger>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>Property Type</p>
              <p className={styles['project-detail__fact-value']}>
                {PROJECT_TYPE_LABELS[project.projectType] || project.projectType}
              </p>
            </div>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>Status</p>
              <p className={styles['project-detail__fact-value']}>
                {STATUS_LABELS[project.status] || project.status}
              </p>
            </div>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>Area</p>
              <p className={styles['project-detail__fact-value']}>
                {project.projectArea} Sq. Ft.
              </p>
            </div>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>RERA NO:</p>
              <p className={styles['project-detail__fact-value']}>
                {project.reraNo || 'N/A'}
              </p>
            </div>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>Price range starts from</p>
              <p className={styles['project-detail__fact-value']}>
                Rs. {project.priceRangeStartFrom?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className={styles['project-detail__fact']}>
              <p className={styles['project-detail__fact-label']}>Bedrooms & Bathrooms</p>
              <p className={styles['project-detail__fact-value']}>
                {project.bhkTypes?.join(', ') || 'N/A'}
              </p>
            </div>
          </ScrollReveal>

          {/* Project Image */}
          <div className={styles['project-detail__project-image']}>
            <Image
              src={toImageKitUrl(project.images?.[0]?.image?.url)}
              alt={`${project.name} - interior`}
              className={styles['project-detail__project-img']}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Enquiry Form Sidebar */}
        <ProjectEnquiryForm projectName={project.name} />
      </section>

      {/* Description Section */}
      <ScrollReveal as="section" id="description" className={styles['project-detail__description']}>
        <div className={styles['project-detail__section-label']}>
          <span aria-hidden="true">✦</span>
          <span>PROJECT DESCRIPTION</span>
          <span aria-hidden="true">✦</span>
        </div>
        <h2 className={styles['project-detail__desc-heading']}>
          Discover {project.name}: Your Dream Home Awaits
        </h2>
        {project.description && (
          <div className={styles['project-detail__rich-content']}>
            <RichText data={project.description} />
          </div>
        )}
      </ScrollReveal>

      {/* Amenities Section */}
      <section id="amenities" className={styles['project-detail__amenities']}>
        <div className={styles['project-detail__section-label']}>
          <span aria-hidden="true">✦</span>
          <span>AMENITIES</span>
          <span aria-hidden="true">✦</span>
        </div>
        <ScrollReveal className={styles['project-detail__amenities-grid']} stagger>
          {amenities.map((amenity, idx) => (
            <div key={idx} className={styles['project-detail__amenity-card']}>
              <Image
                src={toImageKitUrl(amenity.icon?.url)}
                alt={amenity.name}
                width={64}
                height={64}
                className={styles['project-detail__amenity-icon']}
              />
              <h3 className={styles['project-detail__amenity-name']}>
                {amenity.name}
              </h3>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* Location Section */}
      <ScrollReveal as="section" id="location" className={styles['project-detail__location-section']}>
        <div className={styles['project-detail__section-label']}>
          <span aria-hidden="true">✦</span>
          <span>LOCATION</span>
          <span aria-hidden="true">✦</span>
        </div>
        <div className={styles['project-detail__location-layout']}>
          <div className={styles['project-detail__location-card']}>
            <div className={styles['project-detail__address-block']}>
              <h3 className={styles['project-detail__address-label']}>Address</h3>
              <p className={styles['project-detail__address-text']}>
                {project.locationAddress || project.location}
              </p>
              <a
                href={project.locationMapUrl || `https://maps.google.com/?q=${encodeURIComponent(project.locationAddress || project.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['project-detail__direction-btn']}
              >
                Get Direction
              </a>
            </div>

            {/* Key Transports */}
            <div className={styles['project-detail__transports']}>
              <h4 className={styles['project-detail__transport-title']}>Key transport</h4>
              <div className={styles['project-detail__transport-grid']}>
                {transports.map((transport, idx) => (
                  <div key={idx} className={styles['project-detail__transport-item']}>
                    <p className={styles['project-detail__transport-type']}>
                      {transport.type}
                    </p>
                    <p className={styles['project-detail__transport-name']}>
                      {transport.name} - {transport.distance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className={styles['project-detail__map']}>
            <Image
              src={toImageKitUrl(null)}
              alt="Location map"
              className={styles['project-detail__map-img']}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Media Section */}
      <ScrollReveal as="section" id="media" className={styles['project-detail__media']}>
        <div className={styles['project-detail__section-label']}>
          <span aria-hidden="true">✦</span>
          <span>MEDIA</span>
          <span aria-hidden="true">✦</span>
        </div>
        <ProjectMediaTabs project={project} />
      </ScrollReveal>

      {/* FAQs Section */}
      <ScrollReveal as="section" id="faqs" className={styles['project-detail__faqs']}>
        <div className={styles['project-detail__section-label']}>
          <span aria-hidden="true">✦</span>
          <span>FAQs</span>
          <span aria-hidden="true">✦</span>
        </div>
        <ProjectFAQ faqs={faqs} />
      </ScrollReveal>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: project.name,
            description: project.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: project.locationAddress || project.location,
              addressLocality: 'Madurai',
              addressRegion: 'Tamil Nadu',
              addressCountry: 'IN',
            },
            image: project.coverImage?.url || undefined,
            offers: {
              '@type': 'Offer',
              price: project.priceRangeStartFrom || undefined,
              priceCurrency: 'INR',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '9.9252',
              longitude: '78.1198',
            },
          }),
        }}
      />

      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {project.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(typeof project.structuredData === 'object' ? project.structuredData : JSON.parse(project.structuredData || '{}')),
          }}
        />
      )}
    </main>
    </>
  )
}
