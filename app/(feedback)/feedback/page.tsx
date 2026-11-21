import type { Metadata } from "next";
import FeedbackPage from "@/components/feedback/FeedbackPage";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Your experience | MEND Beauty Studio" },
  description: "Private customer feedback for MEND Beauty Studio.",
  alternates: { canonical: "/feedback", languages: { "en-AU": "/feedback", "zh-Hans": "/zh/feedback" } },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() { return <FeedbackPage locale="en" />; }
