import Script from 'next/script'
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

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function Layout({ children }) {
  const GTM_ID = 'GTM-NXHMWWFZ'

  return (
    <html lang="en" className={`${cormorant.className} ${raleway.className}`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');
            `,
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            aria-hidden="true"
          />
        </noscript>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
