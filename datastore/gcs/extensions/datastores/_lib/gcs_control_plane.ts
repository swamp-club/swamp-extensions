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
 * failures, and one listing to tell a missing record from a missing bucket)
 * with no credentials preflight: every GcsClient failure already carries the
 * credential hint the preflight would have given.
 */

import type { WritableDatastoreControlPlaneStore } from "./interfaces.ts";
import {
  confirmGcsKeyMissing,
  type GcsClient,
  NotFoundError,
} from "./gcs_client.ts";
import { retryWithBackoff } from "./gcs_cache_sync.ts";

const CONTROL_PREFIX = "_control/";

export class GcsDatastoreControlPlaneStore
  implements WritableDatastoreControlPlaneStore {
  constructor(private readonly gcs: GcsClient) {}

  async get(
    key: string,
    options?: { readonly signal?: AbortSignal },
  ): Promise<Uint8Array | null> {
    const signal = options?.signal;
    signal?.throwIfAborted();
    try {
      const { data } = await retryWithBackoff(
        () => this.gcs.getObject(CONTROL_PREFIX + key, signal),
        { signal },
      );
      return data;
    } catch (error) {
      // Only a missing record is null. An abort, a 403, a 5xx or a missing
      // bucket rejects, so an unreadable record is never mistaken for an
      // absent one.
      if (signal?.aborted || !(error instanceof NotFoundError)) throw error;
      await confirmGcsKeyMissing(this.gcs, CONTROL_PREFIX + key, error, signal);
      return null;
    }
  }

  async put(key: string, data: Uint8Array): Promise<void> {
    await retryWithBackoff(() =>
      this.gcs.putObject(CONTROL_PREFIX + key, data)
    );
  }

  async putIfAbsent(key: string, data: Uint8Array): Promise<boolean> {
    let attempts = 0;
    const written = await retryWithBackoff(() => {
      attempts++;
      return this.gcs.putObjectConditional(CONTROL_PREFIX + key, data);
    });
    return written !== null || (attempts > 1 && await this.holds(key, data));
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
    await retryWithBackoff(() => this.gcs.deleteObject(CONTROL_PREFIX + key));
  }

  async list(prefix: string): Promise<string[]> {
    const entries = await retryWithBackoff(() =>
      this.gcs.listAllObjects(CONTROL_PREFIX + prefix)
    );
    return entries.map((e) => e.key.slice(CONTROL_PREFIX.length));
  }
}
