import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const data = await read("lib/chair-rental-landing.ts");
const phone = await read("lib/chair-rental-phone.ts");
const landing = await read("components/ChairRentalLanding.tsx");
const enPage = await read("app/(en)/chair-rental/page.tsx");
const zhPage = await read("app/(zh)/zh/[[...slug]]/page.tsx");
const i18n = await read("lib/i18n.ts");
const sitemap = await read("app/sitemap.ts");
const site = await read("lib/site.ts");
const services = await read("lib/services.ts");
const careerCard = await read("components/CareerCard.tsx");
const header = await read("components/Header.tsx");
const footer = await read("components/Footer.tsx");
const sticky = await read("components/MobileStickyBar.tsx");
const careers = await read("app/(en)/careers/page.tsx");

assert(enPage.includes('absoluteTitle: true'), "EN title tag stays exact");
assert(enPage.includes('chairRentalPath'), "EN page uses the shared path");
assert(zhPage.includes('path === chairRentalPath'), "ZH catch-all serves /zh/chair-rental");
assert(zhPage.includes('ChairRentalLanding locale="zh-Hans"'), "ZH page renders the landing");
assert(i18n.includes('"/chair-rental"'), "localizedRoutes includes /chair-rental");
assert(sitemap.includes('{ path: "/chair-rental", priority: 0.6 }'), "sitemap lists /chair-rental");

const requiredEnglish = [
  "Rent a Chair in Deepdene | For Independent Hairdressers & Colourists",
  "Give your clients a salon they’ll love coming back to, without the cost of opening your own.",
  "If you’ve built a loyal clientele but outgrown working from home, or you’re ready to go independent without taking on a whole shop, MEND Beauty Studio has one styling station available. Run your own hair business from a professional salon without the big upfront investment or the ongoing burden of a full salon lease.",
  "What you get at MEND:",
  "Your own profile, with paid marketing behind it.",
  "We’ll showcase your work, business phone number and booking link on our website, and put MEND marketing budget behind promoting your services locally. Clients contact and book with you directly.",
  "A ready-to-use workspace.",
  "Your rental includes a styling station, shared wash basins, towels, capes and basic wash products. Bring your own colour or pay for selected salon products as you use them.",
  "Another way to earn.",
  "Refer clients to eligible MEND head spa or beauty services and earn a referral fee when they complete a paid appointment, under our agreed terms.",
  "Your business stays yours.",
  "You set your prices, manage your bookings and take your own payments.",
  "A$375 for three fixed days per week, with a three-day weekly minimum. Choose from Monday to Saturday by arrangement, including Wednesdays and Saturdays. Extra days can be discussed.",
  "You’ll be based at 74 Whitehorse Road, Deepdene, close to Balwyn, Canterbury, Hawthorn, Kew, Camberwell, Surrey Hills and Mont Albert.",
  "Make my business your business.",
  "Come see the studio and picture bringing your next client here.",
  "Enquire to arrange a walkthrough",
  "Tell us what you specialise in, share your portfolio or Instagram, and let us know which three days would suit you.",
];

for (const phrase of requiredEnglish) {
  assert(data.includes(phrase), `English copy is missing: ${phrase}`);
}

