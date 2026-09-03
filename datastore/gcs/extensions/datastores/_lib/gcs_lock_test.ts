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

import { assert, assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { assertLockConformance } from "@systeminit/swamp-testing";
import { GcsLock, LockTimeoutError } from "./gcs_lock.ts";
import {
  type GcsClient,
  type GcsObjectMetadata,
  type GcsWriteResult,
  PreconditionFailedError,
} from "./gcs_client.ts";
import type { LockInfo } from "./interfaces.ts";

/**
 * In-memory mock of GcsClient for testing lock mechanics.
 *
 * Honors `ifGenerationMatch` on delete (throws `PreconditionFailedError`
 * on mismatch, matching real GCS behavior) so DEF-4 parity tests can
 * distinguish "our generation still valid" from "successor stole".
 * Exposes `putConditionalCalls` and `overrideUpdated` for DEF-3B
 * rate-test wiring.
 */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
  generations: Map<string, number>;
  putConditionalCalls: number;
  overrideUpdated: Map<string, Date>;
  onDelete: ((key: string) => void) | undefined;
} {
  const storage = new Map<string, Uint8Array>();
  /** Auto-incrementing generation counter, per key. Exposed so tests
   *  that seed `storage` directly (bypassing `putObject`) can keep
   *  generation tracking consistent for the conditional-delete path. */
  const generations = new Map<string, number>();
  const putTimes = new Map<string, Date>();
  /** Overrides the "updated" timestamp reported by getMetadata — lets
   *  tests simulate a lock that's already aged past its TTL without
   *  waiting real wall time. */
  const overrideUpdated = new Map<string, Date>();
  /** Counts calls to `putObjectConditional` — lets DEF-3B tests assert
   *  a bounded attempt rate under stale-lock contention. */
  let putConditionalCalls = 0;
  /** Hook invoked after every successful delete — lets tests re-seed
   *  state without monkey-patching the method itself. */
  let onDelete: ((key: string) => void) | undefined;

  function nextGen(key: string): string {
    const g = (generations.get(key) ?? 0) + 1;
    generations.set(key, g);
    return String(g);
  }

  return {
    storage,
    generations,
    overrideUpdated,
    get putConditionalCalls() {
      return putConditionalCalls;
    },
    set putConditionalCalls(v: number) {
      putConditionalCalls = v;
    },
    get onDelete() {
      return onDelete;
    },
    set onDelete(hook: ((key: string) => void) | undefined) {
      onDelete = hook;
    },

    putObject(key: string, body: Uint8Array): Promise<GcsWriteResult> {
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    putObjectConditional(
      key: string,
      body: Uint8Array,
    ): Promise<GcsWriteResult | null> {
      putConditionalCalls++;
      if (storage.has(key)) {
        return Promise.resolve(null);
      }
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    putObjectCas(
      key: string,
      body: Uint8Array,
      expectedGeneration: string,
    ): Promise<GcsWriteResult | null> {
      const currentGen = String(generations.get(key) ?? 0);
      if (currentGen !== expectedGeneration) {
        return Promise.resolve(null);
      }
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      return Promise.resolve({ generation: gen });
    },

    getObject(
      key: string,
    ): Promise<{ data: Uint8Array; generation?: string }> {
      const data = storage.get(key);
      if (!data) return Promise.reject(new Error(`NotFound: ${key}`));
      return Promise.resolve({ data });
    },

    deleteObject(
      key: string,
      options?: { ifGenerationMatch?: string },
    ): Promise<void> {
      if (options?.ifGenerationMatch !== undefined) {
        const currentGen = String(generations.get(key) ?? 0);
        if (currentGen !== options.ifGenerationMatch) {
          return Promise.reject(
            new PreconditionFailedError(
              `Generation mismatch: expected ${options.ifGenerationMatch}, got ${currentGen}`,
            ),
          );
        }
      }
      storage.delete(key);
      generations.delete(key);
      putTimes.delete(key);
      overrideUpdated.delete(key);
      if (onDelete) onDelete(key);
      return Promise.resolve();
    },

    getMetadata(key: string): Promise<GcsObjectMetadata> {
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        updated: overrideUpdated.get(key) ?? putTimes.get(key) ?? new Date(),
        generation: String(generations.get(key) ?? 0),
      });
    },
  } as unknown as GcsClient & {
    storage: Map<string, Uint8Array>;
    generations: Map<string, number>;
    putConditionalCalls: number;
    overrideUpdated: Map<string, Date>;
    onDelete: ((key: string) => void) | undefined;
  };
}

