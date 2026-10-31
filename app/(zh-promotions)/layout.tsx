import { chineseRootMetadata, viewport as sharedViewport } from "@/lib/root-metadata";
import PromotionsDocument from "@/components/promotions/PromotionsDocument";
import "../globals.css";

export const metadata = chineseRootMetadata;
export const viewport = sharedViewport;

export default function ChinesePromotionsLayout({ children }: { children: React.ReactNode }) {
  return <PromotionsDocument locale="zh-Hans">{children}</PromotionsDocument>;
}
