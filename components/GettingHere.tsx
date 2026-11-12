import { localePath, type Locale } from "@/lib/i18n";
import { parkingFaq } from "@/lib/service-faqs";
import { site } from "@/lib/site";

const copy = {
  "en-AU": {
    title: "Getting here from Balwyn and nearby suburbs",
    intro:
      "MEND is at 74 Whitehorse Road, Deepdene, on the Balwyn border. These nearby suburbs are not separate salon locations. Service available in English and Chinese.",
    areas: [
      {
        name: "Balwyn",
        body: "We are on Whitehorse Road, just west of Balwyn's shopping strip and the Palace Balwyn cinema. Tram 109 runs west from Balwyn Shopping Centre (stop 48) to Deepdene Shopping Centre/Whitehorse Rd (stop 43), five stops.",
      },
      {
        name: "Kew",
        body: "Tram 109 runs from Kew Junction along Cotham Road, which becomes Whitehorse Road at Burke Road. Get off at stop 43, Deepdene Shopping Centre/Whitehorse Rd.",
      },
      {
        name: "Camberwell",
        body: "Head north along Burke Road from Camberwell Junction and turn right onto Whitehorse Road.",
      },
      {
        name: "Surrey Hills & Mont Albert",
        body: "Tram 109 runs west along Whitehorse Road from Mont Albert and Surrey Hills through Balwyn to stop 43.",
      },
    ],
  },
  "zh-Hans": {
    title: "从 Balwyn 及附近区域到店",
    intro: "MEND 位于 74 Whitehorse Road, Deepdene，紧邻 Balwyn。这些附近区域不是分店。提供中文服务。",
    areas: [
      {
        name: "Balwyn",
        body: "门店在 Whitehorse Road 上，位于 Balwyn 商业街与 Palace Balwyn 影院以西。从 Balwyn Shopping Centre（48 号站）乘 109 路电车向西 5 站，到 Deepdene Shopping Centre/Whitehorse Rd（43 号站）。",
      },
      {
        name: "Kew",
        body: "从 Kew Junction 乘 109 路电车沿 Cotham Road 东行，过 Burke Road 后即为 Whitehorse Road，在 43 号站 Deepdene Shopping Centre/Whitehorse Rd 下车。",
      },
      {
        name: "Camberwell",
        body: "从 Camberwell Junction 沿 Burke Road 向北，右转进入 Whitehorse Road。",
      },
      {
        name: "Surrey Hills & Mont Albert",
        body: "109 路电车沿 Whitehorse Road 从 Mont Albert、Surrey Hills 向西经 Balwyn 到 43 号站。",
      },
    ],
  },
} as const;

export default function GettingHere({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const parking = parkingFaq[locale];
  const path = localePath("/contact", locale);
  const parkingJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}${path}#parking`,
    url: `${site.url}${path}`,
    mainEntity: [
      {
        "@type": "Question",
        name: parking.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: parking.answer,
        },
      },
    ],
  };

  return (
    <section id="getting-here" aria-labelledby="getting-here-heading" className="scroll-mt-36 bg-linen py-16 sm:py-20">
      <div className="wrap">
        <h2 id="getting-here-heading" className="max-w-3xl font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">
          {content.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-cocoa">{content.intro}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {content.areas.map((area) => (
            <article key={area.name} className="rounded-3xl border border-beige/70 bg-white/70 p-6 sm:p-8">
              <h3 className="font-display text-2xl font-medium text-charcoal">{area.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">{area.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 max-w-3xl border-t border-beige/80 pt-8">
          <h3 className="font-display text-2xl font-medium text-charcoal">{parking.question}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">{parking.answer}</p>
        </div>
        {/* Canterbury route is omitted until it is verified. */}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(parkingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
