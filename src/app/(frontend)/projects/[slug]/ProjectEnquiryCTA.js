'use client'

import { useEnquiryModal } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import styles from './ProjectEnquiryCTA.module.scss'

export default function ProjectEnquiryCTA({ projectName }) {
  const { openEnquiryModal } = useEnquiryModal()

  return (
    <aside className={styles['enquiry-cta']}>
      <h3 className={styles['enquiry-cta__title']}>Interested in this project?</h3>
      <p className={styles['enquiry-cta__subtitle']}>Get more information and pricing details</p>
      <button
        className={styles['enquiry-cta__btn']}
        onClick={() => openEnquiryModal(projectName)}
      >
        Enquire Now
      </button>
    </aside>
  )
}
