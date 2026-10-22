# Marketing operating guide QA

## Scope

Existing `/marketing` integration only. The server exact-email authentication,
Google provider settings, sign-in/sign-out, no-index rules, AI task desk and
Landing Page Studio remain unchanged. Public-safe guidance only; no confidential
strategy file or individual financial, customer or personnel records were added.

## Passed locally

- Full `npm test` aggregate, including expanded Marketing Portal invariants.
- `npm run type-check`, `npm run lint`, `npm run build` and `git diff --check`.
- React DOM interaction harness: 16 task records; first-week and second-week
  filters; owner/date/status edits; actual JSON Blob export; import validation;
  explicit replace; cancellation preserving edits; missing-task, invalid-status
  and oversized-file rejection; weekly-review clipboard handler.
- Temporary QA route removed before the final production build. It is not part
  of this release and does not bypass the portal's authentication.

## Verified on production before release

- Anonymous `/marketing` request returns HTTP 307 to `/marketing/login` with
  private/no-store cache headers.
- Cloud browser displays the existing authorised-business-account Google sign-in
  screen. This does not prove that a new employee has access.

## Verification limits

- Authenticated visual/screenshot and full browser interaction QA were not run:
  a headless browser could not launch under the available sandbox and the cloud
  browser could not reach the local test server. React DOM tests cover handlers,
  not actual browser rendering, downloads, clipboard permissions or OAuth login.
- No new OAuth account or access grant was made; a complete authorised login and
  cross-device staff handoff still need a permitted operator check.
- Existing `npm ci` failed because the baseline lockfile lacks peer entries for
  `@emnapi/core` / `@emnapi/runtime` in this npm version. Dependencies were installed
  without rewriting package.json or the lockfile; the checks above then passed.
  This update does not change dependencies. The deployment build is checked
  separately for the exact release commit.
- SEO/AEO prompts, analytics results, account permissions, campaign execution and
  service facts are operating tasks, not completed actions claimed by this QA.

## Release checks

Verify the exact branch commit and deployment check before merging. After merge,
verify the main commit, deployment result, anonymous login redirect and deployed
handbook asset. Do not confuse a successful build with authenticated staff access.
