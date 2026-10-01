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

import { assert, assertEquals, assertMatch, assertRejects } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { model as builtin } from "./builtin.ts";
import { model as linear } from "./linear.ts";
import { model as swampClub } from "./swamp_club.ts";
import {
  describeStatus,
  type FakeSwamp,
  fakeSwamp,
  type MethodContextLike,
  systemEnv,
  workItemModel as workItem,
} from "../_lib/engine/tracker_testing.ts";
import {
  startCommand,
  TICKET_SPEC,
  type TicketClaim,
} from "../_lib/tracker/core/claim.ts";
import {
  type TrackerAdapter,
  TrackerError,
} from "../_lib/tracker/core/adapter.ts";
import {
  ticketName,
  trackerMethods,
} from "../_lib/tracker/core/tracker_methods.ts";

const TRACKER = "tracker";
const NOW = new Date("2026-09-29T00:00:00Z");
const MINIMAL = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/minimal.yaml",
  import.meta.url,
);
const REFS = { test: "T1", "test.display": "T-1" };

function trackerWith(fetchIssue: TrackerAdapter["fetchIssue"]) {
  const writes: string[] = [];
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    fetchIssue,
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    comment: (issueId) => {
      writes.push(`comment ${issueId}`);
      return Promise.resolve({ id: "c", url: "u" });
    },
    setStatus: (issueId, name) => {
      writes.push(`status ${issueId}`);
      return Promise.resolve({ changed: true, status: { id: name, name } });
    },
  };
  const methods = trackerMethods({
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({}),
    now: () => NOW,
  });
  return { methods, writes };
}

/** A tracker with one ticket, found by its id (T1) or display (T-1). */
function oneTicket() {
  return trackerWith((ref) => {
    if (ref !== "T1" && ref !== "T-1") {
      return Promise.reject(new TrackerError("not_found", "test", ref));
    }
    return Promise.resolve({
      id: "T1",
      display: "T-1",
      title: "A ticket",
      url: "https://tracker.example/T-1",
      status: { id: "s1", name: "Todo" },
      relations: [],
    });
  });
}

async function withFactories(): Promise<FakeSwamp> {
  const swamp = fakeSwamp();
  const definition = parseYaml(await Deno.readTextFile(MINIMAL));
  for (const name of ["team", "other"]) {
    swamp.factory(name, definition);
  }
  return swamp;
}

type Methods = ReturnType<typeof oneTicket>["methods"];

async function claim(
  swamp: FakeSwamp,
  methods: Methods,
  raw: Record<string, unknown>,
) {
  return await methods.claim.execute(
    methods.claim.arguments.parse(raw),
    swamp.context(TRACKER),
  );
}

function index(swamp: FakeSwamp): TicketClaim[] {
  return (swamp.resources.get(TRACKER)?.get(ticketName("T1")) ??
    []) as TicketClaim[];
}

/** Every version the tracker instance holds, across its records. */
function trackerWrites(swamp: FakeSwamp): number {
  return swamp.versionsWritten(TRACKER);
}

function lastSummary(swamp: FakeSwamp): string {
  return String(swamp.logs.at(-1)?.props?.summary);
}

async function workItemCall(
  swamp: FakeSwamp,
  key: string,
  name: keyof typeof workItem.methods,
  raw: Record<string, unknown>,
) {
  const method = workItem.methods[name];
  const execute = method.execute as (
    args: unknown,
    context: MethodContextLike,
  ) => Promise<unknown>;
  await execute(method.arguments.parse(raw), swamp.context(key));
}

/** Start the claimed key the way the printed command does. */
async function start(
  swamp: FakeSwamp,
  key: string,
  factory = "team",
  refs: Record<string, string> = REFS,
) {
  await workItemCall(swamp, key, "start", {
    factory: factory,
    externalRefs: JSON.stringify(refs),
  });
}

async function finish(swamp: FakeSwamp, key: string) {
  const expect = async () => {
    const view = await describeStatus(swamp.context(key), systemEnv);
    return {
      expectedStage: view.expected.expectedStage,
      expectedCycle: String(view.expected.expectedCycle),
      expectedEra: view.expected.expectedEra,
    };
  };
  await workItemCall(swamp, key, "record_artifact", {
    name: "summary",
    payload: JSON.stringify({ text: "done" }),
    ...await expect(),
  });
  await workItemCall(swamp, key, "advance", {
    transition: "finish",
    ...await expect(),
  });
}

