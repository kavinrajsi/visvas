import '../globals.scss'
import '@/app/(frontend)/styles/typography.scss'
import Header from '@/app/(frontend)/components/header/Header'
import Footer from '@/app/(frontend)/components/footer/Footer'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'
import AttributionTracker from '@/app/(frontend)/components/AttributionTracker'
import { EnquiryModalProvider } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'


export default function FrontendLayout({ children }) {
  return (
    <EnquiryModalProvider>
      <Header />
      <AttributionTracker />
      {children}
      <Footer />
      <MobileCtaBar />
    </EnquiryModalProvider>
  )
}
