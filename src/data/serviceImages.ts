// =============================================================================
// Temporary stock image — replace with professional Mend Beauty Studio photography.
//
// Every service item on the menu has a matching image below. All photos are
// free commercial-use stock images from Unsplash or Pexels, hand-reviewed to be
// warm, premium, clean and neutral-toned, with no visible salon names, product
// logos, watermarks or competitor branding. Models shown do NOT endorse
// Mend Beauty Studio.
//
// Every image has been audited against the exact service name, description,
// price and time (see IMAGE_AUDIT.md). `imageMatchQuality` records how closely
// the photo matches the service:
//   - "exact"        the photo clearly shows this service being performed
//   - "close"        the photo shows closely related work or a faithful result
//   - "generic-safe" a safe premium fallback; flagged for the photo shoot list
//
// The image files are downloaded into /public/images/services/ so the site
// does not depend on external CDNs. To replace any image with final
// photography, drop the new photo into /public/images/services/ under the
// same filename — nothing else in the codebase needs to change.
// =============================================================================

export type ImageMatchQuality = "exact" | "close" | "generic-safe";

export type ServiceImage = {
  src: string;
  alt: string;
  sourceName: "Pexels" | "Unsplash";
  sourceUrl: string;
  credit?: string;
  imageMatchQuality: ImageMatchQuality;
  temporary: true;
};

// Temporary stock image — replace with professional Mend Beauty Studio photography.
const unsplash = (
  file: string,
  alt: string,
  photoId: string,
  imageMatchQuality: ImageMatchQuality
): ServiceImage => ({
  src: `/images/services/${file}.jpg`,
  alt,
  sourceName: "Unsplash",
  sourceUrl: `https://images.unsplash.com/photo-${photoId}`,
  credit: "Temporary stock image via Unsplash",
  imageMatchQuality,
  temporary: true,
});

// Temporary stock image — replace with professional Mend Beauty Studio photography.
const pexels = (
  file: string,
  alt: string,
  photoId: number,
  imageMatchQuality: ImageMatchQuality
): ServiceImage => ({
  src: `/images/services/${file}.jpg`,
  alt,
  sourceName: "Pexels",
  sourceUrl: `https://www.pexels.com/photo/${photoId}/`,
  credit: "Temporary stock image via Pexels",
  imageMatchQuality,
  temporary: true,
});

/**
 * One entry per service item id (see src/data/serviceMenu.ts).
 * Several closely related services intentionally share the same photo
 * (e.g. lash refills) — the file is stored once and referenced twice.
 */
