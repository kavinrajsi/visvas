# Action Plan

- URL: `https://indicus.in/`
- Overall score: `71/100`

## Priority Fixes

1. **5 security headers missing**
   - Priority: `Critical`
   - Area: `environment`
   - Evidence: Missing headers reduce trust and can expose the site to browser/security risks.
   - Fix: Set headers via server config (Nginx/Apache) or CDN edge rules.
2. **16 orphan page(s) with zero inbound internal links.**
   - Priority: `Critical`
   - Area: `link_profile`
   - Evidence: See audit output.
   - Fix: Add internal links from relevant content pages to these orphan pages.
3. **1 broken links detected**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Broken internal links hurt crawl flow and user trust.
   - Fix: Fix links in menus, content blocks, and internal link plugin data.
4. **Content readability is difficult**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Long, complex text can reduce engagement and comprehension.
   - Fix: Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings.
5. **Missing sameAs link to Wikipedia (Primary KG signal).**
   - Priority: `Warning`
   - Area: `sameAs`
   - Evidence: See audit output.
   - Fix: Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO.
6. **Missing sameAs link to Wikidata (Primary KG signal).**
   - Priority: `Warning`
   - Area: `sameAs`
   - Evidence: See audit output.
   - Fix: Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO.
7. **Performance measurement incomplete**
   - Priority: `Info`
   - Area: `environment`
   - Evidence: PageSpeed API returned an error, so CWV recommendations are less reliable.
   - Fix: Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output.
