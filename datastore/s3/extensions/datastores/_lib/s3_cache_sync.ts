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
import { ensureDir } from "jsr:@std/fs@1";
import { SpanStatusCode, trace } from "npm:@opentelemetry/api@1.9.0";
import type {
  CatalogExportEntry,
  CatalogExportRow,
  ControlPlaneStore,
  DatastoreSyncOptions,
  DatastoreSyncService,
  NamespaceContaminationSummary,
  PushManifest,
  RepairNamespaceContaminationOptions,
  RepairUnpushedFilesOptions,
  SyncCapabilities,
  UnpushedFilesSummary,
} from "./interfaces.ts";
import {
  confirmS3KeyMissing,
  isIfMatchUnsupported,
  type S3Client,
  s3NotFoundKind,
  S3OperationError,
} from "./s3_client.ts";
import {
  DATASTORE_FORMAT_MARKER_KEY,
  DatastoreFormatGate,
} from "./s3_format_guard.ts";
import { atomicWriteTextFile } from "./atomic_write.ts";
import {
  cacheRelativeKey,
  isWithinDir,
  resolveWithinDir,
  toKeyPath,
} from "./path_containment.ts";
import { Attr, getTracer } from "./tracing.ts";

/**
 * Validates that a relative path resolves within the cache directory.
 * Prevents path traversal attacks from malicious S3 keys.
 */
function assertSafePath(cachePath: string, relativePath: string): string {
  return resolveWithinDir(cachePath, relativePath);
}

/**
 * Filename of the sync-state sidecar used by the fast-path short-circuit
 * in `pullChanged` / `pushChanged`. Lives inside the cache directory and
 * is listed in `isInternalCacheFile` so the walker never uploads it.
 */
const SYNC_STATE_FILE = ".datastore-sync-state.json";

/**
 * Filename of this copy's own mtime record: for each file, the mtime, size
 * and sha256 it had when this copy last wrote or verified it. The index's
 * `localMtime` is whichever machine pushed last, so only this record may
 * vouch that a local file is unchanged (swamp-club#3546). Local-only,
 * listed in `isInternalCacheFile`.
 */
const OWN_MTIMES_FILE = ".datastore-local-mtimes.json";

/**
 * Filename of the peer-deleted record: keys a sync dropped from the
 * last-synced index while a regular file stayed at the path, so that copy is
 * not mistaken for one the remote never received (swamp-club#4112). Local-only,
 * listed in `isInternalCacheFile`.
 */
const PEER_DELETED_FILE = ".datastore-peer-deleted.json";

/** Object metadata key holding the sha256 `repairUnpushedFiles` uploaded. */
const SHA256_METADATA_KEY = "sha256";

/** Most paths a `repairUnpushedFiles` summary lists per category. */
const REPAIR_SAMPLE_LIMIT = 20;

