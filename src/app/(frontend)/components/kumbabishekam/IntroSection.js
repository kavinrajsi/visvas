import ScrollReveal from '@/components/animation/ScrollReveal'
import TrackedSection from './TrackedSection'
import styles from './IntroSection.module.scss'

export default function IntroSection({ intro, language }) {
  const heading = intro?.heading?.[language]
  const paragraphs = intro?.paragraphs || []

  if (!paragraphs.length && !heading) return null

  return (
    <TrackedSection id="significance" language={language} className={styles.intro}>
      {heading && (
        <ScrollReveal as="h2" className={styles.intro__heading}>
          {heading}
        </ScrollReveal>
      )}
      <ScrollReveal as="div" className={styles.intro__paragraphs} stagger>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.intro__paragraph}>
            {paragraph?.[language]}
          </p>
        ))}
      </ScrollReveal>
    </TrackedSection>
  )
}
