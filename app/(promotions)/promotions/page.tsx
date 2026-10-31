import PromotionsHub from "@/components/promotions/PromotionsHub";
import { promotionMetadata } from "@/lib/promotions";

export const metadata = promotionMetadata("Promotions in Deepdene", "Explore current MEND Beauty Studio promotions, including 50% off all hair service items for new clients on their first visit.", "/promotions");

export default function PromotionsPage() {
  return <PromotionsHub/>;
}
