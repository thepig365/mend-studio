import {
  getCategory,
  serviceCategories,
  type ServiceCategory,
  type ServiceItem,
} from "@/lib/services";
import {
  annaServiceCategories,
  getAnnaCategory,
} from "@/lib/anna-services";
import {
  getAnnaMenuItemsForCategory,
  getMenuItemsForCategory,
} from "@/src/data/serviceMenu";

type ItemTranslation = {
  name: string;
  description: string;
};

const itemTranslations: Record<string, ItemTranslation> = {
  "Women’s Cut & Blow Dry": {
    name: "女士剪发与吹整",
    description: "根据个人需求精准剪裁，并以自然顺滑的吹整完成造型。",
  },
  "Senior Stylist Cut & Blow Dry": {
    name: "资深发型师剪发与吹整",
    description: "由资深发型师提供剪裁与完整造型服务。",
  },
  "Men’s Cut": {
    name: "男士剪发",
    description: "根据脸型、发质与日常打理习惯设计利落发型。",
  },
  "Blow Wave / Styling": {
    name: "洗吹与造型",
    description: "洗发后完成顺滑、持久的吹整造型。",
  },
  "Event Styling": {
    name: "宴会与活动造型",
    description: "适合婚礼、宴会及特别场合的发型设计。",
  },
  "Root Retouch": {
    name: "发根补染",
    description: "在全头染发之间修整新生发根颜色。",
  },
  "Global Colour": {
    name: "全头染发",
    description: "全头永久或半永久染色服务。",
  },
  "Toner / Gloss": {
    name: "调色与亮泽护理",
    description: "调整发色并增加光泽，适合作为染发之间的维护。",
  },
  "Half Head Foils": {
    name: "半头挑染",
    description: "在头顶与两侧进行层次挑染。",
  },
  "Full Head Foils": {
    name: "全头挑染",
    description: "全头挑染，增加整体层次与明亮度。",
  },
  "Balayage Package": {
    name: "手扫染套餐",
    description: "包含手扫染、调色及护理。",
  },
  "Colour Correction": {
    name: "发色修正",
    description: "复杂发色修正需先咨询、评估并报价。",
  },
  "Keratin / Smoothing Treatment": {
    name: "角蛋白顺滑护理",
    description: "帮助头发保持柔顺并更易日常打理。",
  },
  "Hair Repair Treatment": {
    name: "秀发修护护理",
    description: "针对干燥或受损发质的沙龙修护服务。",
  },
  "Premium Hair Repair + Blow Dry": {
    name: "深层秀发修护与吹整",
    description: "深层修护护理，并以专业吹整完成。",
  },
  "Express Scalp Refresh": {
    name: "快捷头皮焕活",
    description: "适合时间有限时的集中头皮清洁与按摩。",
  },
  "Signature Head Spa": {
    name: "经典头疗",
    description: "结合清洁、按摩、发膜与放松体验的经典头疗流程。",
  },
  "Premium Head Spa Ritual": {
    name: "高级头疗护理",
    description: "延长护理时间，加入更深入的按摩与头皮膜护理。",
  },
  "Deluxe Head Spa Ritual": {
    name: "奢享头疗护理",
    description: "节奏舒缓、层次完整的长时头疗体验。",
  },
  "Scalp Cleansing Treatment": {
    name: "头皮深层清洁",
    description: "温和清除积聚物，帮助头皮恢复清爽。",
  },
  "Scalp Health Support Treatment": {
    name: "头皮健康支持护理",
    description:
      "针对头皮环境的护理，也适合关注易稀疏发质的顾客；个人体验与结果会有差异。",
  },
  "Head Spa + Blow Dry": {
    name: "经典头疗与吹整",
    description: "经典头疗后完成自然顺滑的吹整造型。",
  },
  "Premium Head Spa + Hair Repair": {
    name: "高级头疗与秀发修护",
    description: "将高级头疗与修护型秀发护理结合。",
  },
  "Head Spa + Korean Mini Facial": {
    name: "头疗与韩式迷你面部护理",
    description: "头疗流程搭配清新舒适的韩式迷你面部护理。",
  },
  "Express Hydration Facial": {
    name: "快捷补水面部护理",
    description: "短时分层补水，帮助肌肤恢复清新舒适感。",
  },
  "Deep Cleansing Facial": {
    name: "深层清洁面部护理",
    description: "针对容易堵塞或暗沉肤感的完整清洁与焕新护理。",
  },
  "Korean Skin Management Facial": {
    name: "韩式皮肤管理",
    description: "根据当天肌肤状态定制的韩式护理流程。",
  },
  "Glass Skin Hydration Facial": {
    name: "水光补水面部护理",
    description: "灵感来自韩式护肤流程，重点提升补水与光泽感。",
  },
  "Skin Barrier Repair Facial": {
    name: "肌肤屏障舒缓护理",
    description: "为敏感或承受压力的肌肤提供温和舒缓护理。",
  },
  "Premium Korean Glow Facial": {
    name: "高级韩式焕亮面部护理",
    description: "结合清洁、护理、按摩与焕亮步骤的完整面部护理。",
  },
  "Facial + Head Spa Package": {
    name: "面部护理与头疗套餐",
    description: "一次完成面部护理与头疗的经典组合。",
  },
  "Body Scrub": {
    name: "身体磨砂护理",
    description: "全身去角质护理，令肌肤感觉柔滑清新。",
  },
  "Body Scrub + Hydration Treatment": {
    name: "身体磨砂与补水护理",
    description: "去角质后加入滋润补水护理。",
  },
  "Korean Body Care Ritual": {
    name: "韩式身体护理",
    description: "采用韩式美容护理方式，帮助肌肤保持细致舒适。",
  },
  "Body Relaxation Treatment": {
    name: "身体舒缓护理",
    description: "以舒适和放松为重点的温和护理。",
  },
  "Body Scrub + Mini Facial": {
    name: "身体磨砂与迷你面部护理",
    description: "身体磨砂搭配迷你面部护理，从头到脚焕新。",
  },
  "Body Care + Head Spa Package": {
    name: "身体护理与头疗套餐",
    description: "在一次舒缓体验中结合身体护理与头疗。",
  },
  "Korean Lash Lift + Tint": {
    name: "韩式睫毛提升与染色",
    description: "提升并染深自然睫毛，呈现清晰、低维护的效果。",
  },
  "Brow Lamination + Shape + Tint": {
    name: "眉毛定型、修形与染色",
    description: "结合定型、修形与染色，塑造整洁自然的眉形。",
  },
  "Korean Lash Lift + Brow Lamination Combo": {
    name: "韩式睫毛提升与眉毛定型组合",
    description: "一次完成睫毛提升与眉毛定型修饰。",
  },
  "Brow Shape": { name: "眉形修整", description: "根据脸型修整自然眉形。" },
  "Brow Tint": { name: "眉毛染色", description: "为眉毛增加均匀色泽与轮廓。" },
  "Brow Shape + Tint": {
    name: "眉形修整与染色",
    description: "结合眉形修整与染色。",
  },
  "Lash Dye": { name: "睫毛染色", description: "加深自然睫毛颜色。" },
  "Classic Lash Extensions": {
    name: "经典单根睫毛嫁接",
    description: "自然清晰的经典单根嫁接效果。",
  },
  "Hybrid Lash Extensions": {
    name: "混合型睫毛嫁接",
    description: "结合经典单根与浓密扇形的层次效果。",
  },
  "Volume Lash Extensions": {
    name: "浓密型睫毛嫁接",
    description: "呈现更饱满的睫毛效果。",
  },
  "2-Week Lash Refill": {
    name: "两周睫毛补接",
    description: "适用于嫁接后约两周的维护补接。",
  },
  "3-Week Lash Refill": {
    name: "三周睫毛补接",
    description: "适用于嫁接后约三周的维护补接。",
  },
  "Lash Removal": { name: "睫毛卸除", description: "专业卸除现有嫁接睫毛。" },
  "Skin Fade": { name: "渐层推剪", description: "干净利落的渐层男士发型。" },
  "Beard Trim": { name: "胡须修整", description: "修整胡须长度与轮廓。" },
  "Cut + Beard Trim": {
    name: "剪发与胡须修整",
    description: "男士剪发与胡须修整组合。",
  },
  "Grey Blending": {
    name: "白发自然调色",
    description: "柔和调和白发，使整体颜色更自然。",
  },
  "Men’s Scalp Detox": {
    name: "男士头皮净化护理",
    description: "针对男士头皮的清洁与焕活护理。",
  },
  "Men’s Cut + Scalp Detox": {
    name: "男士剪发与头皮净化",
    description: "将男士剪发与头皮净化护理结合。",
  },
  "Classic Manicure": {
    name: "经典手部美甲护理",
    description: "基础手部与指甲护理。",
  },
  "Gel Manicure": { name: "凝胶美甲", description: "包含凝胶甲油的手部美甲护理。" },
  "Classic Pedicure": {
    name: "经典足部美甲护理",
    description: "基础足部与趾甲护理。",
  },
  "Gel Pedicure": { name: "凝胶足部美甲", description: "包含凝胶甲油的足部护理。" },
  "Nail Art": { name: "美甲设计", description: "根据需求提供装饰与美甲设计。" },
  Removal: { name: "卸甲", description: "专业卸除现有甲面产品。" },
  "Semi-Permanent Beauty Consultation": {
    name: "半永久美容咨询",
    description: "在服务前讨论目标、适用性、护理与预期效果。",
  },
  "Powder / Ombre Brows": {
    name: "雾眉／渐变眉",
    description: "以柔和渐变方式塑造清晰眉形。",
  },
  "Combination Brows": {
    name: "组合眉",
    description: "结合不同技法，兼顾自然纹理与眉形轮廓。",
  },
  "Lip Blush": { name: "水晶唇／唇部润色", description: "为唇部增加柔和均匀的色泽。" },
  "Lip Blush incl. Touch-Up": {
    name: "唇部润色（含补色）",
    description: "唇部润色服务并包含约定的补色护理。",
  },
  "Lash Line Enhancement": {
    name: "睫毛线增强",
    description: "沿睫毛根部增加细致轮廓感。",
  },
  "Eyeliner Tattoo": {
    name: "半永久眼线",
    description: "按咨询确认的设计完成半永久眼线。",
  },
  "Touch-Up": { name: "补色", description: "针对已完成项目的后续补色维护。" },
  "Annual Refresh": { name: "年度焕新", description: "针对现有半永久项目的年度维护。" },
};

