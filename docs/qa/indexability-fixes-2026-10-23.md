# Bilingual sitemap and service discovery fixes

Scope: remove redirect-only booking routes from the sitemap and add contextual,
same-language service-hub links. No service prices, service menu facts, booking
redirect behavior, authentication, indexing exclusions or legacy chooser routes change.

## Baseline

Public production audit on 22 October 2026 at 22:59 UTC, based on main
`d22382d1607d2e79d0a450dc50263a355ebdf3b4`:

- The sitemap listed 42 URLs, including `/book` and `/zh/book`.
- Both booking URLs returned HTTP 307 to the configured booking provider.
- The other 40 URLs returned HTTP 200 without following redirects. Each had a
  self-referencing canonical, reciprocal `en-AU` / `zh-Hans` alternates and no
  detected meta/header `noindex` or robots.txt restriction.
- Both service hubs lacked direct same-language links to `hair-scalp-recovery`
  and `brows-lashes`. English brows/lashes already had a homepage link; this
  change does not imply that every affected page was completely orphaned.

## Candidate verification

Passed against the final code:

- `npm test` (all repository checks, including the revised booking sitemap
  assertion, 20 unique source paths, legacy chooser preservation and hub links).
- `npm run type-check`.
- `npm run lint`.
- `npm run build` (49 generated routes, including non-sitemap utility routes).
- `git diff --check`.
- Generated sitemap and HTML inspection: 40 unique public content URLs,
  self-referencing canonicals, correct EN/ZH alternates, no content meta
  `noindex`, and all four new same-language hub links rendered as anchors.

The generated-route count is not the sitemap count. Booking redirects, the
private marketing workspace, authentication and utility endpoints must not be
submitted as public content in the sitemap.

## Release and Google verification

Preview and production checks are recorded in the pull request. Publication
requires approval of the specific release. After publication, verify the live
sitemap, all 40 content responses, canonical/hreflang pairs, hub links and the
unchanged private-portal boundary.

This is technical indexability work, not proof of Google indexing, crawling,
rankings or AI recommendations. Search Console inspection/submission and its
reported results require separate authenticated evidence.
