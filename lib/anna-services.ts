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
  item("mend-ai-scalp-analysis", "hair-repair-treatment", "MEND AI Scalp Analysis", "AI头皮检测分析", "$50", "20 mins", { section: "Scalp Analysis", sectionZh: "头皮检测" }),
  item("hair-scalp-wellness-assessment", "premium-hair-repair-blow-dry", "Hair & Scalp Wellness Assessment", "毛囊健康评估", "$30", "20 mins", { section: "Scalp Analysis", sectionZh: "头皮检测" }),
];

const scalpCareItems: ServiceItem[] = [
  item("hydra-scalp-ritual", "express-scalp-refresh", "Hydra Scalp Ritual", "水润舒缓头皮护理", "$88", "45 mins", { section: "Scalp Care Rituals", sectionZh: "头皮护理疗程" }),
  item("scalp-recovery-ritual", "scalp-health-support", "Scalp Recovery Ritual", "头皮修护护理", "$199", "75 mins", { section: "Scalp Care Rituals", sectionZh: "头皮护理疗程" }),
  item("collagen-hair-ritual", "hair-repair-treatment", "Collagen Hair Ritual", "胶原焕活发质护理", "$199", "75 mins", { section: "Scalp Care Rituals", sectionZh: "头皮护理疗程" }),
  item("hair-growth-ritual", "scalp-health-support", "Hair Growth Ritual", "脱发焕活护理", "$269", "90 mins", { section: "Scalp Care Rituals", sectionZh: "头皮护理疗程" }),
  item("scalp-detox-ritual", "scalp-cleansing-treatment", "Scalp Detox Ritual", "头皮毛孔净化", "$30", "15 mins", { section: "Add On", sectionZh: "加购项目" }),
];

