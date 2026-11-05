import type { Locale } from "@/lib/i18n";

type LocalCopy = {
  title: string;
  description: string;
  heading: string;
  subtitle: string;
  nearby: string;
};

// Titles, descriptions and H1s for service pages: Balwyn & Deepdene local signal. The studio is in Deepdene, on the Balwyn border.
export const localServiceCopy: Record<
  "head-spa" | "hair-scalp-recovery" | "skin-facial" | "body-care",
  Record<Locale, LocalCopy>
> = {
  "head-spa": {
    "en-AU": {
      title: "Head Spa Balwyn & Deepdene",
      description:
        "Head spa near Balwyn at Mend Beauty Studio, 74 Whitehorse Road, Deepdene, on tram route 109. Scalp-care and relaxation rituals include Korean Signature Head Spa. Cosmetic care, not medical treatment.",
      heading: "Head Spa near Balwyn, in Deepdene",
      subtitle: "Scalp & Mind Wellness",
      nearby: "Head spa visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 及 Deepdene 头疗",
      description:
        "Mend Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，109 路电车可达。提供头疗与头皮放松护理，包括韩式经典头疗。这些是美容护理，并非医疗诊断或治疗。",
      heading: "Balwyn 附近头疗｜Deepdene 门店",
      subtitle: "头皮护理与身心放松",
      nearby: "头疗预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
  "hair-scalp-recovery": {
    "en-AU": {
      title: "Scalp Care Balwyn & Deepdene",
      description:
        "Scalp care near Balwyn at Mend Beauty Studio, 74 Whitehorse Road, Deepdene, with conditioning, scalp assessments and cosmetic rituals including Hydra Hair Ritual. Not medical diagnosis or treatment.",
      heading: "Scalp Care near Balwyn, in Deepdene",
      subtitle: "Hair & Scalp Treatments",
      nearby: "Scalp care visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 及 Deepdene 头皮护理",
      description:
        "Mend Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn。提供头皮护理、发质养护与头皮检测，包括 Hydra Hair Ritual 水润舒缓发质护理。这些是美容护理，并非医疗诊断或治疗。",
      heading: "Balwyn 附近头皮护理｜Deepdene 门店",
      subtitle: "头皮与发质护理",
      nearby: "头皮护理预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
  "skin-facial": {
    "en-AU": {
      title: "Facials Balwyn & Deepdene",
      description:
        "Facials and skin care near Balwyn at Mend Beauty Studio, 74 Whitehorse Road, Deepdene. Korean facials and the MEND Skin Collection are tailored after consultation. Individual results vary.",
      heading: "Facials and Skin Care near Balwyn, in Deepdene",
      subtitle: "Korean Professional Skincare",
      nearby: "Facial and skin care visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 及 Deepdene 面部与肌肤护理",
      description:
        "Mend Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn。提供面部护理与肌肤管理，包括基础护理、护理加项与定制疗程。护理需先咨询，效果因人而异。",
      heading: "Balwyn 附近面部与肌肤护理｜Deepdene 门店",
      subtitle: "肌肤管理",
      nearby: "面部与肌肤护理预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
  "body-care": {
    "en-AU": {
      title: "Body Care Balwyn & Deepdene",
      description:
        "Body care near Balwyn at Mend Beauty Studio, 74 Whitehorse Road, Deepdene. Relaxation-focused body therapy and massage, from 30 minutes at $88. Not medical diagnosis or treatment.",
      heading: "Body Care near Balwyn, in Deepdene",
      subtitle: "Body Wellness & Relaxation",
      nearby: "Body care visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 及 Deepdene 身体护理",
      description:
        "Mend Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn。提供以放松为主的身体理疗与按摩，30 分钟项目 $88 起。这些是放松服务，并非医疗诊断或治疗。",
      heading: "Balwyn 附近身体护理｜Deepdene 门店",
      subtitle: "身体护理与放松",
      nearby: "身体护理预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
};

export type LocalServiceSlug = keyof typeof localServiceCopy;
