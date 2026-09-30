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
import { buildCelContext, evaluateCel } from "./cel_context.ts";
import { advance, expectedOf, reset } from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  type RunStore,
  startRun,
  update,
} from "./run_store.ts";
import {
  ALICE,
  expectNow,
  PASS,
  smallDefinition,
  testEnv,
} from "./test_support.ts";

const DEFINITION = smallDefinition();

async function started(): Promise<
  { store: RunStore; env: ReturnType<typeof testEnv> }
> {
  const store = memoryStore();
  const env = testEnv();
  await startRun(
    store,
    DEFINITION,
    {
      key: "wi-7",
      externalRefs: { linear: "ENG-1" },
      definitionDigest: "sha256:l",
    },
    ALICE,
    env,
  );
  return { store, env };
}

async function current(store: RunStore): Promise<RunRecord> {
  const run = await loadRun(store);
  if (run === null) throw new Error("not started");
  return run;
}

Deno.test("context: item, stage, and each product's latest payload and version", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "one" },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "two" },
    ALICE,
    env,
  );
  const context = await buildCelContext(await current(store), store);
  assertEquals(context.item, {
    key: "wi-7",
    externalRefs: { linear: "ENG-1" },
  });
  assertEquals(context.stage, { id: "write", cycle: 1 });
  assertEquals(context.artifacts.summary, {
    payload: { text: "two" },
    version: 2,
    stage: "write",
    cycle: 1,
  });
  assertEquals(
    evaluateCel('artifacts["summary"].payload.text', context),
    "two",
  );
});

Deno.test("context: numbers from run data are CEL doubles; comparisons with ints work, mixed arithmetic does not", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "t" },
    ALICE,
    env,
  );
  const context = await buildCelContext(await current(store), store);
  assertEquals(evaluateCel('artifacts["summary"].version == 1', context), true);
  assertEquals(evaluateCel('artifacts["summary"].version >= 1', context), true);
  assertEquals(evaluateCel('artifacts["summary"].version + 1.0', context), 2);
  assertEquals(
    evaluateCel('int(artifacts["summary"].version) + 1', context),
    2,
  );
  assertThrows(() => evaluateCel('artifacts["summary"].version + 1', context));
});

Deno.test("context: evidence recorded on an earlier stage is visible later (the evidence rule)", async () => {
  // build-swamp-extension's implement.submit relies on this: in CEL,
  // evidence["x"] is the latest record from any stage in the era.
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "evidence",
    "pr",
    { url: "u1" },
    ALICE,
    env,
  );
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "t" },
    ALICE,
    env,
  );
  await update(
    store,
    (run) =>
      advance(
        run,
        DEFINITION,
        expectedOf(run),
        { transition: "submit" },
        PASS,
        ALICE,
        env,
      ),
  );
  const context = await buildCelContext(await current(store), store);
  assertEquals(context.stage.id, "review");
  assertEquals(evaluateCel('"pr" in evidence', context), true);
  assertEquals(evaluateCel('evidence["pr"].stage', context), "write");
});

Deno.test("context: nothing from before a reset is visible", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "evidence",
    "pr",
    { url: "u1" },
    ALICE,
    env,
  );
  await update(
    store,
    (run) => reset(run, DEFINITION, expectedOf(run), ALICE, env),
  );
  const context = await buildCelContext(await current(store), store);
  assertEquals(evaluateCel('"pr" in evidence', context), false);
});

Deno.test("context: rejections are visible under validations by kind", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "" },
    ALICE,
    env,
  );
  const context = await buildCelContext(await current(store), store);
  assertEquals(
    evaluateCel('"summary" in validations.artifacts', context),
    true,
  );
  assertEquals(
    evaluateCel('validations.artifacts["summary"].rejected.text', context),
    "",
  );
});

Deno.test("context: a payload version the run references but storage lost is an error", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "t" },
    ALICE,
    env,
  );
  const pruned: RunStore = {
    ...store,
    readPayload: () => Promise.resolve(null),
  };
  await assertRejects(
    async () => buildCelContext(await current(store), pruned),
    Error,
    "pruned",
  );
});

Deno.test("evaluateCel: evaluation errors throw", async () => {
  const { store } = await started();
  const context = await buildCelContext(await current(store), store);
  assertThrows(() => evaluateCel('artifacts["missing"].payload', context));
  assert(evaluateCel("stage.cycle == 1", context) === true);
});

Deno.test("context: a payload changed outside the runtime fails its digest check", async () => {
  const { store, env } = await started();
  await recordProduct(
    store,
    DEFINITION,
    await expectNow(store),
    "artifact",
    "summary",
    { text: "t" },
    ALICE,
    env,
  );
  const tampered: RunStore = {
    ...store,
    readPayload: () => Promise.resolve({ text: "edited" }),
  };
  await assertRejects(
    async () => buildCelContext(await current(store), tampered),
    Error,
    "changed outside the runtime",
  );
});
