import CategoryExperience from "@/components/services/CategoryExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Head Spa & Scalp Care",
  description: "Compare MEND head spa and scalp-care rituals, from a 45-minute reset to an extended relaxation experience.",
  path: "/services/head-spa",
});

export default function HeadSpaPage() {
  return <CategoryExperience categoryId="head-spa" language="en" />;
}
