"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ServiceItem } from "@/src/data/serviceMenu";

// Bottom sheet (mobile) / centred dialog (desktop) showing the service image,
// details, price, time and a Book Now button.
// Temporary stock image — replace with professional Mend Beauty Studio photography.

type ServiceImageModalProps = {
  item: ServiceItem;
  onClose: () => void;
};

export default function ServiceImageModal({ item, onClose }: ServiceImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in cursor-default bg-charcoal/50 backdrop-blur-[2px]"
        tabIndex={-1}
      />

      {/* Panel — bottom sheet on mobile, centred card on larger screens */}
      <div className="relative w-full max-w-lg animate-sheet-up overflow-hidden rounded-t-3xl bg-cream shadow-2xl shadow-charcoal/30 sm:rounded-3xl">
        <div className="relative aspect-[16/10] w-full bg-linen">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
            priority
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/55 text-cream backdrop-blur transition-colors hover:bg-charcoal/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-gold">
            {item.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-charcoal">
            {item.name}
          </h3>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-base font-medium text-bronze">{item.price}</span>
            {item.time && (
              <span className="text-xs uppercase tracking-[0.18em] text-taupe">
                {item.time}
              </span>
            )}
          </div>

          {item.description && (
            <p className="mt-4 text-sm leading-relaxed text-cocoa">{item.description}</p>
          )}

          {item.bookingNote && (
            <p className="mt-3 text-xs leading-relaxed text-taupe">{item.bookingNote}</p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" onClick={onClose} className="btn-gold flex-1">
              Book Now
            </a>
            <button type="button" onClick={onClose} className="btn-outline flex-1">
              Close
            </button>
          </div>

          <p className="mt-5 text-center text-[0.65rem] leading-relaxed text-taupe">
            Temporary stock image via {item.image.sourceName} — for illustration only.
          </p>
        </div>
      </div>
    </div>
  );
}
