import Link from "next/link";
import {
  markdownToBlocks,
  type Block,
  type InlineNode,
} from "@/lib/markdown-blocks.mjs";

type MarkdownDocumentProps = {
  markdown: string;
  resolveHref: (href: string) => string | null;
  hideFirstHeading?: boolean;
};

export default function MarkdownDocument({
  markdown,
  resolveHref,
  hideFirstHeading = false,
}: MarkdownDocumentProps) {
  const blocks = markdownToBlocks(markdown, { resolveHref });
  const visible =
    hideFirstHeading && blocks[0]?.type === "heading" && blocks[0].level === 1
      ? blocks.slice(1)
      : blocks;

  return (
    <div className="space-y-4 text-sm leading-relaxed text-cocoa sm:text-base">
      {visible.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const className =
        block.level <= 2
          ? "scroll-mt-32 font-display text-3xl font-medium text-charcoal"
          : block.level === 3
            ? "scroll-mt-32 font-display text-2xl font-medium text-charcoal"
            : "scroll-mt-32 text-lg font-medium text-charcoal";
      if (block.level <= 2) {
        return (
          <h2 id={block.id} className={className}>
            <InlineView nodes={block.text} />
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3 id={block.id} className={className}>
            <InlineView nodes={block.text} />
          </h3>
        );
      }
      return (
        <h4 id={block.id} className={className}>
          <InlineView nodes={block.text} />
        </h4>
      );
    }
    case "paragraph":
      return (
        <p>
          <InlineView nodes={block.text} />
        </p>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={
            block.ordered
              ? "list-decimal space-y-2 pl-5"
              : "list-disc space-y-2 pl-5"
          }
        >
          {block.items.map((item, index) => (
            <li key={index} className="pl-1">
              {item.task === null ? null : (
                <span className="mr-2 text-bronze" aria-hidden>
                  {item.task ? "☑" : "☐"}
                </span>
              )}
              {item.text.length > 0 ? <InlineView nodes={item.text} /> : null}
              {item.blocks.length > 0 ? (
                <div className="mt-2 space-y-3">
                  {item.blocks.map((child, childIndex) => (
                    <BlockView key={childIndex} block={child} />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ListTag>
      );
    }
    case "code":
      return (
        <pre className="overflow-x-auto rounded-2xl bg-charcoal px-4 py-3 text-sm text-cream">
          {block.lang ? (
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-gold">
              {block.lang}
            </span>
          ) : null}
          <code className="whitespace-pre-wrap">{block.value}</code>
        </pre>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-2 border-gold pl-4 text-cocoa">
          <div className="space-y-3">
            {block.blocks.map((child, index) => (
              <BlockView key={index} block={child} />
            ))}
          </div>
        </blockquote>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-beige">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-sand">
              <tr>
                {block.headers.map((cell, index) => (
                  <th
                    key={index}
                    className="border-b border-beige px-3 py-2 font-medium text-charcoal"
                  >
                    <InlineView nodes={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="align-top odd:bg-white/40">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-t border-beige px-3 py-2">
                      <InlineView nodes={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hr":
      return <hr className="border-beige" />;
    default:
      return null;
  }
}

function InlineView({ nodes }: { nodes: InlineNode[] }) {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return <span key={index}>{node.value}</span>;
      case "code":
        return (
          <code
            key={index}
            className="rounded bg-sand px-1 py-0.5 text-[0.9em] text-charcoal"
          >
            {node.value}
          </code>
        );
      case "strong":
        return (
          <strong key={index} className="font-medium text-charcoal">
            <InlineView nodes={node.children} />
          </strong>
        );
      case "em":
        return (
          <em key={index}>
            <InlineView nodes={node.children} />
          </em>
        );
      case "link":
        return (
          <MarkdownLink key={index} href={node.href}>
            <InlineView nodes={node.children} />
          </MarkdownLink>
        );
      case "image":
        return node.href ? (
          <MarkdownLink key={index} href={node.href}>
            {node.alt ? `Image: ${node.alt}` : "Image"}
          </MarkdownLink>
        ) : (
          <span key={index}>{node.alt}</span>
        );
      default:
        return null;
    }
  });
}

function MarkdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "font-medium text-bronze underline decoration-gold/50 underline-offset-2 hover:text-charcoal";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
