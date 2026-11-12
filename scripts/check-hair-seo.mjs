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
  assert.match(h1, prefix ? /韩式美发/ : /Korean Hairdresser &(?:amp;)? Hair Salon near Balwyn/);
  assert.match(h1, /Deepdene/);
  assert.match(h1, prefix ? /门店/ : /Whitehorse Road/);
  assert.match(text, /Hair Atelier/);
  assert.match(text, prefix ? /提供中文服务/ : /Service available in English and Chinese/);
  assert.match(text, /Balwyn North/);
  assert.match(html.match(/<title>(.*?)<\/title>/)?.[1], prefix ? /韩式美发/ : /Korean Hair Salon, Deepdene · Whitehorse Rd/);
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
function jsonBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}
function areaServedNodes(value, found = []) {
  if (!value || typeof value !== "object") return found;
  if (Array.isArray(value)) {
    for (const item of value) areaServedNodes(item, found);
    return found;
  }
  if (Object.prototype.hasOwnProperty.call(value, "areaServed")) found.push(value);
  for (const item of Object.values(value)) areaServedNodes(item, found);
  return found;
}
const faqExpectations = {
  "/services/hair": ["Do you offer Korean perms or digital perms?", "Do you offer keratin smoothing or straightening?", "Where on Whitehorse Road is the salon?"],
  "/zh/services/hair": ["有韩式烫发或数码烫吗？", "有角蛋白顺滑护理或离子烫吗？", "门店在 Whitehorse Road 哪里？"],
  "/services/head-spa": ["Is a head spa the same as a hair spa or scalp spa?", "What is included in the Korean Signature Head Spa?"],
  "/zh/services/head-spa": ["韩式经典头疗包括什么？", "头疗店在哪里？"],
  "/services/hair-scalp-recovery": ["Can I book a scalp analysis?", "Do you offer a scalp detox?"],
  "/zh/services/hair-scalp-recovery": ["可以做头皮检测吗？"],
  "/services/mens-grooming": ["How much is a men’s haircut?", "Do you offer men’s grooming packages?", "Are you a barber?"],
  "/zh/services/mens-grooming": ["男士剪发多少钱？", "有男士理容组合吗？"],
  "/services/skin-facial": ["Which Korean facials are on the menu?"],
  "/zh/services/skin-facial": ["有哪些韩式皮肤管理项目？"],
};
for (const [path, questions] of Object.entries(faqExpectations)) {
  const html = await page(path);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path} has one H1`);
  const visible = html.slice(html.indexOf('id="service-faq"'), html.indexOf("</section>", html.indexOf('id="service-faq"')));
  for (const question of questions) assert.ok(visible.includes(question), `${path} shows FAQ: ${question}`);
  const blocks = jsonBlocks(html);
  const faq = blocks.find((schema) => schema["@type"] === "FAQPage");
  assert.ok(faq, `${path} has one FAQPage object`);
  const names = faq.mainEntity.map((entity) => entity.name);
  const decode = (value) => value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"');
  for (const question of questions) {
    assert.ok(names.includes(question), `${path} FAQ schema includes ${question}`);
    const entity = faq.mainEntity.find((item) => item.name === question);
    const shown = decode(visible.slice(visible.indexOf(question)).match(/<dd[^>]*>([\s\S]*?)<\/dd>/)?.[1] ?? "");
    assert.equal(shown.trim(), entity.acceptedAnswer.text, `${path} FAQ schema matches visible answer for ${question}`);
  }
  const served = areaServedNodes(blocks);
  assert.equal(served.length, 1, `${path} declares areaServed once`);
  assert.equal(served[0].areaServed.length, 8, `${path} business areaServed keeps the eight suburbs`);
  assert.ok(served[0]["@type"]?.includes?.("HairSalon") || (Array.isArray(served[0]["@type"]) && served[0]["@type"].includes("HairSalon")), `${path} areaServed sits on the business entity`);
  const english = path.replace(/^\/zh/, "") || "/";
  const chinese = `/zh${english}`;
  for (const [lang, expected] of [["en-AU", english], ["zh", chinese], ["x-default", english]]) {
    assert.ok(attrs(html, "link").some((link) => link.rel === "alternate" && link.hreflang === lang && link.href === `${origin}${expected}`), `${path} hreflang ${lang}`);
  }
  assert.ok(attrs(html, "link").some((link) => link.rel === "canonical" && link.href === `${origin}${path}`), `${path} canonical`);
}
for (const [path, html] of cache) {
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.doesNotMatch(visible, /\bin Balwyn\b/, `${path} must not say the studio is in Balwyn`);
  assert.doesNotMatch(visible, /华人理发/, `${path} does not use 华人理发`);
  assert.match(html, /"name":"Balwyn North VIC"/, `${path} keeps Balwyn North in the business areaServed schema`);
}
console.log("Hair SEO checks passed: bilingual metadata/H1, seven-area local guide with real Deepdene address, early visit/care navigation, same-language Head Spa/scalp links, colour/texture detail links, homepage hair entry, six menu shortcuts, approved studio/stylist imagery, profile links/schema, canonicals and language alternates.");
