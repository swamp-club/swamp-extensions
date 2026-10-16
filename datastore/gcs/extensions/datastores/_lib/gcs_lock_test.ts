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

import { assert, assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { assertLockConformance } from "@systeminit/swamp-testing";
import { GcsLock, LockTimeoutError } from "./gcs_lock.ts";
import {
  GcsClient,
  type GcsObjectMetadata,
  GcsOperationError,
  type GcsWriteResult,
  NotFoundError,
  PreconditionFailedError,
} from "./gcs_client.ts";
import type { LockInfo } from "./interfaces.ts";

/**
 * Shapes an error the way `GcsClient` surfaces a non-2xx response, so the
 * lock's absent-versus-unreadable classifier is exercised against what the
 * client really throws rather than a convenient plain `Error`.
 */
function gcsError(httpStatusCode: number | null, name = "Error") {
  return new GcsOperationError(`GCS getObject failed HTTP ${httpStatusCode}`, {
    name,
    httpStatusCode,
    code: undefined,
    bodyPreview: undefined,
    uploadId: undefined,
  });
}

/** A dropped connection: fetch rejects with a TypeError and no status. */
const transportFailure = () => new TypeError("error sending request");

/** Controls for steering the mock from inside a test. */
interface MockControls {
  storage: Map<string, Uint8Array>;
  generations: Map<string, number>;
  putConditionalCalls: number;
  overrideUpdated: Map<string, Date>;
  onDelete: ((key: string) => void) | undefined;
  /** Successful `putObjectCas` writes, including ones whose answer is dropped. */
  writes: number;
  /** Reject `getObject` with this, until cleared. */
  failGetWith?: () => Error;
  /** Reject `putObjectCas` with this instead of writing. */
  failCasWith?: () => Error;
  /** Apply `putObjectCas` writes, then reject as if the response was lost. */
  dropCasResponse?: boolean;
  /** Answer `getObject` without a generation, as a non-conforming endpoint may. */
  omitGeneration?: boolean;
  /** Park `putObjectCas` calls until this settles. */
  holdCas?: Promise<void>;
  /** `putObjectCas` calls, whatever their outcome. */
  casCalls: number;
  /** Delay before a `putObjectCas` write commits, as on a slow link. */
  casLatencyMs?: number;
}

/**
 * In-memory mock of GcsClient for testing lock mechanics.
 *
 * Honors `ifGenerationMatch` on delete (throws `PreconditionFailedError`
 * on mismatch, matching real GCS behavior) so DEF-4 parity tests can
 * distinguish "our generation still valid" from "successor stole".
 * Exposes `putConditionalCalls` and `overrideUpdated` for DEF-3B
 * rate-test wiring.
 *
 * `getObject` rejects a missing key with `NotFoundError` and returns the
 * object's generation, as the real client does: the lock only treats that
 * shape as "absent", so a plain `Error` here would read as an outage.
 */
function createMockGcsClient(): GcsClient & MockControls {
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
  const controls: Pick<
    MockControls,
    | "writes"
    | "failGetWith"
    | "failCasWith"
    | "dropCasResponse"
    | "omitGeneration"
    | "holdCas"
    | "casCalls"
    | "casLatencyMs"
  > = { writes: 0, casCalls: 0 };

  function nextGen(key: string): string {
    const g = (generations.get(key) ?? 0) + 1;
    generations.set(key, g);
    return String(g);
  }

  return {
    storage,
    generations,
    overrideUpdated,
    get writes() {
      return controls.writes;
    },
    set writes(v: number) {
      controls.writes = v;
    },
    get failGetWith() {
      return controls.failGetWith;
    },
    set failGetWith(v: (() => Error) | undefined) {
      controls.failGetWith = v;
    },
    get failCasWith() {
      return controls.failCasWith;
    },
    set failCasWith(v: (() => Error) | undefined) {
      controls.failCasWith = v;
    },
    get dropCasResponse() {
      return controls.dropCasResponse;
    },
    set dropCasResponse(v: boolean | undefined) {
      controls.dropCasResponse = v;
    },
    get omitGeneration() {
      return controls.omitGeneration;
    },
    set omitGeneration(v: boolean | undefined) {
      controls.omitGeneration = v;
    },
    get casLatencyMs() {
      return controls.casLatencyMs;
    },
    set casLatencyMs(v: number | undefined) {
      controls.casLatencyMs = v;
    },
    get casCalls() {
      return controls.casCalls;
    },
    set casCalls(v: number) {
      controls.casCalls = v;
    },
    get holdCas() {
      return controls.holdCas;
    },
    set holdCas(v: Promise<void> | undefined) {
      controls.holdCas = v;
    },
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

    async putObjectCas(
      key: string,
      body: Uint8Array,
      expectedGeneration: string,
    ): Promise<GcsWriteResult | null> {
      controls.casCalls++;
      if (controls.holdCas) await controls.holdCas;
      if (controls.casLatencyMs) {
        await new Promise((r) => setTimeout(r, controls.casLatencyMs));
      }
      if (controls.failCasWith) throw controls.failCasWith();
      const currentGen = String(generations.get(key) ?? 0);
      if (currentGen !== expectedGeneration) return null;
      storage.set(key, body);
      putTimes.set(key, new Date());
      const gen = nextGen(key);
      controls.writes++;
      // The write landed; only the answer is lost on the way back.
      if (controls.dropCasResponse) throw transportFailure();
      return { generation: gen };
    },

    getObject(
      key: string,
    ): Promise<{ data: Uint8Array; generation?: string }> {
      if (controls.failGetWith) return Promise.reject(controls.failGetWith());
      const data = storage.get(key);
      if (!data) {
        return Promise.reject(
          new NotFoundError(`GCS getObject not found (404)`),
        );
      }
      return Promise.resolve({
        data,
        generation: controls.omitGeneration
          ? undefined
          : String(generations.get(key) ?? 0),
      });
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
  } as unknown as GcsClient & MockControls;
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

// --- swamp-club#2315: 409 on acquire reads as contention, not a throw ----
//
// This case deliberately does NOT use createMockGcsClient. That mock
// implements putObjectConditional directly, which bypasses the HTTP
// status-to-PreconditionFailedError mapping that is the whole thing under
// test. It drives a real GcsClient against a local endpoint instead — the
// same wiring gcs.ts uses — so the 409 travels the real path.
//
// The mock serves more than the 409: once acquire reads "not acquired" it
// sets contended, then reads the lock body and its metadata to decide
// whether the holder is stale. Leaving those 404ing would send the loop
// down the "no existing lock" branch and spin until the deadline, so the
// case would pass for the wrong reason.
Deno.test({
  name: "GcsLock: acquire against a 409-answering endpoint reports contention",
  sanitizeResources: false,
  fn: async () => {
    const holder: LockInfo = {
      holder: "other-process",
      hostname: "elsewhere",
      pid: 4242,
      acquiredAt: new Date().toISOString(),
      ttlMs: 60_000,
      nonce: "held-by-someone-else",
    };

    let uploads = 0;
    const ac = new AbortController();
    const server = Deno.serve(
      { port: 0, signal: ac.signal, onListen() {} },
      async (req) => {
        const url = new URL(req.url);

        // Conditional upload: answer 409 instead of GCS's 412.
        if (req.method === "POST" && url.pathname.includes("/upload/")) {
          uploads++;
          await req.arrayBuffer();
          return new Response(
            JSON.stringify({ error: { code: 409, message: "Conflict" } }),
            { status: 409, headers: { "Content-Type": "application/json" } },
          );
        }

        // Lock body, for readLock().
        if (req.method === "GET" && url.searchParams.get("alt") === "media") {
          return new Response(JSON.stringify(holder), {
            status: 200,
            headers: { "x-goog-generation": "17" },
          });
        }

        // Object metadata, for the staleness check. A fresh `updated` keeps
        // the holder live, so acquire waits rather than stealing the lock.
        if (req.method === "GET") {
          return new Response(
            JSON.stringify({
              size: "128",
              generation: "17",
              updated: new Date().toISOString(),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }

        return new Response(null, { status: 404 });
      },
    );
    const addr = server.addr as Deno.NetAddr;

    try {
      const gcs = new GcsClient(
        { bucket: "test-bucket", apiEndpoint: `http://localhost:${addr.port}` },
      );
      // Bounded like the existing held-lock case, so a regression fails on
      // the deadline instead of hanging the run.
      const lock = new GcsLock(gcs, {
        ttlMs: 60_000,
        retryIntervalMs: 50,
        maxWaitMs: 300,
      });

      const err = await assertRejects(() => lock.acquire(), LockTimeoutError);
      // Contention, reported with the holder — not a leaked 409.
      assertEquals(err.holder?.holder, "other-process");
      assert(uploads > 0, "the conditional upload should have been attempted");
    } finally {
      ac.abort();
      await server.finished;
    }
  },
});

// --- #2333: a failed read or write must not be reported as "no lock" ------
//
// Port of the #2298 fix from the S3 backend. A read that fails says nothing
// about ownership, so it must not surface as "unlocked"; and the heartbeat
// must treat an outage as inconclusive — hold, retry, warn once — bounded by
// the TTL, never as silent loss.

/**
 * Captures `console.warn` for the duration of `fn`. The lock warns on every
 * path these tests assert, and an uncaptured warn both pollutes test output
 * and leaves the assertions with nothing to read.
 */
async function captureWarnings(
  fn: () => Promise<void>,
): Promise<string[]> {
  const warnings: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    await fn();
  } finally {
    console.warn = original;
  }
  return warnings;
}

/** Sleep helper for the heartbeat tests, which run on a 100ms tick. */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** A lock body owned by another process, fresh unless aged by the caller. */
function foreignLock(nonce = "someone-else"): Uint8Array {
  const info: LockInfo = {
    holder: "other@host",
    hostname: "host",
    pid: 1,
    acquiredAt: new Date().toISOString(),
    ttlMs: 300,
    nonce,
  };
  return new TextEncoder().encode(JSON.stringify(info));
}

/** Parks `putObjectCas` until released, so a tick can be held in flight. */
function parkCas(mock: MockControls): { release: () => void } {
  let release!: () => void;
  mock.holdCas = new Promise<void>((resolve) => {
    release = () => {
      mock.holdCas = undefined;
      resolve();
    };
  });
  return { release };
}

Deno.test("GcsLock: inspect reports a read failure instead of an empty lock", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  // Absent is still null — that is what `inspect()` promises.
  assertEquals(await lock.inspect(), null);

  // But "GCS is unreachable" is not "nobody holds the lock".
  for (
    const failure of [
      () => gcsError(500),
      () => gcsError(403),
      () => gcsError(null, "Http"),
      transportFailure,
    ]
  ) {
    mock.failGetWith = failure;
    await assertRejects(() => lock.inspect());
  }
  mock.failGetWith = undefined;

  // A 404 that reached us without being narrowed still means absent.
  mock.failGetWith = () => gcsError(404);
  assertEquals(await lock.inspect(), null);
  mock.failGetWith = undefined;

  // A body that cannot be decoded is not an empty lock either.
  mock.storage.set(".datastore.lock", new TextEncoder().encode("{not json"));
  await assertRejects(() => lock.inspect(), SyntaxError);
});

Deno.test("GcsLock: forceRelease reports a read failure instead of not-ours", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 5000 });

  assertEquals(await lock.forceRelease("some-nonce"), false);

  mock.failGetWith = () => gcsError(500);
  await assertRejects(() => lock.forceRelease("some-nonce"), GcsOperationError);
  mock.failGetWith = transportFailure;
  await assertRejects(() => lock.forceRelease("some-nonce"), TypeError);
});

Deno.test("GcsLock: acquire times out with LockTimeoutError when reads fail", async () => {
  // The timeout path reads the lock only to name the holder; an unreadable
  // lock there must not replace LockTimeoutError with a GCS error.
  const mock = createMockGcsClient();
  mock.storage.set(".datastore.lock", foreignLock());
  mock.failGetWith = () => gcsError(503);
  const lock = new GcsLock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 20,
    maxWaitMs: 150,
  });

  const err = await assertRejects(() => lock.acquire(), LockTimeoutError);
  assertEquals(err.holder, null);
});

