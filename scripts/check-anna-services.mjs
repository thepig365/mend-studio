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

assert.equal(posterItems.length, 65, "Expected 65 source-menu service declarations");
assert.equal(
  new Set(posterItems.map((item) => item.id)).size,
  65,
  "Source-poster service ids must be unique",
);

for (const marker of [
  '"Gentleman’s Precision Cut", "男士精剪", "From $55"',
  '"Root Refresh", "局部补染", "From $130"',
  '"Hair Loss Care Ritual", "防脱强韧头皮护理", "$199"',
  '"LHALA Glass Skin Peel", "韩国水光焕肤酸疗", "$69", "20 mins"',
  '"MEND Signature Body Ritual", "全身焕活身心能量管理", "$348", "120 mins"',
  '"Arms (Full) / Legs (Full)", "全手臂／全腿", "$139 single · $699 / 6 sessions"',
]) {
  assert(anna.includes(marker), `Missing exact poster value: ${marker}`);
}

const requiredNewMenuPrices = {
  "wash-blow-dry": "From $55", "wash-curls": "From $65",
  "kids-signature-cut": "$45", "kids-cut-three-plus": "From $50",
  "quarter-head-foils": "$120", "half-head-foils-menu": "$150", "full-head-foils-menu": "$250",
  "classic-texture-perm": "From $250", "ladies-texture-wave": "From $300", "scalp-detox-ritual": "$58",
  "hydra-hair-ritual": "$150", "dandruff-control-ritual": "$199", "sensitive-scalp-care-ritual": "$199", "oily-scalp-balancing-ritual": "$199", "hair-loss-care-ritual": "$199",
  "express-head-spa": "$78", "korean-signature-head-spa": "$198", "aroma-healing-head-spa": "$268", "mend-signature-head-ritual": "$398",
  "circulation-therapy": "$268", "express-relaxation-massage": "$88", "aroma-healing-massage": "$168", "deep-sleep-massage": "$268",
  "facial-moxibustion-ritual": "$69", "radiance-eye-renewal": "$69", "neck-renewal-care": "$69",
  "signature-facial-program": "$1299", "collagen-renewal-program": "$1399", "acne-reset-program": "$2339", "pigment-reset-program": "$1999", "glass-skin-program": "$2699", "age-defying-program": "$3599", "mend-bridal-journey": "$4999",
};
for (const [id, price] of Object.entries(requiredNewMenuPrices)) {
  assert.equal(posterItems.find(item => item.id === id)?.price, price, `Incorrect or missing updated service: ${id}`);
}
assert.match(memberships, /valid for 2 years/);
assert.match(memberships, /Top-ups are non-refundable/);
assert.match(memberships, /transferred or shared with family/);
assert.match(memberships, /single-treatment prices/);
assert.match(memberships, /no service or amount limit/);
assert.match(memberships, /cannot be exchanged or converted to cash/);
assert.doesNotMatch(memberships, /mins|75-min|30-min|Fat-Burning/);
for (const file of ["hair-atelier.pdf", "skin-collection.pdf", "scalp-body.png", "hair-reduction.png", "membership.png", "customised-programs.png"]) assert(readFileSync(`public/menus/${file}`).length > 1000);

