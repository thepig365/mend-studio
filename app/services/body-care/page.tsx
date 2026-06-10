import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Body Care",
  description:
    "Body scrub, body treatments, Korean body care and relaxation-focused beauty care in private treatment rooms at Mend Beauty Studio, Balwyn.",
};

export default function BodyCarePage() {
  const category = getCategory("body-care");
  return <ServicePage category={category} subtitle="Private Treatment Rooms" />;
}
