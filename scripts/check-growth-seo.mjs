import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

async function read(path) {
  return readFile(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const site = await read("lib/site.ts");
const schema = await read("lib/local-business-schema.ts");
const serviceSchema = await read("components/ServiceStructuredData.tsx");
const servicePage = await read("components/ServicePage.tsx");
const footer = await read("components/Footer.tsx");
const analytics = await read("components/Analytics.tsx");
const policies = await read("app/(en)/policies/page.tsx");
const chinese = await read("app/(zh)/zh/[[...slug]]/page.tsx");
const englishLayout = await read("app/(en)/layout.tsx");
const chineseLayout = await read("app/(zh)/zh/layout.tsx");
const servicesHub = await read("app/(en)/services/page.tsx");
const sitemap = await read("app/sitemap.ts");
const seo = await read("lib/seo.ts");
const envExample = await read(".env.example");

const sitemapPaths = [...sitemap.matchAll(/\{ path: "([^"]*)", priority:/g)].map((match) => match[1]);
assert(sitemapPaths.length === 19 && new Set(sitemapPaths).size === 19, "Sitemap must contain 19 unique public content paths (38 bilingual URLs)");
assert(!sitemapPaths.some((path) => /^\/(book|marketing|api)(\/|$)/.test(path)), "Redirects and private/auth routes must stay outside the sitemap");
assert(!sitemap.includes("nails-semi-permanent"), "The legacy nails-semi-permanent path is a redirect, not a sitemap URL");
assert(seo.includes('"x-default":') && seo.includes('"zh":') && seo.includes('"en-AU":'), "Hreflang alternates are en-AU, zh and x-default");
assert(sitemap.includes("hreflangAlternates"), "Sitemap language alternates stay reciprocal with the page metadata");
assert(!sitemap.includes("priority - 0.1"), "Chinese URLs keep the same sitemap priority as English");
const chineseServicesHub = chinese.slice(chinese.indexOf("function ChineseServices()"), chinese.indexOf("function ChineseServiceDetail("));
for (const slug of ["hair-scalp-recovery", "brows-lashes"]) {
  assert(servicesHub.includes(`href="/services/${slug}"`), `English services hub needs a crawlable ${slug} link`);
  assert(chineseServicesHub.includes(`href="/zh/services/${slug}"`), `Chinese services hub needs a same-language ${slug} link`);
}

assert(
  site.includes('"https://www.facebook.com/mendbeauty365"'),
  "Confirmed Facebook profile is missing from site config",
);
assert(
  site.includes('"https://www.instagram.com/mendbeauty365/"'),
  "Confirmed Instagram profile is missing from site config",
);
assert(
  schema.includes("sameAs: Object.values(site.socialProfiles)"),
  "LocalBusiness JSON-LD must include confirmed social profiles",
);
assert(
  schema.includes('"@id": `${site.url}/#business`'),
  "LocalBusiness JSON-LD must expose a stable business identifier",
);
assert(
  serviceSchema.includes('"@type": "BreadcrumbList"') &&
    serviceSchema.includes('"@type": "ItemList"') &&
    serviceSchema.includes('"@type": "Service"'),
  "Service pages must expose breadcrumb and service-list structured data",
);
assert(
  servicePage.includes("<ServiceStructuredData"),
  "English service pages must render their structured data",
);
assert(
  chinese.includes("<ServiceStructuredData"),
  "Chinese service pages must render their structured data",
);
assert(
  footer.includes("<SocialLinks locale={locale} />"),
  "Footer must expose the confirmed social profiles",
);
assert(
  analytics.includes("if (!measurementId || consent !== \"accepted\") return;"),
  "Analytics must remain blocked until explicit consent",
);
assert(
  analytics.includes("book_click") &&
    analytics.includes("phone_click") &&
    analytics.includes("email_click") &&
    analytics.includes("directions_click"),
  "Required conversion events are incomplete",
);
assert(
  !analytics.includes("service enquiry text") &&
    policies.includes("service enquiry text") &&
    chinese.includes("服务咨询内容"),
  "Analytics implementation and public privacy explanation must remain separate",
);
assert(
  envExample.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  "GA4 environment variable is not documented",
);
assert(
  englishLayout.includes('lang="en-AU"') &&
    chineseLayout.includes('lang="zh-Hans"'),
  "Static root layouts must preserve the correct HTML language",
);

console.log(
  "Growth SEO checks passed: 38 bilingual sitemap URLs plus promotions, reciprocal hreflang, social identity, local/service structured data, consent gate and conversion events.",
);
