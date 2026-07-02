'use client'

import Link from 'next/link'
import { trackPhoneClick, trackAddressClick } from '@/lib/gtm/events'
import styles from './Footer.module.scss'

export default function FooterContactInfo({ phone, address }) {
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
