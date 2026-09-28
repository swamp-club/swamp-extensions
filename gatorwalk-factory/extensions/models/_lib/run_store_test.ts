// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals, assertRejects, assertThrows } from "@std/assert";
import { digestOf } from "./canonical.ts";
import { expectedOf, recordDispatch } from "./run_ops.ts";
import {
  ARTIFACT_SPEC,
  contextStore,
  EVIDENCE_SPEC,
  loadRun,
  memoryStore,
  recordProduct,
  RUN_NAME,
  RUN_SPEC,
  type RunStore,
  startRun,
  update,
} from "./run_store.ts";
import { ALICE, expectNow, smallLifecycle, testEnv } from "./test_support.ts";

const LIFECYCLE = smallLifecycle();
const START = { key: "wi-1", lifecycleDigest: "sha256:l" };

Deno.test("startRun: writes the run record once; a second start is refused", async () => {
  const store = memoryStore();
  const env = testEnv();
  assert((await startRun(store, LIFECYCLE, START, ALICE, env)).ok);
  const again = await startRun(store, LIFECYCLE, START, ALICE, env);
  assert(!again.ok && again.reason.includes("already started"));
  assertEquals(store.runVersions.length, 1);
});

Deno.test("recordProduct: writes the payload, then commits the run referencing it", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const result = await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "hello" },
    ALICE,
    env,
  );
  assert(result.ok);
  assertEquals(result.version, 1);
  assertEquals(result.digest, await digestOf({ text: "hello" }));
  assertEquals(store.payloads.get("artifact-summary"), [{ text: "hello" }]);
  const run = await loadRun(store);
  assertEquals(run?.products.artifacts.summary.version, 1);
  assertEquals(run?.products.artifacts.summary.digest, result.digest);
});

Deno.test("recordProduct: an invalid payload is returned as a rejection, kept on the run, and not written", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const result = await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "" },
    ALICE,
    env,
  );
  assert(!result.ok && result.rejected);
  assert(
    result.errors.some((e) => e.startsWith("text:")),
    result.errors.join(),
  );
  assertEquals(store.payloads.size, 0);
  const run = await loadRun(store);
  assertEquals(run?.validations.artifacts.summary.rejected, { text: "" });
});

Deno.test("recordProduct: a product the stage does not declare writes nothing", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const result = await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "evidence",
    "test-run",
    { status: "succeeded", runId: "r" },
    ALICE,
    env,
  );
  assert(!result.ok && !result.rejected);
  assertEquals(store.payloads.size, 0);
  assertEquals(store.runVersions.length, 1);
});

Deno.test("commit protocol: a crash after the payload write leaves the run unchanged; the orphan is ignored", async () => {
  const inner = memoryStore();
  const env = testEnv();
  await startRun(inner, LIFECYCLE, START, ALICE, env);
  let crash = true;
  const crashing: RunStore = {
    ...inner,
    writeRun: (run) => {
      if (crash) return Promise.reject(new Error("process died"));
      return inner.writeRun(run);
    },
  };
  const expected = await expectNow(crashing);
  await assertRejects(() =>
    recordProduct(
      crashing,
      LIFECYCLE,
      expected,
      "artifact",
      "summary",
      { text: "lost" },
      ALICE,
      env,
    )
  );
  assertEquals(inner.payloads.get("artifact-summary")?.length, 1);
  assertEquals((await loadRun(inner))?.products.artifacts, {});

  crash = false;
  const retried = await recordProduct(
    crashing,
    LIFECYCLE,
    await expectNow(crashing),
    "artifact",
    "summary",
    { text: "kept" },
    ALICE,
    env,
  );
  assert(retried.ok);
  assertEquals(retried.version, 2);
  const run = await loadRun(inner);
  assertEquals(run?.products.artifacts.summary.version, 2);
  assertEquals(
    run?.journal.filter((e) => e.type === "recorded").length,
    1,
    "the lost write left no event",
  );
});

Deno.test("update: commits only when the operation succeeds", async () => {
  const store = memoryStore();
  const env = testEnv();
  assert(
    !(await update(
      store,
      (run) =>
        recordDispatch(
          run,
          LIFECYCLE,
          expectedOf(run),
          { inputs: {} },
          ALICE,
          env,
        ),
    )).ok,
  );
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const ok = await update(
    store,
    (run) =>
      recordDispatch(
        run,
        LIFECYCLE,
        expectedOf(run),
        { inputs: {} },
        ALICE,
        env,
      ),
  );
  assert(ok.ok);
  assertEquals(store.runVersions.length, 2);
  const refused = await update(store, () => ({ ok: false, reason: "no" }));
  assert(!refused.ok);
  assertEquals(store.runVersions.length, 2);
});

Deno.test("loadRun: a record this runtime cannot read is an error, not a fresh start", async () => {
  const store = memoryStore();
  store.readRun = () => Promise.resolve({ schemaVersion: 99 });
  await assertRejects(() => loadRun(store), Error, "schemaVersion 99");
});

Deno.test("contextStore: fixed record names and the declared spec names", async () => {
  const writes: [string, string][] = [];
  const data = new Map<string, Record<string, unknown>[]>();
  const context = {
    writeResource(spec: string, name: string, value: Record<string, unknown>) {
      writes.push([spec, name]);
      const versions = data.get(name) ?? [];
      versions.push(value);
      data.set(name, versions);
      return Promise.resolve({ version: versions.length });
    },
    readResource(name: string, version?: number) {
      const versions = data.get(name) ?? [];
      return Promise.resolve(
        versions[(version ?? versions.length) - 1] ?? null,
      );
    },
  };
  const store = contextStore(context);
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "a" },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "evidence",
    "pr",
    { url: "u" },
    ALICE,
    env,
  );
  assertEquals(writes, [
    [RUN_SPEC, RUN_NAME],
    [ARTIFACT_SPEC, "artifact-summary"],
    [RUN_SPEC, RUN_NAME],
    [EVIDENCE_SPEC, "evidence-pr"],
    [RUN_SPEC, RUN_NAME],
  ]);
  assertEquals(await store.readPayload("artifact", "summary", 1), {
    text: "a",
  });
  assertEquals((await loadRun(store))?.products.evidence.pr.version, 1);
});

Deno.test("contextStore: a context without data access is refused", () => {
  assertThrows(() => contextStore({}), Error, "writeResource");
});

Deno.test("recordProduct: a stale view is refused and nothing is written", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const expected = await expectNow(store);
  const result = await recordProduct(
    store,
    LIFECYCLE,
    { ...expected, era: "era-0" },
    "artifact",
    "summary",
    { text: "late" },
    ALICE,
    env,
  );
  assert(!result.ok && !result.rejected && result.reason.startsWith("stale:"));
  assertEquals(store.payloads.size, 0);
  assertEquals(store.runVersions.length, 1);
});

Deno.test("recordProduct: a payload with no JSON form is refused, not thrown", async () => {
  const store = memoryStore();
  const env = testEnv();
  await startRun(store, LIFECYCLE, START, ALICE, env);
  const result = await recordProduct(
    store,
    LIFECYCLE,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "t", when: new Uint8Array([1]) },
    ALICE,
    env,
  );
  assert(
    !result.ok && !result.rejected && result.reason.includes("no JSON form"),
  );
  assertEquals(store.payloads.size, 0);
});
