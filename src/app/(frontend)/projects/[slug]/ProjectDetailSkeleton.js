import styles from './ProjectDetailSkeleton.module.scss'

// Loading skeleton shaped like the project detail page: hero, sticky nav,
// about section with the enquiry form sidebar, amenities, location and FAQs.
export default function ProjectDetailSkeleton() {
  const block = (extra) => `${styles['skeleton__block']} ${extra}`

  return (
    <div aria-busy="true" aria-label="Loading project">
      {/* Hero */}
      <div className={block(styles['skeleton__hero'])} />

      {/* Sticky nav */}
      <div className={styles['skeleton__nav']}>
        <div className={styles['skeleton__nav-wrap']}>
          <div className={styles['skeleton__nav-links']}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={block(styles['skeleton__nav-link'])} />
            ))}
          </div>
          <div className={styles['skeleton__nav-actions']}>
            <div className={block(styles['skeleton__nav-link'])} />
            <div className={block(styles['skeleton__nav-link'])} />
          </div>
        </div>
      </div>

      {/* About: content + form sidebar */}
      <div className={styles['skeleton__about']}>
        <div className={styles['skeleton__about-main']}>
          <div className={block(styles['skeleton__line-sm'])} />
          <div className={block(styles['skeleton__title'])} />
          <div className={styles['skeleton__facts']}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={block(styles['skeleton__fact'])} />
            ))}
          </div>
          <div className={block(styles['skeleton__image'])} />
        </div>
        <div className={block(styles['skeleton__form'])} />
      </div>

      {/* Amenities */}
      <div className={styles['skeleton__section']}>
        <div className={block(styles['skeleton__section-title'])} />
        <div className={styles['skeleton__amenities']}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={block(styles['skeleton__amenity'])} />
          ))}
        </div>
      </div>

      {/* Location */}
      <div className={styles['skeleton__section']}>
        <div className={block(styles['skeleton__section-title'])} />
        <div className={styles['skeleton__location']}>
          <div className={block(styles['skeleton__location-card'])} />
          <div className={block(styles['skeleton__map'])} />
        </div>
      </div>

      {/* FAQ */}
      <div className={styles['skeleton__section']}>
        <div className={block(styles['skeleton__section-title'])} />
        <div className={styles['skeleton__faqs']}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={block(styles['skeleton__faq'])} />
          ))}
        </div>
      </div>
    </div>
  )
}
