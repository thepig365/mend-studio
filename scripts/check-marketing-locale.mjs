import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const code = ts.transpileModule(readFileSync("components/MarketingLocale.tsx", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const jsx = (type, props) => ({ type, props });
let state = "en", effect, stored = "zh", denied = false, preference;
const exports = {};
vm.runInNewContext(code, {
  exports,
  window: { requestAnimationFrame: (fn) => { fn(); return 1; }, cancelAnimationFrame() {}, localStorage: { getItem: () => { if (denied) throw Error(); return stored; }, setItem: (key, value) => { if (denied) throw Error(); preference = [key, value]; } } },
  require: (name) => name === "react/jsx-runtime" ? { jsx, jsxs: jsx } : { createContext: (value) => ({ Provider: "Provider", value }), useContext: (context) => context.value, useState: () => [state, (value) => { state = value; }], useEffect: (fn) => { effect = fn; } },
});
const nodes = (node) => !node || typeof node !== "object" ? [] : Array.isArray(node) ? node.flatMap(nodes) : [node, ...nodes(node.props?.children)];
const child = { type: "existing-workspace", props: { value: "unsaved operator work" } };
let tree = exports.default({ children: child }); effect(); tree = exports.default({ children: child });
assert.equal(tree.props.value.locale, "zh");
assert.equal(tree.props.value.t("English", "中文"), "中文");
assert.ok(nodes(tree).some((node) => node.props?.lang === "zh-Hans"));
assert.ok(nodes(tree).includes(child));
const buttons = () => nodes(tree).filter((node) => node.type === "button");
buttons().find((node) => node.props.children === "English").props.onClick();
tree = exports.default({ children: child });
assert.equal(state, "en"); assert.deepEqual(preference, ["mend-marketing-language", "en"]); assert.ok(nodes(tree).includes(child));
denied = true; buttons().find((node) => node.props.children === "中文").props.onClick(); tree = exports.default({ children: child });
assert.equal(state, "zh"); assert.ok(nodes(tree).includes(child));
assert.match(readFileSync("app/(en)/marketing/layout.tsx", "utf8"), /<MarketingLocale>\{children\}<\/MarketingLocale>/);
console.log("Marketing locale checks passed: stored preference hydration, English/Chinese controls, blocked storage fallback, lang attribute, stable child identity and scoped layout.");
