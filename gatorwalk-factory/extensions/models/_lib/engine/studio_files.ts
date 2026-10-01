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

// ---------------------------------------------------------------------------
// The file access the studio server and its watcher need, as a small
// interface, so the unit tests run the same rules on an in-memory repo
// (fake_swamp.ts, memoryRepo). The studio only reads.
// ---------------------------------------------------------------------------

/** What an lstat reports; null when nothing, not even a dangling link, is there. */
export interface PathKind {
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

/** The file-system operations the studio needs. */
export interface RepoFiles {
  /** The path with every symlink followed; throws if it does not resolve. */
  realPath(path: string): Promise<string>;
  lstat(path: string): Promise<PathKind | null>;
  readTextFile(path: string): Promise<string>;
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
};
