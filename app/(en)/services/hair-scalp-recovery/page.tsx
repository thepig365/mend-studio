import ServicePage from "@/components/ServicePage";
import ScalpCareMenuIntro from "@/components/ScalpCareMenuIntro";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

const category = getAnnaCategory("hair-scalp-recovery");

export const metadata = pageMetadata({
  title: category.title,
  description: category.excerpt,
  path: "/services/hair-scalp-recovery",
});

export default function HairScalpRecoveryPage() {
  return (
    <ServicePage
      category={category}
      subtitle="Hair & Scalp Condition Care"
      menuOverride={getAnnaMenuItemsForCategory("hair-scalp-recovery")}
      beforeMenuContent={<ScalpCareMenuIntro locale="en-AU" />}
    />
  );
}
