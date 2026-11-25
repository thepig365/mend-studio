// Head Spa landing copy (EN/ZH), transcribed from the owner's treatment copy
// review (2026-11-25). Prices and durations are NOT stored here: cards read
// them from the existing head-spa menu data (lib/anna-services.ts) so the
// visible prices, the menu data and the Service/Offer JSON-LD cannot drift.
//
// Video clips: only MEND-filmed footage, never AI-generated or stock. Any
// identifiable guest or staff member needs written consent before their clip
// is added. Posters are a frame from the same clip. Empty slots render a
// labelled placeholder on previews/local builds and render nothing on
// production (see showVideoSlotPlaceholders).

export type HeadSpaLocale = "en-AU" | "zh-Hans";

type Localised = Record<HeadSpaLocale, string>;

export type HeadSpaTreatment = {
  /** Matches the item id in lib/anna-services.ts */
  id: string;
  name: Localised;
  paragraphs: Record<HeadSpaLocale, [string, string]>;
};

export const headSpaLandingIntro: Record<HeadSpaLocale, { eyebrow: string; title: string; body: string; book: string; bookHref: string; menuTitle: string; clipsTitle: string }> = {
  "en-AU": {
    eyebrow: "MEND Beauty Studio | Head Spa",
    title: "Head Spa near Balwyn",
    body: "Take a break with a Korean-inspired head spa at Mend Beauty Studio, 74 Whitehorse Road, Deepdene, near Balwyn. Try the 30-minute Express Head Spa, or choose a longer ritual with deep scalp cleansing, head massage and water-circulation head spa. This is cosmetic scalp care for relaxation, not a medical treatment.",
    book: "Book",
    bookHref: "/book",
    menuTitle: "Head spa treatments",
    clipsTitle: "Inside the head spa",
  },
  "zh-Hans": {
    eyebrow: "MEND Beauty Studio | Head Spa",
    title: "Balwyn 附近头疗",
    body: "来 Deepdene 的 Mend Beauty Studio 体验韩式头疗。门店位于 74 Whitehorse Road，紧邻 Balwyn。可以从 30 分钟快速头疗开始，也可以选择包括头皮深层清洁、头部按摩和水循环头疗的长时护理。头疗属于美容护理，旨在放松，并非医疗诊断或治疗。",
    book: "预约",
    bookHref: "/zh/book",
    menuTitle: "头疗项目",
    clipsTitle: "头疗现场",
  },
};

export const headSpaTreatments: HeadSpaTreatment[] = [
  {
    id: "express-head-spa",
    name: { "en-AU": "Express Head Spa", "zh-Hans": "快速头疗" },
    paragraphs: {
      "en-AU": [
        "A gentle scalp treatment for your first visit, an add-on after a haircut, or a relaxing midday break. It combines gentle scalp cleansing and nourishment with a soothing neck and shoulder massage.",
        "Unlike a standard wash and blow-dry, it gives both your scalp and shoulders some attention. It's a refreshing way to take a short break from a busy day or try scalp care for the first time.",
      ],
      "zh-Hans": [
        "专为初次体验、剪发后加选或午休放松设计的轻量头皮护理。疗程包含温和的头皮清洁养护，以及舒缓的肩颈按摩。",
        "不同于普通洗吹，这套护理兼顾头皮与肩颈，让忙碌的一天多一段清爽、放松的时间，也适合作为第一次头皮护理体验。",
      ],
    },
  },
  {
    id: "korean-signature-head-spa",
    name: { "en-AU": "Korean Signature Head Spa", "zh-Hans": "韩式经典头疗" },
    paragraphs: {
      "en-AU": [
        "MEND's classic Korean scalp wellness ritual brings together deep scalp cleansing, professional head massage, gentle neck and shoulder massage, and water-circulation scalp care.",
        "It's a complete introduction to Korean head spa, with time to unwind and enjoy the light, refreshed feeling of a freshly cleansed scalp.",
      ],
      "zh-Hans": [
        "MEND 经典韩式头皮养护流程，包含深层头皮清洁、专业头部按摩、舒缓的肩颈按摩和水循环养护。",
        "这是一套完整、均衡的韩式头疗入门体验，让您留一点时间放松头部与肩颈，感受清洁后头皮的轻盈与清爽。",
      ],
    },
  },
  {
    id: "aroma-healing-head-spa",
    name: { "en-AU": "Aroma Healing Head Spa", "zh-Hans": "芳香疗愈深度睡眠头疗" },
    paragraphs: {
      "en-AU": [
        "An extended version of our Korean Signature Head Spa. It adds natural aromatic essential oils and a concentrated scalp essence, alongside neck and shoulder gua sha and warm compresses.",
        "Scent, gentle touch and warmth come together in a slower, more immersive experience. It suits anyone looking for quiet time to unwind after a busy or demanding day.",
      ],
      "zh-Hans": [
        "在韩式经典头疗的基础上，加入天然芳香精油和浓缩头皮精华导入，再搭配肩颈刮痧与温热敷护理。",
        "香气、触感与温热相互呼应，带来更沉浸的放松体验。适合近期忙碌、想留一段安静时间慢慢放松的客人。",
      ],
    },
  },
  {
    id: "mend-signature-head-ritual",
    name: { "en-AU": "MEND Signature Head Ritual", "zh-Hans": "MEND臻选头疗" },
    paragraphs: {
      "en-AU": [
        "A premium, personalised scalp and wellness ritual. It combines hot stones, a targeted scalp ampoule, warm compresses, infrared scalp care and aromatherapy, finishing with a refined blow-dry and style.",
        "From the warmth of the hot stones to the finishing touches on your hair, it's our most indulgent head spa experience, with time to slow down and enjoy the care.",
      ],
      "zh-Hans": [
        "一套尊享定制的头皮护理与放松仪式。疗程融合热石护理、针对性头皮安瓶导入、温热敷养护、红外线头皮护理与芳香护理，最后以精致吹塑造型收尾。",
        "从温热的热石到最后的吹塑造型，这是一段不赶时间的奢护体验，让您从容感受每一步护理。",
      ],
    },
  },
];

