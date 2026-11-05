import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { localServiceCopy } from "@/lib/local-service-copy";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

const copy = localServiceCopy["head-spa"]["en-AU"];

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: "/services/head-spa",
});

export default function HeadSpaPage() {
  const category = getAnnaCategory("head-spa");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      subtitle={copy.subtitle}
      menuOverride={getAnnaMenuItemsForCategory("head-spa")}
      beforeMenuContent={<NearbySuburbs locale="en-AU" service="head-spa" />}
    />
  );
}
