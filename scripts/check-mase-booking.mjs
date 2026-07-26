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
  /(?:label:\s*"|>\s*)(?:Book Now|Book an Appointment|View available appointments|立即预约|预约服务|查看可预约时间)(?:"|\s*<)/,
);
assert.match(combinedSource, /href(?:=|:)\s*["']\/book["']/);

const bookingPage = readFileSync("app/book/page.tsx", "utf8");
assert.match(bookingPage, /redirect\(booking\.url\)/);
assert.doesNotMatch(bookingPage, /href=\{booking\.url\}/);

const chinesePage = readFileSync("app/zh/[[...slug]]/page.tsx", "utf8");
assert.match(chinesePage, /path === "\/book"\) redirect\(booking\.url\)/);

const i18n = readFileSync("lib/i18n.ts", "utf8");
assert.match(i18n, /bookNow: "Book"/);
assert.match(i18n, /bookAppointment: "Book"/);
assert.match(i18n, /bookNow: "预约"/);
assert.match(i18n, /bookAppointment: "预约"/);

const bookingConfig = readFileSync("lib/booking.ts", "utf8");
assert.match(bookingConfig, /process\.env\.MASE_BOOKING_URL/);
assert.doesNotMatch(bookingConfig, /NEXT_PUBLIC_MASE_BOOKING_URL/);
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
  "MaSe booking checks passed: unified Book/预约 labels, server-side redirects, hidden provider link, provider fallback and approved hours.",
);
