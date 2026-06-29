import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { STATUS_LABELS, PROJECT_TYPE_LABELS } from '@/app/(frontend)/projects/helpers'
import styles from './page.module.css'

export const dynamic = 'auto'
export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }) {
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

  return {
    title: `${project.name} | Visvas Projects`,
    description: project.description?.root?.children?.[0]?.children?.[0]?.text || 'Real estate project by Visvas',
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

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const statusLabel = STATUS_LABELS[project.status] || project.status
  const typeLabel = PROJECT_TYPE_LABELS[project.projectType] || project.projectType
  const coverImageUrl = project.coverImage?.url || '/placeholder.jpg'

  return (
    <div className={styles['page']}>
      {/* Hero Section */}
      <div className={styles['page__hero']}>
        <img
          src={coverImageUrl}
          alt={project.name}
          className={styles['page__hero-image']}
        />
        <div className={styles['page__hero-overlay']}>
          <div className={styles['page__hero-content']}>
            <span className={styles['page__status-badge']}>{statusLabel}</span>
            <h1 className={styles['page__title']}>{project.name}</h1>
            <div className={styles['page__location']}>
              <svg
                className={styles['page__location-icon']}
                width="20"
                height="28"
                viewBox="0 0 20 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C4.5 0 0 4.5 0 10c0 7 10 18 10 18s10-11 10-18c0-5.5-4.5-10-10-10zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
                  fill="white"
                />
              </svg>
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      {(project.priceRangeStartFrom || project.projectArea || project.reraNo || project.bhkTypes?.length > 0) && (
        <div className={styles['page__facts']}>
          <div className={styles['page__facts-container']}>
            {project.priceRangeStartFrom && (
              <div className={styles['page__fact-item']}>
                <span className={styles['page__fact-label']}>Starting Price</span>
                <span className={styles['page__fact-value']}>
                  ₹{(project.priceRangeStartFrom / 1000000).toFixed(2)}Cr+
                </span>
              </div>
            )}
            {project.projectArea && (
              <div className={styles['page__fact-item']}>
                <span className={styles['page__fact-label']}>Project Area</span>
                <span className={styles['page__fact-value']}>{project.projectArea}</span>
              </div>
            )}
            {project.bhkTypes?.length > 0 && (
              <div className={styles['page__fact-item']}>
                <span className={styles['page__fact-label']}>BHK Types</span>
                <span className={styles['page__fact-value']}>
                  {project.bhkTypes.join(', ')}
                </span>
              </div>
            )}
            {project.reraNo && (
              <div className={styles['page__fact-item']}>
                <span className={styles['page__fact-label']}>RERA No.</span>
                <span className={styles['page__fact-value']}>{project.reraNo}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={styles['page__content']}>
        {/* Description */}
        {project.description && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>About This Project</h2>
            <div className={styles['page__description']}>
              {/* Payload richtext would render here - placeholder text for now */}
              {JSON.stringify(project.description).includes('text') && (
                <p>{project.description.root?.children?.[0]?.children?.[0]?.text || 'Project details...'}</p>
              )}
            </div>
          </section>
        )}

        {/* Amenities */}
        {project.amenities?.length > 0 && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Amenities</h2>
            <div className={styles['page__amenities-grid']}>
              {project.amenities.map((amenity) => (
                <div key={amenity.id} className={styles['page__amenity-item']}>
                  {amenity.icon && (
                    <img
                      src={amenity.icon}
                      alt={amenity.name}
                      className={styles['page__amenity-icon']}
                    />
                  )}
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location */}
        {(project.locationAddress || project.locationMapUrl) && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Location</h2>
            {project.locationAddress && (
              <p className={styles['page__location-address']}>{project.locationAddress}</p>
            )}
            {project.locationMapUrl && (
              <div className={styles['page__map-container']}>
                <iframe
                  src={project.locationMapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '4px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </section>
        )}

        {/* Nearby Locations */}
        {project.keyTransports?.length > 0 && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Nearby Locations</h2>
            <div className={styles['page__transports-grid']}>
              {project.keyTransports.map((transport, idx) => (
                <div key={idx} className={styles['page__transport-item']}>
                  <span className={styles['page__transport-type']}>{transport.type}</span>
                  <span className={styles['page__transport-name']}>{transport.name}</span>
                  <span className={styles['page__transport-distance']}>{transport.distance}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Floor Plans */}
        {project.floorPlans?.length > 0 && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Floor Plans</h2>
            <div className={styles['page__floor-plans-grid']}>
              {project.floorPlans.map((plan, idx) => (
                <div key={idx} className={styles['page__floor-plan-item']}>
                  <img
                    src={plan.plan?.url}
                    alt={plan.label || `Floor Plan ${idx + 1}`}
                    className={styles['page__floor-plan-image']}
                  />
                  {plan.label && (
                    <p className={styles['page__floor-plan-label']}>{plan.label}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.images?.length > 0 && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Gallery</h2>
            <div className={styles['page__gallery-grid']}>
              {project.images.map((img, idx) => (
                <div key={idx} className={styles['page__gallery-item']}>
                  <img
                    src={img.image?.url}
                    alt={img.caption || `Project image ${idx + 1}`}
                    className={styles['page__gallery-image']}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {project.faq?.length > 0 && (
          <section className={styles['page__section']}>
            <h2 className={styles['page__section-title']}>Frequently Asked Questions</h2>
            <div className={styles['page__faq-list']}>
              {project.faq.map((item, idx) => (
                <details key={idx} className={styles['page__faq-item']}>
                  <summary className={styles['page__faq-question']}>
                    {item.question}
                  </summary>
                  <p className={styles['page__faq-answer']}>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
