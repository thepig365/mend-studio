import type { ServiceItem } from "@/lib/services";

type PriceListProps = {
  items: ServiceItem[];
  title?: string;
};

export default function PriceList({ items, title }: PriceListProps) {
  return (
    <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10">
      {title && (
        <h3 className="mb-6 font-display text-2xl font-medium text-charcoal">{title}</h3>
      )}
      <ul className="divide-y divide-beige/70">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-display text-xl font-medium text-charcoal">{item.name}</p>
              {item.price && (
                <p className="shrink-0 text-sm font-medium tracking-wide text-bronze">
                  {item.price}
                </p>
              )}
            </div>
            <div className="flex items-baseline justify-between gap-4">
              {item.description ? (
                <p className="max-w-xl text-sm leading-relaxed text-cocoa">
                  {item.description}
                </p>
              ) : (
                <span />
              )}
              {item.duration && (
                <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-taupe">
                  {item.duration}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
