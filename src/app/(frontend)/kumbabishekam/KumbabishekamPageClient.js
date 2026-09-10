'use client'

import { Noto_Sans_Tamil } from 'next/font/google'
import GTMPageTracker from '@/app/(frontend)/components/GTMPageTracker'
import HeroSection from '@/app/(frontend)/components/kumbabishekam/HeroSection'
import IntroSection from '@/app/(frontend)/components/kumbabishekam/IntroSection'
import ScheduleSection from '@/app/(frontend)/components/kumbabishekam/ScheduleSection'
import CtaSection from '@/app/(frontend)/components/kumbabishekam/CtaSection'
import styles from './KumbabishekamPageClient.module.scss'

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600', '700'],
})

const ANCHOR_LABEL = {
  en: 'Event Details',
  ta: 'நிகழ்வு விவரங்கள்',
}

export default function KumbabishekamPageClient({ data, language }) {
  const { hero = {}, intro = {}, schedule = {}, cta = {} } = data || {}
  const hasSchedule = (schedule?.events || []).length > 0

  return (
    <main
      lang={language}
      className={`${styles.page} ${language === 'ta' ? notoSansTamil.className : ''}`}
    >
      <GTMPageTracker pageType="kumbabishekam" customData={{ language }} />
      <HeroSection
        hero={hero}
        language={language}
        anchorLabel={ANCHOR_LABEL[language]}
        anchorHref={hasSchedule ? '#schedule' : undefined}
      />
      <IntroSection intro={intro} language={language} />
      <ScheduleSection schedule={schedule} language={language} />
      <CtaSection cta={cta} hero={hero} language={language} />
    </main>
  )
}
