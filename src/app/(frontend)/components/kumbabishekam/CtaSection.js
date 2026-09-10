'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'
import ScrollReveal from '@/components/animation/ScrollReveal'
import CustomVideoPlayer from '@/app/(frontend)/components/CustomVideoPlayer'
import { VideoPlaybackProvider } from '@/app/(frontend)/components/VideoPlaybackContext'
import TrackedSection from './TrackedSection'
import { trackEvent } from '@/lib/gtm/events'
import styles from './CtaSection.module.scss'

export default function CtaSection({ cta, hero, language }) {
  const heading = cta?.heading?.[language]
  const body = cta?.body?.[language]
  const videoUrl = cta?.videoUrl
  const videoRef = useRef(null)

  // Bigger, more dramatic reveal than the text sections — matches the
  // reference site's video/card treatment (rise 150px + scale up from half size).
  useGSAP(
    () => {
      if (!videoRef.current) return

      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 150, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: videoRef }
  )

  if (!heading && !body && !videoUrl) return null

  return (
    <TrackedSection id="cta" language={language} className={styles.cta}>
      <ScrollReveal className={styles.cta__content}>
        {heading && <h2 className={styles.cta__heading}>{heading}</h2>}
        {body && <p className={styles.cta__body}>{body}</p>}
      </ScrollReveal>

      {videoUrl && (
        <VideoPlaybackProvider>
          <div
            ref={videoRef}
            className={styles.cta__video}
            onClick={() => trackEvent('cta_video_play', { language })}
          >
            <CustomVideoPlayer src={videoUrl} poster={hero?.heroImage?.url} id="kumbabishekam-cta-video" />
          </div>
        </VideoPlaybackProvider>
      )}
    </TrackedSection>
  )
}