const imageKeys = new Set(
  [
    ...imageRegistry.matchAll(
      /^  "?([a-z0-9-]+)"?: (?:unsplash|pexels|mendOriginal)\(/gm,
    ),
  ].map((match) => match[1]),
);
for (const match of imageRegistry.matchAll(/^  "([a-z0-9-]+)": \{/gm)) imageKeys.add(match[1]);
for (const item of posterItems) {
  assert(
    imageKeys.has(item.imageId),
    `${item.id} references an unknown existing image id: ${item.imageId}`,
  );
  assert(item.price.includes("$"), `${item.id} has an invalid price`);
}

for (const [serviceId, imageId] of [
  ["hair-reduction-upper-lip", "hair-reduction-upper-lip"],
  ["hair-reduction-underarms", "hair-reduction-underarms"],
  ["hair-reduction-full-face", "hair-reduction-full-face"],
  ["hair-reduction-half-arms-lower-legs", "hair-reduction-half-arms-lower-legs"],
  ["hair-reduction-full-arms-legs", "hair-reduction-full-arms-legs"],
  ["hair-reduction-full-back", "hair-reduction-back"],
]) {
  assert(
    posterItems.some((item) => item.id === serviceId && item.imageId === imageId),
    `Incorrect Hair Reduction image mapping: ${serviceId}`,
  );
}
assert(posterItems.some(item => item.id === "hair-reduction-bikini-line" && item.imageId === "hair-reduction-bikini"));
assert.doesNotMatch(anna, /hideImage: true|remain withheld|Chinese source says/);

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
for (const wording of [
  "尊享优惠",
  "会员赠送福利",
  "充值越多 · 尊享越多 · 美丽加倍",
  "所有会员生日当月可到店领取生日伴手礼一份",
]) {
  assert(membershipPage.includes(wording), `Missing Anna membership wording: ${wording}`);
}
for (const gift of [
  "1次皮肤检测",
  "1次韩式经典头疗",
  "1次韩国水光焕肤酸疗",
  "1次韩式徒手小颜V脸管理",
  "1次脱发焕活护理",
  "1次韩式水光炸弹管理",
  "1次全身焕肤身心重启管理",
]) {
  assert(memberships.includes(gift), `Missing membership gift: ${gift}`);
}
assert.doesNotMatch(membershipPage, /广告|Advertised|advertised/);
assert.match(anna, /laser-equipment\.png/);

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
  // 2026-11-01: correct two studio-image alt labels from Balwyn to Deepdene;
  // image sources, credits and all assets remain unchanged.
  "src/data/images.ts":
    "2ff140892f6a87c01859b20b67550cbf87a42189de5d4ec6d3f1b89c0a2e25f0",
  "components/ServiceCard.tsx":
    "16ef9183493012406ba231d85581902fce3891011794f37b325e9873dee6cb30",
  // Updated 2026-10-16: reviewed stock-photo focal points in the hover preview.
  "src/components/ServiceImagePreview.tsx":
    "03954ed82004811e684c61b5edb500a9b528b4f8386b6101cad09b863fb1390e",
  "public/images/services/headspa-wash.jpg":
    "5d15fe4607f9f44ccca2e887166d5b00290c275c1ccffbd95909c7a73dc17ca1",
  "public/images/services/headspa-signature-mend.webp":
    "283d99697f97b019fa6522acd4287f562dcad441531bb1f61ddb3f7adfce4377",
  "public/images/services/headspa-aroma-sleep-mend.webp":
    "51c06ac30c1afc416f0094fe17038e4e9309ae9d150582ed6b8a623b167b3136",
  "public/images/services/headspa-signature-ritual-mend.webp":
    "54810586a7aac2cbac3506fd65069ee3ccb8944d3338dd1a4aff58a67e436ef1",
  "public/images/services/hair-reduction-upper-lip.webp":
    "bae11e3c4f6728de205c63de6ee3047079c5211822c917b796df36e5b4f8a743",
  "public/images/services/hair-reduction-underarms.webp":
    "d8ec53f07a1e7a6ccc381a9ea846add9a3d9ea3892ec60f07ab0448bcda61205",
  "public/images/services/hair-reduction-full-face.webp":
    "c2469c29aabc823f22d551af0f3205782085ec54ae8ef7906f63d0915ad96aff",
  "public/images/services/hair-reduction-half-arms-lower-legs.webp":
    "a5b26d8010d122116fabc757722e634b4c86a8d9c254f4a3d5d85340aa0c40e9",
  "public/images/services/hair-reduction-full-arms-legs.webp":
    "8145450e593e79abd80e30ec00e806184d3555e9041c14461f81edba2d3146b5",
};
for (const [path, expected] of Object.entries(protectedHashes)) {
  assert.equal(hash(path), expected, `Protected image/presentation file changed: ${path}`);
}

console.log(
  "Poster update checks passed: 8 public categories, 65 source-menu declarations, exact bilingual values, original Hair Reduction imagery including Bikini Line, membership wording and gifts, QR placements, protected assets and MaSe booking handoff.",
);
