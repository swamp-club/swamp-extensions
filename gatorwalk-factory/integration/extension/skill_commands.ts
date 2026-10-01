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
import { model as factoryModel } from "../../extensions/models/engine/factory.ts";
import { model as linearModel } from "../../extensions/models/tracker/linear.ts";
import { model as swampClubModel } from "../../extensions/models/tracker/swamp_club.ts";
import { model as builtinTrackerModel } from "../../extensions/models/tracker/builtin.ts";
import { model as workItemModel } from "../../extensions/models/engine/work_item.ts";
import {
  TRACKER_KINDS,
  type TrackerKind,
} from "../../extensions/models/_lib/engine/tracker_binding.ts";
import {
  FACTORY_TYPE,
  WORK_ITEM_TYPE,
} from "../../extensions/models/_lib/engine/work_item_ops.ts";

import { splitWords } from "../harness.ts";

const BUILTIN_TRACKER_TYPE = builtinTrackerModel.type;
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
//
// A ```json result block is not a command: it is a subagent's result file,
// shown in the worked example where a subagent would write it. Running the
// example writes it to <result-path>, the latest dispatch's result file.
// ---------------------------------------------------------------------------

export const SKILL_DIR = fromFileUrl(
  new URL("../../.claude/skills/gatorwalk-factory/", import.meta.url),
);

export interface SkillCommand {
  file: string;
  line: number;
  words: string[];
  /** Why the command is meant to fail, when it is. */
  fails?: string;
  /** For a ```json result block: the file's contents. words is empty. */
  result?: string;
}

