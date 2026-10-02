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
import { model as studioModel } from "../../extensions/models/engine/studio.ts";
import {
  TRACKER_KINDS,
  type TrackerKind,
} from "../../extensions/models/_lib/engine/tracker_binding.ts";
import {
  FACTORY_TYPE,
  WORK_ITEM_TYPE,
} from "../../extensions/models/_lib/engine/work_item_ops.ts";

import { parseExample } from "../../extensions/models/_lib/engine/fake_swamp.ts";
import { splitWords } from "../harness.ts";

const BUILTIN_TRACKER_TYPE = builtinTrackerModel.type;
// ---------------------------------------------------------------------------
// The swamp commands the stagecraft skill shows, pulled out of its
// markdown so a test can check and run them as written.
//
// A command is a line in a ```sh block that starts with `swamp`, continued
// with a trailing backslash. A `# fails: <why>` comment marks the next
// command as one that is meant to fail, and a `# background: <why>` comment
// marks it as one that runs until stopped (the studio's serve), which the
// agent starts in the background. Placeholders are <name> in angle
// brackets. Commands are split into words the way a POSIX shell would for
// the forms the skill uses (bare words, single and double quotes); anything
// that needs a real shell ($, backticks, pipes, redirects) is refused, which
// keeps every command copy-paste safe.
//
// A ```json result block is not a command: it is a subagent's result file,
// shown in the worked example where a subagent would write it. Running the
// example writes it to <result-path>, the latest dispatch's result file.
//
// A `# agent: write <example> into <factory>` line in a ```sh block is not a
// command either: it is the agent writing one of the skill's examples into a
// factory, its definition and scenarios blocks under the factory's
// globalArguments. Running the example does that edit.
// ---------------------------------------------------------------------------

export const SKILL_DIR = fromFileUrl(
  new URL("../../.claude/skills/stagecraft/", import.meta.url),
);

export interface SkillCommand {
  file: string;
  line: number;
  words: string[];
  /** Why the command is meant to fail, when it is. */
  fails?: string;
  /** Why the command runs in the background, when it does. */
  background?: string;
  /** For a ```json result block: the file's contents. words is empty. */
  result?: string;
  /**
   * For a `# agent: write <example> into <factory>` line: the example and
   * the factory, placeholders unfilled. words is empty.
   */
  write?: { example: string; factory: string };
}

