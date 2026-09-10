import WordReveal from '@/components/animation/WordReveal'
import ScrollReveal from '@/components/animation/ScrollReveal'
import TrackedSection from './TrackedSection'
import styles from './IntroSection.module.scss'

// Simplified stand-in for the reference site's sticky scroll-card + parallax
// "Images" section (a scroll-synced card overlaying two parallax temple
// photos) — that interaction isn't built yet. This renders the same copy as
// a plain centered block until that's implemented.
export default function IntroSection({ intro, language }) {
  const heading = intro?.heading?.[language]
  const paragraphs = intro?.paragraphs || []

  if (!paragraphs.length && !heading) return null

  return (
    <TrackedSection id="significance" language={language} className={styles.intro}>
      {heading && (
        <WordReveal as="h2" className={styles.intro__heading}>
          {heading}
        </WordReveal>
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