assert(!data.includes("Choose from seven days by arrangement, including weekends."), "Old seven-day sentence must not remain");
assert(!/including weekends/.test(data), "Copy must not say including weekends");
assert(data.includes('ctaHref: "/careers"'), "EN CTA points to /careers");
assert(data.includes('ctaHref: "/zh/careers"'), "ZH CTA points to /zh/careers");
assert(landing.includes("copy.ctaHref"), "Landing uses the locale CTA href");
assert(data.includes('phoneLabel: "Phone"'), "EN phone label stays English");
assert(data.includes('phoneLabel: "电话"'), "ZH phone label stays Chinese");
assert(phone.includes('display: "0499 666 688"'), "Chair rental display phone");
assert(phone.includes('href: "tel:+61499666688"'), "Chair rental telephone URI");
assert(!phone.includes("0499 66 88 99") && !phone.includes("tel:+61499668899"), "Chair rental phone module does not carry the studio number");
assert(!data.includes("0499 66 88 99") && !landing.includes("0499 66 88 99"), "Landing copy does not show the studio number");
assert(landing.includes("chairRentalPhone.href") && landing.includes("chairRentalPhone.display"), "Landing links the chair rental number");
assert(landing.includes("copy.phoneLabel"), "Landing uses the locale phone label");
assert(
  phone.includes("return path === chairRentalPath || path === `/zh${chairRentalPath}`;"),
  "Only /chair-rental and /zh/chair-rental match",
);
assert(
  phone.includes("return isChairRentalPath(pathname) ? chairRentalPhone : null;"),
  "Every other route keeps the studio phone",
);
for (const [name, source] of [
  ["header", header],
  ["footer", footer],
  ["mobile sticky bar", sticky],
]) {
  assert(source.includes("chairRentalPhoneForPath(pathname)"), `${name} overrides the phone only on the chair rental routes`);
  assert(!source.includes("0499 666 688") && !source.includes("tel:+61499666688"), `${name} does not hardcode the chair rental number`);
}
assert(header.includes("routePhone?.display ?? site.phone"), "Header falls back to the studio phone");
assert(footer.includes("routePhone?.display ?? site.phone"), "Footer falls back to the studio phone");
assert(sticky.includes("routePhone?.href ?? site.phoneHref"), "Sticky bar falls back to the studio phone");
assert(sticky.includes("routePhone ? <span className=\"sr-only\"> {routePhone.display}</span> : null"), "Sticky call control names the chair rental number only on those routes");
assert(site.includes('phone: "0499 66 88 99"'), "Studio display phone stays unchanged");
assert(site.includes('phoneHref: "tel:+61499668899"'), "Studio telephone URI stays unchanged");
assert(careers.includes("0499 66 88 99"), "Careers page keeps the studio phone");

assert(!/\b(\d+\s*(mins?|minutes)|duration)\b/i.test(data + landing), "Chair rental copy has no service durations");

assert(site.includes('{ days: "Wednesday", time: "Closed" }'), "Customer-facing Wednesday hours stay Closed");
assert(site.includes('{ days: "Sunday", time: "Closed" }'), "Sunday stays Closed");

assert(services.includes('href: "/chair-rental"'), "Careers Rent a Chair card links to the landing");
assert(careerCard.includes("href ?? \"/contact#booking-enquiry\""), "CareerCard supports a custom href");
assert(zhPage.includes('href={title === "租椅合作" ? "/zh/chair-rental"'), "ZH careers card links to the landing");

assert(!data.includes("from-leon") && !landing.includes("from-leon"), "Handoff originals are not referenced from the landing");
assert(!/\/image0\d\.(png|jpg|webp)/.test(data + landing), "C2PA-labelled later stills are not referenced by filename");

const dir = new URL("../public/images/chair-rental/", import.meta.url);
const files = (await readdir(dir)).filter((name) => !name.startsWith("."));
assert(files.length > 0, "Optimised chair-rental images are present");
const stems = new Set(files.map((name) => name.replace(/-\d+\.(avif|webp|jpg)$/, "")));
for (const stem of ["styling-stations", "salon-interior", "reception", "wash-bed"]) {
  assert(stems.has(stem), `Expected still ${stem} is present`);
}
assert(!stems.has("product-station") && !stems.has("studio-decor"), "Superseded v1 gallery stills were removed");
for (const file of files) {
  const size = (await stat(new URL(file, dir))).size;
  assert(size < 250 * 1024, `${file} stays under 250 KB (got ${size})`);
  const tags = execFileSync("exiftool", ["-GPS:all", "-s", new URL(file, dir).pathname], { encoding: "utf8" }).trim();
  assert(tags === "", `${file} must not contain GPS tags: ${tags}`);
}

console.log(
  "Chair rental landing checks passed: owner EN copy with t281 days sentence, ZH draft present, CTA to careers, chair-let phone 0499 666 688 on the landing and route chrome only, studio phone unchanged, no service durations, Wednesday customer hours unchanged, careers links, no C2PA stills, images under 250 KB without GPS.",
);
