'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import EnquiryModal from './EnquiryModal'
import { trackEvent } from '@/lib/gtm/events'

const EnquiryModalContext = createContext(null)

export function EnquiryModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)

  const openEnquiryModal = (pName = null) => {
    setProjectName(pName)
    setIsOpen(true)
    trackEvent('enquiry_form_visible', {
      project_name: pName || null,
    })
  }

  const closeEnquiryModal = () => {
    setIsOpen(false)
    setProjectName(null)
  }

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('enquiry-modal-open')
      document.body.classList.add('enquiry-modal-open')
    } else {
      document.documentElement.classList.remove('enquiry-modal-open')
      document.body.classList.remove('enquiry-modal-open')
    }

    return () => {
      document.documentElement.classList.remove('enquiry-modal-open')
      document.body.classList.remove('enquiry-modal-open')
    }
  }, [isOpen])

  return (
    <EnquiryModalContext.Provider value={{ openEnquiryModal, closeEnquiryModal }}>
      {children}
      <EnquiryModal isOpen={isOpen} projectName={projectName} onClose={closeEnquiryModal} />
    </EnquiryModalContext.Provider>
  )
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext)
  if (!context) {
    throw new Error('useEnquiryModal must be used within EnquiryModalProvider')
  }
  return context
}
