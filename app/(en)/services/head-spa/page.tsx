import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Scalp & Mind Wellness",
  description:
    "Head Spa in Melbourne and Deepdene, including approved immersive scalp-care and relaxation services at Mend Beauty Studio.",
  path: "/services/head-spa",
});

export default function HeadSpaPage() {
  const category = getAnnaCategory("head-spa");
  return (
    <ServicePage
      category={category}
      subtitle="Immersive Head Spa"
      menuOverride={getAnnaMenuItemsForCategory("head-spa")}
    />
  );
}
