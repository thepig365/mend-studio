import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

const textLink = "rounded-sm font-medium text-bronze underline underline-offset-4 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-gold";

export default function ScalpCareMenuIntro({ locale }: { locale: Locale }) {
  const zh = locale === "zh-Hans";
  return (
    <div id="scalp-care-menu" className="mb-8 max-w-3xl scroll-mt-36">
      <h2 className="font-display text-3xl font-medium text-charcoal">
        {zh ? "头皮与发质护理项目与价格" : "Hair & scalp care services and prices"}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-cocoa">
        {zh
          ? "记下您想预约的项目名称。点击“预约”后将打开 MEND 的 MaSe 预约菜单，请在 MaSe 选择项目，并查看当前价格与可预约时间。"
          : "Note the service name you would like to book. Book opens MEND’s MaSe booking menu, where you can select your service and check the current price and available times."}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-cocoa">
        {zh ? "想预约剪发、染发、造型或烫发？查看" : "For cuts, colour, styling or perms, explore the "}
        <Link className={textLink} href={localePath("/services/hair", locale)}>
          {zh ? "完整美发菜单" : "full hair services menu"}
        </Link>
        {zh ? "。想安排清洁头皮、按摩与放松的头疗体验？查看独立的" : ". For scalp cleansing, massage and relaxation, explore the separate "}
        <Link className={textLink} href={localePath("/services/head-spa", locale)}>
          {zh ? "Head Spa 头疗菜单" : "Head Spa menu"}
        </Link>
        {zh ? "。" : "."}
      </p>
    </div>
  );
}
