import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { markdownToBlocks, parseSkillFrontmatter } from "../lib/markdown-blocks.mjs";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  auth,
  footer,
  header,
  login,
  portal,
  workspace,
  landingStudio,
  robots,
  env,
] =
  await Promise.all([
    read("auth.ts"),
    read("components/Footer.tsx"),
    read("components/Header.tsx"),
    read("app/(en)/marketing/login/page.tsx"),
    read("app/(en)/marketing/page.tsx"),
    read("components/MarketingPortalWorkspace.tsx"),
    read("components/LandingPageStudio.tsx"),
    read("app/robots.ts"),
    read(".env.example"),
  ]);

assert.match(auth, /hello@mendbeauty\.com\.au/);
assert.match(auth, /email_verified/);
assert.match(auth, /maxAge: 8 \* 60 \* 60/);
assert.match(auth, /prompt: "select_account"/);
assert.match(auth, /login_hint: marketingPortalEmail/);
assert.match(auth, /hd: marketingPortalEmail\.split\("@"\)\[1\]/);
assert.match(footer, /href="\/marketing"/);
assert.match(footer, /Marketing Portal/);
assert.match(header, /showLanguageSwitch = !pathname\.startsWith\("\/marketing"\)/);
assert.match(header, /\{showLanguageSwitch \? \(/);
assert.match(login, /Google verifies the account/);
assert.match(login, /role="alert"/);
assert.match(login, /Access was not granted/);
assert.match(portal, /redirect\("\/marketing\/login"\)/);
assert.match(portal, /AI can[\s\S]*cannot approve, publish/);
assert.match(workspace, /does not transmit or[\s\S]*save the text/);
assert.match(workspace, /Do not publish, approve, spend money/);
assert.match(workspace, /https:\/\/chatgpt\.com\/codex/);
assert.match(landingStudio, /Landing Page Studio/);
assert.match(landingStudio, /Service landing page/);
assert.match(landingStudio, /Promotion or offer/);
assert.match(landingStudio, /Event or open day/);
assert.match(landingStudio, /Educational SEO page/);
assert.match(landingStudio, /Seasonal campaign/);
assert.match(landingStudio, /ChatGPT/);
assert.match(landingStudio, /Codex/);
assert.match(landingStudio, /Claude/);
assert.match(landingStudio, /does not call a paid AI API/);
assert.match(landingStudio, /must not approve or publish its own work/);
assert.match(landingStudio, /thepig365\/mend-studio/);
assert.match(landingStudio, /Release Console/);
assert.match(landingStudio, /Publish approved page/);
assert.match(landingStudio, /Submit to Google/);
assert.match(landingStudio, /Verify in Analytics/);
assert.match(landingStudio, /Leon publication approval/);
assert.match(landingStudio, /Production page verified/);
assert.match(landingStudio, /disabled=\{!productionVerified\}/);
assert.match(landingStudio, /mendbeauty\.com\.au\/sitemap\.xml/);
assert.match(
  landingStudio,
  /Google[\s\S]*does not provide a general one-click indexing API/,
);
assert.match(landingStudio, /GA4[\s\S]*already tracks consented page views/);
assert.match(robots, /disallow: \["\/marketing", "\/api\/auth"\]/);
assert.match(env, /AUTH_GOOGLE_ID/);
assert.match(env, /AUTH_GOOGLE_SECRET/);

for (const source of [
  auth,
  footer,
  header,
  login,
  portal,
  workspace,
  landingStudio,
]) {
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]{20,}/);
  assert.doesNotMatch(source, /ANTHROPIC_API_KEY|OPENAI_API_KEY/);
}

console.log(
  "Marketing Portal checks passed: exact-email gate, private routes, no broken language switch, no-index controls, draft-only AI handoff, human-gated release controls, honest Search Console and GA4 handoffs, and no embedded AI credentials.",
);

const [guide, playbook] = await Promise.all([
  read("components/MarketingOperatingGuide.tsx"),
  read("lib/marketing-playbook.ts"),
]);
assert.match(workspace, /<MarketingOperatingGuide \/>/);
for (const section of ["start", "strategy", "remote", "plan", "channels", "search", "service", "review", "tools"]) {
  assert.ok(guide.includes(`id="marketing-${section}"`), `Missing handbook section: ${section}`);
}
assert.match(guide, /do not share a password/);
assert.match(guide, /Session-only/);
assert.match(guide, /not a shared database/);
assert.match(guide, /Replace task fields/);
assert.match(guide, /Cancel import/);
assert.match(guide, /file\.size > 128_000/);
assert.match(guide, /statuses\.includes/);
assert.match(guide, /beforeunload/);
assert.match(guide, /baseline not yet run/);
assert.match(playbook, /OAI-SearchBot/);
assert.match(playbook, /GPTBot/);
assert.match(playbook, /Search Console Web totals/);
assert.match(playbook, /Find me a hair studio in the Balwyn area/);
assert.match(playbook, /Rewards never replace wages/);
assert.doesNotMatch(guide, /localStorage|sessionStorage|fetch\(|dangerouslySetInnerHTML/);
for (const source of [guide, playbook]) {
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]{20,}|AUTH_GOOGLE_SECRET|OPENAI_API_KEY|ANTHROPIC_API_KEY/);
}
const taskIds = [...playbook.matchAll(/id: "([A-Z]+-\d+)"/g)].map((match) => match[1]);
assert.equal(taskIds.length, 16);
assert.equal(new Set(taskIds).size, taskIds.length);
console.log("Operating guide checks passed: public-safe handbook, 16 distinct tasks, honest session-only handoff, validated import, no automatic transmission, separate SEO/AI evidence, and unchanged access boundary.");

