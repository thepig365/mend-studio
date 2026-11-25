// Body Therapy + Signature Massage landing copy (EN/ZH), transcribed from the
// owner's unpublished mobile copy review (2026-11-25). Prices and durations
// are NOT stored here: cards read them from the existing body-care menu data
// (lib/anna-services.ts) so the visible prices, the menu data and the
// Service/Offer JSON-LD cannot drift.
//
// Media: EA confirmed there is no body-massage, aromatherapy-oil or
// treatment-room footage. The only relevant item is head spa clip5 (neck and
// shoulder massage in the spa chair, Mandarin speech around 10s). That muted
// encode is reused only on the Express Neck & Shoulder card, with a caption
// that it was filmed during a head spa. Written consent is unconfirmed.
// Every other placement is a reserved logo/text slot for later studio footage.
// Do not present spa-chair footage as a body massage on a treatment table.

import type { HeadSpaLocale } from "@/lib/head-spa-landing";

export type BodyCareLocale = HeadSpaLocale;

type Localised = Record<BodyCareLocale, string>;

export type BodyCareGroupId = "body-therapy" | "signature-massage";

export type BodyCareTreatment = {
  /** Matches the item id in lib/anna-services.ts */
  id: string;
  group: BodyCareGroupId;
  name: Localised;
  paragraphs: Record<BodyCareLocale, string[]>;
};

export const bodyCareLandingIntro: Record<
  BodyCareLocale,
  {
    eyebrow: string;
    title: string;
    body: string;
    book: string;
    bookHref: string;
    disclaimer: string;
    heroSlotLabel: string;
    mediaSlotLabel: string;
    neckCaption: string;
  }
> = {
  "en-AU": {
    eyebrow: "MEND Beauty Studio | Body Therapy & Signature Massage",
    title: "Body Therapy and Signature Massage near Balwyn",
    body: "Book body therapy and signature massage at Mend Beauty Studio, 74 Whitehorse Road, Deepdene, near Balwyn. Focused and full-body care inspired by Eastern wellness traditions, from a 30-minute pause to a personalised two-hour ritual.",
    book: "Book",
    bookHref: "/book",
    disclaimer: "Relaxation and general wellbeing, not diagnosis or treatment.",
    heroSlotLabel: "Studio photo or video of body therapy and signature massage to come",
    mediaSlotLabel: "Studio photo or video to come",
    neckCaption: "Neck and shoulder massage filmed during a head spa, in the spa chair. Not a massage table.",
  },
  "zh-Hans": {
    eyebrow: "MEND Beauty Studio | 身体理疗与特色按摩",
    title: "Balwyn 附近的身体理疗与特色按摩",
    body: "来 Deepdene 的 Mend Beauty Studio 预约身体理疗与特色按摩。门店位于 74 Whitehorse Road，紧邻 Balwyn。从肩颈专项到全身护理，融入东方养护理念；从 30 分钟的短时放松，到两小时的专属全身护理。",
    book: "预约",
    bookHref: "/zh/book",
    disclaimer: "日常养护及放松，不用于诊断或治疗。",
    heroSlotLabel: "身体理疗与特色按摩的门店影像稍后更新",
    mediaSlotLabel: "门店护理影像稍后更新",
    neckCaption: "头疗过程中拍摄的肩颈按摩（头疗椅，非按摩床）。",
  },
};

export const bodyCareGroups: Record<
  BodyCareGroupId,
  { title: Localised; intro: Localised }
> = {
  "body-therapy": {
    title: { "en-AU": "Body Therapy", "zh-Hans": "身体理疗" },
    intro: {
      "en-AU": "Focused and full-body care inspired by Eastern wellness traditions.",
      "zh-Hans": "从肩颈专项到全身护理，融入东方养护理念。",
    },
  },
  "signature-massage": {
    title: { "en-AU": "Signature Massage", "zh-Hans": "特色按摩" },
    intro: {
      "en-AU": "From a 30-minute pause to a personalised two-hour ritual.",
      "zh-Hans": "从 30 分钟的短时放松，到两小时的专属全身护理。",
    },
  },
};

