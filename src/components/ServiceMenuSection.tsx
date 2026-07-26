"use client";

import { useState } from "react";
import ServiceItem from "@/src/components/ServiceItem";
import ServiceImageModal from "@/src/components/ServiceImageModal";
import type { ServiceItem as ServiceItemType } from "@/src/data/serviceMenu";

// Interactive service menu: a styled price list where every row reveals a
// matching image on hover (desktop) or in a bottom-sheet modal on tap/click.

type ServiceMenuSectionProps = {
  items: ServiceItemType[];
  title?: string;
  locale?: "en-AU" | "zh-Hans";
};

export default function ServiceMenuSection({
  items,
  title,
  locale = "en-AU",
}: ServiceMenuSectionProps) {
  const [activeItem, setActiveItem] = useState<ServiceItemType | null>(null);

  return (
    <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
      {title && (
        <h3 className="mb-4 font-display text-2xl font-medium text-charcoal">{title}</h3>
      )}
      <p className="mb-4 text-xs leading-relaxed text-taupe">
        {locale === "zh-Hans"
          ? "将鼠标移到服务上，或轻触服务，即可查看参考图片。"
          : "Hover over or tap a service to see what it looks like."}
      </p>
      <ul className="divide-y divide-beige/70">
        {items.map((item) => (
          <ServiceItem
            key={item.id}
            item={item}
            onOpen={setActiveItem}
            locale={locale}
          />
        ))}
      </ul>

      {activeItem && (
        <ServiceImageModal
          item={activeItem}
          onClose={() => setActiveItem(null)}
          locale={locale}
        />
      )}
    </div>
  );
}
