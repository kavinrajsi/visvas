'use client'

import { useRef, useState, useEffect } from 'react'
import { useVideoPlayback } from './VideoPlaybackContext'
import styles from './CustomVideoPlayer.module.scss'

export default function CustomVideoPlayer({ src, poster, className, id }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const { playingVideoId, setPlayingVideoId } = useVideoPlayback()

  useEffect(() => {
    if (playingVideoId && playingVideoId !== id && isPlaying) {
      handlePauseClick()
    }
  }, [playingVideoId, id, isPlaying])

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setPlayingVideoId(id)
    }
  }

  const handlePauseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
      if (playingVideoId === id) {
        setPlayingVideoId(null)
      }
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (playingVideoId === id) {
      setPlayingVideoId(null)
    }
  }

  const handleVideoAreaClick = (e) => {
    e.preventDefault()
    if (isPlaying) {
      handlePauseClick()
    } else {
      handlePlayClick()
    }
  }

  return (
    <div
      className={styles['custom-video-player']}
      onClick={handleVideoAreaClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="button"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        poster={poster}
        className={`${styles['custom-video-player__video']} ${className || ''}`}
        onEnded={handleVideoEnd}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!isPlaying && (
        <div className={styles['custom-video-player__play-btn']}>
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="white" opacity="0.9" />
            <path d="M23 20V40L40 30L23 20Z" fill="#1E5F2F" />
          </svg>
        </div>
      )}

      {isPlaying && isHovering && (
        <div className={styles['custom-video-player__pause-btn']}>
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="white" opacity="0.9" />
            <rect x="16" y="12" width="4" height="24" fill="#1E5F2F" />
            <rect x="28" y="12" width="4" height="24" fill="#1E5F2F" />
          </svg>
        </div>
      )}
    </div>
  )
}
