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
  galleryEyebrow: string;
  galleryTitle: string;
  galleryIntroduction: string;
  galleryCaptions: string[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  bookLabel: string;
  hairLabel: string;
};

export const mejinImages = {
  portrait: "/images/team/mejin-shick/mejin-portrait.jpeg",
  gallery: [
    "/images/team/mejin-shick/creative-colour.jpeg",
    "/images/team/mejin-shick/warm-short-style.jpeg",
    "/images/team/mejin-shick/textured-short-style.jpeg",
    "/images/team/mejin-shick/copper-short-style.jpeg",
  ],
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
    galleryEyebrow: "Personal style",
    galleryTitle: "Colour, shape and self-expression",
    galleryIntroduction:
      "A look at Mejin’s personal expression through creative colour and versatile short-hair styling.",
    galleryCaptions: [
      "Creative multi-tone colour with a soft, expressive finish.",
      "A warm-toned short style designed for easy everyday wear.",
      "Soft texture and movement through a versatile short cut.",
      "Copper tones paired with a clean, shaped short style.",
    ],
    ctaEyebrow: "Book with Mejin",
    ctaTitle: "Start with an honest hair consultation",
    ctaBody:
      "Choose a MEND hair service or contact the studio if you would like help selecting the right appointment.",
    bookLabel: "Book",
    hairLabel: "View Hair Services",
  },
  "zh-Hans": {
    eyebrow: "招牌发型师",
    title: "认识 Mejin Shick",
    audience: "在 Deepdene 为您提供剪发、染发、拉直及注重头皮健康的美发服务",
    introduction:
      "Mejin 拥有超过二十五年的美发经验，重视诚实沟通与实用的头发、头皮护理知识，帮助客人选择适合自己、喜欢并容易日常打理的发型。",
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
    approachTitle: "丰富经验，加上诚实实用的建议",
    paragraphs: [
      "Mejin 自 2000 年进入美发行业，曾在吉隆坡、新加坡及墨尔本工作。她的经历包括资深发型师岗位、头皮护理培训，以及多年经营自己发廊的经验。",
      "她特别擅长头发拉直、自然效果拉直、创意染发、头皮与头发护理，以及根据客人需要进行个性化发型改造。",
      "Mejin 认为，客人应该真正了解自己的头发，而不只是被推销一项服务。她会用简单易懂的方式解释头发与头皮状况，并分享实用的居家护理方法，帮助客人在两次到店之间维持理想效果。",
      "她的服务理念很简单：认真聆听、诚实说明可实现的效果，并对自己的服务质量负责。",
    ],
    journeyEyebrow: "专业历程",
    journeyTitle: "超过二十五年的美发经验",
    journeyIntroduction:
      "Mejin 的职业经历横跨马来西亚、新加坡与墨尔本，包括资深发型师工作、头皮护理培训及多年发廊经营经验。",
    career: [
      "2000 年 — 在 Cut Inn 开始正式学习美发。",
      "2001 年 — 在吉隆坡云南头皮护理连锁店学习头皮护理知识与操作。",
      "2001–2005 年 — 在马来西亚多家发廊由初级发型师成长为资深发型师。",
      "2005–2007 年 — 在新加坡担任资深发型师。",
      "2007–2017 年 — 在马来西亚开设并经营两家发廊。",
      "2017 年起 — 在墨尔本继续发展，包括曾任职于 Two Birds Salon 与 Just Cuts。",
    ],
    galleryEyebrow: "个人风格",
    galleryTitle: "发色、轮廓与个性表达",
    galleryIntroduction:
      "从创意发色到多种短发造型，展现 Mejin 对色彩与个人风格的理解。",
    galleryCaptions: [
      "柔和而富有表现力的多色创意染发。",
      "温暖发色搭配容易日常打理的短发造型。",
      "通过层次与纹理，让短发呈现自然动感。",
      "铜色调搭配干净利落的短发轮廓。",
    ],
    ctaEyebrow: "预约 Mejin",
    ctaTitle: "从一次诚实的美发咨询开始",
    ctaBody:
      "请选择 MEND 美发服务；如不确定适合哪项预约，欢迎先联系门店咨询。",
    bookLabel: "预约",
    hairLabel: "查看美发服务",
  },
};
