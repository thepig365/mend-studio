import PromotionsHub from "@/components/promotions/PromotionsHub";
import { promotionMetadata } from "@/lib/promotions";

export const metadata = promotionMetadata("Deepdene 优惠活动", "查看 MEND Beauty Studio 当前优惠：新客首次到店，所有美发服务项目均享五折（50% off）。", "/promotions", "zh-Hans");

export default function ChinesePromotionsPage() {
  return <PromotionsHub locale="zh-Hans"/>;
}
