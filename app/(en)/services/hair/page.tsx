import HairVisitGuide, { HairMenuIntro } from "@/components/HairVisitGuide";
import { hairPageCopy } from "@/lib/hair-page-copy";
import ServicePage from "@/components/ServicePage";
import MejinProfileFeature from "@/components/MejinProfileFeature";
import { getAnnaCategory } from "@/lib/anna-services";
import { pageMetadata } from "@/lib/seo";
import { getAnnaMenuItemsForCategory } from "@/src/data/serviceMenu";

export const metadata = pageMetadata({
  title: hairPageCopy["en-AU"].title,
  description: hairPageCopy["en-AU"].description,
  path: "/services/hair",
});

export default function HairServicesPage() {
  const category = getAnnaCategory("hair");
  return (
    <ServicePage
      category={{ ...category, title: hairPageCopy["en-AU"].heading, intro: hairPageCopy["en-AU"].intro }}
      subtitle="Scalp Assessment · Cutting · Colour · Perm Design"
      menuOverride={getAnnaMenuItemsForCategory("hair")}
      beforeMenuContent={<HairMenuIntro locale="en-AU" />}
      afterMenuContent={<><MejinProfileFeature locale="en-AU" /><HairVisitGuide locale="en-AU" /></>}
    />
  );
}
