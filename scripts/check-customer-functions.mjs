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
const legacyContactLinks = sourceFiles.filter(({ source }) =>
  /href(?:=|:)\s*["']#contact["']/.test(source),
);

assert.equal(
  legacyContactLinks.length,
  0,
  `Legacy footer-only contact links remain in: ${legacyContactLinks
    .map(({ path }) => path)
    .join(", ")}`,
);
assert.match(combinedSource, /\/contact#booking-enquiry/);
assert.match(readFileSync("app/contact/page.tsx", "utf8"), /BookingEnquiryForm/);

const formSource = readFileSync("components/BookingEnquiryForm.tsx", "utf8");
assert.match(formSource, /hello@mendbeauty\.com\.au|site\.emailHref/);
assert.match(formSource, /required/);
assert.match(formSource, /No information is stored by this website/);

const shareSource = readFileSync("components/SharePage.tsx", "utf8");
assert.match(shareSource, /navigator\.share/);
assert.match(shareSource, /navigator\.clipboard\.writeText/);

const siteSource = readFileSync("lib/site.ts", "utf8");
assert.match(siteSource, /email:\s*"hello@mendbeauty\.com\.au"/);
assert.match(siteSource, /google\.com\/maps\/search/);

console.log(
  "Customer-function checks passed: unified enquiry route, validated email handoff, map directions, and share fallback.",
);
