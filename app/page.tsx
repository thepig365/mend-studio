import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTABlock from "@/components/CTABlock";
import GalleryPreview from "@/components/GalleryPreview";
import ContactCard from "@/components/ContactCard";
import ResponsiveImage from "@/components/ResponsiveImage";
import { site, whyMend } from "@/lib/site";
import { featuredServices, signatureExperiences, galleryImages } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Mend Beauty Studio Balwyn | Hair, Head Spa, Skin & Beauty",
  description:
    "Mend Beauty Studio in Balwyn offers premium hair, head spa, scalp wellness, Korean skin care, brows, lashes and beauty refresh services in a calm, modern salon space.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full-width banner over the real studio photo */}
      <HomeHero />

      {/* 2. Brand intro */}
      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="Welcome to Mend"
          title="A complete beauty maintenance studio in Melbourne’s Inner East."
          body="From hair colour and repair treatments to head spa rituals, Korean skin management, body care and eye beauty, Mend Beauty Studio brings your beauty routine into one refined space."
        />
      </section>

      {/* 3. Featured services */}
      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            body="Six considered service areas, one calm and elegant studio."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Signature experiences */}
      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="Signature Experiences"
          title="Rituals worth slowing down for"
          body="Our most loved combinations — designed to leave you feeling rested, refreshed and renewed."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureExperiences.map((experience) => (
            <ServiceCard
              key={experience.title}
              {...experience}
              linkLabel="Discover"
            />
          ))}
        </div>
      </section>

      {/* 5. Why Mend */}
      <section className="bg-espresso py-16 text-cream sm:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Mend"
              title="Designed as a premium studio, from the ground up"
              body="Every detail of the studio — from the layout to the products — is chosen to make beauty maintenance feel calm, considered and complete."
              align="left"
              tone="dark"
            />
            <ul className="mt-8 space-y-4">
              {whyMend.map((point) => (
                <li key={point} className="flex items-start gap-4 text-sm leading-relaxed text-cream/85">
                  <span
                    aria-hidden
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold"
                  >
                    <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5.5l2.5 2.5L8.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <GalleryPreview images={galleryImages} />
        </div>
      </section>

      {/* 6. Gift cards */}
      <section className="wrap py-16 sm:py-24">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-linen p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Gift Cards</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">
              Give the gift of refreshment.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cocoa">
              A Mend gift card is perfect for birthdays, Mother’s Day, Christmas,
              anniversaries or anyone who needs time to relax, reset and feel renewed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="btn-gold">
                Buy Gift Card
              </a>
              <Link href="/gift-cards" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          {/* Temporary stock image — replace with professional Mend Beauty Studio photography. */}
          <ResponsiveImage
            src={siteImages.giftCards.src}
            alt={siteImages.giftCards.alt}
            overlay
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* 7. Memberships coming soon */}
      <section className="wrap pb-16 sm:pb-24">
        <div className="rounded-[2.5rem] border border-beige/70 bg-white/60 px-8 py-14 text-center sm:px-14">
          <p className="eyebrow">Coming Soon</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-medium leading-tight text-charcoal sm:text-4xl">
            Memberships Coming Soon
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cocoa">
            Monthly head spa, skin glow and beauty maintenance plans will be available soon.
          </p>
          <div className="mt-7">
            <Link href="/memberships" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Careers / Rent a space */}
      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Careers & Rent a Space"
            title="Join Mend Beauty Studio"
            body="We are currently welcoming expressions of interest from salon managers, hairdressers, beauty professionals and independent operators looking for a premium space in Balwyn."
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {["Salon Manager", "Hairdresser", "Rent a Chair", "Beauty Room / Treatment Room Rental"].map(
              (opportunity) => (
                <Link
                  key={opportunity}
                  href="/careers"
                  className="flex items-center justify-center rounded-2xl border border-beige bg-white/60 px-4 py-6 text-center text-sm font-medium text-charcoal transition-colors hover:border-gold hover:text-bronze"
                >
                  {opportunity}
                </Link>
              )
            )}
          </div>
          <div className="mt-10 text-center">
            <Link href="/careers" className="btn-primary">
              View Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Contact CTA */}
      <section className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Visit Us"
            title="Find us in Balwyn"
            body="Call, message or visit — we would love to welcome you to the studio."
            align="left"
          />
          <CTABlockInline />
        </div>
        <ContactCard showHours />
      </section>

      <CTABlock
        eyebrow="Mend Beauty Studio — Balwyn"
        heading="Mend your hair. Refresh your skin. Renew your look."
        body="Book your next hair, head spa, skin or beauty visit today."
        actions={[
          { label: "Book Now", href: "#contact", variant: "light" },
          { label: "View Services", href: "/services", variant: "outline-light" },
        ]}
      />
    </>
  );
}

function CTABlockInline() {
  return (
    <div className="mt-8 space-y-3 text-base text-cocoa">
      <p className="font-display text-2xl font-medium text-charcoal">{site.locationName}</p>
      <p>{site.address}</p>
      <p>
        Phone:{" "}
        <a href={site.phoneHref} className="font-medium text-bronze hover:text-gold">
          {site.phone}
        </a>
      </p>
      <p>WeChat: {site.wechat}</p>
    </div>
  );
}
