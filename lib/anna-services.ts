import {
  getCategory,
  type ServiceCategory,
  type ServiceItem,
} from "@/lib/services";

type ItemOptions = Pick<
  ServiceItem,
  | "description"
  | "descriptionZh"
  | "section"
  | "sectionZh"
  | "details"
  | "detailsZh"
  | "signature"
>;

function approvedItem(
  id: string,
  imageId: string,
  name: string,
  nameZh: string,
  price: string,
  duration: string,
  options: ItemOptions = {},
): ServiceItem {
  return {
    id,
    imageId,
    name,
    nameZh,
    price,
    duration,
    ...options,
  };
}

const legacyHair = getCategory("hair");
const legacyHeadSpa = getCategory("head-spa");
const legacySkin = getCategory("skin-facial");
const legacyBody = getCategory("body-care");
const legacyMens = getCategory("mens-grooming");
const legacyNails = getCategory("nails");
const legacySemiPermanent = getCategory("semi-permanent");

const hairAtelier: ServiceCategory = {
  slug: "hair",
  title: "Hair Atelier",
  cardTitle: "Hair Atelier",
  excerpt: "Scalp analysis, precision cutting, colour and texture design.",
  intro:
    "Approved hair and scalp assessment, precision cutting, colour and texture services.",
  image: legacyHair.image,
  imageAlt: legacyHair.imageAlt,
  items: [
    approvedItem(
      "mend-ai-scalp-analysis",
      "hair-repair-treatment",
      "MEND AI Scalp Analysis",
      "AI头皮检测分析",
      "$50",
      "20 mins",
      {
        section: "Scalp Assessment",
        sectionZh: "头皮检测",
        description:
          "Complimentary when purchasing an eligible scalp treatment.",
        descriptionZh: "购买符合条件的头皮护理项目时可免除此项费用。",
      },
    ),
    approvedItem(
      "hair-scalp-wellness-assessment",
      "premium-hair-repair-blow-dry",
      "Hair & Scalp Wellness Assessment",
      "毛囊与头皮健康评估",
      "$30",
      "20 mins",
      {
        section: "Scalp Assessment",
        sectionZh: "头皮检测",
        description:
          "Complimentary when purchasing an eligible scalp treatment.",
        descriptionZh: "购买符合条件的头皮护理项目时可免除此项费用。",
      },
    ),
    approvedItem(
      "ladies-signature-cut",
      "womens-cut-blow-dry",
      "Ladies Signature Cut",
      "女士设计剪发",
      "$75–$105",
      "45 mins",
      {
        section: "Cutting Design",
        sectionZh: "剪裁设计",
        details: [
          "Short: $75",
          "Medium: $85",
          "Long: $95",
          "Extra Long: $105",
        ],
        detailsZh: ["短发：$75", "中长发：$85", "长发：$95", "超长发：$105"],
      },
    ),
    approvedItem(
      "gentlemans-precision-cut",
      "mens-cut",
      "Gentleman’s Precision Cut",
      "男士精剪",
      "$60",
      "45 mins",
      { section: "Cutting Design", sectionZh: "剪裁设计" },
    ),
    approvedItem(
      "fringe-refresh",
      "senior-stylist-cut-blow-dry",
      "Fringe Refresh",
      "刘海修剪",
      "$20",
      "30 mins",
      { section: "Cutting Design", sectionZh: "剪裁设计" },
    ),
    approvedItem(
      "kids-signature-cut",
      "womens-cut-blow-dry",
      "Kids’ Signature Cut — Under 12",
      "儿童剪发（12岁以下）",
      "$45",
      "30 mins",
      { section: "Cutting Design", sectionZh: "剪裁设计" },
    ),
    approvedItem(
      "signature-colour",
      "global-colour",
      "Signature Colour",
      "全头染发",
      "$170–$260",
      "120 mins",
      {
        section: "Colour Design",
        sectionZh: "染发设计",
        details: [
          "Short: $170",
          "Medium: $200",
          "Long: $230",
          "Extra Long: $260",
        ],
        detailsZh: ["短发：$170", "中长发：$200", "长发：$230", "超长发：$260"],
      },
    ),
    approvedItem(
      "root-refresh",
      "root-retouch",
      "Root Refresh",
      "局部补染",
      "$130",
      "90 mins",
      { section: "Colour Design", sectionZh: "染发设计" },
    ),
    approvedItem(
      "dimension-highlights",
      "half-head-foils",
      "Dimension Highlights",
      "时尚挑染",
      "$220–$320",
      "90 mins",
      {
        section: "Colour Design",
        sectionZh: "染发设计",
        details: ["Half Head: $220", "Full Head: $320"],
        detailsZh: ["半头：$220", "全头：$320"],
      },
    ),
    approvedItem(
      "signature-balayage",
      "balayage-package",
      "Signature Balayage",
      "渐变染",
      "$350–$450",
      "90 mins",
      { section: "Colour Design", sectionZh: "染发设计" },
    ),
    approvedItem(
      "korean-soft-wave",
      "blow-wave-styling",
      "Korean Soft Wave",
      "韩式柔美烫",
      "$220–$350",
      "120 mins",
      {
        section: "Perm Design",
        sectionZh: "烫发设计",
        details: [
          "Short: $220",
          "Medium: $260",
          "Long: $300",
          "Extra Long: $350",
        ],
        detailsZh: ["短发：$220", "中长发：$260", "长发：$300", "超长发：$350"],
      },
    ),
    approvedItem(
      "classic-texture-perm",
      "event-styling",
      "Classic Texture Perm",
      "经典冷烫",
      "$180",
      "120 mins",
      { section: "Perm Design", sectionZh: "烫发设计" },
    ),
    approvedItem(
      "ladies-texture-wave",
      "blow-wave-styling",
      "Ladies Texture Wave",
      "女士纹理烫",
      "$250–$380",
      "90 mins",
      {
        section: "Perm Design",
        sectionZh: "烫发设计",
        details: [
          "Short: $250",
          "Medium: $290",
          "Long: $330",
          "Extra Long: $380",
        ],
        detailsZh: ["短发：$250", "中长发：$290", "长发：$330", "超长发：$380"],
      },
    ),
    approvedItem(
      "mens-texture-perm",
      "mens-cut",
      "Men’s Texture Perm",
      "男士纹理烫",
      "$150",
      "90 mins",
      { section: "Perm Design", sectionZh: "烫发设计" },
    ),
  ],
};

