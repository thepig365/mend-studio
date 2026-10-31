# First-visit hair promotion popup

## Display behavior

- Eligible paths are exactly `/`, `/zh`, `/services/hair` and `/zh/services/hair`.
- The initial delay is six seconds. Display waits while the tab is hidden, a consent prompt, modal or navigation menu is open, or the visitor is editing a field. These temporary conditions are rechecked every two seconds.
- The card is nonmodal: no backdrop, scroll lock, automatic focus movement or redirect. Mobile uses a compact card above the existing booking bar; desktop uses the lower-right corner. The main content remains usable.
- A labelled close button and Escape dismiss the card. If focus is inside it, dismissal returns to the prior connected control (or the header home link). Otherwise focus stays where the visitor left it. Tab is not trapped.
- One display per tab session, including reloads and language changes, using `sessionStorage` key `mend-first-hair-visit-popup-seen` with value `shown`. If storage is unavailable, the card stays suppressed. The flag is not an analytics identifier and does not depend on accepting analytics.
- Booking, contact, private/marketing, unrelated services and promotion routes are excluded. The promotion pages retain their existing user-opened offer-details dialog; the automatic popup is not mounted in their layout.

## Content and measurement

The single CTA links to the same-language existing first-hair-visit page. Scope and exclusions come directly from `lib/promotions.ts`: all hair service items for a new client's first visit, excluding other services and retail. No second discount, email requirement, collection form, geolocation or subscription is added.

With existing analytics consent, the CTA uses `offer_view_click` with `link_placement=hair_offer_popup`. Without consent, it still navigates normally and sends no event. This is a link click, not a booking or redemption.

Repository inspection found no newsletter/subscription API, mailing-provider dependency, marketing opt-in record or unsubscribe flow. `BookingEnquiryForm` opens the visitor's email application; it is not a subscription backend. No subscription functionality was introduced.

The nonmodal design follows [Google's guidance on avoiding intrusive interstitials](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials). A delay alone is not treated as protection against an intrusive layout or as a ranking guarantee.

## Checks

`npm run check:hair-popup` exercises the real component with controlled hooks, timers and DOM state: allowed/excluded routes, bilingual targets, delay, busy states, session/reload suppression, storage failure, route cleanup, no autofocus/form/modal, Escape and focus return. `check:analytics` verifies consent and the allowlisted popup event. Browser visual inspection is a separate check and is not implied by these tests.
