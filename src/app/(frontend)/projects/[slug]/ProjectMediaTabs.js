'use client'

import Image from 'next/image'
import { useState } from 'react'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import styles from './ProjectMediaTabs.module.scss'

export default function ProjectMediaTabs({ project }) {
  const [activeTab, setActiveTab] = useState('photos')
  const [currentIndex, setCurrentIndex] = useState(0)

  const getMediaList = () => {
    switch (activeTab) {
      case 'plans':
        return project.floorPlans || []
      case 'videos':
        return project.videos || []
      case 'photos':
      default:
        return project.images || []
    }
  }

  const mediaList = getMediaList()
  const len = mediaList.length

  // Handle edge cases for slide indices
  const prevIndex = len > 1 ? (currentIndex - 1 + len) % len : currentIndex
  const nextIndex = len > 1 ? (currentIndex + 1) % len : currentIndex
  const currentMedia = mediaList[currentIndex]

  const handlePrev = () => {
    if (len > 1) {
      setCurrentIndex((prev) => (prev === 0 ? len - 1 : prev - 1))
    }
  }

  const handleNext = () => {
    if (len > 1) {
      setCurrentIndex((prev) => (prev === len - 1 ? 0 : prev + 1))
    }
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName)
    setCurrentIndex(0)
  }

  // Render single slide (used for mobile and videos tab single-view)
  const renderSlide = (media, isActive = true, isVideo = false) => {
    if (!media) return null

    if (isVideo && media.video?.url) {
      return (
        <video
          key={`video-${mediaList.indexOf(media)}`}
          className={styles['media-tabs__video']}
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source src={media.video.url} type={media.video.mimeType || 'video/mp4'} />
          Your browser does not support the video tag.
        </video>
      )
    }

    const imageUrl = isVideo ? media.video?.url : (media.image?.url || media.plan?.url)
    if (!imageUrl) {
      return (
        <Image
          src="/placeholder.png"
          alt={`${activeTab} placeholder`}
          className={styles['media-tabs__image']}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      )
    }

    return (
      <Image
        src={toImageKitUrl(imageUrl)}
        alt={`${activeTab} ${currentIndex + 1}`}
        className={styles['media-tabs__image']}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    )
  }

  return (
    <div className={styles['media-tabs']}>
      {/* Tab Buttons */}
      <div className={styles['media-tabs__buttons']}>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'photos' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => handleTabSwitch('photos')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Photos
        </button>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'plans' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => handleTabSwitch('plans')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Plans
        </button>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'videos' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => handleTabSwitch('videos')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Videos
        </button>
      </div>

      {/* Carousel Container */}
      {len > 0 && (
        <>
          <div className={styles['media-tabs__carousel']}>
            {/* Prev Arrow */}
            {len > 1 && (
              <button
                className={`${styles['media-tabs__arrow']} ${styles['media-tabs__arrow--prev']}`}
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                ‹
              </button>
            )}

            {/* Track + Slides */}
            <div className={styles['media-tabs__track']}>
              {/* Mobile + Videos tab single view: show only active slide */}
              <div
                className={`${styles['media-tabs__slide']} ${styles['media-tabs__slide--active']}`}
                key={`slide-active-${currentIndex}`}
              >
                {renderSlide(currentMedia, true, activeTab === 'videos')}
              </div>

              {/* Desktop 3-up peek: render prev, active, next (hidden on mobile via CSS) */}
              {len > 1 && (
                <>
                  <div className={`${styles['media-tabs__slide']} ${styles['media-tabs__slide--prev']}`} key={`slide-prev-${prevIndex}`}>
                    {renderSlide(mediaList[prevIndex], false, activeTab === 'videos')}
                  </div>
                  <div className={`${styles['media-tabs__slide']} ${styles['media-tabs__slide--active']}`} key={`slide-active-desktop-${currentIndex}`}>
                    {renderSlide(currentMedia, true, activeTab === 'videos')}
                  </div>
                  <div className={`${styles['media-tabs__slide']} ${styles['media-tabs__slide--next']}`} key={`slide-next-${nextIndex}`}>
                    {renderSlide(mediaList[nextIndex], false, activeTab === 'videos')}
                  </div>
                </>
              )}
            </div>

            {/* Next Arrow */}
            {len > 1 && (
              <button
                className={`${styles['media-tabs__arrow']} ${styles['media-tabs__arrow--next']}`}
                onClick={handleNext}
                aria-label="Next slide"
              >
                ›
              </button>
            )}
          </div>

          {/* Dot Pagination */}
          <div className={styles['media-tabs__dots']}>
            {mediaList.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`${styles['media-tabs__dot']} ${
                  index === currentIndex ? styles['media-tabs__dot--active'] : ''
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
