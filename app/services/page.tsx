import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import { serviceCategories, pricingNote } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Explore hair services, luxury head spa and scalp wellness, Korean skin management, body care, brows and lashes, men’s grooming and semi-permanent beauty at Mend Beauty Studio, Balwyn.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Our Services"
        title="One studio. Your complete beauty routine."
        body="Hair, head spa, skin, body, brows and lashes — every service area at Mend Beauty Studio is designed around calm, considered, premium care."
        actions={[
          { label: "Book Now", href: "#contact", variant: "gold" },
          { label: "Gift Cards", href: "/gift-cards", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <ServiceCard
              key={category.slug}
              title={category.cardTitle}
              description={category.excerpt}
              href={`/services/${category.slug}`}
              image={category.image}
              imageAlt={category.imageAlt}
            />
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading
            eyebrow="A note on semi-permanent beauty"
            title="Available by consultation only"
            body="Semi-permanent beauty services are available by consultation only and subject to suitability assessment. Please contact us to arrange a consultation."
          />
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-taupe">
          {pricingNote}
        </p>
      </section>

      <CTABlock
        eyebrow="Not sure where to start?"
        heading="Tell us what you need — we’ll guide the rest"
        body="Call or message us and we’ll recommend the right service or combination for your hair, scalp, skin or beauty goals."
        actions={[
          { label: "Book Now", href: "#contact", variant: "light" },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
