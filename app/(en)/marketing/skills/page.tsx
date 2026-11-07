import { MarketingText } from "@/components/MarketingLocale";
import type { Metadata } from "next";
import MarketingPortalFrame from "@/components/MarketingPortalFrame";
import MarketingSkillsBrowser from "@/components/MarketingSkillsBrowser";
import MarketingSkillsDisclaimer from "@/components/MarketingSkillsDisclaimer";
import { getMarketingSkillsCatalog } from "@/lib/marketing-skills";
import { requireMarketingPortal } from "@/lib/require-marketing-portal";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Marketing Skills Library",
  description:
    "Private staff reference for third-party marketing skills. Not for publication.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function MarketingSkillsPage() {
  await requireMarketingPortal();
  const catalog = getMarketingSkillsCatalog();
  const sourceUrl = `${catalog.repository}/tree/${catalog.commit}`;
  const licenseUrl = `${catalog.repository}/blob/${catalog.commit}/LICENSE`;

  return (
    <MarketingPortalFrame
      eyebrow={<MarketingText en="Private workspace" zh="私密工作空间" />}
      title={<MarketingText en="Marketing Skills Library" zh="营销技能资料库" />}
      lede={<MarketingText en="Browse the open-source marketingskills library by category. Each page is the upstream skill, rendered for staff reference inside this signed-in workspace." zh="按类别浏览开源 marketingskills 资料库。每页保留上游技能的英文原文，供已登录的员工参考。" />}
    >
      <MarketingSkillsDisclaimer />
      <p className="text-sm leading-relaxed text-cocoa">
        <MarketingText en="Source:" zh="来源：" />{" "}
        <a
          href={sourceUrl}
          className="font-medium text-bronze underline decoration-gold/50 underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          coreyhaines31/marketingskills
        </a>{" "}
        <MarketingText en="at commit" zh="提交版本" /> <code className="text-charcoal">{catalog.commit}</code>.
        <MarketingText en="Licence:" zh="许可证：" />{" "}
        <a
          href={licenseUrl}
          className="font-medium text-bronze underline decoration-gold/50 underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          MIT
        </a>
        <MarketingText en=". Copyright (c) 2025 Corey Haines. The licence file is vendored with the skills. These pages are not in the sitemap." zh="。版权所有 (c) 2025 Corey Haines。许可证文件随技能一并保留。这些页面不包含在站点地图中。" />
      </p>
      <MarketingSkillsBrowser
        highlights={catalog.highlights}
        categories={catalog.categories}
        skillCount={catalog.skillCount}
      />
    </MarketingPortalFrame>
  );
}
