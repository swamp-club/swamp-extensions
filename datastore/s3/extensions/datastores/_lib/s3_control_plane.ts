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
 * The datastore-wide control plane: records at `<prefix>/_control/<key>`,
 * whatever namespace a checkout syncs. Swamp reads the format marker
 * (`datastore-format`) here before a command opens the datastore, and the v3
 * writer lease keeps its records (`writer/`) here (swamp-club#3395).
 *
 * It binds no namespace and shares nothing with a sync service. Building it
 * makes no request, and each call is one request (plus retries of transient
 * failures) with no credentials preflight: every S3Client failure already
 * carries the credential hint the preflight would have given.
 */

import type { WritableDatastoreControlPlaneStore } from "./interfaces.ts";
import {
  confirmS3KeyMissing,
  type S3Client,
  s3NotFoundKind,
} from "./s3_client.ts";
import { retryWithBackoff } from "./s3_cache_sync.ts";

const CONTROL_PREFIX = "_control/";

export class S3DatastoreControlPlaneStore
  implements WritableDatastoreControlPlaneStore {
  constructor(private readonly s3: S3Client) {}

  async get(
    key: string,
    options?: { readonly signal?: AbortSignal },
  ): Promise<Uint8Array | null> {
    const signal = options?.signal;
    signal?.throwIfAborted();
    try {
      const { data } = await retryWithBackoff(
        () => this.s3.getObject(CONTROL_PREFIX + key, signal),
        { signal },
      );
      return data;
    } catch (error) {
      // Only a missing record is null. An abort, a 403, a 5xx or a missing
      // bucket rejects, so an unreadable record is never mistaken for an
      // absent one.
      const kind = signal?.aborted ? undefined : s3NotFoundKind(error);
      if (kind === undefined) throw error;
      if (kind === "ambiguous") {
        await confirmS3KeyMissing(this.s3, CONTROL_PREFIX + key, error, signal);
      }
      return null;
    }
  }

  async put(key: string, data: Uint8Array): Promise<void> {
    await retryWithBackoff(() => this.s3.putObject(CONTROL_PREFIX + key, data));
  }

  async putIfAbsent(key: string, data: Uint8Array): Promise<boolean> {
    let attempts = 0;
    const created = await retryWithBackoff(() => {
      attempts++;
      return this.s3.putObjectConditional(CONTROL_PREFIX + key, data);
    });
    return created || (attempts > 1 && await this.holds(key, data));
  }

  /**
   * After a retried create was refused: did the attempt whose response was
   * lost write it? A record holding exactly these bytes is this caller's own
   * create, so it is reported as won rather than leaving the caller waiting
   * out a lease it holds.
   */
  private async holds(key: string, data: Uint8Array): Promise<boolean> {
    const current = await this.get(key);
    return current !== null && current.length === data.length &&
      current.every((byte, i) => byte === data[i]);
  }

  async delete(key: string): Promise<void> {
    await retryWithBackoff(() => this.s3.deleteObject(CONTROL_PREFIX + key));
  }

  async list(prefix: string): Promise<string[]> {
    const entries = await retryWithBackoff(() =>
      this.s3.listAllObjects(CONTROL_PREFIX + prefix)
    );
    return entries.map((e) => e.key.slice(CONTROL_PREFIX.length));
  }
}
