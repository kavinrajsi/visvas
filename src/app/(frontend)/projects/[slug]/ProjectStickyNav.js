'use client'

import { useState, useEffect } from 'react'
import styles from './ProjectStickyNav.module.css'

export default function ProjectStickyNav() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    const sections = ['about', 'description', 'amenities', 'location', 'media', 'faqs']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className={styles['sticky-nav']}>
      <div className={styles['sticky-nav__links']}>
        {['about', 'description', 'amenities', 'location', 'media', 'faqs'].map((id) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`${styles['sticky-nav__link']} ${
              activeSection === id ? styles['sticky-nav__link--active'] : ''
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles['sticky-nav__actions']}>
        <button className={styles['sticky-nav__link']}>Enquire</button>
        <button className={styles['sticky-nav__link']}>Chat</button>
      </div>
    </nav>
  )
}
