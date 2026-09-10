'use client'

import WordReveal from '@/components/animation/WordReveal'
import ScrollReveal from '@/components/animation/ScrollReveal'
import CustomVideoPlayer from '@/app/(frontend)/components/CustomVideoPlayer'
import { VideoPlaybackProvider } from '@/app/(frontend)/components/VideoPlaybackContext'
import TrackedSection from './TrackedSection'
import { trackEvent } from '@/lib/gtm/events'
import styles from './CtaSection.module.scss'

// The reference site plays a stacked set of 4 real YouTube videos here (not
// one self-hosted clip) — this single-video field is a placeholder until the
// schema/seed is extended to a video list and a YouTube-embed component is added.
export default function CtaSection({ cta, hero, language }) {
  const heading = cta?.heading?.[language]
  const body = cta?.body?.[language]
  const videoUrl = cta?.videoUrl

  if (!heading && !body && !videoUrl) return null

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

      {videoUrl && (
        <VideoPlaybackProvider>
          <ScrollReveal
            as="div"
            className={styles.cta__video}
            onClick={() => trackEvent('cta_video_play', { language })}
          >
            <CustomVideoPlayer src={videoUrl} poster={hero?.heroImage?.url} id="kumbabishekam-cta-video" />
          </ScrollReveal>
        </VideoPlaybackProvider>
      )}
    </TrackedSection>
  )
}
