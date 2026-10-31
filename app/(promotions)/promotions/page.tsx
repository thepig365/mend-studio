import Image from "next/image";
import Link from "next/link";
import { currentPromotions, promotionMetadata } from "@/lib/promotions";
import PromotionBreadcrumb from "@/components/promotions/PromotionBreadcrumb";
import styles from "@/components/promotions/Promotions.module.css";

export const metadata = promotionMetadata("Promotions in Deepdene", "Explore current MEND Beauty Studio promotions, including 50% off all hair service items for new clients on their first visit.", "/promotions");

export default function PromotionsPage() {
  return <>
    <PromotionBreadcrumb/>
    <section className={styles.hubIntro}><p className={styles.eyebrow}>MEND BEAUTY STUDIO · DEEPDENE</p><h1>Promotions</h1><p>A little more to look forward to.<br/>Explore our current offers.</p></section>
    <section className={styles.hubOffers} aria-label="Current promotions">{currentPromotions.map((offer) => <article className={styles.offerCard} key={offer.path}>
      <div className={styles.cardImage}><Image src="/images/mend-beauty-salon-interior-1.png" alt="Hair stations inside MEND Beauty Studio" fill sizes="(max-width: 760px) 100vw, 50vw"/></div><div className={styles.cardCopy}><p className={styles.eyebrow}>HAIR ATELIER · NEW CLIENTS</p><h2>{offer.title}</h2><p>{offer.scope}</p><p className={styles.scopeNote}>{offer.exclusions}</p><Link className={styles.button} href={offer.path}>Explore the offer <span aria-hidden="true">↗</span></Link></div>
    </article>)}</section>
  </>;
}
