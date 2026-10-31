# Hair stylist discovery — source and scope

This release makes existing approved people and studio content easier to find. It adds no new professional credentials, customer work, testimonials, booking guarantees or service items.

## Sources checked

- [PR #25](https://github.com/thepig365/mend-studio/pull/25) introduced Mejin Shick's bilingual professional profile with owner-supplied imagery and excluded private personal details.
- [PR #26](https://github.com/thepig365/mend-studio/pull/26) supplied the final Chinese positioning, approved professional portrait and Chinese poster. It explicitly removed the older selfie gallery; this release does not reinstate it.
- [PR #27](https://github.com/thepig365/mend-studio/pull/27) contains the approved Chinese career timeline. The complete biographies and career timelines remain unchanged.
- The additional consultation sentence paraphrases the already published listening, explanation and home-care approach in `lib/mejin-profile.ts`.
- `public/images/mend-beauty-salon-interior-1.png` is existing MEND studio imagery, registered in `src/data/images.ts` and already used in the approved promotion pages. It replaces only the English and Chinese hair-page stock hero. Its caption describes the space, not a customer result.
- Hair service images in `src/data/serviceImages.ts` are predominantly stock references. Their filenames or visual match do not establish that they show Mejin's work or MEND customers. They are not reused as a portfolio.

## Implementation

- The hair-menu introduction links directly to the existing Mejin feature with a stable, header-offset anchor.
- The feature retains the approved portrait and experience summary, adds the existing consultation approach, and links to actual haircuts, colour, straightening and hair/scalp menu entries.
- Both full profile pages use the same language-aware service links. Existing profile metadata, structured data, poster and booking paths remain intact.
- Existing prices, promotion terms and other service content are unchanged. The separately authorized promotion popup shares this release and uses the existing analytics consent gate.

## Content still requiring source material

No new customer portfolio or review section is rendered. A future portfolio needs a small set of genuine completed-work images, the stylist/service attribution, and permission covering website reuse from the photographer and any identifiable person. Review quotations need the exact original source and suitable reuse permission; public visibility alone is not treated as permission to reproduce customer identity or photos. No empty placeholder sections or rating markup are added.

## Verification

Run lint, type-check, the ten-check test suite and the production build. `scripts/check-hair-seo.mjs` additionally checks the rendered bilingual hair/profile pages, studio image, stylist anchor, four exact service destinations per page, retained portrait and profile schema, and exclusion of the removed gallery and unsupported review schema. The promotion regression script checks the previous release's offer/navigation behavior. Production HTTP checks are separate from visual browser inspection.
