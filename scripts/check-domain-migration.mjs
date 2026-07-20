import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const canonicalHost = "https://mendbeauty.com.au";
const oldHost = "mendbeauty" + "studio.com.au";
const expectedRoutes = [
  "/",
  "/services",
  "/services/hair",
  "/services/head-spa",
  "/services/skin-facial",
  "/services/body-care",
  "/services/brows-lashes",
  "/services/mens-grooming",
  "/services/nails",
  "/services/semi-permanent",
  "/gift-cards",
  "/memberships",
  "/careers",
  "/contact",
  "/policies",
];

async function read(path) {
  return readFile(join(root, path), "utf8");
}

const site = await read("lib/site.ts");
const seo = await read("lib/seo.ts");
const robots = await read("app/robots.ts");
const sitemap = await read("app/sitemap.ts");
const packageJson = JSON.parse(await read("package.json"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(site.includes(`url: "${canonicalHost}"`), "site.url must use the canonical host");
assert(site.includes('phone: "0499 66 88 99"'), "display phone must be standardized");
assert(site.includes('phoneHref: "tel:+61499668899"'), "telephone URI must be standardized");
assert(!site.includes(oldHost), "site.ts still contains an old-domain reference");
assert(seo.includes("const canonical = path === \"/\" ? site.url : `${site.url}${path}`"), "SEO canonical helper must derive from site.url");
assert(robots.includes("${site.url}/sitemap.xml"), "robots.txt must derive sitemap URL from site.url");
assert(sitemap.includes("${site.url}${path}"), "sitemap locations must derive from site.url");

const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".next", "node_modules"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk(root);
for (const path of files) {
  const text = await readFile(path, "utf8");
  assert(!text.includes(oldHost), `old-domain reference found in ${relative(root, path)}`);
}

const listedRoutes = expectedRoutes.filter((route) => {
  const path = route === "/" ? "{ path: \"\", priority:" : `{ path: "${route}", priority:`;
  return sitemap.includes(path);
});
assert(listedRoutes.length === expectedRoutes.length, `sitemap route coverage is incomplete (${listedRoutes.length}/${expectedRoutes.length})`);
assert(packageJson.scripts["check:domain"] === "node scripts/check-domain-migration.mjs", "domain check script is not registered");

console.log(`Domain migration checks passed: ${expectedRoutes.length} routes, canonical host ${canonicalHost}, no old-domain references.`);
