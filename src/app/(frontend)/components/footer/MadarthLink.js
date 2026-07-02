'use client'

import { trackEvent } from '@/lib/gtm/events'
import styles from './Footer.module.scss'

export default function MadarthLink() {
  const handleMadarathClick = () => {
    trackEvent('outbound_click', {
      destination: 'madarth',
      link_text: 'Madarth',
      link_url: 'https://madarth.com',
      source: 'footer',
    })
  }

  const utm = new URLSearchParams({
    utm_source: 'visvas',
    utm_medium: 'footer_credit',
    utm_campaign: 'website_footer',
  }).toString()

  return (
    <a
      href={`https://madarth.com?${utm}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles['footer__credit-link']}
      onClick={handleMadarathClick}
    >
      Madarth
    </a>
  )
}
