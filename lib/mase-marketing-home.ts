// Name reference only. These nine labels appear on the MaSe marketing home.
// Configuration, cost, entitlement, sending and automation are not confirmed here.
// The stable status key stays "unverified" until a person confirms the row in MaSe.

export const maseCapabilityStatus = "unverified" as const;

export type MaseCapabilityStatus = typeof maseCapabilityStatus;

export const maseMarketingHome = [
  {
    id: "sms",
    status: maseCapabilityStatus,
    name: { en: "SMS", zh: "短信" },
    confirm: {
      en: "Before any SMS is sent, confirm configuration, cost, consent and opt-out in MaSe.",
      zh: "发送任何短信之前，须在 MaSe 确认配置、费用、同意和退订。",
    },
  },
  {
    id: "email",
    status: maseCapabilityStatus,
    name: { en: "Email", zh: "邮件" },
    confirm: {
      en: "Configuration, cost, consent and opt-out remain unconfirmed and are not sufficient on their own. Before each email is sent, show the owner the full recipient list, subject, body and attachments, and obtain the owner's explicit approval for that specific email.",
      zh: "配置、费用、同意和退订仍未确认，仅有这些并不够。发送每一封邮件之前，须向店主展示完整收件人名单、主题、正文和附件，并取得店主对该封具体邮件的明确批准。",
    },
  },
  {
    id: "whatsapp",
    status: maseCapabilityStatus,
    name: { en: "WhatsApp", zh: "WhatsApp" },
    confirm: {
      en: "The WhatsApp account, templates and permissions have not been confirmed.",
      zh: "WhatsApp 账号、消息模板和权限尚未确认。",
    },
  },
  {
    id: "wechat",
    status: maseCapabilityStatus,
    name: { en: "WeChat", zh: "微信" },
    confirm: {
      en: "The WeChat channel type and account have not been confirmed. This row is WeChat, not Xiaohongshu, and it is separate from the website contact method.",
      zh: "微信的渠道类型和账号尚未确认。此项是微信，不是小红书，也与官网联系方式无关。",
    },
  },
  {
    id: "promotions",
    status: maseCapabilityStatus,
    name: { en: "Promotions and activities", zh: "促销与活动" },
    confirm: {
      en: "Eligibility, expiry, stacking and capacity have not been confirmed.",
      zh: "适用条件、有效期、可否叠加和接待容量尚未确认。",
    },
  },
  {
    id: "smart-pricing",
    status: maseCapabilityStatus,
    name: { en: "Smart pricing", zh: "智能定价" },
    confirm: {
      en: "The pricing algorithm, permissions and cost have not been confirmed. This portal does not change prices.",
      zh: "定价算法、权限和费用尚未确认。本工作台不修改价格。",
    },
  },
  {
    id: "loyalty",
    status: maseCapabilityStatus,
    name: { en: "Customer loyalty", zh: "客户忠诚度" },
    confirm: {
      en: "Whether a customer-loyalty rule applies has not been confirmed.",
      zh: "是否存在适用的客户忠诚度规则，尚未确认。",
    },
  },
  {
    id: "points",
    status: maseCapabilityStatus,
    name: { en: "Points", zh: "积分" },
    confirm: {
      en: "Accrual, redemption and expiry have not been confirmed.",
      zh: "积分累计、兑换和到期规则尚未确认。",
    },
  },
  {
    id: "membership-tiers",
    status: maseCapabilityStatus,
    name: { en: "Membership tiers", zh: "会员等级" },
    confirm: {
      en: "Benefits, thresholds, and any relation to prepaid memberships have not been confirmed.",
      zh: "权益、门槛，以及与预付会员的关系，尚未确认。",
    },
  },
] as const;

export const maseMarketingHomeCopy = {
  heading: { en: "MaSe marketing-home reference", zh: "MaSe 营销首页对照" },
  intro: {
    en: "Nine labels from the MaSe marketing home. Configuration, cost, entitlement, sending and automation have not been confirmed here for any label.",
    zh: "以下九个名称来自 MaSe 营销首页。各项的配置、费用、使用权、发送和自动执行，都尚未在此确认。",
  },
  scope: {
    en: "This is a static bilingual reference. It is not a running integration and not an editable evidence tracker.",
    zh: "这是一份静态的中英对照说明，不是正在运行的集成，也不是可编辑的证据记录。",
  },
  status: { en: "Unverified — pending confirmation", zh: "未核实——待确认" },
  ownership: {
    en: "MaSe remains responsible for sending, price rules, points and tiers. This portal is for planning, evidence and human approval. It is not another customer-record system.",
    zh: "发送、价格规则、积分和等级仍由 MaSe 负责。本工作台只用于计划、证据和人工批准，不是另一套客户资料系统。",
  },
  next: {
    en: "Next action: an authorised MaSe administrator confirms the row in MaSe. This portal does not send messages, change prices, or alter points or tiers.",
    zh: "下一步：由获授权的 MaSe 管理员在 MaSe 内确认。本工作台不发送消息、不修改价格，也不改动积分或等级。",
  },
} as const;
