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
 * S3-backed distributed lock using conditional writes.
 *
 * Uses S3 `PutObject` with `If-None-Match: *` (conditional write) for atomic
 * lock acquisition. Includes a self-contained heartbeat that extends the lock
 * periodically while held.
 */

import { hostname } from "node:os";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { DistributedLock, LockInfo, LockOptions } from "./interfaces.ts";
import { isIfMatchUnsupported, S3OperationError } from "./s3_client.ts";
import type { S3Client } from "./s3_client.ts";
import { Attr, getTracer } from "./tracing.ts";

const DEFAULT_TTL_MS = 30_000;
const DEFAULT_RETRY_INTERVAL_MS = 1_000;
const DEFAULT_MAX_WAIT_MS = 60_000;
const DEFAULT_MAX_RETRY_INTERVAL_MS = 8_000;
const DEFAULT_LOCK_KEY = ".datastore.lock";

/**
 * Minimum and maximum sleep applied after a stale-lock steal attempt.
 * Randomized in [MIN, MAX) to break tight retry loops when multiple
 * processes race to steal a stale lock. Must always run (regardless of
 * whether the delete succeeded) so we don't re-read the lock inside the
 * same ms window as the real holder's next heartbeat — see the
 * TOCTOU discussion above `acquire()`.
 */
const STALE_STEAL_BACKOFF_MIN_MS = 200;
const STALE_STEAL_BACKOFF_MAX_MS = 500;

