export const locales = ["en-AU", "zh-Hans"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-AU";
export const chineseLocale: Locale = "zh-Hans";

export function isChinesePath(pathname: string) {
  return pathname === "/zh" || pathname.startsWith("/zh/");
}

export function stripLocale(pathname: string) {
  if (pathname === "/zh") return "/";
  return pathname.startsWith("/zh/") ? pathname.slice(3) || "/" : pathname;
}

export function localePath(pathname: string, locale: Locale) {
  const base = stripLocale(pathname);
  if (locale === chineseLocale) {
    return base === "/" ? "/zh" : `/zh${base}`;
  }
  return base;
}

export const localizedRoutes = [
  "/",
  "/services",
  "/journey",
  "/services/hair",
  "/services/head-spa",
  "/services/skin",
  "/services/body",
  "/services/signature-rituals",
  "/services/skin-facial",
  "/services/body-care",
  "/services/brows-lashes",
  "/services/mens-grooming",
  "/services/nails",
  "/services/semi-permanent",
  "/book",
  "/gift-cards",
  "/memberships",
  "/careers",
  "/contact",
  "/our-story",
  "/policies",
] as const;

export const ui = {
  "en-AU": {
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    home: "Home",
    services: "Services",
    headSpa: "Head Spa",
    giftCards: "Gift Cards",
    memberships: "Memberships",
    careers: "Careers",
    contact: "Contact",
    bookNow: "Book",
    bookAppointment: "Book",
    allServices: "All Services",
    call: "Call",
    callNow: "Call now",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    explore: "Explore",
    visitUs: "Visit Us",
    openingHours: "Opening Hours",
    phone: "Phone",
    email: "Email",
    policies: "Policies",
    share: "Share",
    language: "Language",
    switchLanguage: "中文",
    switchLanguageLabel: "View this page in Simplified Chinese",
    rights: "All rights reserved.",
    temporaryImages:
      "Some images are temporary stock images used for illustration only and will be replaced with professional Mend Beauty Studio photography.",
  },
  "zh-Hans": {
    mainNavigation: "主导航",
    mobileNavigation: "手机导航",
    home: "首页",
    services: "服务项目",
    headSpa: "头疗护理",
    giftCards: "礼品卡",
    memberships: "会员计划",
    careers: "加入我们",
    contact: "联系我们",
    bookNow: "预约",
    bookAppointment: "预约",
    allServices: "全部服务",
    call: "致电",
    callNow: "立即致电",
    closeMenu: "关闭菜单",
    openMenu: "打开菜单",
    explore: "了解详情",
    visitUs: "到店信息",
    openingHours: "营业时间",
    phone: "电话",
    email: "邮箱",
    policies: "服务政策",
    share: "分享",
    language: "语言",
    switchLanguage: "EN",
    switchLanguageLabel: "View this page in English",
    rights: "版权所有。",
    temporaryImages:
      "部分图片目前为说明用途的临时素材，日后将替换为 Mend Beauty Studio 的专业实景照片。",
  },
} as const;

export const navByLocale = {
  "en-AU": [
    { label: ui["en-AU"].home, href: "/" },
    { label: "Your Journey", href: "/journey" },
    { label: "Hair", href: "/services/hair" },
    { label: "Head Spa", href: "/services/head-spa" },
    { label: "Skin", href: "/services/skin" },
    { label: "Body", href: "/services/body" },
    { label: "Signature Rituals", href: "/services/signature-rituals" },
    { label: "About", href: "/our-story" },
    { label: ui["en-AU"].contact, href: "/contact" },
  ],
  "zh-Hans": [
    { label: ui["zh-Hans"].home, href: "/zh" },
    { label: "我的护理方向", href: "/zh/journey" },
    { label: "美发", href: "/zh/services/hair" },
    { label: "头疗与头皮管理", href: "/zh/services/head-spa" },
    { label: "肌肤管理", href: "/zh/services/skin" },
    { label: "身体放松", href: "/zh/services/body" },
    { label: "MEND 招牌疗程", href: "/zh/services/signature-rituals" },
    { label: "关于我们", href: "/zh/our-story" },
    { label: ui["zh-Hans"].contact, href: "/zh/contact" },
  ],
} as const;

export const servicesNavByLocale = {
  "en-AU": [
    { label: "Hair", href: "/services/hair" },
    { label: "Head Spa & Scalp Care", href: "/services/head-spa" },
    { label: "Skin", href: "/services/skin" },
    { label: "Body", href: "/services/body" },
    { label: "Signature Rituals", href: "/services/signature-rituals" },
  ],
  "zh-Hans": [
    { label: "美发", href: "/zh/services/hair" },
    { label: "头疗与头皮管理", href: "/zh/services/head-spa" },
    { label: "肌肤管理", href: "/zh/services/skin" },
    { label: "身体放松", href: "/zh/services/body" },
    { label: "MEND 招牌疗程", href: "/zh/services/signature-rituals" },
  ],
} as const;
