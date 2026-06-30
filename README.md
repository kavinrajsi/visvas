# Visvas — Luxury Property Developer Website

Visvas is a full-stack property marketing platform for a luxury real estate developer in Madurai, Tamil Nadu, India. Built with Next.js 16 (App Router) frontend + Payload CMS 3 headless backend on PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 16.2.9, React 19, Turbopack, React Compiler
- **Backend/CMS**: Payload CMS 3.85.1 (Node.js REST API + GraphQL)
- **Database**: PostgreSQL (via `@payloadcms/db-postgres`)
- **Styling**: SCSS Modules (no Tailwind, no CSS-in-JS)
- **Rich Text**: Lexical editor via `@payloadcms/richtext-lexical`
- **Image Processing**: Sharp 0.35.2
- **Email**: Zoho Zeptomail transactional email API
- **Storage**: Local JSON/SQLite (optional) + Google Sheets append integration
- **Analytics**: GTM dataLayer, GA4, Google Ads conversion tracking, Meta Pixel

## Prerequisites

- Node.js 20+ (LTS recommended)
- PostgreSQL database instance
- `.env.local` file with environment variables

## Quick Start

### 1. Clone & Install
```bash
git clone <repo>
cd visvas
npm install
```

### 2. Environment Setup
Create `.env.local` in the project root:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/visvas
PAYLOAD_SECRET=<strong-random-string-32-bytes>
ZOHO_ZEPTOMAIL_TOKEN=<your-zoho-api-token>
ZOHO_ZEPTOMAIL_SENDER_EMAIL=noreply@visvas.in
ADMIN_EMAIL=admin@visvas.in
NEXT_PUBLIC_SITE_URL=https://www.visvas.in
```

See [Environment Variables](#environment-variables) below for complete list.

### 3. Database Setup
```bash
npm run payload:migrate
```

### 4. Run Dev Server
```bash
npm run dev
```

Open `http://localhost:3000` for the frontend and `http://localhost:3000/admin` for the CMS.

### 5. (Optional) Seed Dummy Content
```bash
npm run seed:dummy-blog
```

Creates 4 sample blog posts with full content. Requires `.env.local` to be set.

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✓ | PostgreSQL connection string | — |
| `PAYLOAD_SECRET` | ✓ | 32-byte random secret for Payload | — |
| `ZOHO_ZEPTOMAIL_TOKEN` | ✓ | Zoho Zeptomail API token | — |
| `ZOHO_ZEPTOMAIL_SENDER_EMAIL` | ✓ | Sender email for transactional emails | — |
| `ADMIN_EMAIL` | ✓ | Admin inbox for form submissions | — |
| `ZOHO_ZEPTOMAIL_SENDER_NAME` | — | Display name for sender | `Visvas Properties` |
| `GOOGLE_SHEETS_API_KEY` | — | Google Sheets API key (if using Sheets storage) | — |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | — | Google Sheets spreadsheet ID | — |
| `NEXT_PUBLIC_SITE_URL` | — | Public site URL (for meta tags, robots, sitemap) | `https://www.visvas.in` |
| `NEXT_PUBLIC_GADS_ID` | — | Google Ads conversion ID (client-exposed for GA) | — |
| `DATABASE_DIR` | — | Local directory for JSON/SQLite files | `data` |
| `DATABASE_TYPE` | — | Storage backend: `json`, `sqlite`, or `both` | `json` |

