'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'
import WordReveal from '@/components/animation/WordReveal'
import TrackedSection from './TrackedSection'
import styles from './ScheduleSection.module.scss'

function formatDate(dateStr, language) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat(language === 'ta' ? 'ta-IN' : 'en-IN', {
    day: '2-digit',
    month: 'long',
  }).format(new Date(dateStr))
}

function ScheduleRow({ item, language }) {
  const ref = useRef(null)

  // Matches the reference's per-row reveal: rise 150px + scale up from half
  // size, cubic-bezier(0.66,-0.03,0.4,1.01).
  useGSAP(
    () => {
      if (!ref.current) return

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 150, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          // Closest built-in GSAP ease to the reference's cubic-bezier(0.66,-0.03,0.4,1.01) —
          // a slight overshoot on entry, no CustomEase plugin licensed in this project.
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <li ref={ref} className={styles.schedule__item}>
      <span className={styles.schedule__date}>{formatDate(item.date, language)}</span>
      {item.time?.[language] && (
        <span className={styles.schedule__time}>{item.time[language]}</span>
      )}
      <span className={styles.schedule__name}>{item.ceremonyName?.[language]}</span>
      {item.description?.[language] && (
        <p className={styles.schedule__description}>{item.description[language]}</p>
      )}
    </li>
  )
}

export default function ScheduleSection({ schedule, language }) {
  const heading = schedule?.heading?.[language]
  const events = schedule?.events || []

  if (!events.length) return null

  return (
    <TrackedSection id="event-section" language={language} className={styles.schedule}>
      {heading && (
        <WordReveal as="h2" className={styles.schedule__heading}>
          {heading}
        </WordReveal>
      )}
      <ul className={styles.schedule__list}>
        {events.map((item, index) => (
          <ScheduleRow key={index} item={item} language={language} />
        ))}
      </ul>
    </TrackedSection>
  )
}
