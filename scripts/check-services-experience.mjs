import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const catalog = readFileSync("lib/service-catalog.ts", "utf8");
const sitemap = readFileSync("app/sitemap.ts", "utf8");
const nav = readFileSync("lib/i18n.ts", "utf8");
const journey = readFileSync("components/services/JourneySelector.tsx", "utf8");
const servicePage = readFileSync("components/services/ServiceExperience.tsx", "utf8");

const requiredCategories = ["hair", "head-spa", "skin", "body", "signature-rituals"];
const requiredPhaseOne = [
  "express-head-reset",
  "signature-head-spa",
  "deep-sleep-head-ritual",
  "glass-hair-renewal",
  "essential-skin-reset",
  "korean-glass-skin-ritual",
  "shoulder-neck-reset",
  "mend-total-reset",
];

for (const category of requiredCategories) {
  assert.match(catalog, new RegExp(`id: "${category}"`));
  assert.match(nav, new RegExp(`/services/${category}`));
}
for (const service of requiredPhaseOne) {
  assert.match(catalog, new RegExp(`slug: "${service}"`));
}

assert.doesNotMatch(catalog, /Nervous System Reset|Couple's Healing Journey/);
assert.match(journey, /journey_started/);
assert.match(journey, /journey_completed/);
assert.match(journey, /does not diagnose|不作出任何诊断/);
assert.match(servicePage, /"@type": "Service"/);
assert.match(servicePage, /booking_clicked/);
assert.match(servicePage, /consultation_clicked/);
assert.match(sitemap, /services\.map/);

console.log(
  `Service-experience checks passed: ${requiredCategories.length} categories, ${requiredPhaseOne.length} Phase 1 services, bilingual journey, structured data and safe booking modes.`,
);