**Note**: Services gracefully skip if env vars are absent. Development: logs "Missing config" instead of error. Production: returns success=false with error message.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run payload` | Payload CLI (migrations, database, seed scripts) |
| `npm run seed:dummy-blog` | Seed 4 dummy blog posts with full content |
| `npm run payload:migrate` | Run pending database migrations |
| `npm run payload:migrate:create` | Create new migration file |
| `npm run payload:generate:types` | Generate TypeScript types from schema |

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing website
│   │   ├── page.js          # Homepage (/)
│   │   ├── projects/        # Project listing & detail
│   │   │   ├── page.js      # Listing (with filters, pagination)
│   │   │   ├── ongoing/     # /projects/ongoing
│   │   │   ├── completed/   # /projects/completed
│   │   │   ├── [slug]/      # /projects/{slug} (detail + enquiry form)
│   │   │   └── helpers.js   # Filter & query utilities
│   │   ├── blog/            # Blog listing & articles
│   │   │   ├── page.js      # /blog (listing)
│   │   │   └── [slug]/      # /blog/{slug} (article detail)
│   │   ├── components/      # Reusable React components
│   │   │   ├── header/      # Global navigation
│   │   │   ├── mobile-cta-bar/
│   │   │   └── project-card/
│   │   ├── layout.js        # Layout wrapper (Header + children + CTABar)
│   │   ├── not-found.js     # 404 page
│   │   └── styles/          # Global typography
│   │
│   ├── (payload)/            # CMS admin interface & REST API
│   │   └── admin/[[...segments]]/
│   │
│   ├── api/
│   │   └── forms/submit/    # POST /api/forms/submit (rate-limited, form coordinator)
│   │
│   ├── ai.txt               # AI usage policy (public)
│   ├── llms.txt             # LLM crawler index (public)
│   ├── llms-full.txt        # Full content dump for AI (public)
│   ├── robots.js            # robots.txt generator
│   ├── sitemap.js           # sitemap.xml generator
│   ├── layout.js            # Root layout
│   └── globals.scss         # Global styles
│
├── collections/             # Payload CMS collections (database schemas)
│   ├── Projects.js          # Real estate projects
│   ├── Posts.js             # Blog articles
│   ├── BlogCategories.js
│   ├── Users.js             # CMS users (auth)
│   ├── Media.js             # File uploads
│   ├── TextTestimonials.js
│   ├── VideoTestimonials.js
│   ├── Amenities.js
│   ├── Policies.js
│   └── ContactSubmissions.js # Form submissions (write-only from API)
│
├── globals/                 # Payload CMS global content (singleton records)
│   ├── HomePage.js
│   ├── AboutPage.js
│   ├── ContactPage.js
│   └── ImpactPage.js
│
├── lib/
│   ├── email/zoho.js        # Zoho Zeptomail email service
│   ├── forms/
│   │   └── submitForm.js    # Form submission coordinator (email + storage)
│   ├── security/
│   │   ├── rateLimiter.js   # In-memory rate limiter (5 req/min per IP)
│   │   └── sanitiser.js     # formType sanitisation (alphanumeric + underscore)
│   ├── storage/
│   │   ├── nanoDb.js        # Local JSON/SQLite form storage
│   │   └── googleSheets.js  # Google Sheets append integration
│   ├── analytics/
│   │   └── track.js         # Client-side analytics events (GTM, GA4, etc.)
│   └── redirects/
│       └── wordpressUrls.js # Legacy WordPress URL redirects
│
└── scripts/
    └── seed-dummy-blog.mjs  # Seed dummy blog posts
```

## CMS Admin

Access the Payload admin panel at **`http://localhost:3000/admin`** (requires login).

### Collections (Editable Data)
- **Projects** — Real estate project listings (status: upcoming/under_construction/ready_to_move/completed)
- **Posts** — Blog articles
- **BlogCategories** — Blog category taxonomy
- **Users** — CMS user accounts
- **Media** — File uploads (images, documents)
- **TextTestimonials** — Customer testimonials (text)
- **VideoTestimonials** — Video testimonials
- **Amenities** — Project amenities (used in project detail)
- **Policies** — Legal policies
- **ContactSubmissions** — Form submissions from website (read-only in admin, written via API)

### Globals (Singleton Pages)
- **HomePage** — Hero, featured projects, stats, testimonials, CTA sections
- **AboutPage** — Company story, team, environmental impact
- **ContactPage** — Contact form, office details, map
- **ImpactPage** — Environmental & social impact metrics

## Form Submission Pipeline

### User Flow
1. User fills enquiry form on project detail page (`/projects/{slug}`)
2. Client-side validation (name, email, mobile, budget)
3. `POST /api/forms/submit` (rate-limited: 5 req/min per IP)

### Server Flow (inside `/api/forms/submit`)
1. **Rate limit check** — reject if > 5 req/min from same IP
2. **Validate formData** — required fields, email format, mobile number
3. **Call `submitForm()`** which coordinates:
   - **Email**: Send admin notification + user confirmation via Zeptomail (optional if env var absent)
   - **Local Storage**: Save to JSON file in `data/` directory (optional)
   - **Google Sheets**: Append row to spreadsheet (optional)
   - **Logging**: Log submission metadata (IP, user-agent, referer)
