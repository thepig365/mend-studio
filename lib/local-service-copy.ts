import type { Locale } from "@/lib/i18n";

type LocalCopy = {
  title: string;
  description: string;
  heading: string;
  subtitle: string;
  nearby: string;
  /** Sentence-case line above the H1. Not the tracked uppercase eyebrow. */
  kicker?: string;
  /** One synonym or service sentence shown above the nearby-suburbs section. */
  lead?: string;
};

// Titles, descriptions and H1s for service pages. The studio is in Deepdene, on the Balwyn border.
export const localServiceCopy: Record<
  "head-spa" | "hair-scalp-recovery" | "skin-facial" | "body-care" | "mens-grooming",
  Record<Locale, LocalCopy>
> = {
  "head-spa": {
    "en-AU": {
      title: "Head Spa near Balwyn · Korean Head Spa, Deepdene",
      description:
        "Korean Signature Head Spa and head spa rituals at 74 Whitehorse Road, Deepdene, near Balwyn. Scalp cleansing and head massage, 30–120 mins. Cosmetic care.",
      heading: "Head Spa near Balwyn, in Deepdene",
      subtitle: "Scalp & Mind Wellness",
      kicker: "Korean Signature Head Spa · Hair Spa · Scalp Spa",
      lead: "Some guests call it a hair spa or scalp spa; at MEND it is our Head Spa menu.",
      nearby: "Head spa visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 附近头疗店｜韩式经典头疗 Deepdene",
      description:
        "MEND 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，提供韩式经典头疗与放松头疗，包括头皮清洁和头部按摩，约 30–120 分钟。属美容护理，并非医疗诊断或治疗。",
      heading: "Balwyn 附近头疗｜Deepdene 门店",
      subtitle: "头部按摩与放松",
      kicker: "韩式经典头疗",
      lead: "有些客人会称为 hair spa 或 scalp spa；在 MEND，这是头疗菜单。",
      nearby: "头疗预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
  "hair-scalp-recovery": {
    "en-AU": {
      title: "Scalp Treatment & Scalp Analysis near Balwyn, Deepdene",
      description:
        "Cosmetic scalp treatments near Balwyn, 74 Whitehorse Road, Deepdene: MEND AI Scalp Analysis ($50), rituals ($199) and Scalp Detox. Not medical treatment.",
      heading: "Scalp Care & Scalp Treatments near Balwyn, in Deepdene",
      subtitle: "Hair & Scalp Treatments",
      nearby: "Scalp care visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 附近头皮护理与头皮检测｜Deepdene",
      description:
        "位于 Deepdene 74 Whitehorse Road、紧邻 Balwyn 的美容头皮护理：AI头皮检测分析（$50）、头皮护理项目（$199）及头皮毛孔净化加购。并非医疗诊断或治疗。",
      heading: "Balwyn 附近头皮护理与头皮检测｜Deepdene 门店",
      subtitle: "头皮检测与头皮护理",
      nearby: "头皮护理预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
  "skin-facial": {
    "en-AU": {
      title: "Korean Facials near Balwyn, Deepdene",
      description:
        "Korean facials near Balwyn at 74 Whitehorse Road, Deepdene, including Korean Facial Sculpting. Tailored after consultation. Individual results vary.",
      heading: "Korean Facials & Skin Care near Balwyn, in Deepdene",
      subtitle: "Korean Professional Skincare",
      nearby: "Facial and skin care visits are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 附近韩式皮肤管理与面部护理｜Deepdene",
      description:
        "Mend Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn。提供韩式皮肤管理，包括韩式徒手小颜V脸管理。护理需先咨询，效果因人而异。",
      heading: "Balwyn 附近韩式皮肤管理与面部护理｜Deepdene 门店",
      subtitle: "韩式皮肤管理",
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
  "mens-grooming": {
    "en-AU": {
      title: "Men’s Haircuts & Grooming near Balwyn, Deepdene",
      description:
        "Men’s haircuts, skin fades, beard trims, grey blending and men’s scalp detox at 74 Whitehorse Road, Deepdene, near Balwyn. Prices and online booking.",
      heading: "Men’s Haircuts & Grooming near Balwyn, in Deepdene",
      subtitle: "Cuts · Grooming · Scalp Care",
      nearby: "Men’s haircuts and grooming are booked at our Deepdene studio on Whitehorse Road, on the Balwyn border.",
    },
    "zh-Hans": {
      title: "Balwyn 附近男士理发与理容｜Deepdene",
      description:
        "MEND 位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，提供男士剪发、渐层推剪、胡须修整、白发自然调色与男士头皮净化护理。查看价格与在线预约。",
      heading: "男士理发与理容｜Balwyn 附近 Deepdene 门店",
      subtitle: "男士剪发 · 理容",
      nearby: "男士理发与理容预约均在我们位于 Whitehorse Road、紧邻 Balwyn 的 Deepdene 门店进行。",
    },
  },
};

export type LocalServiceSlug = keyof typeof localServiceCopy;
