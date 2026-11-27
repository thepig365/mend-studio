import {
  chairRentalCopy,
  chairRentalStills,
  type ChairRentalLocale,
  type ChairRentalStill,
} from "@/lib/chair-rental-landing";
import { chairRentalPhone } from "@/lib/chair-rental-phone";

function StillPicture({
  still,
  locale,
  aspect,
  className,
  sizes,
  priority = false,
}: {
  still: ChairRentalStill;
  locale: ChairRentalLocale;
  aspect: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const avif = still.variants
    .filter((variant) => variant.format === "avif")
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
  const webp = still.variants
    .filter((variant) => variant.format === "webp")
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
  const fallback = still.variants.filter((variant) => variant.format === "jpg").at(-1);
  if (!fallback) return null;

  return (
    <div className={`${aspect} ${className ?? ""} overflow-hidden bg-sand`}>
      <picture>
        <source type="image/avif" srcSet={avif} sizes={sizes} />
        <source type="image/webp" srcSet={webp} sizes={sizes} />
        <img
          src={fallback.src}
          alt={still.alt[locale]}
          width={still.width}
          height={still.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}

export default function ChairRentalLanding({ locale }: { locale: ChairRentalLocale }) {
  const copy = chairRentalCopy[locale];
  const stations = chairRentalStills["styling-stations"];
  const interior = chairRentalStills["salon-interior"];
  const reception = chairRentalStills.reception;
  const washBed = chairRentalStills["wash-bed"];

  return (
    <>
      <section className="bg-sand">
        <div className="wrap py-10 sm:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <StillPicture
              still={stations}
              locale={locale}
              aspect="aspect-[3/4]"
              className="rounded-[2rem] shadow-xl shadow-charcoal/10"
              sizes="(max-width: 1024px) 100vw, 560px"
              priority
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-gold">{copy.subtitle}</p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 font-display text-2xl italic leading-snug text-cocoa sm:text-3xl">{copy.lead}</p>
              <p className="mt-6 text-base leading-relaxed text-cocoa">{copy.intro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pb-16 sm:pb-20" aria-label={copy.galleryLabel}>
        <div className="grid gap-5">
          <StillPicture
            still={interior}
            locale={locale}
            aspect="aspect-[16/9]"
            className="rounded-[2rem]"
            sizes="(max-width: 1024px) 100vw, 1120px"
          />
          <div className="grid gap-5 md:grid-cols-3">
            <StillPicture
              still={reception}
              locale={locale}
              aspect="aspect-[3/2]"
              className="rounded-[2rem] md:col-span-2"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <StillPicture
              still={washBed}
              locale={locale}
              aspect="aspect-[3/4]"
              className="rounded-[2rem]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 sm:py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-medium text-charcoal sm:text-4xl">{copy.sectionTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {copy.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-beige/70 bg-white/70 p-7 sm:p-8"
              >
                <h3 className="font-display text-xl font-medium text-charcoal">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-gold/40 bg-sand p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
              {locale === "zh-Hans" ? "租金" : "The rate"}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-charcoal sm:text-3xl">{copy.price}</p>
          </div>
          <div className="rounded-[2rem] border border-beige/70 bg-white/70 p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">
              {locale === "zh-Hans" ? "地点" : "The studio"}
            </p>
            <p className="mt-4 text-base leading-relaxed text-cocoa">{copy.location}</p>
          </div>
        </div>
      </section>

      <section className="wrap pb-16 sm:pb-24">
        <div className="rounded-[2.5rem] bg-espresso px-8 py-14 text-center text-cream sm:px-14 sm:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">
            {copy.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/80">{copy.ctaBody}</p>
          <div className="mt-8 flex w-full flex-col items-center gap-8">
            <a
              href={chairRentalPhone.href}
              data-cta-location="chair-rental"
              className="group inline-flex flex-col items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-gold">{copy.phoneLabel}</span>
              <span className="whitespace-nowrap font-display text-3xl font-medium tracking-wide text-cream underline decoration-gold/60 underline-offset-[0.2em] transition-colors group-hover:text-gold sm:text-5xl">
                {chairRentalPhone.display}
              </span>
            </a>
            <a href={copy.ctaHref} className="btn-light inline-flex">
              {copy.ctaLabel}
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-cream/75">{copy.ctaFollow}</p>
        </div>
      </section>
    </>
  );
}
