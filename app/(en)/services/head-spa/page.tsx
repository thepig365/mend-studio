import HeadSpaLanding, { HeadSpaHeroVideo } from "@/components/HeadSpaLanding";
import HeadSpaScalpChoice from "@/components/HeadSpaScalpChoice";
import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { getAnnaCategory } from "@/lib/anna-services";
import { withHeadSpaLandingDescriptions } from "@/lib/head-spa-landing";
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
  const menu = getAnnaMenuItemsForCategory("head-spa");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      kicker={copy.kicker}
      subtitle={copy.subtitle}
      menuOverride={menu}
      hidePriceList
      heroMedia={<HeadSpaHeroVideo locale="en-AU" />}
      structuredDataItems={withHeadSpaLandingDescriptions([...menu.items, ...menu.secondaryItems], "en-AU")}
      beforeMenuContent={
        <>
          <HeadSpaLanding locale="en-AU" menuItems={menu.items} />
          <NearbySuburbs locale="en-AU" service="head-spa" />
        </>
      }
      afterMenuContent={<HeadSpaScalpChoice locale="en-AU" />}
    />
  );
}
