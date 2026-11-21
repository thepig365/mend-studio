import { Pool } from "pg";
import type { FeedbackInput } from "./shared";
import type { SaveResult } from "./http";

let pool: Pool | undefined;
export function isFeedbackConfigured() {
  return Boolean(process.env.FEEDBACK_DATABASE_URL && process.env.AUTH_SECRET && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}

function database() {
  if (!pool) {
    const connectionString = process.env.FEEDBACK_DATABASE_URL;
    if (!connectionString) throw new Error("Feedback storage unavailable");
    const url = new URL(connectionString);
    if (process.env.NODE_ENV === "production" && url.searchParams.get("sslmode") !== "verify-full") {
      throw new Error("Feedback storage requires verified TLS");
    }
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
      (submission_id, rating, provider_id, locale, initials, comment, request_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [input.submissionId, input.rating, input.providerId, input.locale, input.initials, input.comment, requestHash]);
    await client.query("DELETE FROM mend_feedback.rate_limits WHERE bucket < now() - interval '24 hours'");
    await client.query("COMMIT");
    return "saved";
  } catch {
    await client.query("ROLLBACK").catch(() => {});
    throw new Error("Feedback storage unavailable");
  } finally { client.release(); }
}

export type FeedbackEntry = Pick<FeedbackInput, "rating" | "locale" | "initials" | "comment"> & { created_at: Date; provider_id: string | null; submission_id: string };

// Call only after server-side session authorization. Never expose this as a public action.
export async function readFeedback(provider: string | null | undefined, db: Pool = database()) {
  const entries = await db.query<FeedbackEntry>(`SELECT submission_id, created_at, rating, provider_id, locale, initials, comment
    FROM mend_feedback.entries WHERE ($1::boolean OR provider_id IS NOT DISTINCT FROM $2::text)
    ORDER BY created_at DESC, submission_id DESC LIMIT 100`, [provider === undefined, provider ?? null]);
  const summary = await db.query<{ provider_id: string | null; count: string; average: string }>(`SELECT provider_id, count(*)::text AS count,
    round(avg(rating), 2)::text AS average FROM mend_feedback.entries GROUP BY provider_id ORDER BY provider_id NULLS LAST`);
  return { entries: entries.rows, summary: summary.rows };
}
