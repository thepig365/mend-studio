import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [copy, page, feature, englishRoute, chineseRoute, hairRoute, chinesePages, sitemap, i18n] =
  await Promise.all([
    read("lib/mejin-profile.ts"),
    read("components/MejinProfilePage.tsx"),
    read("components/MejinProfileFeature.tsx"),
    read("app/(en)/team/mejin-shick/page.tsx"),
    read("app/(zh)/zh/team/mejin-shick/page.tsx"),
    read("app/(en)/services/hair/page.tsx"),
    read("app/(zh)/zh/[[...slug]]/page.tsx"),
    read("app/sitemap.ts"),
    read("lib/i18n.ts"),
  ]);

const englishCopy = copy.split('"en-AU": {')[1]?.split('"zh-Hans": {')[0] ?? "";
assert.ok(englishCopy, "English Mejin copy block is missing");
assert.doesNotMatch(englishCopy, /[\u3400-\u9fff]/, "English Mejin copy contains Chinese text");
assert.match(copy, /拥有超过 25 年专业美发经验/);
assert.match(copy, /超过二十五年的美发经验/);
assert.match(copy, /自然效果拉直/);
assert.match(copy, /Mejin Shick｜资深设计师/);
assert.match(copy, /她希望每一次改变/);
assert.match(copy, /2000 · 专业启程/);
assert.match(copy, /2001–2005 · 技术沉淀/);
assert.match(copy, /2017–至今 · Melbourne Chapter/);
assert.doesNotMatch(copy, /2001 年 — 在吉隆坡云南头皮护理连锁店/);
assert.match(page, /"@type": "ProfilePage"/);
assert.match(page, /worksFor/);
assert.match(page, /mejinImages\.chinesePoster/);
assert.doesNotMatch(page, /mejinImages\.gallery/);
assert.match(englishRoute, /path: "\/team\/mejin-shick"/);
assert.match(chineseRoute, /chinesePageMetadata/);
assert.match(hairRoute, /MejinProfileFeature/);
assert.match(chinesePages, /slug === "hair"/);
assert.match(feature, /\/zh\/team\/mejin-shick/);
assert.match(sitemap, /\/team\/mejin-shick/);
assert.match(i18n, /\/team\/mejin-shick/);

await Promise.all(
  [
    "mejin-professional-portrait.png",
    "mejin-chinese-profile-poster.png",
  ].map((filename) =>
    access(
      new URL(`../public/images/team/mejin-shick/${filename}`, import.meta.url),
    ),
  ),
);

console.log(
  "Mejin profile checks passed: separate English and Chinese content, senior-designer wording, profile schema, bilingual routes, Hair-page discovery, sitemap coverage and approved professional imagery.",
);
