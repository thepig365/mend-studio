# Customer feedback

## Storage and release status (21 November 2026)

Prepared on an isolated branch based on production source
`52374fe388c02daf197509d454d9c9074f8bd21a` in `thepig365/mend-studio`.
The initial form was deployed in PR #60 (5862155); PR #61 (2237e8b) added entered
provider names. This revision requires the colleague name and customer initials
for new submissions and adds a public downloadable feedback QR. No migration,
historical backfill, credential or permission change is required.
Migration 002 has been applied through the same authenticated Vercel SQL editor.
The three historical synthetic receipts have the same before/after fingerprint
84b426817ccf3c643bd4f79b7adbdde9. Both new columns are NULL on those records; RLS
and no PUBLIC table grants remain in place. The editor is back in read-only mode.

With the owner's explicit approval, the official Vercel Neon integration created
`mend-feedback-prod` on the Free plan (no card), in Sydney (`syd1`). Neon Auth
and Realtime are disabled. The dedicated empty database is connected only to
Vercel project `mend-studio`, **Production** environment, custom prefix `FEEDBACK`,
with sensitive values enabled. The service installed its server-only binding;
no secret was displayed, copied, exported or manually edited. Preview and
Development are not connected. No unrelated project or public Blob is used.

The additive migration was applied atomically through the authenticated Vercel
SQL editor. Both tables are owned by `neondb_owner`, with RLS enabled and no
PUBLIC table or schema grants. The database started with zero user tables.
Verified database logging: statement and duration/sample logging disabled,
error parameter logging disabled. The query editor was returned to read-only.
The existing staff Google OAuth allowlist remains unchanged.

## Routes and customer experience

- `/feedback` — English; `/zh/feedback` — simplified Chinese.
- Reciprocal language links, correct document languages and MEND's existing
  fonts, logo and palette. Dedicated root layouts contain no analytics scripts.
- One required radio rating, 1–5; required initials (20 characters), required
  free-text colleague name (80 characters), and optional comment (500 characters).
  Names start empty; whitespace-only values are rejected in the browser and API.
  Both pages label required fields and show localized validation. No contact details.
- Both pages embed `/qr/mend-feedback-qr.png`, a common bilingual PNG opening
  `https://mendbeauty.com.au/feedback` with the visible English/Chinese switch.
  A direct download link allows saving/forwarding the same PNG. Generate offline
  with `swift scripts/generate-feedback-qr.swift` and verify its payload with
  `swift scripts/decode-qr.swift public/qr/mend-feedback-qr.png`.
- Privacy copy states internal service improvement and team recognition, not
  public reviews. No review gating, contact details or marketing consent.
- If storage/auth configuration is absent, the form is not rendered. Submission
  failures never show success. A lost acknowledgement retains the exact request
  in memory for retry with the same UUID. Controls lock during submission/retry;
  successful submission removes the form. No feedback is kept in browser storage.
- Idempotency covers retries for the same form instance, including concurrent
  requests with the same UUID. A fresh page/new UUID can submit again; rate limits
  bound abuse. It is not an identity-based one-response-per-customer system.

## Provider evidence and staff access

New forms send a required Unicode provider name. The server trims and collapses
whitespace and normalizes Unicode to NFC, retaining the entered capitalization
for display and using a lower-case key for grouping. Historical blank names remain unassigned.
Names are customer-entered, not verified identities; spelling variants can form
separate groups. They are used only for internal review, never automatic rewards.

Migration 002 only adds nullable name/key columns, length/pair checks and a group
index. It does not update historical rows, IDs or request hashes. Legacy
`mejin-shick` records display as Mejin Shick and group with equivalent typed
names; legacy NULL remains unassigned. Older requests with an assigned provider
and nonblank initials remain accepted with the same normalized body/hash. New
requests missing either required field are rejected; historical rows are never
rewritten to satisfy current requirements.

Staff filters use opaque MD5 group identifiers in URLs, not typed names. This is
only a UI key, not an authorization or anonymization mechanism. All group and
receipt reads remain behind the unchanged staff session check. Names, initials
and comments render as escaped text; no public provider-name list is exposed.

After existing Google sign-in, staff use `/staff/feedback` (linked from
`/marketing`). Authorization uses the existing exact verified-email session
and unchanged `MARKETING_PORTAL_ALLOWED_EMAIL` (default hello@mendbeauty.com.au).
Anonymous or disallowed sessions redirect to the existing login. The route is
dynamic, noindex, and outside the analytics layout. There is no public read API.

