'use client'

import { useState } from 'react'
import styles from './ContactForm.module.scss'

export default function ContactForm({ heading = 'Contact Form', disclaimer = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^[0-9+\-\s()]{7,15}$/

    if (!data.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!data.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.'
    } else if (!phonePattern.test(data.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (!data.message.trim()) {
      nextErrors.message = 'Please enter a message.'
    }

    return nextErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
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

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage({
          type: 'success',
          text: 'Thank you for your message. We will get back to you shortly.',
        })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
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
    <aside className={styles['contact-form']}>
      {heading && (
        <h3 className={styles['contact-form__heading']}>{heading}</h3>
      )}

      <form onSubmit={handleSubmit} className={styles['contact-form__form']} noValidate>
        {/* Name */}
        <div className={styles['form-field']}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className={`${styles['form-input']} ${errors.name ? styles['form-input--error'] : ''}`}
            aria-label="Full name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className={styles['form-error']}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className={styles['form-field']}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className={`${styles['form-input']} ${errors.email ? styles['form-input--error'] : ''}`}
            aria-label="Email address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className={styles['form-error']}>{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className={styles['form-field']}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone*"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles['form-input']} ${errors.phone ? styles['form-input--error'] : ''}`}
            aria-label="Phone number"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && (
            <p className={styles['form-error']}>{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className={styles['form-field']}>
          <textarea
            name="message"
            placeholder="Message*"
            value={formData.message}
            onChange={handleChange}
            className={`${styles['form-textarea']} ${errors.message ? styles['form-textarea--error'] : ''}`}
            rows="5"
            aria-label="Message"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className={styles['form-error']}>{errors.message}</p>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <p className={`${styles['form-message']} ${styles[`form-message--${message.type}`]}`}>
            {message.text}
          </p>
        )}

        {/* Disclaimer */}
        {disclaimer && (
          <p className={styles['form-disclaimer']}>{disclaimer}</p>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles['form-btn']} disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </aside>
  )
}
