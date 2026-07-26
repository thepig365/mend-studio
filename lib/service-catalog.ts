import { siteImages } from "@/src/data/images";

export type ServiceCategoryId =
  | "hair"
  | "head-spa"
  | "skin"
  | "body"
  | "signature-rituals";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type PriceModel = {
  display: LocalizedText;
  amount?: number;
  from?: boolean;
};

export type ServiceRecord = {
  slug: string;
  category: ServiceCategoryId;
  name: LocalizedText;
  summary: LocalizedText;
  fit: LocalizedText;
  includes: LocalizedText[];
  duration: LocalizedText;
  durationMinutes?: number;
  price: PriceModel;
  bookingMode: "mase" | "consultation";
  launchPhase: 1 | 2;
  featured?: boolean;
  image: string;
  imageAlt: LocalizedText;
  preparation: LocalizedText;
  aftercare: LocalizedText;
};

export type ServiceCategoryRecord = {
  id: ServiceCategoryId;
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
};

export const serviceCategories: ServiceCategoryRecord[] = [
  {
    id: "hair",
    title: { en: "Hair", zh: "美发" },
    eyebrow: { en: "Cut, colour & renewal", zh: "剪发、染发与修护" },
    summary: {
      en: "Considered cuts, dimensional colour and restorative care guided by your hair condition and goals.",
      zh: "根据发质、状态与目标，提供细致剪发、立体染发及修护护理。",
    },
    outcome: { en: "Shape, colour and healthier-looking shine.", zh: "改善发型、色彩与健康光泽。" },
    image: siteImages.hair.src,
    imageAlt: { en: siteImages.hair.alt, zh: "MEND 美发护理空间" },
  },
  {
    id: "head-spa",
    title: { en: "Head Spa", zh: "头疗与头皮管理" },
    eyebrow: { en: "Scalp care & deep rest", zh: "头皮护理与深度放松" },
    summary: {
      en: "Cleansing, massage and conditioning rituals for a refreshed scalp and a calmer pause.",
      zh: "通过清洁、按摩与养护流程，帮助头皮焕新，也为身心留出安静时刻。",
    },
    outcome: { en: "A refreshed scalp and an unhurried reset.", zh: "头皮清爽，身心从容重启。" },
    image: siteImages.headSpa.src,
    imageAlt: { en: siteImages.headSpa.alt, zh: "MEND 头疗与头皮护理" },
  },
  {
    id: "skin",
    title: { en: "Skin", zh: "肌肤管理" },
    eyebrow: { en: "Hydration, comfort & glow", zh: "补水、舒适与光泽" },
    summary: {
      en: "Korean-inspired skin rituals selected around hydration, barrier comfort and visible radiance.",
      zh: "以补水、屏障舒适度与自然光泽为重点的韩式肌肤管理。",
    },
    outcome: { en: "Comfortable, hydrated and luminous-looking skin.", zh: "让肌肤更舒适、水润并呈现自然光泽。" },
    image: siteImages.skinFacial.src,
    imageAlt: { en: siteImages.skinFacial.alt, zh: "MEND 肌肤管理护理" },
  },
  {
    id: "body",
    title: { en: "Body", zh: "身体放松" },
    eyebrow: { en: "Release & restore", zh: "舒缓与恢复" },
    summary: {
      en: "Focused relaxation services for shoulders, neck and whole-body tension, delivered as non-medical wellbeing care.",
      zh: "针对肩颈及全身紧张感的非医疗放松护理，帮助身体舒缓。",
    },
    outcome: { en: "Less held tension and more room to breathe.", zh: "释放紧张感，找回轻松呼吸的空间。" },
    image: siteImages.bodyCare.src,
    imageAlt: { en: siteImages.bodyCare.alt, zh: "MEND 身体放松护理" },
  },
  {
    id: "signature-rituals",
    title: { en: "Signature Rituals", zh: "MEND 招牌疗程" },
    eyebrow: { en: "Beauty & Mind", zh: "Beauty & Mind" },
    summary: {
      en: "Longer, layered experiences that bring together MEND hair, scalp, skin and relaxation care.",
      zh: "融合秀发、头皮、肌肤与放松护理的完整 MEND 体验。",
    },
    outcome: { en: "A complete pause designed around renewal.", zh: "以焕新为核心的一段完整停驻。" },
    image: siteImages.headSpa.src,
    imageAlt: { en: "MEND signature ritual", zh: "MEND 招牌疗程" },
  },
];

