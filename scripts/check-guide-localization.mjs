import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual component with a minimal hook/JSX harness. No browser,
// network, real download, clipboard or shared-workspace writes are performed.
function load(file, imports = {}, globals = {}) {
  const exports = {};
  const source = readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(compiled, {
    exports,
    require(name) { assert.ok(name in imports, `Unexpected import: ${name}`); return imports[name]; },
    ...globals,
  });
  return exports;
}
const playbook = load("lib/marketing-playbook.ts");
const canonicalTasks = JSON.stringify(playbook.planTasks);
const preservedFields = new Set(["id", "window", "path", "href", "seeds"]);
let translatedStrings = 0;
function checkCopy(value, key = "") {
  if (preservedFields.has(key)) return;
  if (typeof value === "string") {
    assert.ok(Object.hasOwn(playbook.marketingChineseCopy, value), `Missing Chinese copy: ${value}`);
    assert.equal(playbook.marketingCopy(value, "en"), value);
    // Platform brand names are intentionally unchanged in both languages.
    if (value !== "Instagram / Facebook") assert.match(playbook.marketingCopy(value, "zh"), /[\u3400-\u9fff]/, value);
    translatedStrings++;
  } else if (value && typeof value === "object") {
    for (const [childKey, child] of Object.entries(value)) checkCopy(child, childKey);
  }
}
for (const key of ["strategyPrinciples", "remoteRoles", "planTasks", "channelPlaybooks", "keywordMap", "seoSteps", "aeoSteps", "answerQuestions", "serviceStandards", "metricDefinitions", "referenceLinks", "discoveryPrompts", "aeoPlatformGuidance"]) checkCopy(playbook[key]);
checkCopy(playbook.playbookVersion);
const source = readFileSync("components/MarketingOperatingGuide.tsx", "utf8");
const ast = ts.createSourceFile("guide.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function checkLiteralCopy(node) {
  if (ts.isCallExpression(node) && node.expression.getText(ast) === "copy" && ts.isStringLiteral(node.arguments[0])) checkCopy(node.arguments[0].text);
  if (ts.isJsxText(node)) assert.ok(!/[A-Za-z]/.test(node.text), `Unlocalized JSX text: ${node.text}`);
  ts.forEachChild(node, checkLiteralCopy);
}
checkLiteralCopy(ast);

let locale = "en", cursor = 0, states = [], effects = [], clipboardFails = false, copied = "", downloaded;
const listeners = new Map();
const element = (type, props) => ({ type, props });
const component = load("components/MarketingOperatingGuide.tsx", {
  "next/link": { default: "a" },
  "./MarketingLocale": { useMarketingLocale: () => ({ locale, t: (en, zh) => locale === "zh" ? zh : en }) },
  "@/lib/marketing-playbook": playbook,
  "react/jsx-runtime": { jsx: element, jsxs: element },
  react: {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
      return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; if (!(index in states)) states[index] = { current: initial }; return states[index]; },
    useEffect(callback) { effects.push(callback); },
  },
}, {
  Blob,
  URL: { createObjectURL(blob) { downloaded = blob; return "blob:test"; }, revokeObjectURL() {} },
  document: { createElement: () => ({ click() {} }) },
  navigator: { clipboard: { async writeText(value) { if (clipboardFails) throw new Error("denied"); copied = value; } } },
  window: { setTimeout(callback) { callback(); }, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: (name) => listeners.delete(name) },
}).default;
const nodes = (node) => !node || typeof node !== "object" ? [] : Array.isArray(node) ? node.flatMap(nodes) : [node, ...nodes(node.props?.children)];
const text = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
let tree;
function render() { cursor = 0; effects = []; tree = nodes(component()); effects.forEach((fn) => fn()); return tree; }
const find = (predicate) => { const found = tree.find(predicate); assert.ok(found, "Expected UI element missing"); return found; };
const button = (label) => find((n) => n.type === "button" && text(n) === label);
const report = () => find((n) => n.type === "textarea" && n.props.rows === 12);
const owner = () => find((n) => n.type === "input" && n.props.maxLength === 160);
const status = () => find((n) => n.type === "select" && nodes(n).some((c) => c.type === "option" && c.props.value === "Verified"));
const filter = () => find((n) => n.type === "select" && nodes(n).some((c) => c.type === "option" && c.props.value === "All tasks"));
const change = (node, value) => { node.props.onChange({ target: { value } }); render(); };
const hasStatus = (phrase) => tree.some((n) => n.props?.role === "status" && text(n).includes(phrase));
async function exportBoard(label) { button(label).props.onClick(); render(); return JSON.parse(await downloaded.text()); }
async function importBoard(value, raw = false) {
  const body = raw ? value : JSON.stringify(value);
  find((n) => n.type === "input" && n.props.type === "file").props.onChange({ target: { files: [{ size: body.length, text: async () => body }] } });
  await new Promise((resolve) => setImmediate(resolve));
  render();
}

