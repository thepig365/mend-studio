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
      { en: "1 × 75-min Korean Classic Head Spa", zh: "1次75mins韩式经典头疗" },
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
      { en: "1 × 30-min Korean Glass-Skin Peel", zh: "1次30mins韩国水光焕肤酸疗" },
      { en: "1 × 75-min Korean Classic Head Spa", zh: "1次75mins韩式经典头疗" },
      { en: "1 × 75-min Korean Manual Facial Sculpting", zh: "1次75mins韩式徒手小颜护理" },
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
      { en: "1 × 75-min Hair-Loss Revitalising Treatment", zh: "1次75mins脱发焕活护理" },
      { en: "1 × 90-min Korean Aqua-Glow Treatment", zh: "1次90mins韩式水光炸弹管理" },
      { en: "1 × 120-min Full-Body Fat-Burning Mind & Body Reset", zh: "1次120mins全身燃脂身心重启管理" },
    ],
  },
] as const;

export const membershipReviewItems = {
  en: [
    "Premium gift: the membership poster says the Korean glass-skin peel is 30 minutes; the skin menu says 20 minutes.",
    "Royal gift: the membership poster says the hair-growth ritual is 75 minutes; the scalp menu says 90 minutes.",
    "The 75-minute Korean classic head-spa gift has no exact published menu-name match; its implied value also differs by $1 from the 75-minute scalp treatments.",
    "Expiry, refunds, sharing, discount stacking, eligible services and exclusions have not been supplied.",
  ],
  zh: [
    "臻享会员赠礼：会员海报中的韩国水光焕肤酸疗为 30 分钟，肌肤菜单为 20 分钟。",
    "至臻会员赠礼：会员海报中的脱发焕活护理为 75 分钟，头皮菜单为 90 分钟。",
    "75 分钟韩式经典头疗在现有菜单中没有完全一致的名称；按赠礼总值推算，与 75 分钟头皮护理项目还存在 A$1 差异。",
    "有效期、退款、共享、优惠叠加、适用项目及排除项目尚未提供。",
  ],
} as const;
