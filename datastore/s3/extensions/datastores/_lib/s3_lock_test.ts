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

import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { assertLockConformance } from "@systeminit/swamp-testing";
import { LockTimeoutError, S3Lock } from "./s3_lock.ts";
import { IfMatchUnsupportedError, S3OperationError } from "./s3_client.ts";
import type { S3Client } from "./s3_client.ts";
import { withS3Emulator } from "./s3_emulator_test_util.ts";
import type { LockInfo } from "./interfaces.ts";

/**
 * Shapes an error the way `S3Client` surfaces it, so the lock's
 * absent-versus-unreadable classifier is exercised against what the SDK
 * really produces rather than a convenient plain `Error`.
 *
 * `httpStatusCode: undefined` is not an oversight — the AWS SDK reports
 * transport failures (ECONNRESET, DNS, TLS) with `name: "Http"` and no
 * status at all. See the `isRetryableError` comment in s3_cache_sync.ts.
 */
function s3Error(name: string, httpStatusCode?: number): S3OperationError {
  return new S3OperationError(`S3 failed: ${name}`, {
    name,
    cause: new Error(name),
    httpStatusCode,
    code: name,
    requestId: undefined,
    bodyPreview: undefined,
  });
}

/** The error a real `getObject` throws for a key that isn't there. */
const notFound = () => s3Error("NoSuchKey", 404);
/** A dropped connection: no HTTP status, because there was no response. */
const transportFailure = () => s3Error("Http", undefined);

/** Controls for steering the mock from inside a test. */
interface MockControls {
  storage: Map<string, Uint8Array>;
  /** Calls to `putObject` + successful `putObjectIfMatch` writes. */
  writes: number;
  /** Highest number of `getObject` calls in flight at once. */
  peakConcurrentGets: number;
  /** Reject the next `getObject` calls with this, until cleared. */
  failGetWith?: () => Error;
  /** Reject `putObjectIfMatch` with this instead of writing. */
  failPutIfMatchWith?: () => Error;
  /** Answer `putObjectIfMatch` with a precondition failure. */
  putIfMatchConflict: boolean;
  /**
   * Hold `getObject` open until the returned promise is resolved by hand.
   * Lets the in-flight guard be asserted without racing the clock.
   */
  holdGet?: { promise: Promise<void>; release: () => void };
  /** Runs after a `getObject` resolves — the window a steal happens in. */
  afterGet?: () => void;
}

/**
 * In-memory mock of S3Client for testing lock mechanics. Models etags and
 * If-Match because the heartbeat fences its write with them.
 */
function createMockS3Client(): S3Client & MockControls {
  const storage = new Map<string, Uint8Array>();
  const putTimes = new Map<string, Date>();
  const etags = new Map<string, string>();
  let etagSeq = 0;

  const write = (key: string, body: Uint8Array) => {
    storage.set(key, body);
    putTimes.set(key, new Date());
    etags.set(key, `"etag-${++etagSeq}"`);
  };

  let inFlightGets = 0;

  const mock = {
    storage,
    writes: 0,
    peakConcurrentGets: 0,
    putIfMatchConflict: false,

    putObject(key: string, body: Uint8Array): Promise<void> {
      mock.writes++;
      write(key, body);
      return Promise.resolve();
    },

    putObjectConditional(key: string, body: Uint8Array): Promise<boolean> {
      if (storage.has(key)) return Promise.resolve(false);
      write(key, body);
      return Promise.resolve(true);
    },

    putObjectIfMatch(
      key: string,
      body: Uint8Array,
      etag: string | null,
    ): Promise<{ etag?: string } | null> {
      if (mock.failPutIfMatchWith) {
        return Promise.reject(mock.failPutIfMatchWith());
      }
      if (mock.putIfMatchConflict) return Promise.resolve(null);
      const current = etags.get(key) ?? null;
      if (etag === null ? storage.has(key) : current !== etag) {
        return Promise.resolve(null);
      }
      mock.writes++;
      write(key, body);
      return Promise.resolve({ etag: etags.get(key) });
    },

    async getObject(
      key: string,
    ): Promise<{ data: Uint8Array; etag?: string }> {
      inFlightGets++;
      mock.peakConcurrentGets = Math.max(
        mock.peakConcurrentGets,
        inFlightGets,
      );
      try {
        if (mock.holdGet) await mock.holdGet.promise;
        if (mock.failGetWith) throw mock.failGetWith();
        const data = storage.get(key);
        if (!data) throw notFound();
        const result = { data, etag: etags.get(key) };
        mock.afterGet?.();
        return result;
      } finally {
        inFlightGets--;
      }
    },

    deleteObject(key: string): Promise<void> {
      storage.delete(key);
      putTimes.delete(key);
      etags.delete(key);
      return Promise.resolve();
    },

    headObject(
      key: string,
    ): Promise<
      { exists: boolean; size?: number; lastModified?: Date; etag?: string }
    > {
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        lastModified: putTimes.get(key) ?? new Date(),
        etag: etags.get(key),
      });
    },
  } as unknown as S3Client & MockControls;

  return mock;
}

