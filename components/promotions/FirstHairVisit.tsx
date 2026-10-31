"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { firstHairVisitOffer, chineseFirstHairVisitOffer } from "@/lib/promotions";
import { promotionServiceLinks } from "@/lib/promotion-service-links";
import { localePath, ui, type Locale } from "@/lib/i18n";
import { promotionsCopy } from "@/lib/promotions-copy";
import { site } from "@/lib/site";
import styles from "./Promotions.module.css";

export default function FirstHairVisit({ locale = "en-AU" }: { locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const common = ui[locale];
  const offer = locale === "zh-Hans" ? chineseFirstHairVisitOffer : firstHairVisitOffer;
  const serviceLinks = promotionServiceLinks.map((service, index) => ({
    label: offer.services[index],
    description: copy.serviceDescriptions[index],
    href: `${localePath("/services/hair", locale)}#${service.anchor}`,
  }));
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
      {bannerVisible && <aside className="border-b border-beige/70 bg-linen" aria-label={copy.bannerLabel}>
        <div className="wrap flex items-center gap-3 py-3 text-sm leading-relaxed text-charcoal">
          <p className="flex-1">{copy.welcome} <strong className="font-medium">{copy.offerHeadline}</strong></p>
          <button className="min-h-11 shrink-0 rounded-full px-3 font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold" onClick={openOffer}>{copy.seeOffer}</button>
          <button className="menu-toggle shrink-0" aria-label={copy.dismissBanner} onClick={() => setBannerVisible(false)}>×</button>
        </div>
      </aside>}
      <nav className="bg-sand" aria-label={copy.breadcrumb}><div className="wrap flex flex-wrap gap-3 pt-6 text-sm text-cocoa"><Link className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold" href={localePath("/promotions", locale)}>{copy.promotions}</Link><span aria-hidden="true">/</span><span>{copy.firstHairVisit}</span></div></nav>
      <Hero
        eyebrow={copy.location}
        title="Hair Atelier"
        subtitle={locale === "zh-Hans" ? copy.heroSubheading : "MEND Beauty Studio"}
        lead={copy.offerHeadline}
        body={offer.scope}
        image="/images/mend-beauty-hero.png"
        imageAlt={copy.heroImageAlt}
        actions={[
          { label: common.bookNow, href: localePath("/book", locale), variant: "gold" },
          { label: copy.includedServices, href: "#hair-services", variant: "outline" },
        ]}
      />
      <section className="wrap scroll-mt-52 py-16 sm:py-20" id="hair-services" aria-label={copy.includedServices}>
        <SectionHeading eyebrow="HAIR ATELIER" title={copy.includedServices} body={copy.serviceDetails}/>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLinks.map((service) => <ServiceCard key={service.href} title={service.label} description={service.description} href={service.href} linkLabel={copy.viewServices}/>)}
        </div>
        <div className="mt-8 text-center"><Link className="btn-outline" href={localePath("/services/hair", locale)}>{copy.menu}</Link></div>
      </section>
      <section className="bg-sand" id="offer">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div><SectionHeading align="left" eyebrow={copy.welcomeEyebrow} title={copy.welcomeHeading} body={copy.welcomeBody}/><p className="mt-5 text-sm leading-relaxed text-cocoa">{offer.exclusions}</p><button className="btn-outline mt-8" onClick={openOffer}>{copy.details}</button></div>
          <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-10"><p className="eyebrow">{copy.planVisit}</p><h3 className="mt-3 font-display text-2xl font-medium leading-tight text-charcoal">{copy.bookingHeading}</h3><p className="mt-4 text-base leading-relaxed text-cocoa">{copy.bookingBody}</p><div className="mt-8 flex flex-wrap gap-3"><a className="btn-gold" href={localePath("/book", locale)}>{common.bookNow}</a><a className="btn-outline" href={site.phoneHref}>{common.call} {site.phone}</a></div></div>
        </div>
      </section>
      <dialog className={styles.dialog} ref={dialog} aria-labelledby="offer-dialog-title" aria-describedby="offer-dialog-scope" onClose={returnFocus} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeOffer();
      }}>
        <div className="sticky top-0 z-10 flex justify-end bg-cream px-4 py-3"><button className="menu-toggle" onClick={closeOffer} aria-label={copy.closeDetails} autoFocus>×</button></div>
        <div className="grid md:grid-cols-[.8fr_1fr]">
          <div className="relative hidden min-h-96 md:block"><Image src="/images/mend-beauty-salon-interior-1.png" alt={copy.modalImageAlt} fill sizes="400px" className="object-cover"/></div>
          <div className="px-6 pb-8 sm:px-8"><p className="eyebrow">{copy.modalEyebrow}</p><h2 className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl" id="offer-dialog-title">{copy.modalHeadingOne}<br/>{copy.modalHeadingTwo}</h2><p className="mt-5 text-base leading-relaxed text-cocoa" id="offer-dialog-scope">{offer.scope}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cocoa" aria-label={copy.includedServices}>{serviceLinks.map((service) => <li key={service.href}><a className="inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold" href={service.href}>{service.label}</a></li>)}</ul>
            <p className="mt-4 text-sm leading-relaxed text-cocoa">{offer.exclusions}</p><div className="mt-6 flex flex-wrap gap-3"><a className="btn-gold" href={localePath("/book", locale)}>{common.bookNow}</a><a className="btn-outline" href={site.phoneHref}>{copy.callOffer}</a></div><button className="mt-4 min-h-11 rounded-sm text-sm text-cocoa underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold" onClick={closeOffer}>{copy.exploreFirst}</button><p className="mt-4 text-xs leading-relaxed text-cocoa">74 Whitehorse Road, Deepdene VIC 3103</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