const hairScalpRecovery: ServiceCategory = {
  slug: "hair-scalp-recovery",
  title: "Hair & Scalp Recovery",
  cardTitle: "Hair & Scalp Recovery",
  excerpt: "Targeted scalp and hair-condition treatments.",
  intro:
    "Approved services focused on scalp condition, hair condition and restorative care.",
  image: legacyHeadSpa.image,
  imageAlt: legacyHeadSpa.imageAlt,
  items: [
    approvedItem(
      "scalp-detox-ritual",
      "scalp-cleansing-treatment",
      "Scalp Detox Ritual",
      "头皮净化护理",
      "$30",
      "10–15 mins",
    ),
    approvedItem(
      "hydra-scalp-ritual",
      "express-scalp-refresh",
      "Hydra Scalp Ritual",
      "水润舒缓头皮护理",
      "$88",
      "15–20 mins",
    ),
    approvedItem(
      "hair-growth-ritual",
      "scalp-health-support",
      "Hair Growth Ritual",
      "脱发焕活管理",
      "$118",
      "30–40 mins",
    ),
    approvedItem(
      "scalp-recovery-ritual",
      "scalp-health-support",
      "Scalp Recovery Ritual",
      "头皮修护管理",
      "$138",
      "30–40 mins",
    ),
    approvedItem(
      "collagen-hair-ritual",
      "hair-repair-treatment",
      "Collagen Hair Ritual",
      "胶原焕活发质护理",
      "$199",
      "45–60 mins",
    ),
    approvedItem(
      "keratin-smooth-ritual",
      "keratin-smoothing",
      "Keratin Smooth Ritual",
      "角蛋白顺滑护理",
      "$299–$429",
      "90 mins",
      {
        details: [
          "Short: $299",
          "Medium: $339",
          "Long: $379",
          "Extra Long: $429",
        ],
        detailsZh: ["短发：$299", "中长发：$339", "长发：$379", "超长发：$429"],
      },
    ),
    approvedItem(
      "glass-hair-premium-signature",
      "premium-hair-repair-blow-dry",
      "Glass Hair Premium Signature",
      "镜耀重塑护理",
      "$399–$529",
      "100 mins",
      {
        signature: true,
        description: "Includes haircut.",
        descriptionZh: "包含剪发。",
        details: [
          "Short: $399",
          "Medium: $439",
          "Long: $479",
          "Extra Long: $529",
        ],
        detailsZh: ["短发：$399", "中长发：$439", "长发：$479", "超长发：$529"],
      },
    ),
  ],
  notes: [
    "Scalp and hair services support cosmetic care and wellbeing and are not medical diagnosis or treatment.",
  ],
};

