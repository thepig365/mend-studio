import { site } from "./site";

export type Bilingual = { en: string; zh: string };

export const marketingReferenceDoc = "docs/marketing-reference.md";
export const driveLibraryEnvName = "MEND_DRIVE_LIBRARY_URL";
export const proposedLabel = "Proposed / 待店主核准具体条款后启用";

export const studioAddress = `${site.structuredAddress.streetAddress}, ${site.structuredAddress.addressLocality} ${site.structuredAddress.addressRegion} ${site.structuredAddress.postalCode}`;
export const bookingUrlEn = `${site.url}/book`;
export const bookingUrlZh = `${site.url}/zh/book`;
export const chairEnquiryUrlEn = `${site.url}/careers`;
export const chairEnquiryUrlZh = `${site.url}/zh/careers`;

export const customerFacingCopy = {
  taglineEn: site.tagline,
  taglineZh: "修护秀发，焕亮肌肤，重拾自信光彩。",
  serviceNoteEn: "Service available in English and Chinese.",
  serviceNoteZh: "提供中文服务",
  serviceAreaEn: "These nearby suburbs are not separate salon locations.",
  serviceAreaZh: "这些附近区域不是分店。",
} as const;

export const primarySuburbs = ["Deepdene", "Balwyn", "Canterbury", "Surrey Hills", "Kew", "Camberwell"] as const;
export const secondarySuburbs = ["Mont Albert"] as const;

export const studioServices: { name: string; zh: string; note?: Bilingual }[] = [
  { name: "Hairdressing", zh: "美发", note: { en: "Do not publish hairdressing service durations on the website.", zh: "网站上的美发内容不写服务时长。" } },
  { name: "Beauty", zh: "美容" },
  { name: "Head spa", zh: "头疗" },
  { name: "Scalp wellness", zh: "头皮护理" },
  { name: "Skin", zh: "肌肤护理" },
  { name: "Rent a Chair", zh: "美发工位出租" },
];

export const materialLibraryRoot = "MEND-Material-Library/";

export const materialFolders: { name: string; detail: Bilingual }[] = [
  { name: "Head Spa", detail: { en: "Head spa visits and scalp-care scenes from the Deepdene studio.", zh: "Deepdene 门店的头疗与头皮护理场景。" } },
  { name: "Hairdressing", detail: { en: "Hair cutting, colour and styling. Do not add service durations to website copy.", zh: "剪发、染发与造型。网站文案不写美发服务时长。" } },
  { name: "Skin Care", detail: { en: "Facial and skin-care scenes. Cosmetic care only.", zh: "面部与肌肤护理场景。仅限美容护理。" } },
  { name: "Rent a Chair", detail: { en: "Chair-rental scenes for the studio enquiry, not a second salon.", zh: "美发工位出租场景，用于门店咨询，不是第二家店。" } },
  { name: "Studio & Interior", detail: { en: "The studio, entrance and interior. One address only.", zh: "工作室、入口与室内。只有这一个地址。" } },
  { name: "Staff", detail: { en: "Staff photos only with that person’s consent. No personnel records.", zh: "员工照片须本人同意。不放人事档案。" } },
  { name: "Unsorted", detail: { en: "Holding area only. Do not publish from this folder until someone files the asset.", zh: "只作暂存。归档前不要从这里取用发布。" } },
];

export const prePromotionChecks: Bilingual[] = [
  { en: "Right service: the draft matches the service being promoted, and nearby suburbs stay service areas.", zh: "服务对应：草稿推广的是实际服务，附近城区仍只是服务范围。" },
  { en: "Real photo: a camera photo from the library, or a logo-only text card, with no AI or C2PA marker and no identifiable person without consent.", zh: "真实照片：素材库中的相机照片，或仅含标志的文字卡；没有 AI 或 C2PA 标记，可识别人物已获同意。" },
  { en: "Skill-set tone: warm, refined and honest cosmetic language, in Australian English and natural Chinese where the draft is customer-facing.", zh: "技能语气：温暖、克制、诚实的美容用语；对客草稿使用澳大利亚英语，需要时使用自然中文。" },
  { en: "Named booking goal: the piece names the booking or completed visit it is there to support.", zh: "写明预约目标：这条内容要促成的是预约或完成到店。" },
  { en: "Owner approval when needed: publication, a message, a price or offer, ad spend or an account change waits for Leon.", zh: "需要时取得店主批准：发布、对外消息、价格或优惠、广告花费或账户变更，须等 Leon。" },
];

