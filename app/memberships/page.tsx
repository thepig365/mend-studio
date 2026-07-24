import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CTABlock from "@/components/CTABlock";
import { membershipPlans } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Memberships — Coming Soon",
  description:
    "Monthly head spa, skin glow, hair colour maintenance and beauty refresh membership plans are coming soon to Mend Beauty Studio, Balwyn.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <Hero
        eyebrow="Coming Soon"
        title="Memberships Coming Soon"
        body="Monthly head spa, skin glow and beauty maintenance plans will be available soon. Register your interest and be the first to know when memberships open."
        image={siteImages.memberships.src}
        imageAlt={siteImages.memberships.alt}
        actions={[
          {
            label: "Register Interest",
            href: "/contact#booking-enquiry",
            variant: "gold",
          },
          { label: "View Services", href: "/services", variant: "outline" },
        ]}
      />

      <section className="wrap py-16 sm:py-24">
        <SectionHeading
          eyebrow="Planned Memberships"
          title="Beauty maintenance, made effortless"
          body="Four membership plans are in the works — each designed to make regular self-care simple, consistent and rewarding."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {membershipPlans.map((plan) => (
            <div
              key={plan.title}
              className="relative flex h-full flex-col rounded-3xl border border-beige/70 bg-white/60 p-7 sm:p-9"
            >
              <span className="absolute right-6 top-6 rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-bronze">
                Coming Soon
              </span>
              <h3 className="max-w-[14rem] font-display text-2xl font-medium text-charcoal">
                {plan.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa">
                {plan.description}
              </p>
              <a
                href="/contact#booking-enquiry"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-bronze"
              >
                Register Interest
                <svg aria-hidden className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-taupe">
          Membership details, pricing and inclusions will be announced closer to launch.
        </p>
      </section>

      <CTABlock
        eyebrow="Be the first to know"
        heading="Register your interest in Mend memberships"
        body="Leave your details and we’ll let you know as soon as membership plans open."
        actions={[
          {
            label: "Register Interest",
            href: "/contact#booking-enquiry",
            variant: "light",
          },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
