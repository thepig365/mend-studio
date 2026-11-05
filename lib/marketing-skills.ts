import fs from "node:fs";
import path from "node:path";
import { firstHeading, parseSkillFrontmatter } from "@/lib/markdown-blocks.mjs";
import {
  mendHighlights,
  skillCategories,
} from "@/lib/marketing-skill-groups";
import upstream from "@/vendor/marketingskills/UPSTREAM.json";

export const marketingSkillsUpstream = upstream;

export type SkillCard = {
  slug: string;
  title: string;
  summary: string;
  categoryId: string;
  categoryTitle: string;
  highlightLabel: string | null;
  reason: string | null;
  guides: { href: string; label: string }[];
};

export type SkillCategoryGroup = {
  id: string;
  title: string;
  summary: string;
  skills: SkillCard[];
};

export type SkillDocument = {
  slug: string;
  title: string;
  skillTitle: string;
  markdown: string;
  file: string;
  version: string | null;
  reason: string | null;
  guides: { href: string; label: string }[];
  references: { href: string; label: string; file: string }[];
  isSkill: boolean;
};

const skillsRoot = path.join(process.cwd(), "vendor", "marketingskills", "skills");

type Cache = {
  files: Set<string>;
  cards: SkillCard[];
};

let cache: Cache | null = null;

function load(): Cache {
  if (cache) return cache;
  const files = new Set<string>();
  if (fs.existsSync(skillsRoot)) {
    for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
      collectFiles(path.join(skillsRoot, entry.name), entry.name, files);
    }
  }

  const categoryOf = new Map<string, { id: string; title: string }>();
  for (const category of skillCategories) {
    for (const slug of category.slugs) {
      categoryOf.set(slug, { id: category.id, title: category.title });
    }
  }
  const highlightOf = new Map(mendHighlights.map((item) => [item.slug, item]));
  const cards: SkillCard[] = [];

  for (const file of files) {
    if (!file.endsWith("/SKILL.md")) continue;
    const slug = file.slice(0, -"/SKILL.md".length);
    if (!slug || slug.includes("/")) continue;
    const raw = readSafe(file);
    if (raw === null) continue;
    const { data } = parseSkillFrontmatter(raw);
    const category = categoryOf.get(slug) ?? { id: "other", title: "Other" };
    const highlight = highlightOf.get(slug);
    cards.push({
      slug,
      title: firstHeading(raw) || titleFromSlug(data.name || slug),
      summary: summarize(data.description || ""),
      categoryId: category.id,
      categoryTitle: category.title,
      highlightLabel: highlight?.label ?? null,
      reason: highlight?.reason ?? null,
      guides: (highlight?.guides ?? [])
        .filter((guide) => files.has(guide.file))
        .map((guide) => ({ href: fileToHref(guide.file), label: guide.label })),
    });
  }

  cards.sort((left, right) => left.title.localeCompare(right.title, "en"));
  cache = { files, cards };
  return cache;
}

function collectFiles(directory: string, prefix: string, files: Set<string>) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink() || entry.name === "." || entry.name === "..") continue;
    const relative = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) {
      collectFiles(path.join(directory, entry.name), relative, files);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.add(relative);
    }
  }
}

export function getMarketingSkillFiles() {
  return load().files;
}

export function getMarketingSkillsCatalog() {
  const { cards } = load();
  const known = new Set<string>(skillCategories.flatMap((category) => [...category.slugs]));
  const categories: SkillCategoryGroup[] = skillCategories.map((category) => ({
    id: category.id,
    title: category.title,
    summary: category.summary,
    skills: category.slugs.flatMap((slug) => {
      const card = cards.find((item) => item.slug === slug);
      return card ? [card] : [];
    }),
  }));
  const extras = cards.filter((card) => !known.has(card.slug));
  if (extras.length > 0) {
    categories.push({
      id: "other",
      title: "Other",
      summary: "Skills added upstream that are not in the category map yet.",
      skills: extras,
    });
  }
  const highlights = mendHighlights.flatMap((item) => {
    const card = cards.find((candidate) => candidate.slug === item.slug);
    return card ? [card] : [];
  });
  return {
    highlights,
    categories,
    commit: upstream.commit,
    repository: upstream.repository,
    skillCount: cards.length,
  };
}

