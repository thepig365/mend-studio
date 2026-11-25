// Chair rental landing copy. English body text is the owner's copy (t279u),
// with the days sentence updated at his request (t281u): independent
// hairdressers may work Monday to Saturday, including Wednesdays, but not
// Sundays. Customer-facing studio opening hours are unchanged.
//
// The Chinese page is a faithful draft translation for Chinese-Australian
// hairdressers; mark it as a draft in review until the owner approves it.
//
// Photos: only real studio stills and one frame from a real décor clip.
// Leon's eleven later stills (2026-11-25 handoff) carry C2PA / OpenAI
// gpt-image / trainedAlgorithmicMedia provenance and are not used.

export type ChairRentalLocale = "en-AU" | "zh-Hans";

type Localised = Record<ChairRentalLocale, string>;

export type ChairRentalStillId =
  | "salon-interior"
  | "styling-stations"
  | "product-station"
  | "studio-decor";

export type ChairRentalStillVariant = {
  src: string;
  width: number;
  format: "avif" | "webp" | "jpg";
};

export type ChairRentalStill = {
  id: ChairRentalStillId;
  width: number;
  height: number;
  alt: Localised;
  variants: ChairRentalStillVariant[];
};

const still = (
  id: ChairRentalStillId,
  width: number,
  height: number,
  widths: number[],
  alt: Localised,
): ChairRentalStill => ({
  id,
  width,
  height,
  alt,
  variants: widths.flatMap((w) => [
    { src: `/images/chair-rental/${id}-${w}.avif`, width: w, format: "avif" as const },
    { src: `/images/chair-rental/${id}-${w}.webp`, width: w, format: "webp" as const },
    { src: `/images/chair-rental/${id}-${w}.jpg`, width: w, format: "jpg" as const },
  ]),
});

export const chairRentalStills: Record<ChairRentalStillId, ChairRentalStill> = {
  "salon-interior": still("salon-interior", 1024, 576, [640, 1024], {
    "en-AU": "The salon interior at Mend Beauty Studio in Deepdene, with styling stations along a row of arched mirrors",
    "zh-Hans": "Mend Beauty Studio Deepdene 门店内景，一排拱形镜前的美发工位",
  }),
  "styling-stations": still("styling-stations", 768, 1024, [480, 768], {
    "en-AU": "Hair styling stations and arched mirrors at Mend Beauty Studio, Deepdene",
    "zh-Hans": "Mend Beauty Studio Deepdene 的美发工位与拱形镜",
  }),
  "product-station": still("product-station", 768, 1024, [480, 768], {
    "en-AU": "Product shelves and a professional hair care station at Mend Beauty Studio, Deepdene",
    "zh-Hans": "Mend Beauty Studio Deepdene 的产品货架与专业美发工作台",
  }),
  "studio-decor": still("studio-decor", 720, 1280, [480, 720], {
    "en-AU": "A floral arrangement in a lit niche at Mend Beauty Studio, Deepdene",
    "zh-Hans": "Mend Beauty Studio Deepdene 门店壁龛中的花艺陈列",
  }),
};

export type ChairRentalBenefit = {
  title: Localised;
  body: Localised;
};

export const chairRentalCopy: Record<
  ChairRentalLocale,
  {
    documentTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    lead: string;
    intro: string;
    sectionTitle: string;
    benefits: { title: string; body: string }[];
    price: string;
    location: string;
    ctaHeading: string;
    ctaBody: string;
    ctaLabel: string;
    ctaHref: string;
    ctaFollow: string;
    galleryLabel: string;
  }
