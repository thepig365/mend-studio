declare module "@/lib/markdown-blocks.mjs" {
  export type InlineNode =
    | { type: "text"; value: string }
    | { type: "code"; value: string }
    | { type: "strong"; children: InlineNode[] }
    | { type: "em"; children: InlineNode[] }
    | { type: "link"; href: string; children: InlineNode[] }
    | { type: "image"; alt: string; href: string | null };

  export type Block =
    | { type: "heading"; level: number; id: string; text: InlineNode[] }
    | { type: "paragraph"; text: InlineNode[] }
    | { type: "list"; ordered: boolean; items: ListItem[] }
    | { type: "code"; lang: string; value: string }
    | { type: "blockquote"; blocks: Block[] }
    | { type: "table"; headers: InlineNode[][]; rows: InlineNode[][][] }
    | { type: "hr" };

  export type ListItem = {
    task: boolean | null;
    text: InlineNode[];
    blocks: Block[];
  };

  export function markdownToBlocks(
    markdown: string,
    options?: { resolveHref?: (href: string) => string | null },
  ): Block[];

  export function parseSkillFrontmatter(markdown: string): {
    data: Record<string, string>;
    body: string;
  };

  export function firstHeading(markdown: string): string;
}
