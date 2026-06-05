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
 * GCS-backed distributed lock using generation-based preconditions.
 *
 * Uses GCS `ifGenerationMatch=0` for atomic lock creation (generation 0
 * means "only if no live version exists"). Heartbeat extends the lock
 * via compare-and-swap writes using the tracked generation number,
 * ensuring we never accidentally extend a lock that was stolen.
 */

import { hostname } from "node:os";
import type { DistributedLock, LockInfo, LockOptions } from "./interfaces.ts";
import type { GcsClient } from "./gcs_client.ts";

const DEFAULT_TTL_MS = 30_000;
const DEFAULT_RETRY_INTERVAL_MS = 1_000;
const DEFAULT_MAX_WAIT_MS = 60_000;
const DEFAULT_LOCK_KEY = ".datastore.lock";

/** Thrown when a lock cannot be acquired within the configured timeout. */
export class LockTimeoutError extends Error {
  override readonly name = "LockTimeoutError";

  constructor(
    public readonly lockKey: string,
    public readonly holder: LockInfo | null,
    public readonly waitedMs: number,
  ) {
    const msg = holder
      ? `Lock "${lockKey}" held by ${holder.holder} (pid ${holder.pid}) — ` +
        `timed out after ${waitedMs}ms`
      : `Lock "${lockKey}" — timed out after ${waitedMs}ms`;
    super(msg);
  }
}

/** Build a LockInfo for the current process. */
function buildLockInfo(ttlMs: number, nonce: string): LockInfo {
  const host = hostname();
  const user = Deno.env.get("USER") ?? Deno.env.get("USERNAME") ?? "unknown";
  return {
    holder: `${user}@${host}`,
    hostname: host,
    pid: Deno.pid,
    acquiredAt: new Date().toISOString(),
    ttlMs,
    nonce,
  };
}

/** Encode LockInfo as a UTF-8 Uint8Array. */
function encodeLockInfo(info: LockInfo): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(info, null, 2));
}

/** Decode a Uint8Array into LockInfo. */
function decodeLockInfo(data: Uint8Array): LockInfo {
  return JSON.parse(new TextDecoder().decode(data)) as LockInfo;
}

/**
 * GCS-backed distributed lock.
 *
 * Acquire uses `ifGenerationMatch=0` (create-only precondition).
 * Heartbeat uses `putObjectCas(generation)` for true compare-and-swap.
 * Staleness detection: if the lock object's `updated` + ttlMs < now,
 * it's stale and will be cleaned up before retrying.
 */
export class GcsLock implements DistributedLock {
  private readonly gcs: GcsClient;
  private readonly lockKey: string;
  private readonly ttlMs: number;
  private readonly retryIntervalMs: number;
  private readonly maxWaitMs: number;
  private heartbeatId: ReturnType<typeof setInterval> | undefined;
  private held = false;
  private releasing = false;
  private nonce: string | undefined;
  /** GCS generation of the lock object we currently hold. */
  private generation: string | undefined;

  constructor(gcs: GcsClient, options?: LockOptions) {
    this.gcs = gcs;
    this.lockKey = options?.lockKey ?? DEFAULT_LOCK_KEY;
    this.ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS;
    this.retryIntervalMs = options?.retryIntervalMs ??
      DEFAULT_RETRY_INTERVAL_MS;
    this.maxWaitMs = options?.maxWaitMs ?? DEFAULT_MAX_WAIT_MS;
  }