export const skillStandards: { title: Bilingual; detail: Bilingual }[] = [
  {
    title: { en: "Brand narrative", zh: "品牌叙事" },
    detail: {
      en: "MEND is a calm boutique studio at 74 Whitehorse Road, Deepdene VIC 3103. Primary service areas are Deepdene, Balwyn, Canterbury, Surrey Hills, Kew and Camberwell. Mont Albert is secondary. These suburbs are not separate branches.",
      zh: "MEND 是位于 74 Whitehorse Road, Deepdene VIC 3103 的安静精品工作室。主要服务范围是 Deepdene、Balwyn、Canterbury、Surrey Hills、Kew 和 Camberwell。Mont Albert 是次要服务范围。这些城区不是分店。",
    },
  },
  {
    title: { en: "Emotional value and service copy", zh: "情绪价值与服务文案" },
    detail: {
      en: "Write warm, refined, honest cosmetic copy. No medical claims, no fabricated results, testimonials or prices, and no hairdressing service durations. Customer-facing drafts use Australian English and natural Chinese. The Chinese service note is 提供中文服务.",
      zh: "文案温暖、克制、诚实，并保持美容定位。不写医疗承诺，不编造效果、评价或价格，美发不写服务时长。对客草稿使用澳大利亚英语和自然中文。中文服务说明使用「提供中文服务」。",
    },
  },
  {
    title: { en: "Operator conducts, AI drafts", zh: "人来指挥，AI 起草" },
    detail: {
      en: "Adapted from the practical ideas in AI Agents are too good at marketing now. The operator conducts. AI is a pipeline worker that drafts, sorts and checks. People set the direction and give the final sign-off. MEND does not adopt AI-generated ad images, synthetic presenters or unattended publishing.",
      zh: "取自《AI Agents are too good at marketing now》的实用原则。运营人员负责指挥。AI 是流水线上的助手，负责起草、整理和对照规则检查。方向和最终签字由人决定。MEND 不采用文中的 AI 广告图、虚拟出镜人或无人值守发布。",
    },
  },
  {
    title: { en: "Real-asset library", zh: "真实素材库" },
    detail: {
      en: "Use a real camera photo tagged by service, scene and emotion, or a logo-only text card. Do not use an AI-labelled or ChatGPT image. Leave C2PA metadata in place. If a file carries an AI marker, set it aside and do not delete the marker.",
      zh: "使用按服务、场景和情绪归档的相机照片，或仅含标志的文字卡。不用带 AI 标记或 ChatGPT 生成的图片。保留 C2PA 元数据。文件若带 AI 标记，先搁置，不要删除标记。",
    },
  },
  {
    title: { en: "Variety, cadence and bookings", zh: "多样性、节奏与预约" },
    detail: {
      en: "Prefer distinct pieces on a spaced cadence. A burst of near-duplicate posts is not a plan. Confirmed bookings and completed visits are the primary success metrics, not impressions alone.",
      zh: "用有间隔的节奏发布不同内容。一次倒出近乎重复的帖子不是计划。已确认预约和已完成到店是主要成效，曝光本身不是结果。",
    },
  },
  {
    title: { en: "Pre-publish check and owner approval", zh: "发布前检查与店主批准" },
    detail: {
      en: "Run the pre-promotion checklist before a draft leaves the portal. External publishing, ad spend and account changes still need Leon’s explicit approval. A copied brief is not approval.",
      zh: "草稿离开门户前先走发布前清单。对外发布、广告花费和账户变更仍须 Leon 明确批准。复制简报不等于批准。",
    },
  },
];

