// Temporary stock images — replace with professional Mend Beauty Studio photography.
// All image data lives in src/data/images.ts for easy replacement later.
import { siteImages, signatureImages, galleryStockImages } from "@/src/data/images";

export type ServiceItem = {
  name: string;
  price?: string;
  duration?: string;
  description?: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  cardTitle: string;
  excerpt: string;
  intro: string;
  image: string;
  imageAlt: string;
  items: ServiceItem[];
  secondaryTitle?: string;
  secondaryItems?: ServiceItem[];
  notes?: string[];
};

// General pricing note shown with every service menu.
export const pricingNote =
  "Prices include GST. Prices are subject to consultation and may vary depending on service complexity, hair length, product use and individual suitability.";

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hair",
    title: "Hair Services",
    cardTitle: "Hair Services",
    excerpt: "Cuts, colour, balayage, foils, keratin and hair repair treatments.",
    intro:
      "From precision cuts and dimensional colour to deeply restorative repair treatments, our stylists care for the condition of your hair as much as the finish.",
    image: siteImages.hair.src,
    imageAlt: siteImages.hair.alt,
    items: [
      {
        name: "Women’s Cut & Blow Dry",
        price: "From $95",
        duration: "60 min",
        description: "Precision cut finished with a soft, polished blow dry.",
      },
      {
        name: "Senior Stylist Cut & Blow Dry",
        price: "From $125",
        duration: "60–75 min",
        description: "Cut and finish with one of our most experienced stylists.",
      },
      {
        name: "Men’s Cut",
        price: "From $55",
        duration: "30–45 min",
        description: "A clean, considered cut tailored to you.",
      },
      {
        name: "Blow Wave / Styling",
        price: "From $65",
        duration: "45 min",
        description: "Wash and style for a smooth, lasting finish.",
      },
      {
        name: "Event Styling",
        price: "From $120",
        duration: "60–90 min",
        description: "Occasion styling for weddings, events and special days.",
      },
      {
        name: "Root Retouch",
        price: "From $120",
        duration: "90 min",
        description: "Refresh your regrowth between full colour visits.",
      },
      {
        name: "Global Colour",
        price: "From $160",
        duration: "120 min",
        description: "All-over permanent or semi-permanent colour.",
      },
      {
        name: "Toner / Gloss",
        price: "From $75",
        duration: "30–45 min",
        description: "Refine tone and add shine between colour services.",
      },
      {
        name: "Half Head Foils",
        price: "From $220",
        duration: "150 min",
        description: "Dimensional foils through the top and sides.",
      },
      {
        name: "Full Head Foils",
        price: "From $320",
        duration: "180–210 min",
        description: "Complete foil work for all-over dimension and brightness.",
      },
      {
        name: "Balayage Package",
        price: "From $390",
        duration: "210–240 min",
        description: "Hand-painted colour with toner and treatment included.",
      },
      {
        name: "Colour Correction",
        price: "Consultation only",
        duration: "15–30 min consultation",
        description: "Complex colour work is planned and quoted at a consultation first.",
      },
      {
        name: "Keratin / Smoothing Treatment",
        price: "From $280",
        duration: "150–210 min",
        description: "Long-lasting smoothing for softer, more manageable hair.",
      },
      {
        name: "Hair Repair Treatment",
        price: "From $85",
        duration: "45–60 min",
        description: "Restorative in-salon treatment for dry or stressed hair.",
      },
      {
        name: "Premium Hair Repair + Blow Dry",
        price: "From $145",
        duration: "75–90 min",
        description: "Our deepest repair ritual, finished with a blow dry.",
      },
    ],
    notes: [
      "Final pricing depends on hair length, thickness, colour history and stylist recommendation.",
    ],
  },
  {
    slug: "head-spa",
    title: "Head Spa & Scalp Care",
    cardTitle: "Head Spa & Scalp Care",
    excerpt: "Luxury head spa rituals, scalp cleansing and scalp health support.",
    intro:
      "Luxury head spa and scalp wellness rituals designed to support scalp health, refresh the hair and create a deeply relaxing experience.",
    image: siteImages.headSpa.src,
    imageAlt: siteImages.headSpa.alt,
    items: [
      {
        name: "Express Scalp Refresh",
        price: "$98",
        duration: "30 min",
        description: "A focused scalp cleanse and massage when time is short.",
      },
      {
        name: "Signature Head Spa",
        price: "$165",
        duration: "60 min",
        description: "Our signature scalp therapy ritual — cleanse, massage, mask and calm.",
      },
      {
        name: "Premium Head Spa Ritual",
        price: "$215",
        duration: "75 min",
        description: "An extended ritual with deeper massage and scalp mask.",
      },
      {
        name: "Deluxe Head Spa Ritual",
        price: "$260",
        duration: "90 min",
        description: "Our fullest head spa experience — unhurried, layered and deeply restful.",
      },
      {
        name: "Scalp Cleansing Treatment",
        price: "$145",
        duration: "50–60 min",
        description: "Gentle deep cleansing to remove build-up and refresh the scalp.",
      },
      {
        name: "Scalp Health Support Treatment",
        price: "$180",
        duration: "60–75 min",
        description:
          "Targeted scalp care designed to support a healthier scalp environment, including support for thinning-prone hair. Results vary between individuals.",
      },
      {
        name: "Head Spa + Blow Dry",
        price: "$220",
        duration: "90 min",
        description: "Signature head spa finished with a soft, polished blow dry.",
      },
      {
        name: "Premium Head Spa + Hair Repair",
        price: "$285",
        duration: "105 min",
        description: "Premium head spa ritual paired with a restorative hair repair treatment.",
      },
      {
        name: "Head Spa + Korean Mini Facial",
        price: "$295",
        duration: "105–120 min",
        description: "Head spa ritual paired with a refreshing Korean-style mini facial.",
      },
    ],
    notes: [
      "Our scalp care services are designed to support scalp health and relaxation. They are beauty and wellbeing services, not medical treatments, and individual results vary.",
    ],
  },
  {
    slug: "skin-facial",
    title: "Skin & Facial",
    cardTitle: "Skin & Facial",
    excerpt: "Korean skin management, hydration facials and glow-focused treatments.",
    intro:
      "Korean skin management and glow-focused facials designed to support hydration, radiance and skin comfort.",
    image: siteImages.skinFacial.src,
    imageAlt: siteImages.skinFacial.alt,
    items: [
      {
        name: "Express Hydration Facial",
        price: "$98",
        duration: "30 min",
        description: "A quick layered-hydration boost for fresh, comfortable skin.",
      },
      {
        name: "Deep Cleansing Facial",
        price: "$135",
        duration: "45 min",
        description: "A thorough cleanse and refresh for congested or dull-feeling skin.",
      },
      {
        name: "Korean Skin Management Facial",
        price: "$165",
        duration: "60 min",
        description: "A tailored Korean beauty care session built around your skin on the day.",
      },
      {
        name: "Glass Skin Hydration Facial",
        price: "$185",
        duration: "75 min",
        description: "A glow-focused facial inspired by Korean skin care rituals.",
      },
      {
        name: "Skin Barrier Repair Facial",
        price: "$185",
        duration: "75 min",
        description: "Gentle, soothing care designed for sensitive or stressed skin.",
      },
      {
        name: "Premium Korean Glow Facial",
        price: "$220",
        duration: "90 min",
        description: "Our most complete facial — cleanse, treat, massage and glow.",
      },
      {
        name: "Facial + Head Spa Package",
        price: "$295",
        duration: "105–120 min",
        description: "Our most loved pairing — facial care and head spa in one visit.",
      },
    ],
    notes: [
      "All facials begin with a short skin conversation so your treatment suits your skin on the day.",
    ],
  },
  {
    slug: "body-care",
    title: "Body Care",
    cardTitle: "Body Care",
    excerpt: "Body scrub, body treatments and relaxation-focused beauty care.",
    intro:
      "Body care and relaxation-focused treatments designed to leave the skin feeling smooth, refreshed and cared for.",
    image: siteImages.bodyCare.src,
    imageAlt: siteImages.bodyCare.alt,
    items: [
      {
        name: "Body Scrub",
        price: "$145",
        duration: "45 min",
        description: "Full-body exfoliation for soft, smooth, refreshed skin.",
      },
      {
        name: "Body Scrub + Hydration Treatment",
        price: "$185",
        duration: "60 min",
        description: "Exfoliation followed by deeply nourishing hydration.",
      },
      {
        name: "Korean Body Care Ritual",
        price: "$220",
        duration: "75 min",
        description: "Korean beauty care techniques for smooth, cared-for skin.",
      },
      {
        name: "Body Relaxation Treatment",
        price: "$165",
        duration: "60 min",
        description: "A calm, restorative session focused on comfort and release.",
      },
      {
        name: "Body Scrub + Mini Facial",
        price: "$245",
        duration: "90 min",
        description: "Head-to-toe refresh — body scrub plus a mini facial.",
      },
      {
        name: "Body Care + Head Spa Package",
        price: "$320",
        duration: "120 min",
        description: "Our fullest reset — body care and head spa in one unhurried visit.",
      },
    ],
    notes: [
      "Body care services are relaxation and beauty focused. Please let us know about any skin sensitivities when booking.",
    ],
  },
  {
    slug: "brows-lashes",
    title: "Brows & Lashes",
    cardTitle: "Brows & Lashes",
    excerpt: "Korean lash lift, brow lamination and natural beauty enhancement.",
    intro:
      "Our first-stage focus is Korean lash lift, brow lamination and natural eye-beauty enhancement. Eyelash extensions and refills may be available by appointment.",
    image: siteImages.browsLashes.src,
    imageAlt: siteImages.browsLashes.alt,
    items: [
      {
        name: "Korean Lash Lift + Tint",
        price: "$145",
        duration: "60 min",
        description: "A gentle lift and tint for naturally open, defined eyes.",
      },
      {
        name: "Brow Lamination + Shape + Tint",
        price: "$155",
        duration: "60–75 min",
        description: "Fuller, softly set brows with shaping and tint included.",
      },
      {
        name: "Korean Lash Lift + Brow Lamination Combo",
        price: "$320",
        duration: "90 min",
        description: "Our complete eye refresh — lash lift and brow lamination in one visit.",
      },
    ],
    secondaryTitle: "Additional services",
    secondaryItems: [
      {
        name: "Brow Shape",
        price: "$40",
        duration: "20 min",
        description: "Tidy, balanced brows shaped to suit your face.",
      },
      {
        name: "Brow Tint",
        price: "$35",
        duration: "20 min",
        description: "Soft, natural-looking colour for definition.",
      },
      {
        name: "Brow Shape + Tint",
        price: "$65",
        duration: "30 min",
        description: "Shape and tint together for fully finished brows.",
      },
      {
        name: "Lash Dye",
        price: "$50",
        duration: "15–20 min",
        description: "Darker, more defined lashes without mascara.",
      },
      {
        name: "Classic Lash Extensions",
        price: "From $145",
        duration: "105 min",
        description: "One extension per natural lash for everyday definition.",
      },
      {
        name: "Hybrid Lash Extensions",
        price: "From $185",
        duration: "135 min",
        description: "A blend of classic and volume for soft, textured fullness.",
      },
      {
        name: "Volume Lash Extensions",
        price: "From $245",
        duration: "165 min",
        description: "Lightweight fans for a fuller, fluffier look.",
      },
      {
        name: "2-Week Lash Refill",
        price: "From $95",
        duration: "60 min",
        description: "Keep your set full with a regular refill.",
      },
      {
        name: "3-Week Lash Refill",
        price: "From $120",
        duration: "75 min",
        description: "A fuller refill for sets at the three-week mark.",
      },
      {
        name: "Lash Removal",
        price: "$40",
        duration: "30 min",
        description: "Gentle, professional removal that protects your natural lashes.",
      },
    ],
    notes: [
      "Eyelash extensions and refills may be available by appointment — please contact us for availability.",
      "A patch test may be recommended for first-time tinting or lifting clients.",
    ],
  },
  {
    slug: "mens-grooming",
    title: "Men’s Grooming",
    cardTitle: "Men’s Grooming",
    excerpt: "Men’s cuts, fades, beard trims, grey blending and scalp detox.",
    intro: "Clean cuts, fades, beard grooming, grey blending and scalp care for men.",
    image: siteImages.mensGrooming.src,
    imageAlt: siteImages.mensGrooming.alt,
    items: [
      {
        name: "Men’s Cut",
        price: "From $55",
        duration: "30–45 min",
        description: "A clean, considered cut without the rush.",
      },
      {
        name: "Skin Fade",
        price: "From $65",
        duration: "45 min",
        description: "Sharp, precise fade work blended to your style.",
      },
      {
        name: "Beard Trim",
        price: "From $35",
        duration: "20 min",
        description: "Shape and tidy for a well-kept beard.",
      },
      {
        name: "Cut + Beard Trim",
        price: "From $85",
        duration: "60 min",
        description: "The full tidy-up — cut and beard in one visit.",
      },
      {
        name: "Grey Blending",
        price: "From $95",
        duration: "60 min",
        description: "Subtle, natural-looking grey coverage.",
      },
      {
        name: "Men’s Scalp Detox",
        price: "$145",
        duration: "50–60 min",
        description: "Deep scalp cleanse and massage to refresh and rebalance.",
      },
      {
        name: "Men’s Cut + Scalp Detox",
        price: "$185",
        duration: "90 min",
        description: "A fresh cut paired with our deep scalp cleanse.",
      },
    ],
  },
  {
    slug: "nails",
    title: "Nails",
    cardTitle: "Nails",
    excerpt: "Manicures, pedicures and nail care through our in-house partner.",
    intro:
      "Nail services may be available through our in-house partner. Please contact us for availability.",
    image: siteImages.nails.src,
    imageAlt: siteImages.nails.alt,
    items: [
      {
        name: "Classic Manicure",
        price: "From $45",
        duration: "30 min",
        description: "Shape, cuticle care and polish for tidy, natural nails.",
      },
      {
        name: "Gel Manicure",
        price: "From $65",
        duration: "45–60 min",
        description: "Long-lasting gel colour with a glossy finish.",
      },
      {
        name: "Classic Pedicure",
        price: "From $65",
        duration: "45 min",
        description: "Care and polish for refreshed, comfortable feet.",
      },
      {
        name: "Gel Pedicure",
        price: "From $85",
        duration: "60 min",
        description: "A complete pedicure finished with durable gel colour.",
      },
      {
        name: "Nail Art",
        price: "From $15",
        duration: "Add-on",
        description: "Simple to detailed designs, added to any service.",
      },
      {
        name: "Removal",
        price: "From $25",
        duration: "20–30 min",
        description: "Gentle removal of gel or existing product.",
      },
    ],
    notes: [
      "Nail services may be available through our in-house partner. Please contact us for availability.",
    ],
  },
  {
    slug: "semi-permanent",
    title: "Semi-Permanent Beauty",
    cardTitle: "Semi-Permanent Beauty",
    excerpt: "Semi-permanent brows, lip blush and lash line enhancement — by consultation only.",
    intro:
      "Semi-permanent beauty services are available by consultation only and subject to suitability assessment.",
    image: siteImages.browsLashes.src,
    imageAlt: siteImages.browsLashes.alt,
    items: [
      {
        name: "Semi-Permanent Beauty Consultation",
        price: "$50 redeemable",
        duration: "30 min",
        description:
          "A private consultation to discuss preferences and assess suitability. Redeemable against your treatment if you proceed.",
      },
      {
        name: "Powder / Ombre Brows",
        price: "From $650",
        duration: "150 min",
        description: "Soft, shaded brow enhancement with a gentle powdered finish.",
      },
      {
        name: "Combination Brows",
        price: "From $750",
        duration: "180 min",
        description: "Blended technique combining soft strokes and shading.",
      },
      {
        name: "Lip Blush",
        price: "From $690",
        duration: "180 min",
        description: "A gentle wash of colour to softly define the lips.",
      },
      {
        name: "Lip Blush incl. Touch-Up",
        price: "From $850",
        duration: "180 min + 120 min",
        description: "Lip blush with a scheduled touch-up session included.",
      },
      {
        name: "Lash Line Enhancement",
        price: "From $399",
        duration: "120 min",
        description: "Subtle definition along the lash line for an effortless look.",
      },
      {
        name: "Eyeliner Tattoo",
        price: "From $599",
        duration: "150 min",
        description: "Soft, defined liner discussed and planned at consultation.",
      },
      {
        name: "Touch-Up",
        price: "From $200",
        duration: "90–120 min",
        description: "Refresh an existing treatment within the recommended window.",
      },
      {
        name: "Annual Refresh",
        price: "From $350",
        duration: "90–120 min",
        description: "A yearly refresh to softly revive fading colour.",
      },
    ],
    notes: [
      "Semi-permanent beauty services are available by consultation only and subject to suitability assessment. Results vary between clients. A consultation is required before treatment.",
    ],
  },
];

