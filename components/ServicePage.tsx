import type { ReactNode } from "react";
import Hero from "@/components/Hero";
import CTABlock from "@/components/CTABlock";
import ServiceMenuSection from "@/src/components/ServiceMenuSection";
import { pricingNote, type ServiceCategory } from "@/lib/services";
import { getMenuItemsForCategory } from "@/src/data/serviceMenu";

type ServicePageProps = {
  category: ServiceCategory;
  eyebrow?: string;
  subtitle?: string;
  children?: ReactNode;
  hidePriceList?: boolean;
};

export default function ServicePage({
  category,
  eyebrow = "Services",
  subtitle,
  children,
  hidePriceList = false,
}: ServicePageProps) {
  const menu = getMenuItemsForCategory(category.slug);
  return (
    <>
      <Hero
        eyebrow={eyebrow}
        title={category.title}
        subtitle={subtitle}
        body={category.intro}
        image={category.image}
        imageAlt={category.imageAlt}
        actions={[
          { label: "Book Now", href: "/contact#booking-enquiry", variant: "gold" },
          { label: "All Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-20">
        {!hidePriceList && (
          <ServiceMenuSection items={menu.items} title="Menu & Pricing" />
        )}

        {children}

        {menu.secondaryItems.length > 0 && (
          <div className="mt-10">
            <ServiceMenuSection
              items={menu.secondaryItems}
              title={category.secondaryTitle ?? "Also available"}
            />
          </div>
        )}

        {category.notes && category.notes.length > 0 && (
          <div className="mt-10 rounded-3xl bg-sand p-7 sm:p-8">
            {category.notes.map((note) => (
              <p
                key={note}
                className="text-sm leading-relaxed text-cocoa [&:not(:first-child)]:mt-3"
              >
                {note}
              </p>
            ))}
          </div>
        )}

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-taupe">
          {pricingNote}
        </p>
        <div className="mt-6 text-center">
          <a href="/contact#booking-enquiry" className="btn-gold">
            Book Now
          </a>
        </div>
      </section>

      <CTABlock
        eyebrow="Ready when you are"
        heading="Book your visit to Mend Beauty Studio — Balwyn"
        body="Call or message us to find a time that suits. Walk-in availability may be limited, so booking ahead is recommended."
        actions={[
          { label: "Book Now", href: "/contact#booking-enquiry", variant: "light" },
          { label: "Gift Cards", href: "/gift-cards", variant: "outline-light" },
        ]}
      />
    </>
  );
}
