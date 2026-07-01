import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from './ContactForm'
import styles from './page.module.scss'

export const revalidate = 3600

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'contact-page', depth: 0 })

  const seo = data?.seo || {}
  return {
    title: seo.metaTitle || 'Contact | Visvas',
    description: seo.metaDescription || 'Get in touch with Visvas. We would love to hear from you.',
    openGraph: {
      title: seo.ogTitle || 'Contact | Visvas',
      description: seo.ogDescription || 'Get in touch with Visvas.',
      image: seo.ogImage?.url || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
  }
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'contact-page', depth: 2 })

  const { heroImage, contactDetails = {}, contactForm = {}, featuredTestimonials = [] } = data || {}

  const address = contactDetails.address || '84, TPK Main Road, Madurai, Tamil Nadu.'
  const email = contactDetails.email || process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@example.com'
  const phone = contactDetails.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 94038 93898'
  const whatsapp = contactDetails.whatsapp || ''

  return (
    <main className={styles['contact']}>
      {/* Hero Image */}
      {heroImage?.url && (
        <section className={styles['hero']}>
          <Image
            src={heroImage.url}
            alt="Contact Visvas"
            className={styles['hero__image']}
            priority
            fill
            sizes="100vw"
          />
        </section>
      )}

      {/* Contact Details + Form Layout */}
      <section className={styles['contact-section']}>
        <div className={styles['contact-layout']}>
          {/* Details */}
          <div className={styles['contact-details']}>
            <div className={styles['contact-details__row']}>
              <h3 className={styles['contact-details__label']}>Location</h3>
              <p className={styles['contact-details__value']}>{address}</p>
            </div>

            <div className={styles['contact-details__row']}>
              <h3 className={styles['contact-details__label']}>Email</h3>
              <a href={`mailto:${email}`} className={styles['contact-details__link']}>
                {email}
              </a>
            </div>

            <div className={styles['contact-details__row']}>
              <h3 className={styles['contact-details__label']}>Phone Number</h3>
              <p className={styles['contact-details__value']}>
                <a href={`tel:${phone}`} className={styles['contact-details__value-link']}>
                  {phone}
                </a>
              </p>
            </div>

            {whatsapp && (
              <div className={styles['contact-details__row']}>
                <h3 className={styles['contact-details__label']}>Whatsapp Number</h3>
                <p className={styles['contact-details__value']}>
                  <a href={`https://wa.me/${whatsapp}`} className={styles['contact-details__value-link']}>
                    {whatsapp}
                  </a>
                </p>
              </div>
            )}

            {/* Map Image */}
            {contactDetails.mapImage?.url && (
              <div className={styles['contact-details__map-image']}>
                <Image
                  src={contactDetails.mapImage.url}
                  alt="Location"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <ContactForm
            heading={contactForm.heading || 'What we can help you with'}
            disclaimer={contactForm.disclaimer || 'By submitting this form you agree to the Terms and Conditions and Privacy Policy'}
          />
        </div>
      </section>

      {/* Testimonials */}
      {featuredTestimonials?.length > 0 && (
        <section className={styles['testimonials']}>
          <h2 className={styles['testimonials__heading']}>
            Stories Built on Trust
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
    </main>
  )
}
