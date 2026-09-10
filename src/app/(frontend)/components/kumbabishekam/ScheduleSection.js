import ScrollReveal from '@/components/animation/ScrollReveal'
import TrackedSection from './TrackedSection'
import styles from './ScheduleSection.module.scss'

function formatDate(dateStr, language) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat(language === 'ta' ? 'ta-IN' : 'en-IN', {
    day: '2-digit',
    month: 'long',
  }).format(new Date(dateStr))
}

export default function ScheduleSection({ schedule, language }) {
  const heading = schedule?.heading?.[language]
  const events = schedule?.events || []

  if (!events.length) return null

  return (
    <TrackedSection id="schedule" language={language} className={styles.schedule}>
      {heading && <h2 className={styles.schedule__heading}>{heading}</h2>}
      <ScrollReveal as="ol" className={styles.schedule__list} stagger>
        {events.map((item, index) => (
          <li key={index} className={styles.schedule__item}>
            <span className={styles.schedule__date}>{formatDate(item.date, language)}</span>
            {item.time?.[language] && (
              <span className={styles.schedule__time}>{item.time[language]}</span>
            )}
            <span className={styles.schedule__name}>{item.ceremonyName?.[language]}</span>
            {item.description?.[language] && (
              <p className={styles.schedule__description}>{item.description[language]}</p>
            )}
          </li>
        ))}
      </ScrollReveal>
    </TrackedSection>
  )
}
