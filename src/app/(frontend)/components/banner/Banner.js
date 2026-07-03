import styles from './Banner.module.scss'

export default function Banner() {
  return (
    <section className={styles['banner']}>
      <picture className={styles['banner__picture']}>
        <source
          media="(max-width: 768px)"
          srcSet="/banner-home-mobile.png"
          type="image/png"
        />
        <source
          media="(min-width: 769px)"
          srcSet="/banner-home-desktop.png"
          type="image/png"
        />
        <img
          src="/banner-home-desktop.png"
          alt="Visvas Luxury Properties Banner - Discover premium residential developments in Madurai"
          className={styles['banner__image']}
          loading="eager"
          decoding="async"
        />
      </picture>
    </section>
  )
}
