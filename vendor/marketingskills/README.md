# Vendored Marketing Skills

Third-party reference content for the private MEND Marketing Portal.
This is not MEND policy, and it is not customer-facing copy.

- Source: [https://github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- Pinned commit: `88c79f6528a9347420e57ceb1fff9a60de651768`
- Licence: MIT. The upstream licence is stored beside this file as `LICENSE`.
- Copyright: Copyright (c) 2025 Corey Haines
- Contents: 337 markdown files under `skills/` (each skill's `SKILL.md` and its markdown references). Non-markdown files, evals, assets, scripts and upstream installers are not vendored and must not be executed.

Upstream skills are third-party guidance. Some contain unsourced statistics that must not be quoted as fact to customers.

## Refresh

From the repository root, with no extra npm packages:

```bash
node scripts/refresh-marketingskills.mjs --sha 88c79f6528a9347420e57ceb1fff9a60de651768
```

Omit `--sha` only when you intend to move the pin to current upstream `HEAD`. Review the diff before committing. Do not run upstream installers (`npx skills`, plugin install, or any script from the upstream repository). This refresh copies markdown and `LICENSE` only.

Do not add private strategy, customer or staff records, budgets, or secrets to this directory. The website repository is public.