Deno.test("GcsLock: acquire and release", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  await lock.acquire();

  assertEquals(mock.storage.has(".datastore.lock"), true);
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: release is idempotent", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  await lock.acquire();
  await lock.release();
  await lock.release(); // Should not throw
});

Deno.test("GcsLock: withLock executes callback and releases", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  const result = await lock.withLock(() => {
    assertEquals(mock.storage.has(".datastore.lock"), true);
    return Promise.resolve(42);
  });

  assertEquals(result, 42);
  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: withLock releases on error", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  try {
    await lock.withLock(() => {
      return Promise.reject(new Error("test error"));
    });
  } catch {
    // Expected
  }

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("GcsLock: second acquire times out when lock is held", async () => {
  const mock = createMockGcsClient();
  const lock1 = new GcsLock(mock, { ttlMs: 60_000 });
  const lock2 = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 50,
    maxWaitMs: 300,
  });

  await lock1.acquire();

  await assertRejects(
    () => lock2.acquire(),
    LockTimeoutError,
  );

  await lock1.release();
});

Deno.test("GcsLock: stale lock is force-acquired", async () => {
  const mock = createMockGcsClient();

  // Place a stale lock
  const staleLock: LockInfo = {
    holder: "stale@host",
    hostname: "host",
    pid: 99999,
    acquiredAt: new Date(Date.now() - 120_000).toISOString(),
    ttlMs: 5000,
  };
  const body = new TextEncoder().encode(JSON.stringify(staleLock, null, 2));
  mock.storage.set(".datastore.lock", body);
  // Keep the mock's generation tracking in sync with the direct
  // storage seed so the conditional-delete path matches (generation
  // "1" below).
  mock.generations.set(".datastore.lock", 1);

  // Override getMetadata to return stale updated time
  const originalMeta = mock.getMetadata.bind(mock);
  (mock as unknown as Record<string, unknown>).getMetadata = (key: string) => {
    if (key === ".datastore.lock") {
      return Promise.resolve({
        exists: true,
        size: body.length,
        updated: new Date(Date.now() - 120_000),
        generation: "1",
      });
    }
    return originalMeta(key);
  };

  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();
});

Deno.test("GcsLock: inspect returns null when no lock exists", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  const info = await lock.inspect();
  assertEquals(info, null);
});

Deno.test("GcsLock: forceRelease deletes lock when nonce matches", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);

  const released = await lock.forceRelease(info!.nonce!);
  assertEquals(released, true);

  assertEquals(mock.storage.has(".datastore.lock"), false);

  // Clean up internal state (heartbeat)
  await lock.release();
});

Deno.test("GcsLock: forceRelease returns false when nonce does not match", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const released = await lock.forceRelease("wrong-nonce");
  assertEquals(released, false);

  assertEquals(mock.storage.has(".datastore.lock"), true);

  await lock.release();
});

Deno.test("GcsLock: forceRelease returns false when no lock exists", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  const released = await lock.forceRelease("some-nonce");
  assertEquals(released, false);
});

Deno.test("GcsLock: custom lock key", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, {
    lockKey: "custom.lock",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("custom.lock"), true);
  assertEquals(mock.storage.has(".datastore.lock"), false);

  await lock.release();
});

// --- DEF-3B: stale-lock steal backoff (ref lab/166) ---

// Before DEF-3B, two contenders hitting an expired lock could
// tight-loop against the heartbeat of whichever process legitimately
// reclaimed it — retrying `putObjectConditional` at thousands of
// attempts per second. The 200-500ms randomized sleep after every
// steal attempt bounds the rate.