render();
assert.match(report().props.value, /^Week \/ observation window:/);
locale = "zh"; render();
assert.match(report().props.value, /^周次 \/ 观察窗口：/);
locale = "en"; render();
change(owner(), "Coordinator 李 · keep exactly");
change(status(), "Verified");
change(report(), "User-edited report\n保留原文，不要翻译。");
assert.ok(listeners.has("beforeunload"));
const englishExport = await exportBoard("Export task file");
locale = "zh"; render();
assert.equal(owner().props.value, "Coordinator 李 · keep exactly");
assert.equal(status().props.value, "Verified");
assert.equal(report().props.value, "User-edited report\n保留原文，不要翻译。");
assert.ok(nodes(status()).some((n) => n.type === "option" && n.props.value === "Verified" && text(n) === "已核实"));
change(filter(), "First 7 days");
assert.equal(filter().props.value, "First 7 days");
locale = "en"; render();
assert.equal(filter().props.value, "First 7 days");
assert.equal(report().props.value, "User-edited report\n保留原文，不要翻译。");
locale = "zh"; render();
const chineseExport = await exportBoard("导出任务文件");
assert.deepEqual(chineseExport.tasks, englishExport.tasks);
assert.equal(chineseExport.version, 1);
assert.equal(chineseExport.guidance, playbook.playbookVersion);
assert.deepEqual(Object.keys(chineseExport.tasks), Array.from(playbook.planTasks, (task) => task.id));
assert.equal(chineseExport.tasks[playbook.planTasks[0].id].status, "Verified");
assert.equal(JSON.stringify(playbook.planTasks), canonicalTasks, "Localization must not mutate the canonical playbook");
await button("复制每周复盘").props.onClick(); await new Promise((resolve) => setImmediate(resolve)); render();
assert.equal(copied, "User-edited report\n保留原文，不要翻译。");
assert.ok(hasStatus("已复制每周复盘"));
locale = "en"; render(); assert.ok(hasStatus("Weekly review copied"));
clipboardFails = true;
await button("Copy weekly review").props.onClick(); await new Promise((resolve) => setImmediate(resolve)); render();
assert.ok(hasStatus("Select and copy"));
locale = "zh"; render(); assert.ok(hasStatus("请手动选择并复制"));
await importBoard("{ invalid json", true);
assert.ok(hasStatus("无法读取该文件"));
assert.equal(owner().props.value, "Coordinator 李 · keep exactly");
const missing = structuredClone(chineseExport); delete missing.tasks[playbook.planTasks[0].id];
await importBoard(missing);
assert.ok(hasStatus(`缺少任务 ${playbook.planTasks[0].id}`));
const invalid = structuredClone(chineseExport); invalid.tasks[playbook.planTasks[0].id].status = "已核实";
await importBoard(invalid); assert.ok(hasStatus("任务格式无效"));
await importBoard(chineseExport); assert.ok(hasStatus("验证通过"));
assert.equal(owner().props.value, "Coordinator 李 · keep exactly");
button("取消导入").props.onClick(); render(); assert.ok(hasStatus("已取消导入"));
const replacement = structuredClone(chineseExport); replacement.tasks[playbook.planTasks[0].id].owner = "Explicitly imported role";
await importBoard(replacement); button("替换任务字段").props.onClick(); render();
assert.equal(owner().props.value, "Explicitly imported role");
assert.equal(report().props.value, "User-edited report\n保留原文，不要翻译。");
locale = "en"; render();
assert.equal(owner().props.value, "Explicitly imported role");
assert.ok(hasStatus("Task file imported into this session only"));
console.log(`Guide localization checks passed: ${translatedStrings} translated data/UI strings, real component locale switching, preserved task/report/filter values, stable export schema/statuses, explicit import confirmation, localized validation and clipboard fallback. No external traffic sent.`);
