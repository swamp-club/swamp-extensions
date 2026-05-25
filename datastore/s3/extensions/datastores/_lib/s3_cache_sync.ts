// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * S3 cache sync service for the S3 datastore.
 *
 * Maintains a local cache directory and syncs with S3:
 * - On startup: pulls metadata index (lightweight manifest)
 * - On read (cache miss): fetches specific file from S3
 * - On write: writes locally first, then pushes to S3 async
 * - `sync()`: full bidirectional sync
 */

import { dirname, join, normalize, relative } from "jsr:@std/path@1";
import { ensureDir, walk } from "jsr:@std/fs@1";
import type {
  DatastoreSyncOptions,
  DatastoreSyncService,
  SyncCapabilities,
} from "./interfaces.ts";
import { type S3Client, S3OperationError } from "./s3_client.ts";
import { atomicWriteTextFile } from "./atomic_write.ts";

/**
 * Validates that a relative path resolves within the cache directory.
 * Prevents path traversal attacks from malicious S3 keys.
 */
function assertSafePath(cachePath: string, relativePath: string): string {
  const resolved = normalize(join(cachePath, relativePath));
  const normalizedCache = normalize(cachePath);
  if (
    !resolved.startsWith(normalizedCache + "/") && resolved !== normalizedCache
  ) {
    throw new Error(`Path traversal detected: ${relativePath}`);
  }
  return resolved;
}

/**
 * Filename of the sync-state sidecar used by the fast-path short-circuit
 * in `pullChanged` / `pushChanged`. Lives inside the cache directory and
 * is listed in `isInternalCacheFile` so the walker never uploads it.
 */
const SYNC_STATE_FILE = ".datastore-sync-state.json";

/**
 * Returns true for files that live inside the cache directory but must
 * NOT cross the sync boundary in either direction (push or pull).
 *
 * Excluded patterns:
 * - `.datastore-index.json` — the remote index manifest itself; pulled
 *   and pushed via dedicated code paths, never as a walked payload.
 * - `.push-queue.json` — local push-queue scratch file.
 * - `.datastore.lock` — distributed lock file; managed by the lock
 *   subsystem, must never be uploaded as data.
 * - `.datastore-sync-state.json` — fast-path sidecar recording the
 *   last-verified remote index ETag and the local-dirty flag. Never
 *   uploaded: its contents are per-machine state.
 * - basename `_catalog.db` and anything starting with `_catalog.db-`
 *   (the SQLite WAL/SHM/journal sidecars) — the local-only data catalog
 *   store. It is deliberately colocated with the data tier so it can
 *   be rebuilt from whatever the local cache holds, but the database
 *   itself is per-machine state and must never leak to the shared
 *   bucket. See swamp-club issue #29 for the bug this exclusion fixes:
 *   without it, `swamp datastore sync --push` would walk `_catalog.db*`
 *   into `toPush`, SQLite would rewrite the WAL mid-upload, and the
 *   push would fail on `_catalog.db-wal`.
 * - basename `.lock` at any depth — per-target FileLock files written
 *   by the data tier's lock subsystem (e.g.
 *   `data/<kind>/<type>/<id>/.lock`). The lock subsystem creates and
 *   deletes these directly via S3 PutObject/DeleteObject; they must
 *   not flow through cache sync because (a) the bucket listing in
 *   `discoverIndexFromBucket` would otherwise capture transient
 *   `.lock` files into the synthesized index, leaving the index
 *   referencing objects the lock subsystem deletes on release, and
 *   (b) a fresh reader hydrating from that stale index would 404 on
 *   the missing `.lock` and abort `datastore setup`. Manifests in CI
 *   as the reader's `datastore sync --pull` reporting "Current
 *   datastore type: filesystem" because setup fails to persist the
 *   datastore config to `.swamp.yaml`.
 *
 * Uses basename matching for the catalog and `.lock` patterns so the
 * filter is robust to any future change in the data tier subdirectory
 * name.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isInternalCacheFile(rel: string): boolean {
  if (
    rel === ".datastore-index.json" || rel === ".push-queue.json" ||
    rel === ".datastore.lock" || rel === SYNC_STATE_FILE
  ) {
    return true;
  }
  if (rel === "_index" || rel.startsWith("_index/")) return true;
  const base = rel.split("/").pop() ?? "";
  if (base === ".lock") return true;
  return base === "_catalog.db" || base.startsWith("_catalog.db-");
}

/**
 * Returns true for data-tier raw content files that should be skipped
 * during the first lazy hydration pull. Only files under `data/` whose
 * basename is `raw` are skipped — metadata.yaml, latest pointers, and
 * everything outside the data/ prefix are always downloaded.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isLazySkippable(rel: string): boolean {
  const parts = rel.split("/");
  return parts.length >= 3 && parts[0] === "data" &&
    parts[parts.length - 1] === "raw";
}

/**
 * Strips S3's surrounding double-quotes from an ETag so two ETags from
 * different SDK paths (HeadObject vs. PutObject) can be compared byte-
 * for-byte. `undefined` passes through.
 */
function normalizeETag(etag: string | undefined): string | undefined {
  if (!etag) return undefined;
  const m = etag.match(/^"(.*)"$/);
  return m ? m[1] : etag;
}

/**
 * Returns true when an ETag looks like a multipart-upload ETag (ends
 * with `-<partCount>`). Multipart ETags are a hash of the per-part
 * hashes, NOT the content hash, so they cannot be used as a content
 * fingerprint — any fast-path comparison must bail out and fall
 * through to a full walk. The current index payload is well under the
 * 5 MB multipart threshold, but this guard future-proofs against the
 * index outgrowing the single-part path.
 */
function isMultipartETag(etag: string | undefined): boolean {
  const n = normalizeETag(etag);
  if (!n) return true;
  return /-\d+$/.test(n);
}

/**
 * Rejects with `AbortError` if the signal is already aborted. Used at
 * phase boundaries so abort propagation doesn't have to ride on a
 * pending S3 call — the next boundary catches it first.
 */
function throwIfAborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted) {
    throw new DOMException(
      signal.reason instanceof Error ? signal.reason.message : "Aborted",
      "AbortError",
    );
  }
}

/**
 * Sleep that wakes early if the signal aborts. Used inside
 * `retryWithBackoff` so an outer sync timeout unblocks the backoff
 * sleep instead of waiting out the full delay after the caller has
 * already given up.
 */
function abortableSleep(
  ms: number,
  signal: AbortSignal | undefined,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal) signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(
        new DOMException(
          signal?.reason instanceof Error ? signal.reason.message : "Aborted",
          "AbortError",
        ),
      );
    };
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer);
        reject(
          new DOMException(
            signal.reason instanceof Error ? signal.reason.message : "Aborted",
            "AbortError",
          ),
        );
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

/**
 * Emit a trace-level timing line when `SWAMP_S3_SYNC_TRACE` is truthy.
 * Two timestamps per phase, never per-entry — matches the instrumentation
 * contract in the DEF-2 plan.
 *
 * Gated on env-var presence so tests and production stay silent by
 * default; a reporter debugging a slow sync can opt in with
 * `SWAMP_S3_SYNC_TRACE=1 swamp datastore sync`.
 */
