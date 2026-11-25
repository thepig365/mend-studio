import HeadSpaVideo from "@/components/HeadSpaVideo";
import {
  headSpaClips,
  headSpaLandingIntro,
  headSpaTreatments,
  localiseDuration,
  showVideoSlotPlaceholders,
  type HeadSpaLocale,
} from "@/lib/head-spa-landing";
import type { ServiceItem } from "@/src/data/serviceMenu";

const placeholderText: Record<HeadSpaLocale, string> = {
  "en-AU": "Awaiting MEND's own head spa clip (preview only).",
  "zh-Hans": "等待 MEND 门店实拍头疗片段（仅预览可见）。",
};

export function HeadSpaHeroVideo({ locale }: { locale: HeadSpaLocale }) {
  const clip = headSpaClips.hero;
  const showPlaceholder = showVideoSlotPlaceholders();
  if (!clip.sources && !showPlaceholder) return null;
  return (
    <HeadSpaVideo
      sources={clip.sources}
      poster={clip.poster}
      label={clip.label[locale]}
      slotId={clip.id}
      showPlaceholder={showPlaceholder}
      placeholderText={placeholderText[locale]}
      aspect="aspect-[4/5]"
      className="shadow-xl shadow-charcoal/10"
    />
  );
}

export function hasHeadSpaHeroVideo(): boolean {
  return Boolean(headSpaClips.hero.sources) || showVideoSlotPlaceholders();
}

type HeadSpaLandingProps = {
  locale: HeadSpaLocale;
  /** Existing head-spa menu items: the single source of prices and durations. */
  menuItems: ServiceItem[];
};

export default function HeadSpaLanding({ locale, menuItems }: HeadSpaLandingProps) {
  const copy = headSpaLandingIntro[locale];
  const showPlaceholder = showVideoSlotPlaceholders();
  const inlineClips = [headSpaClips["clip-1"], headSpaClips["clip-2"], headSpaClips["clip-3"]];
  const visibleClips = inlineClips.filter((clip) => clip.sources || showPlaceholder);

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
          return (
            <article
              key={treatment.id}
              className="flex flex-col rounded-3xl border border-gold/20 bg-white/70 p-6 sm:p-7"
              data-head-spa-treatment={treatment.id}
            >
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
            </article>
          );
        })}
      </div>

      {visibleClips.length > 0 && (
        <>
          <h3 className="mt-14 font-display text-2xl font-medium text-charcoal">{copy.clipsTitle}</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {visibleClips.map((clip) => (
              <HeadSpaVideo
                key={clip.id}
                sources={clip.sources}
                poster={clip.poster}
                label={clip.label[locale]}
                slotId={clip.id}
                showPlaceholder={showPlaceholder}
                placeholderText={clip.pendingNote?.[locale] ?? placeholderText[locale]}
                aspect="aspect-[9/16]"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
