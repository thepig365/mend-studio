import { site } from "@/lib/site";
import type { ServiceItem } from "@/src/data/serviceMenu";

type ServiceStructuredDataProps = {
  categoryName: string;
  items: ServiceItem[];
  path: string;
};

export default function ServiceStructuredData({
  categoryName,
  items,
  path,
}: ServiceStructuredDataProps) {
  const url = `${site.url}${path}`;
  const provider = {
    "@type": "HairSalon",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
  };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Mend Beauty Studio",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${site.url}${path.startsWith("/zh/") ? "/zh/services" : "/services"}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${categoryName} services`,
      url,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: item.name,
          description: [item.description, item.time, item.price]
            .filter(Boolean)
            .join(" · "),
          areaServed: {
            "@type": "City",
            name: "Deepdene",
          },
          provider,
          url,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
