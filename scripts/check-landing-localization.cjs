/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS regression test. */
/* Exercise the real component with in-memory React state and mocked browser APIs. */
const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const element = (type, props) => ({ type, props });
const nodes = (node) => !node || typeof node !== "object" ? []
  : Array.isArray(node) ? node.flatMap(nodes) : [node, ...nodes(node.props?.children)];
const text = (node) => typeof node === "string" ? node
  : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";

function harness() {
  const values = [], opened = [], timers = [];
  let cursor = 0, locale = "en", copied = "";
  const exports = {};
  const imports = {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in values)) values[index] = initial;
        return [values[index], (value) => { values[index] = value; }];
      },
      useMemo(callback) { return callback(); },
    },
    "react/jsx-runtime": { jsx: element, jsxs: element },
    "./MarketingLocale": {
      useMarketingLocale() { return { locale, t: (en, zh) => locale === "zh" ? zh : en }; },
    },
  };
  const source = fs.readFileSync(path.join(__dirname, "../components/LandingPageStudio.tsx"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(compiled, {
    exports,
    require(name) { assert.ok(name in imports, `Unexpected import: ${name}`); return imports[name]; },
    navigator: { clipboard: { async writeText(value) { copied = value; } } },
    window: { open: (...args) => opened.push(args), setTimeout(callback) { timers.push(callback); } },
  });
  return {
    render() { cursor = 0; return nodes(exports.default()); },
    setLocale(value) { locale = value; },
    flushTimers() { timers.splice(0).forEach((callback) => callback()); },
    get copied() { return copied; },
    get values() { return [...values]; },
    get opened() { return opened; },
  };
}

async function main() {
  const app = harness();
  let tree = app.render();
  const button = (label) => {
    const found = tree.find((node) => node.type === "button" && text(node) === label);
    assert.ok(found, `Missing button: ${label}`);
    return found;
  };
  const edit = (placeholder, value) => {
    const found = tree.find((node) => node.props.placeholder === placeholder);
    assert.ok(found, `Missing field: ${placeholder}`);
    found.props.onChange({ target: { value } });
  };
  const checkboxes = () => tree.filter((node) => node.type === "input" && node.props.type === "checkbox");
  const brief = () => tree.find((node) => node.type === "textarea" && node.props.readOnly).props.value;

  assert.equal(button("Copy landing-page brief").props.disabled, true);
  assert.equal(button("1. Publish approved page").props.disabled, true);
  assert.equal(button("2. Submit to Google").props.disabled, true);
  assert.equal(button("3. Verify in Analytics").props.disabled, true);
  assert.match(brief(), /MEND LANDING PAGE BUILD — DRAFT ONLY/);
  assert.match(brief(), /The AI must not approve or publish its own work/);

  edit("Example: MEND Signature Head Ritual", "Approved title");
  edit("Add only approved facts. Do not paste customer records, passwords or private analytics.", "Approved facts");
  edit("/offers/winter-head-spa", "/offers/approved");
  edit("https://preview.example.vercel.app/offers/...", "https://preview.example.com/approved");
  tree.filter((node) => node.type === "select")[0].props.onChange({ target: { value: "Promotion or offer" } });
  tree.filter((node) => node.type === "select")[1].props.onChange({ target: { value: "Codex" } });
  tree = app.render();
  assert.equal(button("Copy landing-page brief").props.disabled, false);
  assert.equal(button("1. Publish approved page").props.disabled, true);
  assert.match(brief(), /Page type: Promotion or offer/);
  assert.match(brief(), /Do not merge or deploy to production without Leon's explicit approval/);
  await button("Copy landing-page brief").props.onClick();
  assert.equal(app.copied, brief());
  const optionValues = tree.filter((node) => node.type === "option").map((node) => node.props.value);
  assert.ok(optionValues.every((value) => typeof value === "string" && value.length > 0));

  let state = app.values;
  app.setLocale("zh");
  tree = app.render();
  assert.deepEqual(app.values, state, "Language switch must retain every input and approval state");
  assert.deepEqual(tree.filter((node) => node.type === "option").map((node) => node.props.value), optionValues);
  assert.ok(tree.some((node) => node.type === "option" && node.props.value === "Promotion or offer" && text(node) === "促销或优惠"));
  assert.match(brief(), /页面类型: 促销或优惠/);
  assert.match(brief(), /未经 Leon 明确批准，不得合并或部署至生产环境。/);
  assert.match(brief(), /本输出仍为草稿。AI 不得自行批准或发布自己的工作成果。/);
  assert.equal(button("1. 发布已批准的页面").props.disabled, true);

  checkboxes()[0].props.onChange({ target: { checked: true } });
  tree = app.render();
  assert.equal(button("1. 发布已批准的页面").props.disabled, false);
  assert.equal(button("2. 提交至 Google").props.disabled, true);
  assert.equal(button("3. 在 Analytics 中核验").props.disabled, true);
  await button("1. 发布已批准的页面").props.onClick();
  assert.match(app.copied, /MEND 落地页发布任务 — 已获 Leon 批准/);
  assert.match(app.copied, /已批准的制作任务说明/);
  assert.match(app.copied, /https:\/\/mendbeauty.com.au\/offers\/approved/);
  assert.equal(app.opened[0][0], "https://chatgpt.com/codex");

  tree = app.render();
  checkboxes()[1].props.onChange({ target: { checked: true } });
  tree = app.render();
  assert.equal(button("2. 提交至 Google").props.disabled, false);
  assert.equal(button("3. 在 Analytics 中核验").props.disabled, false);
  await button("2. 提交至 Google").props.onClick();
  assert.equal(app.copied, "https://mendbeauty.com.au/offers/approved\nhttps://mendbeauty.com.au/sitemap.xml");
  assert.equal(app.opened[1][0], "https://search.google.com/search-console?resource_id=sc-domain:mendbeauty.com.au");
  await button("3. 在 Analytics 中核验").props.onClick();
  assert.equal(app.copied, "https://mendbeauty.com.au/offers/approved");
  assert.equal(app.opened[2][0], "https://analytics.google.com/");

  app.flushTimers();
  edit("/offers/winter-head-spa", "/offers/changed");
  tree = app.render();
  assert.equal(button("2. 提交至 Google").props.disabled, true);
  assert.equal(button("3. 在 Analytics 中核验").props.disabled, true);
  state = app.values;
  app.setLocale("en");
  tree = app.render();
  assert.deepEqual(app.values, state);
  assert.ok(tree.some((node) => node.type === "input" && node.props.value === "Approved title"));
  assert.ok(tree.some((node) => node.type === "select" && node.props.value === "Promotion or offer"));
  assert.match(brief(), /Page type: Promotion or offer/);

  // A checked approval alone must not bypass required path, review URL or facts.
  edit("https://preview.example.vercel.app/offers/...", "http://preview.example.com/approved");
  tree = app.render();
  assert.equal(button("1. Publish approved page").props.disabled, true);
  edit("https://preview.example.vercel.app/offers/...", "https://preview.example.com/approved");
  edit("/offers/winter-head-spa", "?invalid");
  tree = app.render();
  assert.equal(button("1. Publish approved page").props.disabled, true);
  edit("/offers/winter-head-spa", "/offers/approved");
  edit("Add only approved facts. Do not paste customer records, passwords or private analytics.", "");
  tree = app.render();
  assert.equal(button("Copy landing-page brief").props.disabled, true);
  assert.equal(button("1. Publish approved page").props.disabled, true);

  console.log("Landing localization checks passed: English and Chinese briefs, stable options, retained inputs, approval gates, production verification reset and unchanged destinations. Browser/clipboard calls mocked; no external action taken.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
