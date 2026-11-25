import ChairRentalLanding from "@/components/ChairRentalLanding";
import { chairRentalCopy, chairRentalPath } from "@/lib/chair-rental-landing";
import { pageMetadata } from "@/lib/seo";

const copy = chairRentalCopy["en-AU"];

export const metadata = pageMetadata({
  title: copy.documentTitle,
  description: copy.metaDescription,
  path: chairRentalPath,
  absoluteTitle: true,
});

export default function ChairRentalPage() {
  return <ChairRentalLanding locale="en-AU" />;
}
