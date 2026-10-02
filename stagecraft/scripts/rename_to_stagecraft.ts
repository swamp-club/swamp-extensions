// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

// The rename from the development code name, gatorwalk-factory, to the public
// name, stagecraft (swamp-club #2932), as a codemod that can be re-run on a
// newer main, or on a branch before it rebases onto the rename.
//
// From the repo root (the root is git's, so a copy outside the repo works):
//
//   deno run --allow-read --allow-write --allow-run=git \
//     stagecraft/scripts/rename_to_stagecraft.ts [--check]
//
// Then, in stagecraft/: deno task build:studio && deno task fmt. The studio's
// generated bundle is not rewritten here; the build makes it again, and
// studio_assets_test fails until it does.
//
// --check rewrites nothing. It fails when a file is left under the old
// directory, the old codemod is still there, or the old name is left in a
// file the rename covers.

type Replacer = string | ((match: string, ...groups: string[]) => string);

interface Rule {
  from: RegExp;
  to: Replacer;
}

/** Keep the case of `match` on `word`: all caps, capitalized or lower. */
function caseLike(match: string, word: string): string {
  if (match === match.toUpperCase()) return word.toUpperCase();
  return /^[A-Z]/.test(match) ? word[0].toUpperCase() + word.slice(1) : word;
}

/** Directory names: the extension's and its skill's. */
export const PATH_RULES: Rule[] = [
  { from: /gatorwalk-factory/g, to: "stagecraft" },
];

/**
 * Wording a word swap gets wrong. These run first and match the old text, so
 * on a renamed tree they match nothing.
 */
