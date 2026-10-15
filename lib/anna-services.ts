import { getCategory, type ServiceCategory, type ServiceItem } from "@/lib/services";

type ItemOptions = Pick<ServiceItem, "description" | "descriptionZh" | "section" | "sectionZh" | "details" | "detailsZh" | "signature" | "hideImage">;

function item(id: string, imageId: string, name: string, nameZh: string, price: string, duration?: string, options: ItemOptions = {}): ServiceItem {
  return { id, imageId, name, nameZh, price, duration, ...options };
}

const legacyHair = getCategory("hair");
const legacyHeadSpa = getCategory("head-spa");
const legacySkin = getCategory("skin-facial");
const legacyBody = getCategory("body-care");
const legacyMens = getCategory("mens-grooming");
const legacyNails = getCategory("nails");
const legacySemiPermanent = getCategory("semi-permanent");

const assessmentItems: ServiceItem[] = [
  item("mend-ai-scalp-analysis", "hair-consultation", "MEND AI Scalp Analysis", "AI头皮检测分析", "$50", undefined, { section: "Scalp Analysis", sectionZh: "头皮检测" }),
  item("hair-scalp-wellness-assessment", "hair-consultation", "Hair & Scalp Wellness Assessment", "毛囊健康评估", "$50", undefined, { section: "Scalp Analysis", sectionZh: "头皮检测" }),
];

const scalpCareItems: ServiceItem[] = [
  item("hydra-hair-ritual", "hair-repair-treatment", "Hydra Hair Ritual", "水润舒缓发质护理", "$150"),
  item("dandruff-control-ritual", "scalp-cleansing-treatment", "Dandruff Control Ritual", "头屑净化护理", "$199"),
  item("sensitive-scalp-care-ritual", "scalp-health-support", "Sensitive Scalp Care Ritual", "敏感头皮舒缓护理", "$199"),
  item("oily-scalp-balancing-ritual", "scalp-cleansing-treatment", "Oily Scalp Balancing Ritual", "油性头皮平衡护理", "$199"),
  item("hair-loss-care-ritual", "scalp-health-support", "Hair Loss Care Ritual", "防脱强韧头皮护理", "$199"),
  item("scalp-detox-ritual", "scalp-cleansing-treatment", "Scalp Detox Ritual", "头皮毛孔净化", "$58", undefined, { section: "Add On", sectionZh: "加购项目" }),
];

