'use client'

import { useEnquiryModal } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import styles from './MobileCtaBar.module.scss'

export default function MobileCtaBar() {
  const { openEnquiryModal } = useEnquiryModal()

  return (
    <nav className={styles['mobile-cta']} aria-label="Mobile quick actions">
      <a
        className={styles['mobile-cta__link']}
        href="tel:+919543224411"
        aria-label="Call Visvas"
      >
        Call Us
      </a>
      <button
        className={styles['mobile-cta__link']}
        onClick={() => openEnquiryModal()}
        aria-label="Open enquiry form"
        type="button"
      >
        Enquiry Now
      </button>
    </nav>
  )
}
