// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import * as nativePath from "jsr:@std/path@1";

/**
 * The path functions the containment checks use. Defaults to the native
 * module; tests pass `jsr:@std/path@1/windows` or `/posix` explicitly so the
 * Windows behavior is covered on any host (swamp-club#2573).
 */
export interface PathFunctions {
  readonly SEPARATOR: string;
  isAbsolute(path: string): boolean;
  join(...paths: string[]): string;
  normalize(path: string): string;
  relative(from: string, to: string): string;
}

/**
 * Whether `target` is `dir` itself or inside it. Uses `relative()` so the
 * platform's separator, case rules and volumes apply: a sibling sharing a
 * name prefix (`cache-evil`) yields `..`, and another drive or UNC share
 * yields an absolute path, so both are outside.
 */
export function isWithinDir(
  dir: string,
  target: string,
  path: PathFunctions = nativePath,
): boolean {
  const rel = path.relative(dir, target);
  if (rel === "") return true;
  if (rel === ".." || rel.startsWith(".." + path.SEPARATOR)) return false;
  return !path.isAbsolute(rel);
}

/**
 * Resolves a cache-relative path against `dir` and returns it, or throws when
 * it escapes `dir`.
 */
export function resolveWithinDir(
  dir: string,
  relativePath: string,
  path: PathFunctions = nativePath,
): string {
  const resolved = path.normalize(path.join(dir, relativePath));
  if (!isWithinDir(dir, resolved, path)) {
    throw new Error(`Path traversal detected: ${relativePath}`);
  }
  return resolved;
}

/**
 * Converts a platform-relative path to the `/`-separated form used for
 * object keys and index entries.
 */
export function toKeyPath(
  rel: string,
  path: PathFunctions = nativePath,
): string {
  return path.SEPARATOR === "/" ? rel : rel.split(path.SEPARATOR).join("/");
}

/**
 * The `/`-separated path of `target` relative to `dir`, or undefined when
 * `target` is outside `dir`.
 */
export function cacheRelativeKey(
  dir: string,
  target: string,
  path: PathFunctions = nativePath,
): string | undefined {
  if (!isWithinDir(dir, target, path)) return undefined;
  return toKeyPath(path.relative(dir, target), path);
}