4. **Return response** — success/failure, submission ID if applicable

All external services (email, Sheets) fail gracefully — form submission succeeds even if one backend is down.

## Security

### Rate Limiting
Form submission endpoint limited to 5 requests per minute per IP. Uses in-memory store (`src/lib/security/rateLimiter.js`). Resets on server restart.

### Input Sanitisation
- `formType` sanitised to alphanumeric + underscore (max 50 chars) before use in file paths or sheet tab names — prevents directory traversal attacks
- Email templates HTML-escape all user data — prevents HTML header injection in transactional emails
- Draft projects/posts filtered from public read access — only authenticated users see unpublished content

### API Security
- No API keys in URL query strings; moved to Authorization headers
- `ADMIN_EMAIL` not exposed in public routes (removed from `ai.txt`)
- `ContactSubmissions` collection locked: `create: () => false` — can only be written via coordinated API endpoint, not Payload REST API directly
- `x-forwarded-for` header validated; prefers `cf-connecting-ip` (Cloudflare) when behind proxy

## Styling

**SCSS Modules only** — no global CSS, no Tailwind, no CSS-in-JS.

Pattern: each React component has a `.module.scss` alongside it.
- `Header.js` + `Header.module.scss`
- `ProjectCard.js` + `ProjectCard.module.scss`
- etc.

Global styles: `src/app/globals.scss` + typography in `src/app/(frontend)/styles/typography.scss`

Class naming: BEM-style convention.
```scss
.project-card { }
.project-card__title { }
.project-card__description { }
.project-card__link { }
```

## Database Migrations

### Create a new migration
```bash
npm run payload:migrate:create
```

Creates a timestamped migration file in `migrations/`. Edit the `up()` and `down()` functions.

### Run pending migrations
```bash
npm run payload:migrate
```

Applies all pending migrations to the database.

### TypeScript Schema Types
```bash
npm run payload:generate:types
```

Generates `payload-types.ts` with full type definitions from the Payload schema.

## Development Notes

### Next.js 16 Specifics
- `params` in dynamic routes **must be awaited**: `const params = await paramsPromise`
- App Router only — no Pages Router
- React Compiler enabled (`reactCompiler: true` in next.config.mjs)
- Turbopack default; esbuild as fallback

### Payload CMS 3.x
- No Pages-based routing — use Payload's REST API via `getPayload({ config })` in Server Components
- Collections and Globals are data types, not pages
- Access control can return `boolean` (allow/deny all) or a `where` constraint (conditional read)

### Environment & Graceful Degradation
If an environment variable is missing:
- **Email**: logs "Missing config" and returns `success: true` in dev; in production, sends a failure notice
- **Google Sheets**: logs "Missing config" and returns `success: true`
- **Local storage**: creates `data/` dir on first write

This design allows development without Zoho or Google credentials.

## Troubleshooting

### "Can't resolve 'better-sqlite3'"
This warning is expected. SQLite is optional. The code attempts to load it for enhanced storage, but falls back to JSON-only if absent. Safe to ignore.

### Form submissions not appearing in admin
1. Check `ContactSubmissions.access.create` is `() => false` — direct REST creation blocked by design
2. Submissions are written via `POST /api/forms/submit` → `src/lib/forms/submitForm.js`
3. Check Payload is running and database is connected (`npm run payload migrate` works)

### Email not sending
1. Verify `ZOHO_ZEPTOMAIL_TOKEN` and `ZOHO_ZEPTOMAIL_SENDER_EMAIL` in `.env.local`
2. Check server logs for "Missing config — email would be sent" (dev mode) or API error (production)
3. Verify Zoho account is active and token is valid

### Google Sheets append failing silently
1. Check `GOOGLE_SHEETS_API_KEY` and `GOOGLE_SHEETS_SPREADSHEET_ID` are set
2. Ensure spreadsheet exists and API key has write permissions
3. Check logs for `[SHEETS] Error appending to sheet`

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

Set environment variables in Vercel project settings:
- `DATABASE_URL` (PostgreSQL connection string, use managed Postgres via Vercel or external)
- `PAYLOAD_SECRET` (generate: `openssl rand -hex 32`)
- All other vars from `.env.local`

### Self-Hosted
```bash
npm run build
npm run start
```

Ensure PostgreSQL is accessible and all environment variables are set.

## License

Proprietary — Visvas Properties
