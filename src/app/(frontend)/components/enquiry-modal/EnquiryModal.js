'use client'

import { useState, useEffect, useRef } from 'react'
import { trackFormSubmission } from '@/lib/gtm/events'
import { getAttributionData } from '@/lib/analytics/attribution'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'
import FormSuccess from '@/app/(frontend)/components/form-success/FormSuccess'
import styles from './EnquiryModal.module.scss'

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function EnquiryModal({ isOpen, projectName, onClose }) {
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
  const modalRef = useRef(null)

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      project: projectName || '',
    }))
  }, [projectName])

  useEffect(() => {
    if (isOpen) {
      // Fresh form each time the modal opens (clears previous success screen)
      setMessage(null)
      setErrors({})
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

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
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setMessage({
        type: 'error',
        text: 'Please fix the errors above.',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'enquiry',
          formData,
          attribution: getAttributionData(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        trackFormSubmission('enquiry', { ...formData }, 'success')
        setMessage({
          type: 'success',
          text: 'Thank you! We will be in touch soon.',
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
        trackFormSubmission('enquiry', { ...formData }, 'error')
        const serverErrors = result.errors || []
        setErrors(mapServerErrors(serverErrors))
        setMessage({
          type: 'error',
          text: result.error || 'Failed to submit form. Please try again.',
        })
      }
    } catch (err) {
      trackFormSubmission('enquiry', { ...formData }, 'error')
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles['enquiry-modal-overlay']} onClick={handleBackdropClick} role="presentation">
      <div className={styles['enquiry-modal-card']} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-heading">
        <div className={styles['enquiry-modal__header']}>
          <h2 id="enquiry-modal-heading" className={styles['enquiry-modal__heading']}>
            Request for more information
          </h2>
          <button
            className={styles['enquiry-modal__close']}
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        {message?.type === 'success' ? (
          <FormSuccess />
        ) : (
        <form className={styles['enquiry-modal__form']} onSubmit={handleSubmit} noValidate>
          <div className={styles['enquiry-modal__field']}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles['enquiry-modal__input']} ${errors.name ? styles['enquiry-modal__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.name && <span className={styles['enquiry-modal__error']}>{errors.name}</span>}
          </div>

          <div className={styles['enquiry-modal__field']}>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`${styles['enquiry-modal__input']} ${errors.mobile ? styles['enquiry-modal__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.mobile && <span className={styles['enquiry-modal__error']}>{errors.mobile}</span>}

            <div className={styles['enquiry-modal__checkbox-group']}>
              <input
                type="checkbox"
                id="whatsapp"
                name="whatsapp"
                checked={formData.whatsapp}
                onChange={handleChange}
                className={styles['enquiry-modal__checkbox']}
                disabled={loading}
              />
              <label htmlFor="whatsapp" className={styles['enquiry-modal__checkbox-label']}>
                Do you have whatsapp activated on this number?
              </label>
            </div>
          </div>

          <div className={styles['enquiry-modal__field']}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles['enquiry-modal__input']} ${errors.email ? styles['enquiry-modal__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.email && <span className={styles['enquiry-modal__error']}>{errors.email}</span>}
          </div>

          <div className={styles['enquiry-modal__field']}>
            <input
              type="text"
              name="budget"
              placeholder="Enter your budget"
              value={formData.budget}
              onChange={handleChange}
              className={`${styles['enquiry-modal__input']} ${errors.budget ? styles['enquiry-modal__input--error'] : ''}`}
              disabled={loading}
            />
            {errors.budget && <span className={styles['enquiry-modal__error']}>{errors.budget}</span>}
          </div>

          <div className={styles['enquiry-modal__field']}>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={styles['enquiry-modal__textarea']}
              disabled={loading}
            />
            {message?.type === 'error' && (
              <p
                className={`${styles['enquiry-modal__message']} ${styles['enquiry-modal__message--error']}`}
              >
                {message.text}
              </p>
            )}
          </div>

          <p className={styles['enquiry-modal__disclaimer']}>
            By submitting this form you agree to the Terms and Conditions and Privacy Policy
          </p>

          <input type="text" name={HONEYPOT_FIELD} value={formData[HONEYPOT_FIELD]} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          <button type="submit" className={styles['enquiry-modal__btn']} disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
        )}
      </div>
    </div>
  )
}