/**
 * Captures `console.warn` for the duration of `fn`. The lock warns on every
 * path this file asserts, and an uncaptured warn both pollutes test output
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

Deno.test("S3Lock: acquire and release", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  await lock.acquire();

  assertEquals(mock.storage.has(".datastore.lock"), true);
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("S3Lock: release is idempotent", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  await lock.acquire();
  await lock.release();
  await lock.release(); // Should not throw
});

Deno.test("S3Lock: withLock executes callback and releases", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  const result = await lock.withLock(() => {
    assertEquals(mock.storage.has(".datastore.lock"), true);
    return Promise.resolve(42);
  });

  assertEquals(result, 42);
  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("S3Lock: withLock releases on error", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  try {
    await lock.withLock(() => {
      return Promise.reject(new Error("test error"));
    });
  } catch {
    // Expected
  }

  assertEquals(mock.storage.has(".datastore.lock"), false);
});

Deno.test("S3Lock: second acquire times out when lock is held", async () => {
  const mock = createMockS3Client();
  const lock1 = new S3Lock(mock, { ttlMs: 60_000 });
  const lock2 = new S3Lock(mock, {
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

Deno.test("S3Lock: stale lock is force-acquired", async () => {
  const mock = createMockS3Client();

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

  // Override headObject to return stale lastModified
  const originalHead = mock.headObject.bind(mock);
  (mock as unknown as Record<string, unknown>).headObject = (key: string) => {
    if (key === ".datastore.lock") {
      return Promise.resolve({
        exists: true,
        size: body.length,
        lastModified: new Date(Date.now() - 120_000),
      });
    }
    return originalHead(key);
  };

  const lock = new S3Lock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.pid, Deno.pid);

  await lock.release();
});

Deno.test("S3Lock: inspect returns null when no lock exists", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });
  const info = await lock.inspect();
  assertEquals(info, null);
});

Deno.test("S3Lock: forceRelease deletes lock when nonce matches", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const info = await lock.inspect();
  assertEquals(info !== null, true);

  const released = await lock.forceRelease(info!.nonce!);
  assertEquals(released, true);

  assertEquals(mock.storage.has(".datastore.lock"), false);

  // Clean up internal state (heartbeat)
  await lock.release();
});

Deno.test("S3Lock: forceRelease returns false when nonce does not match", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });
  await lock.acquire();

  const released = await lock.forceRelease("wrong-nonce");
  assertEquals(released, false);

  assertEquals(mock.storage.has(".datastore.lock"), true);

  await lock.release();
});

Deno.test("S3Lock: forceRelease returns false when no lock exists", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  const released = await lock.forceRelease("some-nonce");
  assertEquals(released, false);
});

Deno.test("S3Lock: custom lock key", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, {
    lockKey: "custom.lock",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("custom.lock"), true);
  assertEquals(mock.storage.has(".datastore.lock"), false);

  await lock.release();
});

Deno.test("S3Lock: namespace scopes lock key under namespace prefix", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, {
    namespace: "my-ns",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("my-ns/.datastore.lock"), true);
  assertEquals(mock.storage.has(".datastore.lock"), false);

  await lock.release();
});

Deno.test("S3Lock: namespace with custom lock key", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, {
    lockKey: ".locks/global.lock",
    namespace: "my-ns",
    ttlMs: 5000,
  });

  await lock.acquire();
  assertEquals(mock.storage.has("my-ns/.locks/global.lock"), true);
  assertEquals(mock.storage.has(".locks/global.lock"), false);

  await lock.release();
});

// --- Conformance suite: verifies S3Lock satisfies the DistributedLock contract ---

Deno.test("S3Lock: passes DistributedLock conformance suite", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });
  await assertLockConformance(lock);
});

// --- DEF-3B: stale-lock steal applies backoff before retry ---------------

Deno.test("S3Lock: stale-lock steal path applies 200-500ms backoff", async () => {
  const mock = createMockS3Client();

  // Plant a stale lock. headObject will return an old lastModified.
  const staleLock: LockInfo = {
    holder: "stale@host",
    hostname: "host",
    pid: 99999,
    acquiredAt: new Date(Date.now() - 120_000).toISOString(),
    ttlMs: 5000,
  };
  const body = new TextEncoder().encode(JSON.stringify(staleLock, null, 2));
  mock.storage.set(".datastore.lock", body);

  // Force headObject to report the lock as stale.
  (mock as unknown as Record<string, unknown>).headObject = (key: string) => {
    if (key === ".datastore.lock") {
      return Promise.resolve({
        exists: true,
        size: body.length,
        lastModified: new Date(Date.now() - 120_000),
      });
    }
    return Promise.resolve({ exists: false });
  };

  const lock = new S3Lock(mock, { ttlMs: 5000, retryIntervalMs: 0 });
  const start = Date.now();
  await lock.acquire();
  const elapsed = Date.now() - start;

  // First conditional write fails (stale lock present), steal path fires,
  // backoff sleeps in [200, 500) ms, second conditional write succeeds.
  // Assert the backoff actually ran — elapsed must be >= 200 ms even on a
  // fast machine. (Upper bound isn't asserted to keep the test non-flaky.)
  assertEquals(
    elapsed >= 200,
    true,
    `expected >=200ms backoff on stale-steal, got ${elapsed}ms`,
  );

  await lock.release();
});

// --- DEF-4: release() skips delete when the lock has been taken over -----

Deno.test("S3Lock: release skips deleteObject when nonce has changed", async () => {
  const mock = createMockS3Client();
  let deleteCount = 0;
  const originalDelete = mock.deleteObject.bind(mock);
  (mock as unknown as Record<string, unknown>).deleteObject = (key: string) => {
    deleteCount++;
    return originalDelete(key);
  };

  const lock = new S3Lock(mock, { ttlMs: 5000 });
  await lock.acquire();
  assertEquals(mock.storage.has(".datastore.lock"), true);

  // Simulate another process legitimately stealing the lock while our
  // process was paused (e.g. a long GC). The stored lock body no longer
  // carries our nonce.
  const successorLock: LockInfo = {
    holder: "successor@host",
    hostname: "host",
    pid: 12345,
    acquiredAt: new Date().toISOString(),
    ttlMs: 5000,
    nonce: "SUCCESSOR-NONCE",
  };
  mock.storage.set(
    ".datastore.lock",
    new TextEncoder().encode(JSON.stringify(successorLock, null, 2)),
  );

  // release() must NOT delete the successor's lock.
  await lock.release();

  assertEquals(
    deleteCount,
    0,
    "release() called deleteObject despite nonce mismatch — would orphan successor",
  );
  assertEquals(
    mock.storage.has(".datastore.lock"),
    true,
    "successor's lock must still be present after our release()",
  );
});

Deno.test("S3Lock: release deletes normally when we still hold the lock", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  await lock.acquire();
  assertEquals(mock.storage.has(".datastore.lock"), true);
  await lock.release();
  assertEquals(
    mock.storage.has(".datastore.lock"),
    false,
    "uncontested release must delete the lock object",
  );
});

// --- #1980-F1: holderContext appears in lock body --------------------------

Deno.test("S3Lock: holderContext is embedded in the lock body", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, {
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

Deno.test("S3Lock: lock body omits context when holderContext not provided", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  await lock.acquire();
  const info = await lock.inspect();
  assertEquals(info !== null, true);
  assertEquals(info!.context, undefined);

  await lock.release();
});

// --- #1980-F2: exponential backoff reduces S3 operations -------------------

Deno.test("S3Lock: exponential backoff reduces operations under contention", async () => {
  const mock = createMockS3Client();
  const holder = new S3Lock(mock, { ttlMs: 60_000 });
  await holder.acquire();

  let putConditionalCount = 0;
  const origPutCond = mock.putObjectConditional.bind(mock);
  (mock as unknown as Record<string, unknown>).putObjectConditional = (
    key: string,
    body: Uint8Array,
  ) => {
    putConditionalCount++;
    return origPutCond(key, body);
  };

  const waiter = new S3Lock(mock, {
    ttlMs: 60_000,
    retryIntervalMs: 10,
    maxRetryIntervalMs: 100,
    maxWaitMs: 1_500,
  });

  await assertRejects(() => waiter.acquire(), LockTimeoutError);

  // With fixed 10ms interval over 1.5s: ~150 attempts.
  // With exponential backoff (10, 20, 40, 80, 100, 100, ...): far fewer.
  // Each iteration does putObjectConditional + getObject + headObject.
  assertEquals(
    putConditionalCount < 80,
    true,
    `expected backoff to reduce attempts, got ${putConditionalCount} putObjectConditional calls`,
  );

  await holder.release();
});

// --- #1980-F3: LockTimeoutError carries structured metadata ----------------

Deno.test("S3Lock: LockTimeoutError has code and retryable fields", async () => {
  const mock = createMockS3Client();
  const holder = new S3Lock(mock, { ttlMs: 60_000 });
  await holder.acquire();

  const waiter = new S3Lock(mock, {
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

Deno.test("S3Lock: LockTimeoutError message includes holderContext", async () => {
  const mock = createMockS3Client();
  const holder = new S3Lock(mock, {
    ttlMs: 60_000,
    holderContext: { model: "my-model", method: "run" },
  });
  await holder.acquire();

  const waiter = new S3Lock(mock, {
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

// --- #2298: a transient read failure must not abandon the lock ------------
//
// The heartbeat verifies ownership by reading the lock before extending it.
// Every one of these tests turns on the same question: does an answer the
// lock could not interpret get treated as "someone took it from me"?

/** Drives a lock through an outage and reports writes either side of it. */
async function outage(
  failWith: () => Error,
): Promise<{ warnings: string[]; before: number; after: number }> {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat
  let before = 0;
  let after = 0;

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(250); // two healthy ticks

    mock.failGetWith = failWith;
    await sleep(150); // one tick's worth of outage
    mock.failGetWith = undefined;
    before = mock.writes;

    await sleep(350); // three ticks after recovery
    after = mock.writes;
    await lock.release();
  });

  return { warnings, before, after };
}

