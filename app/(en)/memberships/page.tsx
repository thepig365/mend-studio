import Hero from "@/components/Hero";
import MembershipPlans from "@/components/MembershipPlans";
import CTABlock from "@/components/CTABlock";
import { pageMetadata } from "@/lib/seo";
// Temporary stock images — replace with professional Mend Beauty Studio photography.
import { siteImages } from "@/src/data/images";

export const metadata = pageMetadata({
  title: "Membership Recharge Plan",
  description:
    "Discover Mend Beauty Studio membership top-up levels, extra value, gifted member benefits and birthday-month offers.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <Hero
        eyebrow="Membership Recharge Plan"
        title="More Rewards · More Beauty · A Brighter You"
        body="The more you top up, the more rewards you enjoy."
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
        body="Contact the team to choose the membership level that suits you."
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
