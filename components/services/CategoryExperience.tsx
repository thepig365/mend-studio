import Link from "next/link";
import Hero from "@/components/Hero";
import {
  getCategory,
  getServicesForCategory,
  type LocalizedText,
} from "@/lib/service-catalog";

type Language = "en" | "zh";

const text = (value: LocalizedText, language: Language) => value[language];

export default function CategoryExperience({
  categoryId,
  language,
}: {
  categoryId: string;
  language: Language;
}) {
  const category = getCategory(categoryId);
  if (!category) return null;
  const items = getServicesForCategory(categoryId);
  const prefix = language === "zh" ? "/zh" : "";

  return (
    <>
      <Hero
        eyebrow={text(category.eyebrow, language)}
        title={text(category.title, language)}
        body={text(category.summary, language)}
        image="/images/mend-beauty-salon-interior-1.png"
        imageAlt={text(category.imageAlt, language)}
        actions={[
          { label: language === "zh" ? "寻找护理方向" : "Find my direction", href: `${prefix}/journey`, variant: "gold" },
          { label: language === "zh" ? "全部服务" : "All services", href: `${prefix}/services`, variant: "outline" },
        ]}
      />
      <section className="wrap py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{language === "zh" ? "适合谁" : "Who it is for"}</p>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-5xl">
            {text(category.outcome, language)}
          </h2>
          <p className="mt-5 leading-relaxed text-cocoa">
            {language === "zh"
              ? "先比较目标、时长与价格，再查看完整项目说明。需要个性化判断时，我们会建议先咨询。"
              : "Compare outcomes, time and price first, then open the full service detail. Where personal assessment matters, we recommend a consultation."}
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {items.map((service) => (
            <article key={service.slug} className="rounded-3xl border border-beige/70 bg-white/65 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    Phase {service.launchPhase}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-medium">{text(service.name, language)}</h3>
                </div>
                <p className="rounded-full bg-sand px-4 py-2 text-sm font-medium">{text(service.price.display, language)}</p>
              </div>
              <p className="mt-4 leading-relaxed text-cocoa">{text(service.summary, language)}</p>
              <p className="mt-5 text-sm"><span className="text-taupe">{language === "zh" ? "时长：" : "Duration: "}</span>{text(service.duration, language)}</p>
              <Link href={`${prefix}/services/${service.category}/${service.slug}`} className="btn-outline mt-6">
                {language === "zh" ? "查看项目" : "View service"}
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-sand p-7 text-sm leading-relaxed text-cocoa sm:p-9">
          {language === "zh"
            ? "所有项目均为美容、护理与放松服务，不构成医疗诊断或治疗。最终适用性、服务范围与价格可能在专业咨询后确认。"
            : "All services are beauty, care and relaxation experiences. They do not provide medical diagnosis or treatment. Final suitability, scope and price may be confirmed after professional consultation."}
        </div>
      </section>
    </>
  );
}
