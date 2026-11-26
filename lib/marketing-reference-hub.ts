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

export const draftOnlyLabel = "Draft only / 未经 Leon 明确批准不得发布";

export const facebookGroupNotice: Bilingual = {
  en: "No Facebook group has been created. Creating the group, inviting guests, publishing posts, or turning on member perks all require Leon's explicit approval.",
  zh: "尚未创建任何 Facebook 群；创建群、邀请客人、发布帖子或启用会员礼遇均须 Leon 明确批准。",
};

export const facebookGroupTitle: Bilingual = {
  en: "MEND Facebook member group plan (5 km local circle)",
  zh: "MEND 自建 Facebook 会员群运营方案（5 公里本地圈）",
};

export const groupDraftsTitle: Bilingual = {
  en: "2026 Melbourne beauty trends and 9 bilingual Facebook group drafts",
  zh: "2026 墨尔本美业趋势与 9 条双语 Facebook 群帖草稿",
};

export const facebookGroupBlocks: { title: Bilingual; detail: Bilingual }[] = [
  {
    title: { en: "Place and reach", zh: "定位与范围" },
    detail: {
      en: "The circle starts at 74 Whitehorse Road, Deepdene VIC 3103 and covers about 5 km: Deepdene, Balwyn, Canterbury, Surrey Hills, Kew, Camberwell and Mont Albert. These suburbs are the catchment of this one studio, not separate branches. The group is a retention and relationship layer. It does not replace Google Business Profile, the highest-intent booking entry, or the Facebook Page.",
      zh: "范围从 74 Whitehorse Road, Deepdene VIC 3103 起约 5 公里: Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert。这些郊区是这一间工作室的来客范围, 不是分店。群是留存与关系层, 不替代 Google 商家资料(最高意向预约入口), 也不替代 Facebook 主页。",
    },
  },
  {
    title: { en: "Name and settings, after Leon approves creation", zh: "命名与设置(须 Leon 批准后方可创建)" },
    detail: {
      en: "Suggested privacy: Private + Visible, so people can find the group and ask to join, while posts stay visible to members. Do not make it Public, and do not turn on limited membership. The Mend Beauty Studio Facebook Page should be an admin and the official linked Page. The Page has no age restriction. Leon is an admin. Anna can be a co-admin if needed. Suggested name: MEND Circle | Deepdene & Boroondara Hair, Scalp & Skin. Alternatives: The MEND Neighbourhood | Deepdene · Balwyn · Kew; MEND Studio Circle | Whitehorse Road, Deepdene. Avoid names that sound like a group-buy or a classifieds board.",
      zh: "隐私建议为 Private + Visible: 可以被搜到并申请加入, 帖子仅会员可见。不开 Public, 也不开 limited membership。由 Mend Beauty Studio 官方 Facebook 主页作为管理员并官方关联, 主页不设年龄限制。Leon 为管理员, Anna 可按需设为协管。建议群名: MEND Circle | Deepdene & Boroondara Hair, Scalp & Skin。备选: The MEND Neighbourhood | Deepdene · Balwyn · Kew; MEND Studio Circle | Whitehorse Road, Deepdene。避免团购或广告板式命名。",
    },
  },
  {
    title: { en: "Three join questions", zh: "3 个入群问题" },
    detail: {
      en: "1. Which suburb are you in? Deepdene, Balwyn, Canterbury, Surrey Hills, Kew, Camberwell, Mont Albert, or nearby. Suburb name only. 2. Are you most interested in hair, scalp and Head Spa, or in skin care? 3. Group rules and optional updates: respect, no spam, no medical advice, and no photos of other people without consent. If you are willing to see occasional MEND updates in the group, reply Yes or 先看看. Join questions do not replace Spam Act consent for SMS, WhatsApp or email. Do not collect a phone number, email address or health information in the questions.",
      zh: "①所在郊区(Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert 或附近, 仅填郊区名)。②当前最关注美发、头皮与 Head Spa, 还是皮肤护理。③群规与可选通知说明: 尊重、不发垃圾广告、不提供医疗建议、未经同意不发他人正面照; 愿意在群内看到 MEND 不定期更新, 回复 Yes 或“先看看”。入群问题不能替代《垃圾邮件法》对短信、WhatsApp 或邮件的正式同意, 且不得在入群问题中收集电话、邮箱或健康信息。",
    },
  },
  {
    title: { en: "Cold start", zh: "冷启动" },
    detail: {
      en: "Set the rules and a real studio-photo cover first. No AI image and no stock photo. Then prepare 5 to 10 useful seed posts: a welcome post, Melbourne weather and hair, a Head Spa comfort-and-cleanse note, barrier-first skin care, one poll, and one pinned booking guide. Invite existing MEND guests first: an optional QR at reception or the mirror, a mention after the visit only on a channel they already agreed to, and a Page invitation after Leon approves it. Do not buy members, scrape contacts, or tie joining to a review. A practical first-30-day aim is 30 to 50 real local members.",
      zh: "先配置群规与真实店景封面, 不用 AI 图, 也不用库存图。再预发 5 到 10 条实用种子帖: 欢迎帖、墨尔本天气与美发、Head Spa 舒适清洁说明、屏障优先护肤、1 条互动投票、1 条置顶预约指引。然后优先邀请现有 MEND 客人: 前台或镜面可选二维码, 仅在客人已经同意的渠道于离店后提及, 经批准后再在主页置顶邀请。不买粉, 不抓取, 不将入群与好评挂钩。前 30 天的务实目标是 30 到 50 名真实本地会员。",
    },
  },
  {
    title: { en: "Weekly rhythm", zh: "每周内容节奏" },
    detail: {
      en: "At most 2 or 3 posts a week: a useful note on Monday or Tuesday, a light poll or question midweek, and an optional weekend story or a member note that is still waiting for approval. Any member-only price or perk is labelled Proposed / 待店主核准具体条款后启用.",
      zh: "每周最多 2 到 3 帖: 周一至周二实用说明, 周中轻松投票或问答, 周末可选一条质感故事, 或一条仍待批准的会员说明。任何会员专享价或礼遇均标明 Proposed / 待店主核准具体条款后启用。",
    },
  },
  {
    title: { en: "Group rules and Australian boundaries", zh: "群规与澳洲合规" },
    detail: {
      en: "Turn on Meta Admin Assist to decline unanswered join requests, and to hold spam links and medical solicitation. A person still checks the group quickly each day. Sensitive questions go to Leon. TGA: promotion inside a private group can still be an advertisement, so do not claim hair regrowth, treatment of illness, or a therapeutic result. AHPRA: do not use a protected medical title. ACCC: do not ask for five-star reviews, filter by star rating, or use a fake review. Spam Act: do not message a phone or email list from the group.",
      zh: "启用 Meta Admin Assist: 拒答入群问题则自动拒绝, 并拦截垃圾外链与医疗招揽。同时每天由人快速巡检, 敏感问题交给 Leon。TGA: 私密群里的推广也可能构成广告, 禁止生发、治病或疗效宣称。AHPRA: 不使用受保护的医疗头衔。ACCC: 禁止诱导五星评价、按星级筛选或使用虚假评价。《垃圾邮件法》: 不从群里发展短信或邮件名单。",
    },
  },
  {
    title: { en: "Path to a booking", zh: "会员转化路径" },
    detail: {
      en: "Lead with something useful. Each post has one soft call to action, the booking link https://mendbeauty.com.au/book. Pin a bilingual service and booking note, and do not lock in prices unless Leon has approved them. If someone asks about a time in a comment or message, reply with the booking link and do not push. Post a same-day opening only when the gap is real and Leon has approved that post.",
      zh: "价值优先。每条帖子只给一个清晰的软性行动指引, 指向 https://mendbeauty.com.au/book。置顶双语服务与预约说明, 未经 Leon 批准不写死价格。有人在评论或私信询问档期时, 简洁回复预约链接, 不硬推。只有真实当天空档, 并且该条帖子已经批准时, 才发布临时空位。",
    },
  },
  {
    title: { en: "What to record on Monday at 09:00", zh: "周一 09:00 复盘要记的数" },
    detail: {
      en: "Add these to the Monday 09:00 Australia/Melbourne hand-filled review: net growth of real local members, posts published that week, member interactions, genuine enquiry comments or messages, booking-link clicks, and confirmed bookings and completed visits attributed to the group. Attribution can be a front-desk question or a member mentioning the group. A new group is usually below Meta Insights' 250-person threshold, so use the hand-filled booking attribution.",
      zh: "纳入周一 09:00 墨尔本复盘的手填表: 净本地会员增长、当周发帖数、会员互动数、实质咨询评论或私信、预约链接点击, 以及归因到本群的确认预约与实际到店。来源可以是前台询问, 或会员自己提及。新群初期通常低于 Meta Insights 的 250 人门槛, 以手填预约归因为准。",
    },
  },
];