function traceEnabled(): boolean {
  try {
    const v = Deno.env.get("SWAMP_S3_SYNC_TRACE");
    return !!v && v !== "0" && v.toLowerCase() !== "false";
  } catch {
    // `--allow-env` may be absent; stay silent rather than throw.
    return false;
  }
}
function tracePhase(phase: string, startMs: number, detail?: string): void {
  if (!traceEnabled()) return;
  const elapsedMs = Date.now() - startMs;
  const suffix = detail ? ` ${detail}` : "";
  console.debug(`[s3-sync] ${phase} ${elapsedMs}ms${suffix}`);
}

/** Metadata index entry for a file in S3. */
interface IndexEntry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
  sha256?: string;
}

/** Metadata for the partitioned index directory. */
interface PartitionMeta {
  version: 1;
  partitions: string[];
}

/** A single partition index file containing entries for one model. */
interface PartitionIndex {
  version: 1;
  entries: Record<string, IndexEntry>;
}

/** Metadata index tracking all files in the S3 datastore. */
interface DatastoreIndex {
  version: 1;
  lastPulled: string;
  entries: Record<string, IndexEntry>;
}

/** Push queue entry for files pending upload to S3. */
interface PushQueueEntry {
  relativePath: string;
  addedAt: string;
}

/** Push queue tracking files pending upload. */
interface PushQueue {
  entries: PushQueueEntry[];
}

/** TTL in ms for using the local index cache instead of fetching from S3. */
const INDEX_CACHE_TTL_MS = 60_000;

/** Default concurrent S3 downloads. */
const DEFAULT_PULL_CONCURRENCY = 50;
/** Default concurrent S3 uploads. */
const DEFAULT_PUSH_CONCURRENCY = 25;

/** When the dirty-path set exceeds this cap, fall back to a full walk. */
const DIRTY_PATHS_CAP = 200;

/** Retry budget for single-object S3 operations in the sync pipeline. */
const RETRY_MAX_ATTEMPTS = 3;
/** Base delay between retry attempts (ms). Each retry multiplies by 3. */
const RETRY_BASE_DELAY_MS = 500;
/** Jitter fraction applied to each backoff delay (±25%). */
const RETRY_JITTER_FRACTION = 0.25;

/**
 * Returns true when an error is a transient condition that should be
 * retried: request timeouts, 5xx service errors, 429 throttling, and
 * transport-level failures (connection reset, DNS, TLS handshake).
 *
 * Explicitly NOT retryable: 4xx other than 429 (bad request, auth
 * failure), PreconditionFailed (conditional write lost the race —
 * retrying would give the same answer), NoSuchBucket (config error),
 * any AbortError (caller explicitly cancelled).
 *
 * The `status == null` branch matters more than it looks. The AWS SDK
 * surfaces connection-level failures (e.g., ECONNRESET, DNS lookup
 * failure, TLS close_notify) with `name: "Http"` and no
 * `$metadata.httpStatusCode` — verified against @aws-sdk/client-s3
 * 3.1024.0. Without this branch, real network blips would not be
 * retried, defeating the whole DEF-2 premise. Auth and config errors
 * always carry a 4xx status, so treating a missing status as transient
 * is safe.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isRetryableError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  if (err.name === "AbortError") return false;
  if (err.name === "TimeoutError") return true;
  if (err instanceof S3OperationError) {
    const status = err.httpStatusCode;
    if (status === 429) return true;
    if (status != null && status >= 500 && status < 600) return true;
    if (status == null) return true;
  }
  return false;
}

/**
 * Retry `op` with exponential backoff + jitter until it succeeds, a
 * non-retryable error is thrown, or `maxAttempts` is reached.
 * Re-throws the last error if all attempts fail.
 *
 * Exported for unit tests; not part of the public extension API.
 * The `config` override exists so tests can run without paying the
 * production backoff latency. `signal` unblocks the backoff sleep on
 * abort so the outer sync timeout isn't held up waiting for a delay
 * that will never resolve into useful work.
 */
export async function retryWithBackoff<T>(
  op: () => Promise<T>,
  config?: {
    maxAttempts?: number;
    baseDelayMs?: number;
    signal?: AbortSignal;
  },
): Promise<T> {
  const maxAttempts = config?.maxAttempts ?? RETRY_MAX_ATTEMPTS;
  if (maxAttempts < 1) {
    // Guard against caller misconfiguration: maxAttempts=0 would skip
    // the loop entirely and `throw lastErr` would throw undefined.
    // Fail loudly with the actual problem instead.
    throw new Error(
      `retryWithBackoff: maxAttempts must be >= 1, got ${maxAttempts}`,
    );
  }
  const baseDelayMs = config?.baseDelayMs ?? RETRY_BASE_DELAY_MS;
  const signal = config?.signal;
  let attempt = 0;
  // `while (true)` (not `for attempt < maxAttempts`) because every
  // iteration either returns (success) or throws (exhausted budget /
  // non-retryable) — there's no meaningful "loop exhausted" state.
  // Makes the control flow honest to TypeScript without a dead
  // `throw lastErr` at the bottom.
  while (true) {
    throwIfAborted(signal);
    try {
      return await op();
    } catch (err) {
      const isLastAttempt = attempt === maxAttempts - 1;
      if (isLastAttempt || !isRetryableError(err)) throw err;
      const raw = baseDelayMs * Math.pow(3, attempt);
      const jitter = raw * RETRY_JITTER_FRACTION * (Math.random() * 2 - 1);
      const delay = Math.max(0, Math.floor(raw + jitter));
      await abortableSleep(delay, signal);
      attempt++;
    }
  }
}

/**
 * Build a batch-failure message that surfaces the actual reasons
 * things failed, not just filenames. The first 3 underlying errors are
 * included verbatim so users can tell a credential issue from a
 * network blip from a bucket misconfig without having to re-run.
 */
function formatBatchFailure(
  op: "push" | "pull",
  failures: Array<{ file: string; error: unknown }>,
): string {
  const files = failures.map((f) => f.file);
  const preview = failures.slice(0, 3).map((f) => {
    const msg = f.error instanceof Error ? f.error.message : String(f.error);
    return `  - ${f.file}: ${msg}`;
  }).join("\n");
  const more = failures.length > 3
    ? `\n  ... and ${failures.length - 3} more`
    : "";
  return `Failed to ${op} ${failures.length} file(s) ${
    op === "push" ? "to" : "from"
  } S3: ${files.join(", ")}\n${preview}${more}`;
}

/**
 * Fast-path sidecar persisted alongside the cache. Records the last
 * remote `.datastore-index.json` ETag we verified our local cache
 * against, the timestamp of that verification, and whether the local
 * cache has been written to since. The next `pullChanged` /
 * `pushChanged` HEADs the remote index and short-circuits if the
 * recorded ETag still matches and the local view hasn't drifted —
 * skipping the 1.37 MB index GET and the multi-thousand-stat walk
 * that DEF-2 traced as the bottleneck on a zero-diff sync.
 *
 * Schema is versioned so old sidecars can be ignored on upgrade
 * without a migration step (any parse failure or version mismatch
 * falls through to the slow path and rewrites the sidecar).
 */
