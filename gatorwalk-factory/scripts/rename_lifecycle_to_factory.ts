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

// The lifecycle -> factory rename (swamp-club #2785), as a codemod that can be
// re-run on a newer main so work in flight can rebase onto it.
//
// The vocabulary it moves to:
// - a factory is the named model (type @swamp/gatorwalk-factory/factory);
// - its factory definition is the YAML document in its globalArguments
//   ("definition" in code);
// - "holder" is gone: the holder is the factory.
//
// "lifecycle" meant either the model or the document, so the order matters:
// paths first, then the protected terms are masked, then the phrases that
// mean the model, then holder, then what is left is the document.
//
//   deno run --allow-read --allow-write --allow-run=git \
//     scripts/rename_lifecycle_to_factory.ts [--check]
//
// --check rewrites nothing. It fails when a lifecycle or holder is left
// outside the protected terms, or when a swamp-club contract that must keep
// the word is missing.

type Replacer = string | ((match: string, ...groups: string[]) => string);

interface Rule {
  from: RegExp;
  to: Replacer;
}

/** Keep the case of the first letter of `match` on `word`. */
function caseLike(match: string, word: string): string {
  if (match === match.toUpperCase() && /[A-Z]/.test(match)) {
    return word.toUpperCase();
  }
  return /^[A-Z]/.test(match) ? word[0].toUpperCase() + word.slice(1) : word;
}

/**
 * File and directory names, applied to paths and to text before anything is
 * masked. Each follows a git mv target; the lookbehind keeps issue_lifecycle.ts
 * and issue-lifecycle's paths out.
 */