const categoryTranslations: Record<
  string,
  Pick<ServiceCategory, "title" | "cardTitle" | "excerpt" | "intro"> & {
    notes?: string[];
    secondaryTitle?: string;
  }
> = {
  hair: {
    title: "美发服务",
    cardTitle: "美发服务",
    excerpt: "剪发、染发、手扫染、挑染、角蛋白护理与秀发修护。",
    intro: "从精准剪裁、层次染发到深层修护，我们同时重视最终造型与发质状态。",
    notes: ["最终价格会根据头发长度、厚度、染发历史及发型师建议确定。"],
  },
  "head-spa": {
    title: "头疗与头皮护理",
    cardTitle: "头疗与头皮护理",
    excerpt: "舒缓头疗、头皮清洁及头皮健康支持护理。",
    intro: "结合头皮清洁、按摩与放松体验，帮助维持舒适清新的头皮与秀发状态。",
    notes: [
      "我们的头皮护理以美容、舒缓和头皮健康支持为目的，并非医疗治疗；个人体验与结果会有差异。",
    ],
  },
  "skin-facial": {
    title: "皮肤管理与面部护理",
    cardTitle: "皮肤管理与面部护理",
    excerpt: "韩式皮肤管理、补水面部护理与焕亮护理。",
    intro: "以补水、光泽与肌肤舒适度为重点的韩式皮肤管理及面部护理。",
    notes: ["每次面部护理前都会进行简短沟通，以便根据当天肤况安排护理。"],
  },
  "body-care": {
    title: "身体护理",
    cardTitle: "身体护理",
    excerpt: "身体磨砂、身体护理与舒缓美容体验。",
    intro: "帮助肌肤保持柔滑、清新与舒适的身体护理和放松体验。",
    notes: ["身体护理以美容和放松为目的；预约时请告知我们任何肌肤敏感情况。"],
  },
  "brows-lashes": {
    title: "眉睫护理",
    cardTitle: "眉睫护理",
    excerpt: "韩式睫毛提升、眉毛定型及自然精致的眼部修饰。",
    intro: "重点提供韩式睫毛提升、眉毛定型与自然眼部美容；睫毛嫁接及补接视预约情况提供。",
    secondaryTitle: "其他眉睫服务",
  },
  "mens-grooming": {
    title: "男士理容",
    cardTitle: "男士理容",
    excerpt: "男士剪发、渐层推剪、胡须修整、白发调色与头皮净化。",
    intro: "为男士提供利落剪发、渐层造型、胡须修整、白发调色与头皮护理。",
  },
  nails: {
    title: "美甲",
    cardTitle: "美甲",
    excerpt: "由店内合作伙伴提供手部、足部与美甲护理。",
    intro: "经典及凝胶手足护理，并可按预约情况提供美甲设计。",
    notes: ["美甲服务可能由店内合作伙伴提供，请联系我们确认可预约时间。"],
  },
  "semi-permanent": {
    title: "半永久美容",
    cardTitle: "半永久美容",
    excerpt: "半永久眉、唇部润色与睫毛线增强，仅限咨询后预约。",
    intro: "所有半永久美容项目均需先进行咨询与适用性评估，再确认服务安排。",
    notes: [
      "半永久美容必须先咨询，并根据个人适用性、健康情况及护理要求决定是否进行。",
    ],
  },
};