export const welcomePost: Bilingual = {
  en: "This group is the local member space for one studio, MEND Beauty Studio at 74 Whitehorse Road, Deepdene. We offer hairdressing, Head Spa as scalp comfort and cleansing, and skin care. 提供中文服务. This is not a noticeboard, and we do not give medical advice. Book at https://mendbeauty.com.au/book. Guests travel from Deepdene, Balwyn, Canterbury, Surrey Hills, Kew, Camberwell and Mont Albert. Those nearby suburbs are not separate branches.",
  zh: "本群是 74 Whitehorse Road, Deepdene 这一间工作室的本地会员空间。我们提供美发、Head Spa / 头皮舒适护理与皮肤护理。提供中文服务。这里不是广告板, 也不提供医疗建议。预约请走 https://mendbeauty.com.au/book。Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert 是这一间工作室的来客范围, 不是分店。",
};

export const groupReferences: { name: string; href: string; detail: Bilingual }[] = [
  {
    name: "Your Go-To Gang",
    href: "https://www.facebook.com/groups/yourgotogang",
    detail: { en: "Borrow clear rules, brand participation and members answering one another. Avoid a national retail volume and frequent promotions.", zh: "可借鉴清晰群规、品牌亲自互动和会员互答。应避免全国零售体量与高频促销。" },
  },
  {
    name: "MECCA Chit Chat",
    href: "https://www.facebook.com/groups/MECCAchitchat/",
    detail: { en: "Borrow patient answers and a clear host. Avoid turning it into a national open forum.", zh: "可借鉴耐心问答与明确主持。应避免泛全国论坛化。" },
  },
  {
    name: "BAHM! (Beauty and Hair Melbourne)",
    href: "https://www.facebook.com/groups/1009128699111228/",
    detail: { en: "Borrow a Melbourne-local name and a natural help-seeking tone. Avoid model calls and a stream of ads.", zh: "可借鉴墨尔本本地命名与自然求助语气。应避免招模特与广告刷屏。" },
  },
];

