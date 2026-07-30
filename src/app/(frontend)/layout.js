import '../globals.scss'
import '@/app/(frontend)/styles/typography.scss'
import Header from '@/app/(frontend)/components/header/Header'
import Footer from '@/app/(frontend)/components/footer/Footer'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'
import AttributionTracker from '@/app/(frontend)/components/AttributionTracker'
import { EnquiryModalProvider } from '@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider'
import { getContactDetails } from '@/lib/api/getContactDetails'
import { whatsAppHref } from '@/lib/contact/whatsapp'


export default async function FrontendLayout({ children }) {
  const { phone, whatsapp } = await getContactDetails()

  return (
    <EnquiryModalProvider>
      <Header phone={phone} />
      <AttributionTracker />
      {children}
      <Footer />
      <MobileCtaBar phone={phone} whatsappHref={whatsAppHref(whatsapp)} />
    </EnquiryModalProvider>
  )
}
