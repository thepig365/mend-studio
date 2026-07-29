# Mend Beauty Studio — Website

A premium hair and beauty studio website for **Mend Beauty Studio — Deepdene**, built with Next.js (App Router), TypeScript and Tailwind CSS.

> Mend your hair. Refresh your skin. Renew your look.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Bilingual website

The established English URLs remain unprefixed. Simplified Chinese pages use
the `/zh` prefix and share the same business facts, service prices, booking
provider, and contact details.

Translations are stored and reviewed in the repository; the website does not
use a live translation widget or send visitor page content to a translation
API. See [docs/bilingual-site.md](docs/bilingual-site.md) for the language
model, glossary, SEO rules, review gate, and content workflow.

```bash
npm run check:i18n
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview with separate Nails and Semi-Permanent Beauty categories |
| `/services/hair` | Hair Services |
| `/services/head-spa` | Head Spa & Scalp Care |
| `/services/skin-facial` | Skin & Facial |
| `/services/body-care` | Body Care |
| `/services/brows-lashes` | Brows & Lashes |
| `/services/mens-grooming` | Men’s Grooming |
| `/services/nails` | Nails |
| `/services/semi-permanent` | Semi-Permanent Beauty (consultation only) |
| `/services/nails-semi-permanent` | Compatibility page linking to the two separate categories |
| `/gift-cards` | Gift Cards |
| `/memberships` | Memberships (coming soon) |
| `/careers` | Careers / Rent a Space |
| `/book` | Branded handoff to live MaSe appointment availability |
| `/contact` | Contact, booking enquiry and map directions |
| `/policies` | Policies (draft) |
| `/zh/...` | Simplified Chinese equivalent of every route above |

## Project structure

- `app/` — App Router pages with per-page SEO metadata
- `components/` — shared components (Header, Footer, Hero, ServiceCard, CTABlock, SectionHeading, PriceList, GalleryPreview, ContactCard, CareerCard, ServicePage, ResponsiveImage)
- `lib/site.ts` — business details, navigation, "Why Mend" content
- `lib/services.ts` — reusable service/content data (categories, pricing, experiences, careers, memberships)
- `src/data/images.ts` — **all site imagery in one place** (currently temporary stock images)
- `public/images/` — fallback SVG placeholders (kept for offline use)
- `scripts/generate-placeholders.mjs` — regenerates the SVG placeholders

## Notes for V1

## Domain migration

The approved canonical production host is `https://mendbeauty.com.au`. The value in `lib/site.ts` is the single source for page canonical URLs, Open Graph and Twitter metadata, JSON-LD, `robots.txt`, and `sitemap.xml` locations. Run `npm run check:domain` to verify the repository-side migration invariants before deployment.

Vercel redirects, DNS changes, Search Console, analytics, and Google Business Profile configuration are managed outside this repository and remain separate approval-gated steps.

- All booking calls to action use the single label `Book` / `预约` and lead to
  `/book` or `/zh/book`. Those server routes immediately hand customers to MaSe
  without rendering the provider's long URL in the website interface. The
  destination is configured with server-side `MASE_BOOKING_URL` and has a
  verified non-secret fallback.
- The contact form at `/contact#booking-enquiry` remains available for consultations,
  gift cards, memberships and other enquiries.
- The enquiry form validates required fields and opens a pre-addressed message in
  the visitor's email app. No personal information is stored by the website.
- The footer provides native device sharing with a copy-link fallback.
- Automated email delivery, live availability, deposits and confirmed online
  bookings require a separately approved booking or transactional-email service.
- Prices are indicative placeholders (except Brows & Lashes, which use the confirmed ranges) — update `lib/services.ts` when finalised.
- **Images are temporary stock photos** from Unsplash / Pexels (hand-picked: warm, neutral, no visible branding, no competitor sites). To replace with professional Mend Beauty Studio photography, drop the final photos into `public/images/` and update the `src` values in `src/data/images.ts` — nothing else needs to change. Remote image hosts are allowed in `next.config.ts` (`images.unsplash.com`, `images.pexels.com`).
- Brand wording rules are baked in: head spa is always positioned as "Head Spa & Scalp Wellness" / "luxury head spa" (no other cultural-origin positioning), "scalp health support" (no cure claims), "Korean skin management", and semi-permanent beauty "available by consultation only".
