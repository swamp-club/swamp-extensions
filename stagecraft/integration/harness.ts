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

import { fromFileUrl, join } from "@std/path";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { expectedOf } from "../extensions/models/_lib/engine/run_ops.ts";
import {
  parseRun,
  type RunRecord,
} from "../extensions/models/_lib/engine/run_record.ts";
import { parseExample } from "../extensions/models/_lib/engine/fake_swamp.ts";
import {
  FACTORY_TYPE,
  WORK_ITEM_TYPE,
} from "../extensions/models/_lib/engine/work_item_ops.ts";
import {
  DEFAULT_TRACKER_KIND,
  TRACKER_KINDS,
  TRACKER_TYPES,
  type TrackerKind,
} from "../extensions/models/_lib/engine/tracker_binding.ts";

// ---------------------------------------------------------------------------
// A harness that drives stagecraft through the installed swamp CLI,
// in a throwaway swamp repo per test. The fakes in _lib/fake_swamp.ts cannot
// show how the real engine loads, stores and reports; this can.
//
// Every swamp call runs in the temp repo with telemetry off, so nothing is
// written into the source tree. It uses the caller's HOME: swamp's config,
// stored login and deno's npm cache come from the host, which is what lets
// the suite run without the network.
// ---------------------------------------------------------------------------

/** The stagecraft directory, added to each repo as an extension source. */
export const EXTENSION_ROOT = fromFileUrl(new URL("../", import.meta.url));

/** Skill examples: each holds a definition block and a scenarios block. */
export const BUILD_DEFINITION = new URL(
  "../.claude/skills/stagecraft/references/examples/build-swamp-extension.yaml",
  import.meta.url,
);

/** A skill example's definition and saved scenarios, as data. */
export async function readExample(
  url: URL,
): Promise<{ definition: Record<string, unknown>; scenarios: unknown[] }> {
  return parseExample(await Deno.readTextFile(url));
}

/** The repository's verification workflow; see DESIGN.md. */
export const VERIFY_WORKFLOW = new URL(
  "../../verification/workflow-verify.yaml",
  import.meta.url,
);

export { FACTORY_TYPE, WORK_ITEM_TYPE };

// The only inherited SWAMP_ variable kept. SWAMP_HOME relocates swamp's user
// directory (config, stored login, and the runtime that loads extensions),
// which the suite takes from the caller on purpose, as it does HOME. It does
// not point swamp at another repo or server.
const KEPT_SWAMP_ENV = new Set(["SWAMP_HOME"]);

/**
 * The environment for a swamp call. Every inherited SWAMP_ variable except
 * those in KEPT_SWAMP_ENV is removed, so no variable (the verify-build
 * workflow sets some, and swamp adds new ones) can point swamp at another
 * repo, datastore or server than the temp repo.
 */
export function swampEnv(
  host: Record<string, string>,
): Record<string, string> {
  const env = Object.fromEntries(
    Object.entries(host).filter(([name]) =>
      !name.startsWith("SWAMP_") || KEPT_SWAMP_ENV.has(name)
    ),
  );
  env.NO_COLOR = "1";
  // The variable, not the --no-telemetry flag: swamp reads it before parsing
  // arguments, so it also covers --version, which refuses any other option.
  // Set after the strip, so the caller cannot turn it back off.
  env.SWAMP_NO_TELEMETRY = "1";
  // An update check would reach the network and write under the caller's
  // HOME (~/.swamp/last-update-check.json).
  env.SWAMP_NO_UPDATE_CHECK = "1";
  return env;
}

export interface SwampResult {
  code: number;
  stdout: string;
  stderr: string;
  /** stdout and stderr together, for matching messages. */
  output: string;
}

