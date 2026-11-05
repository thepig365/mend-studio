"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SkillCard = {
  slug: string;
  title: string;
  summary: string;
  categoryTitle: string;
  highlightLabel: string | null;
  reason: string | null;
  guides: { href: string; label: string }[];
};

type SkillCategoryGroup = {
  id: string;
  title: string;
  summary: string;
  skills: SkillCard[];
};

type MarketingSkillsBrowserProps = {
  highlights: SkillCard[];
  categories: SkillCategoryGroup[];
  skillCount: number;
};

export default function MarketingSkillsBrowser({
  highlights,
  categories,
  skillCount,
}: MarketingSkillsBrowserProps) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const visibleHighlights = useMemo(
    () => highlights.filter((skill) => matches(skill, needle)),
    [highlights, needle],
  );
  const visibleCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) => matches(skill, needle)),
        }))
        .filter((category) => category.skills.length > 0),
    [categories, needle],
  );
  const visibleCount = visibleCategories.reduce(
    (total, category) => total + category.skills.length,
    0,
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block max-w-xl text-sm font-medium text-charcoal" htmlFor="skill-search">
          Search skills
          <input
            id="skill-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try AI SEO, local SEO, schema, email"
            className="mt-2 w-full rounded-xl border border-beige bg-cream px-4 py-3 font-normal outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </label>
        <p className="text-sm text-cocoa">
          {needle
            ? `${visibleCount} of ${skillCount} skills`
            : `${skillCount} skills`}
        </p>
      </div>

      {visibleHighlights.length > 0 ? (
        <section aria-labelledby="mend-relevant-skills">
          <h2 id="mend-relevant-skills" className="font-display text-3xl font-medium text-charcoal">
            Most relevant to MEND
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cocoa">
            AI SEO / answer-engine optimisation, local SEO, schema, directory
            submissions, copywriting, email and social. These are still
            third-party notes. Confirm every fact before it is used with a
            customer.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {visibleHighlights.map((skill) => (
              <article
                key={skill.slug}
                className="rounded-3xl border border-gold/50 bg-white/90 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-bronze">
                  Relevant to MEND · {skill.highlightLabel}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-charcoal">
                  <Link href={`/marketing/skills/${skill.slug}`} className="hover:text-bronze">
                    {skill.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa">{skill.reason}</p>
                {skill.guides.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {skill.guides.map((guide) => (
                      <li key={guide.href}>
                        <Link
                          href={guide.href}
                          className="inline-flex rounded-full border border-beige bg-sand/70 px-3 py-1 text-xs font-medium text-charcoal hover:border-gold"
                        >
                          {guide.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <nav aria-label="Skill categories" className="flex flex-wrap gap-2">
        {visibleCategories.map((category) => (
          <a
            key={category.id}
            href={`#skill-category-${category.id}`}
            className="rounded-full border border-beige bg-white px-4 py-2 text-sm font-medium text-charcoal hover:border-gold"
          >
            {category.title}
          </a>
        ))}
      </nav>

      {visibleCategories.length === 0 ? (
        <p className="rounded-3xl border border-beige bg-white/80 p-6 text-sm text-cocoa">
          No skills match that search.
        </p>
      ) : (
        visibleCategories.map((category) => (
          <section
            key={category.id}
            id={`skill-category-${category.id}`}
            className="scroll-mt-32"
            aria-labelledby={`skill-category-heading-${category.id}`}
          >
            <h2
              id={`skill-category-heading-${category.id}`}
              className="font-display text-3xl font-medium text-charcoal"
            >
              {category.title}
            </h2>
            <p className="mt-2 text-sm text-cocoa">{category.summary}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {category.skills.map((skill) => (
                <Link
                  key={skill.slug}
                  href={`/marketing/skills/${skill.slug}`}
                  className="rounded-3xl border border-beige bg-white/80 p-5 transition-colors hover:border-gold"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium text-charcoal">
                      {skill.title}
                    </h3>
                    {skill.highlightLabel ? (
                      <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-bronze">
                        Relevant to MEND
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa">{skill.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function matches(skill: SkillCard, needle: string) {
  if (!needle) return true;
  return [skill.title, skill.slug, skill.summary, skill.categoryTitle, skill.highlightLabel, skill.reason]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(needle);
}
