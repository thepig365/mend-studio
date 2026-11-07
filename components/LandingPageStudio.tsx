"use client";

import { useMemo, useState } from "react";
import { useMarketingLocale } from "./MarketingLocale";

type LandingPageProvider = "ChatGPT" | "Codex" | "Claude";

const providerLinks: Record<LandingPageProvider, string> = {
  ChatGPT: "https://chatgpt.com/",
  Codex: "https://chatgpt.com/codex",
  Claude: "https://claude.ai/",
};

const pageTypes = [
  "Service landing page",
  "Promotion or offer",
  "Event or open day",
  "Educational SEO page",
  "Seasonal campaign",
] as const;

const callsToAction = ["Book", "Enquire", "Call", "Learn more"] as const;

const languages = ["English", "Simplified Chinese", "Bilingual"] as const;

const optionLabels: Record<string, string> = {
  "Service landing page": "服务落地页",
  "Promotion or offer": "促销或优惠",
  "Event or open day": "活动或开放日",
  "Educational SEO page": "知识科普 SEO 页面",
  "Seasonal campaign": "季节性推广",
  "Book": "预约",
  "Enquire": "咨询",
  "Call": "致电",
  "Learn more": "了解更多",
  "English": "英语",
  "Simplified Chinese": "简体中文",
  "Bilingual": "中英双语"
};

