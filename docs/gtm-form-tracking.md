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

### Version 8 (23 Oct 2026): removed "TechSol - Ongoing Project WhatsApp Button 46409"

Removed the Google Ads conversion tag `TechSol - Ongoing Project WhatsApp Button 46409`
(conversion ID 6886537197, label CkBDCO3v4NMZEICzy90p), added in 2024 by a previous agency.

Why:

- Its trigger fired on clicks whose URL contained `https://api.whatsapp.com/`. Every WhatsApp
  link on this site is built by `src/lib/whatsapp` as `https://wa.me/<number>?text=...`, so the
  trigger could never match and the tag has not fired since the site moved to this codebase.
- The conversion belongs to Google Ads account 6886537197, which is not the Visvas account
  (11202124160) used by the other two conversion tags.

The orphaned trigger `WhatsApp Button` (Just Links, URL contains api.whatsapp.com) is still in the
container with no tag attached and can be deleted at any time.

Known gaps left as-is for now: the two Visvas Google Ads tags also never fire, because their
triggers look for `wa.me/919965593344` (old number; the site uses 919543224411) and
`tel:9543224411` (the site uses `tel:+919543224411`). Fix the triggers or remove the tags once
it is confirmed whether Google Ads conversions are still wanted.