export function getMarketingSkillDocument(slug: string, doc?: string[]): SkillDocument | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const { files, cards } = load();
  let relative: string;
  if (!doc || doc.length === 0) {
    relative = `${slug}/SKILL.md`;
  } else {
    if (doc.some((part) => part === "." || part === ".." || !/^[A-Za-z0-9._-]+$/.test(part))) {
      return null;
    }
    relative = `${slug}/${doc.join("/")}.md`;
  }
  if (!files.has(relative)) return null;
  const raw = readSafe(relative);
  if (raw === null) return null;
  const { data, body } = parseSkillFrontmatter(raw);
  const card = cards.find((item) => item.slug === slug);
  const fallback = titleFromSlug(doc && doc.length > 0 ? doc[doc.length - 1] : data.name || slug);
  const references = [...files]
    .filter((file) => file.startsWith(`${slug}/`) && file !== `${slug}/SKILL.md`)
    .map((file) => ({
      href: fileToHref(file),
      label: referenceLabel(file),
      file,
    }))
    .sort((left, right) => left.label.localeCompare(right.label, "en"));

  return {
    slug,
    title: firstHeading(raw) || fallback,
    skillTitle: card?.title ?? titleFromSlug(slug),
    markdown: body,
    file: relative,
    version: data["metadata.version"] || null,
    reason: card?.reason ?? null,
    guides: card?.guides ?? [],
    references,
    isSkill: relative.endsWith("/SKILL.md"),
  };
}

export function fileToHref(file: string) {
  if (file.endsWith("/SKILL.md")) {
    return `/marketing/skills/${file.slice(0, -"/SKILL.md".length)}`;
  }
  const [slug, ...rest] = file.replace(/\.md$/, "").split("/");
  return `/marketing/skills/${slug}/${rest.join("/")}`;
}

export function resolveSkillHref(
  href: string,
  fromFile: string,
  files: ReadonlySet<string>,
) {
  const value = href.trim();
  if (!value) return null;
  if (value.startsWith("#")) return value;
  if (/^(https?:\/\/|mailto:)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return null;

  const hashAt = value.indexOf("#");
  const pathPart = hashAt === -1 ? value : value.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : value.slice(hashAt);
  if (!pathPart) return hash || null;

  let decoded = pathPart;
  try {
    decoded = decodeURI(pathPart);
  } catch {
    return null;
  }
  if (decoded.includes("\\") || decoded.includes("\0")) return null;

  const targetPath = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), decoded));
  if (targetPath === ".." || targetPath.startsWith("../") || path.posix.isAbsolute(targetPath)) {
    return null;
  }

  let target = targetPath;
  if (!target.endsWith(".md")) {
    if (files.has(`${target}/SKILL.md`)) target = `${target}/SKILL.md`;
    else if (files.has(`${target}.md`)) target = `${target}.md`;
    else return null;
  }
  if (!files.has(target)) return null;
  return `${fileToHref(target)}${hash}`;
}

function readSafe(relative: string) {
  const absolute = path.resolve(skillsRoot, ...relative.split("/"));
  const root = path.resolve(skillsRoot);
  if (absolute !== root && !absolute.startsWith(`${root}${path.sep}`)) return null;
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return null;
  return fs.readFileSync(absolute, "utf8");
}

function summarize(description: string) {
  const clean = description.replace(/\s+/g, " ").trim();
  if (!clean) return "Third-party agent skill.";
  if (clean.length <= 180) return clean;
  const clipped = clean.slice(0, 177);
  const space = clipped.lastIndexOf(" ");
  return `${(space > 80 ? clipped.slice(0, space) : clipped).trimEnd()}…`;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function referenceLabel(file: string) {
  return file
    .split("/")
    .slice(1)
    .join("/")
    .replace(/\.md$/, "")
    .split("/")
    .map((part) =>
      part
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(" / ");
}
