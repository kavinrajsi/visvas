'use client'

import { useState } from 'react'
import styles from './ProjectEnquiryForm.module.css'

export default function ProjectEnquiryForm({ projectName }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: false,
    email: '',
    budget: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <aside className={styles['enquiry-form']}>
      <h3 className={styles['enquiry-form__heading']}>Request for more information</h3>

      <form onSubmit={handleSubmit} className={styles['enquiry-form__form']}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={styles['enquiry-form__input']}
          required
          aria-label="Full name"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile*"
          value={formData.mobile}
          onChange={handleChange}
          className={styles['enquiry-form__input']}
          required
          aria-label="Mobile number"
        />

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

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={styles['enquiry-form__input']}
          required
          aria-label="Email address"
        />

        <input
          type="text"
          name="budget"
          placeholder="Enter your budget*"
          value={formData.budget}
          onChange={handleChange}
          className={styles['enquiry-form__input']}
          required
          aria-label="Budget"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className={styles['enquiry-form__textarea']}
          rows="5"
          aria-label="Message"
        ></textarea>

        <p className={styles['enquiry-form__disclaimer']}>
          By submitting this form you agree to the Terms and Conditions and Privacy Policy
        </p>

        <button type="submit" className={styles['enquiry-form__btn']}>
          Send OTP
        </button>
      </form>
    </aside>
  )
}
