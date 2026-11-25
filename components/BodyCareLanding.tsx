import HeadSpaVideo from "@/components/HeadSpaVideo";
import MediaSlot from "@/components/MediaSlot";
import {
  bodyCareGroups,
  bodyCareLandingIntro,
  bodyCareNeckClip,
  bodyCareTreatments,
  type BodyCareGroupId,
  type BodyCareLocale,
  type BodyCareTreatment,
} from "@/lib/body-care-landing";
import { localiseDuration } from "@/lib/head-spa-landing";
import type { ServiceItem } from "@/src/data/serviceMenu";

export function BodyCareHeroMedia({ locale }: { locale: BodyCareLocale }) {
  const copy = bodyCareLandingIntro[locale];
  return (
    <MediaSlot
      slotId="hero"
      label={copy.heroSlotLabel}
      aspect="aspect-[4/5]"
      className="rounded-[2rem] shadow-xl shadow-charcoal/10"
    />
  );
}

type BodyCareLandingProps = {
  locale: BodyCareLocale;
  /** Existing body-care menu items: the single source of prices and durations. */
  menuItems: ServiceItem[];
};

function TreatmentCard({
  treatment,
  locale,
  menuItems,
}: {
  treatment: BodyCareTreatment;
  locale: BodyCareLocale;
  menuItems: ServiceItem[];
}) {
  const copy = bodyCareLandingIntro[locale];
  const item = menuItems.find((entry) => entry.id === treatment.id);
  if (!item) return null;
  const duration = localiseDuration(item.time, locale);
  const isNeckCard = treatment.id === bodyCareNeckClip.treatmentId;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-white/70"
      data-body-care-treatment={treatment.id}
    >
      {isNeckCard ? (
        <div>
          <HeadSpaVideo
            sources={bodyCareNeckClip.sources}
            poster={bodyCareNeckClip.poster}
            label={bodyCareNeckClip.label[locale]}
            slotId={bodyCareNeckClip.id}
            aspect="aspect-square"
            focus={bodyCareNeckClip.focus}
          />
          <p
            className="bg-sand px-4 py-2 text-center text-xs leading-relaxed text-taupe"
            data-consent={bodyCareNeckClip.consent}
          >
            {copy.neckCaption}
          </p>
        </div>
      ) : (
        <MediaSlot slotId={treatment.id} label={copy.mediaSlotLabel} aspect="aspect-square" />
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h4 className="text-xl font-semibold text-charcoal">{treatment.name[locale]}</h4>
        {locale === "zh-Hans" ? (
          <p className="mt-1 text-sm font-medium text-bronze">{treatment.name["en-AU"]}</p>
        ) : null}
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
            data-cta-location="body-care-treatment"
            data-service="body-care"
          >
            {copy.book}
          </a>
        </div>
      </div>
    </article>
  );
}

function GroupBlock({
  group,
  locale,
  menuItems,
}: {
  group: BodyCareGroupId;
  locale: BodyCareLocale;
  menuItems: ServiceItem[];
}) {
  const meta = bodyCareGroups[group];
  const treatments = bodyCareTreatments.filter((treatment) => treatment.group === group);
  return (
    <section className="mt-12" data-body-care-group={group}>
      <h3 className="font-display text-2xl font-medium text-charcoal">{meta.title[locale]}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa sm:text-base">{meta.intro[locale]}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {treatments.map((treatment) => (
          <TreatmentCard key={treatment.id} treatment={treatment} locale={locale} menuItems={menuItems} />
        ))}
      </div>
    </section>
  );
}

export default function BodyCareLanding({ locale, menuItems }: BodyCareLandingProps) {
  const copy = bodyCareLandingIntro[locale];

  return (
    <div className="mb-14" data-body-care-landing={locale}>
      <div className="max-w-3xl">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">{copy.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-cocoa">{copy.body}</p>
        <p className="mt-4 text-sm leading-relaxed text-taupe">{copy.disclaimer}</p>
      </div>
      <GroupBlock group="body-therapy" locale={locale} menuItems={menuItems} />
      <GroupBlock group="signature-massage" locale={locale} menuItems={menuItems} />
    </div>
  );
}
