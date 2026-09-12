'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import '@/lib/gsap/registerPlugins'
import WordReveal from '@/components/animation/WordReveal'
import TrackedSection from './TrackedSection'
import { inter } from '@/app/(frontend)/kumbabishekam/fonts'
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

  // Matches the design's per-row reveal: rise 150px + scale up from half size.
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
          ease: CustomEase.create('scheduleRow', '0.66,-0.03,0.4,1.01'),
          scrollTrigger: {
            trigger: ref.current,
            // Design fires at a 0.5 visibility ratio.
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <li ref={ref} className={styles.schedule__item}>
      <span className={styles.schedule__meta}>
        <span className={styles.schedule__date}>{formatDate(item.date, language)}</span>
        {item.time?.[language] && (
          <span className={styles.schedule__time}>{item.time[language]}</span>
        )}
      </span>
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
        <WordReveal
          as="h2"
          className={styles.schedule__heading}
          stagger={0.05}
          start="top 50%"
        >
          {heading}
        </WordReveal>
      )}
      <ul className={`${styles.schedule__list} ${inter.className}`}>
        {events.map((item, index) => (
          <ScheduleRow key={index} item={item} language={language} />
        ))}
      </ul>
    </TrackedSection>
  )
}
