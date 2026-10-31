import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { localePath, ui, type Locale } from "@/lib/i18n";
import { promotionsCopy } from "@/lib/promotions-copy";
import PromotionLanguageSwitch from "./PromotionLanguageSwitch";

export default function PromotionsShell({ children, locale = "en-AU" }: { children: ReactNode; locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const common = ui[locale];
  return (
    <div lang={locale}>
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-6 focus:py-3" href="#promotion-content">{copy.skip}</a>
      <header className="site-header sticky top-0 z-[70] safe-top">
        <div className="wrap flex min-h-28 flex-wrap items-center gap-x-3 sm:min-h-32 sm:gap-x-6">
          <Link className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-gold" href={localePath("/", locale)} aria-label={copy.homeLabel}>
            <Image src="/images/mend-supplied-logo.png" alt="MEND Beauty Studio — Beauty & Mind" width={1254} height={1254} className="h-24 w-24 object-contain sm:h-28 sm:w-28" priority sizes="112px"/>
          </Link>
          <nav className="order-last flex w-full flex-wrap justify-center gap-1 pb-3 sm:order-none sm:w-auto sm:justify-start sm:pb-0" aria-label={copy.navigationLabel}>
            <Link className="nav-link" href={localePath("/promotions", locale)}>{copy.promotions}</Link>
            <Link className="nav-link" href={localePath("/services/hair", locale)}>Hair Atelier</Link>
            <a className="nav-link" href="#visit">{common.visitUs}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href={localePath("/book", locale)} className="btn-book">{common.bookNow}</a>
            <PromotionLanguageSwitch locale={locale}/>
          </div>
        </div>
      </header>
      <main id="promotion-content">{children}</main>
      <footer className="scroll-mt-52 border-t border-beige/70 bg-sand py-12 sm:py-16" id="visit">
        <div className="wrap">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap items-center gap-5">
              <Image src="/images/mend-supplied-logo.png" alt="MEND Beauty Studio — Beauty & Mind" width={1254} height={1254} className="h-32 w-32 object-contain" sizes="128px"/>
              <div className="max-w-sm text-sm leading-relaxed text-cocoa"><p className="font-display text-2xl font-medium text-charcoal">MEND Beauty Studio</p><p className="mt-3">{site.address}</p><a className="mt-3 inline-block rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-gold" href={site.phoneHref}>{site.phone}</a></div>
            </div>
            <div><p className="eyebrow">{copy.follow}</p><div className="mt-4 flex flex-wrap gap-3">
              <a className="btn-outline px-5" href={site.socialProfiles.instagram} target="_blank" rel="noreferrer" aria-label={`MEND Instagram — ${copy.opensTab}`}>Instagram <span className="ml-2" aria-hidden="true">↗</span></a>
              <a className="btn-outline px-5" href={site.socialProfiles.facebook} target="_blank" rel="noreferrer" aria-label={`MEND Facebook — ${copy.opensTab}`}>Facebook <span className="ml-2" aria-hidden="true">↗</span></a>
            </div></div>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-5 border-t border-beige/70 pt-6 text-xs text-cocoa"><span>© {new Date().getFullYear()} MEND Beauty Studio</span><div className="flex flex-wrap gap-5"><Link className="underline underline-offset-4" href={localePath("/promotions", locale)}>{copy.promotions}</Link><Link className="underline underline-offset-4" href={localePath("/policies", locale)}>{common.policies}</Link><Link className="underline underline-offset-4" href={localePath("/contact", locale)}>{common.contact}</Link></div></div>
        </div>
      </footer>
    </div>
  );
}