Deno.test("GcsLock: acquire survives a read failure during the stale check", async () => {
  const mock = createMockGcsClient();
  mock.storage.set(".datastore.lock", foreignLock());
  mock.overrideUpdated.set(".datastore.lock", new Date(Date.now() - 60_000));

  let failures = 2;
  mock.failGetWith = () => {
    if (--failures <= 0) mock.failGetWith = undefined;
    return transportFailure();
  };

  const lock = new GcsLock(mock, {
    ttlMs: 5000,
    retryIntervalMs: 10,
    maxRetryIntervalMs: 20,
    maxWaitMs: 5000,
  });
  await lock.acquire();
  const info = await lock.inspect();
  assert(info !== null && info.nonce !== "someone-else");
  await lock.release();
});

/** Drives a lock through a heartbeat outage and reports writes either side. */
async function outage(
  failWith: () => Error,
): Promise<{ warnings: string[]; before: number; after: number }> {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 900 }); // 300ms heartbeat
  let before = 0;
  let after = 0;

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    // The hold ends ttlMs less a 10% margin after the last confirmed tick
    // (swamp-club#2333). With ttlMs 900 that is 810ms, so a one-tick outage
    // after two healthy ticks recovers about 200ms before the deadline; at
    // ttlMs 300 the margin was close to nothing, and timer drift under load
    // let the hold end mid-test.
    await sleep(650); // two healthy ticks

    mock.failCasWith = failWith;
    await sleep(300); // one tick's worth of outage
    mock.failCasWith = undefined;
    before = mock.writes;

    await sleep(1000); // three ticks after recovery
    after = mock.writes;
    await lock.release();
  });

  return { warnings, before, after };
}

