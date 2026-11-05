/**
 * Small Markdown block parser for vendored skill files.
 * Emits data only. Callers render it as React text, so raw HTML stays text.
 */

export function markdownToBlocks(markdown, options = {}) {
  const source = String(markdown).replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const body = source.startsWith("---\n") ? stripFrontmatter(source).body : source;
  const ctx = {
    resolveHref: options.resolveHref,
    ids: new Set(),
  };
  return parseBlocks(body.split("\n"), ctx);
}

export function parseSkillFrontmatter(markdown) {
  return stripFrontmatter(String(markdown).replace(/\r\n/g, "\n"));
}

export function firstHeading(markdown) {
  const { body } = stripFrontmatter(String(markdown).replace(/\r\n/g, "\n"));
  const match = body.match(/^#\s+(.+?)\s*$/m);
  if (!match) return "";
  return match[1].replace(/[*_`]/g, "").trim();
}

function stripFrontmatter(text) {
  if (!text.startsWith("---\n")) return { data: {}, body: text };
  const end = text.indexOf("\n---\n", 3);
  if (end === -1) return { data: {}, body: text };
  return {
    data: parseYaml(text.slice(4, end)),
    body: text.slice(end + 5),
  };
}

function parseYaml(yaml) {
  const data = {};
  const lines = yaml.split("\n");
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      index += 1;
      continue;
    }
    const key = match[1];
    const rawValue = match[2];
    if (rawValue === "") {
      index += 1;
      while (index < lines.length && /^\s+\S/.test(lines[index])) {
        const nested = lines[index].match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
        if (nested) data[`${key}.${nested[1]}`] = unquote(nested[2]);
        index += 1;
      }
      continue;
    }
    if (rawValue === ">" || rawValue === "|" || rawValue === ">-" || rawValue === "|-") {
      const folded = rawValue.startsWith(">");
      const collected = [];
      index += 1;
      while (index < lines.length && (lines[index].startsWith("  ") || lines[index] === "")) {
        collected.push(lines[index].replace(/^ {2}/, ""));
        index += 1;
      }
      data[key] = collected.join(folded ? " " : "\n").trim();
      continue;
    }
    data[key] = unquote(rawValue);
    index += 1;
  }
  return data;
}

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
  }
  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parseBlocks(lines, ctx) {
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    if (lines[index].trim() === "") {
      index += 1;
      continue;
    }
    const trimmed = lines[index].trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      const fence = trimmed.slice(0, 3);
      const lang = trimmed.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith(fence)) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", lang, value: code.join("\n").replace(/\n$/, "") });
      continue;
    }
    const heading = lines[index].match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const text = parseInline(heading[2], ctx.resolveHref);
      blocks.push({
        type: "heading",
        level: heading[1].length,
        id: uniqueId(plainText(text), ctx.ids),
        text,
      });
      index += 1;
      continue;
    }
    if (isHr(trimmed)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }
    if (
      index + 1 < lines.length &&
      trimmed.includes("|") &&
      isSeparator(lines[index + 1])
    ) {
      const headers = splitRow(lines[index]).map((cell) => parseInline(cell, ctx.resolveHref));
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim() !== "" && lines[index].includes("|")) {
        rows.push(splitRow(lines[index]).map((cell) => parseInline(cell, ctx.resolveHref)));
        index += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }
    if (trimmed.startsWith(">")) {
      const quoted = [];
      while (index < lines.length) {
        if (lines[index].trim() === "") {
          const next = lines[index + 1];
          if (!next || !next.trim().startsWith(">")) break;
          quoted.push("");
          index += 1;
          continue;
        }
        if (!lines[index].trim().startsWith(">")) break;
        quoted.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", blocks: parseBlocks(quoted, ctx) });
      continue;
    }
    if (listMatch(lines[index])) {
      const list = parseList(lines, index, ctx);
      blocks.push(list.block);
      index = list.next;
      continue;
    }
    const paragraph = [];
    while (index < lines.length && lines[index].trim() !== "" && !startsBlock(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length === 0) {
      blocks.push({ type: "paragraph", text: parseInline(lines[index].trim(), ctx.resolveHref) });
      index += 1;
      continue;
    }
    blocks.push({ type: "paragraph", text: parseInline(paragraph.join(" "), ctx.resolveHref) });
  }
  return blocks;
}

function parseList(lines, start, ctx) {
  const opening = listMatch(lines[start]);
  const base = opening.indent;
  const ordered = opening.ordered;
  const items = [];
  let index = start;
  while (index < lines.length) {
    if (lines[index].trim() === "") {
      let lookahead = index + 1;
      while (lookahead < lines.length && lines[lookahead].trim() === "") lookahead += 1;
      const next = lookahead < lines.length ? listMatch(lines[lookahead]) : null;
      if (!next || next.indent !== base || next.ordered !== ordered) break;
      index = lookahead;
    }
    const match = listMatch(lines[index]);
    if (!match || match.indent !== base || match.ordered !== ordered) break;
    index += 1;
    const body = [match.text];
    while (index < lines.length) {
      if (lines[index].trim() === "") {
        let lookahead = index + 1;
        while (lookahead < lines.length && lines[lookahead].trim() === "") lookahead += 1;
        const next = lookahead < lines.length ? listMatch(lines[lookahead]) : null;
        if (next && next.indent === base && next.ordered === ordered) break;
        if (lookahead >= lines.length || indentOf(lines[lookahead]) <= base) break;
        body.push("");
        index += 1;
        continue;
      }
      const next = listMatch(lines[index]);
      if (next && next.indent <= base) break;
      if (!next && indentOf(lines[index]) <= base && startsBlock(lines, index)) break;
      const remove = Math.min(indentOf(lines[index]), base + 2);
      body.push(lines[index].slice(remove));
      index += 1;
    }
    const blocks = parseBlocks(body, ctx);
    const text = blocks[0]?.type === "paragraph" ? blocks[0].text : [];
    const rest = blocks[0]?.type === "paragraph" ? blocks.slice(1) : blocks;
    items.push({ task: match.task, text, blocks: rest });
  }
  return { block: { type: "list", ordered, items }, next: index };
}

function listMatch(line) {
  const match = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
  if (!match) return null;
  if (isHr(line.trim())) return null;
  let text = match[3];
  let task = null;
  const taskMatch = text.match(/^\[([ xX])\]\s+(.*)$/);
  if (taskMatch && /[-*+]/.test(match[2])) {
    task = taskMatch[1].toLowerCase() === "x";
    text = taskMatch[2];
  }
  return { indent: match[1].length, ordered: /\d/.test(match[2]), text, task };
}

function startsBlock(lines, index) {
  const trimmed = lines[index].trim();
  if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) return true;
  if (/^#{1,6}\s+/.test(trimmed)) return true;
  if (isHr(trimmed)) return true;
  if (trimmed.startsWith(">")) return true;
  if (listMatch(lines[index])) return true;
  if (index + 1 < lines.length && trimmed.includes("|") && isSeparator(lines[index + 1])) return true;
  return false;
}

function isHr(trimmed) {
  return /^(\*(?:\s*\*){2,}|(?:-(?:\s*-){2,})|(?:_(?:\s*_){2,}))$/.test(trimmed);
}

function isSeparator(line) {
  const cells = splitRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-+:?$/.test(cell));
}

function splitRow(line) {
  let row = line.trim();
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|")) row = row.slice(0, -1);
  return row.split("|").map((cell) => cell.trim());
}

function indentOf(line) {
  return line.match(/^\s*/)[0].length;
}

function parseInline(input, resolveHref) {
  const nodes = [];
  let index = 0;
  const pushText = (value) => {
    if (!value) return;
    const decoded = decodeEntities(value);
    const last = nodes[nodes.length - 1];
    if (last && last.type === "text") last.value += decoded;
    else nodes.push({ type: "text", value: decoded });
  };

  while (index < input.length) {
    const character = input[index];
    if (character === "\\") {
      pushText(index + 1 < input.length ? input[index + 1] : "\\");
      index += index + 1 < input.length ? 2 : 1;
      continue;
    }
    if (character === "`") {
      const end = input.indexOf("`", index + 1);
      if (end > index) {
        nodes.push({ type: "code", value: input.slice(index + 1, end) });
        index = end + 1;
        continue;
      }
    }
    if (character === "!" && input[index + 1] === "[") {
      const link = readLink(input, index + 1);
      if (link) {
        nodes.push({ type: "image", alt: link.label, href: safeHref(link.href, resolveHref) });
        index = link.end;
        continue;
      }
    }
    if (character === "[") {
      const link = readLink(input, index);
      if (link) {
        const href = safeHref(link.href, resolveHref);
        const children = parseInline(link.label, resolveHref);
        if (href) nodes.push({ type: "link", href, children });
        else nodes.push(...children);
        index = link.end;
        continue;
      }
    }
    if (
      (character === "*" && input[index + 1] === "*") ||
      (character === "_" && input[index + 1] === "_")
    ) {
      const marker = character + character;
      const end = input.indexOf(marker, index + 2);
      if (end !== -1) {
        nodes.push({
          type: "strong",
          children: parseInline(input.slice(index + 2, end), resolveHref),
        });
        index = end + 2;
        continue;
      }
    }
    if (character === "*" && input[index + 1] !== "*" && input[index + 1] !== " ") {
      const end = findEmphasisEnd(input, index + 1);
      if (end !== -1) {
        nodes.push({
          type: "em",
          children: parseInline(input.slice(index + 1, end), resolveHref),
        });
        index = end + 1;
        continue;
      }
    }
    if (character === "<") {
      const end = input.indexOf(">", index + 1);
      if (end !== -1) {
        const inner = input.slice(index + 1, end);
        if (/^(https?:\/\/|mailto:)/i.test(inner) && !/\s/.test(inner)) {
          const href = safeHref(inner, resolveHref);
          if (href) {
            nodes.push({
              type: "link",
              href,
              children: [{ type: "text", value: inner }],
            });
            index = end + 1;
            continue;
          }
        }
      }
    }
    let next = index + 1;
    while (next < input.length && !isSpecial(input, next)) next += 1;
    pushText(input.slice(index, next));
    index = next;
  }
  return nodes;
}

function findEmphasisEnd(input, from) {
  for (let index = from; index < input.length; index += 1) {
    if (input[index] !== "*") continue;
    if (input[index + 1] === "*") {
      index += 1;
      continue;
    }
    if (input[index - 1] === " ") continue;
    return index;
  }
  return -1;
}

function isSpecial(input, index) {
  const character = input[index];
  if (character === "\\" || character === "`" || character === "[" || character === "<" || character === "*") {
    return true;
  }
  if (character === "!" && input[index + 1] === "[") return true;
  if (character === "_" && input[index + 1] === "_") return true;
  return false;
}

function readLink(input, start) {
  if (input[start] !== "[") return null;
  const labelEnd = input.indexOf("]", start + 1);
  if (labelEnd === -1 || input[labelEnd + 1] !== "(") return null;
  const label = input.slice(start + 1, labelEnd);
  let index = labelEnd + 2;
  let href = "";
  if (input[index] === "<") {
    const end = input.indexOf(">", index + 1);
    if (end === -1) return null;
    href = input.slice(index + 1, end);
    index = end + 1;
  } else {
    const hrefStart = index;
    let depth = 0;
    while (index < input.length) {
      const character = input[index];
      if (character === "\\") {
        index += 2;
        continue;
      }
      if (character === "(") depth += 1;
      if (character === ")") {
        if (depth === 0) break;
        depth -= 1;
      }
      if (character === " " || character === "\n") break;
      index += 1;
    }
    href = input.slice(hrefStart, index).trim();
    if (input[index] === " ") {
      while (index < input.length && input[index] !== ")") index += 1;
    }
  }
  if (input[index] !== ")") return null;
  return { label, href, end: index + 1 };
}

function safeHref(href, resolveHref) {
  const value = href.trim();
  if (!value) return null;
  if (resolveHref) return resolveHref(value);
  if (/^(https?:\/\/|mailto:)/i.test(value) || value.startsWith("#")) return value;
  return null;
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function plainText(nodes) {
  return nodes
    .map((node) => {
      if (node.type === "text" || node.type === "code") return node.value;
      if (node.type === "image") return node.alt;
      if (node.children) return plainText(node.children);
      return "";
    })
    .join("");
}

function uniqueId(text, ids) {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section";
  let id = base;
  let count = 2;
  while (ids.has(id)) {
    id = `${base}-${count}`;
    count += 1;
  }
  ids.add(id);
  return id;
}
