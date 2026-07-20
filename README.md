# Mend Beauty Studio — Website

A premium hair and beauty studio website for **Mend Beauty Studio — Balwyn**, built with Next.js (App Router), TypeScript and Tailwind CSS.

> Mend your hair. Refresh your skin. Renew your look.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview (incl. Nails note) |
| `/services/hair` | Hair Services |
| `/services/head-spa` | Head Spa & Scalp Care |
| `/services/skin-facial` | Skin & Facial |
| `/services/body-care` | Body Care |
| `/services/brows-lashes` | Brows & Lashes |
| `/services/mens-grooming` | Men’s Grooming |
| `/services/semi-permanent` | Semi-Permanent Beauty (consultation only) |
| `/gift-cards` | Gift Cards |
| `/memberships` | Memberships (coming soon) |
| `/careers` | Careers / Rent a Space |
| `/contact` | Contact (static form, map placeholder) |
| `/policies` | Policies (draft) |

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

- No backend: booking / gift card buttons link to `#contact` (footer contact block); the contact form is static.
- Prices are indicative placeholders (except Brows & Lashes, which use the confirmed ranges) — update `lib/services.ts` when finalised.
- **Images are temporary stock photos** from Unsplash / Pexels (hand-picked: warm, neutral, no visible branding, no competitor sites). To replace with professional Mend Beauty Studio photography, drop the final photos into `public/images/` and update the `src` values in `src/data/images.ts` — nothing else needs to change. Remote image hosts are allowed in `next.config.ts` (`images.unsplash.com`, `images.pexels.com`).
- Brand wording rules are baked in: head spa is always positioned as "Head Spa & Scalp Wellness" / "luxury head spa" (no other cultural-origin positioning), "scalp health support" (no cure claims), "Korean skin management", and semi-permanent beauty "available by consultation only".
