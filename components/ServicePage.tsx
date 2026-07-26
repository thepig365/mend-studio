import type { ReactNode } from "react";
import Hero from "@/components/Hero";
import CTABlock from "@/components/CTABlock";
import ServiceMenuSection from "@/src/components/ServiceMenuSection";
import { pricingNote, type ServiceCategory } from "@/lib/services";
import {
  getMenuItemsForCategory,
  type ServiceItem as MenuServiceItem,
} from "@/src/data/serviceMenu";

type ServicePageProps = {
  category: ServiceCategory;
  eyebrow?: string;
  subtitle?: string;
  children?: ReactNode;
  hidePriceList?: boolean;
  menuOverride?: {
    items: MenuServiceItem[];
    secondaryItems: MenuServiceItem[];
  };
};

function groupBySection(items: MenuServiceItem[], fallbackTitle: string) {
  const groups = new Map<string, MenuServiceItem[]>();
  items.forEach((item) => {
    const title = item.section ?? fallbackTitle;
    groups.set(title, [...(groups.get(title) ?? []), item]);
  });
  return [...groups.entries()];
}

export default function ServicePage({
  category,
  eyebrow = "Services",
  subtitle,
  children,
  hidePriceList = false,
  menuOverride,
}: ServicePageProps) {
  const menu = menuOverride ?? getMenuItemsForCategory(category.slug);
  const primaryGroups = groupBySection(menu.items, "Menu & Pricing");
  const secondaryGroups = groupBySection(
    menu.secondaryItems,
    category.secondaryTitle ?? "Also available",
  );
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
          { label: "Book", href: "/book", variant: "gold" },
          { label: "All Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-20">
        {!hidePriceList &&
          primaryGroups.map(([title, items], index) => (
            <div key={title} className={index === 0 ? "" : "mt-10"}>
              <ServiceMenuSection items={items} title={title} />
            </div>
          ))}

        {children}

        {secondaryGroups.map(([title, items]) => (
          <div key={title} className="mt-10">
            <ServiceMenuSection items={items} title={title} />
          </div>
        ))}

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
          <a href="/book" className="btn-gold">
            Book
          </a>
        </div>
      </section>

      <CTABlock
        eyebrow="Ready when you are"
        heading="Book your visit to Mend Beauty Studio — Balwyn"
        body="Call or message us to find a time that suits. Walk-in availability may be limited, so booking ahead is recommended."
        actions={[
          { label: "Book", href: "/book", variant: "light" },
          { label: "Gift Cards", href: "/gift-cards", variant: "outline-light" },
        ]}
      />
    </>
  );
}
