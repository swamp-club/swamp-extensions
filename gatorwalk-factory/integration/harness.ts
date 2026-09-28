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
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { expectedOf } from "../extensions/models/_lib/run_ops.ts";
import {
  parseRun,
  type RunRecord,
} from "../extensions/models/_lib/run_record.ts";
import {
  HOLDER_TYPE,
  WORK_ITEM_TYPE,
} from "../extensions/models/_lib/work_item_ops.ts";

// ---------------------------------------------------------------------------
// A harness that drives gatorwalk-factory through the installed swamp CLI,
// in a throwaway swamp repo per test. The fakes in _lib/fake_swamp.ts cannot
// show how the real engine loads, stores and reports; this can.
//
// Every swamp call runs in the temp repo with --no-telemetry, so nothing is
// written into the source tree. It uses the caller's HOME: swamp's config,
// stored login and deno's npm cache come from the host, which is what lets
// the suite run without the network.
// ---------------------------------------------------------------------------

/** The gatorwalk-factory directory, added to each repo as an extension source. */
export const EXTENSION_ROOT = fromFileUrl(new URL("../", import.meta.url));

export const BUILD_LIFECYCLE = new URL(
  "../lifecycles/build-swamp-extension.yaml",
  import.meta.url,
);

export { HOLDER_TYPE, WORK_ITEM_TYPE };

// Variables that would point swamp at another repo, server or workflow dir
// than the temp repo. The verify-build workflow sets some of them.
const REDIRECTING_ENV = [
  "SWAMP_REPO_DIR",
  "SWAMP_WORKFLOWS_DIR",
  "SWAMP_SERVE_URL",
  "SWAMP_SERVER_URL",
  "SWAMP_SERVER_TOKEN",
  "SWAMP_SERVER_TOKEN_FILE",
];

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
  /** Create a lifecycle holder whose globalArguments are `lifecycle`. */
  holder(name: string, lifecycle: unknown): Promise<void>;
  /** Replace a holder's lifecycle, as `swamp model edit` would. */
  editHolder(name: string, lifecycle: unknown): Promise<void>;
  /** Run a holder method by name. */
  holderMethod(
    name: string,
    method: string,
    options?: { allowFailure?: boolean },
  ): Promise<SwampResult>;
  /** Run a work-item method by direct type execution. */
  workItem(
    key: string,
    method: string,
    inputs?: Record<string, string>,
    options?: { allowFailure?: boolean },
  ): Promise<SwampResult>;
  /** Generate a key with the holder's new_key. */
  newKey(holder: string): Promise<string>;
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
}

let versionLogged: Promise<void> | undefined;

async function exec(
  cwd: string,
  args: string[],
): Promise<SwampResult> {
  const env = Deno.env.toObject();
  for (const name of REDIRECTING_ENV) delete env[name];
  env.NO_COLOR = "1";
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
        "the swamp CLI is not on PATH; the integration suite runs gatorwalk " +
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
  const { stdout } = await exec(cwd, ["--version"]);
  console.log(`integration suite: ${stdout.trim()}`);
}

function inputArgs(inputs: Record<string, string>): string[] {
  return Object.entries(inputs).flatMap(([k, v]) => ["--input", `${k}=${v}`]);
}

/** Run `fn` against a fresh swamp repo with gatorwalk-factory as a source. */
export async function withRepo(
  fn: (repo: SwampRepo) => Promise<void>,
): Promise<void> {
  const dir = await Deno.makeTempDir({ prefix: "gatorwalk-it-" });
  try {
    versionLogged ??= logVersion(dir);
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
    const result = await exec(dir, [...args, "--no-telemetry"]);
    if (result.code !== 0 && options.allowFailure !== true) {
      throw new Error(
        `swamp ${args.join(" ")} exited ${result.code}:\n${result.output}`,
      );
    }
    return result;
  };

  await swamp(["init", "--tool", "none"]);
  await swamp(["extension", "source", "add", EXTENSION_ROOT]);

  const holderFiles = new Map<string, string>();

  const writeHolder = async (name: string, lifecycle: unknown) => {
    const path = holderFiles.get(name);
    if (path === undefined) throw new Error(`no holder '${name}' created`);
    const definition = parseYaml(await Deno.readTextFile(path)) as Record<
      string,
      unknown
    >;
    definition.globalArguments = lifecycle;
    await Deno.writeTextFile(path, stringifyYaml(definition));
  };

  const data: SwampRepo["data"] = async (instance, name, version) => {
    const args = ["data", "get", instance, name, "--json"];
    if (version !== undefined) args.push("--version", String(version));
    const { stdout } = await swamp(args);
    return (JSON.parse(stdout) as { content: Record<string, unknown> })
      .content;
  };

  const run: SwampRepo["run"] = async (key) => {
    const parsed = parseRun(await data(key, "run"));
    if (!parsed.ok) {
      throw new Error(`stored run is unreadable:\n${parsed.errors.join("\n")}`);
    }
    return parsed.value;
  };

  return {
    dir,
    swamp,
    async holder(name, lifecycle) {
      const { stdout } = await swamp([
        "model",
        "create",
        HOLDER_TYPE,
        name,
        "--json",
      ]);
      holderFiles.set(name, (JSON.parse(stdout) as { path: string }).path);
      await writeHolder(name, lifecycle);
    },
    editHolder: writeHolder,
    holderMethod: (name, method, options) =>
      swamp(["model", "method", "run", name, method, "--log"], options),
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
          "--log",
        ],
        options,
      ),
    async newKey(holder) {
      const { output } = await swamp([
        "model",
        "method",
        "run",
        holder,
        "new_key",
        "--log",
      ]);
      const match = output.match(/new_key: "([^"]+)"/);
      if (match === null) throw new Error(`new_key logged no key:\n${output}`);
      return match[1];
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
