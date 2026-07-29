/**
 * Seeds the `policies` collection with draft legal pages.
 *
 *   Run:            node --env-file=.env.local scripts/seed-policies.mjs
 *   Overwrite:      node --env-file=.env.local scripts/seed-policies.mjs --update
 *
 * By default existing slugs are SKIPPED, so re-running is safe. Pass --update to
 * overwrite the content of policies that already exist.
 *
 * ============================================================================
 * THESE ARE DRAFTS, NOT LEGAL ADVICE.
 * ============================================================================
 * The copy below is a starting template for an Indian real-estate developer and
 * has NOT been reviewed by a lawyer. Read every paragraph and get client/legal
 * sign-off before running this against a database that serves visvas.in. Items
 * that certainly need real values are marked [CONFIRM] in the text.
 *
 * Note: the grievance officer block names the company rather than an individual.
 * Rule 5(9) of the IT (Reasonable Security Practices) Rules, 2011 expects a named
 * officer, so add one when you have it.
 */

import { getPayload } from 'payload'
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'
import config from '../payload.config.js'

const COMPANY = 'Visvas Promoters'
const ADDRESS = '84, TPK Main Road, Madurai, Tamil Nadu, India'
const EMAIL = 'enquiry@visvaspromoters.com'
const PHONE = '+91 95432 24411'
const SITE = 'www.visvas.in'

// Date shown as "Last Updated" on each page. Change before seeding if needed.
const LAST_UPDATED = '2026-07-29'