const [
  skillsIndex,
  skillPage,
  access,
  disclaimer,
  browser,
  groups,
  upstreamRecord,
  license,
  refreshScript,
  vendorReadme,
  sitemap,
] = await Promise.all([
  read("app/(en)/marketing/skills/page.tsx"),
  read("app/(en)/marketing/skills/[slug]/[[...doc]]/page.tsx"),
  read("lib/require-marketing-portal.ts"),
  read("components/MarketingSkillsDisclaimer.tsx"),
  read("components/MarketingSkillsBrowser.tsx"),
  read("lib/marketing-skill-groups.ts"),
  read("vendor/marketingskills/UPSTREAM.json"),
  read("vendor/marketingskills/LICENSE"),
  read("scripts/refresh-marketingskills.mjs"),
  read("vendor/marketingskills/README.md"),
  read("app/sitemap.ts"),
]);

const upstream = JSON.parse(upstreamRecord);
assert.match(upstream.commit, /^[0-9a-f]{40}$/);
assert.equal(upstream.license, "MIT");
assert.equal(upstream.repository, "https://github.com/coreyhaines31/marketingskills");
assert.match(license, /MIT License/);
assert.match(license, /Copyright \(c\) 2025 Corey Haines/);
assert.match(vendorReadme, new RegExp(upstream.commit));
assert.match(refreshScript, /Does not execute any upstream installer/);
assert.match(refreshScript, /"skills\/\*\*\/\*\.md"/);
assert.doesNotMatch(refreshScript, /npx skills add|child_process\.exec\(/);
assert.match(skillsIndex, /requireMarketingPortal/);
assert.match(skillPage, /requireMarketingPortal/);
assert.match(access, /redirect\("\/marketing\/login"\)/);
assert.doesNotMatch(access, /MARKETING_PORTAL_SCREENSHOT/);
assert.match(skillsIndex, /index: false/);
assert.match(skillPage, /index: false/);
assert.match(skillsIndex, /follow: false/);
assert.match(skillPage, /follow: false/);
assert.match(skillsIndex, /force-dynamic/);
assert.match(skillPage, /force-dynamic/);
assert.match(disclaimer, /must not be quoted as fact to customers/);
assert.match(skillsIndex, /MarketingSkillsDisclaimer/);
assert.match(skillPage, /MarketingSkillsDisclaimer/);
assert.match(workspace, /href="\/marketing\/skills"/);
assert.match(workspace, /Marketing Skills Library/);
assert.doesNotMatch(sitemap, /marketing\/skills/);
assert.match(robots, /disallow: \["\/marketing", "\/api\/auth"\]/);

const listedSlugs = [
  ...groups.matchAll(/slugs:\s*\[([\s\S]*?)\]/g),
].flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((slug) => slug[1]));
const skillDirs = await skillDirectories("vendor/marketingskills/skills");
assert.deepEqual([...listedSlugs].sort(), skillDirs);
for (const slug of ["ai-seo", "seo-audit", "schema", "directory-submissions", "copywriting", "emails", "social"]) {
  assert.ok(listedSlugs.includes(slug), slug);
  assert.equal(await fileExists(`vendor/marketingskills/skills/${slug}/SKILL.md`), true);
}
assert.equal(await fileExists("vendor/marketingskills/skills/seo-audit/references/local-seo.md"), true);
await assertMarkdownOnly("vendor/marketingskills/skills");

const aiSeo = await read("vendor/marketingskills/skills/ai-seo/SKILL.md");
const frontmatter = parseSkillFrontmatter(aiSeo);
assert.equal(frontmatter.data.name, "ai-seo");
const blocks = markdownToBlocks(aiSeo, {
  resolveHref: (href) =>
    href.startsWith("references/")
      ? `/marketing/skills/ai-seo/${href.replace(/\.md$/, "")}`
      : href.startsWith("javascript:")
        ? null
        : href,
});
assert.ok(blocks.some((block) => block.type === "heading" && block.level === 1));
assert.ok(blocks.some((block) => block.type === "table" && block.rows.length > 0));
assert.match(JSON.stringify(blocks), /\/marketing\/skills\/ai-seo\/references\/agent-readiness/);

for (const source of [skillsIndex, skillPage, disclaimer, browser, groups, access]) {
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]{20,}|AUTH_GOOGLE_SECRET|OPENAI_API_KEY|ANTHROPIC_API_KEY|dangerouslySetInnerHTML/);
}
console.log(
  `Marketing skills library checks passed: ${skillDirs.length} skills pinned at ${upstream.commit}, MIT licence retained, auth and noindex on library routes, sitemap unchanged, and ai-seo markdown renders.`,
);

async function skillDirectories(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function fileExists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}

async function assertMarkdownOnly(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) await assertMarkdownOnly(full);
    else assert.ok(entry.name.endsWith(".md"), `${full} is not vendored markdown`);
  }
}
