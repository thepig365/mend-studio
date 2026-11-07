"use client";

import { useState } from "react";
import Link from "next/link";
import { useMarketingLocale } from "@/components/MarketingLocale";
import MarketingGrowthDesk from "@/components/MarketingGrowthDesk";
import LandingPageStudio from "@/components/LandingPageStudio";
import MaseMarketingHomeReference from "@/components/MaseMarketingHomeReference";
import MarketingOperatingGuide from "@/components/MarketingOperatingGuide";

const workspaces = [
  {
    title: "Technical SEO",
    description:
      "Check indexing, sitemap coverage, metadata, structured data, broken links and page performance.",
    actions: [
      {
        label: "Google Search Console",
        href: "https://search.google.com/search-console?resource_id=sc-domain:mendbeauty.com.au",
      },
      {
        label: "PageSpeed Insights",
        href: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fmendbeauty.com.au",
      },
    ],
  },
  {
    title: "Traffic & Conversion",
    description:
      "Review consented website traffic and the actions that lead visitors to booking, calling, email and directions.",
    actions: [{ label: "Google Analytics", href: "https://analytics.google.com/" }],
  },
  {
    title: "Local Search",
    description:
      "Maintain Google Business Profile details, services, photographs, reviews and local-search consistency.",
    actions: [
      {
        label: "Business Profile",
        href: "https://business.google.com/locations",
      },
    ],
  },
  {
    title: "Content & Keywords",
    description:
      "Prepare customer-useful service pages, landing-page briefs, FAQs and local keyword maps before review.",
    actions: [
      { label: "Google Trends", href: "https://trends.google.com/trends/" },
    ],
  },
  {
    title: "Social & Campaigns",
    description:
      "Coordinate approved campaigns across the Mend website and connected Meta channels without duplicating facts.",
    actions: [
      {
        label: "Meta Business Suite",
        href: "https://business.facebook.com/latest/home",
      },
    ],
  },
  {
    title: "Services & Retention",
    description:
      "Use confirmed MaSe service, booking and retention information as source material. Do not copy customer records into AI.",
    actions: [
      { label: "MaSe Partner Portal", href: "https://partners.mase.cloud/" },
    ],
  },
] as const;

type Provider = "ChatGPT" | "Codex" | "Claude";

const providerLinks: Record<Provider, string> = {
  ChatGPT: "https://chatgpt.com/",
  Codex: "https://chatgpt.com/codex",
  Claude: "https://claude.ai/",
};

