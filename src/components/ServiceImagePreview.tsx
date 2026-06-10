import Image from "next/image";
import type { ServiceItem } from "@/src/data/serviceMenu";

// Floating image card shown beside a service item on desktop hover.
// Temporary stock image — replace with professional Mend Beauty Studio photography.

type ServiceImagePreviewProps = {
  item: ServiceItem;
};

export default function ServiceImagePreview({ item }: ServiceImagePreviewProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-72 -translate-x-1/2 animate-preview-in"
    >
      <div className="overflow-hidden rounded-2xl border border-beige/70 bg-cream shadow-xl shadow-charcoal/15">
        <div className="relative aspect-[4/3] w-full bg-linen">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="288px"
            className="object-cover"
          />
        </div>
        <div className="px-5 py-4">
          <p className="font-display text-lg font-medium leading-snug text-charcoal">
            {item.name}
          </p>
          {item.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cocoa">
              {item.description}
            </p>
          )}
        </div>
      </div>
      {/* Soft pointer notch */}
      <div className="mx-auto h-2.5 w-2.5 -translate-y-[5px] rotate-45 rounded-[2px] border-b border-r border-beige/70 bg-cream" />
    </div>
  );
}
