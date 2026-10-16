'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './YouTubeFacade.module.scss'

// Renders the video thumbnail and only loads the YouTube player (~1 MB of JS)
// once the visitor clicks play.
export default function YouTubeFacade({ videoId, title, className }) {
  const [active, setActive] = useState(false)

  if (active) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    )
  }

  return (
    <button
      type="button"
      className={styles['youtube-facade']}
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className={styles['youtube-facade__thumb']}
      />
      <span className={styles['youtube-facade__play']} aria-hidden="true">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00" />
          <path d="M45 24 27 14v20z" fill="#fff" />
        </svg>
      </span>
    </button>
  )
}
