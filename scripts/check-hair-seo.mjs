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
  assert.match(html.match(/<title>(.*?)<\/title>/)?.[1], prefix ? /Deepdene 美发沙龙与理发师/ : /Hairdresser in Deepdene/);
  assert.match(text, /74 Whitehorse Road/);
  for (const suburb of ["Balwyn", "Surrey Hills", "Kew", "Camberwell", "Canterbury"]) assert.ok(text.includes(suburb), `${path}: useful nearby-suburb context`);
  assert.ok(attrs(html, "link").some((a) => a.rel === "canonical" && a.href === `${origin}${path}`));
  for (const [lang, target] of [["en-AU", "/services/hair"], ["zh-Hans", "/zh/services/hair"], ["x-default", "/services/hair"]]) {
    assert.ok(attrs(html, "link").some((a) => a.hreflang === lang && a.href === `${origin}${target}`));
  }
  assert.equal(attrs(html, "html")[0].lang, prefix ? "zh-Hans" : "en-AU");
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/i);
  const menuStart = html.indexOf('id="hair-menu"');
  const firstSection = html.indexOf('id="menu-mend-ai-scalp-analysis"');
  assert.ok(menuStart > 0 && menuStart < firstSection, "Hair menu navigation precedes the unchanged service list");
  const menuLinks = attrs(html.slice(menuStart, firstSection), "a").filter((a) => a.href?.startsWith("#"));
  assert.equal(menuLinks.length, 6);
  const visitStart = html.indexOf('<section class="bg-sand py-16 sm:py-20" aria-labelledby="hair-visit-heading">');
  assert.ok(visitStart > firstSection, "Local visiting guide follows the menu");
  const visit = html.slice(visitStart, html.indexOf("</section>", visitStart));
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
  for (const target of [`${prefix}/contact`, `${prefix}/services/hair-scalp-recovery`, `${prefix}/promotions/first-hair-visit`]) assert.ok(links.some((link) => link.href === target));
  assert.ok(attrs(html, "a").some((link) => link.href === `${prefix}/team/mejin-shick`), "Existing practitioner profile preserved");
  assert.match(html, /service-korean-soft-wave/);
  assert.match(html, /service-signature-balayage/);
}
console.log("Hair SEO checks passed: bilingual descriptive metadata/H1, crawlable local guide and menu shortcuts, six valid anchors per language, useful detail/contact/scalp/offer/profile links, preserved canonicals and language alternates.");