const workspaceZh: Record<string, string> = {
  "Technical SEO": "技术 SEO",
  "Traffic & Conversion": "流量与转化",
  "Local Search": "本地搜索",
  "Content & Keywords": "内容与关键词",
  "Social & Campaigns": "社交媒体与活动",
  "Services & Retention": "服务与客户维护",
  "Google Search Console": "Google Search Console 搜索表现",
  "PageSpeed Insights": "PageSpeed 页面速度分析",
  "Google Analytics": "Google Analytics 网站分析",
  "Business Profile": "Google 商家资料",
  "Google Trends": "Google 趋势",
  "Meta Business Suite": "Meta 商务管理平台",
  "MaSe Partner Portal": "MaSe 商家后台",
  "Check indexing, sitemap coverage, metadata, structured data, broken links and page performance.": "检查索引、站点地图覆盖、元数据、结构化数据、失效链接和页面性能。",
  "Review consented website traffic and the actions that lead visitors to booking, calling, email and directions.": "查看已同意分析的访问，以及预约、电话、邮件和路线等意向行为。",
  "Maintain Google Business Profile details, services, photographs, reviews and local-search consistency.": "维护 Google 商家资料、服务、照片、评价及本地搜索信息一致性。",
  "Prepare customer-useful service pages, landing-page briefs, FAQs and local keyword maps before review.": "准备有助于客户的服务页面、落地页简报、常见问题和本地关键词映射，再提交审核。",
  "Coordinate approved campaigns across the Mend website and connected Meta channels without duplicating facts.": "协调 MEND 官网与已连接 Meta 渠道中获批的活动，保持事实一致。",
  "Use confirmed MaSe service, booking and retention information as source material. Do not copy customer records into AI.": "使用经核实的 MaSe 服务、预约和客户维护信息作为依据。不要把客户档案复制到 AI。",
  "Reference library": "参考资料库",
  "Marketing Skills Library": "营销技能资料库",
  "Browse third-party marketing skills, including AI SEO, local SEO, schema, directory submissions, copywriting, email and social. Upstream guidance only. It does not change the website, prices, offers or booking.": "浏览第三方 AI SEO、本地 SEO、结构化数据、目录提交、文案、邮件与社交营销指南。仅作参考，不会修改网站、价格、优惠或预约。",
  "Open the library": "打开资料库",
  " (opens in a new tab)": "（在新标签页打开）",
  "AI task desk": "AI 任务台",
  "Prepare a minimal marketing brief": "准备精简营销任务简报",
  "This form creates a prompt in your browser. It does not transmit or save the text. Copy it only when it is ready to share with the selected AI provider.": "此表单仅在当前浏览器生成提示词，不会传送或保存内容。确认可以分享后，再复制到所选 AI 服务。",
  "Title": "标题",
  "AI provider": "AI 服务",
  "Short summary": "简要说明",
  "Status": "状态",
  "Priority": "优先级",
  "Generated task brief": "生成的任务简报",
  "Draft": "草稿",
  "Ready for review": "待审核",
  "Blocked": "受阻",
  "Low": "低",
  "Normal": "普通",
  "High": "高",
  "Example: Deepdene Head Spa landing page": "示例：Deepdene 头疗落地页",
  "Add only the facts needed for this task. Do not paste customer records, passwords or full conversations.": "只填写本任务需要的事实。不要粘贴客户档案、密码或完整聊天记录。",
  "Copied": "已复制",
  "Copy brief": "复制简报",
  "Open ": "打开 ",
  " in a new tab": "（新标签页）",
  "MEND MARKETING TASK — DRAFT ONLY": "MEND 营销任务——仅草稿",
  "[add title]": "[填写标题]",
  "[add minimum required context]": "[填写必要背景]",
  "Use only the confirmed facts above and public information from mendbeauty.com.au.": "仅使用上方已核实的事实与 mendbeauty.com.au 的公开信息。",
  "Do not invent prices, services, reviews, rankings, traffic results, availability or regulatory claims.": "不得编造价格、服务、评价、排名、流量、可预约时间或合规声明。",
  "Return: (1) concise recommendation, (2) proposed draft, (3) risks or missing facts, (4) verification checklist.": "请提供：（1）精简建议；（2）拟定草稿；（3）风险或缺失事实；（4）核验清单。",
  "Do not publish, approve, spend money or change any account or production setting.": "不得发布、批准、花费资金或更改任何账号及正式环境设置。"
};

