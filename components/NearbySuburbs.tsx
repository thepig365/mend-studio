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
  const copy = localServiceCopy[service][locale];
  const nearby = copy.nearby;

  return (
    <>
    {copy.lead ? (
      <p className="mb-8 max-w-3xl text-base leading-relaxed text-cocoa">{copy.lead}</p>
    ) : null}
    <section aria-labelledby="nearby-suburbs-heading" className="mb-10 rounded-3xl bg-sand p-7 sm:p-8">
      <h2 id="nearby-suburbs-heading" className="font-display text-2xl font-medium text-charcoal sm:text-3xl">
        {zh ? "欢迎附近区域的客人" : "Serving nearby suburbs"}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-cocoa">
        {zh
          ? `Mend Beauty Studio 位于 ${site.address}，在 Whitehorse Road 上、紧邻 Balwyn。我们欢迎来自 Balwyn、Kew、Camberwell、Canterbury、Surrey Hills 与 Mont Albert 的客人。${nearby}这些附近区域不是分店。`
          : `Mend Beauty Studio is at ${site.address}, on Whitehorse Road at the Balwyn border. We welcome guests from Balwyn, Kew, Camberwell, Canterbury, Surrey Hills and Mont Albert. ${nearby} These nearby suburbs are not separate salon locations.`}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-cocoa">
        <Link className={textLink} href={`${localePath("/contact", locale)}#getting-here`}>
          {zh ? "从附近区域到店的路线" : "How to get here from nearby suburbs"}
        </Link>
      </p>
    </section>
    </>
  );
}
