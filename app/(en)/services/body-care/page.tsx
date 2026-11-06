import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { localServiceCopy } from "@/lib/local-service-copy";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

const copy = localServiceCopy["body-care"]["en-AU"];

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: "/services/body-care",
});

export default function BodyCarePage() {
  const category = getAnnaCategory("body-care");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      subtitle={copy.subtitle}
      menuOverride={getAnnaMenuItemsForCategory("body-care")}
      beforeMenuContent={<NearbySuburbs locale="en-AU" service="body-care" />}
    />
  );
}
