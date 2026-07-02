'use client'

import { useEffect } from 'react'
import { trackPageView, trackPhoneClick, trackAddressClick } from '@/lib/gtm/events'

export default function ContactPageClient({ phone, email, address }) {
  useEffect(() => {
    trackPageView({
      page_type: 'contact',
      page_url: '/contact',
      has_phone: !!phone,
      has_email: !!email,
      has_address: !!address,
    })
  }, [])

  const handlePhoneClick = () => {
    trackPhoneClick(phone, 'contact_page')
  }

  const handleEmailClick = () => {
    trackPageView({
      event: 'email_click',
      email: email,
      email_source: 'contact_page',
    })
  }

  const handleAddressClick = () => {
    trackAddressClick(address, 'contact_page')
  }

  return (
    <>
      <div data-phone-tracker onClick={handlePhoneClick} />
      <div data-email-tracker onClick={handleEmailClick} />
      <div data-address-tracker onClick={handleAddressClick} />
    </>
  )
}
