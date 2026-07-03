'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import '@/lib/gsap/registerPlugins'
import ContactForm from './ContactForm'

export default function ContactFormAnimated({ heading, disclaimer, successMessage }) {
  const formRef = useRef(null)

  useGSAP(
    () => {
      if (!formRef.current) return

      // Animate form fields and button on mount
      const inputs = formRef.current.querySelectorAll('input, textarea, label, button[type="submit"]')
      gsap.from(inputs, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      })

      // Add hover animations to input fields
      inputs.forEach((input) => {
        if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
          input.addEventListener('focusin', () => {
            gsap.to(input, {
              scale: 1.02,
              duration: 0.2,
              ease: 'power2.out',
            })
          })
          input.addEventListener('focusout', () => {
            gsap.to(input, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            })
          })
        }
      })

      // Animate submit button on hover
      const submitBtn = formRef.current.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to(submitBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        submitBtn.addEventListener('mouseleave', () => {
          gsap.to(submitBtn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }
    },
    { scope: formRef }
  )

  return (
    <div ref={formRef}>
      <ContactForm
        heading={heading}
        disclaimer={disclaimer}
        successMessage={successMessage}
      />
    </div>
  )
}
