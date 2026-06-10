// =============================================================================
// Temporary stock image — replace with professional Mend Beauty Studio photography.
//
// All images below are free stock photos hot-served from Unsplash / Pexels CDNs.
// They were hand-reviewed to be warm, premium, neutral-toned, and free of
// visible logos, watermarks, brand names or competitor branding.
// The models and venues shown do NOT endorse Mend Beauty Studio.
//
// To replace: drop the final photo into /public/images and update `src` here —
// nothing else in the codebase needs to change.
// =============================================================================

export type SiteImage = {
  src: string;
  alt: string;
  credit: string;
};

const CREDIT = "Temporary stock image from Unsplash or Pexels";

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const pexels = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const siteImages = {
  // Real Mend Beauty Studio photo — not a stock image.
  hero: {
    src: "/images/mend-beauty-hero.png",
    alt: "Mend Beauty Studio Balwyn salon interior",
    credit: "Mend Beauty Studio",
  },
  hair: {
    src: unsplash("1562322140-8baeececf3df"),
    alt: "Hairdresser styling a client in a salon",
    credit: CREDIT,
  },
  headSpa: {
    src: pexels(3993449),
    alt: "Relaxing head spa and hair wash treatment",
    credit: CREDIT,
  },
  skinFacial: {
    src: pexels(6663571),
    alt: "Facial skincare treatment in a calm spa room",
    credit: CREDIT,
  },
  bodyCare: {
    src: unsplash("1544161515-4ab6ce6db874"),
    alt: "Body scrub and relaxation treatment",
    credit: CREDIT,
  },
  browsLashes: {
    src: unsplash("1487412947147-5cebf100ffc2"),
    alt: "Brow and lash beauty treatment",
    credit: CREDIT,
  },
  mensGrooming: {
    src: pexels(2076930),
    alt: "Men’s haircut and grooming service",
    credit: CREDIT,
  },
  nails: {
    src: unsplash("1610992015732-2449b76344bc"),
    alt: "Professional manicure and nail care",
    credit: CREDIT,
  },
  giftCards: {
    src: unsplash("1540555700478-4be289fbecef"),
    alt: "Spa gift card and beauty gift experience",
    credit: CREDIT,
  },
  memberships: {
    src: unsplash("1507652313519-d4e9174996dd"),
    alt: "Calm beauty maintenance and spa ritual",
    credit: CREDIT,
  },
  careers: {
    src: unsplash("1559599101-f09722fb4948"),
    alt: "Professional salon team and stylist working",
    credit: CREDIT,
  },
  contact: {
    src: unsplash("1633681926022-84c23e8cb2d6"),
    alt: "Warm premium salon reception",
    credit: CREDIT,
  },
} satisfies Record<string, SiteImage>;

// Temporary stock image — replace with professional Mend Beauty Studio photography.
// Images for the six "Signature Experiences" cards on the home page.
export const signatureImages = {
  headSpaRitual: {
    src: unsplash("1581182800629-7d90925ad072"),
    alt: "Client relaxing with eyes closed during a calm beauty ritual",
    credit: CREDIT,
  },
  headSpaBlowDry: {
    src: unsplash("1560869713-7d0a29430803"),
    alt: "Stylist finishing soft waves after a hair treatment",
    credit: CREDIT,
  },
  skinGlow: {
    src: unsplash("1570172619644-dfd03ed5d881"),
    alt: "Glow-focused facial mask treatment",
    credit: CREDIT,
  },
  bodyRelaxation: {
    src: unsplash("1519824145371-296894a0daa9"),
    alt: "Relaxing back and shoulder massage treatment",
    credit: CREDIT,
  },
  lashBrowCombo: {
    src: unsplash("1487412947147-5cebf100ffc2"),
    alt: "Close-up of defined lashes and brows",
    credit: CREDIT,
  },
  hairRepair: {
    src: pexels(7755511),
    alt: "Hair colour and treatment consultation with swatches",
    credit: CREDIT,
  },
} satisfies Record<string, SiteImage>;

// Studio gallery — real Mend Beauty Studio photography first, with two
// temporary stock atmosphere shots until more studio photos are available.
export const galleryStockImages: SiteImage[] = [
  {
    src: "/images/mend-beauty-hero.png",
    alt: "Mend Beauty Studio Balwyn salon interior",
    credit: "Mend Beauty Studio",
  },
  {
    src: "/images/mend-beauty-salon-interior-1.png",
    alt: "Mend Beauty Studio hair styling stations",
    credit: "Mend Beauty Studio",
  },
  {
    src: unsplash("1545241047-6083a3684587"),
    alt: "Minimal waiting area with soft natural light",
    credit: CREDIT,
  },
  {
    src: pexels(3865676),
    alt: "Spa oils and natural beauty products on warm linen",
    credit: CREDIT,
  },
];
