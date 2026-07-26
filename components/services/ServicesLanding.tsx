import Link from "next/link";
import CTABlock from "@/components/CTABlock";
import Hero from "@/components/Hero";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  featuredServices,
  serviceCategories,
  type LocalizedText,
} from "@/lib/service-catalog";

type Language = "en" | "zh";

const copy = {
  en: {
    eyebrow: "MEND Services",
    title: "Start with what you need — not a long treatment list.",
    body: "Choose the outcome you are looking for. We will help you understand the most suitable next step, with clear time, price and expectations.",
    journey: "Find my direction",
    categories: "Explore by need",
    categoriesBody: "Five clear paths, each built around a customer goal rather than a dense menu.",
    featured: "Phase 1 experiences",
    featuredBody: "A focused selection of services currently presented as MEND’s primary experiences.",
    view: "View experience",
    duration: "Duration",
    price: "Price",
    trust: "Professional guidance, without pressure",
    trustBody:
      "Services are beauty and wellbeing experiences, not medical treatment. Suitability and final pricing are confirmed through professional consultation where needed.",
    unsure: "Not sure where to begin?",
    unsureBody:
      "Use the guided journey or contact the studio. We will recommend a suitable service or consultation — never a diagnosis.",
    contact: "Ask the studio",
  },
  zh: {
    eyebrow: "MEND 服务",
    title: "从您的需要出发，而不是面对一长串项目。",
    body: "先选择希望改善的方向，我们会以清晰的时间、价格与预期，帮助您理解适合的下一步。",
    journey: "寻找我的护理方向",
    categories: "按需要探索",
    categoriesBody: "五条清晰路径，以客户目标组织体验，而不是堆叠项目清单。",
    featured: "Phase 1 核心体验",
    featuredBody: "当前作为 MEND 主要体验重点呈现的精简服务。",
    view: "查看体验",
    duration: "时长",
    price: "价格",
    trust: "专业建议，不施加压力",
    trustBody:
      "所有项目均为美容与身心放松体验，不属于医疗治疗。需要时，专业人员会通过咨询确认适用性与最终价格。",
    unsure: "不确定从哪里开始？",
    unsureBody: "使用护理方向引导或联系工作室。我们会建议适合的服务或咨询，而不是作出诊断。",
    contact: "咨询工作室",
  },
} as const;

function text(value: LocalizedText, language: Language) {
  return value[language];
}

export default function ServicesLanding({ language }: { language: Language }) {
  const c = copy[language];
  const prefix = language === "zh" ? "/zh" : "";

  return (
    <>
      <Hero
        eyebrow={c.eyebrow}
        title={c.title}
        body={c.body}
        image="/images/mend-beauty-hero.png"
        imageAlt={language === "zh" ? "MEND 美容与身心护理空间" : "MEND Beauty Studio interior"}
        actions={[
          { label: c.journey, href: `${prefix}/journey`, variant: "gold" },
          { label: language === "zh" ? "预约" : "Book", href: `${prefix}/book`, variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{c.categories}</p>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-5xl">{c.categories}</h2>
          <p className="mt-5 leading-relaxed text-cocoa">{c.categoriesBody}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {serviceCategories.map((category) => (
            <Link
              key={category.id}
              href={`${prefix}/services/${category.id}`}
              className="group rounded-3xl border border-beige/70 bg-white/65 p-5 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-charcoal/10"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-gold">
                {text(category.eyebrow, language)}
              </p>
              <h3 className="mt-4 font-display text-2xl font-medium">{text(category.title, language)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">{text(category.outcome, language)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.featured}</p>
            <h2 className="mt-4 font-display text-3xl font-medium sm:text-5xl">{c.featured}</h2>
            <p className="mt-5 leading-relaxed text-cocoa">{c.featuredBody}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`${prefix}/services/${service.category}/${service.slug}`}
                className="group overflow-hidden rounded-3xl border border-beige/70 bg-cream transition hover:-translate-y-1 hover:shadow-lg hover:shadow-charcoal/10"
              >
                <ResponsiveImage
                  src="/images/mend-beauty-salon-interior-1.png"
                  alt={text(service.imageAlt, language)}
                  aspect="aspect-[4/3]"
                  rounded="rounded-none"
                />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-medium">{text(service.name, language)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">{text(service.summary, language)}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-beige/70 pt-4 text-sm">
                    <div><dt className="text-xs text-taupe">{c.duration}</dt><dd className="mt-1">{text(service.duration, language)}</dd></div>
                    <div><dt className="text-xs text-taupe">{c.price}</dt><dd className="mt-1">{text(service.price.display, language)}</dd></div>
                  </dl>
                  <span className="mt-5 inline-block text-xs font-medium uppercase tracking-[0.18em] text-gold">{c.view}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-beige/70 bg-white/65 p-8 text-center sm:p-12">
          <p className="eyebrow">{c.trust}</p>
          <h2 className="mt-4 font-display text-3xl font-medium">{c.trust}</h2>
          <p className="mt-5 leading-relaxed text-cocoa">{c.trustBody}</p>
        </div>
      </section>

      <CTABlock
        eyebrow={c.unsure}
        heading={c.unsure}
        body={c.unsureBody}
        actions={[
          { label: c.journey, href: `${prefix}/journey`, variant: "light" },
          { label: c.contact, href: `${prefix}/contact`, variant: "outline-light" },
        ]}
      />
    </>
  );
}
