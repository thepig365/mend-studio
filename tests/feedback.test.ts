import assert from "node:assert/strict";
import { randomUUID, createHmac } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import type { Pool } from "pg";
import { validateFeedback, isFeedbackStaff, feedbackCopy } from "../lib/feedback/shared";
import { submitFeedback, type FeedbackDependencies } from "../lib/feedback/http";
import { saveFeedback, readFeedback, feedbackConnectionString, feedbackProviderFilter } from "../lib/feedback/store";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FeedbackForm from "../components/feedback/FeedbackForm";
import FeedbackStaffView from "../components/feedback/FeedbackStaffView";

const valid = () => ({ submissionId: randomUUID(), rating: 4, providerId: "mejin-shick", locale: "en", initials: "TEST", comment: "SYNTHETIC TEST — not a customer response", website: "" });
const request = (body: unknown, headers: Record<string, string> = {}) => new Request("https://mendbeauty.com.au/api/feedback", {
  method: "POST", headers: { origin: "https://mendbeauty.com.au", "content-type": "application/json", "x-vercel-forwarded-for": "192.0.2.1", ...headers }, body: JSON.stringify(body),
});
const deps = (overrides: Partial<FeedbackDependencies> = {}): FeedbackDependencies => ({ configured: () => true, secret: () => "synthetic-unit-test-secret", save: async () => "saved", production: true, ...overrides });

test("managed production binding always verifies TLS without exposing credentials", () => {
  const url = new URL(feedbackConnectionString("postgresql://synthetic:synthetic@example.invalid/db?sslmode=require&ssl=0", true));
  assert.equal(url.searchParams.get("sslmode"), "verify-full");
  assert.equal(url.searchParams.has("ssl"), false);
  assert.throws(() => feedbackConnectionString("not-a-url-SYNTHETIC-SECRET", true), { message: "Feedback storage configuration invalid" });
  assert.throws(() => feedbackConnectionString(undefined, true), { message: "Feedback storage unavailable" });
});

test("unhydrated forms cannot send feedback in a URL", () => {
  for (const locale of ["en", "zh"] as const) {
    const html = renderToStaticMarkup(createElement(FeedbackForm, { locale }));
    assert.match(html, /<form[^>]*method="post"/);
    assert.match(html, /<form[^>]*action="\/api\/feedback"/);
    assert.match(html, /<button[^>]*type="submit"[^>]*disabled=""/);
    assert.ok(html.includes(feedbackCopy[locale].nojs));
    assert.match(html, /<input(?=[^>]*name="providerName")(?=[^>]*maxLength="80")[^>]*>/);
    assert.doesNotMatch(html, /<select/);
    assert.ok(html.includes(feedbackCopy[locale].provider));
    assert.ok(html.includes(feedbackCopy[locale].providerHint));
  }
});

test("required rating, optional text, provider allowlist and honeypot validation", () => {
  assert.ok(validateFeedback(valid()));
  assert.equal(validateFeedback({ ...valid(), initials: "", comment: "", providerId: null })?.providerId, null);
  for (const change of [{ rating: 0 }, { rating: 6 }, { rating: 2.5 }, { rating: "5" }, { locale: "fr" }, { initials: "a".repeat(21) }, { comment: "a".repeat(501) }, { comment: "\0" }, { providerId: "invented" }, { website: "bot" }, { submissionId: "bad" }, { email: "not-collected" }]) {
    assert.equal(validateFeedback({ ...valid(), ...change }), null);
  }
  assert.equal(validateFeedback(null), null);
  assert.equal(validateFeedback([valid()]), null);
  assert.equal(feedbackCopy.en.ratings.length, 5);
  assert.equal(feedbackCopy.zh.ratings.length, 5);
});

test("staff allowlist rejects anonymous and other identities", () => {
  assert.equal(isFeedbackStaff(undefined, "hello@mendbeauty.com.au"), false);
  assert.equal(isFeedbackStaff("someone@example.com", "hello@mendbeauty.com.au"), false);
  assert.equal(isFeedbackStaff("hello@mendbeauty.com.au.attacker.example", "hello@mendbeauty.com.au"), false);
  assert.equal(isFeedbackStaff("HELLO@mendbeauty.com.au", "hello@mendbeauty.com.au"), true);
});

test("HTTP rejects cross-origin, invalid types, excessive bytes and missing trusted IP", async () => {
  let called = false;
  const d = deps({ save: async () => { called = true; return "saved"; } });
  assert.equal((await submitFeedback(request(valid(), { origin: "https://attacker.example" }), d)).status, 403);
  assert.equal((await submitFeedback(request(valid(), { origin: "" }), d)).status, 403);
  assert.equal((await submitFeedback(request(valid(), { "sec-fetch-site": "cross-site" }), d)).status, 403);
  assert.equal((await submitFeedback(request(valid(), { "content-type": "text/plain" }), d)).status, 415);
  assert.equal((await submitFeedback(request(valid(), { "content-length": "5000" }), d)).status, 413);
  assert.equal((await submitFeedback(request({ ...valid(), comment: "字".repeat(2000) }), d)).status, 400);
  assert.equal((await submitFeedback(request(valid(), { "x-vercel-forwarded-for": "", "x-forwarded-for": "192.0.2.2" }), d)).status, 503);
  assert.equal(called, false);
});

