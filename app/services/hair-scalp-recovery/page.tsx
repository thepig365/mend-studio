import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Hair & Scalp Recovery",
  description:
    "Scalp treatments and hair recovery services in Deepdene, including scalp detox, hydration, recovery, collagen and keratin care.",
  path: "/services/hair-scalp-recovery",
});

export default function HairScalpRecoveryPage() {
  const category = getAnnaCategory("hair-scalp-recovery");
  return (
    <ServicePage
      category={category}
      subtitle="Hair & Scalp Condition Care"
      menuOverride={getAnnaMenuItemsForCategory("hair-scalp-recovery")}
    />
  );
}
