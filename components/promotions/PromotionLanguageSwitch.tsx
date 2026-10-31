"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, ui, type Locale } from "@/lib/i18n";
import styles from "./Promotions.module.css";

export default function PromotionLanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale = locale === "zh-Hans" ? "en-AU" : "zh-Hans";
  return <Link href={localePath(pathname, otherLocale)} hrefLang={otherLocale} lang={otherLocale} className={styles.languageSwitch} aria-label={ui[locale].switchLanguageLabel}>{ui[locale].switchLanguage}</Link>;
}
