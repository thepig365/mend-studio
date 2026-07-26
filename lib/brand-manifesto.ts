import type { Locale } from "@/lib/i18n";

type ManifestoCopy = {
  eyebrow: string;
  title: string;
  tagline: string;
  introduction: string[];
  belief: string[];
  journey: string[];
  ecosystemIntroduction: string;
  ecosystem: { title: string; description: string }[];
  conviction: string[];
  closing: string[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  contactLabel: string;
  servicesLabel: string;
};

export const brandManifesto: Record<Locale, ManifestoCopy> = {
  "en-AU": {
    eyebrow: "Our Philosophy",
    title: "The MEND Brand Manifesto",
    tagline: "Beauty restored. The heart reconciled.",
    introduction: [
      "MEND means to repair.",
      "Everyone deserves the chance to be restored.",
      "Life always leaves its marks.",
      "Pressure, busyness, time and experience leave traces on our appearance, and unseen fractures within. We work hard to care for others, yet often overlook ourselves. We pursue a better life, yet forget to pause and listen to what is happening inside us.",
      "What needs care is not only how we look, but also the smiles hidden beneath pressure, the enthusiasm worn down by reality, and the hopeful self we once knew.",
    ],
    belief: [
      "We believe true beauty belongs to both appearance and spirit. It is not a temporary transformation, but the composure that comes with time, the calm that follows life’s storms, and the freedom of making peace with ourselves.",
      "True beauty grows from health, confidence, calm and love; from being at peace with ourselves, connected with others and engaged with life. When the inner life is settled, outward beauty can unfold naturally.",
    ],
    journey: [
      "MEND is therefore more than a Beauty Studio. It is a way of living, and a journey of restoration, growth and hope.",
      "Beginning with professional hair, scalp and skin care, we bring together art, music, nature, reading and community culture. Each treatment, creative act and gathering can become a moment of renewal for body, mind and emotion.",
    ],
    ecosystemIntroduction:
      "MEND connects organically with Bayview Hub, bringing beauty, aesthetics, art, nature and community into one living relationship. From the Beauty Studio, exhibitions and art wellbeing workshops to Mend, the Mend App, natural gardens, music sharing and community events, we are building an ecosystem where Beauty, Mind, Art, Nature and Community meet—and where restoration can become a continuing way of life.",
    ecosystem: [
      {
        title: "Beauty",
        description:
          "Professional hair, scalp, skin and beauty care that supports confidence and considered self-care.",
      },
      {
        title: "Mind",
        description:
          "Time and space to pause, reset and reconnect with yourself.",
      },
      {
        title: "Art",
        description:
          "Creative expression, exhibitions and thoughtful experiences that give emotion a voice.",
      },
      {
        title: "Nature",
        description:
          "Calm, restorative surroundings and a closer relationship with the natural world.",
      },
      {
        title: "Community",
        description:
          "Sincere relationships, shared experiences and a welcoming sense of belonging.",
      },
    ],
    conviction: [
      "We believe beauty can rebuild confidence; art can give emotion a voice; music can offer the mind a place to rest; nature can renew life; sincere relationships can create belonging; community can provide support; and love can repair our deepest connections with one another.",
      "So we care for more than hair and skin.",
      "We seek to restore our relationship with ourselves, with others, with life and with the world.",
      "Because what is truly worth restoring is not only the outward self, but life itself.",
    ],
    closing: [
      "MEND — Beauty restored. The heart reconciled.",
      "May everyone who enters MEND arrive with anticipation and leave with calm, confidence and hope.",
    ],
    ctaEyebrow: "Begin Your MEND Journey",
    ctaHeading: "Make space for care, calm and renewal.",
    ctaBody:
      "Explore our services or speak with the studio about the experience that feels right for you.",
    contactLabel: "Contact Us",
    servicesLabel: "Explore Services",
  },
  "zh-Hans": {
    eyebrow: "品牌宣言",
    title: "MEND 品牌宣言",
    tagline: "美的修复，心的和解",
    introduction: [
      "MEND，意为修复。",
      "每个人，都值得被修复。",
      "人生，总会留下痕迹。",
      "压力、忙碌、岁月与经历，会在容颜留下印记，也会在心中留下看不见的裂痕。我们努力照顾别人，却常常忽略了自己；追求更好的生活，却忘了静下来倾听自己的内心。",
      "真正需要被修复的，是我们的外表，还有那些被压力掩盖的笑容、被现实消磨的热情，以及那个曾经充满希望的自己。",
    ],
    belief: [
      "我们相信，真正的美，是容貌之美，也是心灵之美；不是短暂的改变，而是历经岁月后的从容，经历风雨后的平静，以及与自己和解后的自在。",
      "真正的美，源于健康、自信、平静与爱；源于人与自己和解，与他人连接，与生活同行。当内心安然，外在便自然绽放。",
    ],
    journey: [
      "因此，MEND 不只是一个 Beauty Studio，更是一种生活理念，一段关于修复、成长与希望的旅程。",
      "我们以专业美发、头皮护理与肌肤管理为基础，融合艺术疗愈、音乐、自然、阅读与社区文化，让每一次护理、每一次创作、每一次相聚，都成为一次身体、心灵与情绪的修复。",
    ],
    ecosystemIntroduction:
      "MEND 与 Bayview Hub 有机连接，让美容、美学、艺术、自然与社区彼此融合。从 Beauty Studio、艺术展览、美术疗愈工作坊，到《Mend》、Mend App、自然花园、音乐分享与社区活动，我们共同构建一个融合 Beauty、Mind、Art、Nature 与 Community 的疗愈生态，让修复成为一种可以持续实践的生活方式。",
    ecosystem: [
      {
        title: "Beauty · 美",
        description: "以专业美发、头皮、肌肤与美容护理，支持自信与用心的自我照顾。",
      },
      {
        title: "Mind · 心",
        description: "留出停下来、重新整理并与自己连接的时间和空间。",
      },
      {
        title: "Art · 艺术",
        description: "以创作、展览与有温度的体验，让情绪得到表达。",
      },
      {
        title: "Nature · 自然",
        description: "在平静舒适的环境中，重新感受人与自然的连接。",
      },
      {
        title: "Community · 社区",
        description: "以真诚关系、共同体验与包容氛围，带来归属和支持。",
      },
    ],
    conviction: [
      "我们相信，美能够重建自信；艺术能够表达情绪；音乐能够安放心灵；自然能够疗愈生命；真诚的关系能够带来归属；社区能够给予支持；而爱，能够修复人与人之间最深的连接。",
      "所以，我们修复的不只是头发，不只是肌肤。",
      "我们修复人与自己、人与他人、人与生活，以及人与世界的关系。",
      "因为真正值得修复的，不只是外在，而是生命本身。",
    ],
    closing: [
      "MEND——美的修复，心的和解。",
      "愿每一个走进 MEND 的人，都带着期待而来，带着平静、自信与希望离开。",
    ],
    ctaEyebrow: "开启您的 MEND 旅程",
    ctaHeading: "为照顾、平静与重新出发留出空间。",
    ctaBody: "浏览我们的服务，或联系我们，一起了解更适合您的到店体验。",
    contactLabel: "联系我们",
    servicesLabel: "浏览服务",
  },
};