export const serviceImages: Record<string, ServiceImage> = {
  // --- Hair Services ---------------------------------------------------------
  "womens-cut-blow-dry": unsplash(
    "hair-blow-dry",
    "Stylist blow drying a client’s hair in a salon",
    "1562322140-8baeececf3df",
    "exact"
  ),
  "senior-stylist-cut-blow-dry": pexels(
    "hair-senior-stylist",
    "Senior stylist finishing a client’s hair in the salon chair",
    3993465,
    "close"
  ),
  "mens-cut": pexels(
    "mens-cut",
    "Barber cutting a man’s hair with scissors for a precise finish",
    32329615,
    "exact"
  ),
  "blow-wave-styling": unsplash(
    "hair-blow-wave",
    "Round-brush blow wave styling for a smooth, polished finish",
    "1580618672591-eb180b1a973f",
    "exact"
  ),
  "event-styling": unsplash(
    "hair-event-styling",
    "Stylist creating soft curls for an elegant event hairstyle",
    "1560869713-7d0a29430803",
    "exact"
  ),
  "root-retouch": pexels(
    "hair-colour-roots",
    "Colourist applying fresh colour at the roots with a tint brush and foil",
    8468125,
    "close"
  ),
  "global-colour": pexels(
    "hair-global-colour",
    "Colourist applying all-over colour through the lengths with a tint brush",
    2799605,
    "close"
  ),
  "toner-gloss": unsplash(
    "hair-gloss",
    "Close-up of glossy, shiny hair after a toner and gloss service",
    "1614020863825-28a0bb7e3c3c",
    "exact"
  ),
  "half-head-foils": pexels(
    "hair-foils",
    "Colourist painting lightener onto sectioned hair in a foil",
    8468126,
    "exact"
  ),
  "full-head-foils": pexels(
    "hair-foils-full",
    "Stylist working through a full head of foils around the face",
    8468038,
    "exact"
  ),
  "balayage-package": unsplash(
    "hair-balayage",
    "Soft blended balayage colour from dark roots to light ends",
    "1605980766335-d3a41c7332a1",
    "exact"
  ),
  "colour-correction": pexels(
    "hair-colour-work",
    "Colourist carefully sectioning and applying colour during corrective work",
    3993312,
    "close"
  ),
  "keratin-smoothing": pexels(
    "hair-keratin-smoothing",
    "Stylist smoothing a client’s hair section by section with a straightening iron",
    3738339,
    "exact"
  ),
  "hair-repair-treatment": pexels(
    "hair-repair-treatment",
    "Nourishing hair repair treatment being worked through wet hair",
    3993444,
    "close"
  ),
  "premium-hair-repair-blow-dry": pexels(
    "hair-repair-blow-dry",
    "Stylist round-brush blow drying smooth, healthy hair after a treatment",
    10028673,
    "close"
  ),

  // --- Head Spa & Scalp Care -------------------------------------------------
  "express-scalp-refresh": pexels(
    "headspa-wash",
    "Relaxing scalp cleanse and hair wash at the basin",
    3993449,
    "exact"
  ),
  "signature-head-spa": pexels(
    "headspa-massage",
    "Therapist gently massaging a client’s head during a head spa ritual",
    5794044,
    "exact"
  ),
  "premium-head-spa-ritual": pexels(
    "headspa-ritual",
    "Client relaxing during a soothing head massage in a bright spa room",
    5659011,
    "exact"
  ),
  "deluxe-head-spa-ritual": pexels(
    "headspa-deluxe",
    "Warm, unhurried scalp and head massage during a deluxe spa ritual",
    6663371,
    "exact"
  ),
  "scalp-cleansing-treatment": unsplash(
    "headspa-rinse",
    "Close-up of a gentle scalp cleansing rinse at the basin",
    "1634449571010-02389ed0f9b0",
    "close"
  ),
  "scalp-health-support": pexels(
    "headspa-foam",
    "Deep cleansing foam treatment supporting scalp health",
    3993461,
    "close"
  ),
  "head-spa-blow-dry": unsplash(
    "hair-blow-wave",
    "Soft blow dry finish after a relaxing head spa",
    "1580618672591-eb180b1a973f",
    "close"
  ),
  "premium-head-spa-hair-repair": pexels(
    "headspa-basin-wash",
    "Thorough basin rinse and scalp massage during a head spa and repair ritual",
    7755663,
    "close"
  ),
  "head-spa-korean-mini-facial": pexels(
    "facial-gua-sha",
    "Gentle facial massage paired with a relaxing head spa",
    6663571,
    "exact"
  ),

  // --- Skin & Facial / Korean Skin Management --------------------------------
  "express-hydration-facial": pexels(
    "facial-mask-brush",
    "Esthetician applying a hydrating facial mask with a soft brush",
    37229301,
    "exact"
  ),
  "deep-cleansing-facial": pexels(
    "facial-cleansing",
    "Esthetician performing a deep cleansing facial massage",
    6663368,
    "exact"
  ),
  "korean-skin-management-facial": unsplash(
    "facial-mask",
    "Clean, calming facial mask during a Korean skin management session",
    "1570172619644-dfd03ed5d881",
    "exact"
  ),
  "glass-skin-hydration-facial": pexels(
    "facial-hydration-mask",
    "Client relaxing under a rich hydrating mask during a facial",
    37229307,
    "close"
  ),
  "skin-barrier-repair-facial": pexels(
    "facial-cream-mask",
    "Gentle cream mask applied during a soothing barrier repair facial",
    37229282,
    "close"
  ),
  "premium-korean-glow-facial": pexels(
    "facial-glow-premium",
    "Esthetician brushing a glow treatment over a client’s skin in a warm spa room",
    37229304,
    "close"
  ),
  "facial-head-spa-package": pexels(
    "facial-gua-sha",
    "Soothing facial massage combined with a relaxing head spa",
    6663571,
    "close"
  ),

  // --- Body Care --------------------------------------------------------------
  "body-scrub": pexels(
    "body-scrub",
    "Exfoliating body scrub being applied to the skin",
    6418017,
    "close"
  ),
  "body-scrub-hydration": unsplash(
    "body-oil",
    "Nourishing body oil poured for a hydration treatment",
    "1544161515-4ab6ce6db874",
    "exact"
  ),
  "korean-body-care-ritual": pexels(
    "body-hot-stones",
    "Warm stone body care ritual in a bright spa room",
    6560276,
    "close"
  ),
  "body-relaxation-treatment": pexels(
    "body-massage-bright",
    "Calm body relaxation treatment in a soft, sunlit room",
    5794034,
    "close"
  ),
  "body-scrub-mini-facial": pexels(
    "body-scrub",
    "Exfoliating scrub treatment as part of a body and facial package",
    6418017,
    "close"
  ),
  "body-care-head-spa-package": pexels(
    "body-stone-neck",
    "Warm stone neck and shoulder care during a spa package",
    6560298,
    "close"
  ),

  // --- Brows & Lashes ----------------------------------------------------------
  "korean-lash-lift-tint": unsplash(
    "lash-lift",
    "Close-up of naturally lifted, curled lashes after a lash lift",
    "1548902378-2ec44c906391",
    "exact"
  ),
  "brow-lamination-shape-tint": unsplash(
    "brow-lamination",
    "Beautician brushing brows into shape during a lamination service",
    "1733145818828-645fc7499ca5",
    "exact"
  ),
  "lash-lift-brow-lamination-combo": unsplash(
    "brow-full",
    "Defined brows and lashes after a combined lift and lamination",
    "1620508467736-0140acd17ce4",
    "close"
  ),
  "brow-shape": pexels(
    "brow-shape",
    "Beautician shaping a client’s brows with precision tweezers",
    5177994,
    "exact"
  ),
  "brow-tint": unsplash(
    "brow-tint",
    "Brow tint being applied with a precision wand",
    "1581003250898-36050e78fcd3",
    "exact"
  ),
  "brow-shape-tint": unsplash(
    "brow-defined",
    "Close-up of freshly shaped and tinted brows",
    "1594715271011-63c18acf1489",
    "close"
  ),
  "lash-dye": unsplash(
    "eye-natural",
    "Close-up of an eye with naturally darkened, defined lashes",
    "1651839633408-3fccd671b832",
    "close"
  ),
  "classic-lash-extensions": pexels(
    "lash-extensions-application",
    "Lash technician applying classic eyelash extensions",
    5128220,
    "exact"
  ),
  "hybrid-lash-extensions": unsplash(
    "lash-extensions-closeup",
    "Close-up of full yet natural hybrid lash extensions",
    "1639629509821-c54cdd984227",
    "exact"
  ),
  "volume-lash-extensions": unsplash(
    "lash-volume",
    "Volume lash fans being applied with precision tweezers",
    "1735151225764-eac694642dbf",
    "exact"
  ),
  "lash-refill-2-week": pexels(
    "lash-refill",
    "Lash technician topping up extensions during a refill appointment",
    5128234,
    "exact"
  ),
  "lash-refill-3-week": pexels(
    "lash-refill-work",
    "Careful lash maintenance work with tweezers and under-eye pads",
    33637609,
    "exact"
  ),
  "lash-removal": pexels(
    "lash-removal",
    "Gentle lash work with tweezers during a removal appointment",
    6135662,
    "close"
  ),

  // --- Men’s Grooming ----------------------------------------------------------
  "mens-grooming-cut": pexels(
    "mens-cut",
    "Barber cutting a man’s hair with scissors for a precise finish",
    32329615,
    "exact"
  ),
  "skin-fade": unsplash(
    "mens-skin-fade",
    "Sharp skin fade haircut with a neatly groomed beard",
    "1599834562135-b6fc90e642ca",
    "exact"
  ),
  "beard-trim": pexels(
    "mens-beard-trim",
    "Barber trimming a beard with scissors for a clean shape",
    3998429,
    "exact"
  ),
  "cut-beard-trim": pexels(
    "mens-beard-detail",
    "Detailed beard grooming with barber scissors",
    3998426,
    "exact"
  ),
  "grey-blending": pexels(
    "mens-grey-blending",
    "Colourist blending grey hair with foils and a colour brush",
    29548298,
    "close"
  ),
  "mens-scalp-detox": pexels(
    "headspa-mens-wash",
    "Deep cleansing scalp wash and massage at the basin",
    23349902,
    "exact"
  ),
  "mens-cut-scalp-detox": unsplash(
    "headspa-rinse",
    "Refreshing scalp rinse at the basin before a haircut",
    "1634449571010-02389ed0f9b0",
    "close"
  ),

  // --- Nails --------------------------------------------------------------------
  "classic-manicure": unsplash(
    "nails-manicure",
    "Nail polish being applied during a classic manicure",
    "1599206676335-193c82b13c9e",
    "exact"
  ),
  "gel-manicure": unsplash(
    "nails-gel",
    "Gel manicure in progress with a UV curing lamp",
    "1632345031435-8727f6897d53",
    "exact"
  ),
  "classic-pedicure": unsplash(
    "nails-pedicure",
    "Relaxing pedicure foot soak with fresh flowers",
    "1519415510236-718bdfcd89c8",
    "exact"
  ),
  "gel-pedicure": unsplash(
    "nails-pedicure",
    "Relaxing pedicure soak before a long-lasting gel polish finish",
    "1519415510236-718bdfcd89c8",
    "close"
  ),
  "nail-art": unsplash(
    "nails-art",
    "Elegant tortoiseshell nail art on a neat manicure",
    "1604654894610-df63bc536371",
    "exact"
  ),
  "nail-removal": unsplash(
    "nails-natural",
    "Clean, healthy natural nails after gentle product removal",
    "1630843599725-32ead7671867",
    "close"
  ),

  // --- Semi-Permanent Beauty ------------------------------------------------------
  "semi-permanent-consultation": unsplash(
    "brow-mapping",
    "Brow mapping tool used during a semi-permanent beauty consultation",
    "1618322802324-a9185814211d",
    "exact"
  ),
  "powder-ombre-brows": pexels(
    "brow-natural",
    "Close-up of softly shaded, natural-looking brows",
    3762667,
    "close"
  ),
  "combination-brows": unsplash(
    "brow-design",
    "Close-up of carefully designed brows with soft definition",
    "1633276115947-8d35f394a309",
    "exact"
  ),
  "lip-blush": pexels(
    "lips-natural",
    "Close-up of softly tinted, natural-looking lips",
    8183931,
    "close"
  ),
  "lip-blush-touch-up": pexels(
    "lips-natural",
    "Close-up of softly tinted lips after a touch-up session",
    8183931,
    "close"
  ),
  "lash-line-enhancement": pexels(
    "eye-lash-line",
    "Close-up of an eye with a soft, naturally defined lash line",
    3373735,
    "close"
  ),
  "eyeliner-tattoo": unsplash(
    "eye-liner",
    "Close-up of an eye with soft, defined liner",
    "1587910234573-d6fc84743bc8",
    "close"
  ),
  "semi-permanent-touch-up": unsplash(
    "brow-mapping",
    "Precision brow measuring during a touch-up consultation",
    "1618322802324-a9185814211d",
    "close"
  ),
  "annual-refresh": unsplash(
    "brow-mapping",
    "Brow mapping and review during an annual refresh consultation",
    "1618322802324-a9185814211d",
    "close"
  ),
};

export function getServiceImage(id: string): ServiceImage {
  const image = serviceImages[id];
  if (!image) throw new Error(`Missing service image for: ${id}`);
  return image;
}
