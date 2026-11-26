# MEND Marketing Portal

## Purpose

The private `/marketing` workspace brings Mend Beauty Studio’s recurring SEO
and marketing work into one controlled entry point. It links to the existing
authoritative services and prepares minimal, reviewable AI task briefs.

The public footer contains a restrained `Marketing Portal` link. The portal and
its sign-in route are excluded from search indexing.

The private workspace has its own in-place English / 中文 switch on all marketing
routes. Its header still hides the public-site language switch because no
`/zh/marketing` or `/zh/marketing/login` route is needed. The marketing-only
switch preserves form state and avoids false 404 destinations.

## Access

Access uses Google OAuth and is restricted to:

`hello@mendbeauty.com.au`

Google is given an account-selection hint for the authorised identity and the
`mendbeauty.com.au` Workspace domain. The server still verifies the exact,
Google-verified email address; the hint is not the access-control boundary.
Rejected or incomplete sign-in attempts return a clear message on the login
page instead of silently appearing to restart the flow.

The website never receives or stores the Google password. Configure these
values only as server-side Vercel environment variables:

- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `MARKETING_PORTAL_ALLOWED_EMAIL`

The material-library link is separate, optional and server-side:

- `MEND_DRIVE_LIBRARY_URL`

Set it to the full `https://drive.google.com/...` or `https://docs.google.com/...`
URL of the private `MEND-Material-Library` folder. The portal reads it only
after the existing login check. Do not use `NEXT_PUBLIC_MEND_DRIVE_LIBRARY_URL`;
a public variable would copy the folder link into the website JavaScript.
Leave the variable unset until Leon supplies the URL. The portal then shows
the seven folder names without a link. An invalid URL is treated as unset and
is not rendered. Do not commit the URL, a Drive folder ID, a full-size photo
or a Google API key. Live Drive API thumbnails are not built. They are a later
phase and need Leon's explicit approval before any API key is added.

The Google OAuth application must allow this production callback:

`https://mendbeauty.com.au/api/auth/callback/google`

Use a separate preview callback when reviewing a Vercel Preview. Do not commit
client secrets, access tokens or passwords.

## Included workspaces

- Technical SEO: Search Console and PageSpeed review
- Traffic and conversion: consented Google Analytics review
- Local search: Google Business Profile maintenance
- Content and keywords: customer-useful content and keyword briefs
- Social and campaigns: approved Meta campaign coordination
- Services and retention: confirmed MaSe source information
- AI task desk: minimal draft briefs for ChatGPT, Codex or Claude
- Landing Page Studio: controlled briefs for service, offer, event,
  educational SEO and seasonal campaign pages
- Release Console: human-gated handoff to publish an approved review build,
  submit or inspect the production URL in Search Console, and verify the page
  in Google Analytics
