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
 * Domain interfaces mirrored from swamp core.
 * Extensions must be self-contained — they cannot import from swamp internals.
 */

/** Metadata describing the current holder of a distributed lock. */
export interface LockInfo {
  /** Opaque identifier of the process currently holding the lock. */
  holder: string;
  /** Hostname of the machine holding the lock. */
  hostname: string;
  /** OS-level process ID of the holder. */
  pid: number;
  /** ISO-8601 timestamp when the lock was acquired. */
  acquiredAt: string;
  /** Lock lease duration in milliseconds. */
  ttlMs: number;
  /** Random per-acquisition nonce used by `forceRelease`. */
  nonce?: string;
}

/** Tuning knobs for a single lock acquisition attempt. */
export interface LockOptions {
  /** Override the default lock key; lets different workflows partition locks. */
  lockKey?: string;
  /** Lease duration in milliseconds before the lock auto-expires. */
  ttlMs?: number;
  /** Delay between retries while another holder owns the lock. */
  retryIntervalMs?: number;
  /** Upper bound on the total time spent waiting to acquire. */
  maxWaitMs?: number;
}

/** Distributed mutex backing the datastore's write path. */
export interface DistributedLock {
  /** Blocks until the lock is held by the caller or `maxWaitMs` elapses. */
  acquire(): Promise<void>;
  /** Releases the lock if still held by this process; no-op otherwise. */
  release(): Promise<void>;
  /** Acquires the lock, runs `fn`, and releases regardless of the outcome. */
  withLock<T>(fn: () => Promise<T>): Promise<T>;
  /** Returns metadata about the current holder, or `null` if unlocked. */
  inspect(): Promise<LockInfo | null>;
  /** Force-releases the lock when the caller presents the holder's nonce. */
  forceRelease(expectedNonce: string): Promise<boolean>;
}

/** Result of a datastore health probe. */
export interface DatastoreHealthResult {
  /** `true` when the datastore is reachable and writable. */
  readonly healthy: boolean;
  /** Human-readable summary of the probe outcome. */
  readonly message: string;
  /** Round-trip latency for the probe, in milliseconds. */
  readonly latencyMs: number;
  /** Short identifier for the datastore implementation (e.g. `"s3"`, `"gcs"`). */
  readonly datastoreType: string;
  /** Free-form implementation-specific details surfaced by the probe. */
  readonly details?: Record<string, string>;
}

/** Runs a lightweight connectivity/credential probe against the datastore. */
export interface DatastoreVerifier {
  /** Executes the probe and returns a health snapshot. */
  verify(): Promise<DatastoreHealthResult>;
}

/** Optional flags passed to a sync operation. */
export interface DatastoreSyncOptions {
  /**
   * Cancellation signal forwarded to every in-flight S3 request. When the
   * signal fires, pending requests abort, retry backoff sleeps wake, and
   * the top-level promise rejects with `AbortError` — no further work is
   * scheduled. Added so swamp core's outer sync timeout can actually stop
   * in-flight work instead of leaking it past the deadline.
   */
  signal?: AbortSignal;
}

/** Moves data between the local cache directory and the remote datastore. */
export interface DatastoreSyncService {
  /** Downloads new or changed objects; returns the count synced where known. */
  pullChanged(options?: DatastoreSyncOptions): Promise<number | void>;
  /** Uploads new or changed local objects; returns the count synced where known. */
  pushChanged(options?: DatastoreSyncOptions): Promise<number | void>;
  /**
   * Signal that the local cache has uncommitted work. Must be called
   * by swamp-core before (or immediately after) any write into the
   * cache directory that does not route through a sync-service
   * method. Invalidates the fast-path short-circuit so the next
   * `pushChanged` performs a full walk + upload. No-op on
   * implementations without a fast-path optimization.
   */
  markDirty(): Promise<void>;
}

/** Factory that produces the datastore's lock, verifier, and sync service. */
export interface DatastoreProvider {
  /** Constructs a distributed lock scoped to `datastorePath`. */
  createLock(datastorePath: string, options?: LockOptions): DistributedLock;
  /** Constructs a health-probe verifier for this datastore. */
  createVerifier(): DatastoreVerifier;
  /** Optional factory for a cache-sync service, when the datastore supports it. */
  createSyncService?(repoDir: string, cachePath: string): DatastoreSyncService;
  /** Resolves the logical datastore path rooted at `repoDir`. */
  resolveDatastorePath(repoDir: string): string;
  /** Optional hook to override the local cache path, keyed by `repoDir`. */
  resolveCachePath?(repoDir: string): string | undefined;
}
