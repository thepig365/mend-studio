"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { firstHairVisitOffer as offer } from "@/lib/promotions";
import { site } from "@/lib/site";
import styles from "./Promotions.module.css";

export default function FirstHairVisit() {
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
      {bannerVisible && <aside className={styles.banner} aria-label="First-visit hair offer">
        <p><span aria-hidden="true">⌖</span><span>New to MEND? <strong>50% off your first hair visit.</strong></span></p>
        <button className={styles.bannerLink} onClick={openOffer}>See offer <span aria-hidden="true">↗</span></button>
        <button className={styles.bannerClose} aria-label="Dismiss offer banner" onClick={() => setBannerVisible(false)}>×</button>
      </aside>}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/promotions">Promotions</Link><span aria-hidden="true">/</span><span>First hair visit</span></nav>
          <p className={styles.eyebrow}>DEEPDENE · MELBOURNE</p>
          <h1>Hair Atelier<span>at MEND.</span></h1>
          <p className={styles.heroOffer}>50% off your first hair visit.</p>
          <p className={styles.heroDetail}>{offer.scope} Haircuts, colour, balayage, styling, perms and hair treatments.</p>
          <div className={styles.heroActions}><a className={styles.button} href="/book">Book <span aria-hidden="true">↗</span></a><button className={styles.textLink} onClick={openOffer}>View offer details <span aria-hidden="true">→</span></button></div>
          <p className={styles.heroAddress}><span aria-hidden="true"/>74 Whitehorse Road, Deepdene</p>
        </div>
        <figure className={styles.heroPhoto}><Image src="/images/mend-beauty-hero.png" alt="MEND Beauty Studio interior in Deepdene with arched entrances and hair stations" fill priority sizes="(max-width: 760px) 100vw, 55vw"/><figcaption><span>YOUR TIME. YOUR HAIR.</span><span>THE DEEPDENE STUDIO</span></figcaption></figure>
      </section>
      <section className={styles.serviceLine} aria-label="Included hair services">
        {offer.services.map((service) => <span key={service}>{service}</span>)}
      </section>
      <section className={styles.offerSection} id="offer" aria-labelledby="offer-heading">
        <div><p className={styles.eyebrow}>A FIRST-VISIT WELCOME</p><h2 id="offer-heading">Your hair. A fresh beginning.</h2><p>Enjoy 50% off all hair service items on your first visit as a new MEND client.</p><p className={styles.scopeNote}>{offer.exclusions}</p><Link className={styles.textLink} href="/services/hair">Explore the Hair Atelier menu <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.bookingCard}><p className={styles.eyebrow}>PLAN YOUR VISIT</p><h3>We look forward to meeting you.</h3><p>Book your hair appointment online. For help with the offer or your booking, call our team.</p><a className={styles.button} href="/book">Book <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={site.phoneHref}>Call {site.phone}</a></div>
      </section>
      <dialog className={styles.dialog} ref={dialog} aria-labelledby="offer-dialog-title" aria-describedby="offer-dialog-scope" onClose={returnFocus} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeOffer();
      }}>
        <div className={styles.modalTop}><button className={styles.modalClose} onClick={closeOffer} aria-label="Close offer details" autoFocus>×</button></div>
        <div className={styles.modalGrid}><figure className={styles.modalPhoto}><Image src="/images/mend-beauty-salon-interior-1.png" alt="Hair styling stations inside MEND's Deepdene studio" fill sizes="(max-width: 760px) 1px, 380px"/><figcaption>MEND, DEEPDENE.<br/>A space for you.</figcaption></figure><div className={styles.modalCopy}>
          <p className={styles.eyebrow}>NEW TO HAIR ATELIER?</p><h2 id="offer-dialog-title">Your first hair visit.<br/>50% off.</h2><p className={styles.modalLead} id="offer-dialog-scope">{offer.scope}</p><p>Includes haircuts, colour, balayage, styling, perms and hair treatments.</p><p className={styles.scopeNote}>{offer.exclusions}</p><a className={styles.button} href="/book">Book <span aria-hidden="true">↗</span></a><a className={styles.textLink} href={site.phoneHref}>Call about this offer</a><button className={styles.continueButton} onClick={closeOffer}>I’ll explore first <span aria-hidden="true">→</span></button><p className={styles.modalAddress}>74 Whitehorse Road, Deepdene VIC 3103</p>
        </div></div>
      </dialog>
    </>
  );
}