export default function MarketingPortalWorkspace() {
  const { t } = useMarketingLocale();
  const tr = (text: string) => t(text, workspaceZh[text] ?? text);
  const [provider, setProvider] = useState<Provider>("ChatGPT");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Draft");
  const [priority, setPriority] = useState("Normal");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const prompt = [
        tr("MEND MARKETING TASK — DRAFT ONLY"),
        `${tr("Title")}: ${title.trim() || tr("[add title]")}`,
        `${tr("Short summary")}: ${summary.trim() || tr("[add minimum required context]")}`,
        `${tr("Status")}: ${tr(status)}`,
        `${tr("Priority")}: ${tr(priority)}`,
        "",
        tr("Use only the confirmed facts above and public information from mendbeauty.com.au."),
        tr("Do not invent prices, services, reviews, rankings, traffic results, availability or regulatory claims."),
        tr("Return: (1) concise recommendation, (2) proposed draft, (3) risks or missing facts, (4) verification checklist."),
        tr("Do not publish, approve, spend money or change any account or production setting."),
      ].join("\n");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt); setCopyError(false); setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopyError(true); }
  }

  const providerHref = providerLinks[provider];

  return (
    <>
      <MarketingGrowthDesk />
      <section className="mb-10 rounded-3xl border border-gold/40 bg-white/80 p-6 sm:p-8">
        <p className="eyebrow">{tr("Reference library")}</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{tr("Marketing Skills Library")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">{tr("Browse third-party marketing skills, including AI SEO, local SEO, schema, directory submissions, copywriting, email and social. Upstream guidance only. It does not change the website, prices, offers or booking.")}</p>
        <Link href="/marketing/skills" className="btn-outline mt-6">{tr("Open the library")}</Link>
      </section>
      <MarketingOperatingGuide />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((workspace) => (
          <article
            key={tr(workspace.title)}
            className="rounded-3xl border border-beige bg-white/80 p-6"
          >
            <h2 className="font-display text-2xl font-medium text-charcoal">
              {tr(workspace.title)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa">
              {tr(workspace.description)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {workspace.actions.map((action) => (
                <a
                  key={tr(action.label)}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-beige px-4 py-2 text-xs font-medium text-cocoa transition-colors hover:border-gold hover:text-bronze"
                >
                  {tr(action.label)}
                  <span className="sr-only">{tr(" (opens in a new tab)")}</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <MaseMarketingHomeReference />

      <section className="mt-10 rounded-3xl border border-beige bg-white/80 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="eyebrow">{tr("AI task desk")}</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{tr("Prepare a minimal marketing brief")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">{tr("This form creates a prompt in your browser. It does not transmit or save the text. Copy it only when it is ready to share with the selected AI provider.")}</p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-charcoal">{tr("Title")}<input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder={tr("Example: Deepdene Head Spa landing page")}
            />
          </label>
          <label className="text-sm font-medium text-charcoal">{tr("AI provider")}<select
              value={provider}
              onChange={(event) => setProvider(event.target.value as Provider)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option>ChatGPT</option>
              <option>Codex</option>
              <option>Claude</option>
            </select>
          </label>
          <label className="text-sm font-medium text-charcoal md:col-span-2">{tr("Short summary")}<textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder={tr("Add only the facts needed for this task. Do not paste customer records, passwords or full conversations.")}
            />
          </label>
          <label className="text-sm font-medium text-charcoal">{tr("Status")}<select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option value="Draft">{tr("Draft")}</option>
              <option value="Ready for review">{tr("Ready for review")}</option>
              <option value="Blocked">{tr("Blocked")}</option>
            </select>
          </label>
          <label className="text-sm font-medium text-charcoal">{tr("Priority")}<select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option value="Low">{tr("Low")}</option>
              <option value="Normal">{tr("Normal")}</option>
              <option value="High">{tr("High")}</option>
            </select>
          </label>
        </div>

        <label className="mt-6 block text-sm font-medium text-charcoal">{tr("Generated task brief")}<textarea
            readOnly
            value={prompt}
            rows={10}
            className="mt-2 w-full rounded-xl border border-beige bg-sand/60 px-4 py-3 font-mono text-xs leading-relaxed text-cocoa"
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={copyPrompt} className="btn-primary">
            {copied ? tr("Copied") : tr("Copy brief")}
          </button>
          <a
            href={providerHref}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            {tr("Open ")}{provider}
            <span className="sr-only">{tr(" in a new tab")}</span>
          </a>
        </div>
        {copyError && <p role="status" className="mt-3 text-sm text-cocoa">{t("Clipboard unavailable. Select and copy the brief manually.", "无法使用剪贴板，请手动选择并复制简报。")}</p>}
      </section>

      <LandingPageStudio />
    </>
  );
}