function translateItem(item: ServiceItem): ServiceItem {
  const translated = itemTranslations[item.name];
  return translated
    ? { ...item, name: translated.name, description: translated.description }
    : item;
}

function translateCategory(category: ServiceCategory): ServiceCategory {
  const translated = categoryTranslations[category.slug];
  if (!translated) return category;

  return {
    ...category,
    ...translated,
    items: category.items.map(translateItem),
    secondaryItems: category.secondaryItems?.map(translateItem),
  };
}

export const zhServiceCategories = serviceCategories.map(translateCategory);

export function getZhCategory(slug: string) {
  const original = getCategory(slug);
  return translateCategory(original);
}

export function getZhMenuItemsForCategory(slug: string) {
  const source = getMenuItemsForCategory(slug);
  const category = getZhCategory(slug);

  return {
    items: source.items.map((item, index) => ({
      ...item,
      name: category.items[index]?.name ?? item.name,
      description: category.items[index]?.description ?? item.description,
      category: category.title,
      bookingNote:
        slug === "semi-permanent"
          ? "仅限咨询后预约，并需完成适用性评估。"
          : slug === "nails"
            ? "美甲服务视店内合作伙伴的预约情况提供，请先联系我们确认。"
            : item.bookingNote,
    })),
    secondaryItems: source.secondaryItems.map((item, index) => ({
      ...item,
      name: category.secondaryItems?.[index]?.name ?? item.name,
      description:
        category.secondaryItems?.[index]?.description ?? item.description,
      category: category.title,
    })),
  };
}

