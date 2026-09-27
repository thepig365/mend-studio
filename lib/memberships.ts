export const membershipTiers = [
  { id: "starter", name: "Starter", nameZh: "尝新会员", topUp: 999, bonus: 100, giftedValue: 100 },
  { id: "enjoy", name: "Enjoy", nameZh: "悦享会员", topUp: 2000, bonus: 268, giftedValue: 248 },
  { id: "premium", name: "Premium", nameZh: "臻享会员", topUp: 5000, bonus: 788, giftedValue: 515 },
  { id: "royal", name: "Royal", nameZh: "至臻会员", topUp: 10000, bonus: 1999, giftedValue: 985 },
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
