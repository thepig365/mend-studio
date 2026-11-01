# Hair discovery and local visits — 1 November 2026

## Baseline and scope

Checked production and `main` at `9cea87d` on 1 November 2026 (Australia/Melbourne). PRs 40–44 are included in the baseline. Both hair pages already named Deepdene, Canterbury, Surrey Hills, Balwyn, Kew and Camberwell, and already had descriptive hair titles/H1s. Those metadata and H1 values are retained. A cached web extraction showed older content; direct production responses and the current repository were used for this change.

The implementation remains on `/services/hair` and `/zh/services/hair`. Deepdene is the actual salon location; the other six areas, including newly added Mont Albert, are visitor catchments. No new suburb pages, locations, service offers or structured-data claims are introduced.

## Before and after

| Area | Before | After |
| --- | --- | --- |
| Local relevance | Five nearby suburbs named in a short visiting paragraph | Canterbury, Surrey Hills, Balwyn, Kew, Camberwell and Mont Albert naturally connected to cuts, colour, styling and perms at the Deepdene studio |
| Visiting information | Address, map, phone and general contact link below the full menu | Early `#hair-visit` shortcut; explicit route planning and maintained opening-hours/contact destination; same verified address and map |
| Choosing services | Styling, balayage and Korean Soft Wave links | Also links to the existing colour/foils and perm/straightening menu groups |
| Related care | One generic scalp-care link | Early `#hair-care-options` shortcut, short distinction between Head Spa relaxation and cosmetic hair/scalp care, and separate same-language links to both existing menus |
| Homepage discovery | Hair service card among the wider service range | Additional descriptive hair link in the existing welcome section, in both languages |
| Studio-image location | Two shared alt labels incorrectly said Balwyn | Both now correctly say Deepdene; image files, sources and credits are unchanged |

The real address is **74 Whitehorse Road, Deepdene VIC 3103**. No five-kilometre guarantee, journey duration, transit route or parking availability is claimed. Dedicated Head Spa/scalp pages, prices, service items, first-hair-visit offer terms, popup, consent and booking routes are unchanged. The new care explanation does not extend the hair promotion to Head Spa or other service categories.

## Destinations

- Hair and visiting guide: `/services/hair#hair-visit`, `/zh/services/hair#hair-visit`.
- Care comparison: `/services/hair#hair-care-options`, `/zh/services/hair#hair-care-options`.
- Existing Head Spa menus: `/services/head-spa`, `/zh/services/head-spa`.
- Existing scalp-care menus: `/services/hair-scalp-recovery`, `/zh/services/hair-scalp-recovery`.
- Existing contact pages supply maintained opening hours and directions. No hours are duplicated into new content.

## Validation

- Lint and TypeScript passed.
- All ten existing `npm test` checks passed, including approved menu values, protected imagery, booking, translations, consent, private-route boundaries and the promotion popup.
- Production build generated 53 pages. An initial build encountered the existing generated-font cache error; archiving `.next` and rebuilding succeeded without font/configuration/dependency changes.
- Local production runtime checks passed for bilingual hair metadata, seven-area visiting context, early anchor uniqueness, all internal destinations, same-language Head Spa/scalp links, profile preservation and accurate image labels.
- Promotion regression checks passed for all four promotion pages, 44 sitemap URLs, reciprocal languages/canonicals, approved terms, service anchors and existing MaSe handoffs.
- The protected `src/data/images.ts` hash was updated solely for the two reviewed Balwyn-to-Deepdene alt corrections; all other asset protection remains active.

## Browser QA follow-up

The local production build was inspected in Chrome on the owner's Mac at 1920 × 963 (desktop), 390 × 844 (both languages), and 320 × 667 (Chinese narrow-screen care section). The visiting and care sections wrap without horizontal overflow. The final anchor destinations sit approximately 144 px below the viewport top, clear of the fixed header. Existing mobile booking controls remain usable.

Visual QA found that client-router links between fragments on the same hair page could compose two hashes in the address. The five local service links in this guide now use native fragment anchors. Keyboard navigation was verified for all five targets in both languages: styling, colour/foils, perms/straightening, balayage and Korean Soft Wave. Each reached the correct single-fragment URL. The early visiting/care anchors were also checked.

Both new homepage hair entries navigate to the correct language. Head Spa and scalp-care links open the existing matching-language pages. No real booking or form submission was performed. The final local runtime hair and promotion checks, lint, TypeScript, i18n/growth checks and 53-page production build passed after the anchor correction. No production deployment was performed as part of this QA follow-up.

Production verification remains a separate release check. HTTP health, readable location information and valid links do not establish Google indexing, organic rank or Maps rank. Those outcomes need separate observations after publication.
