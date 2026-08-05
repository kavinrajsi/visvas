'use client'

import Link from 'next/link'
import { trackPhoneClick, trackAddressClick, trackEvent } from '@/lib/gtm/events'
import styles from './Footer.module.scss'

export default function FooterContactInfo({ phone, address, whatsappHref }) {
  const handlePhoneClick = () => {
    trackPhoneClick(phone, 'footer')
  }

  const handleAddressClick = () => {
    trackAddressClick(address, 'footer')
  }

  return (
    <div className={styles['footer__contact-info']}>
      <Link
        href={`tel:${phone.replace(/\s/g, '')}`}
        className={styles['footer__contact-phone']}
        onClick={handlePhoneClick}
      >
        {phone}
      </Link>
      {whatsappHref && (
        <a
          href={whatsappHref}
          className={styles['footer__contact-whatsapp']}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
        >
          Chat on WhatsApp
        </a>
      )}
      <p
        className={styles['footer__contact-address']}
        onClick={handleAddressClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleAddressClick()
          }
        }}
      >
        {address}
      </p>
    </div>
  )
}
