import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Head Spa & Scalp Care",
  description:
    "Luxury head spa rituals, scalp cleansing and scalp health support at Mend Beauty Studio, Balwyn. Two dedicated head spa stations in a calm, premium setting.",
};

export default function HeadSpaPage() {
  const category = getCategory("head-spa");
  return (
    <ServicePage category={category} subtitle="Scalp Wellness & Relaxation Rituals">
      <div className="mt-10 rounded-3xl bg-linen p-7 sm:p-8">
        <h3 className="font-display text-xl font-medium text-charcoal">
          Scalp health support, honestly described
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa">
          Our scalp care services focus on cleansing, circulation-supporting massage and a
          calm environment for the scalp — including support for clients concerned about
          thinning-prone hair. We support scalp health; we do not claim to treat or cure
          hair loss, and individual results vary.
        </p>
      </div>
    </ServicePage>
  );
}
