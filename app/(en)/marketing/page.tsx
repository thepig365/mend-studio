import { MarketingText } from "@/components/MarketingLocale";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  auth,
  isMarketingAuthConfigured,
  marketingPortalEmail,
} from "@/auth";
import MarketingPortalWorkspace from "@/components/MarketingPortalWorkspace";
import { signOutOfMarketingPortal } from "./actions";

export const metadata: Metadata = {
  title: "Marketing Portal",
  description: "Private SEO and marketing workspace for Mend Beauty Studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function MarketingPortalPage() {
  if (!isMarketingAuthConfigured()) {
    redirect("/marketing/login");
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (email !== marketingPortalEmail) {
    redirect("/marketing/login");
  }

  return (
    <section className="bg-sand/45 py-12 sm:py-16">
      <div className="wrap">
        <div className="flex flex-col gap-5 border-b border-beige pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow"><MarketingText en="Private workspace" zh="私有工作台" /></p>
            <h1 className="mt-3 font-display text-4xl font-medium text-charcoal sm:text-5xl">
              <MarketingText en="Marketing Portal" zh="营销门户" />
            </h1>
            <p className="mt-3 max-w-3xl leading-relaxed text-cocoa">
              <MarketingText en="Plan and review Mend SEO, content, campaigns and reporting from one controlled workspace." zh="在统一、受控的工作台中规划和审核 MEND 的 SEO、内容、营销活动与报告。" />
            </p>
          </div>
          <form action={signOutOfMarketingPortal}>
            <button type="submit" className="btn-outline">
              <MarketingText en="Sign out" zh="退出登录" />
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-2xl border border-gold/40 bg-white/70 p-5 text-sm leading-relaxed text-cocoa">
          <strong className="text-charcoal"><MarketingText en="Draft-only control:" zh="仅准备草稿：" /></strong>{" "}<MarketingText en="AI can prepare recommendations and copy, but cannot approve, publish, run advertising, change production settings or spend money." zh="AI 可以准备建议和文案，但不能自行批准、发布、投放广告、更改正式环境设置或花费资金。" />
        </div>

        <MarketingPortalWorkspace />
      </div>
    </section>
  );
}
