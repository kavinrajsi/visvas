import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import '@/app/(frontend)/styles/typography.css'
import Header from '@/app/(frontend)/components/header/Header'
import MobileCtaBar from '@/app/(frontend)/components/mobile-cta-bar/MobileCtaBar'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.visvas.in'),
  title: {
    default: 'Visvas',
    template: '%s | Visvas',
  },
  description: 'Luxury property developer in Madurai. Build your dream home with Visvas.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Visvas',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <MobileCtaBar />
      </body>
    </html>
  )
}
