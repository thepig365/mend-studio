"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, ui, type Locale } from "@/lib/i18n";

export default function PromotionLanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale = locale === "zh-Hans" ? "en-AU" : "zh-Hans";
  return <Link href={localePath(pathname, otherLocale)} hrefLang={otherLocale} lang={otherLocale} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-beige px-3 text-xs font-medium text-cocoa transition hover:border-gold focus-visible:outline-2 focus-visible:outline-gold" aria-label={ui[locale].switchLanguageLabel}>{ui[locale].switchLanguage}</Link>;
}