> = {
  "en-AU": {
    documentTitle: "Rent a Chair in Deepdene | For Independent Hairdressers & Colourists",
    metaDescription:
      "Give your clients a salon they’ll love coming back to, without the cost of opening your own. One styling station at MEND Beauty Studio, 74 Whitehorse Road, Deepdene. A$375 for three fixed days per week.",
    title: "Rent a Chair in Deepdene",
    subtitle: "For Independent Hairdressers & Colourists",
    lead: "Give your clients a salon they’ll love coming back to, without the cost of opening your own.",
    intro:
      "If you’ve built a loyal clientele but outgrown working from home, or you’re ready to go independent without taking on a whole shop, MEND Beauty Studio has one styling station available. Run your own hair business from a professional salon without the big upfront investment or the ongoing burden of a full salon lease.",
    sectionTitle: "What you get at MEND:",
    benefits: [
      {
        title: "Your own profile, with paid marketing behind it.",
        body: "We’ll showcase your work, business phone number and booking link on our website, and put MEND marketing budget behind promoting your services locally. Clients contact and book with you directly.",
      },
      {
        title: "A ready-to-use workspace.",
        body: "Your rental includes a styling station, shared wash basins, towels, capes and basic wash products. Bring your own colour or pay for selected salon products as you use them.",
      },
      {
        title: "Another way to earn.",
        body: "Refer clients to eligible MEND head spa or beauty services and earn a referral fee when they complete a paid appointment, under our agreed terms.",
      },
      {
        title: "Your business stays yours.",
        body: "You set your prices, manage your bookings and take your own payments.",
      },
    ],
    price:
      "A$375 for three fixed days per week, with a three-day weekly minimum. Choose from Monday to Saturday by arrangement, including Wednesdays and Saturdays. Extra days can be discussed.",
    location:
      "You’ll be based at 74 Whitehorse Road, Deepdene, close to Balwyn, Canterbury, Hawthorn, Kew, Camberwell, Surrey Hills and Mont Albert.",
    ctaHeading: "Make my business your business.",
    ctaBody: "Come see the studio and picture bringing your next client here.",
    ctaLabel: "Enquire to arrange a walkthrough",
    ctaHref: "/careers",
    ctaFollow:
      "Tell us what you specialise in, share your portfolio or Instagram, and let us know which three days would suit you.",
    galleryLabel: "The studio",
  },
  "zh-Hans": {
    documentTitle: "Deepdene 租椅｜面向独立美发师与染发师",
    metaDescription:
      "不必自己开店，也能给客人一个愿意一再回来的专业沙龙。MEND Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，现有一个美发工位可租，每周固定三天 A$375。",
    title: "Deepdene 租椅",
    subtitle: "面向独立美发师与染发师",
    lead: "让客人愿意一再回来的沙龙，不必自己开店承担成本。",
    intro:
      "如果你已经有一批稳定客人，在家里做已经不够用了，或想独立经营却不想租下整间店，MEND Beauty Studio 现有一个美发工位可租。在专业沙龙里经营自己的美发生意，不必投入大笔前期资金，也不必承担整店租赁的持续负担。",
    sectionTitle: "在 MEND，你可以获得：",
    benefits: [
      {
        title: "属于你的展示主页，并由我们投入付费推广。",
        body: "我们会在官网上展示你的作品、业务电话和预约链接，并用 MEND 的营销预算在本地推广你的服务。客人直接联系你、向你预约。",
      },
      {
        title: "即可使用的工作空间。",
        body: "租金包含一个美发工位、共用洗发区、毛巾、围布和基础洗发用品。染膏请自备，或按用量购买店内指定产品。",
      },
      {
        title: "额外的收入方式。",
        body: "向符合条件的 MEND 头疗或美容项目转介客人，客人完成付费预约后，按双方约定条款获得转介费。",
      },
      {
        title: "生意仍是你的。",
        body: "价格由你定，预约由你管，收款也归你。",
      },
    ],
    price:
      "每周固定三天 A$375，每周至少三天。可在周一至周六中协商选择，包括周三和周六。额外天数可以商量。",
    location:
      "你的工位设在 Deepdene 的 74 Whitehorse Road，邻近 Balwyn、Canterbury、Hawthorn、Kew、Camberwell、Surrey Hills 和 Mont Albert。",
    ctaHeading: "让我的店，成就你的生意。",
    ctaBody: "来看看工作室，想象下一次带客人来这里的样子。",
    ctaLabel: "预约看店",
    ctaHref: "/zh/careers",
    ctaFollow: "请告诉我们你擅长的项目，分享作品集或 Instagram，并告知哪三天对你最合适。",
    galleryLabel: "门店环境",
  },
};

export const chairRentalPath = "/chair-rental";
