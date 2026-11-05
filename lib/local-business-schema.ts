import { serviceAreas, site } from "@/lib/site";

// HairSalon plus the beauty and spa services published on the site.
export const localBusinessTypes = ["HairSalon", "BeautySalon", "DaySpa"] as const;

// Factual description. The tagline stays on `slogan`, not here.
export const businessDescription = `${site.name} is a hair and beauty studio at ${site.address}, near Balwyn, in ${site.region}. Published services include haircuts and colour, head spa, scalp care, facials, body care, brows and lashes, grooming for men, nails, and semi-permanent beauty by consultation only. Book online or call ${site.phone}. Open ${site.hours[0].days}, ${site.hours[0].time}. ${site.hours[1].days}: ${site.hours[1].time}.`;

// Published menu span for schema.org priceRange.
// Floor: Fringe Refresh "From $25" in lib/anna-services.ts.
// Ceiling: MEND Bridal Journey "$4999" in lib/anna-services.ts.
// Nail Art "From $15" in lib/services.ts is a partner add-on, so it is not the floor.
const priceRange = "AUD 25\u20134999";

// OpenStreetMap node 4193208310 for 74 Whitehorse Road, Deepdene VIC 3103.
// Queried via Nominatim on 5 November 2026. Data © OpenStreetMap contributors, ODbL.
const geo = {
  "@type": "GeoCoordinates",
  latitude: "-37.8110487",
  longitude: "145.0655700",
};

// Public business identity only. Keep every fact sourced from lib/site.ts
// except the coordinates and price span noted above.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": [...localBusinessTypes],
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: site.locationName,
  description: businessDescription,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/images/mend-beauty-logo.png`,
  image: [
    `${site.url}/images/mend-beauty-salon-interior-1.png`,
    `${site.url}/images/mend-beauty-logo.png`,
  ],
  hasMap: site.mapsHref,
  email: site.email,
  telephone: site.phoneHref.replace("tel:", ""),
  priceRange,
  geo,
  sameAs: Object.values(site.socialProfiles),
  openingHoursSpecification: site.structuredOpeningHours,
  address: {
    "@type": "PostalAddress",
    ...site.structuredAddress,
  },
  areaServed: serviceAreas,
};
