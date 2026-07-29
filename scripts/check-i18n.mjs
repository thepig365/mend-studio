import { readFileSync } from "node:fs";

const files = {
  locales: readFileSync("lib/i18n.ts", "utf8"),
  chinesePage: readFileSync("app/(zh)/zh/[[...slug]]/page.tsx", "utf8"),
  sitemap: readFileSync("app/sitemap.ts", "utf8"),
  englishLayout: readFileSync("app/(en)/layout.tsx", "utf8"),
  chineseLayout: readFileSync("app/(zh)/zh/layout.tsx", "utf8"),
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

if (!files.englishLayout.includes('lang="en-AU"')) {
  failures.push("English root layout does not set the English HTML language.");
}

if (!files.chineseLayout.includes('lang="zh-Hans"')) {
  failures.push("Chinese root layout does not set the Chinese HTML language.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Bilingual checks passed: ${requiredRoutes.length} primary routes and ${requiredServiceSlugs.length} service routes.`,
);