Deno.test("claim: reserves a key in the index before any work item exists, and prints its start command", async () => {
  const swamp = await withFactories();
  const { methods, writes } = oneTicket();
  const output = await claim(swamp, methods, {
    issue: "T-1",
    factory: "team",
  });
  const [record] = index(swamp);
  assertMatch(record.key, /^t-1-ticket-[a-z2-7]{4}$/);
  assertEquals(record, {
    tracker: "test",
    issue: "T1",
    display: "T-1",
    key: record.key,
    factory: "team",
    claimedAt: NOW.toISOString(),
    previous: [],
  });
  assertEquals(swamp.resources.get(record.key), undefined, "not started");
  // The snapshot and the index record.
  assertEquals(output.dataHandles.length, 2);
  assert(
    lastSummary(swamp).endsWith(startCommand(record.key, "team", REFS)),
    lastSummary(swamp),
  );
  assertEquals(writes, [], "claim never writes to the tracker");
});

Deno.test("claim: a crash before start leaves a reservation that the next claim hands back, by id or display", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const [record] = index(swamp);
  // Again with the same factory, and again with no factory at all.
  const again = await claim(swamp, methods, {
    issue: "T-1",
    factory: "team",
  });
  await claim(swamp, methods, { issue: "T1" });
  assertEquals(index(swamp).length, 1, "the index is not written again");
  assertEquals(again.dataHandles.length, 1, "only the snapshot");
  const summary = lastSummary(swamp);
  assert(summary.includes("not started yet"), summary);
  assert(summary.endsWith(startCommand(record.key, "team", REFS)), summary);
});

Deno.test("claim: a reservation under one factory refuses another", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const before = trackerWrites(swamp);
  const error = await assertRejects(() =>
    claim(swamp, methods, { issue: "T1", factory: "other" })
  );
  assert(String(error).includes("start it with 'team'"), String(error));
  assertEquals(trackerWrites(swamp), before, "a refused claim writes nothing");
});

Deno.test("claim: a started work item is reported, not started twice", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  await start(swamp, key);
  for (const raw of [{ issue: "T-1", factory: "team" }, { issue: "T1" }]) {
    await claim(swamp, methods, raw);
    assertEquals(
      lastSummary(swamp),
      `T-1 (T1) is already started: '${key}' at stage 'work'`,
    );
  }
  assertEquals(index(swamp).length, 1);
});

Deno.test("claim: a finished work item lets the ticket claim a new one, keeping the old key", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const first = index(swamp)[0].key;
  await start(swamp, first);
  await finish(swamp, first);

  const before = trackerWrites(swamp);
  const refused = await assertRejects(() =>
    claim(swamp, methods, { issue: "T1" })
  );
  assert(String(refused).includes("its last one used 'team'"), String(refused));
  assertEquals(trackerWrites(swamp), before, "a refused claim writes nothing");

  await claim(swamp, methods, { issue: "T1", factory: "other" });
  const latest = index(swamp).at(-1);
  assert(latest !== undefined && latest.key !== first);
  assertEquals(latest.previous, [first]);
  assertEquals(latest.factory, "other");
  assert(lastSummary(swamp).includes(`'${first}', has finished`));
});

Deno.test("claim: refuses when the index and the work item disagree about the ticket", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  await workItemCall(swamp, key, "start", {
    factory: "team",
    externalRefs: JSON.stringify({ test: "T9" }),
  });
  const before = trackerWrites(swamp);
  const error = await assertRejects(() =>
    claim(swamp, methods, { issue: "T1" })
  );
  assert(String(error).includes("records test 'T9'"), String(error));
  assertEquals(trackerWrites(swamp), before, "a refused claim writes nothing");
});

Deno.test("claim: a retargeted work item leaves its old ticket's index behind, so claiming the old ticket is refused (#2799 moves the index)", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  await start(swamp, key);
  const view = await describeStatus(swamp.context(key), systemEnv);
  await workItemCall(swamp, key, "retarget", {
    externalRefs: JSON.stringify({ test: "T2", "test.display": "T-2" }),
    reason: "T-1 duplicates T-2",
    expectedStage: view.expected.expectedStage,
    expectedCycle: String(view.expected.expectedCycle),
    expectedEra: view.expected.expectedEra,
  });
  const before = trackerWrites(swamp);
  const error = await assertRejects(() =>
    claim(swamp, methods, { issue: "T1" })
  );
  assert(String(error).includes("records test 'T2'"), String(error));
  assertEquals(trackerWrites(swamp), before, "a refused claim writes nothing");
});

