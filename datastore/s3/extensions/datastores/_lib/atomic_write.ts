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

import { dirname, join } from "jsr:@std/path@1";

/**
 * Writes text content to a file atomically.
 *
 * Writes to a temporary file in the same directory, then renames to the
 * target path. This ensures the file is never left in a partially-written
 * state if the process crashes mid-write.
 */
export async function atomicWriteTextFile(
  path: string,
  content: string,
): Promise<void> {
  const dir = dirname(path);
  const tmpPath = join(dir, `.${crypto.randomUUID()}.tmp`);
  try {
    await Deno.writeTextFile(tmpPath, content);
    await Deno.rename(tmpPath, path);
  } catch (error) {
    try {
      await Deno.remove(tmpPath);
    } catch {
      // Temp file may not exist if writeTextFile failed before creating it
    }
    throw error;
  }
}

/**
 * Streams a body to a file atomically: a reader or an abort sees the earlier
 * file or the complete new one, never part of either. The temp file sits beside
 * the target under a name of its own for each call, so concurrent writers do not
 * collide, and on a failure it is removed.
 *
 * `beforeRename` runs after the whole body is on disk. When it returns false the
 * download is discarded and the target left alone. Returns whether the target
 * was replaced.
 */
export async function atomicWriteStream(
  path: string,
  body: ReadableStream<Uint8Array>,
  beforeRename?: () => Promise<boolean>,
): Promise<boolean> {
  const tmpPath = join(dirname(path), `.${crypto.randomUUID()}.tmp`);
  let file: Deno.FsFile;
  try {
    file = await Deno.open(tmpPath, { write: true, createNew: true });
  } catch (error) {
    // Nothing will read the body, so release its connection.
    await body.cancel().catch(() => {});
    throw error;
  }
  try {
    try {
      await body.pipeTo(file.writable);
    } catch (error) {
      try {
        file.close();
      } catch { /* already closed by pipeTo */ }
      throw error;
    }
    if (beforeRename && !(await beforeRename())) {
      await Deno.remove(tmpPath);
      return false;
    }
    await copyModeOf(path, tmpPath);
    await Deno.rename(tmpPath, path);
    return true;
  } catch (error) {
    try {
      await Deno.remove(tmpPath);
    } catch {
      // Already renamed or removed.
    }
    throw error;
  }
}

/** Gives `to` the mode of `from`. Windows reports no mode, so it is skipped. */
async function copyModeOf(from: string, to: string): Promise<void> {
  let mode: number | null;
  try {
    mode = (await Deno.stat(from)).mode;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return;
    throw error;
  }
  if (mode !== null) await Deno.chmod(to, mode & 0o7777);
}
