import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
