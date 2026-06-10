import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Skin & Facial",
  description:
    "Korean skin management, hydration facials, glass skin facials and barrier repair at Mend Beauty Studio, Balwyn — in private treatment rooms.",
};

export default function SkinFacialPage() {
  const category = getCategory("skin-facial");
  return <ServicePage category={category} subtitle="Korean Skin Management" />;
}
