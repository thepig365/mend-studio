import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import {
  englishRootMetadata,
  viewport as sharedViewport,
} from "@/lib/root-metadata";
import "../globals.css";

export const metadata: Metadata = englishRootMetadata;
export const viewport = sharedViewport;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteDocument lang="en-AU">{children}</SiteDocument>;
}