export const bodyCareTreatments: BodyCareTreatment[] = [
  {
    id: "express-neck-shoulder-therapy",
    group: "body-therapy",
    name: { "en-AU": "Express Neck & Shoulder Therapy", "zh-Hans": "头肩颈舒缓" },
    paragraphs: {
      "en-AU": [
        "A focused, 30-minute treatment for the neck and shoulders. Targeted massage works through areas of everyday tightness across the upper body, with time to slow down and relax.",
        "A good choice if you spend long periods at a desk, often feel tight around the neck and shoulders, or have limited time.",
      ],
      "zh-Hans": [
        "这是一项 30 分钟的肩颈专项护理。通过有针对性的按摩，照顾肩颈和上半身容易紧绷的部位，让您在忙碌中停一停，放松一下。",
        "适合久坐办公、肩颈常感紧绷，或时间有限的客人。",
      ],
    },
  },
  {
    id: "meridian-therapy",
    group: "body-therapy",
    name: { "en-AU": "Meridian Therapy", "zh-Hans": "经络调理" },
    paragraphs: {
      "en-AU": [
        "Inspired by Eastern wellness traditions, this full-body treatment uses massage techniques informed by traditional meridian practice.",
        "The steady, unhurried rhythm is designed to help you unwind when your body feels heavy or tired, and to leave you feeling more at ease.",
      ],
      "zh-Hans": [
        "这项全身护理源于东方养护理念，以传统经络手法为灵感，采用连贯、有节奏的按摩。",
        "当身体感觉沉重或疲惫时，可以留出这段时间，让身心慢下来，感受放松与舒展。",
      ],
    },
  },
  {
    id: "circulation-therapy",
    group: "body-therapy",
    name: { "en-AU": "Circulation Therapy", "zh-Hans": "气血循环调理" },
    paragraphs: {
      "en-AU": [
        "A 90-minute full-body treatment, covering the back, waist, abdomen and limbs. The practitioner uses a series of massage techniques across these areas rather than focusing on just one spot.",
        "Designed for guests who want a longer session and a feeling of warmth and ease after a long day.",
      ],
      "zh-Hans": [
        "这项 90 分钟的全身护理覆盖背部、腰腹与四肢。护理师依次按摩各个部位，给全身留出更充裕的护理时间。",
        "适合想做较长时间的全身护理，希望在忙碌之后感受温暖、舒展与放松的客人。",
      ],
    },
  },
  {
    id: "lymphatic-detox-therapy",
    group: "body-therapy",
    name: { "en-AU": "Lymphatic Detox Therapy", "zh-Hans": "全身淋巴排毒调理" },
    paragraphs: {
      "en-AU": [
        "A gentle, full-body wellness session covering the face, neck, arms, torso, abdomen and legs. It uses light, carefully paced massage techniques inspired by lymphatic massage.",
        "A good choice if you prefer a soft touch and a slower pace, particularly after long periods of sitting or when your body feels heavy.",
      ],
      "zh-Hans": [
        "这是一项全身轻柔护理，覆盖面部、颈部、手臂、躯干、腹部与下肢。护理以淋巴按摩手法为灵感，力度轻柔，节奏舒缓。",
        "适合偏爱轻柔触感、久坐之后觉得身体沉重，或希望好好放松一下的客人。",
      ],
    },
  },
  {
    id: "express-relaxation-massage",
    group: "signature-massage",
    name: { "en-AU": "Express Relaxation Massage", "zh-Hans": "快速舒缓按摩" },
    paragraphs: {
      "en-AU": [
        "A short relaxation massage focused on the back, shoulders and arms. Gentle, flowing techniques give the upper body a little time to unwind.",
        "Suited to busy days when you want a brief massage for everyday tightness around the shoulders, back or arms.",
      ],
      "zh-Hans": [
        "这是一项短时舒缓按摩，重点照顾肩部、背部与上肢。手法轻柔流畅，让上半身在有限的时间里也能好好放松。",
        "适合行程紧凑、肩背或手臂容易紧绷，想留出片刻休息的客人。",
      ],
    },
  },
  {
    id: "aroma-healing-massage",
    group: "signature-massage",
    name: { "en-AU": "Aroma Healing Massage", "zh-Hans": "芳香舒缓按摩" },
    paragraphs: {
      "en-AU": [
        "A full-body aromatherapy massage covering the neck, shoulders, back, waist, abdomen, arms and legs. Plant-based aromatic oils are paired with gentle, soothing massage.",
        "Scent and touch work together to create a quiet, immersive experience for guests who want time to slow down and unwind.",
      ],
      "zh-Hans": [
        "这项全身芳香按摩覆盖肩颈、背部、腰腹、手臂及下肢。护理以植物芳香精油搭配温和舒缓的按摩手法。",
        "让香气与轻柔触感相伴，适合想慢下来、享受沉浸式全身放松的客人。",
      ],
    },
  },
  {
    id: "deep-sleep-massage",
    group: "signature-massage",
    name: { "en-AU": "Deep Sleep Massage", "zh-Hans": "深度睡眠疗愈" },
    paragraphs: {
      "en-AU": [
        "A slow, steady full-body massage covering the head, neck, shoulders, back, torso, arms and legs. It includes a gentle head massage as part of the relaxation sequence.",
        "Designed for guests who prefer a quiet, unhurried session, especially when it has been hard to switch off after a busy day.",
      ],
      "zh-Hans": [
        "这项全身舒缓按摩覆盖头部、肩颈、背部、躯干、手臂与双腿。整套流程节奏缓慢而平稳，并搭配轻柔的头部按摩。",
        "适合忙碌后想让思绪慢下来，喜欢安静、从容的全身放松体验的客人。",
      ],
    },
  },
  {
    id: "mend-signature-body-ritual",
    group: "signature-massage",
    name: { "en-AU": "MEND Signature Body Ritual", "zh-Hans": "全身焕活身心能量管理" },
    paragraphs: {
      "en-AU": [
        "MEND’s premium, customised full-body ritual attends to the head, neck, shoulders, back, torso, waist, abdomen, arms and legs. It brings together meridian-inspired massage, gentle lymphatic-style techniques and aromatherapy.",
        "The session begins with a relaxing head massage. Your practitioner adjusts the pressure, sequence and pace to suit your comfort, rather than following a fixed routine, and pairs the massage with selected aromatic oils.",
        "Unhurried from start to finish, it is designed for guests who want a more personal, immersive experience and time to fully unwind.",
      ],
      "zh-Hans": [
        "这是 MEND 的高阶定制全身护理，覆盖头部、肩颈、背部、躯干、腰腹、手臂及下肢。疗程结合受传统经络手法启发的按摩、轻柔的淋巴式按摩与芳香护理。",
        "从头部放松按摩开始，护理师会根据您的舒适度调整手法轻重、护理顺序和节奏，并搭配选用的芳香精油，不拘泥于固定流程。",
        "全程舒缓、从容，适合想留出更多时间好好休息，享受沉浸式专属护理的客人。",
      ],
    },
  },
];

