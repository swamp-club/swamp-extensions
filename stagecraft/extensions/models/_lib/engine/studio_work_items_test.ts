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

import { assert, assertEquals, assertThrows } from "@std/assert";
import { digestOf, jsonSafe } from "./canonical.ts";
import {
  type FactoryDefinition,
  parseDefinition,
} from "./definition_schema.ts";
import {
  acceptProduct,
  advance,
  type Env,
  expectedOf,
  parkAtDispatchCap,
  recordDispatch,
  start,
} from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";
import {
  boardCard,
  enteredAt,
  pinnedDefinitions,
  type QueryData,
  queryStore,
  readBoard,
  readRuns,
  runsPredicate,
  versionSignature,
  waitingOf,
  watchWorkItems,
} from "./studio_work_items.ts";
import {
  ALICE,
  PASS,
  settableEnv,
  smallDefinition,
  TEST_TRACKER,
} from "./test_support.ts";

// The fake swamp's queryData knows no modelType or attributes, so these tests
// stub the query with a matcher for the predicates this module writes: `==`
// conjuncts over the record's fields and attributes, latest versions only
// unless the predicate names a version, and swamp's list projection. The
// real query is exercised by the studio's integration test.

interface Stored {
  modelName: string;
  modelType: string;
  name: string;
  version: number;
  isLatest: boolean;
  attributes: Record<string, unknown>;
}

const WORK_ITEM = "@swamp/stagecraft/work-item";

function stubQuery(records: Stored[]): QueryData & { asked: string[] } {
  const asked: string[] = [];
  const query = (predicate: string, select?: string) => {
    asked.push(predicate);
    const terms = predicate.split(" && ").map((t) => {
      const m = t.match(/^([\w.]+) == (?:"([^"]*)"|(\d+))$/);
      if (m === null) throw new Error(`the stub cannot read '${t}'`);
      return { path: m[1], value: m[2] ?? Number(m[3]) };
    });
    const versioned = terms.some((t) => t.path === "version");
    const hits = records.filter((r) =>
      (versioned || r.isLatest) &&
      terms.every(({ path, value }) =>
        (path.startsWith("attributes.")
          ? r.attributes[path.slice("attributes.".length)]
          : (r as unknown as Record<string, unknown>)[path]) === value
      )
    );
    if (select === undefined) return Promise.resolve(hits);
    assertEquals(select, "[modelName, version]");
    return Promise.resolve(hits.map((r) => [r.modelName, r.version]));
  };
  return Object.assign(query, { asked });
}

function definitionWith(
  patch: (doc: Record<string, unknown>) => void,
): FactoryDefinition {
  const doc = JSON.parse(JSON.stringify(smallDefinition()));
  patch(doc);
  const parsed = parseDefinition(doc);
  if (!parsed.ok) throw new Error(parsed.errors.join("\n"));
  return parsed.value;
}

async function startedRun(
  key: string,
  definition: FactoryDefinition,
  env: Env,
  extra: { title?: string; externalRefs?: Record<string, string> } = {},
): Promise<RunRecord> {
  return start(
    definition,
    {
      key,
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: await digestOf(definition),
      definitionVersion: 1,
      ...extra,
    },
    ALICE,
    env,
  );
}

function runRecord(run: RunRecord, version = 1): Stored {
  return {
    modelName: run.key,
    modelType: WORK_ITEM,
    name: "run",
    version,
    isLatest: true,
    attributes: JSON.parse(JSON.stringify(run)),
  };
}

async function pinRecord(
  key: string,
  definition: FactoryDefinition,
  version = 1,
  isLatest = true,
): Promise<Stored> {
  return {
    modelName: key,
    modelType: WORK_ITEM,
    name: "definition",
    version,
    isLatest,
    attributes: {
      factory: "team",
      digest: await digestOf(definition),
      definition: jsonSafe(definition),
    },
  };
}

/** A run moved to review: summary recorded, then submitted. */
async function inReview(run: RunRecord, env: Env): Promise<RunRecord> {
  const def = smallDefinition();
  const recorded = acceptProduct(
    run,
    "artifact",
    "summary",
    { version: 1, digest: "sha256:s" },
    ALICE,
    env,
  );
  const moved = await advance(
    recorded,
    def,
    expectedOf(recorded),
    { transition: "submit" },
    PASS,
    ALICE,
    env,
  );
  assert(moved.ok);
  return moved.run;
}

// --- predicates and reading ------------------------------------------------------

