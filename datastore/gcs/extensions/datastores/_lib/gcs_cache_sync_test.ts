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

// Tests for GcsCacheSyncService focusing on the swamp-club#29 fix:
// mirrors s3_cache_sync_test.ts behavior since the GCS sync service
// shares the identical internal-file exclusion pattern and scrub
// logic. See swamp-club#29 for the motivating bug.

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import {
  GcsCacheSyncService,
  isInternalCacheFile,
  isRetryableError,
  retryWithBackoff,
} from "./gcs_cache_sync.ts";
import {
  GcsClient,
  GcsOperationError,
  NotFoundError,
  PreconditionFailedError,
} from "./gcs_client.ts";
import type { GcsObjectMetadata, GcsWriteResult } from "./gcs_client.ts";

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/**
 * In-memory mock of GcsClient recording getObject/putObject/getMetadata
 * calls. `generationOverrides` lets a test pin a specific generation
 * string (for example `""` or `"0"` for the unusable-fingerprint case)
 * regardless of stored content. `putFailures` lets a test inject a
 * failure per key for retry / batch-error tests — cleaner than
 * monkey-patching the method and avoids `any`-typed reassignments.
 * Mock method bodies reject SYNCHRONOUSLY on a pre-aborted signal —
 * promise-based rejection would race the fast-path probe and leak a
 * real HEAD call.
 */
function createMockGcsClient(): GcsClient & {
  storage: Map<string, Uint8Array>;
  generationOverrides: Map<string, string>;
  putFailures: Map<string, Error>;
  puts: PutCall[];
  gets: string[];
  heads: string[];
} {
  const storage = new Map<string, Uint8Array>();
  const generations = new Map<string, number>();
  const generationOverrides = new Map<string, string>();
  const putFailures = new Map<string, Error>();
  const puts: PutCall[] = [];
  const gets: string[] = [];
  const heads: string[] = [];

  const nextGen = (key: string): string => {
    const g = (generations.get(key) ?? 0) + 1;
    generations.set(key, g);
    return String(g);
  };

  const genFor = (key: string): string =>
    generationOverrides.get(key) ?? String(generations.get(key) ?? 0);

  const throwIfAborted = (signal?: AbortSignal) => {
    if (signal?.aborted) {
      throw new DOMException("aborted", "AbortError");
    }
  };

  return {
    storage,
    generationOverrides,
    putFailures,
    puts,
    gets,
    heads,

    putObject(
      key: string,
      body: Uint8Array,
      signal?: AbortSignal,
    ): Promise<GcsWriteResult> {
      throwIfAborted(signal);
      const injected = putFailures.get(key);
      if (injected) return Promise.reject(injected);
      storage.set(key, body);
      puts.push({ key, body });
      return Promise.resolve({ generation: nextGen(key) });
    },

    getObject(
      key: string,
      signal?: AbortSignal,
    ): Promise<{ data: Uint8Array; generation?: string }> {
      throwIfAborted(signal);
      gets.push(key);
      const data = storage.get(key);
      if (!data) {
        return Promise.reject(new NotFoundError(`Object not found: ${key}`));
      }
      return Promise.resolve({ data, generation: genFor(key) });
    },

    getMetadata(
      key: string,
      signal?: AbortSignal,
    ): Promise<GcsObjectMetadata> {
      throwIfAborted(signal);
      heads.push(key);
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        updated: new Date(),
        generation: genFor(key),
      });
    },

    listAllObjects(
      _subPrefix?: string,
      signal?: AbortSignal,
    ): Promise<
      Array<{
        key: string;
        size: number;
        generation?: string;
        updated?: Date;
      }>
    > {
      throwIfAborted(signal);
      return Promise.resolve(
        [...storage.entries()].map(([key, body]) => ({
          key,
          size: body.length,
          generation: genFor(key),
        })),
      );
    },
  } as unknown as GcsClient & {
    storage: Map<string, Uint8Array>;
    generationOverrides: Map<string, string>;
    putFailures: Map<string, Error>;
    puts: PutCall[];
    gets: string[];
    heads: string[];
  };
}

/** Seeds a file inside the cache directory, creating parent dirs. */
async function seedFile(
  cachePath: string,
  relPath: string,
  contents: string,
): Promise<void> {
  const full = join(cachePath, relPath);
  const parent = full.substring(0, full.lastIndexOf("/"));
  if (parent && parent !== cachePath) {
    await Deno.mkdir(parent, { recursive: true });
  } else {
    await Deno.mkdir(cachePath, { recursive: true });
  }
  await Deno.writeTextFile(full, contents);
}

/** Encodes an index object as a remote .datastore-index.json body. */
function encodeIndex(
  entries: Record<string, {
    key: string;
    size: number;
    lastModified: string;
    localMtime?: string;
  }>,
): Uint8Array {
  return new TextEncoder().encode(
    JSON.stringify({
      version: 1,
      lastPulled: new Date().toISOString(),
      entries,
    }),
  );
}

/** Decodes a recorded putObject body as a parsed index object. */
function decodeIndex(body: Uint8Array): {
  entries: Record<string, unknown>;
} {
  return JSON.parse(new TextDecoder().decode(body));
}

/** Type assertion helper for reaching private instance state in tests. */
function privateState(service: GcsCacheSyncService): {
  index: { entries: Record<string, unknown> } | null;
  indexMutated: boolean;
} {
  return service as unknown as {
    index: { entries: Record<string, unknown> } | null;
    indexMutated: boolean;
  };
}

// -- (a) push skips _catalog.db, _catalog.db-shm, _catalog.db-wal ----------

