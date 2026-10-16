import localFont from 'next/font/local'

// Self-hosted copies of the Google Fonts subsets the site uses, so builds no
// longer fetch fonts.googleapis.com (that fetch failed intermittently with
// "next/font/google queries have exactly one entry" and broke deploys).
// All four families are SIL Open Font License.
//
// Each subset is its own localFont() call with the real family name and the
// subset's unicode-range, so browsers still download only the subsets a page
// needs. SCSS references these families by name ("Raleway",
// "Cormorant Garamond"), so the names must stay exact. Only the latin subset
// of the two site-wide families is preloaded, matching next/font/google.
// Font loader options must be inline literals, hence the repetition.

export const cormorant = localFont({
  src: './cormorant-garamond-latin.woff2',
  weight: '400 700',
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: "'Cormorant Garamond'" },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
  adjustFontFallback: 'Times New Roman',
})

export const cormorantLatinExt = localFont({
  src: './cormorant-garamond-latin-ext.woff2',
  weight: '400 700',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Cormorant Garamond'" },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
  adjustFontFallback: false,
})

export const raleway = localFont({
  src: './raleway-latin.woff2',
  weight: '300 700',
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: "'Raleway'" },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
  adjustFontFallback: 'Arial',
})

export const ralewayLatinExt = localFont({
  src: './raleway-latin-ext.woff2',
  weight: '300 700',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Raleway'" },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
  adjustFontFallback: false,
})

// Kumbabishekam-only families. Not preloaded: preloading them put ~120 KB of
// unused fonts on every other route.

export const arima = localFont({
  src: './arima-latin.woff2',
  weight: '400 700',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Arima'" },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
  adjustFontFallback: 'Arial',
})

export const arimaLatinExt = localFont({
  src: './arima-latin-ext.woff2',
  weight: '400 700',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Arima'" },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
  adjustFontFallback: false,
})

export const arimaTamil = localFont({
  src: './arima-tamil.woff2',
  weight: '400 700',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Arima'" },
    { prop: 'unicode-range', value: 'U+0964-0965, U+0B82-0BFA, U+200C-200D, U+20B9, U+25CC' },
  ],
  adjustFontFallback: false,
})

export const inter = localFont({
  src: './inter-latin.woff2',
  weight: '400',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Inter'" },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
  adjustFontFallback: 'Arial',
})

export const interLatinExt = localFont({
  src: './inter-latin-ext.woff2',
  weight: '400',
  display: 'swap',
  preload: false,
  declarations: [
    { prop: 'font-family', value: "'Inter'" },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
  adjustFontFallback: false,
})
