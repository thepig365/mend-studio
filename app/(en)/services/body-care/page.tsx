import BodyCareLanding, { BodyCareHeroMedia } from "@/components/BodyCareLanding";
import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { withBodyCareLandingDescriptions } from "@/lib/body-care-landing";
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
  const menu = getAnnaMenuItemsForCategory("body-care");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      kicker={copy.kicker}
      subtitle={copy.subtitle}
      menuOverride={menu}
      hidePriceList
      heroMedia={<BodyCareHeroMedia locale="en-AU" />}
      structuredDataItems={withBodyCareLandingDescriptions([...menu.items, ...menu.secondaryItems], "en-AU")}
      beforeMenuContent={
        <>
          <BodyCareLanding locale="en-AU" menuItems={menu.items} />
          <NearbySuburbs locale="en-AU" service="body-care" />
        </>
      }
    />
  );
}
