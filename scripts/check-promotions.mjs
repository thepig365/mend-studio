import assert from "node:assert/strict";

// Run against a production build or deployment: node scripts/check-promotions.mjs URL
const base = process.argv[2] || "http://127.0.0.1:3191";
const origin = "https://mendbeauty.com.au";
const paths = ["/promotions", "/promotions/first-hair-visit"];
const textOnly = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const get = (path, options = {}) => fetch(new URL(path, base), { signal: AbortSignal.timeout(20000), ...options });

for (const path of paths) {
  const response = await get(path);
  assert.equal(response.status, 200, `${path}: HTTP health`);
  assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i);
  const html = await response.text();
  const text = textOnly(html);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: self canonical`);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i);
  assert.doesNotMatch(html, /<link[^>]+hrefLang=/i, `${path}: no nonexistent translation`);
  assert.match(text, /50% off/i);
  assert.match(text, /All hair service items for new clients on their first visit\./);
  assert.match(text, /Beauty and body services, and retail products, are not included\./);
  assert.doesNotMatch(text, /preview|prototype|concept|demo|not approved|\$20|15%|minimum spend|expires|expiry|sign up|subscribe/i);
  assert.doesNotMatch(html, /<(?:form|input|select)\b/i, `${path}: no unsupported data collection`);
  assert.match(html, /mend-supplied-logo\.png/);
  assert.match(html, /href="\/book"/);
  assert.match(html, /tel:\+61499668899/);
  assert.match(html, /BreadcrumbList/);
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 42, "40 existing bilingual URLs plus two English promotions");
assert.equal(new Set(urls).size, urls.length, "No duplicate sitemap URLs");
for (const path of paths) assert.ok(urls.includes(`${origin}${path}`));
assert.ok(!urls.some((url) => url.includes("/zh/promotions")));
for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await get(path);
  assert.equal(response.status, 200, `${path}: sitemap URL resolves`);
}
for (const path of ["/", "/services/hair", "/zh", "/zh/services/hair"]) {
  const html = await (await get(path)).text();
  assert.match(html, /href="\/promotions"/, `${path}: footer discovers promotions`);
}
const book = await get("/book", { redirect: "manual" });
assert.ok([307, 308].includes(book.status), "Existing booking redirect");
const destination = new URL(book.headers.get("location"));
assert.equal(destination.origin, "https://clients.mase.cloud");
assert.equal(destination.pathname, "/shopDetail");
assert.equal(destination.searchParams.get("custId"), "MENDBEAUTY");
assert.equal(destination.searchParams.get("compId"), "579514834843697153");
const logo = await get("/images/mend-supplied-logo.png");
assert.equal(logo.status, 200);
assert.match(logo.headers.get("content-type"), /image\/png/);
assert.ok((await logo.arrayBuffer()).byteLength > 100000, "Supplied logo served");
console.log("Promotions checks passed: two scoped offers pages, canonical metadata, approved terms, no demo or signup controls, 42 sitemap URLs HTTP 200, footer links, supplied logo and unchanged MaSe booking destination.");
