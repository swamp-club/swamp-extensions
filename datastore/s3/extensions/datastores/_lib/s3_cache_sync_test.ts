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

// Tests for S3CacheSyncService focusing on the swamp-club#29 fix:
// the sync walker and index scrub must keep internal files
// (including the SQLite catalog at `_catalog.db*`) from crossing the
// sync boundary in either direction, and zombie entries from pre-fix
// remote indexes must self-heal via the `indexMutated` flag.

import {
  assert,
  assertEquals,
  assertExists,
  assertRejects,
} from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import {
  isInternalCacheFile,
  isRetryableError,
  retryWithBackoff,
  S3CacheSyncService,
} from "./s3_cache_sync.ts";
import { S3Client, S3OperationError } from "./s3_client.ts";

/** Creates an error that matches the SDK's "object not found" shape. */
function makeNoSuchKeyError(key: string): Error {
  const err = new Error(`NoSuchKey: ${key}`);
  err.name = "NoSuchKey";
  return err;
}

/** Captured putObject call for test assertions. */
interface PutCall {
  key: string;
  body: Uint8Array;
}

/**
 * Deterministic content-derived ETag, surrounded by quotes to mirror
 * the real S3 wire format. Different bodies produce different ETags;
 * identical bodies produce identical ETags.
 */
function fakeETag(body: Uint8Array): string {
  let h = 0xdeadbeef >>> 0;
  for (const b of body) {
    h = ((h ^ b) * 16777619) >>> 0;
  }
  return `"${h.toString(16).padStart(8, "0")}"`;
}

/**
 * In-memory mock of S3Client recording getObject/putObject/headObject/
 * listAllObjects calls. `etagOverrides` lets a test pin a specific
 * ETag (for example a multipart-shaped one) regardless of stored
 * content.
 */
