#!/usr/bin/env node
/**
 * Refresh the vendored Marketing Skills markdown from
 * https://github.com/coreyhaines31/marketingskills (MIT).
 *
 * Copies LICENSE and skills markdown only, pinned to one upstream commit.
 * Does not execute any upstream installer, plugin, eval, or script.
 *
 * Usage:
 *   node scripts/refresh-marketingskills.mjs
 *   node scripts/refresh-marketingskills.mjs --sha <40-character commit>
 */

import { spawnSync } from "node:child_process";
import { createWriteStream } from "node:fs";
import {
  mkdtemp,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destination = path.join(repoRoot, "vendor", "marketingskills");
const repository = "https://github.com/coreyhaines31/marketingskills";

const shaArg = process.argv.indexOf("--sha");
const requestedSha = shaArg === -1 ? null : process.argv[shaArg + 1];
if (requestedSha !== null && !/^[0-9a-f]{40}$/.test(requestedSha)) {
  console.error("Pass a full 40-character upstream commit SHA after --sha.");
  process.exit(1);
}

const sha = requestedSha ?? resolveMainSha();
const staging = path.join(repoRoot, "vendor", `.marketingskills-${sha.slice(0, 12)}`);
const archiveDir = await mkdtemp(path.join(tmpdir(), "marketingskills-"));
const archivePath = path.join(archiveDir, "source.tar.gz");

try {
  console.log(`Downloading ${repository} @ ${sha}`);
  await downloadArchive(sha, archivePath);
  const extracted = extractArchive(archivePath, archiveDir);
  const sourceRoot = await findSourceRoot(extracted);
  await stageVendor(sourceRoot, staging, sha);
  await rm(destination, { recursive: true, force: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await rename(staging, destination);
  const skillCount = await countSkillFiles(destination);
  console.log(
    `Vendored ${skillCount.skills} skills (${skillCount.markdown} markdown files) at ${sha}.`,
  );
  console.log("No upstream install script was executed.");
} finally {
  await rm(archiveDir, { recursive: true, force: true });
  await rm(staging, { recursive: true, force: true });
}

function resolveMainSha() {
  const remote = spawnSync(
    "git",
    ["ls-remote", `${repository}.git`, "HEAD"],
    { encoding: "utf8" },
  );
  if (remote.status !== 0) {
    console.error(remote.stderr || "Could not resolve upstream HEAD.");
    process.exit(1);
  }
  const resolved = remote.stdout.trim().split(/\s+/)[0];
  if (!/^[0-9a-f]{40}$/.test(resolved)) {
    console.error("Upstream HEAD was not a commit SHA.");
    process.exit(1);
  }
  return resolved;
}

async function downloadArchive(commit, file) {
  const url = `https://codeload.github.com/coreyhaines31/marketingskills/tar.gz/${commit}`;
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(file));
}

function extractArchive(archive, directory) {
  const target = path.join(directory, "extract");
  spawnSync("mkdir", ["-p", target]);
  const extracted = spawnSync("tar", ["-xzf", archive, "-C", target], {
    encoding: "utf8",
  });
  if (extracted.status !== 0) {
    console.error(extracted.stderr || "Could not extract the upstream archive.");
    process.exit(1);
  }
  return target;
}

async function findSourceRoot(extracted) {
  const entries = await readdir(extracted);
  if (entries.length !== 1) {
    throw new Error("Expected a single directory inside the upstream archive.");
  }
  return path.join(extracted, entries[0]);
}

async function stageVendor(sourceRoot, stagingRoot, commit) {
  const licensePath = path.join(sourceRoot, "LICENSE");
  const license = await readFile(licensePath, "utf8");
  if (!license.includes("MIT License") || !license.includes("Copyright (c) 2025 Corey Haines")) {
    throw new Error("Upstream LICENSE was not the expected MIT licence.");
  }

  await mkdir(path.join(stagingRoot, "skills"), { recursive: true });
  await writeFile(path.join(stagingRoot, "LICENSE"), license);
  const markdownCount = await copyMarkdown(path.join(sourceRoot, "skills"), path.join(stagingRoot, "skills"));
  if (markdownCount === 0) {
    throw new Error("Upstream archive contained no skill markdown.");
  }

  const record = {
    name: "marketingskills",
    repository,
    commit,
    license: "MIT",
    licenseFile: "LICENSE",
    copyright: "Copyright (c) 2025 Corey Haines",
    included: ["LICENSE", "skills/**/*.md"],
    omitted:
      "Non-markdown files, evals, assets, scripts and upstream installers are not vendored and must not be executed.",
    refreshedOn: new Date().toISOString().slice(0, 10),
  };
  await writeFile(
    path.join(stagingRoot, "UPSTREAM.json"),
    `${JSON.stringify(record, null, 2)}\n`,
  );
  await writeFile(path.join(stagingRoot, "README.md"), readme(record, markdownCount));
}

async function copyMarkdown(source, dest) {
  let count = 0;
  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "." || entry.name === ".." || entry.isSymbolicLink()) continue;
    const from = path.join(source, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      count += await copyMarkdown(from, to);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const info = await stat(from);
    if (!info.isFile()) continue;
    const relative = path.relative(dest, to);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`Refusing to copy outside the vendor tree: ${entry.name}`);
    }
    await mkdir(path.dirname(to), { recursive: true });
    await writeFile(to, await readFile(from));
    count += 1;
  }
  return count;
}

async function countSkillFiles(root) {
  const skillsDir = path.join(root, "skills");
  const skills = (await readdir(skillsDir, { withFileTypes: true })).filter(
    (entry) => entry.isDirectory(),
  );
  let markdown = 0;
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && entry.name.endsWith(".md")) markdown += 1;
    }
  }
  await walk(skillsDir);
  return { skills: skills.length, markdown };
}

function readme(record, markdownCount) {
  return `# Vendored Marketing Skills

Third-party reference content for the private MEND Marketing Portal.
This is not MEND policy, and it is not customer-facing copy.

- Source: [${record.repository}](${record.repository})
- Pinned commit: \`${record.commit}\`
- Licence: MIT. The upstream licence is stored beside this file as \`LICENSE\`.
- Copyright: ${record.copyright}
- Contents: ${markdownCount} markdown files under \`skills/\` (each skill's \`SKILL.md\` and its markdown references). ${record.omitted}

Upstream skills are third-party guidance. Some contain unsourced statistics that must not be quoted as fact to customers.

## Refresh

From the repository root, with no extra npm packages:

\`\`\`bash
node scripts/refresh-marketingskills.mjs --sha ${record.commit}
\`\`\`

Omit \`--sha\` only when you intend to move the pin to current upstream \`HEAD\`. Review the diff before committing. Do not run upstream installers (\`npx skills\`, plugin install, or any script from the upstream repository). This refresh copies markdown and \`LICENSE\` only.

Do not add private strategy, customer or staff records, budgets, or secrets to this directory. The website repository is public.
`;
}
