'use client'

import Link from 'next/link'
import { trackLanguageSwitch } from '@/lib/gtm/events'
import styles from './LanguageSwitch.module.scss'

export default function LanguageSwitch({ language }) {
  const isEnglish = language === 'en'

  return (
    <div className={styles['lang-switch']}>
      <Link
        href="/kumbabishekam"
        className={`${styles['lang-switch__option']} ${
          isEnglish ? styles['lang-switch__option--active'] : ''
        }`}
        aria-current={isEnglish ? 'true' : undefined}
        onClick={() => !isEnglish && trackLanguageSwitch(language, 'en')}
      >
        EN
      </Link>
      <span className={styles['lang-switch__divider']} aria-hidden="true">
        |
      </span>
      <Link
        href="/kumbabishekam/ta"
        className={`${styles['lang-switch__option']} ${
          !isEnglish ? styles['lang-switch__option--active'] : ''
        }`}
        aria-current={!isEnglish ? 'true' : undefined}
        onClick={() => isEnglish && trackLanguageSwitch(language, 'ta')}
      >
        தமிழ்
      </Link>
    </div>
  )
}
