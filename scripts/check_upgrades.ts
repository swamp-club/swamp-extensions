// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
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

/**
 * Checks that every swamp model whose `version` a change bumps can be
 * upgraded to it.
 *
 * Instances pin a model's own `version` (as `typeVersion`) and step through
 * its `upgrades` entries to reach a newer one, so the thing to check is the
 * model file, not the extension manifest — a manifest bump says nothing about
 * whether an instance can follow. This looks at every changed model
 * definition (a `.ts` file at any depth under `<extension>/extensions/models/`
 * outside `_lib/`, generated or hand-written) and, for each whose `version`
 * changed:
 *
 * - static: the last `upgrades[].toVersion` equals the new `version`, and the
 *   new version sorts after the old one.
 * - `--path-test`: an instance created from the published extension upgrades
 *   to the new version once the local source replaces it — pull, create,
 *   remove, `extension source add`, run a method, read `typeVersion`. Run once
 *   per extension; skipped for extensions with no published version (new in
 *   the change, or not found by `swamp extension info`). When the published
 *   version's code fails to import, the pull is only partly applied and the
 *   path test still runs if the bumped model loads from it. If that model does
 *   not load, no instance can be on it, so a fresh install stands in: an
 *   instance created from the local source alone must be at the new version.
 *
 * An extension whose every bumped model only adds no-op upgrade entries
 * (`No schema changes`, attributes passed through) skips the method run: the
 * published version must still pull, and a fresh install from the local
 * source must be at the new version.
 *
 * When an extension bumps more than one model, the others are each created
 * fresh from the local source too, so a sibling that does not load fails the
 * test rather than going unnoticed.
 *
 * Extensions are path-tested `--concurrency` at a time (default 8), each in
 * its own lane: a scratch repo, with a swamp home and config directory of its
 * own, so concurrent tests share no swamp user-level state with each other or
 * the host but the deno runtime and module cache (see {@link withLane}). Each
 * extension's output is printed as one group, in the order a one-at-a-time
 * run would print it.
 *
 * Every model it examined is printed, so a run that checked nothing says so
 * rather than passing in silence.
 *
 * Usage (from the repository root):
 *   deno run --allow-read --allow-write --allow-env --allow-run \
 *     scripts/check_upgrades.ts --base origin/main [--path-test] \
 *     [--concurrency <1-16>]
 */

import { parseArgs } from "@std/cli/parse-args";
import { basename, join, resolve } from "@std/path";

/** What a model definition declares, as far as upgrades are concerned. */
export interface ModelDefinition {
  type: string;
  version: string;
  toVersions: string[];
  firstMethod?: string;
}

/**
 * Reads the upgrade-relevant fields out of a model file's source.
 *
 * Deliberately textual: importing the module would execute it, and at the base
 * commit its imports may not resolve. Returns null for files that define no
 * model (libraries, reports, vaults, datastores).
 */