interface DatastoreSyncStateV1 {
  version: 1;
  remoteIndexETag: string;
  lastVerifiedAt: string;
  localDirty: boolean;
}

interface DatastoreSyncStateV2 {
  version: 2;
  remoteIndexETag: string;
  lastVerifiedAt: string;
  localDirty: boolean;
  dirtyPaths: string[];
  bulkInvalidated: boolean;
  lazyPullActive: boolean;
}

type DatastoreSyncState = DatastoreSyncStateV1 | DatastoreSyncStateV2;

/** S3 cache sync service. */
export class S3CacheSyncService implements DatastoreSyncService {
  private readonly s3: S3Client;
  private readonly cachePath: string;
  private readonly indexPath: string;
  private readonly pushQueuePath: string;
  private readonly syncStatePath: string;
  private readonly pullConcurrency: number;
  private readonly pushConcurrency: number;
  private index: DatastoreIndex | null = null;
  private syncState: DatastoreSyncState | null = null;
  private syncStateLoaded = false;
  private indexMutated = false;
  private dirtyPaths: Set<string> = new Set();
  private bulkInvalidated = false;
  private lazyPullActive = false;

  constructor(
    s3: S3Client,
    cachePath: string,
    options?: {
      pullConcurrency?: number;
      pushConcurrency?: number;
    },
  ) {
    this.s3 = s3;
    this.cachePath = cachePath;
    this.indexPath = join(cachePath, ".datastore-index.json");
    this.pushQueuePath = join(cachePath, ".push-queue.json");
    this.syncStatePath = join(cachePath, SYNC_STATE_FILE);
    this.pullConcurrency = options?.pullConcurrency ?? DEFAULT_PULL_CONCURRENCY;
    this.pushConcurrency = options?.pushConcurrency ?? DEFAULT_PUSH_CONCURRENCY;
  }

  /**
   * Loads the sidecar from disk on first call and caches the result.
   * Returns null on missing file, parse failure, version mismatch, or
   * any field-shape mismatch — every fall-through case is silent and
   * leaves the slow path responsible. Bad sidecars must NEVER throw:
   * the safest fast-path failure mode is "fast path unavailable", not
   * "sync crashes on a stale sidecar".
   */
  private async loadSyncState(): Promise<DatastoreSyncState | null> {
    if (this.syncStateLoaded) return this.syncState;
    this.syncStateLoaded = true;
    try {
      const text = await Deno.readTextFile(this.syncStatePath);
      const parsed = JSON.parse(text);
      if (
        typeof parsed.remoteIndexETag === "string" &&
        typeof parsed.lastVerifiedAt === "string" &&
        typeof parsed.localDirty === "boolean"
      ) {
        if (parsed.version === 2) {
          const v2 = parsed as DatastoreSyncStateV2;
          this.syncState = v2;
          if (Array.isArray(v2.dirtyPaths)) {
            this.dirtyPaths = new Set(v2.dirtyPaths);
          }
          this.bulkInvalidated = !!v2.bulkInvalidated;
          this.lazyPullActive = !!v2.lazyPullActive;
        } else if (parsed.version === 1) {
          this.syncState = parsed as DatastoreSyncStateV1;
        }
      }
    } catch {
      // Missing/corrupt/unreadable — treat as no sidecar (safe default).
    }
    return this.syncState;
  }

  /** Persist the sidecar atomically. */
  private async writeSyncState(state: DatastoreSyncState): Promise<void> {
    this.syncState = state;
    this.syncStateLoaded = true;
    await ensureDir(this.cachePath);
    await atomicWriteTextFile(
      this.syncStatePath,
      JSON.stringify(state, null, 2),
    );
  }

  /** Build a v2 sidecar snapshot from current in-memory state. */
  private buildV2State(
    overrides?: Partial<
      Pick<
        DatastoreSyncStateV2,
        "localDirty" | "bulkInvalidated" | "lazyPullActive"
      >
    >,
  ): DatastoreSyncStateV2 {
    const current = this.syncState;
    return {
      version: 2,
      remoteIndexETag: current?.remoteIndexETag ?? "",
      lastVerifiedAt: current?.lastVerifiedAt ?? "",
      localDirty: overrides?.localDirty ?? current?.localDirty ?? false,
      dirtyPaths: [...this.dirtyPaths],
      bulkInvalidated: overrides?.bulkInvalidated ?? this.bulkInvalidated,
      lazyPullActive: overrides?.lazyPullActive ?? this.lazyPullActive,
    };
  }

  async markDirty(options?: DatastoreSyncOptions): Promise<void> {
    const current = await this.loadSyncState();
    const relPath = options?.relPath;

    if (relPath) {
      if (this.bulkInvalidated) return;
      // Normalize the path relative to cachePath. Core may pass absolute
      // or ../‑relative paths for repos that resolve outside the cache
      // dir (e.g. definitions-evaluated, outputs). Resolve and re-derive
      // the cache-relative form so the scoped walker can find the files.
      const resolved = normalize(join(this.cachePath, relPath));
      const normalizedCache = normalize(this.cachePath);
      let normalizedRel: string;
      if (
        resolved.startsWith(normalizedCache + "/") ||
        resolved === normalizedCache
      ) {
        normalizedRel = relative(this.cachePath, resolved);
      } else {
        // Path escapes cache dir — can't scope the walk to it, so
        // fall back to bulk invalidation.
        this.bulkInvalidated = true;
        await this.writeSyncState(
          this.buildV2State({ localDirty: true, bulkInvalidated: true }),
        );
        return;
      }
      if (this.dirtyPaths.has(normalizedRel)) return;
      if (this.dirtyPaths.size >= DIRTY_PATHS_CAP) {
        this.bulkInvalidated = true;
        await this.writeSyncState(
          this.buildV2State({ localDirty: true, bulkInvalidated: true }),
        );
        return;
      }
      this.dirtyPaths.add(normalizedRel);
      await this.writeSyncState(this.buildV2State({ localDirty: true }));
      return;
    }

    // No relPath — bulk invalidation (legacy path or pushFile)
    if (current?.localDirty === true && this.bulkInvalidated) return;
    this.bulkInvalidated = true;
    await this.writeSyncState(
      this.buildV2State({ localDirty: true, bulkInvalidated: true }),
    );
  }