Deno.test("GcsLock: heartbeat survives a transport failure mid-run", async () => {
  const { warnings, before, after } = await outage(transportFailure);

  assert(
    after > before,
    `heartbeat stopped after a transient write error (writes stuck at ${after})`,
  );
  assert(
    warnings.some((w) => w.includes("could not confirm")),
    `a throwing heartbeat write must be reported, got: ${
      JSON.stringify(warnings)
    }`,
  );
  // "Could not confirm" is not "someone took it".
  assertEquals(
    warnings.filter((w) => w.includes("lost")),
    [],
    "an unconfirmed extend must not claim the lock was lost",
  );
});

Deno.test("GcsLock: heartbeat survives a 403 mid-run", async () => {
  // An auth failure means "cannot verify", not "no longer mine".
  const { before, after } = await outage(() => gcsError(403));
  assert(after > before, `heartbeat stopped after a 403 (writes ${after})`);
});

Deno.test("GcsLock: one warning per outage, not one per tick", async () => {
  const { warnings } = await outage(transportFailure);
  const unconfirmed = warnings.filter((w) => w.includes("could not confirm"));
  assertEquals(unconfirmed.length, 1, JSON.stringify(unconfirmed));
});

Deno.test("GcsLock: heartbeat stops and warns when the lock is genuinely taken", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(150);

    // Another process steals it: new body, new generation.
    mock.storage.set(".datastore.lock", foreignLock("thief"));
    mock.generations.set(
      ".datastore.lock",
      (mock.generations.get(".datastore.lock") ?? 0) + 1,
    );
    await sleep(150);
    const atLoss = mock.writes;
    await sleep(250);
    assertEquals(mock.writes, atLoss, "heartbeat kept writing after loss");
    await lock.release();
  });

  assert(
    warnings.some((w) => w.includes("was lost")),
    `expected a lost-lock warning, got: ${JSON.stringify(warnings)}`,
  );
  // The thief's lock is untouched.
  const info = await lock.inspect();
  assertEquals(info?.nonce, "thief");
});

