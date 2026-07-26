# MEND services and customer-journey architecture

## Purpose

The public services experience starts with a customer goal, not a long
treatment menu. It guides a visitor from need and available time to a suitable
service direction, then hands confirmed booking to MaSe or a studio
consultation.

The journey is deterministic guidance. It does not diagnose a condition and
does not replace professional consultation.

## Canonical content

`lib/service-catalog.ts` is the single website source for the new services
experience. It contains:

- five public categories;
- English and Simplified Chinese names and descriptions;
- duration and price display;
- launch phase;
- booking mode (`mase` or `consultation`);
- preparation and aftercare guidance;
- image and alt-text requirements.

MaSe remains the operational source for live service availability, staff and
appointment records. The website does not claim an API integration or copy
customer data.

## Routes

- `/services` and `/zh/services`: customer-outcome landing pages.
- `/journey` and `/zh/journey`: three-step guidance selector.
- `/services/{category}` and `/zh/services/{category}`: comparison pages.
- `/services/{category}/{service}` and Chinese counterparts: service detail.
- `/book` and `/zh/book`: server-side MaSe handoff.
- `/contact#booking-enquiry`: consultation fallback.

Legacy `/services/skin-facial` and `/services/body-care` routes redirect to the
new canonical category routes.

## Safety and privacy

- No medical diagnosis or treatment claims.
- Phase 3 concepts are not published.
- No full MaSe catalogue is copied.
- No personal or free-text data is sent through experience analytics.
- The provider-neutral event hook accepts controlled event names and catalogue
  identifiers only. GA4 remains disabled until consent and privacy controls
  exist.

## Visual assets

The redesigned public experience uses the approved Mend Beauty Studio interior
photography already stored in `public/images`. Professional service-specific
photography is still desirable for:

1. hair cut and colour;
2. head-spa basin and massage detail;
3. skin-management room and treatment detail;
4. shoulder/neck relaxation;
5. MEND Total Reset.

No new stock images or external hotlinks were added by this work.

## Verification

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run check:domain
npm run check:functionality
npm run check:booking
npm run check:i18n
npm run build
```

Visual acceptance covers desktop and approximately 390px mobile widths,
English and Chinese navigation, the mobile menu, journey completion, service
detail, booking/consultation paths and visible keyboard focus.
