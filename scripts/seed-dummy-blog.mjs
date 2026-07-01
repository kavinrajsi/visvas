import { getPayload } from 'payload'
import config from '../payload.config.js'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const categorySlug = 'real-estate-insights'
const placeholderFilename = 'blog-placeholder.svg'
const publishedAt = new Date('2025-02-04T00:00:00.000Z').toISOString()

const blogPosts = [
  {
    title: 'CREDAI Fairpro 2026 - Madurai Property Expo for your Dream home',
    slug: 'credai-fairpro-2026-madurai-property-expo-dream-home',
    excerpt:
      "The Confederation of Real Estate Developers' Associations of India (CREDAI) was established in the year 1999. Credai has successfully brought majority of the private property developer under single roof. This premier real estate exhibition promises to showcase the latest trends, developments, and opportunities in Madurai's property market.",
    metaKeywords: 'CREDAI Fairpro, Madurai property expo, Visvas blog, real estate Madurai',
    paragraphs: [
      'CREDAI Fairpro 2026 brings developers, buyers, investors, consultants, and home seekers together under one roof. For families planning a home in Madurai, the expo is a practical way to compare locations, budgets, amenities, and developer credibility in a single visit.',
      "Madurai's property market continues to grow because of improving road connectivity, expanding residential neighborhoods, and steady demand from both end users and investors. Events like Fairpro help buyers understand which micro-markets are moving, what price bands are active, and how projects differ beyond brochure promises.",
      'A good expo visit should begin with clarity. Shortlist whether you are looking for an apartment, villa, plot, or commercial property. Compare approvals, legal documentation, delivery timelines, maintenance commitments, and access to schools, hospitals, workplaces, and transport routes.',
      'For first-time buyers, CREDAI-backed events also make it easier to ask direct questions about financing, registration, construction quality, and long-term value. The best project is not only the one that looks attractive on display, but the one that fits your daily life and remains dependable over time.',
      'Visvas uses this type of buyer insight to shape residential communities around trust, location strength, and practical amenities. The goal is simple: help customers move from interest to confident ownership with clear information at every step.',
    ],
    tableRows: [
      ['Expo focus', 'Buyer value', 'What to check'],
      ['Developer stalls', 'Compare many projects quickly', 'Approvals and delivery timelines'],
      ['Finance desk', 'Understand loan options', 'Interest rate and processing fees'],
      ['Location shortlist', 'Map daily convenience', 'Schools, hospitals, commute routes'],
    ],
  },
  {
    title: 'Top Residential Project in Madurai - New Projects for sale',
    slug: 'top-residential-project-in-madurai-new-projects-for-sale',
    excerpt:
      'Top Residential Project in Madurai - New projects for sale Madurai, with its rich cultural heritage and booming infrastructure, has emerged as one of the prime locations for real estate investment in Tamil Nadu. Whether you are looking for luxury villas or affordable apartments, Madurai has something to offer for everyone.',
    metaKeywords: 'residential projects Madurai, new projects for sale, apartments Madurai, villas Madurai',
    paragraphs: [
      'Madurai has become one of the most active residential markets in southern Tamil Nadu. Buyers are no longer looking only for a house; they want dependable access, planned layouts, better lifestyle amenities, and long-term appreciation.',
      'New residential projects in Madurai serve a wide range of needs. Apartments suit families who want convenience, security, and shared amenities. Villas appeal to buyers looking for privacy, more usable space, and an independent-home lifestyle. Plotted developments work well for people who want flexibility in construction and future value creation.',
      'When comparing residential projects, location should come first. Strong road access, proximity to schools and hospitals, neighborhood growth, water availability, and legal clarity all matter more than surface-level finishes. A project that performs well on these basics usually remains easier to live in and easier to resell.',
      'Amenities should also be evaluated with daily use in mind. Clubhouses, indoor play areas, walking tracks, landscaped spaces, and security systems add value when they are maintained properly and planned for the actual community size.',
      'Visvas focuses on projects that balance aspiration with everyday practicality. The right home in Madurai should support family life today and still feel like a sound investment years from now.',
    ],
    tableRows: [
      ['Project type', 'Best fit', 'Key decision point'],
      ['Apartment', 'Convenience and shared amenities', 'Maintenance and association quality'],
      ['Villa', 'Privacy and larger family space', 'Construction quality and layout'],
      ['Plot', 'Flexible phased investment', 'Title clarity and infrastructure'],
    ],
  },
  {
    title: 'Residential and commercial Land / Plots for sale in Madurai',
    slug: 'residential-and-commercial-land-plots-for-sale-in-madurai',
    excerpt:
      "Residential and commercial plots in Madurai continue to attract buyers who want flexibility, ownership security, and long-term value. Planned layouts, clear access roads, and developing neighborhoods make land a strong option for families, builders, and investors.",
    metaKeywords: 'plots for sale Madurai, land for sale Madurai, commercial plots, residential land',
    paragraphs: [
      'Land remains one of the most flexible real estate choices in Madurai. Residential plots allow families to build at their own pace, while commercial plots can support shops, offices, rental assets, or long-term business expansion.',
      'The biggest advantage of buying a plot is control. You can decide the building plan, construction timeline, material quality, and future usage. This flexibility is especially useful for buyers who want to phase their investment instead of committing to a finished home immediately.',
      'Before purchasing land, documentation should be checked carefully. Patta, title history, encumbrance certificate, layout approval, road access, zoning, drainage, and utility access are all important. A lower price is not useful if the paperwork is unclear or the site lacks basic infrastructure.',
      'Commercial plots require an additional layer of thinking. Visibility, frontage, traffic movement, parking possibility, and nearby residential density all influence business potential. For residential plots, peaceful surroundings, schools, hospitals, and commute routes matter more.',
      'Visvas encourages buyers to view land as both a lifestyle decision and a long-term asset. The right plot in the right location can create value through construction, rental use, resale, or future development.',
    ],
    tableRows: [
      ['Plot use', 'Primary advantage', 'Due diligence'],
      ['Residential land', 'Build at your own pace', 'Patta, title, and water access'],
      ['Commercial land', 'Rental or business potential', 'Frontage and traffic movement'],
      ['Investment plot', 'Long-term appreciation', 'Neighborhood growth path'],
    ],
  },
  {
    title: 'Independent Villa for sale in Madurai',
    slug: 'independent-villa-for-sale-in-madurai',
    excerpt:
      'Independent villas in Madurai are ideal for families who want privacy, comfort, and a stronger sense of ownership. With planned communities, better road networks, and modern amenities, villa living is becoming a preferred choice for many homebuyers.',
    metaKeywords: 'independent villa Madurai, villas for sale Madurai, luxury villas Madurai, gated community villas',
    paragraphs: [
      'An independent villa offers a different living experience from an apartment. It gives families more privacy, more control over their space, and the feeling of owning a complete home with room to grow.',
      'In Madurai, villas are increasingly preferred by buyers who want a calm residential environment without moving too far from city conveniences. The right villa community can offer the comfort of independent living along with security, planned roads, landscaped spaces, and shared amenities.',
      'When evaluating a villa, buyers should look beyond elevation and interior finishes. Plot size, built-up area, ventilation, natural light, parking, water systems, construction quality, and neighborhood development all affect day-to-day comfort.',
      'A good villa should also adapt to future needs. Families may need space for elderly parents, children, work-from-home routines, guest rooms, or small garden areas. Independent homes usually make these changes easier than fixed apartment layouts.',
      'Visvas villa communities are planned around practical luxury: strong locations, thoughtful layouts, dependable construction, and spaces that support family life over many years.',
    ],
    tableRows: [
      ['Villa feature', 'Why it matters', 'Buyer check'],
      ['Independent space', 'Privacy and control', 'Plot size and ventilation'],
      ['Community planning', 'Security with lifestyle comfort', 'Road width and amenities'],
      ['Future flexibility', 'Room for changing family needs', 'Expansion and maintenance scope'],
    ],
  },
]

