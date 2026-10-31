import Hero from "@/components/Hero";
import ResponsiveImage from "@/components/ResponsiveImage";
import { currentPromotions, chineseFirstHairVisitOffer } from "@/lib/promotions";
import { promotionsCopy } from "@/lib/promotions-copy";
import { localePath, type Locale } from "@/lib/i18n";
import PromotionBreadcrumb from "./PromotionBreadcrumb";

export default function PromotionsHub({ locale = "en-AU" }: { locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const offers = locale === "zh-Hans" ? [chineseFirstHairVisitOffer] : currentPromotions;
  return <>
    <PromotionBreadcrumb locale={locale}/>
    <Hero eyebrow={copy.hubEyebrow} title={copy.promotions} lead={copy.hubLineOne} body={copy.hubLineTwo}/>
    <section className="wrap py-16 sm:py-20" aria-label={copy.currentPromotions}>{offers.map((offer) => <article className="grid overflow-hidden rounded-3xl border border-beige/70 bg-white/60 md:grid-cols-2" key={offer.path}>
      <ResponsiveImage src="/images/mend-beauty-salon-interior-1.png" alt={copy.cardImageAlt} rounded="rounded-none" aspect="aspect-[4/3] md:aspect-auto md:min-h-96" sizes="(max-width: 768px) 100vw, 50vw"/>
      <div className="p-7 sm:p-10"><p className="eyebrow">{copy.cardEyebrow}</p><h2 className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">{offer.title}</h2><p className="mt-5 text-base leading-relaxed text-cocoa">{offer.scope}</p><p className="mt-4 text-sm leading-relaxed text-cocoa">{offer.exclusions}</p><a className="btn-gold mt-8" href={localePath(offer.path, locale)}>{copy.exploreOffer}</a></div>
    </article>)}</section>
  </>;
}
