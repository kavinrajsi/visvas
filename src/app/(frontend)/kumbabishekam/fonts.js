// Arima (aka "Arima Madurai") covers both Latin and Tamil in one typeface —
// matches the Framer design's heading font, and the name itself nods to the
// event's city. Inter carries body copy, Raleway the footer, per the design.
//
// The faces are self-hosted in src/fonts and not preloaded (preloading them
// put ~120 KB of unused fonts on every other route). Raleway is the site-wide
// variable face, which already covers weight 400.
export { arima, inter, raleway } from '@/fonts'
