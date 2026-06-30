<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Payload CMS 3.x Notes

- **Params in route handlers**: Always `await params` before using in Next.js 16
- **Querying data**: Use `getPayload({ config })` to instantiate Payload client — no direct DB access
- **Access control**: Returns `boolean` (allow/deny all) OR a `where` constraint object for conditional reads
  - Example (draft filtering): `read: ({ req: { user } }) => user ? true : { status: { not_equals: 'draft' } }`
- **Collections vs Globals**: Collections are multi-record (e.g., Projects, Posts); Globals are singletons (HomePage, AboutPage)
- **REST API**: Payload auto-exposes `/api/[...slug]` for CRUD operations

## Security Rules

Must follow these in this codebase:

1. **`sanitiseFormType()`** (`src/lib/security/sanitiser.js`) — use before file paths or sheet tab names
   - Sanitises to alphanumeric + underscore, max 50 chars
   - Example: `const safeFormType = sanitiseFormType(formType)`

2. **`htmlEscape()`** (defined in `src/lib/email/zoho.js`) — escape all user data in HTML emails
   - Example: `<p>Hi ${htmlEscape(userName)},</p>`

3. **Rate limiter** (`src/lib/security/rateLimiter.js`) — must stay on all public mutation endpoints
   - Currently: 5 req/min per IP on `/api/forms/submit`
   - Do not remove or weaken without security review

4. **IP headers** — prefer `cf-connecting-ip` (Cloudflare) or `x-real-ip`, avoid `x-forwarded-for` alone

## Form Submission Pipeline

```
Client Form → POST /api/forms/submit
  ↓
Rate limit check (5 req/min per IP)
  ↓
Input validation (validateFormData)
  ↓
submitForm() coordinator:
  ├→ Zoho Zeptomail (admin notification + user confirmation)
  ├→ Local JSON/SQLite storage (src/lib/storage/nanoDb.js)
  └→ Google Sheets append (src/lib/storage/googleSheets.js)
  ↓
Response (success/failure, ID if applicable)
```

**Do not add new form endpoints that bypass this flow.**

## Collections & Access

| Collection | Public Read | Create | Update | Delete | Purpose |
|---|---|---|---|---|---|
| Projects | ✓ (draft filtered) | User only | User only | User only | Real estate projects |
| Posts | ✓ (draft filtered) | User only | User only | User only | Blog articles |
| ContactSubmissions | User only | ✗ (API only) | User only | User only | Form submissions (write via API) |
| Users | User only | User only | Self | User only | CMS users |
| Media | ✓ | User only | User only | User only | File uploads |

## Styling Convention

SCSS Modules + BEM naming:

```scss
// Component.module.scss
.component { }
.component__header { }
.component__header--active { }
.component__title { }
```

No global CSS for component-specific styles. Use `src/app/globals.scss` only for app-wide resets/tokens.

## Environment & Graceful Degradation

All external services gracefully skip if env vars missing:
- **Email**: logs "Missing config", returns `success: true` (dev) or failure notice (prod)
- **Google Sheets**: logs "Missing config", returns `success: true`
- **Local storage**: creates `data/` on first write, falls back to JSON if SQLite unavailable

Maintain this pattern when adding new integrations.
