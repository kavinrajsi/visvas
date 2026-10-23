# Form tracking: dataLayer → GTM → GA4

Every form on the site reports its lifecycle to the Google Tag Manager
dataLayer through `src/lib/gtm/useFormTracking.js`. GTM forwards those events
to GA4. This file lists the events the site pushes and the GTM configuration
needed to receive them.

GTM container: `GTM-NXHMWWFZ` (loaded in `src/app/layout.js`).

## Forms

| `form_type` | `form_name` | Component |
|---|---|---|
| `contact` | `contact_page_form` | `src/app/(frontend)/contact/ContactForm.js` |
| `enquiry` | `project_enquiry_form` | `src/app/(frontend)/projects/[slug]/ProjectEnquiryForm.js` |
| `enquiry` | `enquiry_modal` | `src/app/(frontend)/components/enquiry-modal/EnquiryModal.js` |
| `newsletter` | `blog_newsletter_form` | `src/app/(frontend)/blog/BlogSidebar.js` |

## Events (in lifecycle order)

Every event carries `form_type`, `form_name`, `form_location` (page path) and,
for project forms, `project_name`.

| `event` | When | Extra keys |
|---|---|---|
| `form_view` | Form rendered on the page, or the enquiry modal opened | |
| `form_start` | First field the user types in (once per attempt) | `first_field` |
| `form_validation_error` | Client-side validation blocked the submit | `error_type: validation`, `error_fields`, `error_count` |
| `form_submit` | Validation passed, request sent to `/api/forms/submit` | `attempt`, `time_to_submit_ms`, `budget`, `whatsapp_opted`, `has_message`, `message_length` |
| `form_submission` with `form_status: success` | Server accepted the submission | `attempt`, `time_to_submit_ms`, `submission_time`, same field flags as `form_submit` |
| `form_submission` with `form_status: error` | Server rejected it (`error_type: server`) or the request failed (`error_type: network`) | `error_message`, `error_fields`, `attempt`, `submission_time` |
| `form_abandon` | Form closed or unmounted after `form_start` without a success | `attempts`, `time_on_form_ms` |

Kept for existing triggers: `enquiry_form_visible` (pushed by
`EnquiryModalProvider` when the modal opens, with `project_name`).

### No PII

Name, email, mobile, phone, message text and the honeypot field are stripped
before any push (`sanitiseFormPayload` in `src/lib/gtm/events.js`). GA4 terms
forbid sending personally identifiable information, so do not add raw field
values to these pushes. Use presence flags instead.

## GTM setup

### 1. Data Layer Variables

Create one **Data Layer Variable** per key you want in GA4. Minimum set:

`form_type`, `form_name`, `form_location`, `project_name`, `form_status`,
`error_type`, `error_fields`, `error_message`, `first_field`, `attempt`,
`time_to_submit_ms`, `budget`, `whatsapp_opted`, `has_message`.

Name them `DLV - form_type` etc. Leave "Data Layer Version" at 2.

### 2. Triggers

Create **Custom Event** triggers:

| Trigger name | Event name | Condition |
|---|---|---|
| CE - form_view | `form_view` | |
| CE - form_start | `form_start` | |
| CE - form_validation_error | `form_validation_error` | |
| CE - form_submit | `form_submit` | |
| CE - form_submission success | `form_submission` | `DLV - form_status` equals `success` |
| CE - form_submission error | `form_submission` | `DLV - form_status` equals `error` |
| CE - form_abandon | `form_abandon` | |

### 3. GA4 tags

Make sure a **Google Tag** (GA4 configuration) with the GA4 Measurement ID
fires on All Pages / Initialization.

Then add a **GA4 Event** tag per trigger. Recommended GA4 event names:

| Trigger | GA4 event name | Event parameters |
|---|---|---|
| CE - form_view | `form_view` | form_type, form_name, form_location, project_name |
| CE - form_start | `form_start` | form_type, form_name, form_location, project_name, first_field |
| CE - form_validation_error | `form_validation_error` | form_type, form_name, error_fields |
| CE - form_submit | `form_submit` | form_type, form_name, form_location, project_name, attempt |
| CE - form_submission success | `generate_lead` | form_type, form_name, form_location, project_name, budget, whatsapp_opted, time_to_submit_ms |
| CE - form_submission error | `form_error` | form_type, form_name, error_type, error_message, error_fields |
| CE - form_abandon | `form_abandon` | form_type, form_name, form_location, project_name, time_on_form_ms |

`generate_lead` is a GA4 recommended event. Mark it as a **Key event** (GA4 →
Admin → Events) so form completions show up as conversions and can be imported
into Google Ads.

For the newsletter form you may prefer `sign_up` instead of `generate_lead`.
Add a second success tag with the condition `DLV - form_type` equals
`newsletter` and exclude it from the lead tag.

