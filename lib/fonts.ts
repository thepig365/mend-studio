import localFont from "next/font/local";

// Latin subsets of the same families previously loaded with next/font/google.
// The files are vendored so production builds do not depend on Google's CSS
// URL shape. CSS variables and weights stay the same.
export const cormorant = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
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
