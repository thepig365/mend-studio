import Image from "next/image";
import Link from "next/link";
import { currentPromotions, chineseFirstHairVisitOffer } from "@/lib/promotions";
import { promotionsCopy } from "@/lib/promotions-copy";
import { localePath, type Locale } from "@/lib/i18n";
import PromotionBreadcrumb from "./PromotionBreadcrumb";
import styles from "./Promotions.module.css";

export default function PromotionsHub({ locale = "en-AU" }: { locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const offers = locale === "zh-Hans" ? [chineseFirstHairVisitOffer] : currentPromotions;
  return <>
    <PromotionBreadcrumb locale={locale}/>
    <section className={styles.hubIntro}><p className={styles.eyebrow}>{copy.hubEyebrow}</p><h1>{copy.promotions}</h1><p>{copy.hubLineOne}<br/>{copy.hubLineTwo}</p></section>
    <section className={styles.hubOffers} aria-label={copy.currentPromotions}>{offers.map((offer) => <article className={styles.offerCard} key={offer.path}>
      <div className={styles.cardImage}><Image src="/images/mend-beauty-salon-interior-1.png" alt={copy.cardImageAlt} fill sizes="(max-width: 760px) 100vw, 50vw"/></div><div className={styles.cardCopy}><p className={styles.eyebrow}>{copy.cardEyebrow}</p><h2>{offer.title}</h2><p>{offer.scope}</p><p className={styles.scopeNote}>{offer.exclusions}</p><Link className={styles.button} href={localePath(offer.path, locale)}>{copy.exploreOffer} <span aria-hidden="true">↗</span></Link></div>
    </article>)}</section>
  </>;
}
