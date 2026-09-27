export const qrCodes = [
  {
    id: "wechat-booking",
    image: "/qr/wechat-booking-qr.jpg",
    href: "https://u.wechat.com/kNVC5BSGLv-TksATEKFVjKs?s=2",
    label: { en: "WeChat Booking", zh: "微信预约" },
    description: {
      en: "Scan with WeChat to contact the studio for booking assistance.",
      zh: "使用微信扫码，联系门店协助预约。",
    },
  },
  {
    id: "official-website",
    image: "/qr/official-website-qr.jpg",
    href: "https://mendbeauty.com.au/",
    label: { en: "Official Website", zh: "官方网站" },
    description: {
      en: "Scan to open the official website. This is not a booking code.",
      zh: "扫码打开官方网站；此二维码不是预约入口。",
    },
  },
] as const;
