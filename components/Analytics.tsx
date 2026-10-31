"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { chineseLocale, isChinesePath, localePath } from "@/lib/i18n";
import { isHairOfferPopupRoute } from "@/lib/hair-offer-popup";

type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const consentKey = "mend-analytics-consent";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

function initialiseAnalytics(id: string) {
  if (document.querySelector(`script[data-mend-ga="${id}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google tag commands require an Arguments object, not a rest array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.dataset.mendGa = id;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

function hairContext(pathname: string) {
  const path = pathname.replace(/^\/zh(?=\/)/, "");
  if (path === "/services/hair") return { service_category: "hair", page_type: "service" };
  if (path === "/promotions/first-hair-visit") {
    return { service_category: "hair", page_type: "promotion", offer_id: "first-hair-visit" };
  }
  return {};
}

function trackedAction(href: string) {
  if (href === "/book" || href === "/zh/book") return "book_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("google.com/maps")) return "directions_click";
  return null;
}

export default function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const previousPage = useRef<string | null>(null);
  const locale = isChinesePath(pathname) ? chineseLocale : "en-AU";

  useEffect(() => {
    if (!measurementId) return;
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(consentKey);
      setConsent(stored === "accepted" || stored === "declined" ? stored : null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!measurementId || consent !== "accepted") return;
    initialiseAnalytics(measurementId);
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      page_referrer: previousPage.current ?? document.referrer,
      ...hairContext(pathname),
    });
    previousPage.current = window.location.href;
  }, [consent, pathname]);

  useEffect(() => {
    if (!measurementId || consent !== "accepted") return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest("a[href], button[data-analytics-action]");
      if (!control) return;
      const href = control.getAttribute("href");
      const path = window.location.pathname;
      const context = hairContext(path);
      // Only explicitly tagged offer-detail buttons are tracked; no form values
      // or arbitrary button text are collected. A view is not a redeemed offer.
      if (control.getAttribute("data-analytics-action") === "offer_details_view" && context.offer_id) {
        window.gtag("event", "offer_details_view", { page_path: path, ...context });
        return;
      }
      if (!href) return;
      const offerLink = ["/promotions/first-hair-visit", "/zh/promotions/first-hair-visit"].includes(href);
      const popupOffer = offerLink && isHairOfferPopupRoute(path) && control.getAttribute("data-analytics-placement") === "hair_offer_popup";
      const action = trackedAction(href) ?? (
        (context.service_category === "hair" || popupOffer) && offerLink
          ? "offer_view_click" : null
      );
      if (!action) return;

      window.gtag("event", action, {
        page_path: path,
        link_url: href,
        ...context,
        ...(popupOffer ? { service_category: "hair", link_placement: "hair_offer_popup" } : {}),
        ...(action === "book_click" ? { action_stage: "booking_link" } : {}),
        ...(action === "offer_view_click" ? { offer_id: "first-hair-visit" } : {}),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!measurementId || consent !== null) return null;

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  return (
    <aside
      data-mend-analytics-consent
      aria-label={
        locale === chineseLocale ? "可选网站分析设置" : "Optional website analytics"
      }
      className="fixed inset-x-4 bottom-24 z-[90] mx-auto max-w-3xl rounded-3xl border border-beige bg-cream p-5 shadow-[0_18px_55px_-22px_rgba(51,46,38,0.45)] lg:bottom-6"
    >
      <p className="font-medium text-charcoal">
        {locale === chineseLocale
          ? "是否允许可选网站分析？"
          : "Allow optional website analytics?"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-cocoa">
        {locale === chineseLocale
          ? "我们只用它了解哪些页面帮助访客找到服务并点击预约、电话、邮件或路线。拒绝后仍可正常使用网站。"
          : "We use it only to understand which pages help visitors find services and reach booking, phone, email or directions actions. The website works normally if you decline."}{" "}
        <Link
          href={localePath("/policies", locale)}
          className="underline underline-offset-4 hover:text-bronze"
        >
          {locale === chineseLocale ? "了解更多" : "Learn more"}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-gold min-h-11 px-5 py-2.5"
          onClick={() => choose("accepted")}
        >
          {locale === chineseLocale ? "允许分析" : "Allow analytics"}
        </button>
        <button
          type="button"
          className="btn-outline min-h-11 px-5 py-2.5"
          onClick={() => choose("declined")}
        >
          {locale === chineseLocale ? "拒绝" : "Decline"}
        </button>
      </div>
    </aside>
  );
}