const scalpMindWellness: ServiceCategory = {
  slug: "head-spa",
  title: "Scalp & Mind Wellness",
  cardTitle: "Scalp & Mind Wellness",
  excerpt: "Immersive Head Spa and relaxation experiences.",
  intro:
    "Approved immersive Head Spa services focused on scalp care and relaxation.",
  image: "/images/head-spa-water-halo.webp",
  imageAlt:
    "Client wearing an eye mask during a professional water-halo Head Spa treatment",
  items: [
    approvedItem(
      "express-head-spa",
      "express-scalp-refresh",
      "Express Head Spa",
      "快速头疗",
      "$78",
      "30 mins",
      {
        section: "Immersive Head Spa",
        sectionZh: "沉浸式头疗 SPA",
        description:
          "Suitable for first-time Head Spa guests, as an add-on after a haircut, or for lunchtime relaxation.",
        descriptionZh: "适合首次体验头疗、剪发后加购或午间放松。",
      },
    ),
    approvedItem(
      "signature-head-spa",
      "signature-head-spa",
      "Signature Head Spa",
      "韩式经典头疗",
      "$168",
      "60 mins",
      {
        section: "Immersive Head Spa",
        sectionZh: "沉浸式头疗 SPA",
        details: [
          "Scalp assessment",
          "Deep cleansing",
          "Scalp massage",
          "Water-circulation Head Spa",
          "Serum infusion",
          "Blow-dry",
        ],
        detailsZh: ["头皮评估", "深层清洁", "头皮按摩", "水循环头疗", "精华导入", "吹干"],
      },
    ),
    approvedItem(
      "aroma-healing-head-spa",
      "premium-head-spa-ritual",
      "Aroma Healing Head Spa",
      "芳香疗愈深度睡眠头疗",
      "$248",
      "90 mins",
      {
        section: "Immersive Head Spa",
        sectionZh: "沉浸式头疗 SPA",
        description: "Includes the Signature Head Spa steps.",
        descriptionZh: "包含韩式经典头疗全部步骤。",
        details: [
          "Aromatherapy oils",
          "Neck and shoulder massage",
          "Warm compress",
          "Sleep-relaxation process",
        ],
        detailsZh: ["芳香精油", "肩颈按摩", "热敷", "睡眠放松流程"],
      },
    ),
    approvedItem(
      "mend-signature-head-ritual",
      "deluxe-head-spa-ritual",
      "MEND Signature Head Ritual",
      "MEND 招牌头部疗愈",
      "$328",
      "120 mins",
      {
        section: "Immersive Head Spa",
        sectionZh: "沉浸式头疗 SPA",
        signature: true,
        details: [
          "Scalp assessment",
          "Customised scalp treatment",
          "Neck and shoulder relaxation",
          "Hot stones",
          "Serum infusion",
          "Hair mask",
          "Aromatherapy",
          "Blow-dry and styling",
        ],
        detailsZh: [
          "头皮评估",
          "定制头皮护理",
          "肩颈放松",
          "热石护理",
          "精华导入",
          "发膜",
          "芳香疗法",
          "吹干与造型",
        ],
      },
    ),
  ],
  notes: [
    "Head Spa services support cosmetic scalp care and relaxation and do not diagnose or treat sleep or medical conditions.",
  ],
};

