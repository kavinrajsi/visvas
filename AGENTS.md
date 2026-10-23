# AGENTS.md: how this codebase works

This is the single guide for anyone changing the code, whether a developer or an AI agent. It states how things work today, checked against the code on 23 October 2026. For what a visitor experiences and a plain-English account of where enquiries go, read [README.md](README.md) first.

Writing rule for every document in this repo: plain English, short sentences, no em-dashes, and explain a technical term the first time it appears.

## 1. Tech stack

| Part | What we use |
|---|---|
| Website framework | Next.js 16.2.9 (App Router, Turbopack, React Compiler), React 19.2.4 |
| Content editor (CMS) | Payload CMS 3.85.1, served at `/admin` |
| Database | PostgreSQL on Neon. The adapter forces `sslmode=verify-full` |
| Uploaded files | Cloudflare R2 through `@payloadcms/storage-s3`, only when all four `R2_*` variables are set. Otherwise local disk |
| Styling | SCSS Modules with BEM class names. No Tailwind, no CSS-in-JS |
| Rich text | Lexical (Payload's editor), plus the experimental table feature |
| Email | Gmail SMTP through nodemailer (`src/lib/email/gmail.js`) |
| Lead storage | Google Sheets API (service account), Zoho CRM web-to-lead, Payload collections |
| Spam protection | reCAPTCHA v3, honeypot field, rate limiter, IP and Tor block list |
| Analytics | Google Tag Manager container `GTM-NXHMWWFZ` (hard-coded in `src/app/layout.js`), which sends to GA4; PostHog when its two variables are set |
| Package manager | pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`). Node 20.6 or newer, because scripts use `node --env-file` |
| Hosting | Vercel, deployed from GitHub `main`, with Cloudflare in front |

Nothing pins the Node or pnpm version in `package.json`.

## 2. Repo map

```
src/
  app/
    layout.js                 Root layout: fonts, GTM, PostHog
    (frontend)/               Public website (pages, components, styles)
    (payload)/                Payload admin UI and its REST API
    api/forms/submit/         The form endpoint (POST)
    api/admin/register-images/  Bulk media registration (no auth, see Known issues)
    robots.js, sitemap.js, llms.txt/, llms-full.txt/, ai.txt/, blocked/
  proxy.js                    Next.js 16 middleware: IP and Tor block list
  collections/                Payload collections (14)
  globals/                    Payload globals (5 single-record pages)
  media/Media.js              The Media collection (uploads)
  components/animation/       GSAP reveal and counter components
  fonts/                      Self-hosted Raleway and Cormorant Garamond
  lib/
    forms/submitForm.js       The submission pipeline
    security/                 rateLimiter, honeypot, recaptcha, sanitiser, blockedIps, torExitNodes
    email/gmail.js            SMTP transport, email templates, htmlEscape
    storage/                  googleSheets.js, payloadDb.js, zohoCrm.js
    blog/                     R2 JSON snapshot: getPosts, snapshot, hooks, r2Json
    gtm/                      events.js (dataLayer helpers), useFormTracking.js
    analytics/attribution.js  UTM and click-id capture in the browser
    contact/whatsapp.js       Builds wa.me links
    cache/revalidateTags.js   Cache clearing used by collection hooks
    api/getContactDetails.js  Phone, email, address with fallbacks
    richtext/, image/, gsap/, redirects/
scripts/                      One-off and maintenance scripts (see section 9)
docs/                         CMS editor guide, content backup
public/                       Static images, videos, email signature files
payload.config.js             Payload setup: db, storage, email, collections, globals
next.config.mjs               Headers, image hosts, redirects
```

Things that do not exist, even though older docs mentioned them: `migrations/`, `data/`, `.env.example`, `src/middleware.js`. `payload-types.ts` is generated; do not edit it by hand.

## 3. Routes

| URL | File | Cache |
|---|---|---|
| `/` | `src/app/(frontend)/page.js` | rebuilt at most hourly |
| `/about` | `src/app/(frontend)/about/page.js` | hourly |
| `/community` | `src/app/(frontend)/community/page.js` (backed by the ImpactPage global) | hourly |
| `/contact` | `src/app/(frontend)/contact/page.js` | hourly |
| `/projects` | `src/app/(frontend)/projects/page.js` (all projects, no filters, not in the sitemap) | hourly |
| `/projects/ongoing` | `src/app/(frontend)/projects/ongoing/page.js` | every 5 minutes |
| `/projects/completed` | `src/app/(frontend)/projects/completed/page.js` | hourly |
| `/projects/[slug]` | `src/app/(frontend)/projects/[slug]/page.js` | hourly |
| `/blog` | `src/app/(frontend)/blog/(list)/page.js` | every 30 minutes |
| `/blog/[slug]` | `src/app/(frontend)/blog/[slug]/page.js` | hourly |
| `/[slug]` | `src/app/(frontend)/[slug]/page.js` (policy pages, for example `/privacy-policy`) | hourly |
| 404 | `src/app/(frontend)/not-found.js` | |
| `/blocked` | `src/app/blocked/page.js` (what blocked IPs see) | |
| `/admin/*` | `src/app/(payload)/admin/[[...segments]]/page.jsx` | |
| `/api/*` | `src/app/(payload)/api/[...slug]/route.js` (Payload REST) | |
| `POST /api/forms/submit` | `src/app/api/forms/submit/route.js` | |
| `POST /api/admin/register-images` | `src/app/api/admin/register-images/route.js` | force-dynamic |
| `/robots.txt` | `src/app/robots.js` | |
| `/sitemap.xml` | `src/app/sitemap.js` | hourly |
| `/llms.txt`, `/llms-full.txt`, `/ai.txt` | `src/app/llms.txt/route.js` and siblings | daily, hourly, forever |

Redirects live in `next.config.mjs`: old WordPress and Houzez URLs, and `/kumbabishekam` to `/about`.

## 4. Rules that are true today

### Caching and revalidation

Pages use ISR, which means Next.js serves a saved copy and rebuilds it in the background after a set time. The time is `export const revalidate` at the top of each page: 3600 seconds for most pages, 1800 for the blog list, 300 for the ongoing projects list.

Data reads that should refresh sooner are wrapped in `unstable_cache` with a tag. Tags in use: `projects`, `policies`, `testimonials`, `contact-page`, `blog-posts`. Collection and global hooks clear those tags through `src/lib/cache/revalidateTags.js`, so an edit in the CMS shows within seconds.

Rules:
- Do not add `export const dynamic = 'force-dynamic'` to pages. Only the register-images route uses it.
- When you add a cached query, give it a tag and clear that tag from the matching collection or global hook.
- HomePage, AboutPage and ImpactPage have no hooks, so their edits wait for the hourly rebuild.

### Payload access

- Read and write through `getPayload({ config })`. Never query the database directly.
- Access rules return a boolean, or `{ where: {...} }` to limit what a visitor can read. Example from Posts: logged-in users see everything, the public sees `{ status: { not_equals: 'draft' } }`.
- `ContactSubmissions.create` is `() => false`. The form pipeline writes through the Local API, which bypasses access rules on purpose.
- Users: `auth: true`, no extra fields. Any logged-in user can edit everything.

### Collections and globals

Collections (14): Users, Media, Widgets, Amenities, ProjectTypes, ProjectStatuses, BhkTypes, Testimonials, Projects, BlogCategories, Posts, Policies, ContactSubmissions, FormSubmissionLogs.

Globals (5): HomePage, AboutPage, BlogPage, ContactPage, ImpactPage. ImpactPage backs `/community`.

ProjectTypes, ProjectStatuses and BhkTypes are lookup lists with `name` and a generated `value`. The status value `completed` decides which list a project appears in.

### Blog

- Pages read blog posts from a JSON snapshot on R2 under `blog/`, never from the database. Use `src/lib/blog/getPosts.js` only.
- Hooks in `src/lib/blog/hooks.js` rewrite the snapshot and clear the `blog-posts` tag when a post or the BlogPage global changes.
- Backfill the snapshot once with `pnpm blog:export`.
- There are no category pages, tags or search on the site, even though a BlogCategories collection exists.

### The form pipeline

All four forms post JSON to `POST /api/forms/submit` with `{ formType, formData, attribution, recaptchaToken }`. Form types are `contact`, `enquiry` and `newsletter`. Nothing may bypass `src/lib/forms/submitForm.js`.

The route (`src/app/api/forms/submit/route.js`) runs in this order:

1. Parse the body. Missing `formType` or `formData` returns 400.
2. Read the visitor IP: `cf-connecting-ip`, then `x-real-ip`, then `unknown`. Never trust `x-forwarded-for`.
3. Rate limit: 5 requests per 60 seconds per IP (`src/lib/security/rateLimiter.js`). Over the limit returns 429. The limiter is in memory, so it is per server instance.
4. reCAPTCHA v3 (`src/lib/security/recaptcha.js`): skipped when `RECAPTCHA_SECRET_KEY` is unset; the action must equal the form type; minimum score 0.5; fails open if Google cannot be reached.
5. `validateFormData`: name and email always; mobile and budget for contact and enquiry.
6. Honeypot: if the hidden `company` field has a value, the submission is flagged as spam. The Payload row is still written with `isSpam: true`, but Sheets, Zoho and both emails are skipped. The visitor still sees success.

Then `submitForm()` runs each destination in its own try/catch, in this order:

1. Google Sheets (`src/lib/storage/googleSheets.js`): appends to tab `<formType>_responses`, columns Timestamp, Name, Email, Mobile, Message, Full Data (JSON). The append range is anchored at column A. The tab must already exist.
2. Payload `contact-submissions` (`src/lib/storage/payloadDb.js`): the system of record. Overall success means this row exists.
3. Zoho CRM web-to-lead (`src/lib/storage/zohoCrm.js`): contact and enquiry only. Sends Last Name, Email, Phone, a Description built from message, project, budget and WhatsApp, and Lead Source "Website". Zoho answers 200 even on failure, so the body is parsed.
4. Admin email to `ADMIN_EMAIL`: subject `New Form Submission: <formType>`, reply-to the visitor.
5. Visitor email: `You're subscribed to Visvas updates` for newsletter, `Confirmation: We received your inquiry` for the rest. `ADMIN_EMAIL` is BCC'd.
6. Delivery flags are written back onto the Payload row.
7. One `form-submission-logs` row records the outcome, errors and processing time.

Response shape: `{ success, message, id, degraded, fields, destinations }`. `destinations` has keys `Google Sheets`, `Payload CMS`, `Zoho CRM`, `Admin Email`, `User Email`, each with a status of `not attempted`, `skipped`, `dev (skipped)`, `success` or `failed`. `degraded` is true when the row was saved but another destination failed.

### Security utilities

- `src/lib/security/rateLimiter.js`: sliding window in memory.
- `src/lib/security/sanitiser.js`: `sanitiseFormType()` keeps `[a-zA-Z0-9_-]`, max 50 characters. Used for Sheets tab names.
- `src/lib/security/honeypot.js`: `HONEYPOT_FIELD = 'company'`.
- `src/lib/security/recaptcha.js` (server) and `recaptchaClient.js` (browser, loads the script on first submit).
- `htmlEscape()` in `src/lib/email/gmail.js`: every user value in an email body goes through it.
- `src/lib/security/blockedIps.js` plus the generated `torExitNodes.js` (regenerate with the script, never edit by hand). `src/proxy.js` returns 403 on `/api/*` and rewrites other paths to `/blocked`.
- Security headers and the image host allow-list are in `next.config.mjs`.

### Styling

- SCSS Modules only: `Component.js` next to `Component.module.scss`, imported as `styles`.
- BEM names: `.component__element--modifier`.
- Site-wide styles are imported in `src/app/(frontend)/layout.js`.
- The skills under `.agents/skills` (for example `interface-kit`) are generic and sometimes suggest Tailwind or shadcn. The project rules win.

### Tracking contract (GTM)

- Form events come from `src/lib/gtm/useFormTracking.js`: `form_view`, `form_start`, `form_validation_error`, `form_submit`, `form_submission` (with `form_status` success or error), `form_abandon`. Every push carries `form_type`, `form_name`, `form_location` and, for project forms, `project_name`. The full key list is in README.md section 5.
- `sanitiseFormPayload` in `src/lib/gtm/events.js` strips name, email, mobile, phone, message and the honeypot before any push. Never push raw field values. Use presence flags.
- Click events use `trackEvent` from `src/lib/gtm/events.js`. The ones that fire today: `whatsapp_click` (project sticky nav, mobile bar), `outbound_click` (Madarth link in the footer), `enquiry_form_visible` (modal opened).
- GTM maps `form_submission` success to the GA4 events `generate_lead` (contact and enquiry) and `sign_up` (newsletter). Both are GA4 key events.
- Every published GTM version needs plain-English notes in GTM (what it does, why, what changed). The GTM version history is the change log; there is no copy in the repo.

### Where not to look

- `docs/backups/`: content of the retired Kumbabishekam page, kept for reference.
- `next.config.mjs` still ignores a `src/lib/storage/nanoDb.js` that no longer exists.
- Unused code that is safe to ignore or remove: `MigrationBanner`, `VideoTestimonial`, `GTMPageTracker`, `ProjectDetailSkeleton`, `src/lib/api/getTestimonials.js`, `usePageTracking.js`, `trackFormSubmission`, `setPageType`, `trackSectionView`, `trackLanguageSwitch`, `createSheetHeaders`, `toImageKitUrl` (a passthrough), and the `jsdom` and `xml2js` dev dependencies.

## 5. Commands

Run with pnpm from the repo root.

| Command | What it does |
|---|---|
| `pnpm dev` | Start the site and admin at http://localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next.js core-web-vitals rules) |
| `pnpm payload <cmd>` | Payload CLI passthrough |
| `pnpm payload:migrate` | Run Payload migrations |
| `pnpm payload:migrate:create` | Create a migration file |
| `pnpm payload:generate:types` | Regenerate `payload-types.ts` |
| `pnpm db:push` | Migrate, then regenerate types (the script calls `npm run` internally, which still works) |
| `pnpm blog:export` | Backfill the blog snapshot on R2. Reads `.env.local` |

## 6. Environment variables

Only `DATABASE_URL` and `PAYLOAD_SECRET` are truly required. Everything else degrades gracefully. Scripts read `.env.local`. No example file can be committed because `.gitignore` ends with `.env*`.

| Variable | Used for | If missing |
|---|---|---|
| `DATABASE_URL` | Postgres connection | Site will not start |
| `PAYLOAD_SECRET` | Signs admin sessions (32+ characters) | Accepted silently as empty; set it |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Payload server URL | Falls back to localhost or hard-coded www.visvas.in |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_SENDER_EMAIL` | SMTP login and sender | Emails are logged, not sent (dev mode) |
| `GMAIL_SENDER_NAME` | Sender display name | Blank |
| `ADMIN_EMAIL` | Admin notification recipient and BCC on visitor emails | Admin email skipped |
| `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID` | Sheets service account and target sheet | Sheets step skipped |
| `ZOHO_WEBTOLEAD_XNQSJSDP`, `ZOHO_WEBTOLEAD_XMIWTLD` | Zoho web-to-lead form tokens | Zoho step skipped |
| `ZOHO_WEBTOLEAD_URL`, `ZOHO_WEBTOLEAD_ACTION_TYPE`, `ZOHO_WEBTOLEAD_RETURN_URL` | Zoho endpoint overrides | Defaults: `https://crm.zoho.in/crm/WebToLeadForm`, `TGVhZHM=`, the site URL |
| `RECAPTCHA_SECRET_KEY` | Server-side reCAPTCHA check | Check skipped |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Browser-side reCAPTCHA script | No token sent (fails if the secret is set) |
| `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_ACCESS_KEY`, `R2_SECRET_KEY` | Media storage and the blog snapshot | All four needed; otherwise local disk and no snapshot |
| `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_BUSINESS_PHONE` | Fallback contact details when the CMS has none | Hard-coded fallbacks |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact address in `/ai.txt` | Blank |
| `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog analytics | PostHog not loaded |

`NEXT_PUBLIC_*` values are embedded in the browser bundle. Never put a secret in one. `NEXT_PUBLIC_GADS_ID` appears in old docs but is not read anywhere.

## 7. Scripts

Run with `node --env-file=.env.local scripts/<file>` unless noted.

| Script | Purpose |
|---|---|
| `export-blog-snapshot.mjs` | Backfill the R2 blog snapshot. Same as `pnpm blog:export` |
| `seed-policies.mjs [--update]` | Seed draft policy pages (privacy, terms, disclaimer, cookie). Drafts, not legal advice |
| `seed-about-page.mjs [--dry]` | Overwrite the About page global with seed content |
| `seed-project-faqs.mjs` | Add FAQs to projects that have none |
| `update-tor-exit-nodes.js` | Regenerate `src/lib/security/torExitNodes.js` from the Tor project list. No env needed |
| `restore-project-images.js` | One-off repair from a past field change. Historical; reads `.env` via dotenv |
| `generate-email-signatures.py` | Writes `public/email-signature/*.html`. Run with `python3` |

## 8. Do not

- Query the database directly. Use `getPayload`.
- Bypass `submitForm.js` or remove the rate limiter from `POST /api/forms/submit`.
- Interpolate user data into email HTML without `htmlEscape()`.
- Trust `x-forwarded-for` as the visitor IP.
- Allow REST `create` on ContactSubmissions.
- Add `force-dynamic` to pages. Use `revalidate` plus cache tags.
- Push names, emails, phone numbers or message text to the dataLayer.
- Put secrets in `NEXT_PUBLIC_*` variables.
- Edit `torExitNodes.js` or `payload-types.ts` by hand.
- Add Tailwind or CSS-in-JS.
- Use WordPress migration tooling. The migration is finished and the code was removed.
- Publish a GTM version without plain-English notes.

## 9. Known issues (not yet fixed)

- `POST /api/admin/register-images` has no authentication and no rate limit.
- Phone and address clicks are not tracked. The handlers in `ContactPageClient.js` are attached to empty divs, and the header and footer phone links have no tracking.
- The contact form ignores the CMS success link field.
- The sitemap omits `/about`, `/community`, `/contact`, `/blog` and `/projects`.
- Home, About and Impact page edits wait up to an hour (no revalidate hooks).
- `adminEmailSent` is recorded as true when `ADMIN_EMAIL` is unset.
- Every form calls `console.table` on the submitted fields in the browser, and the API returns raw error strings and the Payload id to the browser.
- The server log prints the full submission, including personal data.
- `next.config.mjs` allows images from any `https://**` host.
- The rate limiter is per server instance; reCAPTCHA fails open; `formType` is not checked against an allow-list before use.
- Archived posts are readable through the Payload REST API.
- The home page JSON-LD points to `/search`, which does not exist.
- `TestimonialsCarousel.js` calls `useEffect` after an early return.
- The Cormorant font is never loaded; the SCSS references it by name only.
- `id="whatsapp"` is duplicated when the enquiry modal opens on `/contact`.
- `src/app/layout.js` calls `gtag('config', GTM_ID)` with the container id, which does nothing.
- `pnpm db:push` calls `npm run` internally.

## 10. Skills and agent files

`.claude/skills` holds links to `.agents/skills`, seven generic skills pinned in `skills-lock.json`. They are tools for whoever drives the session, not project rules. There are no project hooks, permissions or settings in the repo.
