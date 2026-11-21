import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, isMarketingAuthConfigured, marketingPortalEmail } from "@/auth";
import { feedbackProviders, isFeedbackStaff } from "@/lib/feedback/shared";
import FeedbackStaffView from "@/components/feedback/FeedbackStaffView";
import { readFeedback, feedbackProviderFilter } from "@/lib/feedback/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private customer feedback | MEND", robots: { index: false, follow: false, nocache: true }, referrer: "no-referrer" };

export default async function Page({ searchParams }: { searchParams: Promise<{ provider?: string }> }) {
  if (!isMarketingAuthConfigured()) redirect("/marketing/login");
  const session = await auth();
  if (!isFeedbackStaff(session?.user?.email, marketingPortalEmail)) redirect("/marketing/login");
  const { provider } = await searchParams;
  const legacy = feedbackProviders.find((p) => p.id === provider);
  const selected = provider === "unassigned" ? null : legacy ? feedbackProviderFilter(legacy.name) : typeof provider === "string" && /^[a-f0-9]{32}$/.test(provider) ? provider : undefined;
  let data: Awaited<ReturnType<typeof readFeedback>> | null = null;
  try { data = await readFeedback(selected); } catch { /* Never log customer content or database errors. */ }
  return <FeedbackStaffView data={data} selected={selected} />;
}