export function parseModel(source: string): ModelDefinition | null {
  const start = source.search(/export const model\s*=\s*\{/);
  if (start < 0) return null;
  const body = source.slice(start);
  const type = body.match(/\btype:\s*["']([^"']+)["']/)?.[1];
  const version = body.match(/\bversion:\s*["'](\d{4}\.\d{2}\.\d{2}\.\d+)["']/)
    ?.[1];
  if (!type || !version) return null;
  const toVersions = [...body.matchAll(/\btoVersion:\s*["']([^"']+)["']/g)]
    .map((m) => m[1]);
  const firstMethod = body.match(/\bmethods:\s*\{\s*["']?([\w-]+)["']?\s*:/)
    ?.[1];
  return { type, version, toVersions, firstMethod };
}

/** Numeric CalVer comparison: negative when a sorts before b. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export interface ModelChange {
  path: string;
  base: ModelDefinition | null;
  head: ModelDefinition;
  /** The `toVersion`s of the head's no-op upgrade entries ({@link noOpVersions}). */
  headNoOps?: string[];
}

// An upgrades entry in exactly the shape codegen writes when nothing changed:
// `No schema changes`, and attributes returned as they came in.
const NO_OP_ENTRY_RE =
  /\{\s*toVersion:\s*["']([^"']+)["'],\s*description:\s*["']No schema changes["'],\s*upgradeAttributes:\s*\(\s*(\w+)(?:\s*:[^)]*)?\)\s*=>\s*\2\s*,?\s*\}/g;

/**
 * The `toVersion`s of a model source's no-op upgrade entries: described as
 * `No schema changes`, with an `upgradeAttributes` that returns its argument.
 * Textual like {@link parseModel}; an entry in any other shape is not listed,
 * so it is never mistaken for a no-op.
 */
export function noOpVersions(source: string): string[] {
  const start = source.search(/export const model\s*=\s*\{/);
  if (start < 0) return [];
  return [...source.slice(start).matchAll(NO_OP_ENTRY_RE)].map((m) => m[1]);
}

/**
 * Whether a bump adds only no-op upgrade entries: every entry past the base
 * version is one {@link noOpVersions} lists. Entries are matched one to one,
 * so a version with a no-op entry and another entry is not a no-op bump. A
 * new model is not a bump.
 */
export function isNoOpBump(change: ModelChange): boolean {
  const { base, head, headNoOps = [] } = change;
  if (!base) return false;
  const added = head.toVersions.filter((v) =>
    compareVersions(v, base.version) > 0
  );
  const unmatched = [...headNoOps];
  return added.length > 0 && added.every((v) => {
    const i = unmatched.indexOf(v);
    if (i < 0) return false;
    unmatched.splice(i, 1);
    return true;
  });
}

/** The default and largest number of extensions path-tested at once. */
export const DEFAULT_CONCURRENCY = 8;
export const MAX_CONCURRENCY = 16;

/**
 * The `--concurrency` value as a whole number from 1 to
 * {@link MAX_CONCURRENCY}; undefined for anything else.
 */
export function parseConcurrency(value: unknown): number | undefined {
  if (value === undefined) return DEFAULT_CONCURRENCY;
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= MAX_CONCURRENCY ? n : undefined;
}

/**
 * Runs `worker` on every item, at most `limit` at once, and resolves with the
 * results in input order. `onResult` is called for each result in input
 * order, as soon as it and every earlier one are done, so streamed output
 * reads as a one-at-a-time run would. If a worker throws, no further item
 * starts, the running ones finish, and the first error is rethrown.
 */
export async function runPooled<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
  onResult?: (result: R, index: number) => void,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  const done: boolean[] = new Array(items.length).fill(false);
  let next = 0;
  let emitted = 0;
  let failure: { error: unknown } | undefined;
  const lane = async () => {
    while (failure === undefined && next < items.length) {
      const index = next++;
      try {
        results[index] = await worker(items[index], index);
      } catch (error) {
        failure ??= { error };
        return;
      }
      done[index] = true;
      while (failure === undefined && emitted < items.length && done[emitted]) {
        onResult?.(results[emitted], emitted);
        emitted++;
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, lane),
  );
  if (failure !== undefined) throw failure.error;
  return results;
}

export type Verdict =
  | { kind: "new"; path: string }
  | { kind: "unchanged"; path: string; version: string }
  | { kind: "bumped"; path: string; from: string; to: string }
  | { kind: "error"; path: string; message: string };

/** The static verdict for one changed model file. */
export function checkChange(change: ModelChange): Verdict {
  const { path, base, head } = change;
  if (!base) return { kind: "new", path };
  if (base.version === head.version) {
    return { kind: "unchanged", path, version: head.version };
  }
  if (compareVersions(head.version, base.version) <= 0) {
    return {
      kind: "error",
      path,
      message:
        `version went from ${base.version} to ${head.version}, which is not newer`,
    };
  }
  const last = head.toVersions.at(-1);
  if (last !== head.version) {
    return {
      kind: "error",
      path,
      message:
        `version bumped ${base.version} → ${head.version} but the last ` +
        `upgrades entry is ${last ?? "missing"}; add ` +
        `{ toVersion: "${head.version}", ... } as the final entry`,
    };
  }
  return { kind: "bumped", path, from: base.version, to: head.version };
}

/** The extension directory a model file belongs to. */
export function extensionDirOf(path: string): string | null {
  const idx = path.indexOf("/extensions/models/");
  return idx > 0 ? path.slice(0, idx) : null;
}

/**
 * Model definition files, not tests or shared libraries. Models may sit in
 * subdirectories (stagecraft's `engine/` and `tracker/`); `_lib/` at any depth
 * below `extensions/models/` holds libraries.
 */
export function isModelFile(path: string): boolean {
  const below = path.match(/(?:^|\/)extensions\/models\/(.+\.ts)$/)?.[1];
  return below !== undefined && !below.endsWith("_test.ts") &&
    !/(?:^|\/)_lib\//.test(below);
}

/**
 * The first method name in `swamp model type describe <type> --json` output,
 * for a model whose methods `parseModel` cannot read (built by a function call
 * rather than an object literal). `undefined` when the output names none.
 */
export function firstDescribedMethod(stdout: string): string | undefined {
  try {
    const name = JSON.parse(stdout)?.methods?.[0]?.name;
    return typeof name === "string" && name !== "" ? name : undefined;
  } catch {
    return undefined;
  }
}

/** How long the path test lets the upgraded model's method run. */
export const METHOD_TIMEOUT_MS = 60_000;

export type PathTestTarget =
  | { kind: "skip"; reason: string }
  | { kind: "error"; message: string }
  | { kind: "pull"; name: string };

/**
 * Whether an extension's upgrade path can be tested, from its manifest at HEAD
 * and at the merge base. An extension with a manifest at neither has never been
 * published, so there is nothing to pull.
 */
export function pathTestTarget(
  headManifest: string | null,
  baseManifest: string | null,
): PathTestTarget {
  if (headManifest === null) {
    return baseManifest === null
      ? { kind: "skip", reason: "no manifest, never published" }
      : {
        kind: "error",
        message: "manifest.yaml removed from a published extension",
      };
  }
  const name = headManifest.match(/^name:\s*["']?([^"'\s]+)["']?/m)?.[1];
  if (!name) {
    return { kind: "error", message: "no manifest name, cannot pull it" };
  }
  if (baseManifest === null) {
    return { kind: "skip", reason: "not published before this change" };
  }
  return { kind: "pull", name };
}

/**
 * Whether the registry has a published version to pull, from the exit code and
 * output streams of `swamp extension info <name> --json`. A manifest on the
 * base branch does not mean the extension was ever published (a publish can be
 * missed), so an extension the registry reports as not found is skipped. Any
 * other failure is an error, so a registry outage cannot skip the path test.
 *
 * The CLI writes the metadata to stdout on success and the error to stderr on
 * failure; each is parsed on its own, so output on the other stream (an update
 * notice, a warning) cannot break the parse.
 */
export function registryTarget(
  name: string,
  code: number,
  stdout: string,
  stderr: string,
): PathTestTarget {
  const parse = (
    text: string,
  ): { latestVersion?: unknown; error?: unknown } => {
    try {
      const value = JSON.parse(text);
      return typeof value === "object" && value !== null ? value : {};
    } catch {
      return {};
    }
  };
  if (code === 0) {
    const { latestVersion } = parse(stdout);
    if (typeof latestVersion === "string" && latestVersion !== "") {
      return { kind: "pull", name };
    }
  } else {
    const { error } = parse(stderr);
    if (
      typeof error === "string" &&
      error.includes(`${name} not found in the registry`)
    ) {
      return { kind: "skip", reason: "not published to the registry" };
    }
  }
  return {
    kind: "error",
    message:
      `swamp extension info ${name} gave no published version (exit ${code}):\n${stdout}${stderr}`,
  };
}

// -- I/O ------------------------------------------------------------------------

type Runner = (
  cmd: string,
  args: string[],
  cwd?: string,
  signal?: AbortSignal,
  env?: Record<string, string>,
) => Promise<{ code: number; out: string; stdout: string; stderr: string }>;

/**
 * Runs the path test's method on the `upgrade-test` instance. The method may
 * never return (stagecraft's studio `serve`), so it is stopped after
 * `timeoutMs`: the upgraded definition is saved before the method body starts.
 */
export async function runUpgradeMethod(
  scratch: string,
  method: string,
  timeoutMs = METHOD_TIMEOUT_MS,
  exec: Runner = run,
  env?: Record<string, string>,
): Promise<void> {
  await exec(
    "swamp",
    ["model", "method", "run", "upgrade-test", method],
    scratch,
    AbortSignal.timeout(timeoutMs),
    env,
  );
}

/**
 * The swamp data and config directories of the host, resolved as swamp
 * resolves them (SWAMP_HOME, then ~/.swamp; SWAMP_CONFIG_DIR, then
 * SWAMP_HOME/config, then XDG_CONFIG_HOME/swamp, then ~/.config/swamp).
 */
export function hostSwampDirs(
  env: (name: string) => string | undefined,
): { dataDir: string; configDir: string } {
  // An empty variable counts as unset, and every result is absolute: the
  // lanes symlink into the data dir from elsewhere, where a relative path
  // would point at the lane itself.
  const get = (name: string) => env(name) || undefined;
  const home = get("HOME") ?? get("USERPROFILE");
  const swampHome = get("SWAMP_HOME");
  if (!swampHome && !home) {
    throw new Error("cannot find the swamp directories: HOME is not set");
  }
  const xdg = get("XDG_CONFIG_HOME");
  return {
    dataDir: resolve(swampHome ?? join(home!, ".swamp")),
    configDir: resolve(
      get("SWAMP_CONFIG_DIR") ??
        (swampHome
          ? join(swampHome, "config")
          : xdg
          ? join(xdg, "swamp")
          : join(home!, ".config", "swamp")),
    ),
  };
}

/**
 * How isolated swamp processes get the host's swamp-club credential, so they
 * never read or write the host's config directory. A key file the
 * environment names (SWAMP_API_KEY_FILE) is passed on as an absolute path, as
 * lanes run in their own scratch repos; a SWAMP_API_KEY the environment
 * supplies is inherited as is. Otherwise the key, and its server when swamp
 * would not pick it by default, come from the host's auth.json, and
 * {@link withLane} writes the key to a file of the lane's own rather than
 * putting it in the environment, which extension code run by a lane can read.
 * Nothing here prints the key.
 */
export function laneCredential(
  env: (name: string) => string | undefined,
  authJson: string | null,
  cwd: string = Deno.cwd(),
): LaneCredential {
  const keyFile = env("SWAMP_API_KEY_FILE");
  if (keyFile) return { env: { SWAMP_API_KEY_FILE: resolve(cwd, keyFile) } };
  if (env("SWAMP_API_KEY")) return { env: {} };
  let stored: { apiKey?: unknown; serverUrl?: unknown } = {};
  try {
    stored = authJson === null ? {} : JSON.parse(authJson);
  } catch {
    // An unreadable auth.json is the same as none.
  }
  if (typeof stored.apiKey !== "string" || stored.apiKey === "") {
    throw new Error(
      "no swamp-club credential for the path test: run swamp auth login, " +
        "or set SWAMP_API_KEY",
    );
  }
  const credential: LaneCredential = { apiKey: stored.apiKey, env: {} };
  if (typeof stored.serverUrl === "string" && !env("SWAMP_CLUB_URL")) {
    credential.env.SWAMP_CLUB_URL = stored.serverUrl;
  }
  return credential;
}

/**
 * The host's {@link LaneShared}: its swamp data directory and the
 * credential its lanes get. Rejects when neither is available.
 */
export async function laneSharedFromHost(
  env: (name: string) => string | undefined = (name) => Deno.env.get(name),
): Promise<LaneShared> {
  const dirs = hostSwampDirs(env);
  const authJson = await Deno.readTextFile(join(dirs.configDir, "auth.json"))
    .catch(() => null);
  return { dataDir: dirs.dataDir, credential: laneCredential(env, authJson) };
}

/** The swamp-club credential every lane gets, from {@link laneCredential}. */
export interface LaneCredential {
  /** A key each lane gets in a key file of its own, not in its environment. */
  apiKey?: string;
  /** Environment each lane's processes get. */
  env: Record<string, string>;
}

/** What every lane shares with the host. */
export interface LaneShared {
  /** The host's swamp data directory. */
  dataDir: string;
  credential: LaneCredential;
}

/**
 * The parts of the swamp data directory a lane shares with the host: the
 * embedded deno runtime (extracted atomically, by temp file and rename) and
 * deno's module cache, both safe for many processes at once. Sharing them
 * saves every lane extracting the runtime and fetching every dependency again.
 * They are the only directories a lane creates under the host's data
 * directory, when they are not there yet.
 */
export const SHARED_DATA_SUBDIRS = ["deno", "deno-cache"];

/**
 * One path test's own swamp: a scratch repo, and a swamp data and config
 * directory of its own, so concurrent lanes cannot race on swamp's user-level
 * state (auth verification and refresh, identity and scope caches, telemetry,
 * the update check, logs) and never write the host's. A key from the host's
 * auth.json is in a key file in the config directory, readable by its owner
 * only.
 */
export interface Lane {
  repo: string;
  env: Record<string, string>;
}

/** The name of a lane's key file, in its config directory. */
export const LANE_KEY_FILE = "api-key";

/** Makes a lane under a new temp directory, which `fn` gets to use. */
export async function withLane<T>(
  prefix: string,
  shared: LaneShared,
  fn: (lane: Lane) => Promise<T>,
): Promise<T> {
  const root = await Deno.makeTempDir({ prefix });
  try {
    const repo = join(root, "repo");
    const home = join(root, "home");
    const config = join(root, "config");
    for (const dir of [repo, home, config]) await Deno.mkdir(dir);
    for (const sub of SHARED_DATA_SUBDIRS) {
      await Deno.mkdir(join(shared.dataDir, sub), { recursive: true });
      await Deno.symlink(join(shared.dataDir, sub), join(home, sub));
    }
    const env: Record<string, string> = {
      ...shared.credential.env,
      SWAMP_HOME: home,
      SWAMP_CONFIG_DIR: config,
    };
    if (shared.credential.apiKey !== undefined) {
      env.SWAMP_API_KEY_FILE = join(config, LANE_KEY_FILE);
      await Deno.writeTextFile(
        env.SWAMP_API_KEY_FILE,
        shared.credential.apiKey,
        {
          mode: 0o600,
        },
      );
    }
    return await fn({ repo, env });
  } finally {
    await Deno.remove(root, { recursive: true }).catch(() => {});
  }
}

/** Runs swamp in a lane: in its repo unless `inRepo` is false. */
function laneSwamp(
  lane: Lane,
  args: string[],
  inRepo = true,
): ReturnType<Runner> {
  return run(
    "swamp",
    args,
    inRepo ? lane.repo : undefined,
    undefined,
    lane.env,
  );
}

/**
 * Causes of a failed bundle or import that come from the published code itself
 * and so fail the same way on every pull. Bundling also fetches dependencies,
 * and a failed fetch gives the same wrapper with a different cause, so only
 * these count.
 */
const UNIMPORTABLE_CAUSES = ["Invalid regular expression:"];

/**
 * Whether `swamp extension pull <name>` failed because the published version's
 * code does not import (swamp extracts the files, then fails to bundle or
 * import them) for one of the `UNIMPORTABLE_CAUSES`. Any other pull failure is
 * not this, so a registry outage or a failed dependency fetch cannot turn the
 * path test into a fresh install.
 */
export function unimportablePublish(
  name: string,
  code: number,
  out: string,
): boolean {
  return code !== 0 &&
    out.includes(`Install partially applied for ${name} `) &&
    UNIMPORTABLE_CAUSES.some((cause) =>
      out.includes(`bundling/importing the extension failed (${cause}`)
    );
}

/**
 * Whether `swamp model create` failed because the published code of the model
 * at `modelFile` does not import: the fatal error is a SyntaxError for one of
 * the `UNIMPORTABLE_CAUSES`, and its stack names that model's bundle (swamp
 * bundles each model file to `<basename>.js`). A sibling model's load error
 * logged along the way does not count, and any other create failure (a
 * registry error, a lock) fails the path test rather than turning it into a
 * fresh install.
 */
export function unloadableModel(
  code: number,
  out: string,
  modelFile: string,
): boolean {
  if (code === 0) return false;
  const fatal = out.split("\n").findIndex((line) => line.includes("[FTL]"));
  if (fatal === -1) return false;
  const lines = out.split("\n").slice(fatal);
  if (
    !UNIMPORTABLE_CAUSES.some((cause) =>
      lines[0].includes(`SyntaxError: ${cause}`)
    )
  ) {
    return false;
  }
  const bundle = `/${basename(modelFile, ".ts")}.js`;
  return lines.some((line) =>
    line.includes(`${bundle}?`) || line.includes(`${bundle}:`)
  );
}

/**
 * Runs a command to completion, or until `signal` aborts it. `env` is added
 * to the inherited environment.
 */
async function run(
  cmd: string,
  args: string[],
  cwd?: string,
  signal?: AbortSignal,
  env?: Record<string, string>,
): Promise<{ code: number; out: string; stdout: string; stderr: string }> {
  try {
    const { code, stdout, stderr } = await new Deno.Command(cmd, {
      args,
      cwd,
      signal,
      env,
      stdout: "piped",
      stderr: "piped",
    }).output();
    const d = new TextDecoder();
    const [o, e] = [d.decode(stdout), d.decode(stderr)];
    return { code, out: o + e, stdout: o, stderr: e };
  } catch (err) {
    return { code: -1, out: String(err), stdout: "", stderr: String(err) };
  }
}

async function git(args: string[]): Promise<string> {
  const { code, out } = await run("git", args);
  if (code !== 0) throw new Error(`git ${args.join(" ")} failed: ${out}`);
  return out;
}

async function showAt(rev: string, path: string): Promise<string | null> {
  const { code, out } = await run("git", ["show", `${rev}:${path}`]);
  return code === 0 ? out : null;
}

/** Where an extension's path-test output is collected. */
type Log = (line: string) => void;

/**
 * The bumped models of an extension that the path test does not exercise
 * (it takes the first), so each is created fresh from the local source.
 */
export function siblingsToFreshInstall(bumped: ModelChange[]): ModelChange[] {
  return bumped.slice(1);
}

async function pathTest(
  extDir: string,
  bumped: ModelChange[],
  mergeBase: string,
  shared: LaneShared,
  log: Log,
): Promise<string | null> {
  const manifest = await Deno.readTextFile(join(extDir, "manifest.yaml"))
    .catch(() => null);
  const target = pathTestTarget(
    manifest,
    await showAt(mergeBase, `${extDir}/manifest.yaml`),
  );
  if (target.kind === "error") return `${extDir}: ${target.message}`;
  if (target.kind === "skip") {
    log(`  ${extDir}: ${target.reason}, path test skipped`);
    return null;
  }
  const { name } = target;
  const [change] = bumped;
  const failure = bumped.every(isNoOpBump)
    ? await noOpTest(extDir, change, name, shared, log)
    : await withLane(
      "upgrade-path-",
      shared,
      (lane) => fullPathTest(extDir, change, name, lane, shared, log),
    );
  if (failure !== null) return failure;
  const siblings = siblingsToFreshInstall(bumped);
  return siblings.length === 0
    ? null
    : await freshInstallTest(extDir, siblings, shared, log);
}

/**
 * Whether the registry has `name` to pull, asked from `lane`: null when it
 * does, or the skip line or error to report.
 */
async function publishedCheck(
  extDir: string,
  name: string,
  lane: Lane,
  log: Log,
): Promise<string | null | "skip"> {
  const info = await laneSwamp(
    lane,
    ["extension", "info", name, "--json"],
    false,
  );
  const published = registryTarget(name, info.code, info.stdout, info.stderr);
  if (published.kind === "error") return `${extDir}: ${published.message}`;
  if (published.kind === "skip") {
    log(`  ${extDir}: ${published.reason}, path test skipped`);
    return "skip";
  }
  return null;
}

async function fullPathTest(
  extDir: string,
  change: ModelChange,
  name: string,
  lane: Lane,
  shared: LaneShared,
  log: Log,
): Promise<string | null> {
  const checked = await publishedCheck(extDir, name, lane, log);
  if (checked !== null) return checked === "skip" ? null : checked;
  const steps: Array<[string, string[]]> = [
    ["init", ["init", lane.repo, "--tool", "none", "--force"]],
    ["pull", ["extension", "pull", name]],
    ["create", ["model", "create", change.head.type, "upgrade-test"]],
    ["remove", ["extension", "rm", name, "--force"]],
    [
      "source",
      ["extension", "source", "add", resolve(extDir), "--only", "models"],
    ],
  ];
  // A pull whose code fails to import is only partly applied: swamp loads
  // models file by file, so the bumped model may still load from it and
  // carry instances, and its upgrade path is tested as usual.
  let partialPull = false;
  for (const [label, args] of steps) {
    const { code, out } = await laneSwamp(lane, args, label !== "init");
    if (label === "pull" && unimportablePublish(name, code, out)) {
      log(
        `  ${extDir}: published ${name} fails to import in part; ` +
          `trying ${change.head.type} from it anyway:\n${out}`,
      );
      partialPull = true;
      continue;
    }
    if (
      label === "create" && partialPull &&
      unloadableModel(code, out, change.path)
    ) {
      log(
        `  ${extDir}: ${change.head.type} does not load from the published ` +
          `${name}, so no instance can be on it; the upgrade path from it ` +
          `is not tested, checking a fresh install instead:\n${out}`,
      );
      return await freshInstallTest(extDir, [change], shared, log);
    }
    if (code !== 0) return `${extDir}: swamp ${label} failed:\n${out}`;
  }
  // The upgrade chain runs before the method body; the method itself may
  // fail for unrelated reasons (no credentials, no cluster) and that is fine.
  // It must exist, though: an unknown method is refused before the upgrade.
  let method = change.head.firstMethod;
  if (method === undefined) {
    const described = await laneSwamp(lane, [
      "model",
      "type",
      "describe",
      change.head.type,
      "--json",
    ]);
    method = firstDescribedMethod(described.stdout);
    if (method === undefined) {
      log(
        `  ${extDir}: swamp model type describe named no method ` +
          `(exit ${described.code}), trying get:\n${described.out}`,
      );
      method = "get";
    }
  }
  await runUpgradeMethod(
    lane.repo,
    method,
    METHOD_TIMEOUT_MS,
    run,
    lane.env,
  );
  const typeVersion = await readTypeVersion(lane, "upgrade-test");
  if (typeVersion !== change.head.version) {
    return `${extDir}: published instance upgraded to ${
      typeVersion ?? "nothing"
    }, ` +
      `expected ${change.head.version}`;
  }
  log(`  ${extDir}: published instance upgraded to ${typeVersion}`);
  return null;
}

/**
 * Stands in for the path test when every bumped model in the extension only
 * adds no-op upgrade entries, which leave an instance's attributes as they
 * are: the published version must still pull (or fail only as an
 * {@link unimportablePublish}, as the full path test allows), and a fresh
 * install from the local source must be at the new version.
 */
async function noOpTest(
  extDir: string,
  change: ModelChange,
  name: string,
  shared: LaneShared,
  log: Log,
): Promise<string | null> {
  const pulled = await withLane("upgrade-pull-", shared, async (lane) => {
    const checked = await publishedCheck(extDir, name, lane, log);
    if (checked !== null) return checked;
    const init = await laneSwamp(
      lane,
      ["init", lane.repo, "--tool", "none", "--force"],
      false,
    );
    if (init.code !== 0) return `${extDir}: swamp init failed:\n${init.out}`;
    const { code, out } = await laneSwamp(lane, ["extension", "pull", name]);
    if (unimportablePublish(name, code, out)) {
      log(`  ${extDir}: published ${name} fails to import in part:\n${out}`);
    } else if (code !== 0) {
      return `${extDir}: swamp pull failed:\n${out}`;
    } else {
      log(`  ${extDir}: published ${name} pulls; only no-op upgrade entries`);
    }
    return null;
  });
  if (pulled !== null) return pulled === "skip" ? null : pulled;
  return await freshInstallTest(extDir, [change], shared, log);
}

/**
 * Stands in for the path test when the bumped model does not load from the
 * published version, and checks the bumped models the path test does not
 * exercise: an instance of each model created from the local source alone must
 * be at its new version.
 * When the local source cannot load the type, swamp falls back to the registry
 * copy, so the version check is what proves the local code loaded.
 */
async function freshInstallTest(
  extDir: string,
  changes: ModelChange[],
  shared: LaneShared,
  log: Log,
): Promise<string | null> {
  return await withLane("fresh-install-", shared, async (lane) => {
    const steps: Array<[string, string[]]> = [
      ["init", ["init", lane.repo, "--tool", "none", "--force"]],
      [
        "source",
        ["extension", "source", "add", resolve(extDir), "--only", "models"],
      ],
    ];
    for (const [label, args] of steps) {
      const { code, out } = await laneSwamp(lane, args, label !== "init");
      if (code !== 0) return `${extDir}: swamp ${label} failed:\n${out}`;
    }
    for (const [i, change] of changes.entries()) {
      const instance = `upgrade-test-${i + 1}`;
      const { code, out } = await laneSwamp(lane, [
        "model",
        "create",
        change.head.type,
        instance,
      ]);
      if (code !== 0) {
        return `${extDir}: swamp create ${change.head.type} failed:\n${out}`;
      }
      const typeVersion = await readTypeVersion(lane, instance);
      if (typeVersion !== change.head.version) {
        return `${extDir}: fresh ${change.head.type} instance is at ${
          typeVersion ?? "nothing"
        }, expected ${change.head.version}`;
      }
      log(
        `  ${extDir}: fresh ${change.head.type} instance created at ${typeVersion}`,
      );
    }
    return null;
  });
}

async function readTypeVersion(
  lane: Lane,
  instance: string,
): Promise<string | undefined> {
  const { out } = await laneSwamp(lane, [
    "model",
    "get",
    instance,
    "--json",
  ]);
  return out.match(/"typeVersion"\s*:\s*"([^"]+)"/)?.[1];
}

async function main(): Promise<number> {
  const args = parseArgs(Deno.args, {
    string: ["base", "head", "concurrency"],
    boolean: ["path-test"],
    default: { head: "HEAD" },
  });
  const concurrency = parseConcurrency(args.concurrency);
  if (!args.base || concurrency === undefined) {
    console.error(
      "usage: check_upgrades.ts --base <rev> [--head <rev>] [--path-test] " +
        `[--concurrency <1-${MAX_CONCURRENCY}>]`,
    );
    return 2;
  }

  const mergeBase = (await git(["merge-base", args.base, args.head])).trim();
  // NUL-separated and unquoted: git otherwise quotes and escapes non-ASCII
  // names, which then fail the model-file pattern and go unchecked.
  const changed = (await git([
    "-c",
    "core.quotePath=false",
    "diff",
    "--name-only",
    "--no-renames",
    "--diff-filter=AM",
    "-z",
    `${mergeBase}...${args.head}`,
  ])).split("\0").filter(isModelFile);

  const changes: ModelChange[] = [];
  for (const path of changed) {
    const source = await showAt(args.head, path) ?? "";
    const head = parseModel(source);
    if (!head) continue;
    changes.push({
      path,
      base: parseModel(await showAt(mergeBase, path) ?? ""),
      head,
      headNoOps: noOpVersions(source),
    });
  }

  if (changes.length === 0) {
    console.log("No model definitions changed; no upgrade path to check.");
    return 0;
  }

  const errors: string[] = [];
  const bumpedByExtension = new Map<string, ModelChange[]>();
  console.log(`Examined ${changes.length} changed model definition(s):`);
  for (const change of changes) {
    const verdict = checkChange(change);
    switch (verdict.kind) {
      case "new":
        console.log(`  ${change.path}: new model, no upgrade path`);
        break;
      case "unchanged":
        console.log(`  ${change.path}: version unchanged (${verdict.version})`);
        break;
      case "bumped": {
        console.log(
          `  ${change.path}: ${verdict.from} → ${verdict.to}, upgrade entry present`,
        );
        const ext = extensionDirOf(change.path);
        if (ext) {
          bumpedByExtension.set(ext, [
            ...bumpedByExtension.get(ext) ?? [],
            change,
          ]);
        }
        break;
      }
      case "error":
        console.log(`  ${change.path}: ${verdict.message}`);
        errors.push(`${change.path}: ${verdict.message}`);
    }
  }

  let pathFailures = 0;
  if (args["path-test"] && errors.length === 0) {
    const shared = bumpedByExtension.size === 0
      ? undefined
      : await laneSharedFromHost().catch((error: Error) => {
        // Nothing can be path-tested without a credential; say why once,
        // as an ordinary failure rather than a crash.
        errors.push(error.message);
        return undefined;
      });
    if (bumpedByExtension.size === 0) {
      console.log("No model version bumped; no upgrade path to test.");
    } else if (shared) {
      console.log(
        `Path-testing ${bumpedByExtension.size} extension(s), ` +
          `${concurrency} at a time, each with its own swamp home and config:`,
      );
      await runPooled(
        [...bumpedByExtension],
        concurrency,
        async ([extDir, bumped]) => {
          const lines: string[] = [];
          // The path test exercises the extension's first bumped model; the
          // others decide whether the bump is a no-op, and are each created
          // fresh so that one that does not load is caught.
          let failure: string | null;
          try {
            failure = await pathTest(
              extDir,
              bumped,
              mergeBase,
              shared,
              (line) => lines.push(line),
            );
          } catch (error) {
            // A lane that cannot be set up (a symlink refused, a full disk)
            // fails this extension, not the whole run.
            failure = `${extDir}: path test could not run: ${
              error instanceof Error ? error.message : String(error)
            }`;
          }
          return { lines, failure };
        },
        ({ lines, failure }) => {
          for (const line of lines) console.log(line);
          if (failure) {
            errors.push(failure);
            pathFailures++;
          }
        },
      );
    }
  }

  if (errors.length > 0) {
    for (const e of errors) console.error(`::error::${e}`);
    if (pathFailures > 0 && concurrency > 1) {
      console.error(
        `${pathFailures} path test failure(s) with --concurrency ${concurrency}; ` +
          "rerun with --concurrency 1 to rule out a concurrency flake.",
      );
    }
    return 1;
  }
  return 0;
}

if (import.meta.main) {
  Deno.exit(await main());
}
