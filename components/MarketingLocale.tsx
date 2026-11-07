"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Locale = "en" | "zh";
const LocaleContext = createContext<{ locale: Locale; t: (en: string, zh: string) => string }>({ locale: "en", t: (en) => en });
const preferenceKey = "mend-marketing-language";

export function useMarketingLocale() { return useContext(LocaleContext); }
export function MarketingText({ en, zh }: { en: string; zh: string }) {
  const { t } = useMarketingLocale();
  return <>{t(en, zh)}</>;
}

export default function MarketingLocale({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try { if (window.localStorage.getItem(preferenceKey) === "zh") setLocale("zh"); } catch { /* Language switching still works when storage is unavailable. */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  function choose(next: Locale) {
    setLocale(next);
    try { window.localStorage.setItem(preferenceKey, next); } catch { /* This session can still use the selected language. */ }
  }
  const t = (en: string, zh: string) => locale === "zh" ? zh : en;
  return (
    <LocaleContext.Provider value={{ locale, t }}>
      <div lang={locale === "zh" ? "zh-Hans" : "en-AU"}>
        <div className="wrap pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-beige bg-white/80 p-4">
            <p className="text-sm text-cocoa">{t("Marketing workspace language", "营销工作台语言")}</p>
            <div role="group" aria-label={t("Choose workspace language", "选择工作台语言")} className="flex gap-2">
              <button type="button" lang="en" aria-pressed={locale === "en"} onClick={() => choose("en")} className={locale === "en" ? "btn-primary" : "btn-outline"}>English</button>
              <button type="button" lang="zh-Hans" aria-pressed={locale === "zh"} onClick={() => choose("zh")} className={locale === "zh" ? "btn-primary" : "btn-outline"}>中文</button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </LocaleContext.Provider>
  );
}
