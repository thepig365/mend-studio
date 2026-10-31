"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { firstHairVisitOffer, chineseFirstHairVisitOffer } from "@/lib/promotions";
import { localePath, ui, type Locale } from "@/lib/i18n";
import { promotionsCopy } from "@/lib/promotions-copy";
import { site } from "@/lib/site";
import styles from "./Promotions.module.css";

export default function FirstHairVisit({ locale = "en-AU" }: { locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const common = ui[locale];
  const offer = locale === "zh-Hans" ? chineseFirstHairVisitOffer : firstHairVisitOffer;
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  const openOffer = (event: MouseEvent<HTMLButtonElement>) => {
    opener.current = event.currentTarget;
    dialog.current?.showModal();
    setIsOpen(true);
  };
  const closeOffer = () => dialog.current?.close();
  const returnFocus = () => { setIsOpen(false); opener.current?.focus(); };

  return (
    <>
      {bannerVisible && <aside className={styles.banner} aria-label={copy.bannerLabel}>
        <p><span aria-hidden="true">⌖</span><span>{copy.welcome} <strong>{copy.offerHeadline}</strong></span></p>
        <button className={styles.bannerLink} onClick={openOffer}>{copy.seeOffer} <span aria-hidden="true">↗</span></button>
        <button className={styles.bannerClose} aria-label={copy.dismissBanner} onClick={() => setBannerVisible(false)}>×</button>
      </aside>}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}><Link href={localePath("/promotions", locale)}>{copy.promotions}</Link><span aria-hidden="true">/</span><span>{copy.firstHairVisit}</span></nav>
          <p className={styles.eyebrow}>{copy.location}</p>
          <h1>Hair Atelier<span>{copy.heroSubheading}</span></h1>
          <p className={styles.heroOffer}>{copy.offerHeadline}</p>
          <p className={styles.heroDetail}>{offer.scope} {copy.serviceSummary}</p>
          <div className={styles.heroActions}><a className={styles.button} href={localePath("/book", locale)}>{common.bookNow} <span aria-hidden="true">↗</span></a><button className={styles.textLink} onClick={openOffer}>{copy.details} <span aria-hidden="true">→</span></button></div>
          <p className={styles.heroAddress}><span aria-hidden="true"/>74 Whitehorse Road, Deepdene</p>
        </div>
        <figure className={styles.heroPhoto}><Image src="/images/mend-beauty-hero.png" alt={copy.heroImageAlt} fill priority sizes="(max-width: 760px) 100vw, 55vw"/><figcaption><span>{copy.heroCaption}</span><span>{copy.studioCaption}</span></figcaption></figure>
      </section>
      <section className={styles.serviceLine} aria-label={copy.includedServices}>
        {offer.services.map((service) => <span key={service}>{service}</span>)}
      </section>
      <section className={styles.offerSection} id="offer" aria-labelledby="offer-heading">
        <div><p className={styles.eyebrow}>{copy.welcomeEyebrow}</p><h2 id="offer-heading">{copy.welcomeHeading}</h2><p>{copy.welcomeBody}</p><p className={styles.scopeNote}>{offer.exclusions}</p><Link className={styles.textLink} href={localePath("/services/hair", locale)}>{copy.menu} <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.bookingCard}><p className={styles.eyebrow}>{copy.planVisit}</p><h3>{copy.bookingHeading}</h3><p>{copy.bookingBody}</p><a className={styles.button} href={localePath("/book", locale)}>{common.bookNow} <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={site.phoneHref}>{common.call} {site.phone}</a></div>
      </section>
      <dialog className={styles.dialog} ref={dialog} aria-labelledby="offer-dialog-title" aria-describedby="offer-dialog-scope" onClose={returnFocus} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeOffer();
      }}>
        <div className={styles.modalTop}><button className={styles.modalClose} onClick={closeOffer} aria-label={copy.closeDetails} autoFocus>×</button></div>
        <div className={styles.modalGrid}><figure className={styles.modalPhoto}><Image src="/images/mend-beauty-salon-interior-1.png" alt={copy.modalImageAlt} fill sizes="(max-width: 760px) 1px, 380px"/><figcaption>{copy.modalCaptionOne}<br/>{copy.modalCaptionTwo}</figcaption></figure><div className={styles.modalCopy}>
          <p className={styles.eyebrow}>{copy.modalEyebrow}</p><h2 id="offer-dialog-title">{copy.modalHeadingOne}<br/>{copy.modalHeadingTwo}</h2><p className={styles.modalLead} id="offer-dialog-scope">{offer.scope}</p><p>{copy.modalServices}</p><p className={styles.scopeNote}>{offer.exclusions}</p><a className={styles.button} href={localePath("/book", locale)}>{common.bookNow} <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={site.phoneHref}>{copy.callOffer}</a><button className={styles.continueButton} onClick={closeOffer}>{copy.exploreFirst} <span aria-hidden="true">→</span></button><p className={styles.modalAddress}>74 Whitehorse Road, Deepdene VIC 3103</p>
        </div></div>
      </dialog>
    </>
  );
}
