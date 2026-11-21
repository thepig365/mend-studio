import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, isMarketingAuthConfigured, marketingPortalEmail } from "@/auth";
import { feedbackProviders, isFeedbackStaff } from "@/lib/feedback/shared";
import { readFeedback } from "@/lib/feedback/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Private customer feedback | MEND", robots: { index: false, follow: false, nocache: true }, referrer: "no-referrer" };

export default async function Page({ searchParams }: { searchParams: Promise<{ provider?: string }> }) {
  if (!isMarketingAuthConfigured()) redirect("/marketing/login");
  const session = await auth();
  if (!isFeedbackStaff(session?.user?.email, marketingPortalEmail)) redirect("/marketing/login");
  const { provider } = await searchParams;
  const selected = provider === "unassigned" ? null : feedbackProviders.some((p) => p.id === provider) ? provider : undefined;
  let data: Awaited<ReturnType<typeof readFeedback>> | null = null;
  try { data = await readFeedback(selected); } catch { /* Never log customer content or database errors. */ }
  const providerName = (id: string | null) => feedbackProviders.find((p) => p.id === id)?.name || "Unassigned / 未分配";
  return <main className="wrap py-10">
    <a href="/marketing" className="text-sm underline">← Staff workspace / 员工工作台</a>
    <h1 className="mt-6 font-display text-4xl">Private customer feedback / 私密顾客反馈</h1>
    <p className="mt-3 max-w-3xl leading-relaxed text-cocoa">For service improvement and team recognition. Counts reflect voluntary feedback and may be incomplete; ratings do not automatically determine rewards or pay.<br />用于改善服务和认可团队。自愿反馈数量可能不完整；评分不会自动决定奖励或薪酬。</p>
    {!data ? <p role="alert" className="mt-8 rounded-xl bg-sand p-5">Feedback storage is unavailable. Please retry later. / 反馈存储暂时不可用，请稍后重试。</p> : <>
      <h2 className="mt-8 text-xl">All-time overview / 累计概览</h2>
      <div className="mt-4 flex flex-wrap gap-4">{data.summary.map((row) => <div key={row.provider_id ?? "unassigned"} className="rounded-2xl border border-beige p-5">
        <h3 className="font-medium">{providerName(row.provider_id)}</h3><p className="mt-2">{row.count} responses / 份反馈 · {row.average} / 5</p>
      </div>)}</div>
      <form method="get" className="my-8 flex flex-wrap items-end gap-3">
        <label className="grid gap-2">Provider / 服务同事<select name="provider" defaultValue={provider || ""} className="min-h-12 rounded-xl border border-taupe bg-white p-3">
          <option value="">All / 全部</option>{feedbackProviders.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="unassigned">Unassigned / 未分配</option>
        </select></label><button className="btn-primary min-h-12" type="submit">Filter / 筛选</button>
      </form>
      <p className="mb-4 text-sm text-cocoa">Latest 100 responses for this selection. Comments remain private. / 显示所选类别的最近 100 条反馈，意见仅供内部查看。</p>
      {data.entries.length === 0 && <p>No feedback yet. / 暂无反馈。</p>}
      <div className="grid gap-4">{data.entries.map((entry) => <article key={entry.submission_id} className="rounded-2xl border border-beige bg-white p-5">
        <h2 className="font-medium">{providerName(entry.provider_id)} · {entry.rating} / 5</h2>
        <p className="mt-1 text-sm text-cocoa">{new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Melbourne", dateStyle: "medium", timeStyle: "short" }).format(entry.created_at)} · Melbourne · {entry.locale === "zh" ? "中文" : "English"}</p>
        {entry.initials && <p className="mt-3 break-words">Initials / 姓名首字母: {entry.initials}</p>}
        {entry.comment && <p className="mt-3 whitespace-pre-wrap break-words">{entry.comment}</p>}
        <p className="mt-3 break-all text-xs text-cocoa">Receipt / 记录编号: {entry.submission_id}</p>
      </article>)}</div>
    </>}
  </main>;
}
