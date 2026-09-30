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

import { fromFileUrl } from "@std/path";
import { model as holderModel } from "../extensions/models/lifecycle.ts";
import { model as linearModel } from "../extensions/models/linear.ts";
import { model as swampClubModel } from "../extensions/models/swamp_club.ts";
import { model as workItemModel } from "../extensions/models/work_item.ts";
import {
  HOLDER_TYPE,
  WORK_ITEM_TYPE,
} from "../extensions/models/_lib/work_item_ops.ts";

// ---------------------------------------------------------------------------
// The swamp commands the gatorwalk-factory skill shows, pulled out of its
// markdown so a test can check and run them as written.
//
// A command is a line in a ```sh block that starts with `swamp`, continued
// with a trailing backslash. A `# fails: <why>` comment marks the next
// command as one that is meant to fail. Placeholders are <name> in angle
// brackets. Commands are split into words the way a POSIX shell would for
// the forms the skill uses (bare words, single and double quotes); anything
// that needs a real shell ($, backticks, pipes, redirects) is refused, which
// keeps every command copy-paste safe.
// ---------------------------------------------------------------------------

export const SKILL_DIR = fromFileUrl(
  new URL("../.claude/skills/gatorwalk-factory/", import.meta.url),
);

export interface SkillCommand {
  file: string;
  line: number;
  words: string[];
  /** Why the command is meant to fail, when it is. */
  fails?: string;
}

const PLACEHOLDER = /^<[a-z][a-z0-9-]*>/;

/** Split one command into words; throws on shell syntax the skill must not use. */
export function splitWords(text: string): string[] {
  const words: string[] = [];
  let word: string | null = null;
  let i = 0;
  const append = (s: string) => {
    word = (word ?? "") + s;
  };
  while (i < text.length) {
    const c = text[i];
    if (c === " " || c === "\t" || c === "\n") {
      if (word !== null) words.push(word);
      word = null;
      i++;
    } else if (c === "'") {
      const end = text.indexOf("'", i + 1);
      if (end < 0) throw new Error("unterminated single quote");
      append(text.slice(i + 1, end));
      i = end + 1;
    } else if (c === '"') {
      let j = i + 1;
      let s = "";
      while (j < text.length && text[j] !== '"') {
        if (text[j] === "$" || text[j] === "`") {
          throw new Error(`'${text[j]}' inside double quotes needs a shell`);
        }
        if (text[j] === "\\" && '"\\'.includes(text[j + 1] ?? "")) j++;
        s += text[j];
        j++;
      }
      if (j >= text.length) throw new Error("unterminated double quote");
      append(s);
      i = j + 1;
    } else if (c === "<" && PLACEHOLDER.test(text.slice(i))) {
      const m = text.slice(i).match(PLACEHOLDER)!;
      append(m[0]);
      i += m[0].length;
    } else if ("$`|&;<>()\\*?".includes(c)) {
      throw new Error(`'${c}' needs a shell; the skill's commands must not`);
    } else {
      append(c);
      i++;
    }
  }
  if (word !== null) words.push(word);
  return words;
}

