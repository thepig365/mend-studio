import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

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
