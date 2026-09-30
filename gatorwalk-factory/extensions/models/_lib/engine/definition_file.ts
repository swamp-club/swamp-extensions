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