const POLICIES = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    markdown: `${COMPANY} ("we", "us", "our") operates ${SITE}. This policy explains what personal data we collect through this website, why we collect it, and the choices you have. It is written to align with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 and rules made under it.

## Information we collect

**Information you give us.** When you submit an enquiry form, contact form, or project interest form on this site, we collect your name, phone number, email address, and any message or preference you choose to include.

**Information collected automatically.** When you browse the site we collect technical data such as your IP address, browser type, device type, referring page, pages viewed, and time spent. This is collected through cookies and similar technologies — see our Cookie Policy for detail.

We do not knowingly collect data from anyone under 18 years of age.

## Why we use your information

- To respond to your enquiry about a project, site visit, or booking
- To share project updates, pricing, availability, and offers you have asked for
- To maintain a record of enquiries for internal follow-up and audit
- To improve the website, measure which pages and campaigns perform, and detect abuse or spam
- To meet legal, regulatory, and RERA-related obligations

We rely on your consent for marketing communication, and on legitimate business and legal grounds for the rest.

## Who we share it with

We do not sell your personal data. We share it only with:

- **Service providers** who operate parts of our stack on our behalf — email delivery, customer relationship management, cloud hosting, analytics, and spam prevention. These providers are bound to use the data only for the services they provide to us.
- **Professional advisers and authorities** where disclosure is required by law, court order, or a lawful government request.

Some of these providers process data on servers located outside India. Where that happens, transfers are made in line with applicable Indian law.

## How long we keep it

Enquiry records are retained for as long as needed to serve you and to meet our legal and accounting obligations, and are then deleted or anonymised. [CONFIRM: state the actual retention period, e.g. "three years from last contact".]

## How we protect it

We use access controls, encrypted connections (HTTPS), rate limiting, and spam filtering on our forms. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.

## Your rights

Subject to applicable law, you may ask us to:

- Give you a summary of the personal data we hold about you
- Correct or complete data that is inaccurate or out of date
- Erase your data where we no longer have a valid reason to keep it
- Withdraw consent for marketing at any time
- Nominate another person to exercise these rights on your behalf in the event of your death or incapacity

To exercise any of these, write to us at ${EMAIL}. We will respond within the timelines set by applicable law.

## Grievance officer

If you are not satisfied with how we have handled your data or your request, you may contact our Grievance Officer:

${COMPANY}
${ADDRESS}
Email: ${EMAIL}
Phone: ${PHONE}

## Changes to this policy

We may update this policy from time to time. The "Last updated" date at the top of this page always reflects the current version. Material changes will be highlighted on this page.

## Contact

${COMPANY}
${ADDRESS}
Email: ${EMAIL}
Phone: ${PHONE}`,
  },
  {
    title: 'Terms & Conditions',
    slug: 'terms-and-conditions',
    markdown: `These terms govern your use of ${SITE}, operated by ${COMPANY} ("we", "us", "our"). By using this website you agree to them. If you do not agree, please do not use the site.

## Use of this website

You may browse this site and submit enquiries for your own personal, non-commercial use. You agree not to:

- Use the site for any unlawful purpose or in a way that damages or disrupts it
- Attempt to gain unauthorised access to any part of the site, its servers, or connected systems
- Scrape, harvest, or bulk-copy content, images, or contact data from the site
- Submit false, misleading, or third-party information through our forms without authority
- Introduce viruses, bots, or other harmful code

## Content on this site

All content on this site — text, images, floor plans, elevations, renders, logos, brochures, and design — is owned by or licensed to ${COMPANY} and is protected by Indian copyright and trade mark law. You may not reproduce, distribute, or create derivative works from it without our prior written permission.

## Nothing here is an offer

Information about projects, pricing, availability, specifications, amenities, dimensions, and timelines is provided for general information only. It does **not** constitute an offer, invitation to offer, or a contract of any kind. Nothing on this site creates any binding obligation on us.

Any purchase is governed solely by the sale agreement, construction agreement, and allotment documents signed between you and ${COMPANY}. In the event of any conflict between this website and those signed documents, the signed documents prevail.

Please read the Disclaimer on this site, which forms part of these terms.

## Enquiries and communication

When you submit an enquiry, you consent to us contacting you by phone, SMS, WhatsApp, and email in connection with that enquiry — including where your number is registered on the DND list, to the extent permitted by law. You can ask us to stop marketing contact at any time by writing to ${EMAIL}.

Enquiry data is handled as described in our Privacy Policy.

## Third-party links

This site may link to third-party websites. We do not control them, do not endorse them, and are not responsible for their content, security, or privacy practices.

## Limitation of liability

To the fullest extent permitted by law, ${COMPANY} is not liable for any indirect, incidental, or consequential loss arising from your use of, or inability to use, this website, or from reliance on any information on it.

We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.

## Indemnity

You agree to indemnify ${COMPANY} against any claim, loss, or expense arising from your breach of these terms or your misuse of the site.

## Changes

We may revise these terms at any time by updating this page. Your continued use of the site after a change means you accept the revised terms.

## Governing law and jurisdiction

These terms are governed by the laws of India. The courts at Madurai, Tamil Nadu have exclusive jurisdiction over any dispute arising from them.

## Contact

${COMPANY}
${ADDRESS}
Email: ${EMAIL}
Phone: ${PHONE}`,
  },
  {
    title: 'Disclaimer',
    slug: 'disclaimer',
    markdown: `This disclaimer applies to ${SITE} and to all marketing material published on it by ${COMPANY}.

## General information only

The content of this website is for general information and is subject to change without notice. It is not a legal offering, an offer to sell, or an invitation to purchase. No information on this site should be relied upon as a substitute for the signed sale, construction, and allotment documents.

## Images, plans, and renders are indicative

Renders, elevations, walkthroughs, floor plans, layouts, landscaping, furniture, and interior finishes shown on this site are **artistic impressions** created for illustration. They are indicative only and may differ from the constructed product. Furniture, fittings, appliances, gadgets, and decorative items shown are not part of any standard offering unless expressly listed in the signed agreement.

Dimensions, areas, and specifications are approximate and subject to construction tolerance, statutory approval, and design revision.

## Pricing and availability

Prices, payment plans, offers, unit availability, and possession timelines are indicative and subject to change and to availability at the time of booking. Applicable taxes, registration charges, stamp duty, statutory dues, maintenance deposits, and other charges are extra unless stated otherwise.

## RERA

Projects marketed on this site are registered with the Tamil Nadu Real Estate Regulatory Authority where registration is required. [CONFIRM: list each project name with its TNRERA registration number, and the TNRERA website address.] Please verify current registration details on the TNRERA portal before making any decision.

## Approvals

Some projects or phases shown may be at an approval stage. We do not represent that any approval has been obtained unless expressly stated for that project.

## Third-party content

Any third-party trade marks, brand names, or logos appearing on this site belong to their respective owners and are used for identification only. Their appearance does not imply endorsement or partnership.

## No liability

${COMPANY} accepts no liability for any loss arising from reliance on the information published on this website. Prospective purchasers are advised to satisfy themselves independently, and to obtain independent legal and financial advice, before entering into any transaction.

## Contact

${COMPANY}
${ADDRESS}
Email: ${EMAIL}
Phone: ${PHONE}`,
  },
  {
    title: 'Cookie Policy',
    slug: 'cookie-policy',
    markdown: `This policy explains how ${COMPANY} uses cookies and similar technologies on ${SITE}. It should be read together with our Privacy Policy.

## What cookies are

Cookies are small text files placed on your device when you visit a website. They let the site remember your actions and preferences, and let us understand how the site is used. We also use related technologies such as pixels, local storage, and scripts, which are covered by this policy.

## Categories we use

**Strictly necessary.** Required for the site to work — page routing, load balancing, security, and abuse prevention. These cannot be switched off through our site. Google reCAPTCHA is used on our forms to distinguish real visitors from automated spam, and it sets cookies in this category.

**Analytics and performance.** Used to count visits, see which pages and projects get attention, and understand how visitors move through the site. We use Google Analytics 4 (delivered through Google Tag Manager) and PostHog for this. The data is aggregated and used to improve the site.

**Advertising and measurement.** Used to measure the performance of our advertising campaigns and to attribute enquiries to the campaign that produced them. We use Google Ads conversion tracking for this. Depending on your settings, these may be used to show you our advertising on other sites.

[CONFIRM: remove any provider above that is not actually live in production, and add any that are missing.]

## Third-party cookies

Some cookies are set by the third parties named above rather than by us. We do not control those cookies. Their use of the data they collect is governed by their own privacy policies, which we encourage you to read.

## Managing cookies

Most browsers let you view, delete, and block cookies through their settings. You can also:

- Opt out of Google Analytics across all sites using Google's browser add-on
- Adjust Google's advertising personalisation in your Google Account settings
- Use your browser's private or incognito mode

Blocking strictly necessary cookies may stop parts of this site — including our enquiry forms — from working correctly.

## Changes

We may update this policy as the tools we use change. The "Last updated" date at the top of this page reflects the current version.

## Contact

Questions about this policy:

${COMPANY}
${ADDRESS}
Email: ${EMAIL}
Phone: ${PHONE}`,
  },
]

