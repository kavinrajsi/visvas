import '../globals.scss'
import '@/app/(frontend)/styles/typography.scss'
import Header from '@/app/(frontend)/components/header/Header'
import Footer from '@/app/(frontend)/components/footer/Footer'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'
import AttributionTracker from '@/app/(frontend)/components/AttributionTracker'
import MigrationBanner from '@/app/(frontend)/components/migration-banner/MigrationBanner'

export const dynamic = 'force-dynamic'

export default function FrontendLayout({ children }) {
  return (
    <>
      <MigrationBanner />
      <Header />
      <AttributionTracker />
      {children}
      <Footer />
      <MobileCtaBar />
    </>
  )
}