Deno.test("S3Lock: heartbeat survives a transport failure mid-run", async () => {
  const { warnings, before, after } = await outage(transportFailure);

  assertEquals(
    after > before,
    true,
    `heartbeat stopped permanently after a transient read error ` +
      `(writes stuck at ${after}) — the lock was silently abandoned`,
  );
  assertEquals(
    warnings.some((w) => w.includes("could not confirm")),
    true,
    `expected a warning about the unconfirmed extend, got: ${
      JSON.stringify(warnings)
    }`,
  );
  // "Could not confirm" is not "someone took it" — saying so would be a lie
  // at the moment it's said, and the whole point of this fix.
  assertEquals(
    warnings.some((w) => w.includes("lost")),
    false,
    `an unconfirmed extend must not claim the lock was lost: ${
      JSON.stringify(warnings)
    }`,
  );
});

Deno.test("S3Lock: heartbeat survives a 403 mid-run", async () => {
  // An auth failure means "cannot verify", not "no longer mine". A lock
  // dropped on a transient 403 hands the model to a second runner.
  const { before, after } = await outage(() => s3Error("AccessDenied", 403));

  assertEquals(
    after > before,
    true,
    `heartbeat stopped after a 403 (writes stuck at ${after})`,
  );
});

Deno.test("S3Lock: one warning per outage, not one per tick", async () => {
  const { warnings } = await outage(transportFailure);

  const unconfirmed = warnings.filter((w) => w.includes("could not confirm"));
  assertEquals(
    unconfirmed.length,
    1,
    `expected exactly one warning for a single outage, got ${unconfirmed.length}: ${
      JSON.stringify(unconfirmed)
    }`,
  );
});

