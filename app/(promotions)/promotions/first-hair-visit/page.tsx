import FirstHairVisit from "@/components/promotions/FirstHairVisit";
import PromotionBreadcrumb from "@/components/promotions/PromotionBreadcrumb";
import { firstHairVisitOffer as offer, promotionMetadata } from "@/lib/promotions";

export const metadata = promotionMetadata("50% Off Your First Hair Visit in Deepdene", "New to MEND? Enjoy 50% off all hair service items on your first visit at Hair Atelier in Deepdene. Beauty, body services and retail products are not included.", offer.path);

export default function FirstHairVisitPage() {
  return <><PromotionBreadcrumb name="First hair visit" path={offer.path}/><FirstHairVisit/></>;
}
