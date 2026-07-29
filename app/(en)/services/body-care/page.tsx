import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: "Body Wellness",
  description:
    "Body wellness treatments in Deepdene, including relaxation massage, aromatherapy, hot-stone care and body rituals.",
  path: "/services/body-care",
});

export default function BodyCarePage() {
  const category = getAnnaCategory("body-care");
  return (
    <ServicePage
      category={category}
      subtitle="Body Wellness & Relaxation"
      menuOverride={getAnnaMenuItemsForCategory("body-care")}
    />
  );
}