Deno.test("GcsLock DEF-3B: stale-lock steal loop is rate-limited by backoff", async () => {
  const mock = createMockGcsClient();

  // Seed a "held" lock object with a short TTL and a very old
  // `updated` timestamp — overrideUpdated simulates an aged-out lock
  // without waiting real wall time.
  const heldInfo: LockInfo = {
    holder: "other@host",
    hostname: "host",
    pid: 999,
    acquiredAt: new Date(Date.now() - 60_000).toISOString(),
    ttlMs: 100,
    nonce: "other-nonce",
  };
  await mock.putObject(
    ".datastore.lock",
    new TextEncoder().encode(JSON.stringify(heldInfo)),
  );
  mock.overrideUpdated.set(".datastore.lock", new Date(Date.now() - 60_000));

  // Swap the stale lock back in on every acquire attempt by the
  // contender — simulates the real-holder-heartbeat that would
  // otherwise race and keep the lock fresh. Without this the
  // contender's first steal succeeds and we never measure the
  // backoff path.
  const restoreStaleLock = () => {
    mock.storage.set(
      ".datastore.lock",
      new TextEncoder().encode(JSON.stringify(heldInfo)),
    );
    // Keep generations in sync with the direct-storage re-seed so
    // the conditional-delete path has a deterministic generation to
    // match against. Bump so every restored instance gets a fresh
    // generation — more realistic than reusing the original.
    mock.generations.set(
      ".datastore.lock",
      (mock.generations.get(".datastore.lock") ?? 0) + 1,
    );
    mock.overrideUpdated.set(".datastore.lock", new Date(Date.now() - 60_000));
  };
  // Every successful steal-delete must re-seed the stale lock so the
  // contender keeps finding something to steal. Using the mock's
  // onDelete hook is cleaner than monkey-patching the method and
  // avoids `any`-typed reassignment.
  mock.onDelete = (key) => {
    if (key === ".datastore.lock") restoreStaleLock();
  };

  const lock = new GcsLock(mock, { ttlMs: 5_000, maxWaitMs: 1_200 });

  mock.putConditionalCalls = 0;
  const start = Date.now();
  await assertRejects(() => lock.acquire(), LockTimeoutError);
  const elapsed = Date.now() - start;

  // Each acquire loop iteration does ONE putObjectConditional, then
  // either sleeps retryIntervalMs (healthy-lock-exists, ~1s) or does
  // the stale-steal path and sleeps 200-500ms. With the backoff in
  // place, 1.2s of total wait buys at most ~6 stale-path attempts
  // (1.2s / 200ms lower bound). Allow generous headroom for CI flake
  // — without backoff the loop would burn tens of thousands of
  // attempts in the same window.
  assert(
    mock.putConditionalCalls <= 10,
    `expected ≤10 putObjectConditional attempts under DEF-3B backoff, got ${mock.putConditionalCalls} in ${elapsed}ms`,
  );
  assert(
    elapsed >= 200,
    `expected at least one backoff cycle, got ${elapsed}ms`,
  );
});

// --- DEF-4 parity (ref lab/166): generation-CAS release ---

// S3 #102 DEF-4 defended against a stale release deleting a
// successor's lock by doing a nonce-GET-then-DELETE. GCS achieves
// the same invariant through the conditional DELETE at
// gcs_lock.ts:174 — `ifGenerationMatch: gen`. A successor that
// legitimately stole the lock has a different generation, so our
// conditional delete fails with PreconditionFailedError and the
// catch block in release() swallows it. The successor's lock
// object is untouched.

Deno.test("GcsLock DEF-4 parity: stale release does not delete successor's lock", async () => {
  const mock = createMockGcsClient();

  // Process A acquires.
  const lockA = new GcsLock(mock, { ttlMs: 5_000 });
  await lockA.acquire();
  assertEquals(mock.storage.has(".datastore.lock"), true);

  // Simulate a legitimate successor takeover: remove A's lock
  // (bypassing A's generation), then let process B acquire anew.
  // Reach through the mock to delete unconditionally — real GCS
  // would arrive at the same state after TTL expiry + steal.
  mock.storage.delete(".datastore.lock");
  const lockB = new GcsLock(mock, { ttlMs: 5_000 });
  await lockB.acquire();
  const bGenerationBefore = mock.storage.get(".datastore.lock");
  assert(bGenerationBefore, "B should now hold the lock");

  // A has a heartbeat running and will try to extend — stop it so
  // we don't race the assertion. `release()` also stops the
  // heartbeat, and the interesting path is release()'s
  // conditional-delete behavior.
  await lockA.release();

  // The successor's lock object must survive A's stale release.
  // If the guard were missing, A's conditional delete would have
  // deleted B's lock and `storage.has` would be false.
  assertEquals(
    mock.storage.has(".datastore.lock"),
    true,
    "DEF-4 guard: A.release() must not delete B's legitimate lock",
  );

  // B's lock should still be inspectable via its own handle.
  const bInfo = await lockB.inspect();
  assertEquals(bInfo !== null, true);

  await lockB.release();
});

