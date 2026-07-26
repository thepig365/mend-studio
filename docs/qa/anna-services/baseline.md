# Anna services update — pre-change baseline

Recorded before implementation from production/main commit
`9d73c6e87d06eec7e889a3095370219660a8be50`.

## Treatment-finder state

- `/services` and `/zh/services` are direct service-browsing pages.
- No `/journey` link, treatment finder, questionnaire, recommendation quiz, or decision tree is present.

## Screenshots

- `before/en-desktop.png`
- `before/en-mobile.png`
- `before/zh-desktop.png`
- `before/zh-mobile.png`

## Category image assignments

| Existing category | Image reference |
| --- | --- |
| Hair Services | `siteImages.hair.src` |
| Head Spa & Scalp Care | `siteImages.headSpa.src` |
| Skin & Facial | `siteImages.skinFacial.src` |
| Body Care | `siteImages.bodyCare.src` |
| Brows & Lashes | `siteImages.browsLashes.src` |
| Men’s Grooming | `siteImages.mensGrooming.src` |
| Nails | `siteImages.nails.src` |
| Semi-Permanent Beauty | `siteImages.browsLashes.src` |

The authoritative category image paths and URLs are recorded in
`src/data/images.ts`. The authoritative service-card image paths, sources,
credits, aspect behaviour, and mappings are recorded in
`src/data/serviceImages.ts` and `src/data/serviceMenu.ts`.

## Image and presentation integrity hashes

These files must remain byte-for-byte unchanged except for
`src/data/serviceMenu.ts`, where service names may be remapped to an existing
image identifier without altering any image path:

| File | SHA-256 |
| --- | --- |
| `src/data/images.ts` | `b87774da0172663b940c9de708a999d18553b3c966ad4c85d2796aae350a2462` |
| `src/data/serviceImages.ts` | `deccb176895d2084542c79b5c75439b6215c9d3be27216bef484d5582b45fc08` |
| `components/ServiceCard.tsx` | `16ef9183493012406ba231d85581902fce3891011794f37b325e9873dee6cb30` |
| `src/components/ServiceImagePreview.tsx` | `59e2dfcacd22566afa67d038a46cda4a82e0327c90e815950975c151b919dd94` |
| `src/components/ServiceImageModal.tsx` | `790f6c9666cd88b4e11f70ad15b7a306565004b1ba939f5d5182117ea236c044` |

The baseline service image registry contains 72 entries. The immutable Git
baseline above is the complete record of every image file path and component
reference before this content update.

## Preserved Men’s Grooming data

The complete baseline is the `mens-grooming` category in `lib/services.ts` at
the recorded commit. It contains:

- Men’s Cut
- Skin Fade
- Beard Trim
- Cut + Beard Trim
- Grey Blending
- Men’s Scalp Detox
- Men’s Cut + Scalp Detox

Its category image, seven service-image mappings, descriptions, booking
behaviour, and existing prices are protected.

## Preserved Nails and Semi-Permanent Beauty data

The complete baseline is the `nails` and `semi-permanent` categories in
`lib/services.ts` at the recorded commit.

Nails contains:

- Classic Manicure
- Gel Manicure
- Classic Pedicure
- Gel Pedicure
- Nail Art
- Removal

Semi-Permanent Beauty contains:

- Semi-Permanent Beauty Consultation
- Powder / Ombre Brows
- Combination Brows
- Lip Blush
- Lip Blush incl. Touch-Up
- Lash Line Enhancement
- Eyeliner Tattoo
- Touch-Up
- Annual Refresh

Their category images, fifteen service-image mappings, descriptions, booking
behaviour, and existing prices are protected.
