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
import {
  type GcsClient,
  GcsOperationError,
  NotFoundError,
} from "./gcs_client.ts";
import { Attr, getTracer } from "./tracing.ts";

const DEFAULT_TTL_MS = 30_000;
const DEFAULT_RETRY_INTERVAL_MS = 1_000;
const DEFAULT_MAX_WAIT_MS = 60_000;
const DEFAULT_MAX_RETRY_INTERVAL_MS = 8_000;
const DEFAULT_LOCK_KEY = ".datastore.lock";
/**
 * How far ahead of the TTL a holder concedes, at most. Absorbs a late timer
 * on a busy event loop; the deadline itself is already conservative because
 * it is measured from when a write was sent, not when it was answered.
 */
const MAX_CONCEDE_MARGIN_MS = 1_000;

/** Randomized sleep in [min, max) ms. */
function randomSleep(minMs: number, maxMs: number): Promise<void> {
  const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * True when GCS said the object is not there, as opposed to failing to tell
 * us anything about it.
 *
 * A 403, a 5xx or a dropped connection is not evidence the lock is gone, and
 * a holder that read it that way would abandon a lock it still holds. The
 * only answer that settles ownership is a read that comes back and says the
 * object is absent. Matches on status as well as type in case a 404 reaches
 * us without being narrowed to `NotFoundError`.
 */
function isAbsent(error: unknown): boolean {
  return error instanceof NotFoundError ||
    (error instanceof GcsOperationError && error.httpStatusCode === 404);
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
 * Heartbeat uses `putObjectCas(generation)` for compare-and-swap; a mismatch
 * is settled by reading the lock's nonce, not taken as loss on its own.
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
  /** Ends the hold at its deadline even if no heartbeat tick comes back. */
  private deadlineId: ReturnType<typeof setTimeout> | undefined;
  private held = false;
  private releasing = false;
  private nonce: string | undefined;
  /** GCS generation of the lock object we currently hold. */
  private generation: string | undefined;
  /** Ticks in a row that could not settle ownership; 0 while healthy. */
  private unconfirmedExtends = 0;
  /**
   * When the last confirmed write of the lock body was *sent*. GCS stamps the
   * object's `updated` time when the write commits, which is never earlier,
   * so a deadline measured from here expires no later than the one every
   * contender applies — stamping on the answer instead would let a slow
   * response push our hold past the point where the lock may be stolen.
   */
  private lastConfirmedAt = 0;
  /**
   * When the earliest write whose outcome we never learned was sent, since
   * the last confirmation. If one of them turns out to have landed, the
   * object's `updated` time is no earlier than this.
   */
  private unansweredSince: number | undefined;
  /**
   * Nonce of the acquisition whose extend is in flight, if any. Keyed rather
   * than a bare flag because this instance is reusable: a request parked
   * across a release/re-acquire would otherwise leave the guard set for a
   * hold that no longer exists.
   */
  private extendingFor: string | undefined;

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
              // Best-effort: this read only enriches the error message, so a
              // failure here must not replace LockTimeoutError with a GCS one.
              const existing = await this.readLockOrNull();
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

            const sentAt = Date.now();
            const result = await this.gcs.putObjectConditional(
              this.lockKey,
              body,
            );
            if (result) {
              this.nonce = nonce;
              this.generation = result.generation;
              this.held = true;
              this.startHeartbeat();
              this.confirm(sentAt);
              span.setAttributes({
                [Attr.LOCK_WAIT_DURATION_MS]: Date.now() - startTime,
                [Attr.LOCK_CONTENDED]: contended,
              });
              return;
            }

            contended = true;

            // A failed read here only skips this round's staleness check;
            // the next attempt repeats it.
            const existing = await this.readLockOrNull();
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

          const wasHeld = this.held;
          const gen = this.generation;
          this.held = false;
          this.nonce = undefined;
          this.generation = undefined;

          // A hold that was given up still leaves our last write behind if
          // nobody has taken over, and every contender would wait out its TTL.
          // Deleting it fenced on our own generation is safe: the delete only
          // matches the version we wrote, never a successor's.
          if (!wasHeld) {
            if (!gen) return;
            try {
              await this.gcs.deleteObject(this.lockKey, {
                ifGenerationMatch: gen,
              });
            } catch {
              // Already replaced or gone — nothing of ours to clean up.
            }
            return;
          }

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
   * Extends the lock with a compare-and-swap write on the generation.
   *
   * Three outcomes, and the whole of #2298 is in the difference between the
   * second and the third:
   *
   * - **Conclusive loss** — the lock is absent, or carries someone else's
   *   nonce. Ownership is gone; stop, and say so loudly.
   * - **Inconclusive** — the write threw, or the CAS missed and the lock
   *   could not be read back to say why. We have learned nothing about
   *   ownership, so hold on to the lock and let the next tick ask again —
   *   but only until `ttlMs` has passed with nothing confirmed, after which
   *   every contender is entitled to steal the object and the hold is a
   *   fiction.
   * - **Healthy** — extended.
   *
   * A CAS miss alone is not loss: a write that landed but whose response was
   * dropped leaves us fencing on a generation we ourselves replaced. Only the
   * nonce on the object can tell that apart from a steal.
   */
  private async extend(): Promise<void> {
    // Every check below is about the hold this tick started under, so that
    // hold's nonce travels with it. Without that, a request still parked
    // from a previous acquisition blocks and then judges the current one.
    const nonce = this.nonce;
    const generation = this.generation;
    if (!this.held || !nonce || !generation || this.releasing) return;

    // A tick that overlaps a slow one tells us nothing new and piles another
    // request onto a struggling endpoint. A request that stalls rather than
    // fails never comes back to deliver a verdict, so judge this one on the
    // clock instead.
    if (this.extendingFor === nonce) {
      this.giveUpIfExpired("the heartbeat could not confirm the lock");
      return;
    }
    this.extendingFor = nonce;
    try {
      const info = buildLockInfo(this.ttlMs, nonce, this.holderContext);
      const body = encodeLockInfo(info);

      const sentAt = Date.now();
      let result: { generation: string } | null;
      try {
        result = await this.gcs.putObjectCas(this.lockKey, body, generation);
      } catch (error) {
        // The write may well have landed before the connection dropped, so
        // this is exactly as inconclusive as a failed read.
        // Only this hold's writes count: a tick parked from a previous hold
        // must not move the current hold's deadline.
        if (this.holdIsOver(nonce)) return;
        this.unansweredSince ??= sentAt;
        this.noteUnconfirmed("could not confirm the extend was applied", error);
        return;
      }

      if (result) {
        // The hold ended while this write was in flight, so the write does
        // not restore it — but it did refresh the object, and left alone it
        // would make every contender wait out another TTL. Delete it, fenced
        // on the generation this write just created: that version is ours by
        // construction, so the delete can never remove a successor's lock.
        if (this.holdIsOver(nonce)) {
          try {
            await this.gcs.deleteObject(this.lockKey, {
              ifGenerationMatch: result.generation,
            });
          } catch {
            // Best-effort cleanup
          }
          return;
        }
        this.generation = result.generation;
        this.confirm(sentAt);
        return;
      }

      // Generation mismatch. Read the lock to learn whether it changed hands
      // or whether we are fencing on a generation our own write replaced.
      let current: { info: LockInfo; generation: string | undefined } | null;
      try {
        current = await this.readLockWithGeneration();
      } catch (error) {
        if (this.holdIsOver(nonce)) return;
        this.noteUnconfirmed("could not confirm the lock is still ours", error);
        return;
      }

      // Re-check before judging ownership: release() may have run while we
      // were reading, and a normal shutdown must not be reported as a
      // hostile takeover.
      if (this.holdIsOver(nonce)) return;

      if (!current || current.info.nonce !== nonce) {
        this.loseLock("another holder took it");
        return;
      }

      // Still ours, under a generation we did not fence on: one of the writes
      // whose response never arrived landed. Fence on what is actually there.
      // Which write it was is unknown, but none was sent before
      // `unansweredSince`, so the object is at least that fresh. Without a
      // generation there is nothing safe to fence on, so leave the tracked
      // one alone and let the deadline decide.
      if (
        current.generation !== undefined &&
        this.unansweredSince !== undefined
      ) {
        this.generation = current.generation;
        this.confirm(this.unansweredSince);
        return;
      }
      this.noteUnconfirmed("could not confirm the extend was applied");
    } finally {
      // Not if a later acquisition has taken the slot over — this tick is
      // then the stale one, and clearing would unguard the live hold.
      if (this.extendingFor === nonce) this.extendingFor = undefined;
    }
  }

  /**
   * Records a tick that could not settle ownership. Warns on the first of a
   * run so an outage is visible, then stays quiet until it clears — this
   * fires every ttlMs/3 for as long as the endpoint is unreachable.
   */
  private noteUnconfirmed(what: string, error?: unknown): void {
    this.unconfirmedExtends++;
    const because = error instanceof Error ? ` (${error.message})` : "";

    if (this.giveUpIfExpired(`${what}${because}`)) return;

    if (this.unconfirmedExtends > 1) return;
    console.warn(
      `Lock ${this.lockKey}: ${what}${because}; keeping it and retrying on ` +
        `the next heartbeat`,
    );
  }

  /**
   * Records a write that is known to have landed, sent at `sentAt`, and
   * re-arms the deadline from it.
   */
  private confirm(sentAt: number): void {
    this.unconfirmedExtends = 0;
    this.unansweredSince = undefined;
    this.lastConfirmedAt = sentAt;
    this.armDeadline();
  }

  /**
   * When the hold must end if nothing more is confirmed. Contenders may steal
   * once the object's `updated` time is ttlMs old; ours is measured from when
   * the write was sent, which is never later, less a small margin for a late
   * timer.
   */
  private holdDeadline(): number {
    const margin = Math.min(
      MAX_CONCEDE_MARGIN_MS,
      Math.floor(this.ttlMs / 10),
    );
    return this.lastConfirmedAt + this.ttlMs - margin;
  }

  /**
   * Ends the hold at its deadline on a timer of its own. The heartbeat only
   * looks every ttlMs/3, and a tick parked on a slow request may not look at
   * all, so waiting for one could leave us holding after a steal is legal.
   */
  private armDeadline(): void {
    if (this.deadlineId !== undefined) clearTimeout(this.deadlineId);
    const nonce = this.nonce;
    this.deadlineId = setTimeout(() => {
      this.deadlineId = undefined;
      if (!nonce || this.holdIsOver(nonce)) return;
      // A timer can fire a hair early, or the wall clock can step back;
      // either way the deadline still stands, so look again at it.
      if (!this.giveUpIfExpired("could not confirm the lock")) {
        this.armDeadline();
      }
    }, Math.max(0, this.holdDeadline() - Date.now()));
  }

  /**
   * Ends the hold once its deadline has passed with nothing confirmed, and
   * reports whether it did. Past it, every contender's staleness check
   * entitles it to delete the object and take over, so holding on longer
   * would be wishful thinking.
   */
  private giveUpIfExpired(what: string): boolean {
    if (Date.now() < this.holdDeadline()) return false;
    this.loseLock(
      `${what} for longer than the ${this.ttlMs}ms TTL, so it is now ` +
        `stealable by any other process`,
    );
    return true;
  }

  /**
   * True once nothing the in-flight request of the hold `nonce` comes back
   * with can change anything: release() has taken over, the hold was already
   * given up, or a later acquisition owns the lock now.
   */
  private holdIsOver(nonce: string): boolean {
    return this.releasing || !this.held || this.nonce !== nonce;
  }

  /** Ownership is provably gone: stop heartbeating and make it visible. */
  private loseLock(why: string): void {
    this.held = false;
    this.stopHeartbeat();
    console.warn(
      `Lock ${this.lockKey} was lost while the operation was still running: ` +
        `${why}. Another process may now be running the same work ` +
        `concurrently.`,
    );
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
    if (this.deadlineId !== undefined) {
      clearTimeout(this.deadlineId);
      this.deadlineId = undefined;
    }
  }

  /**
   * Reads the lock, with its generation for fencing a subsequent write.
   *
   * Returns null only when GCS reports the object absent. Every other failure
   * throws: a caller that cannot read the lock has learned nothing, and
   * flattening that into "no lock here" is exactly the bug in #2298.
   */
  private async readLockWithGeneration(): Promise<
    { info: LockInfo; generation: string | undefined } | null
  > {
    try {
      const { data, generation } = await this.gcs.getObject(this.lockKey);
      return { info: decodeLockInfo(data), generation };
    } catch (error) {
      if (isAbsent(error)) return null;
      throw error;
    }
  }

  private async readLock(): Promise<LockInfo | null> {
    const result = await this.readLockWithGeneration();
    return result?.info ?? null;
  }

  /**
   * `readLock()` for the two spots in `acquire()` where a read failure is
   * not worth failing over: one only decorates a timeout message, the other
   * is a staleness check that the next attempt will repeat anyway.
   */
  private async readLockOrNull(): Promise<LockInfo | null> {
    try {
      return await this.readLock();
    } catch {
      return null;
    }
  }
}
