import type { Metadata } from "next";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";

export const firstHairVisitOffer = {
  path: "/promotions/first-hair-visit",
  title: "50% off your first hair visit",
  scope: "All hair service items for new clients on their first visit.",
  exclusions: "Beauty and body services, and retail products, are not included.",
  services: ["Haircuts", "Colour", "Balayage", "Styling", "Perms", "Hair treatments"],
} as const;

// Add an offer here only when its customer-facing terms are approved.
export const currentPromotions = [firstHairVisitOffer] as const;

export const chineseFirstHairVisitOffer = {
  ...firstHairVisitOffer,
  title: "新客首次到店，美发项目五折",
  scope: "新客首次到店，所有美发服务项目均享五折（50% off）。",
  exclusions: "优惠不适用于美容、身体护理等其他服务及零售产品。",
  services: ["剪发", "染发", "巴黎画染", "造型", "烫发", "发丝护理"],
} as const;

export function promotionMetadata(title: string, description: string, path: string, locale: Locale = "en-AU"): Metadata {
  const url = `${site.url}${localePath(path, locale)}`;
  const englishUrl = `${site.url}${localePath(path, "en-AU")}`;
  const chineseUrl = `${site.url}${localePath(path, "zh-Hans")}`;
  const chinese = locale === "zh-Hans";
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-AU": englishUrl, "zh-Hans": chineseUrl, "x-default": englishUrl } },
    keywords: chinese ? ["MEND Beauty Studio", "Hair Atelier", "Deepdene 美发", "新客美发优惠"] : ["MEND Beauty Studio", "Hair Atelier", "hair salon Deepdene", "first visit hair offer"],
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: chinese ? "zh_CN" : "en_AU",
      alternateLocale: [chinese ? "en_AU" : "zh_CN"],
      type: "website",
      images: [{ url: `${site.url}/images/mend-beauty-hero.png`, width: 1024, height: 576, alt: chinese ? "位于 Deepdene 的 MEND Beauty Studio" : "MEND Beauty Studio in Deepdene" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${site.url}/images/mend-beauty-hero.png`] },
  };
}