export function getCategory(slug: string): ServiceCategory {
  const category = serviceCategories.find((c) => c.slug === slug);
  if (!category) throw new Error(`Unknown service category: ${slug}`);
  return category;
}

export const featuredServices = serviceCategories
  .filter((c) => c.slug !== "semi-permanent" && c.slug !== "nails")
  .map((c) => ({
    title: c.cardTitle,
    description: c.excerpt,
    href: `/services/${c.slug}`,
    image: c.image,
    imageAlt: c.imageAlt,
  }));

export const signatureExperiences = [
  {
    title: "Signature Head Spa Ritual",
    description:
      "Our signature ritual of scalp cleansing, warm water therapy and deep relaxation massage.",
    href: "/services/head-spa",
    image: signatureImages.headSpaRitual.src,
    imageAlt: signatureImages.headSpaRitual.alt,
  },
  {
    title: "Premium Head Spa + Blow Dry",
    description:
      "The full head spa experience, finished with a soft, polished blow dry.",
    href: "/services/head-spa",
    image: signatureImages.headSpaBlowDry.src,
    imageAlt: signatureImages.headSpaBlowDry.alt,
  },
  {
    title: "Korean Skin Glow Facial",
    description:
      "Glow-focused Korean skin management for fresh, hydrated, comfortable skin.",
    href: "/services/skin-facial",
    image: signatureImages.skinGlow.src,
    imageAlt: signatureImages.skinGlow.alt,
  },
  {
    title: "Body Scrub & Relaxation",
    description:
      "Gentle full-body exfoliation followed by quiet, relaxation-focused care.",
    href: "/services/body-care",
    image: signatureImages.bodyRelaxation.src,
    imageAlt: signatureImages.bodyRelaxation.alt,
  },
  {
    title: "Korean Lash Lift + Brow Lamination",
    description:
      "A complete natural eye refresh — lifted lashes and softly set brows.",
    href: "/services/brows-lashes",
    image: signatureImages.lashBrowCombo.src,
    imageAlt: signatureImages.lashBrowCombo.alt,
  },
  {
    title: "Hair Repair + Scalp Care",
    description:
      "Restorative hair treatment paired with scalp cleansing for healthier-feeling hair.",
    href: "/services/hair",
    image: signatureImages.hairRepair.src,
    imageAlt: signatureImages.hairRepair.alt,
  },
];