Deno.test("studio work items: a factory name or key that could change a predicate is refused before any query", async () => {
  const query = stubQuery([]);
  assertThrows(() => runsPredicate('team" || true || "'), Error, "factory");
  for (const bad of ['a"b', "a b", "..", "a..b", ""]) {
    let refused = false;
    try {
      await readRuns(query, bad);
    } catch {
      refused = true;
    }
    assert(refused, bad);
    assertThrows(() => queryStore(query, bad));
  }
  assertEquals(query.asked, []);
});

Deno.test("studio work items: readRuns reads the factory's latest run records, keeps a broken one as a problem, and keeps the later of two records for one key", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = smallDefinition();
  const a = await startedRun("team-a-k3xq", def, env);
  env.at("2026-10-02T11:00:00.000Z");
  const aAgain = await inReview(a, env);
  const other = { ...await startedRun("ops-b-r2ne", def, env) };
  other.factory = "ops";
  const query = stubQuery([
    runRecord(a, 1),
    { ...runRecord(aAgain, 3), modelName: "team-a-k3xq-old" },
    runRecord(other),
    {
      ...runRecord(a),
      modelName: "team-broken-aaaa",
      attributes: { schemaVersion: 1, factory: "team", key: "team-broken" },
    },
    { ...runRecord(a, 1), isLatest: false, modelName: "team-history" },
  ]);
  const { runs, problems } = await readRuns(query, "team");
  assertEquals(runs.map((r) => [r.key, r.stage]), [["team-a-k3xq", "review"]]);
  assertEquals(problems.length, 1);
  assertEquals(problems[0].key, "team-broken-aaaa");
  assert(problems[0].error.includes("does not parse"), problems[0].error);
});

Deno.test("studio work items: versionSignature changes when a run is written, added or removed, and not otherwise", async () => {
  const def = smallDefinition();
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const a = runRecord(await startedRun("team-a", def, env));
  const b = runRecord(await startedRun("team-b", def, env));
  const sig = (records: Stored[]) =>
    versionSignature(stubQuery(records), runsPredicate("team"));
  const before = await sig([a, b]);
  assertEquals(await sig([b, a]), before, "order does not matter");
  assert(await sig([{ ...a, version: 2 }, b]) !== before);
  assert(await sig([a]) !== before);
  assert(
    await sig([a, b, runRecord(await startedRun("team-c", def, env))]) !==
      before,
  );
});

Deno.test("studio work items: pinnedDefinitions reads each digest once, falls back to the exact version, and refuses a copy whose digest is wrong", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const v1 = smallDefinition();
  const v2 = definitionWith((d) => {
    (d.stages as { id: string; maxCycles?: number }[])[0].maxCycles = 5;
  });
  const a = await startedRun("team-a", v1, env);
  const b = await startedRun("team-b", v1, env);
  // A repinning reset cut short: the latest copy is newer than the pinned one.
  const c = await startedRun("team-c", v2, env);
  const d = await startedRun("team-d", v2, env);
  const query = stubQuery([
    await pinRecord("team-a", v1),
    await pinRecord("team-b", v1),
    await pinRecord("team-c", v2, 1, false),
    await pinRecord("team-c", v1, 2),
    // team-d's only copy claims its digest but holds another definition.
    {
      ...await pinRecord("team-d", v1),
      attributes: {
        factory: "team",
        digest: await digestOf(v2),
        definition: jsonSafe(v1),
      },
    },
  ]);
  const { definitions, problems } = await pinnedDefinitions(query, "team", [
    a,
    b,
    c,
    d,
  ]);
  assertEquals(definitions.get(a.definition.digest), v1);
  assertEquals(definitions.get(c.definition.digest), v2);
  assertEquals(problems, []);
  // c's digest came by version; d shares it, so needed no read of its own.
  assertEquals(
    query.asked.filter((p) => p.includes("version ==")).length,
    1,
  );
  const alone = await pinnedDefinitions(
    stubQuery([{
      ...await pinRecord("team-d", v1),
      attributes: {
        factory: "team",
        digest: await digestOf(v2),
        definition: jsonSafe(v1),
      },
    }]),
    "team",
    [d],
  );
  assertEquals(alone.definitions.size, 0);
  assertEquals(alone.problems.map((p) => p.key), ["team-d"]);
  assert(
    alone.problems[0].error.includes("does not match the digest"),
    alone.problems[0].error,
  );
});

