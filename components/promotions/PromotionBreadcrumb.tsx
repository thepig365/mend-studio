import { site } from "@/lib/site";

export default function PromotionBreadcrumb({ name, path }: { name?: string; path?: string }) {
  const items = [
    { "@type": "ListItem", position: 1, name: site.name, item: site.url },
    { "@type": "ListItem", position: 2, name: "Promotions", item: `${site.url}/promotions` },
    ...(name && path ? [{ "@type": "ListItem", position: 3, name, item: `${site.url}${path}` }] : []),
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }).replace(/</g, "\\u003c") }} />;
}