Deno.test("GcsLock: namespace scopes lock key under namespace prefix", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, {
    namespace: "my-ns",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("my-ns/.datastore.lock"), true);
  assertEquals(mock.storage.has(".datastore.lock"), false);

  await lock.release();
});

Deno.test("GcsLock: namespace with custom lock key", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, {
    lockKey: ".locks/global.lock",
    namespace: "my-ns",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("my-ns/.locks/global.lock"), true);
  assertEquals(mock.storage.has(".locks/global.lock"), false);

  await lock.release();
});

// --- Conformance suite ---

Deno.test("GcsLock: passes DistributedLock conformance suite", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });
  await assertLockConformance(lock);
});

// --- #1980-F1: holderContext appears in lock body --------------------------

Deno.test("GcsLock: holderContext is embedded in the lock body", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, {
    ttlMs: 5000,
    holderContext: {
      model: "software-factory",
      method: "record_dispatch",
      requestId: "abc-123",
    },
  });

  await lock.acquire();
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.context, {
    model: "software-factory",
    method: "record_dispatch",
    requestId: "abc-123",
  });

  await lock.release();
});

Deno.test("GcsLock: lock body omits context when holderContext not provided", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  await lock.acquire();
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.context, undefined);

  await lock.release();
});

// --- #1980-F2: exponential backoff reduces operations ----------------------

Deno.test("GcsLock: exponential backoff reduces operations under contention", async () => {
  const mock = createMockGcsClient();
  const holder = new GcsLock(mock, { ttlMs: 60_000 });
  await holder.acquire();

  mock.putConditionalCalls = 0;

  const waiter = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 10,
    maxRetryIntervalMs: 100,
    maxWaitMs: 1_500,
  });

  await assertRejects(() => waiter.acquire(), LockTimeoutError);

  // With fixed 10ms interval over 1.5s: ~150 attempts.
  // With exponential backoff (10, 20, 40, 80, 100, 100, ...): far fewer.
  assertEquals(
    mock.putConditionalCalls < 80,
    true,
    `expected backoff to reduce attempts, got ${mock.putConditionalCalls} putObjectConditional calls`,
  );

  await holder.release();
});

// --- #1980-F3: LockTimeoutError carries structured metadata ----------------

Deno.test("GcsLock: LockTimeoutError has code and retryable fields", async () => {
  const mock = createMockGcsClient();
  const holder = new GcsLock(mock, { ttlMs: 60_000 });
  await holder.acquire();

  const waiter = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 50,
    maxWaitMs: 200,
  });

  try {
    await waiter.acquire();
    throw new Error("should not reach here");
  } catch (err) {
    if (!(err instanceof LockTimeoutError)) throw err;
    assertEquals(err.code, "LOCK_TIMEOUT");
    assertEquals(err.retryable, true);
    assertEquals(err.name, "LockTimeoutError");
  } finally {
    await holder.release();
  }
});

Deno.test("GcsLock: LockTimeoutError message includes holderContext", async () => {
  const mock = createMockGcsClient();
  const holder = new GcsLock(mock, {
    ttlMs: 60_000,
    holderContext: { model: "my-model", method: "run" },
  });
  await holder.acquire();

  const waiter = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 50,
    maxWaitMs: 200,
  });

  try {
    await waiter.acquire();
    throw new Error("should not reach here");
  } catch (err) {
    if (!(err instanceof LockTimeoutError)) throw err;
    assertEquals(err.message.includes("model=my-model"), true);
    assertEquals(err.message.includes("method=run"), true);
  } finally {
    await holder.release();
  }
});