export const routines: Bilingual[] = [
  { en: "Weekdays at 08:30 Australia/Melbourne: review the website, SEO and the top three priorities.", zh: "每个工作日 08:30（Australia/Melbourne）：查看网站、SEO 和当天前三项优先事项。" },
  { en: "Monday at 09:00 Australia/Melbourne: write the weekly report, including which channel or post produced confirmed bookings and completed visits.", zh: "每周一 09:00（Australia/Melbourne）：写周报，包括哪个渠道或哪条帖子带来了已确认预约和已完成到店。" },
  { en: "On the first business day of the month: review the month and write the next 30-day plan. This does not change the studio's published opening hours.", zh: "每月第一个工作日：做月度复盘，并写下接下来 30 天的计划。这不改变门店已公布的营业时间。" },
];

export const approvalItems: Bilingual[] = [
  { en: "External messages", zh: "对外消息" },
  { en: "Publication", zh: "对外发布" },
  { en: "Price or offer changes", zh: "价格或优惠变更" },
  { en: "Merges and deployments", zh: "合并与部署" },
  { en: "Ad spend", zh: "广告花费" },
  { en: "Subscriptions or credits, including Grok usage credits", zh: "订阅或额度，包括 Grok 用量额度" },
  { en: "Access to sensitive customer information", zh: "敏感客户信息的访问" },
  { en: "Irreversible or consequential account changes", zh: "不可逆或影响重大的账户变更" },
];

export const publicChannels: { id: string; name: Bilingual; detail: Bilingual; href: string | null }[] = [
  { id: "facebook", name: { en: "Facebook Page", zh: "Facebook 主页" }, detail: { en: "Mend Beauty Studio", zh: "主页名称 Mend Beauty Studio" }, href: site.socialProfiles.facebook },
  { id: "instagram", name: { en: "Instagram", zh: "Instagram 账号" }, detail: { en: "@mendbeauty_365", zh: "账号 @mendbeauty_365" }, href: site.socialProfiles.instagram },
  { id: "website", name: { en: "Website", zh: "官网" }, detail: { en: "mendbeauty.com.au", zh: "网址 mendbeauty.com.au" }, href: site.url },
  { id: "gumtree", name: { en: "Gumtree", zh: "Gumtree 分类信息" }, detail: { en: "Public listing 1345924936 for the chair-rental seller presence. No login, phone or account details belong here.", zh: "公开信息编号 1345924936，用于美发工位出租的卖家展示。这里不记录登录邮箱、电话或账户资料。" }, href: null },
];

export const gumtreeListingId = "1345924936";

export const ctaExamples: Bilingual[] = [
  { en: "Send us a message to book your visit at our Deepdene studio.", zh: "发消息给我们，预约 Deepdene 门店的到访。" },
  { en: `Choose a time: ${bookingUrlEn}`, zh: `选择时间：${bookingUrlZh}` },
  { en: "Message us and we will help you book.", zh: "私信我们，我们帮你预约。" },
];

export const consentNotice: Bilingual = {
  en: "I agree that Mend Beauty Studio may contact me about this booking. I can opt out at any time.",
  zh: "我同意 Mend Beauty Studio 就本次预约与我联系。我可以随时取消。",
};

export const trackingColumns: Bilingual[] = [
  { en: "Date", zh: "日期" },
  { en: "Channel/Post", zh: "渠道／帖子" },
  { en: "Traffic/Page Views", zh: "访问／页面浏览" },
  { en: "Booking Clicks", zh: "预约点击" },
  { en: "Inbound Calls/DMs", zh: "来电／私信" },
  { en: "Confirmed Bookings", zh: "已确认预约" },
  { en: "Completed Visits", zh: "已完成到店" },
  { en: "Notes", zh: "备注" },
];

export const trackingCaption: Bilingual = {
  en: "Hand-filled daily template. Confirmed bookings and completed visits are the primary success metrics, not impressions alone. Copy it into an approved private workspace. This portal does not store the table. The row below is an example label only.",
  zh: "每日手工填写的模板。已确认预约和已完成到店是主要成效，曝光本身不是结果。请复制到获准的私人工作区。本门户不保存此表。下面一行只是示例标签。",
};

export const trackingExampleNote: Bilingual = {
  en: "Example row only. Do not enter customer names, phone numbers or revenue.",
  zh: "示例行。不要填写客户姓名、电话或收入。",
};