Deno.test("GcsLock: heartbeat stops and warns when the lock is deleted", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(150);
    await mock.deleteObject(".datastore.lock");
    await sleep(250);
    await lock.release();
  });

  assert(
    warnings.some((w) => w.includes("was lost")),
    `expected a lost-lock warning, got: ${JSON.stringify(warnings)}`,
  );
});

Deno.test("GcsLock: a write whose response was lost keeps the lock", async () => {
  // The CAS lands but its answer is dropped, so the next tick fences on a
  // generation our own write replaced. That mismatch is not a steal: the
  // object still carries our nonce.
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });
  let before = 0;

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.dropCasResponse = true;
    await sleep(150); // one tick lands without an answer
    mock.dropCasResponse = false;
    before = mock.writes;
    await sleep(450); // mismatch, adopt, then healthy extends
    assert(
      mock.writes > before,
      `heartbeat stopped after a lost response (writes stuck at ${mock.writes})`,
    );
    await lock.release();
  });

  assertEquals(
    warnings.filter((w) => w.includes("lost while")),
    [],
    `a lost response was misread as a stolen lock: ${JSON.stringify(warnings)}`,
  );
  // And release, fencing on the adopted generation, really removed it.
  assertEquals(await lock.inspect(), null);
});

Deno.test("GcsLock: without a generation to adopt, a lost response is left to the TTL", async () => {
  // A non-conforming endpoint may omit x-goog-generation. Then there is
  // nothing safe to fence on: hold, unconfirmed, until the TTL runs out.
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.dropCasResponse = true;
    await sleep(150);
    mock.dropCasResponse = false;
    mock.omitGeneration = true;
    await sleep(500);
    await lock.release();
  });

  assert(
    warnings.some((w) => w.includes("was lost") && w.includes("TTL")),
    `expected the hold to end on the TTL, got: ${JSON.stringify(warnings)}`,
  );
  assertEquals(
    warnings.filter((w) => w.includes("another holder")),
    [],
    "our own nonce must not be reported as another holder",
  );
});

