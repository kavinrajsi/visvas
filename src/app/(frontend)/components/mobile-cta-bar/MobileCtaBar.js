'use client'

import { useEnquiryModal } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import { trackEvent, trackPhoneClick } from '@/lib/gtm/events'
import styles from './MobileCtaBar.module.scss'

export default function MobileCtaBar({ phone, whatsappHref }) {
  const { openEnquiryModal } = useEnquiryModal()

  return (
    <nav className={styles['mobile-cta']} aria-label="Mobile quick actions">
      <a
        className={styles['mobile-cta__link']}
        href={`tel:${String(phone || '').replace(/\s/g, '')}`}
        aria-label="Call Visvas"
        onClick={() => trackPhoneClick(phone, 'mobile_cta_bar')}
      >
        Call Us
      </a>
      {whatsappHref && (
        <a
          className={styles['mobile-cta__link']}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Visvas on WhatsApp"
          onClick={() => trackEvent('whatsapp_click', { source: 'mobile_cta_bar' })}
        >
          WhatsApp
        </a>
      )}
      <button
        className={styles['mobile-cta__link']}
        onClick={() => openEnquiryModal()}
        aria-label="Open enquiry form"
        type="button"
      >
        Enquire
      </button>
    </nav>
  )
}
