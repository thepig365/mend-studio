# Hair search and booking-intent measurement

The existing English and Chinese Hair Atelier pages own the hair-service search intent. The first-visit promotion explains the approved offer and links back to the detailed menu. Nearby-suburb copy describes travel to the Deepdene studio; it does not represent branches in those suburbs.

## What to compare

- Search Console: filter the exact English or Chinese `/services/hair` URL and compare equal date windows for impressions, clicks, CTR and observed queries. Keep country, search type and date filters consistent. Average position is a diagnostic, not a guaranteed rank or keyword search volume.
- GA4 Landing page / Traffic acquisition: filter the hair or promotion landing path, then Organic Search or `google / organic` session source/medium. This measures consented visits, not all Google clicks. First-user source is not the same as session source.
- GA4 events: examine `book_click` alongside page path and the hair/promotion context below. Never call these appointments, customers, revenue or redeemed offers.
- Confirmed appointments and redemptions must come from verified MaSe records. The website does not receive a confirmed-booking callback, and this change adds no cross-domain identity tracking.

## Website events

All events remain behind the existing optional analytics consent gate. No new storage, form data, account links or consent defaults are introduced.

| Event | Meaning | Context |
| --- | --- | --- |
| `page_view` | A consented page view | Actual page path/location/title; initial document referrer or previous consented SPA page. Hair pages add `service_category=hair` and `page_type=service` or `promotion`. |
| `book_click` | Visitor clicked the existing Book / 预约 handoff | `action_stage=booking_link`; hair/promotion page context. On the offer page, `offer_id=first-hair-visit`. This is intent only. |
| `offer_view_click` | Visitor followed the first-visit offer link from the hair page | Hair-page path and `offer_id=first-hair-visit`. |
| `offer_details_view` | Visitor deliberately opened the promotion's offer-details dialog | Promotion-page path and `offer_id=first-hair-visit`. It is not signup or offer redemption. |

No `purchase`, `booking_complete`, `offer_claimed` or `generate_lead` event is emitted by these controls. Offer context is not persisted across pages; a later ordinary hair booking click does not automatically inherit an earlier offer view. New event parameters may need event-scoped custom dimensions before they appear in GA4 custom reports; no Analytics settings are changed by this website release.

## Validation and limitations

`npm test` exercises the real Analytics component without contacting Google, covering absent/declined consent, the Google tag queue contract, single initialization, navigation/referrers, bilingual intent context and untracked controls. `node scripts/check-hair-seo.mjs URL` checks rendered metadata, content and link targets. `node scripts/check-promotions.mjs URL` checks promotion terms, bilingual navigation, sitemap and MaSe redirects.

A successful network request is transport evidence; processed GA4 reports are separate receipt evidence. Internal QA visits must not be represented as customer growth. Reporting delay, consent choices and attribution loss can cause GA4 and Search Console totals to differ. Enhanced Measurement can independently send history-based pageviews; inspect actual collection when changing either implementation or property settings, and avoid interpreting duplicate views as growth.

Official references: [Google pageview measurement](https://developers.google.com/analytics/devguides/collection/ga4/views) and [helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
