# Hair and scalp page clarity — 5 November 2026

## Evidence and scope

Baseline: `7f2c3e188f07792f0a351edec9e8ea5b259083d9` on `main`.
Inspected the current public English and Chinese `/services/hair-scalp-recovery`
pages and their existing incoming links from the services hub and hair guide.
The primary hair page already had local metadata, seven-area visiting guidance,
service shortcuts and practitioner links, so this change leaves those intact.

The English scalp-care page inherited the full hair category's introduction
(cuts, colour and styling) although its eight menu entries cover assessments and
care rituals. Its metadata also mentioned collagen and keratin without matching
entries in this page's menu. The Chinese introduction used internal approval
wording rather than explaining the page to a customer. Both pages lacked an
early contextual route to the full hair menu or the separate Head Spa menu.

## Change

- EN title/H1: `Hair & Scalp Recovery` → `Hair & Scalp Treatments in Deepdene`.
- ZH title/H1: `头皮健康管理` → `Deepdene 头皮与发质护理`.
- Give each language a focused description and introduction derived from the
  existing menu; remove unrelated claims from this page's English description.
- Add a menu H2, established MaSe handoff guidance, and descriptive same-language
  links to `/services/hair` and `/services/head-spa` before the menu.
- Retain the existing cosmetic-care boundary in both languages. Schema continues
  to use the existing single Deepdene business and shared menu data.
- No new routes, service entries, prices, durations, offers, photos, hours,
  booking destinations, consent, analytics, authentication or crawler changes.

Sources: [English care page](https://mendbeauty.com.au/services/hair-scalp-recovery),
[Chinese care page](https://mendbeauty.com.au/zh/services/hair-scalp-recovery),
[hair guide](https://mendbeauty.com.au/services/hair),
[Head Spa menu](https://mendbeauty.com.au/services/head-spa).
The approach follows Google's guidance on
[descriptive titles](https://developers.google.com/search/docs/appearance/title-link)
and [contextual crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Validation

- `npm run lint`, `npm run type-check`, all ten `npm test` suites: passed.
- `npm run build`: passed, 53 static pages. Network access was needed for the
  site's existing Google Fonts; the initial sandbox-only attempt failed there.
- Existing runtime `check-hair-seo.mjs` and `check-promotions.mjs`: passed against
  the production build on loopback port 3193, including 44 sitemap URLs returning
  HTTP 200 and unchanged bilingual MaSe redirect destinations.
- Compared the live baseline and built page JSON-LD: all eight service entries,
  their order, names, descriptions, prices and provider identity match exactly
  in each language. Only the list/category name follows the revised heading.
- Both pages retain one H1, self-canonical, reciprocal en-AU/zh-Hans/x-default
  alternates, indexable content and same-language contextual links.
- Chrome visual review at 1440×900 and 390×844: headings, body, care links and
  booking controls are readable; no horizontal overflow at 390px. The English
  contextual hair link and Chinese Head Spa link reached the correct pages.
- `git diff --check`: passed. No real booking or enquiry was submitted.

Environment note: the existing lockfile is missing optional `@emnapi` entries
under npm 10 and 11, so `npm ci` failed. `npm install --package-lock=false
--no-audit --no-fund` succeeded locally without modifying package.json or
package-lock.json. Dependency maintenance is outside this content correction.

## Measurement limits

These checks establish implementation and customer navigation. Publication,
indexing, ranking, search clicks and confirmed appointments are separate states.
No rank improvement, first-page placement or booking lift is claimed. Booking
links still hand off to the generic MaSe menu, not a preselected service.
