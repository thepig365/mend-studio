"use client";

import { useMemo, useState } from "react";

type LandingPageProvider = "ChatGPT" | "Codex" | "Claude";

const providerLinks: Record<LandingPageProvider, string> = {
  ChatGPT: "https://chatgpt.com/",
  Codex: "https://chatgpt.com/codex",
  Claude: "https://claude.ai/",
};

const pageTypes = [
  "Service landing page",
  "Promotion or offer",
  "Event or open day",
  "Educational SEO page",
  "Seasonal campaign",
] as const;

const callsToAction = ["Book", "Enquire", "Call", "Learn more"] as const;

const languages = ["English", "Simplified Chinese", "Bilingual"] as const;

export default function LandingPageStudio() {
  const [provider, setProvider] = useState<LandingPageProvider>("ChatGPT");
  const [pageType, setPageType] =
    useState<(typeof pageTypes)[number]>("Service landing page");
  const [pageTitle, setPageTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [language, setLanguage] =
    useState<(typeof languages)[number]>("Bilingual");
  const [sourceUrl, setSourceUrl] = useState("");
  const [confirmedFacts, setConfirmedFacts] = useState("");
  const [callToAction, setCallToAction] =
    useState<(typeof callsToAction)[number]>("Book");
  const [seoFocus, setSeoFocus] = useState("");
  const [creativeNotes, setCreativeNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const providerInstruction = useMemo(
    () =>
      provider === "Codex"
        ? [
            "Work in the thepig365/mend-studio repository from the current main branch.",
            "Inspect the existing design system, service data and bilingual route conventions before editing.",
            "Implement the page on an isolated branch, run the repository checks and provide a review build.",
            "Do not merge or deploy to production without Leon's explicit approval.",
          ]
        : [
            "Prepare customer-facing copy, page structure and an implementation-ready brief.",
            "Do not claim that the page has been coded, published or connected to live systems.",
          ],
    [provider],
  );

  const prompt = useMemo(
    () =>
      [
        "MEND LANDING PAGE BUILD — DRAFT ONLY",
        `AI workspace: ${provider}`,
        `Page type: ${pageType}`,
        `Working title: ${pageTitle.trim() || "[required]"}`,
        `Audience: ${audience.trim() || "[not supplied]"}`,
        `Language: ${language}`,
        `Existing source page or service: ${sourceUrl.trim() || "[none supplied]"}`,
        `Primary call to action: ${callToAction}`,
        `SEO focus: ${seoFocus.trim() || "[research and missing facts must be identified]"}`,
        "",
        "CONFIRMED FACTS, OFFER DETAILS, PRICES AND DATES",
        confirmedFacts.trim() || "[required — do not proceed without confirmed facts]",
        "",
        "CREATIVE OR BRAND NOTES",
        creativeNotes.trim() || "[use the existing MEND website design and approved brand manifesto]",
        "",
        "EXECUTION RULES",
        ...providerInstruction,
        "Use only confirmed information above and verified public information from mendbeauty.com.au.",
        "Do not invent services, prices, dates, availability, reviews, rankings, clinical claims or results.",
        "Reuse the existing MEND header, footer, typography, colours, booking flow and responsive patterns.",
        "Keep English and Chinese facts commercially equivalent when the page is bilingual.",
        "Use the existing MaSe booking destination unless an exact approved service mapping exists.",
        "Keep the page accessible, mobile-first, crawlable and suitable for local search without keyword stuffing.",
        "Do not collect or include customer records, passwords, private analytics or full conversations.",
        "",
        "RETURN",
        "1. Missing facts or risks that must be resolved before publication.",
        "2. Recommended route and page hierarchy.",
        "3. Draft hero, sections, proof points, FAQs and call-to-action copy.",
        "4. SEO title, meta description, headings, internal links and structured-data recommendation.",
        "5. Asset list with clear notes where approved MEND photography is still required.",
        "6. Desktop and mobile acceptance checklist.",
        provider === "Codex"
          ? "7. Exact files changed, test results and a review URL."
          : "7. A clean handoff brief for implementation by Codex.",
        "",
        "This output remains Draft. The AI must not approve or publish its own work.",
      ].join("\n"),
    [
      audience,
      callToAction,
      confirmedFacts,
      creativeNotes,
      language,
      pageTitle,
      pageType,
      provider,
      providerInstruction,
      seoFocus,
      sourceUrl,
    ],
  );

  const readyToCopy =
    pageTitle.trim().length > 0 && confirmedFacts.trim().length > 0;

  async function copyBuildBrief() {
    if (!readyToCopy) {
      return;
    }

    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="mt-10 rounded-3xl border border-gold/45 bg-white/90 p-6 sm:p-8">
      <div className="max-w-3xl">
        <p className="eyebrow">Landing Page Studio</p>
        <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">
          Create an implementation-ready landing page draft
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cocoa">
          Build one controlled brief for ChatGPT, Codex or Claude. The studio
          works in this browser only: it does not call a paid AI API, save the
          form, edit the website or publish a page.
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-charcoal">
          Page type
          <select
            value={pageType}
            onChange={(event) =>
              setPageType(event.target.value as (typeof pageTypes)[number])
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {pageTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">
          AI workspace
          <select
            value={provider}
            onChange={(event) =>
              setProvider(event.target.value as LandingPageProvider)
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            <option>ChatGPT</option>
            <option>Codex</option>
            <option>Claude</option>
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">
          Working title <span className="text-bronze">*</span>
          <input
            required
            value={pageTitle}
            onChange={(event) => setPageTitle(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Example: MEND Signature Head Ritual"
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          Audience
          <input
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Example: Deepdene clients seeking premium Head Spa care"
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          Language
          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as (typeof languages)[number])
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {languages.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal">
          Primary call to action
          <select
            value={callToAction}
            onChange={(event) =>
              setCallToAction(
                event.target.value as (typeof callsToAction)[number],
              )
            }
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          >
            {callsToAction.map((action) => (
              <option key={action}>{action}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-charcoal md:col-span-2">
          Existing source page or service URL
          <input
            type="url"
            value={sourceUrl}
            onChange={(event) => setSourceUrl(event.target.value)}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="https://mendbeauty.com.au/services/head-spa"
          />
        </label>
        <label className="text-sm font-medium text-charcoal md:col-span-2">
          Confirmed facts, offer, prices and dates{" "}
          <span className="text-bronze">*</span>
          <textarea
            required
            value={confirmedFacts}
            onChange={(event) => setConfirmedFacts(event.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Add only approved facts. Do not paste customer records, passwords or private analytics."
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          SEO focus
          <textarea
            value={seoFocus}
            onChange={(event) => setSeoFocus(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Example: Head Spa Deepdene, Head Spa Melbourne"
          />
        </label>
        <label className="text-sm font-medium text-charcoal">
          Creative or brand notes
          <textarea
            value={creativeNotes}
            onChange={(event) => setCreativeNotes(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            placeholder="Approved image, tone, exclusions or layout direction"
          />
        </label>
      </div>

      <label className="mt-6 block text-sm font-medium text-charcoal">
        Generated landing-page build brief
        <textarea
          readOnly
          value={prompt}
          rows={16}
          className="mt-2 w-full rounded-xl border border-beige bg-sand/60 px-4 py-3 font-mono text-xs leading-relaxed text-cocoa"
        />
      </label>

      {!readyToCopy ? (
        <p className="mt-3 text-xs leading-relaxed text-cocoa" role="status">
          Add a working title and confirmed facts before copying the build
          brief.
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyBuildBrief}
          disabled={!readyToCopy}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
        >
          {copied ? "Copied" : "Copy landing-page brief"}
        </button>
        <a
          href={providerLinks[provider]}
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
        >
          Open {provider}
          <span className="sr-only"> in a new tab</span>
        </a>
      </div>

      <div className="mt-7 grid gap-3 border-t border-beige pt-6 text-xs leading-relaxed text-cocoa sm:grid-cols-3">
        <p>
          <strong className="text-charcoal">1. Prepare:</strong> enter only
          approved facts and copy the brief.
        </p>
        <p>
          <strong className="text-charcoal">2. Create:</strong> give the brief
          to the selected AI workspace.
        </p>
        <p>
          <strong className="text-charcoal">3. Review:</strong> approve the
          preview before any production publication.
        </p>
      </div>
    </section>
  );
}
