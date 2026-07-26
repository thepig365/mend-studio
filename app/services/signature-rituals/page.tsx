import CategoryExperience from "@/components/services/CategoryExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MEND Signature Rituals",
  description: "Discover longer MEND Beauty & Mind rituals that combine scalp, skin and body relaxation care.",
  path: "/services/signature-rituals",
});

export default function SignatureRitualsPage() {
  return <CategoryExperience categoryId="signature-rituals" language="en" />;
}
