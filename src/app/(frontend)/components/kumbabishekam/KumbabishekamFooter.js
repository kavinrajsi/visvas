'use client'

import { trackEvent } from '@/lib/gtm/events'
import styles from './KumbabishekamFooter.module.scss'

// Minimal copyright bar matching the reference site's footer — distinct from
// the site-wide Footer (hidden on this page via HideOnRoutes in layout.js).
export default function KumbabishekamFooter() {
  const year = new Date().getFullYear()

  const utm = new URLSearchParams({
    utm_source: 'visvas',
    utm_medium: 'footer_credit',
    utm_campaign: 'kumbabishekam',
  }).toString()

  return (
    <footer className={styles.footer}>
      <p className={styles.footer__line}>&copy; {year} Copyrights Visvas promoters</p>
      <p className={styles.footer__line}>
        Made by{' '}
        <a
          href={`https://madarth.com?${utm}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
          onClick={() =>
            trackEvent('outbound_click', {
              destination: 'madarth',
              link_text: 'Madarth®',
              link_url: 'https://madarth.com',
              source: 'kumbabishekam_footer',
            })
          }
        >
          Madarth<sup>&reg;</sup>
        </a>
      </p>
    </footer>
  )
}
