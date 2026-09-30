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

import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  SEPARATOR,
} from "jsr:@std/path@1.1.4";
import { parse as parseYaml } from "jsr:@std/yaml@1.0.10";

// ---------------------------------------------------------------------------
// A factory's definition lives in one file in the repo, named by a
// repo-relative path in the factory's globalArguments. This module is the
// one place that path is checked, and the file read or created.
//
// A path is refused, with the path in the message, when it is absolute, does
// not end in .yaml or .yml, or resolves outside the repo, lexically or after
// following symlinks. Reading also refuses a missing file. A remote worker
// runs a method in a scratch directory with no repo checkout, so there the
// file is always missing; the error says so when the directory is not a swamp
// repo.
//
// File access goes through RepoFiles, so the unit tests, which may only read,
// use an in-memory repo.
// ---------------------------------------------------------------------------

/** What an lstat reports; null when nothing, not even a dangling link, is there. */
export interface PathKind {
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

/** The file-system operations the definition file needs. */
export interface RepoFiles {
  /** The path with every symlink followed; throws if it does not resolve. */
  realPath(path: string): Promise<string>;
  lstat(path: string): Promise<PathKind | null>;
  readTextFile(path: string): Promise<string>;
  /** Creates the directory and any missing parents. */
  mkdir(path: string): Promise<void>;
  /** Writes a new file; throws if anything is already at the path. */
  writeNewTextFile(path: string, text: string): Promise<void>;
  /** The names in a directory; throws if it is not one. */
  readDir(path: string): Promise<string[]>;
}

export const denoRepoFiles: RepoFiles = {
  realPath: (path) => Deno.realPath(path),
  async lstat(path) {
    try {
      const info = await Deno.lstat(path);
      return {
        isFile: info.isFile,
        isDirectory: info.isDirectory,
        isSymlink: info.isSymlink,
      };
    } catch (error) {
      // A regular file on the way (a/b.yaml where a is a file) means nothing
      // can be there either.
      if (
        error instanceof Deno.errors.NotFound ||
        error instanceof Deno.errors.NotADirectory
      ) return null;
      throw error;
    }
  },
  readTextFile: (path) => Deno.readTextFile(path),
  mkdir: (path) => Deno.mkdir(path, { recursive: true }),
  writeNewTextFile: (path, text) =>
    Deno.writeTextFile(path, text, { createNew: true }),
  async readDir(path) {
    const names: string[] = [];
    for await (const entry of Deno.readDir(path)) names.push(entry.name);
    return names;
  },
};

/** Where factory definition files live by convention. */
export const DEFINITION_DIR = "factories";

function inside(root: string, path: string): boolean {
  const rel = relative(root, path);
  return rel !== ".." && !rel.startsWith(`..${SEPARATOR}`) && !isAbsolute(rel);
}

function refuse(path: string, why: string): Error {
  return new Error(`definition file '${path}' ${why}`);
}

/**
 * The absolute path of a definition file, after the checks every use shares:
 * relative, .yaml or .yml, and inside the repo lexically. The symlink checks
 * need the file system and differ between reading and creating.
 */
function lexicalPath(repoDir: string, path: string): string {
  if (path.trim() === "") {
    throw new Error("the factory's definition path is empty");
  }
  if (isAbsolute(path)) {
    throw refuse(path, "is absolute; give a path relative to the repo");
  }
  if (!/\.ya?ml$/.test(path)) {
    throw refuse(
      path,
      "is not a YAML file; the path must end in .yaml or .yml",
    );
  }
  const full = resolve(repoDir, path);
  if (!inside(repoDir, full)) throw refuse(path, "is outside the repo");
  return full;
}

async function notInRepo(files: RepoFiles, repoDir: string) {
  return await files.lstat(join(repoDir, ".swamp")) === null;
}

/**
 * The real path of an existing definition file, every symlink followed,
 * refused unless it stays inside the repo. Callers use this path, so a symlink
 * swapped after the check cannot redirect them.
 */
export async function resolveDefinitionPath(
  repoDir: string,
  path: string,
  files: RepoFiles = denoRepoFiles,
): Promise<string> {
  const full = lexicalPath(repoDir, path);
  let real: string | undefined;
  try {
    real = await files.realPath(full);
  } catch {
    // Missing, or a symlink to nothing: either way there is no file.
  }
  if (real === undefined) {
    if (await notInRepo(files, repoDir)) {
      throw refuse(
        path,
        `does not exist: ${repoDir} is not a swamp repo, so this is likely ` +
          "a remote worker or a serve host with no repo checkout. Start the " +
          "work item where the repo is.",
      );
    }
    throw refuse(path, "does not exist");
  }
  if (!inside(await files.realPath(repoDir), real)) {
    throw refuse(path, `resolves outside the repo (to ${real})`);
  }
  const kind = await files.lstat(real);
  if (kind === null || !kind.isFile) throw refuse(path, "is not a file");
  return real;
}

/** The definition file's parsed YAML, unchecked. */
export async function readDefinitionFile(
  repoDir: string,
  path: string,
  files: RepoFiles = denoRepoFiles,
): Promise<unknown> {
  const real = await resolveDefinitionPath(repoDir, path, files);
  const text = await files.readTextFile(real);
  let parsed: unknown;
  try {
    parsed = parseYaml(text);
  } catch (error) {
    throw refuse(
      path,
      `is not valid YAML: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  if (parsed === null || parsed === undefined) throw refuse(path, "is empty");
  return parsed;
}

/**
 * Create a definition file with the given text, and its directories. Refused
 * when anything, even a dangling symlink, is already at the path, or when
 * the nearest existing directory above it resolves outside the repo.
 */
export async function writeNewDefinitionFile(
  repoDir: string,
  path: string,
  text: string,
  files: RepoFiles = denoRepoFiles,
): Promise<string> {
  const full = lexicalPath(repoDir, path);
  if (await files.lstat(full) !== null) {
    throw refuse(
      path,
      "already exists; init never overwrites it. Edit it, or remove it " +
        "and run init again.",
    );
  }
  let ancestor = dirname(full);
  while (await files.lstat(ancestor) === null) {
    const up = dirname(ancestor);
    if (up === ancestor) break;
    ancestor = up;
  }
  let realAncestor: string;
  try {
    realAncestor = await files.realPath(ancestor);
  } catch {
    throw refuse(path, `cannot be created: ${ancestor} is a broken symlink`);
  }
  if (!inside(await files.realPath(repoDir), realAncestor)) {
    throw refuse(path, `resolves outside the repo (through ${realAncestor})`);
  }
  if ((await files.lstat(realAncestor))?.isDirectory !== true) {
    throw refuse(path, `cannot be created: ${ancestor} is not a directory`);
  }
  // Created under the resolved directory, so a symlink swapped after the
  // check cannot redirect the write.
  const target = join(realAncestor, relative(ancestor, full));
  await files.mkdir(dirname(target));
  await files.writeNewTextFile(target, text);
  return target;
}

// ---------------------------------------------------------------------------
// Saved scenarios (scenario.ts) live in scenarios/<factory>/ at the repo root,
// one YAML file each. They are read with the same checks as a definition
// file: nothing is read from outside the repo, symlinks included.
// ---------------------------------------------------------------------------

/** Where a factory's saved scenarios live, under the repo root. */
export const SCENARIO_DIR = "scenarios";

/** One scenario file: its parsed YAML, unchecked, or why it cannot be read. */
export type ScenarioFile =
  | { path: string; ok: true; raw: unknown }
  | { path: string; ok: false; error: string };

/**
 * Every .yaml and .yml file in scenarios/<factory>/, in name order. No
 * directory means no scenarios. A directory that is not one, or resolves
 * outside the repo, throws; a file that cannot be read is returned with its
 * error, so the caller can report every file at once.
 */
export async function readScenarioFiles(
  repoDir: string,
  factory: string,
  files: RepoFiles = denoRepoFiles,
): Promise<ScenarioFile[]> {
  const dirPath = `${SCENARIO_DIR}/${factory}`;
  const refuseDir = (why: string) =>
    new Error(`scenarios directory '${dirPath}' ${why}`);
  if (
    factory === "" || factory === "." || factory === ".." ||
    factory.includes("/") || factory.includes("\\")
  ) {
    throw refuseDir("is not a directory name");
  }
  const full = resolve(repoDir, SCENARIO_DIR, factory);
  if (!inside(repoDir, full)) throw refuseDir("is outside the repo");
  if (await files.lstat(full) === null) return [];
  let real: string;
  try {
    real = await files.realPath(full);
  } catch {
    // A symlink to nothing: no scenarios either.
    return [];
  }
  const realRepo = await files.realPath(repoDir);
  if (!inside(realRepo, real)) {
    throw refuseDir(`resolves outside the repo (to ${real})`);
  }
  if ((await files.lstat(real))?.isDirectory !== true) {
    throw refuseDir("is not a directory");
  }
  const names = (await files.readDir(real))
    .filter((name) => /\.ya?ml$/.test(name))
    .sort();
  const out: ScenarioFile[] = [];
  for (const name of names) {
    const path = `${dirPath}/${name}`;
    const fail = (error: string): ScenarioFile => ({ path, ok: false, error });
    let file: string;
    try {
      file = await files.realPath(join(real, name));
    } catch {
      out.push(fail("is a symlink to nothing"));
      continue;
    }
    if (!inside(realRepo, file)) {
      out.push(fail(`resolves outside the repo (to ${file})`));
      continue;
    }
    if ((await files.lstat(file))?.isFile !== true) {
      out.push(fail("is not a file"));
      continue;
    }
    let raw: unknown;
    try {
      raw = parseYaml(await files.readTextFile(file));
    } catch (error) {
      out.push(fail(
        `is not valid YAML: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ));
      continue;
    }
    out.push({ path, ok: true, raw });
  }
  return out;
}