const annaCategoryTranslations: Record<
  string,
  Pick<ServiceCategory, "title" | "cardTitle" | "excerpt" | "intro"> & {
    notes?: string[];
    secondaryTitle?: string;
  }
> = {
  hair: {
    title: "美发设计中心",
    cardTitle: "美发设计中心",
    excerpt: "头皮检测、剪裁设计、染发设计与烫发设计。",
    intro: "查看经批准的头皮检测、剪裁、染发与烫发项目、价格及时间。",
  },
  "hair-scalp-recovery": {
    title: "头皮健康管理",
    cardTitle: "头皮健康管理",
    excerpt: "针对头皮与发质状态的护理项目。",
    intro: "专注头皮状态、发质状态及修护护理的经批准项目。",
    notes: ["头皮与发质护理属于美容与健康支持服务，并非医疗诊断或治疗。"],
  },
  "head-spa": {
    title: "头皮身心疗愈",
    cardTitle: "头皮身心疗愈",
    excerpt: "沉浸式头疗与放松体验。",
    intro: "以头皮护理与放松为重点的经批准沉浸式头疗服务。",
    notes: ["头疗支持美容型头皮护理与放松，不诊断或治疗睡眠及其他医疗问题。"],
  },
  "skin-facial": {
    title: "肌肤管理",
    cardTitle: "肌肤管理",
    excerpt: "韩式专业护肤产品与设备护理。",
    intro: "采用客观、非医疗描述的经批准韩式专业肌肤管理项目。",
    notes: [
      "肌肤管理属于美容护理，效果因人而异；不作医疗、祛斑保证、注射、独家性或抗衰保证声明。",
    ],
  },
  "body-care": {
    title: "身心疗愈",
    cardTitle: "身心疗愈",
    excerpt: "身体调理与放松护理。",
    intro: "使用谨慎、非医疗语言介绍的经批准身体调理与放松服务。",
    notes: [
      "身体护理支持放松与身心舒适，不诊断或治疗循环障碍、失眠或其他医疗问题，也不作医疗排毒声明。",
    ],
  },
  "nails-semi-permanent": {
    title: "美甲与半永久美容",
    cardTitle: "美甲与半永久美容",
    excerpt: "保留现有美甲及需咨询的半永久美容项目。",
    intro: "完整保留现有美甲与半永久美容项目、价格及预约要求。",
    secondaryTitle: "半永久美容",
  },
};

