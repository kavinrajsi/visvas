'use client'

import { useState } from 'react'
import { getAttributionData } from '@/lib/analytics/attribution'
import { getRecaptchaToken } from '@/lib/security/recaptchaClient'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'
import { trackFormSubmission } from '@/lib/gtm/events'
import FormSuccess from '@/app/(frontend)/components/form-success/FormSuccess'
import styles from './ProjectEnquiryForm.module.scss'

export default function ProjectEnquiryForm({ projectName, brochureUrl }) {
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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Name is required'
    }

    if (!formData.mobile || formData.mobile.trim().length === 0) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number'
    }

    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.budget || formData.budget.trim().length === 0) {
      newErrors.budget = 'Budget is required'
    }

    return newErrors
  }

  const mapServerErrors = (serverErrors) => {
    const mapped = {}
    serverErrors.forEach((err) => {
      if (err.includes('Name') || err.includes('name')) mapped.name = err
      else if (err.includes('Mobile') || err.includes('mobile') || err.includes('phone')) mapped.mobile = err
      else if (err.includes('Email') || err.includes('email')) mapped.email = err
      else if (err.includes('Budget') || err.includes('budget')) mapped.budget = err
    })
    return mapped
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setMessage({ type: 'error', text: 'Please fix the errors above.' })
      return
    }

    setLoading(true)

    try {
      const recaptchaToken = await getRecaptchaToken('enquiry')
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'enquiry',
          formData,
          attribution: getAttributionData(),
          recaptchaToken,
        }),
      })

      const result = await response.json()
      if (result.fields) console.table(result.fields)
      if (result.destinations) console.table(result.destinations)

      if (result.success) {
        trackFormSubmission('enquiry', { ...formData }, 'success')
        setMessage({ type: 'success' })
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
        trackFormSubmission('enquiry', { ...formData }, 'error')
        setErrors(mapServerErrors(result.errors || []))
        setMessage({ type: 'error', text: result.error || 'Failed to submit form. Please try again.' })
      }
    } catch {
      trackFormSubmission('enquiry', { ...formData }, 'error')
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className={styles['project-enquiry-form']}>
      {message?.type === 'success' ? (
        <FormSuccess
          link={brochureUrl ? { url: brochureUrl, text: 'Download Brochure' } : undefined}
        />
      ) : (
        <form className={styles['project-enquiry-form__form']} onSubmit={handleSubmit} noValidate>
          <div className={styles['project-enquiry-form__field']}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              className={`${styles['project-enquiry-form__input']} ${errors.name ? styles['project-enquiry-form__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.name && <span className={styles['project-enquiry-form__error']}>{errors.name}</span>}
          </div>

          <div className={styles['project-enquiry-form__field']}>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile*"
              value={formData.mobile}
              onChange={handleChange}
              className={`${styles['project-enquiry-form__input']} ${errors.mobile ? styles['project-enquiry-form__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.mobile && <span className={styles['project-enquiry-form__error']}>{errors.mobile}</span>}

            <div className={styles['project-enquiry-form__checkbox-group']}>
              <input
                type="checkbox"
                id="project-enquiry-whatsapp"
                name="whatsapp"
                checked={formData.whatsapp}
                onChange={handleChange}
                className={styles['project-enquiry-form__checkbox']}
                disabled={loading}
              />
              <label htmlFor="project-enquiry-whatsapp" className={styles['project-enquiry-form__checkbox-label']}>
                Do you have whatsapp activated on this number?
              </label>
            </div>
          </div>

          <div className={styles['project-enquiry-form__field']}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className={`${styles['project-enquiry-form__input']} ${errors.email ? styles['project-enquiry-form__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.email && <span className={styles['project-enquiry-form__error']}>{errors.email}</span>}
          </div>

          <div className={styles['project-enquiry-form__field']}>
            <input
              type="text"
              name="budget"
              placeholder="Enter your budget*"
              value={formData.budget}
              onChange={handleChange}
              className={`${styles['project-enquiry-form__input']} ${errors.budget ? styles['project-enquiry-form__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.budget && <span className={styles['project-enquiry-form__error']}>{errors.budget}</span>}
          </div>

          <div className={styles['project-enquiry-form__field']}>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={styles['project-enquiry-form__textarea']}
              disabled={loading}
            />
          </div>

          <p className={styles['project-enquiry-form__disclaimer']}>
            By submitting this form you agree to the Terms and Conditions and Privacy Policy
          </p>

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
            <p className={styles['project-enquiry-form__message']}>{message.text}</p>
          )}

          <button type="submit" className={styles['project-enquiry-form__btn']} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </aside>
  )
}