Deno.test("pushChanged: skips _catalog.db and its WAL/SHM sidecars", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-a-" });
  try {
    const mock = createMockGcsClient();
    const service = new GcsCacheSyncService(mock, cachePath);

    await seedFile(cachePath, "data/@my-model/payload.yaml", "name: x\n");
    await seedFile(cachePath, "data/_catalog.db", "SQLITE-MAIN");
    await seedFile(cachePath, "data/_catalog.db-shm", "SQLITE-SHM");
    await seedFile(cachePath, "data/_catalog.db-wal", "SQLITE-WAL");

    await service.pushChanged();

    const uploadedKeys = mock.puts.map((p) => p.key);
    assertEquals(
      uploadedKeys.includes("data/@my-model/payload.yaml"),
      true,
      "legitimate payload should be pushed",
    );
    for (const key of uploadedKeys) {
      assertEquals(
        key.includes("_catalog.db"),
        false,
        `catalog file leaked: ${key}`,
      );
    }
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (b) push still skips the pre-existing three internal files -----------

Deno.test("pushChanged: still skips .datastore-index.json/.push-queue.json/.datastore.lock", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-b-" });
  try {
    const mock = createMockGcsClient();
    const service = new GcsCacheSyncService(mock, cachePath);

    await seedFile(cachePath, "data/ok.yaml", "ok: true\n");
    await seedFile(
      cachePath,
      ".datastore-index.json",
      JSON.stringify({
        version: 1,
        lastPulled: new Date().toISOString(),
        entries: {},
      }),
    );
    await seedFile(cachePath, ".push-queue.json", "{}");
    await seedFile(cachePath, ".datastore.lock", "lock");

    await service.pushChanged();

    const uploadedKeys = mock.puts.map((p) => p.key);
    assertEquals(
      uploadedKeys.filter((k) => k === ".push-queue.json").length,
      0,
    );
    assertEquals(
      uploadedKeys.filter((k) => k === ".datastore.lock").length,
      0,
    );
    assertEquals(uploadedKeys.includes("data/ok.yaml"), true);
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (c) walker skip is a safety net beyond scrub -------------------------

Deno.test("pullChanged walker: skips zombies even if re-injected post-scrub", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-c-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 8,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    await seedFile(cachePath, "data/@m/ok.yaml", "ok: yes\n");

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

    const state = privateState(service);
    assertExists(state.index);
    state.index.entries["data/_catalog.db-wal"] = {
      key: "data/_catalog.db-wal",
      size: 1024,
      lastModified: new Date().toISOString(),
    };

    await service.pullChanged();

    assertEquals(
      mock.gets.includes("data/_catalog.db-wal"),
      false,
      "walker must skip zombies regardless of whether scrub caught them",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (d) pull skips zombies from the remote index -------------------------

Deno.test("pullChanged: skips zombie _catalog.db* entries from remote index", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-d-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/payload.yaml": {
          key: "data/@m/payload.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
        },
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 999,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    mock.storage.set(
      "data/@m/payload.yaml",
      new TextEncoder().encode("hi!\n\n"),
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullChanged();

    assertEquals(
      mock.gets.includes("data/@m/payload.yaml"),
      true,
      "legitimate payload must be fetched",
    );
    assertEquals(
      mock.gets.includes("data/_catalog.db-wal"),
      false,
      "zombie must not be fetched",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (e1) pullIndex GCS-fetch path scrubs in-memory AND rewrites local ----

Deno.test("pullIndex GCS-fetch path: scrubs in-memory and rewrites local cache file", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-e1-" });
  try {
    const mock = createMockGcsClient();
    const polluted = {
      "data/@m/ok.yaml": {
        key: "data/@m/ok.yaml",
        size: 3,
        lastModified: new Date().toISOString(),
      },
      "data/_catalog.db": {
        key: "data/_catalog.db",
        size: 100,
        lastModified: new Date().toISOString(),
      },
      "data/_catalog.db-wal": {
        key: "data/_catalog.db-wal",
        size: 200,
        lastModified: new Date().toISOString(),
      },
    };
    mock.storage.set(".datastore-index.json", encodeIndex(polluted));

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

    const state = privateState(service);
    assertExists(state.index);
    assertEquals(
      Object.keys(state.index.entries).sort(),
      ["data/@m/ok.yaml"],
      "in-memory index should contain only the legitimate entry",
    );
    assertEquals(
      state.indexMutated,
      true,
      "indexMutated must be set after scrubbing zombies",
    );

    const localFile = await Deno.readTextFile(
      join(cachePath, ".datastore-index.json"),
    );
    const localParsed = JSON.parse(localFile) as {
      entries: Record<string, unknown>;
    };
    assertEquals(
      Object.keys(localParsed.entries).sort(),
      ["data/@m/ok.yaml"],
      "local cache file must match scrubbed in-memory view",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (e2) pullIndex cache-hit path scrubs in-memory only -----------------

// The cache-hit branch (local `.datastore-index.json` fresh under the
// TTL) must still scrub zombie entries from the in-memory view so the
// rest of the sync pipeline sees a clean index — but it must NOT
// rewrite the local file. Propagation of the scrub to the remote does
// not ride through this path anymore: since swamp-club#30 we
// force-remote on pushChanged, so remote zombies are scrubbed when
// they are actually fetched (covered by test (f)).

Deno.test("pullIndex cache-hit path: scrubs in-memory and leaves local file untouched", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-e2-" });
  try {
    const mock = createMockGcsClient();

    const pollutedJson = JSON.stringify({
      version: 1,
      lastPulled: new Date().toISOString(),
      entries: {
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 3,
          lastModified: new Date().toISOString(),
        },
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 42,
          lastModified: new Date().toISOString(),
        },
      },
    });
    await seedFile(cachePath, ".datastore-index.json", pollutedJson);

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pullIndex();

    assertEquals(
      mock.gets.includes(".datastore-index.json"),
      false,
      "cache-hit branch must not fetch the index from GCS",
    );

    const state = privateState(service);
    assertExists(state.index);
    assertEquals(Object.keys(state.index.entries).sort(), ["data/@m/ok.yaml"]);
    assertEquals(state.indexMutated, true);

    const diskJson = await Deno.readTextFile(
      join(cachePath, ".datastore-index.json"),
    );
    assertEquals(
      diskJson,
      pollutedJson,
      "cache-hit branch must not rewrite the local index file",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (i) self-healing discovery for unindexed buckets (swamp-club #225) ---

// Test A — discovery from a populated bucket without an index.
Deno.test("pullIndex: discovers files when remote index is missing (swamp-club #225)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-225-A-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      "data/@org/m/payload-1.yaml",
      new TextEncoder().encode("hello\n"),
    );
    mock.storage.set(
      "data/@org/m/payload-2.yaml",
      new TextEncoder().encode("world!\n"),
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    const fingerprint = await (service as unknown as {
      pullIndex: (
        opts: { forceRemote: boolean },
      ) => Promise<string | null>;
    }).pullIndex({ forceRemote: true });

    const indexPut = mock.puts.find((p) => p.key === ".datastore-index.json");
    assertExists(indexPut, "discovery must publish a synthesized index");

    const synthesized = JSON.parse(new TextDecoder().decode(indexPut.body));
    assertEquals(
      Object.keys(synthesized.entries).sort(),
      ["data/@org/m/payload-1.yaml", "data/@org/m/payload-2.yaml"],
      "synthesized index keys must match the bucket listing exactly",
    );
    assertEquals(synthesized.entries["data/@org/m/payload-1.yaml"].size, 6);
    assertEquals(synthesized.entries["data/@org/m/payload-2.yaml"].size, 7);

    assertExists(fingerprint, "discovery must return a fingerprint generation");

    const state = privateState(service);
    assertExists(state.index);
    assertEquals(
      Object.keys(state.index.entries).sort(),
      ["data/@org/m/payload-1.yaml", "data/@org/m/payload-2.yaml"],
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// Test B — pullChanged hydrates everything after discovery.
Deno.test("pullChanged: hydrates an unindexed bucket via discovery (swamp-club #225)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-225-B-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      "data/@org/m/a.yaml",
      new TextEncoder().encode("alpha\n"),
    );
    mock.storage.set(
      "data/@org/m/b.yaml",
      new TextEncoder().encode("beta\n"),
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    const pulled = await service.pullChanged();
    assertEquals(pulled, 2, "both files must be downloaded");

    const aOnDisk = await Deno.readTextFile(
      join(cachePath, "data/@org/m/a.yaml"),
    );
    const bOnDisk = await Deno.readTextFile(
      join(cachePath, "data/@org/m/b.yaml"),
    );
    assertEquals(aOnDisk, "alpha\n");
    assertEquals(bOnDisk, "beta\n");
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// Test C — discovery filters internal cache files.
Deno.test("pullIndex discovery: skips internal cache files (swamp-club #225)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-225-C-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      "data/@org/m/legit.yaml",
      new TextEncoder().encode("ok\n"),
    );
    mock.storage.set(
      ".datastore.lock",
      new TextEncoder().encode("lock-data"),
    );
    mock.storage.set(
      ".push-queue.json",
      new TextEncoder().encode("[]"),
    );
    mock.storage.set(
      "data/_catalog.db",
      new TextEncoder().encode("SQLITE-MAIN"),
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    await (service as unknown as {
      pullIndex: (
        opts: { forceRemote: boolean },
      ) => Promise<string | null>;
    }).pullIndex({ forceRemote: true });

    const indexPut = mock.puts.find((p) => p.key === ".datastore-index.json");
    assertExists(indexPut);
    const synthesized = JSON.parse(new TextDecoder().decode(indexPut.body));
    assertEquals(
      Object.keys(synthesized.entries).sort(),
      ["data/@org/m/legit.yaml"],
      "synthesized index must contain only the legit file",
    );
    for (
      const internal of [
        ".datastore.lock",
        ".push-queue.json",
        "data/_catalog.db",
      ]
    ) {
      assertEquals(
        synthesized.entries[internal],
        undefined,
        `internal cache file must not appear in synthesized index: ${internal}`,
      );
    }
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// Test D — empty bucket regression pin: brand-new-bucket fallthrough.
Deno.test("pullIndex discovery: empty bucket falls through to empty index (swamp-club #225 regression pin)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-225-D-" });
  try {
    const mock = createMockGcsClient();
    const service = new GcsCacheSyncService(mock, cachePath);
    const fingerprint = await (service as unknown as {
      pullIndex: (
        opts: { forceRemote: boolean },
      ) => Promise<string | null>;
    }).pullIndex({ forceRemote: true });

    assertEquals(
      fingerprint,
      null,
      "empty-bucket fallthrough must return null fingerprint",
    );
    const indexPut = mock.puts.find((p) => p.key === ".datastore-index.json");
    assertEquals(
      indexPut,
      undefined,
      "no PutObject must fire on a genuinely empty bucket",
    );
    const state = privateState(service);
    assertExists(state.index);
    assertEquals(
      Object.keys(state.index.entries).length,
      0,
      "in-memory entries must be empty for a brand-new bucket",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// Test E — pushChanged side benefit on an unindexed populated bucket.
Deno.test("pushChanged: against unindexed populated bucket builds a complete index (swamp-club #225 side benefit)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-225-E-" });
  try {
    const mock = createMockGcsClient();
    mock.storage.set(
      "data/@org/m/remote-only.yaml",
      new TextEncoder().encode("remote\n"),
    );
    await seedFile(cachePath, "data/@org/m/local-only.yaml", "local\n");

    const service = new GcsCacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(pushed, 1, "exactly one local file should push");

    const indexPuts = mock.puts.filter((p) =>
      p.key === ".datastore-index.json"
    );
    assertExists(indexPuts.at(-1), "pushChanged must publish an index");
    const finalIndex = JSON.parse(
      new TextDecoder().decode(indexPuts.at(-1)!.body),
    );
    assertEquals(
      Object.keys(finalIndex.entries).sort(),
      [
        "data/@org/m/local-only.yaml",
        "data/@org/m/remote-only.yaml",
      ],
      "merged index must contain both the remote-discovered and local-pushed entries",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (g) push merges remote index instead of clobbering it ----------------

// Regression test for swamp-club#30: without the fix, a client whose
// local cache has fewer files than the remote index will overwrite the
// remote `.datastore-index.json` with a subset of entries on push,
// orphaning the remote data objects. Exercised in production by
// `datastore setup` on a reader-side repo, which invokes pushChanged
// against a near-empty local cache before the reader has pulled.

Deno.test("pushChanged: preserves remote index entries for files absent from local cache", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-g-" });
  try {
    const mock = createMockGcsClient();

    // Remote already has 5 entries from a prior writer. None of the
    // corresponding files are present on the reader's local disk.
    const remoteEntries = {
      "data/@writer/alpha.yaml": {
        key: "data/@writer/alpha.yaml",
        size: 10,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/beta.yaml": {
        key: "data/@writer/beta.yaml",
        size: 20,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/gamma.yaml": {
        key: "data/@writer/gamma.yaml",
        size: 30,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/delta.yaml": {
        key: "data/@writer/delta.yaml",
        size: 40,
        lastModified: new Date().toISOString(),
      },
      "data/@writer/epsilon.yaml": {
        key: "data/@writer/epsilon.yaml",
        size: 50,
        lastModified: new Date().toISOString(),
      },
    };
    mock.storage.set(".datastore-index.json", encodeIndex(remoteEntries));

    // Reader's local cache has exactly one new file, the kind of
    // bootstrap artifact `datastore setup` produces.
    await seedFile(cachePath, "data/@reader/new.yaml", "reader: added\n");

    const service = new GcsCacheSyncService(mock, cachePath);
    await service.pushChanged();

    const indexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      indexPuts.length,
      1,
      "index must be written back exactly once",
    );
    const pushedIndex = decodeIndex(indexPuts[0].body);
    const keys = Object.keys(pushedIndex.entries).sort();
    assertEquals(
      keys.length,
      6,
      `expected 6 entries (5 remote + 1 new local), got ${keys.length}: ${
        keys.join(", ")
      }`,
    );
    assertEquals(
      keys.includes("data/@reader/new.yaml"),
      true,
      "new local file must be added to the index",
    );
    for (const remoteKey of Object.keys(remoteEntries)) {
      assertEquals(
        keys.includes(remoteKey),
        true,
        `remote entry must be preserved: ${remoteKey}`,
      );
    }

    // The writer's data objects themselves must NOT be re-uploaded —
    // pushChanged only walks local files.
    const uploadedDataKeys = mock.puts
      .map((p) => p.key)
      .filter((k) => k !== ".datastore-index.json");
    assertEquals(
      uploadedDataKeys,
      ["data/@reader/new.yaml"],
      "only the new local file should be uploaded",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (f) pushChanged scrubs remote zombies and is idempotent --------------

// Migration path for swamp-club#29: when the remote `.datastore-index.json`
// contains zombie `_catalog.db*` entries from a pre-fix writer, the
// first fixed client to pushChanged must fetch, scrub, and write back
// a clean index — even on a no-op push (no local files to upload). A
// subsequent push against the now-clean remote must be a no-op with
// no redundant index writeback.

Deno.test("pushChanged: scrubs remote zombies and writes back clean, second call is quiet", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-f-" });
  try {
    const mock = createMockGcsClient();

    // Seed remote with a zombie-only index (the pre-fix migration state).
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/_catalog.db-wal": {
          key: "data/_catalog.db-wal",
          size: 42,
          lastModified: new Date().toISOString(),
        },
      }),
    );

    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pushChanged();

    const firstIndexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      firstIndexPuts.length,
      1,
      "first pushChanged must write scrubbed index despite pushed=0",
    );
    const firstPushed = decodeIndex(firstIndexPuts[0].body);
    assertEquals(
      Object.keys(firstPushed.entries).length,
      0,
      "scrubbed index must contain no zombie entries",
    );

    await service.pushChanged();

    const secondIndexPuts = mock.puts.filter(
      (p) => p.key === ".datastore-index.json",
    );
    assertEquals(
      secondIndexPuts.length,
      1,
      "second pushChanged must NOT rewrite — remote already clean, flag reset",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (h) pushChanged aborts on transient remote fetch errors --------------

// Since swamp-club#30, pushChanged force-fetches the remote index on
// every call. That means any non-NotFound error from the fetch (5xx,
// auth failure, network timeout) must propagate — otherwise a
// transient blip would leave us with an empty in-memory index, which
// the subsequent writeback would push to the remote and silently wipe
// the real index.

Deno.test("pushChanged: propagates non-NotFound remote errors and skips writeback", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-test-h-" });
  try {
    const puts: PutCall[] = [];
    const mock = {
      putObject(
        key: string,
        body: Uint8Array,
      ): Promise<{ generation: string }> {
        puts.push({ key, body });
        return Promise.resolve({ generation: "1" });
      },
      getObject(
        _key: string,
      ): Promise<{ data: Uint8Array; generation?: string }> {
        // Simulate a transient 5xx: generic Error, NOT a NotFoundError.
        return Promise.reject(new Error("500 Internal Server Error"));
      },
    } as unknown as GcsClient;

    await seedFile(cachePath, "data/@m/payload.yaml", "data\n");

    const service = new GcsCacheSyncService(mock, cachePath);

    await assertRejects(
      () => service.pushChanged(),
      Error,
      "500",
      "pushChanged must propagate non-NotFound remote errors",
    );

    assertEquals(
      puts.length,
      0,
      "no putObject calls allowed — a failed remote fetch must not trigger a writeback that could wipe the real remote index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// ============================================================================
// Fast-path test block (1)–(9) — ref lab/166.
//
// GCS fingerprint is the remote index's `generation` string instead of
// an S3-style ETag. Design differences from s3's (1)-(9) block:
//   - No `normalizeETag` helper equivalent — generation is a plain
//     int64 string with no wire quirks.
//   - Test (6) swaps s3's "multipart ETag bypasses fast path" case for
//     "empty-string generation bypasses fast path" — GCS never returns
//     multipart-style fingerprints because generation is unique per
//     write regardless of upload method.
// ============================================================================

// -- (1) sidecar walker-exclusion guardrail -------------------------------

Deno.test("isInternalCacheFile: excludes the sync-state sidecar", () => {
  assertEquals(isInternalCacheFile(".datastore-sync-state.json"), true);
  assertEquals(isInternalCacheFile("regular/file.yaml"), false);
});

Deno.test("isInternalCacheFile: excludes per-target FileLock files at any depth", () => {
  // Data tier writes per-target locks at `data/<kind>/<type>/<id>/.lock`.
  // Without this exclusion, `discoverIndexFromBucket` captures transient
  // `.lock` files into the synthesized index, the lock subsystem deletes
  // them on release, and a fresh reader 404s on the missing object during
  // setup hydration.
  assertEquals(
    isInternalCacheFile(
      "data/command/shell/c19f88eb-de4f-4227-ade7-8162aec3d6a6/.lock",
    ),
    true,
  );
  assertEquals(isInternalCacheFile("data/@m/.lock"), true);
  assertEquals(isInternalCacheFile(".datastore.lock"), true);
  assertEquals(isInternalCacheFile("data/@m/.locked.yaml"), false);
  assertEquals(isInternalCacheFile("data/@m/lock"), false);
});

// -- (2) post-verified pullChanged short-circuits with zero index GETs ----

Deno.test("pullChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast2-" });
  try {
    const mock = createMockGcsClient();
    // Seed a remote index + local index so the first pull marks clean.
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming pull — slow-path, writes the sidecar.
    await service.pullChanged();

    // Reset call ledgers; second pull must fast-path.
    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();

    assertEquals(result, 0, "fast path should return 0 pulled");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no index GET on fast-path hit — only the sidecar HEAD fires",
    );
    assertEquals(
      mock.heads.length,
      1,
      "exactly one HEAD of the index during the fast-path probe",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (3) post-verified pushChanged short-circuits with zero walk ----------

Deno.test("pushChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast3-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming sync populates the sidecar (pull then push slow-path).
    await service.pullChanged();
    await service.pushChanged();

    mock.gets.length = 0;
    mock.heads.length = 0;
    mock.puts.length = 0;

    const result = await service.pushChanged();

    assertEquals(result, 0, "fast path should return 0 pushed");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no index GET on fast-path hit",
    );
    assertEquals(
      mock.puts.length,
      0,
      "no putObject calls on fast-path hit — nothing walked, nothing written",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (4) corrupt sidecar falls through, never throws ----------------------

Deno.test("pullChanged: corrupt sidecar (bad JSON / wrong version / missing fields) falls through to slow path", async () => {
  const corruptCases = [
    "not valid json{",
    JSON.stringify({
      version: 999,
      remoteIndexGeneration: "1",
      lastVerifiedAt: "2026-01-01T00:00:00Z",
      localDirty: false,
    }),
    JSON.stringify({ version: 1 /* missing fields */ }),
  ];
  for (const [i, corrupt] of corruptCases.entries()) {
    const cachePath = await Deno.makeTempDir({ prefix: `gcssync-fast4-${i}-` });
    try {
      const mock = createMockGcsClient();
      await mock.putObject(".datastore-index.json", encodeIndex({}));
      await Deno.mkdir(cachePath, { recursive: true });
      await Deno.writeTextFile(
        join(cachePath, ".datastore-sync-state.json"),
        corrupt,
      );

      const service = new GcsCacheSyncService(mock, cachePath);

      // Must NOT throw. Must fall through to slow path — which GETs
      // the remote index (populating mock.gets).
      await service.pullChanged();

      assert(
        mock.gets.some((k) => k === ".datastore-index.json"),
        `corrupt sidecar case ${i} must fall through to slow-path index GET`,
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  }
});

// -- (5) remote generation change bypasses short-circuit ------------------

Deno.test("pullChanged: remote index generation change bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast5-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    // Bump the remote generation — simulates another writer pushing
    // an updated index between our syncs.
    mock.generationOverrides.set(".datastore-index.json", "999");

    mock.gets.length = 0;
    mock.heads.length = 0;

    await service.pullChanged();

    // Fast-path probe HEADs (generation mismatch), then slow path
    // GETs the remote index.
    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "generation mismatch must bypass fast path and slow-path GET the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// pullChanged's slow path must force a remote pullIndex, not trust the
// 60-second TTL local-mtime cache. The cache check only fires when the
// in-memory `this.index` is null (i.e. a fresh process), so the bug
// only manifests across process boundaries: process A pulls + writes
// the local index file (fresh mtime), exits; process B's fresh
// service starts, sees fast-path miss because remote generation has
// moved on, drops to slow path — and without `forceRemote` would walk
// the still-fresh-by-mtime local index file (process A's view) and
// find toPull=0. Result: "Pulled 0 files" while another writer's data
// sits unpulled on remote. swamp-club#1225 writer1↔writer2 path.
Deno.test("pullChanged: slow path force-fetches the remote index even when a previous process's local index is mtime-fresh", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-pull-force-",
  });
  try {
    const mock = createMockGcsClient();

    // Seed initial remote: gen=1, one entry.
    mock.generationOverrides.set(".datastore-index.json", "1");
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/a.yaml": {
          key: "data/@m/a.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
          localMtime: new Date(0).toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/a.yaml", new TextEncoder().encode("hello"));

    // Process A: pull and exit. Writes the local index file.
    const serviceA = new GcsCacheSyncService(mock, cachePath);
    await serviceA.pullChanged();

    // Simulate another writer pushing in the meantime: bump generation,
    // add a new entry and its file. Process A would not see this; only
    // process B's pullChanged should.
    mock.generationOverrides.set(".datastore-index.json", "2");
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/a.yaml": {
          key: "data/@m/a.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
          localMtime: new Date(0).toISOString(),
        },
        "data/@m/b.yaml": {
          key: "data/@m/b.yaml",
          size: 7,
          lastModified: new Date().toISOString(),
          localMtime: new Date(0).toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/b.yaml", new TextEncoder().encode("goodbye"));

    mock.gets.length = 0;
    mock.heads.length = 0;

    // Process B: fresh service instance, same cache dir. `this.index`
    // is null, the local index file is mtime-fresh — without
    // `forceRemote`, this would cache-hit and walk the stale view.
    const serviceB = new GcsCacheSyncService(mock, cachePath);
    const pulled = await serviceB.pullChanged();
    assertEquals(
      pulled,
      1,
      "must download the new remote-only entry — pre-fix this returned 0 because slow path used a stale TTL-cached local index",
    );
    assert(
      mock.gets.includes(".datastore-index.json"),
      "slow path must force-fetch the remote index, not trust local TTL cache",
    );
    assert(
      mock.gets.includes("data/@m/b.yaml"),
      "the previously-missing remote file must be fetched",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (6) empty/zero generation bypasses fast path -------------------------
//
// GCS-specific: the S3 equivalent test checks multipart-shaped ETag
// bypass. GCS generation is always unique per write (no multipart
// variant), so the analogous unusable-fingerprint case is an
// empty-string or "0" generation — values `tryFastPull*` rejects
// explicitly. This pins the defensive check so a future implementer
// doesn't "simplify" it out.

Deno.test("pullChanged: empty-string generation bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast6-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    mock.generationOverrides.set(".datastore-index.json", "");

    mock.gets.length = 0;
    await service.pullChanged();

    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "empty generation must bypass fast path and slow-path GET the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (7) local file mutation forces real push work -----------------------

Deno.test("pushChanged: local file mutation since last sync forces real push work", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast7-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();
    await service.pushChanged();

    // pushFile marks localDirty. Call it directly to simulate a
    // cache-writer that goes through the proper path.
    mock.puts.length = 0;
    await seedFile(cachePath, "data/new/file.yaml", "fresh\n");
    await service.pushFile("data/new/file.yaml");

    // Next pushChanged — localDirty was set by pushFile, so fast path
    // must miss and slow-path walk.
    mock.gets.length = 0;
    await service.pushChanged();

    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "localDirty=true must force slow-path index fetch",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (8) AbortSignal cancellation propagates -----------------------------

Deno.test("pullChanged / pushChanged: AbortSignal cancellation propagates", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast8-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Reset ledgers so the seed putObject doesn't count against
    // "zero real calls leak after abort".
    mock.puts.length = 0;
    mock.gets.length = 0;
    mock.heads.length = 0;

    const controller = new AbortController();
    controller.abort();

    await assertRejects(
      () => service.pullChanged({ signal: controller.signal }),
      DOMException,
      undefined,
      "pullChanged must reject with AbortError when signal is pre-aborted",
    );
    await assertRejects(
      () => service.pushChanged({ signal: controller.signal }),
      DOMException,
      undefined,
      "pushChanged must reject with AbortError when signal is pre-aborted",
    );

    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no GETs after abort",
    );
    assertEquals(mock.puts.length, 0, "no PUTs after abort");
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (9) guardrail: direct cache writes without markDirty bypass tracking --
//
// CONTRACT: external writers into the cache directory (e.g.
// swamp-core's repository layer using atomicWriteFile) MUST call
// `markDirty()` on the sync service. Internal writes through
// `pushFile` flip `localDirty: true` automatically. A direct
// `Deno.writeFile` into the cache WITHOUT `markDirty` is a contract
// violation: the sidecar won't see it, and the next `pushChanged`
// fast-paths past the change. See the companion
// "markDirty: flips sidecar localDirty..." test for the recovery
// path.
//
// This test pins the failure mode when `markDirty` is forgotten so
// the footgun is explicit. Loosening it (e.g. walking on every push
// to re-confirm) would defeat the fast-path's whole purpose.

Deno.test("pushChanged: direct Deno.writeFile bypasses localDirty tracking (contract)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-fast9-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Clean baseline.
    await service.pullChanged();
    await service.pushChanged();

    // Direct write — bypasses pushFile, so localDirty stays false.
    await seedFile(cachePath, "data/@m/sneaky.yaml", "sneaky\n");

    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();

    // Fast path hit — sneaky.yaml never uploaded. This is the
    // documented contract (see S3 #105 precedent). If you broke
    // this test by adding a new cache writer, teach that writer to
    // flip the sidecar (or call markLocalDirty) instead of removing
    // the assertion.
    assertEquals(
      mock.puts.length,
      0,
      "fast path skipped the direct write — documented contract, not a bug",
    );
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path also skipped the index force-fetch",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// ============================================================================
// DEF-2 unit block — retry + classification + batch failure message.
// Ref lab/166 (S3 #102 mirror for GCS).
// ============================================================================

function makeGcsErr(status: number | null): GcsOperationError {
  return new GcsOperationError(`simulated ${status ?? "transport"}`, {
    name: "GcsOperationError",
    httpStatusCode: status,
    code: undefined,
    bodyPreview: undefined,
    uploadId: undefined,
  });
}

Deno.test("isRetryableError: 5xx and 429 are retryable, 4xx is not", () => {
  assertEquals(isRetryableError(makeGcsErr(500)), true);
  assertEquals(isRetryableError(makeGcsErr(502)), true);
  assertEquals(isRetryableError(makeGcsErr(503)), true);
  assertEquals(isRetryableError(makeGcsErr(429)), true);
  // transport-level (no HTTP status) retryable
  assertEquals(isRetryableError(makeGcsErr(null)), true);
  // 4xx non-429 → not retryable
  assertEquals(isRetryableError(makeGcsErr(400)), false);
  assertEquals(isRetryableError(makeGcsErr(401)), false);
  assertEquals(isRetryableError(makeGcsErr(403)), false);
  assertEquals(isRetryableError(makeGcsErr(404)), false);
});

Deno.test("isRetryableError: TimeoutError retryable, AbortError + narrow types not", () => {
  const timeout = new Error("t");
  timeout.name = "TimeoutError";
  const abort = new Error("a");
  abort.name = "AbortError";
  assertEquals(isRetryableError(timeout), true);
  assertEquals(isRetryableError(abort), false);
  assertEquals(isRetryableError(new NotFoundError("nf")), false);
  assertEquals(isRetryableError(new PreconditionFailedError("pf")), false);
});

Deno.test("retryWithBackoff: succeeds after transient 503", async () => {
  let calls = 0;
  const result = await retryWithBackoff(
    () => {
      calls++;
      if (calls === 1) return Promise.reject(makeGcsErr(503));
      return Promise.resolve("ok");
    },
    { baseDelayMs: 5 },
  );
  assertEquals(result, "ok");
  assertEquals(calls, 2);
});

Deno.test("retryWithBackoff: does NOT retry non-retryable (403)", async () => {
  let calls = 0;
  await assertRejects(
    () =>
      retryWithBackoff(
        () => {
          calls++;
          return Promise.reject(makeGcsErr(403));
        },
        { baseDelayMs: 5 },
      ),
    GcsOperationError,
  );
  assertEquals(calls, 1, "403 is terminal, no retries");
});

Deno.test("retryWithBackoff: exhausts maxAttempts then rethrows", async () => {
  let calls = 0;
  await assertRejects(
    () =>
      retryWithBackoff(
        () => {
          calls++;
          return Promise.reject(makeGcsErr(500));
        },
        { baseDelayMs: 5, maxAttempts: 3 },
      ),
    GcsOperationError,
  );
  assertEquals(calls, 3);
});

Deno.test("retryWithBackoff: signal abort during backoff wakes sleep with AbortError", async () => {
  const controller = new AbortController();
  let calls = 0;
  const promise = retryWithBackoff(
    () => {
      calls++;
      return Promise.reject(makeGcsErr(503));
    },
    { baseDelayMs: 5_000, signal: controller.signal },
  );
  // Let one call fire, then abort. The backoff sleep should wake.
  await new Promise((r) => setTimeout(r, 50));
  controller.abort();
  await assertRejects(() => promise, DOMException);
  assertEquals(calls, 1, "abort fires during backoff, not during next op");
});

// --- batch failure message includes underlying error details --------------

Deno.test("pushChanged: batch failure message includes underlying error details", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-def2-batch-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));

    // Inject per-key failures via the mock's putFailures hook so the
    // test exercises distinct error reasons (auth, server, transport)
    // in the batch-failure message without resorting to method
    // reassignment.
    mock.putFailures.set("data/a.yaml", makeGcsErr(403)); // auth
    mock.putFailures.set("data/b.yaml", makeGcsErr(500)); // server
    mock.putFailures.set("data/c.yaml", makeGcsErr(null)); // transport
    mock.putFailures.set("data/d.yaml", makeGcsErr(null)); // transport

    await seedFile(cachePath, "data/a.yaml", "a");
    await seedFile(cachePath, "data/b.yaml", "b");
    await seedFile(cachePath, "data/c.yaml", "c");
    await seedFile(cachePath, "data/d.yaml", "d");

    const service = new GcsCacheSyncService(mock, cachePath);
    const err = await assertRejects(
      () => service.pushChanged(),
      Error,
    );

    assertStringIncludes(err.message, "Failed to push 4 file(s) to GCS");
    // First 3 of 4 failures are surfaced with underlying messages,
    // the 4th rolls up to "... and 1 more". Walk order isn't stable
    // across filesystems, so count inline failures rather than
    // asserting a specific subset.
    const inlineFailures = ["a", "b", "c", "d"].filter((n) =>
      err.message.includes(`data/${n}.yaml:`)
    );
    assertEquals(
      inlineFailures.length,
      3,
      `first 3 failures should appear inline, got ${inlineFailures.join(",")}`,
    );
    assertStringIncludes(err.message, "... and 1 more");
    // Distinct underlying reasons all represented across the message.
    assertStringIncludes(err.message, "simulated");
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// ============================================================================
// DEF-2 integration block — retry against a programmable HTTP server.
// Drives the real GcsClient through Deno.serve so wire-level retry
// behavior (503/429/403/timeout) is exercised end-to-end. Ref lab/166,
// mirrors S3 #102 integration layout.
// ============================================================================

/**
 * Spin up a local HTTP server for integration tests and return its
 * base URL + shutdown handle. Same pattern as gcs_client_test.ts.
 */
function startIntegrationServer(
  handler: (req: Request) => Response | Promise<Response>,
): { url: string; shutdown: () => Promise<void> } {
  const ac = new AbortController();
  const server = Deno.serve(
    { port: 0, signal: ac.signal, onListen() {} },
    handler,
  );
  const addr = server.addr;
  const url = `http://${
    addr.hostname === "::" ? "localhost" : addr.hostname
  }:${addr.port}`;
  return {
    url,
    shutdown: async () => {
      ac.abort();
      try {
        await server.finished;
      } catch {
        // expected on shutdown
      }
    },
  };
}

// The GCS client uses fetch() which keeps TCP connections alive in the
// global HTTP agent, which trips Deno's resource leak detection.
// sanitizeResources: false is safe here because those connections are
// reclaimed when the runtime tears down between test runs.

Deno.test({
  name: "DEF-2 integration: 503-then-200 pullFile retries and succeeds",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      if (calls === 1) return new Response("unavailable", { status: 503 });
      return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    });
    const cachePath = await Deno.makeTempDir({ prefix: "gcssync-int503-" });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 2000,
      });
      // Bypass retryWithBackoff's production delays — 5ms base suffices.
      const originalRetry = retryWithBackoff;
      // pullFile invokes retryWithBackoff internally; force fast backoff
      // by monkey-patching the module-level default via a dedicated
      // assertion path — simpler: pullFile is `await retryWithBackoff(...)`
      // with no config override, so we instead verify behavior via
      // calling retryWithBackoff directly with fast delays.
      const { data } = await originalRetry(
        () => client.getObject("obj"),
        { baseDelayMs: 5 },
      );
      assertEquals(Array.from(data), [1, 2, 3]);
      assertEquals(calls, 2, "first attempt 503, second 200");
    } finally {
      await shutdown();
      await Deno.remove(cachePath, { recursive: true });
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: 429 retries (no Retry-After honored, matches S3 #102)",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      if (calls === 1) {
        return new Response("rate limited", {
          status: 429,
          headers: { "Retry-After": "60" }, // deliberately ignored
        });
      }
      return new Response(new Uint8Array([0]), { status: 200 });
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const { data } = await retryWithBackoff(
        () => client.getObject("obj"),
        { baseDelayMs: 5 },
      );
      assertEquals(data.length, 1);
      assertEquals(calls, 2, "429 retried to success despite Retry-After");
    } finally {
      await shutdown();
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: 403 throws immediately with credential hint, no retry",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      return new Response(
        JSON.stringify({
          error: {
            code: 403,
            errors: [{ reason: "authError", message: "forbidden" }],
          },
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    });
    try {
      const client = new GcsClient({ bucket: "b", apiEndpoint: url });
      const err = await assertRejects(
        () =>
          retryWithBackoff(() => client.getObject("obj"), { baseDelayMs: 5 }),
        GcsOperationError,
      );
      assertEquals(err.httpStatusCode, 403);
      // Issue #226: 403 now leads with the swamp-flavoured credentials-rejected
      // hint instead of the old generic "check GCS credentials" message.
      assertStringIncludes(
        err.message,
        "Datastore credentials rejected by GCS",
      );
      assertEquals(calls, 1, "403 is terminal — no retries");
    } finally {
      await shutdown();
    }
  },
});

Deno.test({
  name:
    "DEF-2 integration: TimeoutError retries, exhausts budget, surfaces timeout",
  sanitizeResources: false,
  fn: async () => {
    let calls = 0;
    const { url, shutdown } = startIntegrationServer(() => {
      calls++;
      // Never resolves — stalled socket simulation.
      return new Promise<Response>(() => {});
    });
    try {
      const client = new GcsClient({
        bucket: "b",
        apiEndpoint: url,
        defaultRequestTimeoutMs: 100,
      });
      const err = await assertRejects(
        () =>
          retryWithBackoff(() => client.getObject("obj"), {
            baseDelayMs: 5,
            maxAttempts: 3,
          }),
        GcsOperationError,
      );
      assertEquals(err.name, "TimeoutError");
      assertStringIncludes(err.message, "timed out after 100ms");
      assertEquals(calls, 3, "timeout retried until budget exhausted");
    } finally {
      await shutdown();
    }
  },
});

// ============================================================================
// markDirty() contract — ref lab/166 follow-up.
//
// The fast-path short-circuit depends on a `localDirty` flag in the
// sidecar. That flag is only flipped by `pushFile` internally OR by
// `markDirty()` from the outside. swamp-core writes directly to the
// cache via atomicWriteFile, bypassing `pushFile` — so it MUST call
// `markDirty()` before (or immediately after) each write, otherwise
// the next `pushChanged` fast-paths past the write and the data is
// silently missed on upload.
// ============================================================================

Deno.test("markDirty: no-arg flips sidecar to bulk-invalidated v2 and forces slow-path on next pushChanged", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-markdirty-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Priming sync populates the sidecar clean.
    await service.pullChanged();
    await service.pushChanged();

    // Simulate swamp-core writing directly to the cache AND
    // honoring the new contract by calling markDirty afterwards.
    await seedFile(cachePath, "data/external-writer.yaml", "external\n");
    await service.markDirty();

    // Verify v2 sidecar shape
    const sidecar = JSON.parse(
      await Deno.readTextFile(join(cachePath, ".datastore-sync-state.json")),
    );
    assertEquals(sidecar.version, 2);
    assertEquals(sidecar.localDirty, true);
    assertEquals(sidecar.bulkInvalidated, true);
    assertEquals(sidecar.dirtyPaths, []);

    // Reset call ledgers — next pushChanged must slow-path and
    // actually walk the cache, finding the new file.
    mock.puts.length = 0;
    mock.gets.length = 0;

    await service.pushChanged();

    assert(
      mock.puts.some((p) => p.key === "data/external-writer.yaml"),
      "markDirty must force the next pushChanged to walk and upload the externally-written file",
    );
    assert(
      mock.gets.some((k) => k === ".datastore-index.json"),
      "fast-path must not hit after markDirty — forceRemote index fetch expected",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty: is idempotent — repeated no-arg calls don't thrash the sidecar", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-markdirty-idem-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();
    await service.pushChanged();
    await service.markDirty();

    const sidecarPath = join(cachePath, ".datastore-sync-state.json");
    const mtimeAfterFirst = (await Deno.stat(sidecarPath)).mtime;
    assertExists(mtimeAfterFirst);

    // Verify v2 sidecar after first markDirty
    const sidecar = JSON.parse(await Deno.readTextFile(sidecarPath));
    assertEquals(sidecar.version, 2);
    assertEquals(sidecar.bulkInvalidated, true);

    // Repeated markDirty should NOT rewrite the sidecar when it's
    // already dirty. The early-return in markDirty (no-op when
    // `localDirty: true` is already recorded) means no new mtime.
    await new Promise((r) => setTimeout(r, 20));
    await service.markDirty();
    await service.markDirty();

    const mtimeAfterRepeats = (await Deno.stat(sidecarPath)).mtime;
    assertExists(mtimeAfterRepeats);
    assertEquals(
      mtimeAfterRepeats.getTime(),
      mtimeAfterFirst.getTime(),
      "idempotent markDirty must not rewrite the sidecar",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// =========================================================================
// swamp-club #168: fast-path sidecar TOCTOU regression tests (GCS mirror)
//
// Same race shape as the S3 suite: concurrent writer B bumps the remote
// index generation between A's index GET and A's sidecar write. Before
// the fix, `markSynced` observed B's generation via a post-walk
// `getMetadata` and sidecar recorded B's value, causing A's next
// fast-path sync to mask B's file. After the fix, sidecar records the
// generation captured from A's GET response — the one A walked against.
//
// Microtask-bump ordering is the same as the S3 suite: the wrapped
// mock attaches `p.then(bump)` BEFORE the caller's `await`
// continuation, so bump runs first in the microtask queue. Any
// refactor that moves bump-attachment to a macrotask (setTimeout)
// loses the race simulation — keep this invariant when editing.
// =========================================================================

Deno.test("pullChanged: records generation from pullIndex GET, not post-walk getMetadata (swamp-club #168)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-toctou-pull-",
  });
  try {
    const mock = createMockGcsClient();
    mock.generationOverrides.set(".datastore-index.json", "5");
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/ok.yaml", new TextEncoder().encode("hello"));
    await seedFile(cachePath, "data/@m/ok.yaml", "hello");

    // Race simulation: bump generation to 999 in a microtask scheduled
    // from the index GET's resolution — fires between pullIndex's
    // getObject resolving and the post-walk markSynced call.
    const origGet = mock.getObject.bind(mock);
    mock.getObject = ((key: string, signal?: AbortSignal) => {
      const p = origGet(key, signal);
      if (key === ".datastore-index.json") {
        p.then(() => {
          // B's push: new file, bumped generation.
          mock.generationOverrides.set(".datastore-index.json", "999");
          mock.storage.set(
            ".datastore-index.json",
            encodeIndex({
              "data/@m/ok.yaml": {
                key: "data/@m/ok.yaml",
                size: 5,
                lastModified: new Date().toISOString(),
              },
              "data/@m/new.yaml": {
                key: "data/@m/new.yaml",
                size: 3,
                lastModified: new Date().toISOString(),
              },
            }),
          );
          mock.storage.set("data/@m/new.yaml", new TextEncoder().encode("new"));
        });
      }
      return p;
    }) as typeof mock.getObject;

    const service = new GcsCacheSyncService(mock, cachePath);
    const pulled = await service.pullChanged();
    assertEquals(pulled, 0, "walk should see zero diff against generation 5");

    // The fix records "5" (the generation we actually verified
    // against), not "999" (the post-walk getMetadata value the old
    // buggy code would have observed after B's push landed).
    const sidecarText = await Deno.readTextFile(
      join(cachePath, ".datastore-sync-state.json"),
    );
    const sidecar = JSON.parse(sidecarText);
    assertEquals(
      sidecar.remoteIndexGeneration,
      "5",
      "sidecar must record the generation from pullIndex GET, NOT a racy post-walk getMetadata",
    );

    // Invariant: the fix removes the post-walk getMetadata entirely.
    // On a first pullChanged (no pre-existing sidecar), the fast-path
    // probe returns null at the "no sidecar" check without
    // getMetadata'ing, so zero getMetadata calls on the index are
    // expected. If this assertion ever fails, a future maintainer
    // likely re-added the TOCTOU metadata call.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      0,
      "no post-walk getMetadata on index — TOCTOU fix removes it",
    );

    // On the second sync, the fast-path probe getMetadata's remote
    // (999), compares to sidecar (5), and correctly bails to the slow
    // path. The slow path walks and pulls B's new file. Without the
    // fix, sidecar would be 999 and this sync would return 0, masking
    // B's file.
    mock.gets.length = 0;
    mock.heads.length = 0;
    const secondResult = await service.pullChanged();
    assertEquals(
      secondResult,
      1,
      "second pullChanged must slow-path and pull B's file, not mask it",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// swamp-club #1225: pushChanged's no-writeback branch must not mark the
// sidecar clean. The slow walk only checks each LOCAL file against the
// remote index — remote-only entries are never visited, so `pushed === 0`
// is consistent with "local is missing N files that remote has." Marking
// the sidecar clean here lets the next pullChanged fast-path past
// unfetched files (silent data loss for any reader running
// `datastore setup` against a non-empty bucket). The earlier swamp-club
// #168 TOCTOU concern is preserved: there is still no post-walk
// getMetadata on the index in this branch — the branch simply does no
// sidecar work at all now.
Deno.test("pushChanged no-writeback: does NOT mark the sidecar clean when nothing was pushed (swamp-club #1225)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-1225-push-",
  });
  try {
    const mock = createMockGcsClient();
    // Remote has TWO files; local cache has only one of them. This is
    // the second-repo `datastore setup` scenario from production. The
    // walker sees zero LOCAL-only diffs (nothing to push), but the
    // local cache is missing `data/@m/remote-only.yaml` and must NOT
    // be recorded as in-sync.
    mock.generationOverrides.set(".datastore-index.json", "5");
    const existingMtime = new Date(0);
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/ok.yaml": {
          key: "data/@m/ok.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
          localMtime: existingMtime.toISOString(),
        },
        "data/@m/remote-only.yaml": {
          key: "data/@m/remote-only.yaml",
          size: 11,
          lastModified: new Date().toISOString(),
          localMtime: existingMtime.toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/ok.yaml", new TextEncoder().encode("hello"));
    mock.storage.set(
      "data/@m/remote-only.yaml",
      new TextEncoder().encode("remote-only"),
    );
    await seedFile(cachePath, "data/@m/ok.yaml", "hello");
    await Deno.utime(
      join(cachePath, "data/@m/ok.yaml"),
      existingMtime,
      existingMtime,
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(
      pushed,
      0,
      "walker sees no local-only files, so nothing to push",
    );

    // Regression pin: the sidecar must NOT exist (or at minimum must
    // not record a clean baseline). A fast-path-eligible sidecar here
    // would let the next pullChanged skip downloading `remote-only.yaml`.
    let sidecarExists = true;
    try {
      await Deno.stat(join(cachePath, ".datastore-sync-state.json"));
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) sidecarExists = false;
      else throw err;
    }
    assertEquals(
      sidecarExists,
      false,
      "no-writeback branch must not write the sidecar — `pushed === 0` does not prove local matches remote",
    );

    // The TOCTOU fix from swamp-club #168 is preserved: no post-walk
    // getMetadata on the index in the no-writeback path.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      0,
      "no post-walk getMetadata on index in no-writeback path",
    );

    // Symmetric positive: a subsequent pullChanged must do real work
    // and download the missing remote file rather than fast-pathing.
    const pulled = await service.pullChanged();
    assertEquals(
      pulled,
      1,
      "pullChanged must download remote-only.yaml — the sidecar wasn't falsely marked clean",
    );
    assert(
      mock.gets.includes("data/@m/remote-only.yaml"),
      "the previously-missing remote file must be fetched",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// swamp-club #1225 recovery counterpart: when local cache fully matches
// the remote index and the sidecar was wiped (e.g. an upgrade migration
// removed it), the next pushChanged must re-establish the clean baseline
// so subsequent fast-path syncs work. The verify-and-mark gate in the
// no-writeback branch makes this safe — local-matches-remote is positive
// evidence, distinct from the data-loss case above where local was
// missing a remote entry.
Deno.test("pushChanged no-writeback: regenerates sidecar when local fully matches remote (swamp-club #1225 recovery)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-1225-recovery-",
  });
  try {
    const mock = createMockGcsClient();
    mock.generationOverrides.set(".datastore-index.json", "7");
    const existingMtime = new Date(0);
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/a.yaml": {
          key: "data/@m/a.yaml",
          size: 5,
          lastModified: new Date().toISOString(),
          localMtime: existingMtime.toISOString(),
        },
        "data/@m/b.yaml": {
          key: "data/@m/b.yaml",
          size: 7,
          lastModified: new Date().toISOString(),
          localMtime: existingMtime.toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/a.yaml", new TextEncoder().encode("hello"));
    mock.storage.set("data/@m/b.yaml", new TextEncoder().encode("goodbye"));
    // Local has BOTH files at matching size — the legitimate recovery
    // case. A prior pull populated the cache; the sidecar was wiped.
    await seedFile(cachePath, "data/@m/a.yaml", "hello");
    await seedFile(cachePath, "data/@m/b.yaml", "goodbye");
    await Deno.utime(
      join(cachePath, "data/@m/a.yaml"),
      existingMtime,
      existingMtime,
    );
    await Deno.utime(
      join(cachePath, "data/@m/b.yaml"),
      existingMtime,
      existingMtime,
    );

    const service = new GcsCacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(pushed, 0, "no local-only files — nothing to push");

    // Sidecar must be regenerated because local cache provably matches
    // the remote index of generation 7.
    const sidecarText = await Deno.readTextFile(
      join(cachePath, ".datastore-sync-state.json"),
    );
    const sidecar = JSON.parse(sidecarText);
    assertEquals(sidecar.localDirty, false);
    assertEquals(
      sidecar.remoteIndexGeneration,
      "7",
      "sidecar must record the generation we walked against",
    );

    // No remote writeback — generation of the index must be untouched.
    assertEquals(
      mock.puts.filter((p) => p.key === ".datastore-index.json").length,
      0,
      "recovery push must not rewrite the remote index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// swamp-club #1225 writeback variant: when pushChanged uploads at least
// one file (writeback branch fires) but the remote index already contains
// entries the local cache doesn't have, the merged index we write back
// describes "everything remote had + everything we just pushed" — local
// only has "what we just pushed". Marking the sidecar clean against that
// merged index lies the same way the no-writeback bug did. Verify-and-
// mark must apply in this branch too.
//
// This is the production fresh-reader path: `swamp datastore setup`
// migrates 1 local file, that file is NOT yet in the remote index (e.g.
// different bundle hash), so toPush=1 and writeback fires. Without this
// gate, the next `pullChanged` fast-paths past the 19+ remote-only files
// that the reader actually needs.
Deno.test("pushChanged writeback: does NOT mark sidecar clean when local is missing remote-only entries (swamp-club #1225)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-1225-writeback-",
  });
  try {
    const mock = createMockGcsClient();
    mock.generationOverrides.set(".datastore-index.json", "11");
    // Remote index already has an entry the reader does NOT have locally.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/remote-only.yaml": {
          key: "data/@m/remote-only.yaml",
          size: 11,
          lastModified: new Date().toISOString(),
          localMtime: new Date(0).toISOString(),
        },
      }),
    );
    mock.storage.set(
      "data/@m/remote-only.yaml",
      new TextEncoder().encode("remote-only"),
    );
    // Local has a different file that's NOT in the remote index — the
    // walker will route this through toPush, which means writeback fires.
    await seedFile(cachePath, "bundles/h/migrated.js", "console.log(1);");

    const service = new GcsCacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(pushed, 1, "the local-only file must be uploaded");

    // The writeback DID fire — confirm by checking the index was rewritten.
    assertEquals(
      mock.puts.filter((p) => p.key === ".datastore-index.json").length,
      1,
      "writeback must rewrite the remote index with the new entry",
    );

    // Regression pin: the sidecar must remain dirty. `pushFile` writes a
    // dirty sidecar (via `markDirty()`) before each upload, so the file
    // does exist — but the writeback branch must NOT flip it to clean
    // because local is missing `data/@m/remote-only.yaml`. Marking clean
    // here would let the next pullChanged fast-path past that file.
    const sidecarText = await Deno.readTextFile(
      join(cachePath, ".datastore-sync-state.json"),
    );
    const sidecar = JSON.parse(sidecarText);
    assertEquals(
      sidecar.localDirty,
      true,
      "writeback must not flip localDirty to false when local is missing remote-only entries",
    );

    // Symmetric positive: a subsequent pullChanged must do real work
    // and download the missing remote file rather than fast-pathing.
    const pulled = await service.pullChanged();
    assertEquals(
      pulled,
      1,
      "pullChanged must download remote-only.yaml — sidecar wasn't falsely marked clean",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// swamp-club #222: pushChanged in a fresh process after a fresh-cache
// pullChanged must not redundantly re-upload the just-downloaded files.
// Pre-fix, pullChanged left the on-disk index carrying the original
// pusher's localMtime values (the remote payload), and skipped markSynced
// because pulled > 0. The next process's pushChanged then took the slow
// path (no sidecar), pullIndex(forceRemote) reloaded the pusher's mtimes
// into this.index, and the walk pushed every file — size matched but
// mtime didn't. The fix persists the in-memory index (with the puller's
// stat-derived localMtimes) AND marksSynced so the next pushChanged hits
// the fast path. Two positive assertions pin the persistence machinery
// (sidecar contents + on-disk index mtimes) so a future refactor can't
// silently drop them while still satisfying the symptom assertion.
Deno.test("pullChanged + pushChanged: fresh-process push after pull against populated remote does not redundantly upload (swamp-club #222)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-issue-222-" });
  try {
    const mock = createMockGcsClient();
    // Pin a known generation for the remote index so the sidecar
    // assertion has a stable target.
    mock.generationOverrides.set(".datastore-index.json", "42");

    // Seed 5 files with varied sizes (5, 11, 27, 64, 128 bytes), each
    // index entry carrying machine-A's localMtime (epoch — guaranteed
    // distinct from any local stat.mtime that Deno.writeFile will set
    // on this machine during pullChanged's downloads).
    const aMtime = new Date(0).toISOString();
    const SIZES = [5, 11, 27, 64, 128];
    const seeded = SIZES.map((size, i) => ({
      rel: `data/@m/file-${i}.yaml`,
      body: "x".repeat(size),
    }));
    const indexEntries: Record<string, {
      key: string;
      size: number;
      lastModified: string;
      localMtime: string;
    }> = {};
    for (const { rel, body } of seeded) {
      mock.storage.set(rel, new TextEncoder().encode(body));
      indexEntries[rel] = {
        key: rel,
        size: body.length,
        lastModified: aMtime,
        localMtime: aMtime,
      };
    }
    mock.storage.set(".datastore-index.json", encodeIndex(indexEntries));

    // Process A: fresh service, fresh cache. Pulls all 5 files.
    const serviceA = new GcsCacheSyncService(mock, cachePath);
    const pulled = await serviceA.pullChanged();
    assertEquals(pulled, SIZES.length, "must pull all 5 seeded files");

    // Positive: sidecar must be written with the GET'd generation and
    // clean state. Pre-fix, pulled > 0 skipped markSynced and the
    // sidecar didn't exist. Post-fix, this is the load-bearing piece
    // that lets the next pushChanged take the fast path.
    const sidecarText = await Deno.readTextFile(
      join(cachePath, ".datastore-sync-state.json"),
    );
    const sidecar = JSON.parse(sidecarText);
    assertEquals(
      sidecar.localDirty,
      false,
      "sidecar must be clean — local cache matches the freshly-pulled remote",
    );
    assertEquals(
      sidecar.remoteIndexGeneration,
      "42",
      "sidecar must record the generation from pullIndex's GET response",
    );

    // Positive: on-disk index must reflect the local mtimes pullChanged
    // recorded for each downloaded file — NOT the seeded epoch value.
    // Pre-fix, the on-disk file was last written by pullIndex from the
    // raw remote payload and still carried machine-A's epoch mtimes.
    const indexText = await Deno.readTextFile(
      join(cachePath, ".datastore-index.json"),
    );
    const onDiskIndex = JSON.parse(indexText) as {
      entries: Record<string, { size: number; localMtime?: string }>;
    };
    for (const { rel } of seeded) {
      const entry = onDiskIndex.entries[rel];
      assertExists(entry, `entry ${rel} must persist on disk`);
      assertExists(
        entry.localMtime,
        `entry ${rel} must carry a localMtime on disk`,
      );
      assert(
        entry.localMtime !== aMtime,
        `entry ${rel} on-disk localMtime must NOT be the seeded machine-A epoch — pre-fix the on-disk index still carried it`,
      );
      const parsed = Date.parse(entry.localMtime!);
      assert(
        !Number.isNaN(parsed),
        `entry ${rel} localMtime must be a parseable ISO timestamp`,
      );
    }

    // Symptom: fresh service C against the same cache dir simulates the
    // cross-process scenario from the issue (`swamp datastore sync
    // --push` run as a separate command). Snapshot mock.puts BEFORE so
    // any writeback PUT from pullChanged doesn't pollute the count.
    const putsBefore = mock.puts.length;
    const serviceC = new GcsCacheSyncService(mock, cachePath);
    const pushed = await serviceC.pushChanged();
    assertEquals(
      pushed,
      0,
      `pushChanged after a fresh-process pullChanged must not redundantly upload — saw ${pushed} pushes against ${SIZES.length} unchanged files`,
    );
    const dataPuts = mock.puts.slice(putsBefore).filter((p) =>
      p.key !== ".datastore-index.json"
    );
    assertEquals(
      dataPuts.length,
      0,
      `expected zero data PUTs against an unchanged cache, saw ${dataPuts.length}: ${
        dataPuts.map((p) => p.key).join(", ")
      }`,
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// ============================================================================
// Per-path dirty tracking (Phase 2)
// ============================================================================

Deno.test("markDirty(relPath): scoped push only uploads dirty paths, skips non-dirty files", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-scoped-push-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Prime clean baseline
    await service.pullChanged();

    // Seed 3 files but only mark 2 dirty
    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await seedFile(cachePath, "data/b.yaml", "bbb\n");
    await seedFile(cachePath, "data/c.yaml", "ccc\n");
    await service.markDirty({ relPath: "data/a.yaml" });
    await service.markDirty({ relPath: "data/b.yaml" });

    mock.puts.length = 0;
    await service.pushChanged();

    const pushedKeys = mock.puts
      .filter((p) => p.key !== ".datastore-index.json")
      .map((p) => p.key)
      .sort();
    assertEquals(
      pushedKeys,
      ["data/a.yaml", "data/b.yaml"],
      "scoped push must only upload the 2 dirty files",
    );
    assert(
      !mock.puts.some((p) => p.key === "data/c.yaml"),
      "non-dirty file c.yaml must NOT be uploaded",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty(): no relPath triggers full walk (bulk invalidation)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-bulk-dirty-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await seedFile(cachePath, "data/b.yaml", "bbb\n");
    // Bulk invalidation — no relPath
    await service.markDirty();

    mock.puts.length = 0;
    await service.pushChanged();

    const pushedKeys = mock.puts
      .filter((p) => p.key !== ".datastore-index.json")
      .map((p) => p.key)
      .sort();
    assertEquals(
      pushedKeys,
      ["data/a.yaml", "data/b.yaml"],
      "bulk invalidation must walk and upload all changed files",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("pushChanged: cold start (no sidecar) triggers full walk", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-cold-start-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));

    await seedFile(cachePath, "data/a.yaml", "aaa\n");

    // No priming, no sidecar — fresh service
    const service = new GcsCacheSyncService(mock, cachePath);
    mock.puts.length = 0;
    await service.pushChanged();

    assert(
      mock.puts.some((p) => p.key === "data/a.yaml"),
      "cold start with no sidecar must fall through to full walk",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("pushChanged: v1 sidecar treated as bulkInvalidated → full walk", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-v1-migrate-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));

    // Write a v1 sidecar manually
    await Deno.mkdir(cachePath, { recursive: true });
    await Deno.writeTextFile(
      join(cachePath, ".datastore-sync-state.json"),
      JSON.stringify({
        version: 1,
        remoteIndexGeneration: "1",
        lastVerifiedAt: "2026-01-01T00:00:00.000Z",
        localDirty: true,
      }),
    );
    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await seedFile(cachePath, "data/b.yaml", "bbb\n");

    const service = new GcsCacheSyncService(mock, cachePath);
    mock.puts.length = 0;
    await service.pushChanged();

    const pushedKeys = mock.puts
      .filter((p) => p.key !== ".datastore-index.json")
      .map((p) => p.key)
      .sort();
    assertEquals(
      pushedKeys,
      ["data/a.yaml", "data/b.yaml"],
      "v1 sidecar with localDirty=true must trigger full walk (bulkInvalidated)",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty: per-path then bulk in same session → bulk wins (rule 8)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-rule8-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await seedFile(cachePath, "data/b.yaml", "bbb\n");

    // Per-path first, then bulk
    await service.markDirty({ relPath: "data/a.yaml" });
    await service.markDirty(); // bulk — overrides per-path

    // Verify sidecar shows bulkInvalidated
    const sidecar = JSON.parse(
      await Deno.readTextFile(join(cachePath, ".datastore-sync-state.json")),
    );
    assertEquals(sidecar.bulkInvalidated, true, "bulk must override per-path");
    assertEquals(
      sidecar.dirtyPaths,
      ["data/a.yaml"],
      "dirtyPaths preserved but bulk wins",
    );

    mock.puts.length = 0;
    await service.pushChanged();

    // Both files uploaded (full walk due to bulk)
    const pushedKeys = mock.puts
      .filter((p) => p.key !== ".datastore-index.json")
      .map((p) => p.key)
      .sort();
    assertEquals(
      pushedKeys,
      ["data/a.yaml", "data/b.yaml"],
      "bulk invalidation must cause full walk even with dirtyPaths set",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty(relPath): push clears dirty state, next push returns 0", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "gcssync-clear-dirty-" });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await service.markDirty({ relPath: "data/a.yaml" });

    // First push uploads the dirty file
    await service.pushChanged();
    assert(
      mock.puts.some((p) => p.key === "data/a.yaml"),
      "first push must upload the dirty file",
    );

    // Verify sidecar is clean after push
    const sidecar = JSON.parse(
      await Deno.readTextFile(join(cachePath, ".datastore-sync-state.json")),
    );
    assertEquals(sidecar.localDirty, false, "sidecar must be clean after push");
    assertEquals(
      sidecar.dirtyPaths,
      [],
      "dirtyPaths must be cleared after push",
    );
    assertEquals(
      sidecar.bulkInvalidated,
      false,
      "bulkInvalidated must be cleared after push",
    );

    // Second push with no new dirty paths — fast path returns 0
    mock.puts.length = 0;
    mock.gets.length = 0;
    const result = await service.pushChanged();
    assertEquals(
      result,
      0,
      "second push with no dirty paths must fast-path to 0",
    );
    assertEquals(
      mock.puts.length,
      0,
      "no uploads on second push",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty(relPath): deleted file removed from index during scoped push", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-deleted-dirty-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    // Prime and push a file so it's in the remote index
    await service.pullChanged();
    await seedFile(cachePath, "data/ephemeral.yaml", "will-be-deleted\n");
    await service.markDirty({ relPath: "data/ephemeral.yaml" });
    await service.pushChanged();

    // Now mark it dirty again, then delete it from disk before push
    const svc2 = new GcsCacheSyncService(mock, cachePath);
    await svc2.markDirty({ relPath: "data/ephemeral.yaml" });
    await Deno.remove(join(cachePath, "data/ephemeral.yaml"));

    mock.puts.length = 0;
    await svc2.pushChanged();

    // File should be removed from the index (rule 2), triggering writeback
    assert(
      mock.puts.some((p) => p.key === ".datastore-index.json"),
      "index writeback must fire when a dirty path is deleted from disk",
    );
    const writtenIndex = mock.puts.find(
      (p) => p.key === ".datastore-index.json",
    );
    assertExists(writtenIndex);
    const parsed = decodeIndex(writtenIndex.body);
    assertEquals(
      parsed.entries["data/ephemeral.yaml"],
      undefined,
      "deleted file must be removed from the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

Deno.test("markDirty: rejects empty, absolute, and traversal relPaths", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "gcssync-bad-relpath-",
  });
  try {
    const mock = createMockGcsClient();
    await mock.putObject(".datastore-index.json", encodeIndex({}));
    const service = new GcsCacheSyncService(mock, cachePath);

    await service.pullChanged();

    // All of these should be silently rejected (no sidecar write)
    await service.markDirty({ relPath: "" });
    await service.markDirty({ relPath: "/etc/passwd" });
    await service.markDirty({ relPath: "../../etc/passwd" });
    await service.markDirty({ relPath: "data/../../../etc/shadow" });

    const sidecar = JSON.parse(
      await Deno.readTextFile(join(cachePath, ".datastore-sync-state.json")),
    );
    assertEquals(
      sidecar.localDirty,
      false,
      "bad relPaths must not flip localDirty",
    );
    assertEquals(
      sidecar.dirtyPaths,
      [],
      "bad relPaths must not be added to dirtyPaths",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});