function createMockS3Client(): S3Client & {
  storage: Map<string, Uint8Array>;
  etagOverrides: Map<string, string>;
  puts: PutCall[];
  gets: string[];
  heads: string[];
  lists: number;
} {
  const storage = new Map<string, Uint8Array>();
  const etagOverrides = new Map<string, string>();
  const puts: PutCall[] = [];
  const gets: string[] = [];
  const heads: string[] = [];
  const counters = { lists: 0 };

  const etagFor = (key: string, body: Uint8Array): string =>
    etagOverrides.get(key) ?? fakeETag(body);

  return {
    storage,
    etagOverrides,
    puts,
    gets,
    heads,
    get lists() {
      return counters.lists;
    },

    putObject(key: string, body: Uint8Array): Promise<{ etag: string }> {
      storage.set(key, body);
      puts.push({ key, body });
      return Promise.resolve({ etag: etagFor(key, body) });
    },

    getObject(
      key: string,
    ): Promise<{ data: Uint8Array; etag?: string }> {
      gets.push(key);
      const data = storage.get(key);
      if (!data) return Promise.reject(makeNoSuchKeyError(key));
      return Promise.resolve({ data, etag: etagFor(key, data) });
    },

    headObject(
      key: string,
    ): Promise<
      { exists: boolean; size?: number; lastModified?: Date; etag?: string }
    > {
      heads.push(key);
      const data = storage.get(key);
      if (!data) return Promise.resolve({ exists: false });
      return Promise.resolve({
        exists: true,
        size: data.length,
        etag: etagFor(key, data),
      });
    },

    listAllObjects(): Promise<
      Array<{
        key: string;
        size: number;
        etag?: string;
        lastModified?: Date;
      }>
    > {
      counters.lists++;
      return Promise.resolve(
        [...storage.entries()].map(([key, body]) => ({
          key,
          size: body.length,
          etag: etagFor(key, body),
        })),
      );
    },
  } as unknown as S3Client & {
    storage: Map<string, Uint8Array>;
    etagOverrides: Map<string, string>;
    puts: PutCall[];
    gets: string[];
    heads: string[];
    lists: number;
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
function privateState(service: S3CacheSyncService): {
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-a-" });
  try {
    const mock = createMockS3Client();
    const service = new S3CacheSyncService(mock, cachePath);

    // Seed legitimate payload plus catalog files plus internal files.
    await seedFile(cachePath, "data/@my-model/payload.yaml", "name: x\n");
    await seedFile(cachePath, "data/_catalog.db", "SQLITE-MAIN");
    await seedFile(cachePath, "data/_catalog.db-shm", "SQLITE-SHM");
    await seedFile(cachePath, "data/_catalog.db-wal", "SQLITE-WAL");

    await service.pushChanged();

    // Expect exactly two puts: the legitimate payload plus the
    // index write-back. Nothing matching _catalog.db*.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-b-" });
  try {
    const mock = createMockS3Client();
    const service = new S3CacheSyncService(mock, cachePath);

    // Seed a valid empty index so loadIndex succeeds, then seed the
    // other two internal files as raw walk-targets. The assertion is
    // that the walker skips them, not that loadIndex parses them.
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
    // Only the payload plus the index write-back. Internal files
    // must never appear as standalone put targets.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-c-" });
  try {
    const mock = createMockS3Client();
    // Seed a CLEAN remote index (no zombies). pullIndex will fetch this,
    // scrub is a no-op, then we manually inject a zombie entry before
    // the walker runs to prove the walker's own skip is load-bearing.
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
    // Pre-populate the legitimate local file so pullChanged doesn't
    // have to fetch it (size match → skip).
    await seedFile(cachePath, "data/@m/ok.yaml", "ok: yes\n");

    const service = new S3CacheSyncService(mock, cachePath);
    // Force pullIndex first so we can mutate the in-memory index
    // AFTER scrub has already run.
    await service.pullIndex();

    // Inject a zombie entry directly into the in-memory index, bypassing
    // scrub. The walker must still skip this via isInternalCacheFile.
    const state = privateState(service);
    assertExists(state.index);
    state.index.entries["data/_catalog.db-wal"] = {
      key: "data/_catalog.db-wal",
      size: 1024,
      lastModified: new Date().toISOString(),
    };

    await service.pullChanged();

    // The walker must not have tried to fetch the injected zombie.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-d-" });
  try {
    const mock = createMockS3Client();
    // Remote index contains both a legitimate entry and a zombie.
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
    // Fake remote payload so pullChanged's fetch succeeds.
    mock.storage.set(
      "data/@m/payload.yaml",
      new TextEncoder().encode("hi!\n\n"),
    );

    const service = new S3CacheSyncService(mock, cachePath);
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

// -- (e1) pullIndex S3-fetch path scrubs in-memory AND rewrites local ----

Deno.test("pullIndex S3-fetch path: scrubs in-memory and rewrites local cache file", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-e1-" });
  try {
    const mock = createMockS3Client();
    // Remote index has zombies. No local cache file yet → forces the
    // S3-fetch branch.
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

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullIndex();

    // In-memory state: zombies gone.
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

    // Local cache file at <cachePath>/.datastore-index.json must
    // have been rewritten with the scrubbed JSON, not the raw
    // polluted text.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-e2-" });
  try {
    const mock = createMockS3Client();

    // Pre-seed a POLLUTED local cache file so pullIndex takes the
    // cache-hit branch. Remote index is left empty — we must never
    // call getObject for it on this path.
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

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullIndex();

    // Must have taken the cache-hit branch (no remote fetch).
    assertEquals(
      mock.gets.includes(".datastore-index.json"),
      false,
      "cache-hit branch must not fetch the index from S3",
    );

    // In-memory state is scrubbed.
    const state = privateState(service);
    assertExists(state.index);
    assertEquals(Object.keys(state.index.entries).sort(), ["data/@m/ok.yaml"]);
    assertEquals(state.indexMutated, true);

    // The on-disk file is NOT rewritten by the cache-hit branch.
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

// -- (h) self-healing discovery for unindexed buckets (swamp-club #225) ---

// Test A — discovery from a populated bucket without an index.
// pullIndex's NotFound branch must list, build, and publish a synthesized
// index whose entries match the listing exactly (no extras, no
// omissions, sizes match).
Deno.test("pullIndex: discovers files when remote index is missing (swamp-club #225)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-225-A-" });
  try {
    const mock = createMockS3Client();
    // Bucket has data files but no .datastore-index.json.
    mock.storage.set(
      "data/@org/m/payload-1.yaml",
      new TextEncoder().encode("hello\n"),
    );
    mock.storage.set(
      "data/@org/m/payload-2.yaml",
      new TextEncoder().encode("world!\n"),
    );

    const service = new S3CacheSyncService(mock, cachePath);
    const fingerprint = await (service as unknown as {
      pullIndex: (
        opts: { forceRemote: boolean },
      ) => Promise<string | null>;
    }).pullIndex({ forceRemote: true });

    // 1. discovery wrote the index back
    const indexPut = mock.puts.find((p) => p.key === ".datastore-index.json");
    assertExists(indexPut, "discovery must publish a synthesized index");

    // 2. synthesized index entries match the listing EXACTLY
    const synthesized = JSON.parse(new TextDecoder().decode(indexPut.body));
    assertEquals(
      Object.keys(synthesized.entries).sort(),
      ["data/@org/m/payload-1.yaml", "data/@org/m/payload-2.yaml"],
      "synthesized index keys must match the bucket listing exactly",
    );
    assertEquals(synthesized.entries["data/@org/m/payload-1.yaml"].size, 6);
    assertEquals(synthesized.entries["data/@org/m/payload-2.yaml"].size, 7);

    // 3. fingerprint returned (the put response ETag) so the caller's
    //    slow-path bookkeeping behaves like a normal index fetch
    assertExists(fingerprint, "discovery must return a fingerprint ETag");

    // 4. in-memory index reflects discovery
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-225-B-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(
      "data/@org/m/a.yaml",
      new TextEncoder().encode("alpha\n"),
    );
    mock.storage.set(
      "data/@org/m/b.yaml",
      new TextEncoder().encode("beta\n"),
    );

    const service = new S3CacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-225-C-" });
  try {
    const mock = createMockS3Client();
    // One legitimate data file, plus three classes of internal files
    // that must NEVER appear in a synthesized index: lock, push-queue,
    // and a SQLite catalog file.
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

    const service = new S3CacheSyncService(mock, cachePath);
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

// Test D — empty bucket regression pin: brand-new-bucket fallthrough is
// preserved. No PutObject must fire; in-memory entries must be {}.
Deno.test("pullIndex discovery: empty bucket falls through to empty index (swamp-club #225 regression pin)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-225-D-" });
  try {
    const mock = createMockS3Client();
    // Storage is intentionally empty.
    const service = new S3CacheSyncService(mock, cachePath);
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

// Test E — pushChanged side benefit. Previously, push against an
// unindexed populated bucket would write an index reflecting only LOCAL
// files, dropping existing remote entries from the index even though
// the storage still held them. With discovery in pullIndex, push first
// builds a complete merged view.
Deno.test("pushChanged: against unindexed populated bucket builds a complete index (swamp-club #225 side benefit)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-225-E-" });
  try {
    const mock = createMockS3Client();
    // Remote has a pre-existing data file but no index.
    mock.storage.set(
      "data/@org/m/remote-only.yaml",
      new TextEncoder().encode("remote\n"),
    );
    // Local cache has a different file ready to push.
    await seedFile(cachePath, "data/@org/m/local-only.yaml", "local\n");

    const service = new S3CacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(pushed, 1, "exactly one local file should push");

    // Final remote index must contain BOTH the remote-only and the
    // local-only entry — the pre-existing remote file is NOT lost.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-g-" });
  try {
    const mock = createMockS3Client();

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

    const service = new S3CacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-f-" });
  try {
    const mock = createMockS3Client();

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

    const service = new S3CacheSyncService(mock, cachePath);

    // First push: no files to push, but remote scrub triggered the flag.
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

    // Second push on the same instance: remote is now clean, no-op.
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-h-" });
  try {
    const puts: PutCall[] = [];
    const mock = {
      putObject(key: string, body: Uint8Array): Promise<void> {
        puts.push({ key, body });
        return Promise.resolve();
      },
      getObject(
        _key: string,
      ): Promise<{ data: Uint8Array; etag?: string }> {
        // Simulate a transient 5xx: generic Error with no matching name.
        return Promise.reject(new Error("500 Internal Server Error"));
      },
    } as unknown as S3Client;

    await seedFile(cachePath, "data/@m/payload.yaml", "data\n");

    const service = new S3CacheSyncService(mock, cachePath);

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

// -- DEF-2: retry + classification + batch failure message ------------------

/** Build an S3OperationError carrying a specific HTTP status. */
function opError(status: number): S3OperationError {
  return new S3OperationError(`S3 test failed HTTP ${status}`, {
    name: "TestError",
    cause: new Error("test"),
    httpStatusCode: status,
    code: "TestError",
    requestId: "r",
    bodyPreview: undefined,
  });
}

Deno.test("isRetryableError: 5xx and 429 are retryable, 4xx is not", () => {
  assertEquals(isRetryableError(opError(500)), true);
  assertEquals(isRetryableError(opError(503)), true);
  assertEquals(isRetryableError(opError(429)), true);
  assertEquals(isRetryableError(opError(403)), false);
  assertEquals(isRetryableError(opError(404)), false);
  assertEquals(isRetryableError(opError(412)), false);
});

Deno.test("isRetryableError: TimeoutError retryable, AbortError not", () => {
  const timeout = new Error("timed out");
  timeout.name = "TimeoutError";
  assertEquals(isRetryableError(timeout), true);

  const abort = new Error("aborted");
  abort.name = "AbortError";
  assertEquals(isRetryableError(abort), false);
});

Deno.test("retryWithBackoff: succeeds after transient 500", async () => {
  let attempts = 0;
  const result = await retryWithBackoff(() => {
    attempts++;
    if (attempts < 2) return Promise.reject(opError(500));
    return Promise.resolve("ok");
  }, { maxAttempts: 3, baseDelayMs: 1 });
  assertEquals(result, "ok");
  assertEquals(attempts, 2);
});

Deno.test("retryWithBackoff: does NOT retry non-retryable (403)", async () => {
  let attempts = 0;
  await assertRejects(
    () =>
      retryWithBackoff(() => {
        attempts++;
        return Promise.reject(opError(403));
      }, { maxAttempts: 3, baseDelayMs: 1 }),
    S3OperationError,
  );
  assertEquals(attempts, 1, "403 must not trigger a retry");
});

Deno.test("retryWithBackoff: exhausts maxAttempts then rethrows", async () => {
  let attempts = 0;
  await assertRejects(
    () =>
      retryWithBackoff(() => {
        attempts++;
        return Promise.reject(opError(500));
      }, { maxAttempts: 3, baseDelayMs: 1 }),
    S3OperationError,
  );
  assertEquals(attempts, 3);
});

Deno.test("pushChanged: batch failure message includes underlying error details", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-test-retry-" });
  try {
    // Mock whose putObject rejects with 403 (non-retryable, so fails fast)
    // for every file push. Index fetch returns empty so writeback is unused.
    // Empty listAllObjects keeps the swamp-club#225 discovery fallback on
    // its empty-bucket branch — no synthesized index, behaves like the
    // original brand-new-bucket case.
    const mock = {
      getObject(
        key: string,
      ): Promise<{ data: Uint8Array; etag?: string }> {
        if (key === ".datastore-index.json") {
          const err = new Error("NoSuchKey");
          err.name = "NoSuchKey";
          return Promise.reject(err);
        }
        return Promise.reject(new Error("unexpected get"));
      },
      putObject(_key: string, _body: Uint8Array): Promise<void> {
        return Promise.reject(opError(403));
      },
      listAllObjects(): Promise<
        Array<{
          key: string;
          size: number;
          etag?: string;
          lastModified?: Date;
        }>
      > {
        return Promise.resolve([]);
      },
    } as unknown as S3Client;

    await seedFile(cachePath, "data/a.yaml", "1\n");
    await seedFile(cachePath, "data/b.yaml", "2\n");

    const service = new S3CacheSyncService(mock, cachePath);
    let caught: unknown;
    try {
      await service.pushChanged();
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof Error);
    const msg = (caught as Error).message;
    assert(
      msg.includes("HTTP 403"),
      `batch failure message must include underlying error text, got: ${msg}`,
    );
    assert(
      msg.includes("data/a.yaml"),
      `batch failure message must list failed files, got: ${msg}`,
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// --- DEF-2 integration: real AWS SDK → real HTTP → retry classification ---
//
// These tests exercise retryWithBackoff + pushFile against the real
// @aws-sdk/client-s3 going over a real TCP socket. The unit tests above
// use hand-built S3OperationError objects; these prove the SDK actually
// surfaces 5xx/429 in a shape isRetryableError recognizes, so a failure
// mode the mocks can't catch — "the SDK returned an error named
// 'ServiceException' instead of an S3OperationError with httpStatusCode"
// — would be caught here.
//
// `maxAttempts: 2, baseDelayMs: 10` keeps integration test wall time
// under a second while still exercising the retry path end-to-end.

/**
 * Start a local HTTP server whose response on the Nth request is
 * controlled by `responses[N-1]`; after responses run out, further
 * requests return 500. Also counts requests so tests can assert
 * retries actually fired.
 */
function withProgrammableServer(
  responses: Array<() => Response>,
  fn: (s3: S3Client, state: { requestCount: number }) => Promise<void>,
): Promise<void> {
  const state = { requestCount: 0 };
  const server = Deno.serve({ port: 0, onListen() {} }, () => {
    const i = state.requestCount++;
    const handler = responses[i] ??
      (() => new Response("overflow", { status: 500 }));
    return handler();
  });
  const addr = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  const cleanup = async () => {
    if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  };

  const s3 = new S3Client({
    bucket: "test-bucket",
    region: "us-east-1",
    endpoint: `http://127.0.0.1:${addr.port}`,
    forcePathStyle: true,
  });

  return fn(s3, state).finally(cleanup);
}

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff treats a real SDK 503 as retryable",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>ServiceUnavailable</Code><Message>try later</Message><RequestId>r503</RequestId></Error>',
            {
              status: 503,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        await retryWithBackoff(
          () => s3.putObject("k", new Uint8Array([1, 2, 3])),
          { maxAttempts: 3, baseDelayMs: 10 },
        );
        assertEquals(
          state.requestCount,
          2,
          "503 must trigger a retry that succeeds on attempt 2",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff treats a real SDK 429 as retryable",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>SlowDown</Code><Message>throttled</Message><RequestId>r429</RequestId></Error>',
            {
              status: 429,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        await retryWithBackoff(
          () => s3.putObject("k", new Uint8Array([1, 2, 3])),
          { maxAttempts: 3, baseDelayMs: 10 },
        );
        assertEquals(
          state.requestCount,
          2,
          "429 must trigger a retry that succeeds on attempt 2",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "integration: retryWithBackoff does NOT retry a real SDK 403",
  fn: () =>
    withProgrammableServer(
      [
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>AccessDenied</Code><Message>nope</Message><RequestId>r403</RequestId></Error>',
            {
              status: 403,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        // A second stub that would "succeed" — if we see it used, the
        // predicate wrongly classified 403 as retryable.
        () => new Response(null, { status: 200 }),
      ],
      async (s3, state) => {
        let caught: unknown;
        try {
          await retryWithBackoff(
            () => s3.putObject("k", new Uint8Array([1, 2, 3])),
            { maxAttempts: 3, baseDelayMs: 10 },
          );
        } catch (e) {
          caught = e;
        }
        assert(
          caught instanceof S3OperationError,
          "expected S3OperationError from 403",
        );
        assertEquals(
          state.requestCount,
          1,
          "403 must NOT trigger a retry",
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  sanitizeOps: false,
  name:
    "integration: retryWithBackoff treats a real SDK TimeoutError as retryable",
  fn: async () => {
    // Use a short per-request timeout (100ms) and a first-response delay
    // greater than it (600ms). Attempt 1 hits the timeout; attempt 2
    // responds immediately with 200.
    const state = { requestCount: 0 };
    const server = Deno.serve({ port: 0, onListen() {} }, () => {
      const i = state.requestCount++;
      if (i === 0) {
        return new Promise<Response>((resolve) => {
          setTimeout(() => resolve(new Response(null, { status: 200 })), 600);
        });
      }
      return new Response(null, { status: 200 });
    });
    const addr = server.addr as Deno.NetAddr;
    const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
    try {
      const s3 = new S3Client({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint: `http://127.0.0.1:${addr.port}`,
        forcePathStyle: true,
        defaultRequestTimeoutMs: 100,
      });
      await retryWithBackoff(
        () => s3.putObject("k", new Uint8Array([1, 2, 3])),
        { maxAttempts: 3, baseDelayMs: 10 },
      );
      assertEquals(
        state.requestCount,
        2,
        "TimeoutError on attempt 1 must trigger a retry that succeeds on attempt 2",
      );
    } finally {
      if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
      else Deno.env.delete("AWS_ACCESS_KEY_ID");
      if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      await server.shutdown();
    }
  },
});

Deno.test({
  sanitizeResources: false,
  sanitizeOps: false,
  name:
    "integration: retryWithBackoff treats a real SDK connection reset as retryable",
  fn: async () => {
    // Accept attempt 1 and slam the socket closed, accept attempt 2 and
    // return a proper HTTP 200. Verifies the AWS SDK's transport-level
    // error (name "Http", no httpStatusCode) is classified retryable.
    //
    // Uses raw Deno.listen instead of Deno.serve because Deno.serve
    // writes a basic HTTP response on handler throw, which would give us
    // an HTTP error instead of a connection-level one.
    const listener = Deno.listen({ port: 0 });
    const addr = listener.addr as Deno.NetAddr;
    let attempt = 0;

    const acceptLoop = (async () => {
      for await (const conn of listener) {
        attempt++;
        if (attempt === 1) {
          // Connection reset: close without reading, without responding.
          try {
            conn.close();
          } catch {
            // already closed
          }
        } else {
          // Attempt 2: read the request (best-effort), then write 200.
          const buf = new Uint8Array(4096);
          try {
            await conn.read(buf);
          } catch {
            // body may be larger; ignoring
          }
          const resp =
            "HTTP/1.1 200 OK\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
          try {
            await conn.write(new TextEncoder().encode(resp));
          } catch {
            // peer may have closed
          }
          try {
            conn.close();
          } catch {
            // already closed
          }
        }
      }
    })();

    const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
    try {
      const s3 = new S3Client({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint: `http://127.0.0.1:${addr.port}`,
        forcePathStyle: true,
      });
      await retryWithBackoff(
        () => s3.putObject("k", new Uint8Array([1, 2, 3])),
        { maxAttempts: 3, baseDelayMs: 10 },
      );
      assertEquals(
        attempt,
        2,
        "connection reset on attempt 1 must trigger a retry that succeeds on attempt 2",
      );
    } finally {
      if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
      else Deno.env.delete("AWS_ACCESS_KEY_ID");
      if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      try {
        listener.close();
      } catch {
        // already closed
      }
      await acceptLoop.catch(() => {}); // listener.close races accept()
    }
  },
});

Deno.test({
  sanitizeResources: false,
  name: "integration: pushFile retries a transient 503 via the real SDK path",
  fn: async () => {
    const cachePath = await Deno.makeTempDir({
      prefix: "s3sync-integration-",
    });
    try {
      await seedFile(cachePath, "data/a.yaml", "payload\n");

      await withProgrammableServer(
        [
          () =>
            new Response(
              '<?xml version="1.0"?><Error><Code>ServiceUnavailable</Code><Message>try later</Message><RequestId>rA</RequestId></Error>',
              {
                status: 503,
                headers: { "Content-Type": "application/xml" },
              },
            ),
          () => new Response(null, { status: 200 }),
        ],
        async (s3, state) => {
          const service = new S3CacheSyncService(s3, cachePath);
          // pushFile is what's called inside pushChanged's Promise.allSettled;
          // calling it directly isolates the retry behavior from the
          // pushChanged index writeback (which would need its own fixtures).
          await service.pushFile("data/a.yaml");
          assertEquals(
            state.requestCount,
            2,
            "pushFile must retry a transient 503 via the real SDK",
          );
        },
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  },
});

// =========================================================================
// DEF-2 fast path: zero-diff sync skips the index GET and the cache walk.
//
// The motivating bug (swamp-club lab/164): a 4k-file production repo took
// ~5 min on a no-op sync because every call fetched the 1.37 MB index and
// stat'd the entire cache. The sidecar at <cache>/.datastore-sync-state.json
// records the last verified remote ETag and a localDirty flag so the next
// pullChanged/pushChanged can short-circuit when nothing has changed.
//
// The fall-through tests below are weighted as heavily as the happy-path
// hit tests — a fast path that silently skips real work would be much
// worse than the perf bug it replaces.
// =========================================================================

const SYNC_STATE_FILE = ".datastore-sync-state.json";

/** Write a sidecar directly to disk, mimicking a prior verified-clean run. */
async function writeSidecar(
  cachePath: string,
  state: {
    version?: number;
    remoteIndexETag?: string;
    lastVerifiedAt?: string;
    localDirty?: boolean;
  },
): Promise<void> {
  await Deno.mkdir(cachePath, { recursive: true });
  await Deno.writeTextFile(
    join(cachePath, SYNC_STATE_FILE),
    JSON.stringify({
      version: 1,
      remoteIndexETag: "",
      lastVerifiedAt: new Date().toISOString(),
      localDirty: false,
      ...state,
    }),
  );
}

/** Read sidecar from disk; returns parsed JSON or null if missing/bad. */
async function readSidecar(
  cachePath: string,
): Promise<{ remoteIndexETag: string; localDirty: boolean } | null> {
  try {
    const text = await Deno.readTextFile(join(cachePath, SYNC_STATE_FILE));
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// -- (1) sidecar walker-exclusion guardrail -------------------------------

Deno.test("isInternalCacheFile: excludes the sync-state sidecar", () => {
  // The sidecar is per-machine state. If the walker ever uploads it, we
  // overwrite other writers' sidecars on push and break their fast path.
  assertEquals(isInternalCacheFile(".datastore-sync-state.json"), true);
});

Deno.test("isInternalCacheFile: excludes per-target FileLock files at any depth", () => {
  // The data tier writes per-target locks at `data/<kind>/<type>/<id>/.lock`
  // via the lock subsystem (PUT/DELETE direct to the bucket). Without this
  // exclusion, `discoverIndexFromBucket` captures transient `.lock` files
  // from the listing into the synthesized index, the lock subsystem then
  // deletes them on release, and a fresh reader hydrating from that stale
  // index 404s on the missing object — surfacing as `datastore setup`
  // failing to persist `.swamp.yaml` and the next `datastore sync --pull`
  // reporting "Current datastore type: filesystem".
  assertEquals(
    isInternalCacheFile(
      "data/command/shell/c19f88eb-de4f-4227-ade7-8162aec3d6a6/.lock",
    ),
    true,
  );
  assertEquals(isInternalCacheFile("data/@m/.lock"), true);
  // The top-level distributed lock stays excluded (already covered by the
  // exact-match branch, but the basename branch catches it too).
  assertEquals(isInternalCacheFile(".datastore.lock"), true);
  // Non-`.lock` data files are not affected.
  assertEquals(isInternalCacheFile("data/@m/.locked.yaml"), false);
  assertEquals(isInternalCacheFile("data/@m/lock"), false);
});

// -- (2) post-verified pullChanged short-circuits with zero index GETs ----

Deno.test("pullChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-pull-" });
  try {
    const mock = createMockS3Client();
    // Seed a remote index + matching local file so the first pullChanged
    // ends in verified zero-diff state.
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

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();
    // First call should have GET'd the index once.
    const firstIndexGets = mock.gets.filter((k) =>
      k === ".datastore-index.json"
    ).length;
    assertEquals(firstIndexGets, 1, "first call must fetch the index");

    // Reset call history for the second call's assertion.
    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();
    assertEquals(result, 0, "second pullChanged must report zero pulls");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path must NOT GET the index",
    );
    // The HEAD probe is the entire fast-path check — exactly one expected.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      1,
      "fast path issues exactly one HEAD on the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (3) post-verified pushChanged short-circuits with zero walk ----------

Deno.test("pushChanged: post-verified second call hits fast path with zero index GETs", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-push-" });
  try {
    const mock = createMockS3Client();
    // Empty remote, empty local cache. Priming via pullChanged sets the
    // sidecar via its end-of-walk markSynced (the legitimate path).
    // pushChanged's no-op no-writeback branch deliberately does NOT
    // mark the sidecar clean (swamp-club #1225) since `pushed === 0`
    // doesn't prove local matches remote.
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    await Deno.mkdir(cachePath, { recursive: true });

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();

    mock.gets.length = 0;
    mock.heads.length = 0;
    mock.puts.length = 0;

    const result = await service.pushChanged();
    assertEquals(result, 0, "second pushChanged must report zero pushes");
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "fast path must NOT force-fetch the index",
    );
    assertEquals(
      mock.puts.length,
      0,
      "fast path must NOT trigger an index writeback",
    );
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      1,
      "fast path issues exactly one HEAD on the index",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (4) corrupt sidecar falls through, never throws ----------------------

Deno.test("pullChanged: corrupt sidecar (bad JSON / wrong version / missing fields) falls through to full walk", async () => {
  for (
    const corrupt of [
      "this is not json",
      JSON.stringify({ version: 999 }),
      JSON.stringify({
        version: 1,
        // missing remoteIndexETag, lastVerifiedAt, localDirty
      }),
      JSON.stringify({
        version: 1,
        remoteIndexETag: 42, // wrong type
        lastVerifiedAt: "2026-01-01T00:00:00Z",
        localDirty: false,
      }),
    ]
  ) {
    const cachePath = await Deno.makeTempDir({
      prefix: "s3sync-fast-corrupt-",
    });
    try {
      await Deno.mkdir(cachePath, { recursive: true });
      await Deno.writeTextFile(join(cachePath, SYNC_STATE_FILE), corrupt);

      const mock = createMockS3Client();
      mock.storage.set(".datastore-index.json", encodeIndex({}));

      const service = new S3CacheSyncService(mock, cachePath);
      // Must not throw on any of the corrupt-sidecar shapes.
      const result = await service.pullChanged();
      assertEquals(result, 0);
      // And must have fallen through to the full walk: index was GET'd.
      assert(
        mock.gets.includes(".datastore-index.json"),
        `corrupt sidecar (${
          corrupt.slice(0, 30)
        }…) must fall through, not fast-path`,
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  }
});

// -- (5) remote ETag change bypasses short-circuit ------------------------

Deno.test("pullChanged: remote index ETag change bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-etag-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
    await service.pullChanged();
    const sidecarBefore = await readSidecar(cachePath);
    assertExists(sidecarBefore);

    // Remote-side mutation: write a new index payload. The mock derives
    // ETag from content, so this changes the ETag.
    mock.storage.set(
      ".datastore-index.json",
      encodeIndex({
        "data/@m/new.yaml": {
          key: "data/@m/new.yaml",
          size: 3,
          lastModified: new Date().toISOString(),
        },
      }),
    );
    mock.storage.set("data/@m/new.yaml", new TextEncoder().encode("new"));

    mock.gets.length = 0;
    mock.heads.length = 0;

    const result = await service.pullChanged();
    // Fast path must have bailed; the new file gets pulled.
    assertEquals(result, 1, "must pull the newly-added remote file");
    assert(
      mock.gets.includes(".datastore-index.json"),
      "ETag mismatch must force a real index fetch",
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
// service starts, sees fast-path miss because remote ETag has moved
// on, drops to slow path — and without `forceRemote` would walk the
// still-fresh-by-mtime local index file (process A's view) and find
// toPull=0. Result: "Pulled 0 files" while another writer's data sits
// unpulled on remote. swamp-club#1225 writer1↔writer2 path.
Deno.test("pullChanged: slow path force-fetches the remote index even when a previous process's local index is mtime-fresh", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "s3sync-pull-force-",
  });
  try {
    const mock = createMockS3Client();

    // Seed initial remote: one entry.
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
    const serviceA = new S3CacheSyncService(mock, cachePath);
    await serviceA.pullChanged();

    // Simulate another writer pushing in the meantime: replace the
    // remote index payload (ETag shifts since the mock derives it from
    // content) and add the file behind the new entry.
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
    const serviceB = new S3CacheSyncService(mock, cachePath);
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

// -- (6) multipart-shaped ETag bypasses short-circuit --------------------

Deno.test("pullChanged: multipart-shaped ETag ('abc-2') bypasses fast path", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "s3sync-fast-multipart-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    // Pin a multipart-shaped ETag for the remote index. The mock's HEAD
    // returns this regardless of body content.
    mock.etagOverrides.set(".datastore-index.json", `"abc-2"`);

    // Plant a sidecar with the matching multipart ETag — the fast path
    // must STILL bail because multipart ETags aren't a content
    // fingerprint and any equality check would be spuriously true.
    // No local index file is seeded so pullIndex's TTL cache also
    // misses and falls through to a real S3 GET, which is what the
    // assertion below proves.
    await writeSidecar(cachePath, {
      remoteIndexETag: "abc-2",
      lastVerifiedAt: new Date().toISOString(),
    });

    const service = new S3CacheSyncService(mock, cachePath);
    const result = await service.pullChanged();
    assertEquals(result, 0);
    // Multipart guard must have forced fall-through to the GET path.
    assert(
      mock.gets.includes(".datastore-index.json"),
      "multipart ETag must force fall-through to a real index GET",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (7) local file mutation forces real push work -----------------------

Deno.test("pushChanged: local file mutation since last sync forces real push work", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-mutate-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    // Establish a clean baseline.
    const service = new S3CacheSyncService(mock, cachePath);
    await service.pushChanged();

    // Now simulate the user side: a local cache write through pushFile
    // (the contracted write path), then sync.
    await seedFile(cachePath, "data/@m/added.yaml", "added\n");

    mock.puts.length = 0;
    mock.gets.length = 0;

    // Going through pushFile flips localDirty=true, so the next
    // pushChanged must take the slow path.
    await service.pushFile("data/@m/added.yaml");
    const sidecarAfterDirty = await readSidecar(cachePath);
    assertEquals(
      sidecarAfterDirty?.localDirty,
      true,
      "pushFile must flip localDirty before its work",
    );

    // Reset mock counters and run pushChanged: it must do the real walk
    // and writeback, not short-circuit.
    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();
    assert(
      mock.gets.includes(".datastore-index.json"),
      "localDirty=true must force a real index force-fetch",
    );
    assert(
      mock.puts.some((p) => p.key === ".datastore-index.json"),
      "localDirty=true must lead to an index writeback",
    );

    const sidecarAfterPush = await readSidecar(cachePath);
    assertEquals(
      sidecarAfterPush?.localDirty,
      false,
      "successful writeback must clear localDirty",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (8) AbortSignal cancellation propagates -----------------------------

Deno.test("pullChanged / pushChanged: AbortSignal cancellation propagates", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-fast-abort-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
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

    // Pre-aborted call must not have issued any S3 calls beyond — at
    // most — the sidecar HEAD probe (which itself respects the signal).
    // Confirm no GETs/PUTs leaked through.
    assertEquals(
      mock.gets.filter((k) => k === ".datastore-index.json").length,
      0,
      "no GETs after abort",
    );
    assertEquals(
      mock.puts.length,
      0,
      "no PUTs after abort",
    );
  } finally {
    await Deno.remove(cachePath, { recursive: true });
  }
});

// -- (9) guardrail: direct cache writes without markDirty bypass tracking --

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
// to re-confirm) would defeat the fast-path's purpose.

Deno.test("pushChanged: direct Deno.writeFile bypasses localDirty tracking (contract)", async () => {
  const cachePath = await Deno.makeTempDir({
    prefix: "s3sync-fast-guardrail-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    const service = new S3CacheSyncService(mock, cachePath);
    // Establish a clean baseline via pullChanged's end-of-walk
    // markSynced — the legitimate way to set the sidecar. (pushChanged
    // on an empty cache no longer marks clean from the no-op
    // no-writeback branch; swamp-club #1225.)
    await service.pullChanged();

    // Reach around the contract: write directly to the cache without
    // going through pushFile. localDirty stays false because nothing
    // told the sidecar otherwise.
    await seedFile(cachePath, "data/@m/sneaky.yaml", "sneaky\n");

    mock.puts.length = 0;
    mock.gets.length = 0;
    await service.pushChanged();

    // Fast-path hit: sneaky.yaml is NEVER uploaded. This is the
    // documented limitation — the cost of walking on every push would
    // erase DEF-2's gains, so the contract is "writes go through
    // pushFile". If you broke this test by adding a new cache writer,
    // teach that writer to flip the sidecar (or call markLocalDirty
    // itself) instead of removing this assertion.
    assertEquals(
      mock.puts.length,
      0,
      "fast path skipped the direct write — this is the documented contract, not a bug",
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
// markDirty() contract — hotfix for fast-path/core-writes data-loss.
//
// The fast-path added in #105 depends on a `localDirty` flag in the
// sidecar. That flag is flipped by `pushFile` internally OR by the
// new public `markDirty()`. swamp-core writes directly to the cache
// via atomicWriteFile, bypassing `pushFile` — so it MUST call
// `markDirty()` before (or immediately after) each write, otherwise
// the next `pushChanged` fast-paths past the write and the data is
// silently missed on upload. Test (9) above pins the
// "without markDirty" failure mode; these tests pin the
// "with markDirty" recovery path.
// ============================================================================

Deno.test("markDirty: no-arg flips sidecar to bulk-invalidated v2 and forces slow-path on next pushChanged", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-markdirty-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

    // Priming sync populates the sidecar clean.
    await service.pullChanged();
    await service.pushChanged();

    // Simulate swamp-core writing directly to the cache AND honoring
    // the new contract by calling markDirty afterwards.
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

    // Reset ledgers — next pushChanged must slow-path and walk.
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
    prefix: "s3sync-markdirty-idem-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
// swamp-club #168: fast-path sidecar TOCTOU regression tests
//
// Scenario: operator A runs a `pullChanged`/`pushChanged` that ends in
// verified zero-diff state. Concurrently, operator B pushes a new file
// that bumps the remote index's ETag between A's index GET and A's
// sidecar write. Before the fix, `markSynced` would record B's ETag
// (observed via a post-walk HEAD), and A's next fast-path sync would
// see sidecar == remote and skip B's file. After the fix, `markSynced`
// records the ETag captured from A's index GET response — the one A
// actually walked against — so B's push correctly invalidates the
// fast path on the next sync.
//
// The race window is simulated by wrapping `mock.getObject` so that a
// microtask scheduled from the returned Promise's `.then()` bumps
// `etagOverrides` and adds B's file to storage after the body has
// been delivered to `pullIndex`. Microtask ordering: the wrapped
// mock attaches `p.then(bump)` BEFORE the caller's `await`
// continuation, so bump runs first in the microtask queue — which is
// the race window (between index GET resolving and markSynced being
// called). Any refactor that moves the bump-attachment to a macrotask
// (setTimeout) would lose the race simulation; document the ordering
// invariant so the test's correctness doesn't silently rot.
// =========================================================================

Deno.test("pullChanged: records ETag from pullIndex GET, not post-walk HEAD (swamp-club #168)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-toctou-pull-" });
  try {
    const mock = createMockS3Client();
    // Seed remote index at G1 with matching local cache file so the
    // walk sees zero toPull.
    mock.etagOverrides.set(".datastore-index.json", '"etag-G1"');
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

    // Race simulation: bump the mock to G2 in a microtask scheduled
    // from the index GET's resolution. Fires between pullIndex's
    // getObject resolving and the post-walk markSynced call.
    const origGet = mock.getObject.bind(mock);
    mock.getObject = ((key: string, signal?: AbortSignal) => {
      const p = origGet(key, signal);
      if (key === ".datastore-index.json") {
        p.then(() => {
          // B's push: new file, bumped ETag.
          mock.etagOverrides.set(".datastore-index.json", '"etag-G2"');
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

    const service = new S3CacheSyncService(mock, cachePath);
    const pulled = await service.pullChanged();
    assertEquals(pulled, 0, "walk should see zero diff against G1 index");

    // The fix records G1 (the ETag we actually verified against), not
    // G2 (the post-walk HEAD value the old buggy code would have
    // observed after B's push landed).
    const sidecar = await readSidecar(cachePath);
    assertExists(sidecar);
    assertEquals(
      sidecar!.remoteIndexETag,
      "etag-G1",
      "sidecar must record the ETag from pullIndex GET, NOT a racy post-walk HEAD",
    );

    // Invariant: the fix removes the post-walk HEAD entirely. On a
    // first pullChanged (no pre-existing sidecar), the fast-path
    // probe returns null at the "no sidecar" check without HEAD'ing,
    // so zero HEADs on the index are expected. If this assertion
    // ever fails, a future maintainer likely re-added the TOCTOU HEAD.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      0,
      "no post-walk HEAD on index — TOCTOU fix removes it",
    );

    // On the second sync, the fast-path probe HEADs remote (G2),
    // compares to sidecar (G1), and correctly bails to the slow
    // path. The slow path walks and pulls B's new file. Without the
    // fix, sidecar would be G2 and this sync would return 0, masking
    // B's file until any future remote mutation invalidates.
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
// #168 TOCTOU concern is preserved: there is still no post-walk HEAD on
// the index in this branch — the branch simply does no sidecar work at
// all now.
Deno.test("pushChanged no-writeback: does NOT mark the sidecar clean when nothing was pushed (swamp-club #1225)", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-1225-push-" });
  try {
    const mock = createMockS3Client();
    // Remote has TWO files; local cache has only one of them. This is
    // the second-repo `datastore setup` scenario from production. The
    // walker sees zero LOCAL-only diffs (nothing to push), but the
    // local cache is missing `data/@m/remote-only.yaml` and must NOT
    // be recorded as in-sync.
    const existingMtime = new Date(0);
    mock.etagOverrides.set(".datastore-index.json", '"etag-G1"');
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

    const service = new S3CacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(
      pushed,
      0,
      "walker sees no local-only files, so nothing to push",
    );

    // Regression pin: the sidecar must NOT exist (or at minimum must
    // not record a clean baseline). A fast-path-eligible sidecar here
    // would let the next pullChanged skip downloading `remote-only.yaml`.
    const sidecar = await readSidecar(cachePath);
    assertEquals(
      sidecar,
      null,
      "no-writeback branch must not write the sidecar — `pushed === 0` does not prove local matches remote",
    );

    // The TOCTOU fix from swamp-club #168 is preserved: no post-walk
    // HEAD on the index in the no-writeback path.
    assertEquals(
      mock.heads.filter((k) => k === ".datastore-index.json").length,
      0,
      "no post-walk HEAD on index in no-writeback path",
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
    prefix: "s3sync-1225-recovery-",
  });
  try {
    const mock = createMockS3Client();
    mock.etagOverrides.set(".datastore-index.json", '"abc123"');
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

    const service = new S3CacheSyncService(mock, cachePath);
    const pushed = await service.pushChanged();
    assertEquals(pushed, 0, "no local-only files — nothing to push");

    // Sidecar must be regenerated because local cache provably matches
    // the remote index at the captured ETag.
    const sidecarText = await Deno.readTextFile(
      join(cachePath, ".datastore-sync-state.json"),
    );
    const sidecar = JSON.parse(sidecarText);
    assertEquals(sidecar.localDirty, false);
    assertEquals(
      sidecar.remoteIndexETag,
      "abc123",
      "sidecar must record the ETag we walked against",
    );

    // No remote writeback — ETag of the index must be untouched.
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
    prefix: "s3sync-1225-writeback-",
  });
  try {
    const mock = createMockS3Client();
    mock.etagOverrides.set(".datastore-index.json", '"abc123"');
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

    const service = new S3CacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-issue-222-" });
  try {
    const mock = createMockS3Client();
    // Pin a known ETag for the remote index so the sidecar assertion
    // doesn't have to recompute fakeETag from byte stitching.
    mock.etagOverrides.set(".datastore-index.json", '"index-pre-pull"');

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
    const serviceA = new S3CacheSyncService(mock, cachePath);
    const pulled = await serviceA.pullChanged();
    assertEquals(pulled, SIZES.length, "must pull all 5 seeded files");

    // Positive: sidecar must be written with the GET'd ETag and clean
    // state. Pre-fix, pulled > 0 skipped markSynced and this returned
    // null. Post-fix, this is the load-bearing piece that lets the next
    // pushChanged take the fast path.
    const sidecar = await readSidecar(cachePath);
    assertExists(sidecar, "pullChanged with pulled > 0 must write the sidecar");
    assertEquals(
      sidecar!.localDirty,
      false,
      "sidecar must be clean — local cache matches the freshly-pulled remote",
    );
    assertEquals(
      sidecar!.remoteIndexETag,
      "index-pre-pull",
      "sidecar must record the ETag from pullIndex's GET response",
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
    const serviceC = new S3CacheSyncService(mock, cachePath);
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

// swamp-club #225: prove the AWS SDK actually surfaces a missing-index
// 404 with the error name our pullIndex catch branch matches against.
// The unit tests above use a hand-built mock that throws Error{name:
// "NoSuchKey"} — this proves the real SDK produces the same shape going
// over real HTTP. Without this, an SDK upgrade could rename or
// reclassify the error and silently break the discovery fallback.
//
// `sanitizeResources: false` is the same setting used by every test in
// the DEF-2 integration block above (see line 1076): the AWS SDK keeps
// TCP connections alive in its keep-alive agent, which trips Deno's
// resource-leak detector. The connections are reclaimed when the
// runtime tears down between test runs, so this is safe.
Deno.test({
  sanitizeResources: false,
  name:
    "integration: pullIndex discovery handles real SDK 404 on missing index (swamp-club #225)",
  fn: async () => {
    const cachePath = await Deno.makeTempDir({
      prefix: "s3sync-225-integration-",
    });
    try {
      await withProgrammableServer(
        [
          // 1. GET .datastore-index.json → 404 NoSuchKey
          //    (the catch branch our discovery hangs off)
          () =>
            new Response(
              '<?xml version="1.0"?><Error><Code>NoSuchKey</Code><Message>The specified key does not exist.</Message><Key>.datastore-index.json</Key><RequestId>r1</RequestId></Error>',
              {
                status: 404,
                headers: { "Content-Type": "application/xml" },
              },
            ),
          // 2. ListObjectsV2 → one Contents entry
          //    (proves the real SDK parses Size + ETag from the listing)
          () =>
            new Response(
              '<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>test-bucket</Name><KeyCount>1</KeyCount><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated><Contents><Key>data/discovered.yaml</Key><Size>6</Size><ETag>&quot;abc123&quot;</ETag><LastModified>2026-05-04T12:00:00.000Z</LastModified></Contents></ListBucketResult>',
              {
                status: 200,
                headers: { "Content-Type": "application/xml" },
              },
            ),
          // 3. PUT .datastore-index.json (synthesized index writeback)
          () =>
            new Response(null, {
              status: 200,
              headers: { ETag: '"index-etag"' },
            }),
        ],
        async (s3, state) => {
          const service = new S3CacheSyncService(s3, cachePath);
          // Call pullIndex directly to scope the test to the discovery
          // path — pullChanged would also work but adds concurrent
          // file GETs whose ordering against the programmable server
          // is non-deterministic.
          const fingerprint = await (service as unknown as {
            pullIndex: (
              opts: { forceRemote: boolean },
            ) => Promise<string | null>;
          }).pullIndex({ forceRemote: true });
          assertEquals(
            state.requestCount,
            3,
            "discovery must produce exactly 3 SDK requests: GET index (404), ListObjectsV2, PUT index",
          );
          // The SDK surfaces the PUT response ETag with its surrounding
          // double-quotes — `normalizeETag()` is what the sidecar
          // bookkeeping uses for comparisons. The discovery path
          // returns the raw form, matching the post-fetch path's
          // contract.
          assertEquals(
            fingerprint,
            '"index-etag"',
            "discovery must return the synthesized index's ETag from the real PUT response",
          );
        },
      );
    } finally {
      await Deno.remove(cachePath, { recursive: true });
    }
  },
});

// ============================================================================
// Per-path dirty tracking (Phase 2)
// ============================================================================

Deno.test("markDirty(relPath): scoped push only uploads dirty paths, skips non-dirty files", async () => {
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-scoped-push-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-bulk-dirty-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-cold-start-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    await seedFile(cachePath, "data/a.yaml", "aaa\n");

    // No priming, no sidecar — fresh service
    const service = new S3CacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-v1-migrate-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));

    // Write a v1 sidecar manually
    await Deno.mkdir(cachePath, { recursive: true });
    await Deno.writeTextFile(
      join(cachePath, ".datastore-sync-state.json"),
      JSON.stringify({
        version: 1,
        remoteIndexETag: '"old-etag"',
        lastVerifiedAt: "2026-01-01T00:00:00.000Z",
        localDirty: true,
      }),
    );
    await seedFile(cachePath, "data/a.yaml", "aaa\n");
    await seedFile(cachePath, "data/b.yaml", "bbb\n");

    const service = new S3CacheSyncService(mock, cachePath);
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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-rule8-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
  const cachePath = await Deno.makeTempDir({ prefix: "s3sync-clear-dirty-" });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
    prefix: "s3sync-deleted-dirty-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

    // Prime and push a file so it's in the remote index
    await service.pullChanged();
    await seedFile(cachePath, "data/ephemeral.yaml", "will-be-deleted\n");
    await service.markDirty({ relPath: "data/ephemeral.yaml" });
    await service.pushChanged();

    // Now mark it dirty again, then delete it from disk before push
    const svc2 = new S3CacheSyncService(mock, cachePath);
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
    prefix: "s3sync-bad-relpath-",
  });
  try {
    const mock = createMockS3Client();
    mock.storage.set(".datastore-index.json", encodeIndex({}));
    const service = new S3CacheSyncService(mock, cachePath);

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
