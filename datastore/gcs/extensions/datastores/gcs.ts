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
 * Swamp datastore backend that stores repository state in Google Cloud Storage.
 *
 * Provides distributed locking via GCS generation-based preconditions and
 * bidirectional sync between a local cache directory and a GCS bucket. Use
 * this entrypoint when a swamp deployment should share state between multiple
 * processes or machines through GCS rather than a local directory.
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
import { GcsClient } from "./_lib/gcs_client.ts";
import { GcsLock } from "./_lib/gcs_lock.ts";
import { GcsDatastoreVerifier } from "./_lib/gcs_verifier.ts";
import { GcsCacheSyncService } from "./_lib/gcs_cache_sync.ts";

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
});

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
}

class GcsDatastoreProviderImpl implements DatastoreProvider {
  private readonly config: GcsDatastoreProviderConfig;

  constructor(config: GcsDatastoreProviderConfig) {
    this.config = config;
  }

  createLock(_datastorePath: string, options?: LockOptions): DistributedLock {
    const gcs = new GcsClient(this.config);
    return new GcsLock(gcs, options);
  }

  createVerifier(): DatastoreVerifier {
    return new GcsDatastoreVerifier(this.config);
  }

  createSyncService(
    _repoDir: string,
    cachePath: string,
  ): DatastoreSyncService {
    const gcs = new GcsClient(this.config);
    return new GcsCacheSyncService(gcs, cachePath, {
      pullConcurrency: this.config.pullConcurrency,
      pushConcurrency: this.config.pushConcurrency,
    });
  }

  resolveDatastorePath(repoDir: string): string {
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