export const SPECIAL_RULES: Rule[] = [
  // The skill's triggers: both old names would become one duplicated trigger.
  {
    from:
      /"gatorwalk",(\s+)"gatorwalk-factory", "set up a gatorwalk factory", "create a\n(\s+)gatorwalk factory",/g,
    to:
      '"stagecraft",$1"set up a stagecraft factory", "create a stagecraft\n$2factory",',
  },
  // README's layout block is fenced, so it is not re-wrapped; this line would
  // be 81 columns.
  {
    from: /the real-engine suite: gatorwalk through the swamp CLI/g,
    to: "the real-engine suite, through the swamp CLI",
  },
  // README: it is no longer a code name.
  {
    from: /`gatorwalk-factory` is a code name\. This is the from-scratch/g,
    to: "`stagecraft` is the from-scratch",
  },
  {
    from:
      /It is \*\*not published\*\*, and its public name is chosen at go-live\./g,
    to: "It is **not published** until go-live.",
  },
  // workflow-verify.yaml: the example it named was removed in #2842.
  {
    from:
      /The gatorwalk swamp-club-swamp-extensions\n(\s*)example factory definition, at\n\s*\S+swamp-club-swamp-extensions\.yaml,\n\s*runs this as its one verify stage;/g,
    to: "A factory definition can\n$1run this as its one verify stage;",
  },
  // checks.yaml: scripts/ holds this codemod now, not #2785's.
  {
    from: /holds the lifecycle -> factory codemod \(swamp-club #2785\)/g,
    to: "holds the stagecraft rename codemod (swamp-club #2932)",
  },
];

/** The name itself, applied line by line after SPECIAL_RULES. */
export const NAME_RULES: Rule[] = [
  { from: /@swamp\/gatorwalk-factory\b/g, to: "@swamp/stagecraft" },
  { from: /gatorwalk-factory/gi, to: (m) => caseLike(m, "stagecraft") },
  { from: /gatorwalk/gi, to: (m) => caseLike(m, "stagecraft") },
];

const DECISION_HEADING =
  "### 2026-10-01: the extension is named stagecraft (swamp-club #2932)";

const DECISION = `${DECISION_HEADING}

**Decision.** The extension's public name is stagecraft: its directory is
\`stagecraft/\`, its types are \`@swamp/stagecraft/<type>\` (\`factory\`,
\`work-item\`, \`studio\`, \`tracker\`, \`swamp-club\`, \`linear\` and the
\`work-item-summary\` report), and its skill is \`stagecraft\`. The vocabulary
inside it stays: factory, factory definition, work item, stage, gate, product,
tracker. Stagecraft is what makes factories, so \`@swamp/stagecraft/factory\`
reads correctly.

**Why.** Seth, 2026-10-01: the product is a factory maker. You use it to build
your own factories, where agents do the work or drive a process: software, web
posts, incident reviews, swamp models or extensions, or anything else expressed
as stages that produce artifacts and evidence, with gates that set the rules
for moving between them. The development code name was never meant to ship.
Names considered: meta-factory (taken by \`@atalanta/meta-factory\`), millwright,
lockkeeper, workshop, and plain factory, which reads too close to
\`@swamp/software-factory\` and would make the type \`@swamp/factory/factory\`.

**Not migrated.** Records written under the old type names are not migrated.
The extension was never published and had no users, so factories made before
the rename are made again.

**Branches.** \`scripts/rename_to_stagecraft.ts\` did the rename and can be
re-run. A branch made before it runs main's copy on itself before rebasing:
\`git show origin/main:stagecraft/scripts/rename_to_stagecraft.ts > /tmp/r.ts\`,
then \`deno run --allow-read --allow-write --allow-run=git /tmp/r.ts\` in the
repo, then \`deno task build:studio\` and \`deno task fmt\` in \`stagecraft/\`;
commit, and rebase. The lifecycle -> factory codemod from #2785 is removed; its
work is done.

`;

/** DESIGN.md: the decision-log entry, added once. */
export function addDecision(text: string): string {
  if (text.includes(DECISION_HEADING)) return text;
  return text.replace(/(## Decision log\n\n)/, `$1${DECISION}`);
}

export type Hits = Map<string, number>;

function apply(text: string, rules: Rule[], hits?: Hits): string {
  let out = text;
  for (const rule of rules) {
    const count = out.match(rule.from)?.length ?? 0;
    if (count === 0) continue;
    if (hits !== undefined) {
      const key = String(rule.from);
      hits.set(key, (hits.get(key) ?? 0) + count);
    }
    out = typeof rule.to === "string"
      ? out.replace(rule.from, rule.to)
      : out.replace(
        rule.from,
        rule.to as (m: string, ...g: string[]) => string,
      );
  }
  return out;
}

/** Rename a path, e.g. gatorwalk-factory/README.md -> stagecraft/README.md. */
export function renamePath(path: string): string {
  return apply(path, PATH_RULES);
}

const WIDTH = 80;

/** The whole rename of one file's text. Idempotent. */
export function transform(path: string, text: string, hits?: Hits): string {
  let out = apply(text, SPECIAL_RULES, hits);
  if (path.endsWith("/DESIGN.md")) out = addDecision(out);
  // Only a line the name made too long is re-wrapped: a bare old name is one
  // letter shorter than stagecraft. Lines that were already long, like a
  // shell command in YAML, stay as they were.
  const kept = new Set<string>();
  out = out.split("\n").map((line) => {
    const renamed = apply(line, NAME_RULES, hits);
    if (line.length > WIDTH || renamed.length <= WIDTH) kept.add(renamed);
    return renamed;
  }).join("\n");
  return reflow(path, out, kept);
}

/**
 * The prefix a wrapped line keeps: indentation, a comment marker, and for a
 * list item the hanging indent under its text. null for a line that is not
 * prose (code, a table row, a heading, a blank line).
 */
function prosePrefix(
  path: string,
  line: string,
): { first: string; rest: string } | null {
  if (/\.tsx?$/.test(path)) {
    const doc = /^(\s*)\/\*\* (?=\S)/.exec(line);
    if (doc !== null) return { first: `${doc[1]}/** `, rest: `${doc[1]} * ` };
  }
  const m = /\.tsx?$/.test(path)
    ? /^(\s*(?:\/\/|\*)\s+)(?=\S)/.exec(line)
    : path.endsWith(".md")
    ? /^(\s*(?:> )?)(?=[^\s|#<])(?!```)/.exec(line)
    : /^(\s*(?:#\s+)?)(?=\S)/.exec(line);
  if (m === null) return null;
  const list = /^([-*] |\d+\. )/.exec(line.slice(m[1].length));
  return list === null
    ? { first: m[1], rest: m[1] }
    : { first: m[1], rest: m[1] + " ".repeat(list[1].length) };
}

/** Words, keeping a `code span` whole. */
function words(text: string): string[] {
  return text.match(/(?:`[^`]*`|\S)+/g) ?? [];
}

/**
 * Re-wrap, at 80 columns, each prose paragraph with a line that is too long
 * and not in `kept`. Code lines are left to deno fmt.
 */
export function reflow(path: string, text: string, kept: Set<string>): string {
  const lines = text.split("\n");
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) fence = !fence;
    if (
      fence || /\.tsx?$/.test(path) && !/^\s*(\/\/|\*|\/\*\*)/.test(lines[i])
    ) {
      continue;
    }
    if (lines[i].length <= WIDTH || kept.has(lines[i])) continue;
    const prefix = prosePrefix(path, lines[i]);
    if (prefix === null) continue;
    // The paragraph: this line and the continuation lines after it.
    let end = i + 1;
    while (end < lines.length) {
      const next = lines[end];
      if (!next.startsWith(prefix.rest) || /^\s*```/.test(next)) break;
      const body = next.slice(prefix.rest.length);
      if (body === "" || /^\s/.test(body) || /^([-*] |\d+\. )/.test(body)) {
        break;
      }
      end++;
    }
    const head = lines[i].slice(0, prefix.first.length);
    const all = [
      ...words(lines[i].slice(prefix.first.length)),
      ...lines.slice(i + 1, end).flatMap((l) =>
        words(l.slice(prefix.rest.length))
      ),
    ];
    const out: string[] = [];
    let cur = head;
    let lead = head;
    for (const w of all) {
      if (cur !== lead && (cur + " " + w).length > WIDTH) {
        out.push(cur);
        cur = prefix.rest + w;
        lead = prefix.rest;
      } else {
        cur = cur === lead ? cur + w : cur + " " + w;
      }
    }
    out.push(cur);
    lines.splice(i, end - i, ...out);
    i += out.length - 1;
  }
  return lines.join("\n");
}

/** The lines of `text` that still carry the old name. */
export function leftovers(text: string): number[] {
  const lines: number[] = [];
  text.split("\n").forEach((line, i) => {
    if (/gatorwalk/i.test(line)) lines.push(i + 1);
  });
  return lines;
}

// --- the command --------------------------------------------------------------

const OLD = "gatorwalk-factory";
const NEW = "stagecraft";
/** This codemod and its test name the old name on purpose. */
const SELF = /\/scripts\/rename_to_stagecraft(_test)?\.ts$/;
/** Made by deno task build:studio, not edited: a bundle and base64 fonts. */
export const GENERATED =
  /\/extensions\/models\/_lib\/engine\/studio_asset(s|_app|_fonts)\.ts$/;
/** The lifecycle -> factory codemod (#2785), whose work is done. */
const RETIRED = /\/scripts\/rename_lifecycle_to_factory(_test)?\.ts$/;
const EXTRA = [
  "verification/checks.yaml",
  "verification/workflow-verify.yaml",
  "verification/workflow-verify-reviews.yaml",
];
const TEXT = /\.(ts|tsx|md|ya?ml|json|html|css)$/;

async function git(root: string, ...args: string[]): Promise<string> {
  const out = await new Deno.Command("git", { args, cwd: root }).output();
  if (!out.success) {
    throw new Error(
      `git ${args.join(" ")}: ${new TextDecoder().decode(out.stderr)}`,
    );
  }
  return new TextDecoder().decode(out.stdout);
}

async function lsFiles(root: string, ...paths: string[]): Promise<string[]> {
  return (await git(root, "ls-files", "--", ...paths)).split("\n").filter((
    f,
  ) => f !== "");
}

/** The files the text rename covers. */
async function covered(root: string): Promise<string[]> {
  const files = (await lsFiles(root, OLD, NEW)).filter((f) =>
    TEXT.test(f) && !SELF.test(f) && !GENERATED.test(f) && !RETIRED.test(f)
  );
  return [...files, ...EXTRA];
}

async function main(args: string[]): Promise<number> {
  const check = args.includes("--check");
  const root = (await git(Deno.cwd(), "rev-parse", "--show-toplevel")).trim() +
    "/";
  let problems = 0;

  if (check) {
    for (const f of await lsFiles(root, OLD)) {
      console.log(`${f}: still under ${OLD}/`);
      problems++;
    }
    for (const f of (await lsFiles(root, NEW)).filter((f) => RETIRED.test(f))) {
      console.log(`${f}: the retired codemod is still here`);
      problems++;
    }
  } else {
    const retired = (await lsFiles(root, OLD, NEW)).filter((f) =>
      RETIRED.test(f)
    );
    if (retired.length > 0) await git(root, "rm", "-q", "--", ...retired);
    for (const file of await lsFiles(root, OLD)) {
      const to = renamePath(file);
      await Deno.mkdir(`${root}${to.slice(0, to.lastIndexOf("/"))}`, {
        recursive: true,
      });
      await git(root, "mv", file, to);
    }
  }

  const hits: Hits = new Map();
  let changed = 0;
  for (const file of await covered(root)) {
    const text = await Deno.readTextFile(`${root}${file}`);
    if (check) {
      for (const line of leftovers(text)) {
        console.log(`${file}:${line}: the old name is left`);
        problems++;
      }
      continue;
    }
    const out = transform(file, text, hits);
    if (out !== text) {
      await Deno.writeTextFile(`${root}${file}`, out);
      changed++;
    }
  }

  if (!check) {
    console.log(`rewrote ${changed} file(s)`);
    // On a tree already renamed every rule matches nothing; on one with work
    // to do, a special rule that matched nothing may be stale after rewording.
    if (changed > 0) {
      for (const rule of SPECIAL_RULES) {
        if (!hits.has(String(rule.from))) {
          console.log(`note: special rule matched nothing: ${rule.from}`);
        }
      }
    }
    console.log(
      `next, in ${NEW}/: deno task build:studio && deno task fmt`,
    );
  }
  return problems === 0 ? 0 : 1;
}

if (import.meta.main) {
  Deno.exit(await main(Deno.args));
}
