import { cormorant, jost } from "@/lib/fonts";

// Separate root layouts force a full navigation from the public marketing site.
// No analytics, advertising scripts, chat widgets, or response-bearing URLs.
export default function FeedbackDocument({ children, lang }: { children: React.ReactNode; lang: "en-AU" | "zh-Hans" }) {
  return <html lang={lang} className={`${cormorant.variable} ${jost.variable}`}><body>{children}</body></html>;
}
