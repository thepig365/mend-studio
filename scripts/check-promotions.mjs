import assert from "node:assert/strict";

// Run against a production build or deployment: node scripts/check-promotions.mjs URL
const base = process.argv[2] || "http://127.0.0.1:3191";
const origin = "https://mendbeauty.com.au";
const englishPaths = ["/promotions", "/promotions/first-hair-visit"];
const paths = englishPaths.flatMap((path) => [path, `/zh${path}`]);
const serviceAnchors = [
  "menu-ladies-signature-cut", "menu-signature-colour", "service-signature-balayage",
  "menu-wash-blow-dry", "menu-classic-texture-perm", "menu-hydra-hair-ritual",
];
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map((attr) => [attr[1].toLowerCase(), attr[2]])));
const textOnly = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const get = (path, options = {}) => fetch(new URL(path, base), { signal: AbortSignal.timeout(20000), ...options });

for (const path of paths) {
  const chinese = path.startsWith("/zh/");
  const englishPath = chinese ? path.slice(3) : path;
  const otherPath = chinese ? englishPath : `/zh${path}`;
  const response = await get(path);
  assert.equal(response.status, 200, `${path}: HTTP health`);
  assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i);
  const html = await response.text();
  const text = textOnly(html);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`), `${path}: self canonical`);
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i);
  assert.equal(tags(html, "html")[0].lang, chinese ? "zh-Hans" : "en-AU");
  const alternates = tags(html, "link").filter((link) => link.rel === "alternate");
  for (const [language, target] of [["en-AU", englishPath], ["zh-Hans", `/zh${englishPath}`], ["x-default", englishPath]]) {
    assert.ok(alternates.some((link) => link.hreflang === language && link.href === `${origin}${target}`), `${path}: ${language} alternate`);
  }
  const links = tags(html, "a");
  assert.ok(links.some((link) => link.href === otherPath && link.hreflang === (chinese ? "en-AU" : "zh-Hans")), `${path}: equivalent-page language switch`);
  if (path.endsWith("/first-hair-visit")) {
    const hairPath = chinese ? "/zh/services/hair" : "/services/hair";
    const hair = await get(hairPath);
    assert.equal(hair.status, 200, `${path}: hair service destination resolves`);
    const hairHtml = await hair.text();
    for (const anchor of serviceAnchors) {
      assert.equal((hairHtml.match(new RegExp(`id="${anchor}"`, "g")) || []).length, 1, `${hairPath}: unique ${anchor} target`);
      assert.equal(links.filter((link) => link.href === `${hairPath}#${anchor}`).length, 2, `${path}: service card and dialog both link to ${anchor}`);
    }
    assert.match(html, /font-display text-4xl font-medium leading-\[1\.1\]/, `${path}: shared Hero heading scale`);
    assert.match(html, /class="btn-gold"/, `${path}: shared booking button`);
  }
  assert.match(text, /50% off/i);
  if (chinese) {
    assert.match(text, /新客首次到店，所有美发服务项目均享五折（50% off）。/);
    assert.match(text, /优惠不适用于美容、身体护理等其他服务及零售产品。/);
    assert.doesNotMatch(text, /预览|演示|概念|未批准|自动折扣|优惠码|注册|订阅|最低消费|有效期/);
    for (const link of links.filter((link) => link.href?.startsWith("/"))) {
      assert.ok(link.href === otherPath || link.href === "/zh" || link.href.startsWith("/zh/"), `${path}: same-language navigation ${link.href}`);
    }
  } else {
    assert.match(text, /All hair service items for new clients on their first visit\./);
    assert.match(text, /Beauty and body services, and retail products, are not included\./);
  }
  assert.doesNotMatch(text, /preview|prototype|concept|demo|not approved|\$20|15%|minimum spend|expires|expiry|sign up|subscribe/i);
  assert.doesNotMatch(html, /<(?:form|input|select)\b/i, `${path}: no unsupported data collection`);
  assert.match(html, /mend-supplied-logo\.png/);
  assert.ok(links.some((link) => link.href === (chinese ? "/zh/book" : "/book")));
  assert.match(html, /tel:\+61499668899/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
  assert.equal(breadcrumb.itemListElement.at(-1).item, `${origin}${path}`);
  assert.equal(tags(html, "meta").find((meta) => meta.property === "og:locale").content, chinese ? "zh_CN" : "en_AU");
}

const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 44, "40 existing URLs plus four bilingual promotion URLs");
assert.equal(new Set(urls).size, urls.length, "No duplicate sitemap URLs");
for (const path of paths) assert.ok(urls.includes(`${origin}${path}`));
for (const path of paths) {
  const block = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((match) => match[1].includes(`<loc>${origin}${path}</loc>`))?.[1];
  assert.ok(block, `${path}: sitemap entry`);
  for (const language of ["en-AU", "zh-Hans", "x-default"]) assert.ok(block.includes(`hreflang="${language}"`));
}
for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await get(path);
  assert.equal(response.status, 200, `${path}: sitemap URL resolves`);
}
for (const path of ["/", "/services/hair", "/zh", "/zh/services/hair"]) {
  const html = await (await get(path)).text();
  assert.ok(tags(html, "a").some((link) => link.href === (path.startsWith("/zh") ? "/zh/promotions" : "/promotions")), `${path}: same-language footer link`);
}
for (const bookingPath of ["/book", "/zh/book"]) {
const book = await get(bookingPath, { redirect: "manual" });
assert.ok([307, 308].includes(book.status), "Existing booking redirect");
const destination = new URL(book.headers.get("location"));
assert.equal(destination.origin, "https://clients.mase.cloud");
assert.equal(destination.pathname, "/shopDetail");
assert.equal(destination.searchParams.get("custId"), "MENDBEAUTY");
assert.equal(destination.searchParams.get("compId"), "579514834843697153");
}
const logo = await get("/images/mend-supplied-logo.png");
assert.equal(logo.status, 200);
assert.match(logo.headers.get("content-type"), /image\/png/);
assert.ok((await logo.arrayBuffer()).byteLength > 100000, "Supplied logo served");
console.log("Promotions checks passed: four bilingual promotion pages, correct languages and reciprocal alternates, translated approved terms, no demo or signup controls, 44 sitemap URLs HTTP 200, same-language links, six unique service detail anchors per language with linked cards and dialog entries, shared Hero/button styles, supplied logo and both unchanged MaSe booking destinations.");
