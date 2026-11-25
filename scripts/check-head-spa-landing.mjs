import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const video = await read("components/HeadSpaVideo.tsx");
const landing = await read("components/HeadSpaLanding.tsx");
const data = await read("lib/head-spa-landing.ts");
const anna = await read("lib/anna-services.ts");

for (const attr of ["muted", "playsInline", "loop", 'preload="metadata"', "poster=", "prefers-reduced-motion", "IntersectionObserver"]) {
  assert(video.includes(attr), `Head spa video keeps ${attr}`);
}
assert(!/autoPlay|controls\s*\n|volume/.test(video), "Head spa video never autoplays with sound");
assert(!/\$\d/.test(data), "Landing copy does not hard-code prices; cards read the menu data");
assert(landing.includes("item.price") && landing.includes("item.time"), "Cards show menu-data price and duration");
for (const [id, price, time] of [
  ["express-head-spa", "$78", "30 mins"],
  ["korean-signature-head-spa", "$198", "75 mins"],
  ["aroma-healing-head-spa", "$268", "90 mins"],
  ["mend-signature-head-ritual", "$398", "120 mins"],
]) {
  assert(data.includes(`id: "${id}"`), `Landing covers ${id}`);
  assert(new RegExp(`item\\("${id}",[^)]*"\\${price}", "${time}"`).test(anna), `${id} menu data stays ${price} / ${time}`);
}
assert(data.includes("not a medical treatment") && data.includes("并非医疗诊断或治疗"), "Landing intro keeps the cosmetic boundary");
assert(!/placeholder|VERCEL_ENV/i.test(data + landing + video), "No preview-only placeholder slots remain");

const dir = new URL("../public/videos/head-spa/", import.meta.url);
const files = await readdir(dir);
const expected = ["aroma-essence", "hero-cleanse", "neck-massage", "ritual", "signature-cleanse"].flatMap((name) => [`${name}-poster.jpg`, `${name}.mp4`, `${name}.webm`]).sort();
assert.deepEqual(files.sort(), expected, "Only the reviewed head spa clips are public");
for (const file of files) {
  assert((await stat(new URL(file, dir))).size < 600 * 1024, `${file} stays under 600 KB`);
}
console.log("Head spa landing checks passed: muted lazy video with poster and reduced-motion, menu-data prices, cosmetic boundary, no placeholder slots, reviewed clips only, each under 600 KB.");
