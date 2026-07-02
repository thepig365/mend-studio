/**
 * GA4 is intentionally disabled. This component is a hard no-op — it must not
 * load or fire any tracking script, with or without NEXT_PUBLIC_GA_MEASUREMENT_ID
 * set, until:
 *   1. A privacy policy covering analytics exists (app/policies has no such
 *      section today), and
 *   2. A consent mechanism gates pageview firing.
 *
 * Do not re-enable by simply reading the env var again — wire it through a
 * consent check first. See .env.example for the intended variable name.
 */
export default function Analytics() {
  return null;
}
