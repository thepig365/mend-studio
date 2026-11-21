import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import { feedbackCopy, type FeedbackLocale } from "@/lib/feedback/shared";
import { isFeedbackConfigured } from "@/lib/feedback/store";

export default function FeedbackPage({ locale }: { locale: FeedbackLocale }) {
  const copy = feedbackCopy[locale];
  const zh = locale === "zh";
  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-7 sm:py-12">
      <header className="flex items-center justify-between gap-4 border-b border-beige pb-5">
        <a href={zh ? "/zh" : "/"} className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-bronze">
          <Image src="/images/mend-beauty-logo-gold-transparent.png" alt="" width={696} height={1008} className="h-16 w-auto" />
          <span className="text-sm font-medium tracking-wide">MEND Beauty Studio</span>
        </a>
        <a href={zh ? "/feedback" : "/zh/feedback"} lang={zh ? "en" : "zh-Hans"} hrefLang={zh ? "en-AU" : "zh-Hans"} className="btn-outline min-h-11 px-4">{zh ? "English" : "中文"}</a>
      </header>
      <section aria-labelledby="feedback-title" className="py-8">
        <h1 id="feedback-title" className={`font-display leading-tight ${zh ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>{copy.title}</h1>
        <p className="mt-4 text-lg leading-relaxed">{copy.intro}</p>
        <p className="mb-7 mt-3 text-sm leading-relaxed text-cocoa">{copy.purpose}</p>
        {isFeedbackConfigured() ? <FeedbackForm locale={locale} /> : <p role="status" className="rounded-2xl border border-beige bg-sand p-5">{copy.unavailable}</p>}
      </section>
      <section aria-labelledby="feedback-qr-title" className="mb-8 rounded-2xl border border-beige bg-sand p-5 text-center">
        <h2 id="feedback-qr-title" className="font-display text-2xl">{zh ? "扫码填写反馈" : "Scan to share your experience"}</h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">{zh ? "扫码打开公开反馈表，可在页面顶部切换 English / 中文。" : "Scan to open the public feedback form. Choose English or 中文 at the top of the page."}</p>
        <a href="/feedback" className="mx-auto mt-4 block w-fit focus-visible:outline-2 focus-visible:outline-bronze">
          <Image src="/qr/mend-feedback-qr.png" alt={zh ? "MEND 顾客反馈二维码，打开英文反馈表并可切换中文" : "MEND feedback QR code, opens the English form with a Chinese language switch"} width={1200} height={1500} unoptimized className="h-auto w-60 max-w-full" />
        </a>
        <a href="/feedback" className="mt-3 block break-all text-sm underline underline-offset-4">mendbeauty.com.au/feedback</a>
        <a href="/qr/mend-feedback-qr.png" download="MEND-Feedback-QR.png" className="btn-outline mt-4 min-h-12">{zh ? "保存二维码 PNG" : "Save QR code PNG"}</a>
      </section>
      <footer className="border-t border-beige py-5 text-center text-sm text-cocoa"><a href={zh ? "/zh" : "/"} className="underline underline-offset-4">{copy.home}</a></footer>
    </main>
  );
}
