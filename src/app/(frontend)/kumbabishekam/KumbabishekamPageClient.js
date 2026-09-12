'use client'

import Link from 'next/link'
import GTMPageTracker from '@/app/(frontend)/components/GTMPageTracker'
import { MobileLogo } from '@/app/(frontend)/components/header/Logo'
import HeroSection from '@/app/(frontend)/components/kumbabishekam/HeroSection'
import LanguageSwitch from '@/app/(frontend)/components/kumbabishekam/LanguageSwitch'
import IntroSection from '@/app/(frontend)/components/kumbabishekam/IntroSection'
import ScheduleSection from '@/app/(frontend)/components/kumbabishekam/ScheduleSection'
import CtaSection from '@/app/(frontend)/components/kumbabishekam/CtaSection'
import KumbabishekamFooter from '@/app/(frontend)/components/kumbabishekam/KumbabishekamFooter'
import { arima } from './fonts'
import styles from './KumbabishekamPageClient.module.scss'

const ANCHOR_LABEL = {
  en: 'Event Details',
  ta: 'நிகழ்வு விவரங்கள்',
}

export default function KumbabishekamPageClient({ data, language }) {
  const { hero = {}, intro = {}, schedule = {}, cta = {} } = data || {}
  const hasSchedule = (schedule?.events || []).length > 0

  return (
    <main lang={language} className={`${styles.page} ${arima.className}`}>
      <GTMPageTracker pageType="kumbabishekam" customData={{ language }} />
      <header className={styles.header}>
        <Link href="/" className={styles.header__logo} aria-label="Visvas Promoters">
          <MobileLogo />
        </Link>
        <LanguageSwitch language={language} />
      </header>
      <HeroSection
        hero={hero}
        language={language}
        anchorLabel={ANCHOR_LABEL[language]}
        anchorHref={hasSchedule ? '#event-section' : undefined}
      />
      <IntroSection intro={intro} language={language} />
      <ScheduleSection schedule={schedule} language={language} />
      <CtaSection cta={cta} language={language} />
      <KumbabishekamFooter />
    </main>
  )
}
