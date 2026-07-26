# MaSe booking integration

## Purpose

`mendbeauty.com.au` remains the canonical brand, service and SEO website. MaSe
provides live appointment availability, scheduling and customer records. The
website does not store booking personal information.

## Customer flow

1. A booking call to action opens `/book`.
2. The branded page explains the handoff and provides phone and policy fallbacks.
3. The customer continues to the configured MaSe booking URL in a new tab.
4. MaSe owns service, staff, availability and customer-booking data.
5. Consultation, gift-card, membership and non-booking questions remain on the
   zero-storage email enquiry flow.

## Configuration ownership

| Record | Canonical source |
| --- | --- |
| Public business identity and contact details | `lib/site.ts` |
| Website booking provider URL | `NEXT_PUBLIC_MASE_BOOKING_URL` |
| Live service price, duration and bookability | MaSe project management |
| Staff service eligibility and working time | MaSe employee and roster settings |
| Available appointment slots | MaSe scheduling |
| Customer and appointment records | MaSe CRM |
| Public cancellation policy | Website `/policies`, after CEO approval |

## Verified public business configuration

- Website: `https://mendbeauty.com.au`
- Email: `hello@mendbeauty.com.au`
- Phone display: `0499 66 88 99`
- Telephone URI: `+61499668899`
- Address: `74 Whitehorse Road, Deepdene VIC 3103, Australia`
- Trading hours: 09:00–17:00 Monday, Tuesday and Thursday through Sunday;
  Wednesday closed

## MaSe corrections required before production publication

The read-only audit found the following differences. Saving these settings changes
the public booking surface and therefore remains behind the final publication gate.

1. Replace the current MaSe store email with `hello@mendbeauty.com.au`.
2. Add `https://mendbeauty.com.au` as the business website.
3. Add only verified official Facebook, Instagram and Google URLs.
4. Replace the MaSe store hours with the approved hours above.
5. Add the approved logo, booking hero image and concise English store description.
6. Standardise all public booking categories and service descriptions in English.
7. Reconcile every service name, price, duration, eligible employee and online
   booking status against the website before making it bookable.
8. Reconcile employee working hours and service eligibility before opening slots.

## Recommended booking-policy changes

These are recommendations, not approved production settings:

- require at least 2–4 hours of lead time;
- require 24 hours for customer cancellation or rescheduling;
- prevent appointments from ending outside trading hours;
- disable group booking unless the studio confirms it is operationally supported;
- use manual confirmation for complex or high-value services;
- leave deposits and payment disabled until a payment provider, fee schedule,
  refund policy and dispute process receive separate approval.

## Release acceptance

- `/book` works on desktop and approximately 390 px mobile width.
- Every public `Book Now` action reaches `/book`.
- The MaSe handoff opens the correct Mend Beauty Studio booking page.
- Wednesday exposes no appointment slots.
- No slot begins or ends outside 09:00–17:00 on an open day.
- Service name, price and duration match the approved website content.
- Phone and enquiry fallbacks remain available if MaSe is unavailable.
- The website stores no booking personal information.
- Sitemap, canonical metadata, structured opening hours, lint and production build pass.

## Rollback

If the MaSe handoff is unavailable or inaccurate:

1. restore booking calls to action to the existing contact enquiry route;
2. remove or unset `NEXT_PUBLIC_MASE_BOOKING_URL`;
3. keep telephone and email enquiries active;
4. do not delete MaSe customer, appointment or operating records.
