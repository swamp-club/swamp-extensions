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

// Unit tests for the format guard that keeps the v2 file sync off a v3
// datastore (swamp-club#3549). Its wiring into the sync service is tested in
// s3_cache_sync_test.ts.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertSyncableDatastoreFormat,
  DATASTORE_FORMAT_MAX_FAILED_READS,
  DATASTORE_FORMAT_UNSUPPORTED_CODE,
  DatastoreFormatGate,
  DatastoreFormatUnsupportedError,
} from "./s3_format_guard.ts";

const encode = (value: unknown): Uint8Array =>
  new TextEncoder().encode(
    typeof value === "string" ? value : JSON.stringify(value),
  );

Deno.test("assertSyncableDatastoreFormat: no marker and format 1 or 2 pass", () => {
  assertSyncableDatastoreFormat(null);
  assertSyncableDatastoreFormat(encode({ format: 1 }));
  assertSyncableDatastoreFormat(encode({ format: 2 }));
  assertSyncableDatastoreFormat(
    encode({ format: 2, minReaderFormat: 2, writtenBy: "20261001.0.0" }),
  );
});

Deno.test("assertSyncableDatastoreFormat: format 3 refuses with core's code and an upgrade-to-latest message", () => {
  const error = assertThrows(
    () =>
      assertSyncableDatastoreFormat(
        encode({ format: 3, writtenBy: "20261016.120000.0" }),
      ),
    DatastoreFormatUnsupportedError,
  );
  assertEquals(error.code, DATASTORE_FORMAT_UNSUPPORTED_CODE);
  assertEquals(error.code, "datastore_format_unsupported");
  assertEquals(
    error.message,
    "This datastore uses format 3 (written by swamp 20261016.120000.0), " +
      "which this swamp release can't open. Upgrade swamp to the latest " +
      "release (`swamp update`). Nothing was synced.",
  );
  // An old binary sees only the message, so it must not name the guard
  // release, which refuses a v3 bucket too.
  assert(!error.message.includes("20261008.201010.0"));
});

Deno.test("assertSyncableDatastoreFormat: no written-by clause without writtenBy", () => {
  const error = assertThrows(
    () => assertSyncableDatastoreFormat(encode({ format: 4 })),
    DatastoreFormatUnsupportedError,
  );
  assertEquals(
    error.message,
    "This datastore uses format 4, which this swamp release can't open. " +
      "Upgrade swamp to the latest release (`swamp update`). Nothing was " +
      "synced.",
  );
});

Deno.test("assertSyncableDatastoreFormat: writtenBy is stripped of control characters and truncated", () => {
  const error = assertThrows(
    () =>
      assertSyncableDatastoreFormat(
        encode({ format: 3, writtenBy: `\u001b[31m${"x".repeat(100)}` }),
      ),
    DatastoreFormatUnsupportedError,
  );
  assert(!error.message.includes("\u001b"));
  assertStringIncludes(
    error.message,
    `(written by swamp [31m${"x".repeat(60)}…)`,
  );
});

Deno.test("assertSyncableDatastoreFormat: minReaderFormat decides, not format", () => {
  assertThrows(
    () =>
      assertSyncableDatastoreFormat(encode({ format: 4, minReaderFormat: 3 })),
    DatastoreFormatUnsupportedError,
  );
  // A newer format that an older reader may still read stays syncable.
  assertSyncableDatastoreFormat(encode({ format: 3, minReaderFormat: 2 }));
});