const skinAesthetics: ServiceCategory = {
  slug: "skin-facial",
  title: "Skin Aesthetics",
  cardTitle: "Skin Aesthetics",
  excerpt: "Korean professional skincare treatments and devices.",
  intro:
    "Approved Korean professional skincare services with factual, non-medical treatment descriptions.",
  image: legacySkin.image,
  imageAlt: legacySkin.imageAlt,
  items: [
    approvedItem(
      "skin-barrier-repair",
      "skin-barrier-repair-facial",
      "Skin Barrier Repair",
      "屏障修复管理",
      "$238",
      "75 mins",
      {
        description: "Korean professional skincare products.",
        descriptionZh: "使用韩式专业护肤产品。",
      },
    ),
    approvedItem(
      "hydra-restore",
      "express-hydration-facial",
      "Hydra Restore",
      "深层水润护理",
      "$238",
      "75 mins",
      {
        description: "Korean professional skincare products.",
        descriptionZh: "使用韩式专业护肤产品。",
      },
    ),
    approvedItem(
      "glass-glow-signature",
      "glass-skin-hydration-facial",
      "Glass Glow Signature",
      "玻璃透亮管理",
      "$438",
      "90 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "lift-firm-recovery",
      "premium-korean-glow-facial",
      "Lift & Firm Recovery",
      "抗初老提升管理",
      "$438",
      "90 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "acne-recovery",
      "deep-cleansing-facial",
      "Acne Recovery",
      "痘肌修复管理",
      "$468",
      "90 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "pigment-reset",
      "express-hydration-facial",
      "Pigment Reset",
      "钻石焕肤管理",
      "$698",
      "90 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "korean-glass-booster",
      "glass-skin-hydration-facial",
      "Korean Glass Booster",
      "韩式水光管理",
      "$698",
      "90 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "collagen-restore",
      "skin-barrier-repair-facial",
      "Collagen Restore",
      "胶原重塑管理",
      "$888",
      "100 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "advanced-aesthetics",
      "premium-korean-glow-facial",
      "Advanced Aesthetics",
      "高阶抗衰管理",
      "$2,388",
      "150 mins",
      {
        description: "Korean professional skincare products and devices.",
        descriptionZh: "使用韩式专业护肤产品与设备。",
      },
    ),
    approvedItem(
      "mend-bridal-journey",
      "korean-skin-management-facial",
      "MEND Bridal Journey",
      "新娘焕颜计划",
      "$3,888",
      "Customised three-month program",
    ),
    approvedItem(
      "mend-bio-recovery-signature",
      "facial-head-spa-package",
      "MEND Bio-Recovery Signature — Face + Scalp",
      "MEND 生物修复管理",
      "$999",
      "120 mins",
      {
        signature: true,
        description:
          "A combined face and scalp treatment designed around the client’s assessed skin and scalp needs.",
        descriptionZh: "根据顾客评估后的肌肤与头皮需要设计的面部与头皮综合护理。",
      },
    ),
  ],
  notes: [
    "Skin services are cosmetic beauty treatments. Results vary, and no medical, pigmentation-removal, injectable, exclusivity or guaranteed anti-ageing claim is made.",
  ],
};

const bodyWellness: ServiceCategory = {
  slug: "body-care",
  title: "Body Wellness",
  cardTitle: "Body Wellness",
  excerpt: "Body wellness and relaxation treatments.",
  intro:
    "Approved body wellness and relaxation services using conservative, non-medical language.",
  image: legacyBody.image,
  imageAlt: legacyBody.imageAlt,
  items: [
    approvedItem(
      "express-neck-shoulder-therapy",
      "body-care-head-spa-package",
      "Express Neck & Shoulder Therapy",
      "头肩颈舒缓",
      "$79",
      "30 mins",
      { section: "Meridian & Body Care", sectionZh: "经络与身体调理" },
    ),
    approvedItem(
      "meridian-therapy",
      "body-relaxation-treatment",
      "Meridian Therapy",
      "经络舒压调理",
      "$149",
      "60 mins",
      { section: "Meridian & Body Care", sectionZh: "经络与身体调理" },
    ),
    approvedItem(
      "qi-circulation-therapy",
      "body-scrub-hydration",
      "Qi & Circulation Therapy",
      "气血循环调理",
      "$219",
      "90 mins",
      { section: "Meridian & Body Care", sectionZh: "经络与身体调理" },
    ),
    approvedItem(
      "lymphatic-wellness-therapy",
      "korean-body-care-ritual",
      "Lymphatic Wellness Therapy",
      "全身淋巴舒缓调理",
      "$229",
      "90 mins",
      { section: "Meridian & Body Care", sectionZh: "经络与身体调理" },
    ),
    approvedItem(
      "body-reset-therapy",
      "body-scrub",
      "Body Reset Therapy",
      "身体重启调理",
      "$299",
      "120 mins",
      { section: "Meridian & Body Care", sectionZh: "经络与身体调理" },
    ),
    approvedItem(
      "express-relaxation-massage",
      "body-relaxation-treatment",
      "Express Relaxation Massage",
      "快速舒缓疗愈",
      "$79",
      "30 mins",
      { section: "Body Relaxation", sectionZh: "身体放松" },
    ),
    approvedItem(
      "aroma-healing-massage",
      "body-scrub-hydration",
      "Aroma Healing Massage",
      "芳香体疗",
      "$149",
      "60 mins",
      {
        section: "Body Relaxation",
        sectionZh: "身体放松",
        description: "Includes aromatherapy oils.",
        descriptionZh: "包含芳香精油。",
      },
    ),
    approvedItem(
      "deep-sleep-massage",
      "korean-body-care-ritual",
      "Deep Sleep Massage",
      "深度睡眠放松",
      "$219",
      "90 mins",
      {
        section: "Body Relaxation",
        sectionZh: "身体放松",
        details: [
          "Aromatherapy",
          "Sound-based relaxation",
          "Hot-stone treatment",
        ],
        detailsZh: ["芳香疗法", "声音放松", "热石护理"],
      },
    ),
    approvedItem(
      "mend-signature-body-ritual",
      "body-scrub-mini-facial",
      "MEND Signature Body Ritual",
      "MEND 招牌身体疗愈",
      "$349",
      "120 mins",
      {
        section: "Body Relaxation",
        sectionZh: "身体放松",
        signature: true,
        details: [
          "Full-body exfoliation",
          "Brightening body care",
          "Relaxation massage",
          "Hot-stone care",
          "Complete body-relaxation experience",
        ],
        detailsZh: ["全身去角质", "焕亮身体护理", "放松按摩", "热石护理", "完整身体放松体验"],
      },
    ),
  ],
  notes: [
    "Body services support relaxation and wellbeing. They do not diagnose or treat circulation disorders, insomnia or other medical conditions, and no medical detoxification claim is made.",
  ],
};

