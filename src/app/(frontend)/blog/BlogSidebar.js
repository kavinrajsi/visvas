'use client'

import { useState } from 'react'
import styles from './BlogSidebar.module.scss'

export default function BlogSidebar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)

  const validateForm = (data) => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!data.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const nextErrors = { ...prev }
      delete nextErrors[name]
      return nextErrors
    })
    setMessage(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMessage(null)
      return
    }

    setErrors({})
    setMessage('Thank you for subscribing.')
    setFormData({
      name: '',
      email: '',
    })
  }

  return (
    <aside className={styles['blog-sidebar']}>
      <h3 className={styles['blog-sidebar__heading']}>
        Subscribe to stay informed with curated updates for better living
      </h3>

      <form className={styles['blog-sidebar__form']} onSubmit={handleSubmit} noValidate>
        <div className={styles['blog-sidebar__field']}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className={`${styles['blog-sidebar__input']} ${errors.name ? styles['blog-sidebar__input--error'] : ''}`}
            aria-label="Full name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'blog-subscribe-name-error' : undefined}
          />
          {errors.name && (
            <p id="blog-subscribe-name-error" className={styles['blog-sidebar__error']}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles['blog-sidebar__field']}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className={`${styles['blog-sidebar__input']} ${errors.email ? styles['blog-sidebar__input--error'] : ''}`}
            aria-label="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'blog-subscribe-email-error' : undefined}
          />
          {errors.email && (
            <p id="blog-subscribe-email-error" className={styles['blog-sidebar__error']}>
              {errors.email}
            </p>
          )}
        </div>

        {message && (
          <p className={styles['blog-sidebar__message']}>
            {message}
          </p>
        )}

        <button type="submit" className={styles['blog-sidebar__btn']}>
          Subscribe
        </button>
      </form>
    </aside>
  )
}
