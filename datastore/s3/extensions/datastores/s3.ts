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
 * Swamp datastore backend that stores repository state in Amazon S3.
 *
 * Provides distributed locking via S3 conditional writes and bidirectional
 * sync between a local cache directory and an S3 bucket. Use this entrypoint
 * when a swamp deployment should share state between multiple processes or
 * machines through S3 rather than a local directory.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { join } from "jsr:@std/path@1";
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
import { S3Client } from "./_lib/s3_client.ts";
import { S3Lock } from "./_lib/s3_lock.ts";
import { S3DatastoreVerifier } from "./_lib/s3_verifier.ts";
import { S3CacheSyncService } from "./_lib/s3_cache_sync.ts";
import { S3DatastoreControlPlaneStore } from "./_lib/s3_control_plane.ts";
import { S3ChunkStorage } from "./_lib/s3_storage.ts";
import { S3ReplicaPathStore } from "./_lib/s3_replica_paths.ts";

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

const S3_BUCKET_NAME_RE = /^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]$/;

const s3ConfigSchema = z.object({
  bucket: z.string()
    .min(3)
    .max(63)
    .regex(
      S3_BUCKET_NAME_RE,
      "Bucket names must be 3-63 characters, lowercase, and contain only letters, numbers, hyphens, and dots",
    )
    .describe("S3 bucket name"),
  prefix: z.string().optional()
    .describe("Key prefix within the bucket"),
  region: z.string().optional()
    .describe("AWS region (defaults to environment/credentials)"),
  endpoint: z.string().url().optional()
    .describe(
      "Custom S3-compatible endpoint URL (e.g., https://nyc3.digitaloceanspaces.com)",
    ),
  forcePathStyle: z.boolean().optional()
    .describe(
      "Use path-style addressing (bucket in path, not subdomain). Default: false",
    ),
  pullConcurrency: z.number().int().min(1).max(1000).optional()
    .describe(
      "Maximum concurrent S3 downloads during pull. Default: 50",
    ),
  pushConcurrency: z.number().int().min(1).max(1000).optional()
    .describe(
      "Maximum concurrent S3 uploads during push. Default: 25",
    ),
  requestTimeoutMs: z.number().int().min(1000).max(600_000).optional()
    .describe(
      "Per-request timeout in milliseconds. Default: 30000. " +
        "Override with SWAMP_S3_REQUEST_TIMEOUT_MS env var.",
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
 * Why `endpoint` cannot be a replica target's endpoint, or undefined when it
 * can: Litestream needs a plain http or https URL.
 *
 * Exported for unit tests; not part of the public extension API.
 */
export function replicaEndpointProblem(endpoint: string): string | undefined {
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    return "is not a URL";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "is not an http or https URL";
  }
  if (url.username !== "" || url.password !== "") {
    return "carries credentials; supply them through the AWS credential chain";
  }
  if (url.search !== "" || url.hash !== "") {
    return "has a query or fragment";
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// S3 Datastore Provider
// ---------------------------------------------------------------------------

interface S3DatastoreProviderConfig {
  bucket: string;
  prefix?: string;
  region?: string;
  endpoint?: string;
  forcePathStyle?: boolean;
  pullConcurrency?: number;
  pushConcurrency?: number;
  requestTimeoutMs?: number;
}

class S3DatastoreProviderImpl implements DatastoreProvider {
  private readonly config: S3DatastoreProviderConfig;

  /**
   * No namespaced pull or push moves `_control/writer/` (or the v3 lineage
   * under `_control/lineage/`): the root-to-namespace control-plane migration
   * skips them (swamp-club#3395).
   */
  readonly datastoreWideLease = true;

  constructor(config: S3DatastoreProviderConfig) {
    this.config = config;
  }

  private s3ClientConfig(): {
    bucket: string;
    prefix?: string;
    region?: string;
    endpoint?: string;
    forcePathStyle?: boolean;
    defaultRequestTimeoutMs?: number;
  } {
    return {
      bucket: this.config.bucket,
      prefix: this.config.prefix,
      region: this.config.region,
      endpoint: this.config.endpoint,
      forcePathStyle: this.config.forcePathStyle,
      defaultRequestTimeoutMs: this.config.requestTimeoutMs,
    };
  }

  createLock(_datastorePath: string, options?: LockOptions): DistributedLock {
    const s3 = new S3Client(this.s3ClientConfig());
    return new S3Lock(s3, options);
  }

  createVerifier(): DatastoreVerifier {
    return new S3DatastoreVerifier(this.config);
  }

  createSyncService(
    _repoDir: string,
    cachePath: string,
  ): DatastoreSyncService {
    const s3 = new S3Client(this.s3ClientConfig());
    return new S3CacheSyncService(s3, cachePath, {
      pullConcurrency: this.config.pullConcurrency,
      pushConcurrency: this.config.pushConcurrency,
    });
  }

  datastoreControlPlaneStore(): WritableDatastoreControlPlaneStore {
    return new S3DatastoreControlPlaneStore(
      new S3Client(this.s3ClientConfig()),
    );
  }

  storage(): DatastoreStorage {
    return new S3ChunkStorage(new S3Client(this.s3ClientConfig()));
  }

  /**
   * The Litestream lineage paths under `<prefix>/_litestream/`, the root
   * `replicaTarget()` names, so swamp can remove the path of a lineage a
   * takeover replaced.
   */
  replicaPaths(): ReplicaPathStore {
    return new S3ReplicaPathStore(new S3Client(this.s3ClientConfig()));
  }

  /**
   * Where Litestream replicates this datastore's v3 `commits.db`: the bucket
   * and the same root `storage()` and the control plane write under. The
   * prefix goes out exactly as S3Client joins it onto keys, so a prefix the
   * target cannot express is refused rather than tidied, which would point
   * the replica somewhere else. With an endpoint, path style is always
   * stated: the SDK defaults it off, while an unset `forcePathStyle` in a
   * target means on.
   */
  replicaTarget(): V3ReplicaTarget {
    const prefix = this.config.prefix ?? "";
    const prefixProblem = replicaPrefixProblem(prefix);
    if (prefixProblem) {
      throw new Error(
        `This S3 datastore cannot host v3 replication: its prefix ${prefixProblem}.`,
      );
    }
    const endpoint = this.config.endpoint;
    if (endpoint !== undefined) {
      const endpointProblem = replicaEndpointProblem(endpoint);
      if (endpointProblem) {
        throw new Error(
          `This S3 datastore cannot host v3 replication: its endpoint ${endpointProblem}.`,
        );
      }
    }
    return {
      type: "s3",
      bucket: this.config.bucket,
      prefix,
      ...(this.config.region ? { region: this.config.region } : {}),
      ...(endpoint !== undefined
        ? { endpoint, forcePathStyle: this.config.forcePathStyle ?? false }
        : {}),
    };
  }

  resolveDatastorePath(repoDir: string): string {
    // For S3, the "datastore path" is the local cache directory
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
    const s3 = new S3Client(this.s3ClientConfig());
    const key = `${namespace}/.namespace.json`;
    const manifest = JSON.stringify(
      { namespace, repoId, registeredAt: new Date().toISOString() },
      null,
      2,
    );
    const body = new TextEncoder().encode(manifest);

    // Atomic first-writer-wins: putObjectConditional uses If-None-Match: *
    const created = await s3.putObjectConditional(key, body);
    if (created) return;

    // Object already exists — check if it belongs to this repo
    const { data } = await s3.getObject(key);
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
    await s3.putObject(key, body);
  }

  async listNamespaces(_datastorePath: string): Promise<string[]> {
    const s3 = new S3Client(this.s3ClientConfig());
    const entries = await s3.listAllObjects();
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
  type: "@swamp/s3-datastore",
  name: "Amazon S3",
  description:
    "Store data in an Amazon S3 bucket with local cache synchronization. " +
    "Provides distributed locking via S3 conditional writes and bidirectional " +
    "sync between a local cache directory and S3.",
  configSchema: s3ConfigSchema,
  createProvider(config: Record<string, unknown>): DatastoreProvider {
    const parsed = s3ConfigSchema.parse(config);
    return new S3DatastoreProviderImpl(parsed);
  },
};
