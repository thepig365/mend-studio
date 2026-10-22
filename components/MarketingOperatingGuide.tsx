"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  aeoPlatformGuidance, aeoSteps, answerQuestions, channelPlaybooks,
  discoveryPrompts, keywordMap, metricDefinitions, planTasks, playbookVersion,
  referenceLinks, remoteRoles, seoSteps, serviceStandards, strategyPrinciples,
} from "@/lib/marketing-playbook";

const statuses = ["To assign", "Waiting for facts", "Waiting for approval", "In progress", "Ready for review", "Executed · verify", "Verified", "Blocked"] as const;
type TaskStatus = (typeof statuses)[number];
type TaskRecord = { owner: string; due: string; status: TaskStatus; evidence: string; next: string };
type Records = Record<string, TaskRecord>;
const initialRecords = (): Records => Object.fromEntries(planTasks.map((task) => [task.id, { owner: "", due: "", status: "To assign", evidence: "", next: "" }]));
const fieldClass = "mt-1 w-full rounded-xl border border-beige bg-cream px-3 py-2 text-sm text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";
const panelClass = "scroll-mt-24 rounded-3xl border border-beige bg-white/80 p-6 sm:p-8";
const listClass = "mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-cocoa";

function parseRecords(value: unknown): Records {
  if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 || !("tasks" in value) || !value.tasks || typeof value.tasks !== "object") throw new Error("Choose a MEND task-board export (version 1).");
  const candidate = value.tasks as Record<string, unknown>;
  const result = initialRecords();
  for (const task of planTasks) {
    const record = candidate[task.id];
    if (!record || typeof record !== "object") throw new Error(`Missing task ${task.id}. Your current work has not changed.`);
    const row = record as Record<string, unknown>;
    if (!["owner", "due", "status", "evidence", "next"].every((key) => typeof row[key] === "string" && (row[key] as string).length <= 2000) || !statuses.includes(row.status as TaskStatus) || (row.due !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(row.due as string))) throw new Error(`Invalid task ${task.id}. Your current work has not changed.`);
    result[task.id] = { owner: row.owner as string, due: row.due as string, status: row.status as TaskStatus, evidence: row.evidence as string, next: row.next as string };
  }
  return result;
}

