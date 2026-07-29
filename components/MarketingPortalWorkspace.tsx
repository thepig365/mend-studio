"use client";

import { useMemo, useState } from "react";

const workspaces = [
  {
    title: "Technical SEO",
    description:
      "Check indexing, sitemap coverage, metadata, structured data, broken links and page performance.",
    actions: [
      {
        label: "Google Search Console",
        href: "https://search.google.com/search-console?resource_id=sc-domain:mendbeauty.com.au",
      },
      {
        label: "PageSpeed Insights",
        href: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fmendbeauty.com.au",
      },
    ],
  },
  {
    title: "Traffic & Conversion",
    description:
      "Review consented website traffic and the actions that lead visitors to booking, calling, email and directions.",
    actions: [{ label: "Google Analytics", href: "https://analytics.google.com/" }],
  },
  {
    title: "Local Search",
    description:
      "Maintain Google Business Profile details, services, photographs, reviews and local-search consistency.",
    actions: [
      {
        label: "Business Profile",
        href: "https://business.google.com/locations",
      },
    ],
  },
  {
    title: "Content & Keywords",
    description:
      "Prepare customer-useful service pages, landing-page briefs, FAQs and local keyword maps before review.",
    actions: [
      { label: "Google Trends", href: "https://trends.google.com/trends/" },
    ],
  },
  {
    title: "Social & Campaigns",
    description:
      "Coordinate approved campaigns across the Mend website and connected Meta channels without duplicating facts.",
    actions: [
      {
        label: "Meta Business Suite",
        href: "https://business.facebook.com/latest/home",
      },
    ],
  },
  {
    title: "Services & Retention",
    description:
      "Use confirmed MaSe service, booking and retention information as source material. Do not copy customer records into AI.",
    actions: [
      { label: "MaSe Partner Portal", href: "https://partners.mase.cloud/" },
    ],
  },
] as const;

type Provider = "ChatGPT" | "Claude";

export default function MarketingPortalWorkspace() {
  const [provider, setProvider] = useState<Provider>("ChatGPT");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("Draft");
  const [priority, setPriority] = useState("Normal");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () =>
      [
        "MEND MARKETING TASK — DRAFT ONLY",
        `Title: ${title.trim() || "[add title]"}`,
        `Short summary: ${summary.trim() || "[add minimum required context]"}`,
        `Status: ${status}`,
        `Priority: ${priority}`,
        "",
        "Use only the confirmed facts above and public information from mendbeauty.com.au.",
        "Do not invent prices, services, reviews, rankings, traffic results, availability or regulatory claims.",
        "Return: (1) concise recommendation, (2) proposed draft, (3) risks or missing facts, (4) verification checklist.",
        "Do not publish, approve, spend money or change any account or production setting.",
      ].join("\n"),
    [priority, status, summary, title],
  );

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const providerHref =
    provider === "ChatGPT" ? "https://chatgpt.com/" : "https://claude.ai/";

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((workspace) => (
          <article
            key={workspace.title}
            className="rounded-3xl border border-beige bg-white/80 p-6"
          >
            <h2 className="font-display text-2xl font-medium text-charcoal">
              {workspace.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa">
              {workspace.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {workspace.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-beige px-4 py-2 text-xs font-medium text-cocoa transition-colors hover:border-gold hover:text-bronze"
                >
                  {action.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-3xl border border-beige bg-white/80 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="eyebrow">AI task desk</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
            Prepare a minimal marketing brief
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cocoa">
            This form creates a prompt in your browser. It does not transmit or
            save the text. Copy it only when it is ready to share with the
            selected AI provider.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-charcoal">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="Example: Deepdene Head Spa landing page"
            />
          </label>
          <label className="text-sm font-medium text-charcoal">
            AI provider
            <select
              value={provider}
              onChange={(event) => setProvider(event.target.value as Provider)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option>ChatGPT</option>
              <option>Claude</option>
            </select>
          </label>
          <label className="text-sm font-medium text-charcoal md:col-span-2">
            Short summary
            <textarea
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="Add only the facts needed for this task. Do not paste customer records, passwords or full conversations."
            />
          </label>
          <label className="text-sm font-medium text-charcoal">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option>Draft</option>
              <option>Ready for review</option>
              <option>Blocked</option>
            </select>
          </label>
          <label className="text-sm font-medium text-charcoal">
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </label>
        </div>

        <label className="mt-6 block text-sm font-medium text-charcoal">
          Generated task brief
          <textarea
            readOnly
            value={prompt}
            rows={10}
            className="mt-2 w-full rounded-xl border border-beige bg-sand/60 px-4 py-3 font-mono text-xs leading-relaxed text-cocoa"
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={copyPrompt} className="btn-primary">
            {copied ? "Copied" : "Copy brief"}
          </button>
          <a
            href={providerHref}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            Open {provider}
            <span className="sr-only"> in a new tab</span>
          </a>
        </div>
      </section>
    </>
  );
}