/**
 * The only usable footage: muted head spa clip5 (neck/shoulder massage in the
 * spa chair). Reuses the already published encode under /videos/head-spa.
 * Consent to appear is unconfirmed. Do not reuse this clip on other cards.
 */
export const bodyCareNeckClip = {
  id: "neck-shoulder-clip5",
  sources: {
    mp4: "/videos/head-spa/neck-massage.mp4",
    webm: "/videos/head-spa/neck-massage.webm",
  },
  poster: "/videos/head-spa/neck-massage-poster.jpg",
  label: {
    "en-AU": "Neck and shoulder massage filmed during a head spa, in the spa chair, Mend Beauty Studio, Deepdene",
    "zh-Hans": "Mend Beauty Studio Deepdene 门店头疗过程中拍摄的肩颈按摩（头疗椅）",
  } satisfies Localised,
  focus: "50% 25%",
  treatmentId: "express-neck-shoulder-therapy",
  consent: "unconfirmed",
} as const;

export const bodyCareMediaSlotIds = [
  "hero",
  "meridian-therapy",
  "circulation-therapy",
  "lymphatic-detox-therapy",
  "express-relaxation-massage",
  "aroma-healing-massage",
  "deep-sleep-massage",
  "mend-signature-body-ritual",
] as const;

/** Use the owner's first paragraph as the Service description in JSON-LD. */
export function withBodyCareLandingDescriptions<T extends { id: string; description: string }>(
  items: T[],
  locale: BodyCareLocale,
): T[] {
  return items.map((item) => {
    const treatment = bodyCareTreatments.find((entry) => entry.id === item.id);
    return treatment ? { ...item, description: treatment.paragraphs[locale][0] } : item;
  });
}
