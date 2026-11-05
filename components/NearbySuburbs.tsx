import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import { localServiceCopy, type LocalServiceSlug } from "@/lib/local-service-copy";
import { site } from "@/lib/site";

const textLink =
  "rounded-sm font-medium text-bronze underline underline-offset-4 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold";

export default function NearbySuburbs({
  locale,
  service,
}: {
  locale: Locale;
  service: LocalServiceSlug;
}) {
  const zh = locale === "zh-Hans";
  const nearby = localServiceCopy[service][locale].nearby;

  return (
    <section aria-labelledby="nearby-suburbs-heading" className="mb-10 rounded-3xl bg-sand p-7 sm:p-8">
      <h2 id="nearby-suburbs-heading" className="font-display text-2xl font-medium text-charcoal sm:text-3xl">
        {zh ? "服务附近区域" : "Serving nearby suburbs"}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-cocoa">
        {zh
          ? `Mend Beauty Studio 欢迎来自 Deepdene、Balwyn、Kew、Camberwell、Canterbury、Surrey Hills 与 Mont Albert 的客人。门店地址是 ${site.address}。${nearby} 这些附近区域不是分店。`
          : `Mend Beauty Studio welcomes guests from Deepdene, Balwyn, Kew, Camberwell, Canterbury, Surrey Hills and Mont Albert. The studio is at ${site.address}. ${nearby} These nearby suburbs are not separate salon locations.`}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-cocoa">
        <Link className={textLink} href={localePath("/contact", locale)}>
          {zh ? "查看营业时间与联系信息" : "Opening hours and contact details"}
        </Link>
      </p>
    </section>
  );
}
