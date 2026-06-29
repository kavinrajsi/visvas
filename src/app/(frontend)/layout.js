import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import '@/app/(frontend)/styles/typography.css'
import Header from '@/app/(frontend)/components/header/Header'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  title: 'Visvas - Property Solutions',
  description: 'Visvas Website',
}

export default function FrontendLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
