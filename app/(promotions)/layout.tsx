import { Cormorant_Garamond, Jost } from "next/font/google";
import { englishRootMetadata, viewport as sharedViewport } from "@/lib/root-metadata";
import { localBusinessJsonLd } from "@/lib/local-business-schema";
import Analytics from "@/components/Analytics";
import PromotionsShell from "@/components/promotions/PromotionsShell";
import "../globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });

export const metadata = englishRootMetadata;
export const viewport = sharedViewport;

export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-AU" className={`${cormorant.variable} ${jost.variable}`}><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}/>
    <PromotionsShell>{children}</PromotionsShell>
    <Analytics/>
  </body></html>;
}