Deno.test("GcsLock: gives up once the outage outlasts the TTL", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failCasWith = transportFailure;
    await sleep(500); // past the TTL with nothing confirmed
    mock.failCasWith = undefined;
    const atGiveUp = mock.writes;
    await sleep(250);
    assertEquals(mock.writes, atGiveUp, "an expired hold kept extending");
    await lock.release();
  });

  // Nobody took over, so release() removes our last write rather than make
  // every contender wait out its TTL.
  assertEquals(await lock.inspect(), null, "a given-up hold was left behind");

  assert(
    warnings.some((w) => w.includes("was lost") && w.includes("TTL")),
    `expected the hold to end on the TTL, got: ${JSON.stringify(warnings)}`,
  );
});

Deno.test("GcsLock: a slow extend does not start a second one", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 3000 }); // 1s heartbeat, TTL far off
  const parked = parkCas(mock);

  await lock.acquire();
  await sleep(3200); // three ticks fire while the first is parked
  assertEquals(mock.casCalls, 1, "overlapping ticks piled up requests");
  parked.release();
  await sleep(20);
  await lock.release();
});

Deno.test("GcsLock: a stalled heartbeat gives up once the TTL runs out", async () => {
  // A request that stalls never comes back with a verdict, so the ticks
  // behind it must judge on the clock.
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });
  const parked = parkCas(mock);

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(650); // twice the TTL with the write still parked
    parked.release();
    await sleep(50);
    const afterParked = mock.writes;
    await sleep(250);
    assertEquals(
      mock.writes,
      afterParked,
      "a write that returned after the TTL revived an expired hold",
    );
    await lock.release();
  });

  assert(
    warnings.some((w) => w.includes("was lost")),
    `a heartbeat stalled past the TTL must end the hold, got: ${
      JSON.stringify(warnings)
    }`,
  );
});

Deno.test("GcsLock: releasing during an in-flight extend is not a lost lock", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    const parked = parkCas(mock);
    await sleep(150); // a tick parks on its write
    await lock.release();
    parked.release();
    await sleep(50);
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a normal shutdown was reported as a lost lock",
  );
  assertEquals(await lock.inspect(), null, "the lock was orphaned");
});

Deno.test("GcsLock: a heartbeat failure after release is not a lost lock", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    const parked = parkCas(mock);
    await sleep(150);
    await lock.release();
    await sleep(400); // the abandoned hold outlives its TTL
    mock.failCasWith = transportFailure;
    parked.release();
    await sleep(50);
    mock.failCasWith = undefined;
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a heartbeat that failed after a clean release reported a lost lock",
  );
});

Deno.test("GcsLock: a parked heartbeat from a previous hold does not stall the next one", async () => {
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    let releasePark!: () => void;
    const park = new Promise<void>((r) => (releasePark = r));
    mock.holdCas = park;

    await sleep(150); // a tick fires and parks on its write
    mock.holdCas = undefined; // the next hold's writes must not park
    await lock.release();

    await lock.acquire(); // same instance, new hold
    const before = mock.writes;
    await sleep(250);
    assert(
      mock.writes > before,
      "the new hold made no heartbeat writes — a stale in-flight guard " +
        "skipped every tick",
    );

    releasePark(); // the previous hold's write finally returns
    await sleep(150);
    await lock.release();
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a heartbeat left over from a previous hold reported the new lock lost",
  );
});

// --- Review follow-ups: the hold must end before a steal is legal ---------

