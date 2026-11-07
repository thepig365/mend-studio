import { MarketingText } from "@/components/MarketingLocale";
import { skillChinese, reasonChinese, guideChinese } from "@/lib/marketing-skills-zh";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownDocument from "@/components/MarkdownDocument";
import MarketingPortalFrame from "@/components/MarketingPortalFrame";
import MarketingSkillsDisclaimer from "@/components/MarketingSkillsDisclaimer";
import {
  getMarketingSkillDocument,
  getMarketingSkillFiles,
  resolveSkillHref,
} from "@/lib/marketing-skills";
import { requireMarketingPortal } from "@/lib/require-marketing-portal";

type MarketingSkillPageProps = {
  params: Promise<{
    slug: string;
    doc?: string[];
  }>;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const privateRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
};

export async function generateMetadata({
  params,
}: MarketingSkillPageProps): Promise<Metadata> {
  const { slug, doc } = await params;
  const document = getMarketingSkillDocument(slug, doc);
  return {
    title: document?.title ?? "Marketing skill",
    description:
      "Private third-party marketing skill for Mend staff. Not for publication.",
    robots: privateRobots,
  };
}

export default async function MarketingSkillPage({ params }: MarketingSkillPageProps) {
  await requireMarketingPortal();
  const { slug, doc } = await params;
  const document = getMarketingSkillDocument(slug, doc);
  if (!document) notFound();

  const files = getMarketingSkillFiles();
  const pinned = new Set(document.guides.map((guide) => guide.href));
  const otherReferences = document.references.filter((reference) => !pinned.has(reference.href));

  return (
    <MarketingPortalFrame
      eyebrow={<MarketingText en="Marketing Skills Library" zh="营销技能资料库" />}
      title={<MarketingText en={document.title} zh={document.isSkill ? skillChinese[document.slug]?.[0] ?? document.title : `${document.title}（英文原文）`} />}
      lede={
        <MarketingText
          en={document.isSkill ? document.reason ?? "Third-party agent skill. Use it as guidance, then check every fact." : `A reference inside ${document.skillTitle}.`}
          zh={document.isSkill ? reasonChinese[document.slug] ?? "第三方 AI 助手技能，仅供参考，使用前请核实每一项事实。" : `${skillChinese[document.slug]?.[0] ?? document.skillTitle}中的参考资料（英文原文）。`}
        />
      }
    >
      <p className="text-sm text-cocoa">
        <Link href="/marketing/skills" className="font-medium text-bronze underline decoration-gold/50 underline-offset-2">
          <MarketingText en="All skills" zh="全部技能" />
        </Link>
        {document.isSkill ? null : (
          <>
            {" / "}
            <Link
              href={`/marketing/skills/${document.slug}`}
              className="font-medium text-bronze underline decoration-gold/50 underline-offset-2"
            >
              {<MarketingText en={document.skillTitle} zh={skillChinese[document.slug]?.[0] ?? document.skillTitle} />}
            </Link>
          </>
        )}
      </p>
      <MarketingSkillsDisclaimer />
      {document.version ? (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-taupe">
          <MarketingText en="Upstream skill version" zh="上游技能版本" /> {document.version}
        </p>
      ) : null}
      {document.guides.length > 0 ? (
        <div>
          <h2 className="font-display text-2xl font-medium text-charcoal"><MarketingText en="Local guides" zh="本地指南" /></h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {document.guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="inline-flex rounded-full border border-gold/40 bg-white px-3 py-1 text-sm font-medium text-charcoal hover:border-gold"
                >
                  <MarketingText en={guide.label} zh={guideChinese[guide.label] ?? guide.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {document.isSkill && otherReferences.length > 0 ? (
        <details className="rounded-2xl border border-beige bg-white/70 p-5">
          <summary className="cursor-pointer text-sm font-medium text-charcoal">
            <MarketingText en="Guides inside this skill" zh="此技能中的指南（英文原文）" /> ({otherReferences.length})
          </summary>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {otherReferences.map((reference) => (
              <li key={reference.href}>
                <Link
                  href={reference.href}
                  className="text-sm font-medium text-bronze underline decoration-gold/50 underline-offset-2"
                >
                  {reference.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
      <p className="text-sm text-cocoa"><MarketingText en="Third-party source text · Original English. Reference document titles below also retain the upstream wording." zh="第三方资料 · 英文原文。下方参考文档标题也保留上游原文。" /></p>
      <article lang="en" className="rounded-3xl border border-beige bg-white/80 p-5 sm:p-8">
        <MarkdownDocument
          markdown={document.markdown}
          hideFirstHeading
          resolveHref={(href) => resolveSkillHref(href, document.file, files)}
        />
      </article>
    </MarketingPortalFrame>
  );
}
