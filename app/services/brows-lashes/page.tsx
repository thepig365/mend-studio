import ServicePage from "@/components/ServicePage";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getCategory } from "@/lib/services";
import { getMenuItemsForCategory } from "@/src/data/serviceMenu";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Brows & Lashes",
  description:
    "Korean lash lift, brow lamination, tinting and eyelash extensions at Mend Beauty Studio, Balwyn. Natural, low-maintenance eye beauty.",
  path: "/services/brows-lashes",
});

export default function BrowsLashesPage() {
  const category = getCategory("brows-lashes");
  const menu = getMenuItemsForCategory("brows-lashes");
  return (
    <ServicePage category={category} subtitle="Natural Eye Beauty" hidePriceList>
      {/* Featured trio — images shown directly on the cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {menu.items.map((item, index) => (
          <div
            key={item.id}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-beige/70 bg-white/60"
          >
            {/* Temporary stock image — replace with professional Mend Beauty Studio photography. */}
            <ResponsiveImage
              src={item.image.src}
              alt={item.image.alt}
              aspect="aspect-[16/10]"
              rounded="rounded-none"
            />
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
                Signature {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium leading-snug text-charcoal">
                {item.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa">
                {item.description}
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-beige/70 pt-5">
                <span className="text-base font-medium text-bronze">{item.price}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-taupe">
                  {item.time}
                </span>
              </div>
              <a href="#contact" className="btn-primary mt-6">
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </ServicePage>
  );
}