Deno.test("claim: a run record with another key under the claimed name is not the claimed work item", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  // Data swamp attributes to the name from elsewhere (an earlier definition).
  const stray = await withFactories();
  await start(stray, "minimal-strayrun");
  const run = stray.resources.get("minimal-strayrun")?.get("run")?.[0];
  assert(run !== undefined);
  await swamp.context(key).writeResource?.("run", "run", run);

  await claim(swamp, methods, { issue: "T1" });
  assert(lastSummary(swamp).includes("not started yet"), lastSummary(swamp));
});

Deno.test("claim: needs a factory for a new key, and an invalid factory writes nothing", async () => {
  const swamp = await withFactories();
  swamp.factory("broken", { name: "broken" });
  const { methods } = oneTicket();
  const missing = await assertRejects(() =>
    claim(swamp, methods, { issue: "T1" })
  );
  assert(String(missing).includes("--input factory=<factory>"));
  await assertRejects(() =>
    claim(swamp, methods, { issue: "T1", factory: "broken" })
  );
  await assertRejects(() =>
    claim(swamp, methods, { issue: "T1", factory: "nobody" })
  );
  assertEquals(trackerWrites(swamp), 0, "no index record and no snapshot");
});

Deno.test("claim: a tracker failure writes nothing", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  const error = await assertRejects(
    () => claim(swamp, methods, { issue: "T-404", factory: "team" }),
    TrackerError,
  );
  assertEquals(error.kind, "not_found");
  assertEquals(swamp.resources.get(TRACKER), undefined);
});

/** A built-in tracker instance on the factories' swamp, with one ticket. */
async function builtinTicket(swamp: FakeSwamp) {
  swamp.globalArgs.set(TRACKER, { prefix: "cue" });
  const run = async (
    name: "create" | "claim",
    raw: Record<string, unknown>,
  ) => {
    const method = builtin.methods[name];
    const execute = method.execute as (
      args: unknown,
      ctx: ReturnType<FakeSwamp["context"]>,
    ) => Promise<unknown>;
    await execute(method.arguments.parse(raw), swamp.context(TRACKER));
  };
  await run("create", { title: "Board shortcuts", body: "b", type: "bug" });
  const id = JSON.parse(String(swamp.logs.at(-1)?.props?.externalRefs))
    .builtin as string;
  const claimed = () =>
    (swamp.resources.get(TRACKER)?.get(ticketName(id)) ?? []) as TicketClaim[];
  const refs = { builtin: id, "builtin.display": id };
  return { id, refs, claimed, run };
}

Deno.test("claim: a ticket title with no ASCII letters leaves the display id alone in the key", async () => {
  const swamp = await withFactories();
  const { methods } = trackerWith(() =>
    Promise.resolve({
      id: "T1",
      display: "T-1",
      title: "\u{1F525}\u{1F525}",
      status: { id: "s1", name: "Todo" },
      relations: [],
    })
  );
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  assertMatch(index(swamp)[0].key, /^t-1-[a-z2-7]{4}$/);
});

Deno.test("claim, built-in: the ticket's first work item takes the ticket's id; a later one gets a <prefix>-<slug>-<rnd> key", async () => {
  const swamp = await withFactories();
  const { id, refs, claimed, run } = await builtinTicket(swamp);
  await run("claim", { issue: id, factory: "team" });
  assertEquals(claimed()[0].key, id);
  assert(lastSummary(swamp).includes(`is claimed as '${id}'`));

  await start(swamp, id, "team", refs);
  await finish(swamp, id);
  await run("claim", { issue: id, factory: "team" });
  const latest = claimed().at(-1);
  assertMatch(String(latest?.key), /^cue-board-shortcuts-[a-z2-7]{4}$/);
  assert(latest?.key !== id);
  assertEquals(latest?.previous, [id]);
});

Deno.test("claim, built-in: a first key some definition already has falls back to a fresh one", async () => {
  const swamp = await withFactories();
  const { id, claimed, run } = await builtinTicket(swamp);
  swamp.definitions.set(id, { globalArguments: {}, type: "other" });
  await run("claim", { issue: id, factory: "team" });
  const key = String(claimed()[0].key);
  assertMatch(key, /^cue-board-shortcuts-[a-z2-7]{4}$/);
  assert(key !== id);
});

Deno.test("claim: every tracker model has the method and declares the ticket index", () => {
  for (const tracker of [builtin, linear, swampClub]) {
    assert("claim" in tracker.methods, tracker.type);
    assert(TICKET_SPEC in tracker.resources, tracker.type);
  }
});
