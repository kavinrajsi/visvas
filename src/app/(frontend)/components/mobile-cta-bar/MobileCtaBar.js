import styles from './MobileCtaBar.module.css'

export default function MobileCtaBar() {
  return (
    <nav className={styles['mobile-cta']} aria-label="Mobile quick actions">
      <a
        className={styles['mobile-cta__link']}
        href="tel:+919543224411"
        aria-label="Call Visvas"
      >
        Call Us
      </a>
      <a
        className={styles['mobile-cta__link']}
        href="/contact"
        aria-label="Open enquiry form"
      >
        Enquiry Now
      </a>
    </nav>
  )
}
