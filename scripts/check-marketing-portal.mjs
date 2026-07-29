import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [auth, footer, login, portal, workspace, landingStudio, robots, env] =
  await Promise.all([
    read("auth.ts"),
    read("components/Footer.tsx"),
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
assert.match(footer, /href="\/marketing"/);
assert.match(footer, /Marketing Portal/);
assert.match(login, /Google verifies the account/);
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
assert.match(robots, /disallow: \["\/marketing", "\/api\/auth"\]/);
assert.match(env, /AUTH_GOOGLE_ID/);
assert.match(env, /AUTH_GOOGLE_SECRET/);

for (const source of [auth, footer, login, portal, workspace, landingStudio]) {
  assert.doesNotMatch(source, /sk-[A-Za-z0-9_-]{20,}/);
  assert.doesNotMatch(source, /ANTHROPIC_API_KEY|OPENAI_API_KEY/);
}

console.log(
  "Marketing Portal checks passed: exact-email gate, private routes, no-index controls, draft-only AI handoff, Landing Page Studio safeguards, and no embedded AI credentials.",
);
