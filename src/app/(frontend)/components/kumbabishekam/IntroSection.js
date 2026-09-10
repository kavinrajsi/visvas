import ScrollReveal from '@/components/animation/ScrollReveal'
import BlockReveal from '@/components/animation/BlockReveal'
import TrackedSection from './TrackedSection'
import styles from './IntroSection.module.scss'

export default function IntroSection({ intro, language }) {
  const heading = intro?.heading?.[language]
  const paragraphs = intro?.paragraphs || []

  if (!paragraphs.length && !heading) return null

  return (
    <TrackedSection id="significance" language={language} className={styles.intro}>
      {heading && (
        <>
          <ScrollReveal as="h2" className={styles.intro__heading}>
            {heading}
          </ScrollReveal>
          <BlockReveal direction="right" className={styles.intro__divider} />
        </>
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
