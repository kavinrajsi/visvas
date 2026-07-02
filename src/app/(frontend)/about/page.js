import Image from 'next/image'
import { getPayload } from 'payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@payload-config'
import styles from './page.module.scss'

export const revalidate = 3600

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'about-page', depth: 0 })

  const seo = data?.seo || {}
  return {
    title: seo.metaTitle || 'About | Visvas',
    description: seo.metaDescription || 'Learn about Visvas and our mission to build luxury properties in Madurai.',
    openGraph: {
      title: seo.ogTitle || 'About | Visvas',
      description: seo.ogDescription || 'Learn about Visvas and our mission.',
      image: seo.ogImage?.url || undefined,
    },
  }
}

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'about-page', depth: 2 })

  const {
    heroBanner = {},
    heroQuote = {},
    stats = [],
    valuesSection = {},
    founderStory = {},
    testimonialsSectionHeading = 'Stories Built on Trust',
    featuredTestimonials = [],
  } = data || {}

  return (
    <main className={styles['about']}>
      {/* Hero Banner */}
      <section className={styles['hero-banner']}>
        <div className={styles['hero-banner__content']}>
          <h1 className={styles['hero-banner__tagline']}>
            {heroBanner.tagline || 'Building Homes. Creating Trust. Shaping Communities.'}
          </h1>
          <p className={styles['hero-banner__description']}>
            {heroBanner.description || 'Discover the story behind Visvas.'}
          </p>
        </div>
      </section>

      {/* Hero Quote */}
      {heroQuote?.quote && (
        <section className={styles['hero-quote']}>
          {heroQuote.backgroundImage?.url && (
            <Image
              src={heroQuote.backgroundImage.url}
              alt="About background"
              className={styles['hero-quote__bg']}
              fill
              sizes="100vw"
            />
          )}
          <blockquote className={styles['hero-quote__text']}>
            {heroQuote.quote}
          </blockquote>
        </section>
      )}

      {/* Stats Row */}
      {stats?.length > 0 && (
        <section className={styles['stats-row']}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles['stat-item']}>
              <p className={styles['stat-number']}>
                {stat.number}
                {stat.suffix && <span>{stat.suffix}</span>}
              </p>
              <p className={styles['stat-label']}>{stat.label}</p>
            </div>
          ))}
        </section>
      )}

      {/* Values Section */}
      {valuesSection?.values?.length > 0 && (
        <section className={styles['values-section']}>
          <div className={styles['values-layout']}>
            <div className={styles['values-content']}>
              <h2 className={styles['values-heading']}>
                {valuesSection.sectionHeading || 'Our Values'}
              </h2>
              <div className={styles['values-list']}>
                {valuesSection.values.map((value, idx) => (
                  <div key={idx} className={styles['value-item']}>
                    <h3 className={styles['value-title']}>{value.title}</h3>
                    <p className={styles['value-description']}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {valuesSection.sectionImage?.url && (
              <div className={styles['values-image']}>
                <Image
                  src={valuesSection.sectionImage.url}
                  alt="Our values"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Founder Story */}
      {founderStory?.heading && (
        <section className={styles['founder-story']}>
          <h2 className={styles['founder-story__heading']}>
            {founderStory.heading}
          </h2>
          {founderStory.content && (
            <div className={styles['founder-story__content']}>
              <RichText data={founderStory.content} />
            </div>
          )}
          {founderStory.photo?.url && (
            <div className={styles['founder-story__photo']}>
              <Image
                src={founderStory.photo.url}
                alt="Founder"
                width={400}
                height={500}
              />
            </div>
          )}
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials?.length > 0 && (
        <section className={styles['testimonials']}>
          <h2 className={styles['testimonials__heading']}>
            {testimonialsSectionHeading}
          </h2>
          <div className={styles['testimonials-grid']}>
            {featuredTestimonials.slice(0, 3).map((testimonial, idx) => (
              <div key={idx} className={styles['testimonial-card']}>
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