### 4. Custom dimensions in GA4

In GA4 → Admin → Custom definitions, register the parameters you want to
report on as event-scoped custom dimensions: `form_type`, `form_name`,
`form_location`, `project_name`, `error_type`, `error_fields`.

### 5. Verify

1. Open GTM Preview (Tag Assistant) on the site.
2. Open a project page, scroll to the enquiry form: `form_view` appears.
3. Type in a field: `form_start`.
4. Submit empty: `form_validation_error`.
5. Fill and submit: `form_submit`, then `form_submission` (`success`).
6. Check GA4 → Reports → Realtime for `generate_lead`.

In the browser console, `window.dataLayer` shows every pushed event.

## Container changelog

Every version published from 23 Oct 2026 onwards carries a "why" plus a "what changed" in its
GTM version notes (Versions, open the version, three-dot menu, Edit Notes). Keep that up for
future versions so the container history explains itself.

### Version 6 (23 Oct 2026): GA4 Google tag added, old WordPress form tag removed

Why: the GA4 property G-GWG8S9E5MF had never received data because versions 1 to 5 (2024)
contained no GA4 Google tag. Added `GA4 - Google Tag - visvas.in` on Initialization - All
Pages. Deleted the old `Visvas - Forms` tag and `Form Submission - Visvas` trigger, which were
written for the previous WordPress form markup and could not match the current forms.

### Version 7 (23 Oct 2026): form tracking tags, triggers and variables

Why: the site now pushes a dataLayer event for every form action (see the event reference
above). Imported `docs/gtm-visvas-form-tracking.json`: eight GA4 event tags, eight custom-event
triggers, nineteen `DLV - *` variables and the `Form tracking` folder. Success events map to
the GA4 recommended events `generate_lead` (lead forms) and `sign_up` (newsletter).

### Version 8 (23 Oct 2026): removed "TechSol - Ongoing Project WhatsApp Button 46409"

Removed the Google Ads conversion tag `TechSol - Ongoing Project WhatsApp Button 46409`
(conversion ID 6886537197, label CkBDCO3v4NMZEICzy90p), added in 2024 by a previous agency.

Why:

- Its trigger fired on clicks whose URL contained `https://api.whatsapp.com/`. Every WhatsApp
  link on this site is built by `src/lib/contact/whatsapp.js` as `https://wa.me/<number>?text=...`, so the
  trigger could never match and the tag has not fired since the site moved to this codebase.
- The conversion belongs to Google Ads account 6886537197, which is not the Visvas account
  (11202124160) used by the other two conversion tags.

The orphaned trigger `WhatsApp Button` (Just Links, URL contains api.whatsapp.com) is still in the
container with no tag attached and can be deleted at any time.

### Version 9 (23 Oct 2026): removed "Visvas - Whatsapp link"

Removed the Google Ads conversion tag `Visvas - Whatsapp link` (Google Ads account
11202124160, label hEdeCN7B9LsZEICzy90p), added in 2024.

Why: its trigger `Visvas - Whatsapp` fired on clicks whose URL contained
`https://wa.me/919965593344`. That number is no longer used anywhere in the code or on the
site; every WhatsApp link goes to `wa.me/919543224411`, so the trigger could never match and
the conversion recorded nothing on this codebase. The site owner confirmed it could go.

The orphaned trigger `Visvas - Whatsapp` is still in the container with no tag attached.

### Version 10 (23 Oct 2026): removed "Visvas _ contact Number"

Removed the last Google Ads conversion tag, `Visvas _ contact Number` (Google Ads account
11202124160, label etPyCNuI7rsZEICzy90p), added in 2024.

Why: its trigger `Just Links` fired on clicks whose URL contained `tel:9543224411`. The site
renders phone links as `tel:+919543224411`, so the condition never matched and the conversion
recorded nothing on this codebase. The site owner chose removal over fixing the trigger.

### Version 11 (23 Oct 2026): removed the Conversion Linker and the orphaned click triggers

Removed the legacy `Conversion Linker` tag and the three click triggers `WhatsApp Button`,
`Visvas - Whatsapp` and `Just Links` that the deleted Google Ads tags had used.

Why: the Conversion Linker only exists to store Google Ads click IDs in first-party cookies for
Google Ads and Campaign Manager conversion tags. With no such tags left it did nothing. GA4 has
its own attribution and never depended on it, and the site captures gclid/fbclid itself in
`src/lib/analytics/attribution.js`. The three triggers had no tags attached.

The container now holds only the GA4 Google tag, the eight form-tracking tags, their eight
custom-event triggers and the 19 data layer variables. If Google Ads conversions are wanted
again, add a Conversion Linker plus fresh conversion tags with triggers that match
`wa.me/919543224411` and `tel:+919543224411`.