Deno.test("S3Lock: heartbeat stops and warns when the lock is genuinely taken", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(150);

    // A successor legitimately owns the lock now — a foreign nonce is the
    // one signal that genuinely settles the question.
    mock.storage.set(
      ".datastore.lock",
      new TextEncoder().encode(JSON.stringify({
        holder: "successor@host",
        hostname: "host",
        pid: 999,
        acquiredAt: new Date().toISOString(),
        ttlMs: 300,
        nonce: "SUCCESSOR-NONCE",
      })),
    );

    await sleep(150);
    const afterLoss = mock.writes;
    await sleep(250);
    assertEquals(
      mock.writes,
      afterLoss,
      "heartbeat kept writing after ownership was genuinely lost",
    );
    await lock.release();
  });

  assertEquals(
    warnings.some((w) => w.includes("lost") && w.includes(".datastore.lock")),
    true,
    `losing the lock mid-run must be loud, got: ${JSON.stringify(warnings)}`,
  );
});

// --- #2298: the heartbeat write is fenced ---------------------------------

Deno.test("S3Lock: heartbeat does not clobber a lock stolen mid-extend", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();

    // Steal the lock in the window between the heartbeat's read and its
    // write — the race the unconditional putObject used to lose.
    let stolen = false;
    mock.afterGet = () => {
      if (stolen) return;
      stolen = true;
      mock.storage.set(
        ".datastore.lock",
        new TextEncoder().encode(JSON.stringify({
          holder: "successor@host",
          hostname: "host",
          pid: 999,
          acquiredAt: new Date().toISOString(),
          ttlMs: 300,
          nonce: "SUCCESSOR-NONCE",
        })),
      );
      // A real steal rewrites the object, so the etag we read is stale.
      mock.putIfMatchConflict = true;
    };

    await sleep(150);

    const body = new TextDecoder().decode(mock.storage.get(".datastore.lock")!);
    assertEquals(
      body.includes("SUCCESSOR-NONCE"),
      true,
      "heartbeat overwrote the successor's lock body",
    );

    // The CAS failure alone is inconclusive, so the heartbeat lives on and
    // the next read settles it.
    mock.putIfMatchConflict = false;
    mock.afterGet = undefined;
    await sleep(150);
    const settled = mock.writes;
    await sleep(250);
    assertEquals(
      mock.writes,
      settled,
      "heartbeat kept writing after the next read saw a foreign nonce",
    );

    await lock.release();
  });

  assertEquals(
    warnings.some((w) => w.includes("lost")),
    true,
    `the eventual genuine loss must be reported: ${JSON.stringify(warnings)}`,
  );
});