/** Every swamp command in one markdown file, in order. */
export function commandsIn(file: string, markdown: string): SkillCommand[] {
  const out: SkillCommand[] = [];
  const lines = markdown.split("\n");
  let inSh = false;
  let fence = "";
  let fails: string | undefined;
  let result: { line: number; lines: string[] } | undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // CommonMark fences: up to three spaces of indent, so a block under a
    // list item is read too; a fence closes only on a bare fence of the same
    // character, at least as long.
    const open = line.match(/^ {0,3}(```+|~~~+)\s*(\S*)\s*(.*)$/);
    if (fence === "" && open !== null) {
      fence = open[1];
      inSh = open[2] === "sh";
      if (open[2] === "json" && open[3].trim() === "result") {
        result = { line: i + 1, lines: [] };
      }
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
      if (result !== undefined) {
        out.push({
          file,
          line: result.line,
          words: [],
          result: result.lines.join("\n") + "\n",
        });
        result = undefined;
      }
      continue;
    }
    if (result !== undefined) {
      result.lines.push(line);
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
  "<factory>": "team",
  "<starter>": "starter",
  "<ticket>": "ABC-1",
  "<cycle>": "1",
  "<dispatch-id>": "1",
  "<tokens>": "1000",
  "<tool-uses>": "4",
  "<duration-ms>": "90000",
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

/** Each tracker adapter's methods, by kind. */
export type TrackerMethods = Readonly<
  Record<TrackerKind, Readonly<Record<string, MethodLike>>>
>;

/** The tracker adapter models the skill's commands are checked against. */
export const TRACKER_MODELS: TrackerMethods = {
  "builtin": builtinTrackerModel.methods as Record<string, MethodLike>,
  "swamp-club": swampClubModel.methods as Record<string, MethodLike>,
  "linear": linearModel.methods as Record<string, MethodLike>,
};

/**
 * The placeholder a skill command uses for one adapter's instance, named as
 * the README names that instance. The swamp-club Lab tracker has none: it is
 * the swamp-club team's own, so the skill never shows a command for it, and
 * a command on <lab> is refused as it always was. A worked example that uses
 * one of these must give runExample a value for it.
 */
export const TRACKER_PLACEHOLDERS: Readonly<
  Record<TrackerKind, string | null>
> = {
  "builtin": "<board>",
  "swamp-club": null,
  "linear": "<linear>",
};

/** How a refusal names a tracker: its placeholder, or its kind. */
function trackerName(kind: TrackerKind): string {
  return TRACKER_PLACEHOLDERS[kind] ?? kind;
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
export function checkCommand(
  words: string[],
  trackers: TrackerMethods = TRACKER_MODELS,
): string | null {
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
  // adapter, so the method must be one every tracker has, with inputs every
  // tracker accepts. An adapter's own placeholder (TRACKER_PLACEHOLDERS)
  // stands for that adapter alone.
  const placeholder = args[3];
  const kinds = placeholder === "<tracker>"
    ? TRACKER_KINDS
    : TRACKER_KINDS.filter((k) => TRACKER_PLACEHOLDERS[k] === placeholder);
  if (is("model", "method", "run") && kinds.length > 0) {
    const [name, ...rest] = args.slice(4);
    const lacking = kinds.filter((k) => !Object.hasOwn(trackers[k], name));
    if (lacking.length > 0) {
      return placeholder === "<tracker>"
        ? `no method '${name}' that every tracker has: ` +
          `${lacking.map(trackerName).join(" and ")} lack it`
        : `no ${placeholder} method '${name}'`;
    }
    for (const k of kinds) {
      const problem = checkInputs(trackers[k][name], rest, ["--log"]);
      if (problem !== null) {
        return kinds.length > 1 ? `${trackerName(k)}: ${problem}` : problem;
      }
    }
    return null;
  }
  // Factory methods, by instance name.
  if (is("model", "method", "run")) {
    const [_factory, name, ...rest] = args.slice(3);
    const method = (factoryModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined) return `no factory method '${name}'`;
    return checkInputs(method, rest, ["--log"]);
  }
  if (is("model", "create")) {
    if (args[2] === FACTORY_TYPE) {
      return args.length === 9 && args[4] === "--global-arg" &&
          /^definition=[^/].*\.ya?ml$/.test(args[5]) &&
          args[6] === "--global-arg" && /^tracker=\S+$/.test(args[7]) &&
          args[8] === "--json"
        ? null
        : `model create must be: model create ${FACTORY_TYPE} <name> ` +
          "--global-arg definition=<path>.yaml --global-arg tracker=<tracker> " +
          "--json";
    }
    // The built-in tracker needs its prefix; Linear is set up in the model
    // file create prints.
    if (args[2] === BUILTIN_TRACKER_TYPE) {
      return args.length === 7 && args[4] === "--global-arg" &&
          /^prefix=\S+$/.test(args[5]) && args[6] === "--json"
        ? null
        : `model create must be: model create ${BUILTIN_TRACKER_TYPE} ` +
          "<name> --global-arg prefix=<prefix> --json";
    }
    if (args[2] === linearModel.type) {
      return args.length === 5 && args[4] === "--json"
        ? null
        : `model create must be: model create ${args[2]} <name> --json`;
    }
    return `no model type the skill creates: ${args[2]}`;
  }
  if (is("model", "search")) {
    return args.length === 4 && args[3] === "--json"
      ? null
      : "model search takes a query and --json";
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
 * <gatorwalk-factory> with the extension's directory. The example's own `init`
 * writes the factory definition file. A command runs with allowFailure only
 * when it is marked `# fails:`; a marked command that succeeds is an error.
 */
export async function runExample(
  repo: RepoLike,
  commands: SkillCommand[],
  context: {
    extensionRoot: string;
    /** Fixed values for the placeholders the commands name, by placeholder. */
    values?: Record<string, string>;
  },
  onStep: (step: ExampleStep) => void = () => {},
): Promise<ExampleStep[]> {
  const values: Record<string, string> = {
    ...context.values,
    "<gatorwalk-factory>": context.extensionRoot,
  };
  // Result files go to a fresh directory, named in the example as
  // <result-dir>, removed when the run ends.
  values["<result-dir>"] = await Deno.makeTempDir({ prefix: "gw-results-" });
  try {
    return await runCommands(repo, commands, values, onStep);
  } finally {
    await Deno.remove(values["<result-dir>"], { recursive: true });
  }
}

async function runCommands(
  repo: RepoLike,
  commands: SkillCommand[],
  values: Record<string, string>,
  onStep: (step: ExampleStep) => void,
): Promise<ExampleStep[]> {
  const steps: ExampleStep[] = [];
  for (const command of commands) {
    if (command.result !== undefined) {
      // Standing in for the subagent: write its result file.
      const path = values["<result-path>"];
      if (path === undefined) {
        throw new Error(
          `${command.file}:${command.line}: a result block before any dispatch named a result file`,
        );
      }
      await Deno.writeTextFile(path, command.result);
      continue;
    }
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

    // The key new_key recorded on the factory (`model method run <factory>
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
    // The result file the latest dispatch named for its first subagent's
    // first product, read from the dispatch record rather than the log.
    if (
      result.code === 0 && ran[0] === "model" && ran[1] === WORK_ITEM_TYPE &&
      ran[4] === "dispatch"
    ) {
      const read = await repo.swamp(["data", "get", ran[5], "run", "--json"]);
      const dispatches = (JSON.parse(read.stdout) as {
        content?: {
          dispatches?: {
            subagentPrompts?: { resultPaths: Record<string, string> }[];
          }[];
        };
      }).content?.dispatches ?? [];
      const paths = dispatches.at(-1)?.subagentPrompts?.[0]?.resultPaths;
      const path = paths === undefined ? undefined : Object.values(paths)[0];
      if (path !== undefined) values["<result-path>"] = path;
    }
    // The latest era status printed: a reset starts a new one.
    const era = result.output.match(/--input expectedEra=([0-9a-f-]+)/);
    if (era !== null) values["<era>"] = era[1];
  }
  return steps;
}
