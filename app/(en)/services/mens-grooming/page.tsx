import Link from "next/link";
import NearbySuburbs from "@/components/NearbySuburbs";
import ServicePage from "@/components/ServicePage";
import { localServiceCopy } from "@/lib/local-service-copy";
import { mensGroomingSeo } from "@/lib/mens-grooming-seo";
import { getCategory } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const copy = localServiceCopy["mens-grooming"]["en-AU"];

export const metadata = pageMetadata({
  title: mensGroomingSeo["en-AU"].title,
  description: mensGroomingSeo["en-AU"].description,
  path: "/services/mens-grooming",
});

export default function MensGroomingPage() {
  const category = getCategory("mens-grooming");
  return (
    <ServicePage
      category={{ ...category, title: copy.heading }}
      subtitle={copy.subtitle}
      beforeMenuContent={<NearbySuburbs locale="en-AU" service="mens-grooming" />}
    >
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