const hairAtelier: ServiceCategory = {
  slug: "hair", title: "Hair Atelier", cardTitle: "Hair Atelier",
  excerpt: "Scalp analysis, precision cutting, colour, texture and hair rituals.",
  intro: "Discover personalised cuts, colour, styling and care for your hair and scalp.",
  image: legacyHair.image, imageAlt: legacyHair.imageAlt,
  items: [
    ...assessmentItems,
    item("wash-blow-dry", "blow-wave-styling", "Wash & Blow Dry", "洗发造型", "From $55", undefined, { section: "Styling", sectionZh: "造型服务" }),
    item("wash-curls", "curl-styling", "Wash & Curls", "洗发卷发造型", "From $65", undefined, { section: "Styling", sectionZh: "造型服务" }),
    item("ladies-signature-cut", "ladies-scissor-cut", "Ladies Signature Cut", "女士设计剪发", "From $75", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("gentlemans-precision-cut", "mens-cut", "Gentleman’s Precision Cut", "男士精剪", "From $55", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("fringe-refresh", "ladies-scissor-cut", "Fringe Refresh", "刘海修剪", "From $25", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("kids-signature-cut", "child-haircut", "Kid Signature Cut — 0–2 Years", "儿童剪发（0–2岁）", "$45", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("kids-cut-three-plus", "child-haircut", "Kid Signature Cut — Ages 3–11", "儿童剪发（3岁及以上，12岁以下）", "From $50", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("signature-colour", "global-colour", "Signature Colour", "全头染发", "From $180", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("root-refresh", "global-colour", "Root Refresh", "局部补染", "From $130", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("quarter-head-foils", "half-head-foils", "Dimension Highlights — ¼ Head Foils", "时尚挑染 · ¼头挑染", "$120", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("half-head-foils-menu", "half-head-foils", "Dimension Highlights — Half Head Foils", "时尚挑染 · 半头挑染", "$150", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("full-head-foils-menu", "half-head-foils", "Dimension Highlights — Full Head Foils", "时尚挑染 · 全头挑染", "$250", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("signature-balayage", "balayage-package", "Signature Balayage", "渐变染", "From $350", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("classic-texture-perm", "roller-styling", "Classic Cold Perm", "经典冷烫", "From $250", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("korean-soft-wave", "roller-styling", "Korean Soft Wave", "韩式柔感烫", "From $280", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("mens-texture-perm", "mens-curl-inspiration", "Men’s Digital Perm", "男士数码烫", "From $180", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("ladies-texture-wave", "roller-styling", "Ladies Digital Perm", "女士数码烫", "From $300", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("keratin-smooth-ritual", "keratin-smoothing", "Keratin Smooth Ritual", "角蛋白顺滑护理", "From $299", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("permanent-straightening", "keratin-smoothing", "Permanent Straightening", "女士离子烫", "From $388", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    ...scalpCareItems.filter((entry) => entry.id !== "scalp-detox-ritual").map((entry) => ({ ...entry, section: "Scalp & Hair Ritual", sectionZh: "头皮发质健康管理系列" })),
    item("glass-hair-premium-signature", "premium-hair-repair-blow-dry", "Glass Hair Premium Signature", "头皮至发梢焕新护理（含剪发）", "$399–$599", "120 mins", { section: "MEND Signature", sectionZh: "MEND 招牌项目", signature: true, details: ["Scalp care", "Hair treatment", "Signature cut", "Premium experience"], detailsZh: ["头皮护理", "发质护理", "设计剪发", "尊享体验"] }),
    scalpCareItems.find((entry) => entry.id === "scalp-detox-ritual")!,
  ],
};

const scalpMindWellness: ServiceCategory = {
  slug: "head-spa", title: "Scalp & Mind Wellness", cardTitle: "Scalp & Mind Wellness",
  excerpt: "Four head-spa rituals for scalp care and deep relaxation.",
  intro: "Unwind with cleansing, massage and a head-spa ritual tailored to your time.",
  image: "/images/head-spa-water-halo.webp", imageAlt: legacyHeadSpa.imageAlt,
  items: [
    item("express-head-spa", "express-scalp-refresh", "Express Head Spa", "快速头疗", "$78", "30 mins", { description: "A refreshing first experience, haircut add-on or lunchtime pause.", descriptionZh: "适合第一次体验、洗剪后加购或午休放松。" }),
    item("korean-signature-head-spa", "signature-head-spa", "Korean Signature Head Spa", "韩式经典头疗", "$198", "75 mins", { details: ["Deep scalp cleansing", "Head massage", "Neck and shoulder massage", "Water-circulation head spa"], detailsZh: ["头皮深层清洁", "头部按摩", "肩颈按摩", "水循环头疗"] }),
    item("aroma-healing-head-spa", "premium-head-spa-ritual", "Aroma Healing Head Spa", "芳香疗愈深度睡眠头疗", "$268", "90 mins", { description: "Includes the Korean Signature Head Spa ritual.", descriptionZh: "在韩式经典头疗基础上升级。", details: ["Aromatherapy oils", "Scalp essence infusion", "Neck and shoulder gua sha", "Warm compresses and relaxation ritual"], detailsZh: ["芳香精油", "头皮精华导入", "肩颈刮痧", "热敷与睡眠放松流程"] }),
    item("mend-signature-head-ritual", "deluxe-head-spa-ritual", "MEND Signature Head Ritual", "MEND臻选头疗", "$398", "120 mins", { signature: true, description: "Builds on the Aroma Healing Head Spa.", descriptionZh: "在芳香疗愈头疗基础上升级。", details: ["Hot stone therapy", "Scalp ampoule infusion", "Warm hair-mask treatment", "Infrared scalp care", "Aromatherapy", "Blow-dry styling"], detailsZh: ["热石护理", "头皮安瓶导入", "热敷护发", "红外线头皮护理", "芳疗", "吹造型"] }),
  ],
  notes: ["These are cosmetic scalp-care and relaxation services, not medical diagnosis or treatment. Results vary."],
};

const skinAesthetics: ServiceCategory = {
  slug: "skin-facial", title: "Skin Aesthetics", cardTitle: "Skin Aesthetics",
  excerpt: "Essential facials, skin-care add-ons and seven customised programs.",
  intro: "Restore, replenish and refresh with the MEND Skin Collection, from essential facials to personalised programs.",
  image: legacySkin.image, imageAlt: legacySkin.imageAlt,
  items: [
    item("mend-skin-reset-treatment", "skin-barrier-repair-facial", "MEND Skin Reset Treatment", "修复护理", "$168", "60 mins", { section: "Cellular Reset & Recovery", sectionZh: "修复护理" }),
    item("korean-facial-sculpting", "manual-facial-massage", "Korean Facial Sculpting", "韩式徒手小颜V脸管理", "$198", "75 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("cellular-reset-recovery", "skin-barrier-repair-facial", "Cellular Reset & Recovery", "多效修复重启管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("water-bomb-restore", "express-hydration-facial", "Water Bomb Restore", "韩式水光炸弹管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("collagen-c-radiance", "glass-skin-hydration-facial", "Collagen C Radiance", "胶原VC焕亮管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("age-defy-renewal", "premium-korean-glow-facial", "Age Defy Renewal", "光采紧致焕活管理", "$398", "100 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("diamond-rejuvenation", "deep-cleansing-facial", "7 Days — Diamond Rejuvenation", "7天钻石焕肤再生管理", "$498", "75 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("lhala-glass-skin-peel", "glass-skin-hydration-facial", "LHALA Glass Skin Peel", "韩国水光焕肤酸疗", "$69", "20 mins", { section: "Add On", sectionZh: "护理加项" }),
    item("facial-moxibustion-ritual", "facial-moxibustion-ritual", "Facial Moxibustion Ritual", "脸部桃花灸", "$69", "30 mins", { section: "Add On", sectionZh: "护理加项" }),
    item("radiance-eye-renewal", "eye-patch-care", "Radiance Eye Renewal Ritual", "眼部护理", "$69", "30 mins", { section: "Add On", sectionZh: "护理加项" }),
    item("neck-renewal-care", "neck-massage-care", "Neck Renewal Care", "颈部护理", "$69", "30 mins", { section: "Add On", sectionZh: "护理加项" }),
    item("signature-facial-program", "deep-cleansing-facial", "Signature Facial Program", "定制修护面部护理计划", "$1299", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", description: "6 sessions of personalised facial care.", descriptionZh: "6次套餐 · 定制功效型护理方案", details: ["Deep cleansing", "Targeted treatment", "Barrier care"], detailsZh: ["深层清洁", "定制护理", "修复养护"] }),
    item("collagen-renewal-program", "premium-korean-glow-facial", "Collagen Renewal Program", "胶原抗衰计划", "$1399", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", details: ["1 NIR session", "1 collagen essence treatment", "2 AXERRO sessions"], detailsZh: ["1次NIR", "1次胶原原液管理", "2次AXERRO"] }),
    item("acne-reset-program", "deep-cleansing-facial", "Acne Reset Program", "痘肌净化计划", "$2339", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", details: ["4 P198 sessions", "4 recovery treatments"], detailsZh: ["4次P198", "4次修复护理"] }),
    item("pigment-reset-program", "korean-skin-management-facial", "Pigment Reset Program", "色素净肤计划", "$1999", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", details: ["4 DPL sessions", "4 LHALA sessions"], detailsZh: ["4次DPL", "4次LHALA"] }),
    item("glass-skin-program", "glass-skin-hydration-facial", "Glass Skin Program", "水光肌焕肤计划", "$2699", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", details: ["4 skin-booster sessions", "4 recovery treatments"], detailsZh: ["4次水光针", "4次修复护理"] }),
    item("age-defying-program", "premium-korean-glow-facial", "Age-Defying Program", "高阶年轻化计划", "$3599", undefined, { section: "Customised Programs", sectionZh: "定制疗程系列", description: "6-in-1 personalised program. Full treatment plan arranged at consultation.", descriptionZh: "6合1套餐 · 具体护理安排于咨询时定制。", details: ["Skin boosters", "NIR", "DPL", "New Double", "Recovery care"], detailsZh: ["水光针", "NIR", "DPL", "New Double", "修复护理"] }),
    item("mend-bridal-journey", "premium-korean-glow-facial", "MEND Bridal Journey", "新娘焕颜计划", "$4999", "3 months / 90 days", { section: "Customised Programs", sectionZh: "定制疗程系列", signature: true, description: "A personalised face-to-body bridal care journey.", descriptionZh: "90天私人定制，从头到尾的专属新娘护理方案。", details: ["Skin programs", "Energy treatments", "Skin boosters", "Contour sculpting"], detailsZh: ["肌肤管理", "光电护理", "水光焕肤", "轮廓管理"] }),
  ],
  notes: ["Treatments are tailored after consultation. Individual results vary."],
};

const bodyWellness: ServiceCategory = {
  slug: "body-care", title: "Eastern Wellness & Therapy", cardTitle: "Eastern Wellness & Therapy",
  excerpt: "Body therapy and signature relaxation massage.",
  intro: "Find your moment of calm with body therapy, aromatherapy and signature massage rituals.",
  image: legacyBody.image, imageAlt: legacyBody.imageAlt,
  items: [
    item("express-neck-shoulder-therapy", "neck-massage-care", "Express Neck & Shoulder Therapy", "头肩颈舒缓", "$88", "30 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("meridian-therapy", "body-relaxation-treatment", "Meridian Therapy", "经络调理", "$168", "60 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("circulation-therapy", "body-scrub-hydration", "Circulation Therapy", "气血循环调理", "$268", "90 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("lymphatic-detox-therapy", "body-relaxation-treatment", "Lymphatic Detox Therapy", "全身淋巴排毒调理", "$268", "90 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("express-relaxation-massage", "body-relaxation-treatment", "Express Relaxation Massage", "快速舒缓按摩", "$88", "30 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("aroma-healing-massage", "body-scrub-hydration", "Aroma Healing Massage", "芳香舒缓按摩", "$168", "60 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("deep-sleep-massage", "relaxation-massage-care", "Deep Sleep Massage", "深度睡眠疗愈", "$268", "90 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("mend-signature-body-ritual", "body-scrub-hydration", "MEND Signature Body Ritual", "全身焕活身心能量管理", "$348", "120 mins", { section: "Signature Massage", sectionZh: "特色按摩", signature: true }),
  ],
  notes: ["Body services support relaxation and wellbeing. They do not diagnose or treat circulation disorders, sleep conditions or other medical concerns; ‘detox’ is retained only as the poster’s service name and is not a medical claim."],
};

const hairReduction: ServiceCategory = {
  slug: "hair-reduction", title: "Hair Reduction", cardTitle: "Hair Reduction",
  excerpt: "Single-session and six-session hair-reduction pricing.",
  intro: "Explore hair reduction by area, with single sessions and courses of six.",
  image: "/images/services/laser-equipment.png", imageAlt: "Illustrative laser hair-reduction equipment",
  items: [
    item("hair-reduction-upper-lip", "hair-reduction-upper-lip", "Upper Lip", "唇部", "$39 single · $199 / 6 sessions", "15 mins"),
    item("hair-reduction-underarms", "hair-reduction-underarms", "Underarms", "腋下", "$59 single · $299 / 6 sessions", "15 mins"),
    item("hair-reduction-full-face", "hair-reduction-full-face", "Full Face", "全脸", "$99 single · $499 / 6 sessions", "30 mins"),
    item("hair-reduction-half-arms-lower-legs", "hair-reduction-half-arms-lower-legs", "Arms (Half) / Legs (Half)", "半手臂／半腿", "$119 single · $599 / 6 sessions", "45 mins"),
    item("hair-reduction-bikini-line", "hair-reduction-bikini", "Bikini Line", "比基尼线", "$119 single · $599 / 6 sessions", "30 mins"),
    item("hair-reduction-full-arms-legs", "hair-reduction-full-arms-legs", "Arms (Full) / Legs (Full)", "全手臂／全腿", "$139 single · $699 / 6 sessions", "60 mins"),
    item("hair-reduction-full-back", "hair-reduction-back", "Full Back", "全后背", "$139 single · $699 / 6 sessions", "60 mins"),
  ],
  notes: ["Suitability, contraindications and expected results must be discussed before treatment. No universal suitability or guaranteed outcome is promised."],
};

const hairScalpRecovery: ServiceCategory = { ...hairAtelier, items: [...assessmentItems, ...scalpCareItems], slug: "hair-scalp-recovery", title: "Hair & Scalp Recovery", cardTitle: "Hair & Scalp Recovery" };
const nailsIds = ["classic-manicure", "gel-manicure", "classic-pedicure", "gel-pedicure", "nail-art", "nail-removal"];
const semiPermanentIds = ["semi-permanent-consultation", "powder-ombre-brows", "combination-brows", "lip-blush", "lip-blush-touch-up", "lash-line-enhancement", "eyeliner-tattoo", "semi-permanent-touch-up", "annual-refresh"];
const nailsSemiPermanent: ServiceCategory = {
  slug: "nails-semi-permanent", title: "Nails & Semi-Permanent Beauty", cardTitle: "Nails & Semi-Permanent Beauty",
  excerpt: "Existing nail services and consultation-led semi-permanent beauty.",
  intro: "The studio’s existing nail and semi-permanent beauty services, preserved with their current prices and booking requirements.",
  image: legacyNails.image, imageAlt: legacyNails.imageAlt,
  items: legacyNails.items.map((entry, index) => ({ ...entry, id: nailsIds[index], imageId: nailsIds[index], section: "Nails", sectionZh: "美甲" })),
  secondaryTitle: "Semi-Permanent Beauty",
  secondaryItems: legacySemiPermanent.items.map((entry, index) => ({ ...entry, id: semiPermanentIds[index], imageId: semiPermanentIds[index], section: "Semi-Permanent Beauty", sectionZh: "半永久美容" })),
  notes: [...(legacyNails.notes ?? []), ...(legacySemiPermanent.notes ?? [])],
};

export const annaServiceCategories: ServiceCategory[] = [hairAtelier, skinAesthetics, scalpMindWellness, bodyWellness, hairReduction, legacyMens, legacyNails, legacySemiPermanent];
const detailCategories = [...annaServiceCategories, hairScalpRecovery, nailsSemiPermanent];
export const annaServiceSlugs = new Set(detailCategories.map((category) => category.slug));
export function getAnnaCategory(slug: string): ServiceCategory {
  const category = detailCategories.find((entry) => entry.slug === slug);
  if (!category) throw new Error(`Unknown Anna service category: ${slug}`);
  return category;
}
export const annaServiceCount = annaServiceCategories.reduce((total, category) => total + category.items.length + (category.secondaryItems?.length ?? 0), 0);