The staff view shows provider counts and average rating, with provider/unassigned
filters and the latest 100 private receipts. All comments and initials render as
escaped React text. Counts are voluntary feedback, not representative performance
scores. No automatic reward, pay or staff employment decision is made.

## Storage and abuse controls

The dedicated PostgreSQL schema is separate: `mend_feedback`. Its migration
creates only two new tables and indexes, revokes PUBLIC access to its own
objects and enables RLS with no anonymous policies. Existing roles, identity
allowlists and other schemas are untouched. The server-only application role
must own the schema/tables; never use a public/anonymous database credential.
The production migration is applied. No browser database client exists.

The API accepts same-origin JSON only, reads at most 4 KiB, validates all fields,
rejects unexpected fields and a non-empty honeypot, and commits before success.
Parameterized statements avoid SQL injection. A transactional advisory lock
and UUID primary key prevent duplicate receipts across function instances;
different content with the same UUID is rejected. Quotas are transactionally
shared: 10 new receipts per IP per UTC hour and 200 globally per UTC hour.
Duplicates do not consume quota. The production IP comes only from Vercel's
overwritten `x-vercel-forwarded-for`; a missing/invalid header fails closed.

Raw IPs are not stored. The rate table uses a daily HMAC pseudonym derived from
the existing AUTH_SECRET, is unlinked to entries, and deletes buckets older than
24 hours on successful writes. The last buckets can remain until the next write;
there is no background job. Feedback is retained for staff review; no automatic
purge or deletion UI has been introduced. Align retention with MEND's approved
operating policy. TLS certificate verification is enforced in production by
normalizing the managed connection string in memory to `sslmode=verify-full`. Errors, request bodies and responses are not logged by this feature.

Preserve the verified database logging settings above and review retention
through the approved operating policy. Do not enable request-body logging, session replay, or analytics on
these pages. No response content is sent to Google, an AI service, email, or
another recipient by this implementation.

## Verification performed locally

- `npm test`: all existing MEND regression checks passed.
- `npm run check:feedback`: twelve tests passed. A disposable local PGlite
  PostgreSQL engine ran the real migration and storage SQL: English and Chinese
  receipts, Unicode-name grouping and required-field rejection, legacy migration/hash preservation,
  private name escaping, opaque filters, retry idempotency, conflicting
  UUID rejection, per-IP rate limit and anonymous SQL denial. RLS still hid rows
  after a synthetic test role was deliberately granted table SELECT locally.
- `npm run build`: production compilation and TypeScript passed.
- `npm run lint`: no errors; one pre-existing warning in BookingEnquiryForm.tsx.
- Browser at 390 × 844: English and Chinese fields, language switch and localized
  retry errors verified. A local deliberately unreachable database produced an
  error, never a success message. Anonymous `/staff/feedback` redirected to login.

PGlite is a local, single-session test engine. These checks do not verify the
production database, real OAuth staff receipt, multi-session concurrency, or
production Vercel IP/header behavior. Those remain release acceptance gates.

## Production acceptance checklist

1. Migrations 001/002 are already applied. This required-field/QR revision needs
   no database mutation or backfill. Leave ownership, RLS and grants unchanged.
2. Run repository checks and the feedback suite. Verify concurrent identical
   requests against the actual PostgreSQL connection create exactly one row.
3. Deploy the reviewed commit through the existing focused PR/Vercel pipeline.
   Respect any current branch rules and release approvals.
4. Open both public routes and submit unmistakable synthetic test comments
   labelled `SYNTHETIC PRODUCTION TEST — NOT CUSTOMER FEEDBACK` (Chinese equivalent
   on the Chinese page), using clearly synthetic Unicode names and initials. Verify blank and whitespace-only
   names/initials are rejected before storage. Confirm success, retry
   idempotency and no response bodies in analytics/logs.
5. Sign in with the existing authorized identity and confirm both stored receipts,
   provider filtering/counts, text escaping and no public read. In an unsigned
   session verify staff denial and public GET `/api/feedback` returns 405.
6. Check home, Chinese home, hair, contact, booking redirects and existing portal.
   Record production commit, deployment ID and final live URLs.
7. No deletion workflow exists. Keep synthetic entries clearly labelled for staff
   unless a normal approved removal workflow becomes available. Do not purge
   records or change data permissions merely to remove tests.

References: [node-postgres transactions](https://node-postgres.com/features/transactions),
[parameterized queries](https://node-postgres.com/features/queries),
[Vercel request headers](https://vercel.com/docs/headers/request-headers).
