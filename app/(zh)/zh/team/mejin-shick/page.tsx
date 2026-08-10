import MejinProfilePage from "@/components/MejinProfilePage";
import { chinesePageMetadata } from "@/lib/seo";

export const metadata = chinesePageMetadata({
  title: "Mejin Shick｜资深设计师",
  description:
    "Mejin Shick 拥有超过 25 年专业美发经验，擅长自然效果拉直、创意染发、个性化发色设计及短发剪裁。",
  path: "/team/mejin-shick",
});

export default function MejinShickChinesePage() {
  return <MejinProfilePage locale="zh-Hans" />;
}