  /**
   * Record a verified-clean state: the local cache matches the remote
   * index whose ETag is `remoteIndexETag`. Multipart ETags are
   * rejected — they aren't a content fingerprint, so saving one would
   * make every subsequent fast-path comparison succeed spuriously.
   *
   * Correctness invariant (swamp-club #168): `remoteIndexETag` MUST
   * come from the same GetObject response that delivered the bytes we
   * verified the local cache against, OR from our own PutObject
   * response for the bytes we just wrote. A standalone post-walk
   * HeadObject is TOCTOU-racy: a concurrent writer can bump the
   * remote index between our GET and our HEAD, and recording their
   * ETag as ours would mask their data on the next fast-path sync
   * until any future mutation invalidates. Callers must thread the
   * fingerprint through `pullIndex`'s return value (or use
   * `putResult.etag` in the writeback path) — never re-HEAD for it.
   *
   * `lastVerifiedAt` is forced strictly past the local index file's
   * mtime (by 1 ms when the wall clock would otherwise tie). The
   * fast-path probe uses `>=` to bail on any local edit, so a tied
   * timestamp would spuriously bail out of the happy path on fast
   * machines — paying the slow path on every second sync.
   */
  private async markSynced(remoteIndexETag: string): Promise<void> {
    const normalized = normalizeETag(remoteIndexETag);
    if (!normalized || isMultipartETag(remoteIndexETag)) return;
    let baselineMs = Date.now();
    try {
      const stat = await Deno.stat(this.indexPath);
      const mtimeMs = stat.mtime?.getTime() ?? 0;
      if (mtimeMs >= baselineMs) baselineMs = mtimeMs + 1;
    } catch {
      // No local index yet (e.g. first push against an empty cache);
      // wall-clock baseline is fine.
    }
    this.dirtyPaths.clear();
    this.bulkInvalidated = false;
    await this.writeSyncState({
      version: 2,
      remoteIndexETag: normalized,
      lastVerifiedAt: new Date(baselineMs).toISOString(),
      localDirty: false,
      dirtyPaths: [],
      bulkInvalidated: false,
      lazyPullActive: this.lazyPullActive,
    });
  }

