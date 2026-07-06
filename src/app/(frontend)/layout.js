import '../globals.scss'
import '@/app/(frontend)/styles/typography.scss'
import Header from '@/app/(frontend)/components/header/Header'
import Footer from '@/app/(frontend)/components/footer/Footer'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'
import AttributionTracker from '@/app/(frontend)/components/AttributionTracker'
import MigrationBanner from '@/app/(frontend)/components/migration-banner/MigrationBanner'
import { EnquiryModalProvider } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import LayoutWrapper from '@/app/(frontend)/components/LayoutWrapper'

export const dynamic = 'force-dynamic'

export default function FrontendLayout({ children }) {
  return (
    <EnquiryModalProvider>
      <LayoutWrapper>
        <MigrationBanner />
        <Header />
        <AttributionTracker />
      </LayoutWrapper>
      {children}
      <LayoutWrapper footer>
        <Footer />
        <MobileCtaBar />
      </LayoutWrapper>
    </EnquiryModalProvider>
  )
}
