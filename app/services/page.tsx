import ServicesLanding from "@/components/services/ServicesLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Find the right Mend Beauty Studio hair, head spa, skin, body or signature ritual by starting with your goal, time and preferred experience.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesLanding language="en" />;
}