function translateAnnaItem(item: ServiceItem): ServiceItem {
  return {
    ...item,
    name: item.nameZh ?? item.name,
    description: item.descriptionZh ?? item.description,
    section: item.sectionZh ?? item.section,
    details: item.detailsZh ?? item.details,
  };
}

function translateAnnaCategory(category: ServiceCategory): ServiceCategory {
  if (
    category.slug === "mens-grooming" ||
    category.slug === "nails" ||
    category.slug === "semi-permanent"
  ) {
    return getZhCategory(category.slug);
  }

  if (category.slug === "nails-semi-permanent") {
    const zhNails = getZhCategory("nails");
    const zhSemiPermanent = getZhCategory("semi-permanent");
    const translated = annaCategoryTranslations[category.slug];
    return {
      ...category,
      ...translated,
      items: category.items.map((item, index) => ({
        ...item,
        name: zhNails.items[index]?.name ?? item.name,
        nameZh: zhNails.items[index]?.name,
        description:
          zhNails.items[index]?.description ?? item.description,
        descriptionZh: zhNails.items[index]?.description,
        section: "美甲",
      })),
      secondaryItems: category.secondaryItems?.map((item, index) => ({
        ...item,
        name: zhSemiPermanent.items[index]?.name ?? item.name,
        nameZh: zhSemiPermanent.items[index]?.name,
        description:
          zhSemiPermanent.items[index]?.description ?? item.description,
        descriptionZh: zhSemiPermanent.items[index]?.description,
        section: "半永久美容",
      })),
      notes: [
        ...(zhNails.notes ?? []),
        ...(zhSemiPermanent.notes ?? []),
      ],
    };
  }

  const translated = annaCategoryTranslations[category.slug];
  return {
    ...category,
    ...translated,
    items: category.items.map(translateAnnaItem),
    secondaryItems: category.secondaryItems?.map(translateAnnaItem),
  };
}

export const zhAnnaServiceCategories =
  annaServiceCategories.map(translateAnnaCategory);

export function getZhAnnaCategory(slug: string) {
  return translateAnnaCategory(getAnnaCategory(slug));
}

export function getZhAnnaMenuItemsForCategory(slug: string) {
  const source = getAnnaMenuItemsForCategory(slug);
  const category = getZhAnnaCategory(slug);

  const localise = (
    item: (typeof source.items)[number],
    translatedItem: ServiceItem | undefined,
  ) => ({
    ...item,
    name: translatedItem?.name ?? item.name,
    nameEn: item.nameEn ?? item.name,
    nameZh: translatedItem?.name ?? item.nameZh,
    description:
      translatedItem?.description ?? item.descriptionZh ?? item.description,
    section: translatedItem?.section ?? item.sectionZh ?? item.section,
    details: translatedItem?.details ?? item.detailsZh ?? item.details,
    category: category.title,
    bookingNote:
      slug === "nails-semi-permanent"
        ? "美甲服务视预约情况提供；半永久美容项目仅限咨询后预约，并需完成适用性评估。"
        : item.bookingNote,
  });

  return {
    items: source.items.map((item, index) =>
      localise(item, category.items[index]),
    ),
    secondaryItems: source.secondaryItems.map((item, index) =>
      localise(item, category.secondaryItems?.[index]),
    ),
  };
}
