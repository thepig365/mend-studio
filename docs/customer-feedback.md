# Customer feedback — prepared, not released

## Release status (21 November 2026)

This feature is **not deployed**. No production feedback has been collected.
The isolated branch is based on production source
`52374fe388c02daf197509d454d9c9074f8bd21a` in `thepig365/mend-studio`.

The repository has no existing database adapter, migration system or durable
customer submissions. The Vercel project Storage view showed no connected
database and an unconnected **public** Blob store. Public Blob is unsuitable.
The local Vercel CLI has no authentication token. The browser is signed in to
the correct MEND Vercel project, but automatic approval review blocked opening
the environment-variable page because it might expose credentials. No secrets
were read, changed, created or copied. No other project's database was used.

**One launch dependency:** an explicitly approved private MEND PostgreSQL
destination and its server-only `FEEDBACK_DATABASE_URL`, with permission to run
the included additive migration through that database's normal release path.
This is a proposed connection, not an existing verified store. Do not provision
a vendor, widen account access, change secrets, or apply the migration without
the necessary specific authorization. Do not merge/deploy the form until this
dependency and the acceptance steps below are satisfied.

## Routes and customer experience

- `/feedback` — English; `/zh/feedback` — simplified Chinese.
- Reciprocal language links, correct document languages and MEND's existing
  fonts, logo and palette. Dedicated root layouts contain no analytics scripts.
- One required radio rating, 1–5; optional initials (20 characters) and comment
  (500 characters); provider selector defaults to unassigned.
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

`mejin-shick` → **Mejin Shick**, verified on the live public page
<https://mendbeauty.com.au/team/mejin-shick> on 21 November 2026 and in
`lib/mejin-profile.ts`. No other published provider profile was verified, so no
other names were invented. “Not sure / someone else” / “不确定 / 其他同事” maps
to SQL NULL. An approved full staff list can extend the shared allowlist and
the database constraint together. No provider-specific link is used.

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

The proposed PostgreSQL schema is separate: `mend_feedback`. Its migration
creates only two new tables and indexes, revokes PUBLIC access to its own
objects and enables RLS with no anonymous policies. Existing roles, identity
allowlists and other schemas are untouched. The server-only application role
must own the schema/tables; never use a public/anonymous database credential.
No production migration has been applied. No browser database client exists.

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
operating policy before rollout. TLS certificate verification is required in
production. Errors, request bodies and responses are not logged by this feature.

Review the approved database's parameter/query logging and retention settings
before deployment; application-level safeguards do not verify infrastructure
logging. Do not enable request-body logging, session replay, or analytics on
these pages. No response content is sent to Google, an AI service, email, or
another recipient by this implementation.

## Verification performed locally

- `npm test`: all existing MEND regression checks passed.
- `npm run check:feedback`: eight tests passed. A disposable local PGlite
  PostgreSQL engine ran the real migration and storage SQL: English and Chinese
  receipts, Mejin/unassigned filtering and counts, retry idempotency, conflicting
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

## Acceptance after the storage dependency is approved

1. Apply `migrations/001_customer_feedback.sql` only to the approved MEND store
   through its normal path; verify role ownership, TLS, no anonymous privileges,
   RLS and logging. Configure the approved server-only connection; no public key.
2. Run repository checks and the feedback suite. Verify concurrent identical
   requests against the actual PostgreSQL connection create exactly one row.
3. Deploy the reviewed commit through the existing focused PR/Vercel pipeline.
   Respect any current branch rules and release approvals.
4. Open both public routes and submit unmistakable synthetic test comments
   labelled `SYNTHETIC PRODUCTION TEST — NOT CUSTOMER FEEDBACK` (Chinese equivalent
   on the Chinese page), one with Mejin and one unassigned. Confirm success, retry
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