/** One file's entry in the own mtime record. */
interface OwnMtimeRecord {
  mtime: string;
  size: number;
  sha256?: string;
}

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
 * - `.datastore-local-mtimes.json` — this copy's own mtime record, which
 *   vouches that a local file is unchanged. Per-machine state.
 * - `.datastore-peer-deleted.json` — keys a sync dropped while the file
 *   stayed, which a repair must not upload. Per-machine state.
 * - `_index/`, `_control/`, `_blobs/` and `_litestream/` — the shard
 *   index, the control plane, `storage/1` chunks and the v3 Litestream
 *   replicas, each reached through its own code path, never the file sync.
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
 * - basename `.<uuid>.tmp` at any depth — the temp file an atomic write
 *   (swamp core's, and this extension's `atomicWriteTextFile`) creates
 *   beside its target and renames over it. It exists only for the length
 *   of one write, so a push that walks it uploads half-written bytes or
 *   fails when the rename takes it away (swamp-club #3860).
 *
 * Uses basename matching for the catalog, `.lock` and temp-file patterns
 * so the filter is robust to any future change in the data tier
 * subdirectory name.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isInternalCacheFile(rel: string): boolean {
  if (
    rel === ".datastore-index.json" || rel === ".push-queue.json" ||
    rel === ".datastore.lock" || rel === SYNC_STATE_FILE ||
    rel === OWN_MTIMES_FILE || rel === PEER_DELETED_FILE
  ) {
    return true;
  }
  if (rel === "_index" || rel.startsWith("_index/")) return true;
  if (rel === "_control" || rel.startsWith("_control/")) return true;
  // storage/1 chunks, reached through storage(), never the file sync
  // (swamp-club#3492).
  if (rel === "_blobs" || rel.startsWith("_blobs/")) return true;
  // Litestream's v3 replicas, never files to sync (swamp-club#3549).
  if (rel === "_litestream" || rel.startsWith("_litestream/")) return true;
  const base = rel.split("/").pop() ?? "";
  if (base === ".lock" || base === ".namespace.json") return true;
  if (ATOMIC_WRITE_TEMP_FILE.test(base)) return true;
  return base === "_catalog.db" || base.startsWith("_catalog.db-");
}

/**
 * Basename of an atomic write's temp file: `.<uuid>.tmp`. The same pattern
 * as swamp core's `TEMP_FILE` in
 * `src/infrastructure/persistence/fs_datastore_storage.ts`.
 */
const ATOMIC_WRITE_TEMP_FILE =
  /^\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.tmp$/;

/**
 * Returns true for the bucket-relative control-plane keys that belong to
 * the whole datastore rather than to any namespace: the v3 writer lease's
 * records under `_control/writer/`, the v3 replication lineage records under
 * `_control/lineage/` (swamp-club#3482), and the format marker
 * `_control/datastore-format`. Swamp reads all of them at the datastore root
 * whatever namespace a checkout uses, so the root-to-namespace control-plane
 * migration must never move them (swamp-club#3395).
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isDatastoreWideControlKey(key: string): boolean {
  return key.startsWith("_control/writer/") ||
    key.startsWith("_control/lineage/") ||
    key === "_control/datastore-format";
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
 * Datastore subdirectory names from swamp core: `DEFAULT_DATASTORE_SUBDIRS`
 * plus `ALWAYS_LOCAL_SUBDIRS` in `src/domain/datastore/datastore_config.ts`.
 * Every real file under a namespace starts with one of these, so a
 * namespace that shares a name with one of them can legitimately hold
 * `<namespace>/data/...` paths. Keep in sync with core until namespace
 * names are reserved (swamp-club#2478).
 */
const LAYOUT_SUBDIRS: ReadonlySet<string> = new Set([
  "auto-definitions",
  "definitions-evaluated",
  "workflows-evaluated",
  "config",
  "data",
  "outputs",
  "workflow-runs",
  "secrets",
  "bundles",
  "vault-bundles",
  "report-bundles",
  "webhook-bundles",
  "audit",
  "audit-wal",
  "telemetry",
  "logs",
  "files",
]);

/**
 * Returns true for a namespace-relative path under the doubled
 * `<namespace>/<namespace>/data/` tree that `hydrateFile` wrote before
 * swamp-club#2404 was fixed. Such files are copies of objects stored at the
 * un-doubled path and must never be synced. Always false when the
 * namespace is a layout subdirectory name, where the path is ambiguous.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isStrayNamespacePath(
  rel: string,
  namespace: string | undefined,
): boolean {
  if (!namespace || LAYOUT_SUBDIRS.has(namespace)) return false;
  return rel.startsWith(`${namespace}/data/`);
}

/**
 * Whether a bare index-relative path falls under one of the `subdirs`
 * requested by a scoped `pullChanged`. Matches on a `/` boundary so
 * `data/swamp/grant` does not match `data/swamp/grants/...`.
 */
function isInSubdirs(rel: string, subdirs: readonly string[]): boolean {
  return subdirs.some((d) => rel.startsWith(d + "/"));
}

import { createHash } from "node:crypto";

/**
 * Computes a SHA-256 hex digest by streaming chunks from disk instead of
 * reading the entire file into memory. Used by comparison-only sites
 * (pull walk, push change detection) where the file bytes are not needed
 * after hashing.
 */
async function streamingSha256(path: string): Promise<string> {
  const file = await Deno.open(path, { read: true });
  try {
    const hasher = createHash("sha256");
    for await (const chunk of file.readable) {
      hasher.update(chunk);
    }
    return hasher.digest("hex");
  } catch (err) {
    try {
      file.close();
    } catch { /* already closed by readable iteration */ }
    throw err;
  }
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

/**
 * Returns true when the first path segment of `rel` is in `namespaceDirs`.
 * Used by pushChanged/preparePush to skip files inside nested or foreign
 * namespace directories that should never cross the sync boundary.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isInsideNamespaceDir(
  rel: string,
  namespaceDirs: ReadonlySet<string>,
): boolean {
  if (namespaceDirs.size === 0) return false;
  const slash = rel.indexOf("/");
  const firstSeg = slash === -1 ? rel : rel.substring(0, slash);
  return namespaceDirs.has(firstSeg);
}

/**
 * Scans the cache root for immediate child directories that contain a
 * `.namespace.json` marker file. Returns a Set of directory names to
 * exclude from the push walk.
 *
 * Only meaningful when a namespace is bound — solo mode (no namespace)
 * returns an empty set because there is no risk of cross-namespace
 * pollution.
 *
 * The cost is one readDir on the cache root plus one stat per child
 * directory, which is negligible compared to the full walk that follows.
 */
async function detectNamespaceDirs(
  cachePath: string,
  boundNamespace?: string,
): Promise<Set<string>> {
  const namespaceDirs = new Set<string>();
  try {
    for await (const entry of Deno.readDir(cachePath)) {
      if (!entry.isDirectory) continue;
      if (entry.name === boundNamespace) continue;
      try {
        await Deno.stat(join(cachePath, entry.name, ".namespace.json"));
        namespaceDirs.add(entry.name);
      } catch {
        // No .namespace.json — not a namespace directory
      }
    }
  } catch {
    // Cache directory may not exist yet
  }
  return namespaceDirs;
}

/** Metadata index entry for a file in S3. */
interface IndexEntry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
  sha256?: string;
}

/** Metadata for the partitioned index directory (legacy dual-write). */
interface PartitionMetaV1 {
  version: 1;
  partitions: string[];
}

/** Metadata for the shard-first index directory. */
interface PartitionMetaV2 {
  version: 2;
  partitions: string[];
  commitSeq: number;
  lastCompacted?: string;
}

type PartitionMeta = PartitionMetaV1 | PartitionMetaV2;

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

/** Internal manifest for two-phase push, opaque to core. */
interface InternalPushManifest {
  newEntries: Record<string, IndexEntry>;
  deletedKeys: string[];
  pushed: number;
  deleted: number;
  dirtyPartitionKeys: string[];
  /**
   * Set when preparePush returned without reading the remote index, so
   * `this.index` may hold only what a models-scoped pull merged. A no-op
   * commit must not arm commitSeq from it (swamp-club #3193).
   */
  indexUnread?: boolean;
  /**
   * The dirty marks preparePush walked. commitPush clears only these, and
   * only the ones nobody re-marked since (swamp-club #3860). Absent on a
   * manifest from an older caller: then commitPush clears nothing.
   */
  dirtySnapshot?: DirtySnapshot;
}

/**
 * The dirty marks one push walked, taken before the push reads anything.
 * Each mark carries the generation it had then; a push clears a mark only
 * when its generation is unchanged, so a mark made — or made again — while
 * the push ran survives it (swamp-club #3860).
 */
interface DirtySnapshot {
  /** Each dirty path's generation when the push began. */
  paths: Map<string, number>;
  bulkInvalidated: boolean;
  bulkGen: number;
  overflowed: boolean;
  overflowGen: number;
  /**
   * Snapshot paths the push did not finish (a file under one vanished, or
   * it could not be read): their marks stay for the next push.
   */
  unhandled: Set<string>;
  /**
   * Set when a whole-cache walk skipped a file that vanished: the bulk and
   * overflow marks stay, so the next push walks again.
   */
  incomplete: boolean;
}

/**
 * One file a push walk found to upload. `mark` is the snapshot dirty path
 * the file was found under, or null for a whole-cache walk.
 */
interface PushCandidate {
  rel: string;
  path: string;
  mark: string | null;
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
const DIRTY_PATHS_CAP = 2000;

/** Retry budget for single-object S3 operations in the sync pipeline. */
const RETRY_MAX_ATTEMPTS = 3;
/** Base delay between retry attempts (ms). Each retry multiplies by 3. */
const RETRY_BASE_DELAY_MS = 500;
/** Jitter fraction applied to each backoff delay (±25%). */
const RETRY_JITTER_FRACTION = 0.25;

/**
 * Jittered backoff between compare-and-swap attempts on index objects.
 * Short on purpose: a lost race only means another writer just committed,
 * so re-reading right away usually wins.
 */
function casBackoffMs(attempt: number): number {
  return Math.floor(Math.random() * Math.min(1000, 25 * 2 ** attempt));
}

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
    // 409 ConditionalRequestConflict: concurrent conditional PUT race —
    // retryable after re-reading current state (swamp-club#1747).
    if (status === 409) return true;
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
      const activeSpan = trace.getActiveSpan();
      if (activeSpan) {
        activeSpan.addEvent("retry", {
          "retry.attempt": attempt + 1,
          "error.type": err instanceof Error ? err.name : "unknown",
          "error.message": err instanceof Error ? err.message : String(err),
        });
      }
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
  op: "push" | "pull" | "delete",
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
  const preposition = op === "push" ? "to" : "from";
  return `Failed to ${op} ${failures.length} file(s) ${preposition} S3: ${
    files.join(", ")
  }\n${preview}${more}`;
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
  dirtyPathsOverflowed?: boolean;
  commitSeq?: number;
  lastCatalogHash?: string;
  dataKeyMigrated?: boolean;
  controlPlaneKeysMigrated?: boolean;
}

type DatastoreSyncState = DatastoreSyncStateV1 | DatastoreSyncStateV2;

/** `repairUnpushedFiles` refused a remote or a cache it cannot repair safely. */
export class RepairUnpushedRefusedError extends Error {
  override readonly name = "RepairUnpushedRefusedError";
}

/**
 * Whether two index entries describe one remote object. `localMtime` is left
 * out: it is per-machine, and last-synced records this copy's own.
 */
function sameRemoteEntry(a: IndexEntry, b: IndexEntry): boolean {
  return a.size === b.size && a.sha256 === b.sha256 &&
    a.lastModified === b.lastModified;
}

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
  private indexIsPartial = false;
  private syncState: DatastoreSyncState | null = null;
  private syncStateLoaded = false;
  // Sidecar writes run one at a time through this chain (swamp-club #3860).
  private syncStateWrites: Promise<void> = Promise.resolve();
  private syncStateWriteSeq = 0;
  private readonly ownMtimesPath: string;
  private readonly peerDeletedPath: string;
  private ownMtimes: Map<string, OwnMtimeRecord> | null = null;
  private ownMtimesLoad: Promise<Map<string, OwnMtimeRecord>> | null = null;
  private ownMtimesSeedPending = false;
  private ownMtimesSeeding: Promise<void> | null = null;
  private ownMtimesDirty = false;
  private indexMutated = false;
  // Each dirty path's generation, bumped on every mark, even of a path
  // already listed. Generations live in memory only: paths loaded from the
  // sidecar start at 0 (swamp-club #3860).
  private dirtyPaths: Map<string, number> = new Map();
  private markGen = 0;
  private bulkInvalidated = false;
  // Bumped on every bulk mark and every overflow, including the ones that
  // find the flag already set.
  private bulkGen = 0;
  private dirtyPathsOverflowed = false;
  private overflowGen = 0;
  private lazyPullActive = false;
  private lastCatalogHash: string | null = null;
  private namespace: string | undefined = undefined;
  private namespaceBound = false;
  private preflightDone = false;
  // Refuses a datastore the v2 file sync must not touch (swamp-club#3549).
  private readonly formatGate = new DatastoreFormatGate(
    (signal) => this.readFormatMarker(signal),
    "[s3-sync]",
  );
  private freshV2Initialized = false;
  private casUnsupported = false;
  private static readonly SHARD_CAS_ATTEMPTS = 8;
  // Generous: meta is tiny, and exhausting it after shards committed
  // leaves a new partition unlisted until the next push.
  private static readonly META_CAS_ATTEMPTS = 20;
  private static readonly REPAIR_CREATE_ATTEMPTS = 5;
  private static readonly REPAIR_COMMIT_BATCH = 200;

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
    this.ownMtimesPath = join(cachePath, OWN_MTIMES_FILE);
    this.peerDeletedPath = join(cachePath, PEER_DELETED_FILE);
    this.pullConcurrency = options?.pullConcurrency ?? DEFAULT_PULL_CONCURRENCY;
    this.pushConcurrency = options?.pushConcurrency ?? DEFAULT_PUSH_CONCURRENCY;
  }

  /**
   * Bind the namespace from the first pullChanged/pushChanged call.
   * Asserts immutability: a sync service instance operates on one
   * namespace for its entire lifetime (core creates one instance per
   * command lifecycle). Foreign methods bypass this entirely.
   */
  private bindNamespace(ns: string | undefined): void {
    if (!this.namespaceBound) {
      this.namespace = ns;
      this.namespaceBound = true;
      return;
    }
    if (this.namespace !== ns) {
      throw new Error(
        `Namespace mismatch: bound to ${JSON.stringify(this.namespace)} ` +
          `but called with ${JSON.stringify(ns)}`,
      );
    }
  }

  private async ensurePreflight(signal?: AbortSignal): Promise<void> {
    if (this.preflightDone) return;
    await this.s3.preflightCredentials(signal);
    this.preflightDone = true;
  }

  /**
   * The credentials preflight and the format check, started together so
   * the check adds no round trip. The check's deadline starts once the
   * preflight has resolved credentials. Both settle before the caller lists,
   * reads or writes anything.
   */
  private async ensureSyncable(signal?: AbortSignal): Promise<void> {
    const preflight = this.ensurePreflight(signal);
    await Promise.all([preflight, this.formatGate.ensure(signal, preflight)]);
  }

  /**
   * The datastore-wide format marker at the root `_control/`, whatever
   * namespace this service binds, read as S3DatastoreControlPlaneStore
   * reads it: null only when the key is missing, any other failure rejects
   * (and the gate then fails open).
   */
  private async readFormatMarker(
    signal: AbortSignal,
  ): Promise<Uint8Array | null> {
    try {
      const { data } = await retryWithBackoff(
        () => this.s3.getObject(DATASTORE_FORMAT_MARKER_KEY, signal),
        { signal },
      );
      return data;
    } catch (error) {
      const kind = signal.aborted ? undefined : s3NotFoundKind(error);
      if (kind === undefined) throw error;
      if (kind === "ambiguous") {
        await confirmS3KeyMissing(
          this.s3,
          DATASTORE_FORMAT_MARKER_KEY,
          error,
          signal,
        );
      }
      return null;
    }
  }

  /**
   * Returns the remote index key scoped to the bound namespace.
   * Solo mode (no namespace): `.datastore-index.json`
   * Namespaced: `{namespace}/.datastore-index.json`
   */
  private indexKey(): string {
    return this.namespace
      ? `${this.namespace}/.datastore-index.json`
      : ".datastore-index.json";
  }

  private metaKey(): string {
    return this.namespace
      ? `${this.namespace}/_index/_meta.json`
      : "_index/_meta.json";
  }

  private shardKey(partitionKey: string): string {
    return this.namespace
      ? `${this.namespace}/_index/${partitionKey}.json`
      : `_index/${partitionKey}.json`;
  }

  private dataKey(rel: string): string {
    return this.namespace ? `${this.namespace}/${rel}` : rel;
  }

  private localRelPath(rel: string): string {
    return this.namespace ? `${this.namespace}/${rel}` : rel;
  }

  /**
   * Deletes a stray local file (see {@link isStrayNamespacePath}) only when
   * the loaded index proves the same content is stored at the un-doubled
   * path: sha256 when the entry has one, size otherwise. Returns false and
   * leaves the file in place when that cannot be shown.
   */
  private async removeVerifiedStray(
    absPath: string,
    strayRel: string,
  ): Promise<boolean> {
    const entry = this.index?.entries[
      strayRel.substring(`${this.namespace}/`.length)
    ];
    if (!entry) return false;
    try {
      const stat = await Deno.stat(absPath);
      if (stat.size !== entry.size) return false;
      if (entry.sha256 && await streamingSha256(absPath) !== entry.sha256) {
        return false;
      }
      await Deno.remove(absPath);
      return true;
    } catch {
      return false;
    }
  }

  private warnStrays(removed: number, kept: number): void {
    if (removed + kept === 0) return;
    const ns = this.namespace;
    console.warn(
      `[s3-sync] Found ${
        removed + kept
      } file(s) under the doubled path "${ns}/${ns}/" left by an ` +
        `earlier hydrateFile bug (swamp-club#2404); they are never synced. ` +
        `Removed ${removed} whose content the index confirms at the real ` +
        `path. Kept ${kept} that could not be verified — compare each with ` +
        `the matching file under "${ns}/" and delete it by hand.`,
    );
  }

  private controlKey(key: string): string {
    return this.namespace
      ? `${this.namespace}/_control/${key}`
      : `_control/${key}`;
  }

  private controlPrefixPath(): string {
    return this.namespace ? `${this.namespace}/_control/` : "_control/";
  }

  /**
   * Server-side migration: copies objects from root-level keys to
   * {namespace}/ keys using S3 CopyObject (no download/upload). Lists
   * all root-level data objects, copies each to the namespaced key,
   * rebuilds the index, and deletes the originals.
   */
  private static readonly DATA_SUBDIRS = new Set([
    "data",
    "outputs",
    "definitions-evaluated",
    "workflow-runs",
    "workflows-evaluated",
    "auto-definitions",
    "audit",
    "telemetry",
    "logs",
    "files",
  ]);

  private async migrateRootDataToNamespace(
    signal?: AbortSignal,
  ): Promise<{ copied: number; total: number }> {
    if (!this.namespace) return { copied: 0, total: 0 };

    // Check whether this repo ever had un-namespaced data by looking
    // at the namespaced index. If it already exists, this is a solo→ns
    // transition and root data may belong to us. If it doesn't exist
    // (fresh namespace setup via --namespace), root data belongs to
    // another tenant — skip migration entirely.
    let hasNamespacedIndex = false;
    try {
      const head = await this.s3.headObject(this.indexKey(), signal);
      hasNamespacedIndex = head.exists;
    } catch {
      // Can't check — fall through to safe path
    }
    if (!hasNamespacedIndex) {
      // No namespaced index → this repo was set up with a namespace
      // from the start. Any root-level data belongs to another repo.
      return { copied: 0, total: 0 };
    }

    // Read the ROOT index (pre-namespace) to know which objects belong
    // to this repo. Without this, a shared bucket without client-level
    // prefix would migrate another repo's data.
    let knownKeys = new Set<string>();
    try {
      const { data } = await this.s3.getObject(".datastore-index.json", signal);
      const rootIndex = JSON.parse(
        new TextDecoder().decode(data),
      ) as DatastoreIndex;
      knownKeys = new Set(Object.keys(rootIndex.entries ?? {}));
    } catch {
      // No root index — first-time namespace setup or bucket was always
      // namespaced. Fall through with empty set (knownKeys.size === 0
      // skips the filter, allowing all root objects to migrate).
    }
    const listing = await this.s3.listAllObjects(undefined, signal);
    const nsPrefix = `${this.namespace}/`;
    const foreignNamespaces = new Set<string>();
    for (const entry of listing) {
      if (entry.key.endsWith("/.namespace.json")) {
        const ns = entry.key.substring(
          0,
          entry.key.length - "/.namespace.json".length,
        );
        if (ns && ns !== this.namespace) foreignNamespaces.add(ns);
      }
    }
    const toMigrate = listing.filter((entry) => {
      if (entry.key.startsWith(nsPrefix)) return false;
      if (isInternalCacheFile(entry.key)) return false;
      if (isInsideNamespaceDir(entry.key, foreignNamespaces)) return false;
      const firstSeg = entry.key.split("/")[0];
      if (!S3CacheSyncService.DATA_SUBDIRS.has(firstSeg)) return false;
      if (knownKeys.size > 0 && !knownKeys.has(entry.key)) return false;
      return true;
    });
    if (foreignNamespaces.size > 0) {
      console.warn(
        `[s3-sync] Excluded ${foreignNamespaces.size} foreign namespace(s) from migration: ${
          [...foreignNamespaces].join(", ")
        }`,
      );
    }
    if (toMigrate.length === 0) return { copied: 0, total: 0 };

    console.info(
      `[s3-sync] Migrating ${toMigrate.length} object(s) to namespace "${this.namespace}" (server-side copy, no re-upload)...`,
    );

    const copiedKeys: Set<string> = new Set();
    for (let i = 0; i < toMigrate.length; i += this.pushConcurrency) {
      throwIfAborted(signal);
      const batch = toMigrate.slice(i, i + this.pushConcurrency);
      const results = await Promise.allSettled(
        batch.map((entry) =>
          retryWithBackoff(
            () =>
              this.s3.copyObject(entry.key, this.dataKey(entry.key), signal),
            { signal },
          ).then(() => entry.key)
        ),
      );
      for (const result of results) {
        if (result.status === "fulfilled") copiedKeys.add(result.value);
      }
      if (toMigrate.length > 50) {
        console.info(
          `[s3-sync]   ... ${copiedKeys.size}/${toMigrate.length} copied`,
        );
      }
    }

    if (copiedKeys.size === 0) return { copied: 0, total: toMigrate.length };

    if (copiedKeys.size < toMigrate.length) {
      console.warn(
        `[s3-sync] ${
          toMigrate.length - copiedKeys.size
        } object(s) failed to copy — originals preserved, will retry next sync`,
      );
    }

    if (this.index) {
      for (const entry of toMigrate) {
        if (!copiedKeys.has(entry.key)) continue;
        this.index.entries[entry.key] = {
          key: entry.key,
          size: entry.size,
          lastModified: (entry.lastModified ?? new Date()).toISOString(),
        };
      }
      this.index.lastPulled = new Date().toISOString();
      const indexData = new TextEncoder().encode(JSON.stringify(this.index));
      await retryWithBackoff(
        () => this.s3.putObject(this.indexKey(), indexData, signal),
        { signal },
      );
      await this.writeLastSynced(this.index);
      try {
        await this.s3.deleteObject(this.metaKey(), signal);
      } catch { /* may not exist */ }
    }

    const toDeleteBatch = toMigrate.filter((e) => copiedKeys.has(e.key));
    for (let i = 0; i < toDeleteBatch.length; i += this.pushConcurrency) {
      throwIfAborted(signal);
      const batch = toDeleteBatch.slice(i, i + this.pushConcurrency);
      await Promise.allSettled(
        batch.map((entry) =>
          retryWithBackoff(
            () => this.s3.deleteObject(entry.key, signal),
            { signal },
          )
        ),
      );
    }

    console.info(
      `[s3-sync] Migration complete: ${copiedKeys.size}/${toMigrate.length} object(s) moved to "${this.namespace}/"`,
    );
    return { copied: copiedKeys.size, total: toMigrate.length };
  }

  /**
   * Server-side migration: copies root-level _control/ keys to
   * {namespace}/_control/ via S3 CopyObject. Unlike data-key migration,
   * control-plane keys are not tracked in the datastore index, so no
   * index update is needed.
   */
  private async migrateRootControlPlaneToNamespace(
    signal?: AbortSignal,
  ): Promise<{ copied: number; total: number }> {
    if (!this.namespace) return { copied: 0, total: 0 };

    // Only migrate when a namespaced index already exists — this proves
    // the repo was previously solo-mode. Without this guard, root-level
    // _control/ keys on a shared bucket could belong to another tenant.
    let hasNamespacedIndex = false;
    try {
      const head = await this.s3.headObject(this.indexKey(), signal);
      hasNamespacedIndex = head.exists;
    } catch {
      // Can't check — skip migration
    }
    if (!hasNamespacedIndex) return { copied: 0, total: 0 };

    const rootControlPrefix = "_control/";
    let listing: Array<{ key: string; size: number; lastModified?: Date }>;
    try {
      listing = await retryWithBackoff(
        () => this.s3.listAllObjects(rootControlPrefix, signal),
        { signal },
      );
    } catch {
      return { copied: 0, total: 0 };
    }

    // The lease, the replication lineage and the format marker belong to the
    // whole datastore and are read at the root whatever the namespace; moving
    // them would look like a lost lease or lineage, or hand a second writer a
    // fence or lineage already in use (swamp-club#3395).
    listing = listing.filter((entry) => !isDatastoreWideControlKey(entry.key));

    if (listing.length === 0) return { copied: 0, total: 0 };

    console.info(
      `[s3-sync] Migrating ${listing.length} control-plane key(s) to namespace "${this.namespace}" (server-side copy)...`,
    );

    const copiedKeys: Set<string> = new Set();
    for (let i = 0; i < listing.length; i += this.pushConcurrency) {
      throwIfAborted(signal);
      const batch = listing.slice(i, i + this.pushConcurrency);
      const results = await Promise.allSettled(
        batch.map((entry) => {
          const dest = `${this.namespace}/${entry.key}`;
          return retryWithBackoff(
            () => this.s3.copyObject(entry.key, dest, signal),
            { signal },
          ).then(() => entry.key);
        }),
      );
      for (const result of results) {
        if (result.status === "fulfilled") copiedKeys.add(result.value);
      }
    }

    if (copiedKeys.size === 0) return { copied: 0, total: listing.length };

    // Delete originals that were successfully copied
    const toDelete = listing.filter((e) => copiedKeys.has(e.key));
    for (let i = 0; i < toDelete.length; i += this.pushConcurrency) {
      throwIfAborted(signal);
      const batch = toDelete.slice(i, i + this.pushConcurrency);
      await Promise.allSettled(
        batch.map((entry) =>
          retryWithBackoff(
            () => this.s3.deleteObject(entry.key, signal),
            { signal },
          )
        ),
      );
    }

    console.info(
      `[s3-sync] Control-plane migration complete: ${copiedKeys.size}/${listing.length} key(s) moved to "${this.namespace}/"`,
    );
    return { copied: copiedKeys.size, total: listing.length };
  }

  /**
   * Reads `_meta.json`, or null when it is absent. Callers read that null
   * as "no v2 index" and respond by migrating, rebuilding from a partial
   * view, or demoting the bucket back to v1 — all of which overwrite
   * `_meta.json` and drop the partitions it listed. A meta that is
   * present but unreadable must stop them instead, so it throws.
   */
  private async readPartitionMeta(
    signal?: AbortSignal,
  ): Promise<PartitionMeta | null> {
    const { meta, invalid } = await this.readPartitionMetaVersioned(signal);
    if (invalid) {
      throw new Error(
        "[s3-sync] _meta.json is present but is not a recognized v1/v2 index meta. Refusing to rebuild the index from a partial view; repair or remove _meta.json, then retry.",
      );
    }
    return meta;
  }

  /**
   * Reads `_meta.json` along with the ETag of the bytes read. `etag` is
   * null when the object is absent, so it can feed `putObjectIfMatch`
   * directly as a create-only precondition. `invalid` separates "absent"
   * from "present but not a recognized v1/v2 meta" — both yield
   * `meta: null`, and a merge-on-write caller must not treat the second
   * as an empty partition list.
   */
  private async readPartitionMetaVersioned(
    signal?: AbortSignal,
  ): Promise<
    { meta: PartitionMeta | null; invalid: boolean; etag: string | null }
  > {
    try {
      const { data, etag } = await retryWithBackoff(
        () => this.s3.getObject(this.metaKey(), signal),
        { signal },
      );
      const text = new TextDecoder().decode(data);
      const parsed = JSON.parse(text) as PartitionMeta;
      const valid = (parsed.version === 1 || parsed.version === 2) &&
        Array.isArray(parsed.partitions);
      return {
        meta: valid ? parsed : null,
        invalid: !valid,
        etag: etag ?? null,
      };
    } catch (err) {
      if (
        err instanceof Error &&
        (err.name === "NotFound" || err.name === "NoSuchKey")
      ) {
        return { meta: null, invalid: false, etag: null };
      }
      throw err;
    }
  }

  /**
   * Reads a shard, or null when it is absent. Callers read that null as
   * "partition missing" and either fall back to the monolithic index or
   * skip the partition's entries, so a shard that is present but
   * unreadable throws rather than silently reading as empty.
   */
  private async readShard(
    partitionKey: string,
    signal?: AbortSignal,
  ): Promise<Record<string, IndexEntry> | null> {
    const { entries, invalid } = await this.readShardVersioned(
      partitionKey,
      signal,
    );
    if (invalid) {
      throw new Error(
        `[s3-sync] Index shard "${partitionKey}" is present but is not a recognized v1 shard. Repair or remove it, then retry.`,
      );
    }
    return entries;
  }

  /**
   * Like `readShard`, plus the ETag read (null when the shard is absent).
   * `invalid` separates "shard absent" from "shard present but not a
   * recognized v1 shard" — both yield `entries: null`, and a merge-on-write
   * caller must not treat the second as an empty starting point.
   */
  private async readShardVersioned(
    partitionKey: string,
    signal?: AbortSignal,
  ): Promise<
    {
      entries: Record<string, IndexEntry> | null;
      invalid: boolean;
      etag: string | null;
    }
  > {
    try {
      const { data, etag } = await retryWithBackoff(
        () => this.s3.getObject(this.shardKey(partitionKey), signal),
        { signal },
      );
      const text = new TextDecoder().decode(data);
      const partition = JSON.parse(text) as PartitionIndex;
      const valid = partition.version === 1 && partition.entries != null &&
        typeof partition.entries === "object";
      return {
        entries: valid ? partition.entries : null,
        invalid: !valid,
        etag: etag ?? null,
      };
    } catch (err) {
      if (
        err instanceof Error &&
        (err.name === "NotFound" || err.name === "NoSuchKey")
      ) {
        return { entries: null, invalid: false, etag: null };
      }
      throw err;
    }
  }

  /**
   * Conditional PUT with a one-way fallback: when the store answers
   * NotImplemented, warn once and use unconditional puts from then on
   * (still merge-on-write, just without the lost-update guard).
   */
  private async putIfMatch(
    key: string,
    body: Uint8Array,
    etag: string | null,
    signal?: AbortSignal,
  ): Promise<{ etag?: string } | null> {
    if (!this.casUnsupported) {
      try {
        return await retryWithBackoff(
          () => this.s3.putObjectIfMatch(key, body, etag, signal),
          { signal },
        );
      } catch (err) {
        // NotImplemented/501, or an endpoint that rejects If-Match with
        // the object's own current ETag in either form (swamp-club #2337).
        if (!isIfMatchUnsupported(err)) throw err;
        // Shards commit in parallel, so several callers can land here
        // before the flag is set; warn for the first one only.
        if (!this.casUnsupported) {
          this.casUnsupported = true;
          console.warn(
            "[s3-sync] The S3 endpoint does not support conditional PutObject (If-Match). Index writes fall back to merge-on-write without compare-and-swap, so concurrent writers can still lose index entries.",
          );
        }
      }
    }
    return await retryWithBackoff(
      () => this.s3.putObject(key, body, signal),
      { signal },
    );
  }

  /**
   * Commits one writer's index changes as compare-and-swap merges
   * (swamp-club#2245). Each dirty shard is re-read, gets only these
   * upserts/removals, and is written with If-Match; a lost race re-reads
   * and re-merges. Then `_meta.json` gets the same treatment: partitions
   * with entries are added, and a partition this call emptied is unlisted
   * only while its shard still carries the ETag written here. Empty
   * shards are left in place because S3-compatible stores ignore If-Match
   * on DELETE. Serialization never depends on the global lock.
   *
   * Returns the committed commitSeq and whether the remote index matched
   * what this writer already knew (no entries merged in from other
   * writers, and no commits since `baseCommitSeq`). Callers must only arm
   * the sidecar commitSeq fast path when `upToDate` is true.
   *
   * With `keepExisting`, an upsert does not replace an entry the shard already
   * holds, for a writer whose upload came before a peer's newer commit.
   */
  private async commitShardChanges(
    upserts: Record<string, IndexEntry>,
    removals: Iterable<string>,
    baseCommitSeq: number,
    signal?: AbortSignal,
    keepExisting = false,
  ): Promise<{ commitSeq: number; upToDate: boolean }> {
    const changes = new Map<
      string,
      { upserts: Record<string, IndexEntry>; removals: string[] }
    >();
    const changeFor = (rel: string) => {
      const key = S3CacheSyncService.partitionKeyFromPath(rel);
      if (!key) return undefined;
      let change = changes.get(key);
      if (!change) {
        change = { upserts: {}, removals: [] };
        changes.set(key, change);
      }
      return change;
    };
    for (const [rel, entry] of Object.entries(upserts)) {
      const change = changeFor(rel);
      if (change) change.upserts[rel] = entry;
    }
    for (const rel of removals) changeFor(rel)?.removals.push(rel);

    let retries = 0;
    let upToDate = true;
    const known = this.index?.entries ?? {};
    // Written shard ETag per partition; null when nothing was written
    // because the shard was absent and stayed empty.
    const written = new Map<
      string,
      { etag: string | null | undefined; empty: boolean }
    >();

    const commitShard = async (partKey: string) => {
      const change = changes.get(partKey)!;
      for (let attempt = 1;; attempt++) {
        throwIfAborted(signal);
        const { entries, invalid, etag } = await this.readShardVersioned(
          partKey,
          signal,
        );
        // Merging onto `{}` here would CAS-overwrite a shard we can't
        // read with just this push's upserts, destroying the rest of the
        // partition. `assembleIndexFromShards` already refuses to read
        // such a shard; refuse to write it too.
        if (invalid) {
          throw new Error(
            `[s3-sync] Index shard "${partKey}" is not a recognized v1 shard; refusing to overwrite it. The push stays dirty; repair or remove the shard, then retry.`,
          );
        }
        if (entries !== null && etag === null) {
          throw new Error(
            `[s3-sync] S3 returned no ETag for index shard "${partKey}"; compare-and-swap needs one to avoid clobbering concurrent writers. The push stays dirty; retry it.`,
          );
        }
        const merged: Record<string, IndexEntry> = keepExisting
          ? { ...change.upserts, ...(entries ?? {}) }
          : { ...(entries ?? {}), ...change.upserts };
        for (const rel of change.removals) delete merged[rel];
        for (const rel of Object.keys(merged)) {
          if (isInternalCacheFile(rel)) delete merged[rel];
        }
        const empty = Object.keys(merged).length === 0;
        if (empty && etag === null) {
          written.set(partKey, { etag: null, empty });
          return;
        }
        const body = new TextEncoder().encode(
          JSON.stringify({ version: 1, entries: merged } as PartitionIndex),
        );
        const result = await this.putIfMatch(
          this.shardKey(partKey),
          body,
          etag,
          signal,
        );
        if (result) {
          written.set(partKey, { etag: result.etag, empty });
          for (const [rel, entry] of Object.entries(merged)) {
            const mine = change.upserts[rel] ?? known[rel];
            if (
              !mine || mine.size !== entry.size || mine.sha256 !== entry.sha256
            ) {
              upToDate = false;
            }
          }
          return;
        }
        if (attempt >= S3CacheSyncService.SHARD_CAS_ATTEMPTS) {
          throw new Error(
            `[s3-sync] Index shard "${partKey}" kept changing under concurrent writers (${attempt} compare-and-swap attempts). The push stays dirty; retry it.`,
          );
        }
        retries++;
        await abortableSleep(casBackoffMs(attempt), signal);
      }
    };

    // A failed shard doesn't un-commit its successful siblings, so stop
    // scheduling new work but still run the meta commit below — otherwise
    // a brand-new partition keeps a committed shard that no reader can
    // see. The failure is rethrown once its partitions are listed.
    const partKeys = [...changes.keys()];
    let shardFailure: unknown;
    for (
      let i = 0;
      i < partKeys.length && shardFailure === undefined;
      i += this.pushConcurrency
    ) {
      const results = await Promise.allSettled(
        partKeys.slice(i, i + this.pushConcurrency).map(commitShard),
      );
      shardFailure = results.find((r) => r.status === "rejected")?.reason;
    }

    for (let attempt = 1;; attempt++) {
      throwIfAborted(signal);
      const { meta, invalid, etag } = await this.readPartitionMetaVersioned(
        signal,
      );
      // Seeding from an empty set here would CAS-overwrite the partition
      // list with only the partitions this call touched, silently
      // unlisting every other one.
      if (invalid) {
        throw new Error(
          `[s3-sync] _meta.json is not a recognized v1/v2 index meta; refusing to overwrite it. Shards are committed but may be unlisted; repair _meta.json, then retry the push.`,
        );
      }
      if (meta !== null && etag === null) {
        throw new Error(
          `[s3-sync] S3 returned no ETag for _meta.json; compare-and-swap needs one to avoid clobbering concurrent writers. Shards are committed but may be unlisted; the push stays dirty, retry it.`,
        );
      }
      const v2 = meta?.version === 2 ? meta : null;
      const partitions = new Set(meta?.partitions ?? []);
      for (const [partKey, w] of written) {
        if (!w.empty) {
          partitions.add(partKey);
        } else if (partitions.has(partKey) && w.etag !== undefined) {
          const head = await retryWithBackoff(
            () => this.s3.headObject(this.shardKey(partKey), signal),
            { signal },
          );
          const current = head.exists ? head.etag : null;
          if (current === w.etag) partitions.delete(partKey);
        }
      }
      const readSeq = v2?.commitSeq ?? 0;
      const newMeta: PartitionMetaV2 = {
        version: 2,
        partitions: [...partitions].sort(),
        commitSeq: readSeq + 1,
      };
      const result = await this.putIfMatch(
        this.metaKey(),
        new TextEncoder().encode(JSON.stringify(newMeta)),
        etag,
        signal,
      );
      if (result) {
        if (readSeq !== baseCommitSeq) upToDate = false;
        trace.getActiveSpan()?.setAttribute(
          Attr.DATASTORE_CAS_RETRIES,
          retries,
        );
        // Shards that did commit are now listed; surface the one that
        // didn't so the push stays dirty and gets retried.
        if (shardFailure !== undefined) throw shardFailure;
        return { commitSeq: newMeta.commitSeq, upToDate };
      }
      if (attempt >= S3CacheSyncService.META_CAS_ATTEMPTS) {
        throw new Error(
          `[s3-sync] _meta.json kept changing under concurrent writers (${attempt} compare-and-swap attempts). Shards are committed but may be unlisted; the push stays dirty, retry it.`,
        );
      }
      retries++;
      await abortableSleep(casBackoffMs(attempt), signal);
    }
  }

  private async writeShard(
    partitionKey: string,
    entries: Record<string, IndexEntry>,
    signal?: AbortSignal,
  ): Promise<void> {
    const partition: PartitionIndex = { version: 1, entries };
    const data = new TextEncoder().encode(JSON.stringify(partition));
    await retryWithBackoff(
      () => this.s3.putObject(this.shardKey(partitionKey), data, signal),
      { signal },
    );
  }

  private async writePartitionMeta(
    meta: PartitionMetaV2,
    signal?: AbortSignal,
  ): Promise<void> {
    const data = new TextEncoder().encode(JSON.stringify(meta));
    await retryWithBackoff(
      () => this.s3.putObject(this.metaKey(), data, signal),
      { signal },
    );
  }

  /**
   * Folds the bucket's shards into the monolith in `this.index`, for a remote
   * with no v2 `_meta.json`. A leftover monolith looks just like a real v1 one
   * there, and shard-first pushes never update it, so a shard can hold commits
   * it lacks. Overwriting those shards would hide the entries from every reader
   * (swamp-club#4192). Returns the shards that held entries.
   */
  private async mergeShardsIntoIndex(
    shardKeys: string[],
    signal?: AbortSignal,
  ): Promise<string[]> {
    const shards: Array<[string, Record<string, IndexEntry>]> = [];
    const batchSize = 10;
    for (let i = 0; i < shardKeys.length; i += batchSize) {
      throwIfAborted(signal);
      const batch = shardKeys.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((key) => this.readShard(key, signal)),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === "rejected") {
          throwIfAborted(signal);
          // Only a shard that does not parse needs repair. Other failures say
          // nothing about its contents, and removing a healthy shard loses the
          // commits this merge keeps. readShard's own error covers the rest.
          const advice = result.reason instanceof SyntaxError ||
              result.reason instanceof TypeError
            ? ". Repair or remove it, then retry."
            : "";
          throw new Error(
            `[s3-sync] Failed to read shard ${
              batch[j]
            }, refusing to migrate over it: ${
              result.reason instanceof Error
                ? result.reason.message
                : String(result.reason)
            }${advice}`,
          );
        }
        if (result.value) shards.push([batch[j], result.value]);
      }
    }

    // Listed after the reads: an object is uploaded before its index commit, so
    // the listing holds whatever the indexes just read list. Only the prefixes
    // these entries can resolve to, never the whole bucket (swamp-club#2242).
    const rels = new Set(Object.keys(this.index?.entries ?? {}));
    for (const [, entries] of shards) {
      for (const rel of Object.keys(entries)) rels.add(rel);
    }
    const prefixes = this.bulkDiffPrefixes(rels);
    const nsPrefix = this.namespace ? `${this.namespace}/` : "";
    const listAll = async (from: string[]) =>
      (await Promise.all(
        from.map((prefix) =>
          retryWithBackoff(() => this.s3.listAllObjects(prefix, signal), {
            signal,
          })
        ),
      )).flat();
    let listing = await listAll(nsPrefix ? [nsPrefix] : prefixes);
    // A namespaced read falls back to the root key, so the root counts too. A
    // credential scoped to the namespace is denied that listing and cannot tell
    // a deleted entry from one at the root, so it keeps them all. A pull with
    // that credential fails on one whose object really is gone, as it already
    // does on that entry in the monolith. Any other failure stops the migration.
    let rootKnown = true;
    if (nsPrefix) {
      try {
        // concat, as a spread overflows the stack on a large prefix.
        listing = listing.concat(
          await listAll(prefixes.filter((p) => p !== nsPrefix)),
        );
      } catch (err) {
        if (!(err instanceof S3OperationError && err.httpStatusCode === 403)) {
          throw err;
        }
        rootKnown = false;
        console.warn(
          `[s3-sync] Denied listing root keys, so no entry is dropped as deleted, and a pull with this credential fails on any whose object is gone: ${err}`,
        );
      }
    }
    const objects = new Set<string>();
    const foreign = new Set<string>();
    const marker = "/.namespace.json";
    for (const { key } of listing) {
      objects.add(key);
      if (!key.endsWith(marker)) continue;
      const dir = key.slice(0, -marker.length);
      foreign.add(dir.startsWith(nsPrefix) ? dir.slice(nsPrefix.length) : dir);
    }
    if (this.namespace) foreign.delete(this.namespace);
    // A sibling named like one of these does not make the path foreign: every
    // real file under this namespace starts with one of them.
    for (const dir of LAYOUT_SUBDIRS) foreign.delete(dir);
    const hasObject = (rel: string) =>
      !rootKnown || objects.has(this.dataKey(rel)) || objects.has(rel);

    const merged: Record<string, IndexEntry> = {};
    const dropped = new Set<string>();
    for (const [rel, entry] of Object.entries(this.index?.entries ?? {})) {
      if (hasObject(rel)) merged[rel] = entry;
      else dropped.add(rel);
    }
    let kept = 0;
    let foreignSkipped = 0;
    const held: string[] = [];
    for (const [shardKey, entries] of shards) {
      if (Object.keys(entries).length > 0) held.push(shardKey);
      for (const [rel, entry] of Object.entries(entries)) {
        if (!hasObject(rel)) {
          dropped.add(rel);
          continue;
        }
        const current = merged[rel];
        if (!current && isInsideNamespaceDir(rel, foreign)) {
          foreignSkipped++;
          continue;
        }
        // False for an unparseable date, which leaves what is already there.
        if (
          !current ||
          Date.parse(entry.lastModified) > Date.parse(current.lastModified)
        ) {
          merged[rel] = entry;
          kept++;
        }
      }
    }
    this.index = {
      version: 1,
      lastPulled: this.index?.lastPulled ?? new Date().toISOString(),
      entries: merged,
    };
    // Not ||=: the merge can bring in what pullIndex's scrub never saw.
    if (this.scrubIndex()) this.indexMutated = true;
    if (kept > 0 || dropped.size > 0 || foreignSkipped > 0) {
      console.warn(
        `[s3-sync] Merged ${shards.length} shard(s) into the monolith before migrating: ${kept} entry/entries kept from shards, ${dropped.size} dropped with no object in the bucket, ${foreignSkipped} left out as another namespace's`,
      );
    }
    return held;
  }

  async migrateMonolithToShards(
    options?: DatastoreSyncOptions,
  ): Promise<PartitionMetaV2> {
    return await getTracer().startActiveSpan(
      "s3-datastore migrateIndex",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          this.bindNamespace(options?.namespace);
          await this.formatGate.ensure(signal);
          const migrateStart = Date.now();
          const existingMeta = await this.readPartitionMeta(signal);
          // Shards are the index on a v2 remote, and with no monolith on any
          // remote. A leftover monolith is stale: shard-first pushes never update
          // it. Reading on would rebuild the shards from it or, with no monolith,
          // reach discovery, which rewrites them from a listing with no sha256.
          // Past this check, a stale monolith cannot be told from a real v1 one,
          // so the merge below keeps what shards hold.
          const monolith = await retryWithBackoff(
            () => this.s3.headObject(this.indexKey(), signal),
            { signal },
          );
          if (
            (existingMeta?.version === 2 || !monolith.exists) &&
            (await this.listShardKeys(signal)).length > 0
          ) {
            return await this.recoverMetaFromListing(signal);
          }
          // Last-synced and local files stay as they are, except on a bucket
          // with no index at all, where discovery writes the one it builds. The
          // next pull compares them with the shards this writes, and the
          // commitSeq below makes sure that pull takes the slow path.
          await this.pullIndex({ forceRemote: true, signal, persist: false });
          const shardKeys = await this.listShardKeys(signal);
          const heldEntries = shardKeys.length > 0
            ? await this.mergeShardsIntoIndex(shardKeys, signal)
            : [];
          const allEntries = this.index?.entries ?? {};
          const entryCount = Object.keys(allEntries).length;

          if (entryCount === 0) {
            for (const key of heldEntries) {
              await this.writeShard(key, {}, signal);
            }
            return await this.recoverMetaFromListing(signal);
          }

          const partitions = S3CacheSyncService.groupEntriesByPartition(
            allEntries,
          );

          let partitionedCount = 0;
          for (const bucket of partitions.values()) {
            partitionedCount += Object.keys(bucket).length;
          }
          if (partitionedCount !== entryCount) {
            const missing = Object.keys(allEntries).filter(
              (rel) => !S3CacheSyncService.partitionKeyFromPath(rel),
            );
            throw new Error(
              `[s3-sync] Migration aborted: ${entryCount} index entries but only ${partitionedCount} could be partitioned. ` +
                `${entryCount - partitionedCount} entry/entries dropped: ${
                  missing.slice(0, 10).join(", ")
                }`,
            );
          }

          console.info(
            `[s3-sync] Migrating monolithic index to shard-first: ${entryCount} entries → ${partitions.size} shard(s)`,
          );

          const partitionKeys: string[] = [];
          for (const [key, entries] of partitions) {
            partitionKeys.push(key);
            await this.writeShard(key, entries, signal);
          }
          // A rebuild from the listing lists every shard, so one left out here
          // must not keep the entries the merge dropped.
          for (const key of heldEntries) {
            if (!partitions.has(key)) await this.writeShard(key, {}, signal);
          }

          const meta: PartitionMetaV2 = {
            version: 2,
            partitions: partitionKeys.sort(),
            commitSeq: S3CacheSyncService.rebuiltCommitSeq(existingMeta),
          };
          await this.writePartitionMeta(meta, signal);
          tracePhase("migration", migrateStart, `shards=${partitions.size}`);
          console.info(
            `[s3-sync] Migration complete: ${partitions.size} shard(s) written, _meta.json v2 with commitSeq=${meta.commitSeq} (${
              Date.now() - migrateStart
            }ms)`,
          );
          return meta;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  private async assembleIndexFromShards(
    signal?: AbortSignal,
  ): Promise<
    {
      entries: Record<string, IndexEntry>;
      commitSeq: number;
      // Every shard was read; see assembleDirtyShardsOnly.
      readKeys: null;
    } | null
  > {
    const meta = await this.readPartitionMeta(signal);
    if (!meta) return null;
    if (meta.version !== 2) return null;

    const v2Meta = meta as PartitionMetaV2;
    const entries: Record<string, IndexEntry> = {};
    const batchSize = 10;

    for (let i = 0; i < v2Meta.partitions.length; i += batchSize) {
      throwIfAborted(signal);
      const batch = v2Meta.partitions.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((key) => this.readShard(key, signal)),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === "rejected") {
          throw new Error(
            `[s3-sync] Failed to read shard ${batch[j]} after retries: ${
              result.reason instanceof Error
                ? result.reason.message
                : String(result.reason)
            }`,
          );
        }
        if (result.value === null) {
          throw new Error(
            `[s3-sync] Shard ${
              batch[j]
            } listed in _meta.json v2 but missing from S3 — index is corrupt. ` +
              `Run 'swamp datastore migrate-index' to rebuild.`,
          );
        }
        for (const [rel, entry] of Object.entries(result.value)) {
          entries[rel] = entry;
        }
      }
    }

    return { entries, commitSeq: v2Meta.commitSeq, readKeys: null };
  }

  /**
   * Like assembleIndexFromShards but only reads the shards that can hold
   * files under a path in `dirtyPaths`. Returns the partial index (only
   * entries from those shards) and the commitSeq.
   *
   * A dirty path's own partition key is not enough: core marks
   * directories dirty, and a directory's key can differ from its files'
   * keys. A version directory `data/<a>/<b>/<model>/<name>/<N>` maps to
   * the type shard `data--a--b`, but its `raw` and `metadata.yaml` live
   * in the model shard `data--a--b--<model>` (swamp-club #2353). So a
   * partition is read when its `--` segments are a prefix of the dirty
   * path's segments, or the dirty path's segments are a prefix of its.
   */
  private async assembleDirtyShardsOnly(
    dirtyPaths: Iterable<string>,
    signal?: AbortSignal,
  ): Promise<
    {
      entries: Record<string, IndexEntry>;
      commitSeq: number;
      readKeys: ReadonlySet<string>;
    } | null
  > {
    const meta = await this.readPartitionMeta(signal);
    if (!meta) return null;
    if (meta.version !== 2) return null;

    const v2Meta = meta as PartitionMetaV2;
    const neededKeys = new Set<string>();
    // "--"-joined leading segments of each dirty path. A partition equal
    // to one of these is an ancestor of the dirty path.
    const ancestorKeys = new Set<string>();
    // "--"-joined segments of each whole dirty path. A partition that
    // extends one of these at a "--" boundary lies under the dirty path.
    const dirtyKeys = new Set<string>();
    const nsPrefix = this.namespace ? `${this.namespace}/` : "";
    for (const p of dirtyPaths) {
      // Strip the namespace prefix — partitionKeyFromPath expects bare
      // cache-relative paths (e.g. "data/type/model/file"), not
      // namespace-prefixed ones ("ns/data/type/model/file").
      const bare = nsPrefix && p.startsWith(nsPrefix)
        ? p.substring(nsPrefix.length)
        : p;
      // Keeps keys that are not a "--" join of path segments (`_root`).
      const key = S3CacheSyncService.partitionKeyFromPath(bare);
      if (key) neededKeys.add(key);
      let joined = "";
      for (const segment of bare.split("/")) {
        if (segment === "") continue;
        joined = joined ? `${joined}--${segment}` : segment;
        ancestorKeys.add(joined);
      }
      if (joined) dirtyKeys.add(joined);
    }

    // Match on whole segments, so data/a/b never selects data--a--bc.
    for (const partition of v2Meta.partitions) {
      if (ancestorKeys.has(partition)) {
        neededKeys.add(partition);
        continue;
      }
      for (
        let i = partition.indexOf("--");
        i !== -1;
        i = partition.indexOf("--", i + 2)
      ) {
        if (dirtyKeys.has(partition.substring(0, i))) {
          neededKeys.add(partition);
          break;
        }
      }
    }

    if (neededKeys.size === 0) {
      return { entries: {}, commitSeq: v2Meta.commitSeq, readKeys: new Set() };
    }

    // Only read shards that exist in the partition list AND are needed.
    const partitionSet = new Set(v2Meta.partitions);
    const toRead = [...neededKeys].filter((k) => partitionSet.has(k));

    const entries: Record<string, IndexEntry> = {};
    const batchSize = 10;

    for (let i = 0; i < toRead.length; i += batchSize) {
      throwIfAborted(signal);
      const batch = toRead.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((key) => this.readShard(key, signal)),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === "rejected") {
          throw new Error(
            `[s3-sync] Failed to read shard ${batch[j]} after retries: ${
              result.reason instanceof Error
                ? result.reason.message
                : String(result.reason)
            }`,
          );
        }
        if (result.value === null) {
          throw new Error(
            `[s3-sync] Shard ${
              batch[j]
            } listed in _meta.json v2 but missing from S3 — index is corrupt. ` +
              `Run 'swamp datastore migrate-index' to rebuild.`,
          );
        }
        for (const [rel, entry] of Object.entries(result.value)) {
          entries[rel] = entry;
        }
      }
    }

    return { entries, commitSeq: v2Meta.commitSeq, readKeys: new Set(toRead) };
  }

  /** The keys of the `_index/` shards the bucket holds, `_meta.json` aside. */
  private async listShardKeys(signal?: AbortSignal): Promise<string[]> {
    const prefix = this.namespace ? `${this.namespace}/_index/` : "_index/";
    const listing = await retryWithBackoff(
      () => this.s3.listAllObjects(prefix, signal),
      { signal },
    );
    const keys: string[] = [];
    for (const entry of listing) {
      const name = entry.key.replace(prefix, "");
      if (name === "_meta.json" || !name.endsWith(".json")) continue;
      keys.push(name.slice(0, -5));
    }
    return keys.sort();
  }

  /**
   * The commitSeq a rebuilt `_meta.json` starts from. It must never equal one
   * a sidecar armed before the rebuild, or the pull fast path would skip every
   * commit since. The old value may be gone, so the clock covers that case.
   */
  private static rebuiltCommitSeq(existing: PartitionMeta | null): number {
    const seq = existing?.version === 2
      ? (existing as PartitionMetaV2).commitSeq
      : 0;
    return Math.max(Date.now(), seq + 1);
  }

  /**
   * Rewrites `_meta.json` from the shards the bucket holds. Listing after the
   * read, under a compare-and-swap on it, keeps a partition a concurrent writer
   * lists: its shard is written before its meta, so the listing has it, and a
   * meta that changed since the read fails the swap and is read again.
   */
  private async recoverMetaFromListing(
    signal?: AbortSignal,
  ): Promise<PartitionMetaV2> {
    for (let attempt = 1;; attempt++) {
      const { meta: existing, invalid, etag } = await this
        .readPartitionMetaVersioned(signal);
      if (invalid) {
        throw new Error(
          "[s3-sync] _meta.json is not a recognized v1/v2 index meta; refusing to overwrite it. Repair or remove _meta.json, then retry.",
        );
      }
      const partitionKeys = await this.listShardKeys(signal);
      const meta: PartitionMetaV2 = {
        version: 2,
        partitions: partitionKeys,
        commitSeq: S3CacheSyncService.rebuiltCommitSeq(existing),
      };
      const result = await this.putIfMatch(
        this.metaKey(),
        new TextEncoder().encode(JSON.stringify(meta)),
        etag,
        signal,
      );
      if (result) {
        console.warn(
          `[s3-sync] Rebuilt _meta.json from _index/ listing: ${partitionKeys.length} shard(s)`,
        );
        return meta;
      }
      if (attempt >= S3CacheSyncService.META_CAS_ATTEMPTS) {
        throw new Error(
          `[s3-sync] _meta.json kept changing under concurrent writers (${attempt} compare-and-swap attempts); retry migrate-index.`,
        );
      }
      await abortableSleep(casBackoffMs(attempt), signal);
    }
  }

  /**
   * Keeps a v2 remote v2 after contamination repair deleted foreign objects:
   * a strictly greater commitSeq, so an armed sidecar cannot fast-path over the
   * repair, and no shard belonging to a foreign namespace.
   */
  private async rebuildMetaAfterContamination(
    prior: PartitionMeta | null,
    foreign: ReadonlySet<string>,
    signal?: AbortSignal,
  ): Promise<void> {
    let partitions: string[] = [];
    let dropped: string[] = [];
    for (let attempt = 1;; attempt++) {
      const { meta, invalid, etag } = await this.readPartitionMetaVersioned(
        signal,
      );
      if (invalid || meta?.version !== 2) {
        throw new Error(
          "[s3-sync] _meta.json is no longer a v2 index meta; refusing to overwrite it. Run `swamp datastore migrate-index`, then retry.",
        );
      }
      // From the meta just read, so a partition a concurrent writer listed
      // after this repair started stays listed.
      partitions = meta.partitions.filter((key) => !foreign.has(key));
      dropped = meta.partitions.filter((key) => foreign.has(key));
      const newest = Math.max(
        (prior as PartitionMetaV2 | null)?.commitSeq ?? 0,
        (meta as PartitionMetaV2).commitSeq ?? 0,
      );
      const next: PartitionMetaV2 = {
        version: 2,
        partitions,
        commitSeq: Math.max(Date.now(), newest + 1),
      };
      const result = await this.putIfMatch(
        this.metaKey(),
        new TextEncoder().encode(JSON.stringify(next)),
        etag,
        signal,
      );
      if (result) break;
      if (attempt >= S3CacheSyncService.META_CAS_ATTEMPTS) {
        throw new Error(
          `[s3-sync] _meta.json kept changing under concurrent writers (${attempt} compare-and-swap attempts); retry the repair.`,
        );
      }
      await abortableSleep(casBackoffMs(attempt), signal);
    }
    // Only shards just unlisted and foreign ones. A shard no meta lists may be
    // one a writer has created and is about to list, and deleting it would make
    // every later read of the index fail.
    const doomed = new Set(dropped);
    for (const key of await this.listShardKeys(signal)) {
      if (foreign.has(key)) doomed.add(key);
    }
    for (const key of doomed) {
      try {
        await retryWithBackoff(
          () => this.s3.deleteObject(this.shardKey(key), signal),
          { signal },
        );
      } catch (err) {
        console.warn(
          `[s3-sync] Could not delete index shard ${key}: ${err}`,
        );
      }
    }
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
            // A listed path that escapes the cache is dropped, as markDirty
            // would refuse it, so a tampered sidecar cannot point a walk
            // outside the cache.
            this.dirtyPaths = new Map();
            for (const p of v2.dirtyPaths) {
              if (typeof p !== "string") continue;
              const key = cacheRelativeKey(
                this.cachePath,
                normalize(join(this.cachePath, p)),
              );
              if (key !== undefined && key !== "") this.dirtyPaths.set(key, 0);
            }
          }
          this.bulkInvalidated = !!v2.bulkInvalidated;
          this.dirtyPathsOverflowed = !!v2.dirtyPathsOverflowed;
          this.lazyPullActive = !!v2.lazyPullActive;
          this.lastCatalogHash = v2.lastCatalogHash ?? null;
        } else if (parsed.version === 1) {
          this.syncState = parsed as DatastoreSyncStateV1;
        }
      }
    } catch {
      // Missing/corrupt/unreadable — treat as no sidecar (safe default).
    }
    return this.syncState;
  }

  /**
   * Persist the sidecar atomically. Writes run one at a time, in call order,
   * so an older write can never land over a newer one; a failed write does
   * not stop the ones queued after it. Each write takes its dirty fields
   * from the live marks when it runs, not from when `state` was built, so a
   * mark made while a push awaited is never overwritten by the push's
   * older view (swamp-club #3860). `this.syncState` is updated at once, for
   * readers in this process, and again to exactly what the latest write
   * persisted.
   */
  private writeSyncState(state: DatastoreSyncState): Promise<void> {
    const seq = ++this.syncStateWriteSeq;
    this.syncState = this.withLiveDirtyState(state);
    this.syncStateLoaded = true;
    const run = this.syncStateWrites.then(async () => {
      const live = this.withLiveDirtyState(state);
      if (seq === this.syncStateWriteSeq) this.syncState = live;
      await ensureDir(this.cachePath);
      await atomicWriteTextFile(
        this.syncStatePath,
        JSON.stringify(live, null, 2),
      );
    });
    this.syncStateWrites = run.catch(() => {});
    return run;
  }

  /**
   * `state` with its dirty fields replaced by the live marks: a sidecar
   * says dirty while any mark remains, whatever its writer last saw.
   */
  private withLiveDirtyState(state: DatastoreSyncState): DatastoreSyncState {
    if (state.version !== 2) return state;
    return {
      ...state,
      localDirty: state.localDirty || this.hasDirtyMarks(),
      dirtyPaths: [...this.dirtyPaths.keys()],
      bulkInvalidated: this.bulkInvalidated,
      dirtyPathsOverflowed: this.dirtyPathsOverflowed,
    };
  }

  private hasDirtyMarks(): boolean {
    return this.dirtyPaths.size > 0 || this.bulkInvalidated ||
      this.dirtyPathsOverflowed;
  }

  /**
   * Loads the own mtime record on first call; concurrent first callers
   * share one load. A corrupt or unreadable file is an empty record: every
   * same-size file is then hashed, never trusted. A missing file is seeded
   * once, after the namespace is bound, by {@link seedOwnMtimes}.
   */
  private async loadOwnMtimes(): Promise<Map<string, OwnMtimeRecord>> {
    this.ownMtimesLoad ??= this.readOwnMtimes();
    const records = await this.ownMtimesLoad;
    if (this.ownMtimesSeedPending && this.namespaceBound) {
      this.ownMtimesSeeding ??= this.seedOwnMtimes(records);
      await this.ownMtimesSeeding;
    }
    return records;
  }

  private async readOwnMtimes(): Promise<Map<string, OwnMtimeRecord>> {
    const records = new Map<string, OwnMtimeRecord>();
    try {
      const parsed = JSON.parse(await Deno.readTextFile(this.ownMtimesPath));
      if (parsed?.version === 1 && parsed.files) {
        for (const [rel, r] of Object.entries(parsed.files)) {
          const rec = r as OwnMtimeRecord;
          if (typeof rec?.mtime === "string" && typeof rec.size === "number") {
            records.set(rel, rec);
          }
        }
      }
    } catch (err) {
      // Missing — seed it (swamp-club#3550). Corrupt/unreadable — start
      // empty and never seed, so foreign mtimes are never re-trusted.
      if (err instanceof Deno.errors.NotFound) this.ownMtimesSeedPending = true;
    }
    this.ownMtimes = records;
    return records;
  }

  /**
   * Seeds a missing own record, once per cache, from the index this copy
   * last synced. Only entries without a sha256 are seeded, and only when the
   * local file still has the entry's size and localMtime. Such entries have
   * no hash to fall back on, so a cache upgraded from before
   * swamp-club#3546 would otherwise keep an unchanged legacy file a peer
   * deleted, then push it back, and re-push every other one
   * (swamp-club#3550). This trusts them exactly as before #3546, including
   * pullChanged's size-only localMtime reconcile. Entries with a sha256 are
   * hashed instead. Runs only once the namespace is bound, so local paths
   * resolve, and must run before the on-disk index is first replaced (see
   * {@link beforeIndexWrite}). The record is written straight away: from
   * then on a missing entry means "not verified", never "seed again".
   */
  private async seedOwnMtimes(
    records: Map<string, OwnMtimeRecord>,
  ): Promise<void> {
    const entries = Object.entries(await this.readLastSyncedEntries() ?? {})
      .filter(([rel, entry]) =>
        !entry.sha256 && entry.localMtime && !isInternalCacheFile(rel)
      );
    for (let i = 0; i < entries.length; i += this.pullConcurrency) {
      await Promise.all(
        entries.slice(i, i + this.pullConcurrency).map(async ([rel, entry]) => {
          try {
            const stat = await Deno.stat(
              assertSafePath(this.cachePath, this.localRelPath(rel)),
            );
            const mtime = stat.mtime?.toISOString();
            if (
              stat.isFile && stat.size === entry.size && mtime &&
              mtime === entry.localMtime && !records.has(rel)
            ) {
              records.set(rel, { mtime, size: entry.size });
            }
          } catch {
            // Missing or unsafe path — not seeded.
          }
        }),
      );
    }
    this.ownMtimesSeedPending = false;
    this.ownMtimesDirty = true;
    await this.flushOwnMtimes();
  }

  /**
   * Call before replacing the on-disk index, so a pending seed reads the
   * index this copy last synced, not a remote payload that has lost
   * peer-deleted entries and carries pushers' mtimes (swamp-club#3550).
   */
  private async beforeIndexWrite(): Promise<void> {
    await this.loadOwnMtimes();
  }

  /**
   * Returns this copy's record for `rel` when the file still has the
   * recorded size and mtime, so its content is the recorded one. With
   * `settled`, a file written within the last second does not match: on a
   * coarse-mtime filesystem a same-size rewrite in that second keeps the
   * mtime. Callers that can hash instead, or that destroy the file, pass it.
   */
  private async ownRecordFor(
    rel: string,
    stat: Deno.FileInfo,
    settled: boolean,
  ): Promise<OwnMtimeRecord | undefined> {
    if (!stat.mtime) return undefined;
    if (settled && Date.now() - stat.mtime.getTime() < 1000) return undefined;
    const rec = (await this.loadOwnMtimes()).get(rel);
    if (
      !rec || rec.size !== stat.size || rec.mtime !== stat.mtime.toISOString()
    ) {
      return undefined;
    }
    return rec;
  }

  /** Records that this copy's `rel`, as `stat` sees it, has `sha256`. */
  private async recordOwnMtime(
    rel: string,
    stat: Deno.FileInfo,
    sha256: string | undefined,
  ): Promise<void> {
    if (!stat.mtime) return;
    const records = await this.loadOwnMtimes();
    records.set(rel, {
      mtime: stat.mtime.toISOString(),
      size: stat.size,
      sha256,
    });
    this.ownMtimesDirty = true;
  }

  private async forgetOwnMtime(rel: string): Promise<void> {
    if ((await this.loadOwnMtimes()).delete(rel)) this.ownMtimesDirty = true;
  }

  /**
   * Persists the own mtime record when it changed. Never throws: a lost
   * record only costs a re-hash, never a wrong skip. Concurrent processes
   * may overwrite each other's writes with the same outcome.
   */
  private async flushOwnMtimes(): Promise<void> {
    // While a seed is pending, writing the file would mark it done.
    if (
      !this.ownMtimes || !this.ownMtimesDirty || this.ownMtimesSeedPending
    ) {
      return;
    }
    this.ownMtimesDirty = false;
    try {
      await ensureDir(this.cachePath);
      await atomicWriteTextFile(
        this.ownMtimesPath,
        JSON.stringify({
          version: 1,
          files: Object.fromEntries(this.ownMtimes),
        }),
      );
    } catch {
      this.ownMtimesDirty = true;
    }
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
    const v2Current = current?.version === 2
      ? current as DatastoreSyncStateV2
      : undefined;
    return {
      version: 2,
      remoteIndexETag: current?.remoteIndexETag ?? "",
      lastVerifiedAt: current?.lastVerifiedAt ?? "",
      localDirty: overrides?.localDirty ?? current?.localDirty ?? false,
      dirtyPaths: [...this.dirtyPaths.keys()],
      bulkInvalidated: overrides?.bulkInvalidated ?? this.bulkInvalidated,
      lazyPullActive: overrides?.lazyPullActive ?? this.lazyPullActive,
      dirtyPathsOverflowed: this.dirtyPathsOverflowed,
      lastCatalogHash: this.lastCatalogHash ?? undefined,
      dataKeyMigrated: v2Current?.dataKeyMigrated,
      controlPlaneKeysMigrated: v2Current?.controlPlaneKeysMigrated,
      commitSeq: v2Current?.commitSeq,
    };
  }

  async markDirty(options?: DatastoreSyncOptions): Promise<void> {
    const current = await this.loadSyncState();
    const relPath = options?.relPath;

    if (relPath) {
      // A pull after a failed push can leave paths listed (or the bulk
      // flag set) under a clean sidecar. Skip the write only while the
      // sidecar still says dirty, or the next push takes the zero-diff
      // fast path and drops the change.
      const alreadyDirty = current?.localDirty === true;
      if (this.bulkInvalidated) {
        // The path is not listed while the bulk flag stands, so the bulk
        // mark carries it: a push already walking must not clear the flag
        // (swamp-club #3860). Under overflow it may be a deletion, which
        // only the overflow walk reconciles.
        this.bulkGen++;
        if (this.dirtyPathsOverflowed) this.overflowGen++;
        if (alreadyDirty) return;
        await this.writeSyncState(
          this.buildV2State({ localDirty: true, bulkInvalidated: true }),
        );
        return;
      }
      // Normalize the path relative to cachePath. Core may pass absolute
      // or ../‑relative paths for repos that resolve outside the cache
      // dir (e.g. definitions-evaluated, outputs). Resolve and re-derive
      // the cache-relative form so the scoped walker can find the files.
      const resolved = normalize(join(this.cachePath, relPath));
      const normalizedRel = cacheRelativeKey(this.cachePath, resolved);
      if (normalizedRel === undefined) {
        // Path escapes cache dir — can't scope the walk to it, so
        // fall back to bulk invalidation.
        this.bulkInvalidated = true;
        this.bulkGen++;
        await this.writeSyncState(
          this.buildV2State({ localDirty: true, bulkInvalidated: true }),
        );
        return;
      }
      if (this.dirtyPaths.has(normalizedRel)) {
        // A re-mark: a push that walked this path before the new write
        // must not clear it (swamp-club #3860).
        this.dirtyPaths.set(normalizedRel, ++this.markGen);
        if (alreadyDirty) return;
        await this.writeSyncState(this.buildV2State({ localDirty: true }));
        return;
      }
      if (this.dirtyPaths.size >= DIRTY_PATHS_CAP) {
        this.bulkInvalidated = true;
        this.bulkGen++;
        this.dirtyPathsOverflowed = true;
        this.overflowGen++;
        await this.writeSyncState(
          this.buildV2State({ localDirty: true, bulkInvalidated: true }),
        );
        return;
      }
      this.dirtyPaths.set(normalizedRel, ++this.markGen);
      await this.writeSyncState(this.buildV2State({ localDirty: true }));
      return;
    }

    // No relPath — bulk invalidation (legacy path or pushFile)
    this.bulkGen++;
    if (current?.localDirty === true && this.bulkInvalidated) return;
    this.bulkInvalidated = true;
    await this.writeSyncState(
      this.buildV2State({ localDirty: true, bulkInvalidated: true }),
    );
  }

  /**
   * The dirty marks as they stand, for a push about to walk them. Taken
   * before the push reads anything, so every mark made after it is newer
   * than the walk (swamp-club #3860).
   */
  private takeDirtySnapshot(): DirtySnapshot {
    return {
      paths: new Map(this.dirtyPaths),
      bulkInvalidated: this.bulkInvalidated,
      bulkGen: this.bulkGen,
      overflowed: this.dirtyPathsOverflowed,
      overflowGen: this.overflowGen,
      unhandled: new Set(),
      incomplete: false,
    };
  }

  /** A snapshot for a push that walked nothing: it clears no mark. */
  private emptyDirtySnapshot(): DirtySnapshot {
    return {
      paths: new Map(),
      bulkInvalidated: false,
      bulkGen: this.bulkGen,
      overflowed: false,
      overflowGen: this.overflowGen,
      unhandled: new Set(),
      incomplete: false,
    };
  }

  /** True when the snapshot's walk turned every local absence into a delete. */
  private static snapshotReconcilesDeletions(snap: DirtySnapshot): boolean {
    if (snap.incomplete || snap.unhandled.size > 0) return false;
    return snap.overflowed || (!snap.bulkInvalidated && snap.paths.size > 0);
  }

  /**
   * Clears the marks a push handled: each snapshot path whose generation is
   * unchanged and that the push finished, the bulk flag when no bulk mark
   * came since the snapshot, and the overflow flag likewise. A whole-cache
   * walk that skipped a vanished file clears nothing. Returns whether
   * any mark remains, which is what `localDirty` must say (swamp-club
   * #3860).
   */
  private clearHandledMarks(snap: DirtySnapshot): boolean {
    // An incomplete whole-cache walk handled none of its marks.
    if (!snap.incomplete) {
      for (const [path, gen] of snap.paths) {
        if (snap.unhandled.has(path)) continue;
        if (this.dirtyPaths.get(path) === gen) this.dirtyPaths.delete(path);
      }
      if (snap.bulkInvalidated && this.bulkGen === snap.bulkGen) {
        this.bulkInvalidated = false;
      }
      if (snap.overflowed && this.overflowGen === snap.overflowGen) {
        this.dirtyPathsOverflowed = false;
      }
    }
    return this.hasDirtyMarks();
  }

  /**
   * The local index file's mtime in ms, or null with no local index yet
   * (e.g. first push against an empty cache).
   */
  private async localIndexMtimeMs(): Promise<number | null> {
    try {
      const stat = await Deno.stat(this.indexPath);
      return stat.mtime?.getTime() ?? 0;
    } catch {
      return null;
    }
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
  private async markSynced(
    remoteIndexETag: string,
    handled: DirtySnapshot | "pull",
  ): Promise<void> {
    const normalized = normalizeETag(remoteIndexETag);
    if (!normalized || isMultipartETag(remoteIndexETag)) return;
    let baselineMs = Date.now();
    const mtimeMs = await this.localIndexMtimeMs();
    if (mtimeMs !== null && mtimeMs >= baselineMs) baselineMs = mtimeMs + 1;
    // A pull records the remote it verified against but keeps a cache
    // with unpushed changes dirty, so the next push still sends them. Read
    // after the stat above: a mark made while it ran is a change too
    // (swamp-club #3860). A push clears only the marks it handled.
    let localDirty: boolean;
    if (handled === "pull") {
      localDirty = this.syncState?.localDirty === true;
      if (!localDirty) {
        this.dirtyPaths.clear();
        this.bulkInvalidated = false;
        this.dirtyPathsOverflowed = false;
      }
    } else {
      localDirty = this.clearHandledMarks(handled);
    }
    await this.writeSyncState({
      version: 2,
      remoteIndexETag: normalized,
      lastVerifiedAt: new Date(baselineMs).toISOString(),
      localDirty,
      dirtyPaths: [...this.dirtyPaths.keys()],
      bulkInvalidated: this.bulkInvalidated,
      lazyPullActive: this.lazyPullActive,
      dirtyPathsOverflowed: this.dirtyPathsOverflowed,
      lastCatalogHash: this.lastCatalogHash ?? undefined,
    });
  }

  /**
   * Fast-path probe using commitSeq from _meta.json. Returns `0` if
   * the sidecar's commitSeq matches the remote _meta.json; `null` to
   * fall through to the slow path.
   */
  private async tryCommitSeqFastPath(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar || sidecar.version !== 2) return null;
    const v2 = sidecar as DatastoreSyncStateV2;
    if (v2.commitSeq === undefined) return null;

    const meta = await this.readPartitionMeta(signal);
    if (!meta || meta.version !== 2) return null;
    if ((meta as PartitionMetaV2).commitSeq !== v2.commitSeq) return null;
    return 0;
  }

  /**
   * Fast-path probe for `pullChanged`. Tries commitSeq first (shard-first
   * remotes), then falls back to ETag comparison (pre-shard remotes).
   * Returns `0` when the sidecar proves nothing changed; `null` to fall
   * through to the slow path.
   */
  private async tryFastPullChanged(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const commitSeqResult = await this.tryCommitSeqFastPath(signal);
    if (commitSeqResult !== null) return commitSeqResult;

    // On a v2 remote the monolith is stale: migrating never deletes it and
    // shard-first pushes never update it. A sidecar armed from it would match
    // forever and skip every commit to the shards.
    try {
      if ((await this.readPartitionMeta(signal))?.version === 2) return null;
    } catch {
      return null;
    }

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
      return null;
    }
    let head;
    try {
      head = await this.s3.headObject(this.indexKey(), signal);
    } catch {
      return null;
    }
    if (!head.exists || !head.etag || isMultipartETag(head.etag)) return null;
    if (normalizeETag(head.etag) !== sidecar.remoteIndexETag) return null;
    return 0;
  }

  /**
   * Fast-path probe for `pushChanged`. Tries commitSeq first, then falls
   * back to ETag. Also checks localDirty — a dirty cache must always
   * take the slow path.
   */
  private async tryFastPushChanged(
    _signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar) return null;
    // localDirty is the authority on whether local changes need pushing.
    // No need to verify commitSeq/ETag — those track remote state, which
    // is irrelevant to whether WE have something to push.
    if (!sidecar.localDirty) return 0;
    return null;
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
    options?: {
      forceRemote?: boolean;
      signal?: AbortSignal;
      // False leaves `.datastore-index.json` as it was, for a caller that
      // first removes peer-deleted files against it (swamp-club #2999) and
      // saves the fetched index itself.
      persist?: boolean;
      // Set to true only when the index was fetched from the remote index
      // object. The TTL cache hit and the NotFound/discovery fallback
      // return null too, so callers read this, not the return value, before
      // trusting the index's absences. Per call, so a concurrent pullIndex
      // on this instance cannot reset it.
      report?: { fromRemote: boolean };
    },
  ): Promise<string | null> {
    const signal = options?.signal;
    if (options?.report) options.report.fromRemote = false;
    await this.formatGate.ensureWithinOperation(signal);
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
      const response = await this.s3.getObject(this.indexKey(), signal);
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
    if (options?.report) options.report.fromRemote = true;
    if (options?.persist === false) {
      this.indexMutated ||= this.scrubIndex();
      return etag ?? null;
    }
    await ensureDir(this.cachePath);
    // Scrub zombies, then write the local cache file. If scrub
    // mutated, write the cleaned JSON so on-disk matches in-memory.
    // Otherwise write the raw remote text to preserve the fast path
    // (no re-serialization cost).
    if (this.scrubIndex()) {
      this.indexMutated = true;
      await this.writeLastSynced(this.index);
    } else {
      await this.writeLastSynced(this.index, text);
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
    const subPrefix = this.namespace ? `${this.namespace}/` : undefined;
    const listing = await this.s3.listAllObjects(subPrefix, signal);
    const nsPrefix = this.namespace ? `${this.namespace}/` : "";
    const remoteNamespaces = new Set<string>();
    if (!this.namespace) {
      for (const entry of listing) {
        if (entry.key.endsWith("/.namespace.json")) {
          const ns = entry.key.substring(
            0,
            entry.key.length - "/.namespace.json".length,
          );
          if (ns) remoteNamespaces.add(ns);
        }
      }
    }
    const filtered = listing.filter((entry) => {
      const rel = nsPrefix && entry.key.startsWith(nsPrefix)
        ? entry.key.slice(nsPrefix.length)
        : entry.key;
      if (isInternalCacheFile(rel)) return false;
      if (
        remoteNamespaces.size > 0 &&
        isInsideNamespaceDir(entry.key, remoteNamespaces)
      ) return false;
      return true;
    });

    // Sub-case (1): genuinely empty bucket. Initialize with shard-first
    // (v2) indexing so all subsequent writes use shards from the start —
    // no migration needed. The meta write is best-effort: if it fails
    // (permissions, transient error), the bucket falls back to v1 on
    // this run and retries v2 init on the next.
    if (filtered.length === 0) {
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
      try {
        const meta: PartitionMetaV2 = {
          version: 2,
          partitions: [],
          commitSeq: 0,
        };
        await this.writePartitionMeta(meta, signal);
        this.freshV2Initialized = true;
        tracePhase("pullIndex.discover", discoverStart, "n=0 v2-init");
      } catch {
        tracePhase("pullIndex.discover", discoverStart, "n=0 v2-init-failed");
      }
      // This cache has now synced an empty remote. Without a saved index it
      // could not tell a file it wrote from one a peer deleted. An index it
      // already holds stays: an empty listing reads the same as a wiped one.
      if (await this.readLastSyncedEntries() === null) {
        await ensureDir(this.cachePath);
        await this.writeLastSynced(this.index);
      }
      return null;
    }

    // Sub-case (2): bucket holds data but no index. Build entries from
    // the listing — no localMtime since nothing has been pulled yet;
    // pullChanged will reconcile mtimes as it downloads each file.
    const entries: Record<string, IndexEntry> = {};
    for (const entry of filtered) {
      const rel = nsPrefix && entry.key.startsWith(nsPrefix)
        ? entry.key.slice(nsPrefix.length)
        : entry.key;
      entries[rel] = {
        key: rel,
        size: entry.size,
        lastModified: (entry.lastModified ?? new Date()).toISOString(),
      };
    }
    this.index = {
      version: 1,
      lastPulled: new Date().toISOString(),
      entries,
    };
    const indexData = new TextEncoder().encode(JSON.stringify(this.index));
    const putResult = await retryWithBackoff(
      () => this.s3.putObject(this.indexKey(), indexData, signal),
      { signal },
    );
    await ensureDir(this.cachePath);
    await this.writeLastSynced(this.index);
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

  /**
   * Prefixes covering every remote key the index could resolve to, for the
   * bulk-diff listing. `<namespace>/` catches the namespaced objects, and one
   * prefix per distinct leading path segment catches the pre-namespace root
   * keys `pullFile` falls back to on a 404.
   *
   * Derived from the index rather than `DATA_SUBDIRS` because
   * `migrateRootDataToNamespace` only ever migrated keys in that set — root
   * keys outside it still exist and must stay visible to the pruning pass.
   *
   * An empty result means the index is empty and there is no namespace, so
   * the pruning loop has nothing to walk. It never widens to the whole
   * prefix: that is the O(all co-tenant objects) listing this exists to
   * avoid (swamp-club #2242).
   */
  private bulkDiffPrefixes(
    rels: Iterable<string> = Object.keys(this.index?.entries ?? {}),
  ): string[] {
    const prefixes = new Set<string>();
    if (this.namespace) prefixes.add(`${this.namespace}/`);
    for (const rel of rels) {
      const slash = rel.indexOf("/");
      // A slash-less entry is a root key and becomes its own prefix, so the
      // listing can over-match a sibling like `topfileXYZ`. Harmless: the
      // resulting `remoteKeys` set is only ever probed with keys already in
      // the index, so an extra key is never read (swamp-club #2242).
      prefixes.add(slash > 0 ? rel.slice(0, slash + 1) : rel);
    }
    return [...prefixes];
  }

  /**
   * Writes `.datastore-index.json` after a push, and reports whether the
   * on-disk index is complete afterwards.
   *
   * A dirty-path-scoped push assembles only the dirty shards, so `this.index`
   * is a partial view (`indexIsPartial`). Writing it verbatim truncates the
   * on-disk index, dropping every untouched shard's entries. Until
   * swamp-club #2242 that was survivable only because the stale commitSeq
   * forced the next pull down the slow path, which rebuilt the index from
   * all shards. Now that a scoped push can re-arm the fast path, the write
   * has to preserve what it did not touch: merge the delta into the complete
   * on-disk index instead of replacing it.
   *
   * Returns false when the index could not be written or merged. That is not
   * fatal — the caller declines to arm the fast path, so the next pull takes
   * the slow path and rebuilds, exactly as before.
   */
  private async writeLocalIndexAfterPush(
    changed: Iterable<string>,
    removed: Iterable<string>,
  ): Promise<boolean> {
    if (!this.index) return false;
    if (!this.indexIsPartial) {
      try {
        await this.writeLastSynced(this.index);
        return true;
      } catch (err) {
        console.warn(
          `[s3-sync] Index writeback failed, fast path stays unarmed: ${err}`,
        );
        return false;
      }
    }
    try {
      const onDisk = JSON.parse(
        await Deno.readTextFile(this.indexPath),
      ) as DatastoreIndex;
      if (!onDisk?.entries) return false;
      for (const rel of changed) {
        const entry = this.index.entries[rel];
        if (entry) onDisk.entries[rel] = entry;
      }
      for (const rel of removed) {
        delete onDisk.entries[rel];
      }
      onDisk.lastPulled = this.index.lastPulled;
      await this.writeLastSynced(onDisk);
      // Keep the in-memory view in step with disk: a re-armed fast path
      // returns early on the next pull and would otherwise leave this
      // process reading a partial index for the rest of its life.
      //
      // `indexIsPartial` deliberately stays set. The merge is only provably
      // complete when the on-disk baseline was current, and that is the
      // caller's condition to check (`committed.upToDate` plus
      // `priorCommitSeq`), not something visible from here. Clearing it
      // would let the `localHasAllRemoteEntries()` arm validate a baseline
      // that is stale because another writer committed — the exact case
      // the compare-and-swap verdict exists to catch (swamp-club #2242).
      this.index = onDisk;
      return true;
    } catch (err) {
      console.warn(
        `[s3-sync] Index merge failed, fast path stays unarmed: ${err}`,
      );
      return false;
    }
  }

  /** Fetches a single file from S3 to the local cache. */
  async pullFile(
    relativePath: string,
    signal?: AbortSignal,
  ): Promise<void> {
    return await getTracer().startActiveSpan(
      "s3-datastore pullFile",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_FILE, relativePath);
          await this.formatGate.ensureWithinOperation(signal);
          const localPath = assertSafePath(
            this.cachePath,
            this.localRelPath(relativePath),
          );
          await ensureDir(dirname(localPath));
          const streamToDisk = async (key: string) => {
            const { body } = await this.s3.getObjectStream(key, signal);
            const file = await Deno.open(localPath, {
              write: true,
              create: true,
              truncate: true,
            });
            try {
              await body.pipeTo(file.writable);
            } catch (err) {
              try {
                file.close();
              } catch { /* already closed by pipeTo */ }
              throw err;
            }
          };
          try {
            await retryWithBackoff(
              () => streamToDisk(this.dataKey(relativePath)),
              { signal },
            );
          } catch (err) {
            if (
              this.namespace && err instanceof Error &&
              (err.name === "NotFound" || err.name === "NoSuchKey")
            ) {
              await retryWithBackoff(
                () => streamToDisk(relativePath),
                { signal },
              );
            } else {
              throw err;
            }
          }
          try {
            await this.recordOwnMtime(
              relativePath,
              await Deno.stat(localPath),
              this.index?.entries[relativePath]?.sha256,
            );
          } catch {
            // Non-fatal: an unrecorded file is hashed next time.
          }
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
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
    return await getTracer().startActiveSpan(
      "s3-datastore pull",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          this.bindNamespace(options?.namespace);
          throwIfAborted(signal);
          await this.ensureSyncable(signal);

          // Subdir-scoped pull (configRefresh): only list, walk, prune and
          // download entries under these prefixes. A scoped pull never
          // claims the whole cache is in sync — it must not advance the
          // fast-path sidecar or clear lazy hydration, or a later unscoped
          // pull would skip the out-of-scope changes (swamp-club #2246).
          const subdirs = (options?.subdirs ?? [])
            .map((d) => d.replace(/\/+$/, ""))
            .filter((d) => d.length > 0);
          const scoped = subdirs.length > 0;

          const skipFastPath = this.lazyPullActive && !options?.metadataOnly;
          const fastStart = Date.now();
          const fastResult = skipFastPath
            ? null
            : await this.tryFastPullChanged(signal);
          tracePhase(
            "pullChanged.fastpath",
            fastStart,
            skipFastPath
              ? "skip(lazy→full)"
              : fastResult === 0
              ? "hit"
              : "miss",
          );
          if (fastResult !== null) {
            span.setAttribute(Attr.DATASTORE_FAST_PATH_HIT, true);
            span.setAttribute(Attr.DATASTORE_FILES_PULLED, 0);
            return fastResult;
          }

          const indexStart = Date.now();
          const models = options?.context?.models;
          let modelsScopedRead = false;
          let indexETag: string | null = null;
          let v2CommitSeq: number | null = null;
          // What this cache last synced, read before the remote index
          // replaces it. A models-scoped pull that finds its partitions only
          // merges them into the index, so it never sees a removal and skips
          // this.
          let lastSynced: Record<string, IndexEntry> | null = null;
          let indexFromRemote = false;
          // Reads the whole remote index — shards, else the monolith — and
          // leaves saving it until peer-deleted files are removed below.
          const readWholeIndex = async () => {
            lastSynced = await this.readLastSyncedEntries();
            const assembled = await this.assembleIndexFromShards(signal);
            if (assembled) {
              this.index = {
                version: 1,
                lastPulled: new Date().toISOString(),
                entries: assembled.entries,
              };
              this.scrubIndex();
              indexETag = null;
              v2CommitSeq = assembled.commitSeq;
              indexFromRemote = true;
            } else {
              const report = { fromRemote: false };
              indexETag = await this.pullIndex({
                forceRemote: true,
                signal,
                persist: false,
                report,
              });
              indexFromRemote = report.fromRemote;
            }
            this.indexIsPartial = false;
          };

          if (models && models.length > 0) {
            // Scoped pull: try partition files first, fall back to the whole
            // index.
            const partitionEntries = await this.pullPartitionedIndex(
              models,
              signal,
            );
            if (partitionEntries) {
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
              // Only these models' shards were read: no later arm in this
              // process may trust the index as complete (swamp-club #3193).
              this.indexIsPartial = true;
              modelsScopedRead = true;
              indexETag = null;
            } else {
              // A model with no shard: read the whole index the way an
              // unscoped pull does, so it is reconciled before it is saved.
              await readWholeIndex();
            }
          } else {
            await readWholeIndex();
          }
          tracePhase("pullChanged.pullIndex", indexStart);

          // Drop local copies of files a peer deleted, so the next push
          // does not upload them again (swamp-club #2999). A subdir-scoped
          // pull still read, and saves, the whole index: a deletion it left
          // out of scope would be gone from the saved index by the next
          // pull, so it reconciles every entry, not only its subdirs.
          if (indexFromRemote) {
            await this.removePeerDeletedFiles(lastSynced, () => true, signal);
          }
          // The fetched index is saved only now. Saved before the removal,
          // an interrupted pull would leave the unremoved files out of the
          // last-synced index, where no later sync would find them.
          if (indexFromRemote) await this.saveIndex();

          // Metadata-only pull: skip raw content files under data/ — download
          // only metadata.yaml, latest pointers, and everything outside data/.
          // Create parent dirs for skipped files so readdir works for the
          // catalog walker.
          const metadataOnly = !!options?.metadataOnly;

          // Bulk-diff: fetch a remote listing to know which files
          // actually exist, pruning stale index entries without per-file
          // getObject 404s — O(files/1000) list calls instead of
          // O(files) round-trips (swamp-club #2033).
          //
          // The listing is scoped to `bulkDiffPrefixes()` — the namespace
          // subtree plus the root segments the index references — never the
          // whole prefix, which would walk every co-tenant namespace sharing
          // it (swamp-club #2242).
          //
          // On listing failure (permissions, network), fall back to the
          // pre-#2033 per-file behavior — no pruning, 404s discovered
          // during download. `Promise.all` keeps that all-or-nothing: one
          // failed prefix aborts into the catch and leaves `remoteKeys`
          // null. Partial listings must never drive pruning — an entry
          // missing only because its listing failed would be deleted.
          //
          // Scoped pulls list each subdir at both root and namespace so the
          // same pre-namespace root-key fallback still holds.
          const listStart = Date.now();
          const listNsPrefix = this.namespace ? `${this.namespace}/` : "";
          let remoteKeys: Set<string> | null = null;
          try {
            const listPrefixes = scoped
              ? subdirs.flatMap((d) => [
                `${d}/`,
                ...(listNsPrefix ? [`${listNsPrefix}${d}/`] : []),
              ])
              : this.bulkDiffPrefixes();
            // No prefixes means no index entries to diff, so there is
            // nothing to prune. `remoteKeys` stays null rather than
            // becoming an empty set, because an empty listing must never
            // be read as "every entry is gone from the remote"
            // (swamp-club #2242).
            if (listPrefixes.length > 0) {
              const remoteListing = (await Promise.all(
                listPrefixes.map((p) =>
                  retryWithBackoff(() => this.s3.listAllObjects(p, signal), {
                    signal,
                  })
                ),
              )).flat();
              remoteKeys = new Set<string>();
              for (const listEntry of remoteListing) {
                if (listNsPrefix && listEntry.key.startsWith(listNsPrefix)) {
                  remoteKeys.add(listEntry.key.slice(listNsPrefix.length));
                } else {
                  remoteKeys.add(listEntry.key);
                }
              }
            }
          } catch {
            // Non-fatal: listing failed, skip bulk pruning.
          }
          tracePhase(
            "pullChanged.remoteListing",
            listStart,
            remoteKeys ? `keys=${remoteKeys.size}` : "fallback",
          );

          // Build list of files that need pulling
          const walkStart = Date.now();
          const toPull: string[] = [];
          const lazyDirsToCreate: Set<string> = new Set();
          const pull404Rels = new Set<string>();
          // This copy's mtime for content it verified: files it downloaded
          // or hash-matched. Never a hashless entry it only compared by size,
          // whose mtime would hide a same-size local edit.
          const verifiedMtimes = new Map<string, string>();
          for (
            const [rel, entry] of Object.entries(this.index?.entries ?? {})
          ) {
            // Belt-and-suspenders: `scrubIndex` already removed internal
            // entries in `pullIndex`, but if anything re-adds a zombie
            // between the scrub and the walk, this guard still catches it.
            if (isInternalCacheFile(rel)) {
              continue;
            }
            // Doubled-path entry pushed by the swamp-club#2404 bug: neither
            // pulled nor pruned. Silent, because the remote entry stays and a
            // warning here would repeat on every pull.
            if (isStrayNamespacePath(rel, this.namespace)) continue;
            // Out of scope: not listed, so must not be pruned or pulled.
            if (scoped && !isInSubdirs(rel, subdirs)) {
              continue;
            }
            // Prune entries whose remote object no longer exists — the
            // listing already told us, no per-file getObject needed.
            // Skipped when the listing failed (remoteKeys is null).
            if (remoteKeys && !remoteKeys.has(rel)) {
              if (this.index) {
                pull404Rels.add(rel);
                delete this.index.entries[rel];
                this.indexMutated = true;
              }
              continue;
            }
            if (metadataOnly && isLazySkippable(rel)) {
              const localPath = assertSafePath(
                this.cachePath,
                this.localRelPath(rel),
              );
              lazyDirsToCreate.add(dirname(localPath));
              continue;
            }
            const localPath = assertSafePath(
              this.cachePath,
              this.localRelPath(rel),
            );
            try {
              const stat = await Deno.stat(localPath);
              if (stat.size === entry.size) {
                // Same size — skip the hash only when this copy's own record
                // says the file still holds the entry's sha256. The entry's
                // localMtime is the pusher's, so it cannot vouch for this
                // copy's bytes (swamp-club#3546). Hashless entries stay
                // size-only.
                if (entry.sha256) {
                  const own = await this.ownRecordFor(rel, stat, true);
                  if (own?.sha256 !== entry.sha256) {
                    const localHash = await streamingSha256(localPath);
                    if (localHash !== entry.sha256) {
                      toPull.push(rel);
                      continue;
                    }
                    await this.recordOwnMtime(rel, stat, localHash);
                  }
                  if (stat.mtime) {
                    verifiedMtimes.set(rel, stat.mtime.toISOString());
                  }
                }
                // Reconcile localMtime so pushChanged() doesn't treat it as
                // changed due to mtime drift (e.g. file was placed by migration
                // or a different machine pushed the index).
                if (
                  this.index && stat.mtime &&
                  entry.sha256 &&
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
                  const localPath = join(
                    this.cachePath,
                    this.localRelPath(rel),
                  );
                  const stat = await Deno.stat(localPath);
                  if (stat.mtime && this.index) {
                    this.index.entries[rel].localMtime = stat.mtime
                      .toISOString();
                    verifiedMtimes.set(rel, stat.mtime.toISOString());
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
                const err = result.reason;
                if (
                  err instanceof Error &&
                  (err.name === "NotFound" || err.name === "NoSuchKey") &&
                  this.index
                ) {
                  pull404Rels.add(batch[j]);
                  delete this.index.entries[batch[j]];
                  this.indexMutated = true;
                } else {
                  failures.push({ file: batch[j], error: err });
                }
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
          // A shard read saved the index before this walk, and a models-scoped
          // read saved nothing, so record what the walk verified now. Field
          // by field, and before the sidecar writes below (see the ordering
          // invariant above).
          if (v2CommitSeq !== null || modelsScopedRead) {
            try {
              const upserts: Record<string, IndexEntry> = {};
              if (modelsScopedRead && this.index) {
                for (const [rel, mtime] of verifiedMtimes) {
                  const entry = this.index.entries[rel];
                  if (entry) upserts[rel] = { ...entry, localMtime: mtime };
                }
              }
              await this.mergeIntoLastSynced({
                upserts,
                mtimes: verifiedMtimes,
              });
            } catch (err) {
              console.warn(
                `[s3-sync] Could not update the local index: ${err}`,
              );
            }
          }

          if (indexETag) {
            try {
              if ((pulled > 0 || this.indexMutated) && this.index) {
                await this.writeLastSynced(this.index);
                if (this.indexMutated) {
                  const indexData = new TextEncoder().encode(
                    JSON.stringify(this.index),
                  );
                  const putResult = await retryWithBackoff(
                    () => this.s3.putObject(this.indexKey(), indexData, signal),
                    { signal },
                  );
                  this.indexMutated = false;
                  indexETag = putResult?.etag ?? indexETag;
                }
              }
              if (!scoped) {
                await this.markSynced(indexETag, "pull");
              }
            } catch {
              // Non-fatal: sidecar update is opportunistic. Disk-full /
              // permissions / unmount must not turn a successful sync into
              // a failure — the sidecar is a fast-path optimization, and a
              // missed update only costs one slow-path sync next time.
            }
          } else if (
            v2CommitSeq !== null && this.indexMutated &&
            pull404Rels.size > 0 && this.index
          ) {
            // Shard-first path: 404 cleanup removed stale entries from
            // the in-memory index. CAS-remove only those entries from the
            // affected shards so they don't reappear on the next boot
            // (swamp-club #2063) and concurrent additions survive
            // (swamp-club#2245).
            try {
              const committed = await this.commitShardChanges(
                {},
                pull404Rels,
                v2CommitSeq,
                signal,
              );

              await this.mergeIntoLastSynced({ removals: pull404Rels });
              this.indexMutated = false;

              if (!scoped) {
                // Keeps localDirty: see the clean-pull branch below.
                const sidecar = this.buildV2State();
                if (committed.upToDate) {
                  sidecar.commitSeq = committed.commitSeq;
                }
                sidecar.remoteIndexETag = "";
                await this.writeSyncState(sidecar);
              }
            } catch {
              // Non-fatal: shard writeback is opportunistic. A missed
              // cleanup only costs repeated 404s on the next boot —
              // the same behavior as before this fix.
            }
          } else if (v2CommitSeq !== null && !scoped) {
            // Shard-first path, clean pull (no 404 cleanup, no monolithic
            // index ETag). Record commitSeq in the sidecar so the fast
            // path can arm on the next pull (swamp-club #1931).
            try {
              // A pull records the remote it verified but leaves
              // localDirty as it is: only a push sends the changes a dirty
              // sidecar tracks, and a failed push leaves some unsent.
              const sidecar = this.buildV2State();
              sidecar.commitSeq = v2CommitSeq;
              sidecar.remoteIndexETag = "";
              await this.writeSyncState(sidecar);
            } catch {
              // Non-fatal: missed sidecar update only costs one slow-path
              // sync next time.
            }
          }

          if (metadataOnly) {
            this.lazyPullActive = true;
            await this.writeSyncState(
              this.buildV2State({ lazyPullActive: true }),
            );
          } else if (
            this.lazyPullActive && !options?.context?.models?.length &&
            !scoped
          ) {
            this.lazyPullActive = false;
            await this.writeSyncState(
              this.buildV2State({ lazyPullActive: false }),
            );
          }

          span.setAttribute(Attr.DATASTORE_FAST_PATH_HIT, false);
          span.setAttribute(Attr.DATASTORE_FILES_PULLED, pulled);
          return pulled;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          await this.flushOwnMtimes();
          span.end();
        }
      },
    );
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
    overrideLocalPath?: string,
  ): Promise<void> {
    return await getTracer().startActiveSpan(
      "s3-datastore pushFile",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_FILE, relativePath);
          await this.formatGate.ensureWithinOperation(signal);
          await this.markDirty();
          let localPath: string;
          if (overrideLocalPath) {
            const resolved = normalize(overrideLocalPath);
            if (!isWithinDir(this.cachePath, resolved)) {
              throw new Error(`Path traversal detected: ${overrideLocalPath}`);
            }
            localPath = resolved;
          } else {
            localPath = assertSafePath(this.cachePath, relativePath);
          }
          // Stat before the read: a write racing the read then leaves the
          // file at another mtime, so the record cannot vouch for it.
          const preReadStat = await Deno.stat(localPath);
          const data = await Deno.readFile(localPath);
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const sha256 = Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          await retryWithBackoff(
            () => this.s3.putObject(this.dataKey(relativePath), data, signal),
            { signal },
          );
          await this.recordOwnMtime(relativePath, preReadStat, sha256);

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
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
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
    return await getTracer().startActiveSpan(
      "s3-datastore push",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          this.bindNamespace(options?.namespace);
          throwIfAborted(signal);
          await this.ensureSyncable(signal);

          const syncState = await this.loadSyncState() as
            | DatastoreSyncStateV2
            | null;
          // Captured before any intermediate sidecar write. This is the
          // commitSeq the on-disk index baseline was built at; the arm below
          // needs it to see commits that landed BEFORE this push read its
          // base, which the compare-and-swap verdict cannot (swamp-club
          // #2242, swamp-club #2245).
          const priorCommitSeq = syncState?.version === 2
            ? syncState.commitSeq
            : undefined;
          const needsDataKeyMigration = this.namespace != null &&
            !syncState?.dataKeyMigrated;
          const needsControlPlaneMigration = this.namespace != null &&
            !syncState?.controlPlaneKeysMigrated;

          const fastStart = Date.now();
          const fastResult = needsDataKeyMigration || needsControlPlaneMigration
            ? null
            : await this.tryFastPushChanged(signal);
          tracePhase(
            "pushChanged.fastpath",
            fastStart,
            needsDataKeyMigration || needsControlPlaneMigration
              ? "skip(migration)"
              : fastResult === 0
              ? "hit"
              : "miss",
          );
          if (fastResult !== null) {
            span.setAttribute(Attr.DATASTORE_FAST_PATH_HIT, true);
            span.setAttribute(Attr.DATASTORE_FILES_PUSHED, 0);
            span.setAttribute(Attr.DATASTORE_FILES_DELETED, 0);
            return fastResult;
          }

          // The marks this push walks, taken before it reads anything: it
          // clears only these, so a mark made while it runs survives it
          // (swamp-club #3860).
          const snap = this.takeDirtySnapshot();
          const indexStart = Date.now();
          let indexETag: string | null = null;
          let v2CommitSeq: number | null = null;
          const lastSynced = await this.readLastSyncedEntries();
          const willScopeWalk = !snap.bulkInvalidated && snap.paths.size > 0;
          const assembled = willScopeWalk
            ? await this.assembleDirtyShardsOnly(snap.paths.keys(), signal)
            : await this.assembleIndexFromShards(signal);
          let indexFromRemote = assembled !== null;
          if (assembled) {
            this.index = {
              version: 1,
              lastPulled: new Date().toISOString(),
              entries: assembled.entries,
            };
            this.indexIsPartial = willScopeWalk;
            this.scrubIndex();
            v2CommitSeq = assembled.commitSeq;
            tracePhase(
              "pushChanged.shardAssembly",
              indexStart,
              willScopeWalk ? `scoped=${snap.paths.size}` : `full`,
            );
          } else {
            const report = { fromRemote: false };
            indexETag = await this.pullIndex({
              forceRemote: true,
              signal,
              persist: false,
              report,
            });
            this.indexIsPartial = false;
            indexFromRemote = report.fromRemote;
            if (this.freshV2Initialized) {
              v2CommitSeq = 0;
              indexETag = null;
            }
            tracePhase("pushChanged.pullIndex", indexStart);
          }

          if (needsDataKeyMigration) {
            if (assembled) {
              // v2 shard-first index is in place — data is already
              // namespaced, skip root migration (swamp-club #2091).
              try {
                // Leaves localDirty as it is: nothing is pushed yet.
                const sidecar = this.buildV2State();
                sidecar.dataKeyMigrated = true;
                await this.writeSyncState(sidecar);
              } catch { /* non-fatal */ }
            } else {
              const { copied, total } = await this.migrateRootDataToNamespace(
                signal,
              );
              const allMigrated = total === 0 || copied === total;
              try {
                const sidecar = this.buildV2State();
                if (allMigrated) sidecar.dataKeyMigrated = true;
                await this.writeSyncState(sidecar);
              } catch { /* non-fatal */ }
              if (copied > 0) return copied;
            }
          }

          if (needsControlPlaneMigration) {
            const { copied, total } = await this
              .migrateRootControlPlaneToNamespace(signal);
            try {
              const sidecar = this.buildV2State();
              if (total === 0 || copied === total) {
                sidecar.controlPlaneKeysMigrated = true;
              }
              await this.writeSyncState(sidecar);
            } catch { /* non-fatal */ }
          }

          // A peer's deletions must not come back with this push
          // (swamp-club #2999).
          if (indexFromRemote) {
            await this.removePeerDeletedFiles(
              lastSynced,
              this.assembledScope(assembled?.readKeys),
              signal,
            );
          }
          // pullIndex left the fetched monolith unsaved so the removal above
          // could run against the last-synced index first (swamp-club #2999).
          if (assembled === null && indexFromRemote) await this.saveIndex();

          const walkStart = Date.now();
          const { toPush, toDelete } = await this.collectPushWork(snap, true);
          tracePhase(
            "pushChanged.walk",
            walkStart,
            `toPush=${toPush.length} toDelete=${toDelete.length}`,
          );

          // Upload concurrently in batches
          const uploadStart = Date.now();
          if (toPush.length > 0) {
            await this.formatGate.ensureWithinOperation(signal);
          }
          const uploaded: string[] = [];
          const failures = await this.uploadPushCandidates(
            toPush,
            snap,
            signal,
            (rel, entry) => {
              uploaded.push(rel);
              if (this.index) this.index.entries[rel] = entry;
            },
          );
          const pushed = uploaded.length;
          tracePhase("pushChanged.upload", uploadStart, `pushed=${pushed}`);

          if (failures.length > 0) {
            throw new Error(formatBatchFailure("push", failures));
          }

          // Delete remote objects for locally-absent files (swamp-club#797).
          const deleteStart = Date.now();
          let deleted = 0;
          const deleteFailures: Array<{ file: string; error: unknown }> = [];
          for (let i = 0; i < toDelete.length; i += this.pushConcurrency) {
            throwIfAborted(signal);
            const batch = toDelete.slice(i, i + this.pushConcurrency);
            const results = await Promise.allSettled(
              batch.map((rel) =>
                retryWithBackoff(
                  () => this.s3.deleteObject(this.dataKey(rel), signal),
                  { signal },
                )
              ),
            );
            for (let j = 0; j < results.length; j++) {
              const result = results[j];
              if (result.status === "fulfilled") {
                deleted++;
                if (this.index) {
                  delete this.index.entries[batch[j]];
                  this.indexMutated = true;
                }
              } else {
                deleteFailures.push({ file: batch[j], error: result.reason });
              }
            }
          }
          tracePhase("pushChanged.delete", deleteStart, `deleted=${deleted}`);

          if (deleteFailures.length > 0) {
            throw new Error(formatBatchFailure("delete", deleteFailures));
          }

          // Push updated index if anything changed — either new files were
          // pushed, files were deleted, or scrubIndex removed zombie entries
          // that need to propagate to the remote (swamp-club#29 migration path).
          if ((pushed > 0 || deleted > 0 || this.indexMutated) && this.index) {
            const writebackStart = Date.now();
            if (pushed > 0 || deleted > 0) {
              this.index.lastPulled = new Date().toISOString();
            }

            const dirtyPartitionKeys = new Set<string>();
            for (const rel of uploaded) {
              const key = S3CacheSyncService.partitionKeyFromPath(rel);
              if (key) dirtyPartitionKeys.add(key);
            }
            for (const rel of toDelete) {
              const key = S3CacheSyncService.partitionKeyFromPath(rel);
              if (key) dirtyPartitionKeys.add(key);
            }

            if (v2CommitSeq !== null) {
              // v2: CAS-merge only this push's upserts and deletes into
              // the dirty shards and _meta.json (swamp-club#2245). Skip
              // monolith PUT — shards are the source of truth. Failures
              // propagate so the push stays dirty.
              const upserts: Record<string, IndexEntry> = {};
              for (const rel of uploaded) {
                const entry = this.index.entries[rel];
                if (entry) upserts[rel] = entry;
              }
              const committed = await this.commitShardChanges(
                upserts,
                toDelete,
                v2CommitSeq,
                signal,
              );

              const indexComplete = await this.writeLocalIndexAfterPush(
                uploaded,
                toDelete,
              );
              this.indexMutated = false;

              // The merged-index arm below assumes this push is the only
              // delta since the sidecar was armed. That holds only when the
              // walk turned every local absence into a remote delete: a
              // scoped walk stats each dirty path, and a bulk walk
              // reconciles only under `dirtyPathsOverflowed`. A bare
              // `markDirty()` bulk walk deliberately keeps remote files
              // whose local copies are gone, and lazy pull leaves entries
              // un-hydrated on purpose — in both cases the cache is less
              // complete than when it was armed, and only
              // `localHasAllRemoteEntries()` can see it (swamp-club #2242).
              const deletionsReconciled = !this.lazyPullActive &&
                S3CacheSyncService.snapshotReconcilesDeletions(snap);

              try {
                // Clears only the marks this push handled; one made while
                // it ran keeps the cache dirty (swamp-club #3860).
                // Two windows have to be clean for the merged-index arm.
                // `committed.upToDate` is the compare-and-swap's verdict that
                // nothing landed between the base commitSeq and this commit
                // (swamp-club #2245); `priorCommitSeq === v2CommitSeq` says
                // nothing landed before this push read that base, so the
                // on-disk index it merged into is not itself stale
                // (swamp-club #2242). A full index still arms the old way,
                // via the stat walk, but `indexComplete` gates both arms: a
                // failed index write leaves disk missing this push's entries,
                // and an armed commitSeq would stop the next pull from ever
                // rebuilding it.
                const armCommitSeq = committed.upToDate && indexComplete &&
                  ((deletionsReconciled &&
                    priorCommitSeq === v2CommitSeq) ||
                    (!this.indexIsPartial &&
                      await this.localHasAllRemoteEntries()));
                // Cleared after the await above, next to the write, so the
                // marks it clears are exactly the ones it persists.
                const localDirty = this.clearHandledMarks(snap);
                const sidecar = this.buildV2State({ localDirty });
                if (armCommitSeq) sidecar.commitSeq = committed.commitSeq;
                sidecar.remoteIndexETag = "";
                await this.writeSyncState(sidecar);
              } catch {
                // Non-fatal: sidecar update is opportunistic.
              }
              tracePhase("pushChanged.v2writeback", writebackStart);
            } else {
              // v1: write monolith + dual-write partitions.
              const indexData = new TextEncoder().encode(
                JSON.stringify(this.index),
              );
              const putResult = await retryWithBackoff(
                () => this.s3.putObject(this.indexKey(), indexData, signal),
                { signal },
              );
              await this.writeLastSynced(this.index);
              this.indexMutated = false;

              await this.writePartitionedIndex(
                this.index,
                signal,
                dirtyPartitionKeys.size > 0 ? dirtyPartitionKeys : undefined,
              );
              // Record the new index ETag as the verified-clean baseline
              // (swamp-club #168, swamp-club#1225).
              const etag = putResult?.etag;
              if (
                etag && !isMultipartETag(etag) &&
                await this.localHasAllRemoteEntries()
              ) {
                try {
                  await this.markSynced(etag, snap);
                } catch {
                  // Non-fatal: sidecar update is opportunistic.
                }
              }
              tracePhase("pushChanged.writeback", writebackStart);
            }
          } else if (v2CommitSeq !== null && this.index) {
            // v2 no-writeback: update sidecar with current commitSeq.
            try {
              const armCommitSeq = !this.indexIsPartial &&
                await this.localHasAllRemoteEntries();
              // Cleared after the await above, next to the write, so the
              // marks it clears are exactly the ones it persists.
              const localDirty = this.clearHandledMarks(snap);
              const sidecar = this.buildV2State({ localDirty });
              if (armCommitSeq) sidecar.commitSeq = v2CommitSeq;
              sidecar.remoteIndexETag = "";
              await this.writeSyncState(sidecar);
            } catch {
              // Non-fatal: sidecar update is opportunistic.
            }
          } else if (indexETag && this.index) {
            // v1 no-writeback: verify local matches remote before marking
            // clean (swamp-club#1225 data-loss scenario).
            if (
              !isMultipartETag(indexETag) &&
              await this.localHasAllRemoteEntries()
            ) {
              try {
                await this.markSynced(indexETag, snap);
              } catch {
                // Non-fatal: sidecar update is opportunistic.
              }
            }
          }

          span.setAttribute(Attr.DATASTORE_FAST_PATH_HIT, false);
          span.setAttribute(Attr.DATASTORE_FILES_PUSHED, pushed);
          span.setAttribute(Attr.DATASTORE_FILES_DELETED, deleted);
          return pushed + deleted;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          await this.flushOwnMtimes();
          span.end();
        }
      },
    );
  }

  async preparePush(
    options?: DatastoreSyncOptions,
  ): Promise<PushManifest> {
    return await getTracer().startActiveSpan(
      "s3-datastore preparePush",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          this.bindNamespace(options?.namespace);
          throwIfAborted(signal);
          await this.ensureSyncable(signal);

          const prepareStart = Date.now();
          const prepSyncState = await this.loadSyncState() as
            | DatastoreSyncStateV2
            | null;
          const needsDataKeyMigration = this.namespace != null &&
            !prepSyncState?.dataKeyMigrated;
          const needsControlPlaneMigration = this.namespace != null &&
            !prepSyncState?.controlPlaneKeysMigrated;

          // Returned when the push walks nothing, so its commit clears no
          // mark (swamp-club #3860).
          const emptyManifest: InternalPushManifest = {
            newEntries: {},
            deletedKeys: [],
            pushed: 0,
            deleted: 0,
            dirtyPartitionKeys: [],
            dirtySnapshot: this.emptyDirtySnapshot(),
          };

          const fastStart = Date.now();
          const fastResult = needsDataKeyMigration || needsControlPlaneMigration
            ? null
            : await this.tryFastPushChanged(signal);
          tracePhase(
            "preparePush.fastpath",
            fastStart,
            needsDataKeyMigration || needsControlPlaneMigration
              ? "skip(migration)"
              : fastResult !== null
              ? "hit"
              : "miss",
          );
          if (fastResult !== null) {
            return {
              ...emptyManifest,
              indexUnread: true,
            } as unknown as PushManifest;
          }

          // The marks this push walks, taken before it reads anything; the
          // manifest carries them to commitPush, which clears only these
          // (swamp-club #3860).
          const snap = this.takeDirtySnapshot();
          const indexStart = Date.now();
          const lastSynced = await this.readLastSyncedEntries();
          const prepWillScope = !snap.bulkInvalidated && snap.paths.size > 0;
          const prepAssembled = prepWillScope
            ? await this.assembleDirtyShardsOnly(snap.paths.keys(), signal)
            : await this.assembleIndexFromShards(signal);
          let indexFromRemote = prepAssembled !== null;
          if (prepAssembled) {
            this.index = {
              version: 1,
              lastPulled: new Date().toISOString(),
              entries: prepAssembled.entries,
            };
            this.indexIsPartial = prepWillScope;
            this.scrubIndex();
            tracePhase(
              "preparePush.shardAssembly",
              indexStart,
              prepWillScope ? `scoped=${snap.paths.size}` : `full`,
            );
          } else {
            const report = { fromRemote: false };
            await this.pullIndex({
              forceRemote: true,
              signal,
              persist: false,
              report,
            });
            this.indexIsPartial = false;
            indexFromRemote = report.fromRemote;
            tracePhase("preparePush.pullIndex", indexStart);
          }

          if (needsDataKeyMigration) {
            if (prepAssembled) {
              // v2 shard-first index is in place — data is already
              // namespaced, skip root migration (swamp-club #2091).
              try {
                // Leaves localDirty as it is: nothing is pushed yet.
                const sidecar = this.buildV2State();
                sidecar.dataKeyMigrated = true;
                await this.writeSyncState(sidecar);
              } catch { /* non-fatal */ }
            } else {
              const { copied, total } = await this.migrateRootDataToNamespace(
                signal,
              );
              const allMigrated = total === 0 || copied === total;
              try {
                const sidecar = this.buildV2State();
                if (allMigrated) sidecar.dataKeyMigrated = true;
                await this.writeSyncState(sidecar);
              } catch { /* non-fatal */ }
              if (total > 0) return emptyManifest as unknown as PushManifest;
            }
          }

          if (needsControlPlaneMigration) {
            const { copied, total } = await this
              .migrateRootControlPlaneToNamespace(signal);
            try {
              const sidecar = this.buildV2State();
              if (total === 0 || copied === total) {
                sidecar.controlPlaneKeysMigrated = true;
              }
              await this.writeSyncState(sidecar);
            } catch { /* non-fatal */ }
          }

          // A peer's deletions must not come back with this push
          // (swamp-club #2999).
          if (indexFromRemote) {
            await this.removePeerDeletedFiles(
              lastSynced,
              this.assembledScope(prepAssembled?.readKeys),
              signal,
            );
          }
          // pullIndex left the fetched monolith unsaved so the removal above
          // could run against the last-synced index first (swamp-club #2999).
          if (prepAssembled === null && indexFromRemote) await this.saveIndex();

          const { toPush, toDelete } = await this.collectPushWork(snap, false);
          tracePhase(
            "preparePush.walk",
            prepareStart,
            `toPush=${toPush.length} toDelete=${toDelete.length}`,
          );

          const uploadStart = Date.now();
          const newEntries: Record<string, IndexEntry> = {};
          const failures = await this.uploadPushCandidates(
            toPush,
            snap,
            signal,
            (rel, entry) => {
              newEntries[rel] = entry;
            },
          );
          const pushed = Object.keys(newEntries).length;

          tracePhase("preparePush.upload", uploadStart, `pushed=${pushed}`);

          if (failures.length > 0) {
            throw new Error(formatBatchFailure("push", failures));
          }

          const deleteStart = Date.now();
          const deletedKeys: string[] = [];
          let deleted = 0;
          const deleteFailures: Array<{ file: string; error: unknown }> = [];
          for (let i = 0; i < toDelete.length; i += this.pushConcurrency) {
            throwIfAborted(signal);
            const batch = toDelete.slice(i, i + this.pushConcurrency);
            const results = await Promise.allSettled(
              batch.map((rel) =>
                retryWithBackoff(
                  () => this.s3.deleteObject(this.dataKey(rel), signal),
                  { signal },
                )
              ),
            );
            for (let j = 0; j < results.length; j++) {
              if (results[j].status === "fulfilled") {
                deleted++;
                deletedKeys.push(batch[j]);
              } else {
                deleteFailures.push({
                  file: batch[j],
                  error: (results[j] as PromiseRejectedResult).reason,
                });
              }
            }
          }
          tracePhase("preparePush.delete", deleteStart, `deleted=${deleted}`);

          if (deleteFailures.length > 0) {
            throw new Error(formatBatchFailure("delete", deleteFailures));
          }

          const dirtyPartitionKeys: string[] = [];
          for (const rel of Object.keys(newEntries)) {
            const key = S3CacheSyncService.partitionKeyFromPath(rel);
            if (key && !dirtyPartitionKeys.includes(key)) {
              dirtyPartitionKeys.push(key);
            }
          }
          for (const rel of toDelete) {
            const key = S3CacheSyncService.partitionKeyFromPath(rel);
            if (key && !dirtyPartitionKeys.includes(key)) {
              dirtyPartitionKeys.push(key);
            }
          }

          const manifest: InternalPushManifest = {
            newEntries,
            deletedKeys,
            pushed,
            deleted,
            dirtyPartitionKeys,
            dirtySnapshot: snap,
          };
          return manifest as unknown as PushManifest;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          await this.flushOwnMtimes();
          span.end();
        }
      },
    );
  }

  async commitPush(
    manifest: PushManifest,
    options?: DatastoreSyncOptions,
  ): Promise<number | void> {
    return await getTracer().startActiveSpan(
      "s3-datastore commitPush",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const commitStart = Date.now();
          const data = manifest as unknown as InternalPushManifest;
          // The marks preparePush walked. A manifest without them clears
          // nothing (swamp-club #3860).
          const snap = data.dirtySnapshot ?? this.emptyDirtySnapshot();
          const signal = options?.signal;
          // The second half of preparePush's operation: it reuses the outcome
          // preparePush saw, so a push never stops between its two phases.
          await this.formatGate.ensureWithinOperation(signal);

          if (data.pushed === 0 && data.deleted === 0) {
            const noopMeta = await this.readPartitionMeta(signal);
            if (noopMeta && noopMeta.version === 2) {
              // v2: the dirty paths were walked and nothing needed pushing,
              // so mark the push as clean. commitSeq is only recorded when
              // the local cache is complete — pull fast path uses the same
              // commitSeq and must not skip unfetched shards (#1225).
              try {
                // A fast-path manifest read no index, so the existing
                // commitSeq stays: arming here would vouch for commits
                // this cache never read (swamp-club #3193).
                const armCommitSeq = !data.indexUnread &&
                  !this.indexIsPartial && this.index &&
                  await this.localHasAllRemoteEntries();
                // Cleared after the await above, next to the write, so the
                // marks it clears are exactly the ones it persists.
                const localDirty = this.clearHandledMarks(snap);
                const sidecar = this.buildV2State({ localDirty });
                if (armCommitSeq) {
                  sidecar.commitSeq = (noopMeta as PartitionMetaV2).commitSeq;
                }
                sidecar.remoteIndexETag = "";
                await this.writeSyncState(sidecar);
              } catch {
                // Non-fatal: sidecar update is opportunistic.
              }
              tracePhase("commitPush", commitStart, "v2noop");
              return 0;
            }

            // v1: fall back to monolith verification.
            const indexFingerprint = await this.pullIndex({
              forceRemote: true,
              signal,
            });
            if (
              indexFingerprint && this.index &&
              !isMultipartETag(indexFingerprint) &&
              await this.localHasAllRemoteEntries()
            ) {
              try {
                await this.markSynced(indexFingerprint, snap);
              } catch {
                // Non-fatal: sidecar update is opportunistic.
              }
            }
            tracePhase("commitPush", commitStart, "noop");
            return 0;
          }

          // Check if shard-first mode is active (v2 meta exists).
          // Migration is an explicit one-time operation — commitPush never
          // migrates. If v2 meta isn't present, fall back to the legacy
          // monolith path.
          const meta = await this.readPartitionMeta(signal);

          if (meta && meta.version === 2) {
            const result = await this.commitPushShardFirst(
              data,
              snap,
              meta as PartitionMetaV2,
              signal,
            );
            tracePhase(
              "commitPush",
              commitStart,
              `shard-first changes=${result}`,
            );
            return result;
          }

          console.info(
            "[s3-sync] Index is using monolithic format. Run 'swamp datastore migrate-index' to enable shard-first commits for improved concurrency.",
          );
          const result = await this.commitPushMonolith(data, snap, signal);
          tracePhase("commitPush", commitStart, `monolith changes=${result}`);
          return result;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  private async commitPushShardFirst(
    data: InternalPushManifest,
    snap: DirtySnapshot,
    v2Meta: PartitionMetaV2,
    signal?: AbortSignal,
  ): Promise<number> {
    const shardStart = Date.now();
    // Captured before any intermediate sidecar write. `markSynced` writes a
    // sidecar literal with no commitSeq field at all, so reading the value
    // back after the push can lose it.
    const priorCommitSeq = this.syncState?.version === 2
      ? (this.syncState as DatastoreSyncStateV2).commitSeq
      : undefined;
    // Mirrors `preparePush`'s walk: only a scoped walk (or a bulk walk that
    // overflowed) turns local absences into remote deletes, and lazy pull
    // leaves entries un-hydrated on purpose (swamp-club #2242). Read from
    // the snapshot preparePush walked, not the live marks, which may have
    // changed since (swamp-club #3860).
    const deletionsReconciled = !this.lazyPullActive &&
      S3CacheSyncService.snapshotReconcilesDeletions(snap);
    const committed = await this.commitShardChanges(
      data.newEntries,
      data.deletedKeys,
      v2Meta.commitSeq,
      signal,
    );
    tracePhase(
      "commitPush.shards",
      shardStart,
      `dirty=${data.dirtyPartitionKeys.length}`,
    );

    // Update the local index cache from the in-memory state so
    // pullIndex's TTL cache and the fast-path sidecar stay coherent.
    // The monolithic remote upload is intentionally skipped — shards
    // are the source of truth in v2 and the monolith re-upload was
    // pure overhead (swamp-club#1034).
    const localStart = Date.now();
    if (!this.index) {
      this.index = {
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      };
    }
    for (const [rel, entry] of Object.entries(data.newEntries)) {
      this.index.entries[rel] = entry;
    }
    for (const key of data.deletedKeys) {
      delete this.index.entries[key];
    }
    this.index.lastPulled = new Date().toISOString();
    const indexComplete = await this.writeLocalIndexAfterPush(
      Object.keys(data.newEntries),
      data.deletedKeys,
    );
    this.indexMutated = false;
    tracePhase("commitPush.localIndex", localStart);

    try {
      // Record commitSeq when the index is complete (not a scoped
      // assembly) AND local cache has all remote entries — pull fast
      // path uses commitSeq and must not skip unfetched shards (#1225).
      //
      // A scoped push can arm too, without that walk: if the sidecar was
      // already at the commitSeq this push read, then nobody else committed
      // in between and this process wrote the only delta, so the cache is
      // still as complete as it was when it was last armed. That needs the
      // merged index to have persisted, or the next fast-path hit would
      // serve a truncated view, and it needs the push to have reconciled
      // its deletions — otherwise this push is itself what made the cache
      // incomplete (swamp-club #2242). `indexComplete` gates the stat-walk
      // arm too: a failed index write leaves disk missing this push's
      // entries, and an armed commitSeq would stop the next pull from ever
      // rebuilding it. Cheap checks first — the other arm is an O(index)
      // stat walk.
      const armCommitSeq = committed.upToDate && indexComplete &&
        ((deletionsReconciled &&
          priorCommitSeq === v2Meta.commitSeq) ||
          (!this.indexIsPartial &&
            await this.localHasAllRemoteEntries()));
      // Cleared after the await above, next to the write, so the
      // marks it clears are exactly the ones it persists.
      const localDirty = this.clearHandledMarks(snap);
      const sidecar = this.buildV2State({ localDirty });
      if (armCommitSeq) sidecar.commitSeq = committed.commitSeq;
      sidecar.remoteIndexETag = "";
      await this.writeSyncState(sidecar);
    } catch {
      // Non-fatal: sidecar update is opportunistic.
    }

    return data.pushed + data.deleted;
  }

  private async commitPushMonolith(
    data: InternalPushManifest,
    snap: DirtySnapshot,
    signal?: AbortSignal,
  ): Promise<number> {
    const monolithStart = Date.now();
    await this.pullIndex({ forceRemote: true, signal });

    if (this.index) {
      for (const [rel, entry] of Object.entries(data.newEntries)) {
        this.index.entries[rel] = entry;
      }
      for (const key of data.deletedKeys) {
        delete this.index.entries[key];
      }
      this.index.lastPulled = new Date().toISOString();

      const indexData = new TextEncoder().encode(JSON.stringify(this.index));
      const putResult = await retryWithBackoff(
        () => this.s3.putObject(this.indexKey(), indexData, signal),
        { signal },
      );
      await this.writeLastSynced(this.index);
      this.indexMutated = false;

      const dirtyKeys = data.dirtyPartitionKeys.length > 0
        ? new Set(data.dirtyPartitionKeys)
        : undefined;
      await this.writePartitionedIndex(this.index, signal, dirtyKeys);
      tracePhase("commitPushMonolith.writeback", monolithStart);

      const etag = putResult?.etag;
      if (
        etag && !isMultipartETag(etag) &&
        await this.localHasAllRemoteEntries()
      ) {
        try {
          await this.markSynced(etag, snap);
        } catch {
          // Non-fatal: sidecar update is opportunistic.
        }
      }
    }

    return data.pushed + data.deleted;
  }

  /**
   * Replaces `.datastore-index.json`. Every write of that file comes through
   * here, so a key an operation drops from it while a file stays at its path
   * is recorded first (swamp-club#4112). `text` is what to write when it is
   * not a re-serialized `index`.
   */
  private async writeLastSynced(
    index: DatastoreIndex,
    text?: string,
  ): Promise<void> {
    await this.beforeIndexWrite();
    await this.recordPeerDeleted(index.entries);
    await atomicWriteTextFile(
      this.indexPath,
      text ?? JSON.stringify(index, null, 2),
    );
  }

  /**
   * Field-level update of `.datastore-index.json`. It reads the file fresh,
   * so entries a concurrent push committed since the last read survive, and
   * it writes only when something changed, and never when there is no file.
   * `mtimes` is this copy's verified mtime for entries the file already holds.
   */
  private async mergeIntoLastSynced(changes: {
    upserts?: Record<string, IndexEntry>;
    removals?: Iterable<string>;
    mtimes?: ReadonlyMap<string, string>;
  }): Promise<void> {
    let onDisk: DatastoreIndex | null = null;
    try {
      onDisk = JSON.parse(
        await Deno.readTextFile(this.indexPath),
      ) as DatastoreIndex;
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) throw err;
    }
    // A partial index made here would read as a cache that has synced, and
    // defeat the refusal in repairUnpushedFiles.
    if (!onDisk?.entries) return;
    const target: DatastoreIndex = onDisk;
    let changed = false;
    for (const [rel, entry] of Object.entries(changes.upserts ?? {})) {
      const current = target.entries[rel];
      if (
        current && sameRemoteEntry(current, entry) &&
        current.localMtime === entry.localMtime
      ) {
        continue;
      }
      target.entries[rel] = entry;
      changed = true;
    }
    for (const rel of changes.removals ?? []) {
      if (target.entries[rel]) {
        delete target.entries[rel];
        changed = true;
      }
    }
    for (const [rel, mtime] of changes.mtimes ?? []) {
      const entry = target.entries[rel];
      if (entry && entry.localMtime !== mtime) {
        entry.localMtime = mtime;
        changed = true;
      }
    }
    if (!changed) return;
    await this.writeLastSynced(target);
  }

  /** Whether a regular file sits at `rel`; a symlink is never followed. */
  private async isRegularCacheFile(rel: string): Promise<boolean> {
    let localPath: string;
    try {
      localPath = assertSafePath(this.cachePath, this.localRelPath(rel));
    } catch {
      return false;
    }
    try {
      return (await Deno.lstat(localPath)).isFile;
    } catch (err) {
      // A path under a file that replaced its directory has no file either.
      if (
        err instanceof Deno.errors.NotFound ||
        err instanceof Deno.errors.NotADirectory
      ) {
        return false;
      }
      throw err;
    }
  }

  /**
   * The peer-deleted record; empty when there is none. A record that cannot be
   * read throws: reading it as empty would let a repair upload the copies it
   * lists, undoing peers' deletes.
   */
  private async readPeerDeleted(): Promise<Set<string>> {
    let text: string;
    try {
      text = await Deno.readTextFile(this.peerDeletedPath);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return new Set();
      throw err;
    }
    const parsed = JSON.parse(text);
    if (parsed?.version !== 1 || !Array.isArray(parsed.keys)) {
      throw new Error(`${PEER_DELETED_FILE} is not a version 1 record`);
    }
    return new Set(parsed.keys.filter((k: unknown) => typeof k === "string"));
  }

  /**
   * Updates the peer-deleted record before last-synced becomes `next`. A key
   * `next` drops while a regular file stays at its path is recorded, because
   * that copy would otherwise read as a file the remote never received and
   * `repairUnpushedFiles` would bring the delete back. A key is forgotten once
   * `next` holds it again or its file is gone. Never throws: a lost record
   * must not fail a sync that otherwise succeeded.
   */
  private async recordPeerDeleted(
    next: Record<string, IndexEntry>,
  ): Promise<void> {
    try {
      const recorded = await this.readPeerDeleted();
      let changed = false;
      const prior = await this.readLastSyncedEntries() ?? {};
      for (const rel of Object.keys(prior)) {
        if (next[rel] || recorded.has(rel)) continue;
        if (isInternalCacheFile(rel)) continue;
        if (isStrayNamespacePath(rel, this.namespace)) continue;
        if (await this.isRegularCacheFile(rel)) {
          recorded.add(rel);
          changed = true;
        }
      }
      for (const rel of [...recorded]) {
        if (next[rel] || !(await this.isRegularCacheFile(rel))) {
          recorded.delete(rel);
          changed = true;
        }
      }
      if (!changed) return;
      await ensureDir(this.cachePath);
      await atomicWriteTextFile(
        this.peerDeletedPath,
        JSON.stringify({ version: 1, keys: [...recorded].sort() }, null, 2),
      );
    } catch (err) {
      console.warn(
        `[s3-sync] Could not update the peer-deleted record: ${err}. A copy a ` +
          `peer deleted may now read as unpushed, and a real repair would ` +
          `upload it.`,
      );
    }
  }

  /** Saves the in-memory index as `.datastore-index.json`. */
  private async saveIndex(): Promise<void> {
    if (!this.index) return;
    await ensureDir(this.cachePath);
    await this.writeLastSynced(this.index);
  }

  /**
   * Entries of the on-disk `.datastore-index.json`: what this cache last
   * synced. Read before a pull or push replaces the index. Only remote reads
   * and committed pushes write that file, so unlike the in-memory index it
   * never holds an entry from a push whose commit failed. Null when absent
   * or unreadable.
   */
  private async readLastSyncedEntries(): Promise<
    Record<string, IndexEntry> | null
  > {
    try {
      const parsed = JSON.parse(
        await Deno.readTextFile(this.indexPath),
      ) as DatastoreIndex;
      return parsed?.entries ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Which entries an assembled index speaks for. A dirty-shards-only
   * assembly read some shards, so only entries those shards hold can be
   * missing because a peer removed them; a full assembly or monolith read
   * speaks for every entry.
   */
  private assembledScope(
    readKeys: ReadonlySet<string> | null | undefined,
  ): (rel: string) => boolean {
    if (!readKeys) return () => true;
    return (rel) => {
      const key = S3CacheSyncService.partitionKeyFromPath(rel);
      return key !== undefined && readKeys.has(key);
    };
  }

  /**
   * Removes local copies of files a peer deleted from the remote
   * (swamp-club #2999). A file is a candidate when its entry was in
   * `prior` (the last-synced index), is in scope, and is absent from the
   * index just read from the remote. Without this, a pull leaves the file
   * behind with no index entry, and the next push walk uploads it again —
   * undoing the peer's `swamp data gc`.
   *
   * Callers pass `prior` only when `this.index` is an authoritative remote
   * read. Nothing is removed when no in-scope entry remains remotely: an
   * empty index reads the same as a wiped one, and removing every file on
   * that evidence would empty the cache.
   */
  private async removePeerDeletedFiles(
    prior: Record<string, IndexEntry> | null,
    inScope: (rel: string) => boolean,
    signal?: AbortSignal,
  ): Promise<number> {
    if (!prior || !this.index) return 0;
    const current = this.index.entries;
    const candidates: Array<[string, IndexEntry]> = [];
    for (const [rel, entry] of Object.entries(prior)) {
      if (isInternalCacheFile(rel)) continue;
      if (isStrayNamespacePath(rel, this.namespace)) continue;
      if (!inScope(rel) || current[rel]) continue;
      candidates.push([rel, entry]);
    }
    if (candidates.length === 0) return 0;
    if (!Object.keys(current).some(inScope)) return 0;
    return await this.removeUnchangedFiles(candidates, signal);
  }

  /**
   * Removes each local file whose content is provably what `entry`
   * recorded at sync time — same size, plus a matching sha256 (or, for a
   * hashless entry, this copy's own mtime record) — then any parent
   * directories the
   * removal emptied.
   * A file that changed locally holds work no remote has, so it is kept
   * for the next push to send. Returns how many files were removed.
   */
  private async removeUnchangedFiles(
    candidates: ReadonlyArray<[string, IndexEntry]>,
    signal?: AbortSignal,
  ): Promise<number> {
    let removed = 0;
    let kept = 0;
    const failed: string[] = [];
    for (let i = 0; i < candidates.length; i += this.pullConcurrency) {
      throwIfAborted(signal);
      const batch = candidates.slice(i, i + this.pullConcurrency);
      const results = await Promise.all(
        batch.map(([rel, entry]) => this.removeIfUnchanged(rel, entry)),
      );
      for (let j = 0; j < results.length; j++) {
        if (results[j] === "removed") removed++;
        else if (results[j] === "changed") kept++;
        else if (results[j] === "failed") failed.push(batch[j][0]);
      }
    }
    if (kept > 0) {
      console.warn(
        `[s3-sync] Kept ${kept} local file(s) that a peer deleted from the ` +
          `remote, because they changed locally. A later push that walks ` +
          `them uploads them.`,
      );
    }
    if (failed.length > 0) {
      console.warn(
        `[s3-sync] Could not remove ${failed.length} local file(s) that a peer ` +
          `deleted from the remote (first: ${failed[0]}). Remove them by ` +
          `hand, or a later push that walks them uploads them again.`,
      );
    }
    return removed;
  }

  private async removeIfUnchanged(
    rel: string,
    entry: IndexEntry,
  ): Promise<"removed" | "changed" | "absent" | "failed"> {
    const localRel = this.localRelPath(rel);
    if (this.dirtyPaths.has(localRel)) return "changed";
    let localPath: string;
    try {
      localPath = assertSafePath(this.cachePath, localRel);
    } catch {
      return "absent";
    }
    try {
      const stat = await Deno.stat(localPath);
      if (!stat.isFile) return "absent";
      if (stat.size !== entry.size) return "changed";
      // Removal destroys the copy, so the hash decides whenever there is
      // one: on a coarse-mtime filesystem a same-size rewrite in the same
      // second keeps the recorded mtime. Only a hashless entry falls back
      // to this copy's own mtime record, which also requires the file to
      // be over a second old. The entry's localMtime is the pusher's and
      // cannot vouch for this copy (swamp-club#3546).
      if (entry.sha256) {
        if (await streamingSha256(localPath) !== entry.sha256) {
          return "changed";
        }
      } else if (!(await this.ownRecordFor(rel, stat, true))) {
        return "changed";
      }
    } catch {
      return "absent";
    }
    try {
      await Deno.remove(localPath);
    } catch (err) {
      return err instanceof Deno.errors.NotFound ? "absent" : "failed";
    }
    await this.forgetOwnMtime(rel);
    await this.removeEmptyParents(localPath);
    return "removed";
  }

  /**
   * Removes directories emptied by a file removal, walking up from the
   * file's directory. Stops at the first non-empty directory and never
   * removes a top-level subdir (`data/`, `outputs/`, ...) or the namespace
   * root. A peer's GC leaves no empty version directories, so this one
   * should not either.
   */
  private async removeEmptyParents(filePath: string): Promise<void> {
    const keepDepth = this.namespace ? 2 : 1;
    let dir = dirname(filePath);
    while (true) {
      const rel = relative(this.cachePath, dir);
      if (rel === "" || rel.startsWith("..")) return;
      if (rel.split(/[\\/]/).length <= keepDepth) return;
      try {
        await Deno.remove(dir);
      } catch {
        return;
      }
      dir = dirname(dir);
    }
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
      // Never pulled, so never local; must not keep the fast path unarmed.
      if (isStrayNamespacePath(rel, this.namespace)) continue;
      try {
        const localPath = assertSafePath(
          this.cachePath,
          this.localRelPath(rel),
        );
        const stat = await Deno.stat(localPath);
        if (stat.size !== entry.size) {
          if (traceEnabled()) {
            console.debug(
              `[s3-sync] localHasAllRemoteEntries: size mismatch for ${rel} (local=${stat.size}, index=${entry.size})`,
            );
          }
          return false;
        }
      } catch {
        if (traceEnabled()) {
          console.debug(
            `[s3-sync] localHasAllRemoteEntries: missing locally: ${rel}`,
          );
        }
        return false;
      }
    }
    return true;
  }

  /**
   * Walks what a push must send: the snapshot's dirty paths when it lists
   * any and no bulk mark stands, otherwise the whole cache. Returns the
   * files to upload and the index entries to delete remotely.
   *
   * Only a dirty path's own stat reporting it absent turns its entries into
   * remote deletes (markDirty contract rule #2). A file that vanishes later
   * in the walk is skipped and its mark kept, recorded on `snap`, never a
   * delete and never a failure (swamp-club #3860, swamp-club #2421). A
   * whole-cache walk that throws after the cache root was found aborts the
   * push: what it did not visit would otherwise read as deleted.
   */
  private async collectPushWork(
    snap: DirtySnapshot,
    warnSkips: boolean,
  ): Promise<{ toPush: PushCandidate[]; toDelete: string[] }> {
    const nsPrefix = this.namespace ? `${this.namespace}/` : "";
    const toPush: PushCandidate[] = [];
    const toDelete: string[] = [];
    const useScopedWalk = !snap.bulkInvalidated && snap.paths.size > 0;
    // Doubled-path strays (swamp-club#2404) are never pushed; the ones
    // the index can vouch for are removed from disk.
    let straysRemoved = 0;
    let straysKept = 0;
    const skipStray = async (bareRel: string, absPath: string) => {
      if (!isStrayNamespacePath(bareRel, this.namespace)) return false;
      if (await this.removeVerifiedStray(absPath, bareRel)) {
        straysRemoved++;
      } else {
        straysKept++;
      }
      return true;
    };

    if (useScopedWalk) {
      for (const dirtyPath of snap.paths.keys()) {
        const absPath = join(this.cachePath, dirtyPath);
        const bareDirtyPath = nsPrefix && dirtyPath.startsWith(nsPrefix)
          ? dirtyPath.substring(nsPrefix.length)
          : dirtyPath;
        let stat: Deno.FileInfo;
        try {
          stat = await Deno.stat(absPath);
        } catch (err) {
          if (!(err instanceof Deno.errors.NotFound)) {
            // Non-absence error (permission, I/O, NFS timeout) — do not
            // assume deletion intent. Skip this dirty path and keep its
            // mark; the next push retries it.
            snap.unhandled.add(dirtyPath);
            continue;
          }
          // Path is genuinely absent — collect matching index entries
          // for S3 deletion (markDirty contract rule #2). Skip when
          // lazy pull is active: absent files are un-hydrated, not
          // deleted.
          if (!this.lazyPullActive && this.index) {
            const prefix = bareDirtyPath.endsWith("/")
              ? bareDirtyPath
              : bareDirtyPath + "/";
            for (const rel of Object.keys(this.index.entries)) {
              if (isInternalCacheFile(rel)) continue;
              if (isStrayNamespacePath(rel, this.namespace)) continue;
              if (rel === bareDirtyPath || rel.startsWith(prefix)) {
                toDelete.push(rel);
              }
            }
          }
          continue;
        }
        if (stat.isFile) {
          // Again without the namespace: `<ns>/_control/x` is a control-plane
          // key, and `<ns>/.datastore-index.json` would be a monolith.
          if (
            isInternalCacheFile(dirtyPath) ||
            isInternalCacheFile(bareDirtyPath) ||
            await skipStray(bareDirtyPath, absPath)
          ) {
            continue;
          }
          let verdict: "push" | "skip" | "vanished";
          try {
            verdict = await this.fileNeedsPush(absPath, bareDirtyPath);
          } catch {
            // Unreadable (permission, I/O): keep the mark, as above.
            snap.unhandled.add(dirtyPath);
            continue;
          }
          if (verdict === "vanished") {
            snap.unhandled.add(dirtyPath);
          } else if (verdict === "push") {
            toPush.push({ rel: bareDirtyPath, path: absPath, mark: dirtyPath });
          }
        } else if (stat.isDirectory) {
          const localFilesInDir = new Set<string>();
          // A subdirectory removed mid-walk is skipped; what it held is
          // unknown, so the mark stays and nothing under it is deleted.
          let subtreeVanished = false;
          try {
            for await (
              const entry of this.walkCacheFiles(absPath, () => {
                subtreeVanished = true;
              })
            ) {
              const rel = toKeyPath(relative(this.cachePath, entry.path));
              if (isInternalCacheFile(rel)) continue;
              const bareRel = nsPrefix && rel.startsWith(nsPrefix)
                ? rel.substring(nsPrefix.length)
                : rel;
              // Again without the namespace, as for a dirty file above.
              if (isInternalCacheFile(bareRel)) continue;
              if (await skipStray(bareRel, entry.path)) continue;
              // Listed even when it vanishes below: a file seen in the walk
              // is never a delete in the same push.
              localFilesInDir.add(bareRel);
              const verdict = await this.fileNeedsPush(entry.path, bareRel);
              if (verdict === "vanished") {
                snap.unhandled.add(dirtyPath);
              } else if (verdict === "push") {
                toPush.push({
                  rel: bareRel,
                  path: entry.path,
                  mark: dirtyPath,
                });
              }
            }
          } catch {
            // A directory under it could not be read. What was not visited
            // is unknown, so queue no deletes under it and keep its mark.
            snap.unhandled.add(dirtyPath);
            continue;
          }
          if (subtreeVanished) {
            snap.unhandled.add(dirtyPath);
            continue;
          }
          // Check for index entries under this directory that no
          // longer have local files (file deleted but dir remains).
          if (!this.lazyPullActive && this.index) {
            const prefix = bareDirtyPath.endsWith("/")
              ? bareDirtyPath
              : bareDirtyPath + "/";
            for (const rel of Object.keys(this.index.entries)) {
              if (isInternalCacheFile(rel)) continue;
              if (isStrayNamespacePath(rel, this.namespace)) continue;
              if (rel.startsWith(prefix) && !localFilesInDir.has(rel)) {
                toDelete.push(rel);
              }
            }
          }
        }
      }
    } else {
      // Detect foreign namespace directories to exclude from the walk.
      // The bound namespace is exempt — its files are pushed with the
      // namespace prefix stripped from rel so dataKey() produces the
      // correct remote key (swamp-club#1280).
      const namespaceDirs = this.namespace
        ? await detectNamespaceDirs(this.cachePath, this.namespace)
        : new Set<string>();
      let namespaceDirSkips = 0;
      let soloLayoutSkips = 0;
      const localFiles = new Set<string>();
      // A cache directory that does not exist yet holds nothing to push.
      // Once it exists, a walk that cannot read a directory aborts the
      // push: a truncated walk would read every file it never reached as
      // deleted. A directory that vanished is skipped instead.
      let cacheExists = true;
      try {
        await Deno.stat(this.cachePath);
      } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) throw err;
        cacheExists = false;
      }
      if (cacheExists) {
        // A directory removed mid-walk (a peer step's GC) is skipped and
        // the walk goes on; the marks stay, as for a vanished file.
        for await (
          const entry of this.walkCacheFiles(this.cachePath, () => {
            snap.incomplete = true;
          })
        ) {
          const rel = toKeyPath(relative(this.cachePath, entry.path));
          if (isInternalCacheFile(rel)) continue;
          if (nsPrefix && !rel.startsWith(nsPrefix)) {
            soloLayoutSkips++;
            continue;
          }
          if (isInsideNamespaceDir(rel, namespaceDirs)) {
            namespaceDirSkips++;
            continue;
          }
          const bareRel = nsPrefix && rel.startsWith(nsPrefix)
            ? rel.substring(nsPrefix.length)
            : rel;
          // Again without the namespace, as for a dirty file above.
          if (isInternalCacheFile(bareRel)) continue;
          if (await skipStray(bareRel, entry.path)) continue;
          localFiles.add(bareRel);
          const verdict = await this.fileNeedsPush(entry.path, bareRel);
          if (verdict === "vanished") {
            snap.incomplete = true;
          } else if (verdict === "push") {
            toPush.push({ rel: bareRel, path: entry.path, mark: null });
          }
        }
      }
      if (warnSkips && soloLayoutSkips > 0) {
        console.warn(
          `[s3-sync] Skipped ${soloLayoutSkips} solo-layout file(s) outside the bound ` +
            `namespace "${this.namespace}". These are stale leftovers — ` +
            `investigate and remove them.`,
        );
      }
      if (warnSkips && namespaceDirSkips > 0) {
        console.warn(
          `[s3-sync] Skipped ${namespaceDirSkips} file(s) inside namespace directories ` +
            `found under the cache root (${[...namespaceDirs].join(", ")}). ` +
            `These directories should not be inside this cache — investigate and remove them.`,
        );
      }
      // Compare index against local files to find deletions (rule #2).
      // Only when per-path dirty tracking overflowed — a no-path
      // markDirty() is a modification signal, not a deletion signal.
      // Also skip when lazy pull is active to avoid deleting un-hydrated
      // content.
      if (snap.overflowed && !this.lazyPullActive && this.index) {
        for (const rel of Object.keys(this.index.entries)) {
          if (isInternalCacheFile(rel)) continue;
          if (isInsideNamespaceDir(rel, namespaceDirs)) continue;
          if (isStrayNamespacePath(rel, this.namespace)) continue;
          if (!localFiles.has(rel)) {
            toDelete.push(rel);
          }
        }
      }
    }
    this.warnStrays(straysRemoved, straysKept);
    return { toPush, toDelete };
  }

  /**
   * Yields every non-directory entry under `dir` (files and symlinks, which
   * are not followed), as `@std/fs` `walk` with `includeDirs: false` does.
   * Unlike `walk`, a directory that vanishes before it is listed does not
   * end the iteration: it calls `onVanished` and the walk goes on. Any other
   * read error is thrown. Each listing is read in full before recursing, as
   * a lazy listing can skip entries while others are removed.
   */
  private async *walkCacheFiles(
    dir: string,
    onVanished: () => void,
  ): AsyncGenerator<{ path: string }> {
    let entries: Deno.DirEntry[];
    try {
      entries = await this.listCacheDir(dir);
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) throw err;
      onVanished();
      return;
    }
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory) {
        yield* this.walkCacheFiles(path, onVanished);
      } else {
        yield { path };
      }
    }
  }

  /** One directory's entries, read in full. */
  private async listCacheDir(dir: string): Promise<Deno.DirEntry[]> {
    const entries: Deno.DirEntry[] = [];
    for await (const entry of Deno.readDir(dir)) entries.push(entry);
    return entries;
  }

  /**
   * Uploads a push walk's files in batches of `pushConcurrency`, calling
   * `onUploaded` for each one sent. A file that vanished before it could
   * be read is skipped and its mark kept on `snap`. Returns the failures.
   *
   * A failed push leaves its marks as they were, so the retry sends what
   * did not go. A file a whole-cache walk found under no mark at all gets a
   * bulk mark, or the next push could take the clean fast path past it.
   */
  private async uploadPushCandidates(
    toPush: PushCandidate[],
    snap: DirtySnapshot,
    signal: AbortSignal | undefined,
    onUploaded: (rel: string, entry: IndexEntry) => void,
  ): Promise<Array<{ file: string; error: unknown }>> {
    const failures: Array<{ file: string; error: unknown }> = [];
    let unmarkedFailure = false;
    for (let i = 0; i < toPush.length; i += this.pushConcurrency) {
      if (signal?.aborted) {
        if (unmarkedFailure || toPush.slice(i).some((c) => c.mark === null)) {
          await this.markDirty();
        }
        throwIfAborted(signal);
      }
      const batch = toPush.slice(i, i + this.pushConcurrency);
      const results = await Promise.allSettled(
        batch.map(({ rel, path }) => this.uploadWalkedFile(rel, path, signal)),
      );
      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        const candidate = batch[j];
        if (result.status === "rejected") {
          failures.push({ file: candidate.rel, error: result.reason });
          if (candidate.mark === null) unmarkedFailure = true;
        } else if (result.value === null) {
          if (candidate.mark === null) snap.incomplete = true;
          else snap.unhandled.add(candidate.mark);
        } else {
          onUploaded(candidate.rel, result.value);
        }
      }
    }
    if (unmarkedFailure) await this.markDirty();
    return failures;
  }

  /**
   * Uploads one file a push walk found, without marking the cache dirty:
   * the push's own snapshot already covers it, and a mark here would be
   * newer than the snapshot, so no push could ever clear it (swamp-club
   * #3860). Returns the file's new index entry, or null when the file
   * vanished before it could be read — the caller keeps its mark.
   */
  private async uploadWalkedFile(
    rel: string,
    localPath: string,
    signal?: AbortSignal,
  ): Promise<IndexEntry | null> {
    if (!isWithinDir(this.cachePath, normalize(localPath))) {
      throw new Error(`Path traversal detected: ${localPath}`);
    }
    let preReadStat: Deno.FileInfo;
    let data: Uint8Array<ArrayBuffer>;
    try {
      // Stat before the read, as in pushFile.
      preReadStat = await Deno.stat(localPath);
      data = await Deno.readFile(localPath);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return null;
      throw err;
    }
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const sha256 = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    await retryWithBackoff(
      () => this.s3.putObject(this.dataKey(rel), data, signal),
      { signal },
    );
    await this.recordOwnMtime(rel, preReadStat, sha256);
    let mtime = preReadStat.mtime;
    try {
      mtime = (await Deno.stat(localPath)).mtime;
    } catch (err) {
      // Removed after the upload: the bytes sent are still the entry.
      if (!(err instanceof Deno.errors.NotFound)) throw err;
    }
    return {
      key: rel,
      size: data.length,
      lastModified: new Date().toISOString(),
      localMtime: mtime?.toISOString(),
      sha256,
    };
  }

  /**
   * Change detection for a single file during push walk. Only this copy's
   * own mtime record may skip the hash: the index's localMtime is the
   * pusher's (swamp-club#3546).
   * 1. Size differs → needs push
   * 2. Own record matches, index has sha256 → push iff the recorded hash
   *    differs from the index's
   * 3. No matching own record, index has sha256 → SHA-256 comparison
   * 4. Index has no sha256 → skip with a matching own record, else push
   *    (the upload records a sha256, so the entry migrates)
   *
   * Returns "vanished" when the file is gone by the time it is read: the
   * walk listed it, then a rename or a delete took it away (swamp-club
   * #3860). A dangling symlink is "skip": it is not data, and it would
   * read as vanished on every walk, so its mark could never clear.
   */
  private async fileNeedsPush(
    absPath: string,
    rel: string,
  ): Promise<"push" | "skip" | "vanished"> {
    try {
      return await this.fileChanged(absPath, rel) ? "push" : "skip";
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) throw err;
      try {
        if ((await Deno.lstat(absPath)).isSymlink) return "skip";
      } catch (lstatErr) {
        if (!(lstatErr instanceof Deno.errors.NotFound)) throw lstatErr;
      }
      return "vanished";
    }
  }

  private async fileChanged(absPath: string, rel: string): Promise<boolean> {
    const stat = await Deno.stat(absPath);
    const existing = this.index?.entries[rel];
    if (!existing) return true;

    if (existing.size !== stat.size) return true;

    // Hashless: nothing to hash against, so any matching record skips,
    // as the index mtime did before.
    if (!existing.sha256) return !(await this.ownRecordFor(rel, stat, false));
    const own = await this.ownRecordFor(rel, stat, true);
    if (own?.sha256) return own.sha256 !== existing.sha256;

    const localHash = await streamingSha256(absPath);
    if (localHash !== existing.sha256) return true;
    await this.recordOwnMtime(rel, stat, localHash);
    return false;
  }

  /**
   * Derives a partition key from a relative path. Covers all datastore
   * subdirectories:
   *
   * Per-model (data/, outputs/, definitions-evaluated/):
   *   `{subdir}--{type segments}--{modelId}`
   *
   * Per-workflow (workflow-runs/):
   *   `{subdir}--{workflowId}`
   *
   * Single-shard (workflows-evaluated, auto-definitions, audit, telemetry, logs, files):
   *   `{subdir}`
   *
   * Unknown/legacy prefixes (bundles, vault-bundles, report-bundles, etc.):
   *   `{subdir}`
   *
   * Root-level files (single segment, no subdirectory):
   *   `_root`
   */
  static partitionKeyFromPath(rel: string): string | undefined {
    const segments = rel.split("/");
    if (segments.length < 2) {
      return segments.length === 1 && segments[0] !== "" ? "_root" : undefined;
    }
    const subdir = segments[0];

    switch (subdir) {
      case "data":
      case "outputs":
      case "definitions-evaluated": {
        if (segments.length < 4) return undefined;
        const prefixEnd = segments.length >= 6
          ? segments.length - 3
          : segments.length - 1;
        return segments.slice(0, prefixEnd).join("--");
      }
      case "workflow-runs": {
        if (segments.length < 3) return undefined;
        return `${subdir}--${segments[1]}`;
      }
      case "workflows-evaluated":
      case "auto-definitions":
      case "audit":
      case "telemetry":
      case "logs":
      case "files":
      case "config":
        return subdir;
      default:
        return subdir;
    }
  }

  /**
   * Groups index entries into partition buckets by partition key.
   * See `partitionKeyFromPath` for the key derivation rules.
   */
  private static groupEntriesByPartition(
    entries: Record<string, IndexEntry>,
  ): Map<string, Record<string, IndexEntry>> {
    const partitions = new Map<string, Record<string, IndexEntry>>();
    const dropped: string[] = [];

    for (const [rel, entry] of Object.entries(entries)) {
      const key = S3CacheSyncService.partitionKeyFromPath(rel);
      if (!key) {
        dropped.push(rel);
        continue;
      }

      let bucket = partitions.get(key);
      if (!bucket) {
        bucket = {};
        partitions.set(key, bucket);
      }
      bucket[rel] = entry;
    }

    if (dropped.length > 0) {
      console.warn(
        `[s3-sync] ${dropped.length} index entry/entries could not be partitioned and were skipped: ${
          dropped.slice(0, 5).join(", ")
        }${dropped.length > 5 ? ` (and ${dropped.length - 5} more)` : ""}`,
      );
    }

    return partitions;
  }

  /** Derives partition keys for all per-model subdirectories from a SyncModelRef. */
  private static partitionKeysFromModel(
    modelType: string,
    modelId: string,
  ): string[] {
    const slug = modelType.replace(/\//g, "--");
    return [
      `data--${slug}--${modelId}`,
      `outputs--${slug}--${modelId}`,
      `definitions-evaluated--${slug}--${modelId}`,
    ];
  }

  /**
   * Writes partitioned index files to S3 alongside the monolithic index.
   * Used by the legacy pushChanged path. Non-fatal — errors are swallowed
   * because the monolith is still the source of truth in this code path.
   */
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
      const data = new TextEncoder().encode(JSON.stringify(partition));
      writes.push(
        retryWithBackoff(
          () => this.s3.putObject(this.shardKey(key), data, signal),
          { signal },
        ).then(() => {}).catch(() => {
          // Non-fatal: partition files are an optimization in this path.
        }),
      );
    }

    // Preserve v2 meta if it already exists (migration already happened).
    // Only write v1 meta when no v2 is present — avoids demoting a
    // migrated bucket back to v1 on a legacy pushChanged call.
    writes.push(
      (async () => {
        try {
          const existing = await this.readPartitionMeta(signal);
          if (existing && existing.version === 2) return;
          const meta: PartitionMetaV1 = {
            version: 1,
            partitions: partitionKeys,
          };
          const metaData = new TextEncoder().encode(
            JSON.stringify(meta),
          );
          await retryWithBackoff(
            () => this.s3.putObject(this.metaKey(), metaData, signal),
            { signal },
          );
        } catch {
          // Non-fatal: _meta.json is advisory in this path.
        }
      })(),
    );

    await Promise.allSettled(writes);
  }

  /**
   * Reads partition files for specific models across all per-model
   * subdirectories (data/, outputs/, definitions-evaluated/). Returns
   * merged entries or null if any partition is missing (triggers
   * monolithic fallback). Missing shards for outputs/ and
   * definitions-evaluated/ are tolerated — only the data/ shard is
   * required for fallback decisions.
   */
  private async pullPartitionedIndex(
    models: ReadonlyArray<{ modelType: string; modelId: string }>,
    signal?: AbortSignal,
  ): Promise<Record<string, IndexEntry> | null> {
    const merged: Record<string, IndexEntry> = {};

    for (const model of models) {
      const keys = S3CacheSyncService.partitionKeysFromModel(
        model.modelType,
        model.modelId,
      );
      for (const key of keys) {
        const entries = await this.readShard(key, signal);
        if (entries === null && key.startsWith("data--")) {
          return null;
        }
        if (entries) {
          for (const [rel, entry] of Object.entries(entries)) {
            merged[rel] = entry;
          }
        }
      }
    }

    return merged;
  }

  capabilities(): SyncCapabilities {
    return {
      scopedSync: true,
      lazyHydration: true,
      namespacedSync: true,
      twoPhaseSync: true,
      controlPlane: true,
      configRefresh: true,
    };
  }

  controlPlaneStore(): ControlPlaneStore {
    const ensureBound = () => {
      if (!this.namespaceBound) this.bindNamespace(undefined);
    };
    return {
      put: async (key: string, data: Uint8Array): Promise<void> => {
        ensureBound();
        await this.ensurePreflight();
        await retryWithBackoff(
          () => this.s3.putObject(this.controlKey(key), data),
        );
      },
      get: async (key: string): Promise<Uint8Array | null> => {
        ensureBound();
        await this.ensurePreflight();
        try {
          const { data } = await retryWithBackoff(
            () => this.s3.getObject(this.controlKey(key)),
          );
          return data;
        } catch (error) {
          if (
            error instanceof Error &&
            (error.name === "NotFound" || error.name === "NoSuchKey")
          ) {
            return null;
          }
          throw error;
        }
      },
      delete: async (key: string): Promise<void> => {
        ensureBound();
        await this.ensurePreflight();
        await retryWithBackoff(
          () => this.s3.deleteObject(this.controlKey(key)),
        );
      },
      list: async (prefix: string): Promise<string[]> => {
        ensureBound();
        await this.ensurePreflight();
        const cpPrefix = this.controlPrefixPath();
        const entries = await retryWithBackoff(
          () => this.s3.listAllObjects(cpPrefix + prefix),
        );
        return entries.map((e) => e.key.slice(cpPrefix.length));
      },
      putIfAbsent: async (
        key: string,
        data: Uint8Array,
      ): Promise<boolean> => {
        ensureBound();
        await this.ensurePreflight();
        return await retryWithBackoff(
          () => this.s3.putObjectConditional(this.controlKey(key), data),
        );
      },
    };
  }

  async hydrateFile(
    relPath: string,
    options?: DatastoreSyncOptions,
  ): Promise<boolean> {
    return await getTracer().startActiveSpan(
      "s3-datastore hydrateFile",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_FILE, relPath);
          await this.formatGate.ensure(options?.signal);
          // Core passes a cache-relative path, which starts with the
          // namespace; pullFile expects a namespace-relative one and adds
          // the namespace itself (swamp-club#2404).
          const nsPrefix = this.namespace ? `${this.namespace}/` : "";
          const nsRelPath = nsPrefix && relPath.startsWith(nsPrefix)
            ? relPath.substring(nsPrefix.length)
            : relPath;
          try {
            await this.pullFile(nsRelPath, options?.signal);
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
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  /**
   * Reads one remote file by its cache-relative path without touching the
   * cache, the index or any dirty state (swamp-club#3160).
   *
   * The key is `relPath` as given: a cache-relative path already starts with
   * the namespace. `options.namespace` only guards — a path outside it is a
   * caller bug and rejects, since null would say the remote file is gone.
   * The namespace is taken from `options` alone, so this works on a service
   * that has not pulled yet and never binds one.
   *
   * A miss is not retried at the pre-namespace root key as {@link pullFile}
   * does: nothing here says the file is this namespace's, so an object at the
   * root may be another repo's or a leftover of a file since deleted. Only
   * `NoSuchKey` counts as a miss: a 404 without that code (a proxy's error
   * page, say) rejects rather than read as a deleted file.
   */
  async fetchContent(
    relPath: string,
    options?: DatastoreSyncOptions,
  ): Promise<Uint8Array | null> {
    return await getTracer().startActiveSpan(
      "s3-datastore fetchContent",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_FILE, relPath);
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          if (
            relPath === "" || /^([\\/]|[A-Za-z]:[\\/])/.test(relPath) ||
            relPath.split(/[\\/]/).some((seg) => seg === "..")
          ) {
            throw new Error(`Path traversal rejected: ${relPath}`);
          }
          if (options?.namespace) {
            const nsPrefix = `${options.namespace}/`;
            const rest = relPath.startsWith(nsPrefix)
              ? relPath.substring(nsPrefix.length)
              : "";
            if (rest === "" || rest.startsWith("/")) {
              throw new Error(
                `fetchContent: ${JSON.stringify(relPath)} is not a file in ` +
                  `namespace ${JSON.stringify(options.namespace)}`,
              );
            }
          }
          await this.formatGate.ensure(signal);
          try {
            const { data } = await retryWithBackoff(
              () => this.s3.getObject(relPath, signal),
              { signal },
            );
            return data;
          } catch (error) {
            if (error instanceof Error && error.name === "NoSuchKey") {
              return null;
            }
            throw error;
          }
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async exportCatalog(
    namespace: string,
    rows: CatalogExportRow[],
    signal?: AbortSignal,
  ): Promise<void> {
    return await getTracer().startActiveSpan(
      "s3-datastore exportCatalog",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, namespace);
          span.setAttribute(Attr.DATASTORE_ROWS, rows.length);
          await this.formatGate.ensure(signal);
          const key = `${namespace}/.catalog-export.json`;
          const data = new TextEncoder().encode(JSON.stringify(rows));
          const hashBuffer = await crypto.subtle.digest("SHA-256", data);
          const hash = Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          await this.loadSyncState();
          if (this.lastCatalogHash === hash) return;
          await retryWithBackoff(
            () => this.s3.putObject(key, data, signal),
            { signal },
          );
          this.lastCatalogHash = hash;
          await this.writeSyncState(this.buildV2State());
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async pullForeignCatalogs(
    namespaces: string[],
    signal?: AbortSignal,
  ): Promise<CatalogExportEntry[]> {
    return await getTracer().startActiveSpan(
      "s3-datastore pullForeignCatalogs",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACES, namespaces.length);
          await this.formatGate.ensure(signal);
          const results: CatalogExportEntry[] = [];
          for (const ns of namespaces) {
            const key = `${ns}/.catalog-export.json`;
            try {
              const { data } = await this.s3.getObject(key, signal);
              const text = new TextDecoder().decode(data);
              const rows = JSON.parse(text) as CatalogExportRow[];
              if (!Array.isArray(rows)) continue;
              results.push({ namespace: ns, rows });
            } catch {
              // Missing or malformed — skip silently
            }
          }
          return results;
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  /**
   * Runs the push's root-to-namespace and control-plane migration gates before
   * a repair uploads, so it writes the keys a push would. Both can change the
   * remote, so a dry run never comes here. The sidecar's flags stay unset: they
   * also send the next push down the slow path, and that walk is what sends a
   * local edit a repair only reports. The next push runs the gates again and
   * finds nothing left to move.
   */
  private async runRepairMigrationGates(
    isV2: boolean,
    signal?: AbortSignal,
  ): Promise<void> {
    if (!this.namespace) return;
    const state = await this.loadSyncState() as DatastoreSyncStateV2 | null;
    if (!isV2 && !state?.dataKeyMigrated) {
      await this.migrateRootDataToNamespace(signal);
    }
    if (!state?.controlPlaneKeysMigrated) {
      await this.migrateRootControlPlaneToNamespace(signal);
    }
  }

  /** A streamed sha256 of the remote object, or null when it is gone. */
  private async remoteSha256(
    rel: string,
    signal?: AbortSignal,
  ): Promise<string | null> {
    try {
      const { body } = await retryWithBackoff(
        () => this.s3.getObjectStream(this.dataKey(rel), signal),
        { signal },
      );
      const hasher = createHash("sha256");
      for await (const chunk of body) hasher.update(chunk);
      return hasher.digest("hex");
    } catch (err) {
      if (
        err instanceof Error &&
        (err.name === "NotFound" || err.name === "NoSuchKey")
      ) return null;
      throw err;
    }
  }

  /**
   * Whether the object at `rel` holds `sha256`, read from the metadata a
   * repair recorded, else from a streamed hash. Null when no object exists.
   */
  private async remoteHolds(
    rel: string,
    sha256: string,
    signal?: AbortSignal,
  ): Promise<boolean | null> {
    const head = await retryWithBackoff(
      () => this.s3.headObject(this.dataKey(rel), signal),
      { signal },
    );
    if (!head.exists) return null;
    const recorded = head.metadata?.[SHA256_METADATA_KEY];
    if (recorded && /^[0-9a-f]{64}$/.test(recorded)) return recorded === sha256;
    const streamed = await this.remoteSha256(rel, signal);
    return streamed === null ? null : streamed === sha256;
  }

  /**
   * Uploads one unpushed file with a create-only write that records its
   * sha256, or settles a key something else already holds: its own bytes are
   * an earlier upload of ours and are indexed; other bytes are left alone.
   * Never goes through `pushFile`, which marks the cache dirty. A refusal that
   * left no object is retried up to a fixed limit, then rejects. Returns null
   * when the file vanished before it could be read.
   */
  private async createOrSettle(
    rel: string,
    localPath: string,
    listed: boolean,
    signal?: AbortSignal,
  ): Promise<{ entry: IndexEntry } | "alreadyPresent" | null> {
    if (!isWithinDir(this.cachePath, normalize(localPath))) {
      throw new Error(`Path traversal detected: ${localPath}`);
    }
    let preReadStat: Deno.FileInfo;
    let data: Uint8Array<ArrayBuffer>;
    try {
      // Stat before the read, as in pushFile.
      preReadStat = await Deno.lstat(localPath);
      if (!preReadStat.isFile) return null;
      data = await Deno.readFile(localPath);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) return null;
      throw err;
    }
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const sha256 = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const metadata = { [SHA256_METADATA_KEY]: sha256 };
    const key = this.dataKey(rel);

    let tryCreate = !listed;
    for (let attempt = 1;; attempt++) {
      throwIfAborted(signal);
      if (tryCreate) {
        const created = await retryWithBackoff(
          () => this.s3.putObjectIfMatch(key, data, null, signal, { metadata }),
          { signal },
        );
        if (created !== null) break;
      }
      tryCreate = true;
      const holds = await this.remoteHolds(rel, sha256, signal);
      if (holds === true) break;
      if (holds === false) return "alreadyPresent";
      if (attempt >= S3CacheSyncService.REPAIR_CREATE_ATTEMPTS) {
        throw new Error(
          `[s3-sync] A create of ${key} was refused ${attempt} time(s) and left no object; retry the repair.`,
        );
      }
      await abortableSleep(casBackoffMs(attempt), signal);
    }
    await this.recordOwnMtime(rel, preReadStat, sha256);
    return {
      entry: {
        key: rel,
        size: data.length,
        lastModified: new Date().toISOString(),
        localMtime: preReadStat.mtime?.toISOString(),
        sha256,
      },
    };
  }

  async repairUnpushedFiles(
    options?: RepairUnpushedFilesOptions,
  ): Promise<UnpushedFilesSummary> {
    const dryRun = options?.dryRun ?? false;
    const exact = options?.exact ?? false;
    return await getTracer().startActiveSpan(
      "s3-datastore repairUnpushed",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_DRY_RUN, dryRun);
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          this.bindNamespace(options?.namespace);
          throwIfAborted(signal);
          await this.ensureSyncable(signal);

          // A repair commits to shards, so a monolith would be split from
          // them. A monolith need not have a _meta.json beside it.
          const meta = await this.readPartitionMeta(signal);
          const monolithAtRemote = meta === null &&
            (await retryWithBackoff(
              () => this.s3.headObject(this.indexKey(), signal),
              { signal },
            )).exists;
          if (monolithAtRemote || (meta !== null && meta.version !== 2)) {
            throw new RepairUnpushedRefusedError(
              "The remote index is a v1 monolith, which repairUnpushedFiles " +
                "cannot commit to. Run `swamp datastore sync --pull`, then " +
                "`swamp datastore migrate-index`, and repair again.",
            );
          }
          const lastSynced = await this.readLastSyncedEntries();
          if (!lastSynced) {
            throw new RepairUnpushedRefusedError(
              "This cache has no last-synced index, so unpushed files cannot " +
                "be told apart from files a peer deleted. Run " +
                "`swamp datastore sync --pull` first.",
            );
          }

          const assembled = await this.assembleIndexFromShards(signal);
          const live: Record<string, IndexEntry> = assembled?.entries ?? {};
          const baseCommitSeq = assembled?.commitSeq ?? 0;
          const nsPrefix = this.namespace ? `${this.namespace}/` : "";
          const listing = await retryWithBackoff(
            () => this.s3.listAllObjects(nsPrefix || undefined, signal),
            { signal },
          );
          const objects = new Map<string, number>();
          const remoteNamespaces = new Set<string>();
          for (const entry of listing) {
            if (!this.namespace && entry.key.endsWith("/.namespace.json")) {
              remoteNamespaces.add(entry.key.split("/")[0]);
            }
            objects.set(entry.key.substring(nsPrefix.length), entry.size);
          }
          const foreignDirs = this.namespace
            ? await detectNamespaceDirs(this.cachePath, this.namespace)
            : remoteNamespaces;
          // No _meta.json on a remote that holds shards or data: its index is
          // not readable, so everything would look absent, and a first commit
          // would create a _meta.json that unlists the other shards. Peers would
          // then read those files as deleted.
          if (
            meta === null && listing.some((entry) => {
              const rel = entry.key.substring(nsPrefix.length);
              return rel.startsWith("_index/") ||
                (!isInternalCacheFile(rel) &&
                  !isInsideNamespaceDir(rel, remoteNamespaces));
            })
          ) {
            throw new RepairUnpushedRefusedError(
              "The remote holds data but has no _meta.json, so its index " +
                "cannot be read. Run `swamp datastore migrate-index`, then " +
                "`swamp datastore sync --pull`, and repair again.",
            );
          }
          let recorded: Set<string>;
          try {
            recorded = await this.readPeerDeleted();
          } catch (err) {
            throw new RepairUnpushedRefusedError(
              `Could not read ${PEER_DELETED_FILE}: ${err}. Copies it lists ` +
                "would be uploaded, undoing peers' deletes. Repair the file. " +
                "Removing it makes those copies read as unpushed.",
            );
          }

          const unpushed: Array<
            { rel: string; path: string; listed: boolean }
          > = [];
          const alreadyPresent: string[] = [];
          const modified: string[] = [];
          const unknown: string[] = [];
          const peerDeleted: string[] = [];

          // Compared with last-synced, never the live remote: a stale copy is
          // not a local change.
          const classifySynced = async (
            rel: string,
            path: string,
            stat: Deno.FileInfo,
            synced: IndexEntry,
          ) => {
            if (stat.size !== synced.size) {
              modified.push(rel);
              return;
            }
            const own = await this.ownRecordFor(rel, stat, false);
            if (own?.sha256 && synced.sha256) {
              if (own.sha256 !== synced.sha256) modified.push(rel);
              return;
            }
            const mtime = stat.mtime?.toISOString();
            if (own || (mtime && mtime === synced.localMtime)) return;
            // A local hash needs no remote request, so this does not wait for
            // `exact`.
            if (synced.sha256) {
              if (await streamingSha256(path) !== synced.sha256) {
                modified.push(rel);
              }
              return;
            }
            const remote = live[rel];
            if (exact && remote && sameRemoteEntry(remote, synced)) {
              const remoteHash = await this.remoteSha256(rel, signal);
              if (remoteHash !== null) {
                if (await streamingSha256(path) !== remoteHash) {
                  modified.push(rel);
                }
                return;
              }
            }
            unknown.push(rel);
          };

          // A key the remote indexes that this cache never synced.
          const classifyLive = async (
            rel: string,
            path: string,
            stat: Deno.FileInfo,
            remote: IndexEntry,
          ) => {
            if (remote.size !== stat.size) {
              alreadyPresent.push(rel);
            } else if (remote.sha256) {
              if (await streamingSha256(path) !== remote.sha256) {
                alreadyPresent.push(rel);
              }
            } else if (exact) {
              const remoteHash = await this.remoteSha256(rel, signal);
              if (remoteHash === null) {
                unknown.push(rel);
              } else if (await streamingSha256(path) !== remoteHash) {
                alreadyPresent.push(rel);
              }
            } else {
              unknown.push(rel);
            }
          };

          // The push walk's filter, except that strays are never removed: a
          // repair deletes nothing.
          for await (
            const entry of this.walkCacheFiles(this.cachePath, () => {})
          ) {
            const localRel = toKeyPath(relative(this.cachePath, entry.path));
            if (isInternalCacheFile(localRel)) continue;
            if (nsPrefix && !localRel.startsWith(nsPrefix)) continue;
            if (isInsideNamespaceDir(localRel, foreignDirs)) continue;
            const rel = localRel.substring(nsPrefix.length);
            // Again without the namespace: `<ns>/_control/x` is a control-plane
            // key, and `<ns>/.datastore-index.json` would be a monolith.
            if (isInternalCacheFile(rel)) continue;
            if (isStrayNamespacePath(rel, this.namespace)) continue;
            let stat: Deno.FileInfo;
            try {
              stat = await Deno.lstat(entry.path);
            } catch (err) {
              if (err instanceof Deno.errors.NotFound) continue;
              throw err;
            }
            if (!stat.isFile) continue;

            const synced = lastSynced[rel];
            if (synced || live[rel]) {
              try {
                await (synced
                  ? classifySynced(rel, entry.path, stat, synced)
                  : classifyLive(rel, entry.path, stat, live[rel]));
              } catch (err) {
                // Removed since the walk listed it, as by a peer step's GC.
                if (!(err instanceof Deno.errors.NotFound)) throw err;
              }
            } else if (recorded.has(rel)) {
              peerDeleted.push(rel);
            } else {
              const objectSize = objects.get(rel);
              if (objectSize !== undefined && objectSize !== stat.size) {
                alreadyPresent.push(rel);
              } else {
                // An equal-size object cannot be compared from a listing: a
                // real run settles it, a dry run reports it here.
                unpushed.push({
                  rel,
                  path: entry.path,
                  listed: objectSize !== undefined,
                });
              }
            }
          }

          let remoteMovedOn = 0;
          for (const [rel, synced] of Object.entries(lastSynced)) {
            if (isInternalCacheFile(rel)) continue;
            if (isStrayNamespacePath(rel, this.namespace)) continue;
            if (live[rel] && !sameRemoteEntry(live[rel], synced)) {
              remoteMovedOn++;
            }
          }

          let uploaded = 0;
          const remaining: string[] = [];
          if (dryRun) {
            remaining.push(...unpushed.map((u) => u.rel));
          } else if (unpushed.length > 0) {
            await this.runRepairMigrationGates(meta !== null, signal);
            await this.formatGate.ensureWithinOperation(signal);
            let pending: Record<string, IndexEntry> = {};
            // Commits leave the sidecar alone: the next pull must still see
            // every commit this cache has not read, this one included.
            const commitPending = async () => {
              const count = Object.keys(pending).length;
              if (count === 0) return;
              await this.commitShardChanges(
                pending,
                [],
                baseCommitSeq,
                signal,
                true,
              );
              await this.mergeIntoLastSynced({ upserts: pending });
              if (this.index) Object.assign(this.index.entries, pending);
              uploaded += count;
              pending = {};
            };
            const failures: Array<{ file: string; error: unknown }> = [];
            const candidates = unpushed.filter(({ rel }) => {
              if (S3CacheSyncService.partitionKeyFromPath(rel)) return true;
              remaining.push(rel);
              return false;
            });
            for (let i = 0; i < candidates.length; i += this.pushConcurrency) {
              throwIfAborted(signal);
              const batch = candidates.slice(i, i + this.pushConcurrency);
              const results = await Promise.allSettled(
                batch.map(({ rel, path, listed }) =>
                  this.createOrSettle(rel, path, listed, signal)
                ),
              );
              for (let j = 0; j < results.length; j++) {
                const result = results[j];
                if (result.status === "rejected") {
                  failures.push({ file: batch[j].rel, error: result.reason });
                  remaining.push(batch[j].rel);
                } else if (result.value === "alreadyPresent") {
                  alreadyPresent.push(batch[j].rel);
                } else if (result.value !== null) {
                  pending[batch[j].rel] = result.value.entry;
                }
              }
              if (
                Object.keys(pending).length >=
                  S3CacheSyncService.REPAIR_COMMIT_BATCH
              ) {
                await commitPending();
              }
            }
            await commitPending();
            if (failures.length > 0) {
              throw new Error(formatBatchFailure("push", failures));
            }
          }

          span.setAttribute(Attr.DATASTORE_FILES_PUSHED, uploaded);
          const sample = (rels: string[]) =>
            rels.map((rel) => this.localRelPath(rel)).sort().slice(
              0,
              REPAIR_SAMPLE_LIMIT,
            );
          const sidecar = await this.loadSyncState();
          return {
            unpushed: remaining.length,
            samplePaths: sample(remaining),
            alreadyPresent: alreadyPresent.length,
            sampleAlreadyPresent: sample(alreadyPresent),
            locallyModified: modified.length,
            sampleModified: sample(modified),
            unknown: unknown.length,
            sampleUnknown: sample(unknown),
            peerDeleted: peerDeleted.length,
            samplePeerDeleted: sample(peerDeleted),
            remoteMovedOn,
            uploaded,
            pendingChanges: sidecar?.localDirty === true ||
              this.hasDirtyMarks(),
          };
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          if (!dryRun) await this.flushOwnMtimes();
          span.end();
        }
      },
    );
  }

  async repairNamespaceContamination(
    options?: RepairNamespaceContaminationOptions,
  ): Promise<NamespaceContaminationSummary> {
    return await getTracer().startActiveSpan(
      "s3-datastore repairContamination",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_DRY_RUN, !!options?.dryRun);
          span.setAttribute(Attr.DATASTORE_NAMESPACE, options?.namespace ?? "");
          const signal = options?.signal;
          const dryRun = options?.dryRun ?? true;

          this.bindNamespace(options?.namespace);
          await this.formatGate.ensure(signal);
          if (!this.namespace) {
            return {
              foreignNamespaces: [],
              totalForeignObjects: 0,
              deleted: 0,
            };
          }

          const nsPrefix = `${this.namespace}/`;

          const [nsListing, fullListing] = await Promise.all([
            retryWithBackoff(
              () => this.s3.listAllObjects(nsPrefix, signal),
              { signal },
            ),
            retryWithBackoff(
              () => this.s3.listAllObjects(undefined, signal),
              { signal },
            ),
          ]);

          const knownNamespaces = new Set<string>();
          for (const entry of nsListing) {
            const rel = entry.key.substring(nsPrefix.length);
            if (rel.endsWith("/.namespace.json")) {
              const ns = rel.substring(
                0,
                rel.length - "/.namespace.json".length,
              );
              if (ns && !ns.includes("/")) knownNamespaces.add(ns);
            }
          }
          for (const entry of fullListing) {
            if (entry.key.endsWith("/.namespace.json")) {
              const ns = entry.key.substring(
                0,
                entry.key.length - "/.namespace.json".length,
              );
              if (ns && ns !== this.namespace) knownNamespaces.add(ns);
            }
          }

          const foreignByNs = new Map<string, string[]>();
          for (const entry of nsListing) {
            const rel = entry.key.substring(nsPrefix.length);
            const slash = rel.indexOf("/");
            if (slash === -1) continue;
            const firstSeg = rel.substring(0, slash);
            if (knownNamespaces.has(firstSeg)) {
              const existing = foreignByNs.get(firstSeg);
              if (existing) {
                existing.push(entry.key);
              } else {
                foreignByNs.set(firstSeg, [entry.key]);
              }
            }
          }

          const foreignNamespaces: Array<
            { namespace: string; objectCount: number }
          > = [];
          const allForeignKeys: string[] = [];
          for (const [ns, keys] of foreignByNs) {
            foreignNamespaces.push({ namespace: ns, objectCount: keys.length });
            allForeignKeys.push(...keys);
          }
          const totalForeignObjects = allForeignKeys.length;

          if (dryRun || totalForeignObjects === 0) {
            return { foreignNamespaces, totalForeignObjects, deleted: 0 };
          }

          // Read before anything is deleted: the rewrite below must exceed
          // it, and an unreadable _meta.json stops the repair here.
          const priorMeta = await this.readPartitionMeta(signal);
          // Before the deletes, so a failure here leaves the foreign objects in
          // place and a rerun repeats all of it. After them, a rerun would find
          // nothing foreign and report success with the rewrite never done.
          if (priorMeta?.version === 2) {
            await this.rebuildMetaAfterContamination(
              priorMeta,
              new Set(foreignByNs.keys()),
              signal,
            );
          }

          let deleted = 0;
          for (
            let i = 0;
            i < allForeignKeys.length;
            i += this.pushConcurrency
          ) {
            throwIfAborted(signal);
            const batch = allForeignKeys.slice(i, i + this.pushConcurrency);
            const results = await Promise.allSettled(
              batch.map((key) =>
                retryWithBackoff(
                  () => this.s3.deleteObject(key, signal),
                  { signal },
                )
              ),
            );
            for (const result of results) {
              if (result.status === "fulfilled") deleted++;
            }
          }

          try {
            await retryWithBackoff(
              () => this.s3.deleteObject(this.indexKey(), signal),
              { signal },
            );
          } catch { /* may not exist */ }
          if (priorMeta?.version === 2) {
            // The shards are the index. pullIndex would find no monolith and
            // rediscover one from the listing, with no sha256.
            this.index = null;
            const assembled = await this.assembleIndexFromShards(signal);
            if (assembled) {
              this.index = {
                version: 1,
                lastPulled: new Date().toISOString(),
                entries: assembled.entries,
              };
              this.indexIsPartial = false;
              this.scrubIndex();
              await this.saveIndex();
            }
          } else {
            // A remote that is not v2 has no complete shard index to keep: its
            // monolith was the index, so rebuild it from what remains.
            try {
              await retryWithBackoff(
                () => this.s3.deleteObject(this.metaKey(), signal),
                { signal },
              );
            } catch { /* may not exist */ }
            this.index = null;
            await this.pullIndex({ forceRemote: true, signal });
          }

          return { foreignNamespaces, totalForeignObjects, deleted };
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }

  async fetchForeignContent(
    namespace: string,
    relPath: string,
    signal?: AbortSignal,
  ): Promise<Uint8Array | null> {
    return await getTracer().startActiveSpan(
      "s3-datastore fetchForeignContent",
      async (span) => {
        try {
          span.setAttribute(Attr.DATASTORE_NAMESPACE, namespace);
          span.setAttribute(Attr.DATASTORE_FILE, relPath);
          if (
            relPath.startsWith("/") || relPath.startsWith("\\") ||
            relPath.split("/").some((seg) => seg === "..")
          ) {
            throw new Error(`Path traversal rejected: ${relPath}`);
          }
          await this.formatGate.ensure(signal);
          const key = `${namespace}/${relPath}`;
          try {
            const { data } = await this.s3.getObject(key, signal);
            return data;
          } catch (error) {
            if (
              error instanceof Error &&
              (error.name === "NotFound" || error.name === "NoSuchKey")
            ) {
              return null;
            }
            throw error;
          }
        } catch (err) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: err instanceof Error ? err.message : String(err),
          });
          span.recordException(
            err instanceof Error ? err : new Error(String(err)),
          );
          throw err;
        } finally {
          span.end();
        }
      },
    );
  }
}