  async acquire(): Promise<void> {
    const startTime = Date.now();
    this.releasing = false;
    const nonce = crypto.randomUUID();

    while (true) {
      const elapsed = Date.now() - startTime;
      if (elapsed >= this.maxWaitMs) {
        const existing = await this.readLock();
        throw new LockTimeoutError(this.lockKey, existing, elapsed);
      }

      const info = buildLockInfo(this.ttlMs, nonce);
      const body = encodeLockInfo(info);

      // Attempt conditional create — ifGenerationMatch=0
      const result = await this.gcs.putObjectConditional(this.lockKey, body);
      if (result) {
        this.nonce = nonce;
        this.generation = result.generation;
        this.held = true;
        this.startHeartbeat();
        return;
      }

      // Lock exists — check if stale
      const existing = await this.readLock();
      if (existing) {
        const meta = await this.gcs.getMetadata(this.lockKey);
        if (meta.exists && meta.updated) {
          const lockAge = Date.now() - meta.updated.getTime();
          if (lockAge > existing.ttlMs) {
            try {
              // Delete the stale lock — use generation to avoid racing
              // with another process that's also cleaning up
              if (meta.generation) {
                await this.gcs.deleteObject(this.lockKey, {
                  ifGenerationMatch: meta.generation,
                });
              } else {
                await this.gcs.deleteObject(this.lockKey);
              }
            } catch {
              // Another process may have already cleaned it up
            }
            // DEF-3B (ref lab/166): jittered sleep after every steal
            // attempt — success AND failure paths — to avoid
            // tight-looping against the real holder's heartbeat when
            // two contenders race to reclaim a stale lock. 200-500ms
            // matches the S3 #102 range. Applies regardless of the
            // conditional-delete outcome: if we lost the CAS, a
            // successor already stole, and we still want to back off
            // before the next acquire attempt.
            await new Promise((resolve) =>
              setTimeout(resolve, 200 + Math.floor(Math.random() * 300))
            );
            continue;
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, this.retryIntervalMs));
    }
  }

  async release(): Promise<void> {
    this.releasing = true;
    this.stopHeartbeat();

    if (!this.held) return;
    this.held = false;
    const gen = this.generation;
    this.nonce = undefined;
    this.generation = undefined;

    try {
      // Conditional delete — only delete if we still own it (same generation).
      //
      // DEF-4 parity (ref lab/166): this is the structural equivalent of
      // s3-datastore #102's nonce-GET-then-DELETE release pattern. GCS
      // exposes a first-class conditional DELETE via `ifGenerationMatch`,
      // so we can fuse the "check we still own it" and "delete" into one
      // atomic call. S3 had no cheap conditional DELETE across AWS and
      // DO Spaces, so #102 took the portable nonce-GET path. The
      // invariant both defend is the same: a successor that legitimately
      // stole our lock (TTL expiry + new acquire) must not have its
      // lock deleted by our stale release.
      if (gen) {
        await this.gcs.deleteObject(this.lockKey, {
          ifGenerationMatch: gen,
        });
      } else {
        await this.gcs.deleteObject(this.lockKey);
      }
    } catch (error) {
      // Best-effort release — lock will expire via TTL
      console.warn(
        `Failed to delete lock ${this.lockKey} during release: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      await this.release();
    }
  }

  async inspect(): Promise<LockInfo | null> {
    return await this.readLock();
  }

  async forceRelease(expectedNonce: string): Promise<boolean> {
    const result = await this.readLockWithGeneration();
    if (!result || result.info.nonce !== expectedNonce) {
      return false;
    }
    try {
      await this.gcs.deleteObject(
        this.lockKey,
        result.generation
          ? { ifGenerationMatch: result.generation }
          : undefined,
      );
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Extends the lock using compare-and-swap on the generation.
   *
   * This is stronger than the S3 approach: instead of blindly overwriting,
   * we use ifGenerationMatch to guarantee we still own the lock. If another
   * process acquired it (different generation), the CAS fails and we stop.
   */
  private async extend(): Promise<void> {
    if (!this.held || !this.nonce || !this.generation || this.releasing) return;

    const info = buildLockInfo(this.ttlMs, this.nonce);
    const body = encodeLockInfo(info);

    // CAS write — only succeeds if generation hasn't changed
    const result = await this.gcs.putObjectCas(
      this.lockKey,
      body,
      this.generation,
    );

    if (result) {
      // Update our tracked generation
      this.generation = result.generation;
    } else {
      // Generation mismatch — we lost the lock
      this.held = false;
      this.stopHeartbeat();
    }

    // If release() was called while the write was in flight,
    // clean up the lock we just wrote so we don't orphan it.
    if (this.releasing && result) {
      try {
        await this.gcs.deleteObject(this.lockKey, {
          ifGenerationMatch: result.generation,
        });
      } catch {
        // Best-effort cleanup
      }
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    const intervalMs = Math.floor(this.ttlMs / 3);
    this.heartbeatId = setInterval(() => {
      this.extend().catch(() => {
        // Heartbeat failure is non-fatal — lock will expire via TTL
      });
    }, intervalMs);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatId !== undefined) {
      clearInterval(this.heartbeatId);
      this.heartbeatId = undefined;
    }
  }

  private async readLockWithGeneration(): Promise<
    { info: LockInfo; generation: string | undefined } | null
  > {
    try {
      const { data, generation } = await this.gcs.getObject(this.lockKey);
      return { info: decodeLockInfo(data), generation };
    } catch {
      return null;
    }
  }

  private async readLock(): Promise<LockInfo | null> {
    const result = await this.readLockWithGeneration();
    return result?.info ?? null;
  }
}