const TEXT_FORMAT_BOLD = 1
const TEXT_FORMAT_ITALIC = 2

function textNode(text, format = 0) {
  return {
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  }
}

function elementNode(type, children, extra = {}) {
  return {
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    type,
    version: 1,
    ...extra,
  }
}

function paragraph(children) {
  return elementNode('paragraph', Array.isArray(children) ? children : [textNode(children)])
}

function heading(tag, text) {
  return elementNode('heading', [textNode(text)], { tag })
}

function uploadNode(media) {
  return {
    fields: null,
    format: '',
    id: `seeded-upload-${media.id}`,
    relationTo: 'media',
    type: 'upload',
    value: media.id,
    version: 3,
  }
}

function tableCell(text, isHeader = false) {
  return elementNode('tablecell', [paragraph(text)], {
    backgroundColor: null,
    colSpan: 1,
    headerState: isHeader ? 1 : 0,
    rowSpan: 1,
    width: null,
  })
}

function tableRow(cells, isHeader = false) {
  return elementNode('tablerow', cells.map((cell) => tableCell(cell, isHeader)), {
    height: null,
  })
}

function table(rows) {
  return elementNode('table', rows.map((row, index) => tableRow(row, index === 0)), {
    colWidths: undefined,
  })
}

function richText(postConfig, coverImage) {
  const nodes = [
    heading('h1', postConfig.title),
    paragraph([
      textNode('This introduction includes '),
      textNode('bold', TEXT_FORMAT_BOLD),
      textNode(' and '),
      textNode('italic', TEXT_FORMAT_ITALIC),
      textNode(' text so content formatting can be checked in the CMS and frontend renderer.'),
    ]),
    heading('h2', 'Market Context'),
    paragraph(postConfig.paragraphs[0]),
    heading('h3', 'Buyer Priorities'),
    paragraph(postConfig.paragraphs[1]),
    heading('h4', 'Decision Checklist'),
    paragraph(postConfig.paragraphs[2]),
    uploadNode(coverImage),
    heading('h5', 'Quick Comparison Table'),
    table(postConfig.tableRows),
    heading('h6', 'Closing Note'),
    paragraph(postConfig.paragraphs[3]),
    paragraph(postConfig.paragraphs[4]),
  ]

  return {
    root: {
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

async function findOne(payload, collection, where) {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    where,
  })

  return result.docs[0]
}

async function upsertCategory(payload) {
  const existing = await findOne(payload, 'blog-categories', {
    slug: { equals: categorySlug },
  })

  if (existing) {
    return existing
  }

  return payload.create({
    collection: 'blog-categories',
    data: {
      name: 'Real Estate Insights',
      slug: categorySlug,
    },
  })
}

async function upsertPlaceholderMedia(payload) {
  const existing = await findOne(payload, 'media', {
    filename: { equals: placeholderFilename },
  })

  if (existing) {
    return existing
  }

  return payload.create({
    collection: 'media',
    data: {
      alt: 'Placeholder image for Visvas blog posts',
    },
    filePath: path.join(dirname, 'assets', placeholderFilename),
  })
}

async function upsertPost(payload, category, coverImage, postConfig) {
  const existing = await findOne(payload, 'posts', {
    slug: { equals: postConfig.slug },
  })

  const data = {
    title: postConfig.title,
    slug: postConfig.slug,
    excerpt: postConfig.excerpt,
    coverImage: coverImage.id,
    content: richText(postConfig, coverImage),
    author: 'Visvas Team',
    categories: [category.id],
    status: 'published',
    publishedAt,
    metaTitle: postConfig.title,
    metaDescription: postConfig.excerpt,
    metaKeywords: postConfig.metaKeywords,
    ogTitle: postConfig.title,
    ogDescription: postConfig.excerpt,
    ogImage: coverImage.id,
    twitterCard: 'summary_large_image',
    twitterTitle: postConfig.title,
    twitterDescription: postConfig.excerpt,
    structuredData: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: postConfig.title,
      description: postConfig.excerpt,
      datePublished: publishedAt,
      author: {
        '@type': 'Organization',
        name: 'Visvas',
      },
    }),
  }

  if (existing) {
    return payload.update({
      collection: 'posts',
      id: existing.id,
      data,
    })
  }

  return payload.create({
    collection: 'posts',
    data,
  })
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Run with `node --env-file=.env.local scripts/seed-dummy-blog.mjs`.')
  }

  const payload = await getPayload({ config })
  const category = await upsertCategory(payload)
  const coverImage = await upsertPlaceholderMedia(payload)

  const posts = []
  for (const postConfig of blogPosts) {
    posts.push(await upsertPost(payload, category, coverImage, postConfig))
  }

  payload.logger.info(`Seeded ${posts.length} dummy blog posts with detail content.`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
