'use client'

import Image from 'next/image'
import styles from './VideoTestimonial.module.scss'

export default function VideoTestimonial({ testimonial }) {
  const { name, location, videoSource, video, youtubeUrl, vimeoUrl, poster } = testimonial

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
      <div className={styles.videoWrapper}>
        {videoSource === 'upload' && video && (
          <video
            className={styles.video}
            controls
            poster={poster?.url}
            preload="metadata"
          >
            <source src={video.url} type={video.mimeType} />
            Your browser does not support the video tag.
          </video>
        )}

        {videoSource === 'youtube' && youtubeUrl && (
          <iframe
            className={styles.iframe}
            src={getYouTubeEmbedUrl(youtubeUrl)}
            title={`${name} - YouTube video`}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {videoSource === 'vimeo' && vimeoUrl && (
          <iframe
            className={styles.iframe}
            src={getVimeoEmbedUrl(vimeoUrl)}
            title={`${name} - Vimeo video`}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  )
}