test("loopback development origins work without loosening production origins", async () => {
  const local = request(valid(), { origin: "http://127.0.0.1:3197" });
  assert.equal((await submitFeedback(local, deps({ production: false }))).status, 200);
  assert.equal((await submitFeedback(request(valid(), { origin: "http://127.0.0.1:3197" }), deps())).status, 403);
});

test("durability failure never becomes success or leaks exceptions", async () => {
  for (const d of [deps({ configured: () => false }), deps({ save: async () => { throw new Error("SECRET CUSTOMER CONTENT"); } })]) {
    const response = await submitFeedback(request(valid()), d);
    assert.equal(response.status, 503);
    assert.equal(await response.text(), '{"code":"unavailable"}');
    assert.match(response.headers.get("cache-control") || "", /no-store/);
  }
});

test("responses only acknowledge receipts; quota and conflict remain explicit", async () => {
  for (const [result, status] of [["saved", 200], ["duplicate", 200], ["conflict", 409], ["limited", 429]] as const) {
    const response = await submitFeedback(request(valid()), deps({ save: async (_input, rateKey, hash) => {
      assert.match(rateKey, /^[a-f0-9]{64}$/); assert.match(hash, /^[a-f0-9]{64}$/); return result;
    } }));
    assert.equal(response.status, status);
    assert.deepEqual(Object.keys(await response.json()), ["code"]);
    if (status === 429) assert.equal(response.headers.get("retry-after"), "3600");
  }
});

