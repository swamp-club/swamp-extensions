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
 * Runs a group of build checks for the directories a change touches.
 *
 * The checks themselves are data, in `verification/checks.yaml`; this script
 * knows nothing about any repository's layout. Each group has command
 * templates and targets, and a target is a directory the commands run in:
 *
 * - `{name}` placeholders in a command are filled from the target's `vars`,
 *   and a target's own `commands` add to or replace its group's.
 * - A target runs when a changed path starts with one of its `triggers`
 *   (default `<dir>/`), or for every target with `--all`.
 * - A `*` segment in `dir` expands to every matching directory that contains
 *   the target's `marker` file, each triggered by its own changes.
 * - Targets resolving to the same directory merge their commands.
 *
 * Commands run under bash with the flags GitHub-compatible runners use for
 * `shell: bash`, from the target directory.
 *
 * Usage (from the repository root):
 *   deno run --allow-read --allow-write --allow-env --allow-run --allow-net \
 *     scripts/run_checks.ts --group <group> --base origin/main \
 *       [--head HEAD] [--all] [--concurrency 4] [--dry-run] \
 *       [--config verification/checks.yaml]
 */

import { parseArgs } from "@std/cli/parse-args";
import { join } from "@std/path";
import { parse as parseYaml } from "@std/yaml";
import { z } from "zod";

// -- Configuration ------------------------------------------------------------

const CommandsSchema = z.record(z.string(), z.string());

const TargetSchema = z.object({
  dir: z.string().min(1),
  marker: z.string().optional(),
  triggers: z.array(z.string()).optional(),
  vars: z.record(z.string(), z.string()).optional(),
  commands: CommandsSchema.optional(),
}).strict();

const GroupSchema = z.object({
  commands: CommandsSchema.optional(),
  targets: z.array(TargetSchema),
}).strict();

export const ChecksConfigSchema = z.object({
  /** Major.minor the repo targets; a different Deno only warns. */
  denoVersion: z.string().optional(),
  groups: z.record(z.string(), GroupSchema),
}).strict();

export type ChecksConfig = z.infer<typeof ChecksConfigSchema>;
export type TargetSpec = z.infer<typeof TargetSchema>;

export const DEFAULT_CONFIG = "verification/checks.yaml";

export function parseChecksConfig(text: string): ChecksConfig {
  return ChecksConfigSchema.parse(parseYaml(text));
}

export async function loadChecksConfig(
  path = DEFAULT_CONFIG,
): Promise<ChecksConfig> {
  return parseChecksConfig(await Deno.readTextFile(path));
}

// -- Planning (pure) ----------------------------------------------------------

/** A directory to check and the commands to run there. */
export interface PlannedTarget {
  dir: string;
  commands: Array<{ name: string; run: string }>;
}

/** Fills `{name}` placeholders, refusing any the target does not define. */
export function fillTemplate(
  template: string,
  vars: Readonly<Record<string, string>>,
  where: string,
): string {
  return template.replace(/\{(\w+)\}/g, (_whole, key: string) => {
    if (!(key in vars)) {
      throw new Error(`${where}: command uses {${key}} but no var sets it`);
    }
    return vars[key];
  });
}

/**
 * The concrete directories a target spec names.
 *
 * `listDirs(path)` returns the subdirectory names of `path` and
 * `hasFile(path)` says whether a file exists; both are injected so planning
 * stays pure.
 */
export function expandDir(
  spec: TargetSpec,
  listDirs: (path: string) => string[],
  hasFile: (path: string) => boolean,
): string[] {
  const segments = spec.dir.split("/");
  if (!segments.includes("*")) return [spec.dir];

  let dirs = [""];
  for (const segment of segments) {
    dirs = segment === "*"
      ? dirs.flatMap((d) => listDirs(d || ".").map((n) => d ? `${d}/${n}` : n))
      : dirs.map((d) => d ? `${d}/${segment}` : segment);
  }
  return dirs
    .filter((d) => !spec.marker || hasFile(`${d}/${spec.marker}`))
    .sort();
}

function triggered(
  dir: string,
  triggers: readonly string[] | undefined,
  changed: readonly string[],
): boolean {
  const prefixes = triggers ?? [dir === "." ? "" : `${dir}/`];
  return changed.some((file) => prefixes.some((p) => file.startsWith(p)));
}

/** The directories a change needs checked for one group, with commands. */
export function planChecks(
  config: ChecksConfig,
  group: string,
  changed: readonly string[],
  options: {
    all?: boolean;
    listDirs: (path: string) => string[];
    hasFile: (path: string) => boolean;
    /** Whether a directory exists; defaults to true. */
    isDir?: (path: string) => boolean;
  },
): PlannedTarget[] {
  const spec = config.groups[group];
  if (!spec) {
    throw new Error(
      `no group ${group}; known groups: ${
        Object.keys(config.groups).join(", ")
      }`,
    );
  }

  const planned = new Map<string, Map<string, string>>();
  for (const target of spec.targets) {
    const templates = { ...spec.commands, ...target.commands };
    for (const dir of expandDir(target, options.listDirs, options.hasFile)) {
      // A target whose directory the change deleted has nothing left to check.
      if (options.isDir && !options.isDir(dir)) continue;
      if (!options.all && !triggered(dir, target.triggers, changed)) continue;
      const commands = planned.get(dir) ?? new Map<string, string>();
      for (const [name, template] of Object.entries(templates)) {
        commands.set(
          name,
          fillTemplate(template, target.vars ?? {}, `${group}/${dir}/${name}`),
        );
      }
      planned.set(dir, commands);
    }
  }

  return [...planned].map(([dir, commands]) => ({
    dir,
    commands: [...commands].map(([name, run]) => ({ name, run })),
  }));
}

