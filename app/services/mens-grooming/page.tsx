import type { Metadata } from "next";
import Link from "next/link";
import ServicePage from "@/components/ServicePage";
import { getCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Men’s Grooming",
  description:
    "Men’s cuts, skin fades, beard trims, grey blending, scalp detox and men’s head spa at Mend Beauty Studio, Balwyn.",
};

export default function MensGroomingPage() {
  const category = getCategory("mens-grooming");
  return (
    <ServicePage category={category} subtitle="Cuts · Grooming · Scalp Care">
      <div className="mt-10 rounded-3xl bg-linen p-7 sm:p-8">
        <h3 className="font-display text-xl font-medium text-charcoal">
          Try the men’s head spa
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cocoa">
          Our luxury head spa rituals are just as popular with men — deep scalp
          cleansing, massage and genuine downtime.
        </p>
        <Link href="/services/head-spa" className="btn-outline mt-5 px-6 py-2.5 text-xs">
          Explore Head Spa
        </Link>
      </div>
    </ServicePage>
  );
}