Deno.test("S3Lock: a CAS conflict alone does not stop the heartbeat", async () => {
  // putObjectIfMatch collapses 412 and 409 into one null, and 409 is mere
  // contention. Treating that null as proof of loss would reintroduce #2298
  // on the write path.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  await captureWarnings(async () => {
    await lock.acquire();
    mock.putIfMatchConflict = true;
    await sleep(250);
    mock.putIfMatchConflict = false;

    const before = mock.writes;
    await sleep(250);
    assertEquals(
      mock.writes > before,
      true,
      "heartbeat stopped after a CAS conflict, despite still owning the lock",
    );
    await lock.release();
  });
});

Deno.test("S3Lock: falls back to unconditional puts when If-Match is unsupported", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failPutIfMatchWith = () => s3Error("NotImplemented", 501);
    await sleep(350);

    assertEquals(
      mock.writes > 0,
      true,
      "heartbeat wrote nothing against an endpoint without If-Match support",
    );
    await lock.release();
  });

  const unsupported = warnings.filter((w) => w.includes("If-Match"));
  assertEquals(
    unsupported.length,
    1,
    `expected exactly one If-Match fallback warning, got: ${
      JSON.stringify(unsupported)
    }`,
  );
});

Deno.test("S3Lock: IfMatchUnsupportedError takes the same unconditional fallback", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failPutIfMatchWith = () =>
      new IfMatchUnsupportedError("rejected the current ETag in both forms");
    await sleep(350);

    assertEquals(
      mock.writes > 0,
      true,
      "heartbeat wrote nothing against an endpoint that can't CAS",
    );
    await lock.release();
  });

  assertEquals(warnings.filter((w) => w.includes("If-Match")).length, 1);
  assertEquals(warnings.filter((w) => w.includes("was lost")), []);
});

