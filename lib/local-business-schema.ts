import { site } from "@/lib/site";

// Public business identity only. Keep every fact sourced from lib/site.ts.
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: site.locationName,
  description: site.tagline,
  url: site.url,
  logo: `${site.url}/images/mend-beauty-logo.png`,
  image: `${site.url}/images/mend-beauty-logo.png`,
  hasMap: site.mapsHref,
  sameAs: Object.values(site.socialProfiles),
  telephone: site.phoneHref.replace("tel:", ""),
  openingHoursSpecification: site.structuredOpeningHours,
  address: {
    "@type": "PostalAddress",
    ...site.structuredAddress,
  },
};