export default function LandingPageStudio() {
  const { t } = useMarketingLocale();
  const [provider, setProvider] = useState<LandingPageProvider>("ChatGPT");
  const [pageType, setPageType] =
    useState<(typeof pageTypes)[number]>("Service landing page");
  const [pageTitle, setPageTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [language, setLanguage] =
    useState<(typeof languages)[number]>("Bilingual");
  const [sourceUrl, setSourceUrl] = useState("");
  const [confirmedFacts, setConfirmedFacts] = useState("");
  const [callToAction, setCallToAction] =
    useState<(typeof callsToAction)[number]>("Book");
  const [seoFocus, setSeoFocus] = useState("");
  const [creativeNotes, setCreativeNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [pagePath, setPagePath] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  const [publicationApproved, setPublicationApproved] = useState(false);
  const [productionVerified, setProductionVerified] = useState(false);
  const [releaseAction, setReleaseAction] = useState<
    "publish" | "search" | "analytics" | null
  >(null);

  const providerInstruction = useMemo(
    () =>
      provider === "Codex"
        ? [
            t("Work in the thepig365/mend-studio repository from the current main branch.", "从当前 main 分支开始，在 thepig365/mend-studio 仓库中工作。"),
            t("Inspect the existing design system, service data and bilingual route conventions before editing.", "编辑前先检查现有设计系统、服务数据和双语路由约定。"),
            t("Implement the page on an isolated branch, run the repository checks and provide a review build.", "在独立分支实现页面，运行仓库检查并提供审核版本。"),
            t("Do not merge or deploy to production without Leon's explicit approval.", "未经 Leon 明确批准，不得合并或部署至生产环境。"),
          ]
        : [
            t("Prepare customer-facing copy, page structure and an implementation-ready brief.", "准备面向顾客的文案、页面结构和可直接用于开发的任务说明。"),
            t("Do not claim that the page has been coded, published or connected to live systems.", "不得声称页面已完成开发、已发布或已连接线上系统。"),
          ],
    [provider, t],
  );

  const prompt = useMemo(
    () =>
      [
        t("MEND LANDING PAGE BUILD — DRAFT ONLY", "MEND 落地页制作任务 — 仅限草稿"),
        `${t("AI workspace", "AI 工作平台")}: ${provider}`,
        `${t("Page type", "页面类型")}: ${t(pageType, optionLabels[pageType])}`,
        `${t("Working title", "暂定标题")}: ${pageTitle.trim() || t("[required]", "[必填]")}`,
        `${t("Audience", "目标受众")}: ${audience.trim() || t("[not supplied]", "[未提供]")}`,
        `${t("Language", "页面语言")}: ${t(language, optionLabels[language])}`,
        `${t("Existing source page or service", "现有参考页面或服务")}: ${sourceUrl.trim() || t("[none supplied]", "[未提供]")}`,
        `${t("Primary call to action", "主要行动引导")}: ${t(callToAction, optionLabels[callToAction])}`,
        `${t("SEO focus", "SEO 重点")}: ${seoFocus.trim() || t("[research and missing facts must be identified]", "[需标明待调研内容和缺失事实]")}`,
        "",
        t("CONFIRMED FACTS, OFFER DETAILS, PRICES AND DATES", "已确认的事实、优惠详情、价格和日期"),
        confirmedFacts.trim() || t("[required — do not proceed without confirmed facts]", "[必填 — 未确认事实前不得继续]"),
        "",
        t("CREATIVE OR BRAND NOTES", "创意或品牌说明"),
        creativeNotes.trim() || t("[use the existing MEND website design and approved brand manifesto]", "[使用现有 MEND 网站设计和已批准的品牌宣言]"),
        "",
        t("EXECUTION RULES", "执行规则"),
        ...providerInstruction,
        t("Use only confirmed information above and verified public information from mendbeauty.com.au.", "仅使用上述已确认信息，以及 mendbeauty.com.au 上经过核实的公开信息。"),
        t("Do not invent services, prices, dates, availability, reviews, rankings, clinical claims or results.", "不得编造服务、价格、日期、可预约情况、评价、排名、医疗功效或效果。"),
        t("Reuse the existing MEND header, footer, typography, colours, booking flow and responsive patterns.", "沿用现有 MEND 页眉、页脚、字体、颜色、预约流程和响应式布局。"),
        t("Keep English and Chinese facts commercially equivalent when the page is bilingual.", "双语页面的中英文事实和商业信息必须保持一致。"),
        t("Use the existing MaSe booking destination unless an exact approved service mapping exists.", "使用现有 MaSe 预约地址，除非已有获批的精确服务对应链接。"),
        t("Keep the page accessible, mobile-first, crawlable and suitable for local search without keyword stuffing.", "确保页面支持无障碍访问、移动优先、可被抓取且适合本地搜索，避免堆砌关键词。"),
        t("Do not collect or include customer records, passwords, private analytics or full conversations.", "不得收集或包含顾客记录、密码、非公开分析数据或完整对话。"),
        "",
        t("RETURN", "交付内容"),
        t("1. Missing facts or risks that must be resolved before publication.", "1. 发布前必须补齐的事实或解决的风险。"),
        t("2. Recommended route and page hierarchy.", "2. 推荐的页面路径和层级结构。"),
        t("3. Draft hero, sections, proof points, FAQs and call-to-action copy.", "3. 首屏、各版块、佐证要点、常见问题及行动引导文案草稿。"),
        t("4. SEO title, meta description, headings, internal links and structured-data recommendation.", "4. SEO 标题、元描述、各级标题、内部链接和结构化数据建议。"),
        t("5. Asset list with clear notes where approved MEND photography is still required.", "5. 素材清单，并明确标出仍需获批 MEND 摄影素材的位置。"),
        t("6. Desktop and mobile acceptance checklist.", "6. 桌面端和移动端验收清单。"),
        provider === "Codex"
          ? t("7. Exact files changed, test results and a review URL.", "7. 修改文件明细、测试结果和审核链接。")
          : t("7. A clean handoff brief for implementation by Codex.", "7. 供 Codex 实施的清晰交接说明。"),
        "",
        t("This output remains Draft. The AI must not approve or publish its own work.", "本输出仍为草稿。AI 不得自行批准或发布自己的工作成果。"),
      ].join("\n"),
    [
      audience,
      callToAction,
      confirmedFacts,
      creativeNotes,
      language,
      pageTitle,
      pageType,
      provider,
      providerInstruction,
      seoFocus,
      sourceUrl,
      t,
    ],
  );

  const readyToCopy =
    pageTitle.trim().length > 0 && confirmedFacts.trim().length > 0;
  const normalizedPagePath = pagePath.trim().startsWith("/")
    ? pagePath.trim()
    : `/${pagePath.trim()}`;
  const validPagePath =
    pagePath.trim().length > 1 &&
    /^\/[a-z0-9]+(?:[a-z0-9-/]*[a-z0-9])?$/i.test(normalizedPagePath);
  const productionUrl = validPagePath
    ? `https://mendbeauty.com.au${normalizedPagePath}`
    : "";
  const validReviewUrl = /^https:\/\/[^\s]+$/i.test(reviewUrl.trim());
  const readyToPublish =
    readyToCopy &&
    validPagePath &&
    validReviewUrl &&
    publicationApproved;

  const releaseBrief = useMemo(
    () =>
      [
        t("MEND LANDING PAGE RELEASE — LEON APPROVED", "MEND 落地页发布任务 — 已获 Leon 批准"),
        `${t("Production route", "生产页面网址")}: ${productionUrl || t("[required]", "[必填]")}`,
        `${t("Review URL", "审核网址")}: ${reviewUrl.trim() || t("[required]", "[必填]")}`,
        "",
        t("Use the existing thepig365/mend-studio repository and current production workflow.", "使用现有 thepig365/mend-studio 仓库和当前生产发布流程。"),
        t("Verify the reviewed page matches the approved preview and confirmed facts.", "核实待发布页面与获批预览和已确认事实一致。"),
        t("Run lint, type-check, tests and the production build.", "运行 lint、类型检查、测试和生产构建。"),
        t("Confirm metadata, canonical URL, language alternates, sitemap coverage, analytics instrumentation and mobile layout.", "确认元数据、规范网址、语言替代链接、站点地图覆盖、分析追踪和移动端布局。"),
        t("Do not change unrelated pages, prices, services, DNS, payments, advertising or account settings.", "不得修改无关页面、价格、服务、DNS、支付、广告或账户设置。"),
        t("Publish only this approved landing page through a focused PR and the existing Vercel production process.", "通过专门的 PR 和现有 Vercel 生产流程，仅发布此获批落地页。"),
        t("After deployment, verify the production URL, sitemap entry and consented GA4 page-view instrumentation.", "部署后核验生产网址、站点地图条目和已获用户同意的 GA4 页面浏览追踪。"),
        "",
        t("APPROVED BUILD BRIEF", "已批准的制作任务说明"),
        prompt,
      ].join("\n"),
    [productionUrl, prompt, reviewUrl, t],
  );

  async function copyBuildBrief() {
    if (!readyToCopy) {
      return;
    }

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function copyAndOpen(
    action: "publish" | "search" | "analytics",
    text: string,
    href: string,
  ) {
    window.open(href, "_blank", "noopener,noreferrer");
    await navigator.clipboard.writeText(text);
    setReleaseAction(action);
    window.setTimeout(() => setReleaseAction(null), 2500);
  }

  return (
    <section className="mt-10 rounded-3xl border border-gold/45 bg-white/90 p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="eyebrow">
          {t("Landing Page Studio", "落地页工作室")}
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
          {t("Create an implementation-ready landing page draft", "创建可直接用于开发的落地页草稿")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">
          {t("Build one controlled brief for ChatGPT, Codex or Claude. The studio works in this browser only: it does not call a paid AI API, save the form, edit the website or publish a page.", "为 ChatGPT、Codex 或 Claude 制作一份范围明确的任务说明。此工作室仅在当前浏览器运行：不会调用付费 AI API、保存表单、编辑网站或发布页面。")}
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-charcoal">
          {t("Page type", "页面类型")}
          <select
            value={pageType}
            onChange={(event) =>
              setPageType(event.target.value as (typeof pageTypes)[number])
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {pageTypes.map((type) => (
              <option key={type} value={type}>
                {t(type, optionLabels[type])}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("AI workspace", "AI 工作平台")}
          <select
            value={provider}
            onChange={(event) =>
              setProvider(event.target.value as LandingPageProvider)
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option value="ChatGPT">ChatGPT</option>
            <option value="Codex">Codex</option>
            <option value="Claude">Claude</option>
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">{t("Working title", "暂定标题")} {" "}<span className="text-bronze">*</span>
          <input
            required
            value={pageTitle}
            onChange={(event) => setPageTitle(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder={t("Example: MEND Signature Head Ritual", "示例：MEND 招牌头部护理")}
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("Audience", "目标受众")}
          <input
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder={t("Example: Deepdene clients seeking premium Head Spa care", "示例：寻求高端头部 SPA 护理的 Deepdene 顾客")}
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("Language", "页面语言")}
          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as (typeof languages)[number])
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {languages.map((option) => (
              <option key={option} value={option}>
                {t(option, optionLabels[option])}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("Primary call to action", "主要行动引导")}
          <select
            value={callToAction}
            onChange={(event) =>
              setCallToAction(
                event.target.value as (typeof callsToAction)[number],
              )
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {callsToAction.map((action) => (
              <option key={action} value={action}>
                {t(action, optionLabels[action])}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal md:col-span-2">
          {t("Existing source page or service URL", "现有参考页面或服务网址")}
          <input
            type="url"
            value={sourceUrl}
            onChange={(event) => setSourceUrl(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="https://mendbeauty.com.au/services/head-spa"
          />
        </label>
        <label className="text-sm font-medium text-charcoal md:col-span-2">{t("Confirmed facts, offer, prices and dates", "已确认的事实、优惠、价格和日期")}{" "}
          <span className="text-bronze">*</span>
          <textarea
            required
            value={confirmedFacts}
            onChange={(event) => setConfirmedFacts(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder={t("Add only approved facts. Do not paste customer records, passwords or private analytics.", "仅填写已批准的事实。请勿粘贴顾客记录、密码或非公开分析数据。")}
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("SEO focus", "SEO 重点")}
          <textarea
            value={seoFocus}
            onChange={(event) => setSeoFocus(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder={t("Example: Head Spa Deepdene, Head Spa Melbourne", "示例：Deepdene 头部 SPA、墨尔本头部 SPA")}
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          {t("Creative or brand notes", "创意或品牌说明")}
          <textarea
            value={creativeNotes}
            onChange={(event) => setCreativeNotes(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder={t("Approved image, tone, exclusions or layout direction", "已批准的图片、文案语气、排除事项或布局方向")}
          />
        </label>
      </div>

      <label className="mt-6 block text-sm font-medium text-charcoal">

        {t("Generated landing-page build brief", "生成的落地页制作任务说明")}

        <textarea
          readOnly
          value={prompt}
          rows={16}
          className="mt-2 w-full rounded-xl border border-beige bg-sand/60 px-4 py-3 font-mono text-xs leading-relaxed text-cocoa"
        />
      </label>

      {!readyToCopy ? (
        <p className="mt-3 text-xs leading-relaxed text-cocoa" role="status">
          {t("Add a working title and confirmed facts before copying the build brief.", "请先填写暂定标题和已确认事实，再复制制作任务说明。")}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyBuildBrief}
          disabled={!readyToCopy}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
        >
          {copied ? t("Copied", "已复制") : t("Copy landing-page brief", "复制落地页任务说明")}
        </button>
        <a
          href={providerLinks[provider]}
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          {t("Open", "打开")} {provider}
          <span className="sr-only">
            {t(" in a new tab", "（在新标签页中打开）")}
          </span>
        </a>
      </div>

      <div className="mt-7 grid gap-3 border-t border-beige pt-6 text-xs leading-relaxed text-cocoa sm:grid-cols-3">
        <p>
          <strong className="text-charcoal">
            {t("1. Prepare:", "1. 准备：")}</strong>{" "}{t("enter only approved facts and copy the brief.", "仅填写已批准的事实，然后复制任务说明。")}
          </p>
        <p>
          <strong className="text-charcoal">
            {t("2. Create:", "2. 制作：")}</strong>{" "}{t("give the brief to the selected AI workspace.", "将任务说明交给所选的 AI 工作平台。")}
          </p>
        <p>
          <strong className="text-charcoal">
            {t("3. Review:", "3. 审核：")}</strong>{" "}{t("approve the preview before any production publication.", "正式发布前，先批准预览版本。")}
          </p>
      </div>

      <section className="mt-8 border-t border-beige pt-8">
        <div className="max-w-3xl">
          <p className="eyebrow">
            {t("Release Console", "发布控制台")}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium text-charcoal">
            {t("Publish, submit to Google and verify analytics", "发布页面、提交至 Google 并核验分析数据")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            {t("These controls keep the human approval gate. Publishing opens Codex with the approved release brief; Google submission opens the verified Search Console property; Analytics opens the live GA4 report. A button never reports success until the destination system confirms it.", "这些操作保留人工审批关卡。发布操作会打开 Codex 并复制获批的发布任务说明；Google 提交操作会打开已验证的 Search Console 资源；Analytics 操作会打开线上 GA4 报告。目标系统确认前，按钮不会报告操作成功。")}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-charcoal">
            {t("Production page path", "生产页面路径")}
            <input
              value={pagePath}
              onChange={(event) => {
                setPagePath(event.target.value);
                setProductionVerified(false);
              }}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="/offers/winter-head-spa"
            />
            <span className="mt-2 block text-xs font-normal text-cocoa">
              {productionUrl || t("Use a unique website path beginning with /.", "使用以 / 开头且不重复的网站路径。")}
            </span>
          </label>
          <label className="text-sm font-medium text-charcoal">
            {t("Approved review URL", "已批准的审核网址")}
            <input
              type="url"
              value={reviewUrl}
              onChange={(event) => setReviewUrl(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="https://preview.example.vercel.app/offers/..."
            />
            <span className="mt-2 block text-xs font-normal text-cocoa">
              {t("Paste the exact Vercel Preview reviewed by Leon.", "粘贴 Leon 已审核的确切 Vercel 预览网址。")}
            </span>
          </label>
        </div>

        <label className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/40 bg-sand/45 p-4 text-sm leading-relaxed text-cocoa">
          <input
            type="checkbox"
            checked={publicationApproved}
            onChange={(event) => setPublicationApproved(event.target.checked)}
            className="mt-1 h-4 w-4 accent-charcoal"
          />
          <span>
            <strong className="text-charcoal">
              {t("Leon publication approval:", "Leon 发布批准：")}</strong>{" "}{t("I have reviewed this exact preview and approve this page for production publication.", "我已审核此确切预览，并批准将此页面发布至生产环境。")}
            </span>
        </label>

        <label className="mt-3 flex items-start gap-3 rounded-2xl border border-beige bg-cream p-4 text-sm leading-relaxed text-cocoa">
          <input
            type="checkbox"
            checked={productionVerified}
            disabled={!readyToPublish}
            onChange={(event) => setProductionVerified(event.target.checked)}
            className="mt-1 h-4 w-4 accent-charcoal disabled:cursor-not-allowed"
          />
          <span>
            <strong className="text-charcoal">
              {t("Production page verified:", "生产页面已核验：")}</strong>{" "}{t("I opened the exact production URL above and confirmed that the approved page loads correctly.", "我已打开上方的确切生产网址，并确认获批页面正常加载。")}
            </span>
        </label>

        {!readyToPublish ? (
          <p className="mt-4 text-xs leading-relaxed text-cocoa" role="status">
            {t("Add the required landing-page facts, a valid production path, an HTTPS review URL and Leon's publication approval to unlock the release action.", "请补齐必填的落地页事实、有效的生产路径、HTTPS 审核网址以及 Leon 的发布批准，以解锁发布操作。")}
          </p>
        ) : null}

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <button
            type="button"
            disabled={!readyToPublish}
            onClick={() =>
              copyAndOpen(
                "publish",
                releaseBrief,
                providerLinks.Codex,
              )
            }
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
          >
            {releaseAction === "publish"
              ? t("Release brief copied", "发布任务说明已复制")
              : t("1. Publish approved page", "1. 发布已批准的页面")}
          </button>
          <button
            type="button"
            disabled={!productionVerified}
            onClick={() =>
              copyAndOpen(
                "search",
                `${productionUrl}\nhttps://mendbeauty.com.au/sitemap.xml`,
                "https://search.google.com/search-console?resource_id=sc-domain:mendbeauty.com.au",
              )
            }
            className="btn-outline disabled:cursor-not-allowed disabled:opacity-45"
          >
            {releaseAction === "search"
              ? t("Page and sitemap copied", "页面和站点地图已复制")
              : t("2. Submit to Google", "2. 提交至 Google")}
          </button>
          <button
            type="button"
            disabled={!productionVerified}
            onClick={() =>
              copyAndOpen(
                "analytics",
                productionUrl,
                "https://analytics.google.com/",
              )
            }
            className="btn-outline disabled:cursor-not-allowed disabled:opacity-45"
          >
            {releaseAction === "analytics"
              ? t("Page URL copied", "页面网址已复制")
              : t("3. Verify in Analytics", "3. 在 Analytics 中核验")}
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 text-xs leading-relaxed text-cocoa">
          <p>
            <strong className="text-charcoal">
              {t("Google indexing:", "Google 收录：")}</strong>{" "}{t("Google does not provide a general one-click indexing API for ordinary landing pages. The correct action is to publish the page, include it in the sitemap and submit or inspect it in Search Console.", "Google 不为普通落地页提供通用的一键收录 API。正确流程是发布页面、将其纳入站点地图，然后在 Search Console 中提交或检查。")}
            </p>
          <p className="mt-2">
            <strong className="text-charcoal">
              {t("Google Analytics:", "Google Analytics：")}</strong>{" "}{t("GA4 already tracks consented page views across this website. A new landing page is not added manually; use the third button to verify that the live page is appearing in the report.", "GA4 已在全站追踪获得用户同意的页面浏览。新落地页无需手动添加；请使用第三个按钮核验线上页面是否出现在报告中。")}
            </p>
        </div>
      </section>
    </section>
  );
}
