'use client'

import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import styles from './Banner.module.scss'

export default function Banner() {
  preload('/web-banner-cover.webp', { as: 'image', fetchPriority: 'high' })

  const videoRef = useRef(null)
  const [loadVideo, setLoadVideo] = useState(false)

  // Hold the video back until the page has loaded so the poster paints first
  // and the 2-4 MB download doesn't compete with critical CSS/JS.
  useEffect(() => {
    const start = () => setLoadVideo(true)
    if (document.readyState === 'complete') {
      start()
      return
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  useEffect(() => {
    if (loadVideo) videoRef.current?.load()
  }, [loadVideo])

  return (
    <section className={styles['banner']}>
      <video
        ref={videoRef}
        poster="/web-banner-cover.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={styles['banner__video']}
      >
        {loadVideo && (
          <>
            <source src="/web-banner-720.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/web-banner-1080.mp4" type="video/mp4" />
          </>
        )}
      </video>
    </section>
  )
}