// -- Execution ----------------------------------------------------------------

interface CommandResult {
  label: string;
  passed: boolean;
  output: string;
}

async function runCommand(
  root: string,
  dir: string,
  command: { name: string; run: string },
): Promise<CommandResult> {
  const label = `${dir} ${command.name}`;
  try {
    const { code, stdout, stderr } = await new Deno.Command("bash", {
      args: ["--noprofile", "--norc", "-eo", "pipefail", "-c", command.run],
      cwd: join(root, dir),
      stdout: "piped",
      stderr: "piped",
    }).output();
    const decoder = new TextDecoder();
    return {
      label,
      passed: code === 0,
      output: `$ ${command.run}\n${decoder.decode(stdout)}${
        decoder.decode(stderr)
      }`,
    };
  } catch (err) {
    return { label, passed: false, output: `$ ${command.run}\n${err}` };
  }
}

async function changedFiles(base: string, head: string): Promise<string[]> {
  const { code, stdout, stderr } = await new Deno.Command("git", {
    args: [
      "-c",
      "core.quotePath=false",
      "diff",
      "--name-only",
      "--no-renames",
      "-z",
      `${base}...${head}`,
    ],
    stdout: "piped",
    stderr: "piped",
  }).output();
  if (code !== 0) {
    throw new Error(
      `git diff ${base}...${head} failed: ${new TextDecoder().decode(stderr)}`,
    );
  }
  // NUL-separated and unquoted: git otherwise quotes and escapes non-ASCII
  // names, which then match no directory prefix.
  return new TextDecoder().decode(stdout).split("\0").filter(Boolean);
}

/** Filesystem probes for `planChecks`, relative to `root`. */
export function fsProbes(root: string) {
  return {
    listDirs: (path: string) => {
      try {
        return [...Deno.readDirSync(join(root, path))]
          .filter((e) => e.isDirectory && !e.name.startsWith("."))
          .map((e) => e.name);
      } catch {
        return [];
      }
    },
    hasFile: (path: string) => {
      try {
        return Deno.statSync(join(root, path)).isFile;
      } catch {
        return false;
      }
    },
    isDir: (path: string) => {
      try {
        return Deno.statSync(join(root, path)).isDirectory;
      } catch {
        return false;
      }
    },
  };
}

async function main(): Promise<number> {
  const args = parseArgs(Deno.args, {
    string: ["group", "base", "head", "concurrency", "config"],
    boolean: ["all", "dry-run"],
    default: { head: "HEAD", concurrency: "4", config: DEFAULT_CONFIG },
  });
  if (!args.group || (!args.base && !args.all)) {
    console.error(
      "usage: run_checks.ts --group <group> (--base <rev> [--head <rev>] | --all) " +
        "[--concurrency <n>] [--dry-run] [--config <path>]",
    );
    return 2;
  }

  const root = Deno.cwd();
  const config = await loadChecksConfig(args.config);
  const changed = args.base ? await changedFiles(args.base, args.head) : [];
  const targets = planChecks(config, args.group, changed, {
    all: args.all,
    ...fsProbes(root),
  });
  if (targets.length === 0) {
    console.log(`No ${args.group} directories changed; nothing to check.`);
    return 0;
  }
  if (args["dry-run"]) {
    for (const t of targets) {
      console.log(
        `CHECK: ${t.dir} ${t.commands.map((c) => c.name).join(", ")}`,
      );
    }
    return 0;
  }

  if (config.denoVersion) {
    const running = Deno.version.deno;
    if (!`${running}.`.startsWith(`${config.denoVersion}.`)) {
      console.log(
        `::warning::the repo targets deno ${config.denoVersion}; running under ${running}`,
      );
    }
  }

  const queue = targets.flatMap((t) =>
    t.commands.map((c) => ({ dir: t.dir, command: c }))
  );
  const results: CommandResult[] = [];
  const limit = Math.max(1, Number(args.concurrency) || 1);
  await Promise.all(
    Array.from({ length: limit }, async () => {
      for (let item = queue.shift(); item; item = queue.shift()) {
        const result = await runCommand(root, item.dir, item.command);
        // Printed whole on completion so concurrent commands do not interleave.
        console.log(`=== ${result.label}\n${result.output}`);
        results.push(result);
      }
    }),
  );

  console.log("\n=== Summary");
  for (const r of results.sort((a, b) => a.label.localeCompare(b.label))) {
    console.log(`CHECK: ${r.label} ${r.passed ? "passed" : "failed"}`);
  }
  const failed = results.filter((r) => !r.passed);
  if (failed.length > 0) {
    console.error(`::error::${failed.length} ${args.group} check(s) failed`);
    return 1;
  }
  console.log(`All ${results.length} ${args.group} check(s) passed`);
  return 0;
}

if (import.meta.main) {
  Deno.exit(await main());
}
