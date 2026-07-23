'use client'

import { useState, useEffect } from 'react'
import { useEnquiryModal } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import styles from './ProjectStickyNav.module.scss'

export default function ProjectStickyNav({ projectName, sections = ['about', 'amenities', 'location', 'media', 'faqs'] }) {
  const { openEnquiryModal } = useEnquiryModal()
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

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className={styles['sticky-nav']}>
      <div className={styles['sticky-nav__wrap']}>
        <div className={styles['sticky-nav__links']}>
          {sections.map((id) => (
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
          <button className={styles['sticky-nav__link']} onClick={() => openEnquiryModal(projectName)}>
            Enquire
          </button>
          <button className={styles['sticky-nav__link']}>Chat</button>
        </div>
      </div>
    </nav>
  )
}
