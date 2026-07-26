import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function filesUnder(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

const sourceFiles = [...filesUnder("app"), ...filesUnder("components")]
  .filter((path) => path.endsWith(".ts") || path.endsWith(".tsx"))
  .map((path) => ({ path, source: readFileSync(path, "utf8") }));

const combinedSource = sourceFiles.map(({ source }) => source).join("\n");
assert.doesNotMatch(
  combinedSource,
  /(?:label:\s*"Book Now"|>\s*Book Now\s*<)[\s\S]{0,120}?\/contact#booking-enquiry/,
);
assert.match(combinedSource, /href(?:=|:)\s*["']\/book["']/);

const bookingPage = readFileSync("app/book/page.tsx", "utf8");
assert.match(bookingPage, /booking\.url/);
assert.match(bookingPage, /View available appointments/);
assert.match(bookingPage, /Call \{site\.phone\}/);
assert.match(bookingPage, /\/policies/);

const bookingConfig = readFileSync("lib/booking.ts", "utf8");
assert.match(bookingConfig, /NEXT_PUBLIC_MASE_BOOKING_URL/);
assert.match(bookingConfig, /clients\.mase\.cloud/);

const siteConfig = readFileSync("lib/site.ts", "utf8");
assert.match(siteConfig, /Wednesday", time: "Closed"/);
assert.match(siteConfig, /9:00 am – 5:00 pm/);
assert.match(siteConfig, /structuredOpeningHours/);

const sitemap = readFileSync("app/sitemap.ts", "utf8");
assert.match(sitemap, /path: "\/book"/);

const layout = readFileSync("app/layout.tsx", "utf8");
assert.match(layout, /openingHoursSpecification: site\.structuredOpeningHours/);

console.log(
  "MaSe booking checks passed: branded route, unified calls to action, provider fallback, policies, phone fallback and approved hours.",
);
