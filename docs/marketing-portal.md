# MEND Marketing Portal

## Purpose

The private `/marketing` workspace brings Mend Beauty Studio’s recurring SEO
and marketing work into one controlled entry point. It links to the existing
authoritative services and prepares minimal, reviewable AI task briefs.

The public footer contains a restrained `Marketing Portal` link. The portal and
its sign-in route are excluded from search indexing.

The private workspace has its own in-place English / 中文 switch on all marketing
routes. Its header still hides the public-site language switch because no
`/zh/marketing` or `/zh/marketing/login` route is needed. The marketing-only
switch preserves form state and avoids false 404 destinations.

## Access

Access uses Google OAuth and is restricted to:

`hello@mendbeauty.com.au`

Google is given an account-selection hint for the authorised identity and the
`mendbeauty.com.au` Workspace domain. The server still verifies the exact,
Google-verified email address; the hint is not the access-control boundary.
Rejected or incomplete sign-in attempts return a clear message on the login
page instead of silently appearing to restart the flow.

The website never receives or stores the Google password. Configure these
values only as server-side Vercel environment variables:

- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `MARKETING_PORTAL_ALLOWED_EMAIL`

The Google OAuth application must allow this production callback:

`https://mendbeauty.com.au/api/auth/callback/google`

Use a separate preview callback when reviewing a Vercel Preview. Do not commit
client secrets, access tokens or passwords.

## Included workspaces

- Technical SEO: Search Console and PageSpeed review
- Traffic and conversion: consented Google Analytics review
- Local search: Google Business Profile maintenance
- Content and keywords: customer-useful content and keyword briefs
- Social and campaigns: approved Meta campaign coordination
- Services and retention: confirmed MaSe source information
- AI task desk: minimal draft briefs for ChatGPT, Codex or Claude
- Landing Page Studio: controlled briefs for service, offer, event,
  educational SEO and seasonal campaign pages
- Release Console: human-gated handoff to publish an approved review build,
  submit or inspect the production URL in Search Console, and verify the page
  in Google Analytics
