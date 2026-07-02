import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import Analytics from "@/components/Analytics";
import { site } from "@/lib/site";
import "./globals.css";

// LocalBusiness structured data. Sourced entirely from lib/site.ts — do not
// hardcode address/phone/name values here. Opening hours are deliberately
// omitted until the hours are finalised (see site.hoursNote).
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: site.name,
  alternateName: site.locationName,
  description: site.tagline,
  url: site.url,
  image: `${site.url}/images/mend-beauty-logo.png`,
  telephone: site.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    ...site.structuredAddress,
  },
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: "/images/mend-monogram.svg",
    apple: "/images/mend-monogram.svg",
  },
  title: {
    default: "Mend Beauty Studio Balwyn | Hair, Head Spa, Skin & Beauty",
    template: `%s | ${site.name}`,
  },
  description:
    "Mend Beauty Studio in Balwyn offers premium hair, head spa, scalp wellness, Korean skin care, brows, lashes and beauty refresh services in a calm, modern salon space.",
  keywords: [
    "Mend Beauty Studio",
    "Balwyn salon",
    "head spa Melbourne",
    "Korean skin management",
    "hair salon Balwyn",
    "beauty studio Melbourne",
  ],
  // Site-wide OpenGraph/Twitter fallback. Individual pages override this via
  // lib/seo.ts's pageMetadata() helper.
  openGraph: {
    siteName: site.name,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Escape "<" so no value can break out of the script tag (e.g. a
          // "</script>" substring in any field).
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