export const complianceNotes: { title: Bilingual; detail: Bilingual }[] = [
  {
    title: { en: "Cosmetic care only", zh: "仅限美容护理" },
    detail: {
      en: "No medical or therapeutic efficacy claims. Stay on the TGA and AHPRA side of cosmetic care and relaxation. A scalp check is a cosmetic consultation, not a medical diagnosis.",
      zh: "不写医疗或疗效承诺。站在 TGA 与 AHPRA 的边界上，只谈美容护理和放松。头皮咨询是美容咨询，不是医疗诊断。",
    },
  },
  {
    title: { en: "Before-and-after photos", zh: "前后对比照片" },
    detail: {
      en: "Use a before-and-after photo only with written client consent. Do not use a misleading filter or edit. Say that individual results vary.",
      zh: "前后对比照片须有客户书面同意。不用误导性的滤镜或修图。说明效果因人而异。",
    },
  },
  {
    title: { en: "Australian Consumer Law", zh: "澳大利亚消费者法" },
    detail: {
      en: "Follow ACCC and Australian Consumer Law basics: truthful pricing, offer terms a guest can read before they accept, and no fake or incentivised reviews.",
      zh: "遵守 ACCC 与澳大利亚消费者法的基本要求：价格真实，优惠条款在客人接受前可读，不伪造评价，也不以奖励换评价。",
    },
  },
  {
    title: { en: "Spam Act 2003", zh: "《垃圾信息法 2003》" },
    detail: {
      en: "ACMA Spam Act 2003 basics for any lead-magnet phone or email collection: express consent, clear sender identification as Mend Beauty Studio, and an easy opt-out. Consent to book is not consent to a marketing list. This portal does not collect names or numbers.",
      zh: "若获客赠品要收集电话或邮箱，遵守 ACMA《Spam Act 2003》的基本要求：明确同意、表明发送者是 Mend Beauty Studio，并提供简便的退出方式。同意预约不等于同意接收营销信息。本门户不收集姓名或号码。",
    },
  },
];

export const driveCopy = {
  open: { en: "Open in Google Drive / Upload", zh: "在 Google Drive 中打开／上传" },
  unconfiguredTitle: { en: "Drive link not configured", zh: "尚未配置 Drive 链接" },
  unconfigured: {
    en: "This environment has no private Drive library URL yet. After login, the portal can show a link from the server-side variable MEND_DRIVE_LIBRARY_URL. Until then, file photos under the same seven folder names in the local library. Set the variable in Vercel only. Do not commit the URL.",
    zh: "当前环境还没有私有 Drive 素材库链接。登录后，门户可以从服务器变量 MEND_DRIVE_LIBRARY_URL 读取并显示链接。在此之前，请按同样的七个文件夹名称在本地素材库归档。只在 Vercel 中设置该变量，不要把链接写入仓库。",
  },
  configured: {
    en: "The library link is shown only after portal login. Uploading happens in Google Drive, and only for Google accounts Leon has named as editors. This portal does not upload the file or change sharing.",
    zh: "素材库链接只在门户登录后显示。上传在 Google Drive 中完成，且仅限 Leon 指定为编辑者的 Google 账户。本门户不接收文件，也不更改共享设置。",
  },
  thumbnails: {
    en: "Thumbnail preview is not available in this release. Live Drive API thumbnails are a later phase and need Leon's explicit approval before any API key is added. This portal does not call the Drive API or download photos.",
    zh: "此版本不提供缩略图预览。实时 Drive API 缩略图属于后续阶段，须先得到 Leon 的明确批准，才能添加任何 API 密钥。本门户不调用 Drive API，也不下载照片。",
  },
  access: {
    en: "Keep MEND-Material-Library as its own top-level Drive folder, separate from finance and payroll. Grant editor access only to explicitly named staff Google accounts, such as Anna. Do not turn on anyone-with-the-link. The portal itself is read-only.",
    zh: "把 MEND-Material-Library 作为独立的顶层 Drive 文件夹，与财务和工资文件夹分开。编辑权限只授予明确具名的员工 Google 账户，例如 Anna。不要开启「任何知道链接的人」。门户本身只读。",
  },
  git: {
    en: "Do not commit full-size photos, Drive folder IDs or Google API credentials to this public repository.",
    zh: "不要把全尺寸照片、Drive 文件夹 ID 或 Google API 凭证提交到这个公开仓库。",
  },
};
