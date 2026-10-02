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
 * definition (`<extension>/extensions/models/*.ts`, generated or hand-written)
 * and, for each whose `version` changed:
 *
 * - static: the last `upgrades[].toVersion` equals the new `version`, and the
 *   new version sorts after the old one.
 * - `--path-test`: an instance created from the published extension upgrades
 *   to the new version once the local source replaces it — pull, create,
 *   remove, `extension source add`, run a method, read `typeVersion`. Run once
 *   per extension; skipped for extensions with no published version (new in
 *   the change, or not found by `swamp extension info`).
 *
 * Every model it examined is printed, so a run that checked nothing says so
 * rather than passing in silence.
 *
 * Usage (from the repository root):
 *   deno run --allow-read --allow-write --allow-env --allow-run \
 *     scripts/check_upgrades.ts --base origin/main [--path-test]
 */

import { parseArgs } from "@std/cli/parse-args";
import { join, resolve } from "@std/path";

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

/** Model definition files, not tests or shared libraries. */
export function isModelFile(path: string): boolean {
  return /(^|\/)extensions\/models\/[^/]+\.ts$/.test(path) &&
    !path.endsWith("_test.ts");
}

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

async function run(
  cmd: string,
  args: string[],
  cwd?: string,
): Promise<{ code: number; out: string; stdout: string; stderr: string }> {
  try {
    const { code, stdout, stderr } = await new Deno.Command(cmd, {
      args,
      cwd,
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
    for (const [label, args] of steps) {
      const { code, out } = await run(
        "swamp",
        args,
        label === "init" ? undefined : scratch,
      );
      if (code !== 0) return `${extDir}: swamp ${label} failed:\n${out}`;
    }
    // The upgrade chain runs before the method body; the method itself may
    // fail for unrelated reasons (no credentials, no cluster) and that is fine.
    const method = change.head.firstMethod ?? "get";
    await run(
      "swamp",
      ["model", "method", "run", "upgrade-test", method],
      scratch,
    );
    const { out } = await run("swamp", [
      "model",
      "get",
      "upgrade-test",
      "--json",
    ], scratch);
    const typeVersion = out.match(/"typeVersion"\s*:\s*"([^"]+)"/)?.[1];
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
