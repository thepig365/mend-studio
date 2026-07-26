import CategoryExperience from "@/components/services/CategoryExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hair Services",
  description: "Explore MEND signature cuts, colour and Glass Hair Renewal in Deepdene, Melbourne.",
  path: "/services/hair",
});

export default function HairPage() {
  return <CategoryExperience categoryId="hair" language="en" />;
}
