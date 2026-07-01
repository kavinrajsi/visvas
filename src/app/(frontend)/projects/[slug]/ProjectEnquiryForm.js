'use client'

import { useState } from 'react'
import { trackFormSubmit } from '@/lib/analytics/track'
import { getAttributionData } from '@/lib/analytics/attribution'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'
import styles from './ProjectEnquiryForm.module.scss'

export default function ProjectEnquiryForm({ projectName }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: false,
    email: '',
    budget: '',
    message: '',
    project: projectName || '',
    [HONEYPOT_FIELD]: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobilePattern = /^[0-9+\-\s()]{7,15}$/

    if (!data.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!data.mobile.trim()) {
      nextErrors.mobile = 'Please enter your mobile number.'
    } else if (!mobilePattern.test(data.mobile.trim())) {
      nextErrors.mobile = 'Please enter a valid mobile number.'
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!data.budget.trim()) {
      nextErrors.budget = 'Please enter your budget.'
    }

    return nextErrors
  }

  const mapServerErrors = (serverErrors = []) => {
    return serverErrors.reduce((nextErrors, error) => {
      const normalizedError = error.toLowerCase()

      if (normalizedError.includes('name')) {
        nextErrors.name = error
      } else if (normalizedError.includes('mobile') || normalizedError.includes('phone')) {
        nextErrors.mobile = error
      } else if (normalizedError.includes('email')) {
        nextErrors.email = error
      } else if (normalizedError.includes('budget')) {
        nextErrors.budget = error
      }

      return nextErrors
    }, {})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const nextErrors = { ...prev }
      delete nextErrors[name]
      return nextErrors
    })
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
          formType: 'enquiry',
          formData: {
            ...formData,
          },
          attribution,
        }),
      })

      const result = await response.json()

      if (result.success) {
        trackFormSubmit('enquiry', {
          project: formData.project,
          budget: formData.budget,
        })
        setMessage({
          type: 'success',
          text: 'Thank you! We will get back to you shortly.',
        })
        setFormData({
          name: '',
          mobile: '',
          whatsapp: false,
          email: '',
          budget: '',
          message: '',
          project: projectName || '',
          [HONEYPOT_FIELD]: '',
        })
      } else {
        const serverErrors = mapServerErrors(result.errors)

        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors)
        }

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
    <aside className={styles['enquiry-form']}>
      <h3 className={styles['enquiry-form__heading']}>Request for more information</h3>

      <form onSubmit={handleSubmit} className={styles['enquiry-form__form']} noValidate>
        <div className={styles['enquiry-form__field']}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className={`${styles['enquiry-form__input']} ${errors.name ? styles['enquiry-form__input--error'] : ''}`}
            aria-label="Full name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
          />
          {errors.name && (
            <p id="enquiry-name-error" className={styles['enquiry-form__error']}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles['enquiry-form__field']}>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile*"
            value={formData.mobile}
            onChange={handleChange}
            className={`${styles['enquiry-form__input']} ${errors.mobile ? styles['enquiry-form__input--error'] : ''}`}
            aria-label="Mobile number"
            aria-invalid={errors.mobile ? 'true' : 'false'}
            aria-describedby={errors.mobile ? 'enquiry-mobile-error' : undefined}
          />
          {errors.mobile && (
            <p id="enquiry-mobile-error" className={styles['enquiry-form__error']}>
              {errors.mobile}
            </p>
          )}
        </div>

        <div className={styles['enquiry-form__checkbox-group']}>
          <input
            type="checkbox"
            id="whatsapp"
            name="whatsapp"
            checked={formData.whatsapp}
            onChange={handleChange}
            className={styles['enquiry-form__checkbox']}
            aria-label="WhatsApp checkbox"
          />
          <label htmlFor="whatsapp" className={styles['enquiry-form__checkbox-label']}>
            Do you have whatsapp activated on this number?
          </label>
        </div>

        <div className={styles['enquiry-form__field']}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className={`${styles['enquiry-form__input']} ${errors.email ? styles['enquiry-form__input--error'] : ''}`}
            aria-label="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
          />
          {errors.email && (
            <p id="enquiry-email-error" className={styles['enquiry-form__error']}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles['enquiry-form__field']}>
          <input
            type="text"
            name="budget"
            placeholder="Enter your budget*"
            value={formData.budget}
            onChange={handleChange}
            className={`${styles['enquiry-form__input']} ${errors.budget ? styles['enquiry-form__input--error'] : ''}`}
            aria-label="Budget"
            aria-invalid={errors.budget ? 'true' : 'false'}
            aria-describedby={errors.budget ? 'enquiry-budget-error' : undefined}
          />
          {errors.budget && (
            <p id="enquiry-budget-error" className={styles['enquiry-form__error']}>
              {errors.budget}
            </p>
          )}
        </div>

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className={styles['enquiry-form__textarea']}
          rows="5"
          aria-label="Message"
        ></textarea>

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

        {message && (
          <p className={`${styles['enquiry-form__message']} ${styles[`enquiry-form__message--${message.type}`]}`}>
            {message.text}
          </p>
        )}

        <p className={styles['enquiry-form__disclaimer']}>
          By submitting this form you agree to the Terms and Conditions and Privacy Policy
        </p>

        <button type="submit" className={styles['enquiry-form__btn']} disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </aside>
  )
}
