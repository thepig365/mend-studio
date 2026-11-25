import HeadSpaVideo from "@/components/HeadSpaVideo";
import {
  headSpaCardClips,
  headSpaClips,
  headSpaLandingIntro,
  headSpaTreatments,
  localiseDuration,
  type HeadSpaLocale,
} from "@/lib/head-spa-landing";
import type { ServiceItem } from "@/src/data/serviceMenu";

export function HeadSpaHeroVideo({ locale }: { locale: HeadSpaLocale }) {
  const clip = headSpaClips.hero;
  return (
    <HeadSpaVideo
      sources={clip.sources}
      poster={clip.poster}
      label={clip.label[locale]}
      slotId={clip.id}
      aspect="aspect-[4/5]"
      className="rounded-[2rem] shadow-xl shadow-charcoal/10"
    />
  );
}

type HeadSpaLandingProps = {
  locale: HeadSpaLocale;
  /** Existing head-spa menu items: the single source of prices and durations. */
  menuItems: ServiceItem[];
};

export default function HeadSpaLanding({ locale, menuItems }: HeadSpaLandingProps) {
  const copy = headSpaLandingIntro[locale];
  const ritual = headSpaClips.ritual;

  return (
    <div className="mb-14" data-head-spa-landing={locale}>
      <div className="max-w-3xl">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-cocoa">{copy.body}</p>
      </div>

      <h3 className="mt-12 font-display text-2xl font-medium text-charcoal">{copy.menuTitle}</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {headSpaTreatments.map((treatment) => {
          const item = menuItems.find((entry) => entry.id === treatment.id);
          if (!item) return null;
          const duration = localiseDuration(item.time, locale);
          const clipId = headSpaCardClips[treatment.id];
          const clip = clipId ? headSpaClips[clipId] : undefined;
          return (
            <article
              key={treatment.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-white/70"
              data-head-spa-treatment={treatment.id}
            >
              {clip ? (
                <HeadSpaVideo
                  sources={clip.sources}
                  poster={clip.poster}
                  label={clip.label[locale]}
                  slotId={clip.id}
                  aspect="aspect-square"
                  focus={clip.focus}
                />
              ) : null}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h4 className="text-xl font-semibold text-charcoal">{treatment.name[locale]}</h4>
                <p className="mt-1 text-base font-semibold text-bronze">
                  {[duration, item.price].filter(Boolean).join(" · ")}
                </p>
                {treatment.paragraphs[locale].map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-relaxed text-cocoa sm:text-base">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-auto pt-6">
                  <a
                    href={copy.bookHref}
                    className="btn-gold"
                    data-cta-location="head-spa-treatment"
                    data-service="head-spa"
                  >
                    {copy.book}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-14 grid items-center gap-8 rounded-3xl bg-sand p-6 sm:p-10 md:grid-cols-[1fr_minmax(0,20rem)]">
        <div>
          <h3 className="font-display text-2xl font-medium text-charcoal sm:text-3xl">{copy.clipsTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cocoa sm:text-base">{ritual.label[locale]}</p>
          <a href={copy.bookHref} className="btn-gold mt-6" data-cta-location="head-spa-ritual" data-service="head-spa">
            {copy.book}
          </a>
        </div>
        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <HeadSpaVideo
            sources={ritual.sources}
            poster={ritual.poster}
            label={ritual.label[locale]}
            slotId={ritual.id}
            aspect="aspect-[9/16]"
            className="rounded-[2rem]"
          />
        </div>
      </section>
    </div>
  );
}
