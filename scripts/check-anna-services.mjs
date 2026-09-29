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

assert.equal(posterItems.length, 50, "Expected 50 source-book service declarations");
assert.equal(
  new Set(posterItems.map((item) => item.id)).size,
  50,
  "Source-book service ids must be unique",
);

for (const marker of [
  '"Gentleman’s Precision Cut", "男士精剪", "$65"',
  '"Root Refresh", "局部补染", "$138"',
  '"Hair Growth Ritual", "脱发焕活护理", "$269", "90 mins"',
  '"Express Head Spa", "快速头疗", "$78", "30 mins"',
  '"Korean Signature Head Spa", "韩式经典头疗", "$198", "75 mins"',
  '"Aroma Healing Head Spa", "芳香疗愈深度睡眠头疗", "$268", "90 mins"',
  '"MEND Signature Head Ritual", "MEND臻选头疗", "$398", "120 mins"',
  '"Add-on Scalp Detox Ritual", "头皮毛孔净化", "$30", "15 mins"',
  '"LHALA Glass Skin Peel", "韩国水光焕肤酸疗", "$69", "20 mins"',
  '"MEND Signature Body Ritual", "全身焕活身心能量管理", "$348", "120 mins"',
  '"Arms (Half) / Legs (Half)", "半手臂／半腿", "$119 single · $599 / 6 sessions"',
  '"Arms (Full) / Legs (Full)", "全手臂／全腿", "$139 single · $699 / 6 sessions"',
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

for (const [serviceId, imageId] of [
  ["hair-reduction-upper-lip", "hair-reduction-upper-lip"],
  ["hair-reduction-underarms", "hair-reduction-underarms"],
  ["hair-reduction-full-face", "hair-reduction-full-face"],
  ["hair-reduction-half-arms-lower-legs", "hair-reduction-half-arms-lower-legs"],
  ["hair-reduction-full-arms-legs", "hair-reduction-full-arms-legs"],
  ["hair-reduction-full-back", "body-care-head-spa-package"],
]) {
  assert(
    posterItems.some((item) => item.id === serviceId && item.imageId === imageId),
    `Incorrect Hair Reduction image mapping: ${serviceId}`,
  );
}
assert.match(
  anna,
  /item\("hair-reduction-bikini-line"[\s\S]*?\{ hideImage: true \}\)/,
  "Bikini Line must not expose an image",
);
assert.match(row, /const hasImage = !item\.hideImage/);

assert.match(anna, /advanced devices, injectables and skin boosters remain withheld/i);
assert.doesNotMatch(anna, /Owner confirmation required|全小腿|Lower Legs/);

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
  "1次75mins韩式经典头疗",
  "1次30mins韩国水光焕肤酸疗",
  "1次75mins韩式徒手小颜护理",
  "1次75mins脱发焕活护理",
  "1次90mins韩式水光炸弹管理",
  "1次120mins全身燃脂身心重启管理",
]) {
  assert(memberships.includes(gift), `Missing membership gift: ${gift}`);
}
for (const term of [
  "充值金额、赠送金额及赠送项目，自充值之日起有效期为两年。",
  "充值金额不予退款；账户余额可转让或与家人共享使用。",
  "余额适用于所有服务及产品。",
  "不可与疗程套价或其他会员折扣同时使用。",
  "不限服务项目及金额",
  "赠送项目为固定内容，不可更换或折现",
]) {
  assert(memberships.includes(term), `Missing membership term: ${term}`);
}
assert.match(membershipPage, /membershipTerms\.map/);
assert.doesNotMatch(membershipPage, /广告|Advertised|advertised/);
assert.match(anna, /image: "\/images\/hair-reduction-menu\.jpg"/);

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
    "a1359168fe4e2f29c6394963d6ea9c446c7b1fd337416c9f375d4bee3e4d766e",
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
  "Project-book update checks passed: 8 public categories, 50 source-book declarations, dedicated bilingual Head Spa menu, corrected Hair Reduction scope, membership terms and gifts, QR placements, protected assets and MaSe booking handoff.",
);
