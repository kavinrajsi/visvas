/**
 * Seeds the `about-page` global with the copy that used to be hardcoded in
 * src/app/(frontend)/about/page.js, so /about becomes editable in the admin
 * without changing what visitors see.
 *
 *   Run:        node --env-file=.env.local scripts/seed-about-page.mjs
 *   Dry run:    node --env-file=.env.local scripts/seed-about-page.mjs --dry
 *
 * Existing values are OVERWRITTEN for the fields listed below, because the CMS
 * currently holds partial copy describing an older layout (e.g. heroBanner
 * .tagline said "Building Homes. Creating Trust. Shaping Communities."). Fields
 * not listed here (seo, testimonialsSectionHeading, heroQuote, featured
 * testimonials) are left untouched.
 */
import { getPayload } from 'payload'
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'
import config from '../payload.config.js'

const DRY = process.argv.includes('--dry')

const HERO_TITLE = 'We build homes that feel right.'
const HERO_TEXT =
  'For over 30 years, Visvas has been more than a real estate developer. We have been a part of thousands of family stories built on trust, care, and lasting relationships in Madurai.'
const INTRO_HEADING = 'Who we are'
const INTRO_TEXT =
  'Visvas means trust. We do not say it. We build so you feel it and decide to stay. We are the one who already knows what your family will need three years after possession, and has built for it.'
const FOUNDER_NAME = 'Sankara Seetharaman'
const FOUNDER_MARKDOWN =
  'At Visvas, we believe in building homes with purpose. Every decision we make begins with the families who will one day live there and make it their world. A home holds their dreams, their comfort, their peace of mind and their future. The greatest amenities we offer are peace of mind, happiness and a true sense of belonging, and we remain committed to creating them for generations to come.'

// \n in a stats label forces a line break in the stats row
const STATS = [
  { number: '20', suffix: '+', label: 'Completed\nProjects' },
  { number: '15', suffix: '+', label: 'Projects in\ndevelopment' },
  { number: '4000', suffix: '+', label: 'Happy\nCustomers' },
  { number: '4', suffix: '+', label: 'Million Sqft\nBuilt' },
  { number: '40', suffix: '+', label: 'Sqft Built' },
]

const VALUES = [
  {
    title: 'Mission',
    description:
      "So families never have to regret the most important decision of their lives. We think ahead, so home buyers don't have to.",
  },
  {
    title: 'Vision',
    description:
      'To be the builder families trust without question. Not because of what we say. Because of what they feel when they walk in and decide to stay.',
  },
]

const payload = await getPayload({ config })
const editorConfig = await editorConfigFactory.default({ config: payload.config })

const before = await payload.findGlobal({ slug: 'about-page', depth: 0 })

const data = {
  heroBanner: { tagline: HERO_TITLE, description: HERO_TEXT },
  introSection: { heading: INTRO_HEADING, text: INTRO_TEXT },
  stats: STATS,
  valuesSection: {
    ...before.valuesSection,
    sectionHeading: before.valuesSection?.sectionHeading || 'Our Values',
    values: VALUES,
  },
  founderStory: {
    ...before.founderStory,
    name: FOUNDER_NAME,
    content: convertMarkdownToLexical({ editorConfig, markdown: FOUNDER_MARKDOWN }),
  },
}

console.log('--- current ---')
console.log('  heroBanner.tagline    ', JSON.stringify(before.heroBanner?.tagline))
console.log('  heroBanner.description', JSON.stringify(before.heroBanner?.description))
console.log('  introSection          ', JSON.stringify(before.introSection))
console.log('  stats                 ', (before.stats || []).length, 'items')
console.log('  valuesSection.values  ', (before.valuesSection?.values || []).length, 'items')
console.log('  founderStory.name     ', JSON.stringify(before.founderStory?.name))
console.log('  founderStory.content  ', before.founderStory?.content ? 'set' : 'EMPTY')

if (DRY) {
  console.log('\n--dry: nothing written')
  process.exit(0)
}

await payload.updateGlobal({ slug: 'about-page', data })

const after = await payload.findGlobal({ slug: 'about-page', depth: 0 })
console.log('\n--- after ---')
console.log('  heroBanner.tagline    ', JSON.stringify(after.heroBanner?.tagline))
console.log('  heroBanner.description', JSON.stringify(after.heroBanner?.description)?.slice(0, 60) + '…')
console.log('  introSection.heading  ', JSON.stringify(after.introSection?.heading))
console.log('  introSection.text     ', JSON.stringify(after.introSection?.text)?.slice(0, 60) + '…')
console.log('  stats                 ', (after.stats || []).length, 'items:', (after.stats || []).map((s) => s.number + (s.suffix || '')).join(' '))
console.log('  valuesSection.values  ', (after.valuesSection?.values || []).map((v) => v.title).join(', '))
console.log('  founderStory.name     ', JSON.stringify(after.founderStory?.name))
console.log('  founderStory.content  ', after.founderStory?.content ? 'set' : 'EMPTY')
process.exit(0)