export const careerOpportunities = [
  {
    title: "Salon Manager",
    type: "Full time · Leadership",
    summary:
      "An experienced, reliable and business-minded Salon Manager to help lead and grow our premium hair and beauty studio in Balwyn.",
    highlights: [
      "Competitive salary package",
      "Performance-based incentives and team target bonus",
      "Annual reward or profit-sharing opportunity for outstanding performance",
    ],
  },
  {
    title: "Hairdresser",
    type: "Full time / Part time",
    summary:
      "Talented stylists who care about hair condition as much as the finish, working across cuts, colour and treatments.",
    highlights: [
      "Premium products and a calm studio environment",
      "Steady client flow across hair, head spa and beauty",
      "Training support may be provided across studio services",
    ],
  },
  {
    title: "Rent a Chair",
    type: "Independent operator",
    summary:
      "Established hairdressers looking for a premium chair in Balwyn with head spa, skin and beauty services around them.",
    highlights: [
      "Professional hair station in a premium studio",
      "Flexible arrangements by discussion",
      "Cross-referral potential from studio clients",
    ],
  },
  {
    title: "Beauty Room / Treatment Room Rental",
    type: "Independent operator",
    summary:
      "Private treatment rooms for beauty professionals — skin, body, brows and lashes, or nail services through an in-house partnership.",
    highlights: [
      "Private, fitted treatment rooms",
      "Premium street presence in Balwyn",
      "Terms tailored to your service offering",
    ],
  },
];

export const membershipPlans = [
  {
    title: "Head Spa Membership",
    description:
      "Monthly luxury head spa rituals to keep your scalp refreshed and your routine consistent.",
  },
  {
    title: "Skin Glow Membership",
    description:
      "Regular Korean skin management sessions for hydrated, cared-for skin all year round.",
  },
  {
    title: "Hair Colour Maintenance",
    description:
      "Keep your colour fresh with scheduled root retouches, toners and treatments.",
  },
  {
    title: "Beauty Refresh Membership",
    description:
      "A flexible monthly plan across brows, lashes and beauty maintenance services.",
  },
];

// Temporary stock images — replace with professional Mend Beauty Studio photography.
export const galleryImages = galleryStockImages.map(({ src, alt }) => ({ src, alt }));
