"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/lib/service-catalog";
import { trackExperienceEvent } from "@/lib/experience-analytics";

type Language = "en" | "zh";
type Goal = "hair" | "scalp" | "skin" | "body" | "complete";
type Time = "short" | "standard" | "extended";
type Experience = "first" | "regular" | "unsure";

const copy = {
  en: {
    step: "Step",
    goal: "What would you most like to feel or improve?",
    time: "How much time would you like to set aside?",
    experience: "How familiar are you with MEND services?",
    goals: [
      ["hair", "Renew my hair"],
      ["scalp", "Refresh my scalp and unwind"],
      ["skin", "Hydrate and brighten my skin"],
      ["body", "Release shoulder or body tension"],
      ["complete", "I need a complete reset"],
    ],
    times: [["short", "Up to 45 minutes"], ["standard", "60–75 minutes"], ["extended", "90 minutes or more"]],
    experiences: [["first", "This is my first visit"], ["regular", "I know what I prefer"], ["unsure", "I would like guidance"]],
    next: "Continue",
    back: "Back",
    result: "Your suggested direction",
    why: "Why this may suit you",
    book: "Book",
    consult: "Ask the studio",
    restart: "Start again",
    note: "This guide does not diagnose a condition. A professional may adapt the recommendation after consultation.",
  },
  zh: {
    step: "步骤",
    goal: "您最希望改善或感受到什么？",
    time: "您希望为这次体验预留多少时间？",
    experience: "您对 MEND 服务的熟悉程度如何？",
    goals: [
      ["hair", "焕新秀发"],
      ["scalp", "清爽头皮并放松"],
      ["skin", "补水并焕亮肌肤"],
      ["body", "舒缓肩颈或身体紧张"],
      ["complete", "我需要一次完整焕新"],
    ],
    times: [["short", "最多 45 分钟"], ["standard", "60–75 分钟"], ["extended", "90 分钟或以上"]],
    experiences: [["first", "这是我第一次到访"], ["regular", "我了解自己的偏好"], ["unsure", "我希望获得建议"]],
    next: "继续",
    back: "返回",
    result: "建议的护理方向",
    why: "为什么可能适合您",
    book: "预约",
    consult: "咨询工作室",
    restart: "重新开始",
    note: "本引导不作出任何诊断。专业人员可在咨询后调整建议。",
  },
} as const;

function recommendation(goal: Goal, time: Time, experience: Experience) {
  if (experience === "unsure") return { consultation: true as const, service: null };
  const map: Record<Goal, Record<Time, string>> = {
    hair: { short: "signature-cut", standard: "glass-hair-renewal", extended: "signature-colour" },
    scalp: { short: "express-head-reset", standard: "signature-head-spa", extended: "deep-sleep-head-ritual" },
    skin: { short: "essential-skin-reset", standard: "korean-glass-skin-ritual", extended: "korean-glass-skin-ritual" },
    body: { short: "shoulder-neck-reset", standard: "stress-release-massage", extended: "stress-release-massage" },
    complete: { short: "shoulder-neck-reset", standard: "signature-head-spa", extended: "mend-total-reset" },
  };
  return {
    consultation: false as const,
    service: services.find((item) => item.slug === map[goal][time]) ?? null,
  };
}

export default function JourneySelector({ language }: { language: Language }) {
  const c = copy[language];
  const prefix = language === "zh" ? "/zh" : "";
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);

  const finish = (value: Experience) => {
    setExperience(value);
    setStep(4);
    const result = goal && time ? recommendation(goal, time, value) : null;
    trackExperienceEvent("journey_completed", {
      goal: goal ?? "unknown",
      time: time ?? "unknown",
      result: result?.service?.slug ?? "consultation",
    });
  };
  const result = goal && time && experience ? recommendation(goal, time, experience) : null;

  const choices =
    step === 1 ? c.goals :
    step === 2 ? c.times :
    c.experiences;

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-beige/70 bg-white/70 p-6 shadow-lg shadow-charcoal/5 sm:p-10">
      {step < 4 ? (
        <>
          <p className="eyebrow">{c.step} {step} / 3</p>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
            {step === 1 ? c.goal : step === 2 ? c.time : c.experience}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {choices.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className="min-h-16 rounded-2xl border border-beige/80 bg-cream px-5 py-4 text-left text-sm transition hover:border-gold hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45"
                onClick={() => {
                  if (step === 1) {
                    setGoal(value as Goal);
                    setStep(2);
                    trackExperienceEvent("journey_started", { goal: value });
                  } else if (step === 2) {
                    setTime(value as Time);
                    setStep(3);
                  } else {
                    finish(value as Experience);
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {step > 1 && (
            <button type="button" className="btn-outline mt-7" onClick={() => setStep((current) => current - 1)}>
              {c.back}
            </button>
          )}
        </>
      ) : result ? (
        <div aria-live="polite">
          <p className="eyebrow">{c.result}</p>
          {result.consultation || !result.service ? (
            <>
              <h2 className="mt-4 font-display text-4xl font-medium">{language === "zh" ? "先与工作室沟通" : "Start with a studio consultation"}</h2>
              <p className="mt-5 leading-relaxed text-cocoa">{language === "zh" ? "您的选择显示，个性化建议比自动选择一个项目更合适。团队会先了解目标、时间与舒适度。" : "Your answers suggest that personal guidance is more useful than automatically selecting a service. The team can first understand your goals, time and comfort."}</p>
              <Link href={`${prefix}/contact#booking-enquiry`} className="btn-gold mt-8" onClick={() => trackExperienceEvent("consultation_clicked", { source: "journey" })}>{c.consult}</Link>
            </>
          ) : (
            <>
              <h2 className="mt-4 font-display text-4xl font-medium">{result.service.name[language]}</h2>
              <p className="mt-5 leading-relaxed text-cocoa">{result.service.fit[language]}</p>
              <dl className="mt-7 grid gap-4 rounded-2xl bg-sand p-5 sm:grid-cols-2">
                <div><dt className="text-xs uppercase tracking-[0.16em] text-taupe">{language === "zh" ? "时长" : "Duration"}</dt><dd className="mt-2">{result.service.duration[language]}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.16em] text-taupe">{language === "zh" ? "价格" : "Price"}</dt><dd className="mt-2">{result.service.price.display[language]}</dd></div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`${prefix}/services/${result.service.category}/${result.service.slug}`} className="btn-outline">{language === "zh" ? "查看详情" : "View details"}</Link>
                <Link href={result.service.bookingMode === "mase" ? `${prefix}/book` : `${prefix}/contact#booking-enquiry`} className="btn-gold" onClick={() => trackExperienceEvent(result.service?.bookingMode === "mase" ? "booking_clicked" : "consultation_clicked", { source: "journey", service: result.service?.slug ?? "" })}>{result.service.bookingMode === "mase" ? c.book : c.consult}</Link>
              </div>
            </>
          )}
          <p className="mt-8 border-t border-beige/70 pt-5 text-xs leading-relaxed text-taupe">{c.note}</p>
          <button type="button" className="mt-5 text-sm text-bronze underline underline-offset-4" onClick={() => { setStep(1); setGoal(null); setTime(null); setExperience(null); }}>{c.restart}</button>
        </div>
      ) : null}
    </div>
  );
}