export const groupReferenceNote: Bilingual = {
  en: "Honest limit: many Australian boutique VIP groups are not indexed for people who are logged out. The three links below are publicly checkable examples. Member counts are not invented.",
  zh: "诚实说明: 多数澳洲精品沙龙的私密会员群, 在未登录检索时并没有公开索引。下面只列可以公开核实的例子, 不编造人数。",
};

export const groupDraftIntro: Bilingual = {
  en: "The trend notes are a 2026 reading of public Australian style reporting, including Fashion Journal, Nine.com.au, news.com.au and Clean Beauty Market. They are not efficacy claims. Head Spa is a cleanse and comfort ritual only. It does not claim hair regrowth or a medical result. Every draft below is Draft only / 未经 Leon 明确批准不得发布.",
  zh: "趋势依据为 2026 年澳洲公开媒体与美业报道的整理, 包括 Fashion Journal、Nine.com.au、news.com.au、Clean Beauty Market。这些不是疗效承诺。Head Spa 只作为清洁与舒适护理仪式, 不宣称生发或医疗效果。下面每一条都是 Draft only / 未经 Leon 明确批准不得发布。",
};

export const groupPostDrafts: { title: string; trend: string; tone: string; en: string; zh: string }[] = [
  {
    title: "屏障优先光泽（Barrier-First Glow）",
    trend: "屏障优先光泽（Barrier-First Glow）",
    tone: "知识科普 (Educational)",
    en: "Glass skin had its moment on TikTok. What actually lasts in Australian weather is a calmer, barrier-first glow. That means skin that looks hydrated and comfortable, with normal texture, not a poreless filter. Chasing a crystal finish with stacked exfoliation is the opposite of current, careful skin care. At MEND Beauty Studio, 74 Whitehorse Road, Deepdene, our skin treatments are here to help your skin feel looked after, for clients from Balwyn, Kew, Canterbury and nearby as well. 提供中文服务. If you want a simple, modern skin appointment, start here when you are ready: https://mendbeauty.com.au/book",
    zh: "玻璃皮肤在网上火过一阵，但更适合澳洲天气、也更经得起日常的，是先把皮肤屏障照顾好的自然光泽：看起来水润、舒服，可以有正常纹理，而不是磨成滤镜里那种“没有毛孔”。用层层去角质去追水晶光，并不是现在更谨慎的护理方式。MEND Beauty Studio 在 Deepdene 的 74 Whitehorse Road，皮肤护理就是为了让皮肤被好好照顾；Balwyn、Kew、Canterbury 及附近的朋友都来这一间工作室即可。提供中文服务。想约一个简单、现时的皮肤护理，准备好了就走：https://mendbeauty.com.au/book",
  },
  {
    title: "Bloom Skin 柔光感",
    trend: "Bloom Skin 柔光感",
    tone: "质感向往 (Aspirational)",
    en: "The prettiest glow this year is not a wet-look highlight. It is the soft sheen of skin that looks well-rested, sometimes called \"bloom skin\". Think a quiet light, not a glossy pane of glass. If you live or work around Deepdene, Surrey Hills or Camberwell and want that kind of considered, modern skin moment, our skin treatments at the Whitehorse Road studio are designed as a calm in-salon pause, not a 10-step performance. 提供中文服务. Book a time that suits you: https://mendbeauty.com.au/book",
    zh: "今年最耐看的光泽，往往不是亮片式的水光，而是皮肤状态好时那种柔和、像刚休息够的浅光，有人称之为 bloom skin：是轻轻发光，不是一块玻璃。如果你住在或工作在 Deepdene、Surrey Hills 或 Camberwell 一带，想体验这种克制又现代的皮肤护理，欢迎来 Whitehorse Road 的工作室，它更像一段安静的到店时光，而不是十步表演。提供中文服务。适合你的时间可在这里预约：https://mendbeauty.com.au/book",
  },
  {
    title: "头皮护理日常化（Scalp Wellness）",
    trend: "头皮护理日常化（Scalp Wellness）",
    tone: "知识科普 (Educational)",
    en: "We are careful with the skin on our face, and often forget the skin under our hair. Scalp comfort has moved into everyday hair conversations in Melbourne: cleanliness, product build-up, and how the scalp feels. A Head Spa is a comfort-and-cleanse ritual, not a medical treatment, and it is not a claim to change hair loss or a health condition. If you are near Deepdene, Balwyn or Kew and curious about scalp-focused care, you will find Head Spa at the same MEND studio as our hair and skin services. 提供中文服务. Questions welcome below, or book here: https://mendbeauty.com.au/book",
    zh: "我们很认真地护理脸上的皮肤，却常常忘记头发下面那一层皮肤。在墨尔本，头皮舒不舒服、有没有产品堆积，已经越来越多地出现在日常美发对话里。Head Spa 是清洁与舒适的护理仪式，不是医疗项目，也不会声称能改变掉发或任何健康状况。如果你在 Deepdene、Balwyn 或 Kew 附近，想了解以头皮为中心的护理，MEND 的 Head Spa 和美发、皮肤护理在同一间工作室。提供中文服务。想先提问可以留言，想预约请走：https://mendbeauty.com.au/book",
  },
  {
    title: "日式/韩式 Head Spa 仪式",
    trend: "日式/韩式 Head Spa 仪式",
    tone: "质感向往 (Aspirational)",
    en: "Head Spa is one of the rituals Melbourne has been talking about this year: a quieter pause where the scalp is treated with the same kind of attention we usually save for a facial, with a thorough cleanse and hair that feels smoother and looks shinier when you step back onto Whitehorse Road. That is the experience, not a medical result. Our Head Spa lives at MEND Beauty Studio, 74 Whitehorse Road, Deepdene, and welcomes neighbours from Mont Albert, Canterbury and across the 5 km around us. 提供中文服务. When you want that in-salon pause: https://mendbeauty.com.au/book",
    zh: "Head Spa 是今年墨尔本常被提起的护理仪式：把平时给面部护理的那份专注轻轻放到头皮上，彻底清洁、安静歇一会儿，再走回 Whitehorse Road 时，头发往往摸起来更顺、看起来更有光泽。这是到店体验，不是医疗效果。MEND 的 Head Spa 就在 Deepdene 的 74 Whitehorse Road，也欢迎 Mont Albert、Canterbury 以及附近五公里的朋友前来。提供中文服务。想给自己留这段到店时光：https://mendbeauty.com.au/book",
  },
  {
    title: "好打理的生活感剪裁（Low-Maintenance Cuts）",
    trend: "好打理的生活感剪裁（Low-Maintenance Cuts）",
    tone: "知识科普 (Educational)",
    en: "The 2026 cut people keep asking for is not a style that only works on day one. Melbourne clients are leaning into softer layers, lived-in movement, and shapes that still look considered weeks later, including on a windy, humid commute through Kew or Camberwell. If that sounds like your life, our hairdressing team at the Deepdene studio can help you find a shape that fits your hair, not a rigid trend. 提供中文服务. Ready when you are: https://mendbeauty.com.au/book",
    zh: "2026 年很多人在找的剪裁，不是只在第一天好看的造型。墨尔本客人更偏向柔和层次、自然动感，以及几周后、甚至在 Kew 或 Camberwell 又风又湿的通勤路上，依然看起来有设计感的形状。如果这像你的日常，欢迎来 Deepdene 工作室，让美发团队一起找适合你头发、而不是硬套流行的剪裁。提供中文服务。准备好了就预约：https://mendbeauty.com.au/book",
  },
  {
    title: "Suede 棕 / 生活妆金与光泽（Lived-In Colour & Gloss）",
    trend: "Suede 棕 / 生活妆金与光泽（Lived-In Colour & Gloss）",
    tone: "质感向往 (Aspirational)",
    en: "The colour that looks expensive in 2026 often grows out softly: suede or mocha brunettes, sunlit lived-in blondes, and gloss-led shine, rather than a harsh line at the part. Australian stylists have been talking about colour that still looks considered between visits. If you are thinking about a richer brunette or a softer blonde, we would love to see you at MEND in Deepdene, one studio for neighbours from Balwyn, Surrey Hills and nearby. 提供中文服务. Start with a conversation and a booking: https://mendbeauty.com.au/book",
    zh: "2026 年看起来更有质感的发色，往往是长出来也很自然的那种：suede 或摩卡棕、阳光感的生活妆金发，以及强调光泽的 gloss，而不是分线上一条生硬的分界。澳洲造型师也在讨论“两次来店之间依然好看”的颜色。若你想试试更有层次的棕，或更柔和的金，欢迎来 Deepdene 的 MEND，Balwyn、Surrey Hills 及附近的朋友都来这一间即可。提供中文服务。想先聊聊再预约：https://mendbeauty.com.au/book",
  },
  {
    title: "点缀式发色（Expressive Placement Colour）",
    trend: "点缀式发色（Expressive Placement Colour）",
    tone: "轻松互动 (Playful)",
    en: "Not ready for a full colour overhaul? 2026 has a cheeky middle path: a ribbon of copper, a hint of pink in the fringe, or a little dimension tucked behind the ear, giving higher personality while usually staying easier to live with than a whole-head change. Tell us with a comment: copper, a soft pink moment, or \"just a gloss, thank you\". If you would rather talk it through in the chair, we are at 74 Whitehorse Road, Deepdene, and we 提供中文服务. Book here: https://mendbeauty.com.au/book",
    zh: "还不想整头大改发色？2026 年有一条更俏皮的中间路：一缕铜棕、刘海上一点柔粉，或耳后一点点层次，个性更明显，通常也比整头改变更好打理。欢迎在评论里选一个：铜棕、柔粉，还是“谢谢，先做个光泽就好”。若想坐下来慢慢聊，我们在 Deepdene 的 74 Whitehorse Road，提供中文服务。预约在这里：https://mendbeauty.com.au/book",
  },
  {
    title: "经得起墨尔本天气的头发（Climate-Proof Texture）",
    trend: "经得起墨尔本天气的头发（Climate-Proof Texture）",
    tone: "轻松互动 (Playful)",
    en: "Melbourne served four seasons before lunch again. Your hair sent a memo. The 2026 answer is less \"perfect in the salon, undone by the tram\", and more climate-proof texture: cuts and finishes that still look like you after wind, humidity and a sudden cool change. If you commute through Deepdene, Balwyn or Camberwell, come in for a hair appointment that respects real weather. 提供中文服务. What is your hair's personality on a true Melbourne day: frizz, flat, or surprisingly fine? Tell us below, or book: https://mendbeauty.com.au/book",
    zh: "墨尔本又在午饭前把四季演了一遍，头发大概先收到了通知。2026 年更实用的方向，不是“在店里完美、上了电车就散”，而是更经得起天气的质感：出了门、遇上大风、湿气和突然转凉，依然还像你。如果你经常经过 Deepdene、Balwyn 或 Camberwell，欢迎来做一次尊重真实天气的美发预约。提供中文服务。真正的墨尔本日，你的头发是蓬、塌，还是意外地还好？评论区见，或直接预约：https://mendbeauty.com.au/book",
  },
  {
    title: "精简护肤（Skinimalism / Clean Beauty）",
    trend: "精简护肤（Skinimalism / Clean Beauty）",
    tone: "知识科普 (Educational)",
    en: "The most modern skin routine might be the shortest one you actually keep. \"Skinimalism\" in 2026 is not neglect; it is fewer steps that earn their place: a gentle cleanse, thoughtful hydration, daily sun care, and in-salon skin treatments when you want a properly considered pause. No ten-step performance required. Visit us at MEND Beauty Studio, 74 Whitehorse Road, Deepdene, the same studio serving Kew, Mont Albert and our other neighbouring suburbs. 提供中文服务. What is the one step you would never skip? Comment below, or book a skin treatment: https://mendbeauty.com.au/book",
    zh: "最现代的护肤步骤，也许是你真正能坚持的那几步。2026 年的“精简护肤 / skinimalism”不是放任不管，而是每一步都有理由：温和清洁、好好补水、日常防晒，以及当你想要一段被认真对待的到店时光时，再来做皮肤护理。不必上演十步表演。欢迎来 MEND Beauty Studio，地址是 Deepdene 的 74 Whitehorse Road，Kew、Mont Albert 和附近郊区的朋友都来这一间。提供中文服务。有哪一步是你绝不会省的？欢迎留言，或预约皮肤护理：https://mendbeauty.com.au/book",
  },
];
