import { readFileSync } from "node:fs";

const files = {
  locales: readFileSync("lib/i18n.ts", "utf8"),
  chinesePage: readFileSync("app/zh/[[...slug]]/page.tsx", "utf8"),
  sitemap: readFileSync("app/sitemap.ts", "utf8"),
  proxy: readFileSync("proxy.ts", "utf8"),
  seo: readFileSync("lib/seo.ts", "utf8"),
};

const requiredRoutes = [
  "/zh",
  "/zh/services",
  "/zh/book",
  "/zh/gift-cards",
  "/zh/memberships",
  "/zh/careers",
  "/zh/contact",
  "/zh/our-story",
  "/zh/policies",
];

const requiredServiceSlugs = [
  "hair",
  "hair-scalp-recovery",
  "head-spa",
  "skin-facial",
  "body-care",
  "mens-grooming",
  "nails",
  "semi-permanent",
];

const failures = [];

for (const route of requiredRoutes) {
  const normalized = route.replace(/^\/zh/, "") || "/";
  if (
    !files.locales.includes(`"${normalized}"`) &&
    !files.chinesePage.includes(`path === "${normalized}"`)
  ) {
    failures.push(`Missing localized route declaration: ${route}`);
  }
}

for (const slug of requiredServiceSlugs) {
  if (!files.locales.includes(`/zh/services/${slug}`)) {
    failures.push(`Missing Chinese service navigation route: ${slug}`);
  }
}

for (const marker of ['"zh-Hans"', '"en-AU"', '"x-default"', "chineseUrl"]) {
  if (!files.seo.includes(marker) && !files.sitemap.includes(marker)) {
    failures.push(`Missing bilingual SEO marker: ${marker}`);
  }
}

if (!files.proxy.includes('requestHeaders.set("x-mend-locale"')) {
  failures.push("Proxy does not set the HTML locale request header.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Bilingual checks passed: ${requiredRoutes.length} primary routes and ${requiredServiceSlugs.length} service routes.`,
);
