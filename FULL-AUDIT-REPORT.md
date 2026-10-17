# Full Audit Report

- URL: `https://indicus.in/`
- Generated: `2026-08-06T18:17:52.219402`
- Overall score: `71/100`
- Score confidence: `Medium`
- Scoring version: `1`

## Score Card

| Category | Weight | Score |
| --- | ---: | ---: |
| Security Headers | 8 | 35 |
| Social Meta | 5 | 77 |
| Robots and Crawlers | 8 | 96 |
| Broken Links | 10 | 95 |
| Internal Links | 8 | 60 |
| Redirects | 3 | 100 |
| AI Search | 5 | 100 |
| Performance and Core Web Vitals | 13 | 0 |
| On-Page SEO | 10 | 100 |
| Readability | 8 | 45 |
| Entity SEO | 5 | 80 |
| Link Profile | 7 | 55 |
| Hreflang | 5 | 0 |
| Content Uniqueness | 5 | 0 |

## Findings

| Severity | Area | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- |
| Critical | broken_links | 🔴 1 broken link(s) found |  |  |
| Critical | environment | 5 security headers missing | Missing headers reduce trust and can expose the site to browser/security risks. | Set headers via server config (Nginx/Apache) or CDN edge rules. |
| Critical | link_profile | 16 orphan page(s) with zero inbound internal links. |  | Add internal links from relevant content pages to these orphan pages. |
| Critical | security | 🔴 5 security headers missing — poor security posture |  |  |
| Warning | environment | 1 broken links detected | Broken internal links hurt crawl flow and user trust. | Fix links in menus, content blocks, and internal link plugin data. |
| Warning | environment | Content readability is difficult | Long, complex text can reduce engagement and comprehension. | Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings. |
| Warning | internal_links | ⚠️ 8 potential orphan page(s) (≤1 internal link pointing to them) |  |  |
| Warning | internal_links | ⚠️ 98 link(s) have no anchor text |  |  |
| Warning | readability | ⚠️ Content is difficult to read (Flesch: 27.2) — may reduce engagement |  |  |
| Warning | readability | ⚠️ 28.8% complex words (3+ syllables) — consider simplifying |  |  |
| Warning | readability | ⚠️ Thin content (222 words) — may rank poorly |  |  |
| Warning | robots | ⚠️ 3 AI crawlers not explicitly managed: Applebot-Extended, FacebookBot, Amazonbot |  |  |
| Warning | sameAs | Missing sameAs link to Wikipedia (Primary KG signal). |  | Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO. |
| Warning | sameAs | Missing sameAs link to Wikidata (Primary KG signal). |  | Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO. |
| info | duplicate_content | duplicate_content measurement incomplete | Script timed out after 120s | Rerun this check after resolving the environment/API/network limitation. |
| Info | environment | Performance measurement incomplete | PageSpeed API returned an error, so CWV recommendations are less reliable. | Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output. |
| info | pagespeed | pagespeed measurement incomplete | Rate limited by Google API. Wait a few minutes or add an API key. | Rerun this check after resolving the environment/API/network limitation. |

## Measurement Notes

2 checks returned errors or incomplete measurements; treat affected scores as directional.
