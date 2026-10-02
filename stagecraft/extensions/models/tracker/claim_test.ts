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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { model as builtin } from "./builtin.ts";
import { model as linear } from "./linear.ts";
import { model as swampClub } from "./swamp_club.ts";
import {
  describeStatus,
  type FakeSwamp,
  fakeSwamp,
  type MethodContextLike,
  parseExample,
  systemEnv,
  workItemModel as workItem,
} from "../_lib/engine/tracker_testing.ts";
import {
  nextKey,
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
  "../../../.claude/skills/stagecraft/references/examples/minimal.yaml",
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
  const definition = parseExample(await Deno.readTextFile(MINIMAL)).definition;
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
  // The ticket's id as-is, lowercased.
  assertEquals(record, {
    tracker: "test",
    issue: "T1",
    display: "T-1",
    key: "t-1",
    factory: "team",
    claimedAt: NOW.toISOString(),
    previous: [],
  });
  assertEquals(swamp.resources.get(record.key), undefined, "not started");
  // The snapshot and the index record.
  assertEquals(output.dataHandles.length, 2);
  assert(
    lastSummary(swamp).endsWith(
      startCommand(record.key, "team", REFS, "A ticket"),
    ),
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
  assert(
    summary.endsWith(startCommand(record.key, "team", REFS, "A ticket")),
    summary,
  );
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

Deno.test("claim: a reservation whose factory no longer loads moves to another under the same key (#2712)", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const [reserved] = index(swamp);
  // team stops loading, so the printed start fails.
  swamp.factory("team", { name: "team" });
  await assertRejects(() => start(swamp, reserved.key, "team"));

  const output = await claim(swamp, methods, {
    issue: "T1",
    factory: "other",
  });
  const moved = index(swamp).at(-1);
  assertEquals(moved, {
    ...reserved,
    factory: "other",
    claimedAt: NOW.toISOString(),
  });
  // The snapshot and the index record.
  assertEquals(output.dataHandles.length, 2);
  const summary = lastSummary(swamp);
  assert(
    summary.startsWith(
      `T-1 (T1) is claimed as '${reserved.key}', now under factory 'other': ` +
        `its reserved factory 'team' no longer loads`,
    ),
    summary,
  );
  assert(
    summary.endsWith(startCommand(reserved.key, "other", REFS, "A ticket")),
    summary,
  );
  await start(swamp, reserved.key, "other");
  await claim(swamp, methods, { issue: "T1" });
  assert(lastSummary(swamp).includes("is already started"), lastSummary(swamp));
});

Deno.test("claim: a dry run says a reservation whose factory no longer loads would move, and writes nothing", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const [reserved] = index(swamp);
  swamp.factory("team", { name: "team" });
  const before = trackerWrites(swamp);
  const output = await claim(swamp, methods, {
    issue: "T1",
    factory: "other",
    dryRun: true,
  });
  assertEquals(output.dataHandles.length, 0);
  assertEquals(trackerWrites(swamp), before, "a dry run writes nothing");
  assertEquals(index(swamp).at(-1), reserved);
  const summary = lastSummary(swamp);
  assert(
    summary.includes("so a claim would move it to factory 'other'"),
    summary,
  );
  assert(summary.endsWith("Dry run, nothing was claimed"), summary);
});

Deno.test("claim: a reservation whose factory no longer loads is not moved to one that does not load either", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  swamp.factory("team", { name: "team" });
  swamp.factory("broken", { name: "broken" });
  const before = trackerWrites(swamp);
  await assertRejects(() =>
    claim(swamp, methods, { issue: "T1", factory: "broken" })
  );
  assertEquals(index(swamp).length, 1);
  assertEquals(index(swamp)[0].factory, "team");
  assertEquals(trackerWrites(swamp), before, "a refused claim writes nothing");
});

Deno.test("claim: a failed snapshot write leaves the claim standing and logs a warning", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  const ctx = swamp.context(TRACKER);
  const write = ctx.writeResource;
  assert(write !== undefined);
  const output = await methods.claim.execute(
    methods.claim.arguments.parse({ issue: "T1", factory: "team" }),
    {
      ...ctx,
      writeResource: (spec, name, data) =>
        spec === TICKET_SPEC
          ? write(spec, name, data)
          : Promise.reject(new Error("disk full")),
    },
  );
  assertEquals(output.dataHandles.length, 1, "only the index record");
  assertEquals(index(swamp).length, 1);
  const warning = String(swamp.logs.at(-1)?.props?.warning);
  assertEquals(warning, "did not refresh the snapshot of T-1: disk full");
});

Deno.test("claim: the printed start command quotes the key", () => {
  assert(
    startCommand("t-1-ticket-abcd", "team", REFS, "A ticket").includes(
      "method run start 't-1-ticket-abcd' --input",
    ),
  );
});

