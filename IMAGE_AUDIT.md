# Service Image Audit — Mend Beauty Studio

Audit date: 10 June 2026
Scope: every service item image defined in `src/data/serviceImages.ts` (one entry per
service id in `src/data/serviceMenu.ts`).

Every image was reviewed one by one against the exact service name, description,
price and time. Weak, mismatched, misleading, low-quality, off-brand or
too-generic images were actively replaced with better Pexels/Unsplash photos —
not merely re-labelled.

---

## 1. Totals

| Metric | Count |
| --- | --- |
| Service items with an image | **72** |
| Unique image files on disk (`/public/images/services/`) | **63** (closely related services intentionally share a photo) |
| Marked `exact` | **38** |
| Marked `close` | **34** |
| Marked `generic-safe` | **0** |
| Images replaced during this audit | **29 service slots (25 new photos sourced)** |

`imageMatchQuality` is stored on every entry in `src/data/serviceImages.ts`:

- `exact` — the photo clearly shows this service being performed (or its faithful result).
- `close` — the photo shows closely related work, the right treatment category, or an honest result.
- `generic-safe` — none remain after this audit.

---

## 2. Images replaced

### Hair Services

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Men's Cut (also Men's Grooming Cut) | https://www.pexels.com/photo/2076930/ | Dark, rough barber-shop mood that conflicted with Mend's premium beauty studio feel | https://www.pexels.com/photo/32329615/ | exact |
| Root Retouch | https://www.pexels.com/photo/3993324/ | Visible salon branding in frame | https://www.pexels.com/photo/8468125/ | close |
| Global Colour | https://images.unsplash.com/photo-1593980966860-3b2382e54a29 | Model-only "perfect result" shot, no service context | https://www.pexels.com/photo/2799605/ | close |
| Half Head Foils | https://images.unsplash.com/photo-1617391654484-2894196c2cc9 | Showed lightener mixing close-up rather than foil work on a client | https://www.pexels.com/photo/8468126/ | exact |
| Full Head Foils | https://images.unsplash.com/photo-1634449571017-5fecfd26ad76 | Actually showed hair extensions being fitted, not foils — misleading | https://www.pexels.com/photo/8468038/ | exact |
| Colour Correction | https://www.pexels.com/photo/7755511/ | Visible Wella branding on the swatch book | https://www.pexels.com/photo/3993312/ | close (corrective colour-work image, per guidance) |
| Keratin / Smoothing Treatment | https://www.pexels.com/photo/2878374/ | Glamour makeup portrait with zero service context | https://www.pexels.com/photo/3738339/ | exact (straightening iron in use) |
| Premium Hair Repair + Blow Dry | https://images.unsplash.com/photo-1522337360788-8b13dee7a37e | Generic "nice hair" model shot | https://www.pexels.com/photo/10028673/ | close (round-brush blow dry in progress) |
| Grey Blending | https://images.unsplash.com/photo-1608127010513-2c9fc1638893 | Portrait of a grey-haired man — a model, not a service | https://www.pexels.com/photo/29548298/ | close (grey hair foil/colour work) |

### Head Spa & Scalp Care

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Premium Head Spa Ritual | https://images.unsplash.com/photo-1540555700478-4be289fbecef | Towel/candle still life — too generic, no head spa shown | https://www.pexels.com/photo/5659011/ | exact |
| Deluxe Head Spa Ritual | https://images.unsplash.com/photo-1507652313519-d4e9174996dd | Bathtub suite — a service Mend does not provide | https://www.pexels.com/photo/6663371/ | exact |
| Premium Head Spa + Hair Repair | https://www.pexels.com/photo/3865676/ | Aroma oil bottles still life — too generic | https://www.pexels.com/photo/7755663/ | close (basin rinse + scalp massage) |
| Men's Scalp Detox | https://www.pexels.com/photo/3993449/ (shared) | Not weak, but shared the women's scalp-refresh photo; now has its own dedicated basin wash | https://www.pexels.com/photo/23349902/ | exact |

### Skin & Facial / Korean Skin Management

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Express Hydration Facial | https://images.unsplash.com/photo-1616394584738-fc6e612e71b9 | Dated clinical styling with embroidered text in frame | https://www.pexels.com/photo/37229301/ | exact (mask applied with soft brush) |
| Glass Skin Hydration Facial | https://images.unsplash.com/photo-1581182800629-7d90925ad072 | Model face only — no treatment being performed | https://www.pexels.com/photo/37229307/ | close |
| Skin Barrier Repair Facial | https://www.pexels.com/photo/6663387/ | DIY at-home look, not a studio treatment | https://www.pexels.com/photo/37229282/ | close |
| Premium Korean Glow Facial | https://www.pexels.com/photo/6663562/ | Cluttered room, amateur feel | https://www.pexels.com/photo/37229304/ | close |
| Facial + Head Spa Package | https://www.pexels.com/photo/6560304/ | Showed a back massage, not facial/head spa | now shares https://www.pexels.com/photo/6663571/ (facial massage + head spa, same as the closely related Head Spa + Korean Mini Facial) | close |

### Body Care

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Body Scrub | https://www.pexels.com/photo/6560289/ | Showed massage, not exfoliation | https://www.pexels.com/photo/6418017/ | close (exfoliating scrub on skin) |
| Body Scrub + Mini Facial | https://images.unsplash.com/photo-1519824145371-296894a0daa9 | Cool-toned neck/shoulder massage — wrong service and off-palette | now shares https://www.pexels.com/photo/6418017/ (scrub image of the closely related Body Scrub) | close |