const shouldUpdate = process.argv.includes('--update')

const run = async () => {
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.default({
    config: payload.config,
  })

  let created = 0
  let updated = 0
  let skipped = 0

  for (const policy of POLICIES) {
    const existing = await payload.find({
      collection: 'policies',
      where: { slug: { equals: policy.slug } },
      limit: 1,
      depth: 0,
    })

    const content = convertMarkdownToLexical({
      editorConfig,
      markdown: policy.markdown,
    })

    const data = {
      title: policy.title,
      slug: policy.slug,
      lastUpdated: new Date(LAST_UPDATED).toISOString(),
      content,
    }

    if (existing.docs.length > 0) {
      if (!shouldUpdate) {
        console.log(`[POLICY SEED] skipped (exists): ${policy.slug}`)
        skipped += 1
        continue
      }

      await payload.update({
        collection: 'policies',
        id: existing.docs[0].id,
        data,
      })
      console.log(`[POLICY SEED] updated: ${policy.slug}`)
      updated += 1
      continue
    }

    await payload.create({ collection: 'policies', data })
    console.log(`[POLICY SEED] created: ${policy.slug}`)
    created += 1
  }

  console.log(
    `[POLICY SEED] done — created: ${created}, updated: ${updated}, skipped: ${skipped}`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error('[POLICY SEED] failed:', err)
  process.exit(1)
})
