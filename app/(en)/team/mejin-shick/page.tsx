import MejinProfilePage from "@/components/MejinProfilePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mejin Shick — Signature Hairdresser in Deepdene",
  description:
    "Meet Mejin Shick, a MEND Signature Hairdresser with more than 25 years of experience in cutting, colour, straightening and scalp-aware hair care.",
  path: "/team/mejin-shick",
});

export default function MejinShickPage() {
  return <MejinProfilePage locale="en-AU" />;
}
