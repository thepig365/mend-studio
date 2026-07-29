import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import Analytics from "@/components/Analytics";
import { localBusinessJsonLd } from "@/lib/local-business-schema";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

type SiteDocumentProps = Readonly<{
  children: React.ReactNode;
  lang: "en-AU" | "zh-Hans";
}>;

export default function SiteDocument({ children, lang }: SiteDocumentProps) {
  return (
    <html lang={lang} className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
        <Analytics />
      </body>
    </html>
  );
}
