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
 * `storage/1` chunk storage for v3 datastores (swamp-club#3492): immutable,
 * content-addressed chunks at
 * `<prefix>/_blobs/<namespace>/sha256/<first two hex>/<sha256>`.
 *
 * - A put is one simple (`uploadType=media`) upload, never a resumable one:
 *   chunks are at most {@link MAX_CHUNK_BYTES}. GCS commits a simple upload
 *   whole or not at all, so a reader never sees a partial chunk, and an
 *   aborted put leaves no object and no resumable session behind.
 * - `has` is tuned for price; see {@link LIST_THRESHOLD}.
 * - `touch` rewrites each chunk onto itself (GcsClient.touchObject): one
 *   request per chunk and no re-upload. No batch form is cheaper.
 * - `lastModified` is always the server's `updated`.
 */

import type {
  DatastoreStorage,
  StorageCapabilities,
  StoredChunk,
} from "./interfaces.ts";
import {
  confirmGcsKeyMissing,
  type GcsClient,
  NotFoundError,
} from "./gcs_client.ts";
import { retryWithBackoff } from "./gcs_cache_sync.ts";

/**
 * Swamp cuts chunks of `min(16 MiB, maxChunkBytes)`, so 16 MiB is the
 * largest useful value, and a single simple upload carries it.
 */
export const MAX_CHUNK_BYTES = 16 * 1024 * 1024;

/**
 * `has` lists a shard instead of reading each hash's metadata once the batch
 * holds at least this many hashes for that shard: the price break-even. A
 * list is a Class A operation ($0.005 per 1,000) and a metadata GET a Class B
 * one ($0.0004 per 1,000), 12.5x apart
 * (https://cloud.google.com/storage/pricing; S3's LIST vs HEAD and
 * Cloudflare R2's $0.0045 vs $0.00036 have the same ratio). A listing also
 * costs one request per 1,000 chunks the shard already holds, so it only gets
 * dearer as the datastore grows. Retune here if pricing changes.
 */
export const LIST_THRESHOLD = 13;

/** Requests in flight at once for `has` and `touch`. */
export const REQUEST_CONCURRENCY = 16;

const SHA256_RE = /^[0-9a-f]{64}$/;

function assertNamespace(namespace: string): void {
  if (
    namespace === "" || namespace === "." || namespace === ".." ||
    namespace.includes("/") || namespace.includes("\\")
  ) {
    throw new Error(
      `storage namespace must be a single path segment, got ${
        JSON.stringify(namespace)
      }`,
    );
  }
}

function assertSha256(sha256: string): void {
  if (!SHA256_RE.test(sha256)) {
    throw new Error(
      `storage sha256 must be 64 lowercase hex characters, got ${
        JSON.stringify(sha256)
      }`,
    );
  }
}

function namespacePrefix(namespace: string): string {
  return `_blobs/${namespace}/sha256/`;
}

function shardPrefix(namespace: string, shard: string): string {
  return `${namespacePrefix(namespace)}${shard}/`;
}

function chunkKey(namespace: string, sha256: string): string {
  return `${shardPrefix(namespace, sha256.slice(0, 2))}${sha256}`;
}

/**
 * Runs `fn` over `items`, at most `limit` at once. Stops handing out work on
 * abort or once any call fails, so a failed batch sends no further requests
 * beyond those already in flight.
 */
export async function forEachBounded<T>(
  items: readonly T[],
  limit: number,
  signal: AbortSignal,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  let failed = false;
  const worker = async () => {
    while (!failed && next < items.length) {
      signal.throwIfAborted();
      const item = items[next++];
      try {
        await fn(item);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
}

export class GcsChunkStorage implements DatastoreStorage {
  readonly contract = "storage/1" as const;

  constructor(private readonly gcs: GcsClient) {}

  capabilities(): StorageCapabilities {
    return { maxChunkBytes: MAX_CHUNK_BYTES, touch: true };
  }

  async has(
    namespace: string,
    hashes: readonly string[],
    signal: AbortSignal,
  ): Promise<Set<string>> {
    signal.throwIfAborted();
    assertNamespace(namespace);
    const byShard = new Map<string, Set<string>>();
    for (const sha256 of hashes) {
      assertSha256(sha256);
      const shard = sha256.slice(0, 2);
      let set = byShard.get(shard);
      if (!set) byShard.set(shard, set = new Set());
      set.add(sha256);
    }

    const found = new Set<string>();
    const listShards: string[] = [];
    const heads: string[] = [];
    for (const [shard, set] of byShard) {
      if (set.size >= LIST_THRESHOLD) listShards.push(shard);
      else heads.push(...set);
    }

    await forEachBounded(
      listShards,
      REQUEST_CONCURRENCY,
      signal,
      async (shard) => {
        const wanted = byShard.get(shard)!;
        for await (const chunk of this.listPrefix(namespace, shard, signal)) {
          if (wanted.has(chunk.sha256)) found.add(chunk.sha256);
        }
      },
    );

    let ambiguous: { key: string; cause: unknown } | undefined;
    await forEachBounded(heads, REQUEST_CONCURRENCY, signal, async (sha256) => {
      const key = chunkKey(namespace, sha256);
      // getMetadata reads a 404 as absent and rejects on anything else.
      const meta = await retryWithBackoff(
        () => this.gcs.getMetadata(key, signal),
        { signal },
      );
      if (meta.exists) {
        found.add(sha256);
      } else {
        // GCS answers 404 for a missing bucket too; one listing settles that
        // for the whole call.
        ambiguous ??= {
          key,
          cause: new Error(`GCS answered 404 for the metadata of ${key}`),
        };
      }
    });
    if (ambiguous) {
      await confirmGcsKeyMissing(
        this.gcs,
        ambiguous.key,
        ambiguous.cause,
        signal,
      );
    }
    return found;
  }

  async put(
    namespace: string,
    sha256: string,
    bytes: Uint8Array,
    signal: AbortSignal,
  ): Promise<void> {
    signal.throwIfAborted();
    assertNamespace(namespace);
    assertSha256(sha256);
    // The upload must not see a caller's later change to the buffer.
    const body = bytes.slice();
    await retryWithBackoff(
      () => this.gcs.putObject(chunkKey(namespace, sha256), body, signal),
      { signal },
    );
  }

  async get(
    namespace: string,
    sha256: string,
    signal: AbortSignal,
  ): Promise<Uint8Array | null> {
    signal.throwIfAborted();
    assertNamespace(namespace);
    assertSha256(sha256);
    const key = chunkKey(namespace, sha256);
    try {
      const { data } = await retryWithBackoff(
        () => this.gcs.getObject(key, signal),
        { signal },
      );
      return data;
    } catch (error) {
      if (signal.aborted || !(error instanceof NotFoundError)) throw error;
      await confirmGcsKeyMissing(this.gcs, key, error, signal);
      return null;
    }
  }

  async touch(
    namespace: string,
    hashes: readonly string[],
    signal: AbortSignal,
  ): Promise<Set<string>> {
    signal.throwIfAborted();
    assertNamespace(namespace);
    for (const sha256 of hashes) assertSha256(sha256);
    const missing = new Set<string>();
    let ambiguous: { key: string; cause: unknown } | undefined;
    await forEachBounded(
      [...new Set(hashes)],
      REQUEST_CONCURRENCY,
      signal,
      async (sha256) => {
        const key = chunkKey(namespace, sha256);
        try {
          await retryWithBackoff(() => this.gcs.touchObject(key, signal), {
            signal,
          });
        } catch (error) {
          if (!(error instanceof NotFoundError)) throw error;
          ambiguous ??= { key, cause: error };
          missing.add(sha256);
        }
      },
    );
    if (ambiguous) {
      await confirmGcsKeyMissing(
        this.gcs,
        ambiguous.key,
        ambiguous.cause,
        signal,
      );
    }
    return missing;
  }

  list(namespace: string, signal: AbortSignal): AsyncIterable<StoredChunk> {
    assertNamespace(namespace);
    return this.listPrefix(namespace, undefined, signal);
  }

  async delete(
    namespace: string,
    sha256: string,
    signal: AbortSignal,
  ): Promise<void> {
    signal.throwIfAborted();
    assertNamespace(namespace);
    assertSha256(sha256);
    await retryWithBackoff(
      () =>
        this.gcs.deleteObject(chunkKey(namespace, sha256), undefined, signal),
      { signal },
    );
  }

  /**
   * The chunks under the namespace, or one shard of it, page by page. Keys
   * that are not a well-formed chunk in its own shard are skipped.
   */
  private async *listPrefix(
    namespace: string,
    shard: string | undefined,
    signal: AbortSignal,
  ): AsyncGenerator<StoredChunk> {
    const base = namespacePrefix(namespace);
    const prefix = shard === undefined ? base : shardPrefix(namespace, shard);
    let token: string | undefined;
    do {
      signal.throwIfAborted();
      const page = await retryWithBackoff(
        () => this.gcs.listObjects(prefix, token, signal),
        { signal },
      );
      for (const entry of page.entries) {
        const rest = entry.key.slice(base.length);
        const slash = rest.indexOf("/");
        const sha256 = rest.slice(slash + 1);
        if (
          !SHA256_RE.test(sha256) || rest.slice(0, slash) !== sha256.slice(0, 2)
        ) continue;
        if (!entry.updated) continue;
        yield { sha256, lastModified: entry.updated };
      }
      token = page.truncated ? page.pageToken : undefined;
    } while (token);
  }
}
