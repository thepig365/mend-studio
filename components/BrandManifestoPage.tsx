import CTABlock from "@/components/CTABlock";
import type { Locale } from "@/lib/i18n";
import { brandManifesto } from "@/lib/brand-manifesto";
import { localePath } from "@/lib/i18n";

export default function BrandManifestoPage({ locale }: { locale: Locale }) {
  const copy = brandManifesto[locale];

  return (
    <>
      <header className="border-b border-beige/70 bg-linen">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight text-charcoal sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-2xl leading-relaxed text-bronze sm:text-3xl">
            {copy.tagline}
          </p>
        </div>
      </header>

      <main>
        <ManifestoSection paragraphs={copy.introduction} lead />

        <section className="bg-sand py-16 sm:py-24">
          <div className="wrap">
            <div className="mx-auto max-w-3xl space-y-6">
              {copy.belief.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-display text-2xl leading-relaxed text-charcoal sm:text-3xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <ManifestoSection paragraphs={copy.journey} />

        <section className="bg-espresso py-16 text-cream sm:py-24">
          <div className="wrap">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">{locale === "zh-Hans" ? "MEND 生态" : "The MEND Ecosystem"}</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-5xl">
                Beauty · Mind · Art · Nature · Community
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cream/80">
                {copy.ecosystemIntroduction}
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {copy.ecosystem.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-3xl border border-cream/15 bg-cream/5 p-6"
                >
                  <h3 className="font-display text-2xl font-medium text-gold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ManifestoSection paragraphs={copy.conviction} />

        <section className="bg-linen py-16 sm:py-24">
          <div className="wrap text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              {copy.closing.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "font-display text-3xl font-medium text-charcoal sm:text-5xl"
                      : "text-base leading-relaxed text-cocoa sm:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTABlock
        eyebrow={copy.ctaEyebrow}
        heading={copy.ctaHeading}
        body={copy.ctaBody}
        actions={[
          {
            label: copy.servicesLabel,
            href: localePath("/services", locale),
            variant: "light",
          },
          {
            label: copy.contactLabel,
            href: localePath("/contact", locale),
            variant: "outline-light",
          },
        ]}
      />
    </>
  );
}

function ManifestoSection({
  paragraphs,
  lead = false,
}: {
  paragraphs: string[];
  lead?: boolean;
}) {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="mx-auto max-w-3xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              lead && index < 3
                ? "font-display text-2xl leading-relaxed text-charcoal sm:text-3xl"
                : "text-base leading-relaxed text-cocoa sm:text-lg"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
