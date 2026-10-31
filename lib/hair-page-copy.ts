import type { Locale } from "@/lib/i18n";

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
    title: "Hairdresser in Deepdene | Hair Atelier",
    description: "Visit MEND's Deepdene hair salon for haircuts, colour, balayage, blow-dry styling and perms. Explore Hair Atelier services, prices and online booking.",
    heading: "Hair Atelier — Hair Salon in Deepdene",
    intro: "Visit MEND Beauty Studio at 74 Whitehorse Road, Deepdene for haircuts, colour, highlights, balayage, styling, perms and hair treatments. Explore the menu below to find a service and plan your visit.",
    menuHeading: "Hair services & prices",
    menuIntro: "Jump to the service you have in mind, or browse the full Hair Atelier menu. Each item has its own booking link.",
    serviceLabels: ["Haircuts", "Colour & highlights", "Balayage", "Blow-dry & styling", "Perms & straightening", "Hair & scalp treatments"],
  },
  "zh-Hans": {
    title: "Deepdene 美发沙龙与理发师｜Hair Atelier",
    description: "MEND 位于墨尔本 Deepdene，提供剪发、染发、挑染、Balayage 渐变染、吹整造型及烫发。查看 Hair Atelier 美发项目、价格与在线预约。",
    heading: "Hair Atelier｜Deepdene 美发沙龙",
    intro: "MEND Beauty Studio 位于 Deepdene 的 74 Whitehorse Road，提供剪发、染发、挑染、Balayage 渐变染、造型、烫发及发质护理。浏览下方菜单，了解项目并安排您的到店时间。",
    menuHeading: "美发项目与价格",
    menuIntro: "可直接前往您感兴趣的项目分类，也可浏览完整的 Hair Atelier 菜单。每个项目均设有预约入口。",
    serviceLabels: ["剪发", "染发与挑染", "Balayage 渐变染", "吹整与造型", "烫发与顺直造型", "头皮与发质护理"],
  },
};
