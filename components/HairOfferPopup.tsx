"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isChinesePath, localePath } from "@/lib/i18n";
import { firstHairVisitOffer, chineseFirstHairVisitOffer } from "@/lib/promotions";
import { hairOfferPopupDelay, hairOfferPopupSessionKey, isHairOfferPopupRoute } from "@/lib/hair-offer-popup";

export default function HairOfferPopup() {
  const pathname = usePathname();
  const [visibleOn, setVisibleOn] = useState<string | null>(null);
  const card = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const chinese = isChinesePath(pathname);
  const locale = chinese ? "zh-Hans" : "en-AU";
  const offer = chinese ? chineseFirstHairVisitOffer : firstHairVisitOffer;
  const visible = visibleOn === pathname && isHairOfferPopupRoute(pathname);

  const dismiss = useCallback(() => {
    // Automatic, nonmodal content never takes focus on appearance. Only
    // return focus when the visitor had actually entered this card.
    if (card.current?.contains(document.activeElement)) {
      const target = previousFocus.current;
      if (target?.isConnected && target !== document.body) target.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>("header a[href]")?.focus({ preventScroll: true });
    }
    setVisibleOn(null);
  }, []);

  useEffect(() => {
    if (!isHairOfferPopupRoute(pathname)) return;
    try {
      if (window.sessionStorage.getItem(hairOfferPopupSessionKey)) return;
    } catch {
      // If session suppression is unavailable, don't repeatedly interrupt.
      return;
    }
    let timer: number;
    const reveal = () => {
      const active = document.activeElement;
      const busy = document.visibilityState !== "visible"
        || document.querySelector('dialog[open], [role="dialog"][aria-modal="true"], [data-mend-analytics-consent], header button[aria-expanded="true"]')
        || (active instanceof HTMLElement && (active.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)));
      if (busy) {
        timer = window.setTimeout(reveal, 2000);
        return;
      }
      try {
        window.sessionStorage.setItem(hairOfferPopupSessionKey, "shown");
      } catch {
        return;
      }
      previousFocus.current = active instanceof HTMLElement ? active : null;
      setVisibleOn(pathname);
    };
    timer = window.setTimeout(reveal, hairOfferPopupDelay);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) dismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dismiss, visible]);

  if (!visible) return null;

  return (
    <aside ref={card} aria-labelledby="hair-offer-popup-title" className="fixed inset-x-4 bottom-24 z-50 mx-auto max-h-[36svh] max-w-sm overflow-y-auto rounded-2xl border border-beige bg-cream p-3 shadow-xl shadow-charcoal/15 sm:left-auto sm:right-6 sm:mx-0 sm:max-h-[70vh] sm:w-96 sm:p-5 lg:bottom-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow hidden sm:block">Hair Atelier · {chinese ? "新客礼遇" : "New clients"}</p>
          <h2 id="hair-offer-popup-title" className="mt-1 font-display text-2xl font-medium leading-tight text-charcoal">{chinese ? "首次美发五折" : "50% off hair"}</h2>
        </div>
        <button type="button" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige text-2xl text-cocoa hover:bg-linen focus-visible:outline-2 focus-visible:outline-gold" aria-label={chinese ? "关闭美发优惠提示" : "Close hair offer"} onClick={dismiss}><span aria-hidden="true">×</span></button>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-cocoa sm:mt-2">{offer.scope}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-cocoa sm:mt-2"><span className="sm:hidden">{chinese ? "仅限美发服务，不含零售商品。" : "Hair services only · no retail products."}</span><span className="hidden sm:inline">{offer.exclusions}</span></p>
      <a className="btn-gold mt-2 min-h-11 w-full sm:mt-3" href={localePath(firstHairVisitOffer.path, locale)} data-analytics-placement="hair_offer_popup">{chinese ? "查看五折美发优惠" : "Explore the 50% hair offer"}</a>
    </aside>
  );
}
