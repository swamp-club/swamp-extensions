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
