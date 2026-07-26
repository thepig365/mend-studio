import JourneyPage from "@/components/services/JourneyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Your Journey",
  description: "Use three simple choices to find a suitable MEND hair, head spa, skin, body or signature ritual direction.",
  path: "/journey",
});

export default function Page() {
  return <JourneyPage language="en" />;
}