const hairAtelier: ServiceCategory = {
  slug: "hair", title: "Hair Atelier", cardTitle: "Hair Atelier",
  excerpt: "Scalp analysis, precision cutting, colour, texture and hair rituals.",
  intro: "The supplied Hair Atelier menu, presented as readable service and price information. Hair-service durations not shown on the poster are left unstated.",
  image: legacyHair.image, imageAlt: legacyHair.imageAlt,
  items: [
    ...assessmentItems,
    item("ladies-signature-cut", "womens-cut-blow-dry", "Ladies Signature Cut", "女士设计剪发", "$75–$105", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("gentlemans-precision-cut", "mens-cut", "Gentleman’s Precision Cut", "男士精剪", "$65", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("fringe-refresh", "senior-stylist-cut-blow-dry", "Fringe Refresh", "刘海修剪", "$20", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("kids-signature-cut", "womens-cut-blow-dry", "Kid Signature Cut (Under 12)", "儿童剪发（12岁以下）", "$45", undefined, { section: "Hair Cut", sectionZh: "剪裁设计" }),
    item("signature-colour", "global-colour", "Signature Colour", "全头染发", "From $180", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("root-refresh", "root-retouch", "Root Refresh", "局部补染", "$138", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("dimension-highlights", "half-head-foils", "Dimension Highlights", "时尚挑染", "From $260", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("signature-balayage", "balayage-package", "Signature Balayage", "渐变染", "From $350", undefined, { section: "Colour", sectionZh: "染发设计" }),
    item("classic-texture-perm", "event-styling", "Classic Texture Perm", "经典冷烫", "From $230", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("korean-soft-wave", "blow-wave-styling", "Korean Soft Wave", "韩式柔感烫", "From $280", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("mens-texture-perm", "mens-cut", "Men’s Texture Perm", "男士纹理烫", "From $180", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("ladies-texture-wave", "blow-wave-styling", "Ladies Texture Wave", "女士纹理烫", "From $250", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("keratin-smooth-ritual", "keratin-smoothing", "Keratin Smooth Ritual", "角蛋白顺滑护理", "From $299", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    item("permanent-straightening", "keratin-smoothing", "Permanent Straightening", "女士离子烫", "From $388", undefined, { section: "Perm & Straightening", sectionZh: "烫发设计" }),
    ...scalpCareItems.filter((entry) => entry.id !== "scalp-detox-ritual").map((entry) => ({ ...entry, section: "Scalp & Hair Ritual", sectionZh: "头皮健康管理系列" })),
    item("glass-hair-premium-signature", "premium-hair-repair-blow-dry", "Glass Hair Premium Signature", "头皮至发梢焕新护理（含剪发）", "$399–$599", "120 mins", { section: "MEND Signature", sectionZh: "MEND 招牌项目", signature: true, details: ["Scalp care", "Hair treatment", "Signature cut", "Premium experience"], detailsZh: ["头皮护理", "发质护理", "设计剪发", "尊享体验"] }),
    scalpCareItems.find((entry) => entry.id === "scalp-detox-ritual")!,
  ],
};

const scalpMindWellness: ServiceCategory = {
  slug: "head-spa", title: "Scalp & Mind Wellness", cardTitle: "Scalp & Mind Wellness",
  excerpt: "Scalp assessment and cosmetic scalp-care rituals.",
  intro: "Scalp assessment and care services transcribed from the supplied Scalp & Mind Wellness menu.",
  image: "/images/head-spa-water-halo.webp", imageAlt: legacyHeadSpa.imageAlt,
  items: [...assessmentItems, ...scalpCareItems],
  notes: ["These are cosmetic scalp-care and relaxation services, not medical diagnosis or treatment. Results vary."],
};

const skinAesthetics: ServiceCategory = {
  slug: "skin-facial", title: "Skin Aesthetics", cardTitle: "Skin Aesthetics",
  excerpt: "MEND skin collection and essential facial services.",
  intro: "The clearly described cosmetic facial services from the supplied menu. Advanced devices, injectables and skin boosters remain withheld pending owner and practitioner review.",
  image: legacySkin.image, imageAlt: legacySkin.imageAlt,
  items: [
    item("mend-skin-reset-treatment", "skin-barrier-repair-facial", "MEND Skin Reset Treatment", "修复护理", "$168", "60 mins", { section: "Cellular Reset & Recovery", sectionZh: "修复护理" }),
    item("korean-facial-sculpting", "korean-skin-management-facial", "Korean Facial Sculpting", "韩式徒手小颜V脸管理", "$198", "75 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("cellular-reset-recovery", "skin-barrier-repair-facial", "Cellular Reset & Recovery", "多效修复重启管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("water-bomb-restore", "express-hydration-facial", "Water Bomb Restore", "韩式水光炸弹管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("collagen-c-radiance", "glass-skin-hydration-facial", "Collagen C Radiance", "胶原VC焕亮管理", "$268", "90 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("age-defy-renewal", "premium-korean-glow-facial", "Age Defy Renewal", "光采紧致焕活管理", "$398", "100 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("diamond-rejuvenation", "deep-cleansing-facial", "7 Days — Diamond Rejuvenation", "7天钻石焕肤再生管理", "$498", "75 mins", { section: "Essential Facials", sectionZh: "基础护理系列" }),
    item("lhala-glass-skin-peel", "glass-skin-hydration-facial", "LHALA Glass Skin Peel", "韩国水光焕肤酸疗", "$69", "20 mins", { section: "Add On", sectionZh: "护理加项" }),
  ],
  notes: ["Advanced device treatments, injectables and skin boosters shown on the source poster are not published here until availability, practitioner qualifications and advertising requirements are confirmed.", "Cosmetic skin services do not promise medical outcomes or guaranteed results."],
};

const bodyWellness: ServiceCategory = {
  slug: "body-care", title: "Eastern Wellness & Therapy", cardTitle: "Eastern Wellness & Therapy",
  excerpt: "Body therapy and signature relaxation massage.",
  intro: "Body-care and relaxation services transcribed from the supplied Eastern Wellness & Therapy menu.",
  image: legacyBody.image, imageAlt: legacyBody.imageAlt,
  items: [
    item("express-neck-shoulder-therapy", "body-care-head-spa-package", "Express Neck & Shoulder Therapy", "头肩颈舒缓", "$88", "30 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("meridian-therapy", "body-relaxation-treatment", "Meridian Therapy", "经络调理", "$168", "60 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("circulation-therapy", "body-scrub-hydration", "Circulation Therapy", "气血循环调理", "$258", "90 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("lymphatic-detox-therapy", "korean-body-care-ritual", "Lymphatic Detox Therapy", "全身淋巴排毒调理", "$268", "90 mins", { section: "Body Therapy", sectionZh: "身体理疗" }),
    item("express-relaxation-massage", "body-relaxation-treatment", "Express Relaxation Massage", "快速舒缓按摩", "$78", "30 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("aroma-healing-massage", "body-scrub-hydration", "Aroma Healing Massage", "芳香舒缓按摩", "$148", "60 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("deep-sleep-massage", "korean-body-care-ritual", "Deep Sleep Massage", "深度睡眠疗愈", "$218", "90 mins", { section: "Signature Massage", sectionZh: "特色按摩" }),
    item("mend-signature-body-ritual", "body-scrub-mini-facial", "MEND Signature Body Ritual", "全身焕活身心能量管理", "$348", "120 mins", { section: "Signature Massage", sectionZh: "特色按摩", signature: true }),
  ],
  notes: ["Body services support relaxation and wellbeing. They do not diagnose or treat circulation disorders, sleep conditions or other medical concerns; ‘detox’ is retained only as the poster’s service name and is not a medical claim."],
};

const hairReduction: ServiceCategory = {
  slug: "hair-reduction", title: "Hair Reduction", cardTitle: "Hair Reduction",
  excerpt: "Single-session and six-session hair-reduction pricing.",
  intro: "Hair-reduction prices transcribed from the supplied menu. The disputed full-arm/full-leg wording is clearly flagged for confirmation.",
  image: "/images/hair-reduction-menu.jpg", imageAlt: "MEND Hair Reduction service menu",
  items: [
    item("hair-reduction-upper-lip", "hair-reduction-upper-lip", "Upper Lip", "唇部", "$39 single · $199 / 6 sessions", "15 mins"),
    item("hair-reduction-underarms", "hair-reduction-underarms", "Underarms", "腋下", "$59 single · $299 / 6 sessions", "15 mins"),
    item("hair-reduction-full-face", "hair-reduction-full-face", "Full Face", "全脸", "$99 single · $499 / 6 sessions", "30 mins"),
    item("hair-reduction-half-arms-lower-legs", "hair-reduction-half-arms-lower-legs", "Arms (Half) / Lower Legs", "半手臂／小腿", "$119 single · $599 / 6 sessions", "45 mins"),
    item("hair-reduction-bikini-line", "body-scrub", "Bikini Line", "比基尼线", "$119 single · $599 / 6 sessions", "30 mins", { hideImage: true }),
    item("hair-reduction-full-arms-legs", "hair-reduction-full-arms-legs", "Arms (Full) / Full Legs", "全手臂／全小腿", "$139 single · $699 / 6 sessions", "60 mins"),
    item("hair-reduction-full-back", "body-care-head-spa-package", "Full Back", "全后背", "$139 single · $699 / 6 sessions", "60 mins"),
  ],
  notes: ["Owner confirmation required: the Chinese source says 全手臂／全小腿, while the English source says Arms (Full) / Full Legs. No interpretation has been made.", "Suitability, contraindications and expected results must be discussed before treatment. No universal suitability or guaranteed outcome is promised."],
};

const hairScalpRecovery: ServiceCategory = { ...scalpMindWellness, slug: "hair-scalp-recovery", title: "Hair & Scalp Recovery", cardTitle: "Hair & Scalp Recovery" };
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
