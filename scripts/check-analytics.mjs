import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the real component without loading Google or sending test traffic.
const source = readFileSync(process.argv[2] ?? "components/Analytics.tsx", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount(storedConsent) {
  let consent = null;
  let pathname = "/";
  let effectIndex = 0;
  let pending = [];
  const effects = [];
  const scripts = [];
  const listeners = new Map();
  const window = {
    location: { href: "https://example.test/", pathname },
    localStorage: { getItem: () => storedConsent },
    requestAnimationFrame: (callback) => { callback(); return 1; },
    cancelAnimationFrame() {},
  };
  const document = {
    title: "Test page",
    querySelector: () => scripts[0] ?? null,
    createElement: () => ({ dataset: {} }),
    head: { appendChild: (script) => scripts.push(script) },
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const modules = {
    "react/jsx-runtime": { jsx: () => null, jsxs: () => null },
    "next/link": { default: () => null },
    "next/navigation": { usePathname: () => pathname },
    react: {
      useState: () => [consent, (value) => { consent = value; }],
      useEffect(callback, deps) {
        const index = effectIndex++;
        const previous = effects[index];
        if (!previous || deps.some((value, i) => value !== previous.deps[i])) {
          pending.push(() => {
            previous?.cleanup?.();
            effects[index] = { deps, cleanup: callback() };
          });
        }
      },
    },
    "@/lib/i18n": {
      chineseLocale: "zh-Hans",
      isChinesePath: (path) => path.startsWith("/zh"),
      localePath: (path) => path,
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports, window, document,
    process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TESTONLY" } },
    require: (name) => {
      assert.ok(name in modules, `Unexpected import: ${name}`);
      return modules[name];
    },
  });
  function render() {
    effectIndex = 0;
    pending = [];
    exports.default();
    pending.forEach((effect) => effect());
  }
  render();
  render(); // Hydrate the previously stored consent choice.
  return {
    window, scripts, listeners,
    navigate(path) {
      pathname = path;
      window.location = { href: `https://example.test${path}`, pathname: path };
      render();
    },
  };
}

for (const consent of [null, "declined"]) {
  const page = mount(consent);
  page.navigate("/services");
  assert.equal(page.scripts.length, 0, "No Google script before consent");
  assert.equal(page.window.dataLayer, undefined, "No queued analytics before consent");
  assert.equal(page.listeners.size, 0, "No click tracking before consent");
}

const accepted = mount("accepted");
assert.equal(accepted.scripts.length, 1);
assert.equal(accepted.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TESTONLY");
const commands = accepted.window.dataLayer;
for (const command of commands) {
  assert.equal(Object.prototype.toString.call(command), "[object Arguments]",
    "gtag commands must use the Google tag Arguments-object contract");
}
assert.deepEqual(Array.from(commands, (command) => command[0]), ["js", "config", "event"]);
assert.equal(commands[1][1], "G-TESTONLY");
assert.equal(commands[1][2].send_page_view, false);
assert.equal(commands[2][1], "page_view");
assert.equal(commands[2][2].page_path, "/");
accepted.navigate("/zh/services/hair-scalp-recovery");
assert.equal(accepted.scripts.length, 1, "Navigation must not reload the Google tag");
assert.equal(commands.length, 4, "Navigation queues exactly one additional page view");
assert.equal(commands[3][1], "page_view");
assert.equal(commands[3][2].page_path, "/zh/services/hair-scalp-recovery");
console.log("Analytics checks passed: consent gate, Google tag command format, single initialization and route page views.");