Deno.test("claim: the printed start command carries the ticket's title, quoted, and leaves a blank one out", () => {
  assert(
    startCommand("k", "team", REFS, " Don't break it ").includes(
      `--input 'title:json="Don'\\''t break it"' --input`,
    ),
  );
  assert(!startCommand("k", "team", REFS, "  ").includes("title"));
});

Deno.test("claim: the printed title is JSON, so a title swamp would read as a file or a number stays the title", () => {
  for (const title of ["@alice cannot log in", "42", 'a "quoted" \\ title']) {
    const printed = startCommand("k", "team", REFS, title);
    const match = printed.match(/--input '(title:json=[^']*)'/);
    assert(match !== null, printed);
    assertEquals(JSON.parse(match[1].slice("title:json=".length)), title);
  }
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
      `T-1 (T1) is already started: '${key}' at stage 'work', under ` +
        `factory 'team'`,
    );
  }
  assertEquals(index(swamp).length, 1);
});

Deno.test("claim: a started work item claimed with another factory names its own, and the other is not used", async () => {
  const swamp = await withFactories();
  const { methods } = oneTicket();
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  await start(swamp, key);
  await claim(swamp, methods, { issue: "T1", factory: "other" });
  assertEquals(
    lastSummary(swamp),
    `T-1 (T1) is already started: '${key}' at stage 'work', under ` +
      `factory 'team'; factory 'other' was not used`,
  );
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

Deno.test("claim: a work item retargeted away no longer holds its old ticket, which claims a new one", async () => {
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
  await claim(swamp, methods, { issue: "T1", dryRun: true });
  assert(lastSummary(swamp).includes("has no work item"), lastSummary(swamp));
  assertEquals(trackerWrites(swamp), before, "a dry run writes nothing");
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const claimed = index(swamp).at(-1)!;
  assert(claimed.key !== key, "the old ticket gets a new work item");
  assertEquals(claimed.previous, [key]);
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

/** A tracker whose every ticket has this display id. */
function ticketShown(display: string) {
  return trackerWith(() =>
    Promise.resolve({
      id: "T1",
      display,
      title: "A ticket",
      status: { id: "s1", name: "Todo" },
      relations: [],
    })
  );
}

Deno.test("claim: an external ticket's key is its id as-is; a number-only id takes the prefix", async () => {
  // Linear's ABC-12, whatever the title.
  const linearSwamp = await withFactories();
  await claim(linearSwamp, ticketShown("ABC-12").methods, {
    issue: "T1",
    factory: "team",
  });
  assertEquals(index(linearSwamp)[0].key, "abc-12");
  // The Lab's #2711: the instance's prefix leads.
  const labSwamp = await withFactories();
  labSwamp.globalArgs.set(TRACKER, { prefix: "lab" });
  await claim(labSwamp, ticketShown("#2711").methods, {
    issue: "T1",
    factory: "team",
  });
  assertEquals(index(labSwamp)[0].key, "lab-2711");
  // No prefix set: the instance's name is the prefix.
  const unset = await withFactories();
  await claim(unset, ticketShown("#2711").methods, {
    issue: "T1",
    factory: "team",
  });
  assertEquals(index(unset)[0].key, `${TRACKER}-2711`);
});

Deno.test("claim: a ticket's later work items add -n: abc-12, then abc-12-2", async () => {
  const swamp = await withFactories();
  const { methods } = ticketShown("ABC-12");
  const refs = { test: "T1", "test.display": "ABC-12" };
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  await start(swamp, "abc-12", "team", refs);
  await finish(swamp, "abc-12");
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  assertEquals(index(swamp).at(-1)?.key, "abc-12-2");
  assertEquals(index(swamp).at(-1)?.previous, ["abc-12"]);
});

Deno.test("claim: a key another work item has is qualified by the tracker instance's name, and the ticket keeps the qualifier", async () => {
  const swamp = await withFactories();
  const { methods } = ticketShown("ABC-12");
  const refs = { test: "T1", "test.display": "ABC-12" };
  // Another tracker with the same prefix reached abc-12 first.
  swamp.definitions.set("abc-12", { globalArguments: {}, type: "other" });
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const first = `abc-12-${TRACKER}`;
  assertEquals(index(swamp)[0].key, first);
  await start(swamp, first, "team", refs);
  await finish(swamp, first);
  // abc-12-2 is free, but the ticket's keys stay one family.
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  assertEquals(index(swamp).at(-1)?.key, `abc-12-${TRACKER}-2`);
});

Deno.test("claim: refused, with the reason, when the qualified key is taken too", async () => {
  const swamp = await withFactories();
  for (const name of ["abc-12", `abc-12-${TRACKER}`]) {
    swamp.definitions.set(name, { globalArguments: {}, type: "other" });
  }
  const before = trackerWrites(swamp);
  await assertRejects(
    () =>
      claim(swamp, ticketShown("ABC-12").methods, {
        issue: "T1",
        factory: "team",
      }),
    Error,
    "two trackers with the same prefix reached the same id",
  );
  assertEquals(trackerWrites(swamp), before, "nothing was claimed");
});

Deno.test("nextKey: n counts every earlier key, a moved-in one too, and never picks a taken name", async () => {
  const taken = new Set<string>();
  const ctx = {
    logger: { info: () => {} },
    definitionRepository: {
      findByNameGlobal: (name: string) =>
        Promise.resolve(
          taken.has(name) ? { definition: {}, type: "other" } : null,
        ),
    },
  };
  // A retarget moved zzz-9 onto this ticket: the next is the third.
  assertEquals(
    await nextKey(ctx, "abc-12", "linear", ["abc-12", "zzz-9"]),
    "abc-12-3",
  );
  taken.add("abc-12-3");
  assertEquals(
    await nextKey(ctx, "abc-12", "linear", ["abc-12", "zzz-9"]),
    "abc-12-linear-3",
  );
  // Only this ticket's own qualified keys carry the qualifier on.
  assertEquals(
    await nextKey(ctx, "abc-12", "linear", ["abc-123-linear"]),
    "abc-12-2",
  );
  assertEquals(
    await nextKey(ctx, "abc-12", "linear", ["abc-12-linear-2"]),
    "abc-12-linear-2",
  );
});

Deno.test("claim, built-in: the ticket's work items take its id: cue-1, then cue-1-2", async () => {
  const swamp = await withFactories();
  const { id, refs, claimed, run } = await builtinTicket(swamp);
  assertEquals(id, "cue-1");
  await run("claim", { issue: id, factory: "team" });
  assertEquals(claimed()[0].key, id);
  assert(lastSummary(swamp).includes(`is claimed as '${id}'`));

  await start(swamp, id, "team", refs);
  await finish(swamp, id);
  await run("claim", { issue: id, factory: "team" });
  const latest = claimed().at(-1);
  assertEquals(latest?.key, "cue-1-2");
  assertEquals(latest?.previous, [id]);
});

Deno.test("claim: an old 64-character ticket id still claims, and its next work item is cut to fit", async () => {
  const old = `cue-${"board-shortcuts-".repeat(3)}${"x".repeat(7)}-r2ne`;
  assertEquals(old.length, 64);
  const swamp = await withFactories();
  const { methods } = ticketShown(old);
  const refs = { test: "T1", "test.display": old };
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  assertEquals(index(swamp)[0].key, old);
  await start(swamp, old, "team", refs);
  await finish(swamp, old);
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  assertEquals(index(swamp).at(-1)?.key, `${old.slice(0, 62)}-2`);
});

Deno.test("claim, built-in: a ticket id some definition already has is qualified", async () => {
  const swamp = await withFactories();
  const { id, claimed, run } = await builtinTicket(swamp);
  swamp.definitions.set(id, { globalArguments: {}, type: "other" });
  await run("claim", { issue: id, factory: "team" });
  assertEquals(claimed()[0].key, `${id}-${TRACKER}`);
});

Deno.test("claim: every tracker model has the method and declares the ticket index", () => {
  for (const tracker of [builtin, linear, swampClub]) {
    assert("claim" in tracker.methods, tracker.type);
    assert(TICKET_SPEC in tracker.resources, tracker.type);
  }
});

Deno.test("publish: a retarget onto a ticket that has another active work item is refused, and its index is left alone", async () => {
  // The factory is bound to the instance that claims, so publish reads the
  // same ticket index.
  const swamp = fakeSwamp();
  swamp.factory(
    "team",
    parseExample(await Deno.readTextFile(MINIMAL)).definition,
    { tracker: TRACKER },
  );
  const { methods } = trackerWith((ref) =>
    Promise.resolve({
      id: ref,
      display: ref,
      title: "A ticket",
      status: { id: "s1", name: "Todo" },
      relations: [],
    })
  );
  await claim(swamp, methods, { issue: "T1", factory: "team" });
  const { key } = index(swamp)[0];
  await start(swamp, key);
  const other = "minimal-othrwork";
  await start(swamp, other, "team", { test: "T2" });
  const view = await describeStatus(swamp.context(other), systemEnv);
  await workItemCall(swamp, other, "retarget", {
    externalRefs: JSON.stringify(REFS),
    reason: "T-2 duplicates T-1",
    expectedStage: view.expected.expectedStage,
    expectedCycle: String(view.expected.expectedCycle),
    expectedEra: view.expected.expectedEra,
  });
  const error = await assertRejects(() =>
    methods.publish.execute(
      methods.publish.arguments.parse({ workItem: other }),
      swamp.context(TRACKER),
    )
  );
  assert(
    String(error).includes(`which already has work item '${key}'`),
    String(error),
  );
  assertEquals(index(swamp).at(-1)?.key, key);
});