Deno.test("studio work items: queryStore reads a payload by version and refuses every write", async () => {
  const query = stubQuery([{
    modelName: "team-a",
    modelType: WORK_ITEM,
    name: "artifact-summary",
    version: 2,
    isLatest: true,
    attributes: { text: "hello" },
  }]);
  const store = queryStore(query, "team-a");
  assertEquals(await store.readPayload("artifact", "summary", 2), {
    text: "hello",
  });
  assertEquals(await store.readPayload("artifact", "summary", 1), null);
  // Should a query give more than the latest, the newest version wins.
  const both = queryStore(
    () =>
      Promise.resolve([
        { version: 1, attributes: { text: "old" } },
        { version: 3, attributes: { text: "new" } },
      ]),
    "team-a",
  );
  assertEquals(await both.readRun(), { text: "new" });
  assertThrows(() => store.writePayload("artifact", "summary", {}));
});

// --- cards -----------------------------------------------------------------------

Deno.test("studio work items: a card shows the title, else none, and the ticket's display id", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = smallDefinition();
  const store = queryStore(stubQuery([]), "team-a");
  const titled = await startedRun("team-a", def, env, {
    title: "Add a board view",
    externalRefs: { builtin: "T1", "builtin.display": "T-1" },
  });
  const card = await boardCard(titled, def, store, env);
  assertEquals(card.title, "Add a board view");
  assertEquals(card.trackerRef, "T-1");
  assertEquals(card.stage, "write");
  assertEquals(card.cycle, 1);
  assertEquals(card.enteredAt, "2026-10-02T10:00:00.000Z");
  assertEquals(card.waiting, null);
  assertEquals(card.parked, []);
  assertEquals(card.pinnedDigest, await digestOf(def));
  const bare = await boardCard(
    await startedRun("team-b", def, env, { externalRefs: { builtin: "T2" } }),
    def,
    store,
    env,
  );
  assertEquals(bare.title, null);
  assertEquals(bare.trackerRef, "T2");
  const unbound = await boardCard(
    await startedRun("team-c", def, env),
    null,
    store,
    env,
  );
  assertEquals(unbound.trackerRef, null);
  assert(unbound.problem?.includes("pinned definition"), unbound.problem);
});

Deno.test("studio work items: enteredAt is the advance into this stage and cycle, else the era's start", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const run = await startedRun("team-a", smallDefinition(), env);
  assertEquals(enteredAt(run), "2026-10-02T10:00:00.000Z");
  env.at("2026-10-02T12:00:00.000Z");
  const moved = await inReview(run, env);
  assertEquals(enteredAt(moved), "2026-10-02T12:00:00.000Z");
});

Deno.test("studio work items: waiting comes from the stage entry's awaiting event, from when each exit became held", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const run = await inReview(
    await startedRun("team-a", smallDefinition(), env),
    env,
  );
  const awaiting = (
    exits: {
      transition: string;
      to: string;
      manual: boolean;
      gateIds: string[];
      readyAt?: string;
    }[],
    at: string,
  ): RunRecord => ({
    ...run,
    journal: [...run.journal, {
      type: "awaiting",
      at,
      era: run.era,
      stage: run.stage,
      cycle: 1,
      actor: ALICE,
      exits,
    }],
  });
  const ship = {
    transition: "ship",
    to: "done",
    manual: false,
    gateIds: ["ship-approval"],
  };
  const held = awaiting([ship], "2026-10-02T11:00:00.000Z");
  assertEquals(waitingOf(held, "2026-10-02T12:00:00.000Z"), {
    since: "2026-10-02T11:00:00.000Z",
    exits: [ship],
  });
  // Held only once the cooldown lifts.
  const cooling = awaiting(
    [{ ...ship, readyAt: "2026-10-02T13:00:00.000Z" }],
    "2026-10-02T11:00:00.000Z",
  );
  assertEquals(waitingOf(cooling, "2026-10-02T12:00:00.000Z"), null);
  assertEquals(
    waitingOf(cooling, "2026-10-02T14:00:00.000Z")?.since,
    "2026-10-02T13:00:00.000Z",
  );
  // The set emptied: no longer waiting.
  const cleared = awaiting([], "2026-10-02T11:30:00.000Z");
  assertEquals(waitingOf(cleared, "2026-10-02T12:00:00.000Z"), null);
  // A finished run waits on no one.
  assertEquals(
    waitingOf({ ...held, status: "terminal" }, "2026-10-02T12:00:00.000Z"),
    null,
  );
});

Deno.test("studio work items: parked at the dispatch cap until a dispatch override is granted", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = definitionWith((d) => {
    (d.stages as { maxDispatchesPerCycle?: number }[])[0]
      .maxDispatchesPerCycle = 1;
  });
  let run = await startedRun("team-a", def, env);
  const dispatched = recordDispatch(
    run,
    def,
    expectedOf(run),
    { inputs: {} },
    ALICE,
    env,
  );
  assert(dispatched.ok);
  run = dispatched.run;
  const store = queryStore(stubQuery([]), "team-a");
  assertEquals((await boardCard(run, def, store, env)).parked, []);
  const parked = parkAtDispatchCap(run, def, expectedOf(run), ALICE, env);
  assert(parked.ok);
  assertEquals((await boardCard(parked.run, def, store, env)).parked, [{
    kind: "dispatch-cap",
    count: 1,
    limit: 1,
    granted: 0,
  }]);
});

