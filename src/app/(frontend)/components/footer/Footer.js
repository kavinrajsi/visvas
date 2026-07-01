import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import styles from './Footer.module.scss'

const Logo = () => (
  <svg width="177" height="40" viewBox="0 0 177 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['footer__logo-svg']}>
    <g clipPath="url(#clip0_footer_logo)">
      <path d="M14.1984 0L0.0235405 40H40.0138L25.8389 0H14.1984Z" fill="#1B5E30"/>
      <path d="M30.029 0L20.0167 13.4993L10.0084 0H0V3.46105H2.56584L20.0167 26.9985L37.4715 3.46105H40.0373V0H30.029Z" fill="#E09C26"/>
      <path d="M87.5525 9.1561V7.91357H78.6545V9.18354C79.6196 9.2149 81.0634 9.74797 81.0673 11.4177C81.0987 11.7391 81.134 28.1468 81.1301 28.9425C81.1144 30.5064 79.5568 31.1257 78.6584 31.1845V32.427H87.5564V31.1571C86.5913 31.1257 85.1475 30.5927 85.1436 28.9229C85.1122 28.6015 85.0769 12.1938 85.0808 11.3981C85.0965 9.8342 86.6541 9.2149 87.5525 9.1561Z" fill="#1B5E30"/>
      <path d="M106.714 19.884C105.423 18.8493 98.7849 16.0742 97.4196 14.7219C96.07 13.3853 95.9837 11.4019 97.1568 9.98302C98.7849 8.01536 103.693 7.65083 105.286 10.7121C105.568 11.2569 105.784 11.8331 106.016 12.4014H107.251L107.087 8.32109C106.942 8.21134 104.678 7.67043 103.736 7.5254C101.19 7.13736 98.6869 7.23927 96.3329 8.38772C94.0417 9.50482 92.5351 11.206 92.3429 13.7968C92.1585 16.325 93.3669 18.1555 95.5364 19.3745C96.9135 20.1467 102.555 22.6004 103.607 23.6783C105.054 25.1599 105.435 27.4686 104.407 29.0639C103.085 31.2275 100.747 31.8625 98.2278 31.5332C95.9994 31.2236 94.4615 29.5891 94.0809 27.8488C93.9436 27.3588 93.8455 26.8532 93.72 26.3632H91.978V30.5651C93.1746 31.447 95.3874 32.2858 97.2078 32.5759C100.284 32.9051 103.693 32.521 106.377 30.3495C109.825 27.5587 110.049 22.5651 106.71 19.884H106.714Z" fill="#1B5E30"/>
      <path d="M174.619 19.884C173.328 18.8493 166.69 16.0742 165.324 14.7219C163.975 13.3853 163.888 11.4019 165.061 9.98302C166.69 8.01536 171.598 7.65083 173.19 10.7121C173.473 11.2569 173.689 11.8331 173.92 12.4014H175.156L174.991 8.32109C174.846 8.21134 172.582 7.67043 171.641 7.5254C169.095 7.13736 166.591 7.23927 164.237 8.38772C161.946 9.50482 160.44 11.206 160.247 13.7968C160.063 16.325 161.271 18.1555 163.441 19.3745C164.818 20.1467 170.46 22.6004 171.511 23.6783C172.959 25.1599 173.34 27.4686 172.312 29.0639C170.99 31.2275 168.651 31.8625 166.132 31.5332C163.904 31.2236 162.366 29.5891 161.986 27.8488C161.848 27.3588 161.75 26.8532 161.625 26.3632H159.883V30.5651C161.079 31.447 163.292 32.2858 165.112 32.5759C168.188 32.9051 171.598 32.521 174.281 30.3495C177.73 27.5587 177.953 22.5651 174.615 19.884H174.619Z" fill="#1B5E30"/>
      <path d="M72.3301 7.89404C72.3301 7.89404 65.0014 25.8421 64.5737 26.8651H64.3305C64.0951 26.3203 56.6643 7.89404 56.6643 7.89404H50.0928V9.15225C51.513 9.23064 52.6076 9.94794 53.0823 11.1121C53.4237 11.9548 59.2655 25.752 61.8235 32.431H64.0245C64.4756 30.9533 70.1644 17.2542 72.644 11.312C73.1658 10.0655 73.9622 9.21888 75.4217 9.17185V7.89404H72.3301Z" fill="#1B5E30"/>
      <path d="M133.341 7.89404C133.341 7.89404 126.013 25.8421 125.585 26.8651H125.342C125.106 26.3203 117.676 7.89404 117.676 7.89404H111.104V9.15225C112.524 9.23064 113.619 9.94794 114.094 11.1121C114.435 11.9548 120.277 25.752 122.835 32.431H125.036C125.487 30.9533 131.176 17.2542 133.655 11.312C134.177 10.0655 134.974 9.21888 136.433 9.17185V7.89404H133.341Z" fill="#1B5E30"/>
      <path d="M154.386 29.213C154.045 28.3703 148.203 14.5731 145.645 7.89404H143.444C142.993 9.37175 137.304 23.0709 134.824 29.0131C134.303 30.2596 133.506 31.1062 132.047 31.1532V32.431H135.138C135.138 32.431 136.861 28.2174 138.681 23.7529H147.301C149.101 28.2135 150.8 32.431 150.8 32.431H157.372V31.1728C155.951 31.0944 154.857 30.3771 154.382 29.213H154.386ZM139.297 22.2439C141.031 17.995 142.695 13.9303 142.891 13.4599H143.134C143.244 13.7147 144.927 17.8813 146.692 22.2439H139.297Z" fill="#1B5E30"/>
      <path d="M147.791 5.89884H141.294V4.78174H147.791V5.89884Z" fill="#1B5E30"/>
    </g>
    <defs>
      <clipPath id="clip0_footer_logo">
        <rect width="177" height="40" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2C3.79 2 2 3.79 2 6V24C2 26.21 3.79 28 6 28H24C26.21 28 28 26.21 28 24V6C28 3.79 26.21 2 24 2H6ZM6 4H24C25.1 4 26 4.9 26 6V24C26 25.1 25.1 26 24 26H6C4.9 26 4 25.1 4 24V6C4 4.9 4.9 4 6 4ZM7 8C6.45 8 6 8.45 6 9C6 9.55 6.45 10 7 10C7.55 10 8 9.55 8 9C8 8.45 7.55 8 7 8ZM6 12H8V22H6V12ZM10 12H12V22H10V12ZM10.5 13.5C10.5 13.5 11.33 12 12.5 12C13.67 12 14.33 13.5 14.33 15V22H12.5V15C12.5 14.5 12.25 14 11.75 14C11.25 14 11 14.5 11 15V22H9.17V15C9.17 13.5 9.83 12 11 12C12.17 12 12.5 13.5 12.5 13.5V13.5Z" fill="currentColor"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 2.5C20 2.5 20.6 2.5 22.5 2.6C24.3 2.7 25.3 3 26 3.5C26.6 3.9 27.1 4.4 27.5 5C28 5.7 28.3 6.7 28.4 8.5C28.5 10.4 28.5 11 28.5 15C28.5 20 28.5 20.6 28.4 22.5C28.3 24.3 28 25.3 27.5 26C27.1 26.6 26.6 27.1 26 27.5C25.3 28 24.3 28.3 22.5 28.4C20.6 28.5 20 28.5 15 28.5C10 28.5 9.4 28.5 7.5 28.4C5.7 28.3 4.7 28 4 27.5C3.4 27.1 2.9 26.6 2.5 26C2 25.3 1.7 24.3 1.6 22.5C1.5 20.6 1.5 20 1.5 15C1.5 10 1.5 9.4 1.6 7.5C1.7 5.7 2 4.7 2.5 4C2.9 3.4 3.4 2.9 4 2.5C4.7 2 5.7 1.7 7.5 1.6C9.4 1.5 10 1.5 15 1.5C15 1.5 15 2.5 15 2.5ZM15 5C11.1 5 7.5 8.6 7.5 12.5C7.5 16.4 11.1 20 15 20C18.9 20 22.5 16.4 22.5 12.5C22.5 8.6 18.9 5 15 5ZM15 7.5C17.8 7.5 20 9.7 20 12.5C20 15.3 17.8 17.5 15 17.5C12.2 17.5 10 15.3 10 12.5C10 9.7 12.2 7.5 15 7.5ZM23.8 4.8C24.5 4.8 25.1 5.4 25.1 6.1C25.1 6.8 24.5 7.4 23.8 7.4C23.1 7.4 22.5 6.8 22.5 6.1C22.5 5.4 23.1 4.8 23.8 4.8Z" fill="currentColor"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 2C8.4 2 2 8.4 2 15C2 21.6 8.4 28 15 28C21.6 28 28 21.6 28 15C28 8.4 21.6 2 15 2ZM15 4C20.5 4 26 9.5 26 15C26 20.5 20.5 26 15 26C9.5 26 4 20.5 4 15C4 9.5 9.5 4 15 4ZM12 11V13H10V15H12V25H14.5V15H16.5L17 13H14.5V12C14.5 11.4 14.7 11 15.3 11H17V9C16.3 8.9 15.6 8.8 14.9 8.8C12.6 8.8 12 10.2 12 11Z" fill="currentColor"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 7.5C27 7.5 26.8 6.2 26.2 5.6C25.4 4.7 24.5 4.7 24.1 4.6C20.2 4.3 15 4.3 15 4.3H14.9C14.9 4.3 9.7 4.3 5.8 4.6C5.4 4.7 4.5 4.7 3.7 5.6C3.1 6.2 3 7.5 3 7.5C3 7.5 2.8 9.1 2.8 10.6V12.3C2.8 13.8 3 15.4 3 15.4C3 15.4 3.1 16.7 3.7 17.3C4.5 18.2 5.6 18.1 6.1 18.3C7.8 18.5 15 18.6 15 18.6C15 18.6 20.2 18.6 24.1 18.2C24.5 18.1 25.4 18.1 26.2 17.3C26.8 16.7 27 15.4 27 15.4C27 15.4 27.2 13.8 27.2 12.3V10.6C27.2 9.1 27 7.5 27 7.5ZM12 13L12 9.5L18 11.2L12 13Z" fill="currentColor"/>
  </svg>
)

const XIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.5 3.5H29L18.6 13.4L30 26.5H20.7L13 17.8L4.3 26.5H0.5L11.6 15.9L0.5 3.5H10L16.8 11.2L25.5 3.5ZM22.1 24.1H24.3L8.1 5.7H5.6L22.1 24.1Z" fill="currentColor"/>
  </svg>
)

async function getRecentProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 6,
      sort: '-createdAt',
      depth: 0,
      select: { name: true, slug: true },
    })
    return result.docs.filter((p) => p.slug)
  } catch {
    return []
  }
}

async function getContactDetails() {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact-page', depth: 0 })
    return data?.contactDetails || {}
  } catch {
    return {}
  }
}

export default async function Footer() {
  const [projects, contactDetails] = await Promise.all([
    getRecentProjects(),
    getContactDetails(),
  ])

  const phone = contactDetails.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 94038 93898'
  const address = contactDetails.address || '84, TPK Road, Andalpuram, Madurai'

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Our Impact', href: '/community' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles['footer__container']}>
        {/* Mobile Layout */}
        <div className={styles['footer__mobile']}>
          <div className={styles['footer__logo']}>
            <Logo />
          </div>

          <nav className={styles['footer__nav']}>
            <ul className={styles['footer__nav-list']}>
              {quickLinks.map((link) => (
                <li key={link.href} className={styles['footer__nav-item']}>
                  <Link href={link.href} className={styles['footer__nav-link']}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={`${styles['footer__nav-item']} ${styles['footer__nav-item--mobile-only']}`}>
                <Link href="/projects/ongoing" className={styles['footer__nav-link']}>
                  Recent Projects
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles['footer__contact']}>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className={styles['footer__contact-phone']}>
              {phone}
            </a>
            <p className={styles['footer__contact-address']}>{address}</p>
          </div>

          <div className={styles['footer__social']}>
            <a href="#" aria-label="LinkedIn" className={styles['footer__social-icon']}>
              <LinkedinIcon />
            </a>
            <a href="#" aria-label="Instagram" className={styles['footer__social-icon']}>
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook" className={styles['footer__social-icon']}>
              <FacebookIcon />
            </a>
            <a href="#" aria-label="YouTube" className={styles['footer__social-icon']}>
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="X (Twitter)" className={styles['footer__social-icon']}>
              <XIcon />
            </a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={styles['footer__desktop-columns']}>
          <div className={styles['footer__logo']}>
            <Logo />
          </div>

          <div className={styles['footer__projects-column']}>
            <h3 className={styles['footer__projects-heading']}>Recent Projects</h3>
            <ul className={styles['footer__projects-list']}>
              {projects.map((project) => (
                <li key={project.id} className={styles['footer__projects-item']}>
                  <Link href={`/projects/${project.slug}`} className={styles['footer__projects-link']}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['footer__quick-links-column']}>
            <h3 className={styles['footer__quick-links-heading']}>Quick links</h3>
            <ul className={styles['footer__quick-links-list']}>
              {quickLinks.map((link) => (
                <li key={link.href} className={styles['footer__quick-links-item']}>
                  <Link href={link.href} className={styles['footer__quick-links-link']}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles['footer__contact-desktop']}>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className={styles['footer__contact-phone-desktop']}>
              {phone}
            </a>
            <p className={styles['footer__contact-address-desktop']}>{address}</p>
            <div className={styles['footer__social-desktop']}>
              <a href="#" aria-label="LinkedIn" className={styles['footer__social-icon']}>
                <LinkedinIcon />
              </a>
              <a href="#" aria-label="Instagram" className={styles['footer__social-icon']}>
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className={styles['footer__social-icon']}>
                <FacebookIcon />
              </a>
              <a href="#" aria-label="YouTube" className={styles['footer__social-icon']}>
                <YoutubeIcon />
              </a>
              <a href="#" aria-label="X (Twitter)" className={styles['footer__social-icon']}>
                <XIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['footer__divider']}></div>

      <div className={styles['footer__bottom']}>
        <p className={styles['footer__copyright']}>© 2024 Copyrights Visvas promoters</p>
        <p className={styles['footer__credit']}>
          Made by{' '}
          <a href="https://madarth.com" target="_blank" rel="noopener noreferrer" className={styles['footer__credit-link']}>
            Madarth
          </a>
        </p>
      </div>
    </footer>
  )
}
