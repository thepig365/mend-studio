import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import GalleryPreview from "@/components/GalleryPreview";
import { galleryImages } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Gift Cards",
  description:
    "Give the gift of refreshment — Mend Beauty Studio gift cards for head spa, facials, body care, hair repair and beauty refresh experiences in Balwyn.",
  path: "/gift-cards",
});

const giftIdeas = [
  {
    title: "Head Spa Escape",
    description:
      "A luxury head spa ritual — the gift of true, quiet downtime.",
    suggestion: "from $98",
  },
  {
    title: "Korean Skin Glow",
    description:
      "Korean skin management or a glow-focused facial for fresh, hydrated skin.",
    suggestion: "from $98",
  },
  {
    title: "Body Care & Relaxation",
    description:
      "A body scrub or relaxation-focused treatment in a private room.",
    suggestion: "from $145",
  },
  {
    title: "Hair Repair Ritual",
    description:
      "A restorative hair repair treatment with optional scalp care add-on.",
    suggestion: "from $85",
  },
  {
    title: "Beauty Refresh",
    description:
      "Korean lash lift, brow lamination or a complete eye beauty refresh.",
    suggestion: "from $145",
  },
  {
    title: "Choose Your Amount",
    description:
      "Let them choose — a flexible gift card amount to use across the full menu.",
    suggestion: "Any value",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <Hero
        eyebrow="Gift Cards"
        title="Give the gift of refreshment."
        body="A Mend gift card is perfect for birthdays, Mother’s Day, Christmas, anniversaries or anyone who needs time to relax, reset and feel renewed. Use it across head spa, facials, body care, hair and beauty services."
        image={siteImages.giftCards.src}
        imageAlt={siteImages.giftCards.alt}
        actions={[
          { label: "Buy Gift Card", href: "#contact", variant: "gold" },
          { label: "View Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="Gift Ideas"
          title="Experiences they’ll remember"
          body="Choose a ready-made experience or simply pick an amount — every gift card can be used across our full service menu."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {giftIdeas.map((idea) => (
            <div
              key={idea.title}
              className="flex h-full flex-col rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8"
            >
              <h3 className="font-display text-2xl font-medium text-charcoal">{idea.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa">
                {idea.description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-beige/70 pt-5">
                <span className="text-sm font-medium text-bronze">{idea.suggestion}</span>
                <a
                  href="#contact"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-bronze"
                >
                  Gift This
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="How It Works"
            title="Simple to give, lovely to receive"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose",
                text: "Pick an experience or a gift card amount that suits.",
              },
              {
                step: "02",
                title: "Contact Us",
                text: "Call or message us to arrange your gift card purchase.",
              },
              {
                step: "03",
                title: "Gift & Enjoy",
                text: "They book their visit and enjoy time to relax and reset.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="font-display text-4xl font-medium text-gold">{item.step}</p>
                <h3 className="mt-3 font-display text-xl font-medium text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-taupe">
            Gift cards are subject to our gift card policy, including validity periods.{" "}
            <Link href="/policies" className="underline hover:text-bronze">
              Read our policies
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="The Studio"
          title="A calm, elegant space to enjoy your gift"
        />
        <div className="mt-12">
          <GalleryPreview images={galleryImages} />
        </div>
      </section>

      <CTABlock
        eyebrow="Ready to gift?"
        heading="Buy a Mend gift card today"
        body="Call or message us and we’ll arrange the perfect gift card for someone special."
        actions={[
          { label: "Buy Gift Card", href: "#contact", variant: "light" },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