Deno.test("GcsLock: the hold ends before contenders may steal, despite slow writes", async () => {
  // Contenders steal once the object's `updated` time is ttlMs old, and GCS
  // stamps that when a write commits. Measuring our deadline from when the
  // answer arrived — and only checking it on a tick — let the holder outlast
  // that window, so both sides believed they held the lock.
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 600 }); // 200ms heartbeat
  let lostAt = 0;
  let lastCommit = 0;

  const warnings: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    const line = args.map(String).join(" ");
    if (line.includes("was lost") && lostAt === 0) lostAt = Date.now();
    warnings.push(line);
  };
  try {
    await lock.acquire();
    const acquiredAt = Date.now();
    mock.casLatencyMs = 120; // every write commits well after it was sent
    // The 200ms tick sends an extend that commits at ~320ms; read after it.
    await sleep(380);
    const meta = await mock.getMetadata(".datastore.lock");
    lastCommit = meta.updated!.getTime();
    assertEquals(
      lastCommit - acquiredAt >= 250,
      true,
      "the slow extend had not committed when the deadline was measured",
    );
    mock.casLatencyMs = undefined;
    mock.failCasWith = transportFailure; // nothing confirms from here on
    await sleep(900);
    mock.failCasWith = undefined;
    await lock.release();
  } finally {
    console.warn = original;
  }

  assert(lostAt > 0, `the hold never ended: ${JSON.stringify(warnings)}`);
  assert(
    lostAt < lastCommit + 600,
    `the holder conceded ${lostAt - (lastCommit + 600)}ms after a contender ` +
      `was entitled to steal`,
  );
});

Deno.test("GcsLock: a write that lands after the hold ended is cleaned up", async () => {
  // A parked extend that finally commits refreshes our own lock object. Left
  // alone, every contender waits out another TTL for a lock nobody holds.
  const mock = createMockGcsClient();
  const lock = new GcsLock(mock, { ttlMs: 300 });
  const parked = parkCas(mock);

  await captureWarnings(async () => {
    await lock.acquire();
    await sleep(450); // past the deadline with the write still parked
    parked.release(); // it commits now, after the hold was given up
    await sleep(50);
  });

  assertEquals(await lock.inspect(), null, "the late write was orphaned");
  await lock.release();
});

// --- The same contract through the real GcsClient, over HTTP --------------
//
// The in-memory mock above decides for itself what "absent" and "precondition
// failed" look like. These drive GcsLock through the real client against a
// small stateful GCS JSON-API endpoint, so the 404 → NotFoundError,
// 412 → null and x-goog-generation paths are the client's own.

interface GcsEmulator {
  client: GcsClient;
  /** Answer object reads with this status instead of serving them. */
  failGetWith?: number;
  /** Apply the next uploads, then answer 503 as if the response was lost. */
  dropUploadResponses?: boolean;
  /** Overwrites the lock as another process would, with a new generation. */
  steal(nonce: string): void;
  has(name: string): boolean;
  close(): Promise<void>;
}

