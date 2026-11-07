import { MarketingText } from "@/components/MarketingLocale";
export default function MarketingSkillsDisclaimer() {
  return (
    <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-charcoal">
      <MarketingText en="Third-party guidance: Upstream skills are third-party guidance and some contain unsourced statistics that must not be quoted as fact to customers. They are instructions for an AI agent, not MEND policy. Reading a skill does not change the website, prices, offers or booking." zh="第三方指南：上游技能来自第三方，其中部分统计数据没有注明来源，不得作为事实引用给客户。这些内容是面向 AI 助手的指引，并非 MEND 政策。阅读技能不会更改网站、价格、优惠或预约。" />
    </div>
  );
}
