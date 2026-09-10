import '../globals.scss'
import '@/app/(frontend)/styles/typography.scss'
import Header from '@/app/(frontend)/components/header/Header'
import Footer from '@/app/(frontend)/components/footer/Footer'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'
import AttributionTracker from '@/app/(frontend)/components/AttributionTracker'
import HideOnRoutes from '@/app/(frontend)/components/HideOnRoutes'
import { EnquiryModalProvider } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import { getContactDetails } from '@/lib/api/getContactDetails'
import { whatsAppHref } from '@/lib/contact/whatsapp'

// Standalone microsite pages with their own self-contained layout — no
// global header, footer, or mobile CTA bar.
const NO_CHROME_ROUTES = ['/kumbabishekam']

export default async function FrontendLayout({ children }) {
  const { phone, whatsapp } = await getContactDetails()

  return (
    <EnquiryModalProvider>
      <HideOnRoutes prefixes={NO_CHROME_ROUTES}>
        <Header phone={phone} />
      </HideOnRoutes>
      <AttributionTracker />
      {children}
      <HideOnRoutes prefixes={NO_CHROME_ROUTES}>
        <Footer />
      </HideOnRoutes>
      <HideOnRoutes prefixes={NO_CHROME_ROUTES}>
        <MobileCtaBar phone={phone} whatsappHref={whatsAppHref(whatsapp)} />
      </HideOnRoutes>
    </EnquiryModalProvider>
  )
}