/** Every swamp command in one markdown file, in order. */
export function commandsIn(file: string, markdown: string): SkillCommand[] {
  const out: SkillCommand[] = [];
  const lines = markdown.split("\n");
  let inSh = false;
  let fence = "";
  let fails: string | undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // CommonMark fences: up to three spaces of indent, so a block under a
    // list item is read too; a fence closes only on a bare fence of the same
    // character, at least as long.
    const open = line.match(/^ {0,3}(```+|~~~+)\s*(\S*)/);
    if (fence === "" && open !== null) {
      fence = open[1];
      inSh = open[2] === "sh";
      continue;
    }
    const close = line.match(/^ {0,3}(```+|~~~+)\s*$/);
    if (
      fence !== "" && close !== null && close[1][0] === fence[0] &&
      close[1].length >= fence.length
    ) {
      fence = "";
      inSh = false;
      fails = undefined;
      continue;
    }
    if (!inSh) continue;
    const trimmed = line.trim();
    const failing = trimmed.match(/^# fails: (.+)$/);
    if (failing !== null) {
      fails = failing[1];
      continue;
    }
    if (!trimmed.startsWith("swamp ")) continue;
    const start = i;
    let text = trimmed;
    while (text.endsWith("\\")) {
      text = text.slice(0, -1) + " " + (lines[++i] ?? "").trim();
    }
    let words: string[];
    try {
      words = splitWords(text);
    } catch (error) {
      throw new Error(
        `${file}:${start + 1}: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
    out.push({ file, line: start + 1, words, ...(fails ? { fails } : {}) });
    fails = undefined;
  }
  return out;
}

/** Every markdown file of the skill, relative to SKILL_DIR, sorted. */
export async function skillFiles(): Promise<string[]> {
  const found: string[] = [];
  const walk = async (dir: string, prefix: string) => {
    for await (const entry of Deno.readDir(dir)) {
      const rel = prefix + entry.name;
      if (entry.isDirectory) await walk(`${dir}/${entry.name}`, `${rel}/`);
      else if (entry.name.endsWith(".md")) found.push(rel);
    }
  };
  await walk(SKILL_DIR, "");
  return found.sort();
}

/** Every swamp command in the skill. */
export async function skillCommands(): Promise<SkillCommand[]> {
  const out: SkillCommand[] = [];
  for (const file of await skillFiles()) {
    out.push(
      ...commandsIn(file, await Deno.readTextFile(`${SKILL_DIR}/${file}`)),
    );
  }
  return out;
}

// Values that stand in for placeholders when a command's inputs are checked
// against its method's schema.
const SAMPLE: Record<string, string> = {
  "<key>": "build-swamp-extension-add-list-method-abcd",
  "<era>": "00000000-0000-0000-0000-000000000000",
  "<holder>": "team",
  "<ticket>": "ABC-1",
  "<cycle>": "1",
  "<dispatch-id>": "1",
  "<tokens>": "1000",
};

function sample(word: string): string {
  return word.replace(/<[a-z][a-z0-9-]*>/g, (p) => SAMPLE[p] ?? "x");
}

interface MethodLike {
  arguments: {
    shape: Record<string, unknown>;
    safeParse(v: unknown): { success: boolean; error?: unknown };
  };
}

function checkInputs(
  method: MethodLike,
  rest: string[],
  allowed: string[],
): string | null {
  const inputs: Record<string, string> = {};
  let fromFile = false;
  for (let i = 0; i < rest.length; i++) {
    const w = rest[i];
    if (w === "--input-file") {
      // The file's contents are not in the skill; only its use is checked.
      if (rest[++i] === undefined) return "--input-file needs a path";
      fromFile = true;
    } else if (w === "--input") {
      const kv = rest[++i];
      const eq = kv?.indexOf("=") ?? -1;
      if (eq < 1) return `--input needs key=value, got '${kv}'`;
      // An object schema drops unknown keys, so check the names first.
      if (!(kv.slice(0, eq) in method.arguments.shape)) {
        return `no input '${kv.slice(0, eq)}'`;
      }
      inputs[kv.slice(0, eq)] = sample(kv.slice(eq + 1));
    } else if (!allowed.includes(w)) {
      return `unexpected word '${w}'`;
    }
  }
  if (fromFile) return null;
  const parsed = method.arguments.safeParse(inputs);
  return parsed.success ? null : `inputs do not fit: ${String(parsed.error)}`;
}

/**
 * Check a command names a real method of the model it calls, with inputs
 * that fit its arguments schema, or is one of the few other commands the
 * skill shows. Returns the problem, or null.
 */
export function checkCommand(words: string[]): string | null {
  const [swamp, ...args] = words;
  if (swamp !== "swamp") return "not a swamp command";
  const is = (...prefix: string[]) => prefix.every((p, i) => args[i] === p);

  // Work-item methods, by direct type execution.
  if (is("model", WORK_ITEM_TYPE, "method", "run")) {
    const [name, _key, ...rest] = args.slice(4);
    const method = (workItemModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined) return `no work-item method '${name}'`;
    return checkInputs(method, rest, ["--log"]);
  }
  // Tracker methods, by instance name: <tracker> stands for any tracker
  // adapter, so the method must be one every tracker has.
  if (is("model", "method", "run", "<tracker>")) {
    const [name, ...rest] = args.slice(4);
    const method = (linearModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined || !(name in swampClubModel.methods)) {
      return `no method '${name}' that every tracker has`;
    }
    return checkInputs(method, rest, ["--log"]);
  }
  // Holder methods, by instance name.
  if (is("model", "method", "run")) {
    const [_holder, name, ...rest] = args.slice(3);
    const method = (holderModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined) return `no holder method '${name}'`;
    return checkInputs(method, rest, ["--log"]);
  }
  if (is("model", "create")) {
    return args[2] === HOLDER_TYPE && args.length === 5 && args[4] === "--json"
      ? null
      : `model create must be: model create ${HOLDER_TYPE} <name> --json`;
  }
  if (is("extension", "source", "add")) {
    return args.length === 4 ? null : "extension source add takes one path";
  }
  if (is("data", "get")) {
    const rest = args.slice(4);
    return args.length >= 4 && rest.every((w) => w === "--json")
      ? null
      : "data get takes an instance, a record name and --json";
  }
  return `not a command form the skill test knows: ${args.join(" ")}`;
}

/** What running one command of the example produced. */
export interface ExampleStep {
  command: SkillCommand;
  /** The words as run, placeholders filled. */
  ran: string[];
  code: number;
  output: string;
}

interface RepoLike {
  swamp(
    args: string[],
    options?: { allowFailure?: boolean },
  ): Promise<{ code: number; output: string; stdout: string }>;
}

/**
 * Run the example's commands in order, as written, filling <key> from the
 * key record new_key writes, <era> from the first expectation status prints, and
 * <gatorwalk-factory> with the extension's directory. After `model create`
 * of a holder, write `lifecycle` into the definition file it names: the file
 * edit the example describes. A command runs with allowFailure only when it
 * is marked `# fails:`; a marked command that succeeds is an error.
 */
export async function runExample(
  repo: RepoLike,
  commands: SkillCommand[],
  context: { extensionRoot: string; lifecycle: unknown },
  onStep: (step: ExampleStep) => void = () => {},
): Promise<ExampleStep[]> {
  const { parse, stringify } = await import("@std/yaml");
  const values: Record<string, string> = {
    "<gatorwalk-factory>": context.extensionRoot,
  };
  const steps: ExampleStep[] = [];
  for (const command of commands) {
    const ran = command.words.slice(1).map((w) =>
      w.replace(/<[a-z][a-z0-9-]*>/g, (p) => {
        const v = values[p];
        if (v === undefined) {
          throw new Error(
            `${command.file}:${command.line}: ${p} has no value yet`,
          );
        }
        return v;
      })
    );
    // The harness adds the extension source when it makes the repo, so the
    // example's own `extension source add` may only find it there already.
    const addsSource = ran[0] === "extension" && ran[1] === "source" &&
      ran[2] === "add";
    const result = await repo.swamp(ran, {
      allowFailure: command.fails !== undefined || addsSource,
    });
    if (
      addsSource && result.code !== 0 &&
      !result.output.includes("Extension source already exists")
    ) {
      throw new Error(`${command.file}:${command.line}: ${result.output}`);
    }
    if (command.fails !== undefined && result.code === 0) {
      throw new Error(
        `${command.file}:${command.line}: marked to fail (${command.fails}) but succeeded`,
      );
    }
    const step = { command, ran, code: result.code, output: result.output };
    steps.push(step);
    onStep(step);

    // The key new_key recorded on the holder (`model method run <holder>
    // new_key`), rather than its log line, whose format is swamp's to change.
    if (
      result.code === 0 && ran[0] === "model" && ran[1] === "method" &&
      ran[4] === "new_key"
    ) {
      const read = await repo.swamp(["data", "get", ran[3], "key", "--json"]);
      const key = (JSON.parse(read.stdout) as { content?: { key?: unknown } })
        .content?.key;
      if (typeof key !== "string") {
        throw new Error(
          `${command.file}:${command.line}: new_key recorded no key:\n${read.stdout}`,
        );
      }
      values["<key>"] = key;
    }
    // The latest era status printed: a reset starts a new one.
    const era = result.output.match(/--input expectedEra=([0-9a-f-]+)/);
    if (era !== null) values["<era>"] = era[1];
    if (ran[0] === "model" && ran[1] === "create" && ran[2] === HOLDER_TYPE) {
      const path = (JSON.parse(result.stdout) as { path: string }).path;
      const definition = parse(await Deno.readTextFile(path)) as Record<
        string,
        unknown
      >;
      definition.globalArguments = context.lifecycle;
      await Deno.writeTextFile(path, stringify(definition));
    }
  }
  return steps;
}
