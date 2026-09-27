import Hero from "@/components/Hero";
import MembershipPlans from "@/components/MembershipPlans";
import CTABlock from "@/components/CTABlock";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Membership Recharge Plan",
  description:
    "Review Mend Beauty Studio membership top-up tiers, advertised dollar bonuses, gifted-service values and terms awaiting confirmation.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <Hero
        eyebrow="Membership Recharge Plan"
        title="More rewards, with the details kept clear"
        body="Review the advertised top-up tiers, dollar bonuses and gifted-service values, then contact the studio while final terms are confirmed."
        image={siteImages.memberships.src}
        imageAlt={siteImages.memberships.alt}
        actions={[
          {
            label: "Membership Enquiry",
            href: "/contact#booking-enquiry",
            variant: "gold",
          },
          { label: "View Services", href: "/services", variant: "outline" },
        ]}
      />

      <MembershipPlans />

      <CTABlock
        eyebrow="Membership enquiry"
        heading="Ask the studio about the membership plan"
        body="The team can explain the advertised values while the remaining commercial terms are being confirmed."
        actions={[
          {
            label: "Enquire Now",
            href: "/contact#booking-enquiry",
            variant: "light",
          },
          { label: "Contact Us", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
