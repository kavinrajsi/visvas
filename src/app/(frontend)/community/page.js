import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import styles from './page.module.scss'

export const revalidate = 3600

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'impact-page', depth: 0 })

  const seo = data?.seo || {}
  return {
    title: seo.metaTitle || 'Community Impact | Visvas',
    description: seo.metaDescription || 'Discover our environmental and social impact initiatives.',
    openGraph: {
      title: seo.ogTitle || 'Community Impact | Visvas',
      description: seo.ogDescription || 'Discover our impact.',
      image: seo.ogImage?.url || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  }
}

export default async function CommunityPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'impact-page', depth: 2 })

  const {
    heroImage,
    environmentalSection = {},
    socialSection = {},
    testimonials = [],
  } = data || {}

  return (
    <main className={styles['community']}>
      {/* Hero Image */}
      {heroImage?.url && (
        <section className={styles['hero']}>
          <Image
            src={heroImage.url}
            alt="Community Impact"
            className={styles['hero__image']}
            priority
            fill
            sizes="100vw"
          />
        </section>
      )}

      {/* Environmental Section */}
      {environmentalSection?.heading && (
        <section className={styles['impact-section']}>
          <div className={styles['section-label']}>
            <span aria-hidden="true">✦</span>
            <span>
              {environmentalSection.label || 'OUR ENVIRONMENTAL IMPACT'}
            </span>
            <span aria-hidden="true">✦</span>
          </div>

          <div className={styles['impact-layout']}>
            <div className={styles['impact-content']}>
              <h2 className={styles['impact-heading']}>
                {environmentalSection.heading}
              </h2>
              <p className={styles['impact-description']}>
                {environmentalSection.description}
              </p>
            </div>
            {environmentalSection.image?.url && (
              <div className={styles['impact-image']}>
                <Image
                  src={environmentalSection.image.url}
                  alt={environmentalSection.heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Social Section */}
      {socialSection?.heading && (
        <section className={styles['impact-section']}>
          <div className={styles['section-label']}>
            <span aria-hidden="true">✦</span>
            <span>
              {socialSection.label || 'OUR SOCIAL IMPACT'}
            </span>
            <span aria-hidden="true">✦</span>
          </div>

          <div className={styles['impact-layout']}>
            <div className={styles['impact-content']}>
              <h2 className={styles['impact-heading']}>
                {socialSection.heading}
              </h2>
              <p className={styles['impact-description']}>
                {socialSection.description}
              </p>
            </div>
            {socialSection.image?.url && (
              <div className={styles['impact-image']}>
                <Image
                  src={socialSection.image.url}
                  alt={socialSection.heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials?.length > 0 && (
        <section className={styles['testimonials']}>
          <h2 className={styles['testimonials__heading']}>
            Voices from Our Community
          </h2>
          <div className={styles['testimonials-carousel']}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className={styles['testimonial-item']}>
                {testimonial.quote && (
                  <p className={styles['testimonial-quote']}>
                    "{testimonial.quote}"
                  </p>
                )}
                {testimonial.name && (
                  <p className={styles['testimonial-author']}>
                    {testimonial.name}
                    {testimonial.company && ` — ${testimonial.company}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
