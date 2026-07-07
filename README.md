# Visvas

A modern real-estate platform built with **Next.js 16**, **React 19**, **Payload CMS 3.85.1**, and **PostgreSQL**. Showcases residential projects with rich media, enquiry forms, blog, and impact/community sections.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React Compiler)
- **UI**: React 19, SCSS Modules (BEM convention), Lexical rich text editor
- **CMS**: Payload CMS 3.85.1
- **Database**: PostgreSQL
- **Media Storage**: AWS S3 / Cloudflare R2 (optional, local fallback)
- **Email**: Zoho Zeptomail
- **Analytics**: Google Tag Manager, GA4, PostHog
- **External Integration**: Google Sheets (optional form-submission log), IP geolocation

## Prerequisites

- **Node.js** 20+
- **PostgreSQL** 12+ (local or remote)
- **.env** file configured (see [Environment Variables](#environment-variables))
- Optional: **AWS S3 / Cloudflare R2** credentials for media storage

## Quick Start

1. **Clone and install:**
   ```bash
   git clone <repo-url>
   cd visvas
   npm install
   ```

2. **Set up environment:**
   Copy `.env.example` to `.env` and fill in required vars:
   ```bash
   cp .env.example .env
   # Edit .env with DATABASE_URL, PAYLOAD_SECRET, email config, etc.
   ```

3. **Initialize database:**
   ```bash
   npm run db:push
   ```

4. **Start dev server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✓ | PostgreSQL connection string (e.g., `postgresql://user:pass@localhost:5432/visvas`) |
| `PAYLOAD_SECRET` | ✓ | 32+ char secret for Payload JWT signing |
| `ZOHO_ZEPTOMAIL_TOKEN` | ✓ | API token from Zoho Zeptomail (transactional email) |
| `ZOHO_ZEPTOMAIL_SENDER_EMAIL` | ✓ | Sender email address (must be verified in Zoho) |
| `ZOHO_ZEPTOMAIL_SENDER_NAME` | | Sender display name (defaults to "Visvas") |
| `ADMIN_EMAIL` | ✓ | Email for admin notifications (form submissions, errors) |
| `GOOGLE_SHEETS_API_KEY` | | Google Sheets API key for form-submission logging (optional) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | | Spreadsheet ID for appending form submissions (optional) |
| `DATABASE_DIR` | | Local storage directory for form submissions (defaults to `./data`) |
| `NEXT_PUBLIC_SITE_URL` | | Public site URL (used for sitemap, robots.txt, canonical URLs) |
| `NEXT_PUBLIC_GADS_ID` | | Google Ads conversion tracking ID (optional) |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | | Business contact email (displayed in footer, contact page) |
| `NEXT_PUBLIC_BUSINESS_PHONE` | | Business phone number (displayed in footer, contact page) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | | Contact form recipient email (for AI crawler metadata) |
| `R2_BUCKET_NAME` | | Cloudflare R2 bucket name for media storage (optional; S3-compatible) |
| `R2_ENDPOINT` | | Cloudflare R2 endpoint URL (optional) |
| `R2_ACCESS_KEY` | | Cloudflare R2 access key (optional) |
| `R2_SECRET_KEY` | | Cloudflare R2 secret key (optional) |
| `NEXT_PUBLIC_POSTHOG_HOST` | | PostHog API host (optional, for analytics) |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | | PostHog project token (optional, for analytics) |

**Notes:**
- If email/Sheets/R2 env vars are absent, those services fail gracefully (no form submission blocking).
- `DATABASE_DIR` supports both absolute paths and relative-to-cwd paths.
- `NEXT_PUBLIC_*` vars are embedded in client-side bundles; do not store secrets there.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:3000 + Payload admin at /admin) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run payload` | Payload CLI tools (collections, migrations, etc.) |
| `npm run payload:migrate` | Run pending database migrations |
| `npm run payload:migrate:create` | Create a new migration |
| `npm run payload:generate:types` | Generate TypeScript types from Payload config |
| `npm run db:push` | Run migrations + generate types (typical flow) |

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public-facing pages
│   │   │   ├── page.js          # Home
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── projects/        # Project listing + detail ([slug])
│   │   │   ├── contact/
│   │   │   ├── community/       # Community/impact page
│   │   │   ├── components/      # Shared UI (header, footer, modals, etc.)
│   │   │   └── layout.js
│   │   ├── (payload)/           # Payload CMS admin panel
│   │   ├── api/
│   │   │   ├── forms/submit     # Form submission endpoint (rate-limited)
│   │   │   ├── admin/register-images  # Bulk image registration
│   │   │   └── ...
│   │   ├── ai.txt/              # AI crawler metadata endpoint
│   │   ├── layout.js            # Root layout
│   │   ├── globals.scss         # Global styles
│   │   └── ...
│   ├── collections/             # Payload CMS collections
│   │   ├── Amenities.js
│   │   ├── BlogCategories.js
│   │   ├── ContactSubmissions.js
│   │   ├── Policies.js
│   │   ├── Posts.js
│   │   ├── Projects.js
│   │   ├── Testimonials.js
│   │   ├── Users.js
│   │   └── Widgets.js
│   ├── globals/                 # Payload CMS globals (singleton pages)
│   │   ├── AboutPage.js
│   │   ├── BlogPage.js
│   │   ├── ContactPage.js
│   │   ├── HomePage.js
│   │   └── ImpactPage.js        # Backed by /community route (not /impact)
│   ├── media/
│   │   └── Media.js             # Media upload collection (with S3/R2 storage)
│   ├── lib/
│   │   ├── forms/
│   │   │   └── submitForm.js    # Orchestrates form submission → email/nanoDb/Sheets/Payload
│   │   ├── security/
│   │   │   ├── rateLimiter.js   # In-memory sliding-window rate limiter
│   │   │   ├── sanitiser.js     # Form-type sanitization
│   │   │   └── honeypot.js      # Spam honeypot validation
│   │   ├── email/
│   │   │   └── zoho.js          # Zeptomail email transport
│   │   ├── storage/
│   │   │   ├── nanoDb.js        # Local JSON form-submission storage
│   │   │   ├── googleSheets.js  # Google Sheets API integration
│   │   │   └── payloadDb.js     # Payload CMS database writes
│   │   ├── redirects/
│   │   │   └── wordpressUrls.js # WordPress migration URL redirects
│   │   └── ...
│   └── ...
├── payload.config.js            # Payload CMS config (collections, globals, email, storage)
├── next.config.mjs              # Next.js config (WordPress URL redirects)
├── package.json
├── .env.example                 # Environment variables template
└── ...
```

## CMS Admin

### Collections

| Name | Purpose | Access |
|------|---------|--------|
| **Projects** | Real-estate projects (name, location, status, media, amenities, FAQs) | Public read |
| **Posts** | Blog posts (title, content, category, author, published/draft) | Public read (non-draft only), auth write |
| **BlogCategories** | Blog category taxonomy | Public read |
| **Testimonials** | Customer testimonials (text or video) | Public read |
| **ContactSubmissions** | Form submissions (read/audit only; writes happen via API) | Auth read only |
| **Amenities** | Project amenities (name, icon) | Public read |
| **Policies** | Legal pages (Privacy Policy, T&C) | Public read |
| **Users** | Admin users (Payload auth collection) | Auth only |
| **Widgets** | Reusable content blocks (media-gallery, testimonial-carousel, etc.) | Public read |
| **Media** | File uploads (images, PDFs, etc.) with S3/R2 storage | Public read (via URLs) |

### Globals (Singletons)

| Name | Purpose | Route |
|------|---------|-------|
| **HomePage** | Homepage hero, latest projects section config | `/` |
| **AboutPage** | About page content (hero, founder, mission, values) | `/about` |
| **BlogPage** | Blog listing page hero/SEO config | `/blog` |
| **ContactPage** | Contact page hero, contact details | `/contact` |
| **ImpactPage** | Community impact/sustainability content | `/community` (not `/impact`) |

## Form Submission Pipeline

Form submissions (enquiry, contact) flow through a unified pipeline:

1. **Client submits** → `POST /api/forms/submit` with `formType`, name, email, phone, message, etc.
2. **Rate limit check** → 5 req/min per IP (via `rateLimiter.js`)
3. **Validation** → `validateFormData()` checks name, email, mobile, budget fields
4. **Honeypot check** → `isHoneypotTriggered()` flags submission if hidden `company` field filled
5. **Sanitization** → `sanitiseFormType()` cleans form-type for file/sheet names
6. **Storage** (sequential, each fail-gracefully independent):
   - Send **admin notification** email (Zoho Zeptomail)
   - Send **user confirmation** email
   - Write to **local JSON** (`{DATABASE_DIR || 'data'}/{sanitisedFormType}_submissions.json`)
   - Write to **Google Sheets** (if API key configured)
   - Write to **Payload CMS** `contact-submissions` collection (with `isSpam` flag if honeypot triggered)
7. **Response** → JSON success/error

**Key files:**
- `src/lib/forms/submitForm.js` — main orchestrator
- `src/app/api/forms/submit/route.js` — endpoint
- `src/lib/security/honeypot.js` — spam check
- `src/lib/email/zoho.js` — email transport
- `src/lib/storage/{nanoDb,googleSheets,payloadDb}.js` — storage backends

All storage backends fail gracefully if env vars absent (e.g., no Google Sheets API key → skip Sheets append, still save locally).

## Security

### Rate Limiting

- **Endpoint:** `POST /api/forms/submit`
- **Limit:** 5 requests per minute per IP
- **Header precedence:** `cf-connecting-ip` (Cloudflare) → `x-real-ip` → `unknown`
- **Bypass:** None (applies to all clients)

**File:** `src/lib/security/rateLimiter.js`

### Sanitization

- **Form-type sanitization:** `sanitiseFormType()` strips to `[a-zA-Z0-9_-]`, max 50 chars
- **Purpose:** Prevent path traversal / injection in file paths and sheet names
- **Usage:** Before using `formType` in file I/O, sheet tab names, or logs

**File:** `src/lib/security/sanitiser.js`

### Email Escaping

- **User data in HTML emails:** Must use `htmlEscape()` (from `src/lib/email/zoho.js`)
- **Purpose:** Prevent XSS injection via email templates
- **Pattern:** All user-submitted text (name, message) must be escaped before HTML interpolation

**File:** `src/lib/email/zoho.js`

### Honeypot

- **Field:** Hidden `company` field in forms (name it `company`, hide with CSS)
- **Logic:** If honeypot filled → flag submission `isSpam: true` (logged but still processed)
- **Purpose:** Mark spam submissions for review; stored with `isSpam` field in ContactSubmissions

**File:** `src/lib/security/honeypot.js`

### ContactSubmissions Collection

- **API write:** Disabled (`create: () => false`) — submissions only via form API, never direct REST
- **Purpose:** Prevent tampering; all writes flow through validation/rate-limiting

## Styling

- **Approach:** SCSS Modules only (no Tailwind, no CSS-in-JS)
- **Pattern:** `Component.js` + `Component.module.scss` in same directory
- **Naming:** BEM convention (`.component__element--modifier`)
- **Global styles:** Imported in `src/app/layout.js` and `src/app/(frontend)/layout.js`
- **Responsive:** Mobile-first; breakpoints at 768px, 992px per convention

**Example:**
```scss
// ProjectCard.module.scss
.card {
  padding: 1rem;
  
  &__title {
    font-size: 1.5rem;
  }
  
  &__title--featured {
    font-weight: bold;
  }
}
```

```jsx
// ProjectCard.js
import styles from './ProjectCard.module.scss';

export default function ProjectCard({ featured }) {
  return (
    <div className={styles.card}>
      <h2 className={`${styles.card__title} ${featured ? styles['card__title--featured'] : ''}`}>
        Project Name
      </h2>
    </div>
  );
}
```

## Database Migrations

Managed via Payload CLI (PostgreSQL adapter):

```bash
# Create a new migration
npm run payload:migrate:create

# Run pending migrations
npm run payload:migrate

# Regenerate TypeScript types from schema
npm run payload:generate:types

# Common flow (dev/deploy)
npm run db:push  # Runs migrate + generate:types
```

Migrations live in `migrations/` directory (auto-created by Payload).

## Development Notes

### Next.js 16 & React 19
- **App Router only** (no Pages Router)
- **Dynamic params must be awaited:** `const params = await paramsPromise` in dynamic pages
- **React Compiler:** Enabled in `next.config.mjs` for automatic memoization
- **Turbopack:** Enabled for faster dev builds

### Payload CMS 3.x
- **Access control:** Returns `boolean` (allow/deny all) OR `{ where: {...} }` (conditional read)
- **Collections vs. Globals:** Collections are queryable lists; Globals are singletons
- **Rich text:** Uses Lexical editor (fully customizable, structured data)
- **Media upload:** Supports local filesystem or S3/R2 storage (conditional via env vars)

### Dynamic Pages
Pages that query Payload require `export const dynamic = 'force-dynamic'` to avoid stale SSG cache.

## Troubleshooting

### Forms not sending emails
- Check `ZOHO_ZEPTOMAIL_TOKEN` and `ZOHO_ZEPTOMAIL_SENDER_EMAIL` are set and valid.
- Check ADMIN_EMAIL is configured.
- Dev mode logs errors to console if email fails; check there first.

### Images not uploading / 404 on media URLs
- If using R2: check `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_ACCESS_KEY`, `R2_SECRET_KEY`.
- If local: check `DATABASE_DIR` is writable and `NEXT_PUBLIC_SITE_URL` is correct for canonical URLs.

### Build errors after file deletion
- Run `npm run payload:generate:types` to regenerate schema types.
- Clear `.next/` cache: `rm -rf .next/ && npm run build`

### Google Sheets submissions not logging
- Optional feature. Check `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEETS_SPREADSHEET_ID` if desired.
- If missing, forms still work; Sheets append is skipped gracefully.

## Deployment

### Vercel
- **Environment variables:** Set in Vercel project settings (match `.env` keys)
- **Database:** PostgreSQL (e.g., Vercel Postgres or external)
- **Media storage:** Configure R2 credentials for production
- **Deploy:** `git push` to production branch (CI/CD via Vercel)

### Self-Hosted
- **Node.js 20+** runtime
- **PostgreSQL** database accessible over network
- **Email:** Zoho Zeptomail credentials
- **Media:** Local filesystem or S3/R2 endpoint
- **Reverse proxy:** Nginx/Caddy recommended; set `X-Real-IP` or `CF-Connecting-IP` headers

## License

Proprietary. See LICENSE file for details.
