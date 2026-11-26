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

