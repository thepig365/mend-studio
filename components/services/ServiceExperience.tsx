import Script from "next/script";
import { site } from "@/lib/site";
import { getCategory, type LocalizedText, type ServiceRecord } from "@/lib/service-catalog";
import TrackedLink from "@/components/services/TrackedLink";
import Hero from "@/components/Hero";

type Language = "en" | "zh";
const text = (value: LocalizedText, language: Language) => value[language];

export default function ServiceExperience({
  service,
  language,
}: {
  service: ServiceRecord;
  language: Language;
}) {
  const prefix = language === "zh" ? "/zh" : "";
  const category = getCategory(service.category);
  const bookingEvent = service.bookingMode === "mase" ? "booking_clicked" : "consultation_clicked";
  const bookingHref = service.bookingMode === "mase" ? `${prefix}/book` : `${prefix}/contact#booking-enquiry`;
  const bookingLabel =
    service.bookingMode === "mase"
      ? language === "zh" ? "预约" : "Book"
      : language === "zh" ? "先咨询" : "Consult first";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: text(service.name, language),
    description: text(service.summary, language),
    provider: {
      "@type": "BeautySalon",
      name: site.name,
      url: site.url,
      telephone: site.phoneHref.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressCountry: "AU",
      },
    },
    areaServed: "Melbourne, Victoria",
    url: `${site.url}${prefix}/services/${service.category}/${service.slug}`,
    ...(service.price.amount
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "AUD",
            price: service.price.amount,
            url: `${site.url}${prefix}/services/${service.category}/${service.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <Script
        id={`service-schema-${language}-${service.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero
        eyebrow={category ? text(category.title, language) : "MEND"}
        title={text(service.name, language)}
        body={text(service.summary, language)}
        image="/images/mend-beauty-salon-interior-1.png"
        imageAlt={text(service.imageAlt, language)}
        actions={[
          { label: bookingLabel, href: bookingHref, variant: "gold" },
          { label: language === "zh" ? "返回类别" : "Back to category", href: `${prefix}/services/${service.category}`, variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-beige/70 bg-white/65 p-7 sm:p-9">
              <p className="eyebrow">{language === "zh" ? "适合谁" : "Suitable for"}</p>
              <h2 className="mt-4 font-display text-3xl font-medium">{text(service.fit, language)}</h2>
            </section>
            <section className="rounded-3xl border border-beige/70 bg-white/65 p-7 sm:p-9">
              <h2 className="font-display text-3xl font-medium">{language === "zh" ? "项目包含" : "What is included"}</h2>
              <ul className="mt-5 space-y-3 text-cocoa">
                {service.includes.map((item) => <li key={item.en}>• {text(item, language)}</li>)}
              </ul>
            </section>
            <div className="grid gap-6 sm:grid-cols-2">
              <section className="rounded-3xl bg-sand p-7">
                <h2 className="font-display text-2xl font-medium">{language === "zh" ? "护理前" : "Before your visit"}</h2>
                <p className="mt-4 text-sm leading-relaxed text-cocoa">{text(service.preparation, language)}</p>
              </section>
              <section className="rounded-3xl bg-sand p-7">
                <h2 className="font-display text-2xl font-medium">{language === "zh" ? "护理后" : "After your service"}</h2>
                <p className="mt-4 text-sm leading-relaxed text-cocoa">{text(service.aftercare, language)}</p>
              </section>
            </div>
          </div>
          <aside className="h-fit rounded-3xl bg-charcoal p-7 text-cream sm:p-9 lg:sticky lg:top-40">
            <dl className="space-y-5">
              <div><dt className="text-xs uppercase tracking-[0.18em] text-gold">{language === "zh" ? "时长" : "Duration"}</dt><dd className="mt-2 text-xl">{text(service.duration, language)}</dd></div>
              <div><dt className="text-xs uppercase tracking-[0.18em] text-gold">{language === "zh" ? "价格" : "Price"}</dt><dd className="mt-2 text-xl">{text(service.price.display, language)}</dd></div>
              <div><dt className="text-xs uppercase tracking-[0.18em] text-gold">{language === "zh" ? "预约方式" : "Booking"}</dt><dd className="mt-2 text-sm leading-relaxed text-cream/75">{service.bookingMode === "mase" ? (language === "zh" ? "进入实时预约页面" : "Continue to live booking") : (language === "zh" ? "先由工作室确认适用性与安排" : "The studio confirms suitability and arrangements first")}</dd></div>
            </dl>
            <TrackedLink
              href={bookingHref}
              event={bookingEvent}
              detail={{ service: service.slug, category: service.category }}
              className="btn-light mt-8 w-full"
            >
              {bookingLabel}
            </TrackedLink>
            <p className="mt-5 text-xs leading-relaxed text-cream/60">
              {language === "zh"
                ? "最终服务安排、适用性与价格以专业咨询或预约系统中的确认信息为准。"
                : "Final service scope, suitability and price are confirmed through consultation or the live booking record."}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
