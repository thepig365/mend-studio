import ResponsiveImage from "@/components/ResponsiveImage";
import CTABlock from "@/components/CTABlock";
import Hero from "@/components/Hero";
import type { Locale } from "@/lib/i18n";
import { mejinImages, mejinProfile } from "@/lib/mejin-profile";

export default function MejinProfilePage({ locale }: { locale: Locale }) {
  const copy = mejinProfile[locale];
  const isChinese = locale === "zh-Hans";
  const bookHref = isChinese ? "/zh/book" : "/book";
  const hairHref = isChinese ? "/zh/services/hair" : "/services/hair";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Mejin Shick",
      jobTitle: isChinese ? "招牌发型师" : "Signature Hairdresser",
      worksFor: {
        "@type": "BeautySalon",
        name: "Mend Beauty Studio",
        url: "https://mendbeauty.com.au",
      },
      image: `https://mendbeauty.com.au${mejinImages.portrait}`,
      knowsAbout: copy.specialties,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.audience}
        body={copy.introduction}
        image={mejinImages.portrait}
        imageAlt={isChinese ? "MEND 发型师 Mejin Shick 肖像" : "Portrait of MEND hairdresser Mejin Shick"}
        imageAspect="aspect-[4/5]"
        actions={[
          { label: copy.bookLabel, href: bookHref, variant: "gold" },
          { label: copy.hairLabel, href: hairHref, variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">{copy.expertiseEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">
            {copy.expertiseTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.specialties.map((specialty) => (
              <div
                key={specialty}
                className="rounded-2xl border border-beige bg-white px-5 py-6 text-sm font-medium leading-relaxed text-charcoal"
              >
                {specialty}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen py-16 sm:py-20">
        <div className="wrap mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">{copy.approachEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">
              {copy.approachTitle}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-cocoa">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">{copy.journeyEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">
              {copy.journeyTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-cocoa">
              {copy.journeyIntroduction}
            </p>
          </div>
          <ol className="space-y-4">
            {copy.career.map((highlight) => (
              <li
                key={highlight}
                className="rounded-2xl border border-beige bg-sand px-6 py-5 text-sm leading-relaxed text-cocoa"
              >
                {highlight}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="wrap">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow">{copy.galleryEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">
              {copy.galleryTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-cocoa">
              {copy.galleryIntroduction}
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mejinImages.gallery.map((image, index) => (
              <figure key={image} className="rounded-[2rem] bg-white p-3">
                <ResponsiveImage
                  src={image}
                  alt={copy.galleryCaptions[index]}
                  aspect="aspect-[4/5]"
                  rounded="rounded-[1.5rem]"
                />
                <figcaption className="px-3 pb-2 pt-4 text-sm leading-relaxed text-cocoa">
                  {copy.galleryCaptions[index]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow={copy.ctaEyebrow}
        heading={copy.ctaTitle}
        body={copy.ctaBody}
        actions={[
          { label: copy.bookLabel, href: bookHref, variant: "light" },
          { label: copy.hairLabel, href: hairHref, variant: "outline-light" },
        ]}
      />
    </>
  );
}
