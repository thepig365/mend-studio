import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const video = await read("components/HeadSpaVideo.tsx");
const landing = await read("components/BodyCareLanding.tsx");
const data = await read("lib/body-care-landing.ts");
const headSpaData = await read("lib/head-spa-landing.ts");
const headSpaLanding = await read("components/HeadSpaLanding.tsx");
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
assert(data.includes('consent: "confirmed"'), "Clip5 and the treatment-room clip are marked consent confirmed");
assert(!data.includes('consent: "unconfirmed"'), "No unconfirmed consent markers remain on the body-care landing");
assert(headSpaData.includes('"neck-massage"') && headSpaData.includes('"confirmed"'), "Head spa neck-massage clip records confirmed consent");
assert(headSpaLanding.includes("consent={clip.consent}") && video.includes("data-consent={consent}"), "Head spa players surface the consent attribute");
assert(landing.includes("neckCaption") && landing.includes("treatmentCaption"), "Spa-chair and facial-treatment captions are shown");
assert(data.includes("Not a full-body massage") && data.includes("并非全身按摩"), "Treatment-room clip is not described as a full-body massage");
assert(data.includes('bodyCareHeroClipId: BodyCareClipId = "room-flowers"'), "Hero uses the room-flowers clip");
assert(landing.includes("data-body-care-gallery") && data.includes("galleryTitle"), "A treatment-room gallery is present");

assert(data.includes("/videos/body-care/${file}.mp4"), "Clip helper points at /videos/body-care");
for (const file of ["room-flowers", "room-lantern", "room-berries", "treatment-room"]) {
  assert(data.includes(`"${file}"`), `Landing names the ${file} clip`);
}

assert(data.includes('"circulation-therapy": "still1"'), "Circulation card uses still1");
assert(data.includes('"lymphatic-detox-therapy": "still5"'), "Lymphatic card uses still5");
assert(data.includes('"aroma-healing-massage": "still4"'), "Aroma card uses still4");
assert(data.includes('"mend-signature-body-ritual": "still2"'), "Signature card uses still2");
assert(data.includes("/images/body-care/${id}-${w}.avif"), "Still helper points at /images/body-care AVIF");
assert(data.includes("/images/body-care/${id}-${w}.webp"), "Still helper points at /images/body-care WebP");
for (const id of ["still1", "still2", "still3", "still4", "still5", "still6", "still7"]) {
  assert(data.includes(`"${id}"`), `Landing includes ${id}`);
}
assert(landing.includes("data-still-slot") && landing.includes('type="image/avif"') && landing.includes('type="image/webp"'), "Stills are served as responsive AVIF and WebP");
assert(!landing.includes("<MediaSlot"), "Logo slots have been replaced by the seven stills");
assert(!/trainedAlgorithmicMedia|gpt-image|ChatGPT/.test(landing), "Customer-facing landing does not mention AI generators");

assert(enPage.includes("hidePriceList") && enPage.includes("BodyCareLanding") && enPage.includes('heroMedia={<BodyCareHeroMedia locale="en-AU" />}'), "English body-care page is rebuilt as a landing, not a duplicate route");
assert(zhPage.includes("BodyCareLanding") && zhPage.includes('slug !== "body-care"') && zhPage.includes("BodyCareHeroMedia"), "Chinese body-care page uses the same landing");
assert(enPage.includes('path: "/services/body-care"'), "Existing /services/body-care route is reused");

const videoDir = new URL("../public/videos/body-care/", import.meta.url);
const videoFiles = await readdir(videoDir);
const expectedVideos = ["room-berries", "room-flowers", "room-lantern", "treatment-room"].flatMap((name) => [`${name}-poster.jpg`, `${name}.mp4`, `${name}.webm`]).sort();
assert.deepEqual(videoFiles.sort(), expectedVideos, "Only the reviewed body-care clips are public");
for (const file of videoFiles) {
  assert((await stat(new URL(file, videoDir))).size < 600 * 1024, `${file} stays under 600 KB`);
}

const imageDir = new URL("../public/images/body-care/", import.meta.url);
const imageFiles = (await readdir(imageDir)).sort();
assert(imageFiles.every((file) => file.endsWith(".avif") || file.endsWith(".webp")), "Body-care stills are only published as AVIF and WebP, not source PNGs");
const expectedImages = [
  "still1-1600", "still1-800",
  "still2-1600", "still2-800",
  "still3-1600", "still3-800",
  "still4-640", "still4-936",
  "still5-640", "still5-952",
  "still6-1600", "still6-800",
  "still7-1600", "still7-800",
].flatMap((name) => [`${name}.avif`, `${name}.webp`]).sort();
assert.deepEqual(imageFiles, expectedImages, "All seven stills are published at the planned responsive widths");
for (const file of imageFiles) {
  assert((await stat(new URL(file, imageDir))).size < 250 * 1024, `${file} stays under 250 KB`);
}

console.log("Body care landing checks passed: menu-data prices unchanged, PDF disclaimer present, four muted studio clips plus clip5 on the neck card, seven AVIF/WebP stills under 250 KB, confirmed consent on clip5 and video4, same EN/ZH routes, each video under 600 KB.");
