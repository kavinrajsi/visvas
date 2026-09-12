'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import '@/lib/gsap/registerPlugins'
import WordReveal from '@/components/animation/WordReveal'
import TrackedSection from './TrackedSection'
import CurvedLoopMarquee from './CurvedLoopMarquee'
import styles from './HeroSection.module.scss'

const MARQUEE_TEXT = {
  en: '✦ Maha Kumbabhishekam',
  ta: '✦  மகா கும்பாபிஷேகம்',
}

export default function HeroSection({ hero, language, anchorLabel, anchorHref }) {
  const eventName = hero?.eventName?.[language]
  const dateLabel = hero?.eventDateLabel?.[language]
  const treeRef = useRef(null)

  // Matches the reference's "Tree" decoration: slides up from below on mount.
  useGSAP(
    () => {
      if (!treeRef.current) return

      gsap.from(treeRef.current, {
        y: 100,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    },
    { scope: treeRef }
  )

  return (
    <TrackedSection id="hero" language={language} className={styles.hero}>
      <CurvedLoopMarquee text={MARQUEE_TEXT[language]} />

      <div className={styles.hero__content}>
        <WordReveal as="h1" className={styles.hero__title}>
          {eventName}
        </WordReveal>
        {dateLabel && (
          <WordReveal as="p" className={styles.hero__date}>
            {dateLabel}
          </WordReveal>
        )}
        {anchorHref && (
          <a className={styles.hero__anchor} href={anchorHref}>
            {anchorLabel}
          </a>
        )}
      </div>

      <div ref={treeRef} className={styles.hero__tree}>
        <Image
          src="/kumbabishekam/hero-tree.png"
          alt=""
          aria-hidden="true"
          width={1920}
          height={963}
          className={styles.hero__treeImage}
        />
      </div>
    </TrackedSection>
  )
}