Deno.test("assertSyncableDatastoreFormat: a garbled marker refuses", () => {
  for (
    const [bytes, reason] of [
      [encode("marker"), "not valid JSON"],
      [new Uint8Array([0xff, 0xfe]), "not valid JSON"],
      [encode([3]), "not a JSON object"],
      [encode("null"), "not a JSON object"],
      [encode({ format: "3" }), "format must be a positive integer"],
      [encode({ format: 0 }), "format must be a positive integer"],
      [encode({ format: 2.5 }), "format must be a positive integer"],
      [encode({}), "format must be a positive integer"],
      [
        encode({ format: 2, minReaderFormat: -1 }),
        "minReaderFormat must be a positive integer",
      ],
      [encode({ format: 2, writtenBy: 7 }), "writtenBy must be a string"],
      [new Uint8Array(64 * 1024 + 1), "larger than 65536 bytes"],
    ] as const
  ) {
    const error = assertThrows(
      () => assertSyncableDatastoreFormat(bytes),
      DatastoreFormatUnsupportedError,
    );
    assertEquals(error.code, DATASTORE_FORMAT_UNSUPPORTED_CODE);
    assertStringIncludes(error.message, `(${reason})`);
    assertStringIncludes(error.message, "Nothing was synced.");
  }
});

Deno.test("DatastoreFormatGate: reads the marker once and shares the result", async () => {
  let reads = 0;
  const gate = new DatastoreFormatGate(() => {
    reads++;
    return Promise.resolve(encode({ format: 2 }));
  }, "[test]");
  await Promise.all([gate.ensure(), gate.ensure()]);
  await gate.ensure();
  assertEquals(reads, 1);
});

Deno.test("DatastoreFormatGate: a refusal is cached", async () => {
  let reads = 0;
  const gate = new DatastoreFormatGate(() => {
    reads++;
    return Promise.resolve(encode({ format: 3 }));
  }, "[test]");
  await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
  await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
  assertEquals(reads, 1);
});

Deno.test("DatastoreFormatGate: a failed read fails open", async () => {
  const debug = console.debug;
  const logged: string[] = [];
  console.debug = (message: string) => logged.push(message);
  try {
    const gate = new DatastoreFormatGate(
      () => Promise.reject(new Error("AccessDenied")),
      "[test]",
    );
    await gate.ensure();
    assertEquals(logged.length, 1);
    assertStringIncludes(logged[0], "[test]");
    assertStringIncludes(logged[0], "AccessDenied");
  } finally {
    console.debug = debug;
  }
});

Deno.test("DatastoreFormatGate: a read past the deadline fails open and is aborted", async () => {
  const debug = console.debug;
  console.debug = () => {};
  try {
    let readSignal: AbortSignal | undefined;
    const gate = new DatastoreFormatGate(
      (signal) => {
        readSignal = signal;
        // Never settles: the deadline must not wait on the read.
        return new Promise<Uint8Array | null>(() => {});
      },
      "[test]",
      10,
    );
    await gate.ensure();
    assertEquals(readSignal?.aborted, true);
  } finally {
    console.debug = debug;
  }
});

Deno.test("DatastoreFormatGate: one caller's abort rejects only that caller and is not cached", async () => {
  let release!: (bytes: Uint8Array | null) => void;
  let reads = 0;
  let readSignal: AbortSignal | undefined;
  const gate = new DatastoreFormatGate((signal) => {
    reads++;
    readSignal = signal;
    return new Promise<Uint8Array | null>((resolve) => release = resolve);
  }, "[test]");

  const controller = new AbortController();
  const aborted = gate.ensure(controller.signal);
  const waiting = gate.ensure();
  controller.abort(new Error("caller gave up"));
  await assertRejects(() => aborted, Error, "caller gave up");
  // The shared read never saw the caller's signal.
  assertEquals(readSignal?.aborted, false);

  release(null);
  await waiting;
  await gate.ensure();
  assertEquals(reads, 1);
});

Deno.test("DatastoreFormatGate: an already-aborted caller rejects without reading", async () => {
  let reads = 0;
  const gate = new DatastoreFormatGate(() => {
    reads++;
    return Promise.resolve(null);
  }, "[test]");
  const controller = new AbortController();
  controller.abort(new Error("gone"));
  await assertRejects(() => gate.ensure(controller.signal), Error, "gone");
  assertEquals(reads, 0);
});

