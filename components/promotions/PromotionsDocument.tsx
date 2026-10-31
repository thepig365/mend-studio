import { Cormorant_Garamond, Jost } from "next/font/google";
import { localBusinessJsonLd } from "@/lib/local-business-schema";
import type { Locale } from "@/lib/i18n";
import Analytics from "@/components/Analytics";
import PromotionsShell from "./PromotionsShell";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });

export default function PromotionsDocument({ children, locale = "en-AU" }: { children: React.ReactNode; locale?: Locale }) {
  return <html lang={locale} className={`${cormorant.variable} ${jost.variable}`}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}/>
    <PromotionsShell locale={locale}>{children}</PromotionsShell>
    <Analytics/>
  </body></html>;
}
