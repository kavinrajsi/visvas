# AGENTS.md

## Tech Stack

Next.js 16 (App Router, Turbopack, React Compiler) + React 19, Payload CMS 3.85.1, PostgreSQL, SCSS Modules, Lexical rich text, Zoho Zeptomail email, Google Sheets + local JSON storage, GTM/GA4 analytics.

## Key Conventions

### File Structure & Routing

- **Route groups**: `(frontend)` = public site, `(payload)` = CMS admin
- **Dynamic params** must be awaited: `const params = await paramsPromise`
- **Dynamic pages** that query Payload require `export const dynamic = 'force-dynamic'`
- **API routes**: `src/app/api/forms/submit` (form submissions, rate-limited), `src/app/api/admin/register-images` (bulk image registration). Old WordPress import routes removed post-migration.
- SCSS Modules only — no Tailwind, no CSS-in-JS. Each component gets `Component.js` + `Component.module.scss`

### Payload CMS Access

- **Never** query database directly; always use `getPayload({ config })`
- **Collections** defined in `src/collections/` — Amenities, BlogCategories, ContactSubmissions, Policies, Posts, Projects, Testimonials, Users, Widgets, plus Media in `src/media/Media.js`
- **Globals** defined in `src/globals/` — AboutPage, BlogPage, ContactPage, HomePage, ImpactPage (singleton records, edited in admin)
  - **Note:** ImpactPage backs the `/community` route, not `/impact`
- **Access control** returns `boolean` (allow/deny all) OR `{ where: {...} }` constraint object (conditional read based on user)
  - Example: `read: ({ req: { user } }) => user ? true : { status: { not_equals: 'draft' } }`
- **Media collection** supports S3/R2 storage (conditional via env vars; local fallback)

### Form Submissions

- **All forms** must go through `src/lib/forms/submitForm.js` — do not bypass
- Entry point: `POST /api/forms/submit` → rate limit check → `validateFormData()` → honeypot check → `submitForm()`
- Form data auto-routes to: Zeptomail email + local JSON + Google Sheets + Payload CMS (all fail-gracefully if env vars absent)
- Use `formType` parameter to differentiate form types (e.g., "enquiry", "contact")
- `formType` **must** be sanitised via `sanitiseFormType()` before use in file paths or sheet tab names
- **Honeypot field:** Hidden `company` field in forms; if filled → flag submission `isSpam: true` (logged, still processed)

### Rate Limiting & Security

- Rate limiter lives at `src/lib/security/rateLimiter.js` — 5 req/min per IP by default
- **Do not remove** rate limiter from `POST /api/forms/submit`
- `sanitiseFormType()` at `src/lib/security/sanitiser.js` sanitises to `[a-zA-Z0-9_-]{1,50}` — use before writing file paths or sheet names
- `honeypot.js` at `src/lib/security/honeypot.js` validates hidden spam field
- Email templates use `htmlEscape()` (defined in `src/lib/email/zoho.js`) — escape all user data before injecting into HTML
- `ContactSubmissions.create` locked: `create: () => false` — submissions written only via form API, not REST

### IP Handling

- Prefer `cf-connecting-ip` (Cloudflare) → `x-real-ip` → `unknown` (not `x-forwarded-for` alone — spoofable)
- IP stored in submission metadata for audit trail

### Styling

- SCSS Modules only; import like: `import styles from './Component.module.scss'`
- Use global imports in `src/app/(frontend)/layout.js` for layout-wide styles
- BEM naming: `.component__element--modifier`

### Environment Variables

| Variable | Required | Use |
|----------|----------|-----|
| `DATABASE_URL` | ✓ | PostgreSQL connection string |
| `PAYLOAD_SECRET` | ✓ | Payload JWT signing secret (32+ chars) |
| `ZOHO_ZEPTOMAIL_TOKEN` | ✓ | Transactional email API token |
| `ZOHO_ZEPTOMAIL_SENDER_EMAIL` | ✓ | Sender email (verified in Zoho) |
| `ZOHO_ZEPTOMAIL_SENDER_NAME` | | Sender display name |
| `ADMIN_EMAIL` | ✓ | Admin notification recipient |
| `GOOGLE_SHEETS_API_KEY` | | Sheets append (optional) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | | Sheets target (optional) |
| `DATABASE_DIR` | | Local form-submission storage dir |
| `NEXT_PUBLIC_SITE_URL` | | Public site URL (canonical, sitemap, robots) |
| `NEXT_PUBLIC_GADS_ID` | | Google Ads conversion tracking |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | | Footer/contact display |
| `NEXT_PUBLIC_BUSINESS_PHONE` | | Footer/contact display |
| `NEXT_PUBLIC_CONTACT_EMAIL` | | AI crawler metadata |
| `R2_BUCKET_NAME` | | Cloudflare R2 media storage |
| `R2_ENDPOINT` | | R2 endpoint URL |
| `R2_ACCESS_KEY` | | R2 access key |
| `R2_SECRET_KEY` | | R2 secret key |
| `NEXT_PUBLIC_POSTHOG_HOST` | | PostHog analytics host |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | | PostHog project token |

**Notes:** Services graceful-fail if vars absent (no crashes on missing config). `NEXT_PUBLIC_*` embedded client-side; do not store secrets there.

### Do Not

- Put API keys in URL query strings (move to Authorization headers)
- Interpolate user data into HTML email templates without `htmlEscape()`
- Write to `data/` directory without sanitising subdirectory name via `sanitiseFormType()`
- Trust `x-forwarded-for` header as authoritative IP (use `cf-connecting-ip` or `x-real-ip`)
- Bypass form submission pipeline; all forms route through `submitForm.js`
- Remove rate limiter from public mutation endpoints
- Add direct database write permissions to ContactSubmissions collection
- Use WordPress-migration tooling (scripts/import-*, wp/); migration complete, code removed
