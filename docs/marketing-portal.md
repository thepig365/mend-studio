# MEND Marketing Portal

## Purpose

The private `/marketing` workspace brings Mend Beauty Studio’s recurring SEO
and marketing work into one controlled entry point. It links to the existing
authoritative services and prepares minimal, reviewable AI task briefs.

The public footer contains a restrained `Marketing Portal` link. The portal and
its sign-in route are excluded from search indexing.

The private workspace is currently English-only. Its header does not show the
public bilingual switch because no `/zh/marketing` or `/zh/marketing/login`
route exists; this prevents operators being sent to a false 404 destination.

## Access

Access uses Google OAuth and is restricted to:

`hello@mendbeauty.com.au`

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
