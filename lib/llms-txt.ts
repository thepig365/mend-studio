import { getAnnaCategory } from "@/lib/anna-services";
import { hairPageCopy } from "@/lib/hair-page-copy";
import { businessDescription } from "@/lib/local-business-schema";
import { localServiceCopy, type LocalServiceSlug } from "@/lib/local-service-copy";
import { pricingNote, getCategory, type ServiceCategory } from "@/lib/services";
import { serviceAreas, site } from "@/lib/site";

type MenuSource = {
  slug: string;
  path: string;
  category: ServiceCategory;
};

function menuLine(name: string, price?: string, duration?: string) {
  const time = duration ? ` (${duration})` : "";
  return `- ${name}: ${price ?? "Price on consultation"}${time}`;
}

function publicTitle(source: MenuSource) {
  if (source.slug === "hair") return hairPageCopy["en-AU"].title;
  if (source.slug in localServiceCopy) {
    return localServiceCopy[source.slug as LocalServiceSlug]["en-AU"].title;
  }
  return source.category.title;
}

function section(source: MenuSource) {
  const items = [
    ...source.category.items,
    ...(source.category.secondaryItems ?? []),
  ];
  const notes = (source.category.notes ?? []).map((note) => `- Note: ${note}`);
  return [
    `## ${publicTitle(source)}`,
    `- English: ${site.url}${source.path}`,
    `- Simplified Chinese: ${site.url}/zh${source.path}`,
    ...items.map((item) => menuLine(item.name, item.price, item.duration)),
    ...notes,
    "",
  ].join("\n");
}

const annaMenus: MenuSource[] = [
  "hair",
  "head-spa",
  "hair-scalp-recovery",
  "skin-facial",
  "body-care",
  "hair-reduction",
  "mens-grooming",
  "nails",
  "semi-permanent",
].map((slug) => ({
  slug,
  path: `/services/${slug}`,
  category: getAnnaCategory(slug),
}));

const brows: MenuSource = {
  slug: "brows-lashes",
  path: "/services/brows-lashes",
  category: getCategory("brows-lashes"),
};

const suburbs = serviceAreas.map((area) => area.name).join(", ");

export const llmsTxt = [
  `# ${site.name}`,
  "",
  `> ${businessDescription}`,
  "",
  "The studio is in Deepdene, near Balwyn. Nearby suburbs are places guests travel from. They are not separate salon locations.",
  "",
  "## Location",
  `- Address: ${site.address}`,
  `- Locality: ${site.structuredAddress.addressLocality}`,
  `- Region: ${site.region}`,
  `- Google Maps: ${site.mapsHref}`,
  "- Tram: route 109, stop 43, Deepdene Shopping Centre/Whitehorse Rd. From Balwyn Shopping Centre (stop 48) the tram runs five stops west.",
  "- Parking: not described on this website.",
  "",
  "## Hours",
  ...site.hours.map((slot) => `- ${slot.days}: ${slot.time}`),
  `- ${site.hoursNote}`,
  "",
  "## Contact",
  `- Phone: ${site.phone}`,
  `- Email: ${site.email}`,
  `- WeChat: ${site.wechat}`,
  "",
  "## Booking",
  `- English: ${site.url}/book`,
  `- Simplified Chinese: ${site.url}/zh/book`,
  "- Both pages hand the visitor to MaSe to choose a service and see the current price and available times.",
  "- The contact form at /contact#booking-enquiry is for consultations, gift cards, memberships and other enquiries. It opens an email on the visitor's device and does not store personal information on the website.",
  "",
  "## Suburbs welcomed",
  suburbs,
  "",
  "## Prices",
  pricingNote,
  "",
  "## Services",
  "Prices below are the published menu prices. Hair & Scalp Treatments repeats the scalp-focused items that also appear on the Hair Atelier menu.",
  "",
  ...[...annaMenus, brows].map(section),
  "## Key pages",
  `- Home: ${site.url}/`,
  `- Services: ${site.url}/services`,
  `- Contact: ${site.url}/contact`,
  `- Simplified Chinese home: ${site.url}/zh`,
  `- Getting here: ${site.url}/contact#getting-here`,
  "",
  "## Language",
  "Australian English pages are unprefixed. Simplified Chinese pages use the same paths under /zh and the same prices, address and booking handoff.",
  "",
].join("\n");
