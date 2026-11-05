import type { Locale } from "@/lib/i18n";

type LocalCopy = {
  title: string;
  description: string;
  heading: string;
  subtitle: string;
  nearby: string;
};

// Titles, descriptions and H1s for the service pages that need a clearer
// Deepdene signal. Facts are taken from the existing menus and care notes.
export const localServiceCopy: Record<"head-spa" | "hair-scalp-recovery" | "skin-facial", Record<Locale, LocalCopy>> = {
  "head-spa": {
    "en-AU": {
      title: "Head Spa in Deepdene",
      description:
        "Head spa in Deepdene at Mend Beauty Studio. Scalp-care and relaxation rituals include Korean Signature Head Spa. Cosmetic care, not medical treatment.",
      heading: "Head Spa in Deepdene",
      subtitle: "Scalp & Mind Wellness",
      nearby: "Head spa visits are booked at the Deepdene studio.",
    },
    "zh-Hans": {
      title: "Deepdene 头疗",
      description:
        "Mend Beauty Studio 位于 Deepdene，提供头疗与头皮放松护理，包括韩式经典头疗。这些是美容护理，并非医疗诊断或治疗。",
      heading: "Deepdene 头疗",
      subtitle: "头皮护理与身心放松",
      nearby: "头疗预约均在 Deepdene 门店进行。",
    },
  },
  "hair-scalp-recovery": {
    "en-AU": {
      title: "Scalp Care in Deepdene",
      description:
        "Scalp care in Deepdene at Mend Beauty Studio, with conditioning, scalp assessments and cosmetic rituals including Hydra Hair Ritual. Not medical diagnosis or treatment.",
      heading: "Scalp Care in Deepdene",
      subtitle: "Hair & Scalp Treatments",
      nearby: "Scalp care visits are booked at the Deepdene studio.",
    },
    "zh-Hans": {
      title: "Deepdene 头皮护理",
      description:
        "Mend Beauty Studio 位于 Deepdene，提供头皮护理、发质养护与头皮检测，包括 Hydra Hair Ritual 水润舒缓发质护理。这些是美容护理，并非医疗诊断或治疗。",
      heading: "Deepdene 头皮护理",
      subtitle: "头皮与发质护理",
      nearby: "头皮护理预约均在 Deepdene 门店进行。",
    },
  },
  "skin-facial": {
    "en-AU": {
      title: "Facial and Skin Care in Deepdene",
      description:
        "Facial and skin care in Deepdene at Mend Beauty Studio. Korean facials and the MEND Skin Collection are tailored after consultation. Individual results vary.",
      heading: "Facial and Skin Care in Deepdene",
      subtitle: "Korean Professional Skincare",
      nearby: "Facial and skin care visits are booked at the Deepdene studio.",
    },
    "zh-Hans": {
      title: "Deepdene 面部与肌肤护理",
      description:
        "Mend Beauty Studio 位于 Deepdene，提供面部护理与肌肤管理，包括基础护理、护理加项与定制疗程。护理需先咨询，效果因人而异。",
      heading: "Deepdene 面部与肌肤护理",
      subtitle: "肌肤管理",
      nearby: "面部与肌肤护理预约均在 Deepdene 门店进行。",
    },
  },
};

export type LocalServiceSlug = keyof typeof localServiceCopy;