export interface SwampRepo {
  dir: string;
  /** Run swamp in the repo; a non-zero exit throws unless allowed. */
  swamp(args: string[], options?: { allowFailure?: boolean }): Promise<
    SwampResult
  >;
  /**
   * Create a factory bound to the tracker instance `tracker`, with only its
   * tracker as swamp model create allows, then write `definition` (YAML text
   * is parsed) and any `scenarios` into its model definition file under
   * globalArguments, as the skill does. Without a tracker it is bound to one
   * of the definition's kind that the harness creates once per repo: `board`
   * for the built-in tracker (prefix board), `swamp-club` for the Lab. A
   * Linear definition needs its tracker named, since Linear needs a token.
   */
  factory(
    name: string,
    definition: unknown,
    options?: { tracker?: string; scenarios?: unknown[] },
  ): Promise<void>;
  /**
   * Replace a factory's definition (and its scenarios, when given) in its
   * model definition file, as an agent's edit would.
   */
  editFactory(
    name: string,
    definition: unknown,
    scenarios?: unknown[],
  ): Promise<void>;
  /** A factory's model definition file, relative to the repo. */
  factoryFile(name: string): string;
  /** Run a factory method by name. */
  factoryMethod(
    name: string,
    method: string,
    options?: { allowFailure?: boolean; inputs?: Record<string, string> },
  ): Promise<SwampResult>;
  /** Run a work-item method by direct type execution. */
  workItem(
    key: string,
    method: string,
    inputs?: Record<string, string>,
    options?: { allowFailure?: boolean },
  ): Promise<SwampResult>;
  /**
   * An unused work-item key, `<factory>-<n>`, chosen as a person may choose
   * one by hand: start takes any unused name.
   */
  newKey(factory: string): Promise<string>;
  /** A stored record's content, the latest version unless one is given. */
  data(
    instance: string,
    name: string,
    version?: number,
  ): Promise<Record<string, unknown>>;
  /** The latest version of each record the instance holds (reports aside). */
  versions(instance: string): Promise<Record<string, number>>;
  /** The work item's stored run record, parsed as the runtime parses it. */
  run(key: string): Promise<RunRecord>;
  /** The expectation every write passes back, as CLI strings. */
  expected(key: string): Promise<Record<string, string>>;
  /**
   * Start swamp in the repo without waiting for it, for a method that runs
   * until stopped (the studio's serve). The caller ends it.
   */
  spawn(args: string[]): Deno.ChildProcess;
}

let versionLogged: Promise<void> | undefined;

async function exec(
  cwd: string,
  args: string[],
): Promise<SwampResult> {
  const env = swampEnv(Deno.env.toObject());
  let out: Deno.CommandOutput;
  try {
    out = await new Deno.Command("swamp", {
      args,
      cwd,
      env,
      clearEnv: true,
      stdin: "null",
    }).output();
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(
        "the swamp CLI is not on PATH; the integration suite runs stagecraft " +
          "through the real engine and needs it installed",
      );
    }
    throw error;
  }
  const decoder = new TextDecoder();
  const stdout = decoder.decode(out.stdout);
  const stderr = decoder.decode(out.stderr);
  return { code: out.code, stdout, stderr, output: `${stdout}\n${stderr}` };
}

async function logVersion(cwd: string): Promise<void> {
  const { code, stdout, output } = await exec(cwd, ["--version"]);
  if (code !== 0) {
    throw new Error(`swamp --version in ${cwd} exited ${code}:\n${output}`);
  }
  console.log(`integration suite: ${stdout.trim()}`);
}

function inputArgs(inputs: Record<string, string>): string[] {
  return Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]);
}

/** The tracker kind a definition, as YAML text or data, names. */
function kindOf(definition: unknown): TrackerKind {
  const doc = typeof definition === "string"
    ? parseYaml(definition)
    : definition;
  const kind = (doc as { tracker?: { kind?: unknown } } | null)?.tracker?.kind;
  return (TRACKER_KINDS as readonly unknown[]).includes(kind)
    ? kind as TrackerKind
    : DEFAULT_TRACKER_KIND;
}

/** Run `fn` against a fresh swamp repo with stagecraft as a source. */
export async function withRepo(
  fn: (repo: SwampRepo) => Promise<void>,
): Promise<void> {
  const dir = await Deno.makeTempDir({ prefix: "stagecraft-it-" });
  try {
    // Only a passing check is shared: after a failure the next test runs its
    // own, so each failing test reports its own repo.
    versionLogged ??= logVersion(dir).catch((error) => {
      versionLogged = undefined;
      throw error;
    });
    await versionLogged;
    console.log(`integration suite: swamp repo ${dir}`);
    await fn(await openRepo(dir));
  } finally {
    // A failed cleanup is logged, not thrown, so it never hides the test's
    // own failure.
    await Deno.remove(dir, { recursive: true }).catch((error) =>
      console.error(`integration suite: could not remove ${dir}: ${error}`)
    );
  }
}