test("PostgreSQL migration, bilingual receipts, idempotency, provider filtering, limits and anonymous SQL denial", async () => {
  // PGlite is PostgreSQL compiled to WASM, entirely local. It does not establish
  // production connectivity or simulate multiple independent DB sessions.
  const db = new PGlite();
  try {
    await db.exec(await readFile(new URL("../migrations/001_customer_feedback.sql", import.meta.url), "utf8"));
    await db.exec(await readFile(new URL("../migrations/002_feedback_provider_names.sql", import.meta.url), "utf8"));
    const query = async (sql: string, values?: unknown[]) => {
      const result = await db.query(sql, values);
      return { rows: result.rows, rowCount: result.rows.length || result.affectedRows };
    };
    const connection = { query, release() {} };
    const pool = { query, connect: async () => connection } as unknown as Pool;
    const storage = deps({ save: (input, key, hash) => saveFeedback(input, key, hash, pool) });
    const english = valid();
    const chinese = { ...valid(), locale: "zh", providerId: null, comment: "合成测试，非真实顾客反馈 <script>不执行</script>" };
    assert.equal((await submitFeedback(request(english), storage)).status, 200);
    assert.equal((await submitFeedback(request(chinese), storage)).status, 200);
    assert.equal((await submitFeedback(request(english), storage)).status, 200);
    assert.equal((await submitFeedback(request({ ...english, rating: 1 }), storage)).status, 409);
    assert.equal((await readFeedback(undefined, pool)).entries.length, 2);
    const mejin = await readFeedback(feedbackProviderFilter("Mejin Shick"), pool);
    assert.equal(mejin.entries.length, 1);
    assert.equal(mejin.entries[0].comment, english.comment);
    const unassigned = await readFeedback(null, pool);
    assert.equal(unassigned.entries[0].comment, chinese.comment);
    assert.equal(unassigned.entries[0].locale, "zh");
    assert.equal(mejin.summary.find((r) => r.provider_filter === feedbackProviderFilter("Mejin Shick"))?.count, "1");
    for (let i = 0; i < 8; i++) assert.equal((await submitFeedback(request(valid()), storage)).status, 200);
    assert.equal((await submitFeedback(request(valid()), storage)).status, 429);
    assert.equal((await readFeedback(undefined, pool)).entries.length, 10);
    // A received duplicate still succeeds at the rate limit without consuming quota.
    assert.equal((await submitFeedback(request(english), storage)).status, 200);
    await db.exec("CREATE ROLE synthetic_anonymous NOLOGIN; SET ROLE synthetic_anonymous;");
    await assert.rejects(db.query("SELECT * FROM mend_feedback.entries"), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM mend_feedback.rate_limits"), /permission denied/);
    await db.exec("RESET ROLE;");
    // RLS denies reads even if a future operator accidentally grants table access.
    await db.exec("GRANT USAGE ON SCHEMA mend_feedback TO synthetic_anonymous; GRANT SELECT ON mend_feedback.entries TO synthetic_anonymous; SET ROLE synthetic_anonymous;");
    assert.equal((await db.query("SELECT * FROM mend_feedback.entries")).rows.length, 0);
    await db.exec("RESET ROLE;");
  } finally { await db.close(); }
});

const named = (providerName: string) => {
  const body = Object.fromEntries(Object.entries(valid()).filter(([key]) => key !== "providerId"));
  return { ...body, providerName };
};

test("optional Unicode names normalize safely while legacy request hashes stay unchanged", () => {
  assert.equal(validateFeedback(named("  E\u0301lodie\t 李  "))?.providerName, "Élodie 李");
  assert.equal(validateFeedback(named("   "))?.providerName, "");
  assert.equal(validateFeedback(named("李".repeat(80)))?.providerName?.length, 80);
  for (const providerName of ["李".repeat(81), "a\0b", 42, null]) {
    assert.equal(validateFeedback({ ...named(""), providerName }), null);
  }
  assert.equal(validateFeedback({ ...named("name"), providerId: null }), null);
  const legacy = valid();
  assert.equal(JSON.stringify(validateFeedback(legacy)), JSON.stringify({ submissionId: legacy.submissionId, rating: legacy.rating, providerId: legacy.providerId, locale: legacy.locale, initials: legacy.initials, comment: legacy.comment }));
  assert.equal(feedbackProviderFilter(" ÉLODIE  李 "), feedbackProviderFilter("E\u0301lodie 李"));
});

test("additive name migration preserves history, combines normalized groups and escapes private names", async () => {
  const db = new PGlite();
  try {
    await db.exec(await readFile(new URL("../migrations/001_customer_feedback.sql", import.meta.url), "utf8"));
    const historical = [valid(), { ...valid(), providerId: null }];
    for (const old of historical) {
      const input = validateFeedback(old)!;
      const hash = createHmac("sha256", "synthetic-unit-test-secret").update(`feedback-body:${JSON.stringify(input)}`).digest("hex");
      await db.query(`INSERT INTO mend_feedback.entries (submission_id, rating, provider_id, locale, initials, comment, request_hash) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [input.submissionId, input.rating, input.providerId, input.locale, input.initials, input.comment, hash]);
    }
    const oldColumns = "submission_id, created_at, rating, provider_id, locale, initials, comment, request_hash";
    const before = (await db.query(`SELECT ${oldColumns} FROM mend_feedback.entries ORDER BY submission_id`)).rows;
    await db.exec(await readFile(new URL("../migrations/002_feedback_provider_names.sql", import.meta.url), "utf8"));
    assert.deepEqual((await db.query(`SELECT ${oldColumns} FROM mend_feedback.entries ORDER BY submission_id`)).rows, before);
    assert.equal((await db.query("SELECT * FROM mend_feedback.entries WHERE provider_name IS NOT NULL OR provider_key IS NOT NULL")).rows.length, 0);
    const query = async (sql: string, values?: unknown[]) => {
      const result = await db.query(sql, values);
      return { rows: result.rows, rowCount: result.rows.length || result.affectedRows };
    };
    const pool = { query, connect: async () => ({ query, release() {} }) } as unknown as Pool;
    const storage = deps({ save: (input, key, hash) => saveFeedback(input, key, hash, pool) });
    // A form submitted before the migration still retries successfully afterward.
    assert.equal((await submitFeedback(request(historical[0]), storage)).status, 200);
    const unicode = named("  E\u0301lodie   李  ");
    const blank = { ...named("  "), locale: "zh" };
    for (const body of [unicode, named("ÉLODIE 李"), blank, named(" mejin   SHICK "), named("<script>synthetic</script>")]) {
      assert.equal((await submitFeedback(request(body), storage)).status, 200);
    }
    assert.equal((await submitFeedback(request(unicode), storage)).status, 200);
    assert.equal((await submitFeedback(request({ ...unicode, providerName: "different" }), storage)).status, 409);
    const group = await readFeedback(feedbackProviderFilter("élodie 李"), pool);
    assert.equal(group.entries.length, 2);
    assert.ok(group.entries.every((entry) => entry.provider_id === null));
    assert.equal(group.summary.find((row) => row.provider_filter === feedbackProviderFilter("Élodie 李"))?.count, "2");
    assert.equal((await readFeedback(feedbackProviderFilter("Mejin Shick"), pool)).entries.length, 2);
    assert.equal((await readFeedback(null, pool)).entries.length, 2);
    const all = await readFeedback(undefined, pool);
    assert.equal(all.entries.length, 7);
    const html = renderToStaticMarkup(createElement(FeedbackStaffView, { data: all, selected: undefined }));
    assert.ok(html.includes("&lt;script&gt;synthetic&lt;/script&gt;"));
    assert.doesNotMatch(html, /<script>/);
    assert.ok(html.includes(`value="${feedbackProviderFilter("<script>synthetic</script>")}"`));
    assert.doesNotMatch(html, /value="[^"]*(?:ÉLODIE|Élodie|李|script)/);
    await db.exec("CREATE ROLE synthetic_named_anonymous NOLOGIN; SET ROLE synthetic_named_anonymous;");
    await assert.rejects(db.query("SELECT provider_name FROM mend_feedback.entries"), /permission denied/);
  } finally { await db.close(); }
});
