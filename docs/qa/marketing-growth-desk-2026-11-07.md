# Growth Desk verification — 7 November 2026

## Scope

New operator panel inside the existing authenticated marketing workspace:
Google Reviews, Facebook Recommendations, Instagram, SEO and AEO workflows;
locally generated reviewable briefs; first-party UTM builder; evidence standards
and MaSe integration comparison. No QR asset/component changes, account changes,
messages, data feeds, analytics events, production deployment or auth expansion.

## Passed

- `npm run lint`
- `npm run type-check`
- `npm test`, including new `check:marketing-growth`
- `npm run build`
- `git diff --check`

The new check exercises the actual helpers and component state: five workstreams,
empty-facts gating, preserving fields on workstream changes, successful and denied
clipboard operations, unload warning, HTTPS source links and rejecting external,
private, encoded, query-bearing and direct-booking campaign paths. Browser APIs
are mocked and no test data is sent to Google or Meta.

## Not completed

Visual/mobile browser QA was attempted using an isolated harness of the real
component and built styles. Chromium failed at startup with local process socket
`Operation not permitted`, including the approved escalated attempt. No visual
pass or screenshots are claimed. Production authenticated access, OAuth and
actual review submission were not tested by this change. Preview browser review
is required before release.

## Remaining operator limits

This panel does not fetch ratings, post replies or publish Instagram content.
It prepares work and hands off to source platforms. Facebook review submission
is not verified. MaSe booking completion/revenue remains outside website event
collection. Growth Desk fields are not persisted or included in the existing
operating-guide export; copy the generated brief before leaving.

## Bilingual extension

Added portal-scoped English / 中文 switching, including login, Growth Desk,
existing AI task desk, operating guide, Landing Page Studio / Release Console,
and skills catalogue. English source documents in the third-party skills library
remain intact and are explicitly labelled. Public website navigation is unchanged.

Additional regression checks:

- `check-marketing-locale`: preference hydration, blocked storage, language
  attributes and unchanged child identity.
- `check-marketing-growth`: bilingual workstreams/briefs and retained inputs.
- `check-landing-localization`: translated briefs, stable options, retained
  inputs, approval gates, changed-URL verification reset and handoff destinations.
- `check-guide-localization`: 323 data/UI translations, retained task/report/filter
  edits, stable export schema/status values, import validation/confirmation and
  localized clipboard failure.
- `check-library-localization`: 53 translated catalogue entries, bilingual search,
  category isolation, stable routes and source-document labelling.

Tests use the actual compiled component logic with mocked browser APIs. No
accounts are connected and no publication is performed. Visual browser review
remains outstanding under the environment limitation documented above. The new
language preference is local only; it does not add persistence for task records.