export const PATH_RULES: Rule[] = [
  { from: /(?<![\w-])lifecycles\//g, to: "factories/" },
  { from: /(?<![\w-])lifecycle_schema(?=[_.]|\b)/g, to: "definition_schema" },
  { from: /(?<![\w-])lifecycles_test(?=\.ts|\b)/g, to: "factories_test" },
  { from: /(?<![\w-])lifecycle_test(?=\.ts|\b)/g, to: "factory_test" },
  { from: /(?<![\w-])lifecycle\.ts\b/g, to: "factory.ts" },
];

/**
 * Terms that keep the word: the @swamp/issue-lifecycle extension, and
 * swamp-club's lifecycle entries and the API route they are posted to. A
 * wrapped "lifecycle entry" may have a comment marker between the words.
 */
export const PROTECTED: RegExp[] = [
  /issue[-_]lifecycle/gi,
  /IssueLifecycle/g,
  /LifecycleEntr(?:y|ies)\w*/g,
  /lifecycleEntries/g,
  /lifecycle_entry/g,
  /lifecycle(?:[ \t\n-]|\/\/|\*|#)+entr(?:y|ies)/gi,
  /(?<!gatorwalk-factory)\\?\/lifecycle(?![\w.])/g,
  /lifecycle route/g,
  /placeholder/gi,
];

const VOCABULARY = `## Vocabulary

- **factory**: a model of type \`@swamp/gatorwalk-factory/factory\`, created
  once and named, for example \`team\`. You run \`validate\`, \`design_page\` and
  \`new_key\` on it, and start work items on it.
- **factory definition**: the YAML document a factory keeps as its
  \`globalArguments\`: stages, work, transitions and gates. \`validate\` checks
  it, and a work item pins a copy of it when it starts. In code and data it is
  \`definition\`.
- **work item**: one piece of work moving through a factory, a model of type
  \`@swamp/gatorwalk-factory/work-item\` named by a key from \`new_key\`.
`;

/**
 * Where "lifecycle" means the model, it becomes factory; these run before
 * the document rule. Each is counted, so a phrase that stops matching can be
 * seen.
 */
export const MODEL_RULES: Rule[] = [
  {
    from: /@swamp\/gatorwalk-factory\/lifecycle\b/g,
    to: "@swamp/gatorwalk-factory/factory",
  },
  // "lifecycle holder", wrapped or not.
  {
    from: /\b(lifecycle|Lifecycle)(?:[ \t\n]|\/\/|\*|#)+holder(s?)\b/g,
    to: (_m, word, plural) =>
      caseLike(word, plural === "s" ? "factories" : "factory"),
  },
  { from: /\blifecycle-holder\b/g, to: "factory" },
  // The argument that names a factory, on start and claim.
  { from: /\blifecycle=/g, to: "factory=" },
  { from: /\b(args|req)\.lifecycle\b/g, to: "$1.factory" },
  {
    from:
      /\blifecycle(\??): (?=string\b|z\.string|["'`]|(?:args|req)\.(?:lifecycle|factory)\b|holder\b)/g,
    to: "factory$1: ",
  },
  { from: /\bfor this lifecycle\b/g, to: "for this factory" },
  // The claim argument, named in the docs.
  {
    from: /`lifecycle`(?= is (?:only needed|needed only) when a new key)/g,
    to: "`factory`",
  },
  { from: /optional `lifecycle`/g, to: "optional `factory`" },
  { from: /\bOnce per lifecycle,/g, to: "Once per factory," },
  // DESIGN.md's #2767 note means the removed top-level examples directory;
  // the path rule has already made it factories/, which never existed.
  {
    from: /`factories\/` is gone too/g,
    to: "The top-level directory of examples is gone too",
  },
  // README.md: the terms, defined once. Inserting it moves the heading it
  // matches on, so a re-run finds nothing.
  {
    from: /(its public name is chosen at go-live\.\n)(\n## Not published)/g,
    to: "$1\n" + VOCABULARY + "$2",
  },
  // Test helpers: stopsDefinition() and entriesDefinition() already return the
  // raw document, so the parsed ones say so.
  {
    from: /\b(stops|entries)Lifecycle\b/g,
    to: "$1ParsedDefinition",
  },
  // integration/harness.ts: its local `definition` is swamp's model definition.
  {
    from: /(writeHolder = async \(name: string, )lifecycle(?=: unknown\))/g,
    to: "$1factoryDefinition",
  },
  {
    from: /\.globalArguments = lifecycle;/g,
    to: ".globalArguments = factoryDefinition;",
  },
  { from: /\ba gatorwalk-factory lifecycle\b/g, to: "a gatorwalk factory" },
  // The skill's description already said "factory definitions" for
  // software-factory's; in the new vocabulary that names gatorwalk's own.
  {
    from: /@swamp\/software-factory runs, factory definitions, or/g,
    to: "@swamp/software-factory runs or definitions, or",
  },
];

/** The holder is the factory. */
// Not inside a word: "stakeholder" is not a holder.
export const HOLDER_RULES: Rule[] = [
  { from: /(?<![a-z])holders/g, to: "factories" },
  { from: /Holders/g, to: "Factories" },
  { from: /(?<![A-Z])HOLDERS/g, to: "FACTORIES" },
  { from: /(?<![a-z])holder/g, to: "factory" },
  { from: /Holder/g, to: "Factory" },
  { from: /(?<![A-Z])HOLDER/g, to: "FACTORY" },
];

/** The document, in code: definition. The bare type is FactoryDefinition. */
export const CODE_RULES: Rule[] = [
  { from: /LIFECYCLES/g, to: "DEFINITIONS" },
  { from: /LIFECYCLE/g, to: "DEFINITION" },
  { from: /\bLifecycle\b/g, to: "FactoryDefinition" },
  { from: /Lifecycles/g, to: "Definitions" },
  { from: /Lifecycle/g, to: "Definition" },
  { from: /lifecycles/g, to: "definitions" },
  { from: /lifecycle/g, to: "definition" },
];

/** The document, in prose: factory definition. */
export const PROSE_RULES: Rule[] = [
  { from: /\bLifecycles\b/g, to: "Factory definitions" },
  { from: /\bLifecycle\b/g, to: "Factory definition" },
  { from: /\blifecycles\b/g, to: "factory definitions" },
  { from: /\blifecycle\b/g, to: "factory definition" },
];

/** Wording the rules above leave awkward. */
export const CLEANUP_RULES: Rule[] = [
  // "the factory's current factory definition" says factory twice.
  {
    from: /\b([Ff])actory's ((?:\w+ )?)factory definition/g,
    to: "$1actory's $2definition",
  },
];

/**
 * Strings that must survive verbatim: swamp-club's contract. Files are found
 * by name, so a re-run after code moves still checks them.
 */
export const CONTRACTS: { file: string; text: string }[] = [
  { file: "swamp_club.ts", text: "/api/v1/lab/issues/${issue}/lifecycle`" },
  { file: "swamp_club_fake.ts", text: "\\/lifecycle)?$/" },
  { file: "tracker_methods.ts", text: '"lifecycle_entry"' },
];

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

/** Rename a path, e.g. testdata/lifecycles/x.yaml -> testdata/factories/x.yaml. */
export function renamePath(path: string): string {
  return apply(path, PATH_RULES);
}

const MASK = /\uE000(\d+)\uE001/g;

function mask(text: string): { text: string; kept: string[] } {
  const kept: string[] = [];
  let out = text;
  for (const re of PROTECTED) {
    out = out.replace(re, (m) => {
      kept.push(m);
      return `\uE000${kept.length - 1}\uE001`;
    });
  }
  return { text: out, kept };
}

function unmask(text: string, kept: string[]): string {
  return text.replace(MASK, (_m, i: string) => kept[Number(i)]);
}

type Kind = "code" | "prose";

/**
 * Split text into code and prose. TypeScript: comment lines are prose.
 * Markdown: fenced blocks and inline code spans are code. YAML: all prose
 * (comments and descriptions); no key in these files is named lifecycle.
 */
export function segments(path: string, text: string): [Kind, string][] {
  if (path.endsWith(".ts")) {
    return text.split(/(?<=\n)/).map((line) => {
      const t = line.trimStart();
      const comment = t.startsWith("//") || t.startsWith("*") ||
        t.startsWith("/*");
      return [comment ? "prose" : "code", line];
    });
  }
  if (path.endsWith(".md")) {
    const out: [Kind, string][] = [];
    const re = /(```[\s\S]*?```|`[^`\n]*`)/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      out.push(["prose", text.slice(last, m.index)]);
      out.push(["code", m[0]]);
      last = m.index + m[0].length;
    }
    out.push(["prose", text.slice(last)]);
    return out;
  }
  if (path.endsWith(".yaml") || path.endsWith(".yml")) {
    return [["prose", text]];
  }
  return [["code", text]];
}

/** The whole rename of one file's text. Idempotent. */
export function transform(path: string, text: string, hits?: Hits): string {
  let out = apply(text, PATH_RULES, hits);
  const masked = mask(out);
  out = apply(masked.text, MODEL_RULES, hits);
  out = apply(out, HOLDER_RULES, hits);
  out = segments(path, out).map(([kind, seg]) =>
    kind === "code"
      ? apply(seg, CODE_RULES, hits)
      // A compound left in prose (parseLifecycle, lifecycle-graph-) is code.
      : apply(apply(seg, PROSE_RULES, hits), CODE_RULES, hits)
  ).join("");
  out = apply(out, CLEANUP_RULES, hits);
  out = reflow(path, unmask(out, masked.kept), text);
  return path.endsWith(".ts") ? padDividers(out, text) : out;
}

const WIDTH = 80;

/**
 * The prefix a wrapped line keeps: indentation, a comment marker, and for a
 * list item the hanging indent under its text. null for a line that is not
 * prose (code, a table row, a heading, a blank line).
 */
function prosePrefix(
  path: string,
  line: string,
): { first: string; rest: string } | null {
  if (path.endsWith(".ts")) {
    // The first line of a JSDoc block wraps onto " * " lines; a one-line
    // block closes on its last line, as the repo's multi-line ones do.
    const doc = /^(\s*)\/\*\* (?=\S)/.exec(line);
    if (doc !== null) return { first: `${doc[1]}/** `, rest: `${doc[1]} * ` };
  }
  const m = path.endsWith(".ts")
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

/** Words, keeping a `code span` or a bare ${{ }} with spaces in it whole. */
function words(text: string): string[] {
  return text.match(/(?:`[^`]*`|\$\{\{\s*\}\}|\S)+/g) ?? [];
}

const DIVIDER = /^(\s*\/\/ --- .*?) ?-*$/;

/**
 * A section divider ("// --- the pinned lifecycle -----") the rename changed
 * is padded to the width most of the file's dividers had before, so it lines
 * up again. Dividers the rename did not touch are left alone.
 */
export function padDividers(text: string, before = text): string {
  const kept = new Set(before.split("\n"));
  const lines = text.split("\n");
  const widths = new Map<number, number>();
  for (const line of before.split("\n")) {
    if (DIVIDER.test(line) && /-{3}$/.test(line)) {
      widths.set(line.length, (widths.get(line.length) ?? 0) + 1);
    }
  }
  if (widths.size === 0) return text;
  const width = [...widths].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
  return lines.map((line) => {
    const m = DIVIDER.exec(line);
    if (m === null || !/-{3}$/.test(line) || kept.has(line)) return line;
    return m[1] + " " + "-".repeat(Math.max(3, width - m[1].length - 1));
  }).join("\n");
}

/**
 * Re-wrap, at 80 columns, each paragraph the rename made too long: a
 * "factory definition" is longer than a "lifecycle". Only a long line the
 * rename changed (one not in `before`) starts a re-wrap, so long lines that
 * were already there stay as they were.
 */
export function reflow(path: string, text: string, before = text): string {
  const kept = new Set(before.split("\n"));
  const lines = text.split("\n");
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) fence = !fence;
    if (
      fence || path.endsWith(".ts") && !/^\s*(\/\/|\*|\/\*\*)/.test(lines[i]) ||
      DIVIDER.test(lines[i])
    ) {
      continue;
    }
    if (lines[i].length <= WIDTH || kept.has(lines[i])) {
      continue;
    }
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

/** Every lifecycle or holder left outside the protected terms, by line. */
export function leftovers(text: string): number[] {
  const masked = mask(text).text;
  const lines: number[] = [];
  masked.split("\n").forEach((line, i) => {
    if (
      /lifecycle|(?<![a-z])holder|Holder|(?<![A-Z])HOLDER/i.test(line) &&
      /[Ll]ifecycle|LIFECYCLE|(?<![a-z])holder|Holder|(?<![A-Z])HOLDER/.test(
        line,
      )
    ) {
      lines.push(i + 1);
    }
  });
  return lines;
}

// --- the command --------------------------------------------------------------

const SELF = [
  "gatorwalk-factory/scripts/rename_lifecycle_to_factory.ts",
  "gatorwalk-factory/scripts/rename_lifecycle_to_factory_test.ts",
];
const EXTRA = ["verification/workflow-verify.yaml"];
const TEXT = /\.(ts|md|ya?ml|json)$/;

async function git(root: string, ...args: string[]): Promise<string> {
  const out = await new Deno.Command("git", { args, cwd: root }).output();
  if (!out.success) {
    throw new Error(
      `git ${args.join(" ")}: ${new TextDecoder().decode(out.stderr)}`,
    );
  }
  return new TextDecoder().decode(out.stdout);
}

async function tracked(root: string): Promise<string[]> {
  const files = (await git(root, "ls-files", "gatorwalk-factory"))
    .split("\n").filter((f) =>
      f !== "" && TEXT.test(f) && !SELF.includes(f) &&
      !f.endsWith("deno.lock") &&
      !f.startsWith("gatorwalk-factory/testdata/auth/")
    );
  return [...files, ...EXTRA];
}

async function main(args: string[]): Promise<number> {
  const check = args.includes("--check");
  const root = new URL("../../", import.meta.url).pathname;

  if (!check) {
    for (const file of await tracked(root)) {
      const to = renamePath(file);
      if (to !== file) {
        await Deno.mkdir(`${root}${to.slice(0, to.lastIndexOf("/"))}`, {
          recursive: true,
        });
        await git(root, "mv", file, to);
      }
    }
  }

  const hits: Hits = new Map();
  let problems = 0;
  let changed = 0;
  for (const file of await tracked(root)) {
    const text = await Deno.readTextFile(`${root}${file}`);
    if (check) {
      for (const line of leftovers(text)) {
        console.log(`${file}:${line}: lifecycle or holder left`);
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

  const files = await tracked(root);
  for (const c of CONTRACTS) {
    const found = files.filter((f) => f.endsWith(`/${c.file}`));
    let kept = false;
    for (const f of found) {
      if ((await Deno.readTextFile(`${root}${f}`)).includes(c.text)) {
        kept = true;
      }
    }
    if (!kept) {
      console.log(`${c.file}: swamp-club contract missing: ${c.text}`);
      problems++;
    }
  }

  // On a tree already renamed every rule matches nothing; on one with work
  // to do, a rule that matched nothing may be stale after rewording.
  if (!check && changed > 0) {
    for (const rule of MODEL_RULES) {
      if (!hits.has(String(rule.from))) {
        console.log(`note: model rule matched nothing: ${rule.from}`);
      }
    }
  }
  return problems === 0 ? 0 : 1;
}

if (import.meta.main) {
  Deno.exit(await main(Deno.args));
}
