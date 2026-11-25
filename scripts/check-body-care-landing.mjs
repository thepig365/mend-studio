import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";

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
assert(landing.includes("HeadSpaVideo"), "Clips reuse the muted lazy video component");
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
assert(data.includes('consent: "unconfirmed"'), "Identifiable clips stay labelled as needing consent");
assert(landing.includes("neckCaption") && landing.includes("treatmentCaption"), "Spa-chair and facial-treatment captions are shown");
assert(data.includes("Not a full-body massage") && data.includes("并非全身按摩"), "Treatment-room clip is not described as a full-body massage");
assert(data.includes('bodyCareHeroClipId: BodyCareClipId = "room-flowers"'), "Hero uses the room-flowers clip");
assert(landing.includes("data-body-care-gallery") && data.includes("galleryTitle"), "A treatment-room gallery is present");

assert(data.includes("/videos/body-care/${file}.mp4"), "Clip helper points at /videos/body-care");
for (const file of ["room-flowers", "room-lantern", "room-berries", "treatment-room"]) {
  assert(data.includes(`"${file}"`), `Landing names the ${file} clip`);
}

for (const id of ["circulation-therapy", "lymphatic-detox-therapy", "aroma-healing-massage", "mend-signature-body-ritual", "image1", "image2", "image3", "image4", "image5", "image6", "image7"]) {
  assert(data.includes(`"${id}"`), `Reserved media slot listed for ${id}`);
}
assert(landing.includes("<MediaSlot") && slot.includes("mend-beauty-logo-gold-transparent.png"), "Empty slots use the studio logo, not stock or AI images");
assert(!/trainedAlgorithmicMedia|gpt-image|ChatGPT/.test(landing), "Customer-facing landing does not mention AI generators");

assert(enPage.includes("hidePriceList") && enPage.includes("BodyCareLanding") && enPage.includes('heroMedia={<BodyCareHeroMedia locale="en-AU" />}'), "English body-care page is rebuilt as a landing, not a duplicate route");
assert(zhPage.includes("BodyCareLanding") && zhPage.includes('slug !== "body-care"') && zhPage.includes("BodyCareHeroMedia"), "Chinese body-care page uses the same landing");
assert(enPage.includes('path: "/services/body-care"'), "Existing /services/body-care route is reused");

const dir = new URL("../public/videos/body-care/", import.meta.url);
const files = await readdir(dir);
const expected = ["room-berries", "room-flowers", "room-lantern", "treatment-room"].flatMap((name) => [`${name}-poster.jpg`, `${name}.mp4`, `${name}.webm`]).sort();
assert.deepEqual(files.sort(), expected, "Only the reviewed body-care clips are public");
for (const file of files) {
  assert((await stat(new URL(file, dir))).size < 600 * 1024, `${file} stays under 600 KB`);
}

console.log("Body care landing checks passed: menu-data prices unchanged, PDF disclaimer present, four muted studio clips plus clip5 on the neck card, reserved logo slots for unpublished stills, same EN/ZH routes, each new clip under 600 KB.");
