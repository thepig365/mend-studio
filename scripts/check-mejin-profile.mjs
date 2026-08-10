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
assert.match(copy, /超过二十五年的美发经验/);
assert.match(copy, /自然效果拉直/);
assert.match(page, /"@type": "ProfilePage"/);
assert.match(page, /worksFor/);
assert.match(englishRoute, /path: "\/team\/mejin-shick"/);
assert.match(chineseRoute, /chinesePageMetadata/);
assert.match(hairRoute, /MejinProfileFeature/);
assert.match(chinesePages, /slug === "hair"/);
assert.match(feature, /\/zh\/team\/mejin-shick/);
assert.match(sitemap, /\/team\/mejin-shick/);
assert.match(i18n, /\/team\/mejin-shick/);

await Promise.all(
  [
    "mejin-portrait.jpeg",
    "creative-colour.jpeg",
    "warm-short-style.jpeg",
    "textured-short-style.jpeg",
    "copper-short-style.jpeg",
  ].map((filename) =>
    access(
      new URL(`../public/images/team/mejin-shick/${filename}`, import.meta.url),
    ),
  ),
);

console.log(
  "Mejin profile checks passed: separate English and Chinese content, profile schema, bilingual routes, Hair-page discovery, sitemap coverage and five supplied photographs.",
);
