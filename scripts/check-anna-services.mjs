import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const hash = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");

const anna = read("lib/anna-services.ts");
const landing = read("app/(en)/services/page.tsx");
const chinese = read("app/(zh)/zh/[[...slug]]/page.tsx");
const menu = read("src/data/serviceMenu.ts");
const row = read("src/components/ServiceItem.tsx");
const imageRegistry = read("src/data/serviceImages.ts");
const splitPage = read("app/(en)/services/nails-semi-permanent/page.tsx");
const i18n = read("lib/i18n.ts");
const qrPanel = read("components/QrCodePanel.tsx");
const qrData = read("lib/qr-codes.ts");
const englishHome = read("app/(en)/page.tsx");
const englishContact = read("app/(en)/contact/page.tsx");
const footer = read("components/Footer.tsx");
const memberships = read("lib/memberships.ts");
const membershipPage = read("components/MembershipPlans.tsx");

const categoryReferences = [
  "hairAtelier",
  "skinAesthetics",
  "scalpMindWellness",
  "bodyWellness",
  "hairReduction",
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

const posterItems = [
  ...anna.matchAll(
    /item\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g,
  ),
].map((match) => ({
  id: match[1],
  imageId: match[2],
  nameEn: match[3],
  nameZh: match[4],
  price: match[5],
}));

assert.equal(posterItems.length, 45, "Expected 45 source-poster service declarations");
assert.equal(
  new Set(posterItems.map((item) => item.id)).size,
  45,
  "Source-poster service ids must be unique",
);

for (const marker of [
  '"Gentleman’s Precision Cut", "男士精剪", "$65"',
  '"Root Refresh", "局部补染", "$138"',
  '"Hair Growth Ritual", "脱发焕活护理", "$269", "90 mins"',
  '"LHALA Glass Skin Peel", "韩国水光焕肤酸疗", "$69", "20 mins"',
  '"MEND Signature Body Ritual", "全身焕活身心能量管理", "$348", "120 mins"',
  '"Arms (Full) / Full Legs", "全手臂／全小腿", "$139 single · $699 / 6 sessions"',
]) {
  assert(anna.includes(marker), `Missing exact poster value: ${marker}`);
}

const imageKeys = new Set(
  [
    ...imageRegistry.matchAll(
      /^  "?([a-z0-9-]+)"?: (?:unsplash|pexels|mendOriginal)\(/gm,
    ),
  ].map((match) => match[1]),
);
for (const item of posterItems) {
  assert(
    imageKeys.has(item.imageId),
    `${item.id} references an unknown existing image id: ${item.imageId}`,
  );
  assert(item.price.includes("$"), `${item.id} has an invalid price`);
}

assert.match(anna, /advanced devices, injectables and skin boosters remain withheld/i);
assert.match(anna, /Chinese source says 全手臂／全小腿/);

assert.match(qrData, /https:\/\/u\.wechat\.com\/kNVC5BSGLv-TksATEKFVjKs\?s=2/);
assert.match(qrData, /https:\/\/mendbeauty\.com\.au\//);
for (const source of [englishHome, englishContact, chinese, footer]) {
  assert.match(source, /QrCodePanel/, "QR panel missing from a required placement");
}
assert.match(qrPanel, /WeChat code, open WeChat Scan/);
assert.match(qrPanel, /download/);
assert.match(qrPanel, /unoptimized/);

for (const value of [999, 100, 2000, 268, 248, 5000, 788, 515, 10000, 1999, 985]) {
  assert(memberships.includes(String(value)), `Missing membership value: ${value}`);
}
assert.match(membershipPage, /Gifted-service value is not cash credit/);
assert.match(membershipPage, /membershipReviewItems/);

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
  "docs/source-posters/hair-menu.jpg":
    "e79f38b51d9918050affc6e9f4487951d6e0904abb3791f7023e0b0cf38f7b5a",
  "docs/source-posters/hair-reduction-menu.jpg":
    "dbb6306c8491277c674200d9b03d1eaf1aaddc3f41d123a1827905a2d46291c5",
  "docs/source-posters/membership-plan.jpg":
    "63b0d54addea694335be9927827952d9a874cfbdc8b7c1a020e3e2f9ebedadf4",
  "docs/source-posters/scalp-body-menu.jpg":
    "cf3be5f45779b819c4a4c6e4248ec9ab667f8eb2d05832bb402a9f36da2425e9",
  "docs/source-posters/skin-menu.jpg":
    "ec672035a49dfdcce0e342dc70e3f87e3ccc491257e2b80d8a53d319fa6b264a",
  "public/qr/official-website-qr.jpg":
    "0d7dd61b0bb7b924730e8cdd106214e1b9bca12021aa93732e4ab89300e6d1ef",
  "public/qr/wechat-booking-qr.jpg":
    "ce44ca231b58ae544e1292d5348dddabc7a47d5a93b576af1795cb35ad13a44e",
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
  "Poster update checks passed: 8 public categories, 45 source-poster declarations, exact bilingual values, QR payloads and placements, membership review notes, protected original assets and general MaSe booking handoff.",
);
