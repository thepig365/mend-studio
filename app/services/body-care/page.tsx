import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Body Care",
  description:
    "Body scrub, body treatments, Korean body care and relaxation-focused beauty care in private treatment rooms at Mend Beauty Studio, Balwyn.",
  path: "/services/body-care",
});

export default function BodyCarePage() {
  const category = getCategory("body-care");
  return <ServicePage category={category} subtitle="Private Treatment Rooms" />;
}
