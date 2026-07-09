'use client'

import { useState } from 'react'
import { getAttributionData } from '@/lib/analytics/attribution'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'
import { trackFormSubmission } from '@/lib/gtm/events'
import FormSuccess from '@/app/(frontend)/components/form-success/FormSuccess'
import styles from './BlogSidebar.module.scss'

export default function BlogSidebar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    [HONEYPOT_FIELD]: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMessage(null)
      return
    }

    setLoading(true)
    setMessage(null)
    setErrors({})

    try {
      const attribution = getAttributionData()
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'newsletter',
          formData,
          attribution,
        }),
      })

      const result = await response.json()
      console.table(result)

      if (result.success) {
        trackFormSubmission('newsletter', {
          name: formData.name,
          email: formData.email,
          submission_time: new Date().toISOString(),
        }, 'success')

        setMessage({
          type: 'success',
          text: 'Thank you for subscribing. We will keep you informed with curated updates.',
        })
        setFormData({
          name: '',
          email: '',
          [HONEYPOT_FIELD]: '',
        })
      } else {
        trackFormSubmission('newsletter', {
          name: formData.name,
          email: formData.email,
          error_message: result.error || 'Unknown error',
          submission_time: new Date().toISOString(),
        }, 'error')

        setMessage({
          type: 'error',
          text: result.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setMessage({
        type: 'error',
        text: 'Network error. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles['blog-sidebar']}>
      <h3 className={styles['blog-sidebar__heading']}>
        Subscribe to stay informed with curated updates for better living
      </h3>

      {message?.type === 'success' ? (
        <FormSuccess message="We will keep you informed with curated updates." />
      ) : (
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

        <input
          type="text"
          name={HONEYPOT_FIELD}
          value={formData[HONEYPOT_FIELD]}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        />

        {message?.type === 'error' && (
          <div className={`${styles['blog-sidebar__message']} ${styles['blog-sidebar__message--error']}`}>
            <p>{message.text}</p>
          </div>
        )}

        <button type="submit" className={styles['blog-sidebar__btn']} disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      )}
    </div>
  )
}
