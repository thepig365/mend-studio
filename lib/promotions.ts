import type { Metadata } from "next";
import { site } from "@/lib/site";

export const firstHairVisitOffer = {
  path: "/promotions/first-hair-visit",
  title: "50% off your first hair visit",
  scope: "All hair service items for new clients on their first visit.",
  exclusions: "Beauty and body services, and retail products, are not included.",
  services: ["Haircuts", "Colour", "Balayage", "Styling", "Perms", "Hair treatments"],
} as const;

// Add an offer here only when its customer-facing terms are approved.
export const currentPromotions = [firstHairVisitOffer] as const;

export function promotionMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: ["MEND Beauty Studio", "Hair Atelier", "hair salon Deepdene", "first visit hair offer"],
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
      images: [{ url: `${site.url}/images/mend-beauty-hero.png`, width: 1024, height: 576, alt: "MEND Beauty Studio in Deepdene" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${site.url}/images/mend-beauty-hero.png`] },
  };
}
