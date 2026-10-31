import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { promotionsCopy } from "@/lib/promotions-copy";

export default function PromotionBreadcrumb({ name, path, locale = "en-AU" }: { name?: string; path?: string; locale?: Locale }) {
  const items = [
    { "@type": "ListItem", position: 1, name: site.name, item: locale === "zh-Hans" ? `${site.url}/zh` : site.url },
    { "@type": "ListItem", position: 2, name: promotionsCopy[locale].promotions, item: `${site.url}${localePath("/promotions", locale)}` },
    ...(name && path ? [{ "@type": "ListItem", position: 3, name, item: `${site.url}${localePath(path, locale)}` }] : []),
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }).replace(/</g, "\\u003c") }} />;
}
