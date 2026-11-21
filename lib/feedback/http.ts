import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { validateFeedback, type FeedbackInput } from "./shared";

export type SaveResult = "saved" | "duplicate" | "conflict" | "limited";
export type FeedbackDependencies = {
  configured: () => boolean;
  secret: () => string;
  save: (input: FeedbackInput, rateKey: string, requestHash: string) => Promise<SaveResult>;
  production: boolean;
};

const headers = { "Cache-Control": "no-store, private", "X-Robots-Tag": "noindex, nofollow" };
export const feedbackResponse = (status: number, code: string) => Response.json({ code }, {
  status, headers: { ...headers, ...(status === 429 ? { "Retry-After": "3600" } : {}) },
});

async function boundedJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); throw new Error("too_large"); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } finally { reader.releaseLock(); }
}

export async function submitFeedback(request: Request, deps: FeedbackDependencies) {
  const origin = request.headers.get("origin");
  const allowedOrigin = origin === "https://mendbeauty.com.au" || origin === "https://www.mendbeauty.com.au" ||
    (!deps.production && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || ""));
  if (!allowedOrigin || request.headers.get("sec-fetch-site") === "cross-site") return feedbackResponse(403, "forbidden");
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return feedbackResponse(415, "invalid");
  if (Number(request.headers.get("content-length") || 0) > 4096) return feedbackResponse(413, "invalid");
  let input;
  try { input = validateFeedback(await boundedJson(request)); }
  catch { return feedbackResponse(400, "invalid"); }
  if (!input) return feedbackResponse(400, "invalid");
  if (!deps.configured()) return feedbackResponse(503, "unavailable");
  // Vercel overwrites this header. Never trust client-supplied x-forwarded-for.
  const ip = deps.production ? request.headers.get("x-vercel-forwarded-for")?.trim() : "127.0.0.1";
  if (!ip || !isIP(ip)) return feedbackResponse(503, "unavailable");
  try {
    const secret = deps.secret();
    if (!secret) return feedbackResponse(503, "unavailable");
    // Daily rotating pseudonym used only in the short-lived rate table, never in feedback.
    const rateKey = createHmac("sha256", secret).update(`feedback-rate:${new Date().toISOString().slice(0, 10)}:${ip}`).digest("hex");
    const requestHash = createHmac("sha256", secret).update(`feedback-body:${JSON.stringify(input)}`).digest("hex");
    const result = await deps.save(input, rateKey, requestHash);
    if (result === "limited") return feedbackResponse(429, "limited");
    if (result === "conflict") return feedbackResponse(409, "conflict");
    return feedbackResponse(200, "received"); // Only after the database commit succeeds.
  } catch {
    // Do not log database exceptions: they can contain SQL parameters or credentials.
    return feedbackResponse(503, "unavailable");
  }
}
