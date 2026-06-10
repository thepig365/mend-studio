// =============================================================================
// Service menu data — one entry per bookable service item.
//
// Prices, times and descriptions come from lib/services.ts (the single source
// of truth used by the price lists). This file attaches a stable `id` and a
// matching image to every item, in the shape required by the interactive
// service image system (hover preview + tap modal).
//
// Temporary stock images — replace with professional Mend Beauty Studio
// photography. See src/data/serviceImages.ts for sources and credits.
// =============================================================================

import { serviceCategories } from "@/lib/services";
import { getServiceImage, type ServiceImage } from "./serviceImages";

export type ServiceItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  time?: string;
  description: string;
  image: ServiceImage;
  bookingNote?: string;
};

/**
 * Stable ids for every menu item, listed in the same order as the items in
 * lib/services.ts. The ids are also the keys into serviceImages.
 */
const idsByCategory: Record<string, { items: string[]; secondaryItems?: string[] }> = {
  hair: {
    items: [
      "womens-cut-blow-dry",
      "senior-stylist-cut-blow-dry",
      "mens-cut",
      "blow-wave-styling",
      "event-styling",
      "root-retouch",
      "global-colour",
      "toner-gloss",
      "half-head-foils",
      "full-head-foils",
      "balayage-package",
      "colour-correction",
      "keratin-smoothing",
      "hair-repair-treatment",
      "premium-hair-repair-blow-dry",
    ],
  },
  "head-spa": {
    items: [
      "express-scalp-refresh",
      "signature-head-spa",
      "premium-head-spa-ritual",
      "deluxe-head-spa-ritual",
      "scalp-cleansing-treatment",
      "scalp-health-support",
      "head-spa-blow-dry",
      "premium-head-spa-hair-repair",
      "head-spa-korean-mini-facial",
    ],
  },
  "skin-facial": {
    items: [
      "express-hydration-facial",
      "deep-cleansing-facial",
      "korean-skin-management-facial",
      "glass-skin-hydration-facial",
      "skin-barrier-repair-facial",
      "premium-korean-glow-facial",
      "facial-head-spa-package",
    ],
  },
  "body-care": {
    items: [
      "body-scrub",
      "body-scrub-hydration",
      "korean-body-care-ritual",
      "body-relaxation-treatment",
      "body-scrub-mini-facial",
      "body-care-head-spa-package",
    ],
  },
  "brows-lashes": {
    items: [
      "korean-lash-lift-tint",
      "brow-lamination-shape-tint",
      "lash-lift-brow-lamination-combo",
    ],
    secondaryItems: [
      "brow-shape",
      "brow-tint",
      "brow-shape-tint",
      "lash-dye",
      "classic-lash-extensions",
      "hybrid-lash-extensions",
      "volume-lash-extensions",
      "lash-refill-2-week",
      "lash-refill-3-week",
      "lash-removal",
    ],
  },
  "mens-grooming": {
    items: [
      "mens-grooming-cut",
      "skin-fade",
      "beard-trim",
      "cut-beard-trim",
      "grey-blending",
      "mens-scalp-detox",
      "mens-cut-scalp-detox",
    ],
  },
  nails: {
    items: [
      "classic-manicure",
      "gel-manicure",
      "classic-pedicure",
      "gel-pedicure",
      "nail-art",
      "nail-removal",
    ],
  },
  "semi-permanent": {
    items: [
      "semi-permanent-consultation",
      "powder-ombre-brows",
      "combination-brows",
      "lip-blush",
      "lip-blush-touch-up",
      "lash-line-enhancement",
      "eyeliner-tattoo",
      "semi-permanent-touch-up",
      "annual-refresh",
    ],
  },
};

const bookingNotesByCategory: Record<string, string> = {
  "semi-permanent": "Available by consultation only and subject to suitability assessment.",
  nails: "Nail services may be available through our in-house partner — please contact us for availability.",
};

function buildItems(
  slug: string,
  list: "items" | "secondaryItems"
): ServiceItem[] {
  const category = serviceCategories.find((c) => c.slug === slug);
  const ids = idsByCategory[slug]?.[list];
  const source = category?.[list];
  if (!category || !ids || !source) return [];
  if (ids.length !== source.length) {
    throw new Error(`Service id mapping out of sync for category: ${slug} (${list})`);
  }
  return source.map((item, index) => ({
    id: ids[index],
    name: item.name,
    category: category.title,
    price: item.price ?? "Price on consultation",
    time: item.duration,
    description: item.description ?? "",
    image: getServiceImage(ids[index]),
    bookingNote: bookingNotesByCategory[slug],
  }));
}

export function getMenuItemsForCategory(slug: string): {
  items: ServiceItem[];
  secondaryItems: ServiceItem[];
} {
  return {
    items: buildItems(slug, "items"),
    secondaryItems: buildItems(slug, "secondaryItems"),
  };
}

export const allServiceItems: ServiceItem[] = Object.keys(idsByCategory).flatMap(
  (slug) => {
    const { items, secondaryItems } = getMenuItemsForCategory(slug);
    return [...items, ...secondaryItems];
  }
);

export function getMenuItem(id: string): ServiceItem {
  const item = allServiceItems.find((i) => i.id === id);
  if (!item) throw new Error(`Unknown service menu item: ${id}`);
  return item;
}
