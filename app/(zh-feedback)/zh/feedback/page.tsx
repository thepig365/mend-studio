import type { Metadata } from "next";
import FeedbackPage from "@/components/feedback/FeedbackPage";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "顾客体验反馈 | MEND Beauty Studio" },
  description: "MEND Beauty Studio 私密顾客体验反馈。",
  alternates: { canonical: "/zh/feedback", languages: { "en-AU": "/feedback", "zh-Hans": "/zh/feedback" } },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() { return <FeedbackPage locale="zh" />; }
