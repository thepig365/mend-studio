import { readdirSync, readFileSync, statSync } from "node:fs";
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
const semiPermanent = await read("app/(en)/services/semi-permanent/page.tsx");
assert(
  semiPermanent.includes("<ServiceStructuredData"),
  "English semi-permanent page must render the same service structured data as its Chinese counterpart",
);
assert(
  semiPermanent.includes('price: ""') && semiPermanent.includes("items={structuredItems}"),
  "English semi-permanent structured data must not receive the visible price strings",
);
assert(
  semiPermanent.includes("items={menu.items}"),
  "English semi-permanent visible menu must keep the original items",
);
const siteDocument = await read("components/SiteDocument.tsx");
const promotionsDocument = await read("components/promotions/PromotionsDocument.tsx");
assert(
  siteDocument.includes('from "@/lib/fonts"') && promotionsDocument.includes('from "@/lib/fonts"'),
  "Site fonts must come from the vendored local font module",
);
assert(
  !siteDocument.includes("next/font/google") && !promotionsDocument.includes("next/font/google"),
  "Google font loader must not be called from the site documents",
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

const localCopy = await read("lib/local-service-copy.ts");
const gettingHere = await read("components/GettingHere.tsx");
const nearbySuburbs = await read("components/NearbySuburbs.tsx");
const contact = await read("app/(en)/contact/page.tsx");
for (const phrase of [
  "Head Spa Balwyn & Deepdene",
  "Head Spa near Balwyn, in Deepdene",
  "Balwyn 及 Deepdene 头疗",
  "Balwyn 附近头疗｜Deepdene 门店",
  "Scalp Care Balwyn & Deepdene",
  "Scalp Care near Balwyn, in Deepdene",
  "Balwyn 及 Deepdene 头皮护理",
  "Balwyn 附近头皮护理｜Deepdene 门店",
  "Facials Balwyn & Deepdene",
  "Facials and Skin Care near Balwyn, in Deepdene",
  "Balwyn 及 Deepdene 面部与肌肤护理",
  "Balwyn 附近面部与肌肤护理｜Deepdene 门店",
  "Body Care Balwyn & Deepdene",
  "Body Care near Balwyn, in Deepdene",
  "Balwyn 及 Deepdene 身体护理",
  "Balwyn 附近身体护理｜Deepdene 门店",
]) {
  assert(localCopy.includes(phrase) && phrase.includes("Balwyn") && phrase.includes("Deepdene"), `Service title or H1 missing Balwyn and Deepdene: ${phrase}`);
}
assert(serviceSchema.includes("areaServed: serviceAreas"), "Service JSON-LD must share the areaServed list");
assert(schema.includes("areaServed: serviceAreas"), "LocalBusiness JSON-LD must include areaServed");
assert(site.includes('addressLocality: "Deepdene"'), "JSON-LD address locality stays Deepdene");
assert(site.includes("74 Whitehorse Road, Deepdene VIC 3103"), "Studio address stays 74 Whitehorse Road, Deepdene");
assert(!schema.includes('addressLocality: "Balwyn"'), "Business address must not move to Balwyn");
assert(gettingHere.includes('id="getting-here"'), "Getting-here guide exposes #getting-here");
assert(contact.includes("<GettingHere"), "English contact page renders the getting-here guide");
const chineseContact = chinese.slice(chinese.indexOf("function ChineseContact()"), chinese.indexOf("const policies"));
assert(chineseContact.includes("<GettingHere"), "Chinese contact page renders the getting-here guide");
assert(nearbySuburbs.includes("欢迎附近区域的客人"), "Chinese nearby heading welcomes guests");
assert(!nearbySuburbs.includes("。 这些"), "Chinese nearby copy has no stray space after the full stop");
assert(nearbySuburbs.includes("We welcome guests from"), "English nearby copy welcomes guests");

const answerIntros = await read("lib/service-answer-intros.ts");
const englishIntros = [...answerIntros.matchAll(/"en-AU":\s*\n\s*"([^"]+)"/g)].map((match) => match[1]);
assert(englishIntros.length === 5, "Five English answer-first intros");
for (const intro of englishIntros) {
  const words = intro.split(/\s+/).length;
  assert(words >= 40 && words <= 60, `Answer intro must be 40-60 words (got ${words})`);
}
const faq = await read("components/ServiceFaq.tsx");
const faqData = await read("lib/service-faqs.ts");
assert(faq.includes('name: item.question') && faq.includes("text: item.answer"), "FAQPage JSON-LD must reuse the visible question and answer strings");
assert(servicePage.includes("<ServiceFaq") && chinese.includes("<ServiceFaq"), "English and Chinese service pages render the FAQ");
assert(servicePage.includes("answerIntro(") && chinese.includes("answerIntro("), "Service pages use the answer-first intro");
for (const slug of ["head-spa", "hair-scalp-recovery", "skin-facial", "hair", "body-care"]) {
  assert(faqData.includes(`"${slug}"`), `FAQ data missing ${slug}`);
}
assert(schema.includes("BeautySalon") && schema.includes("DaySpa") && schema.includes("HairSalon"), "Business JSON-LD keeps HairSalon and adds BeautySalon and DaySpa");
assert(schema.includes("slogan: site.tagline") && schema.includes("description: businessDescription"), "Slogan stays separate from the factual description");
assert(schema.includes("email: site.email") && schema.includes("priceRange") && schema.includes("latitude"), "Business JSON-LD includes email, price range and coordinates");
assert(schema.includes("hasMap: site.mapsHref") && schema.includes("areaServed: serviceAreas"), "Map link and areaServed stay on the business entity");
const robots = await read("app/robots.ts");
for (const agent of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "CCBot", "meta-externalagent"]) {
  assert(robots.includes(`"${agent}"`), `robots.txt must name ${agent}`);
}
assert(robots.includes('disallow: ["/marketing", "/api/auth"]'), "Private paths stay disallowed");
const llmsRoute = await read("app/llms.txt/route.ts");
assert(llmsRoute.includes("llmsTxt") && llmsRoute.includes("text/plain"), "llms.txt is served as plain text from site data");
assert(faqData.includes("Yes — there are 6 car parks at the back of the studio.") && faqData.includes("有，店铺后面有 6 个停车位。"), "Parking FAQ uses the owner-confirmed wording");
const mensSeo = await read("lib/mens-grooming-seo.ts");
const mensPage = await read("app/(en)/services/mens-grooming/page.tsx");
assert(mensPage.includes('title: mensGroomingSeo["en-AU"].title'), "English men's grooming title uses the narrow SEO copy");
assert(mensPage.includes("Try the men’s head spa"), "Existing men's head spa block stays in place");
assert(mensPage.includes("category={category}"), "English men's grooming H1 still comes from the category title");
assert(chinese.includes('slug[1] === "mens-grooming" ? mensGroomingSeo["zh-Hans"]'), "Chinese metadata uses the men's grooming SEO copy");
assert(chinese.includes('local?.["zh-Hans"].heading ?? category.title'), "Chinese service H1 is unchanged");
assert(mensSeo.includes("site.address") && mensSeo.includes("near Balwyn") && mensSeo.includes("紧邻 Balwyn"), "Men's grooming meta uses the published address and near-Balwyn wording");
assert(!/\bin Balwyn\b/.test(mensSeo), "Men's grooming meta must not place the studio in Balwyn");
assert(!/existing booking page|打开现有预约页面/.test(mensSeo), "Men's grooming meta uses natural wording");
const parkingAppend = faqData.indexOf("block[locale].items.push(parkingFaq[locale])");
const mensFaqStart = faqData.indexOf("function mensWhereAnswer");
const mensFaq = faqData.slice(mensFaqStart);
assert(mensFaqStart > parkingAppend, "Men's grooming FAQ stays outside the parking append");
for (const omitted of ["Cut + Beard", "Scalp Detox", "剪发与胡须", "头皮净化", "car parks", "停车", "From $", "popular", "MaSe certification", "对当前项目的认证", "How do I open booking", "如何打开", "existing booking page", "site.phone", "site.email", "site.wechat"]) {
  assert(!mensFaq.includes(omitted) && !mensSeo.includes(omitted), `New men's grooming copy must omit ${omitted}`);
}
assert(mensFaq.includes('question: "How do I book?"') && mensFaq.includes('question: "如何预约？"'), "Booking questions use customer wording");
const headSpaChoice = await read("components/HeadSpaScalpChoice.tsx");
const headSpaPage = await read("app/(en)/services/head-spa/page.tsx");
assert(headSpaPage.includes("<HeadSpaScalpChoice locale=\"en-AU\" />"), "English head spa page offers the scalp-care choice");
assert(chinese.includes('slug === "head-spa" ? <HeadSpaScalpChoice locale="zh-Hans" />'), "Chinese head spa page offers the scalp-care choice");
assert(headSpaChoice.includes('localePath("/services/hair-scalp-recovery", locale)'), "Choice links to the existing scalp-care route");
assert(headSpaChoice.includes("Explore scalp care") && headSpaChoice.includes("查看头皮与发质护理项目"), "Choice uses the existing scalp-care link labels");
assert(headSpaChoice.includes("not medical diagnosis or treatment") && headSpaChoice.includes("并非医疗诊断或治疗"), "Choice keeps the published cosmetic boundary");
for (const omitted of ["$", "minutes", "mins", "分钟", "Balwyn", "停车", "popular", "available"]) {
  assert(!headSpaChoice.includes(omitted), `Head spa choice must omit ${omitted}`);
}
assert(!faqData.slice(faqData.indexOf('"head-spa"'), faqData.indexOf('"hair-scalp-recovery"')).includes("How is head spa different"), "Head spa FAQ schema stays unchanged");
assert(mensFaq.includes("Select Book to continue to MaSe and choose your service.") && mensFaq.includes("点击“预约”进入 MaSe 并选择服务。"), "Booking answers tell the guest to continue to MaSe and choose a service");
assert(!/free parking|免费停车|customer-only|仅限顾客/i.test(faqData + gettingHere), "Parking copy does not claim the parks are free or customer-only");
assert(!/hot stone|hot-stone|热石/i.test(faqData + gettingHere), "FAQ and getting-here copy do not mention hot stone");

function sourceFiles(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) sourceFiles(path, files);
    else if (/\.(tsx|ts)$/.test(name)) files.push(path);
  }
  return files;
}
for (const dir of ["app", "components", "lib"]) {
  for (const file of sourceFiles(join(root, dir))) {
    assert(!/\bin Balwyn\b/.test(readFileSync(file, "utf8")), `${file} must not say the studio is in Balwyn`);
  }
}

console.log(
  "Growth SEO checks passed: 38 bilingual sitemap URLs plus promotions, reciprocal hreflang, social identity, local/service structured data, consent gate and conversion events.",
);
