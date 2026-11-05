import assert from "node:assert/strict";

const base = process.argv[2] || "http://127.0.0.1:3191";
const origin = "https://mendbeauty.com.au";
const cache = new Map();
async function page(path) {
  if (cache.has(path)) return cache.get(path);
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${path}: HTTP health`);
  assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i);
  const html = await response.text();
  cache.set(path, html);
  return html;
}
const attrs = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map((match) => Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map((attribute) => [attribute[1].toLowerCase(), attribute[2]])));
const plain = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
for (const prefix of ["", "/zh"]) {
  const path = `${prefix}/services/hair`;
  const html = await page(path);
  const text = plain(html);
  const h1 = html.match(/<h1\b[^>]*>(.*?)<\/h1>/)?.[1];
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(h1, /Hair Atelier/);
  assert.match(h1, /Deepdene/);
  assert.match(h1, /Balwyn/);
  assert.match(html.match(/<title>(.*?)<\/title>/)?.[1], prefix ? /Balwyn 及 Deepdene 美发沙龙与理发师/ : /Hairdresser Balwyn &(?:amp;)? Deepdene/);
  assert.match(text, /74 Whitehorse Road/);
  assert.ok(attrs(html, "link").some((a) => a.rel === "canonical" && a.href === `${origin}${path}`));
  for (const [lang, target] of [["en-AU", "/services/hair"], ["zh", "/zh/services/hair"], ["x-default", "/services/hair"]]) {
    assert.ok(attrs(html, "link").some((a) => a.hreflang === lang && a.href === `${origin}${target}`));
  }
  assert.equal(attrs(html, "html")[0].lang, prefix ? "zh-Hans" : "en-AU");
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i);
  const menuStart = html.indexOf('id="hair-menu"');
  const firstSection = html.indexOf('id="menu-mend-ai-scalp-analysis"');
  assert.ok(menuStart > 0 && menuStart < firstSection, "Hair menu navigation precedes the unchanged service list");
  const menuIntro = html.slice(menuStart, firstSection);
  const menuLinks = attrs(menuIntro, "a").filter((a) => /^#(?:menu|service)-/.test(a.href || ""));
  assert.equal(menuLinks.length, 6);
  for (const target of ["#hair-visit", "#hair-care-options"]) {
    assert.ok(attrs(menuIntro, "a").some((a) => a.href === target), `${path}: visit/care guide is discoverable before the long menu`);
    assert.equal((html.match(new RegExp(`id="${target.slice(1)}"`, "g")) || []).length, 1, `${path}: unique guide destination`);
  }
  assert.ok(attrs(menuIntro, "a").some((a) => a.href === "#meet-mejin"), "Stylist discovery is available before the full menu");
  assert.equal((html.match(/id="meet-mejin"/g) || []).length, 1, "Unique stylist section target");
  assert.match(html.slice(0, menuStart), /mend-beauty-salon-interior-1\.png/, "Hair hero uses the existing studio image");
  assert.doesNotMatch(html.slice(0, menuStart), /images\.unsplash\.com/, "Hair hero no longer uses a stock salon");
  const visitStart = html.indexOf('<section id="hair-visit"');
  assert.ok(visitStart > firstSection, "Local visiting guide follows the menu");
  const visit = html.slice(visitStart, html.indexOf("</section>", visitStart));
  const visitText = plain(visit);
  for (const suburb of ["Deepdene", "Canterbury", "Surrey Hills", "Balwyn", "Kew", "Camberwell", "Mont Albert"]) {
    assert.ok(visitText.includes(suburb), `${path}: seven-area context appears in the visible visiting guide`);
  }
  assert.match(visitText, prefix ? /所有预约服务均在 Deepdene 门店进行/ : /All appointments take place at our Deepdene studio/, "Nearby areas are visitor catchments, not branches");
  assert.doesNotMatch(visitText, /(?:5|five)\s*(?:km|kilometres)|free parking|免费停车/i, "No unsupported distance or parking claims");
  assert.match(visitText, prefix ? /并非医疗诊断或治疗/ : /not medical diagnosis or treatment/, "Care distinction retains cosmetic scope");
  assert.match(visitText, prefix ? /营业时间与联系信息/ : /opening hours and contact details/, "Visit planning points to maintained hours");
  const links = [...menuLinks, ...attrs(visit, "a")];
  for (const link of links) {
    if (!link.href?.startsWith("/") && !link.href?.startsWith("#")) continue;
    const target = new URL(link.href, `${origin}${path}`);
    const targetHtml = target.pathname === path ? html : await page(target.pathname);
    if (target.hash) {
      const id = target.hash.slice(1);
      assert.equal((targetHtml.match(new RegExp(`id="${id}"`, "g")) || []).length, 1, `${path}: unique destination ${target.pathname}${target.hash}`);
    }
  }
  for (const target of [`${prefix}/contact`, `${prefix}/services/head-spa`, `${prefix}/services/hair-scalp-recovery`, `${prefix}/promotions/first-hair-visit`]) assert.ok(links.some((link) => link.href === target));
  for (const anchor of ["menu-signature-colour", "menu-classic-texture-perm"]) assert.ok(links.some((link) => link.href === `#${anchor}`), "Local guide connects to existing colour and texture service details");
  const home = await page(prefix || "/");
  assert.match(home, prefix ? /Balwyn 附近理发（Deepdene）：剪发、染发与造型/ : /Hairdresser near Balwyn &(?:amp;)? Deepdene — haircuts, colour and styling/, "Homepage offers a descriptive hair-service entry point");
  assert.ok(attrs(home, "a").some((link) => link.href === path));
  assert.doesNotMatch(home, /Balwyn salon interior/, "Studio imagery identifies the real Deepdene location");
  assert.ok(attrs(html, "a").some((link) => link.href === `${prefix}/team/mejin-shick`), "Existing practitioner profile preserved");
  assert.match(html, /service-korean-soft-wave/);
  assert.match(html, /service-signature-balayage/);
  const profile = await page(`${prefix}/team/mejin-shick`);
  for (const source of [html, profile]) {
    assert.match(source, /mejin-professional-portrait\.png/, "Approved portrait retained");
    const start = source.indexOf('id="mejin-services"');
    assert.ok(start > 0, "Related services appear with the stylist introduction");
    const serviceLinks = attrs(source.slice(start, source.indexOf("</nav>", start)), "a");
    assert.equal(serviceLinks.length, 4);
    for (const link of serviceLinks) {
      const target = new URL(link.href, origin);
      assert.equal(target.pathname, path, "Stylist services preserve the reader's language");
      assert.equal((html.match(new RegExp(`id="${target.hash.slice(1)}"`, "g")) || []).length, 1, "Stylist link reaches a unique existing menu item");
    }
    assert.doesNotMatch(source, /copper-short-style|creative-colour\.jpeg|textured-short-style|warm-short-style/, "Previously removed gallery remains excluded");
  }
  const schemas = [...profile.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((schema) => schema["@type"] === "ProfilePage" && schema.mainEntity?.name === "Mejin Shick"), "Existing named profile schema preserved");
  assert.doesNotMatch(JSON.stringify(schemas), /AggregateRating|"@type":"Review"/, "No unsupported review or rating schema");
}
for (const path of [
  "/services/head-spa",
  "/services/hair-scalp-recovery",
  "/services/skin-facial",
  "/services/body-care",
  "/zh/services/head-spa",
  "/zh/services/hair-scalp-recovery",
  "/zh/services/skin-facial",
  "/zh/services/body-care",
]) {
  const html = await page(path);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
  const h1 = html.match(/<h1\b[^>]*>(.*?)<\/h1>/)?.[1] ?? "";
  assert.match(title, /Balwyn/, `${path} title includes Balwyn`);
  assert.match(title, /Deepdene/, `${path} title includes Deepdene`);
  assert.match(h1, /Balwyn/, `${path} H1 includes Balwyn`);
  assert.match(h1, /Deepdene/, `${path} H1 includes Deepdene`);
}
for (const path of ["/contact", "/zh/contact", "/"]) {
  const html = await page(path);
  if (path.endsWith("contact")) {
    assert.equal((html.match(/id="getting-here"/g) || []).length, 1, `${path} includes #getting-here`);
  }
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const business = blocks.find((schema) => {
    if (!schema || Array.isArray(schema) || !schema.address) return false;
    const type = schema["@type"];
    const types = Array.isArray(type) ? type : [type];
    return types.includes("HairSalon");
  });
  assert.equal(business?.address?.addressLocality, "Deepdene", `${path} JSON-LD address stays in Deepdene`);
}
for (const [path, html] of cache) {
  assert.doesNotMatch(html, /\bin Balwyn\b/, `${path} must not say the studio is in Balwyn`);
}
console.log("Hair SEO checks passed: bilingual metadata/H1, seven-area local guide with real Deepdene address, early visit/care navigation, same-language Head Spa/scalp links, colour/texture detail links, homepage hair entry, six menu shortcuts, approved studio/stylist imagery, profile links/schema, canonicals and language alternates.");