- Marketing Skills Library: a staff browser for the MIT-licensed
  [marketingskills](https://github.com/coreyhaines31/marketingskills) files
  vendored under `vendor/marketingskills/`. The pinned commit is recorded in
  `vendor/marketingskills/UPSTREAM.json`. Refresh with
  `node scripts/refresh-marketingskills.mjs` (optional `--sha`). The script
  copies `LICENSE` and skill markdown only and does not run upstream
  installers. Library routes stay behind the same sign-in as `/marketing`,
  send `noindex`, and are not added to the sitemap. Upstream text is
  third-party guidance; unsourced statistics must not be quoted as fact to
  customers. Do not store private strategy, customer or staff records, budgets
  or secrets in the vendored files.

## AI boundary

The first release does not call an AI API. A brief is generated locally in the
authorised user’s browser and is sent nowhere until that user deliberately
copies it into ChatGPT, Codex or Claude.

The Landing Page Studio requires a working title and confirmed facts before a
brief can be copied. It prepares bilingual page structure, copy, SEO,
accessibility and review requirements while preserving the existing MEND
design and booking flow. It does not edit the repository or publish a page.

The Release Console becomes available only after a production path, an HTTPS
review URL and Leon's explicit publication checkbox are present. The publish
button copies a repository-aware release brief and opens Codex; Codex must
still verify the exact reviewed page, run the repository checks and use the
existing focused PR and Vercel workflow.

For ordinary landing pages, Google does not offer a general-purpose indexing
API. The Search Console action therefore copies the exact production URL and
the canonical sitemap URL, then opens the verified domain property for sitemap
submission or URL inspection. It does not claim that Google has indexed the
page. Search Console and Analytics remain locked until the authorised operator
confirms that the exact production URL loads correctly.

The website already has consent-controlled GA4 page-view instrumentation.
New landing pages do not need to be registered individually. The Analytics
action copies the production URL and opens GA4 so an authorised user can
confirm the live page in Realtime or DebugView.

Do not include customer records, passwords, full conversations or secrets.
AI output remains draft. It cannot approve or publish content, run advertising,
change production settings or spend money.

## Deliberately excluded

- unattended automatic publishing or account mutation;
- false indexing-success or analytics-success claims;
- advertising purchases or paid SEO subscriptions;
- direct Search Console, Analytics, Meta or MaSe data ingestion;
- customer-data replication;
- keyword-rank or traffic claims without source data;
- OpenAI or Anthropic API keys;
- persistent marketing records or a new database.

Those capabilities require separate source-system access, privacy review,
operating design, cost verification and CEO approval.

## Operator handbook (working version, 23 October 2026)

The existing workspace now begins with a public-safe operating guide for remote
promotion staff. It preserves the existing authentication, source links, AI task
desk and Landing Page Studio. No access, account or publishing authority is
created by reading the guide or changing a task status.

Included: brand direction; remote onboarding and shop-capture handoff; a 16-task
30-day plan; GBP, Meta, Chinese-social, website/booking and paid-search playbooks;
service intent mapping; SEO and separate ChatGPT Search / Google AI workflows;
eight non-brand discovery prompts; customer-care and fair-recognition standards;
a coordinator role brief and an evidence-based weekly review template.

The discovery prompts are a proposed test protocol, **not completed tests**.
Service facts, consent, practitioner input and actual analytics still require
verification. Seed keywords have no claimed search volume. No campaign is
launched, no security setting changes and no paid tool is needed by this update.

### Task handoff and honest persistence

Task fields exist only in the current browser session. They are not stored in a
database, local storage, analytics or a shared backend. Operators can export a
versioned JSON task file, place it in an already-authorised private team workspace,
and import it later. Import validates known task IDs, field types, statuses, dates
and size, then requires confirmation before replacing current fields. Unknown
fields are not rendered or executed. Cancel preserves the current work.

A before-unload warning helps protect unexported edits but is not a save guarantee.
The weekly text draft is separate: copy it before leaving. Export/import does not
upload, send or change sharing permissions. Do not claim this is a synchronised
multi-user tracker. Agree one coordinator and an authoritative team copy to avoid
conflicting versions.

### Privacy and staff access

The repository is public and client bundles can be downloaded. The guide must
therefore contain only public-safe generic guidance even though `/marketing` is
server-authenticated. Never commit the full confidential strategy, budgets,
individual pay/performance information, customer records, private attachments or
secrets. Private operating records belong in existing approved private systems.

The allowed account remains unchanged. New staff require administrator-approved
access; do not share the business account password. Adding identities, role-based
access or a shared database is a separate scoped change, not part of this release.

## Growth Desk (7 November 2026)

The first panel now provides five operator workstreams: Google Reviews,
Facebook Recommendations, Instagram, SEO and AEO / AI discovery. Each has a
concrete checklist, source-platform handoffs, an evidence standard and a locally
generated reviewable task brief. The operator can prepare this work without
opening MaSe. Platform authentication, posting and data retrieval still happen
in their authoritative systems; this release does not provide API integrations.

The Google review-request destination was verified against the MEND Business
Profile at 74 Whitehorse Road. The Facebook `/reviews` destination is provided
with an explicit submission-unverified label. Invitations must be voluntary and
neutral: no rating-based gating, incentives or generated positive reviews.

The optional UTM builder accepts only public MEND content paths and fixed source
choices. It excludes private routes, direct booking redirects, query strings,
fragments, encoded paths and external hosts. A generated link is not proof that
the page exists; the operator must check it before publishing. Campaign labels
must contain no personal data. UTMs measure website visits and intent, not MaSe
appointment completion or revenue.

All new fields are session-only React state. Switching workstreams preserves
fields, and browser unload warns about unexported work. Copy the current brief
before leaving; existing operating-guide JSON export does not include Growth
Desk fields. Copy errors show manual-copy guidance. No brief is automatically
sent to an AI service, saved, posted or added to analytics.

The feature comparison records the 7 November read-only MaSe audit: Google
booking connection unconfirmed; Google Analytics/Meta event settings offered
Enable now; review enhancer destination blank with 4+ filter disabled; TapFlow
trial offered NFC, AI positive-review text and social links at $199/store/year
(currency unspecified); Deskie unconfigured. These are observations, not
activation or purchase recommendations. Finance/day-close and operational
records remain in MaSe. This change does not touch review-QR deliverables.

Run `npm run check:marketing-growth` for the actual helper and component-state
checks, including clipboard failure, workstream switching, draft boundaries,
unload warnings and invalid campaign paths. This check is included in `npm test`.

## Bilingual operator interface (7 November 2026)

An English / 中文 switch now covers the portal, login and skills-library routes
through a marketing-only locale provider. It switches in place without remounting
workspace forms. Existing English mode, task IDs, status values, import/export
format, URLs, source systems and publishing approval gates are preserved.

Chinese UI includes the operating guide and 16-task plan, weekly report template,
Growth Desk, AI task briefs, Landing Page Studio and release briefs, login errors,
and skills catalogue/search. The 53 third-party skill documents remain their
original English source; this is clearly labelled, while catalogue titles,
descriptions, navigation and controls have Chinese translations. Search accepts
English and Chinese catalogue terms. No vendor documents were deleted or replaced.

Only the UI language preference is stored locally, under
`mend-marketing-language`. Blocked local storage does not prevent switching in the
current session. No task content is persisted by this change. User-entered facts,
report edits and task records are not translated, overwritten or sent externally.
A pristine weekly report template follows the chosen language; edited text is
retained. The existing printed review stand remains authoritative and all QR work
is paused pending the owner-provided photo/file.
