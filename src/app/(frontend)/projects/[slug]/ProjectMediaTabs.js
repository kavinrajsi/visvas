'use client'

import { useState } from 'react'
import styles from './ProjectMediaTabs.module.css'

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
  const currentMedia = mediaList[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={styles['media-tabs']}>
      {/* Tab Buttons */}
      <div className={styles['media-tabs__buttons']}>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'photos' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => {
            setActiveTab('photos')
            setCurrentIndex(0)
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Photos
        </button>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'plans' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => {
            setActiveTab('plans')
            setCurrentIndex(0)
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Plans
        </button>
        <button
          className={`${styles['media-tabs__btn']} ${
            activeTab === 'videos' ? styles['media-tabs__btn--active'] : ''
          }`}
          onClick={() => {
            setActiveTab('videos')
            setCurrentIndex(0)
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
          Videos
        </button>
      </div>

      {/* Carousel */}
      {mediaList.length > 0 && (
        <div className={styles['media-tabs__carousel']}>
          <button
            className={styles['media-tabs__arrow']}
            onClick={handlePrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className={styles['media-tabs__viewport']}>
            {currentMedia?.image?.url || currentMedia?.plan?.url ? (
              <img
                src={currentMedia.image?.url || currentMedia.plan?.url}
                alt={`${activeTab} ${currentIndex + 1}`}
                className={styles['media-tabs__image']}
              />
            ) : (
              <img
                src="/placeholder.jpg"
                alt={`${activeTab} ${currentIndex + 1}`}
                className={styles['media-tabs__image']}
              />
            )}
          </div>

          <button
            className={styles['media-tabs__arrow']}
            onClick={handleNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      {/* Counter */}
      {mediaList.length > 0 && (
        <p className={styles['media-tabs__counter']}>
          {currentIndex + 1} / {mediaList.length}
        </p>
      )}
    </div>
  )
}
