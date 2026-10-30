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
  /** Caller-supplied key-value context embedded in the lock body. */
  context?: Record<string, string>;
}

/** Tuning knobs for a single lock acquisition attempt. */
export interface LockOptions {
  /** Override the default lock key; lets different workflows partition locks. */
  lockKey?: string;
  /** Namespace prefix for the lock key. When set, the lock key is scoped
   *  under {namespace}/ so IAM policies scoped to the namespace prefix
   *  can reach it. */
  namespace?: string;
  /** Lease duration in milliseconds before the lock auto-expires. */
  ttlMs?: number;
  /** Base delay between retries (exponential backoff starting point). */
  retryIntervalMs?: number;
  /** Upper bound on the total time spent waiting to acquire. */
  maxWaitMs?: number;
  /** Cap on the backoff interval between retries. Default: 8000ms. */
  maxRetryIntervalMs?: number;
  /** Caller-supplied context embedded in the lock body for diagnostics. */
  holderContext?: Record<string, string>;
}

/** Distributed mutex backing the datastore's write path. */
export interface DistributedLock {
  /** Blocks until the lock is held by the caller or `maxWaitMs` elapses. */
  acquire(): Promise<void>;
  /** Releases the lock if still held by this process; no-op otherwise. */
  release(): Promise<void>;
  /** Acquires the lock, runs `fn`, and releases regardless of the outcome. */
  withLock<T>(fn: () => Promise<T>): Promise<T>;
  /**
   * Returns metadata about the current holder, or `null` if unlocked.
   *
   * `null` means the lock is genuinely unheld. A backend that cannot answer
   * throws instead: reporting an unreachable store as "nobody holds it" reads
   * as an invitation to proceed, which is how swamp-club#2298 let two hosts
   * run the same model at once.
   */
  inspect(): Promise<LockInfo | null>;
  /**
   * Force-releases the lock when the caller presents the holder's nonce.
   * Returns false when the lock is absent or held by someone else; throws if
   * the backend cannot be reached, for the reason given on `inspect`.
   */
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

/** Model identity passed by core when scoped sync is active. */
export interface SyncModelRef {
  modelType: string;
  modelId: string;
}

/** Context provided by core to scoped sync operations. */
export interface SyncContext {
  models: SyncModelRef[];
}

/** Capabilities advertised by a sync service implementation. */
export interface SyncCapabilities {
  scopedSync: boolean;
  lazyHydration?: boolean;
  namespacedSync?: boolean;
  twoPhaseSync?: boolean;
  controlPlane?: boolean;
  configRefresh?: boolean;
}

/** Direct key-value store for small control-plane records. */
export interface ControlPlaneStore {
  put(key: string, data: Uint8Array): Promise<void>;
  get(key: string): Promise<Uint8Array | null>;
  delete(key: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
  putIfAbsent(key: string, data: Uint8Array): Promise<boolean>;
}

/** Options for a control-plane read. */
export interface ControlPlaneReadOptions {
  /** Cancels the read: stops the request in flight and any retry backoff. */
  readonly signal?: AbortSignal;
}

/**
 * Reads control-plane records at the datastore-wide `_control/` root,
 * whatever namespace a repository uses. Binds no namespace and shares no
 * state with any sync service.
 */
export interface DatastoreControlPlaneStore {
  /**
   * The record at `_control/<key>`, or null only when no such record exists.
   * Every other failure rejects, as does an aborted `options.signal`.
   */
  get(
    key: string,
    options?: ControlPlaneReadOptions,
  ): Promise<Uint8Array | null>;
}

/**
 * A {@link DatastoreControlPlaneStore} that also writes, at the same
 * datastore-wide `_control/` root. The v3 writer lease keeps its records
 * (`writer/`) here.
 */
export interface WritableDatastoreControlPlaneStore
  extends DatastoreControlPlaneStore {
  /** Writes the record at `_control/<key>`, replacing any record there. */
  put(key: string, data: Uint8Array): Promise<void>;
  /**
   * Creates the record only if none is there; false, leaving the existing
   * record unchanged, when one is.
   */
  putIfAbsent(key: string, data: Uint8Array): Promise<boolean>;
  /** Removes the record; a missing record is no error. */
  delete(key: string): Promise<void>;
  /** The keys under `_control/<prefix>`, relative to `_control/`. */
  list(prefix: string): Promise<string[]>;
}

/** What a {@link DatastoreStorage} supports. */
export interface StorageCapabilities {
  /** The largest chunk stored, in bytes. */
  readonly maxChunkBytes: number;
  /** True when the storage implements `touch`. */
  readonly touch: boolean;
}

/** One chunk, as {@link DatastoreStorage.list} reports it. */
export interface StoredChunk {
  readonly sha256: string;
  /** When the chunk was last put or touched, by the server's clock. */
  readonly lastModified: Date;
}

/**
 * The `storage/1` contract: immutable chunks keyed by namespace and the
 * SHA-256 of their bytes, at
 * `<prefix>/_blobs/<namespace>/sha256/<first two hex>/<sha256>`.
 */
export interface DatastoreStorage {
  readonly contract: "storage/1";
  capabilities(): StorageCapabilities;
  /** The subset of `hashes` stored in `namespace`. */
  has(
    namespace: string,
    hashes: readonly string[],
    signal: AbortSignal,
  ): Promise<Set<string>>;
  /** Stores `bytes` under `sha256`, replacing any chunk already there. */
  put(
    namespace: string,
    sha256: string,
    bytes: Uint8Array,
    signal: AbortSignal,
  ): Promise<void>;
  /** The chunk's bytes, or null only when no such chunk exists. */
  get(
    namespace: string,
    sha256: string,
    signal: AbortSignal,
  ): Promise<Uint8Array | null>;
  /**
   * Refreshes `lastModified` for each of `hashes` that is stored, and
   * returns the ones that are not.
   */
  touch?(
    namespace: string,
    hashes: readonly string[],
    signal: AbortSignal,
  ): Promise<Set<string>>;
  /** Every chunk stored in `namespace`, in no particular order. */
  list(namespace: string, signal: AbortSignal): AsyncIterable<StoredChunk>;
  /** Removes the chunk; removing a missing chunk succeeds. */
  delete(namespace: string, sha256: string, signal: AbortSignal): Promise<void>;
}

/**
 * Opaque manifest returned by {@link DatastoreSyncService.preparePush}
 * and consumed by {@link DatastoreSyncService.commitPush}.
 *
 * Core treats this as passthrough — it never inspects or validates the
 * contents. The extension defines what goes inside; core only
 * orchestrates when each phase runs.
 */
export type PushManifest = { readonly __brand: unique symbol };

/** Optional flags passed to a sync operation. */
export interface DatastoreSyncOptions {
  /**
   * Cancellation signal forwarded to every in-flight GCS request. When the
   * signal fires, pending requests abort, retry backoff sleeps wake, and
   * the top-level promise rejects with `AbortError` — no further work is
   * scheduled. Added so swamp core's outer sync timeout can actually stop
   * in-flight work instead of leaking it past the deadline.
   */
  signal?: AbortSignal;
  /** Cache-relative path of the directory that was dirtied. */
  relPath?: string;
  /** Scoped sync context provided by core when capabilities().scopedSync is true. */
  context?: SyncContext;
  /** When true, skip downloading raw content files under data/ — pull only metadata.yaml, latest pointers, and non-data files. */
  metadataOnly?: boolean;
  /** Namespace for multi-repo shared datastores. When set, scopes index and data operations to {namespace}/ prefix. */
  namespace?: string;
  /**
   * Restricts `pullChanged` to the listed datastore subdirectories.
   * When set, the extension SHOULD only pull paths under these prefixes
   * instead of walking the entire datastore. Extensions that advertise
   * `configRefresh` in their capabilities SHOULD honor this option;
   * extensions that don't can safely ignore it and pull everything.
   *
   * Used by the ConfigPoller to efficiently refresh only the `config/`
   * prefix without pulling runtime data.
   */
  subdirs?: readonly string[];
}

/** A single row in a namespace catalog export. */
export interface CatalogExportRow {
  relPath: string;
  size: number;
  lastModified: string;
  sha256?: string;
}

/** A catalog export entry returned by pullForeignCatalogs. */
export interface CatalogExportEntry {
  namespace: string;
  rows: CatalogExportRow[];
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
  markDirty(options?: DatastoreSyncOptions): Promise<void>;
  /** Advertises sync capabilities to the framework. */
  capabilities?(): SyncCapabilities;
  /** Downloads a single file by its cache-relative path on demand. */
  hydrateFile?(
    relPath: string,
    options?: DatastoreSyncOptions,
  ): Promise<boolean>;
  /**
   * Reads one file as the remote holds it and writes nothing locally.
   * `relPath` is cache-relative, so with a namespace it already starts with
   * `{namespace}/`. Resolves to null only when the remote has no such file;
   * any other failure rejects.
   */
  fetchContent?(
    relPath: string,
    options?: DatastoreSyncOptions,
  ): Promise<Uint8Array | null>;
  /** Writes a catalog export JSON to {namespace}/.catalog-export.json. */
  exportCatalog?(
    namespace: string,
    rows: CatalogExportRow[],
    signal?: AbortSignal,
  ): Promise<void>;
  /** Fetches catalog exports from foreign namespaces. Skips missing/malformed silently. */
  pullForeignCatalogs?(
    namespaces: string[],
    signal?: AbortSignal,
  ): Promise<CatalogExportEntry[]>;
  /** Downloads a single file from a foreign namespace. Returns bytes or null if missing. */
  fetchForeignContent?(
    namespace: string,
    relPath: string,
    signal?: AbortSignal,
  ): Promise<Uint8Array | null>;
  /** Phase 1 of two-phase push: upload changed files to the remote. */
  preparePush?(options?: DatastoreSyncOptions): Promise<PushManifest>;
  /** Phase 2 of two-phase push: merge the manifest into the remote index. */
  commitPush?(
    manifest: PushManifest,
    options?: DatastoreSyncOptions,
  ): Promise<number | void>;
  /** Returns a direct key-value store for small control-plane records. */
  controlPlaneStore?(): ControlPlaneStore;
  /**
   * Finds cache files the remote has never received and, unless `dryRun`,
   * uploads them with create-only writes. Deletes nothing and leaves dirty
   * state and the sync fingerprint alone.
   */
  repairUnpushedFiles?(
    options?: RepairUnpushedFilesOptions,
  ): Promise<UnpushedFilesSummary>;
}

/** Options for the namespace contamination repair operation. */
export interface RepairNamespaceContaminationOptions {
  signal?: AbortSignal;
  namespace?: string;
  /** true = detect only, false = delete + rebuild index. Defaults to true. */
  dryRun?: boolean;
}

/** Summary of foreign namespace objects found (and optionally deleted). */
export interface NamespaceContaminationSummary {
  foreignNamespaces: ReadonlyArray<{
    namespace: string;
    objectCount: number;
  }>;
  totalForeignObjects: number;
  /** Number of foreign objects deleted. Zero when dryRun is true. */
  deleted: number;
}

/** Options for `DatastoreSyncService.repairUnpushedFiles`. */
export interface RepairUnpushedFilesOptions {
  signal?: AbortSignal;
  namespace?: string;
  /** When true, report without uploading anything. */
  dryRun?: boolean;
  /** When true, compare content by sha256 where size and mtime cannot. */
  exact?: boolean;
}

/** Summary of `DatastoreSyncService.repairUnpushedFiles`. */
export interface UnpushedFilesSummary {
  /**
   * Files the remote has never received: every one found on a dry run, and
   * those still not uploaded on a real run.
   */
  unpushed: number;
  /** Up to 20 of them, cache-relative with forward slashes. */
  samplePaths: readonly string[];
  /** Local files whose key the remote holds with other bytes. */
  alreadyPresent: number;
  sampleAlreadyPresent: readonly string[];
  /** Local files whose content differs from their last-synced entry. */
  locallyModified: number;
  sampleModified: readonly string[];
  /** Local files that may differ from an entry with no sha256. */
  unknown: number;
  sampleUnknown: readonly string[];
  /**
   * Local files whose key a sync dropped from the last-synced index while
   * the file stayed, as when a peer deleted it. Never uploaded.
   */
  peerDeleted: number;
  samplePeerDeleted: readonly string[];
  /** Last-synced keys the remote now holds with other content. */
  remoteMovedOn: number;
  /** Files uploaded and indexed. Zero on a dry run. */
  uploaded: number;
  /** Whether the cache holds marks a push has not sent yet. */
  pendingChanges: boolean;
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
  /** Registers a namespace manifest in the remote datastore for conflict detection. */
  registerNamespace?(
    datastorePath: string,
    namespace: string,
    repoId: string,
  ): Promise<void>;
  /** Lists all registered namespaces in the remote datastore. */
  listNamespaces?(datastorePath: string): Promise<string[]>;
  /** The datastore-wide control plane at the root `_control/`. */
  datastoreControlPlaneStore?(): DatastoreControlPlaneStore;
  /**
   * `true` declares that no namespaced pull or push moves or copies
   * `_control/writer/`, so the v3 writer lease stays at the datastore root.
   */
  readonly datastoreWideLease?: boolean;
  /** The `storage/1` chunk storage, scoped to the datastore root. */
  storage?(): DatastoreStorage;
  /**
   * Where this datastore's v3 Litestream replica lives: the bucket, and the
   * key prefix of the datastore root that `storage()` and
   * `datastoreControlPlaneStore()` write under. Swamp appends
   * `_litestream/<fence>/` to the prefix; the provider never builds replica
   * paths. Synchronous, and never carries credentials: Litestream resolves
   * them from the same default chain the datastore uses. Throws, rather than
   * returning a target Litestream cannot reach; the message is shown to the
   * user, so it carries no config values.
   */
  replicaTarget?(): V3ReplicaTarget;
  /**
   * The Litestream lineage paths under the replica target's
   * `<prefix>/_litestream/`, so swamp can remove the path of a lineage a
   * takeover replaced (`storage/1` is chunk-keyed and cannot reach them).
   * It never touches anything outside `<prefix>/_litestream/<fence>/`, and
   * refuses a fence that is not the 12-digit padded form.
   */
  replicaPaths?(): ReplicaPathStore;
}

/**
 * Lists and removes Litestream lineage paths under `<prefix>/_litestream/`,
 * as `DatastoreProvider.replicaPaths()` returns it.
 */
export interface ReplicaPathStore {
  /**
   * The fence directories present under `<prefix>/_litestream/`, without
   * their trailing slash, in any order. A directory whose name is not a
   * fence may be returned; swamp ignores it.
   */
  list(signal: AbortSignal): Promise<string[]>;
  /**
   * Deletes every object under `<prefix>/_litestream/<fence>/`, paging
   * through listings, and resolves once none is left. Resolves when nothing
   * is there. Throws, deleting nothing, when `fence` is not exactly 12
   * digits from `000000000001`.
   */
  removePath(fence: string, signal: AbortSignal): Promise<void>;
}

/**
 * A datastore's Litestream replica, as `DatastoreProvider.replicaTarget()`
 * returns it. `prefix` is the datastore root's key prefix: no leading or
 * trailing slash, or empty.
 */
export type V3ReplicaTarget =
  | {
    readonly type: "s3";
    readonly bucket: string;
    readonly prefix: string;
    readonly region?: string;
    /** An S3-compatible endpoint, as an http or https URL. */
    readonly endpoint?: string;
    /** Path-style addressing. Unset, it is on whenever `endpoint` is set. */
    readonly forcePathStyle?: boolean;
  }
  | {
    readonly type: "gcs";
    readonly bucket: string;
    readonly prefix: string;
  };
