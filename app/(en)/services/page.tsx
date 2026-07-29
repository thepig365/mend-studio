import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import { pricingNote } from "@/lib/services";
import { annaServiceCategories } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Hair salon and hairdresser services in Deepdene, Head Spa Melbourne, scalp treatments, Korean facial treatments, body wellness, men’s grooming, nails and semi-permanent beauty.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Our Services"
        title="MEND services, pricing and duration"
        body="Browse the approved hair, scalp, Head Spa, skin, body, men’s grooming, nail and semi-permanent beauty menu directly."
        actions={[
          { label: "Book", href: "/book", variant: "gold" },
          { label: "Gift Cards", href: "/gift-cards", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {annaServiceCategories.map((category) => (
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
            eyebrow="Semi-Permanent Beauty"
            title="Available by consultation only"
            body="Semi-permanent beauty services are available by consultation only and subject to suitability assessment."
          />
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-taupe">
          {pricingNote}
        </p>
      </section>

      <CTABlock
        eyebrow="Mend Beauty Studio"
        heading="Book a service or contact the studio"
        body="Use the booking page for current availability, or contact the studio with a service question."
        actions={[
          { label: "Book", href: "/book", variant: "light" },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
