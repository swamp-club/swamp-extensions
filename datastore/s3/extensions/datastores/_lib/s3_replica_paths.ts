// Copyright (C) 2026 Elder Swamp Club, Inc.
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

/**
 * The Litestream lineage paths of a v3 datastore on S3, under
 * `<prefix>/_litestream/<fence>/` (swamp-club#3531). Swamp removes the path
 * of a lineage a takeover replaced; `storage/1` is chunk-keyed and cannot
 * reach these objects.
 *
 * @module
 */

import type { ReplicaPathStore } from "./interfaces.ts";
import type { S3Client } from "./s3_client.ts";
import { forEachBounded, REQUEST_CONCURRENCY } from "./s3_storage.ts";

/** Where Litestream's lineage paths live, under the datastore root. */
const LITESTREAM_ROOT = "_litestream/";

/** Digits a fence is padded to: the width swamp writes. */
const FENCE_DIGITS = 12;

/**
 * Why `value` is not a padded fence, or undefined when it is one: exactly
 * 12 ASCII digits, from `000000000001`. The same rule swamp applies
 * (`replicaPathFenceProblem` in `@swamp-club/swamp-testing`); a fence this
 * refuses is never removed.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function replicaPathFenceProblem(value: unknown): string | undefined {
  if (typeof value !== "string") return "a fence must be a string";
  if (value.length !== FENCE_DIGITS || !/^[0-9]+$/.test(value)) {
    return `a fence must be exactly ${FENCE_DIGITS} digits`;
  }
  if (Number(value) < 1) return "a fence must be from 1";
  return undefined;
}

/** The client calls the store makes, so tests can stand one in. */
export type ReplicaPathClient = Pick<
  S3Client,
  "listCommonPrefixes" | "listObjects" | "deleteObject"
>;

export class S3ReplicaPathStore implements ReplicaPathStore {
  constructor(private readonly s3: ReplicaPathClient) {}

  /**
   * The fence directories under `_litestream/`, from one delimiter listing
   * (a request per 1,000 directories, not per object).
   */
  async list(signal: AbortSignal): Promise<string[]> {
    const dirs = await this.s3.listCommonPrefixes(LITESTREAM_ROOT, signal);
    const names: string[] = [];
    for (const dir of dirs) {
      if (!dir.startsWith(LITESTREAM_ROOT)) continue;
      const name = dir.slice(LITESTREAM_ROOT.length).replace(/\/$/, "");
      if (name !== "" && !name.includes("/")) names.push(name);
    }
    return names;
  }

  /**
   * Deletes every object under `_litestream/<fence>/`. Each round lists one
   * page from the start of the fence's path and deletes it, until a listing
   * comes back empty. The trailing slash keeps a look-alike directory such
   * as `<fence>-old/` out, and every key is checked to be under the fence's
   * path before it is deleted. A malformed fence is refused before any
   * request. An object that is listed again after it was deleted (an
   * endpoint that acknowledges deletes without making them) fails the call
   * rather than looping.
   */
  async removePath(fence: string, signal: AbortSignal): Promise<void> {
    const problem = replicaPathFenceProblem(fence);
    if (problem !== undefined) {
      throw new Error(`Refusing to remove the replica path: ${problem}.`);
    }
    const dir = `${LITESTREAM_ROOT}${fence}/`;
    const deleted = new Set<string>();
    while (true) {
      signal.throwIfAborted();
      const page = await this.s3.listObjects(dir, undefined, signal);
      const keys = page.entries.map((entry) => entry.key).filter((key) =>
        key.startsWith(dir)
      );
      if (keys.length === 0) return;
      const again = keys.find((key) => deleted.has(key));
      if (again !== undefined) {
        throw new Error(
          `Removing replica path ${dir}: ${again} is still listed after it ` +
            `was deleted`,
        );
      }
      await forEachBounded(keys, REQUEST_CONCURRENCY, signal, async (key) => {
        await this.s3.deleteObject(key, signal);
        deleted.add(key);
      });
    }
  }
}
