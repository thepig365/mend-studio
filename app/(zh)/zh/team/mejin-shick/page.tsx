import MejinProfilePage from "@/components/MejinProfilePage";
import { chinesePageMetadata } from "@/lib/seo";

export const metadata = chinesePageMetadata({
  title: "Mejin Shick｜MEND 招牌发型师",
  description:
    "认识 MEND 招牌发型师 Mejin Shick。她拥有超过二十五年的美发经验，擅长剪发、染发、拉直、发型改造及注重头皮健康的头发护理。",
  path: "/team/mejin-shick",
});

export default function MejinShickChinesePage() {
  return <MejinProfilePage locale="zh-Hans" />;
}
