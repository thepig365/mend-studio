export const site = {
  name: "Mend Beauty Studio",
  locationName: "Mend Beauty Studio — Balwyn",
  tagline: "Mend your hair. Refresh your skin. Renew your look.",
  positioning: "Hair • Head Spa • Skin • Body • Brows & Lashes",
  phone: "0499 66 88 99",
  phoneHref: "tel:+61499668899",
  email: "hello@mendbeauty.com.au",
  emailHref: "mailto:hello@mendbeauty.com.au",
  wechat: "+61499666688",
  address: "74 Whitehorse Road, Deepdene VIC 3103, Australia",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=74%20Whitehorse%20Road%2C%20Deepdene%20VIC%203103%2C%20Australia",
  // Structured components of the address above, for JSON-LD only. Values must always
  // match the `address` string exactly — do not edit one without the other.
  structuredAddress: {
    streetAddress: "74 Whitehorse Road",
    addressLocality: "Deepdene",
    addressRegion: "VIC",
    postalCode: "3103",
    addressCountry: "AU",
  },
  region: "Melbourne’s Inner East",
  // Canonical production domain. Used by robots.ts, sitemap.ts, canonical URLs,
  // OpenGraph/Twitter metadata, and JSON-LD. Single source of truth — do not
  // hardcode this string elsewhere.
  url: "https://mendbeauty.com.au",
  hours: [
    { days: "Monday – Tuesday", time: "9:00 am – 5:00 pm" },
    { days: "Wednesday", time: "Closed" },
    { days: "Thursday – Sunday", time: "9:00 am – 5:00 pm" },
  ],
  structuredOpeningHours: [
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ].map((dayOfWeek) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek,
    opens: "09:00",
    closes: "17:00",
  })),
  hoursNote: "Appointments are recommended. Public holiday hours may vary.",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Head Spa", href: "/services/head-spa" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Memberships", href: "/memberships" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const servicesNav = [
  { label: "Hair Atelier", href: "/services/hair" },
  {
    label: "Hair & Scalp Recovery",
    href: "/services/hair-scalp-recovery",
  },
  { label: "Scalp & Mind Wellness", href: "/services/head-spa" },
  { label: "Skin Aesthetics", href: "/services/skin-facial" },
  { label: "Body Wellness", href: "/services/body-care" },
  { label: "Men’s Grooming", href: "/services/mens-grooming" },
  {
    label: "Nails & Semi-Permanent Beauty",
    href: "/services/nails-semi-permanent",
  },
];

export const whyMend = [
  "8 professional hair stations",
  "2 dedicated head spa stations",
  "3 private treatment rooms",
  "Korean beauty professional support",
  "Premium products and calm salon environment",
  "Designed for hair, scalp, skin, body and beauty maintenance",
];
