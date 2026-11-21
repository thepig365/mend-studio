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
      <footer className="border-t border-beige py-5 text-center text-sm text-cocoa"><a href={zh ? "/zh" : "/"} className="underline underline-offset-4">{copy.home}</a></footer>
    </main>
  );
}
