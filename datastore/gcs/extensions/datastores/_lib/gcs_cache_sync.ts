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
 * GCS cache sync service.
 *
 * Maintains a local cache directory and syncs with GCS:
 * - pullChanged(): pulls only new/modified files from GCS
 * - pushChanged(): pushes only new/modified files to GCS
 *
 * Tracks metadata in `.datastore-index.json` to avoid unnecessary transfers.
 * A `.datastore-sync-state.json` sidecar records the remote index's GCS
 * `generation` at the last verified-clean sync so zero-diff syncs can
 * short-circuit to a single HEAD on the next call.
 */

import { dirname, join, normalize, relative } from "jsr:@std/path@1";
import { ensureDir, walk } from "jsr:@std/fs@1";
import type {
  DatastoreSyncOptions,
  DatastoreSyncService,
} from "./interfaces.ts";
import { GcsOperationError, NotFoundError } from "./gcs_client.ts";
import type { GcsClient } from "./gcs_client.ts";
import { atomicWriteTextFile } from "./atomic_write.ts";

/**
 * Validates that a relative path resolves within the cache directory.
 * Prevents path traversal attacks from malicious GCS object names.
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
 *   last-verified remote index generation and the local-dirty flag.
 *   Never uploaded: its contents are per-machine state.
 * - basename `_catalog.db` and anything starting with `_catalog.db-`
 *   (the SQLite WAL/SHM/journal sidecars) — the local-only data catalog
 *   store. It is deliberately colocated with the data tier so it can
 *   be rebuilt from whatever the local cache holds, but the database
 *   itself is per-machine state and must never leak to the shared
 *   bucket. See swamp-club issue #29 for the bug this exclusion fixes:
 *   without it, `swamp datastore sync --push` would walk `_catalog.db*`
 *   into `toPush`, SQLite would rewrite the WAL mid-upload, and the
 *   push would fail on `_catalog.db-wal`.
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
  const base = rel.split("/").pop() ?? "";
  return base === "_catalog.db" || base.startsWith("_catalog.db-");
}

/**
 * Rejects with `AbortError` if the signal is already aborted. Used at
 * phase boundaries so abort propagation doesn't have to ride on a
 * pending GCS call — the next boundary catches it first.
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

/** Retry budget for single-object GCS operations in the sync pipeline. */
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
 * failure), `PreconditionFailedError` (conditional write lost the
 * race — retrying gives the same answer), `NotFoundError` (not a
 * transient state), any `AbortError` (caller explicitly cancelled).
 *
 * The `status == null` branch matters more than it looks. The GCS
 * client surfaces transport-level failures (ECONNRESET, DNS lookup,
 * TLS close_notify) as a `GcsOperationError` with `httpStatusCode:
 * null`. Without this branch, real network blips would not be retried
 * — defeating the whole point of the retry budget. Auth and config
 * errors always carry a 4xx status, so treating a missing status as
 * transient is safe.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function isRetryableError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  if (err.name === "AbortError") return false;
  if (err.name === "NotFoundError") return false;
  if (err.name === "PreconditionFailedError") return false;
  if (err.name === "TimeoutError") return true;
  if (err instanceof GcsOperationError) {
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
 * Emit a trace-level timing line when `SWAMP_GCS_SYNC_TRACE` is truthy.
 * Two timestamps per phase, never per-entry — matches the
 * instrumentation contract from the s3-datastore mirror.
 *
 * Gated on env-var presence so tests and production stay silent by
 * default; a reporter debugging a slow sync can opt in with
 * `SWAMP_GCS_SYNC_TRACE=1 swamp datastore sync`.
 */
function traceEnabled(): boolean {
  try {
    const v = Deno.env.get("SWAMP_GCS_SYNC_TRACE");
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
  console.debug(`[gcs-sync] ${phase} ${elapsedMs}ms${suffix}`);
}

/**
 * Build a batch-failure message that surfaces the actual reasons things
 * failed, not just filenames. The first 3 underlying errors are
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
  } GCS: ${files.join(", ")}\n${preview}${more}`;
}

/** Metadata index entry for a file in GCS. */
interface IndexEntry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
}

/** Metadata index tracking all files in the GCS datastore. */
interface DatastoreIndex {
  version: 1;
  lastPulled: string;
  entries: Record<string, IndexEntry>;
}

/** TTL in ms for using the local index cache instead of fetching from GCS. */
const INDEX_CACHE_TTL_MS = 60_000;

/** Maximum number of concurrent GCS downloads/uploads. */
const MAX_CONCURRENCY = 10;

/**
 * Fast-path sidecar persisted alongside the cache. Records the last
 * remote `.datastore-index.json` generation we verified our local cache
 * against, the timestamp of that verification, and whether the local
 * cache has been written to since. The next `pullChanged` /
 * `pushChanged` HEADs the remote index and short-circuits if the
 * recorded generation still matches and the local view hasn't drifted —
 * skipping the 1+ MB index GET and the multi-thousand-stat walk that
 * the pre-fast-path path performed on every sync.
 *
 * Schema is versioned so old sidecars can be ignored on upgrade
 * without a migration step (any parse failure or version mismatch
 * falls through to the slow path and rewrites the sidecar).
 *
 * GCS generation is a better fingerprint than S3 ETag: it changes on
 * every write including multipart uploads, so no multipart guard is
 * needed (compare s3_cache_sync.ts `isMultipartETag`). Generation
 * values are int64 strings — we store them verbatim and compare as
 * strings; parsing to number would overflow JS number precision.
 */
interface DatastoreSyncState {
  version: 1;
  /** Remote `.datastore-index.json` GCS generation at last verification. */
  remoteIndexGeneration: string;
  /** ISO-8601 timestamp of the last successful verification. */
  lastVerifiedAt: string;
  /**
   * `true` when a writer has touched the local cache since the last
   * verified-clean snapshot. Set pessimistically by `pushFile` BEFORE
   * any upload work so a crash mid-batch leaves the flag dirty (safe
   * default: re-walk on next push). Cleared only after a successful
   * index writeback completes, or after a verified-clean
   * `pullChanged`. The guardrail test pins the contract: cache writes
   * that bypass `pushFile` won't update this flag.
   */
  localDirty: boolean;
}

/** GCS cache sync service. */
export class GcsCacheSyncService implements DatastoreSyncService {
  private readonly gcs: GcsClient;
  private readonly cachePath: string;
  private readonly indexPath: string;
  private readonly syncStatePath: string;
  private index: DatastoreIndex | null = null;
  private syncState: DatastoreSyncState | null = null;
  private syncStateLoaded = false;
  /**
   * Set to true when `scrubIndex()` removes zombie entries from the
   * in-memory index. Drives the write-back gate in `pushChanged()` so
   * that the cleaned index propagates to the remote even on a no-op
   * push (no new files to upload). Reset after a successful write-back.
   */
  private indexMutated = false;

  constructor(gcs: GcsClient, cachePath: string) {
    this.gcs = gcs;
    this.cachePath = cachePath;
    this.indexPath = join(cachePath, ".datastore-index.json");
    this.syncStatePath = join(cachePath, SYNC_STATE_FILE);
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
      const parsed = JSON.parse(text) as Partial<DatastoreSyncState>;
      if (
        parsed.version === 1 &&
        typeof parsed.remoteIndexGeneration === "string" &&
        typeof parsed.lastVerifiedAt === "string" &&
        typeof parsed.localDirty === "boolean"
      ) {
        this.syncState = parsed as DatastoreSyncState;
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

  /**
   * Pessimistically mark the local cache as dirty. Called by `pushFile`
   * before its upload work so a crash mid-batch leaves the flag set
   * (safe: forces a full walk next time). Also the public
   * `DatastoreSyncService.markDirty` entry point — swamp-core's
   * repository layer calls this before writing to the cache directly
   * (any write that bypasses `pushFile`). Without this hook, the
   * fast-path short-circuit silently skips core's writes on the next
   * `pushChanged`. Idempotent — if the sidecar already records
   * `localDirty: true`, no write is issued.
   */
  async markDirty(): Promise<void> {
    const current = await this.loadSyncState();
    if (current?.localDirty === true) return;
    await this.writeSyncState({
      version: 1,
      remoteIndexGeneration: current?.remoteIndexGeneration ?? "",
      lastVerifiedAt: current?.lastVerifiedAt ?? "",
      localDirty: true,
    });
  }

  /**
   * Record a verified-clean state: the local cache matches the remote
   * index whose generation is `remoteIndexGeneration`. Empty/zero
   * generations are rejected — they can't be fingerprints, so saving
   * one would make every subsequent fast-path comparison succeed
   * spuriously.
   *
   * Correctness invariant (swamp-club #168): `remoteIndexGeneration`
   * MUST come from the same GET response (`x-goog-generation` header
   * on the alt=media read) that delivered the bytes we verified the
   * local cache against, OR from our own putObject response for the
   * bytes we just wrote. A standalone post-walk `getMetadata` is
   * TOCTOU-racy: a concurrent writer can bump the remote index
   * between our GET and our metadata call, and recording their
   * generation as ours would mask their data on the next fast-path
   * sync until any future mutation invalidates. Callers must thread
   * the fingerprint through `pullIndex`'s return value (or use
   * `putResult.generation` in the writeback path) — never re-
   * `getMetadata` for it.
   *
   * `lastVerifiedAt` is forced strictly past the local index file's
   * mtime (by 1 ms when the wall clock would otherwise tie). The
   * fast-path probe uses `>=` to bail on any local edit, so a tied
   * timestamp would spuriously bail out of the happy path on fast
   * machines — paying the slow path on every second sync.
   */
  private async markSynced(remoteIndexGeneration: string): Promise<void> {
    if (!remoteIndexGeneration || remoteIndexGeneration === "0") return;
    let baselineMs = Date.now();
    try {
      const stat = await Deno.stat(this.indexPath);
      const mtimeMs = stat.mtime?.getTime() ?? 0;
      if (mtimeMs >= baselineMs) baselineMs = mtimeMs + 1;
    } catch {
      // No local index yet (e.g. first push against an empty cache);
      // wall-clock baseline is fine.
    }
    await this.writeSyncState({
      version: 1,
      remoteIndexGeneration,
      lastVerifiedAt: new Date(baselineMs).toISOString(),
      localDirty: false,
    });
  }

  /**
   * Fast-path probe for `pullChanged`. Returns `0` when the sidecar
   * proves we don't need the index GET or the cache walk; returns
   * `null` to signal "fall through to the slow path" on any check
   * miss (no sidecar, empty generation, local index touched after
   * last verification, HEAD failure, or generation mismatch).
   *
   * The `getMetadata` call is wrapped in a bare try/catch that swallows
   * EVERY thrown error (auth 401/403, transient 5xx, network failure,
   * timeout) and returns null. A failed probe MUST fall through to the
   * slow path — the slow path can still succeed via its own error
   * handling and retries. The cost of this is that sustained auth
   * regressions silently slow every sync instead of failing fast;
   * operators noticing that behavior should start diagnosis at the
   * slow-path code, not here.
   *
   * Self-healing note: when zombie-scrub (swamp-club#29) rewrites the
   * remote index, the generation changes — so a fast-path HEAD sees a
   * mismatch and falls through to the full pull path that re-runs the
   * scrub. The fast path can never hide a needed migration.
   */
  private async tryFastPullChanged(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar) return null;
    if (
      !sidecar.remoteIndexGeneration || sidecar.remoteIndexGeneration === "0"
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
      // sidecar can't speak for what's on disk now. `>=` (not `>`)
      // closes the second-precision filesystem hole where an mtime
      // that rounds to the same second as `lastVerifiedAt` would
      // otherwise spuriously fast-path past a real edit.
      return null;
    }
    let meta;
    try {
      meta = await this.gcs.getMetadata(".datastore-index.json", signal);
    } catch {
      return null;
    }
    if (!meta.exists || !meta.generation || meta.generation === "0") {
      return null;
    }
    if (meta.generation !== sidecar.remoteIndexGeneration) return null;
    return 0;
  }

  /**
   * Fast-path probe for `pushChanged`. Returns `0` when the sidecar
   * records a clean local cache and the remote index generation still
   * matches; otherwise returns `null` so the slow path runs. Same
   * error-swallowing property as `tryFastPullChanged` — any thrown
   * error from `getMetadata` falls through.
   */
  private async tryFastPushChanged(
    signal: AbortSignal | undefined,
  ): Promise<number | null> {
    const sidecar = await this.loadSyncState();
    if (!sidecar) return null;
    if (sidecar.localDirty) return null;
    if (
      !sidecar.remoteIndexGeneration || sidecar.remoteIndexGeneration === "0"
    ) {
      return null;
    }
    let meta;
    try {
      meta = await this.gcs.getMetadata(".datastore-index.json", signal);
    } catch {
      return null;
    }
    if (!meta.exists || !meta.generation || meta.generation === "0") {
      return null;
    }
    if (meta.generation !== sidecar.remoteIndexGeneration) return null;
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
   * Pulls the metadata index from GCS (lightweight, single GET).
   * Uses a local cache with a 60-second TTL to avoid redundant fetches.
   *
   * Pass `forceRemote: true` to bypass the local TTL cache and always
   * fetch from GCS. `pushChanged()` uses this to guarantee the
   * writeback merges onto the current remote state — without it, a
   * stale local cache (< 60 s old) could silently clobber updates
   * pushed by another writer in the intervening window.
   *
   * Both entry paths (cache-hit and GCS-fetch) scrub the in-memory
   * index after parsing so zombie internal-file entries never reach
   * the rest of the sync pipeline (see swamp-club#29). On the
   * GCS-fetch path the local cache file is rewritten with the scrubbed
   * JSON when scrub mutated — keeping the on-disk and in-memory views
   * consistent. The cache-hit path does NOT rewrite the local file;
   * its on-disk view self-heals on the next GCS fetch.
   */
  async pullIndex(
    options?: { forceRemote?: boolean; signal?: AbortSignal },
  ): Promise<string | null> {
    const signal = options?.signal;
    // Cache-hit returns null: no remote fetch happened, so we have no
    // fingerprint the caller can safely record. The alternative —
    // `getMetadata`'ing remote to synthesize a fingerprint —
    // reintroduces the TOCTOU race this refactor exists to close.
    if (!options?.forceRemote) {
      try {
        const stat = await Deno.stat(this.indexPath);
        const ageMs = Date.now() - (stat.mtime?.getTime() ?? 0);
        if (ageMs < INDEX_CACHE_TTL_MS && this.index === null) {
          const content = await Deno.readTextFile(this.indexPath);
          this.index = JSON.parse(content) as DatastoreIndex;
          this.indexMutated ||= this.scrubIndex();
          return null;
        }
      } catch {
        // No local index — fetch from GCS
      }
    }

    // Fetch the remote index. Only `NotFoundError` (GCS 404 —
    // bucket exists but no index object yet) is treated as the
    // brand-new-bucket case and falls back to an empty in-memory
    // index. Any other error (auth failure, 5xx, network timeout,
    // JSON parse failure, local write failure) propagates so callers
    // abort rather than treating a transient failure as "no data" —
    // critical for `pushChanged`, which would otherwise write an
    // empty index back to the remote and wipe the real one.
    let data: Uint8Array;
    let generation: string | undefined;
    try {
      const response = await this.gcs.getObject(
        ".datastore-index.json",
        signal,
      );
      data = response.data;
      generation = response.generation;
    } catch (err) {
      if (err instanceof NotFoundError) {
        this.index = {
          version: 1,
          lastPulled: new Date().toISOString(),
          entries: {},
        };
        // No remote object yet → no fingerprint to return.
        return null;
      }
      throw err;
    }

    const text = new TextDecoder().decode(data);
    this.index = JSON.parse(text) as DatastoreIndex;
    await ensureDir(this.cachePath);
    if (this.scrubIndex()) {
      this.indexMutated = true;
      await atomicWriteTextFile(
        this.indexPath,
        JSON.stringify(this.index, null, 2),
      );
    } else {
      await atomicWriteTextFile(this.indexPath, text);
    }
    return generation ?? null;
  }

  /** Fetches a single file from GCS to the local cache. */
  async pullFile(relativePath: string, signal?: AbortSignal): Promise<void> {
    const localPath = assertSafePath(this.cachePath, relativePath);
    const { data } = await retryWithBackoff(
      () => this.gcs.getObject(relativePath, signal),
      { signal },
    );
    await ensureDir(dirname(localPath));
    await Deno.writeFile(localPath, data);
  }

  /**
   * Pulls only new or modified files from GCS to the local cache.
   * Fetches the remote index, compares against local files, and only
   * downloads files that are missing locally or have a different size.
   *
   * Fast path: before doing any of that, HEAD the remote index and
   * compare its generation to the sidecar; if nothing has changed since
   * the last verified-clean walk, return `0` immediately without the
   * 1+ MB index GET or the multi-thousand-stat walk. Any fall-through
   * condition (no sidecar, generation mismatch, empty/zero generation,
   * local index mtime newer than `lastVerifiedAt`, HEAD failure) drops
   * into the slow path below.
   */
  async pullChanged(
    options?: DatastoreSyncOptions,
  ): Promise<number | void> {
    const signal = options?.signal;
    throwIfAborted(signal);

    const fastStart = Date.now();
    const fastResult = await this.tryFastPullChanged(signal);
    tracePhase(
      "pullChanged.fastpath",
      fastStart,
      fastResult === 0 ? "hit" : "miss",
    );
    if (fastResult !== null) return fastResult;

    const indexStart = Date.now();
    // Force a remote fetch on the slow path. The 60-second TTL cache in
    // pullIndex is correct within a single process (don't re-fetch what
    // we just pulled), but it's stale across processes: another writer
    // may have pushed since we last wrote our local index, and the
    // fast-path miss above specifically means the remote generation is
    // not the one our sidecar recorded. Trusting the local-mtime cache
    // here would walk a stale index, find toPull=0, and report
    // "Pulled 0 files" while writer2's data sits unpulled on remote.
    // Symmetric with `pushChanged`'s slow path, which already does this.
    const indexGeneration = await this.pullIndex({
      forceRemote: true,
      signal,
    });
    tracePhase("pullChanged.pullIndex", indexStart);

    const walkStart = Date.now();
    const toPull: string[] = [];
    for (const [rel, entry] of Object.entries(this.index?.entries ?? {})) {
      // Belt-and-suspenders: `scrubIndex` already removed internal
      // entries in `pullIndex`, but if anything re-adds a zombie
      // between the scrub and the walk, this guard still catches it.
      if (isInternalCacheFile(rel)) {
        continue;
      }
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size === entry.size) {
          // Reconcile localMtime so pushChanged() doesn't treat it as
          // changed due to mtime drift (e.g. file was placed by a
          // migration or a different machine pushed the index).
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
    tracePhase("pullChanged.walk", walkStart, `toPull=${toPull.length}`);

    const downloadStart = Date.now();
    let pulled = 0;
    const failures: Array<{ file: string; error: unknown }> = [];
    for (let i = 0; i < toPull.length; i += MAX_CONCURRENCY) {
      throwIfAborted(signal);
      const batch = toPull.slice(i, i + MAX_CONCURRENCY);
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

    // Local cache matches the remote index whose generation we captured
    // from the `pullIndex` GET response — either the walk found zero
    // diff (`pulled === 0`) or we just downloaded the missing files
    // (`pulled > 0`). Persist THAT generation — the one we walked
    // against — so the next `pullChanged` / `pushChanged` can take the
    // fast path. We deliberately do NOT re-`getMetadata`: a post-walk
    // metadata call could observe a generation from a concurrent
    // writer's push landing during our walk, and recording that
    // generation would mask their data on the next fast-path sync
    // (swamp-club #168). If generation is null (cache-hit pullIndex or
    // NotFound brand-new bucket), the sidecar is skipped — next sync
    // self-heals on the slow path.
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
    if (indexGeneration) {
      try {
        if (pulled > 0 && this.index) {
          await atomicWriteTextFile(
            this.indexPath,
            JSON.stringify(this.index, null, 2),
          );
        }
        await this.markSynced(indexGeneration);
      } catch {
        // Non-fatal: sidecar update is opportunistic. Disk-full /
        // permissions / unmount must not turn a successful sync into
        // a failure — the sidecar is a fast-path optimization, and a
        // missed update only costs one slow-path sync next time.
      }
    }

    return pulled;
  }

  /**
   * Pushes a single file from the local cache to GCS.
   *
   * Pessimistically marks the sidecar `localDirty: true` BEFORE the
   * upload so a crash mid-batch never strands an unpushed local change
   * behind a clean fast-path flag — the next `pushChanged` will see
   * `localDirty: true` and do the full walk. The flag is cleared only
   * by `pushChanged` after a successful index writeback.
   */
  async pushFile(relativePath: string, signal?: AbortSignal): Promise<void> {
    await this.markDirty();
    const localPath = assertSafePath(this.cachePath, relativePath);
    const data = await Deno.readFile(localPath);
    await retryWithBackoff(
      () => this.gcs.putObject(relativePath, data, signal),
      { signal },
    );

    if (this.index) {
      const stat = await Deno.stat(localPath);
      this.index.entries[relativePath] = {
        key: relativePath,
        size: data.length,
        lastModified: new Date().toISOString(),
        localMtime: stat.mtime?.toISOString(),
      };
    }
  }

  /**
   * Pushes only new or modified files from the local cache to GCS.
   * Compares each file's size and mtime against the index to detect
   * changes.
   *
   * Fast path: before doing any of that, HEAD the remote index and
   * compare generation against the sidecar; if nothing has changed
   * (and `localDirty` is false), short-circuit. Otherwise fall through
   * to the slow walk + upload path, which always fetches the current
   * remote index (bypassing the local TTL cache) so the writeback
   * merges new/modified entries onto remote state instead of clobbering
   * it. Without forceRemote here, any client with a smaller or stale
   * local cache (e.g. a fresh reader running `datastore setup`, or a
   * writer whose cached index is < 60 s old but another writer has
   * since pushed) would overwrite the remote `.datastore-index.json`
   * with a subset of entries, leaving the other writer's data
   * orphaned. See swamp-club#30.
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
    const indexGeneration = await this.pullIndex({
      forceRemote: true,
      signal,
    });
    tracePhase("pushChanged.pullIndex", indexStart);

    const walkStart = Date.now();
    const toPush: string[] = [];
    try {
      for await (
        const entry of walk(this.cachePath, {
          includeDirs: false,
        })
      ) {
        const rel = relative(this.cachePath, entry.path);
        if (isInternalCacheFile(rel)) {
          continue;
        }

        const stat = await Deno.stat(entry.path);
        const existing = this.index?.entries[rel];
        if (existing && existing.size === stat.size) {
          if (
            existing.localMtime && stat.mtime &&
            existing.localMtime === stat.mtime.toISOString()
          ) {
            continue;
          }
          if (!stat.mtime || existing.localMtime === undefined) {
            continue;
          }
        }

        toPush.push(rel);
      }
    } catch {
      // Cache directory may not exist yet
    }
    tracePhase("pushChanged.walk", walkStart, `toPush=${toPush.length}`);

    const uploadStart = Date.now();
    let pushed = 0;
    const failures: Array<{ file: string; error: unknown }> = [];
    for (let i = 0; i < toPush.length; i += MAX_CONCURRENCY) {
      throwIfAborted(signal);
      const batch = toPush.slice(i, i + MAX_CONCURRENCY);
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
    if ((pushed > 0 || this.indexMutated) && this.index) {
      const writebackStart = Date.now();
      if (pushed > 0) {
        this.index.lastPulled = new Date().toISOString();
      }
      const indexJson = JSON.stringify(this.index, null, 2);
      const indexData = new TextEncoder().encode(indexJson);
      // Wrap in retryWithBackoff: if per-file pushes all succeed but
      // the index write fails on a transient 5xx/timeout, we'd leave
      // the remote inconsistent (files present, index unaware). Retry
      // keeps the write-back atomic from the caller's perspective.
      const putResult = await retryWithBackoff(
        () => this.gcs.putObject(".datastore-index.json", indexData, signal),
        { signal },
      );
      await atomicWriteTextFile(this.indexPath, indexJson);
      this.indexMutated = false;
      // Record the new index generation as the verified-clean
      // baseline so the next `pushChanged` can take the fast path.
      // The putObject response's generation is bound to the bytes we
      // just uploaded — it's race-free. If it's missing or zero, skip
      // silently: a post-PUT `getMetadata` would be TOCTOU-racy (a
      // concurrent writer could push between our PUT and our metadata
      // call, and we'd record their generation as ours), and the
      // sidecar is opportunistic — a missed update just costs one
      // slow path next time (swamp-club #168).
      //
      // Verify local has every entry in the merged index before marking
      // clean. The walk only iterated LOCAL files — remote-only entries
      // pulled in via `pullIndex(forceRemote)` were never visited, so
      // `pushed > 0` does not imply local fully matches the merged
      // index we just wrote back. A fresh reader migrating one file
      // against a populated remote takes this branch; without the
      // verify, the sidecar would lie and the next `pullChanged` would
      // fast-path past unfetched remote-only files (swamp-club#1225).
      if (
        putResult.generation && putResult.generation !== "0" &&
        await this.localHasAllRemoteEntries()
      ) {
        try {
          await this.markSynced(putResult.generation);
        } catch {
          // Non-fatal: sidecar update is opportunistic.
        }
      }
      tracePhase("pushChanged.writeback", writebackStart);
    } else if (indexGeneration && this.index) {
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
      if (await this.localHasAllRemoteEntries()) {
        try {
          await this.markSynced(indexGeneration);
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
    for (const [rel, entry] of Object.entries(this.index.entries)) {
      if (isInternalCacheFile(rel)) continue;
      const localPath = assertSafePath(this.cachePath, rel);
      try {
        const stat = await Deno.stat(localPath);
        if (stat.size !== entry.size) return false;
      } catch {
        return false;
      }
    }
    return true;
  }
}
