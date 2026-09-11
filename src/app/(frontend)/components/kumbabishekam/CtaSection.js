'use client'

import WordReveal from '@/components/animation/WordReveal'
import ScrollReveal from '@/components/animation/ScrollReveal'
import YouTubeEmbed from './YouTubeEmbed'
import TrackedSection from './TrackedSection'
import { trackEvent } from '@/lib/gtm/events'
import styles from './CtaSection.module.scss'

export default function CtaSection({ cta, language }) {
  const heading = cta?.heading?.[language]
  const body = cta?.body?.[language]
  const videos = (cta?.videos || []).filter((video) => video?.url)

  if (!heading && !body && !videos.length) return null

  return (
    <TrackedSection id="cta" language={language} className={styles.cta}>
      <div className={styles.cta__content}>
        {heading && (
          <WordReveal as="h2" className={styles.cta__heading}>
            {heading}
          </WordReveal>
        )}
        {body && <p className={styles.cta__body}>{body}</p>}
      </div>

      {videos.length > 0 && (
        <ScrollReveal
          as="div"
          className={styles.cta__videos}
          onClick={() => trackEvent('cta_video_play', { language })}
        >
          <YouTubeEmbed url={videos[0].url} />
          {videos.length > 1 && (
            <div className={styles.cta__videosRow}>
              {videos.slice(1).map((video, index) => (
                <YouTubeEmbed key={index} url={video.url} />
              ))}
            </div>
          )}
        </ScrollReveal>
      )}
    </TrackedSection>
  )
}