Deno.test("studio work items: parked by a cycle limit only when the exit's gates all pass", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = definitionWith((d) => {
    (d.stages as { maxCycles?: number }[])[0].maxCycles = 1;
  });
  const run = await inReview(await startedRun("team-a", def, env), env);
  const store = queryStore(stubQuery([]), "team-a");
  // review's "again" exit leads back to write, entered once of one allowed;
  // it has no gates, so only a cycle override would let it through. "ship"
  // is closed by its approval, not a limit, so it is no park.
  assertEquals((await boardCard(run, def, store, env)).parked, [{
    kind: "cycle-limit",
    transition: "again",
    to: "write",
    count: 1,
    limit: 1,
    granted: 0,
  }]);
  // The same limit on an exit whose gate fails is no park: the work is not
  // done yet, whatever the limit says.
  const gated = definitionWith((d) => {
    const stages = d.stages as {
      maxCycles?: number;
      transitions?: { name: string; gates?: unknown[] }[];
    }[];
    stages[0].maxCycles = 1;
    stages[1].transitions!.find((t) => t.name === "again")!.gates = [{
      type: "human-approval",
      config: { id: "redo" },
    }];
  });
  assertEquals((await boardCard(run, gated, store, env)).parked, []);
});

Deno.test("studio work items: readBoard makes a card per work item and lists what could not be read", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = smallDefinition();
  const a = await startedRun("team-a", def, env, { title: "A" });
  const b = await startedRun("team-b", def, env);
  const query = stubQuery([
    runRecord(a),
    runRecord(b),
    await pinRecord("team-a", def),
  ]);
  const board = await readBoard(query, "team", env);
  assertEquals(board.cards.map((c) => [c.key, c.title]), [
    ["team-a", "A"],
    ["team-b", null],
  ]);
  assertEquals(board.problems, []);
  const lost = await readBoard(stubQuery([runRecord(a)]), "team", env);
  assertEquals(lost.cards.length, 1);
  assertEquals(lost.problems.map((p) => p.key), ["team-a"]);
});

// --- the poll --------------------------------------------------------------------

Deno.test("studio work items: the poll reads where a watch stands when first asked, tells it once per change, and drops it once no one asks", async () => {
  const env = settableEnv("2026-10-02T10:00:00.000Z");
  const def = smallDefinition();
  const run = await startedRun("team-a", def, env);
  const records = [runRecord(run)];
  const query = stubQuery(records);
  const told: string[] = [];
  let clock = 0;
  const watch = watchWorkItems(query, (e) => told.push(JSON.stringify(e)), {
    now: () => clock,
    expiryMs: 1000,
  });
  const board = { kind: "work-items" as const, factory: "team" };
  await watch.ask(board, runsPredicate("team"));
  // Written before the first tick, after the ask: still told.
  records[0] = { ...records[0], version: 2 };
  await watch.tick();
  assertEquals(told, [JSON.stringify(board)]);
  await watch.tick();
  assertEquals(told.length, 1, "nothing changed");
  records.push(runRecord(await startedRun("team-b", def, env)));
  await watch.tick();
  assertEquals(told.length, 2, "a work item added");
  // Asked again: one watch, kept alive.
  clock = 900;
  await watch.ask(board, runsPredicate("team"));
  assertEquals(watch.size(), 1);
  clock = 1800;
  await watch.tick();
  assertEquals(watch.size(), 1);
  clock = 2000;
  await watch.tick();
  assertEquals(watch.size(), 0, "not asked for past the expiry");
});

Deno.test("studio work items: a poll whose read fails tells nothing and tries again next time", async () => {
  let fail = false;
  let version = 1;
  const query: QueryData = () =>
    fail
      ? Promise.reject(new Error("datastore down"))
      : Promise.resolve([["team-a", version]]);
  const told: unknown[] = [];
  const watch = watchWorkItems(query, (e) => told.push(e));
  await watch.ask(
    { kind: "work-items", factory: "team" },
    runsPredicate("team"),
  );
  fail = true;
  version = 2;
  await watch.tick();
  assertEquals(told, []);
  fail = false;
  await watch.tick();
  assertEquals(told.length, 1);
});
