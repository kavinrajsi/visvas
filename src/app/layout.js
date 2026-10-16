import Script from 'next/script'
import { raleway } from '@/fonts'
import { PostHogProvider } from './providers/PostHogProvider'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function Layout({ children }) {
  const GTM_ID = 'GTM-NXHMWWFZ'

  return (
    // Raleway is the base font. Cormorant isn't applied here: next/font/local
    // names the class's family after the variable ("cormorant"), which doesn't
    // match the face's real name, and SCSS already uses "Cormorant Garamond".
    // Importing it still ships its @font-face rules and preload.
    <html lang="en" className={raleway.className}>
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
          strategy="lazyOnload"
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