const commonPreparation: LocalizedText = {
  en: "Tell the team about sensitivities, allergies, pregnancy, recent procedures or anything that may affect your comfort before the service.",
  zh: "护理前请告知团队任何敏感、过敏、孕期情况、近期医美项目或其他可能影响舒适度的信息。",
};

const commonAftercare: LocalizedText = {
  en: "Your professional will explain any service-specific home care before you leave.",
  zh: "护理结束前，专业人员会说明适合本项目的居家护理建议。",
};

export const services: ServiceRecord[] = [
  {
    slug: "signature-cut",
    category: "hair",
    name: { en: "Signature Cut", zh: "MEND 招牌剪发" },
    summary: { en: "A considered cut and finish shaped around your features, routine and hair movement.", zh: "根据脸型、日常习惯与发丝走向设计剪裁与造型。" },
    fit: { en: "For a refined shape, easier daily styling or a thoughtful change.", zh: "适合希望改善轮廓、简化日常造型或进行细致改变的客人。" },
    includes: [{ en: "Consultation, cleanse, tailored cut and finish", zh: "咨询、清洁、定制剪发与造型" }],
    duration: { en: "60 minutes", zh: "60 分钟" },
    durationMinutes: 60,
    price: { display: { en: "From A$95", zh: "A$95 起" }, amount: 95, from: true },
    bookingMode: "mase",
    launchPhase: 2,
    image: siteImages.hair.src,
    imageAlt: { en: "MEND signature haircut", zh: "MEND 招牌剪发" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "signature-colour",
    category: "hair",
    name: { en: "Signature Colour", zh: "MEND 招牌染发" },
    summary: { en: "Dimensional colour planned around your starting point, desired tone and maintenance preference.", zh: "根据现有发色、目标色调与维护习惯规划立体染发。" },
    fit: { en: "For considered colour change with a consultation-led plan.", zh: "适合希望在专业咨询后进行细致发色调整的客人。" },
    includes: [{ en: "Colour consultation, tailored application and finish", zh: "染发咨询、定制上色与造型" }],
    duration: { en: "120–180 minutes", zh: "120–180 分钟" },
    price: { display: { en: "From A$180", zh: "A$180 起" }, amount: 180, from: true },
    bookingMode: "consultation",
    launchPhase: 2,
    image: siteImages.hair.src,
    imageAlt: { en: "MEND dimensional hair colour", zh: "MEND 立体染发" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "glass-hair-renewal",
    category: "hair",
    name: { en: "Glass Hair Renewal", zh: "镜面秀发焕新" },
    summary: { en: "A restorative smoothing and shine ritual for dry, stressed or lacklustre hair.", zh: "为干燥、受损或缺乏光泽的发丝设计的修护顺滑疗程。" },
    fit: { en: "For softer feel, improved manageability and reflective-looking shine.", zh: "适合希望提升柔顺度、易打理度与镜面光泽的客人。" },
    includes: [{ en: "Hair assessment, restorative treatment and polished finish", zh: "发质评估、修护护理与光泽造型" }],
    duration: { en: "90–120 minutes", zh: "90–120 分钟" },
    price: { display: { en: "From A$189", zh: "A$189 起" }, amount: 189, from: true },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.hair.src,
    imageAlt: { en: "Glossy renewed hair at MEND", zh: "MEND 镜面秀发焕新" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "express-head-reset",
    category: "head-spa",
    name: { en: "Express Head Reset", zh: "快速头疗焕新" },
    summary: { en: "A focused scalp cleanse and massage for a meaningful reset when time is limited.", zh: "在时间有限时，通过重点头皮清洁与按摩完成一次有效焕新。" },
    fit: { en: "For first visits, busy days or a concise scalp refresh.", zh: "适合首次体验、忙碌日程或希望进行简洁头皮焕新的客人。" },
    includes: [{ en: "Scalp cleanse, focused massage and conditioning care", zh: "头皮清洁、重点按摩与养护" }],
    duration: { en: "45 minutes", zh: "45 分钟" },
    durationMinutes: 45,
    price: { display: { en: "A$99", zh: "A$99" }, amount: 99 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.headSpa.src,
    imageAlt: { en: "Express head spa at MEND", zh: "MEND 快速头疗焕新" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "signature-head-spa",
    category: "head-spa",
    name: { en: "Signature Head Spa", zh: "MEND 招牌头疗" },
    summary: { en: "MEND’s signature sequence of scalp cleansing, massage, conditioning and quiet restoration.", zh: "MEND 招牌流程，融合头皮清洁、按摩、养护与安静修复。" },
    fit: { en: "For a complete scalp-care ritual with generous time to unwind.", zh: "适合希望完整护理头皮，并拥有充足放松时间的客人。" },
    includes: [{ en: "Consultation, cleanse, extended massage, scalp and hair care", zh: "咨询、清洁、延长按摩、头皮与秀发养护" }],
    duration: { en: "75 minutes", zh: "75 分钟" },
    durationMinutes: 75,
    price: { display: { en: "A$159", zh: "A$159" }, amount: 159 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.headSpa.src,
    imageAlt: { en: "MEND signature head spa ritual", zh: "MEND 招牌头疗流程" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "deep-sleep-head-ritual",
    category: "head-spa",
    name: { en: "Deep Sleep Head Ritual", zh: "深度安眠头疗" },
    summary: { en: "An extended evening-style head ritual designed to support deep relaxation; it is not a medical sleep treatment.", zh: "延长版头疗体验，旨在支持深度放松；不属于医疗睡眠治疗。" },
    fit: { en: "For guests wanting a slower, quieter and more immersive relaxation ritual.", zh: "适合希望体验更缓慢、安静、沉浸式放松流程的客人。" },
    includes: [{ en: "Extended scalp ritual, massage, conditioning and quiet rest", zh: "延长头皮护理、按摩、养护与安静休息" }],
    duration: { en: "90 minutes", zh: "90 分钟" },
    durationMinutes: 90,
    price: { display: { en: "Launch price A$219", zh: "上线体验价 A$219" }, amount: 219 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.headSpa.src,
    imageAlt: { en: "Extended relaxing head ritual at MEND", zh: "MEND 深度放松头疗" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "head-spa-massage-reset",
    category: "head-spa",
    name: { en: "Head Spa & Massage Reset", zh: "头疗与按摩焕新" },
    summary: { en: "A combined scalp ritual and focused upper-body massage for layered relaxation.", zh: "融合头皮护理与重点上半身按摩的多层次放松体验。" },
    fit: { en: "For guests who hold tension through the scalp, neck and shoulders.", zh: "适合头皮、颈部与肩部容易积累紧张感的客人。" },
    includes: [{ en: "Head spa sequence and focused shoulder-neck massage", zh: "头疗流程与肩颈重点按摩" }],
    duration: { en: "90 minutes", zh: "90 分钟" },
    durationMinutes: 90,
    price: { display: { en: "A$179–199", zh: "A$179–199" } },
    bookingMode: "consultation",
    launchPhase: 2,
    image: siteImages.headSpa.src,
    imageAlt: { en: "Head spa and massage reset", zh: "头疗与按摩焕新" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "essential-skin-reset",
    category: "skin",
    name: { en: "Essential Skin Reset", zh: "基础肌肤焕新" },
    summary: { en: "A balanced cleanse, hydration and comfort ritual selected around your skin on the day.", zh: "根据当日肌肤状态安排清洁、补水与舒适护理。" },
    fit: { en: "For first visits, regular maintenance or skin that feels dull and dehydrated.", zh: "适合首次体验、定期维护或感觉暗沉缺水的肌肤。" },
    includes: [{ en: "Skin consultation, cleanse, hydration and finishing care", zh: "肌肤咨询、清洁、补水与收尾养护" }],
    duration: { en: "60 minutes", zh: "60 分钟" },
    durationMinutes: 60,
    price: { display: { en: "A$139", zh: "A$139" }, amount: 139 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.skinFacial.src,
    imageAlt: { en: "Essential skin reset at MEND", zh: "MEND 基础肌肤焕新" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "barrier-rescue",
    category: "skin",
    name: { en: "Barrier Rescue", zh: "肌肤屏障舒缓" },
    summary: { en: "A gentle, comfort-led facial for skin that feels dry, reactive or compromised.", zh: "为感觉干燥、容易不适或屏障状态欠佳的肌肤设计的温和舒缓护理。" },
    fit: { en: "For hydration and comfort without aggressive treatment claims.", zh: "适合希望温和补水与提升舒适度的客人，不作医疗功效承诺。" },
    includes: [{ en: "Consultation, gentle cleanse, comfort-focused mask and barrier care", zh: "咨询、温和清洁、舒缓面膜与屏障养护" }],
    duration: { en: "75 minutes", zh: "75 分钟" },
    durationMinutes: 75,
    price: { display: { en: "A$189", zh: "A$189" }, amount: 189 },
    bookingMode: "consultation",
    launchPhase: 2,
    image: siteImages.skinFacial.src,
    imageAlt: { en: "Gentle barrier-focused facial", zh: "温和肌肤屏障护理" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "korean-glass-skin-ritual",
    category: "skin",
    name: { en: "Korean Glass Skin Ritual", zh: "韩式水光肌疗程" },
    summary: { en: "A layered hydration and radiance ritual inspired by Korean skin-management practice.", zh: "受韩式肌肤管理启发的多层补水与焕亮疗程。" },
    fit: { en: "For guests seeking hydrated, smooth and luminous-looking skin.", zh: "适合希望肌肤更水润、平滑并呈现自然光泽的客人。" },
    includes: [{ en: "Skin consultation, layered hydration, mask and glow finish", zh: "肌肤咨询、多层补水、面膜与焕亮养护" }],
    duration: { en: "75 minutes", zh: "75 分钟" },
    durationMinutes: 75,
    price: { display: { en: "Launch price A$219", zh: "上线体验价 A$219" }, amount: 219 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.skinFacial.src,
    imageAlt: { en: "Korean-inspired glass skin ritual", zh: "韩式水光肌疗程" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "shoulder-neck-reset",
    category: "body",
    name: { en: "Shoulder & Neck Reset", zh: "肩颈舒缓焕新" },
    summary: { en: "A focused relaxation massage for commonly held shoulder and neck tension.", zh: "针对肩颈常见紧张感的重点放松按摩。" },
    fit: { en: "For desk work, busy routines or a concise physical reset.", zh: "适合久坐办公、日程繁忙或希望快速放松身体的客人。" },
    includes: [{ en: "Focused shoulder, neck and upper-back relaxation massage", zh: "肩部、颈部与上背部重点放松按摩" }],
    duration: { en: "45 minutes", zh: "45 分钟" },
    durationMinutes: 45,
    price: { display: { en: "A$99", zh: "A$99" }, amount: 99 },
    bookingMode: "mase",
    launchPhase: 1,
    featured: true,
    image: siteImages.bodyCare.src,
    imageAlt: { en: "Shoulder and neck relaxation at MEND", zh: "MEND 肩颈舒缓" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "stress-release-massage",
    category: "body",
    name: { en: "Stress Release Massage", zh: "全身舒压按摩" },
    summary: { en: "A non-medical relaxation massage paced around your comfort and preferred pressure.", zh: "根据舒适度与力度偏好安排的非医疗全身放松按摩。" },
    fit: { en: "For whole-body relaxation and time away from a busy routine.", zh: "适合希望全身放松并暂时离开忙碌节奏的客人。" },
    includes: [{ en: "Consultation and tailored relaxation massage", zh: "咨询与定制放松按摩" }],
    duration: { en: "60 or 90 minutes", zh: "60 或 90 分钟" },
    price: { display: { en: "A$119 / A$169", zh: "A$119 / A$169" } },
    bookingMode: "mase",
    launchPhase: 2,
    image: siteImages.bodyCare.src,
    imageAlt: { en: "Relaxation massage at MEND", zh: "MEND 全身舒压按摩" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
  {
    slug: "mend-total-reset",
    category: "signature-rituals",
    name: { en: "MEND Total Reset", zh: "MEND 全方位焕新" },
    summary: { en: "A long-form Beauty & Mind ritual bringing together head spa, skin hydration and body relaxation.", zh: "融合头疗、肌肤补水与身体放松的长时段 Beauty & Mind 招牌体验。" },
    fit: { en: "For a milestone pause, meaningful gift or complete personal reset.", zh: "适合作为重要时刻的停驻、用心礼物或完整个人焕新。" },
    includes: [{ en: "Head spa, skin hydration ritual, focused body relaxation and transition time", zh: "头疗、肌肤补水、重点身体放松与体验衔接时间" }],
    duration: { en: "150 minutes", zh: "150 分钟" },
    durationMinutes: 150,
    price: { display: { en: "A$449", zh: "A$449" }, amount: 449 },
    bookingMode: "consultation",
    launchPhase: 1,
    featured: true,
    image: siteImages.headSpa.src,
    imageAlt: { en: "MEND Total Reset signature ritual", zh: "MEND 全方位焕新招牌疗程" },
    preparation: commonPreparation,
    aftercare: commonAftercare,
  },
];

export function getCategory(id: string) {
  return serviceCategories.find((category) => category.id === id);
}

export function getService(category: string, slug: string) {
  return services.find((service) => service.category === category && service.slug === slug);
}

export function getServicesForCategory(category: string) {
  return services.filter((service) => service.category === category);
}

export const featuredServices = services.filter((service) => service.featured);
