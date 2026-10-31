import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { localePath, ui, type Locale } from "@/lib/i18n";
import { promotionsCopy } from "@/lib/promotions-copy";
import PromotionLanguageSwitch from "./PromotionLanguageSwitch";
import styles from "./Promotions.module.css";

export default function PromotionsShell({ children, locale = "en-AU" }: { children: ReactNode; locale?: Locale }) {
  const copy = promotionsCopy[locale];
  const common = ui[locale];
  return (
    <div className={styles.page} lang={locale}>
      <a className={styles.skip} href="#promotion-content">{copy.skip}</a>
      <header className={styles.header}>
        <Link className={styles.wordmark} href={localePath("/", locale)} aria-label={copy.homeLabel}>
          <Image src="/images/mend-supplied-logo.png" alt="MEND Beauty Studio — Beauty & Mind" width={1254} height={1254} className={styles.brandLogo} priority sizes="110px"/>
        </Link>
        <nav className={styles.navigation} aria-label={copy.navigationLabel}>
          <Link href={localePath("/promotions", locale)}>{copy.promotions}</Link>
          <Link href={localePath("/promotions/first-hair-visit", locale)}>{copy.firstHairVisit}</Link>
          <a href="#visit">{locale === "zh-Hans" ? common.visitUs : "Visit us"}</a>
          <PromotionLanguageSwitch locale={locale}/>
        </nav>
        <a href={localePath("/book", locale)} className={styles.button}>{common.bookNow} <span aria-hidden="true">↗</span></a>
      </header>
      <main id="promotion-content">{children}</main>
      <footer className={styles.footer} id="visit">
        <div className={styles.footerMain}>
          <div className={styles.footerIdentity}><Image src="/images/mend-supplied-logo.png" alt="MEND Beauty Studio — Beauty & Mind" width={1254} height={1254} className={styles.footerLogo} sizes="150px"/><div><p className={styles.footerName}>MEND Beauty Studio</p><p>{site.address}</p><a className={styles.contactLink} href={site.phoneHref}>{site.phone}</a></div></div>
          <div><p className={styles.eyebrow}>{copy.follow}</p><div className={styles.socials}>
            <a href={site.socialProfiles.instagram} target="_blank" rel="noreferrer" aria-label={`MEND Instagram — ${copy.opensTab}`}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg>Instagram <span aria-hidden="true">↗</span></a>
            <a href={site.socialProfiles.facebook} target="_blank" rel="noreferrer" aria-label={`MEND Facebook — ${copy.opensTab}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .5-1.5 1.5-1.5H18V2h-3.5C11 2 9 4 9 7v2H6v4h3v8"/></svg>Facebook <span aria-hidden="true">↗</span></a>
          </div></div>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} MEND Beauty Studio</span><div><Link href={localePath("/promotions", locale)}>{copy.promotions}</Link><Link href={localePath("/policies", locale)}>{common.policies}</Link><Link href={localePath("/contact", locale)}>{common.contact}</Link></div></div>
      </footer>
    </div>
  );
}
