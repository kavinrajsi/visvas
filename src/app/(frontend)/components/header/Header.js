'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

const Logo = () => (
  <svg width="177" height="40" viewBox="0 0 177 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['header__logo-svg']}>
    <g clipPath="url(#clip0_670_6538)">
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
      <clipPath id="clip0_670_6538">
        <rect width="177" height="40" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle menu and manage scroll
  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)

    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement
      const bodyElement = document.body

      if (newState) {
        htmlElement.classList.add('open-menu')
        bodyElement.classList.add('open-menu')
      } else {
        htmlElement.classList.remove('open-menu')
        bodyElement.classList.remove('open-menu')
      }
    }
  }

  // Close menu when navigation link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('open-menu')
      document.body.classList.remove('open-menu')
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('open-menu')
        document.body.classList.remove('open-menu')
      }
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles['header__container']}>
        {/* Logo */}
        <Link href="/" className={styles['header__logo']}>
          <Logo />
        </Link>

        {/* Hamburger button - visible only on mobile */}
        <button
          className={styles['header__menu-toggle']}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="navigation"
        >
          <span className={styles['header__hamburger']}></span>
        </button>

        {/* Navigation */}
        <nav
          id="navigation"
          className={`${styles['header__nav']} ${isMenuOpen ? styles['header__nav--open'] : ''}`}
        >
          <ul className={styles['header__nav-list']}>
            <li className={styles['header__nav-item']}>
              <Link
                href="/"
                className={styles['header__nav-link']}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className={styles['header__nav-item']}>
              <button
                className={`${styles['header__nav-link']} ${styles['header__nav-link--with-dropdown']}`}
                aria-haspopup="true"
              >
                Projects
                <svg className={styles['header__dropdown-icon']} width="12" height="11" viewBox="0 0 12 11" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
            <li className={styles['header__nav-item']}>
              <Link
                href="/community"
                className={styles['header__nav-link']}
                onClick={closeMenu}
              >
                Community
              </Link>
            </li>
            <li className={styles['header__nav-item']}>
              <Link
                href="/about"
                className={styles['header__nav-link']}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li className={styles['header__nav-item']}>
              <Link
                href="/blog"
                className={styles['header__nav-link']}
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li className={styles['header__nav-item']}>
              <Link
                href="/contact"
                className={styles['header__nav-link']}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Contact info - visible only on mobile nav */}
          <div className={styles['header__nav-footer']}>
            <div className={styles['header__contact-info']}>
              <p className={styles['header__contact-label']}>Call us:</p>
              <p className={styles['header__contact-number']}>+91 95432 24411</p>
            </div>
            <button
              className={styles['header__cta']}
              onClick={closeMenu}
            >
              Enquiry Now
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop right section */}
      <div className={styles['header__right']}>
        <div className={styles['header__contact']}>
          <p className={styles['header__contact-label']}>Call us:</p>
          <p className={styles['header__contact-number']}>+91 95432 24411</p>
        </div>
        <button className={styles['header__cta']}>
          Enquiry Now
        </button>
      </div>
    </header>
  )
}
