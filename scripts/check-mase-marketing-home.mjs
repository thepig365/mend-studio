import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (file) => readFileSync(file, "utf8");
const load = (file, imports) => {
  const exports = {};
  const compiled = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(compiled, { exports, URL, require: (name) => { assert.ok(name in imports, name); return imports[name]; } });
  return exports;
};

const home = load("lib/mase-marketing-home.ts", {});
const { maseMarketingHome, maseMarketingHomeCopy, maseCapabilityStatus } = home;
const ids = ["sms", "email", "whatsapp", "wechat", "promotions", "smart-pricing", "loyalty", "points", "membership-tiers"];
assert.equal(JSON.stringify(maseMarketingHome.map((item) => item.id)), JSON.stringify(ids));
assert.equal(maseCapabilityStatus, "unverified");
assert.equal(new Set(maseMarketingHome.map((item) => item.status)).size, 1);
for (const item of maseMarketingHome) assert.equal(item.status, "unverified");

const banned = /\b(?:missing|connected|enabled|ready-to-send|success)\b|已连接|已启用|缺失|可发送|发送成功|已成功/i;
const visible = [
  ...Object.values(maseMarketingHomeCopy).flatMap((entry) => [entry.en, entry.zh]),
  ...maseMarketingHome.flatMap((item) => [item.name.en, item.name.zh, item.confirm.en, item.confirm.zh]),
];
for (const text of visible) {
  assert.equal(banned.test(text), false, text);
  assert.ok(text.trim().length > 0);
}
assert.match(maseMarketingHomeCopy.status.en, /Unverified — pending confirmation/);
assert.equal(maseMarketingHomeCopy.status.zh, "未核实——待确认");
const wechat = maseMarketingHome.find((item) => item.id === "wechat");
assert.match(wechat.confirm.en, /not Xiaohongshu/);
assert.match(wechat.confirm.zh, /不是小红书/);
assert.match(maseMarketingHome.find((item) => item.id === "sms").confirm.en, /consent and opt-out/);
const email = maseMarketingHome.find((item) => item.id === "email");
for (const field of ["recipient", "subject", "body", "attachments"]) assert.match(email.confirm.en, new RegExp(field, "i"), field);
assert.match(email.confirm.en, /not sufficient on their own/);
assert.match(email.confirm.en, /Before each email is sent/);
assert.match(email.confirm.en, /owner's explicit approval for that specific email/);
for (const field of ["完整收件人名单", "主题", "正文", "附件"]) assert.ok(email.confirm.zh.includes(field), field);
assert.match(email.confirm.zh, /向店主展示完整收件人名单/);
assert.match(email.confirm.zh, /取得店主对该封具体邮件的明确批准/);
assert.equal(email.confirm.zh.includes("负责人"), false);
assert.match(email.confirm.zh, /每一封邮件/);
assert.match(email.confirm.zh, /仅有这些并不够/);
assert.match(maseMarketingHomeCopy.next.zh, /获授权的 MaSe 管理员/);
assert.doesNotMatch(maseMarketingHomeCopy.next.en, /recipient|subject|attachment/i);
assert.doesNotMatch(maseMarketingHomeCopy.next.zh, /收件人|主题|附件/);
assert.match(maseMarketingHomeCopy.scope.en, /static bilingual reference/);
assert.match(maseMarketingHomeCopy.scope.en, /not a running integration/);
assert.match(maseMarketingHomeCopy.scope.en, /not an editable evidence tracker/);
assert.match(maseMarketingHomeCopy.scope.zh, /静态的中英对照说明/);
assert.match(maseMarketingHomeCopy.scope.zh, /不是正在运行的集成/);
assert.match(maseMarketingHomeCopy.scope.zh, /不是可编辑的证据记录/);
assert.doesNotMatch(`${email.confirm.en} ${email.confirm.zh}`, /Leon|Echo|[A-Z][a-z]+ [A-Z][a-z]+/);
assert.match(maseMarketingHome.find((item) => item.id === "smart-pricing").confirm.en, /does not change prices/);
assert.doesNotMatch(JSON.stringify(home), /\$\d/);

const element = (type, props) => ({ type, props });
const nodes = (node) => !node || typeof node !== "object" ? [] : Array.isArray(node) ? node.flatMap(nodes) : [node, ...nodes(node.props?.children)];
const textOf = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(textOf).join("") : node?.props ? textOf(node.props.children) : "";
let locale = "en";
const reference = load("components/MaseMarketingHomeReference.tsx", {
  "@/lib/mase-marketing-home": home,
  "@/components/MarketingLocale": { useMarketingLocale: () => ({ locale, t: (en, zh) => locale === "zh" ? zh : en }) },
  "react/jsx-runtime": { jsx: element, jsxs: element },
  react: {},
}).default;
const renderReference = () => nodes(reference());
let tree = renderReference();
assert.equal(tree.some((node) => node.type === "button"), false);
assert.equal(tree.filter((node) => node.props?.["data-capability-status"]).length, 9);
for (const node of tree.filter((node) => node.props?.["data-capability-id"])) assert.equal(node.props["data-capability-status"], "unverified");
const english = textOf(tree);
assert.match(english, /MaSe marketing-home reference/);
assert.match(english, /Unverified — pending confirmation/);
assert.match(english, /not another customer-record system/);
assert.match(english, /static bilingual reference/);
const englishEmail = textOf(tree.find((node) => node.props?.["data-capability-id"] === "email"));
for (const field of ["recipient", "subject", "body", "attachments"]) assert.match(englishEmail, new RegExp(field, "i"));
assert.match(englishEmail, /explicit approval for that specific email/);
for (const item of maseMarketingHome) assert.ok(english.includes(item.name.en), item.id);
assert.equal(banned.test(english), false);
locale = "zh";
tree = renderReference();
const chinese = textOf(tree);
assert.match(chinese, /MaSe 营销首页对照/);
assert.match(chinese, /未核实——待确认/);
assert.match(chinese, /不是小红书/);
assert.match(chinese, /静态的中英对照说明/);
const chineseEmail = textOf(tree.find((node) => node.props?.["data-capability-id"] === "email"));
for (const field of ["向店主展示完整收件人名单", "取得店主对该封具体邮件的明确批准", "主题", "正文", "附件"]) assert.ok(chineseEmail.includes(field), field);
assert.equal(chineseEmail.includes("负责人"), false);
for (const item of maseMarketingHome) assert.ok(chinese.includes(item.name.zh), item.id);
assert.equal(banned.test(chinese), false);
assert.equal(tree.filter((node) => node.type === "span" && textOf(node) === "未核实——待确认").length, 9);

const growth = load("lib/marketing-growth.ts", { "./site": { site: { url: "https://mendbeauty.com.au", mapsHref: "https://maps.example", socialProfiles: { facebook: "https://facebook.example", instagram: "https://instagram.example" }, phone: "", email: "", wechat: "" } } });
assert.equal(growth.integrationDecisions.length, 5);
assert.equal(JSON.stringify(growth.integrationDecisions.map((item) => item.name)), JSON.stringify(["Google booking", "Website events", "Review Booster", "TapFlow", "Deskie"]));
assert.equal(growth.integrationDecisionsZh.length, 5);
for (const id of ids) assert.equal(growth.integrationDecisions.some((item) => item.name.toLowerCase().includes(id)), false);

let values = [], cursor = 0;
const workspace = load("components/MarketingPortalWorkspace.tsx", {
  react: { useState(initial) { const index = cursor++; if (!(index in values)) values[index] = initial; return [values[index], (next) => { values[index] = typeof next === "function" ? next(values[index]) : next; }]; } },
  "react/jsx-runtime": { jsx: element, jsxs: element },
  "next/link": { default: (props) => element("a", props) },
  "@/components/MarketingLocale": { useMarketingLocale: () => ({ locale, t: (en, zh) => locale === "zh" ? zh : en }) },
  "@/components/MarketingGrowthDesk": { default: () => element("div", { id: "growth-desk" }) },
  "@/components/LandingPageStudio": { default: () => element("div", { id: "landing-studio" }) },
  "@/components/MarketingOperatingGuide": { default: () => element("div", { id: "operating-guide" }) },
  "@/components/MaseMarketingHomeReference": { default: reference },
}).default;
const renderWorkspace = () => { cursor = 0; return nodes(workspace()); };
locale = "en";
tree = renderWorkspace();
const title = tree.find((node) => node.type === "input" && node.props.placeholder === "Example: Deepdene Head Spa landing page");
title.props.onChange({ target: { value: "Keep this draft title" } });
tree = renderWorkspace();
assert.equal(tree.find((node) => node.type === "input").props.value, "Keep this draft title");
assert.ok(tree.some((node) => node.type === reference));
locale = "zh";
tree = renderWorkspace();
assert.equal(tree.find((node) => node.type === "input").props.value, "Keep this draft title");
assert.equal(tree.find((node) => node.type === "input").props.placeholder, "示例：Deepdene 头疗落地页");
locale = "en";
tree = renderWorkspace();
assert.equal(tree.find((node) => node.type === "input").props.value, "Keep this draft title");

const guide = read("components/MarketingOperatingGuide.tsx");
assert.match(guide, /version: 1/);
assert.doesNotMatch(guide, /mase-marketing-home|MaseMarketingHomeReference/);
assert.match(read("app/(en)/services/hair/page.tsx"), /HairVisitGuide/);
assert.match(read("lib/qr-codes.ts"), /https:\/\/u\.wechat\.com\/kNVC5BSGLv-TksATEKFVjKs\?s=2/);
assert.match(read("lib/qr-codes.ts"), /id: "official-website"/);
assert.match(read("lib/marketing-growth.ts"), /https:\/\/g\.page\/r\/CdWYETxb3oZ6EBM\/review/);
assert.match(read("components/MarketingGrowthDesk.tsx"), /Existing printed review stand: retained/);
for (const file of ["lib/mase-marketing-home.ts", "components/MaseMarketingHomeReference.tsx"]) {
  const source = read(file);
  assert.doesNotMatch(source, /\/qr\/|next-auth|MARKETING_PORTAL|fetch\(|onClick|localStorage/);
  assert.equal(banned.test(source), false, file);
}
assert.match(read("components/MarketingPortalWorkspace.tsx"), /<MaseMarketingHomeReference \/>/);
assert.match(read("components/MarketingPortalWorkspace.tsx"), /href: "https:\/\/partners\.mase\.cloud\/"/);

console.log("MaSe marketing-home checks passed: nine unverified rows, bilingual pending-confirmation wording, no send controls, Growth Desk comparison unchanged, draft title retained across language switch, guide export and QR references untouched.");
