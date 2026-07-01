import { Cormorant_Garamond, Raleway } from 'next/font/google'
import { PostHogProvider } from './providers/PostHogProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
})

export default function Layout({ children }) {
  return (
    <html lang="en" className={`${cormorant.className} ${raleway.className}`}>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