// sanitizeResources: false — the AWS SDK's pooled connections outlive the
// test body but are reclaimed by GC.
Deno.test({
  name:
    "S3Lock: heartbeat holds past the TTL on an endpoint that rejects quoted If-Match (swamp-club #2337)",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator({ quotedIfMatch: "reject" }, async (s3, state) => {
      const ttlMs = 600;
      const lock = new S3Lock(s3, { ttlMs });
      let held = false;
      const warnings = await captureWarnings(async () => {
        await lock.acquire();
        try {
          // Three TTLs: before the fix the hold was given up after one.
          await sleep(ttlMs * 3);
          held = (lock as unknown as { held: boolean }).held;
        } finally {
          await lock.release();
        }
      });

      assertEquals(held, true, "the lock gave itself up while held");
      assertEquals(warnings.filter((w) => w.includes("was lost")), []);
      assertEquals(
        state.requests.some((r) =>
          r.key === ".datastore.lock" && r.method === "PUT" &&
          r.status === 200 && r.ifMatch !== null && !r.ifMatch.startsWith('"')
        ),
        true,
        "heartbeat writes must land with an unquoted If-Match",
      );
    }),
});

// --- #2298: ticks must not overlap ----------------------------------------

Deno.test("S3Lock: a slow extend does not start a second one", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  await captureWarnings(async () => {
    await lock.acquire();

    // Hold the heartbeat's read open across two tick boundaries. Without an
    // in-flight guard each tick piles another request onto an endpoint that
    // is, by definition, already struggling.
    let release!: () => void;
    const promise = new Promise<void>((r) => {
      release = r;
    });
    mock.holdGet = { promise, release };

    await sleep(250); // two further ticks fire while the first is stuck
    mock.holdGet = undefined;
    release();
    await sleep(50);

    assertEquals(
      mock.peakConcurrentGets,
      1,
      `overlapping heartbeat ticks ran concurrently (peak ${mock.peakConcurrentGets}) ` +
        `— the in-flight guard is missing`,
    );

    await lock.release();
  });
});

Deno.test("S3Lock: a throwing tick does not wedge the heartbeat", async () => {
  // The in-flight flag has to clear in a finally. Cleared on the success
  // path only, a single throw wedges it true and silently disables the
  // heartbeat for the rest of the run — #2298 all over again.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  await captureWarnings(async () => {
    await lock.acquire();
    mock.failPutIfMatchWith = () => s3Error("InternalError", 500);
    await sleep(150);
    mock.failPutIfMatchWith = undefined;

    const before = mock.writes;
    await sleep(250);
    assertEquals(
      mock.writes > before,
      true,
      "heartbeat never wrote again after a tick threw",
    );
    await lock.release();
  });
});

