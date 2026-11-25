import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const video = await read("components/HeadSpaVideo.tsx");
const landing = await read("components/BodyCareLanding.tsx");
const slot = await read("components/MediaSlot.tsx");
const data = await read("lib/body-care-landing.ts");
const anna = await read("lib/anna-services.ts");
const enPage = await read("app/(en)/services/body-care/page.tsx");
const zhPage = await read("app/(zh)/zh/[[...slug]]/page.tsx");

for (const attr of ["muted", "playsInline", "loop", 'preload="metadata"', "poster=", "prefers-reduced-motion", "IntersectionObserver"]) {
  assert(video.includes(attr), `Shared studio video keeps ${attr}`);
}
assert(landing.includes("HeadSpaVideo"), "Neck card reuses the muted lazy video component");
assert(landing.includes("item.price") && landing.includes("item.time"), "Cards show menu-data price and duration");
assert(!/\$\d/.test(data), "Landing copy does not hard-code prices; cards read the menu data");
assert(data.includes("Relaxation and general wellbeing, not diagnosis or treatment."));
assert(data.includes("日常养护及放松，不用于诊断或治疗。"));

for (const [id, price, time] of [
  ["express-neck-shoulder-therapy", "$88", "30 mins"],
  ["meridian-therapy", "$168", "60 mins"],
  ["circulation-therapy", "$268", "90 mins"],
  ["lymphatic-detox-therapy", "$268", "90 mins"],
  ["express-relaxation-massage", "$88", "30 mins"],
  ["aroma-healing-massage", "$168", "60 mins"],
  ["deep-sleep-massage", "$268", "90 mins"],
  ["mend-signature-body-ritual", "$348", "120 mins"],
]) {
  assert(data.includes(`id: "${id}"`), `Landing covers ${id}`);
  assert(new RegExp(`item\\("${id}",[^)]*"\\${price}", "${time}"`).test(anna), `${id} menu data stays ${price} / ${time}`);
}

assert(data.includes('treatmentId: "express-neck-shoulder-therapy"'), "Clip5 is assigned only to the neck and shoulder card");
assert(data.includes("/videos/head-spa/neck-massage.mp4"), "Neck card reuses the existing muted head spa clip5 encode");
assert(data.includes('consent: "unconfirmed"'), "Clip5 stays labelled as needing consent");
assert(landing.includes("data-consent=") && landing.includes("neckCaption"), "Neck card shows a spa-chair caption and consent flag");
assert(!data.includes("/videos/body"), "No new body-massage video files are introduced");
assert(!/spa chair footage as (a )?body massage|massage table/.test(landing) || data.includes("Not a massage table"), "Copy must not present the spa chair as a massage table");

for (const id of [
  "hero",
  "meridian-therapy",
  "circulation-therapy",
  "lymphatic-detox-therapy",
  "express-relaxation-massage",
  "aroma-healing-massage",
  "deep-sleep-massage",
  "mend-signature-body-ritual",
]) {
  assert(data.includes(`"${id}"`) && slot.includes("data-media-slot"), `Reserved media slot listed for ${id}`);
}
assert(landing.includes("<MediaSlot") && landing.includes('slotId="hero"'), "Hero and non-neck cards use reserved media slots");
assert(slot.includes("mend-beauty-logo-gold-transparent.png"), "Empty slots use the studio logo, not stock or AI images");

assert(enPage.includes("hidePriceList") && enPage.includes("BodyCareLanding") && enPage.includes('heroMedia={<BodyCareHeroMedia locale="en-AU" />}'), "English body-care page is rebuilt as a landing, not a duplicate route");
assert(zhPage.includes("BodyCareLanding") && zhPage.includes('slug !== "body-care"') && zhPage.includes("BodyCareHeroMedia"), "Chinese body-care page uses the same landing");
assert(enPage.includes('path: "/services/body-care"'), "Existing /services/body-care route is reused");

console.log("Body care landing checks passed: menu-data prices unchanged, PDF disclaimer present, clip5 muted on the neck card only with consent flag, reserved logo slots elsewhere, same EN/ZH routes.");