### Brows & Lashes

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Brow Shape | https://images.unsplash.com/photo-1618322802459-0d570e4548c1 | Self-grooming bridal-style shot, not a professional service | https://www.pexels.com/photo/5177994/ | exact (tweezers brow shaping) |
| Lash Refill (2 week) | https://images.unsplash.com/photo-1589710751893-f9a6770ad71b | Legible brand text on the tweezer, moody red-toned light | https://www.pexels.com/photo/5128234/ | exact |
| Lash Refill (3 week) | https://www.pexels.com/photo/5128223/ | Salon logo script visible on the technician's apron | https://www.pexels.com/photo/33637609/ | exact |
| Lash Removal | https://www.pexels.com/photo/5128087/ | Tools-only flat lay — too generic to explain the booking | https://www.pexels.com/photo/6135662/ | close (gentle lash work with tweezers) |

### Semi-Permanent Beauty

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Powder / Ombre Brows | https://images.unsplash.com/photo-1608558070426-e4e9b1c954d2 | Messy hair across the face, irritated-looking eye | https://www.pexels.com/photo/3762667/ | close (clean natural brow close-up) |
| Lip Blush + Lip Blush Touch-Up | https://images.unsplash.com/photo-1761475011416-8bcda9e00cfa | Dark, moody tones — off-brand | https://www.pexels.com/photo/8183931/ | close (soft natural lip close-up) |
| Lash Line Enhancement | https://images.unsplash.com/photo-1487412947147-5cebf100ffc2 | Heavy winged-liner glamour makeup — misleading for a subtle lash-line result | https://www.pexels.com/photo/3373735/ | close (naturally defined lash line) |
| Annual Refresh | https://www.pexels.com/photo/3997376/ | Nail swatches in a dark room — irrelevant to the service | now shares https://images.unsplash.com/photo-1618322802324-a9185814211d (brow mapping/consultation, per guidance "consultation or mapping, not a finished glamour result") | close |

### Nails

| Service | Old source | Reason rejected | New source | New quality |
| --- | --- | --- | --- | --- |
| Gel Pedicure | https://images.unsplash.com/photo-1707725238063-0c54fb6963d1 | Amateur bare-feet snapshot, oddly intimate framing | now shares https://images.unsplash.com/photo-1519415510236-718bdfcd89c8 (the classic pedicure soak — correct pedicure category) | close |

> Note on Gel Pedicure: a fresh Pexels search was performed; the best in-progress
> pedicure candidate (pexels.com/photo/34930123) was rejected because the
> technician's shirt carries a printed logo and the face mask + gloves read as
> clinical. The shared premium pedicure image is honest and category-correct.

---

## 3. Remaining `generic-safe` items

**None.** Every one of the 72 service slots is now `exact` (38) or `close` (34).
No image had to fall back to a generic placeholder after re-searching.

---

## 4. Professional photo shoot priority list

Although nothing is `generic-safe`, these `close` items would benefit most from
real Mend photography (currently shared or category-level photos):

1. **Gel Pedicure** — needs a gel-polish-on-toes shot (currently shares the classic pedicure soak).
2. **Colour Correction** — a true before/during correction session at Mend.
3. **Facial + Head Spa Package / Body Scrub + Mini Facial / Annual Refresh** — package items currently share photos with their closest sibling service.
4. **Lip Blush & Lash Line Enhancement & Eyeliner Tattoo** — soft, non-invasive in-studio shots of Mend's actual semi-permanent work.
5. **Premium / Deluxe Head Spa Rituals** — shots at Mend's own basin with branded towels removed.
6. **Men's Grooming set** — Men's Cut and Cut + Scalp Detox share photos with sibling services.
7. **Toner & Gloss / Balayage results** — replace stock results with Mend client results (with consent).

---

## 5. Confirmations

- [x] **All images are from Pexels or Unsplash only.** Every entry in `serviceImages.ts` is built by the `pexels()` or `unsplash()` helper with a pexels.com / images.unsplash.com source URL; files are self-hosted under `/public/images/services/`.
- [x] **No competitor website images were used.** All photos sourced exclusively from the two free stock libraries above; none show identifiable salon names or competitor signage (two studio-branded photos found during audit were replaced for this exact reason).
- [x] **All images have meaningful alt text.** Every entry carries a descriptive, service-specific `alt` written for screen readers (verified — no empty or filename-style alts).
- [x] **Desktop hover preview works.** Verified on the production build: hovering a service row shows the floating image preview card; it dismisses on mouse-out and when the modal opens.
- [x] **Mobile tap/click modal works.** Verified: tapping/clicking a service row opens the bottom-sheet/modal with the larger image, service name, price, time, description, temporary-image note and Book Now button; closes via the close button, backdrop and Escape.
- [x] **Price and time remain visible without requiring image hover.** Each menu row renders name, duration and price as static text; hover only adds the image preview.
- [x] **No broken images.** All 63 files verified present on disk and loading (naturalWidth > 0) on the production build.

---

## 6. How to swap in final photography

Drop the final photo into `/public/images/services/` under the same filename as
the entry's `src` in `src/data/serviceImages.ts` — nothing else in the codebase
needs to change. Then update `sourceName`/`sourceUrl`/`credit` (or remove the
`temporary` flag) for that entry and delete the footer's temporary-image note
once all photos are final.
