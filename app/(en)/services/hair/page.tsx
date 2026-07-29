import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Hair Atelier",
  description:
    "Hair salon and hairdresser services in Deepdene, including scalp analysis, precision cuts, colour, highlights, balayage and texture design.",
  path: "/services/hair",
});

export default function HairServicesPage() {
  const category = getAnnaCategory("hair");
  return (
    <ServicePage
      category={category}
      subtitle="Scalp Assessment · Cutting · Colour · Perm Design"
      menuOverride={getAnnaMenuItemsForCategory("hair")}
    />
  );
}
