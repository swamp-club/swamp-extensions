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
  DatastoreHealthResult,
  DatastoreProvider,
  DatastoreSyncService,
  DatastoreVerifier,
  DistributedLock,
  LockInfo,
  LockOptions,
  SyncCapabilities,
} from "./_lib/interfaces.ts";
import { S3Client } from "./_lib/s3_client.ts";
import { S3Lock } from "./_lib/s3_lock.ts";
import { S3DatastoreVerifier } from "./_lib/s3_verifier.ts";
import { S3CacheSyncService } from "./_lib/s3_cache_sync.ts";

export type {
  DatastoreHealthResult,
  DatastoreProvider,
  DatastoreSyncService,
  DatastoreVerifier,
  DistributedLock,
  LockInfo,
  LockOptions,
  SyncCapabilities,
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
});

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
}

class S3DatastoreProviderImpl implements DatastoreProvider {
  private readonly config: S3DatastoreProviderConfig;

  constructor(config: S3DatastoreProviderConfig) {
    this.config = config;
  }

  createLock(_datastorePath: string, options?: LockOptions): DistributedLock {
    const s3 = new S3Client(this.config);
    return new S3Lock(s3, options);
  }

  createVerifier(): DatastoreVerifier {
    return new S3DatastoreVerifier(this.config);
  }

  createSyncService(
    _repoDir: string,
    cachePath: string,
  ): DatastoreSyncService {
    const s3 = new S3Client(this.config);
    return new S3CacheSyncService(s3, cachePath, {
      pullConcurrency: this.config.pullConcurrency,
      pushConcurrency: this.config.pushConcurrency,
    });
  }

  resolveDatastorePath(repoDir: string): string {
    // For S3, the "datastore path" is the local cache directory
    return join(repoDir, ".swamp");
  }

  resolveCachePath(_repoDir: string): string | undefined {
    // Let swamp core determine the cache path based on repoId.
    return undefined;
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
