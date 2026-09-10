import Image from 'next/image'
import HeroReveal from '@/components/animation/HeroReveal'
import TrackedSection from './TrackedSection'
import LanguageSwitch from './LanguageSwitch'
import styles from './HeroSection.module.scss'

export default function HeroSection({ hero, language, anchorLabel, anchorHref }) {
  const eventName = hero?.eventName?.[language]
  const dateLabel = hero?.eventDateLabel?.[language]
  const heroImage = hero?.heroImage?.url
  const heroVideoUrl = hero?.heroVideoUrl

  return (
    <TrackedSection id="hero" language={language} className={styles.hero}>
      {heroVideoUrl ? (
        <video
          className={styles.hero__media}
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
        />
      ) : heroImage ? (
        <Image
          className={styles.hero__media}
          src={heroImage}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
        />
      ) : null}
      <div className={styles.hero__overlay} />

      <div className={styles.hero__topBar}>
        <LanguageSwitch language={language} />
      </div>

      <HeroReveal headingSelector="h1" className={styles.hero__content}>
        <h1 className={styles.hero__title}>{eventName}</h1>
        {dateLabel && <p className={styles.hero__date}>{dateLabel}</p>}
        {anchorHref && (
          <a className={styles.hero__anchor} href={anchorHref}>
            {anchorLabel}
          </a>
        )}
      </HeroReveal>
    </TrackedSection>
  )
}
