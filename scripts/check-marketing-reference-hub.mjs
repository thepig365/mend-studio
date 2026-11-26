import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (file) => readFileSync(file, "utf8");
const load = (file, imports = {}) => {
  const exports = {};
  const compiled = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(compiled, { exports, URL, require: (name) => { assert.ok(name in imports, name); return imports[name]; } });
  return exports;
};

const { site } = load("lib/site.ts");
const hub = load("lib/marketing-reference-hub.ts", { "./site": { site } });
const drive = load("lib/marketing-drive-library.ts");
const { sanitizeDriveLibraryUrl } = drive;

assert.equal(hub.studioAddress, "74 Whitehorse Road, Deepdene VIC 3103");
assert.equal(hub.customerFacingCopy.taglineEn, site.tagline);
assert.equal(hub.customerFacingCopy.taglineZh, "修护秀发，焕亮肌肤，重拾自信光彩。");
assert.equal(hub.customerFacingCopy.serviceNoteZh, "提供中文服务");
assert.deepEqual([...hub.primarySuburbs], ["Deepdene", "Balwyn", "Canterbury", "Surrey Hills", "Kew", "Camberwell"]);
assert.deepEqual([...hub.secondarySuburbs], ["Mont Albert"]);
assert.equal(hub.materialFolders.map((folder) => folder.name).join("|"), "Head Spa|Hairdressing|Skin Care|Rent a Chair|Studio & Interior|Staff|Unsorted");
assert.equal(hub.materialLibraryRoot, "MEND-Material-Library/");
assert.equal(hub.gumtreeListingId, "1345924936");
assert.equal(hub.publicChannels.find((item) => item.id === "facebook").href, "https://www.facebook.com/mendbeauty365");
assert.equal(hub.publicChannels.find((item) => item.id === "instagram").href, "https://www.instagram.com/mendbeauty_365/");
assert.equal(hub.publicChannels.find((item) => item.id === "instagram").detail.en, "@mendbeauty_365");
assert.equal(hub.publicChannels.find((item) => item.id === "website").href, "https://mendbeauty.com.au");
assert.equal(hub.publicChannels.find((item) => item.id === "gumtree").href, null);
assert.equal(hub.ctaExamples.length, 3);
assert.equal(hub.trackingColumns.map((column) => column.en).join("|"), "Date|Channel/Post|Traffic/Page Views|Booking Clicks|Inbound Calls/DMs|Confirmed Bookings|Completed Visits|Notes");
assert.equal(hub.proposedLabel, "Proposed / 待店主核准具体条款后启用");
assert.equal(hub.driveLibraryEnvName, "MEND_DRIVE_LIBRARY_URL");
assert.match(hub.trackingCaption.en, /primary success metrics, not impressions alone/);
assert.match(hub.driveCopy.thumbnails.en, /later phase/);
assert.match(hub.driveCopy.thumbnails.en, /Leon/);
assert.match(hub.routines.map((item) => item.en).join("\n"), /08:30/);
assert.match(hub.routines.map((item) => item.en).join("\n"), /09:00/);
assert.match(hub.routines.map((item) => item.en).join("\n"), /Australia\/Melbourne/);

function walkBilingual(value, path) {
  if (!value || typeof value !== "object") return;
  if (typeof value.en === "string" && typeof value.zh === "string" && Object.keys(value).every((key) => key === "en" || key === "zh")) {
    assert.ok(value.en.trim().length > 0, path);
    assert.match(value.zh, /\p{Script=Han}/u, path);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (key === "href") continue;
    walkBilingual(child, `${path}.${key}`);
  }
}
for (const key of ["customerFacingCopy", "studioServices", "materialFolders", "prePromotionChecks", "skillStandards", "routines", "approvalItems", "publicChannels", "ctaExamples", "consentNotice", "trackingColumns", "trackingCaption", "trackingExampleNote", "complianceNotes", "driveCopy"]) {
  walkBilingual(hub[key], key);
}

const exampleUrl = "https://drive.google.com/drive/folders/example-library";
assert.equal(sanitizeDriveLibraryUrl(exampleUrl), exampleUrl);
assert.equal(sanitizeDriveLibraryUrl("https://docs.google.com/document/d/example"), "https://docs.google.com/document/d/example");
for (const bad of ["", "   ", "http://drive.google.com/drive/folders/example-library", "https://evil.example/drive", "https://drive.google.com.evil.example/x", "https://user:pass@drive.google.com/drive/folders/example-library", "javascript:alert(1)", "not a url"]) {
  assert.equal(sanitizeDriveLibraryUrl(bad), null, bad);
}
assert.equal(sanitizeDriveLibraryUrl("x".repeat(501)), null);