Deno.test("S3Lock: a throwing heartbeat write is reported, not swallowed", async () => {
  // extend()'s try/catch covered only the read. A 5xx on the PUT escaped
  // into startHeartbeat's `.catch(() => {})`: no warning, no counter, no
  // sign at all that the lock had stopped being extended.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failPutIfMatchWith = () => s3Error("InternalError", 500);
    await sleep(150); // one tick's worth of failing writes
    mock.failPutIfMatchWith = undefined;
    await lock.release();
  });

  assertEquals(
    warnings.some((w) => w.includes("could not confirm")),
    true,
    `a failing heartbeat write must warn, got: ${JSON.stringify(warnings)}`,
  );
});

Deno.test("S3Lock: gives up once the outage outlasts the TTL", async () => {
  // Holding through an inconclusive tick is right; holding forever is not.
  // Past ttlMs with nothing confirmed, every contender is entitled to
  // delete the object and take over — so a holder that keeps running is the
  // #2298 double-execution, just reached the long way round.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failGetWith = transportFailure;
    await sleep(600); // twice the TTL with nothing confirmed
  });

  const before = mock.writes;
  mock.failGetWith = undefined;
  await sleep(250);

  assertEquals(
    mock.writes,
    before,
    "heartbeat kept extending a lock that is already stealable by anyone",
  );
  assertEquals(
    warnings.some((w) => w.includes("lost")),
    true,
    `expected the hold to end once it outlived the TTL, got: ${
      JSON.stringify(warnings)
    }`,
  );
  // The first tick of the outage is still only "could not confirm" — the
  // grace period has to come before the verdict, not instead of it.
  assertEquals(
    warnings[0].includes("could not confirm"),
    true,
    `the first outage warning must not claim loss: ${JSON.stringify(warnings)}`,
  );

  await lock.release();
});

// --- #2298: the other readLock() callers ----------------------------------

Deno.test("S3Lock: release leaves the lock alone when ownership can't be verified", async () => {
  const mock = createMockS3Client();
  let deleteCount = 0;
  const originalDelete = mock.deleteObject.bind(mock);
  (mock as unknown as Record<string, unknown>).deleteObject = (key: string) => {
    deleteCount++;
    return originalDelete(key);
  };

  const lock = new S3Lock(mock, { ttlMs: 5000 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    mock.failGetWith = transportFailure;
    await lock.release();
  });

  assertEquals(
    deleteCount,
    0,
    "release deleted a lock it could not prove was still ours",
  );
  assertEquals(
    warnings.some((w) => w.includes("could not verify")),
    true,
    `an unverifiable release must say so, got: ${JSON.stringify(warnings)}`,
  );
});

Deno.test("S3Lock: inspect reports a read failure instead of an empty lock", async () => {
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 5000 });

  // Absent is still null — that is what `inspect()` promises.
  assertEquals(await lock.inspect(), null);

  // But "S3 is unreachable" is not "nobody holds the lock".
  mock.failGetWith = transportFailure;
  await assertRejects(() => lock.inspect(), S3OperationError);
});

Deno.test("S3Lock: acquire survives a read failure during the stale check", async () => {
  const mock = createMockS3Client();
  const holder = new S3Lock(mock, { ttlMs: 5000 });
  await holder.acquire();

  // A blip while we're checking whether the held lock is stale must not
  // abort acquisition — it just means this attempt learned nothing.
  const contender = new S3Lock(mock, {
    ttlMs: 5000,
    maxWaitMs: 300,
    retryIntervalMs: 50,
  });
  let failures = 2;
  mock.failGetWith = () => {
    if (failures-- <= 0) mock.failGetWith = undefined;
    return transportFailure();
  };

  await assertRejects(() => contender.acquire(), LockTimeoutError);
  await holder.release();
});

