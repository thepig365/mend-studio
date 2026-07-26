import CategoryExperience from "@/components/services/CategoryExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Skin Management",
  description: "Explore Korean-inspired MEND skin rituals for hydration, barrier comfort and visible radiance.",
  path: "/services/skin",
});

export default function SkinPage() {
  return <CategoryExperience categoryId="skin" language="en" />;
}
