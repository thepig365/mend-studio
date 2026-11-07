"use client";

import { useEffect, useState } from "react";
import { useMarketingLocale } from "@/components/MarketingLocale";
import { buildCampaignUrl, buildGrowthBrief, getGrowthWorkflows, integrationDecisions, integrationDecisionsZh } from "@/lib/marketing-growth";

const fieldClass = "mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 text-sm font-normal text-charcoal";

const growthUiZh: Record<string, string> = {
  "Operator workspace": "运营工作台",
  "Growth Desk": "增长工作台",
  "Prepare reviews, Instagram campaigns and SEO / AEO work here without opening MaSe. External links are platform handoffs, not connected feeds. No live ratings, account connections or performance totals are claimed.": "无需进入 MaSe，即可在此准备评价、Instagram 活动及 SEO／AEO 工作。外部链接只是跳转入口，不是已连接的数据源；本页不声称有实时评分、账号连接或业绩统计。",
  "Choose a growth workstream": "选择增长工作方向",
  "Existing printed review stand: retained. QR work is paused pending the owner-provided photo or file. The text link here does not replace the stand; no new QR is generated or published.": "保留现有印刷评价立牌。二维码工作暂停，等待店主提供照片或文件。本页文字链接不替代立牌，也不会生成或发布新二维码。",
  "Evidence to collect:": "需要收集的证据：",
  "(opens in a new tab)": "（在新标签页打开）",
  "Confirmed public facts for this task": "本任务已核实的公开事实",
  "Service page, approved offer, audience and approved image availability. No customer details.": "服务页面、获批优惠、受众及可用的获准图片。不要包含客户信息。",
  "Evidence, observation date and comparison filters": "证据、观察日期及对比筛选条件",
  "Public source URL, date, platform, query and period. If not checked, say not verified. Do not paste customer reviews with names or private account links.": "公开来源网址、日期、平台、查询与周期。未经检查请注明未核实。不要粘贴带姓名的客户评价或私人账号链接。",
  "Fields stay in this browser session only, across workstream switches. Copy your brief before leaving; this is not a shared or saved task record. The existing operating guide below provides separate task export/import; it does not save these Growth Desk fields.": "这些字段只保留在当前浏览器会话中，切换工作方向不会清空。离开前请复制简报；这不是已共享或已保存的任务记录。下方操作手册的任务导出／导入是独立功能，不会保存增长工作台字段。",
  "Campaign link builder (optional)": "活动链接生成器（可选）",
  "Use a public MEND landing page, then verify it loads. No customer names or personal data in campaign labels. Private routes and direct booking redirects are excluded. This creates a URL only; it does not publish or validate the page.": "使用 MEND 公开落地页，并核实能正常打开。活动标签不能含客户姓名或个人信息。不接受私有页面及直接预约跳转。本工具只生成网址，不会发布或核验页面。",
  "Public page path": "公开页面路径",
  "Source": "来源",
  "Google Business Profile": "Google 商家资料",
  "Campaign slug": "活动标识（英文）",
  "Generated campaign URL": "生成的活动网址",
  "Enter a public path starting with / (no query or fragment) and a lowercase campaign slug using letters, numbers, hyphens or underscores.": "填写以 / 开头的公开路径（不含查询参数或锚点），活动标识使用小写英文字母、数字、连字符或下划线。",
  "Copy campaign URL": "复制活动链接",
  "Reviewable task brief": "待审核任务简报",
  "Add confirmed public facts to prepare a brief.": "填写已核实的公开事实以准备简报。",
  "Copy task brief": "复制任务简报",
  "Copying is not approval. Review before deliberately sharing with an AI provider. Posting reviews, replies or social content requires separate authorization.": "复制不等于批准。向 AI 服务分享之前请审核内容。发布评价、回复或社交内容须单独授权。",
  "MaSe feature comparison and integration boundaries": "MaSe 功能对照与集成边界",
  "Bookings, availability, customer records and reception configuration remain with MaSe and its authorized administrators. This desk prepares marketing work; it does not replace those systems. Integration notes reflect the 7 November 2026 read-only settings audit and may change. Finance and day-close remain in MaSe; this desk does not duplicate them. Official product descriptions are not proof that MEND has enabled them.": "预约、可用时段、客户档案和接待配置仍由 MaSe 及获授权管理员管理。本工作台准备营销工作，不替代这些系统。对照信息来自 2026 年 11 月 7 日只读审计，后续可能变化。财务和日结保留在 MaSe，不重复建设。官方产品说明不代表 MEND 已经启用该功能。",
  "MaSe feature reference (new tab)": "MaSe 功能参考（新标签页）",
  "Deskie messaging reference (new tab)": "Deskie 消息功能参考（新标签页）",
  "Deskie phone reference (new tab)": "Deskie 电话功能参考（新标签页）",
  "Campaign URL": "活动链接",
  "Task brief": "任务简报",
  "Clipboard unavailable. Select and copy the text below manually.": "无法使用剪贴板，请手动选择并复制下方文本。"
};

