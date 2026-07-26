"use client";

import Link from "next/link";
import { useState } from "react";
import ServiceImagePreview from "@/src/components/ServiceImagePreview";
import type { ServiceItem as ServiceItemType } from "@/src/data/serviceMenu";

// One row of the service menu. Price and time are always visible.
// Desktop: hovering shows a floating image preview card above the row.
// All devices: click / tap / Enter / Space opens the image modal.

type ServiceItemProps = {
  item: ServiceItemType;
  onOpen: (item: ServiceItemType) => void;
  locale?: "en-AU" | "zh-Hans";
};

export default function ServiceItem({
  item,
  onOpen,
  locale = "en-AU",
}: ServiceItemProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <li className="relative">
      {/* Hover preview — pointer devices only, never blocks nearby text */}
      {showPreview && (
        <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">
          <ServiceImagePreview item={item} />
        </span>
      )}

      <div className="-mx-3 flex flex-col gap-3 rounded-2xl px-3 py-5 transition-colors duration-200 hover:bg-sand/70 sm:flex-row sm:items-start">
        <button
          type="button"
          onClick={() => {
            setShowPreview(false);
            onOpen(item);
          }}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          aria-haspopup="dialog"
          aria-label={`${item.name} — ${
            locale === "zh-Hans" ? "查看图片与详情" : "view photo and details"
          }`}
          className="min-w-0 flex-1 cursor-pointer rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          {item.signature && (
            <span className="mb-2 inline-flex rounded-full border border-gold/50 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-bronze">
              {locale === "zh-Hans" ? "王牌项目" : "Signature Service"}
            </span>
          )}
          <span className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <span className="min-w-0">
              {item.nameZh && item.nameEn ? (
                <>
                  <span className="block break-words font-display text-xl font-medium text-charcoal">
                    {item.nameZh}
                  </span>
                  <span className="mt-1 block break-words text-sm font-medium tracking-wide text-cocoa">
                    {item.nameEn}
                  </span>
                </>
              ) : (
                <span className="block break-words font-display text-xl font-medium text-charcoal">
                  {item.name}
                </span>
              )}
            </span>
            <span className="shrink-0 text-sm font-medium tracking-wide text-bronze">
              {item.price}
            </span>
          </span>
          <span className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
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
          {item.details && item.details.length > 0 && (
            <ul className="mt-3 grid gap-1 text-xs leading-relaxed text-cocoa sm:grid-cols-2">
              {item.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          )}
        </button>
        <Link
          href={locale === "zh-Hans" ? "/zh/book" : "/book"}
          className="btn-outline self-start px-5 py-2 text-xs sm:mt-1"
        >
          {locale === "zh-Hans" ? "预约" : "Book"}
        </Link>
      </div>
    </li>
  );
}