- Marketing Skills Library: a staff browser for the MIT-licensed
  [marketingskills](https://github.com/coreyhaines31/marketingskills) files
  vendored under `vendor/marketingskills/`. The pinned commit is recorded in
  `vendor/marketingskills/UPSTREAM.json`. Refresh with
  `node scripts/refresh-marketingskills.mjs` (optional `--sha`). The script
  copies `LICENSE` and skill markdown only and does not run upstream
  installers. Library routes stay behind the same sign-in as `/marketing`,
  send `noindex`, and are not added to the sitemap. Upstream text is
  third-party guidance; unsourced statistics must not be quoted as fact to
  customers. Do not store private strategy, customer or staff records, budgets
  or secrets in the vendored files.
- Marketing reference hub: brand, copy and AI checks, the material-library
  taxonomy, verified public channels, routines and owner-approval gates. The
  working text is the Simplified Chinese section
  [营销参考中心](#营销参考中心) and
  [marketing-reference.md](./marketing-reference.md).
- Lead generation plan: one call to action, two proposed offers, a hand-filled
  tracking table, Australian compliance notes and the Monday review. The
  working text is [获客执行方案](#获客执行方案). Nothing in that plan is
  approved to launch.

## AI boundary

The first release does not call an AI API. A brief is generated locally in the
authorised user’s browser and is sent nowhere until that user deliberately
copies it into ChatGPT, Codex or Claude.

The Landing Page Studio requires a working title and confirmed facts before a
brief can be copied. It prepares bilingual page structure, copy, SEO,
accessibility and review requirements while preserving the existing MEND
design and booking flow. It does not edit the repository or publish a page.

The Release Console becomes available only after a production path, an HTTPS
review URL and Leon's explicit publication checkbox are present. The publish
button copies a repository-aware release brief and opens Codex; Codex must
still verify the exact reviewed page, run the repository checks and use the
existing focused PR and Vercel workflow.

For ordinary landing pages, Google does not offer a general-purpose indexing
API. The Search Console action therefore copies the exact production URL and
the canonical sitemap URL, then opens the verified domain property for sitemap
submission or URL inspection. It does not claim that Google has indexed the
page. Search Console and Analytics remain locked until the authorised operator
confirms that the exact production URL loads correctly.

The website already has consent-controlled GA4 page-view instrumentation.
New landing pages do not need to be registered individually. The Analytics
action copies the production URL and opens GA4 so an authorised user can
confirm the live page in Realtime or DebugView.

Do not include customer records, passwords, full conversations or secrets.
AI output remains draft. It cannot approve or publish content, run advertising,
change production settings or spend money.

## Deliberately excluded

- unattended automatic publishing or account mutation;
- false indexing-success or analytics-success claims;
- advertising purchases or paid SEO subscriptions;
- direct Search Console, Analytics, Meta or MaSe data ingestion;
- customer-data replication;
- keyword-rank or traffic claims without source data;
- OpenAI or Anthropic API keys;
- persistent marketing records or a new database.

Those capabilities require separate source-system access, privacy review,
operating design, cost verification and CEO approval.

## Operator handbook (working version, 23 October 2026)

The existing workspace now begins with a public-safe operating guide for remote
promotion staff. It preserves the existing authentication, source links, AI task
desk and Landing Page Studio. No access, account or publishing authority is
created by reading the guide or changing a task status.

Included: brand direction; remote onboarding and shop-capture handoff; a 16-task
30-day plan; GBP, Meta, Chinese-social, website/booking and paid-search playbooks;
service intent mapping; SEO and separate ChatGPT Search / Google AI workflows;
eight non-brand discovery prompts; customer-care and fair-recognition standards;
a coordinator role brief and an evidence-based weekly review template.

The discovery prompts are a proposed test protocol, **not completed tests**.
Service facts, consent, practitioner input and actual analytics still require
verification. Seed keywords have no claimed search volume. No campaign is
launched, no security setting changes and no paid tool is needed by this update.

### Task handoff and honest persistence

Task fields exist only in the current browser session. They are not stored in a
database, local storage, analytics or a shared backend. Operators can export a
versioned JSON task file, place it in an already-authorised private team workspace,
and import it later. Import validates known task IDs, field types, statuses, dates
and size, then requires confirmation before replacing current fields. Unknown
fields are not rendered or executed. Cancel preserves the current work.

A before-unload warning helps protect unexported edits but is not a save guarantee.
The weekly text draft is separate: copy it before leaving. Export/import does not
upload, send or change sharing permissions. Do not claim this is a synchronised
multi-user tracker. Agree one coordinator and an authoritative team copy to avoid
conflicting versions.

### Privacy and staff access

The repository is public and client bundles can be downloaded. The guide must
therefore contain only public-safe generic guidance even though `/marketing` is
server-authenticated. Never commit the full confidential strategy, budgets,
individual pay/performance information, customer records, private attachments or
secrets. Private operating records belong in existing approved private systems.

The allowed account remains unchanged. New staff require administrator-approved
access; do not share the business account password. Adding identities, role-based
access or a shared database is a separate scoped change, not part of this release.

## Growth Desk (7 November 2026)

The first panel now provides five operator workstreams: Google Reviews,
Facebook Recommendations, Instagram, SEO and AEO / AI discovery. Each has a
concrete checklist, source-platform handoffs, an evidence standard and a locally
generated reviewable task brief. The operator can prepare this work without
opening MaSe. Platform authentication, posting and data retrieval still happen
in their authoritative systems; this release does not provide API integrations.

The Google review-request destination was verified against the MEND Business
Profile at 74 Whitehorse Road. The Facebook `/reviews` destination is provided
with an explicit submission-unverified label. Invitations must be voluntary and
neutral: no rating-based gating, incentives or generated positive reviews.

The optional UTM builder accepts only public MEND content paths and fixed source
choices. It excludes private routes, direct booking redirects, query strings,
fragments, encoded paths and external hosts. A generated link is not proof that
the page exists; the operator must check it before publishing. Campaign labels
must contain no personal data. UTMs measure website visits and intent, not MaSe
appointment completion or revenue.

All new fields are session-only React state. Switching workstreams preserves
fields, and browser unload warns about unexported work. Copy the current brief
before leaving; existing operating-guide JSON export does not include Growth
Desk fields. Copy errors show manual-copy guidance. No brief is automatically
sent to an AI service, saved, posted or added to analytics.

The feature comparison records the 7 November read-only MaSe audit: Google
booking connection unconfirmed; Google Analytics/Meta event settings offered
Enable now; review enhancer destination blank with 4+ filter disabled; TapFlow
trial offered NFC, AI positive-review text and social links at $199/store/year
(currency unspecified); Deskie unconfigured. These are observations, not
activation or purchase recommendations. Finance/day-close and operational
records remain in MaSe. This change does not touch review-QR deliverables.

Run `npm run check:marketing-growth` for the actual helper and component-state
checks, including clipboard failure, workstream switching, draft boundaries,
unload warnings and invalid campaign paths. This check is included in `npm test`.

## MaSe marketing-home reference

Services and retention includes a separate nine-label reference for the MaSe
marketing home: SMS, email, WhatsApp, WeChat, promotions and activities, smart
pricing, customer loyalty, points, and membership tiers. Every row uses the
stable status `unverified` and is shown as pending confirmation. The list is a
static bilingual reference, not a running integration or an editable evidence
tracker. Configuration, cost, consent and opt-out do not by themselves
authorise an email: before each email is sent, the owner must be shown the
full recipient list, subject, body and attachments, and must explicitly
approve that specific email. MaSe remains
responsible for sending, price rules, points and tiers. The portal does not
send messages or change those settings, and it adds no control for doing so.
The Growth Desk comparison of Google booking, website events, Review
Booster, TapFlow and Deskie is unchanged.

Run `npm run check:mase-marketing-home`. This check is included in `npm test`.

## Bilingual operator interface (7 November 2026)

An English / 中文 switch now covers the portal, login and skills-library routes
through a marketing-only locale provider. It switches in place without remounting
workspace forms. Existing English mode, task IDs, status values, import/export
format, URLs, source systems and publishing approval gates are preserved.

Chinese UI includes the operating guide and 16-task plan, weekly report template,
Growth Desk, AI task briefs, Landing Page Studio and release briefs, login errors,
and skills catalogue/search. The 53 third-party skill documents remain their
original English source; this is clearly labelled, while catalogue titles,
descriptions, navigation and controls have Chinese translations. Search accepts
English and Chinese catalogue terms. No vendor documents were deleted or replaced.

Only the UI language preference is stored locally, under
`mend-marketing-language`. Blocked local storage does not prevent switching in the
current session. No task content is persisted by this change. User-entered facts,
report edits and task records are not translated, overwritten or sent externally.
A pristine weekly report template follows the chosen language; edited text is
retained. The existing printed review stand remains authoritative and all QR work
is paused pending the owner-provided photo/file.

## 营销参考中心

私有 `/marketing` 工作台以营销参考中心作为广告与推广的统一查阅入口。条文见 [营销参考](./marketing-reference.md)。门户里的同名面板与该文件对应，并保留英文 / 中文切换。阅读不会授予发布、花费或更改账户的权限。

参考中心包含三块：

1. **营销技能与 AI 质量标准**：品牌叙事、情绪价值与服务文案、AI 工作流与发布前质量检查。
2. **MEND 素材库结构参考**：本地 `MEND-Material-Library/` 的七个文件夹，以及登录后才显示的 Google Drive 链接。
3. **已核实的公开营销与分类信息渠道**：Facebook 主页、Instagram、官网，以及 Gumtree 公开信息编号 `1345924936`。

品牌主句仍是 Mend your hair. Refresh your skin. Renew your look. 网站上已在使用的中文是「修护秀发，焕亮肌肤，重拾自信光彩。」中文服务说明使用「提供中文服务」。门店地址是 74 Whitehorse Road, Deepdene VIC 3103。主要服务范围是 Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell。Mont Albert 是次要服务范围。这些城区不是分店。

### 素材库与 Google Drive

Anna 和其他被点名的员工在 Google Drive 中上传照片。门户只在现有登录检查通过后，从私有的 Vercel 环境变量读取文件夹链接。

需要的变量只有一个：

- `MEND_DRIVE_LIBRARY_URL`

它必须是 `drive.google.com` 或 `docs.google.com` 上的完整 https 链接，指向名为 `MEND-Material-Library` 的私有文件夹。文件夹内镜像这七个子文件夹：`Head Spa`、`Hairdressing`、`Skin Care`、`Rent a Chair`、`Studio & Interior`、`Staff`、`Unsorted`。

不要使用 `NEXT_PUBLIC_MEND_DRIVE_LIBRARY_URL`。带 `NEXT_PUBLIC_` 的变量会把链接写进网站的 JavaScript，未登录的人也能从脚本里看到。服务器变量只在门户登录之后交给页面。

未配置或链接无效时，门户仍显示七个文件夹名称，并说明链接尚未配置，不展示按钮，也不猜测文件夹 ID。

安全姿势是先只读：

- 这个 Drive 文件夹是独立的顶层资料库，与财务和工资文件夹分开。
- 编辑权限只授予明确具名的员工 Google 账户，例如 Anna。不要开启「任何知道链接的人」。
- 门户不上传文件、不删除文件、不更改共享设置。上传发生在 Google Drive 里，而且只有 Leon 指定的编辑者可以上传。
- 不要把全尺寸照片、Drive 文件夹 ID 或 Google API 凭证提交到这个公开 Git 仓库。

缩略图是后续阶段，本版本没有接上。实时 Drive API 缩略图须先得到 Leon 的明确批准，才能在 Vercel 添加任何 API 密钥。当前代码不读取 Google API 密钥，也不从 Drive 下载照片。

## 获客执行方案

本方案是内部执行说明。对客的行动指引和同意文案同时给出澳大利亚英语和简体中文。标为 Proposed / 待店主核准具体条款后启用 的项目，在 Leon 核准具体条款之前不得对外使用。

已确认预约和已完成到店是主要成效，曝光本身不是结果。Confirmed bookings and completed visits are the primary success metrics, not impressions alone.

### 1. 单一行动指引

每条 Facebook 帖子和每则 Gumtree 广告只放一个明确的行动指引：请客人发消息预约，或给出选择时间的预约链接。不要发布没有预约或咨询路径的纯品牌帖。

美发工位的 Gumtree 广告使用现有工位咨询页（https://mendbeauty.com.au/careers 与 https://mendbeauty.com.au/zh/careers），不用美容预约链接。美容服务的选时链接是 https://mendbeauty.com.au/book 与 https://mendbeauty.com.au/zh/book。

对客示例：

- Send us a message to book your visit at our Deepdene studio.
- 发消息给我们，预约 Deepdene 门店的到访。
- Choose a time: https://mendbeauty.com.au/book
- 选择时间：https://mendbeauty.com.au/zh/book
- Message us and we will help you book.
- 私信我们，我们帮你预约。

### 2. 获客赠品

Proposed / 待店主核准具体条款后启用

提议的形式是：免费的美容头皮咨询，或首次到店体验，用来交换姓名和手机号。这不是医疗检查。具体是哪一项、是否收费、有效期和适用服务，都要等 Leon 写成明确条款。

收集姓名或手机号时，必须有单独的同意勾选，并附上说明。提议中的说明是：

- I agree that Mend Beauty Studio may contact me about this booking. I can opt out at any time.
- 我同意 Mend Beauty Studio 就本次预约与我联系。我可以随时取消。

同意预约不等于同意接收营销信息。没有勾选同意，就不发送后续消息。本门户不收集、不保存姓名或号码。

### 3. 转介绍

Proposed / 待店主核准具体条款后启用

提议的形式是：被介绍的人是新客，预约已确认，并且到店完成之后，介绍人获得一次免费护理。Leon 在启用前必须写清：是哪一项护理、何时失效、员工是否可参加、介绍人与新客是否必须是不同的人。在此之前不要写成已经生效的优惠，也不要标价格。

### 4. 每日手工记录表

每天把汇总数字抄到获准的私人工作区。下表是空的示例。不要在这个公开仓库里填写真实客户、电话或收入。门户不保存这张表。

Confirmed Bookings 与 Completed Visits 是主要栏目。Traffic/Page Views 只作背景。

| Date 日期 | Channel/Post 渠道／帖子 | Traffic/Page Views 访问／页面浏览 | Booking Clicks 预约点击 | Inbound Calls/DMs 来电／私信 | Confirmed Bookings 已确认预约 | Completed Visits 已完成到店 | Notes 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Example 示例 | Example post label 示例帖子 | — | — | — | — | — | Example row only. Do not enter customer names, phone numbers or revenue. 示例行。不要填写客户姓名、电话或收入。 |

### 5. 澳大利亚合规要点

- 不写医疗或疗效承诺。TGA 与 AHPRA 的边界是：只谈美容护理和放松。头皮咨询是美容咨询，不是医疗诊断。
- 前后对比照片须有客户书面同意。不用误导性的滤镜或修图。说明效果因人而异。
- 遵守 ACCC 与澳大利亚消费者法的基本要求：价格真实，优惠条款在客人接受前可读，不伪造评价，也不以奖励换评价。
- 若获客赠品要收集电话或邮箱，遵守 ACMA《Spam Act 2003》：明确同意、表明发送者是 Mend Beauty Studio，并提供简便的退出方式。

### 6. 每周复盘

每个周一，按 Australia/Melbourne 时间，结合 09:00 的周报，复盘哪个渠道或哪条帖子带来了已确认预约和已完成到店，什么值得重复，什么应该暂停或停止。重复一条内容不等于可以增加广告花费。花费仍须 Leon 另行批准。


## MEND 自建 Facebook 会员群运营方案（5 公里本地圈）

尚未创建任何 Facebook 群；创建群、邀请客人、发布帖子或启用会员礼遇均须 Leon 明确批准。

本方案是内部准备。群尚未创建。对客欢迎帖与后面 9 条草稿都标为 Draft only / 未经 Leon 明确批准不得发布。会员专享价或礼遇标为 Proposed / 待店主核准具体条款后启用。附近郊区只是 Deepdene 这一间工作室的来客范围, 不是分店。

### 定位与范围

范围从 74 Whitehorse Road, Deepdene VIC 3103 起约 5 公里: Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert。这些郊区是这一间工作室的来客范围, 不是分店。群是留存与关系层, 不替代 Google 商家资料(最高意向预约入口), 也不替代 Facebook 主页。

### 命名与设置(须 Leon 批准后方可创建)

隐私建议为 Private + Visible: 可以被搜到并申请加入, 帖子仅会员可见。不开 Public, 也不开 limited membership。由 Mend Beauty Studio 官方 Facebook 主页作为管理员并官方关联, 主页不设年龄限制。Leon 为管理员, Anna 可按需设为协管。建议群名: MEND Circle | Deepdene & Boroondara Hair, Scalp & Skin。备选: The MEND Neighbourhood | Deepdene · Balwyn · Kew; MEND Studio Circle | Whitehorse Road, Deepdene。避免团购或广告板式命名。

### 3 个入群问题

①所在郊区(Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert 或附近, 仅填郊区名)。②当前最关注美发、头皮与 Head Spa, 还是皮肤护理。③群规与可选通知说明: 尊重、不发垃圾广告、不提供医疗建议、未经同意不发他人正面照; 愿意在群内看到 MEND 不定期更新, 回复 Yes 或“先看看”。入群问题不能替代《垃圾邮件法》对短信、WhatsApp 或邮件的正式同意, 且不得在入群问题中收集电话、邮箱或健康信息。

### 冷启动

先配置群规与真实店景封面, 不用 AI 图, 也不用库存图。再预发 5 到 10 条实用种子帖: 欢迎帖、墨尔本天气与美发、Head Spa 舒适清洁说明、屏障优先护肤、1 条互动投票、1 条置顶预约指引。然后优先邀请现有 MEND 客人: 前台或镜面可选二维码, 仅在客人已经同意的渠道于离店后提及, 经批准后再在主页置顶邀请。不买粉, 不抓取, 不将入群与好评挂钩。前 30 天的务实目标是 30 到 50 名真实本地会员。

### 每周内容节奏

每周最多 2 到 3 帖: 周一至周二实用说明, 周中轻松投票或问答, 周末可选一条质感故事, 或一条仍待批准的会员说明。任何会员专享价或礼遇均标明 Proposed / 待店主核准具体条款后启用。

### 群规与澳洲合规

启用 Meta Admin Assist: 拒答入群问题则自动拒绝, 并拦截垃圾外链与医疗招揽。同时每天由人快速巡检, 敏感问题交给 Leon。TGA: 私密群里的推广也可能构成广告, 禁止生发、治病或疗效宣称。AHPRA: 不使用受保护的医疗头衔。ACCC: 禁止诱导五星评价、按星级筛选或使用虚假评价。《垃圾邮件法》: 不从群里发展短信或邮件名单。

### 会员转化路径

价值优先。每条帖子只给一个清晰的软性行动指引, 指向 https://mendbeauty.com.au/book。置顶双语服务与预约说明, 未经 Leon 批准不写死价格。有人在评论或私信询问档期时, 简洁回复预约链接, 不硬推。只有真实当天空档, 并且该条帖子已经批准时, 才发布临时空位。

### 周一 09:00 复盘要记的数

纳入周一 09:00 墨尔本复盘的手填表: 净本地会员增长、当周发帖数、会员互动数、实质咨询评论或私信、预约链接点击, 以及归因到本群的确认预约与实际到店。来源可以是前台询问, 或会员自己提及。新群初期通常低于 Meta Insights 的 250 人门槛, 以手填预约归因为准。

### 置顶欢迎帖

Draft only / 未经 Leon 明确批准不得发布

This group is the local member space for one studio, MEND Beauty Studio at 74 Whitehorse Road, Deepdene. We offer hairdressing, Head Spa as scalp comfort and cleansing, and skin care. 提供中文服务. This is not a noticeboard, and we do not give medical advice. Book at https://mendbeauty.com.au/book. Guests travel from Deepdene, Balwyn, Canterbury, Surrey Hills, Kew, Camberwell and Mont Albert. Those nearby suburbs are not separate branches.

本群是 74 Whitehorse Road, Deepdene 这一间工作室的本地会员空间。我们提供美发、Head Spa / 头皮舒适护理与皮肤护理。提供中文服务。这里不是广告板, 也不提供医疗建议。预约请走 https://mendbeauty.com.au/book。Deepdene、Balwyn、Canterbury、Surrey Hills、Kew、Camberwell、Mont Albert 是这一间工作室的来客范围, 不是分店。

### 可核实的澳洲参考

诚实说明: 多数澳洲精品沙龙的私密会员群, 在未登录检索时并没有公开索引。下面只列可以公开核实的例子, 不编造人数。

- Your Go-To Gang (https://www.facebook.com/groups/yourgotogang): 可借鉴清晰群规、品牌亲自互动和会员互答。应避免全国零售体量与高频促销。
- MECCA Chit Chat (https://www.facebook.com/groups/MECCAchitchat/): 可借鉴耐心问答与明确主持。应避免泛全国论坛化。
- BAHM! (Beauty and Hair Melbourne) (https://www.facebook.com/groups/1009128699111228/): 可借鉴墨尔本本地命名与自然求助语气。应避免招模特与广告刷屏。

## 2026 墨尔本美业趋势与 9 条双语 Facebook 群帖草稿

Draft only / 未经 Leon 明确批准不得发布

趋势依据为 2026 年澳洲公开媒体与美业报道的整理, 包括 Fashion Journal、Nine.com.au、news.com.au、Clean Beauty Market。这些不是疗效承诺。Head Spa 只作为清洁与舒适护理仪式, 不宣称生发或医疗效果。下面每一条都是 Draft only / 未经 Leon 明确批准不得发布。

### 1. 屏障优先光泽（Barrier-First Glow）

趋势 Trend: 屏障优先光泽（Barrier-First Glow）

语气 Tone: 知识科普 (Educational)

Draft only / 未经 Leon 明确批准不得发布

Glass skin had its moment on TikTok. What actually lasts in Australian weather is a calmer, barrier-first glow. That means skin that looks hydrated and comfortable, with normal texture, not a poreless filter. Chasing a crystal finish with stacked exfoliation is the opposite of current, careful skin care. At MEND Beauty Studio, 74 Whitehorse Road, Deepdene, our skin treatments are here to help your skin feel looked after, for clients from Balwyn, Kew, Canterbury and nearby as well. 提供中文服务. If you want a simple, modern skin appointment, start here when you are ready: https://mendbeauty.com.au/book

玻璃皮肤在网上火过一阵，但更适合澳洲天气、也更经得起日常的，是先把皮肤屏障照顾好的自然光泽：看起来水润、舒服，可以有正常纹理，而不是磨成滤镜里那种“没有毛孔”。用层层去角质去追水晶光，并不是现在更谨慎的护理方式。MEND Beauty Studio 在 Deepdene 的 74 Whitehorse Road，皮肤护理就是为了让皮肤被好好照顾；Balwyn、Kew、Canterbury 及附近的朋友都来这一间工作室即可。提供中文服务。想约一个简单、现时的皮肤护理，准备好了就走：https://mendbeauty.com.au/book

### 2. Bloom Skin 柔光感

趋势 Trend: Bloom Skin 柔光感

语气 Tone: 质感向往 (Aspirational)

Draft only / 未经 Leon 明确批准不得发布

The prettiest glow this year is not a wet-look highlight. It is the soft sheen of skin that looks well-rested, sometimes called "bloom skin". Think a quiet light, not a glossy pane of glass. If you live or work around Deepdene, Surrey Hills or Camberwell and want that kind of considered, modern skin moment, our skin treatments at the Whitehorse Road studio are designed as a calm in-salon pause, not a 10-step performance. 提供中文服务. Book a time that suits you: https://mendbeauty.com.au/book

今年最耐看的光泽，往往不是亮片式的水光，而是皮肤状态好时那种柔和、像刚休息够的浅光，有人称之为 bloom skin：是轻轻发光，不是一块玻璃。如果你住在或工作在 Deepdene、Surrey Hills 或 Camberwell 一带，想体验这种克制又现代的皮肤护理，欢迎来 Whitehorse Road 的工作室，它更像一段安静的到店时光，而不是十步表演。提供中文服务。适合你的时间可在这里预约：https://mendbeauty.com.au/book

### 3. 头皮护理日常化（Scalp Wellness）

趋势 Trend: 头皮护理日常化（Scalp Wellness）

语气 Tone: 知识科普 (Educational)

Draft only / 未经 Leon 明确批准不得发布

We are careful with the skin on our face, and often forget the skin under our hair. Scalp comfort has moved into everyday hair conversations in Melbourne: cleanliness, product build-up, and how the scalp feels. A Head Spa is a comfort-and-cleanse ritual, not a medical treatment, and it is not a claim to change hair loss or a health condition. If you are near Deepdene, Balwyn or Kew and curious about scalp-focused care, you will find Head Spa at the same MEND studio as our hair and skin services. 提供中文服务. Questions welcome below, or book here: https://mendbeauty.com.au/book

我们很认真地护理脸上的皮肤，却常常忘记头发下面那一层皮肤。在墨尔本，头皮舒不舒服、有没有产品堆积，已经越来越多地出现在日常美发对话里。Head Spa 是清洁与舒适的护理仪式，不是医疗项目，也不会声称能改变掉发或任何健康状况。如果你在 Deepdene、Balwyn 或 Kew 附近，想了解以头皮为中心的护理，MEND 的 Head Spa 和美发、皮肤护理在同一间工作室。提供中文服务。想先提问可以留言，想预约请走：https://mendbeauty.com.au/book

### 4. 日式/韩式 Head Spa 仪式

趋势 Trend: 日式/韩式 Head Spa 仪式

语气 Tone: 质感向往 (Aspirational)

Draft only / 未经 Leon 明确批准不得发布

Head Spa is one of the rituals Melbourne has been talking about this year: a quieter pause where the scalp is treated with the same kind of attention we usually save for a facial, with a thorough cleanse and hair that feels smoother and looks shinier when you step back onto Whitehorse Road. That is the experience, not a medical result. Our Head Spa lives at MEND Beauty Studio, 74 Whitehorse Road, Deepdene, and welcomes neighbours from Mont Albert, Canterbury and across the 5 km around us. 提供中文服务. When you want that in-salon pause: https://mendbeauty.com.au/book

Head Spa 是今年墨尔本常被提起的护理仪式：把平时给面部护理的那份专注轻轻放到头皮上，彻底清洁、安静歇一会儿，再走回 Whitehorse Road 时，头发往往摸起来更顺、看起来更有光泽。这是到店体验，不是医疗效果。MEND 的 Head Spa 就在 Deepdene 的 74 Whitehorse Road，也欢迎 Mont Albert、Canterbury 以及附近五公里的朋友前来。提供中文服务。想给自己留这段到店时光：https://mendbeauty.com.au/book

### 5. 好打理的生活感剪裁（Low-Maintenance Cuts）

趋势 Trend: 好打理的生活感剪裁（Low-Maintenance Cuts）

语气 Tone: 知识科普 (Educational)

Draft only / 未经 Leon 明确批准不得发布

The 2026 cut people keep asking for is not a style that only works on day one. Melbourne clients are leaning into softer layers, lived-in movement, and shapes that still look considered weeks later, including on a windy, humid commute through Kew or Camberwell. If that sounds like your life, our hairdressing team at the Deepdene studio can help you find a shape that fits your hair, not a rigid trend. 提供中文服务. Ready when you are: https://mendbeauty.com.au/book

2026 年很多人在找的剪裁，不是只在第一天好看的造型。墨尔本客人更偏向柔和层次、自然动感，以及几周后、甚至在 Kew 或 Camberwell 又风又湿的通勤路上，依然看起来有设计感的形状。如果这像你的日常，欢迎来 Deepdene 工作室，让美发团队一起找适合你头发、而不是硬套流行的剪裁。提供中文服务。准备好了就预约：https://mendbeauty.com.au/book

### 6. Suede 棕 / 生活妆金与光泽（Lived-In Colour & Gloss）

趋势 Trend: Suede 棕 / 生活妆金与光泽（Lived-In Colour & Gloss）

语气 Tone: 质感向往 (Aspirational)

Draft only / 未经 Leon 明确批准不得发布

The colour that looks expensive in 2026 often grows out softly: suede or mocha brunettes, sunlit lived-in blondes, and gloss-led shine, rather than a harsh line at the part. Australian stylists have been talking about colour that still looks considered between visits. If you are thinking about a richer brunette or a softer blonde, we would love to see you at MEND in Deepdene, one studio for neighbours from Balwyn, Surrey Hills and nearby. 提供中文服务. Start with a conversation and a booking: https://mendbeauty.com.au/book

2026 年看起来更有质感的发色，往往是长出来也很自然的那种：suede 或摩卡棕、阳光感的生活妆金发，以及强调光泽的 gloss，而不是分线上一条生硬的分界。澳洲造型师也在讨论“两次来店之间依然好看”的颜色。若你想试试更有层次的棕，或更柔和的金，欢迎来 Deepdene 的 MEND，Balwyn、Surrey Hills 及附近的朋友都来这一间即可。提供中文服务。想先聊聊再预约：https://mendbeauty.com.au/book

### 7. 点缀式发色（Expressive Placement Colour）

趋势 Trend: 点缀式发色（Expressive Placement Colour）

语气 Tone: 轻松互动 (Playful)

Draft only / 未经 Leon 明确批准不得发布

Not ready for a full colour overhaul? 2026 has a cheeky middle path: a ribbon of copper, a hint of pink in the fringe, or a little dimension tucked behind the ear, giving higher personality while usually staying easier to live with than a whole-head change. Tell us with a comment: copper, a soft pink moment, or "just a gloss, thank you". If you would rather talk it through in the chair, we are at 74 Whitehorse Road, Deepdene, and we 提供中文服务. Book here: https://mendbeauty.com.au/book

还不想整头大改发色？2026 年有一条更俏皮的中间路：一缕铜棕、刘海上一点柔粉，或耳后一点点层次，个性更明显，通常也比整头改变更好打理。欢迎在评论里选一个：铜棕、柔粉，还是“谢谢，先做个光泽就好”。若想坐下来慢慢聊，我们在 Deepdene 的 74 Whitehorse Road，提供中文服务。预约在这里：https://mendbeauty.com.au/book

### 8. 经得起墨尔本天气的头发（Climate-Proof Texture）

趋势 Trend: 经得起墨尔本天气的头发（Climate-Proof Texture）

语气 Tone: 轻松互动 (Playful)

Draft only / 未经 Leon 明确批准不得发布

Melbourne served four seasons before lunch again. Your hair sent a memo. The 2026 answer is less "perfect in the salon, undone by the tram", and more climate-proof texture: cuts and finishes that still look like you after wind, humidity and a sudden cool change. If you commute through Deepdene, Balwyn or Camberwell, come in for a hair appointment that respects real weather. 提供中文服务. What is your hair's personality on a true Melbourne day: frizz, flat, or surprisingly fine? Tell us below, or book: https://mendbeauty.com.au/book

墨尔本又在午饭前把四季演了一遍，头发大概先收到了通知。2026 年更实用的方向，不是“在店里完美、上了电车就散”，而是更经得起天气的质感：出了门、遇上大风、湿气和突然转凉，依然还像你。如果你经常经过 Deepdene、Balwyn 或 Camberwell，欢迎来做一次尊重真实天气的美发预约。提供中文服务。真正的墨尔本日，你的头发是蓬、塌，还是意外地还好？评论区见，或直接预约：https://mendbeauty.com.au/book

### 9. 精简护肤（Skinimalism / Clean Beauty）

趋势 Trend: 精简护肤（Skinimalism / Clean Beauty）

语气 Tone: 知识科普 (Educational)

Draft only / 未经 Leon 明确批准不得发布

The most modern skin routine might be the shortest one you actually keep. "Skinimalism" in 2026 is not neglect; it is fewer steps that earn their place: a gentle cleanse, thoughtful hydration, daily sun care, and in-salon skin treatments when you want a properly considered pause. No ten-step performance required. Visit us at MEND Beauty Studio, 74 Whitehorse Road, Deepdene, the same studio serving Kew, Mont Albert and our other neighbouring suburbs. 提供中文服务. What is the one step you would never skip? Comment below, or book a skin treatment: https://mendbeauty.com.au/book

最现代的护肤步骤，也许是你真正能坚持的那几步。2026 年的“精简护肤 / skinimalism”不是放任不管，而是每一步都有理由：温和清洁、好好补水、日常防晒，以及当你想要一段被认真对待的到店时光时，再来做皮肤护理。不必上演十步表演。欢迎来 MEND Beauty Studio，地址是 Deepdene 的 74 Whitehorse Road，Kew、Mont Albert 和附近郊区的朋友都来这一间。提供中文服务。有哪一步是你绝不会省的？欢迎留言，或预约皮肤护理：https://mendbeauty.com.au/book
