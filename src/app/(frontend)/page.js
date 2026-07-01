import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'

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
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  }
  } catch {
    return { title: 'Visvas - Luxury Properties in Madurai' }
  }
}

export default async function Home() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home-page', depth: 2 })

  const {
    hero = {},
    latestProjectsSection = {},
    whoWeAreSection = {},
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
      telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91-94038-93898',
      email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@example.com',
    },
  }

  return (
    <main className={styles['home']}>
      {/* Hero Section */}
      {hero?.heroImage?.url && (
        <section className={styles['hero']}>
          <Image
            src={toImageKitUrl(hero.heroImage.url)}
            alt="Visvas Properties"
            className={styles['hero__image']}
            priority
            fill
            sizes="100vw"
          />
        </section>
      )}

      {/* Latest Projects Section */}
      {latestProjectsSection?.featuredProjects?.length > 0 && (
        <section className={styles['latest-projects']}>
          <div className={styles['section-label']}>
            <span aria-hidden="true">✦</span>
            <span>{latestProjectsSection.sectionLabel || 'LATEST PROJECTS'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 className={styles['section-heading']}>
            {latestProjectsSection.heading || 'Discover our latest projects'}
          </h2>
          <div className={styles['projects-grid']}>
            {latestProjectsSection.featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {latestProjectsSection.buttonLabel && (
            <div className={styles['section-cta']}>
              <a href="/projects/ongoing" className={styles['btn']}>
                {latestProjectsSection.buttonLabel}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Who We Are Section */}
      {whoWeAreSection?.heading && (
        <section className={styles['who-we-are']}>
          <h2 className={styles['who-we-are__heading']}>
            {whoWeAreSection.heading}
          </h2>

          {/* Feature Cards */}
          {whoWeAreSection.featureCards?.length > 0 && (
            <div className={styles['feature-cards']}>
              {whoWeAreSection.featureCards.map((card, idx) => (
                <div key={idx} className={styles['feature-card']}>
                  {card.backgroundImage?.url && (
                    <Image
                      src={toImageKitUrl(card.backgroundImage.url)}
                      alt={card.title}
                      className={styles['feature-card__bg']}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className={styles['feature-card__content']}>
                    <h3 className={styles['feature-card__title']}>{card.title}</h3>
                    <p className={styles['feature-card__description']}>
                      {card.description}
                    </p>
                    {card.buttonLabel && (
                      <a href="#" className={styles['feature-card__btn']}>
                        {card.buttonLabel}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Row */}
          {whoWeAreSection.stats?.length > 0 && (
            <div className={styles['stats-row']}>
              {whoWeAreSection.stats.map((stat, idx) => (
                <div key={idx} className={styles['stat-item']}>
                  <p className={styles['stat-number']}>
                    {stat.number}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </p>
                  <p className={styles['stat-label']}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Ongoing Projects Section */}
      {ongoingProjectsSection?.projects?.length > 0 && (
        <section className={styles['ongoing-projects']}>
          <h2 className={styles['section-heading']}>
            {ongoingProjectsSection.heading || 'Ongoing Projects'}
          </h2>
          {/* Map placeholder + list would go here */}
          <div className={styles['projects-list']}>
            {ongoingProjectsSection.projects.slice(0, 3).map((project) => (
              <div key={project.id} className={styles['project-item']}>
                <a href={`/projects/${project.slug}`}>{project.name}</a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Commitment Section */}
      {commitmentSection?.commitments?.length > 0 && (
        <section className={styles['commitment']}>
          <div className={styles['section-label']}>
            <span aria-hidden="true">✦</span>
            <span>{commitmentSection.sectionLabel || 'OUR COMMITMENT'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 className={styles['commitment__heading']}>
            {commitmentSection.heading || 'What makes us different'}
          </h2>
          <p className={styles['commitment__description']}>
            {commitmentSection.description}
          </p>

          {commitmentSection.backgroundImage?.url && (
            <div className={styles['commitment__bg']}>
              <Image
                src={toImageKitUrl(commitmentSection.backgroundImage.url)}
                alt="Commitment background"
                fill
                sizes="100vw"
              />
            </div>
          )}

          {commitmentSection.commitments?.length > 0 && (
            <div className={styles['commitment-cards']}>
              {commitmentSection.commitments.map((item, idx) => (
                <div key={idx} className={styles['commitment-card']}>
                  {item.icon?.url && (
                    <div className={styles['commitment-card__icon']}>
                      <Image
                        src={toImageKitUrl(item.icon.url)}
                        alt={item.title}
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                  <h3 className={styles['commitment-card__title']}>
                    {item.title}
                  </h3>
                  <p className={styles['commitment-card__description']}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Completed Projects Section */}
      {completedProjectsSection?.featuredProjects?.length > 0 && (
        <section className={styles['completed-projects']}>
          <div className={styles['section-label']}>
            <span aria-hidden="true">✦</span>
            <span>{completedProjectsSection.sectionLabel || 'COMPLETED PROJECTS'}</span>
            <span aria-hidden="true">✦</span>
          </div>
          <h2 className={styles['section-heading']}>
            {completedProjectsSection.heading || 'Top gated communities in Madurai'}
          </h2>
          {completedProjectsSection.description && (
            <p className={styles['section-description']}>
              {completedProjectsSection.description}
            </p>
          )}
          <div className={styles['projects-grid']}>
            {completedProjectsSection.featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {completedProjectsSection.buttonLabel && (
            <div className={styles['section-cta']}>
              <a href="/projects/completed" className={styles['btn']}>
                {completedProjectsSection.buttonLabel}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Testimonials Section */}
      {featuredTestimonials?.length > 0 && (
        <section className={styles['testimonials']}>
          <h2 className={styles['testimonials__heading']}>
            {testimonialsSectionHeading}
          </h2>
          <div className={styles['testimonials-carousel']}>
            {featuredTestimonials.slice(0, 3).map((testimonial, idx) => (
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
