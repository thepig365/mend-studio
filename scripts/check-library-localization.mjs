import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import ts from "typescript";
import { firstHeading, parseSkillFrontmatter } from "../lib/markdown-blocks.mjs";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
// Execute the actual pure TypeScript helpers, without requiring a TS loader.
async function loadTypeScript(file) {
  const { outputText } = ts.transpileModule(await read(file), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { skillChinese, categoryChinese, reasonChinese, guideChinese, matchesMarketingSkill } =
  await loadTypeScript("lib/marketing-skills-zh.ts");
const { skillCategories, mendHighlights } = await loadTypeScript("lib/marketing-skill-groups.ts");
const slugs = (await readdir(new URL("../vendor/marketingskills/skills/", import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
assert.equal(slugs.length, 53, "Pinned library must retain all 53 skills");
assert.deepEqual(Object.keys(skillChinese).sort(), slugs, "Every skill needs Chinese display copy");
const cards = [];
for (const slug of slugs) {
  const copy = skillChinese[slug];
  assert.equal(copy.length, 2, `${slug}: title and description required`);
  for (const value of copy) assert.match(value, /\p{Script=Han}/u, `${slug}: Chinese copy required`);
  const raw = await read(`vendor/marketingskills/skills/${slug}/SKILL.md`);
  const { data } = parseSkillFrontmatter(raw);
  const category = skillCategories.find((item) => item.slugs.includes(slug));
  const highlight = mendHighlights.find((item) => item.slug === slug);
  const card = {
    slug, title: firstHeading(raw), summary: data.description,
    categoryTitle: category?.title ?? "Other", highlightLabel: highlight?.label ?? null,
    reason: highlight?.reason ?? null, guides: highlight?.guides ?? [],
  };
  cards.push(card);
  assert.ok(matchesMarketingSkill(card, copy[0]), `${slug}: Chinese title search`);
  assert.ok(matchesMarketingSkill(card, copy[1]), `${slug}: Chinese description search`);
  assert.ok(matchesMarketingSkill(card, card.title), `${slug}: English title search`);
  assert.ok(matchesMarketingSkill(card, `  ${slug.toUpperCase()}  `), `${slug}: normalized slug search`);
  assert.ok(matchesMarketingSkill(card, "  "), `${slug}: empty search preserves every result`);
  assert.ok(!matchesMarketingSkill(card, "__no_matching_skill_7391__"), `${slug}: no-match search`);
  if (highlight) {
    assert.match(reasonChinese[slug], /\p{Script=Han}/u);
    assert.ok(matchesMarketingSkill(card, reasonChinese[slug]), `${slug}: Chinese relevance search`);
  }
}
for (const category of skillCategories) {
  assert.ok(categoryChinese[category.id]?.every((value) => /\p{Script=Han}/u.test(value)));
  const expected = cards.filter((card) => category.slugs.includes(card.slug)).map((card) => card.slug);
  const actual = cards.filter((card) => matchesMarketingSkill(card, categoryChinese[category.id][0])).map((card) => card.slug);
  for (const slug of expected) assert.ok(actual.includes(slug), `${category.id}: category search includes ${slug}`);
  // Isolate category matching from legitimate keyword matches in titles/descriptions.
  for (const other of skillCategories) {
    const synthetic = { slug: "unknown-test-skill", title: "Example", summary: "Example",
      categoryTitle: other.title, highlightLabel: null, reason: null, guides: [] };
    assert.equal(matchesMarketingSkill(synthetic, categoryChinese[category.id][0]), other.id === category.id,
      `${category.id}: unrelated category metadata must not leak into search`);
  }
}
const seo = cards.find((card) => card.slug === "seo-audit");
for (const guide of seo.guides) {
  assert.ok(guideChinese[guide.label], `Missing guide translation: ${guide.label}`);
  assert.ok(matchesMarketingSkill(seo, guideChinese[guide.label]));
  assert.ok(matchesMarketingSkill(seo, guide.label));
}
const browser = await read("components/MarketingSkillsBrowser.tsx");
assert.equal((browser.match(/matchesMarketingSkill\(skill, needle\)/g) ?? []).length, 2,
  "Both highlights and category results must use the tested bilingual helper");
assert.match(browser, /href=\{`\/marketing\/skills\/\$\{skill\.slug\}`\}/);
assert.match(browser, /href=\{`#skill-category-\$\{category\.id\}`\}/);
assert.match(browser, /id=\{`skill-category-\$\{category\.id\}`\}/);
assert.match(browser, /aria-labelledby=\{`skill-category-heading-\$\{category\.id\}`\}/);
assert.match(browser, /id=\{`skill-category-heading-\$\{category\.id\}`\}/);
assert.match(browser, /htmlFor="skill-search"/);
assert.match(browser, /id="skill-search"/);
assert.match(browser, /href=\{guide\.href\}/);
const document = await read("app/(en)/marketing/skills/[slug]/[[...doc]]/page.tsx");
assert.match(document, /await requireMarketingPortal\(\)/);
assert.match(document, /href=\{`\/marketing\/skills\/\$\{document\.slug\}`\}/);
assert.match(document, /markdown=\{document\.markdown\}/);
assert.match(document, /<article lang="en"/);
assert.match(document, /Third-party source text · Original English/);
console.log("Library localization checks passed: 53 bilingual titles/descriptions, bilingual search and category isolation, relevance and guide search, stable routes/IDs, and labelled original English documents.");
