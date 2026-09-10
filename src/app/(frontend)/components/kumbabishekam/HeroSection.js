'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'
import HeroReveal from '@/components/animation/HeroReveal'
import TrackedSection from './TrackedSection'
import LanguageSwitch from './LanguageSwitch'
import styles from './HeroSection.module.scss'

export default function HeroSection({ hero, language, anchorLabel, anchorHref }) {
  const eventName = hero?.eventName?.[language]
  const dateLabel = hero?.eventDateLabel?.[language]
  const heroImage = hero?.heroImage?.url
  const heroVideoUrl = hero?.heroVideoUrl
  const mediaRef = useRef(null)

  // Matches the reference site's hero treatment: the background media fades
  // in from a 1.1x zoom (opacity 0.001 -> 1, scale 1.1 -> 1), then drifts
  // slowly as a scroll-linked parallax.
  useGSAP(
    () => {
      if (!mediaRef.current) return

      gsap.fromTo(
        mediaRef.current,
        { opacity: 0.001, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' }
      )

      gsap.to(mediaRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: mediaRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: mediaRef }
  )

  return (
    <TrackedSection id="hero" language={language} className={styles.hero}>
      {heroVideoUrl ? (
        <video
          ref={mediaRef}
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
          ref={mediaRef}
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
