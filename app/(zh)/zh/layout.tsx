import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import {
  chineseRootMetadata,
  viewport as sharedViewport,
} from "@/lib/root-metadata";
import "../../globals.css";

export const metadata: Metadata = chineseRootMetadata;
export const viewport = sharedViewport;

export default function ChineseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteDocument lang="zh-Hans">{children}</SiteDocument>;
}
