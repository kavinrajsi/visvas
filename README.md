# Visvas website (www.visvas.in)

This document is written for everyone at Visvas: sales, marketing, management and developers. Technical words are explained the first time they appear, and again in the glossary at the end.

## 1. What this site is

Visvas Promoters builds homes in and around Madurai. The website at https://www.visvas.in shows ongoing and completed projects, takes enquiries from visitors, and publishes a blog.

Under the hood it is one application with two halves:

- The public website, built with Next.js 16 (a framework for building fast websites).
- The content editor at https://www.visvas.in/admin, built with Payload CMS 3. A CMS, or content management system, is where staff log in to add projects, posts and testimonials without touching code.

Hosting, in one sentence: the code lives on GitHub, Vercel builds and serves it whenever the `main` branch changes, Cloudflare sits in front for speed and protection, Neon holds the PostgreSQL database, and Cloudflare R2 stores uploaded images, brochures, videos and the blog snapshot.

## 2. Who reads what

| If you are | Start with |
|---|---|
| A content editor (adding projects, posts, testimonials) | [docs/payload-guide/Visvas-CMS-Editor-Guide.html](docs/payload-guide/Visvas-CMS-Editor-Guide.html), a step-by-step guide with screenshots |
| Marketing | Sections 5 and 6 below (tracking and the enquiry spreadsheet), then [docs/gtm-form-tracking.md](docs/gtm-form-tracking.md) |
| Sales or management | Sections 3 and 4 below (the visitor's journey and where enquiries go) |
| A developer or an AI agent | [AGENTS.md](AGENTS.md) for the rules, then section 8 below to set up |

## 3. The visitor's journey

Each step says what the visitor sees, then what happens behind the scenes.

### 3.1 Arriving on any page

**What the visitor sees.** A header with the logo in the centre and the menu: Home, Projects (a dropdown with Ongoing and Completed), About, Community, Blog, Contact, and a green "Enquiry Now" button. On a phone the menu folds into a hamburger icon and a phone icon appears that dials `tel:+919543224411`. A bar fixed to the bottom of the phone screen offers Call Us, WhatsApp and Enquire.

**Behind the scenes.**

- Google Tag Manager (GTM) loads. GTM is a container of small tracking scripts, called tags, managed outside the code. Our container id is `GTM-NXHMWWFZ`. It forwards events to Google Analytics 4 (GA4).
- PostHog, a second analytics tool, loads only if both of its settings are present (see section 8).
- The browser remembers how the visitor arrived. If the address carried campaign codes (UTM parameters such as `utm_source`, or a Google click id `gclid`, or a Facebook click id `fbclid`), they are saved as the "first touch" for as long as the browser keeps data, and as the "last touch" for the current visit. The last 20 pages viewed are also kept for the visit. All of this is attached to any enquiry the visitor later sends.
- The phone number shown comes from the Contact Page in the CMS. If that is empty, the site uses the `NEXT_PUBLIC_BUSINESS_PHONE` setting, and failing that a number built into the code.
- Visitors from a block list of IP addresses, or from Tor exit nodes, see a page at `/blocked` instead of the site. The check runs in `src/proxy.js`.

### 3.2 The home page

**What the visitor sees**, top to bottom: a full-width video banner; "Latest Projects" with four project cards and a link to the ongoing list; "Who We Are" with three cards and animated figures; an interactive map of Madurai with ongoing projects pinned on it; "How We Build", three steps revealed as the visitor scrolls; "Completed Projects" with three cards; then the footer with a testimonials carousel, recent projects, quick links and contact details.

**Behind the scenes.**

- Latest Projects, Completed Projects, the How We Build steps and the testimonials come from the CMS.
- The map, the Who We Are text and figures, and the video banner are fixed in the code. Editing them in the CMS has no effect.
- The page is served from a saved copy that Next.js rebuilds at most once an hour. This is called ISR, incremental static regeneration. Edits to projects and testimonials clear the saved copy at once, so they appear within seconds. Edits to the Home Page settings in the CMS wait for the hourly rebuild.

### 3.3 Browsing project lists

**What the visitor sees.** `/projects/ongoing` and `/projects/completed` each show a banner, a filter bar (status, type, location, budget), a grid of eight project cards per page, and page numbers. Each card shows the cover image, a status badge, the location and the name. A third page, `/projects`, lists every project without filters; it is only reachable from the Who We Are cards and is not in the sitemap.

**Behind the scenes.** The ongoing list refreshes every five minutes, the completed list hourly. A project counts as completed when its status in the CMS has the value `completed`; anything else is ongoing. The filter choices come from the Project Statuses, Project Types and the distinct locations in the CMS.

### 3.4 A project page

**What the visitor sees.** A hero image, then a sticky navigation bar that follows the visitor down the page with About, Amenities, Location, Media and FAQs, plus Enquire and Chat on the right. A section only appears if it has content.

- About: location, name, a facts grid (property type, status, area, RERA number, starting price, bedrooms), an optional image, and the enquiry form in a side panel.
- A written description.
- Amenities as an icon grid.
- Location: the address, a "Get Direction" button, nearby transport, and a Google map.
- Media: photos, floor plans and videos in tabs. Photos open in a full-screen lightbox.
- FAQs as an accordion.

**Behind the scenes.**

- Chat opens WhatsApp at `https://wa.me/919543224411?text=...` with a message naming the project, and records a `whatsapp_click` event in GTM.
- Enquire opens the enquiry pop-up (section 3.6) with the project name already filled in.
- The page refreshes hourly, but a project edit in the CMS clears it at once.

### 3.5 Sending a project enquiry (the form on the project page)

**What the visitor sees.** Fields for name, mobile, email, budget and message, then a checkbox "Do you have whatsapp activated on this number?" as the last input, and a Send button. Missing or invalid fields show a red message under the field. On success the form is replaced by "Thank you, we will get back to you soon" and, if the project has a brochure uploaded in the CMS, a "Download Brochure" link. This is the only place on the site where a brochure is offered.

**Behind the scenes.** The submission goes through the pipeline in section 4 with the form type `enquiry` and the project name attached. GTM records the visitor's progress as events: `form_view` when the form appears, `form_start` at the first keystroke, `form_validation_error` if a field is wrong, `form_submit` when the request is sent, `form_submission` with a success or error status when the server answers, and `form_abandon` if the visitor leaves after starting without finishing. No name, email, phone or message text is ever sent to GTM.

### 3.6 Enquiring from any page (the pop-up)

**What the visitor sees.** "Enquiry Now" in the header, "Enquire" in the mobile bar, or "Enquire" on a project page opens a pop-up titled "Request for more information" with the same fields as the project form. Escape, the X button or a click outside closes it.

**Behind the scenes.** Opening it records `enquiry_form_visible`, then `form_view`. Closing it after typing records `form_abandon`. A submission goes through the same pipeline as section 3.5 with the form type `enquiry`.

### 3.7 The contact page

**What the visitor sees.** A banner, the office address, email and phone, a WhatsApp link, a Google map, and a contact form with the same fields as the project form minus the project. Success shows the heading and message set in the CMS Contact Page.

**Behind the scenes.** Form type `contact`. The CMS also has a success link field, but the form does not use it (known issue). Clicks on the phone, email and address here are not recorded in GTM (known issue).

### 3.8 The blog and the newsletter

**What the visitor sees.** `/blog` lists posts with cover image, title, excerpt and date, ten per page, with a "Subscribe" box in the side panel asking for name and email. Each post page shows the cover, title, date, author and the article, with the same subscribe box. There are no categories, tags or search.

**Behind the scenes.** The blog pages do not read the database. When a post is published, the CMS writes a copy of it as JSON files to R2 (a snapshot), and the pages read that. This keeps the blog fast and means edits show within seconds. The subscribe box sends form type `newsletter`: it is stored in Sheets and the CMS, skipped for Zoho, and the visitor receives "You're subscribed to Visvas updates".

### 3.9 About and Community

**What the visitor sees.** `/about` has a hero, an introduction, animated figures, mission and vision blocks, and a founder's note. `/community` has a hero, two autoplay videos and a "Built around shared life" section.

**Behind the scenes.** The About page content comes from the About Page settings in the CMS (first filled by a seed script). The Community page body is fixed in code; only its search-engine fields come from the Impact Page settings. Both refresh hourly.

### 3.10 Legal pages

Any page in the Policies collection is served at `/{its slug}`, for example `/privacy-policy`. The footer lists them all. The forms link to `/terms-and-conditions` and `/privacy-policy`, so those two slugs must exist in the CMS.

### 3.11 Not found, blocked and redirects

A missing project, post or policy shows a custom "This Address Isn't Listed" page with links home and to ongoing projects. Blocked visitors see `/blocked`. Old addresses from the previous WordPress site redirect to their new homes, and `/kumbabishekam` redirects to `/about`.

### 3.12 Files for search engines and AI crawlers

`/robots.txt` (which crawlers may read what), `/sitemap.xml` (a list of pages for search engines; it currently omits `/about`, `/community`, `/contact`, `/blog` and `/projects`, a known issue), and `/llms.txt`, `/llms-full.txt` and `/ai.txt` for AI crawlers.

## 4. Where enquiries go

Every form (contact, project, pop-up, newsletter) sends its data to one place, `POST /api/forms/submit`, and the server runs these steps in this exact order.

1. **Block list.** A blocked IP address is refused before anything else.
2. **Read the request.** If the form type or the data is missing, the server answers with an error.
3. **Identify the visitor's IP** from the Cloudflare header, then the `x-real-ip` header, else "unknown".
4. **Rate limit.** More than 5 submissions in a minute from one IP are refused with "Too many requests". The counter lives in memory on each server instance.
5. **reCAPTCHA v3.** Google scores whether the sender looks human. A score under 0.5, or a token for the wrong form, is refused. This step is skipped when the reCAPTCHA secret is not configured, and it lets the submission through if Google cannot be reached.
6. **Required fields.** Name and email on every form; mobile and budget on contact and project forms. A failure returns the field errors to the visitor.
7. **Honeypot.** Every form has a hidden field called `company` that humans never see. If a bot filled it, the submission is marked as spam: it is still saved in the CMS with the spam flag, but nothing is emailed and nothing goes to Sheets or Zoho. The bot still sees "success".
8. **Google Sheets.** A row is appended to the tab named after the form type: `contact_responses`, `enquiry_responses` or `newsletter_responses`.
9. **CMS, Contact Submissions.** The full record is saved here. This is the system of record. "Success" to the visitor means this row exists.
10. **Zoho CRM.** Contact and project enquiries are pushed as leads. Newsletter sign-ups are not.
11. **Email to the admin address** with subject "New Form Submission: contact" (or enquiry, or newsletter). Replying to it replies to the visitor.
12. **Email to the visitor.** "Confirmation: We received your inquiry", or "You're subscribed to Visvas updates" for the newsletter. The admin address is blind-copied.
13. **Delivery status** for each of the above is written back onto the CMS record.
14. **Form Submission Logs.** One log row per attempt with what succeeded, what failed and how long it took. Check here first if a lead seems to be missing.

| Destination | What it stores | When it is skipped |
|---|---|---|
| Google Sheets | Timestamp, name, email, mobile, message, and the full record as JSON (including how the visitor arrived) | Sheets settings missing, or spam |
| Contact Submissions (CMS) | Everything: fields, spam flag, delivery status, IP, browser, referring page, page history, first and last touch | Never (apart from a database failure) |
| Zoho CRM | Last Name, Email, Phone, a Description holding message, project, budget and WhatsApp yes/no, Lead Source "Website" | Newsletter, Zoho settings missing, or spam |
| Admin email | The whole submission, first and last touch, IP | `ADMIN_EMAIL` missing, Gmail settings missing, or spam |
| Visitor email | A short confirmation | Gmail settings missing, or spam |

If Sheets, Zoho or email fail but the CMS row was saved, the visitor still sees success and the record is marked "degraded" in the logs.

## 5. Tracking (GTM and GA4)

A few words first. The website pushes small messages into a list in the browser called the dataLayer. GTM watches that list. A **trigger** is a rule such as "when a message named form_submit arrives". A **tag** is what runs when a trigger fires, here "send an event to GA4". A **variable** reads one detail from the message, such as the project name, so the tag can send it along. GA4 collects the events in a **property**, and the events you care most about are marked as **key events** (what older Google Analytics called conversions).

The forms and the events they send:

| Form type | Form name in GA4 | Where |
|---|---|---|
| `contact` | `contact_page_form` | Contact page |
| `enquiry` | `project_enquiry_form` | Project page side panel |
| `enquiry` | `enquiry_modal` | The pop-up |
| `newsletter` | `blog_newsletter_form` | Blog side panel |

| Event | When | Extra details sent |
|---|---|---|
| `form_view` | Form appears, or the pop-up opens | |
| `form_start` | First field the visitor types in | `first_field` |
| `form_validation_error` | A field failed the checks | `error_type`, `error_fields`, `error_count` |
| `form_submit` | Request sent to the server | `attempt`, `time_to_submit_ms`, `budget`, `whatsapp_opted`, `has_message`, `message_length` |
| `form_submission`, status success | Server accepted it. GTM turns this into GA4 `generate_lead`, or `sign_up` for the newsletter | `attempt`, `time_to_submit_ms`, `submission_time`, the same flags as above |
| `form_submission`, status error | Server refused it, or the request failed | `error_type` (server or network), `error_message`, `error_fields`, `attempt` |
| `form_abandon` | Form closed after a start without success | `attempts`, `time_on_form_ms` |

Every event also carries the form type, form name, page path and, for project forms, the project name. Other events: `whatsapp_click` (project page Chat and the mobile bar), `outbound_click` (the Madarth link in the footer), `enquiry_form_visible` (pop-up opened).

Personal data is never sent to GTM or GA4. Names, emails, phones and message text are removed before any push. Only yes/no flags and counts go through.

GA4 only has data from 23 October 2026 onwards: the GTM container had no GA4 tag before that day. Both `generate_lead` and `sign_up` are key events, and GA4 has custom dimensions for form type, form name, form location, project name, error type and error fields, plus a funnel exploration "Form submission funnel (by project)".

Full detail, the GTM setup steps and the change log of every container version: [docs/gtm-form-tracking.md](docs/gtm-form-tracking.md). The container can be re-imported from [docs/gtm-visvas-form-tracking.json](docs/gtm-visvas-form-tracking.json).

## 6. The enquiry spreadsheet and its Dashboard

The Google Sheet "Visvas / Website / Form data" has three tabs the website writes to: `contact_responses`, `enquiry_responses` and `newsletter_responses`. Each has a header row (Timestamp, Name, Email, Mobile, Message, Full Data) and one row per submission, newest at the bottom. The "Full Data" column holds the whole record as JSON, including the campaign codes the visitor arrived with. The sheet must be shared with the service-account email as Editor for the website to write to it.

The first tab, **Dashboard**, was added on 23 October 2026. It is built from formulas over the three tabs, so it updates by itself the moment a new row lands. It shows:

- Summary: total per form, today, last 7 days, last 30 days, and a count of test entries named "kavinraj test" so they can be ignored.
- Enquiries by project, ranked.
- Submissions by month, split by form.
- Submissions by traffic source, from the first-touch campaign code.
- The latest 20 submissions.
- Three charts: by month, by project and by source.

Columns N to U on that tab are hidden helper columns that feed the tables. Nothing on the Dashboard needs editing.

## 7. Editing content in brief

Staff log in at `/admin`. The full guide with screenshots is [docs/payload-guide/Visvas-CMS-Editor-Guide.html](docs/payload-guide/Visvas-CMS-Editor-Guide.html) (the HTML file is the current copy; the .docx next to it is older).

| In the CMS | Where it shows on the site |
|---|---|
| Projects | Project lists, project pages, home page sections, footer recent projects, sitemap |
| Project Statuses, Project Types, BHK Types, Amenities | Project filters and the facts on project pages |
| Posts, Blog Categories | Blog list and post pages (categories are stored but not shown) |
| Testimonials | Footer carousel on every page |
| Policies | Legal pages at `/{slug}` and the footer links |
| Media | Every uploaded image, brochure and video |
| Contact Submissions, Form Submission Logs | Read-only records of enquiries (section 4) |
| Widgets | Not used on the site |
| Users | Admin logins |
| Home Page, About Page, Blog Page, Contact Page, Impact Page | The matching pages (Impact Page backs `/community`) |

When will a change appear?

| What you changed | Visible on the website |
|---|---|
| Blog post (create, edit, publish, unpublish), Blog Page banner | Within seconds |
| Testimonials, policy footer links, project lists and footer projects | Within seconds (ongoing list up to 5 minutes) |
| Contact Page phone, address, WhatsApp | Within a minute or two |
| An individual project page | Up to 1 hour |
| Home, About, Impact (`/community`) pages, policy page text, amenities and lookup lists | Up to 1 hour |
| A replaced image with the same file name | Up to 1 day. Upload a new file name instead |

## 8. Setup for developers

You need Node 20.6 or newer, pnpm, and a PostgreSQL connection string (Neon or local).

```bash
pnpm install
# create .env.local by hand using the tables below
pnpm db:push        # creates the database tables and regenerates payload-types.ts
pnpm dev            # http://localhost:3000, admin at /admin
```

There is no `.env.example` to copy, because `.gitignore` ignores every `.env*` file. Create `.env.local` yourself. The scripts in section 10 also read `.env.local`.

Environment variables are settings read by the server at start-up. Only the first two are required; everything else degrades gracefully.

**Core**

| Variable | Required | If missing |
|---|---|---|
| `DATABASE_URL` | Yes | The site will not start |
| `PAYLOAD_SECRET` | Yes (32+ characters) | Admin sessions are signed with an empty secret; always set it |
| `NEXT_PUBLIC_SITE_URL` | | Canonical links fall back to localhost or www.visvas.in |

**Email (Gmail SMTP)**

| Variable | If missing |
|---|---|
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_SENDER_EMAIL` | Emails are logged, not sent |
| `GMAIL_SENDER_NAME` | Sender shows without a display name |
| `ADMIN_EMAIL` | No admin notification, no blind copy |

**Google Sheets**: `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID`. All three or the Sheets step is skipped.

**Zoho CRM**: `ZOHO_WEBTOLEAD_XNQSJSDP` and `ZOHO_WEBTOLEAD_XMIWTLD` (both needed, else skipped); optional `ZOHO_WEBTOLEAD_URL`, `ZOHO_WEBTOLEAD_ACTION_TYPE`, `ZOHO_WEBTOLEAD_RETURN_URL` with sensible defaults.

**reCAPTCHA v3**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (browser) and `RECAPTCHA_SECRET_KEY` (server). Set both or neither.

**Cloudflare R2**: `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_ACCESS_KEY`, `R2_SECRET_KEY`. All four turn on cloud storage for uploads and the blog snapshot; otherwise files stay on local disk and the blog reads the database.

**Contact details shown on the site**: `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_BUSINESS_PHONE` (fallbacks when the CMS Contact Page is empty), `NEXT_PUBLIC_CONTACT_EMAIL` (used in `/ai.txt`).

**PostHog**: `NEXT_PUBLIC_POSTHOG_HOST` and `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. Both or PostHog does not load.

Anything starting with `NEXT_PUBLIC_` is visible to visitors in the browser, so never put a secret there. `NEXT_PUBLIC_GADS_ID` appears in older notes but is not used.

## 9. Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Run the site locally |
| `pnpm build` and `pnpm start` | Production build and serve |
| `pnpm lint` | Check the code with ESLint |
| `pnpm payload:migrate`, `pnpm payload:migrate:create`, `pnpm payload:generate:types` | Database migrations and type generation |
| `pnpm db:push` | Migrate, then regenerate types |
| `pnpm blog:export` | Backfill the blog snapshot on R2 (needs the R2 settings) |

## 10. Scripts

In the `scripts/` folder. Run with `node --env-file=.env.local scripts/<name>` unless noted.

| Script | Purpose |
|---|---|
| `export-blog-snapshot.mjs` | Backfill the blog snapshot (same as `pnpm blog:export`) |
| `seed-policies.mjs [--update]` | Seed draft legal pages. The text is a draft, not legal advice |
| `seed-about-page.mjs [--dry]` | Fill the About page with seed content |
| `seed-project-faqs.mjs` | Add FAQs to projects that have none |
| `update-tor-exit-nodes.js` | Refresh the Tor block list (no settings needed) |
| `restore-project-images.js` | One-off repair from a past change; historical |
| `generate-email-signatures.py` | Rebuild the HTML email signatures in `public/email-signature/` (run with `python3`) |

## 11. Hosting and deployment

Pushing to the `main` branch on GitHub triggers a Vercel build and deploy. Environment variables are set in the Vercel project, not in the repo. Cloudflare sits in front of Vercel and supplies the visitor IP header the site trusts. Media and the blog snapshot are on Cloudflare R2. The database is PostgreSQL on Neon.

## 12. Where the documents live

| Document | What it is |
|---|---|
| [AGENTS.md](AGENTS.md) | Rules and facts for developers and AI agents |
| [CLAUDE.md](CLAUDE.md) | Points to AGENTS.md plus notes for Claude Code |
| [docs/gtm-form-tracking.md](docs/gtm-form-tracking.md) | Tracking events, GTM and GA4 setup, container change log |
| [docs/gtm-visvas-form-tracking.json](docs/gtm-visvas-form-tracking.json) | GTM container import file |
| [docs/payload-guide/](docs/payload-guide/) | The CMS editor guide and its screenshots |
| [docs/backups/](docs/backups/) | Content of the retired Kumbabishekam page |

## 13. Known issues

These are recorded here so nobody is surprised. None of them is fixed yet.

- `POST /api/admin/register-images` has no login check.
- Phone and address clicks are not tracked anywhere; only WhatsApp clicks are.
- The contact form ignores the success link set in the CMS.
- The sitemap omits `/about`, `/community`, `/contact`, `/blog` and `/projects`.
- Home, About and Community page edits take up to an hour to show.
- When `ADMIN_EMAIL` is not set, the record still says the admin email was sent.
- Forms print the submitted fields to the browser console, and the server log keeps the full submission including personal data.
- The API reply to the browser includes the raw error text and the CMS record id.
- Images are allowed from any `https://` host.
- The rate limiter resets per server instance, reCAPTCHA lets submissions through when Google is down, and the form type is not checked against a fixed list.
- Archived blog posts can still be read through the CMS API.
- The home page's search markup points to a `/search` page that does not exist.
- A few code-level problems: the testimonials carousel breaks a React rule, the Cormorant font is never loaded, the WhatsApp checkbox id is duplicated when the pop-up opens on the contact page, and some components and helpers are unused. The full list is in AGENTS.md.
- `pnpm db:push` calls `npm run` internally. It works, but it is inconsistent.

## 14. Glossary

- **CMS**: content management system; the admin area where staff edit content.
- **Environment variable (env var)**: a named setting given to the server, such as a password or an id, kept out of the code.
- **ISR**: incremental static regeneration; serving a saved copy of a page and rebuilding it in the background after a set time.
- **Cache tag**: a label on saved data so one edit can clear exactly the right saved copies.
- **GTM**: Google Tag Manager, a container for tracking scripts managed outside the code.
- **Tag, trigger, variable**: in GTM, the script that runs, the rule for when it runs, and a value read from the page.
- **dataLayer**: the list in the browser where the site posts messages for GTM.
- **GA4**: Google Analytics 4, where events are counted and reported.
- **Key event**: a GA4 event marked as important, such as a lead.
- **PII**: personally identifiable information, such as a name, email or phone number.
- **Honeypot**: a hidden form field that only bots fill in.
- **reCAPTCHA**: Google's check that a form was sent by a human.
- **Rate limit**: a cap on how many requests one visitor may send in a period.
- **Web-to-lead**: Zoho's way of accepting a lead from a website form.
- **R2**: Cloudflare's file storage, used for uploads and the blog snapshot.
- **Neon**: the hosted PostgreSQL database service.
- **Vercel**: the hosting service that builds and serves the site.
- **Cloudflare**: the network in front of the site that speeds it up and protects it.
- **UTM**: codes added to a link (`utm_source`, `utm_medium`, `utm_campaign`) that say where a visitor came from.
- **gclid, fbclid**: click ids added by Google Ads and Facebook ads.
- **First touch, last touch**: how a visitor first arrived, and how they arrived on the current visit.
- **Slug**: the last part of a page address, such as `privacy-policy`.
- **Collection, global**: in Payload, a list of records (projects, posts) and a single-record page (Home Page).
