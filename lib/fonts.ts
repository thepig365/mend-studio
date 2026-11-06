import localFont from "next/font/local";

// Vendored Latin files. CSS variables stay --font-cormorant and --font-jost.
// Cormorant is the official Google Fonts variable font, subset to Latin,
// wght 300–700. Jost is the official Latin variable file, wght 100–900.
export const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin-wght.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const jost = localFont({
  src: "./fonts/jost-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: "Arial",
});
