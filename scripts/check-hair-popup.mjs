import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compile = (file) => ts.transpileModule(readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const policy = {};
vm.runInNewContext(compile("lib/hair-offer-popup.ts"), { exports: policy });
const offers = {};
vm.runInNewContext(compile("lib/promotions.ts"), { exports: offers, require: () => ({}) });
const compiled = compile("components/HairOfferPopup.tsx");

// Exercise the actual component's timers, effects and handlers without a
// browser, collecting data or generating analytics traffic.
function mount(path = "/", storage = new Map(), storageBlocked = false) {
  let pathname = path;
  let index = 0;
  let dirty = false;
  let now = 0;
  let timerId = 0;
  let output = null;
  let busy = false;
  let pending = [];
  const slots = [];
  const timers = new Map();
  const listeners = new Map();
  const same = (a, b) => a && b && a.length === b.length && a.every((item, i) => item === b[i]);
  class Element {
    constructor(tagName = "A") { this.tagName = tagName; this.isConnected = true; this.isContentEditable = false; this.focusCount = 0; }
    focus() { this.focusCount++; document.activeElement = this; }
    contains(element) { return element === this || (this === card && [close, cta].includes(element)); }
  }
  const body = new Element("BODY");
  const previous = new Element();
  const header = new Element();
  const card = new Element("ASIDE");
  const close = new Element("BUTTON");
  const cta = new Element();
  const document = {
    body, activeElement: previous, visibilityState: "visible",
    querySelector: (selector) => selector === "header a[href]" ? header : busy ? {} : null,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const window = {
    sessionStorage: {
      getItem: (key) => { if (storageBlocked) throw Error("unavailable"); return storage.get(key); },
      setItem: (key, value) => { if (storageBlocked) throw Error("unavailable"); storage.set(key, value); },
    },
    setTimeout: (callback, delay) => { const id = ++timerId; timers.set(id, { callback, due: now + delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
  };
  const modules = {
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    "next/navigation": { usePathname: () => pathname },
    "@/lib/hair-offer-popup": policy,
    "@/lib/promotions": offers,
    "@/lib/i18n": { isChinesePath: (value) => value === "/zh" || value.startsWith("/zh/"), localePath: (value, locale) => locale === "zh-Hans" ? `/zh${value}` : value },
    react: {
      useState(initial) { const i = index++; if (!(i in slots)) slots[i] = initial; return [slots[i], (value) => { slots[i] = value; dirty = true; }]; },
      useRef(initial) { const i = index++; return slots[i] ??= { current: initial }; },
      useCallback(callback, deps) { const i = index++; if (!same(slots[i]?.deps, deps)) slots[i] = { callback, deps }; return slots[i].callback; },
      useEffect(callback, deps) { const i = index++; if (!same(slots[i]?.deps, deps)) pending.push(() => { slots[i]?.cleanup?.(); slots[i] = { deps, cleanup: callback() }; }); },
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, window, document, HTMLElement: Element, require: (name) => {
    assert.ok(name in modules, `Unexpected import ${name}`); return modules[name];
  } });
  function render() {
    index = 0; pending = []; dirty = false;
    output = exports.default();
    slots[1].current = output ? card : null;
    pending.forEach((effect) => effect());
  }
  function nodes(node = output) {
    if (!node || typeof node !== "object") return [];
    return [node, ...[node.props?.children].flat(Infinity).flatMap((child) => nodes(child))];
  }
  render();
  return {
    document, previous, close, cta, header, storage, timers,
    get output() { return output; },
    nodes,
    navigate(value) { pathname = value; render(); },
    block(value) { busy = value; },
    editing(value) { document.activeElement = value ? new Element("INPUT") : previous; },
    advance(duration) {
      const end = now + duration;
      for (;;) {
        const next = [...timers.entries()].sort((a, b) => a[1].due - b[1].due)[0];
        if (!next || next[1].due > end) break;
        now = next[1].due; timers.delete(next[0]); next[1].callback(); if (dirty) render();
      }
      now = end;
    },
    key(key, defaultPrevented = false) { listeners.get("keydown")?.({ key, defaultPrevented }); if (dirty) render(); },
    dismiss() { nodes().find((node) => node.type === "button").props.onClick(); if (dirty) render(); },
  };
}

for (const path of ["/book", "/zh/book", "/contact", "/zh/contact", "/marketing", "/marketing/login", "/api/auth/signin", "/promotions", "/promotions/first-hair-visit", "/zh/promotions/first-hair-visit", "/services/skin-facial", "/team/mejin-shick"]) {
  const test = mount(path); test.advance(60000);
  assert.equal(test.output, null, `${path} must not display a popup`);
  assert.equal(test.storage.size, 0);
  assert.equal(test.timers.size, 0);
}
for (const path of ["/", "/zh", "/services/hair", "/zh/services/hair"]) {
  const test = mount(path);
  test.advance(5999); assert.equal(test.output, null);
  test.advance(1); assert.equal(test.output.type, "aside");
  assert.equal(test.previous.focusCount, 0, "Automatic appearance never steals focus");
  assert.equal(test.document.activeElement, test.previous);
  assert.equal(test.storage.get(policy.hairOfferPopupSessionKey), "shown");
  const links = test.nodes().filter((node) => node.type === "a");
  assert.equal(links.length, 1, "One offer CTA");
  assert.equal(links[0].props.href, `${path.startsWith("/zh") ? "/zh" : ""}/promotions/first-hair-visit`);
  assert.equal(test.nodes().filter((node) => ["form", "input", "dialog"].includes(node.type)).length, 0, "No collection or modal backdrop");
  assert.ok(test.nodes().some((node) => node.type === "button" && node.props["aria-label"]));
  assert.equal(test.output.props["aria-modal"], undefined);
  test.key("Tab"); assert.ok(test.output, "Ordinary keyboard navigation is not trapped");
  test.key("Escape", true); assert.ok(test.output, "Respect Escape handled by another control");
  test.key("Escape"); assert.equal(test.output, null);
  assert.equal(test.previous.focusCount, 0, "Escape outside the card does not move focus");
  test.navigate(path === "/zh" ? "/services/hair" : "/zh"); test.advance(60000);
  assert.equal(test.output, null, "Language and route changes do not repeat the offer");
  const reload = mount(path, test.storage); reload.advance(60000);
  assert.equal(reload.output, null, "Reload in the same tab session stays suppressed");
}
const focus = mount(); focus.advance(6000); focus.document.activeElement = focus.close; focus.dismiss();
assert.equal(focus.document.activeElement, focus.previous, "Dismiss from within card returns prior focus");
assert.equal(focus.output, null);
const abandoned = mount(); abandoned.advance(3000); abandoned.navigate("/book"); abandoned.advance(6000);
assert.equal(abandoned.output, null); assert.equal(abandoned.storage.size, 0, "Leaving before delay does not mark shown");
const busy = mount(); busy.block(true); busy.advance(12000); assert.equal(busy.output, null);
busy.block(false); busy.editing(true); busy.advance(4000); assert.equal(busy.output, null);
busy.editing(false); busy.document.visibilityState = "hidden"; busy.advance(4000); assert.equal(busy.output, null);
busy.document.visibilityState = "visible"; busy.advance(2000); assert.ok(busy.output, "Wait for consent prompt/modal/menu/editing/background state to clear");
const unavailable = mount("/", new Map(), true); unavailable.advance(60000); assert.equal(unavailable.output, null);
console.log("Hair popup checks passed: exact route allowlist, six-second delay, EN/ZH destinations, once per tab session, blocked-storage fallback, busy-state deferral, no autofocus/modal/form, Escape and focus return, route cleanup.");