/** Runs `fn` with console.debug silenced, returning what it logged. */
async function withQuietDebug(fn: () => Promise<void>): Promise<string[]> {
  const debug = console.debug;
  const logged: string[] = [];
  console.debug = (message: string) => logged.push(message);
  try {
    await fn();
  } finally {
    console.debug = debug;
  }
  return logged;
}

Deno.test("DatastoreFormatGate: a failed read is not cached, so a later read still refuses", async () => {
  await withQuietDebug(async () => {
    const answers: Array<() => Promise<Uint8Array | null>> = [
      () => Promise.reject(new Error("slow credentials")),
      () => Promise.resolve(encode({ format: 3 })),
    ];
    let reads = 0;
    const gate = new DatastoreFormatGate(() => answers[reads++](), "[test]");
    await gate.ensure();
    await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
    await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
    assertEquals(reads, 2);
  });
});

Deno.test("DatastoreFormatGate: a marker that was read is cached after earlier failed reads", async () => {
  await withQuietDebug(async () => {
    let reads = 0;
    const gate = new DatastoreFormatGate(
      () =>
        ++reads === 1
          ? Promise.reject(new Error("503"))
          : Promise.resolve(encode({ format: 2 })),
      "[test]",
    );
    await gate.ensure();
    await gate.ensure();
    await gate.ensure();
    assertEquals(reads, 2);
  });
});

Deno.test("DatastoreFormatGate: stops reading after the bounded number of failed reads", async () => {
  const logged = await withQuietDebug(async () => {
    let reads = 0;
    const gate = new DatastoreFormatGate(() => {
      reads++;
      return Promise.reject(new Error("down"));
    }, "[test]");
    for (let i = 0; i < DATASTORE_FORMAT_MAX_FAILED_READS + 3; i++) {
      await gate.ensure();
    }
    assertEquals(reads, DATASTORE_FORMAT_MAX_FAILED_READS);
  });
  assertEquals(logged.length, DATASTORE_FORMAT_MAX_FAILED_READS + 1);
  assertStringIncludes(logged.at(-1)!, "syncs without the format check");
});

Deno.test("DatastoreFormatGate: concurrent callers share one failed read", async () => {
  await withQuietDebug(async () => {
    let reads = 0;
    const gate = new DatastoreFormatGate(() => {
      reads++;
      return Promise.reject(new Error("down"));
    }, "[test]");
    await Promise.all([gate.ensure(), gate.ensure(), gate.ensure()]);
    assertEquals(reads, 1);
  });
});

Deno.test("DatastoreFormatGate: the deadline starts only once credentials are ready", async () => {
  let releaseCredentials!: () => void;
  const credentialsReady = new Promise<void>((resolve) =>
    releaseCredentials = resolve
  );
  let answer!: (bytes: Uint8Array | null) => void;
  const gate = new DatastoreFormatGate(
    () => new Promise<Uint8Array | null>((resolve) => answer = resolve),
    "[test]",
    20,
  );
  const check = gate.ensure(undefined, credentialsReady);
  // Credentials take longer than the whole deadline: the read must still
  // count, and its v3 answer refuse.
  await new Promise((resolve) => setTimeout(resolve, 50));
  releaseCredentials();
  answer(encode({ format: 3 }));
  await assertRejects(() => check, DatastoreFormatUnsupportedError);
});

Deno.test("DatastoreFormatGate: the deadline still applies after credentials are ready", async () => {
  await withQuietDebug(async () => {
    let readSignal: AbortSignal | undefined;
    const gate = new DatastoreFormatGate(
      (signal) => {
        readSignal = signal;
        return new Promise<Uint8Array | null>(() => {});
      },
      "[test]",
      10,
    );
    await gate.ensure(undefined, Promise.resolve());
    assertEquals(readSignal?.aborted, true);
  });
});

Deno.test("DatastoreFormatGate: a failed preflight still starts the deadline", async () => {
  await withQuietDebug(async () => {
    const gate = new DatastoreFormatGate(
      () => new Promise<Uint8Array | null>(() => {}),
      "[test]",
      10,
    );
    const failed = Promise.reject(new Error("bad credentials"));
    failed.catch(() => {});
    await gate.ensure(undefined, failed);
  });
});