export type HeadSpaClip = {
  id: "hero" | "clip-1" | "clip-2" | "clip-3";
  /** Muted web encodes under /public/videos/head-spa. null = slot empty. */
  sources: { mp4: string; webm?: string } | null;
  /** Frame taken from the same clip. */
  poster: string | null;
  label: Localised;
  /** Why an empty slot is still empty (shown on preview placeholders only). */
  pendingNote?: Localised;
};

// Source: in-store footage filmed by MEND staff on 2026-11-23 (clip3, and three
// people-free shots trimmed from the clip1 montage). Audio removed; no C2PA or
// AI-provenance markers were found in the originals. Clips showing guests or
// staff (faces, profiles, voices) are deliberately NOT included until written
// consent is on file.
export const headSpaClips: Record<HeadSpaClip["id"], HeadSpaClip> = {
  hero: {
    id: "hero",
    sources: { mp4: "/videos/head-spa/hero-product.mp4", webm: "/videos/head-spa/hero-product.webm" },
    poster: "/videos/head-spa/hero-product-poster.jpg",
    label: { "en-AU": "Scalp-care product being dispensed at Mend Beauty Studio, Deepdene", "zh-Hans": "Mend Beauty Studio Deepdene 门店头疗护理产品" },
  },
  "clip-1": {
    id: "clip-1",
    sources: { mp4: "/videos/head-spa/ritual-details.mp4", webm: "/videos/head-spa/ritual-details.webm" },
    poster: "/videos/head-spa/ritual-details-poster.jpg",
    label: { "en-AU": "Head spa details: studio flowers, scalp-care product and water-circulation rinse", "zh-Hans": "头疗细节：门店花艺、头皮护理产品与水循环冲洗" },
  },
  "clip-2": {
    id: "clip-2",
    sources: null,
    poster: null,
    label: { "en-AU": "Neck and shoulder massage", "zh-Hans": "肩颈按摩" },
    pendingNote: { "en-AU": "Neck massage clip held back: needs written consent from the guest and therapist shown (preview only).", "zh-Hans": "肩颈按摩片段暂不使用：需出镜客人与技师书面同意（仅预览可见）。" },
  },
  "clip-3": {
    id: "clip-3",
    sources: null,
    poster: null,
    label: { "en-AU": "Welcome to the head spa station", "zh-Hans": "欢迎来到头疗位" },
    pendingNote: { "en-AU": "Arrival clip held back: needs written consent from the guest and staff member shown (preview only).", "zh-Hans": "到店片段暂不使用：需出镜客人与员工书面同意（仅预览可见）。" },
  },
};

/**
 * Empty video slots show a labelled placeholder on local and preview builds
 * only. On the production deployment an empty slot renders nothing (and the
 * hero falls back to the existing image), so an accidental release never
 * shows placeholder boxes to customers.
 */
export function showVideoSlotPlaceholders(): boolean {
  return process.env.VERCEL_ENV !== "production";
}

/** Durations come from menu data as "30 mins"; Chinese cards show "30 分钟". */
export function localiseDuration(time: string | undefined, locale: HeadSpaLocale): string | undefined {
  if (!time) return undefined;
  if (locale === "en-AU") return time;
  const minutes = /^(\d+)\s*mins?$/.exec(time.trim());
  return minutes ? `${minutes[1]} 分钟` : time;
}

/** Use the owner's first paragraph as the Service description in JSON-LD. */
export function withHeadSpaLandingDescriptions<T extends { id: string; description: string }>(items: T[], locale: HeadSpaLocale): T[] {
  return items.map((item) => {
    const treatment = headSpaTreatments.find((entry) => entry.id === item.id);
    return treatment ? { ...item, description: treatment.paragraphs[locale][0] } : item;
  });
}