export default function MarketingOperatingGuide() {
  const [records, setRecords] = useState<Records>(initialRecords);
  const [filter, setFilter] = useState("All tasks");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [reportDirty, setReportDirty] = useState(false);
  const [pendingImport, setPendingImport] = useState<Records | null>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState("Week / observation window:\nCoordinator / shop liaison:\nVerified work and links:\nEnquiries / confirmed bookings / attended new clients (separate):\nSource and measurement gaps:\nSEO observations / ChatGPT observations / Google AI observations (separate):\nService or handoff issues and owner:\nBlocked tasks, dependency and next step:\nDecisions required:\nNext week: two priorities, owners and due dates:");

  useEffect(() => {
    if (!dirty && !reportDirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, reportDirty]);

  function update(id: string, field: keyof TaskRecord, value: string) {
    setRecords((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
    setDirty(true);
    setMessage("");
  }

  function exportTasks() {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), guidance: playbookVersion, tasks: records }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mend-marketing-tasks-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDirty(false);
    setMessage("Task-board download started. Check your downloads, then place the file only in your approved team workspace. Nothing was uploaded or shared.");
  }

  async function importTasks(file?: File) {
    if (!file) return;
    setPendingImport(null);
    try {
      if (file.size > 128_000) throw new Error("This file is too large. Choose a task-board JSON export under 128 KB.");
      setPendingImport(parseRecords(JSON.parse(await file.text())));
      setMessage("Valid task-board file ready. Review the choice below before replacing your current task fields.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not read that file. Your current work has not changed.");
    } finally {
      if (importInput.current) importInput.current.value = "";
    }
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(report);
      setReportDirty(false);
      setMessage("Weekly review copied. Share only in your approved team workspace; nothing was sent automatically.");
    } catch {
      setMessage("Clipboard access was unavailable. Select and copy the review text manually.");
    }
  }

  const visibleTasks = planTasks.filter((task) => filter === "All tasks" || (filter === "First 7 days" && task.day <= 7) || (filter === "Days 8–14" && task.day > 7 && task.day <= 14) || (filter === "Days 15–30" && task.day > 14) || (filter === "Needs attention" && ["Blocked", "Waiting for facts", "Waiting for approval", "To assign"].includes(records[task.id].status)));
  const verified = Object.values(records).filter((record) => record.status === "Verified").length;

  return (
    <div className="mt-10 space-y-8" data-marketing-guide-version="2026-10-23">
      <section id="marketing-start" className={`${panelClass} bg-sand/60`}>
        <p className="eyebrow">Operator handbook · 营销执行手册</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">Start here. Work from anywhere.</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-cocoa">A practical working version for incoming promotion staff: the strategy, the next 30 days, channel playbooks and evidence-based SEO / AEO. Refine it with verified shop facts and real results.</p>
        <p className="mt-3 text-xs font-medium text-cocoa">{playbookVersion} · D1 means the agreed start date, not an automatic campaign launch.</p>
        <nav aria-label="Marketing handbook sections" className="mt-6 flex flex-wrap gap-2">
          {[["strategy", "Strategy"], ["remote", "Remote onboarding"], ["plan", "30-day task board"], ["channels", "Channel playbooks"], ["search", "SEO & AEO"], ["service", "Service & team"], ["review", "Weekly review"], ["tools", "Existing tools"]].map(([id, label]) => <a key={id} href={`#marketing-${id}`} className="rounded-full border border-beige bg-white px-4 py-2 text-sm font-medium text-charcoal hover:border-gold focus-visible:outline-2 focus-visible:outline-gold">{label}</a>)}
        </nav>
        <div className="mt-6 rounded-2xl border border-gold/40 bg-white p-4 text-sm leading-relaxed text-cocoa"><strong className="text-charcoal">Access and privacy:</strong> this portal keeps its existing authorised Google-account access. New staff need access arranged by the account administrator; do not share a password. The website source is public, so this handbook contains public-safe guidance only. Private budgets, pay, performance records, customer details and the full confidential strategy stay in approved private systems.</div>
      </section>

      <section id="marketing-strategy" className={panelClass}>
        <p className="eyebrow">Direction · 品牌与策略</p><h2 className="mt-3 font-display text-3xl">What we are building</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">{strategyPrinciples.map((item) => <article key={item.title} className="rounded-2xl bg-sand/60 p-5"><h3 className="font-medium text-charcoal">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-cocoa">{item.detail}</p></article>)}</div>
      </section>

      <section id="marketing-remote" className={panelClass}>
        <p className="eyebrow">Remote-ready · 远程协作</p><h2 className="mt-3 font-display text-3xl">Agree the handoff, then start</h2>
        <ol className={listClass}>
          <li>Ask the administrator to confirm your permitted account, tools and scope. Being able to view this portal does not grant permission to publish, spend, invite people or change settings.</li>
          <li>Confirm one marketing coordinator and one shop liaison, their availability and the approved place for shared work. A role below is a proposal until a person accepts it.</li>
          <li>Obtain the current fact sheet, approved asset folder and consent/rights records. Request specific missing facts rather than filling gaps with AI.</li>
          <li>Use the task board below to prepare a dated handoff. Export before leaving; the board is session-only and is not a shared database. A refresh or sign-out discards unexported edits.</li>
          <li>Each staffed workday: check agreed enquiries, blockers and deadlines. Weekly: send a concise evidence-based review and two priorities through the approved team channel.</li>
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{remoteRoles.map((item) => <article key={item.role} className="rounded-2xl border border-beige p-4"><h3 className="font-medium">{item.role}</h3><p className="mt-2 text-sm leading-relaxed text-cocoa">{item.responsibility}</p></article>)}</div>
        <details className="mt-6 rounded-2xl bg-sand/60 p-5"><summary className="cursor-pointer font-medium">Shop capture request: copy this structure into your approved workspace</summary><p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-cocoa">Story / service and purpose:{"\n"}Exact shots or practitioner questions needed:{"\n"}Requested capture window and shop liaison:{"\n"}Facts to verify, by whom and by when:{"\n"}People, artwork, music and organic / paid usage permissions:{"\n"}Approved asset-folder destination:{"\n"}Deliverables: main edit, short cut, photos, captions and fact / rights notes.{"\n"}Acceptance: genuine, clear on mobile, one next step, no disruption to customer care.</p></details>
      </section>

      <section id="marketing-plan" className={panelClass}>
        <p className="eyebrow">Execute · 30 天工作台</p><h2 className="mt-3 font-display text-3xl">Turn the plan into a clear handoff</h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">All tasks begin unassigned. Set the actual owner, due date, status, evidence and next step. No task becomes approved, published or verified merely because you change its status.</p>
        <div className="mt-4 rounded-xl bg-sand/70 p-4 text-sm text-cocoa"><strong>Session-only:</strong> edits are not saved to the server or synchronised with colleagues. Export a task file before refreshing or leaving. Import the latest approved team copy to continue. Use role labels and non-sensitive evidence only; no passwords, customer data or private staff details.</div>
        <div className="mt-5 flex flex-wrap items-end gap-3">
          <label className="text-sm font-medium">Show tasks<select className={fieldClass} value={filter} onChange={(event) => setFilter(event.target.value)}>{["All tasks", "First 7 days", "Days 8–14", "Days 15–30", "Needs attention"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <button type="button" className="btn-outline" onClick={exportTasks}>Export task file</button>
          <label className="text-sm font-medium">Import task file<input ref={importInput} type="file" accept=".json,application/json" className="mt-1 block max-w-full rounded-xl border border-beige bg-cream p-2 text-xs focus-visible:outline-2 focus-visible:outline-gold" onChange={(event) => void importTasks(event.target.files?.[0])} /></label>
          <span className="pb-3 text-xs text-cocoa">{verified}/{planTasks.length} marked verified{dirty ? " · unexported edits" : ""}</span>
        </div>
        {pendingImport && <div className="mt-4 rounded-xl border border-gold bg-sand p-4"><p className="text-sm">Replace current task fields with {planTasks.length} validated records? Export your current work first if you want to keep it.</p><div className="mt-3 flex gap-3"><button type="button" className="btn-primary" onClick={() => { setRecords(pendingImport); setPendingImport(null); setDirty(false); setMessage("Task file imported into this session only. New edits still need exporting."); }}>Replace task fields</button><button type="button" className="btn-outline" onClick={() => { setPendingImport(null); setMessage("Import cancelled. Your current task fields are unchanged."); }}>Cancel import</button></div></div>}
        <p role="status" aria-live="polite" className="mt-4 text-sm leading-relaxed text-cocoa">{message}</p>
        <div className="mt-5 space-y-4">{visibleTasks.map((task) => <details key={task.id} className="rounded-2xl border border-beige p-4 sm:p-5">
          <summary className="cursor-pointer"><span className="mr-2 text-xs font-medium uppercase tracking-wide text-bronze">{task.window} · {task.id}</span><span className="font-medium text-charcoal">{task.title}</span><span className="mt-2 block text-xs text-cocoa">Suggested role: {task.role} · {records[task.id].status}</span></summary>
          <dl className="mt-5 space-y-3 text-sm leading-relaxed text-cocoa">{[["Input / dependency", task.input], ["Deliverable", task.output], ["Done means", task.acceptance], ["Measure", task.metric]].map(([title, detail]) => <div key={title}><dt className="font-medium text-charcoal">{title}</dt><dd>{detail}</dd></div>)}</dl>
          <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-medium">Owner / role<input maxLength={160} value={records[task.id].owner} onChange={(event) => update(task.id, "owner", event.target.value)} placeholder="Confirm assignee" className={fieldClass} /></label><label className="text-xs font-medium">Actual due date<input type="date" value={records[task.id].due} onChange={(event) => update(task.id, "due", event.target.value)} className={fieldClass} /></label><label className="text-xs font-medium">Task status<select value={records[task.id].status} onChange={(event) => update(task.id, "status", event.target.value)} className={fieldClass}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label><label className="text-xs font-medium">Evidence reference<input maxLength={2000} value={records[task.id].evidence} onChange={(event) => update(task.id, "evidence", event.target.value)} placeholder="Approved document or live URL reference" className={fieldClass} /></label><label className="text-xs font-medium sm:col-span-2">Next step / blocker<textarea maxLength={2000} rows={2} value={records[task.id].next} onChange={(event) => update(task.id, "next", event.target.value)} className={fieldClass} /></label></div>
        </details>)}</div>
        {visibleTasks.length === 0 && <p className="mt-4 text-sm text-cocoa">No tasks match this view. Choose All tasks to see the full plan.</p>}
      </section>

      <section id="marketing-channels" className={panelClass}>
        <p className="eyebrow">Channel playbooks · 渠道操作</p><h2 className="mt-3 font-display text-3xl">One story, adapted to each job</h2>
        <div className="mt-6 space-y-4">{channelPlaybooks.map((channel) => <details key={channel.title} className="rounded-2xl border border-beige p-5"><summary className="cursor-pointer font-medium">{channel.title}</summary><p className="mt-3 text-sm leading-relaxed text-cocoa">{channel.purpose}</p><p className="mt-3 text-xs font-medium text-bronze">{channel.cadence}</p><ol className={listClass}>{channel.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="mt-4 text-sm leading-relaxed text-cocoa"><strong>Done:</strong> {channel.done}</p><p className="mt-2 text-sm leading-relaxed text-cocoa"><strong>Measure:</strong> {channel.measure}</p></details>)}</div>
      </section>

      <section id="marketing-search" className={panelClass}>
        <p className="eyebrow">Discoverability · SEO 与 AEO</p><h2 className="mt-3 font-display text-3xl">Be findable. Be useful. Be accurate.</h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">SEO helps people discover the right page. AEO helps search and answer systems find clear, verifiable answers. Neither guarantees a ranking, AI mention or booking. The following are work instructions, not completed results.</p>
        <h3 className="mt-7 text-lg font-medium">Search intent → existing page</h3><p className="mt-2 text-sm text-cocoa">Seed terms below have no claimed search volume. Verify with real query data. Deepdene is the actual location, not a fictional Balwyn branch.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">{keywordMap.map((item) => <article key={item.path} className="rounded-2xl bg-sand/60 p-4"><h4 className="font-medium">{item.intent}</h4><p className="mt-2 text-sm text-cocoa">{item.seeds}</p><Link href={item.path} className="mt-2 inline-block break-all text-sm text-bronze underline">{item.path}</Link><p className="mt-2 text-sm leading-relaxed text-cocoa">{item.check}</p></article>)}</div>
        <p className="mt-4 text-sm leading-relaxed text-cocoa">Also review <Link href="/services/hair-scalp-recovery" className="text-bronze underline">Hair &amp; Scalp Recovery</Link>: confirm its distinct purpose and relevant internal links rather than duplicating head-spa content. Review Chinese counterparts alongside English pages. Page changes require the existing review and release workflow.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-beige p-5"><h3 className="font-medium">SEO operator checklist</h3><ol className={listClass}>{seoSteps.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="rounded-2xl border border-beige p-5"><h3 className="font-medium">AEO answer-building checklist</h3><ol className={listClass}>{aeoSteps.map((step) => <li key={step}>{step}</li>)}</ol></div></div>
        <details className="mt-6 rounded-2xl bg-sand/60 p-5"><summary className="cursor-pointer font-medium">Six first-answer briefs · practitioner review required</summary><ol className={listClass}>{answerQuestions.map((question) => <li key={question}>{question}</li>)}</ol><p className="mt-4 text-sm leading-relaxed text-cocoa">For each: direct answer → verified inclusions / process → duration and quotation rules → suitability boundaries → source and review date → relevant booking / enquiry step. Missing facts stay flagged; placeholders never go live.</p></details>
        <h3 className="mt-8 text-xl font-medium">ChatGPT discovery and Google AI are separate</h3><div className="mt-4 space-y-4">{aeoPlatformGuidance.map((item) => <article key={item.title} className="rounded-2xl border border-beige p-5"><h4 className="font-medium">{item.title}</h4><p className="mt-2 text-sm leading-relaxed text-cocoa">{item.detail}</p></article>)}</div>
        <details className="mt-5 rounded-2xl bg-sand/60 p-5"><summary className="cursor-pointer font-medium">Eight non-brand discovery prompts · baseline not yet run</summary><ol className={listClass}>{discoveryPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol><p className="mt-4 text-sm leading-relaxed text-cocoa">Run a baseline before content changes, then compare weekly under similar conditions for the first four weeks. Keep branded fact-check prompts separate from discovery scores. Record search actually used, exact prompt, date, product/model shown, language, location/personalisation context, MEND mention, exact citations, address accuracy, booking route, evidence and next action. Unknown stays unknown.</p></details>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">{[...referenceLinks, { label: "OpenAI: search and location", href: "https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt" }, { label: "OpenAI: crawler purposes", href: "https://developers.openai.com/api/docs/bots" }, { label: "OpenAI: publisher / referral FAQ", href: "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq" }].map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-xs text-bronze underline">{link.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>
      </section>

      <section id="marketing-service" className={panelClass}>
        <p className="eyebrow">Keep the promise · 服务与团队</p><h2 className="mt-3 font-display text-3xl">Promotion must match the visit</h2>
        <ol className={listClass}>{serviceStandards.map((standard) => <li key={standard}>{standard}</li>)}</ol>
        <div className="mt-6 rounded-2xl bg-sand/60 p-5"><h3 className="font-medium">Incoming coordinator: first-month role brief</h3><p className="mt-2 text-sm leading-relaxed text-cocoa">Deliver one joined-up calendar, reusable approved asset packs, service/booking consistency checks, a weekly evidence report and a 30-day keep/change/stop plan. Coordinate with existing channel owners and the shop; do not assume authority over pay, hiring or professional care. Success is reliable execution, timely escalation and verifiable customer outcomes, not followers or five-star quotas.</p></div>
      </section>

      <section id="marketing-review" className={panelClass}>
        <p className="eyebrow">Review & learn · 每周复盘</p><h2 className="mt-3 font-display text-3xl">Report what actually happened</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">{metricDefinitions.map((metric) => <div key={metric.name} className="rounded-2xl border border-beige p-4"><dt className="font-medium">{metric.name}</dt><dd className="mt-2 text-sm leading-relaxed text-cocoa">{metric.definition}</dd></div>)}</dl>
        <label className="mt-6 block text-sm font-medium">Weekly review draft · session-only<textarea value={report} onChange={(event) => { setReport(event.target.value); setReportDirty(true); }} rows={12} className={fieldClass} /></label><p className="mt-2 text-xs leading-relaxed text-cocoa">Keep this aggregate and non-sensitive. Copy before leaving; this text is not included in the task-file export and is not stored or sent by the portal.</p><button type="button" className="btn-outline mt-4" onClick={() => void copyReport()}>Copy weekly review</button><p role="status" aria-live="polite" className="mt-3 text-sm text-cocoa">{message}</p>
      </section>
      <div id="marketing-tools" className="scroll-mt-24 border-t border-beige pt-7"><p className="eyebrow">Existing workspace tools</p><h2 className="mt-3 font-display text-3xl">Open sources, prepare briefs, review releases</h2><p className="mt-3 text-sm text-cocoa">The existing source links, AI task desk and Landing Page Studio below are unchanged. Each source still requires its own authorised access.</p></div>
    </div>
  );
}
