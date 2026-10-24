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
 * Swamp datastore backend that stores repository state in Google Cloud Storage.
 *
 * Provides distributed locking via GCS generation-based preconditions and
 * bidirectional sync between a local cache directory and a GCS bucket. Use
 * this entrypoint when a swamp deployment should share state between multiple
 * processes or machines through GCS rather than a local directory.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { join } from "jsr:@std/path@1.1.4";
import type {
  CatalogExportEntry,
  CatalogExportRow,
  DatastoreHealthResult,
  DatastoreProvider,
  DatastoreStorage,
  DatastoreSyncService,
  DatastoreVerifier,
  DistributedLock,
  LockInfo,
  LockOptions,
  ReplicaPathStore,
  SyncCapabilities,
  V3ReplicaTarget,
  WritableDatastoreControlPlaneStore,
} from "./_lib/interfaces.ts";
import { GcsClient, NotFoundError } from "./_lib/gcs_client.ts";
import { GcsLock } from "./_lib/gcs_lock.ts";
import { GcsDatastoreVerifier } from "./_lib/gcs_verifier.ts";
import { GcsCacheSyncService } from "./_lib/gcs_cache_sync.ts";
import { GcsDatastoreControlPlaneStore } from "./_lib/gcs_control_plane.ts";
import { GcsChunkStorage } from "./_lib/gcs_storage.ts";
import { GcsReplicaPathStore } from "./_lib/gcs_replica_paths.ts";

export type {
  CatalogExportEntry,
  CatalogExportRow,
  DatastoreHealthResult,
  DatastoreProvider,
  DatastoreSyncService,
  DatastoreVerifier,
  DistributedLock,
  LockInfo,
  LockOptions,
  ReplicaPathStore,
  SyncCapabilities,
  V3ReplicaTarget,
};

// ---------------------------------------------------------------------------
// Config schema
// ---------------------------------------------------------------------------

// GCS bucket naming: 3-63 chars, lowercase letters, numbers, hyphens,
// underscores, and dots. Must start and end with a letter or number.
// Cannot begin with "goog" or contain "google".
const GCS_BUCKET_NAME_RE = /^[a-z0-9][a-z0-9._-]{1,61}[a-z0-9]$/;

const gcsConfigSchema = z.object({
  bucket: z.string()
    .min(3)
    .max(63)
    .regex(
      GCS_BUCKET_NAME_RE,
      "Bucket names must be 3-63 characters, lowercase, and contain only " +
        "letters, numbers, hyphens, underscores, and dots",
    )
    .refine(
      (name) => !name.startsWith("goog"),
      "Bucket names cannot start with 'goog'",
    )
    .refine(
      (name) => !name.includes("google"),
      "Bucket names cannot contain 'google'",
    )
    .describe("GCS bucket name"),
  prefix: z.string().optional()
    .describe("Object name prefix within the bucket"),
  projectId: z.string().optional()
    .describe("GCP project ID (defaults to ADC project)"),
  apiEndpoint: z.string().url().optional()
    .describe(
      "Custom API endpoint URL (for emulators like fake-gcs-server)",
    ),
  pullConcurrency: z.number().int().min(1).max(1000).optional()
    .describe(
      "Maximum concurrent GCS downloads during pull. Default: 50",
    ),
  pushConcurrency: z.number().int().min(1).max(1000).optional()
    .describe(
      "Maximum concurrent GCS uploads during push. Default: 25",
    ),
  requestTimeoutMs: z.number().int().min(1000).max(600_000).optional()
    .describe(
      "Per-request timeout in milliseconds. Default: 30000. " +
        "Override with SWAMP_GCS_REQUEST_TIMEOUT_MS env var.",
    ),
});

// ---------------------------------------------------------------------------
// Replica target checks
// ---------------------------------------------------------------------------

/**
 * Why `prefix` cannot be a replica target's prefix, or undefined when it can.
 * The rules are swamp's for `V3ReplicaTarget.prefix`. Describes the rule, not
 * the value, since swamp shows the message to the user.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function replicaPrefixProblem(prefix: string): string | undefined {
  if (prefix === "") return undefined;
  const segments = prefix.split("/");
  if (segments.some((s) => s === "" || s === "." || s === "..")) {
    return 'has a leading, trailing or repeated "/", or a "." or ".." ' +
      "segment; set a prefix without them";
  }
  return undefined;
}

/**
 * `STORAGE_EMULATOR_HOST`, the variable through which Litestream (like the
 * Google client libraries) reaches a GCS emulator; undefined when unset or
 * unreadable.
 */
