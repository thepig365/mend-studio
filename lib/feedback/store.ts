import { Pool } from "pg";
import { createHash } from "node:crypto";
import { normalizeProviderName, type FeedbackInput } from "./shared";
import type { SaveResult } from "./http";

let pool: Pool | undefined;
// The managed Neon binding may specify sslmode=require. Enforce full certificate
// verification in memory without viewing, copying or editing the stored secret.
export function feedbackConnectionString(value: string | undefined, production: boolean) {
  if (!value) throw new Error("Feedback storage unavailable");
  try {
    const url = new URL(value);
    if (!["postgres:", "postgresql:"].includes(url.protocol)) throw new Error();
    if (production) {
      url.searchParams.delete("ssl");
      url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
  } catch { throw new Error("Feedback storage configuration invalid"); }
}

export function isFeedbackConfigured() {
  return Boolean(process.env.FEEDBACK_DATABASE_URL && process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

function database() {
  if (!pool) {
    const connectionString = feedbackConnectionString(process.env.FEEDBACK_DATABASE_URL, process.env.NODE_ENV === "production");
    pool = new Pool({ connectionString, max: 3, connectionTimeoutMillis: 5000, idleTimeoutMillis: 10000, statement_timeout: 5000 });
    pool.on("error", () => { /* No response data or connection details in logs. */ });
  }
  return pool;
}

export async function saveFeedback(input: FeedbackInput, rateKey: string, requestHash: string, db: Pool = database()): Promise<SaveResult> {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    // Serialize one idempotency key across server instances before consuming quota.
    await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 0))", [input.submissionId]);
    const existing = await client.query("SELECT request_hash FROM mend_feedback.entries WHERE submission_id = $1", [input.submissionId]);
    if (existing.rowCount) {
      await client.query("COMMIT");
      return existing.rows[0].request_hash === requestHash ? "duplicate" : "conflict";
    }
    // Limits are shared and atomic across every Vercel function instance.
    const quota = await client.query(`
      INSERT INTO mend_feedback.rate_limits (subject, bucket, submissions)
      VALUES ($1, date_trunc('hour', now()), 1)
      ON CONFLICT (subject, bucket) DO UPDATE SET submissions = mend_feedback.rate_limits.submissions + 1
      WHERE mend_feedback.rate_limits.submissions < 10 RETURNING submissions`, [rateKey]);
    if (!quota.rowCount) { await client.query("ROLLBACK"); return "limited"; }
    const total = await client.query(`
      INSERT INTO mend_feedback.rate_limits (subject, bucket, submissions)
      VALUES ('global', date_trunc('hour', now()), 1)
      ON CONFLICT (subject, bucket) DO UPDATE SET submissions = mend_feedback.rate_limits.submissions + 1
      WHERE mend_feedback.rate_limits.submissions < 200 RETURNING submissions`);
    if (!total.rowCount) { await client.query("ROLLBACK"); return "limited"; }
    await client.query(`INSERT INTO mend_feedback.entries
      (submission_id, rating, provider_id, locale, initials, comment, request_hash, provider_name, provider_key)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [input.submissionId, input.rating, input.providerId, input.locale, input.initials, input.comment, requestHash, input.providerName || null, input.providerName?.toLowerCase() || null]);
    await client.query("DELETE FROM mend_feedback.rate_limits WHERE bucket < now() - interval '24 hours'");
    await client.query("COMMIT");
    return "saved";
  } catch {
    await client.query("ROLLBACK").catch(() => {});
    throw new Error("Feedback storage unavailable");
  } finally { client.release(); }
}

export type FeedbackEntry = Pick<FeedbackInput, "rating" | "locale" | "initials" | "comment"> & { created_at: Date; provider_id: string | null; provider_name: string | null; provider_filter: string | null; submission_id: string };
export type FeedbackSummary = { provider_filter: string | null; provider_name: string | null; count: string; average: string };

// Opaque UI filter only, not an authorization mechanism. Avoid names in URLs/logs.
export function feedbackProviderFilter(name: string) {
  return createHash("md5").update(normalizeProviderName(name).toLowerCase()).digest("hex");
}

const resolvedProviders = `SELECT *,
  COALESCE(provider_key, CASE provider_id WHEN 'mejin-shick' THEN 'mejin shick' END) AS group_key,
  COALESCE(provider_name, CASE provider_id WHEN 'mejin-shick' THEN 'Mejin Shick' END) AS display_name
  FROM mend_feedback.entries`;

// Call only after server-side session authorization. Never expose this as a public action.
export async function readFeedback(provider: string | null | undefined, db: Pool = database()) {
  const entries = await db.query<FeedbackEntry>(`WITH resolved AS (${resolvedProviders})
    SELECT submission_id, created_at, rating, provider_id, display_name AS provider_name,
      md5(group_key) AS provider_filter, locale, initials, comment
    FROM resolved WHERE ($1::boolean OR md5(group_key) IS NOT DISTINCT FROM $2::text)
    ORDER BY created_at DESC, submission_id DESC LIMIT 100`, [provider === undefined, provider ?? null]);
  const summary = await db.query<FeedbackSummary>(`WITH resolved AS (${resolvedProviders})
    SELECT md5(group_key) AS provider_filter,
      CASE group_key WHEN 'mejin shick' THEN 'Mejin Shick' ELSE min(display_name) END AS provider_name,
      count(*)::text AS count, round(avg(rating), 2)::text AS average
    FROM resolved GROUP BY group_key ORDER BY group_key NULLS LAST`);
  return { entries: entries.rows, summary: summary.rows };
}