export default function MarketingGrowthDesk() {
  const { locale, t } = useMarketingLocale();
  const tr = (text: string) => t(text, growthUiZh[text] ?? text);
  const growthWorkflows = getGrowthWorkflows(locale);
  const decisions = locale === "zh" ? integrationDecisionsZh : integrationDecisions;
  const [active, setActive] = useState<string>(growthWorkflows[0].id);
  const [facts, setFacts] = useState("");
  const [evidence, setEvidence] = useState("");
  const [path, setPath] = useState("/services/hair");
  const [source, setSource] = useState("instagram");
  const [campaign, setCampaign] = useState("");
  const [status, setStatus] = useState("");
  const workflow = growthWorkflows.find((item) => item.id === active)!;
  const campaignUrl = buildCampaignUrl(path, source, campaign);
  const brief = buildGrowthBrief(active, facts, evidence, campaignUrl, locale);

  useEffect(() => {
    if (!facts && !evidence && !campaign) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [facts, evidence, campaign]);

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(label);
    } catch {
      setStatus("clipboard-error");
    }
  }

  return (
    <section id="marketing-growth-desk" aria-labelledby="growth-desk-heading" className="my-10 rounded-3xl border border-gold/40 bg-white/80 p-6 sm:p-8">
      <p className="eyebrow">{tr("Operator workspace")}</p>
      <h2 id="growth-desk-heading" className="mt-3 font-display text-3xl font-medium text-charcoal">{tr("Growth Desk")}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cocoa">{tr("Prepare reviews, Instagram campaigns and SEO / AEO work here without opening MaSe. External links are platform handoffs, not connected feeds. No live ratings, account connections or performance totals are claimed.")}</p>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={tr("Choose a growth workstream")}>
        {growthWorkflows.map((item) => <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => { setActive(item.id); setStatus(""); }} className={active === item.id ? "btn-primary" : "btn-outline"}>{item.title}</button>)}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl bg-sand/50 p-5">
          <h3 className="text-xl font-medium text-charcoal">{workflow.title}</h3>
          <p className="mt-2 text-sm text-cocoa">{workflow.outcome}</p>
          {active === "google-reviews" && <p className="mt-3 rounded-xl border border-beige p-3 text-sm text-cocoa">{tr("Existing printed review stand: retained. QR work is paused pending the owner-provided photo or file. The text link here does not replace the stand; no new QR is generated or published.")}</p>}
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-cocoa">{workflow.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p className="mt-5 text-sm text-charcoal"><strong>{tr("Evidence to collect:")}</strong> {workflow.measure}</p>
          <div className="mt-5 flex flex-wrap gap-3">{workflow.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-outline">{link.label}<span className="sr-only">{tr("(opens in a new tab)")}</span></a>)}</div>
        </article>
        <div className="space-y-5">
          <label className="block text-sm font-medium text-charcoal">{tr("Confirmed public facts for this task")}<textarea className={fieldClass} rows={4} maxLength={5000} value={facts} onChange={(event) => { setFacts(event.target.value); setStatus(""); }} placeholder={tr("Service page, approved offer, audience and approved image availability. No customer details.")} /></label>
          <label className="block text-sm font-medium text-charcoal">{tr("Evidence, observation date and comparison filters")}<textarea className={fieldClass} rows={4} maxLength={5000} value={evidence} onChange={(event) => { setEvidence(event.target.value); setStatus(""); }} placeholder={tr("Public source URL, date, platform, query and period. If not checked, say not verified. Do not paste customer reviews with names or private account links.")} /></label>
          <p className="text-sm leading-relaxed text-cocoa">{tr("Fields stay in this browser session only, across workstream switches. Copy your brief before leaving; this is not a shared or saved task record. The existing operating guide below provides separate task export/import; it does not save these Growth Desk fields.")}</p>
        </div>
      </div>
      <details className="mt-6 rounded-2xl border border-beige p-5">
        <summary className="cursor-pointer font-medium text-charcoal">{tr("Campaign link builder (optional)")}</summary>
        <p className="mt-3 text-sm text-cocoa">{tr("Use a public MEND landing page, then verify it loads. No customer names or personal data in campaign labels. Private routes and direct booking redirects are excluded. This creates a URL only; it does not publish or validate the page.")}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm font-medium">{tr("Public page path")}<input className={fieldClass} value={path} maxLength={200} onChange={(event) => { setPath(event.target.value); setStatus(""); }} /></label>
          <label className="text-sm font-medium">{tr("Source")}<select className={fieldClass} value={source} onChange={(event) => { setSource(event.target.value); setStatus(""); }}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="google_business_profile">{tr("Google Business Profile")}</option></select></label>
          <label className="text-sm font-medium">{tr("Campaign slug")}<input className={fieldClass} value={campaign} maxLength={80} onChange={(event) => { setCampaign(event.target.value); setStatus(""); }} placeholder="spring-hair-2026" /></label>
        </div>
        <label className="mt-4 block text-sm font-medium">{tr("Generated campaign URL")}<textarea readOnly rows={3} className={`${fieldClass} break-all`} value={campaignUrl} /></label>
        {!campaignUrl && <p className="mt-2 text-sm text-cocoa">{tr("Enter a public path starting with / (no query or fragment) and a lowercase campaign slug using letters, numbers, hyphens or underscores.")}</p>}
        <button type="button" disabled={!campaignUrl} onClick={() => copy(campaignUrl, "Campaign URL")} className="btn-outline mt-3 disabled:opacity-40">{tr("Copy campaign URL")}</button>
      </details>
      <label className="mt-6 block text-sm font-medium text-charcoal">{tr("Reviewable task brief")}<textarea className={`${fieldClass} font-mono text-xs`} readOnly rows={10} value={brief} placeholder={tr("Add confirmed public facts to prepare a brief.")} /></label>
      <button type="button" disabled={!brief} onClick={() => copy(brief, "Task brief")} className="btn-primary mt-4 disabled:opacity-40">{tr("Copy task brief")}</button>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-cocoa">{status === "clipboard-error" ? tr("Clipboard unavailable. Select and copy the text below manually.") : status ? t(`${status} copied. Nothing was sent or published.`, `${tr(status)}已复制。未发送或发布任何内容。`) : ""}</p>
      <p className="mt-2 text-sm text-cocoa">{tr("Copying is not approval. Review before deliberately sharing with an AI provider. Posting reviews, replies or social content requires separate authorization.")}</p>
      <details className="mt-6 border-t border-beige pt-5">
        <summary className="cursor-pointer font-medium text-charcoal">{tr("MaSe feature comparison and integration boundaries")}</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">{decisions.map((item) => <article key={item.name} className="rounded-xl bg-sand/50 p-4"><h3 className="font-medium text-charcoal">{item.name}: {item.decision}</h3><p className="mt-2 text-sm leading-relaxed text-cocoa">{item.detail}</p></article>)}</div>
        <p className="mt-4 text-sm text-cocoa">{tr("Bookings, availability, customer records and reception configuration remain with MaSe and its authorized administrators. This desk prepares marketing work; it does not replace those systems. Integration notes reflect the 7 November 2026 read-only settings audit and may change. Finance and day-close remain in MaSe; this desk does not duplicate them. Official product descriptions are not proof that MEND has enabled them.")}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm underline"><a href="https://www.mase.cloud/pricing" target="_blank" rel="noopener noreferrer">{tr("MaSe feature reference (new tab)")}</a><a href="https://www.mase.cloud/en/products/ai-messaging/" target="_blank" rel="noopener noreferrer">{tr("Deskie messaging reference (new tab)")}</a><a href="https://www.mase.cloud/en/products/ai-phone/" target="_blank" rel="noopener noreferrer">{tr("Deskie phone reference (new tab)")}</a></div>
      </details>
    </section>
  );
}