Deno.test("DatastoreFormatGate: a read done before credentials are ready leaves no timer", async () => {
  let releaseCredentials!: () => void;
  const credentialsReady = new Promise<void>((resolve) =>
    releaseCredentials = resolve
  );
  const gate = new DatastoreFormatGate(
    () => Promise.resolve(null),
    "[test]",
    60_000,
  );
  await gate.ensure(undefined, credentialsReady);
  // Settling now must not arm the deadline; the test's op sanitizer fails on
  // a timer left running.
  releaseCredentials();
  await credentialsReady;
});

Deno.test("DatastoreFormatGate: inside an operation, a failed read is reused, not read again", async () => {
  await withQuietDebug(async () => {
    let reads = 0;
    const gate = new DatastoreFormatGate(
      () =>
        ++reads === 1
          ? Promise.reject(new Error("down"))
          : Promise.resolve(encode({ format: 3 })),
      "[test]",
    );
    await gate.ensure();
    await gate.ensureWithinOperation();
    await gate.ensureWithinOperation();
    assertEquals(reads, 1);
    // The next operation reads again and refuses at its start; a step of
    // the operation that was let in still runs.
    await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
    await gate.ensureWithinOperation();
    assertEquals(reads, 2);
  });
});

Deno.test("DatastoreFormatGate: a step inside an operation reads when nothing has checked yet", async () => {
  let reads = 0;
  const gate = new DatastoreFormatGate(() => {
    reads++;
    return Promise.resolve(encode({ format: 3 }));
  }, "[test]");
  await assertRejects(
    () => gate.ensureWithinOperation(),
    DatastoreFormatUnsupportedError,
  );
  await assertRejects(() => gate.ensure(), DatastoreFormatUnsupportedError);
  assertEquals(reads, 1);
});

Deno.test("DatastoreFormatGate: an operation starting while a read is in flight shares it", async () => {
  await withQuietDebug(async () => {
    let reads = 0;
    let fail!: () => void;
    const gate = new DatastoreFormatGate(() => {
      reads++;
      return new Promise<Uint8Array | null>((_, reject) =>
        fail = () => reject(new Error("down"))
      );
    }, "[test]");
    const first = gate.ensure();
    const second = gate.ensure();
    fail();
    await Promise.all([first, second]);
    assertEquals(reads, 1);
  });
});

Deno.test("DatastoreFormatGate: an aborted caller inside an operation rejects without reading", async () => {
  let reads = 0;
  const gate = new DatastoreFormatGate(() => {
    reads++;
    return Promise.resolve(null);
  }, "[test]");
  const controller = new AbortController();
  controller.abort(new Error("gone"));
  await assertRejects(
    () => gate.ensureWithinOperation(controller.signal),
    Error,
    "gone",
  );
  assertEquals(reads, 0);
});

Deno.test("DatastoreFormatGate: after a failed read, a step never joins another operation's pending re-read", async () => {
  await withQuietDebug(async () => {
    let reads = 0;
    let answer!: (bytes: Uint8Array | null) => void;
    const gate = new DatastoreFormatGate(() => {
      if (++reads === 1) return Promise.reject(new Error("down"));
      return new Promise<Uint8Array | null>((resolve) => answer = resolve);
    }, "[test]");
    // Operation A is let in after its read fails.
    await gate.ensure();
    // Operation B starts meanwhile and re-reads; the read is still pending.
    const b = gate.ensure();
    // A's next step does not wait on B's read.
    let stepDone = false;
    const step = gate.ensureWithinOperation().then(() => stepDone = true);
    await Promise.resolve();
    await Promise.resolve();
    assertEquals(stepDone, true);
    await step;
    // B's read refuses B, and only B.
    answer(encode({ format: 3 }));
    await assertRejects(() => b, DatastoreFormatUnsupportedError);
    await gate.ensureWithinOperation();
    assertEquals(reads, 2);
  });
});
