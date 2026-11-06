// Public category map for the vendored marketingskills library.
// Relevance notes stay generic: no private strategy, customers, staff or budgets.

export type SkillGuide = {
  file: string;
  label: string;
};

export type MendHighlight = {
  slug: string;
  label: string;
  reason: string;
  guides?: readonly SkillGuide[];
};

export const mendHighlights: readonly MendHighlight[] = [
  {
    slug: "ai-seo",
    label: "AI SEO / AEO",
    reason:
      "How public answers can be easier for AI search and assistants to cite. Figures in the skill are not MEND results.",
  },
  {
    slug: "seo-audit",
    label: "Local SEO",
    reason:
      "Technical and local SEO review, including Google Business Profile and map-pack checks for a studio people visit in person.",
    guides: [
      { file: "seo-audit/references/local-seo.md", label: "Local SEO overview" },
      {
        file: "seo-audit/references/local-seo-profile-and-citations.md",
        label: "Profile and citations",
      },
      {
        file: "seo-audit/references/local-seo-pages-and-measurement.md",
        label: "Pages and measurement",
      },
    ],
  },
  {
    slug: "schema",
    label: "Schema",
    reason:
      "Structured-data patterns. Markup on the public site has to match the visible page and is reviewed separately.",
  },
  {
    slug: "directory-submissions",
    label: "Directory submissions",
    reason:
      "Directory and citation ideas. Confirm a listing is appropriate and accurate before anyone submits it.",
  },
  {
    slug: "copywriting",
    label: "Copywriting",
    reason:
      "Drafting and rewriting marketing copy. Use only confirmed studio facts, prices and offers.",
  },
  {
    slug: "emails",
    label: "Email",
    reason:
      "Email sequence patterns for customer communication. Do not invent offers, consent or results.",
  },
  {
    slug: "social",
    label: "Social",
    reason: "Social content workflows for channels such as Instagram and Facebook.",
  },
];

export const skillCategories = [
  {
    id: "seo",
    title: "SEO and content",
    summary: "Search, local discovery, structured data, site structure and links.",
    slugs: [
      "seo-audit",
      "ai-seo",
      "schema",
      "site-architecture",
      "programmatic-seo",
      "content-strategy",
      "link-building",
      "aso",
    ],
  },
  {
    id: "cro",
    title: "Conversion",
    summary: "Page, signup, onboarding and popup conversion workflows.",
    slugs: ["cro", "signup", "onboarding", "popups", "paywalls"],
  },
  {
    id: "copy",
    title: "Content and copy",
    summary: "Writing, editing, email, social and other customer-facing content.",
    slugs: [
      "copywriting",
      "copy-editing",
      "emails",
      "cold-email",
      "social",
      "sms",
      "video",
      "image",
    ],
  },
  {
    id: "paid",
    title: "Paid and measurement",
    summary: "Advertising, creative, experiments, analytics and attribution.",
    slugs: [
      "ads",
      "ad-creative",
      "ab-testing",
      "analytics",
      "attribution",
      "conversion-tracking",
    ],
  },
  {
    id: "growth",
    title: "Growth and retention",
    summary: "Referrals, community, partnerships, events and retention.",
    slugs: [
      "referrals",
      "free-tools",
      "lead-magnets",
      "community-marketing",
      "co-marketing",
      "influencer-marketing",
      "events",
      "churn-prevention",
    ],
  },
  {
    id: "gtm",
    title: "Sales and go-to-market",
    summary: "Launch, pricing, competitors, directories and sales material.",
    slugs: [
      "launch",
      "pricing",
      "offers",
      "competitors",
      "competitor-profiling",
      "directory-submissions",
      "prospecting",
      "sales-enablement",
      "revops",
      "public-relations",
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    summary: "Positioning, research, planning and marketing ideas.",
    slugs: [
      "product-marketing",
      "customer-research",
      "marketing-plan",
      "marketing-ideas",
      "marketing-psychology",
      "marketing-council",
      "marketing-loops",
      "reverse-engineer-marketing",
    ],
  },
] as const;
