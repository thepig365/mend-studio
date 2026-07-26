import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Skin Aesthetics",
  description:
    "Korean facial and skin aesthetics treatments in Deepdene using professional skincare products and devices.",
  path: "/services/skin-facial",
});

export default function SkinFacialPage() {
  const category = getAnnaCategory("skin-facial");
  return (
    <ServicePage
      category={category}
      subtitle="Korean Professional Skincare"
      menuOverride={getAnnaMenuItemsForCategory("skin-facial")}
    />
  );
}