async function openRepo(dir: string): Promise<SwampRepo> {
  const swamp: SwampRepo["swamp"] = async (args, options = {}) => {
    const result = await exec(dir, args);
    if (result.code !== 0 && options.allowFailure !== true) {
      throw new Error(
        `swamp ${args.join(" ")} exited ${result.code}:\n${result.output}`,
      );
    }
    return result;
  };

  await swamp(["init", "--tool", "none"]);
  await swamp(["extension", "source", "add", EXTENSION_ROOT]);

  const factoryFile = (name: string) => `models/${FACTORY_TYPE}/${name}.yaml`;

  // Writes into the file swamp model create wrote, as an agent edits it.
  const writeFactory = async (
    name: string,
    definition: unknown,
    scenarios?: unknown[],
  ) => {
    const path = join(dir, factoryFile(name));
    const model = parseYaml(await Deno.readTextFile(path)) as {
      globalArguments?: Record<string, unknown>;
    };
    const args = model.globalArguments ?? {};
    args.definition = typeof definition === "string"
      ? parseYaml(definition)
      : definition;
    if (scenarios !== undefined) args.scenarios = scenarios;
    model.globalArguments = args;
    await Deno.writeTextFile(path, stringifyYaml(model));
  };

  // The keys newKey has chosen in this repo.
  let chosen = 0;

  // The trackers the harness created, so each is created once.
  const trackers = new Set<string>();
  const defaultTracker = async (kind: TrackerKind): Promise<string> => {
    if (kind === "linear") {
      throw new Error("a Linear factory needs its tracker named: { tracker }");
    }
    const instance = kind === "builtin" ? "board" : kind;
    if (!trackers.has(instance)) {
      const args = kind === "builtin" ? ["--global-arg", "prefix=board"] : [];
      await swamp([
        "model",
        "create",
        TRACKER_TYPES[kind],
        instance,
        ...args,
        "--json",
      ]);
      trackers.add(instance);
    }
    return instance;
  };

  const createFactory: SwampRepo["factory"] = async (
    name,
    definition,
    options = {},
  ) => {
    const tracker = options.tracker ?? await defaultTracker(kindOf(definition));
    await swamp([
      "model",
      "create",
      FACTORY_TYPE,
      name,
      "--global-arg",
      `tracker=${tracker}`,
      "--json",
    ]);
    await writeFactory(name, definition, options.scenarios);
  };

  // `data query` succeeds with no results, so a record that is not there,
  // or not alone, fails here instead.
  const data: SwampRepo["data"] = async (instance, name, version) => {
    const predicate = [
      `modelName == ${JSON.stringify(instance)}`,
      `name == ${JSON.stringify(name)}`,
      ...(version !== undefined ? [`version == ${version}`] : []),
    ].join(" && ");
    const { stdout } = await swamp([
      "data",
      "query",
      predicate,
      "--select",
      "content",
      "--json",
    ]);
    const { results } = JSON.parse(stdout) as {
      results: Record<string, unknown>[];
    };
    if (results.length !== 1) {
      throw new Error(
        `${results.length} records match ${predicate}, not one`,
      );
    }
    return results[0];
  };

  const run: SwampRepo["run"] = async (key) => {
    const parsed = parseRun(await data(key, "run"));
    if (!parsed.ok) {
      throw new Error(`stored run is unreadable:\n${parsed.errors.join("\n")}`);
    }
    return parsed.value;
  };

  const spawn: SwampRepo["spawn"] = (args) =>
    new Deno.Command("swamp", {
      args,
      cwd: dir,
      env: swampEnv(Deno.env.toObject()),
      clearEnv: true,
      stdin: "null",
      stdout: "piped",
      stderr: "piped",
    }).spawn();

  return {
    dir,
    swamp,
    spawn,
    factory: createFactory,
    editFactory: writeFactory,
    factoryFile,
    factoryMethod: (name, method, options = {}) =>
      swamp(
        [
          "model",
          "method",
          "run",
          name,
          method,
          ...inputArgs(options.inputs ?? {}),
        ],
        options,
      ),
    workItem: (key, method, inputs = {}, options) =>
      swamp(
        [
          "model",
          WORK_ITEM_TYPE,
          "method",
          "run",
          method,
          key,
          ...inputArgs(inputs),
        ],
        options,
      ),
    newKey(factory) {
      chosen += 1;
      return Promise.resolve(`${factory}-${chosen}`);
    },
    data,
    async versions(instance) {
      const { stdout } = await swamp(["data", "list", instance, "--json"]);
      const listing = JSON.parse(stdout) as {
        groups: { items: { name: string; version: number }[] }[];
      };
      const found: Record<string, number> = {};
      for (const item of listing.groups.flatMap((g) => g.items)) {
        if (!item.name.startsWith("report-")) found[item.name] = item.version;
      }
      return found;
    },
    run,
    async expected(key) {
      const view = expectedOf(await run(key));
      return {
        expectedStage: view.stage,
        expectedCycle: String(view.cycle),
        expectedEra: view.era,
      };
    },
  };
}

// --- commands as the skill writes them -------------------------------------

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
