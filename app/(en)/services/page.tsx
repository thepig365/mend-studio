import Link from "next/link";
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

        <section aria-labelledby="service-detail-links" className="mt-14 rounded-3xl border border-beige/70 bg-white/60 p-6 sm:p-8">
          <h2 id="service-detail-links" className="font-display text-2xl text-charcoal">
            More service details
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-cocoa sm:grid-cols-2">
            <p>
              Looking for focused scalp and hair care? Explore the{" "}
              <Link href="/services/hair-scalp-recovery" className="font-medium text-bronze underline underline-offset-4">
                Hair &amp; Scalp Recovery menu
              </Link>{" "}
              for scalp assessment and care options.
            </p>
            <p>
              For eye-area beauty services, browse the{" "}
              <Link href="/services/brows-lashes" className="font-medium text-bronze underline underline-offset-4">
                Brows &amp; Lashes menu
              </Link>{" "}
              and contact the studio with any service questions.
            </p>
          </div>
        </section>

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
