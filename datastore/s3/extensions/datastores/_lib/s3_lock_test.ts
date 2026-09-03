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
import type { S3Client } from "./s3_client.ts";
import type { LockInfo } from "./interfaces.ts";

/** In-memory mock of S3Client for testing lock mechanics. */
function createMockS3Client(): S3Client & { storage: Map<string, Uint8Array> } {
  const storage = new Map<string, Uint8Array>();
  const putTimes = new Map<string, Date>();

  return {
    storage,

    putObject(key: string, body: Uint8Array): Promise<void> {
      storage.set(key, body);
      putTimes.set(key, new Date());
      return Promise.resolve();
    },

    putObjectConditional(
      key: string,
      body: Uint8Array,
    ): Promise<boolean> {
      if (storage.has(key)) {
        return Promise.resolve(false);
      }
      storage.set(key, body);
      putTimes.set(key, new Date());
      return Promise.resolve(true);
    },

    getObject(
      key: string,
    ): Promise<{ data: Uint8Array; etag?: string }> {
      const data = storage.get(key);
      if (!data) return Promise.reject(new Error(`NoSuchKey: ${key}`));
      return Promise.resolve({ data });
    },

    deleteObject(key: string): Promise<void> {
      storage.delete(key);
      putTimes.delete(key);
      return Promise.resolve();
    },

    headObject(
      key: string,
    ): Promise<{ exists: boolean; size?: number; lastModified?: Date }> {
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        lastModified: putTimes.get(key) ?? new Date(),
      });
    },
  } as unknown as S3Client & { storage: Map<string, Uint8Array> };
}

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
