import FirstHairVisit from "@/components/promotions/FirstHairVisit";
import PromotionBreadcrumb from "@/components/promotions/PromotionBreadcrumb";
import { firstHairVisitOffer as offer, promotionMetadata } from "@/lib/promotions";

export const metadata = promotionMetadata("Deepdene 新客首次美发五折优惠", "新客首次到访 Deepdene 的 MEND Hair Atelier，所有美发服务项目均享五折（50% off）。优惠不适用于美容、身体护理等其他服务及零售产品。", offer.path, "zh-Hans");

export default function ChineseFirstHairVisitPage() {
  return <><PromotionBreadcrumb name="新客美发" path={offer.path} locale="zh-Hans"/><FirstHairVisit locale="zh-Hans"/></>;
}
