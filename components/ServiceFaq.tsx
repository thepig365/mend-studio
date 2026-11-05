import { localePath, type Locale } from "@/lib/i18n";
import { serviceFaq } from "@/lib/service-faqs";
import { site } from "@/lib/site";

// Visible questions and answers are the same strings written into FAQPage
// JSON-LD. Do not wrap the answer in extra elements or punctuation.
export default function ServiceFaq({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const faq = serviceFaq(slug, locale);
  if (!faq) return null;

  const path = localePath(`/services/${slug}`, locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}${path}#faq`,
    url: `${site.url}${path}`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="service-faq"
      aria-labelledby="service-faq-heading"
      className="bg-linen py-16 sm:py-20"
    >
      <div className="wrap max-w-3xl">
        <h2
          id="service-faq-heading"
          className="font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl"
        >
          {faq.heading}
        </h2>
        <dl className="mt-8 divide-y divide-beige/80 border-y border-beige/80">
          {faq.items.map((item) => (
            <div key={item.question} className="py-6">
              <dt>
                <h3 className="font-display text-2xl font-medium leading-snug text-charcoal">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-cocoa">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
