'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Header.module.scss'

const DesktopLogo = () => (
  <svg width="276" height="86" viewBox="0 0 276 86" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.0281 0L0 86H276L241.972 0H34.0281Z" fill="#F5F3EB"/>
    <g clipPath="url(#clip0_769_3754)">
      <path d="M64.1985 23L50.0236 63H90.0138L75.8389 23H64.1985Z" fill="#1B5E30"/>
      <path d="M80.029 23L70.0167 36.4993L60.0084 23H50V26.461H52.5658L70.0167 49.9985L87.4715 26.461H90.0373V23H80.029Z" fill="#E09C26"/>
      <path d="M137.552 32.1563V30.9138H128.654V32.1837C129.62 32.2151 131.063 32.7482 131.067 34.4179C131.099 34.7393 131.134 51.147 131.13 51.9427C131.114 53.5066 129.557 54.1259 128.658 54.1847V55.4272H137.556V54.1573C136.591 54.1259 135.147 53.5928 135.144 51.9231C135.112 51.6017 135.077 35.194 135.081 34.3983C135.096 32.8344 136.654 32.2151 137.552 32.1563Z" fill="#1B5E30"/>
      <path d="M156.714 42.8844C155.423 41.8496 148.785 39.0745 147.42 37.7222C146.07 36.3856 145.984 34.4023 147.157 32.9833C148.785 31.0157 153.693 30.6512 155.286 33.7124C155.568 34.2572 155.784 34.8334 156.016 35.4018H157.251L157.087 31.3214C156.942 31.2117 154.678 30.6707 153.736 30.5257C151.19 30.1377 148.687 30.2396 146.333 31.388C144.042 32.5051 142.535 34.2063 142.343 36.7972C142.158 39.3253 143.367 41.1558 145.536 42.3748C146.914 43.147 152.555 45.6007 153.607 46.6786C155.054 48.1602 155.435 50.4689 154.407 52.0642C153.085 54.2278 150.747 54.8628 148.228 54.5336C145.999 54.2239 144.461 52.5894 144.081 50.8491C143.944 50.3591 143.846 49.8535 143.72 49.3635H141.978V53.5654C143.175 54.4473 145.387 55.2861 147.208 55.5762C150.284 55.9054 153.693 55.5213 156.377 53.3498C159.825 50.559 160.049 45.5654 156.71 42.8844H156.714Z" fill="#1B5E30"/>
      <path d="M224.619 42.8844C223.328 41.8496 216.69 39.0745 215.324 37.7222C213.975 36.3856 213.888 34.4023 215.061 32.9833C216.69 31.0157 221.598 30.6512 223.19 33.7124C223.473 34.2572 223.689 34.8334 223.92 35.4018H225.156L224.991 31.3214C224.846 31.2117 222.582 30.6707 221.641 30.5257C219.094 30.1377 216.591 30.2396 214.237 31.388C211.946 32.5051 210.44 34.2063 210.247 36.7972C210.063 39.3253 211.271 41.1558 213.441 42.3748C214.818 43.147 220.46 45.6007 221.511 46.6786C222.959 48.1602 223.34 50.4689 222.312 52.0642C220.989 54.2278 218.651 54.8628 216.132 54.5336C213.904 54.2239 212.366 52.5894 211.985 50.8491C211.848 50.3591 211.75 49.8535 211.625 49.3635H209.883V53.5654C211.079 54.4473 213.292 55.2861 215.112 55.5762C218.188 55.9054 221.598 55.5213 224.281 53.3498C227.73 50.559 227.953 45.5654 224.615 42.8844H224.619Z" fill="#1B5E30"/>
      <path d="M122.33 30.8942C122.33 30.8942 115.001 48.8422 114.574 49.8653H114.33C114.095 49.3204 106.664 30.8942 106.664 30.8942H100.093V32.1524C101.513 32.2308 102.608 32.9481 103.082 34.1122C103.424 34.9549 109.265 48.7521 111.823 55.4312H114.024C114.476 53.9534 120.164 40.2543 122.644 34.3121C123.166 33.0657 123.962 32.219 125.422 32.172V30.8942H122.33Z" fill="#1B5E30"/>
      <path d="M183.341 30.8942C183.341 30.8942 176.013 48.8422 175.585 49.8653H175.342C175.106 49.3204 167.676 30.8942 167.676 30.8942H161.104V32.1524C162.524 32.2308 163.619 32.9481 164.094 34.1122C164.435 34.9549 170.277 48.7521 172.835 55.4312H175.036C175.487 53.9534 181.176 40.2543 183.655 34.3121C184.177 33.0657 184.974 32.219 186.433 32.172V30.8942H183.341Z" fill="#1B5E30"/>
      <path d="M204.386 52.2131C204.045 51.3704 198.203 37.5732 195.645 30.8942H193.444C192.993 32.3719 187.304 46.071 184.824 52.0132C184.303 53.2597 183.506 54.1063 182.047 54.1534V55.4312H185.138C185.138 55.4312 186.861 51.2175 188.681 46.7531H197.301C199.101 51.2136 200.8 55.4312 200.8 55.4312H207.372V54.173C205.951 54.0946 204.857 53.3773 204.382 52.2131H204.386ZM189.297 45.244C191.031 40.9951 192.695 36.9304 192.891 36.4601H193.134C193.244 36.7148 194.927 40.8814 196.692 45.244H189.297Z" fill="#1B5E30"/>
      <path d="M197.791 28.8991H191.294V27.782H197.791V28.8991Z" fill="#1B5E30"/>
    </g>
    <defs>
      <clipPath id="clip0_769_3754">
        <rect width="177" height="40" fill="white" transform="translate(50 23)"/>
      </clipPath>
    </defs>
  </svg>
)

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const isActive = (href) => pathname === href

  return (
    <header className={styles.header}>
      <nav className={styles['header__desktop-nav']}>
        {/* Left menu */}
        <ul className={styles['header__nav-list']}>
          <li>
            <Link href="/" className={isActive('/') ? styles['header__nav-link--active'] : ''}>
              Home
            </Link>
          </li>
          <li ref={dropdownRef} className={styles['header__nav-item']}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              className={styles['header__nav-link']}
            >
              Projects
              <svg className={`${styles['header__dropdown-icon']} ${isDropdownOpen ? styles['header__dropdown-icon--open'] : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className={styles['header__dropdown']}>
                <li>
                  <Link href="/projects/ongoing" className={styles['header__dropdown-link']}>
                    Ongoing Projects
                  </Link>
                </li>
                <li>
                  <Link href="/projects/completed" className={styles['header__dropdown-link']}>
                    Completed Projects
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/about" className={isActive('/about') ? styles['header__nav-link--active'] : ''}>
              About
            </Link>
          </li>
          <li>
            <Link href="/community" className={isActive('/community') ? styles['header__nav-link--active'] : ''}>
              Community
            </Link>
          </li>
        </ul>

        {/* Center logo */}
        <Link href="/" className={styles['header__logo']}>
          <DesktopLogo />
        </Link>

        {/* Right menu */}
        <ul className={styles['header__nav-list--right']}>
          <li>
            <Link href="/blog" className={isActive('/blog') ? styles['header__nav-link--active'] : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className={isActive('/contact') ? styles['header__nav-link--active'] : ''}>
              Contact
            </Link>
          </li>
          <li>
            <button className={styles['header__cta']}>
              Enquiry
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
