import type { Metadata } from "next";
import { site } from "@/lib/site";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const englishRootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: "/images/mend-monogram.svg",
    apple: "/images/mend-monogram.svg",
  },
  title: {
    default: "Mend Beauty Studio Deepdene | Hair, Head Spa, Skin & Beauty",
    template: `%s | ${site.name}`,
  },
  description:
    "Mend Beauty Studio in Deepdene offers hair, Head Spa, scalp wellness, Korean skin care, body wellness, nails and beauty services.",
  keywords: [
    "Mend Beauty Studio",
    "Deepdene salon",
    "head spa Melbourne",
    "Korean skin management",
    "hair salon Deepdene",
    "beauty studio Melbourne",
  ],
  openGraph: {
    siteName: site.name,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export const chineseRootMetadata: Metadata = {
  ...englishRootMetadata,
  title: {
    default: "Mend Beauty Studio Deepdene｜美发、头疗、肌肤与身体护理",
    template: `%s | ${site.name}`,
  },
  description:
    "Mend Beauty Studio 位于 Deepdene，提供美发、头疗、头皮护理、韩式肌肤管理、身体疗愈、美甲及美容服务。",
  openGraph: {
    siteName: site.name,
    locale: "zh_CN",
    alternateLocale: ["en_AU"],
    type: "website",
  },
};
