"use client";

import { useState } from "react";
import ServiceImagePreview from "@/src/components/ServiceImagePreview";
import type { ServiceItem as ServiceItemType } from "@/src/data/serviceMenu";

// One row of the service menu. Price and time are always visible.
// Desktop: hovering shows a floating image preview card above the row.
// All devices: click / tap / Enter / Space opens the image modal.

type ServiceItemProps = {
  item: ServiceItemType;
  onOpen: (item: ServiceItemType) => void;
};

export default function ServiceItem({ item, onOpen }: ServiceItemProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <li className="relative">
      {/* Hover preview — pointer devices only, never blocks nearby text */}
      {showPreview && (
        <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">
          <ServiceImagePreview item={item} />
        </span>
      )}

      <button
        type="button"
        onClick={() => {
          setShowPreview(false);
          onOpen(item);
        }}
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        aria-haspopup="dialog"
        aria-label={`${item.name} — view photo and details`}
        className="-mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer flex-col gap-1 rounded-2xl px-3 py-5 text-left transition-colors duration-200 hover:bg-sand/70 focus-visible:bg-sand/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        <span className="flex items-baseline justify-between gap-4">
          <span className="font-display text-xl font-medium text-charcoal">
            {item.name}
          </span>
          <span className="shrink-0 text-sm font-medium tracking-wide text-bronze">
            {item.price}
          </span>
        </span>
        <span className="flex items-baseline justify-between gap-4">
          {item.description ? (
            <span className="max-w-xl text-sm leading-relaxed text-cocoa">
              {item.description}
            </span>
          ) : (
            <span />
          )}
          {item.time && (
            <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-taupe">
              {item.time}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}
