import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { localServiceCopy } from "@/lib/local-service-copy";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

const copy = localServiceCopy["skin-facial"]["en-AU"];

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: "/services/skin-facial",
});

export default function SkinFacialPage() {
  const category = getAnnaCategory("skin-facial");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      subtitle={copy.subtitle}
      menuOverride={getAnnaMenuItemsForCategory("skin-facial")}
      beforeMenuContent={<NearbySuburbs locale="en-AU" service="skin-facial" />}
    />
  );
}
