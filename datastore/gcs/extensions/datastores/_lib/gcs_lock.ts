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
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { DistributedLock, LockInfo, LockOptions } from "./interfaces.ts";
import type { GcsClient } from "./gcs_client.ts";
import { Attr, getTracer } from "./tracing.ts";

const DEFAULT_TTL_MS = 30_000;
const DEFAULT_RETRY_INTERVAL_MS = 1_000;
const DEFAULT_MAX_WAIT_MS = 60_000;
const DEFAULT_MAX_RETRY_INTERVAL_MS = 8_000;
const DEFAULT_LOCK_KEY = ".datastore.lock";

/** Randomized sleep in [min, max) ms. */
function randomSleep(minMs: number, maxMs: number): Promise<void> {
  const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/** Thrown when a lock cannot be acquired within the configured timeout. */
export class LockTimeoutError extends Error {
  override readonly name = "LockTimeoutError";
  readonly code = "LOCK_TIMEOUT" as const;
  readonly retryable = true as const;

  constructor(
    public readonly lockKey: string,
    public readonly holder: LockInfo | null,
    public readonly waitedMs: number,
  ) {
    const holderCtx = holder?.context
      ? ` [${
        Object.entries(holder.context).map(([k, v]) => `${k}=${v}`).join(", ")
      }]`
      : "";
    const msg = holder
      ? `Lock "${lockKey}" held by ${holder.holder} (pid ${holder.pid})${holderCtx} — ` +
        `timed out after ${waitedMs}ms`
      : `Lock "${lockKey}" — timed out after ${waitedMs}ms`;
    super(msg);
  }
}

/** Build a LockInfo for the current process. */
function buildLockInfo(
  ttlMs: number,
  nonce: string,
  context?: Record<string, string>,
): LockInfo {
  const host = hostname();
  const user = Deno.env.get("USER") ?? Deno.env.get("USERNAME") ?? "unknown";
  const info: LockInfo = {
    holder: `${user}@${host}`,
    hostname: host,
    pid: Deno.pid,
    acquiredAt: new Date().toISOString(),
    ttlMs,
    nonce,
  };
  if (context) info.context = context;
  return info;
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
  private readonly maxRetryIntervalMs: number;
  private readonly maxWaitMs: number;
  private readonly holderContext: Record<string, string> | undefined;
  private heartbeatId: ReturnType<typeof setInterval> | undefined;
  private held = false;
  private releasing = false;
  private nonce: string | undefined;
  /** GCS generation of the lock object we currently hold. */
  private generation: string | undefined;

  constructor(gcs: GcsClient, options?: LockOptions) {
    this.gcs = gcs;
    const baseKey = options?.lockKey ?? DEFAULT_LOCK_KEY;
    this.lockKey = options?.namespace
      ? `${options.namespace}/${baseKey}`
      : baseKey;
    this.ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS;
    this.retryIntervalMs = options?.retryIntervalMs ??
      DEFAULT_RETRY_INTERVAL_MS;
    this.maxRetryIntervalMs = options?.maxRetryIntervalMs ??
      DEFAULT_MAX_RETRY_INTERVAL_MS;
    this.maxWaitMs = options?.maxWaitMs ?? DEFAULT_MAX_WAIT_MS;
    this.holderContext = options?.holderContext;
  }

  async acquire(): Promise<void> {
    return await getTracer().startActiveSpan(
      "gcs-datastore lock acquire",
      async (span) => {
        span.setAttributes({
          [Attr.LOCK_KEY]: this.lockKey,
          [Attr.LOCK_TIMEOUT_MS]: this.maxWaitMs,
          [Attr.LOCK_TTL_MS]: this.ttlMs,
        });
        const startTime = Date.now();
        this.releasing = false;
        const nonce = crypto.randomUUID();
        let contended = false;
        let attempt = 0;

        try {
          while (true) {
            const elapsed = Date.now() - startTime;
            if (elapsed >= this.maxWaitMs) {
              const existing = await this.readLock();
              const err = new LockTimeoutError(
                this.lockKey,
                existing,
                elapsed,
              );
              span.setStatus({
                code: SpanStatusCode.ERROR,
                message: err.message,
              });
              span.recordException(err);
              span.setAttribute(Attr.LOCK_CONTENDED, true);
              if (existing) {
                span.setAttribute(
                  Attr.LOCK_HOLDER,
                  `${existing.holder} (pid ${existing.pid})`,
                );
              }
              throw err;
            }

            const info = buildLockInfo(this.ttlMs, nonce, this.holderContext);
            const body = encodeLockInfo(info);

            const result = await this.gcs.putObjectConditional(
              this.lockKey,
              body,
            );
            if (result) {
              this.nonce = nonce;
              this.generation = result.generation;
              this.held = true;
              this.startHeartbeat();
              span.setAttributes({
                [Attr.LOCK_WAIT_DURATION_MS]: Date.now() - startTime,
                [Attr.LOCK_CONTENDED]: contended,
              });
              return;
            }

            contended = true;

            const existing = await this.readLock();
            if (existing) {
              const meta = await this.gcs.getMetadata(this.lockKey);
              if (meta.exists && meta.updated) {
                const lockAge = Date.now() - meta.updated.getTime();
                if (lockAge > existing.ttlMs) {
                  try {
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
                  await randomSleep(200, 500);
                  continue;
                }
              }
            }

            // Exponential backoff with jitter: sleep in [base, min(cap, base * 2^attempt))
            const cap = Math.min(
              this.maxRetryIntervalMs,
              this.retryIntervalMs * Math.pow(2, attempt),
            );
            await randomSleep(this.retryIntervalMs, cap + 1);
            attempt++;
          }
        } finally {
          span.end();
        }
      },
    );
  }

  async release(): Promise<void> {
    return await getTracer().startActiveSpan(
      "gcs-datastore lock release",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          this.releasing = true;
          this.stopHeartbeat();

          if (!this.held) return;
          this.held = false;
          const gen = this.generation;
          this.nonce = undefined;
          this.generation = undefined;

          try {
            if (gen) {
              await this.gcs.deleteObject(this.lockKey, {
                ifGenerationMatch: gen,
              });
            } else {
              await this.gcs.deleteObject(this.lockKey);
            }
          } catch (error) {
            console.warn(
              `Failed to delete lock ${this.lockKey} during release: ${
                error instanceof Error ? error.message : String(error)
              }`,
            );
          }
        } finally {
          span.end();
        }
      },
    );
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return await getTracer().startActiveSpan(
      "gcs-datastore lock withLock",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          await this.acquire();
          try {
            return await fn();
          } finally {
            await this.release();
          }
        } finally {
          span.end();
        }
      },
    );
  }

  async inspect(): Promise<LockInfo | null> {
    return await getTracer().startActiveSpan(
      "gcs-datastore lock inspect",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          return await this.readLock();
        } finally {
          span.end();
        }
      },
    );
  }

  async forceRelease(expectedNonce: string): Promise<boolean> {
    return await getTracer().startActiveSpan(
      "gcs-datastore lock forceRelease",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
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
        } finally {
          span.end();
        }
      },
    );
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

    const info = buildLockInfo(this.ttlMs, this.nonce, this.holderContext);
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
