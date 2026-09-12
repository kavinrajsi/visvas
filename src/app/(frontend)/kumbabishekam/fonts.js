import { Arima, Inter, Raleway } from 'next/font/google'

// Arima (aka "Arima Madurai") covers both Latin and Tamil in one typeface —
// matches the Framer design's heading font, and the name itself nods to the
// event's city. Inter carries body copy, Raleway the footer, per the design.
export const arima = Arima({
  subsets: ['latin', 'tamil'],
  weight: ['400', '500', '600', '700'],
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400'],
})
