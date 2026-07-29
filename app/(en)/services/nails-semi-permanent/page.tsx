import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import { getCategory } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nails & Semi-Permanent Beauty",
  description:
    "Choose between nail services and consultation-led semi-permanent beauty at Mend Beauty Studio in Deepdene.",
  path: "/services/nails-semi-permanent",
});

export default function NailsSemiPermanentPage() {
  const categories = [
    getCategory("nails"),
    getCategory("semi-permanent"),
  ];

  return (
    <>
      <Hero
        eyebrow="Services"
        title="Nails & Semi-Permanent Beauty"
        body="These services are now organised into two separate categories. Choose a category to see every existing service, price, duration and booking requirement."
        actions={[
          { label: "Nails", href: "/services/nails", variant: "gold" },
          {
            label: "Semi-Permanent Beauty",
            href: "/services/semi-permanent",
            variant: "outline",
          },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <ServiceCard
              key={category.slug}
              title={category.cardTitle}
              description={category.excerpt}
              href={`/services/${category.slug}`}
              image={category.image}
              imageAlt={category.imageAlt}
              linkLabel="View services"
            />
          ))}
        </div>
      </section>

      <CTABlock
        eyebrow="Mend Beauty Studio"
        heading="Choose the service category you need"
        body="Nail services and semi-permanent beauty remain separate, with all existing items and consultation requirements retained."
        actions={[
          { label: "Nails", href: "/services/nails", variant: "light" },
          {
            label: "Semi-Permanent Beauty",
            href: "/services/semi-permanent",
            variant: "outline-light",
          },
        ]}
      />
    </>
  );
}
