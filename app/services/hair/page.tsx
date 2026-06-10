import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Hair Services",
  description:
    "Cuts, colour, balayage, foils, keratin and hair repair treatments at Mend Beauty Studio, Balwyn. Premium hair care across 8 professional stations.",
};

export default function HairServicesPage() {
  const category = getCategory("hair");
  return (
    <ServicePage category={category} subtitle="Cuts · Colour · Treatments">
      <div className="mt-10 rounded-3xl bg-linen p-7 sm:p-8">
        <h3 className="font-display text-xl font-medium text-charcoal">
          Looking for men’s grooming?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa">
          We offer a dedicated men’s menu — cuts, fades, beard trims, grey blending and
          men’s scalp care.
        </p>
        <Link href="/services/mens-grooming" className="btn-outline mt-5 px-6 py-2.5 text-xs">
          View Men’s Grooming
        </Link>
      </div>
    </ServicePage>
  );
}
