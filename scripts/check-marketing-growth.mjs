import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const load = (file, imports, globals = {}) => {
  const exports = {};
  const source = readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(compiled, { exports, URL, require: (name) => { assert.ok(name in imports, name); return imports[name]; }, ...globals });
  return exports;
};
const { site } = load("lib/site.ts", {});
const growth = load("lib/marketing-growth.ts", { "./site": { site } });
const { buildCampaignUrl: url, buildGrowthBrief: brief, growthWorkflows } = growth;
assert.equal(url("/services/hair", "instagram", "hair-2026"), `${site.url}/services/hair?utm_source=instagram&utm_medium=social&utm_campaign=hair-2026`);
assert.match(url("/zh/services/head-spa", "google_business_profile", "spa"), /utm_medium=organic/);
for (const path of ["https://evil.test", "//evil.test", "/\\evil", "/marketing", "/api/auth", "/book", "/zh/book", "/%6darketing", "/services/../marketing", "/services/hair?email=a", "/services/hair#x", "/services/hair extra"]) assert.equal(url(path, "instagram", "ok"), "", path);
for (const campaign of ["", "User@email", "Name Here", "X".repeat(81)]) assert.equal(url("/", "instagram", campaign), "");
assert.equal(url("/", "unknown", "ok"), "");
assert.equal(brief("unknown", "facts", "", ""), "");
assert.equal(brief("seo", "  ", "", ""), "");
for (const workflow of growthWorkflows) {
  const text = brief(workflow.id, "Approved public facts", "", "");
  assert.match(text, /DRAFT ONLY/);
  assert.match(text, /Not supplied; verify/);
  assert.match(text, /Do not publish, send messages/);
  assert.ok(text.includes(workflow.deliverable));
  for (const link of workflow.links) assert.equal(new URL(link.href).protocol, "https:");
}

// Exercise real component state, workstream switching and denied clipboard.
let values = [], cursor = 0, clipboardFails = false, copied = "", locale = "en";
const effects = [], listeners = new Map();
const element = (type, props) => ({ type, props });
const component = load("components/MarketingGrowthDesk.tsx", {
  "@/lib/marketing-growth": growth,
  "@/components/MarketingLocale": { useMarketingLocale: () => ({ locale, t: (en, zh) => locale === "zh" ? zh : en }) },
  "react/jsx-runtime": { jsx: element, jsxs: element },
  react: {
    useState(initial) { const index = cursor++; if (!(index in values)) values[index] = initial; return [values[index], (value) => { values[index] = value; }]; },
    useEffect(callback) { effects.push(callback); },
  },
}, {
  navigator: { clipboard: { async writeText(text) { if (clipboardFails) throw Error("denied"); copied = text; } } },
  window: { addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) },
}).default;
const nodes = (node) => !node || typeof node !== "object" ? [] : Array.isArray(node) ? node.flatMap(nodes) : [node, ...nodes(node.props?.children)];
const text = (node) => typeof node === "string" ? node : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const render = () => { cursor = 0; effects.length = 0; const tree = component(); effects.forEach((fn) => fn()); return nodes(tree); };
let tree = render();
const findButton = (label) => tree.find((n) => n.type === "button" && text(n) === label);
assert.equal(findButton("Copy task brief").props.disabled, true);
const editable = tree.filter((n) => n.type === "textarea" && !n.props.readOnly);
editable[0].props.onChange({ target: { value: "Approved haircut service" } });
editable[1].props.onChange({ target: { value: "Observed 7 November" } });
tree = render();
assert.equal(findButton("Copy task brief").props.disabled, false);
assert.ok(listeners.has("beforeunload"));
for (const workflow of growthWorkflows) {
  findButton(workflow.title).props.onClick(); tree = render();
  assert.equal(findButton(workflow.title).props["aria-pressed"], true);
  assert.ok(tree.some((n) => n.type === "textarea" && n.props.value === "Approved haircut service"));
}
await findButton("Copy task brief").props.onClick(); tree = render();
assert.match(copied, /AEO \/ AI discovery/);
assert.ok(tree.some((n) => n.props?.role === "status" && text(n).includes("Nothing was sent")));
clipboardFails = true;
await findButton("Copy task brief").props.onClick(); tree = render();
assert.ok(tree.some((n) => n.props?.role === "status" && text(n).includes("Select and copy")));
console.log("Growth Desk checks passed: five workstreams, draft boundaries, campaign validation, tab preservation, unload warning and clipboard fallback. No external traffic sent.");

locale = "zh"; tree = render();
assert.ok(tree.some((n) => n.type === "h2" && text(n) === "增长工作台"));
assert.ok(tree.some((n) => n.type === "textarea" && n.props.value === "Approved haircut service"));
assert.ok(tree.some((n) => n.type === "textarea" && /MEND 增长工作台/.test(n.props.value)));
assert.equal(findButton("复制任务简报").props.disabled, false);
for (const item of growth.getGrowthWorkflows("zh")) {
  findButton(item.title).props.onClick(); tree = render();
  assert.equal(findButton(item.title).props["aria-pressed"], true);
  assert.ok(item.steps.every((step) => /[\u4e00-\u9fff]/.test(step)));
}
locale = "en"; tree = render();
assert.ok(tree.some((n) => n.type === "textarea" && n.props.value === "Approved haircut service"));
console.log("Growth Desk bilingual checks passed: Chinese workstreams/briefs and switching preserves entered facts.");