const nailsIds = [
  "classic-manicure",
  "gel-manicure",
  "classic-pedicure",
  "gel-pedicure",
  "nail-art",
  "nail-removal",
];

const semiPermanentIds = [
  "semi-permanent-consultation",
  "powder-ombre-brows",
  "combination-brows",
  "lip-blush",
  "lip-blush-touch-up",
  "lash-line-enhancement",
  "eyeliner-tattoo",
  "semi-permanent-touch-up",
  "annual-refresh",
];

const nailsSemiPermanent: ServiceCategory = {
  slug: "nails-semi-permanent",
  title: "Nails & Semi-Permanent Beauty",
  cardTitle: "Nails & Semi-Permanent Beauty",
  excerpt:
    "Existing nail services and consultation-led semi-permanent beauty.",
  intro:
    "The studio’s existing nail and semi-permanent beauty services, preserved with their current prices and booking requirements.",
  image: legacyNails.image,
  imageAlt: legacyNails.imageAlt,
  items: legacyNails.items.map((item, index) => ({
    ...item,
    id: nailsIds[index],
    imageId: nailsIds[index],
    section: "Nails",
    sectionZh: "美甲",
  })),
  secondaryTitle: "Semi-Permanent Beauty",
  secondaryItems: legacySemiPermanent.items.map((item, index) => ({
    ...item,
    id: semiPermanentIds[index],
    imageId: semiPermanentIds[index],
    section: "Semi-Permanent Beauty",
    sectionZh: "半永久美容",
  })),
  notes: [
    ...(legacyNails.notes ?? []),
    ...(legacySemiPermanent.notes ?? []),
  ],
};

export const annaServiceCategories: ServiceCategory[] = [
  hairAtelier,
  hairScalpRecovery,
  scalpMindWellness,
  skinAesthetics,
  bodyWellness,
  legacyMens,
  legacyNails,
  legacySemiPermanent,
];

const annaServiceDetailCategories = [
  ...annaServiceCategories,
  nailsSemiPermanent,
];

export const annaServiceSlugs = new Set(
  annaServiceDetailCategories.map((category) => category.slug),
);

export function getAnnaCategory(slug: string): ServiceCategory {
  const category = annaServiceDetailCategories.find(
    (entry) => entry.slug === slug,
  );
  if (!category) throw new Error(`Unknown Anna service category: ${slug}`);
  return category;
}

export const annaServiceCount = annaServiceCategories.reduce(
  (total, category) =>
    total + category.items.length + (category.secondaryItems?.length ?? 0),
  0,
);
