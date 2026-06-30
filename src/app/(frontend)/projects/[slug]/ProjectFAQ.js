'use client'

import { useState } from 'react'
import styles from './ProjectFAQ.module.scss'

export default function ProjectFAQ({ faqs }) {
  const [openId, setOpenId] = useState(null)

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className={styles['faq-list']}>
      {faqs.map((item, idx) => (
        <button
          key={idx}
          className={`${styles['faq-item']} ${openId === idx ? styles['faq-item--open'] : ''}`}
          onClick={() => toggleFAQ(idx)}
          aria-expanded={openId === idx}
        >
          <div className={styles['faq-item__header']}>
            <p className={styles['faq-item__question']}>{item.question}</p>
            <svg
              className={styles['faq-item__icon']}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {openId === idx && (
            <p className={styles['faq-item__answer']}>{item.answer}</p>
          )}
        </button>
      ))}
    </div>
  )
}