Deno.test("S3Lock: releasing during an in-flight extend is not a lost lock", async () => {
  // release() clears the nonce while a heartbeat read may still be in
  // flight. Comparing the lock body against a nonce that release() just
  // erased makes a normal shutdown look like a hostile takeover — no second
  // process and no S3 failure required.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 });

  const warnings = await captureWarnings(async () => {
    await lock.acquire();

    let release!: () => void;
    const promise = new Promise<void>((r) => {
      release = r;
    });
    mock.holdGet = { promise, release };

    await sleep(150); // a tick fires and parks on the read
    const releasing = lock.release();
    mock.holdGet = undefined;
    release(); // the parked read now returns, after the nonce is gone
    await releasing;
    await sleep(50);
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a normal release reported the lock as lost mid-operation",
  );
});

// --- #2298: the TTL applies to a request that never comes back ------------

/**
 * Parks the mock's `getObject` on a promise the test settles by hand, and
 * stops parking later reads once it does. `holdGet` on its own can only be
 * resolved; a stalled request that eventually fails is the other half, and
 * both have to be steerable without racing the clock.
 */
function parkGet(
  mock: MockControls,
): { release: () => void; fail: (error: Error) => void } {
  let settle!: (error?: Error) => void;
  const promise = new Promise<void>((resolve, reject) => {
    settle = (error) => {
      mock.holdGet = undefined;
      if (error) reject(error);
      else resolve();
    };
  });
  mock.holdGet = { promise, release: () => settle() };
  return { release: () => settle(), fail: (error: Error) => settle(error) };
}

Deno.test("S3Lock: a stalled heartbeat gives up once the TTL runs out", async () => {
  // Expiry was only ever checked after a request came back. A read that
  // stalls instead of failing parks the in-flight guard, every tick behind it
  // returns early, and the lock stays marked held long past the point where
  // any contender may delete the object — silently, which is the whole of
  // #2298 reached by a slow path instead of a failing one.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat
  const parked = parkGet(mock);

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    await sleep(650); // twice the TTL with the read still parked
  });

  const atGiveUp = mock.writes;

  assertEquals(
    warnings.some((w) => w.includes("lost")),
    true,
    `a heartbeat stalled past the TTL must end the hold, got: ${
      JSON.stringify(warnings)
    }`,
  );

  // And the answer arriving afterwards does not bring the hold back.
  parked.release();
  await sleep(250);
  assertEquals(
    mock.writes,
    atGiveUp,
    "a read that returned after the TTL revived an expired hold",
  );

  await lock.release();
});

Deno.test("S3Lock: a heartbeat failure after release is not a lost lock", async () => {
  // Sibling of "releasing during an in-flight extend", for the parked read
  // that *fails* rather than returning. Shutdown had already completed, so
  // reporting the lock lost mid-operation is a lie — and past the TTL that is
  // exactly what the failure path escalated to.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    const parked = parkGet(mock);

    await sleep(150); // a tick fires and parks on the read
    mock.holdGet = undefined; // release()'s own read must not park too
    await lock.release();

    await sleep(400); // the abandoned hold outlives its TTL
    parked.fail(transportFailure());
    await sleep(50);
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a heartbeat that failed after a clean release reported a lost lock",
  );
});

Deno.test("S3Lock: a parked heartbeat from a previous hold does not stall the next one", async () => {
  // S3Lock is reusable, and the in-flight guard was instance-wide. A read
  // still parked when release() returns left it set for a hold that no longer
  // existed: every tick of the next acquisition skipped its request and then
  // expired a lock that was never in trouble. The parked read returning is
  // the other half — under the new hold it is neither releasing nor unheld,
  // so it went on to judge the new lock against the old body.
  const mock = createMockS3Client();
  const lock = new S3Lock(mock, { ttlMs: 300 }); // 100ms heartbeat

  const warnings = await captureWarnings(async () => {
    await lock.acquire();
    const parked = parkGet(mock);

    await sleep(150); // a tick fires and parks on the read
    mock.holdGet = undefined; // release()'s own read must not park too
    await lock.release();

    await lock.acquire(); // same instance, new hold
    const before = mock.writes;
    await sleep(250); // two ticks of the new hold

    assertEquals(
      mock.writes > before,
      true,
      "the new hold made no heartbeat writes — a stale in-flight guard " +
        "skipped every tick",
    );

    parked.release(); // the previous hold's read finally returns
    await sleep(150);
    await lock.release();
  });

  assertEquals(
    warnings.filter((w) => w.includes("was lost")),
    [],
    "a heartbeat left over from a previous hold reported the new lock lost",
  );
});
