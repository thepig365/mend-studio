import type { Locale } from "@/lib/i18n";

// 40–60 word English openings, and the Simplified Chinese equivalent.
// Facts only: address and phone from lib/site.ts, prices and durations from
// lib/anna-services.ts. The studio is in Deepdene, near Balwyn.
const answerIntros: Record<string, Record<Locale, string>> = {
  "head-spa": {
    "en-AU":
      "Head spa at Mend Beauty Studio is cosmetic scalp care and relaxation at 74 Whitehorse Road, Deepdene, near Balwyn. The menu runs from Express Head Spa at $78 for 30 minutes to MEND Signature Head Ritual at $398 for 120 minutes. These are not medical treatments, and results vary. Book online or call 0499 66 88 99.",
    "zh-Hans":
      "Mend Beauty Studio 的头疗，是位于 Deepdene 74 Whitehorse Road、紧邻 Balwyn 的美容型头皮护理与放松服务。菜单从 30 分钟、$78 的快速头疗，到 120 分钟、$398 的 MEND臻选头疗。这些并非医疗诊断或治疗，效果因人而异。可在线预约，或致电 0499 66 88 99。",
  },
  "hair-scalp-recovery": {
    "en-AU":
      "Scalp care at Mend Beauty Studio covers cosmetic hair conditioning, scalp assessments and scalp-care rituals at 74 Whitehorse Road, Deepdene, near Balwyn. Assessments are $50, Hydra Hair Ritual is $150, and the listed scalp rituals are $199. This is not medical diagnosis or treatment. Book online or call 0499 66 88 99.",
    "zh-Hans":
      "Mend Beauty Studio 的头皮护理位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，包括发质养护、头皮检测与美容型头皮护理。检测项目为 $50，Hydra Hair Ritual 水润舒缓发质护理为 $150，四项头皮护理为 $199，头皮毛孔净化加购为 $58。这些并非医疗诊断或治疗。可在线预约，或致电 0499 66 88 99。",
  },
  "skin-facial": {
    "en-AU":
      "Facials and skin care at Mend Beauty Studio are cosmetic appointments at 74 Whitehorse Road, Deepdene, near Balwyn. The menu includes a 60-minute MEND Skin Reset at $168, add-ons at $69, and programs priced up to $4999. Care is tailored after consultation, and individual results vary. Book online or call 0499 66 88 99.",
    "zh-Hans":
      "Mend Beauty Studio 的面部与肌肤护理位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn。菜单包括 60 分钟、$168 的修复护理，加项 $69，以及最高 $4999 的新娘焕颜计划。护理需先咨询，效果因人而异。可在线预约，或致电 0499 66 88 99。",
  },
  "hair": {
    "en-AU":
      "Mend Beauty Studio is a hairdresser at 74 Whitehorse Road, Deepdene, near Balwyn. Hair Atelier includes cuts, colour, styling and perms. Ladies Signature Cut is from $75 and Signature Colour is from $180. Where a starting price is shown, the final price may vary after consultation. Book online or call 0499 66 88 99.",
    "zh-Hans":
      "Mend Beauty Studio 是位于 Deepdene 74 Whitehorse Road、紧邻 Balwyn 的美发沙龙与理发师，提供剪发、染发、造型与烫发。女士设计剪发 $75 起，全头染发 $180 起。标注起价的项目，最终价格可能在咨询后调整。可在线预约，或致电 0499 66 88 99。",
  },
  "body-care": {
    "en-AU":
      "Body care at Mend Beauty Studio is relaxation-focused body therapy and massage at 74 Whitehorse Road, Deepdene, near Balwyn. Appointments run from 30 minutes at $88 to the 120-minute MEND Signature Body Ritual at $348. These services do not diagnose or treat medical conditions. Book online or call 0499 66 88 99.",
    "zh-Hans":
      "Mend Beauty Studio 的身体护理位于 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，以身体理疗与放松按摩为主。项目从 30 分钟、$88 起，到 120 分钟、$348 的全身焕活身心能量管理。这些服务不诊断或治疗医疗问题。可在线预约，或致电 0499 66 88 99。",
  },
};

export function answerIntro(slug: string, locale: Locale) {
  return answerIntros[slug]?.[locale];
}
