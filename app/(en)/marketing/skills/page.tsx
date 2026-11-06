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
      eyebrow="Private workspace"
      title="Marketing Skills Library"
      lede="Browse the open-source marketingskills library by category. Each page is the upstream skill, rendered for staff reference inside this signed-in workspace."
    >
      <MarketingSkillsDisclaimer />
      <p className="text-sm leading-relaxed text-cocoa">
        Source:{" "}
        <a
          href={sourceUrl}
          className="font-medium text-bronze underline decoration-gold/50 underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          coreyhaines31/marketingskills
        </a>{" "}
        at commit <code className="text-charcoal">{catalog.commit}</code>.
        Licence:{" "}
        <a
          href={licenseUrl}
          className="font-medium text-bronze underline decoration-gold/50 underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          MIT
        </a>
        . Copyright (c) 2025 Corey Haines. The licence file is vendored with
        the skills. These pages are not in the sitemap.
      </p>
      <MarketingSkillsBrowser
        highlights={catalog.highlights}
        categories={catalog.categories}
        skillCount={catalog.skillCount}
      />
    </MarketingPortalFrame>
  );
}
