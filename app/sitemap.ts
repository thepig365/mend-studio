import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Keep in sync with the routes under app/. Homepage first, then services, then
// standalone pages. Add new routes here when a new page.tsx is added.
const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.8 },
  { path: "/services/hair", priority: 0.7 },
  { path: "/services/head-spa", priority: 0.7 },
  { path: "/services/skin-facial", priority: 0.7 },
  { path: "/services/body-care", priority: 0.7 },
  { path: "/services/brows-lashes", priority: 0.7 },
  { path: "/services/mens-grooming", priority: 0.7 },
  { path: "/services/nails", priority: 0.7 },
  { path: "/services/semi-permanent", priority: 0.7 },
  { path: "/gift-cards", priority: 0.5 },
  { path: "/memberships", priority: 0.5 },
  { path: "/careers", priority: 0.4 },
  { path: "/contact", priority: 0.6 },
  { path: "/policies", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified field — we don't track real per-page modification dates,
  // and a build-time timestamp would be a fake signal to search engines.
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
