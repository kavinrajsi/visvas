@AGENTS.md

## Tech Stack
Next.js 16 (App Router, Turbopack, React Compiler) + React 19, Payload CMS 3.85.1, PostgreSQL, SCSS Modules, Lexical rich text, Zoho Zeptomail email, Google Sheets + local JSON storage, GTM/GA4 analytics.

## Key Conventions

### File Structure & Routing
- **Route groups**: `(frontend)` = public site, `(payload)` = CMS admin
- **Dynamic params** must be awaited: `const params = await paramsPromise`
- **Dynamic pages** that query Payload require `export const dynamic = 'force-dynamic'`
- SCSS Modules only — no Tailwind, no CSS-in-JS. Each component gets `Component.js` + `Component.module.scss`

### Payload CMS Access
- **Never** query database directly; always use `getPayload({ config })`
- **Collections** defined in `src/collections/` — Projects, Posts, BlogCategories, Users, Media, TextTestimonials, VideoTestimonials, Amenities, Policies, ContactSubmissions
- **Globals** defined in `src/globals/` — HomePage, AboutPage, ContactPage, ImpactPage (singleton records, edited in admin)
- **Access control** returns `boolean` (allow/deny all) OR `{ where: {...} }` constraint object (conditional read based on user)
  - Example: `read: ({ req: { user } }) => user ? true : { status: { not_equals: 'draft' } }`

### Form Submissions
- **All forms** must go through `src/lib/forms/submitForm.js` — do not bypass
- Entry point: `POST /api/forms/submit` → rate limit check → `validateFormData()` → `submitForm()`
- Form data auto-routes to: Zeptomail email + local JSON/SQLite + Google Sheets (all fail-gracefully if env vars absent)
- Use `formType` parameter to differentiate form types (e.g., "enquiry", "contact")
- `formType` **must** be sanitised via `sanitiseFormType()` before use in file paths or sheet tab names

### Rate Limiting & Security
- Rate limiter lives at `src/lib/security/rateLimiter.js` — 5 req/min per IP by default
- **Do not remove** rate limiter from `POST /api/forms/submit`
- `sanitiseFormType()` at `src/lib/security/sanitiser.js` sanitises to `[a-zA-Z0-9_-]{1,50}` — use before writing file paths or sheet names
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
- **Required**: `DATABASE_URL`, `PAYLOAD_SECRET`, `ZOHO_ZEPTOMAIL_TOKEN`, `ZOHO_ZEPTOMAIL_SENDER_EMAIL`, `ADMIN_EMAIL`
- **Optional**: `GOOGLE_SHEETS_*`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GADS_ID`, `DATABASE_DIR`, `DATABASE_TYPE`
- All services graceful-fail if vars absent — no crashes on missing config

### Do Not
- Put API keys in URL query strings (moved to Authorization headers)
- Interpolate user data into HTML email templates without `htmlEscape()`
- Write to `data/` directory without sanitising subdirectory name via `sanitiseFormType()`
- Trust `x-forwarded-for` header as authoritative IP (use `cf-connecting-ip` or `x-real-ip`)
- Bypass form submission pipeline; all forms route through `submitForm.js`
- Remove rate limiter from public mutation endpoints
- Add direct database write permissions to ContactSubmissions collection