/** Every swamp command in one markdown file, in order. */
export function commandsIn(file: string, markdown: string): SkillCommand[] {
  const out: SkillCommand[] = [];
  const lines = markdown.split("\n");
  let inSh = false;
  let fence = "";
  let fails: string | undefined;
  let background: string | undefined;
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
      background = undefined;
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
    const backgrounded = trimmed.match(/^# background: (.+)$/);
    if (backgrounded !== null) {
      background = backgrounded[1];
      continue;
    }
    const write = trimmed.match(/^# agent: write (\S+) into (\S+)$/);
    if (write !== null) {
      out.push({
        file,
        line: i + 1,
        words: [],
        write: { example: write[1], factory: write[2] },
      });
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
    out.push({
      file,
      line: start + 1,
      words,
      ...(fails ? { fails } : {}),
      ...(background ? { background } : {}),
    });
    fails = undefined;
    background = undefined;
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
  "<key>": "team-add-list-method-abcd",
  "<era>": "00000000-0000-0000-0000-000000000000",
  "<factory>": "team",
  "<starter>": "starter",
  "<studio>": "studio",
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
    } else if (w === "--log") {
      // swamp prints a method's output without it; with it, twice.
      return "--log prints every method's output twice; leave it off";
    } else {
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
    return checkInputs(method, rest);
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
      const problem = checkInputs(trackers[k][name], rest);
      if (problem !== null) {
        return kinds.length > 1 ? `${trackerName(k)}: ${problem}` : problem;
      }
    }
    return null;
  }
  // Studio methods, by its placeholder.
  if (is("model", "method", "run", "<studio>")) {
    const [name, ...rest] = args.slice(4);
    const method = (studioModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined) return `no studio method '${name}'`;
    return checkInputs(method, rest);
  }
  // Factory methods, by instance name.
  if (is("model", "method", "run")) {
    const [_factory, name, ...rest] = args.slice(3);
    const method = (factoryModel.methods as Record<string, MethodLike>)[name];
    if (method === undefined) return `no factory method '${name}'`;
    return checkInputs(method, rest);
  }
  if (is("model", "create")) {
    // A factory is created with only its tracker; the agent writes its
    // definition into the model file afterwards.
    if (args[2] === FACTORY_TYPE) {
      return args.length === 7 && args[4] === "--global-arg" &&
          /^tracker=\S+$/.test(args[5]) && args[6] === "--json"
        ? null
        : `model create must be: model create ${FACTORY_TYPE} <name> ` +
          "--global-arg tracker=<tracker> --json";
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
    // The studio has no arguments.
    if (args[2] === linearModel.type || args[2] === studioModel.type) {
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
    // An earlier version of a record is read by its number.
    const rest = args.slice(4);
    const version = rest.indexOf("--version");
    if (version !== -1 && rest[version + 1] !== undefined) {
      rest.splice(version, 2);
    }
    return args.length >= 4 && rest.every((w) => w === "--json")
      ? null
      : "data get takes an instance, a record name, --json and " +
        "optionally --version";
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
  /** For a background command: the 127.0.0.1 URL it logged. */
  url?: string;
}

interface RepoLike {
  swamp(
    args: string[],
    options?: { allowFailure?: boolean },
  ): Promise<{ code: number; output: string; stdout: string }>;
  /** Start swamp without waiting for it, for a background command. */
  spawn(args: string[]): Deno.ChildProcess;
  /** Write a definition and scenarios into a factory's model definition. */
  editFactory(
    name: string,
    definition: unknown,
    scenarios?: unknown[],
  ): Promise<void>;
}

/**
 * Run the example's commands in order, as written, filling <key> from the
 * key record new_key writes, <era> from the first expectation status prints, and
 * <stagecraft> with the extension's directory. An `# agent: write`
 * line writes a skill example into a factory, as the agent would. A command
 * runs with allowFailure only
 * when it is marked `# fails:`; a marked command that succeeds is an error.
 * A `# background:` command is started without waiting, is ready once it logs
 * a 127.0.0.1 URL, and is stopped with SIGINT when the run ends. onStep runs
 * after each command, while background commands are still running.
 */
export async function runExample(
  repo: RepoLike,
  commands: SkillCommand[],
  context: {
    extensionRoot: string;
    /** Fixed values for the placeholders the commands name, by placeholder. */
    values?: Record<string, string>;
  },
  onStep: (step: ExampleStep) => void | Promise<void> = () => {},
): Promise<ExampleStep[]> {
  const values: Record<string, string> = {
    ...context.values,
    "<stagecraft>": context.extensionRoot,
  };
  // Result files go to a fresh directory, named in the example as
  // <result-dir>, removed when the run ends.
  values["<result-dir>"] = await Deno.makeTempDir({ prefix: "gw-results-" });
  const background: Background[] = [];
  try {
    return await runCommands(repo, commands, values, onStep, background);
  } finally {
    await Promise.all(background.map((b) => b.stop()));
    await Deno.remove(values["<result-dir>"], { recursive: true });
  }
}

/** A command started in the background: how to stop it. */
interface Background {
  stop(): Promise<void>;
}

/**
 * Start a background command and wait, up to a bound, for the 127.0.0.1 URL
 * it logs. A command that exits first, or logs no URL in time, is an error
 * naming its line, with what it printed.
 */
async function startBackground(
  repo: RepoLike,
  command: SkillCommand,
  ran: string[],
  started: Background[],
): Promise<{ url: string; output: string }> {
  const child = repo.spawn(ran);
  let text = "";
  // A decoder per stream, so a character split across chunks of one is
  // never joined to the other's bytes.
  const drain = (stream: ReadableStream<Uint8Array>) =>
    (async () => {
      const decoder = new TextDecoder();
      for await (const chunk of stream) {
        text += decoder.decode(chunk, { stream: true });
      }
      text += decoder.decode();
    })();
  const drained = Promise.all([drain(child.stdout), drain(child.stderr)]);
  let exited = false;
  const status = child.status.then((s) => {
    exited = true;
    return s;
  });
  const kill = (signal: Deno.Signal) => {
    try {
      child.kill(signal);
    } catch {
      // Already gone, though `exited` has not caught up yet.
    }
  };
  started.push({
    stop: async () => {
      if (!exited) {
        kill("SIGINT");
        const timer = setTimeout(() => kill("SIGKILL"), 30_000);
        await status;
        clearTimeout(timer);
      }
      await drained.catch(() => {});
    },
  });
  const where = `${command.file}:${command.line}`;
  const deadline = Date.now() + 120_000;
  for (;;) {
    const url = text.match(/http:\/\/127\.0\.0\.1:\d+\//)?.[0];
    if (url !== undefined) return { url, output: text };
    if (exited) {
      await drained.catch(() => {});
      throw new Error(`${where}: exited before logging its URL:\n${text}`);
    }
    if (Date.now() > deadline) {
      // For the studio's serve, likely another serve of the same studio
      // holding its lock, as authoring.md says.
      throw new Error(
        `${where}: logged no URL in 120s (is another run holding its lock?):\n${text}`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function runCommands(
  repo: RepoLike,
  commands: SkillCommand[],
  values: Record<string, string>,
  onStep: (step: ExampleStep) => void | Promise<void>,
  background: Background[],
): Promise<ExampleStep[]> {
  const steps: ExampleStep[] = [];
  const fill = (command: SkillCommand, word: string) =>
    word.replace(/<[a-z][a-z0-9-]*>/g, (p) => {
      const v = values[p];
      if (v === undefined) {
        throw new Error(
          `${command.file}:${command.line}: ${p} has no value yet`,
        );
      }
      return v;
    });
  for (const command of commands) {
    if (command.write !== undefined) {
      // Standing in for the agent: the example's blocks, into the factory.
      const example = fill(command, command.write.example);
      const { definition, scenarios } = parseExample(
        await Deno.readTextFile(
          `${SKILL_DIR}/references/examples/${example}.yaml`,
        ),
      );
      await repo.editFactory(
        fill(command, command.write.factory),
        definition,
        scenarios,
      );
      continue;
    }
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
    const ran = command.words.slice(1).map((w) => fill(command, w));
    if (command.background !== undefined) {
      const { url, output } = await startBackground(
        repo,
        command,
        ran,
        background,
      );
      const step = { command, ran, code: 0, output, url };
      steps.push(step);
      await onStep(step);
      continue;
    }
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
    await onStep(step);

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
