import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Nails & Semi-Permanent Beauty",
  description:
    "Existing nail and semi-permanent beauty services at Mend Beauty Studio in Deepdene, with consultation required for semi-permanent treatments.",
  path: "/services/nails-semi-permanent",
});

export default function NailsSemiPermanentPage() {
  const category = getAnnaCategory("nails-semi-permanent");
  return (
    <ServicePage
      category={category}
      subtitle="Nails · Semi-Permanent Beauty"
      menuOverride={getAnnaMenuItemsForCategory("nails-semi-permanent")}
    />
  );
}
