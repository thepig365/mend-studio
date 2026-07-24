import Hero from "@/components/Hero";
import CTABlock from "@/components/CTABlock";
import ServiceMenuSection from "@/src/components/ServiceMenuSection";
import { getCategory, pricingNote } from "@/lib/services";
import { getMenuItemsForCategory } from "@/src/data/serviceMenu";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Semi-Permanent Beauty",
  description:
    "Semi-permanent brows, lip blush and lash line enhancement at Mend Beauty Studio, Balwyn — available by consultation only and subject to suitability assessment.",
  path: "/services/semi-permanent",
});

export default function SemiPermanentPage() {
  const category = getCategory("semi-permanent");
  const menu = getMenuItemsForCategory("semi-permanent");
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Semi-Permanent Beauty"
        subtitle="Available by consultation only."
        body="Soft, subtle, semi-permanent enhancement for brows, lips and lash line — always planned together at a personal consultation first."
        image={category.image}
        imageAlt="Semi-permanent beauty at Mend Beauty Studio"
        actions={[
          {
            label: "Request a Consultation",
            href: "/contact#booking-enquiry",
            variant: "gold",
          },
          { label: "All Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-20">
        <ServiceMenuSection items={menu.items} title="Consultation-Only Services" />

        <div className="mt-10 rounded-3xl bg-sand p-7 sm:p-8">
          <h3 className="font-display text-xl font-medium text-charcoal">
            How consultations work
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            Semi-permanent beauty services are available by consultation only and subject
            to suitability assessment. At your consultation we discuss your preferences,
            review suitability and answer your questions before any booking is made. There
            is no obligation to proceed.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            Appearance outcomes vary between individuals, and results soften and fade over
            time. We will always give you honest, realistic guidance about what to expect.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            Semi-permanent beauty services are available by consultation only and subject
            to suitability assessment. Results vary between clients. A consultation is
            required before treatment.
          </p>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-taupe">
          {pricingNote}
        </p>
        <div className="mt-6 text-center">
          <a href="/contact#booking-enquiry" className="btn-gold">
            Request a Consultation
          </a>
        </div>
      </section>

      <CTABlock
        eyebrow="Start with a conversation"
        heading="Request a semi-permanent beauty consultation"
        body="Contact us to arrange a private, no-obligation consultation at the studio."
        actions={[
          {
            label: "Request a Consultation",
            href: "/contact#booking-enquiry",
            variant: "light",
          },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
