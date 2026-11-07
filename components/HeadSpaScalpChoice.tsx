import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

const textLink =
  "mt-4 inline-flex min-h-11 items-center rounded-sm text-bronze underline underline-offset-4 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold";

// Choice only. Facts already published on the head-spa and scalp-care menus.
export default function HeadSpaScalpChoice({ locale }: { locale: Locale }) {
  const zh = locale === "zh-Hans";
  return (
    <section
      id="head-spa-or-scalp-care"
      aria-labelledby="head-spa-or-scalp-care-heading"
      className="wrap max-w-3xl pb-2"
    >
      <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8">
        <h2
          id="head-spa-or-scalp-care-heading"
          className="font-display text-2xl font-medium text-charcoal"
        >
          {zh ? "头疗还是头皮护理？" : "Head spa or scalp care?"}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-cocoa">
          {zh
            ? "头疗侧重清洁头皮、按摩与放松。如需发质养护或头皮检测，请查看头皮护理项目。两者均为美容护理，并非医疗诊断或治疗。"
            : "Head spa is our menu for scalp cleansing, massage and relaxation. If you're looking for hair conditioning or a scalp assessment, see our scalp care menu. Both are cosmetic care, not medical diagnosis or treatment."}
        </p>
        <Link className={textLink} href={localePath("/services/hair-scalp-recovery", locale)}>
          {zh ? "查看头皮与发质护理项目" : "Explore scalp care"}
        </Link>
      </div>
    </section>
  );
}
