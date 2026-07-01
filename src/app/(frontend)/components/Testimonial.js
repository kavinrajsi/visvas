'use client'

import Image from 'next/image'
import styles from './Testimonial.module.scss'

export default function Testimonial({ testimonial }) {
  const { name, location, type, textContent, rating, videoSource, youtubeUrl, vimeoUrl, video, poster } = testimonial

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null
  }

  const getVimeoEmbedUrl = (url) => {
    const videoId = url.match(/vimeo\.com\/(\d+)/)
    return videoId ? `https://player.vimeo.com/video/${videoId[1]}` : null
  }

  return (
    <div className={styles.testimonial}>
      {type === 'text' && (
        <>
          <div className={styles.rating}>
            {'★'.repeat(Math.round(rating))}
          </div>
          <p className={styles.text}>{textContent}</p>
        </>
      )}

      {type === 'video' && (
        <div className={styles.videoWrapper}>
          {videoSource === 'upload' && video && (
            <video
              className={styles.video}
              controls
              poster={poster?.url}
              preload="metadata"
            >
              <source src={video.url} type={video.mimeType} />
            </video>
          )}

          {videoSource === 'youtube' && youtubeUrl && (
            <iframe
              className={styles.iframe}
              src={getYouTubeEmbedUrl(youtubeUrl)}
              title={`${name} - YouTube`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}

          {videoSource === 'vimeo' && vimeoUrl && (
            <iframe
              className={styles.iframe}
              src={getVimeoEmbedUrl(vimeoUrl)}
              title={`${name} - Vimeo`}
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
            />
          )}
        </div>
      )}

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  )
}
