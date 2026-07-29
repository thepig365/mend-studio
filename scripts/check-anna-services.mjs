import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const hash = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");

const anna = read("lib/anna-services.ts");
const landing = read("app/services/page.tsx");
const chinese = read("app/zh/[[...slug]]/page.tsx");
const menu = read("src/data/serviceMenu.ts");
const row = read("src/components/ServiceItem.tsx");
const imageRegistry = read("src/data/serviceImages.ts");
const splitPage = read("app/services/nails-semi-permanent/page.tsx");
const i18n = read("lib/i18n.ts");

const categoryReferences = [
  "hairAtelier",
  "hairScalpRecovery",
  "scalpMindWellness",
  "skinAesthetics",
  "bodyWellness",
  "legacyMens",
  "legacyNails",
  "legacySemiPermanent",
];
const categoryArray = anna.match(
  /export const annaServiceCategories:[\s\S]*?= \[([\s\S]*?)\];/,
)?.[1];
assert(categoryArray, "Anna category array is missing");
let previousIndex = -1;
for (const category of categoryReferences) {
  const index = categoryArray.indexOf(category);
  assert(index > previousIndex, `Category order is incorrect at ${category}`);
  previousIndex = index;
}

const approvedItems = [
  ...anna.matchAll(
    /approvedItem\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g,
  ),
].map((match) => ({
  id: match[1],
  imageId: match[2],
  nameEn: match[3],
  nameZh: match[4],
  price: match[5],
  duration: match[6],
}));

assert.equal(approvedItems.length, 45, "Expected 45 Anna-supplied service items");
assert.equal(
  new Set(approvedItems.map((item) => item.id)).size,
  45,
  "Anna service ids must be unique",
);

const expectedCategoryCounts = [
  ["const hairAtelier", "const hairScalpRecovery", 14],
  ["const hairScalpRecovery", "const scalpMindWellness", 7],
  ["const scalpMindWellness", "const skinAesthetics", 4],
  ["const skinAesthetics", "const bodyWellness", 11],
  ["const bodyWellness", "const nailsIds", 9],
];
for (const [start, end, expected] of expectedCategoryCounts) {
  const block = anna.slice(anna.indexOf(start), anna.indexOf(end));
  const count = [...block.matchAll(/approvedItem\(/g)].length;
  assert.equal(count, expected, `${start} expected ${expected} services`);
}

const imageKeys = new Set(
  [
    ...imageRegistry.matchAll(
      /^  "?([a-z0-9-]+)"?: (?:unsplash|pexels|mendOriginal)\(/gm,
    ),
  ].map((match) => match[1]),
);
for (const item of approvedItems) {
  assert(
    imageKeys.has(item.imageId),
    `${item.id} references an unknown existing image id: ${item.imageId}`,
  );
  assert(item.price.startsWith("$"), `${item.id} has an invalid price`);
  assert(
    item.duration.includes("mins") ||
      item.duration === "Customised three-month program",
    `${item.id} has an invalid duration format`,
  );
}

assert.match(anna, /const nailsIds = \[[\s\S]*?"nail-removal"/);
assert.match(anna, /const semiPermanentIds = \[[\s\S]*?"annual-refresh"/);
assert.match(anna, /legacyMens/);
assert.match(
  anna,
  /export const annaServiceCategories:[\s\S]*?legacyNails,[\s\S]*?legacySemiPermanent/,
);
assert.doesNotMatch(
  categoryArray,
  /nailsSemiPermanent/,
  "The combined category must not appear on the services overview",
);
assert.match(splitPage, /href: "\/services\/nails"/);
assert.match(splitPage, /href: "\/services\/semi-permanent"/);
assert.match(chinese, /href: "\/zh\/services\/nails"/);
assert.match(chinese, /href: "\/zh\/services\/semi-permanent"/);
assert.match(i18n, /label: "Nails", href: "\/services\/nails"/);
assert.match(
  i18n,
  /label: "Semi-Permanent Beauty", href: "\/services\/semi-permanent"/,
);
assert.match(landing, /annaServiceCategories\.map/);
assert.match(chinese, /zhAnnaServiceCategories\.map/);
assert.doesNotMatch(landing, /Find My Treatment|treatment finder|questionnaire/i);
assert.doesNotMatch(chinese, /寻找我的护理方向|护理问卷|推荐测试/);
assert.match(row, /href=\{locale === "zh-Hans" \? "\/zh\/book" : "\/book"\}/);
assert.match(menu, /general MaSe booking page/);

for (const unsupported of [
  "Melbourne-exclusive biotechnology",
  "Full-layer biological repair",
  "P198 is only available in New Zealand",
  "spiritual reset",
]) {
  assert(!anna.includes(unsupported), `Unsupported claim published: ${unsupported}`);
}
assert(!anna.includes("30% discount"), "Unapproved birthday discount was published");

const protectedHashes = {
  "src/data/images.ts":
    "b87774da0172663b940c9de708a999d18553b3c966ad4c85d2796aae350a2462",
  "src/data/serviceImages.ts":
    "a5128ed1eee8a4df2f48aa7b2efe32cd5b03c9cda2f64c7087a3548691df4b5f",
  "components/ServiceCard.tsx":
    "16ef9183493012406ba231d85581902fce3891011794f37b325e9873dee6cb30",
  "src/components/ServiceImagePreview.tsx":
    "59e2dfcacd22566afa67d038a46cda4a82e0327c90e815950975c151b919dd94",
  "src/components/ServiceImageModal.tsx":
    "18cd9e952d6b530a44e05909516d81e66aba0c6f7a70518bf75c65ed24092ede",
  "public/images/services/headspa-wash.jpg":
    "5d15fe4607f9f44ccca2e887166d5b00290c275c1ccffbd95909c7a73dc17ca1",
  "public/images/services/headspa-signature-mend.webp":
    "283d99697f97b019fa6522acd4287f562dcad441531bb1f61ddb3f7adfce4377",
  "public/images/services/headspa-aroma-sleep-mend.webp":
    "51c06ac30c1afc416f0094fe17038e4e9309ae9d150582ed6b8a623b167b3136",
  "public/images/services/headspa-signature-ritual-mend.webp":
    "54810586a7aac2cbac3506fd65069ee3ccb8944d3338dd1a4aff58a67e436ef1",
};
for (const [path, expected] of Object.entries(protectedHashes)) {
  assert.equal(hash(path), expected, `Protected image/presentation file changed: ${path}`);
}

console.log(
  "Anna services checks passed: 8 categories, 67 total services, 45 approved Anna items, split nails and semi-permanent categories, protected legacy data, approved Head Spa imagery, bilingual content and general MaSe booking handoff.",
);
