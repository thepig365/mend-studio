import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { Locale } from "@/lib/i18n";
import { mejinImages } from "@/lib/mejin-profile";
import MejinServiceLinks from "@/components/MejinServiceLinks";

export default function MejinProfileFeature({ locale }: { locale: Locale }) {
  const isChinese = locale === "zh-Hans";

  return (
    <section id="meet-mejin" aria-labelledby="mejin-feature-heading" className="scroll-mt-36 bg-linen py-16 sm:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <ResponsiveImage
          src={mejinImages.portrait}
          alt={isChinese ? "MEND 发型师 Mejin Shick 肖像" : "Portrait of MEND hairdresser Mejin Shick"}
          aspect="aspect-[4/5]"
          rounded="rounded-[2rem]"
          sizes="(max-width: 1024px) 100vw, 34vw"
        />
        <div>
          <p className="eyebrow">
            {isChinese ? "认识我们的资深设计师" : "Meet our Signature Hairdresser"}
          </p>
          <h2 id="mejin-feature-heading" className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">
            Mejin Shick
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-cocoa">
            {isChinese
              ? "拥有超过 25 年专业美发经验，擅长自然效果拉直、创意染发、个性化发色设计及短发剪裁。"
              : "More than 25 years of hairdressing experience, with strengths in cutting, colour, straightening, transformations and scalp-aware hair care."}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-cocoa">
            {isChinese
              ? "Mejin 会先倾听您的需求，再说明可行的设计方向，并提供居家护理建议。"
              : "Mejin listens first, explains the options and shares practical home-care guidance."}
          </p>
          <MejinServiceLinks locale={locale} />
          <Link
            href={isChinese ? "/zh/team/mejin-shick" : "/team/mejin-shick"}
            className="btn-outline mt-8"
          >
            {isChinese ? "了解 Mejin" : "Meet Mejin"}
          </Link>
        </div>
      </div>
    </section>
  );
}
