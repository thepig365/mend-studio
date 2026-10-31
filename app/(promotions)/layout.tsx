import { englishRootMetadata, viewport as sharedViewport } from "@/lib/root-metadata";
import PromotionsDocument from "@/components/promotions/PromotionsDocument";
import "../globals.css";

export const metadata = englishRootMetadata;
export const viewport = sharedViewport;

export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
  return <PromotionsDocument>{children}</PromotionsDocument>;
}
