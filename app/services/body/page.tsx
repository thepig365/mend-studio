import CategoryExperience from "@/components/services/CategoryExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Body Relaxation",
  description: "Explore MEND shoulder, neck and whole-body relaxation services in Deepdene.",
  path: "/services/body",
});

export default function BodyPage() {
  return <CategoryExperience categoryId="body" language="en" />;
}
