import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

// These menu destinations correspond to specialties already published in
// Mejin's approved profile. They do not imply a particular booking slot.
const services = [
  { anchor: "menu-ladies-signature-cut", en: "Haircuts", zh: "剪裁设计" },
  { anchor: "menu-signature-colour", en: "Colour", zh: "染发设计" },
  { anchor: "service-permanent-straightening", en: "Straightening", zh: "头发拉直" },
  { anchor: "menu-hydra-hair-ritual", en: "Hair & scalp care", zh: "头皮与发质护理" },
];

export default function MejinServiceLinks({ locale, align = "left" }: { locale: Locale; align?: "left" | "center" }) {
  const zh = locale === "zh-Hans";
  return (
    <nav id="mejin-services" className="mt-6" aria-label={zh ? "查看相关美发项目与价格" : "Explore related hair services and prices"}>
      <p className="text-sm font-medium text-charcoal">{zh ? "查看相关美发项目与价格" : "Explore related hair services and prices"}</p>
      <ul className={`mt-3 flex flex-wrap gap-x-5 gap-y-2 ${align === "center" ? "justify-center" : ""}`}>
        {services.map((service) => (
          <li key={service.anchor}>
            <Link className="inline-flex min-h-11 items-center rounded-sm text-sm text-bronze underline underline-offset-4 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold" href={`${localePath("/services/hair", locale)}#${service.anchor}`}>
              {zh ? service.zh : service.en}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