const reference = read("docs/marketing-reference.md");
const portal = read("docs/marketing-portal.md");
const portalHub = portal.slice(portal.indexOf("## 营销参考中心"));
assert.ok(portalHub.length > 500);
for (const heading of ["## 发布前核对清单", "## 1. 品牌核心", "## 2. 营销技能标准", "## 3. 日常节奏", "## 4. 本地素材库", "## 5. 已核实的公开社交与分类信息渠道", "## 6. 店主审批与安全边界"]) {
  assert.ok(reference.includes(heading), heading);
}
for (const phrase of [
  "Mend your hair. Refresh your skin. Renew your look.",
  "修护秀发，焕亮肌肤，重拾自信光彩。",
  "提供中文服务",
  "74 Whitehorse Road, Deepdene VIC 3103",
  "Mont Albert",
  "MEND-Material-Library/",
  "Head Spa",
  "Hairdressing",
  "Skin Care",
  "Rent a Chair",
  "Studio & Interior",
  "Staff",
  "Unsorted",
  "https://www.facebook.com/mendbeauty365",
  "https://www.instagram.com/mendbeauty_365/",
  "@mendbeauty_365",
  "1345924936",
  "C2PA",
  "08:30",
  "09:00",
  "Australia/Melbourne",
  "Grok",
  "Leon",
]) {
  assert.ok(reference.includes(phrase), phrase);
}
assert.match(portal, /\]\(\.\/marketing-reference\.md\)/);
for (const phrase of ["## 获客执行方案", "Proposed / 待店主核准具体条款后启用", "Spam Act 2003", "TGA", "AHPRA", "ACCC", "Confirmed Bookings", "Completed Visits", "Inbound Calls/DMs", "MEND_DRIVE_LIBRARY_URL", "NEXT_PUBLIC_MEND_DRIVE_LIBRARY_URL", "Anna", "任何知道链接的人", hub.ctaExamples[0].en, hub.ctaExamples[0].zh, hub.ctaExamples[1].en, hub.ctaExamples[1].zh, hub.ctaExamples[2].en, hub.ctaExamples[2].zh, hub.consentNotice.en, hub.consentNotice.zh]) {
  assert.ok(portal.includes(phrase), phrase);
}
assert.match(read(".env.example"), /# MEND_DRIVE_LIBRARY_URL=/);
assert.match(read("app/(en)/marketing/page.tsx"), /sanitizeDriveLibraryUrl\(process\.env\.MEND_DRIVE_LIBRARY_URL\)/);
assert.match(read("components/MarketingPortalWorkspace.tsx"), /<MarketingReferenceHub driveLibraryUrl=\{driveLibraryUrl\} \/>/);
assert.equal(existsSync("app/(en)/marketing/reference-preview/page.tsx"), false);

const privateFiles = ["lib/marketing-reference-hub.ts", "lib/marketing-drive-library.ts", "components/MarketingReferenceHub.tsx", "docs/marketing-reference.md"];
for (const file of privateFiles) {
  const source = read(file);
  assert.doesNotMatch(source, /\/Users\/|\/home\/|0499|hello@|AIza|GOOGLE_API_KEY|drive\/v3|googleapis|sk-[A-Za-z0-9_-]{20,}/, file);
  assert.doesNotMatch(source, /\/folders\/[A-Za-z0-9_-]{8,}/, file);
}
assert.doesNotMatch(portalHub, /\/Users\/|0499|hello@|AIza|GOOGLE_API_KEY|\/folders\/[A-Za-z0-9_-]{8,}/);
assert.doesNotMatch(read("components/MarketingReferenceHub.tsx"), /process\.env|NEXT_PUBLIC_MEND_DRIVE|fetch\(/);
assert.doesNotMatch(read("lib/marketing-drive-library.ts"), /process\.env|fetch\(/);

let locale = "en";
const element = (type, props) => ({ type, props });
const component = load("components/MarketingReferenceHub.tsx", {
  "@/components/MarketingLocale": { useMarketingLocale: () => ({ locale, t: (en, zh) => locale === "zh" ? zh : en }) },
  "@/lib/marketing-drive-library": drive,
  "@/lib/marketing-reference-hub": hub,
  "react/jsx-runtime": { jsx: element, jsxs: element },
}).default;
const nodes = (node) => {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...nodes(node.props?.children)];
};
const text = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const render = (props) => nodes(component(props));

let tree = render({ driveLibraryUrl: null });
assert.equal(tree.find((node) => node.props?.["data-drive-state"])?.props["data-drive-state"], "unconfigured");
assert.equal(tree.some((node) => node.type === "a" && String(node.props.href).includes("drive.google.com")), false);
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "Detailed Lead Generation Plan"));
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "Marketing Skill Set & AI Quality Standards"));
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "MEND Material Library Structure Reference"));
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "Verified Public Marketing & Classifieds Channels"));
assert.equal(tree.filter((node) => node.type === "img").length, 0);
assert.ok(text(tree).includes("提供中文服务"));
assert.ok(text(tree).includes(site.tagline));
assert.ok(text(tree).includes(hub.proposedLabel));
assert.ok(text(tree).includes("1345924936"));
for (const column of hub.trackingColumns) assert.ok(text(tree).includes(column.en), column.en);
assert.equal(tree.filter((node) => node.props?.["data-offer-status"] === "proposed").length, 2);

tree = render({ driveLibraryUrl: "https://evil.example/library" });
assert.equal(tree.find((node) => node.props?.["data-drive-state"])?.props["data-drive-state"], "unconfigured");

tree = render({ driveLibraryUrl: exampleUrl });
assert.equal(tree.find((node) => node.props?.["data-drive-state"])?.props["data-drive-state"], "configured");
const driveLinks = tree.filter((node) => node.type === "a" && node.props.href === exampleUrl);
assert.equal(driveLinks.length, hub.materialFolders.length + 1);
assert.ok(driveLinks.every((node) => node.props.rel === "noopener noreferrer" && node.props.referrerPolicy === "no-referrer"));
assert.ok(text(tree).includes("Open in Google Drive / Upload"));
assert.ok(text(tree).includes("Thumbnail preview"));
assert.equal(tree.filter((node) => node.type === "img").length, 0);

locale = "zh";
tree = render({ driveLibraryUrl: null });
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "获客执行方案"));
assert.ok(tree.some((node) => node.type === "h2" && text(node) === "营销技能与 AI 质量标准"));
assert.ok(text(tree).includes("尚未配置 Drive 链接"));
assert.ok(text(tree).includes(hub.ctaExamples[0].zh));
assert.ok(text(tree).includes("已确认预约"));
assert.ok(text(tree).includes(site.tagline));

console.log("Marketing reference hub checks passed: bilingual reference, lead plan, Drive URL allowlist, unconfigured fallback, no API thumbnails, and no secrets in the public files.");