function startGcsEmulator(): GcsEmulator {
  const objects = new Map<
    string,
    { body: Uint8Array; generation: number; updated: Date }
  >();
  let nextGeneration = 1;
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  const store = (name: string, body: Uint8Array) => {
    const entry = { body, generation: nextGeneration++, updated: new Date() };
    objects.set(name, entry);
    return entry;
  };

  const ac = new AbortController();
  const emulator = {} as GcsEmulator;
  const server = Deno.serve(
    { port: 0, signal: ac.signal, onListen() {} },
    async (req) => {
      const url = new URL(req.url);
      const ifGen = url.searchParams.get("ifGenerationMatch");

      // Media upload: create-only (ifGenerationMatch=0) or CAS.
      if (req.method === "POST" && url.pathname.includes("/upload/")) {
        const body = new Uint8Array(await req.arrayBuffer());
        const name = url.searchParams.get("name")!;
        const current = objects.get(name);
        if (ifGen !== null && String(current?.generation ?? 0) !== ifGen) {
          return json(412, { error: { code: 412 } });
        }
        const entry = store(name, body);
        if (emulator.dropUploadResponses) {
          return json(503, { error: { code: 503, message: "backendError" } });
        }
        return json(200, {
          name,
          generation: String(entry.generation),
          updated: entry.updated.toISOString(),
        });
      }

      const match = url.pathname.match(/\/storage\/v1\/b\/[^/]+\/o\/(.+)$/);
      if (!match) return json(404, { error: { code: 404 } });
      const name = decodeURIComponent(match[1]);
      const current = objects.get(name);

      if (req.method === "GET") {
        const media = url.searchParams.get("alt") === "media";
        if (media && emulator.failGetWith) {
          return json(emulator.failGetWith, { error: { code: 0 } });
        }
        if (!current) return json(404, { error: { code: 404 } });
        if (media) {
          return new Response(current.body as BodyInit, {
            headers: { "x-goog-generation": String(current.generation) },
          });
        }
        return json(200, {
          name,
          size: String(current.body.length),
          generation: String(current.generation),
          updated: current.updated.toISOString(),
        });
      }

      if (req.method === "DELETE") {
        if (!current) return json(404, { error: { code: 404 } });
        if (ifGen !== null && String(current.generation) !== ifGen) {
          return json(412, { error: { code: 412 } });
        }
        objects.delete(name);
        return new Response(null, { status: 204 });
      }

      return json(405, { error: { code: 405 } });
    },
  );
  const port = (server.addr as Deno.NetAddr).port;

  emulator.client = new GcsClient({
    bucket: "test-bucket",
    apiEndpoint: `http://localhost:${port}`,
  });
  emulator.steal = (nonce) => {
    store(".datastore.lock", foreignLock(nonce));
  };
  emulator.has = (name) => objects.has(name);
  emulator.close = async () => {
    ac.abort();
    await server.finished;
  };
  return emulator;
}

// fetch keeps pooled keep-alive connections to the emulator open past the
// test body, which the resource sanitizer would report as a leak.
const httpTest = (name: string, fn: () => Promise<void>) =>
  Deno.test({ name, sanitizeResources: false, fn });

httpTest("GcsLock over HTTP: inspect is null only on a real 404", async () => {
  const gcs = startGcsEmulator();
  try {
    const lock = new GcsLock(gcs.client, { ttlMs: 5000 });
    assertEquals(await lock.inspect(), null);
    for (const status of [500, 503, 403, 429]) {
      gcs.failGetWith = status;
      await assertRejects(() => lock.inspect(), GcsOperationError);
      await assertRejects(() => lock.forceRelease("n"), GcsOperationError);
    }
  } finally {
    await gcs.close();
  }
});

httpTest(
  "GcsLock over HTTP: passes DistributedLock conformance suite",
  async () => {
    const gcs = startGcsEmulator();
    try {
      await assertLockConformance(
        new GcsLock(gcs.client, {
          ttlMs: 5000,
          retryIntervalMs: 20,
          maxWaitMs: 500,
        }),
      );
    } finally {
      await gcs.close();
    }
  },
);

httpTest(
  "GcsLock over HTTP: a landed write with a lost response keeps the lock",
  async () => {
    const gcs = startGcsEmulator();
    try {
      const lock = new GcsLock(gcs.client, { ttlMs: 600 }); // 200ms heartbeat
      const warnings = await captureWarnings(async () => {
        await lock.acquire();
        gcs.dropUploadResponses = true;
        await sleep(250); // one extend lands, answered 503
        gcs.dropUploadResponses = false;
        await sleep(500); // 412 on the stale generation, read back, adopt
        const info = await lock.inspect();
        assert(info !== null, "the lock disappeared");
        await lock.release();
      });
      assertEquals(
        warnings.filter((w) => w.includes("was lost")),
        [],
        `a lost response was treated as a lost lock: ${
          JSON.stringify(warnings)
        }`,
      );
      assertEquals(gcs.has(".datastore.lock"), false, "release left the lock");
    } finally {
      await gcs.close();
    }
  },
);

httpTest(
  "GcsLock over HTTP: a genuine steal ends the hold and is left alone",
  async () => {
    const gcs = startGcsEmulator();
    try {
      const lock = new GcsLock(gcs.client, { ttlMs: 600 });
      const warnings = await captureWarnings(async () => {
        await lock.acquire();
        await sleep(100);
        gcs.steal("thief");
        await sleep(300);
        await lock.release();
      });
      assert(
        warnings.some((w) => w.includes("was lost")),
        `expected a lost-lock warning, got: ${JSON.stringify(warnings)}`,
      );
      assertEquals((await new GcsLock(gcs.client).inspect())?.nonce, "thief");
    } finally {
      await gcs.close();
    }
  },
);
