// Head Spa landing copy (EN/ZH), transcribed from the owner's treatment copy
// review (2026-11-25). Prices and durations are NOT stored here: cards read
// them from the existing head-spa menu data (lib/anna-services.ts) so the
// visible prices, the menu data and the Service/Offer JSON-LD cannot drift.
//
// Video clips: only MEND-filmed footage, never AI-generated or stock. Posters
// are a frame from the same clip.

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
    clipsTitle: "The head spa ritual",
  },
  "zh-Hans": {
    eyebrow: "MEND Beauty Studio | Head Spa",
    title: "Balwyn 附近头疗",
    body: "来 Deepdene 的 Mend Beauty Studio 体验韩式头疗。门店位于 74 Whitehorse Road，紧邻 Balwyn。可以从 30 分钟快速头疗开始，也可以选择包括头皮深层清洁、头部按摩和水循环头疗的长时护理。头疗属于美容护理，旨在放松，并非医疗诊断或治疗。",
    book: "预约",
    bookHref: "/zh/book",
    menuTitle: "头疗项目",
    clipsTitle: "头疗流程",
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

export type HeadSpaClipId = "hero" | "neck-massage" | "signature-cleanse" | "aroma-essence" | "ritual";

export type HeadSpaClip = {
  id: HeadSpaClipId;
  /** Muted web encodes under /public/videos/head-spa. */
  sources: { mp4: string; webm: string };
  /** Frame taken from the same clip. */
  poster: string;
  label: Localised;
  /** Crop focus (CSS object-position) when shown in a non-9:16 frame. */
  focus?: string;
  /** Written-consent status for identifiable people in the clip. */
  consent?: "confirmed" | "unconfirmed";
};

const clip = (
  id: HeadSpaClipId,
  file: string,
  label: Localised,
  focus?: string,
  consent?: "confirmed" | "unconfirmed",
): HeadSpaClip => ({
  id,
  focus,
  consent,
  sources: { mp4: `/videos/head-spa/${file}.mp4`, webm: `/videos/head-spa/${file}.webm` },
  poster: `/videos/head-spa/${file}-poster.jpg`,
  label,
});

// Source: in-store head spa footage filmed by MEND staff on 2026-11-23.
// Trimmed and re-encoded only; all audio removed (no speech or music is used).
// No C2PA or AI-provenance markers were found in the originals. The owner
// confirmed consent on 2026-11-25 (t266u) for people identifiable in
// neck-massage (clip5). The other in-store clips were already released with
// the head spa landing.
export const headSpaClips: Record<HeadSpaClipId, HeadSpaClip> = {
  hero: clip("hero", "hero-cleanse", { "en-AU": "Scalp cleansing and scalp brushing at the head spa bed, Mend Beauty Studio, Deepdene", "zh-Hans": "Mend Beauty Studio Deepdene 门店头疗床上的头皮清洁与头皮刷按摩" }),
  "neck-massage": clip("neck-massage", "neck-massage", { "en-AU": "Neck massage during a head spa", "zh-Hans": "头疗中的肩颈按摩" }, "50% 25%", "confirmed"),
  "signature-cleanse": clip("signature-cleanse", "signature-cleanse", { "en-AU": "Head massage, scalp massage tool and water-circulation rinse", "zh-Hans": "头部按摩、头皮按摩工具与水循环冲洗" }, "50% 40%"),
  "aroma-essence": clip("aroma-essence", "aroma-essence", { "en-AU": "Preparing scalp-care product for the treatment", "zh-Hans": "准备护理所用的头皮护理产品" }, "50% 60%"),
  ritual: clip("ritual", "ritual", { "en-AU": "A head spa visit at Mend Beauty Studio: settling in, scalp close-up, scalp brushing and massage", "zh-Hans": "在 Mend Beauty Studio 的一次头疗：入座、头皮近距离查看、头皮刷清洁与按摩" }),
};

/** Clip shown at the top of each treatment card (cards without one show text only). */
export const headSpaCardClips: Partial<Record<string, HeadSpaClipId>> = {
  "express-head-spa": "neck-massage",
  "korean-signature-head-spa": "signature-cleanse",
  "aroma-healing-head-spa": "aroma-essence",
};

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
