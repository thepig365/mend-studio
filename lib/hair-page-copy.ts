import type { Locale } from "@/lib/i18n";

// Existing MEND studio image, already used by the approved promotion pages.
export const hairStudioImage = {
  src: "/images/mend-beauty-salon-interior-1.png",
  alt: {
    "en-AU": "Hair styling stations inside MEND Beauty Studio in Deepdene",
    "zh-Hans": "MEND Beauty Studio 位于 Deepdene 的店内美发工作区",
  },
};

export const hairPageCopy: Record<Locale, {
  title: string;
  description: string;
  heading: string;
  intro: string;
  menuHeading: string;
  menuIntro: string;
  serviceLabels: string[];
}> = {
  "en-AU": {
    title: "Hairdresser Balwyn & Deepdene · Hair Atelier",
    description: "Visit MEND's hair salon at 74 Whitehorse Road, Deepdene, on the Balwyn border, for haircuts, colour, balayage, blow-dry styling and perms. Explore Hair Atelier services, prices and online booking.",
    heading: "Hair Atelier — Hair Salon near Balwyn, in Deepdene",
    intro: "Visit MEND Beauty Studio at 74 Whitehorse Road, Deepdene for haircuts, colour, highlights, balayage, styling, perms and hair treatments. Explore the menu below to find a service and plan your visit.",
    menuHeading: "Hair services & prices",
    menuIntro: "Browse the Hair Atelier menu and note the service name you would like to book. Book opens MEND’s MaSe booking menu, where you can select your service and check the current price and available times.",
    serviceLabels: ["Haircuts", "Colour & highlights", "Balayage", "Blow-dry & styling", "Perms & straightening", "Hair & scalp treatments"],
  },
  "zh-Hans": {
    title: "Balwyn 及 Deepdene 美发沙龙与理发师｜Hair Atelier",
    description: "MEND 位于墨尔本 Deepdene 的 74 Whitehorse Road，紧邻 Balwyn，提供剪发、染发、挑染、Balayage 渐变染、吹整造型及烫发。查看 Hair Atelier 美发项目、价格与在线预约。",
    heading: "Hair Atelier｜Balwyn 附近美发沙龙（Deepdene）",
    intro: "MEND Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，提供剪发、染发、挑染、Balayage 渐变染、造型、烫发及发质护理。浏览下方菜单，了解项目并安排您的到店时间。",
    menuHeading: "美发项目与价格",
    menuIntro: "浏览 Hair Atelier 菜单，记下您想预约的项目名称。点击“预约”后将打开 MEND 的 MaSe 预约菜单，请在 MaSe 选择项目，并查看当前价格与可预约时间。",
    serviceLabels: ["剪发", "染发与挑染", "Balayage 渐变染", "吹整与造型", "烫发与顺直造型", "头皮与发质护理"],
  },
};
