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
 * Every model it examined is printed, so a run that checked nothing says so
 * rather than passing in silence.
 *
 * Usage (from the repository root):
 *   deno run --allow-read --allow-write --allow-env --allow-run \
 *     scripts/check_upgrades.ts --base origin/main [--path-test]
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
): Promise<void> {
  await exec(
    "swamp",
    ["model", "method", "run", "upgrade-test", method],
    scratch,
    AbortSignal.timeout(timeoutMs),
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

/** Runs a command to completion, or until `signal` aborts it. */
async function run(
  cmd: string,
  args: string[],
  cwd?: string,
  signal?: AbortSignal,
): Promise<{ code: number; out: string; stdout: string; stderr: string }> {
  try {
    const { code, stdout, stderr } = await new Deno.Command(cmd, {
      args,
      cwd,
      signal,
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

async function pathTest(
  extDir: string,
  change: ModelChange,
  mergeBase: string,
): Promise<string | null> {
  const manifest = await Deno.readTextFile(join(extDir, "manifest.yaml"))
    .catch(() => null);
  const target = pathTestTarget(
    manifest,
    await showAt(mergeBase, `${extDir}/manifest.yaml`),
  );
  if (target.kind === "error") return `${extDir}: ${target.message}`;
  if (target.kind === "skip") {
    console.log(`  ${extDir}: ${target.reason}, path test skipped`);
    return null;
  }
  const info = await run("swamp", [
    "extension",
    "info",
    target.name,
    "--json",
  ]);
  const published = registryTarget(
    target.name,
    info.code,
    info.stdout,
    info.stderr,
  );
  if (published.kind === "error") return `${extDir}: ${published.message}`;
  if (published.kind === "skip") {
    console.log(`  ${extDir}: ${published.reason}, path test skipped`);
    return null;
  }
  const { name } = target;

  const scratch = await Deno.makeTempDir({ prefix: "upgrade-path-" });
  try {
    const steps: Array<[string, string[]]> = [
      ["init", ["init", scratch, "--tool", "none", "--force"]],
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
      const { code, out } = await run(
        "swamp",
        args,
        label === "init" ? undefined : scratch,
      );
      if (label === "pull" && unimportablePublish(name, code, out)) {
        console.log(
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
        console.log(
          `  ${extDir}: ${change.head.type} does not load from the published ` +
            `${name}, so no instance can be on it; the upgrade path from it ` +
            `is not tested, checking a fresh install instead:\n${out}`,
        );
        return await freshInstallTest(extDir, change);
      }
      if (code !== 0) return `${extDir}: swamp ${label} failed:\n${out}`;
    }
    // The upgrade chain runs before the method body; the method itself may
    // fail for unrelated reasons (no credentials, no cluster) and that is fine.
    // It must exist, though: an unknown method is refused before the upgrade.
    let method = change.head.firstMethod;
    if (method === undefined) {
      const described = await run("swamp", [
        "model",
        "type",
        "describe",
        change.head.type,
        "--json",
      ], scratch);
      method = firstDescribedMethod(described.stdout);
      if (method === undefined) {
        console.log(
          `  ${extDir}: swamp model type describe named no method ` +
            `(exit ${described.code}), trying get:\n${described.out}`,
        );
        method = "get";
      }
    }
    await runUpgradeMethod(scratch, method);
    const typeVersion = await readTypeVersion(scratch);
    if (typeVersion !== change.head.version) {
      return `${extDir}: published instance upgraded to ${
        typeVersion ?? "nothing"
      }, ` +
        `expected ${change.head.version}`;
    }
    console.log(`  ${extDir}: published instance upgraded to ${typeVersion}`);
    return null;
  } finally {
    await Deno.remove(scratch, { recursive: true }).catch(() => {});
  }
}

/**
 * Stands in for the path test when the bumped model does not load from the
 * published version: an instance created from the local source alone must be
 * at the new version.
 * When the local source cannot load the type, swamp falls back to the registry
 * copy, so the version check is what proves the local code loaded.
 */
async function freshInstallTest(
  extDir: string,
  change: ModelChange,
): Promise<string | null> {
  const scratch = await Deno.makeTempDir({ prefix: "fresh-install-" });
  try {
    const steps: Array<[string, string[]]> = [
      ["init", ["init", scratch, "--tool", "none", "--force"]],
      [
        "source",
        ["extension", "source", "add", resolve(extDir), "--only", "models"],
      ],
      ["create", ["model", "create", change.head.type, "upgrade-test"]],
    ];
    for (const [label, args] of steps) {
      const { code, out } = await run(
        "swamp",
        args,
        label === "init" ? undefined : scratch,
      );
      if (code !== 0) return `${extDir}: swamp ${label} failed:\n${out}`;
    }
    const typeVersion = await readTypeVersion(scratch);
    if (typeVersion !== change.head.version) {
      return `${extDir}: fresh instance is at ${typeVersion ?? "nothing"}, ` +
        `expected ${change.head.version}`;
    }
    console.log(`  ${extDir}: fresh instance created at ${typeVersion}`);
    return null;
  } finally {
    await Deno.remove(scratch, { recursive: true }).catch(() => {});
  }
}

async function readTypeVersion(scratch: string): Promise<string | undefined> {
  const { out } = await run("swamp", [
    "model",
    "get",
    "upgrade-test",
    "--json",
  ], scratch);
  return out.match(/"typeVersion"\s*:\s*"([^"]+)"/)?.[1];
}

async function main(): Promise<number> {
  const args = parseArgs(Deno.args, {
    string: ["base", "head"],
    boolean: ["path-test"],
    default: { head: "HEAD" },
  });
  if (!args.base) {
    console.error(
      "usage: check_upgrades.ts --base <rev> [--head <rev>] [--path-test]",
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
    const head = parseModel(await showAt(args.head, path) ?? "");
    if (!head) continue;
    changes.push({
      path,
      base: parseModel(await showAt(mergeBase, path) ?? ""),
      head,
    });
  }

  if (changes.length === 0) {
    console.log("No model definitions changed; no upgrade path to check.");
    return 0;
  }

  const errors: string[] = [];
  const bumpedByExtension = new Map<string, ModelChange>();
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
        if (ext && !bumpedByExtension.has(ext)) {
          bumpedByExtension.set(ext, change);
        }
        break;
      }
      case "error":
        console.log(`  ${change.path}: ${verdict.message}`);
        errors.push(`${change.path}: ${verdict.message}`);
    }
  }

  if (args["path-test"] && errors.length === 0) {
    if (bumpedByExtension.size === 0) {
      console.log("No model version bumped; no upgrade path to test.");
    }
    for (const [extDir, change] of bumpedByExtension) {
      const failure = await pathTest(extDir, change, mergeBase);
      if (failure) errors.push(failure);
    }
  }

  if (errors.length > 0) {
    for (const e of errors) console.error(`::error::${e}`);
    return 1;
  }
  return 0;
}

if (import.meta.main) {
  Deno.exit(await main());
}
