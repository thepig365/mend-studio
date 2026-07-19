import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CareerCard from "@/components/CareerCard";
import CTABlock from "@/components/CTABlock";
import { careerOpportunities } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Careers & Rent a Space",
  description:
    "Salon manager and hairdresser roles, rent-a-chair and beauty room rental opportunities at Mend Beauty Studio, a premium hair and beauty studio in Balwyn.",
  path: "/careers",
});

const managerBenefits = [
  "Competitive salary package",
  "Performance-based incentives",
  "Team target bonus",
  "Annual reward or profit-sharing opportunity for outstanding performance",
  "Long-term incentive opportunities may be discussed for the right candidate",
];

export default function CareersPage() {
  return (
    <>
      <Hero
        eyebrow="Careers & Rent a Space"
        title="Join Mend Beauty Studio"
        body="We are currently welcoming expressions of interest from salon managers, hairdressers, beauty professionals and independent operators looking for a premium space in Balwyn."
        image={siteImages.careers.src}
        imageAlt={siteImages.careers.alt}
        actions={[
          { label: "Express Interest", href: "#contact", variant: "gold" },
          { label: "Contact Us", href: "/contact", variant: "outline" },
        ]}
      />

      {/* Opportunities */}
      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="Current Opportunities"
          title="Four ways to join us"
          body="Whether you’re looking for a leadership role, a creative home for your craft or a premium space for your own business, we’d love to hear from you."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {careerOpportunities.map((opportunity) => (
            <CareerCard key={opportunity.title} {...opportunity} />
          ))}
        </div>
      </section>

      {/* Salon Manager spotlight */}
      <section className="bg-sand py-16 sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Featured Role"
              title="Salon Manager Wanted"
              body="We are looking for an experienced, reliable and business-minded Salon Manager to help lead and grow our premium hair and beauty studio in Balwyn."
              align="left"
            />
            <ul className="mt-8 space-y-3">
              {managerBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-cocoa">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {benefit}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary mt-8">
              Apply / Express Interest
            </a>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8">
              <h3 className="font-display text-xl font-medium text-charcoal">
                Training & professional support
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Training support may be provided in head spa, scalp care, Korean skin
                management, semi-permanent makeup, eyebrow perm and eyelash extensions,
                depending on role and experience.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                The salon is supported by a Korean beauty professional with certification
                in semi-permanent makeup, eyebrow perm and eyelash extensions, providing
                practical guidance and professional service training for suitable
                candidates.
              </p>
            </div>
            <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8">
              <h3 className="font-display text-xl font-medium text-charcoal">
                Team benefits
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                Staff and eligible family members may receive complimentary or discounted
                beauty, body and nail services, subject to salon policy and availability.
              </p>
            </div>
            <div className="rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-8">
              <h3 className="font-display text-xl font-medium text-charcoal">
                The studio
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                8 professional hair stations, 2 dedicated head spa stations and 3 private
                treatment rooms in a premium, calm studio environment in Balwyn —
                designed to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow="Let’s talk"
        heading="Express your interest today"
        body="Call 0499 66 88 99, message us on WeChat (+61499666688) or use the contact form — and tell us a little about yourself."
        actions={[
          { label: "Express Interest", href: "#contact", variant: "light" },
          { label: "Contact Page", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
