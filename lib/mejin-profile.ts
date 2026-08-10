import type { Locale } from "@/lib/i18n";

export type MejinProfileCopy = {
  eyebrow: string;
  title: string;
  audience: string;
  introduction: string;
  expertiseEyebrow: string;
  expertiseTitle: string;
  specialties: string[];
  approachEyebrow: string;
  approachTitle: string;
  paragraphs: string[];
  journeyEyebrow: string;
  journeyTitle: string;
  journeyIntroduction: string;
  career: string[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  bookLabel: string;
  hairLabel: string;
};

export const mejinImages = {
  portrait: "/images/team/mejin-shick/mejin-professional-portrait.png",
  chinesePoster: "/images/team/mejin-shick/mejin-chinese-profile-poster.png",
} as const;

export const mejinProfile: Record<Locale, MejinProfileCopy> = {
  "en-AU": {
    eyebrow: "Signature Hairdresser",
    title: "Meet Mejin Shick",
    audience:
      "Cutting, colour, straightening and scalp-aware hair care in Deepdene",
    introduction:
      "Mejin combines more than 25 years of salon experience with honest consultation and practical hair-and-scalp education, helping clients choose a style they can understand, enjoy and maintain.",
    expertiseEyebrow: "Signature expertise",
    expertiseTitle: "What Mejin is known for",
    specialties: [
      "Hair straightening and natural-looking straightening",
      "Creative and personalised hair colour",
      "Short cuts and hairstyle transformations",
      "Scalp-aware hair care",
      "Practical home-care and styling education",
      "Honest, easy-to-understand consultations",
    ],
    approachEyebrow: "Her approach",
    approachTitle: "Experience with an honest, practical point of view",
    paragraphs: [
      "Mejin has worked in hairdressing since 2000, building her experience across Kuala Lumpur, Singapore and Melbourne. Her career includes senior stylist roles, scalp-care training and a decade operating her own salons.",
      "She is particularly interested in straightening, natural-looking straightening, creative colour, scalp and hair care, and personalised hairstyle transformations.",
      "Mejin believes clients should understand their hair—not simply be sold a service. She explains hair and scalp concerns in straightforward language and shares practical home-care guidance to help each client look after their result between visits.",
      "Her service philosophy is simple: listen carefully, explain what is realistic and take responsibility for the quality of the work.",
    ],
    journeyEyebrow: "Professional journey",
    journeyTitle: "More than 25 years behind the chair",
    journeyIntroduction:
      "Mejin’s experience spans Malaysia, Singapore and Melbourne, including senior salon roles, scalp-care training and years running her own salons.",
    career: [
      "2000 — Began formal hairdressing training at Cut Inn.",
      "2001 — Trained in scalp-care knowledge and techniques with the Yunnan scalp-care salon group in Kuala Lumpur.",
      "2001–2005 — Progressed from junior to senior hairdresser in Malaysia.",
      "2005–2007 — Worked as a senior hairdresser in Singapore.",
      "2007–2017 — Opened and operated two hair salons in Malaysia.",
      "From 2017 — Continued her career in Melbourne, including roles at Two Birds Salon and Just Cuts.",
    ],
    ctaEyebrow: "Book with Mejin",
    ctaTitle: "Start with an honest hair consultation",
    ctaBody:
      "Choose a MEND hair service or contact the studio if you would like help selecting the right appointment.",
    bookLabel: "Book",
    hairLabel: "View Hair Services",
  },
  "zh-Hans": {
    eyebrow: "资深设计师",
    title: "Mejin Shick｜资深设计师",
    audience: "在 Deepdene 为您提供剪发、染发、拉直及注重头皮健康的美发服务",
    introduction:
      "拥有超过 25 年专业美发经验，Mejin 始终相信，真正适合的发型，不只是当下好看，更应该与一个人的脸型、气质、生活方式及日常打理习惯自然融合。",
    expertiseEyebrow: "专业特长",
    expertiseTitle: "Mejin 擅长的项目",
    specialties: [
      "头发拉直及自然效果拉直",
      "创意染发及个性化发色设计",
      "短发剪裁及发型改造",
      "注重头皮健康的头发护理",
      "居家护理与日常造型指导",
      "诚实、清晰并容易理解的咨询",
    ],
    approachEyebrow: "服务理念",
    approachTitle: "真正适合你的设计，应该自然融入你的生活",
    paragraphs: [
      "多年一线经验，让她在剪发、染发、拉直、发型改造以及头发与头皮护理方面积累了扎实而全面的专业能力。她尤其擅长自然效果拉直、创意染发、个性化发色设计及短发剪裁，并会结合客人的发质、发量、脸型与个人风格，找到真正适合且容易日常打理的设计方向。",
      "Mejin 同样重视头发与头皮的长期健康，在追求造型与质感的同时，也会根据实际情况给予专业的护理及居家养护建议。",
      "在沟通上，她更愿意先倾听客人的需求，不盲目追逐潮流，也不会为了改变而改变，而是在专业建议与个人喜好之间找到最舒服的平衡。",
      "她希望每一次改变，都不是把你变成另一个人，而是让你看起来依然是自己，却更加自信、有质感。",
    ],
    journeyEyebrow: "专业历程",
    journeyTitle: "超过二十五年的美发经验",
    journeyIntroduction:
      "Mejin 的职业经历横跨马来西亚、新加坡与墨尔本，包括资深发型师工作、头皮护理培训及多年发廊经营经验。",
    career: [
      "2000 · 专业启程\n于 Cut Inn 正式进入美发行业，接受系统性的美发技术训练。",
      "2001–2005 · 技术沉淀\n进一步学习专业头皮护理，并在马来西亚多家发廊持续累积实战经验，由初级发型师成长为资深发型师。",
      "2005–2007 · 新加坡发展\n前往新加坡担任资深发型师，拓展不同发质、脸型及多元客群的服务经验。",
      "2007–2017 · 十年发廊经营经验\n回到马来西亚创立并经营两家发廊，从专业技术进一步延伸至顾客管理与门店经营。",
      "2017–至今 · Melbourne Chapter\n移居墨尔本后持续从事专业美发工作，曾任职于 Two Birds Salon、Just Cuts 等，并将多年亚洲美发经验与澳洲顾客需求相结合。",
    ],
    ctaEyebrow: "预约 Mejin",
    ctaTitle: "从一次诚实的美发咨询开始",
    ctaBody:
      "请选择 MEND 美发服务；如不确定适合哪项预约，欢迎先联系门店咨询。",
    bookLabel: "预约",
    hairLabel: "查看美发服务",
  },
};
