import NearbySuburbs from "@/components/NearbySuburbs";
import ScalpCareMenuIntro from "@/components/ScalpCareMenuIntro";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { localServiceCopy } from "@/lib/local-service-copy";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

const copy = localServiceCopy["hair-scalp-recovery"]["en-AU"];

export const metadata = pageMetadata({
  title: copy.title,
  description: copy.description,
  path: "/services/hair-scalp-recovery",
});

export default function HairScalpRecoveryPage() {
  const category = getAnnaCategory("hair-scalp-recovery");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      subtitle={copy.subtitle}
      menuOverride={getAnnaMenuItemsForCategory("hair-scalp-recovery")}
      beforeMenuContent={
        <>
          <NearbySuburbs locale="en-AU" service="hair-scalp-recovery" />
          <ScalpCareMenuIntro locale="en-AU" />
        </>
      }
    />
  );
}
