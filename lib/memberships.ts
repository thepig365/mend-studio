export const membershipTiers = [
  {
    id: "starter",
    name: "Starter",
    nameZh: "尝新会员",
    topUp: 999,
    bonus: 100,
    bonusPercent: 10,
    giftedValue: 100,
    gifts: [
      { en: "1 scalp analysis", zh: "1次头皮检测" },
      { en: "1 skin analysis", zh: "1次皮肤检测" },
    ],
  },
  {
    id: "enjoy",
    name: "Enjoy",
    nameZh: "悦享会员",
    topUp: 2000,
    bonus: 268,
    bonusPercent: 13,
    giftedValue: 248,
    gifts: [
      { en: "1 scalp analysis", zh: "1次头皮检测" },
      { en: "1 × Korean Classic Head Spa", zh: "1次韩式经典头疗" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    nameZh: "臻享会员",
    topUp: 5000,
    bonus: 788,
    bonusPercent: 16,
    giftedValue: 515,
    gifts: [
      { en: "1 scalp analysis", zh: "1次头皮检测" },
      { en: "1 × Korean Glass-Skin Peel", zh: "1次韩国水光焕肤酸疗" },
      { en: "1 × Korean Classic Head Spa", zh: "1次韩式经典头疗" },
      { en: "1 × Korean Manual Facial Sculpting", zh: "1次韩式徒手小颜V脸管理" },
    ],
  },
  {
    id: "royal",
    name: "Royal",
    nameZh: "至臻会员",
    topUp: 10000,
    bonus: 1999,
    bonusPercent: 20,
    giftedValue: 985,
    gifts: [
      { en: "1 scalp analysis + 1 skin analysis", zh: "1次头皮检测 + 1次皮肤检测" },
      { en: "1 × Hair-Loss Revitalising Treatment", zh: "1次脱发焕活护理" },
      { en: "1 × Korean Aqua-Glow Treatment", zh: "1次韩式水光炸弹管理" },
      { en: "1 × Full-Body Skin Renewal & Mind–Body Reset", zh: "1次全身焕肤身心重启管理" },
    ],
  },
] as const;

export const membershipTerms = [
  { en: "Validity", zh: "有效期", bodyEn: "Top-up credit, bonus credit and gifted items are valid for 2 years from the top-up date.", bodyZh: "充值金额、赠送金额及会员赠礼，自充值日起2年内有效。" },
  { en: "Refunds & sharing", zh: "退款／共享", bodyEn: "Top-ups are non-refundable. Account balances can be transferred or shared with family members.", bodyZh: "会员充值不可退款；账户余额可转让或与家庭成员共享。" },
  { en: "Using your balance", zh: "余额使用", bodyEn: "Top-up and bonus credit are combined in one account balance, with no usage order. Available for all services and products.", bodyZh: "充值金额与赠送金额合并为会员账户余额，无使用先后顺序，可用于全店服务项目及产品消费。" },
  { en: "Service & package pricing", zh: "消费及套餐规则", bodyEn: "Services paid from membership balances are charged at single-treatment prices. Package prices and other member discounts cannot be combined.", bodyZh: "使用会员余额消费时，服务项目按单次项目价格扣除；不可同时叠加套餐价格及其他会员优惠。" },
  { en: "Birthday-month benefit", zh: "生日礼遇7折", bodyEn: "Enjoy 30% off one service during your birthday month, with no service or amount limit. Cannot be combined with other member discounts or promotions.", bodyZh: "生日当月可享任意一项服务7折，项目及金额不限；不可与会员优惠或其他优惠同时使用。" },
  { en: "Gifted items", zh: "会员赠礼", bodyEn: "Gifted items are fixed and cannot be exchanged or converted to cash. Please contact the studio if you need to postpone a gifted service.", bodyZh: "会员赠礼为指定项目，不可更换或折现；如需延期，欢迎联系门店协助。" },
] as const;
