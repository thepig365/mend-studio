import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nails",
  description:
    "Classic and gel manicures, pedicures and nail art at Mend Beauty Studio, Balwyn — available through our in-house partner. Contact us for availability.",
  path: "/services/nails",
});

export default function NailsPage() {
  const category = getCategory("nails");
  return <ServicePage category={category} subtitle="Through Our In-House Partner" />;
}