function storageEmulatorHost(): string | undefined {
  try {
    return Deno.env.get("STORAGE_EMULATOR_HOST") || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Whether `emulatorHost` (`host:port`, with or without a scheme) names the
 * same host and port as `apiEndpoint`. Then Litestream reaches the same
 * emulator the datastore writes to, so a v3 replica there is sound. Only
 * an exact host and port match counts: `localhost` and `127.0.0.1` differ.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function emulatorHostMatches(
  apiEndpoint: string,
  emulatorHost: string | undefined,
): boolean {
  if (emulatorHost === undefined) return false;
  const parse = (value: string): URL | undefined => {
    try {
      return new URL(
        /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `http://${value}`,
      );
    } catch {
      return undefined;
    }
  };
  const endpoint = parse(apiEndpoint);
  const emulator = parse(emulatorHost);
  if (endpoint === undefined || emulator === undefined) return false;
  const port = (url: URL) =>
    url.port !== "" ? url.port : url.protocol === "https:" ? "443" : "80";
  return endpoint.hostname.toLowerCase() === emulator.hostname.toLowerCase() &&
    port(endpoint) === port(emulator);
}

// ---------------------------------------------------------------------------
// GCS Datastore Provider
// ---------------------------------------------------------------------------

interface GcsDatastoreProviderConfig {
  bucket: string;
  prefix?: string;
  projectId?: string;
  apiEndpoint?: string;
  pullConcurrency?: number;
  pushConcurrency?: number;
  requestTimeoutMs?: number;
}

class GcsDatastoreProviderImpl implements DatastoreProvider {
  private readonly config: GcsDatastoreProviderConfig;

  /**
   * No namespaced pull or push moves `_control/writer/` (or the v3 lineage
   * under `_control/lineage/`): the root-to-namespace control-plane migration
   * skips them (swamp-club#3395).
   */
  readonly datastoreWideLease = true;

  constructor(config: GcsDatastoreProviderConfig) {
    this.config = config;
  }

  private gcsClientConfig(): {
    bucket: string;
    prefix?: string;
    projectId?: string;
    apiEndpoint?: string;
    defaultRequestTimeoutMs?: number;
  } {
    return {
      bucket: this.config.bucket,
      prefix: this.config.prefix,
      projectId: this.config.projectId,
      apiEndpoint: this.config.apiEndpoint,
      defaultRequestTimeoutMs: this.config.requestTimeoutMs,
    };
  }

  createLock(_datastorePath: string, options?: LockOptions): DistributedLock {
    const gcs = new GcsClient(this.gcsClientConfig());
    return new GcsLock(gcs, options);
  }

  createVerifier(): DatastoreVerifier {
    // gcsClientConfig(), not this.config: the client reads
    // `defaultRequestTimeoutMs`, which is what the rename produces. Passing
    // the raw config silently dropped a configured requestTimeoutMs and left
    // the verifier on the 30s default.
    return new GcsDatastoreVerifier(this.gcsClientConfig());
  }

  createSyncService(
    _repoDir: string,
    cachePath: string,
  ): DatastoreSyncService {
    const gcs = new GcsClient(this.gcsClientConfig());
    return new GcsCacheSyncService(gcs, cachePath, {
      pullConcurrency: this.config.pullConcurrency,
      pushConcurrency: this.config.pushConcurrency,
    });
  }

  datastoreControlPlaneStore(): WritableDatastoreControlPlaneStore {
    return new GcsDatastoreControlPlaneStore(
      new GcsClient(this.gcsClientConfig()),
    );
  }

  storage(): DatastoreStorage {
    return new GcsChunkStorage(new GcsClient(this.gcsClientConfig()));
  }

  /**
   * The Litestream lineage paths under `<prefix>/_litestream/`, the root
   * `replicaTarget()` names, so swamp can remove the path of a lineage a
   * takeover replaced.
   */
  replicaPaths(): ReplicaPathStore {
    return new GcsReplicaPathStore(new GcsClient(this.gcsClientConfig()));
  }

  /**
   * Where Litestream replicates this datastore's v3 `commits.db`: the bucket
   * and the same root `storage()` and the control plane write under. The
   * prefix goes out exactly as GcsClient joins it onto object names, so a
   * prefix the target cannot express is refused rather than tidied, which
   * would point the replica somewhere else. A custom `apiEndpoint` is
   * refused too: Litestream has no equivalent, so it would replicate to real
   * GCS instead. The exception is an emulator that `STORAGE_EMULATOR_HOST`
   * names at the same host and port, which Litestream reaches through that
   * variable (how swamp's own tests and swamp-uat run v3 on GCS).
   */
  replicaTarget(): V3ReplicaTarget {
    if (
      this.config.apiEndpoint !== undefined &&
      !emulatorHostMatches(this.config.apiEndpoint, storageEmulatorHost())
    ) {
      throw new Error(
        "This GCS datastore cannot host v3 replication: it sets apiEndpoint, " +
          "and Litestream cannot use a custom GCS endpoint, so it would " +
          "replicate to Google Cloud Storage instead of that endpoint. For " +
          "an emulator in tests, set STORAGE_EMULATOR_HOST to the same host " +
          "and port as apiEndpoint: Litestream then reaches the emulator too.",
      );
    }
    const prefix = this.config.prefix ?? "";
    const prefixProblem = replicaPrefixProblem(prefix);
    if (prefixProblem) {
      throw new Error(
        `This GCS datastore cannot host v3 replication: its prefix ${prefixProblem}.`,
      );
    }
    return { type: "gcs", bucket: this.config.bucket, prefix };
  }

  resolveDatastorePath(repoDir: string): string {
    return join(repoDir, ".swamp");
  }

  resolveCachePath(_repoDir: string): string | undefined {
    // Let swamp core determine the cache path based on repoId.
    return undefined;
  }

  async registerNamespace(
    _datastorePath: string,
    namespace: string,
    repoId: string,
  ): Promise<void> {
    const gcs = new GcsClient(this.gcsClientConfig());
    if (/[/\\]|^\.\.?$|\.\.[\\/]/.test(namespace) || namespace.includes("\0")) {
      throw new Error(
        `Invalid namespace "${namespace}": must not contain path separators, "..", or null bytes`,
      );
    }
    const key = `${namespace}/.namespace.json`;

    // Read-before-write: detect conflicts regardless of whether the
    // backend enforces ifGenerationMatch=0 preconditions (some
    // GCS-compatible backends like fake-gcs-server may not).
    try {
      const { data } = await gcs.getObject(key);
      const text = new TextDecoder().decode(data);
      const existing = JSON.parse(text) as {
        namespace: string;
        repoId: string;
        registeredAt: string;
      };
      if (existing.repoId !== repoId) {
        throw new Error(
          `Namespace "${namespace}" is already registered by repo ${existing.repoId}`,
        );
      }
      // Same repoId — idempotent re-registration, update timestamp
      const manifest = JSON.stringify(
        { namespace, repoId, registeredAt: new Date().toISOString() },
        null,
        2,
      );
      await gcs.putObject(key, new TextEncoder().encode(manifest));
      return;
    } catch (err) {
      if (!(err instanceof NotFoundError)) throw err;
    }

    // No existing manifest — create with atomic first-writer-wins guard.
    // The read-before-write above covers the sequential case; this
    // putObjectConditional is the primary concurrency guard on compliant
    // backends. On non-compliant backends both concurrent writers may
    // pass the read check and succeed here — namespace registration is
    // rare enough that this TOCTOU is acceptable (same design decision
    // as .datastore.lock).
    const manifest = JSON.stringify(
      { namespace, repoId, registeredAt: new Date().toISOString() },
      null,
      2,
    );
    const body = new TextEncoder().encode(manifest);
    const created = await gcs.putObjectConditional(key, body);
    if (created !== null) return;

    // Conditional write raced with another writer — re-check ownership
    const { data } = await gcs.getObject(key);
    const text = new TextDecoder().decode(data);
    const existing = JSON.parse(text) as {
      namespace: string;
      repoId: string;
      registeredAt: string;
    };
    if (existing.repoId !== repoId) {
      throw new Error(
        `Namespace "${namespace}" is already registered by repo ${existing.repoId}`,
      );
    }
    await gcs.putObject(key, body);
  }

  async listNamespaces(_datastorePath: string): Promise<string[]> {
    const gcs = new GcsClient(this.gcsClientConfig());
    const entries = await gcs.listAllObjects();
    const namespaces: string[] = [];
    for (const entry of entries) {
      if (entry.key.endsWith("/.namespace.json")) {
        const ns = entry.key.slice(
          0,
          entry.key.length - "/.namespace.json".length,
        );
        if (ns) namespaces.push(ns);
      }
    }
    return namespaces;
  }
}

// ---------------------------------------------------------------------------
// Extension export
// ---------------------------------------------------------------------------

/**
 * Extension entrypoint registered with swamp. Declares the datastore type,
 * its configuration schema, and the factory used to instantiate a provider.
 */
export const datastore = {
  type: "@swamp/gcs-datastore",
  name: "Google Cloud Storage",
  description:
    "Store data in a Google Cloud Storage bucket with local cache synchronization. " +
    "Provides distributed locking via GCS generation-based preconditions and " +
    "bidirectional sync between a local cache directory and GCS.",
  configSchema: gcsConfigSchema,
  createProvider(config: Record<string, unknown>): DatastoreProvider {
    const parsed = gcsConfigSchema.parse(config);
    return new GcsDatastoreProviderImpl(parsed);
  },
};
