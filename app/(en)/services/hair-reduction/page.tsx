import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Hair Reduction",
  description: "Hair-reduction services in Deepdene with single-session and six-session pricing.",
  path: "/services/hair-reduction",
});

export default function HairReductionPage() {
  const category = getAnnaCategory("hair-reduction");
  return (
    <ServicePage
      category={category}
      subtitle="Single Sessions · Courses of 6"
      menuOverride={getAnnaMenuItemsForCategory("hair-reduction")}
    />
  );
}
