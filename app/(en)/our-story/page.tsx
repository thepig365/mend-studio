import BrandManifestoPage from "@/components/BrandManifestoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Philosophy",
  description:
    "Discover the MEND philosophy: a Beauty & Mind approach connecting professional care, confidence, calm, art, nature and community.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return <BrandManifestoPage locale="en-AU" />;
}
