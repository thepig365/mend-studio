"use client";

import { useMarketingLocale } from "@/components/MarketingLocale";
import { maseMarketingHome, maseMarketingHomeCopy } from "@/lib/mase-marketing-home";

export default function MaseMarketingHomeReference() {
  const { locale } = useMarketingLocale();
  const language = locale === "zh" ? "zh" : "en";
  const copy = maseMarketingHomeCopy;

  return (
    <section id="mase-marketing-home" aria-labelledby="mase-marketing-home-heading" className="mt-10 rounded-3xl border border-beige bg-white/80 p-6 sm:p-8">
      <p className="eyebrow">{language === "zh" ? "服务与客户维护" : "Services & Retention"}</p>
      <h2 id="mase-marketing-home-heading" className="mt-3 font-display text-3xl font-medium text-charcoal">{copy.heading[language]}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">{copy.intro[language]}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">{copy.ownership[language]}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">{copy.next[language]}</p>
      <ul className="mt-6 divide-y divide-beige border-y border-beige">
        {maseMarketingHome.map((item) => (
          <li key={item.id} data-capability-id={item.id} data-capability-status={item.status} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
            <p className="font-medium text-charcoal">{item.name[language]}</p>
            <p className="text-sm leading-relaxed text-cocoa">
              <span className="font-medium text-bronze">{copy.status[language]}</span>
              {" "}
              {item.confirm[language]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