  /**
   * Fast-path probe for `pullChanged`. Returns `0` when the sidecar
   * proves we don't need the index GET or the cache walk; returns
   * `null` to signal "fall through to the slow path" on any check
   * miss (no sidecar, multipart ETag, local index touched after last
   * verification, HEAD failure, or ETag mismatch).
   *
   * Self-healing note: when zombie-scrub (swamp-club#29) rewrites the
   * remote index, the ETag changes — so a fast-path HEAD will see a
   * mismatch and fall through to the full pull path that re-runs the
   * scrub. The fast path can never hide a needed migration.
   */
  private async tryFastPullChanged(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar) return null;
    if (
      !sidecar.remoteIndexETag || isMultipartETag(sidecar.remoteIndexETag)
    ) {
      return null;
    }
    let indexMtime: Date | null = null;
    try {
      const stat = await Deno.stat(this.indexPath);
      indexMtime = stat.mtime;
    } catch {
      return null;
    }
    if (!indexMtime) return null;
    const verifiedAt = Date.parse(sidecar.lastVerifiedAt);
    if (Number.isNaN(verifiedAt) || indexMtime.getTime() >= verifiedAt) {
      // Local index was rewritten at-or-after our last verification —
      // the sidecar can't speak for what's on disk now. `>=` (not `>`)
      // closes the second-precision filesystem hole: an mtime that
      // rounds down to the same second as `lastVerifiedAt` would
      // otherwise spuriously fast-path past a real edit.
      return null;
    }
    let head;
    try {
      head = await this.s3.headObject(".datastore-index.json", signal);
    } catch {
      return null;
    }
    if (!head.exists || !head.etag || isMultipartETag(head.etag)) return null;
    if (normalizeETag(head.etag) !== sidecar.remoteIndexETag) return null;
    return 0;
  }

  /**
   * Fast-path probe for `pushChanged`. Returns `0` when the sidecar
   * records a clean local cache and the remote index ETag still
   * matches; otherwise returns `null` so the slow path runs. Same
   * self-healing property as `tryFastPullChanged` — any remote
   * mutation invalidates the fast path automatically.
   */
  private async tryFastPushChanged(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar) return null;
    if (sidecar.localDirty) return null;
    if (
      !sidecar.remoteIndexETag || isMultipartETag(sidecar.remoteIndexETag)
    ) {
      return null;
    }
    let head;
    try {
      head = await this.s3.headObject(".datastore-index.json", signal);
    } catch {
      return null;
    }
    if (!head.exists || !head.etag || isMultipartETag(head.etag)) return null;
    if (normalizeETag(head.etag) !== sidecar.remoteIndexETag) return null;
    return 0;
  }

  /**
   * Removes zombie internal-file entries from the in-memory index.
   * Runs whenever the index is populated from disk or remote so the
   * invariant "internal files never cross the sync boundary" is
   * enforced at the persistence boundary.
   *
   * Returns true if any entries were removed. See
   * `isInternalCacheFile` for the exclusion criteria and swamp-club
   * issue #29 for the motivating bug.
   */
  private scrubIndex(): boolean {
    if (!this.index || !this.index.entries) return false;
    let mutated = false;
    for (const rel of Object.keys(this.index.entries)) {
      if (isInternalCacheFile(rel)) {
        delete this.index.entries[rel];
        mutated = true;
      }
    }
    return mutated;
  }

  /**
   * Pulls the metadata index from S3 (lightweight, single GET).
   * Uses a local cache with a 60-second TTL to avoid redundant fetches
   * during rapid command sequences.
   *
   * Pass `forceRemote: true` to bypass the local TTL cache and always
   * fetch from S3. `pushChanged()` uses this to guarantee the
   * writeback merges onto the current remote state — without it, a
   * stale local cache (< 60 s old) could silently clobber updates
   * pushed by another writer in the intervening window.
   *
   * Both entry paths (cache-hit and S3-fetch) scrub the in-memory
   * index after parsing so zombie internal-file entries never reach
   * the rest of the sync pipeline (see swamp-club#29). On the
   * S3-fetch path the local cache file is rewritten with the scrubbed
   * JSON when scrub mutated — keeping the on-disk and in-memory views
   * consistent. The cache-hit path does NOT rewrite the local file;
   * its on-disk view self-heals on the next S3 fetch.
   */
  async pullIndex(
    options?: { forceRemote?: boolean; signal?: AbortSignal },
  ): Promise<string | null> {
    const signal = options?.signal;
    // Check local cache freshness (skipped when forceRemote is set).
    // Cache-hit returns null: no remote fetch happened, so we have no
    // fingerprint the caller can safely record. The alternative —
    // HEAD'ing remote to synthesize a fingerprint — reintroduces the
    // TOCTOU race this refactor exists to close.
    if (!options?.forceRemote) {
      try {
        const stat = await Deno.stat(this.indexPath);
        const ageMs = Date.now() - (stat.mtime?.getTime() ?? 0);
        if (ageMs < INDEX_CACHE_TTL_MS && this.index === null) {
          const content = await Deno.readTextFile(this.indexPath);
          this.index = JSON.parse(content) as DatastoreIndex;
          // Scrub zombies from the in-memory view before returning.
          this.indexMutated ||= this.scrubIndex();
          return null; // Fresh enough — skip S3
        }
      } catch {
        // No local index — fetch from S3
      }
    }

    // Fetch the remote index. Only "object not found" errors (S3
    // 404 — bucket exists but no index object yet; SDK surfaces this
    // as `name === "NotFound"` or `"NoSuchKey"`) are treated as the
    // brand-new-bucket case and fall back to an empty in-memory
    // index. Any other error (auth failure, 5xx, network timeout,
    // JSON parse failure, local write failure) propagates so callers
    // abort rather than treating a transient failure as "no data" —
    // critical for `pushChanged`, which would otherwise write an
    // empty index back to the remote and wipe the real one.
    let data: Uint8Array;
    let etag: string | undefined;
    try {
      const response = await this.s3.getObject(".datastore-index.json", signal);
      data = response.data;
      etag = response.etag;
    } catch (err) {
      if (
        err instanceof Error && "name" in err &&
        (err.name === "NotFound" || err.name === "NoSuchKey")
      ) {
        // Bucket has no index file. Two sub-cases:
        //   (1) Brand-new empty bucket — fall back to an empty
        //       in-memory index, return null. Existing behaviour.
        //   (2) Bucket pre-dates the indexed-sync model and holds data
        //       under standard prefixes (data/, workflow-runs/, …) but
        //       was never written by a swamp version that publishes
        //       `.datastore-index.json`. Without discovery, hydrate
        //       reports `Hydrated: 0 pulled` and silently leaves the
        //       cache empty (swamp-club#225, residual from #220).
        // Discovery: list the bucket, filter via isInternalCacheFile,
        // build an index from the listing, publish it, and continue.
        // Functionally idempotent across racing peers (entry keys and
        // sizes match; only metadata timestamps like `lastPulled` and
        // the `lastModified` fallback differ), so the unconditional
        // PutObject is benign — see inline notes i, ii, iii below.
        return await this.discoverIndexFromBucket(signal);
      }
      throw err;
    }

    const text = new TextDecoder().decode(data);
    this.index = JSON.parse(text) as DatastoreIndex;
    await ensureDir(this.cachePath);
    // Scrub zombies, then write the local cache file. If scrub
    // mutated, write the cleaned JSON so on-disk matches in-memory.
    // Otherwise write the raw remote text to preserve the fast path
    // (no re-serialization cost).
    if (this.scrubIndex()) {
      this.indexMutated = true;
      await atomicWriteTextFile(
        this.indexPath,
        JSON.stringify(this.index, null, 2),
      );
    } else {
      await atomicWriteTextFile(this.indexPath, text);
    }
    return etag ?? null;
  }

  /**
   * Self-healing fallback for `pullIndex` when the remote
   * `.datastore-index.json` is absent. Lists the bucket, filters
   * internal cache files, builds an index from the listing, publishes
   * it, and writes the local copy — leaving the caller's slow-path
   * bookkeeping behaving identically to a normal index fetch.
   *
   * Inline-comment requirements (a future reader must not "fix" any of
   * these without understanding the trade-off):
   *
   *   i. The PutObject is unconditional. Discovery is functionally
   *      idempotent across racing peers — entry keys and sizes match
   *      (same listing in, same fields populated out), but metadata
   *      timestamps (`lastPulled`, and the `lastModified` fallback
   *      when the SDK didn't surface one) are evaluated per peer so
   *      the JSON bodies are NOT byte-identical. That's still safe:
   *      sync behaviour depends on keys + sizes, not timestamps. Do
   *      NOT add a content-fingerprint optimization here on the
   *      assumption of byte-equality. Matches the existing
   *      pushChanged writeback (see line ~1029); `If-None-Match: *`
   *      is not portable across all S3-compatible backends this
   *      extension supports (older MinIO/Spaces/R2 implement it
   *      inconsistently).
   *
   *  ii. `this.index` is set in-memory BEFORE the PutObject attempt,
   *      mirroring the existing post-fetch path's order. If PutObject
   *      throws, this.index reflects an unpublished state but no local
   *      file is written (atomicWriteTextFile happens after put), and
   *      the next forceRemote call re-triggers discovery — idempotent
   *      with no orphaned state. Do not reorder this — flipping it
   *      would diverge from the post-fetch path and complicate the
   *      mental model.
   *
   * iii. All callers of pullIndex (both pullChanged and pushChanged)
   *      inherit this fallback automatically — no separate change to
   *      pushChanged is needed. Side benefit: previously, pushChanged
   *      against an unindexed populated bucket would write an index
   *      reflecting only LOCAL files, dropping the existing remote
   *      entries from the index even though the storage still held
   *      them. With discovery here, push first builds a complete
   *      merged view, then walks local against it.
   */
  private async discoverIndexFromBucket(
    signal?: AbortSignal,
  ): Promise<string | null> {
    const discoverStart = Date.now();
    const listing = await this.s3.listAllObjects(undefined, signal);
    const filtered = listing.filter((entry) => !isInternalCacheFile(entry.key));

    // Sub-case (1): genuinely empty bucket. Preserve existing
    // brand-new-bucket semantics — empty in-memory index, no put,
    // null fingerprint.
    if (filtered.length === 0) {
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
      tracePhase("pullIndex.discover", discoverStart, "n=0");
      return null;
    }

    // Sub-case (2): bucket holds data but no index. Build entries from
    // the listing — no localMtime since nothing has been pulled yet;
    // pullChanged will reconcile mtimes as it downloads each file.
    const entries: Record<string, IndexEntry> = {};
    for (const entry of filtered) {
      entries[entry.key] = {
        key: entry.key,
        size: entry.size,
        lastModified: (entry.lastModified ?? new Date()).toISOString(),
      };
    }
    this.index = {
      version: 1,
      lastPulled: new Date().toISOString(),
      entries,
    };
    const indexJson = JSON.stringify(this.index, null, 2);
    const indexData = new TextEncoder().encode(indexJson);
    const putResult = await retryWithBackoff(
      () => this.s3.putObject(".datastore-index.json", indexData, signal),
      { signal },
    );
    await ensureDir(this.cachePath);
    await atomicWriteTextFile(this.indexPath, indexJson);
    tracePhase(
      "pullIndex.discover",
      discoverStart,
      `n=${filtered.length}`,
    );
    // The returned ETag is the raw form from the PUT response, with
    // S3's surrounding double-quotes intact (e.g. `"abc123"`). This
    // matches the post-fetch path's contract — `normalizeETag()` is
    // what callers apply for byte-level comparison against sidecar
    // values. Don't strip them here; doing so would diverge from the
    // existing fingerprint convention.
    return putResult?.etag ?? null;
  }

  /** Fetches a single file from S3 to the local cache. */
  async pullFile(
    relativePath: string,
    signal?: AbortSignal,
  ): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const { data } = await retryWithBackoff(
      () => this.s3.getObject(relativePath, signal),
      { signal },
    );
    await ensureDir(dirname(localPath));
    await Deno.writeFile(localPath, data);
  }

  /**
   * Pulls only new or modified files from S3 to the local cache.
   * Fetches the remote index, compares against local files, and only
   * downloads files that are missing locally or have a different size.
   *
   * Fast path (DEF-2): before doing any of that, HEAD the remote index
   * and compare its ETag to the sidecar; if nothing has changed since
   * the last verified-clean walk, return `0` immediately without the
   * 1.37 MB index GET or the multi-thousand-stat walk. Any fall-through
   * condition (no sidecar, ETag mismatch, multipart ETag, local index
   * mtime newer than `lastVerifiedAt`) drops into the slow path below.
   */
  async pullChanged(
    options?: DatastoreSyncOptions,
  ): Promise<number | void> {
    const signal = options?.signal;
    throwIfAborted(signal);

    const skipFastPath = this.lazyPullActive && !options?.metadataOnly;
    const fastStart = Date.now();
    const fastResult = skipFastPath
      ? null
      : await this.tryFastPullChanged(signal);
    tracePhase(
      "pullChanged.fastpath",
      fastStart,
      skipFastPath ? "skip(lazy→full)" : fastResult === 0 ? "hit" : "miss",
    );
    if (fastResult !== null) return fastResult;

    const indexStart = Date.now();
    const models = options?.context?.models;
    let indexETag: string | null;

    if (models && models.length > 0) {
      // Scoped pull: try partition files first, fall back to monolithic.
      const partitionEntries = await this.pullPartitionedIndex(models, signal);
      if (partitionEntries) {
        // Merge partition entries into the in-memory index without
        // replacing the full index — we only update the scoped entries.
        if (!this.index) {
          this.index = {
            version: 1,
            lastPulled: new Date().toISOString(),
            entries: {},
          };
        }
        for (const [rel, entry] of Object.entries(partitionEntries)) {
          this.index.entries[rel] = entry;
        }
        // No ETag from partition reads — the next unscoped pull will
        // take the slow path and self-heal the sidecar.
        indexETag = null;
      } else {
        // Partition files missing (old writer) — fall back to monolithic.
        indexETag = await this.pullIndex({ forceRemote: true, signal });
      }
    } else {
      indexETag = await this.pullIndex({ forceRemote: true, signal });
    }
    tracePhase("pullChanged.pullIndex", indexStart);

    // Metadata-only pull: skip raw content files under data/ — download
    // only metadata.yaml, latest pointers, and everything outside data/.
    // Create parent dirs for skipped files so readdir works for the
    // catalog walker.
    const metadataOnly = !!options?.metadataOnly;

    // Build list of files that need pulling
    const walkStart = Date.now();
    const toPull: string[] = [];
    const lazyDirsToCreate: Set<string> = new Set();
    for (const [rel, entry] of Object.entries(this.index?.entries ?? {})) {
      // Belt-and-suspenders: `scrubIndex` already removed internal
      // entries in `pullIndex`, but if anything re-adds a zombie
      // between the scrub and the walk, this guard still catches it.
      if (isInternalCacheFile(rel)) {
        continue;
      }
      if (metadataOnly && isLazySkippable(rel)) {
        const localPath = assertSafePath(this.cachePath, rel);
        lazyDirsToCreate.add(dirname(localPath));
        continue;
      }
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size === entry.size) {
          // File exists locally with matching size — no download needed.
          // Reconcile localMtime so pushChanged() doesn't treat it as
          // changed due to mtime drift (e.g. file was placed by migration
          // or a different machine pushed the index).
          if (
            this.index && stat.mtime &&
            entry.localMtime !== stat.mtime.toISOString()
          ) {
            this.index.entries[rel].localMtime = stat.mtime.toISOString();
          }
          continue;
        }
      } catch {
        // File doesn't exist locally — needs pull
      }
      toPull.push(rel);
    }
    await Promise.all([...lazyDirsToCreate].map((d) => ensureDir(d)));
    tracePhase("pullChanged.walk", walkStart, `toPull=${toPull.length}`);

    // Download concurrently in batches
    const downloadStart = Date.now();
    let pulled = 0;
    const failures: Array<{ file: string; error: unknown }> = [];
    for (let i = 0; i < toPull.length; i += this.pullConcurrency) {
      throwIfAborted(signal);
      const batch = toPull.slice(i, i + this.pullConcurrency);
      const results = await Promise.allSettled(
        batch.map(async (rel) => {
          await this.pullFile(rel, signal);
          try {
            const localPath = join(this.cachePath, rel);
            const stat = await Deno.stat(localPath);
            if (stat.mtime && this.index) {
              this.index.entries[rel].localMtime = stat.mtime.toISOString();
            }
          } catch {
            // Non-fatal: mtime recording is best-effort
          }
        }),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === "fulfilled") {
          pulled++;
        } else {
          failures.push({ file: batch[j], error: result.reason });
        }
      }
    }
    tracePhase("pullChanged.download", downloadStart, `pulled=${pulled}`);

    if (failures.length > 0) {
      throw new Error(formatBatchFailure("pull", failures));
    }

    // Local cache matches the remote index whose ETag we captured from
    // the `pullIndex` GET response — either the walk found zero diff
    // (`pulled === 0`) or we just downloaded the missing files
    // (`pulled > 0`). Persist THAT ETag — the one we walked against —
    // so the next `pullChanged` / `pushChanged` can take the fast path.
    // We deliberately do NOT re-HEAD: a post-walk HEAD could observe an
    // ETag from a concurrent writer's push landing during our walk,
    // and recording that ETag would mask their data on the next
    // fast-path sync (swamp-club #168). If the ETag is null (cache-hit
    // pullIndex or NotFound brand-new bucket), the sidecar is skipped —
    // next sync self-heals on the slow path.
    //
    // When `pulled > 0`, also rewrite the on-disk index with the
    // in-memory state so it carries the localMtime values we just
    // recorded for each downloaded file. Pre-fix, the on-disk file was
    // last written by `pullIndex` from the raw remote payload (carrying
    // the original pusher's local mtimes), so a subsequent fresh-process
    // `pushChanged` slow-path walk saw `existing.localMtime` (pusher's)
    // ≠ `stat.mtime` (local mtime from `Deno.writeFile`) and pushed
    // every file with byte-identical content (swamp-club #222).
    //
    // Ordering invariant — DO NOT REVERSE: `atomicWriteTextFile` MUST
    // run before `markSynced`. `markSynced` derives `lastVerifiedAt`
    // from `Deno.stat(this.indexPath).mtime + 1ms`. Reversing the order
    // captures `lastVerifiedAt` against the pre-write mtime; the
    // subsequent rewrite then bumps the index mtime forward, and the
    // next `tryFastPullChanged` probe spuriously bails on
    // `indexMtime >= verifiedAt`.
    if (indexETag) {
      try {
        if (pulled > 0 && this.index) {
          await atomicWriteTextFile(
            this.indexPath,
            JSON.stringify(this.index, null, 2),
          );
        }
        await this.markSynced(indexETag);
      } catch {
        // Non-fatal: sidecar update is opportunistic. Disk-full /
        // permissions / unmount must not turn a successful sync into
        // a failure — the sidecar is a fast-path optimization, and a
        // missed update only costs one slow-path sync next time.
      }
    }

    if (metadataOnly) {
      this.lazyPullActive = true;
      await this.writeSyncState(
        this.buildV2State({ lazyPullActive: true }),
      );
    } else if (this.lazyPullActive) {
      this.lazyPullActive = false;
      await this.writeSyncState(
        this.buildV2State({ lazyPullActive: false }),
      );
    }

    return pulled;
  }

  /**
   * Pushes a single file from the local cache to S3.
   *
   * Pessimistically marks the sidecar `localDirty: true` BEFORE the
   * upload so a crash mid-batch never strands an unpushed local
   * change behind a clean fast-path flag — the next `pushChanged`
   * will see `localDirty: true` and do the full walk. The flag is
   * cleared only by `pushChanged` after a successful index writeback.
   */
  async pushFile(
    relativePath: string,
    signal?: AbortSignal,
  ): Promise<void> {
    await this.markDirty();
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await Deno.readFile(localPath);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const sha256 = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    await retryWithBackoff(
      () => this.s3.putObject(relativePath, data, signal),
      { signal },
    );

    if (this.index) {
      const stat = await Deno.stat(localPath);
      this.index.entries[relativePath] = {
        key: relativePath,
        size: data.length,
        lastModified: new Date().toISOString(),
        localMtime: stat.mtime?.toISOString(),
        sha256,
      };
    }
  }

  /**
   * Pushes only new or modified files from the local cache to S3.
   * Compares each file's size against the index to detect changes.
   *
   * Always fetches the current remote index (bypassing the local
   * TTL cache) so that the writeback at the end of this method
   * merges new/modified entries onto remote state instead of
   * clobbering it. Without this, any client with a smaller or
   * stale local cache (e.g. a fresh reader running `datastore setup`,
   * or a writer whose cached index is < 60 s old but another writer
   * has since pushed) would overwrite the remote
   * `.datastore-index.json` with a subset of entries, leaving the
   * other writer's data orphaned. See swamp-club#30.
   */
  async pushChanged(
    options?: DatastoreSyncOptions,
  ): Promise<number | void> {
    const signal = options?.signal;
    throwIfAborted(signal);

    const fastStart = Date.now();
    const fastResult = await this.tryFastPushChanged(signal);
    tracePhase(
      "pushChanged.fastpath",
      fastStart,
      fastResult === 0 ? "hit" : "miss",
    );
    if (fastResult !== null) return fastResult;

    const indexStart = Date.now();
    const indexETag = await this.pullIndex({ forceRemote: true, signal });
    tracePhase("pushChanged.pullIndex", indexStart);

    // Build list of files that need pushing. When per-path dirty
    // tracking is available and not bulk-invalidated, walk only the
    // dirty directories instead of the entire cache.
    const walkStart = Date.now();
    const toPush: string[] = [];
    const useScopedWalk = !this.bulkInvalidated && this.dirtyPaths.size > 0;

    if (useScopedWalk) {
      for (const dirtyPath of this.dirtyPaths) {
        const absPath = join(this.cachePath, dirtyPath);
        try {
          const stat = await Deno.stat(absPath);
          if (stat.isFile) {
            if (
              !isInternalCacheFile(dirtyPath) &&
              await this.fileNeedsPush(absPath, dirtyPath)
            ) {
              toPush.push(dirtyPath);
            }
          } else if (stat.isDirectory) {
            for await (
              const entry of walk(absPath, { includeDirs: false })
            ) {
              const rel = relative(this.cachePath, entry.path);
              if (isInternalCacheFile(rel)) continue;
              if (await this.fileNeedsPush(entry.path, rel)) {
                toPush.push(rel);
              }
            }
          }
        } catch {
          // Path may have been deleted between markDirty and push
        }
      }
    } else {
      try {
        for await (
          const entry of walk(this.cachePath, { includeDirs: false })
        ) {
          const rel = relative(this.cachePath, entry.path);
          if (isInternalCacheFile(rel)) continue;
          if (await this.fileNeedsPush(entry.path, rel)) {
            toPush.push(rel);
          }
        }
      } catch {
        // Cache directory may not exist yet
      }
    }
    tracePhase("pushChanged.walk", walkStart, `toPush=${toPush.length}`);

    // Upload concurrently in batches
    const uploadStart = Date.now();
    let pushed = 0;
    const failures: Array<{ file: string; error: unknown }> = [];
    for (let i = 0; i < toPush.length; i += this.pushConcurrency) {
      throwIfAborted(signal);
      const batch = toPush.slice(i, i + this.pushConcurrency);
      const results = await Promise.allSettled(
        batch.map((rel) => this.pushFile(rel, signal)),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === "fulfilled") {
          pushed++;
        } else {
          failures.push({ file: batch[j], error: result.reason });
        }
      }
    }
    tracePhase("pushChanged.upload", uploadStart, `pushed=${pushed}`);

    if (failures.length > 0) {
      throw new Error(formatBatchFailure("push", failures));
    }

    // Push updated index if anything changed — either new files were
    // pushed OR scrubIndex removed zombie entries that need to
    // propagate to the remote (swamp-club#29 migration path).
    //
    // Wrapped in retryWithBackoff: if the per-file pushes all succeed
    // but the index write fails on a transient 5xx/timeout, we'd leave
    // the remote inconsistent with what was just uploaded (files
    // present, index unaware). Retry keeps the write-back atomic from
    // the caller's perspective.
    if ((pushed > 0 || this.indexMutated) && this.index) {
      const writebackStart = Date.now();
      if (pushed > 0) {
        this.index.lastPulled = new Date().toISOString();
      }
      const indexJson = JSON.stringify(this.index, null, 2);
      const indexData = new TextEncoder().encode(indexJson);
      const putResult = await retryWithBackoff(
        () => this.s3.putObject(".datastore-index.json", indexData, signal),
        { signal },
      );
      await atomicWriteTextFile(this.indexPath, indexJson);
      this.indexMutated = false;

      // Dual-write: partitioned index files (after monolithic for crash safety).
      // Only write partitions whose data changed during this push.
      const dirtyPartitionKeys = new Set<string>();
      for (const rel of toPush) {
        const key = S3CacheSyncService.partitionKeyFromPath(rel);
        if (key) dirtyPartitionKeys.add(key);
      }
      await this.writePartitionedIndex(
        this.index,
        signal,
        dirtyPartitionKeys.size > 0 ? dirtyPartitionKeys : undefined,
      );
      // Record the new index ETag as the verified-clean baseline so
      // the next `pushChanged` can take the fast path. The PutObject
      // response's ETag is bound to the bytes we just uploaded — it's
      // race-free. If it's missing or multipart, skip silently: a
      // post-PUT HEAD would be TOCTOU-racy (a concurrent writer could
      // push between our PUT and our HEAD, and we'd record their ETag
      // as ours), and the sidecar is opportunistic — a missed update
      // just costs one slow path next time (swamp-club #168).
      //
      // Verify local has every entry in the merged index before marking
      // clean. The walk only iterated LOCAL files — remote-only entries
      // pulled in via `pullIndex(forceRemote)` were never visited, so
      // `pushed > 0` does not imply local fully matches the merged
      // index we just wrote back. A fresh reader migrating one file
      // against a populated remote takes this branch; without the
      // verify, the sidecar would lie and the next `pullChanged` would
      // fast-path past unfetched remote-only files (swamp-club#1225).
      const etag = putResult?.etag;
      if (
        etag && !isMultipartETag(etag) &&
        await this.localHasAllRemoteEntries()
      ) {
        try {
          await this.markSynced(etag);
        } catch {
          // Non-fatal: sidecar update is opportunistic.
        }
      }
      tracePhase("pushChanged.writeback", writebackStart);
    } else if (indexETag && this.index) {
      // pushed === 0 and no writeback. The slow walk only visited
      // LOCAL files, so remote-index entries with no local counterpart
      // were never checked. Marking the sidecar clean unconditionally
      // would lie about cache state for a fresh reader against a
      // non-empty bucket and let the next `pullChanged` fast-path
      // past unfetched files (swamp-club#1225 data-loss scenario).
      //
      // Verify before recording a clean baseline by walking the
      // remote index and confirming each entry exists locally with
      // matching size. Restores the legitimate recovery path
      // (cache populated, sidecar deleted, no diffs to push).
      if (
        !isMultipartETag(indexETag) && await this.localHasAllRemoteEntries()
      ) {
        try {
          await this.markSynced(indexETag);
        } catch {
          // Non-fatal: sidecar update is opportunistic.
        }
      }
    }

    return pushed;
  }

  /**
   * Returns true iff every entry in the in-memory remote index has a
   * local file with matching size. Used by `pushChanged`'s no-writeback
   * branch to distinguish "local matches remote" from "local is missing
   * remote files" — the per-local-file walk above can't tell them
   * apart on its own.
   */
  private async localHasAllRemoteEntries(): Promise<boolean> {
    if (!this.index) return false;
    if (this.lazyPullActive) return false;
    for (const [rel, entry] of Object.entries(this.index.entries)) {
      if (isInternalCacheFile(rel)) continue;
      try {
        const localPath = assertSafePath(this.cachePath, rel);
        const stat = await Deno.stat(localPath);
        if (stat.size !== entry.size) return false;
      } catch {
        return false;
      }
    }
    return true;
  }

  /**
   * Three-branch change detection for a single file during push walk:
   * 1. Size differs → needs push
   * 2. Same size + same mtime → skip (stat-only fast path)
   * 3. Same size + different mtime → SHA-256 comparison when available
   */
  private async fileNeedsPush(
    absPath: string,
    rel: string,
  ): Promise<boolean> {
    const stat = await Deno.stat(absPath);
    const existing = this.index?.entries[rel];
    if (!existing) return true;

    if (existing.size !== stat.size) return true;

    // Same size — check mtime for fast-path skip
    if (
      existing.localMtime && stat.mtime &&
      existing.localMtime === stat.mtime.toISOString()
    ) {
      return false;
    }

    // No mtime available or not recorded — hash if available, otherwise
    // size-only skip for old index entries without sha256
    if (!stat.mtime || existing.localMtime === undefined) {
      if (!existing.sha256) return false;
    }

    // Same size, mtime differs (or unavailable) — hash if index has sha256
    if (existing.sha256) {
      const data = await Deno.readFile(absPath);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const localHash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return localHash !== existing.sha256;
    }

    // No sha256 in index, mtime differs → push
    return true;
  }

  /**
   * Derives a partition key from a relative data path, or undefined if the
   * path is not a data entry (non-data/ prefix or too few segments).
   */
  private static partitionKeyFromPath(rel: string): string | undefined {
    if (!rel.startsWith("data/")) return undefined;
    const segments = rel.split("/");
    if (segments.length < 4) return undefined;
    const prefixEnd = segments.length >= 6
      ? segments.length - 3
      : segments.length - 1;
    return segments.slice(0, prefixEnd).join("--");
  }

  /**
   * Groups index entries into partition buckets by model prefix.
   * Path structure: data/{modelType-segments}/{modelId}/{dataName}/{version}/raw
   * Partition key: segments up to (but not including) dataName, joined with --.
   */
  private static groupEntriesByPartition(
    entries: Record<string, IndexEntry>,
  ): Map<string, Record<string, IndexEntry>> {
    const partitions = new Map<string, Record<string, IndexEntry>>();

    for (const [rel, entry] of Object.entries(entries)) {
      const key = S3CacheSyncService.partitionKeyFromPath(rel);
      if (!key) continue;

      let bucket = partitions.get(key);
      if (!bucket) {
        bucket = {};
        partitions.set(key, bucket);
      }
      bucket[rel] = entry;
    }

    return partitions;
  }

  /** Derives a partition key from a SyncModelRef. */
  private static partitionKeyFromModel(
    modelType: string,
    modelId: string,
  ): string {
    return `data--${modelType.replace(/\//g, "--")}--${modelId}`;
  }

  /** Writes partitioned index files to S3 alongside the monolithic index. */
  private async writePartitionedIndex(
    index: DatastoreIndex,
    signal?: AbortSignal,
    dirtyKeys?: Set<string>,
  ): Promise<void> {
    const partitions = S3CacheSyncService.groupEntriesByPartition(
      index.entries,
    );
    if (partitions.size === 0) return;

    const partitionKeys: string[] = [];
    const writes: Promise<void>[] = [];

    for (const [key, entries] of partitions) {
      partitionKeys.push(key);
      if (dirtyKeys && !dirtyKeys.has(key)) continue;
      const partition: PartitionIndex = { version: 1, entries };
      const data = new TextEncoder().encode(JSON.stringify(partition, null, 2));
      writes.push(
        retryWithBackoff(
          () => this.s3.putObject(`_index/${key}.json`, data, signal),
          { signal },
        ).then(() => {}).catch(() => {
          // Non-fatal: partition files are an optimization. Old clients
          // read monolithic. New clients fall back to monolithic on miss.
        }),
      );
    }

    const meta: PartitionMeta = { version: 1, partitions: partitionKeys };
    const metaData = new TextEncoder().encode(JSON.stringify(meta, null, 2));
    writes.push(
      retryWithBackoff(
        () => this.s3.putObject("_index/_meta.json", metaData, signal),
        { signal },
      ).then(() => {}).catch(() => {
        // Non-fatal: _meta.json is advisory.
      }),
    );

    await Promise.allSettled(writes);
  }

  /**
   * Reads partition files for specific models. Returns merged entries
   * or null if any partition file is missing (triggers monolithic fallback).
   * Does NOT affect the ETag chain — the monolithic index ETag remains
   * the fast-path fingerprint.
   */
  private async pullPartitionedIndex(
    models: ReadonlyArray<{ modelType: string; modelId: string }>,
    signal?: AbortSignal,
  ): Promise<Record<string, IndexEntry> | null> {
    const merged: Record<string, IndexEntry> = {};

    for (const model of models) {
      const key = S3CacheSyncService.partitionKeyFromModel(
        model.modelType,
        model.modelId,
      );
      try {
        const { data } = await this.s3.getObject(
          `_index/${key}.json`,
          signal,
        );
        const text = new TextDecoder().decode(data);
        const partition = JSON.parse(text) as PartitionIndex;
        if (partition.version !== 1) return null;
        for (const [rel, entry] of Object.entries(partition.entries)) {
          merged[rel] = entry;
        }
      } catch {
        // Partition file missing (old writer) — fall back to monolithic
        return null;
      }
    }

    return merged;
  }

  capabilities(): SyncCapabilities {
    return { scopedSync: true, lazyHydration: true };
  }

  async hydrateFile(
    relPath: string,
    options?: DatastoreSyncOptions,
  ): Promise<boolean> {
    try {
      await this.pullFile(relPath, options?.signal);
      return true;
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "NotFound" || error.name === "NoSuchKey")
      ) {
        return false;
      }
      throw error;
    }
  }
}