/** Randomized sleep in [min, max) ms used after stale-lock steal attempts. */
function randomSleep(minMs: number, maxMs: number): Promise<void> {
  const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * True when S3 said the object is not there, as opposed to failing to tell
 * us anything about it.
 *
 * This is deliberately not `isRetryableError` from the cache sync, which
 * answers a different question. The axes part company at a 403: that is not
 * worth retrying, but it is also not evidence the lock is gone, and the
 * holder must keep it. The only answer that settles ownership is a read that
 * comes back and says the object is absent.
 *
 * Matches on status as well as name because a non-XML error body leaves the
 * SDK's deserializer unable to parse the code.
 */
function isAbsent(error: unknown): boolean {
  if (!(error instanceof S3OperationError)) return false;
  return error.name === "NotFound" || error.name === "NoSuchKey" ||
    error.httpStatusCode === 404;
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
 * S3-backed distributed lock.
 *
 * Acquire uses conditional writes (`If-None-Match: *`).
 * Heartbeat runs as a background interval, extending the lock every ttlMs/3.
 * Staleness detection: if a lock's S3 LastModified + ttlMs < now, it's stale
 * and will be force-acquired.
 */
export class S3Lock implements DistributedLock {
  private readonly s3: S3Client;
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
  /** Ticks in a row that could not settle ownership; 0 while healthy. */
  private unconfirmedExtends = 0;
  /**
   * When the lock body was last provably written. This is the same clock
   * every contender reads off the object's `LastModified`, so it is what
   * decides when holding on stops being defensible.
   */
  private lastConfirmedAt = 0;
  /**
   * Nonce of the acquisition whose extend is in flight, if any. Keyed rather
   * than a bare flag because this instance is reusable: a request parked
   * across a release/re-acquire would otherwise leave the guard set for a
   * hold that no longer exists.
   */
  private extendingFor: string | undefined;
  /** Set once an endpoint rejects If-Match, to stop retrying it. */
  private casUnsupported = false;

  constructor(s3: S3Client, options?: LockOptions) {
    this.s3 = s3;
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
      "s3-datastore lock acquire",
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
            // Check timeout on every iteration — including retries after stale lock cleanup
            const elapsed = Date.now() - startTime;
            if (elapsed >= this.maxWaitMs) {
              // Best-effort: this read only enriches the error message, so a
              // failure here must not replace LockTimeoutError with an S3 one.
              const existing = await this.readLockOrNull();
              span.setAttribute(Attr.LOCK_CONTENDED, true);
              if (existing) {
                span.setAttribute(
                  Attr.LOCK_HOLDER,
                  `${existing.holder} (pid ${existing.pid})`,
                );
              }
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
              throw err;
            }

            const info = buildLockInfo(this.ttlMs, nonce, this.holderContext);
            const body = encodeLockInfo(info);

            // Attempt conditional write — atomic create
            const created = await this.s3.putObjectConditional(
              this.lockKey,
              body,
            );
            if (created) {
              this.nonce = nonce;
              this.held = true;
              this.lastConfirmedAt = Date.now();
              this.unconfirmedExtends = 0;
              this.startHeartbeat();
              span.setAttributes({
                [Attr.LOCK_WAIT_DURATION_MS]: Date.now() - startTime,
                [Attr.LOCK_CONTENDED]: contended,
              });
              return;
            }

            contended = true;

            // Lock exists — check if stale. A read failure here means this
            // attempt learned nothing, not that acquisition should fail:
            // back off and try again like any other contended round.
            const existing = await this.readLockOrNull();
            if (existing) {
              const head = await this.s3.headObject(this.lockKey);
              if (head.exists && head.lastModified) {
                const lockAge = Date.now() - head.lastModified.getTime();
                if (lockAge > existing.ttlMs) {
                  try {
                    await this.s3.deleteObject(this.lockKey);
                  } catch {
                    // Another process may have already cleaned it up
                  }
                  // Backoff before the next iteration regardless of delete
                  // outcome. Without this, a tight head/delete loop can
                  // livelock against the real holder's heartbeat: every
                  // iteration reads a fresh lock, sees it stale, deletes,
                  // the heartbeat writes it back, repeat. Jittered sleep
                  // also spreads multiple stealing processes apart so they
                  // don't hammer the same key in lockstep.
                  await randomSleep(
                    STALE_STEAL_BACKOFF_MIN_MS,
                    STALE_STEAL_BACKOFF_MAX_MS,
                  );
                  continue; // Retry conditional write (timeout checked at top of loop)
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
      "s3-datastore lock release",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          // Set releasing flag BEFORE stopping heartbeat so any in-flight
          // extend() sees it and skips writing — prevents orphaned lock files.
          this.releasing = true;
          this.stopHeartbeat();

          if (!this.held) return;
          this.held = false;
          const ourNonce = this.nonce;
          this.nonce = undefined;

          // Re-verify ownership via the lock body's nonce before deleting.
          // Without this, a process whose heartbeat stalled (GC pause, network
          // blip) long enough for another process to legitimately steal the
          // stale lock will, on resume, delete the successor's live lock —
          // orphaning work. The heartbeat's own fencing at extend() covers
          // cases where a heartbeat tick runs between the steal and release;
          // this guard covers the window from "last successful heartbeat" to
          // "release() call" where no heartbeat tick fires.
          //
          // Portable across AWS and DO Spaces — no conditional DELETE needed.
          // Residual TOCTOU window (readLock → deleteObject, tens of ms) is
          // two orders of magnitude narrower than the full heartbeat interval.
          try {
            const current = await this.readLock();
            if (!current || current.nonce !== ourNonce) {
              console.warn(
                `Lock ${this.lockKey} was taken over during hold; skipping delete to avoid orphaning the successor's work`,
              );
              return;
            }
            await this.s3.deleteObject(this.lockKey);
          } catch (error) {
            // A failed read cannot tell "still ours" from "stolen", so we
            // leave the object alone either way — deleting blind would take
            // out a successor's live lock. The cost is that our own lock
            // lingers until its TTL, which is the safe direction to err in.
            const msg = error instanceof Error ? error.message : String(error);
            console.warn(
              isAbsent(error)
                ? `Failed to delete lock ${this.lockKey} during release: ${msg}`
                : `Lock ${this.lockKey}: could not verify ownership during ` +
                  `release (${msg}); leaving it to expire via TTL`,
            );
          }
        } catch (error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error instanceof Error ? error.message : String(error),
          });
          span.recordException(
            error instanceof Error ? error : new Error(String(error)),
          );
          throw error;
        } finally {
          span.end();
        }
      },
    );
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    return await getTracer().startActiveSpan(
      "s3-datastore lock withLock",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          await this.acquire();
          try {
            return await fn();
          } finally {
            await this.release();
          }
        } catch (error) {
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error instanceof Error ? error.message : String(error),
          });
          span.recordException(
            error instanceof Error ? error : new Error(String(error)),
          );
          throw error;
        } finally {
          span.end();
        }
      },
    );
  }

  async inspect(): Promise<LockInfo | null> {
    return await getTracer().startActiveSpan(
      "s3-datastore lock inspect",
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
      "s3-datastore lock forceRelease",
      async (span) => {
        span.setAttribute(Attr.LOCK_KEY, this.lockKey);
        try {
          const current = await this.readLock();
          if (!current || current.nonce !== expectedNonce) {
            return false;
          }
          await this.s3.deleteObject(this.lockKey);
          return true;
        } finally {
          span.end();
        }
      },
    );
  }

  /**
   * One heartbeat tick: prove we still hold the lock, then push its TTL out.
   *
   * Three outcomes, and the whole of #2298 is in the difference between the
   * second and the third:
   *
   * - **Conclusive loss** — the lock is absent, or carries someone else's
   *   nonce. Ownership is gone; stop, and say so loudly.
   * - **Inconclusive** — the read failed, the write threw, or the fenced
   *   write could not be confirmed. We have learned nothing about ownership,
   *   so hold on to the lock and let the next tick ask again — but only
   *   until `ttlMs` has passed with nothing confirmed, after which every
   *   contender is entitled to steal the object and the hold is a fiction.
   * - **Healthy** — extended.
   *
   * Treating the inconclusive case as loss is what let a single dropped
   * connection silently abandon a lock while its method kept running.
   */
  private async extend(): Promise<void> {
    // Every check below is about the hold this tick started under, so that
    // hold's nonce travels with it. Without that, a request still parked
    // from a previous acquisition blocks and then judges the current one.
    const nonce = this.nonce;
    if (!this.held || !nonce || this.releasing) return;

    // A tick that overlaps a slow one tells us nothing new and piles another
    // request onto a struggling endpoint. `finally` clears this: wedged set
    // by a throw, it would disable the heartbeat for the rest of the run.
    if (this.extendingFor === nonce) {
      // Nothing else is going to notice. Every other verdict here is reached
      // by a request coming back, and a request that stalls rather than
      // fails never comes back — the client's default 30s request timeout is
      // the whole of the default 30s TTL, so one parked read can swallow
      // every tick of the hold. Judge this one on the clock instead.
      this.giveUpIfExpired("the heartbeat could not confirm the lock");
      return;
    }
    this.extendingFor = nonce;
    try {
      let current: { info: LockInfo; etag: string | undefined } | null;
      try {
        current = await this.readLockEntry();
      } catch (error) {
        if (this.holdIsOver(nonce)) return;
        this.noteUnconfirmed(
          `could not confirm the lock is still ours`,
          error,
        );
        return;
      }

      // Re-check before judging ownership: release() may have run while we
      // were reading, and it clears the nonce we are about to compare
      // against — judging first would report a normal shutdown as a hostile
      // takeover. An expired tick may also have given the hold up while we
      // were parked, and a read that arrives afterwards does not bring it
      // back.
      if (this.holdIsOver(nonce)) return;

      // Verify we still own the lock before extending (fencing).
      if (!current || current.info.nonce !== nonce) {
        this.loseLock("another holder took it");
        return;
      }

      const info = buildLockInfo(this.ttlMs, nonce, this.holderContext);
      const body = encodeLockInfo(info);
      let written: boolean;
      try {
        written = await this.write(body, current.etag);
      } catch (error) {
        // A failed write is exactly as inconclusive as a failed read — the
        // PUT may well have landed before the connection dropped. Letting it
        // throw instead would escape into the heartbeat's catch and make the
        // whole outage invisible.
        if (this.holdIsOver(nonce)) return;
        this.noteUnconfirmed("could not confirm the extend was applied", error);
        return;
      }
      if (!written) {
        // The object changed under us between the read and the write. That
        // is either a genuine steal (412) or plain contention (409) — the
        // conditional PUT collapses both into one answer, and only the next
        // tick's read can tell them apart.
        if (this.holdIsOver(nonce)) return;
        this.noteUnconfirmed("could not confirm the extend was applied");
        return;
      }

      // The hold ended while this write was in flight, so the write does not
      // restore it. Only a shutdown cleans up after itself: that object is
      // ours and would otherwise be orphaned, whereas after a lost-lock
      // verdict it may already be a successor's, and leaving it to expire is
      // the safe direction to err in.
      if (this.holdIsOver(nonce)) {
        if (this.releasing) {
          try {
            await this.s3.deleteObject(this.lockKey);
          } catch {
            // Best-effort cleanup
          }
        }
        return;
      }
      this.unconfirmedExtends = 0;
      this.lastConfirmedAt = Date.now();
    } finally {
      // Not if a later acquisition has taken the slot over — this tick is
      // then the stale one, and clearing would unguard the live hold.
      if (this.extendingFor === nonce) this.extendingFor = undefined;
    }
  }

  /**
   * Writes the lock body fenced against `etag`, returning false when the
   * precondition failed. Falls back to an unconditional write, once and for
   * good, against endpoints that don't implement If-Match — the same one-way
   * degradation the cache sync's index writes make.
   */
  private async write(
    body: Uint8Array,
    etag: string | undefined,
  ): Promise<boolean> {
    if (!this.casUnsupported && etag !== undefined) {
      try {
        return await this.s3.putObjectIfMatch(this.lockKey, body, etag) !==
          null;
      } catch (error) {
        // NotImplemented/501, or an endpoint that rejects If-Match with
        // the object's own current ETag in either form (swamp-club #2337).
        if (!isIfMatchUnsupported(error)) throw error;
        this.casUnsupported = true;
        console.warn(
          `Lock ${this.lockKey}: the S3 endpoint does not support ` +
            `conditional PutObject (If-Match). Heartbeat writes fall back to ` +
            `unconditional puts, so a lock stolen mid-extend can be ` +
            `overwritten by its previous holder.`,
        );
      }
    }
    await this.s3.putObject(this.lockKey, body);
    return true;
  }

  /**
   * Records a tick that could not settle ownership. Warns on the first of a
   * run so an outage is visible, then stays quiet until it clears — this
   * fires every ttlMs/3 for as long as the endpoint is unreachable.
   *
   * The wording matters: at this point we genuinely do not know whether the
   * lock is still ours, and saying it was lost would be a guess.
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
   * Ends the hold when nothing has been confirmed for longer than the TTL,
   * and reports whether it did. Past ttlMs, "we might still hold it" stops
   * being a guess and becomes wishful thinking: that is the exact deadline
   * every contender applies to the object's LastModified, so anyone may
   * already have deleted it and taken over. Hold no longer than our own TTL
   * promises.
   */
  private giveUpIfExpired(what: string): boolean {
    if (Date.now() - this.lastConfirmedAt < this.ttlMs) return false;
    this.loseLock(
      `${what} for longer than the ${this.ttlMs}ms TTL, so it is now ` +
        `stealable by any other process`,
    );
    return true;
  }

  /**
   * True once nothing the in-flight request of the hold `nonce` identifies
   * comes back with can change anything: release() has taken over, the hold
   * was already given up, or a later acquisition owns the lock now. A late
   * answer must not revive its hold, report a normal shutdown as a lock lost
   * mid-operation, or pass judgement on the hold that replaced it.
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
  }

  /**
   * Reads the lock, with its etag for fencing a subsequent write.
   *
   * Returns null only when S3 reports the object absent. Every other failure
   * throws: a caller that cannot read the lock has learned nothing, and
   * flattening that into "no lock here" is exactly the bug in #2298.
   */
  private async readLockEntry(): Promise<
    { info: LockInfo; etag: string | undefined } | null
  > {
    try {
      const { data, etag } = await this.s3.getObject(this.lockKey);
      return { info: decodeLockInfo(data), etag };
    } catch (error) {
      if (isAbsent(error)) return null;
      throw error;
    }
  }

  private async readLock(): Promise<LockInfo | null> {
    return (await this.readLockEntry())?.info ?? null;
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
