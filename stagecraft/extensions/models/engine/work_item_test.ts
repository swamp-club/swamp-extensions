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
import { fromFileUrl } from "@std/path";
import { model } from "./work_item.ts";
import {
  type FakeSwamp,
  fakeSwamp,
  parseExample,
} from "../_lib/engine/fake_swamp.ts";
import { type Env, systemEnv } from "../_lib/engine/run_ops.ts";
import type { RunRecord } from "../_lib/engine/run_record.ts";
import { contextStore, loadRun } from "../_lib/engine/run_store.ts";
import {
  advanceMethod,
  decide,
  describeStatus,
  dispatch,
  logWrite,
  type MethodContextLike,
  recordProductMethod,
  retargetMethod,
  startWorkItem,
  summary,
  WORK_ITEM_TYPE,
} from "../_lib/engine/work_item_ops.ts";

const BUILD = new URL(
  "../../../.claude/skills/stagecraft/references/examples/build-swamp-extension.yaml",
  import.meta.url,
);
const ITEM = "build-swamp-extension-abcdefgh";
const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

/** The build-swamp-extension example's definition block. */
async function buildDefinition(): Promise<Record<string, unknown>> {
  return parseExample(await Deno.readTextFile(BUILD)).definition;
}

type MethodName = keyof typeof model.methods;

/** Call a method the way the CLI does: raw inputs through its own schema. */
async function call(
  swamp: FakeSwamp,
  name: MethodName,
  raw: Record<string, unknown> = {},
  instance = ITEM,
) {
  const method = model.methods[name];
  const args = method.arguments.parse(raw);
  const execute = method.execute as (
    args: unknown,
    context: MethodContextLike,
  ) => Promise<unknown>;
  return await execute(args, swamp.context(instance));
}

/** The expectation status reports, as CLI strings. */
async function expected(swamp: FakeSwamp): Promise<Record<string, string>> {
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  return {
    expectedStage: view.expected.expectedStage,
    expectedCycle: String(view.expected.expectedCycle),
    expectedEra: view.expected.expectedEra,
  };
}

async function runOf(swamp: FakeSwamp): Promise<RunRecord> {
  const run = await loadRun(contextStore(swamp.context(ITEM)));
  assert(run !== null);
  return run;
}

async function started(remote = false): Promise<FakeSwamp> {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), { remote });
  await call(swamp, "start", { factory: "team" });
  return swamp;
}

// --- start and the pinned factory definition ------------------------------------

Deno.test("start: pins the factory's definition and starts at its initial stage", async () => {
  const swamp = await started();
  const run = await runOf(swamp);
  assertEquals(run.key, ITEM);
  assertEquals(run.stage, "plan");
  assertEquals(run.definition.version, 1);
  assertEquals(run.factory, "team");
  const first = run.journal[0];
  assert(first.type === "started");
  assertEquals(first.factory, "team");
  const pinned = swamp.resources.get(ITEM)?.get("definition")?.[0];
  assertEquals(pinned?.factory, "team");
  assertEquals(pinned?.digest, run.definition.digest);
  assertEquals(run.journal[0].actor, {
    principal: "user:alice",
    source: "platform",
  });
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(summary.startsWith(`started '${ITEM}' at stage 'plan'`), summary);
  assert(
    summary.includes("(factory 'team'; "),
    summary,
  );
});

// --- the tracker binding -------------------------------------------------------

Deno.test("start: pins the tracker the factory is bound to", async () => {
  const swamp = await started();
  assertEquals((await runOf(swamp)).tracker, {
    instance: "board",
    kind: "builtin",
  });
  const [line] = String(swamp.logs.at(-1)?.props?.summary).split("\n");
  assert(line.endsWith("; tracker 'board')"), line);
});

Deno.test("start: refuses a factory bound to a tracker of another kind, and writes nothing", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("board", {
    globalArguments: {},
    type: "@swamp/stagecraft/linear",
  });
  swamp.factory("team", await buildDefinition());
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "its tracker 'board' is a @swamp/stagecraft/linear",
  );
  assertEquals(swamp.versionsWritten(ITEM), 0);
});

/** A work item on a builtin ticket, and a way to set board's cursor for it. */
async function onTicket() {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await call(swamp, "start", {
    factory: "team",
    externalRefs: JSON.stringify({ builtin: "cue-work-abcd" }),
  });
  const cursorAt = async (
    journalVersion: number,
    statusFailed?: { status: string; detail: string },
  ) => {
    await swamp.context("board").writeResource?.("cursor", `cursor-${ITEM}`, {
      workItem: ITEM,
      issue: "cue-work-abcd",
      journalVersion,
      status: null,
      ...(statusFailed === undefined ? {} : { statusFailed }),
      at: "2026-09-30T00:00:00.000Z",
    });
  };
  const statusText = async () => {
    await call(swamp, "status");
    return String(swamp.logs.at(-1)?.props?.summary);
  };
  return { swamp, cursorAt, statusText };
}

Deno.test("status: a ticket never published is behind by the whole journal", async () => {
  const { swamp, statusText } = await onTicket();
  const length = (await runOf(swamp)).journal.length;
  assert(
    (await statusText()).includes(
      `  tracker 'board' behind by ${length} event(s): run publish on it`,
    ),
  );
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(view.tracker, {
    instance: "board",
    kind: "builtin",
    ticket: true,
    journalLength: length,
    delivered: 0,
    behind: length,
  });
});

Deno.test("status: the lag is the journal past the cursor, and nothing once published", async () => {
  const { swamp, cursorAt, statusText } = await onTicket();
  await call(swamp, "record_artifact", {
    name: "plan",
    payload: JSON.stringify({
      summary: "Add list",
      steps: [{ description: "Add list", files: ["x.ts"] }],
      testingStrategy: "Unit tests",
      versionBump: { needed: true, reason: "New method" },
    }),
    ...await expected(swamp),
  });
  const length = (await runOf(swamp)).journal.length;
  await cursorAt(length - 1);
  assert(
    (await statusText()).includes("  tracker 'board' behind by 1 event(s)"),
  );
  await cursorAt(length);
  assert(!(await statusText()).includes("tracker"));
});

Deno.test("status: a status move publish could not make is shown until a publish makes it", async () => {
  const { swamp, cursorAt, statusText } = await onTicket();
  const length = (await runOf(swamp)).journal.length;
  const failed = {
    status: "in_progress",
    detail: "status key 'in_progress' is not in the statuses global " +
      "argument of tracker 'board' (mapped: open); add it there",
  };
  await cursorAt(length, failed);
  const text = await statusText();
  assert(!text.includes("behind by"), text);
  assert(
    text.includes(
      "  tracker 'board' could not move the ticket to 'in_progress': " +
        `${failed.detail}; fix it, then run publish on it`,
    ),
    text,
  );
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(view.tracker.statusFailed, failed);

  await cursorAt(length);
  assert(!(await statusText()).includes("tracker"));
});

Deno.test("status: a work item with no ticket on its tracker is never behind", async () => {
  const swamp = await started();
  await call(swamp, "status");
  assert(!String(swamp.logs.at(-1)?.props?.summary).includes("tracker"));
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(view.tracker.ticket, false);
  assertEquals(view.tracker.behind, 0);
});

Deno.test("status: an unreadable cursor says the lag is unknown, and status still answers", async () => {
  const { swamp, statusText } = await onTicket();
  await swamp.context("board").writeResource?.("cursor", `cursor-${ITEM}`, {
    journalVersion: "three",
  });
  const text = await statusText();
  assert(text.startsWith(`${ITEM}: active at stage 'plan'`), text);
  assert(
    text.includes("  tracker 'board' lag unknown: reading tracker 'board'"),
  );
});

Deno.test("start: reads a factory in the remote-worker shape too", async () => {
  // A remote worker has no repo checkout and receives the factory's model
  // definition as a plain object with _globalArguments.
  const swamp = await started(true);
  assertEquals((await runOf(swamp)).stage, "plan");
  const local = await started();
  assertEquals(
    (await runOf(swamp)).definition.digest,
    (await runOf(local)).definition.digest,
  );
});

Deno.test("start: a second start, a missing factory, or an invalid definition is refused and writes nothing", async () => {
  const swamp = await started();
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "has already started",
  );

  const fresh = fakeSwamp();
  await assertRejects(
    () => call(fresh, "start", { factory: "team" }),
    Error,
    "no factory named 'team'",
  );
  const broken = await buildDefinition();
  // A name of its own is refused: the factory names its definition (#2816).
  broken.name = "team";
  fresh.factory("team", broken);
  await assertRejects(
    () => call(fresh, "start", { factory: "team" }),
    Error,
    "is not a valid definition",
  );
  assertEquals(fresh.versionsWritten(ITEM), 0);
});

Deno.test("start: a factory with no definition yet is refused, saying where to write one", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", undefined);
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "factory 'team' has no definition: write one under " +
      "globalArguments.definition",
  );
  assertEquals(swamp.versionsWritten(ITEM), 0);
});

async function factoryOnly(): Promise<FakeSwamp> {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  return swamp;
}

Deno.test("start: externalRefs as an object (--input-file) or a JSON string (--input) (#2640)", async () => {
  const refs = { builtin: "cue-fix-typo-r2ne", "builtin.display": "cue-fix" };
  for (const externalRefs of [refs, JSON.stringify(refs)]) {
    const swamp = await factoryOnly();
    await call(swamp, "start", { factory: "team", externalRefs });
    assertEquals((await runOf(swamp)).externalRefs, refs);
  }
});

Deno.test("start: refuses externalRefs whose tickets are only on another kind of tracker than the factory's, and writes nothing", async () => {
  const swamp = await factoryOnly();
  await assertRejects(
    () =>
      call(swamp, "start", {
        factory: "team",
        externalRefs: JSON.stringify({ "swamp-club": "2631" }),
      }),
    Error,
    `work item '${ITEM}' names a ticket on swamp-club, but factory 'team' is ` +
      "bound to tracker 'board' (builtin): start it with externalRefs.builtin",
  );
  assertEquals(swamp.versionsWritten(ITEM), 0);
});

Deno.test("start: takes refs that include the bound kind's ticket, and keys that are not a tracker kind", async () => {
  for (
    const refs of [
      { builtin: "cue-fix-typo-r2ne", linear: "7d2b8c4e" },
      { other: "X1" },
      { "linear.display": "ABC-1" },
    ] as Record<string, string>[]
  ) {
    const swamp = await factoryOnly();
    await call(swamp, "start", {
      factory: "team",
      externalRefs: JSON.stringify(refs),
    });
    assertEquals((await runOf(swamp)).externalRefs, refs);
  }
});

Deno.test("start: externalRefs that are not a JSON object of strings are refused and write nothing", async () => {
  for (
    const [externalRefs, message] of [
      ["{not json", "externalRefs is not valid JSON"],
      ['["ABC-1"]', "externalRefs must be a JSON object"],
      ['{"linear":1}', "externalRefs values must be strings; not: linear"],
    ]
  ) {
    const swamp = await factoryOnly();
    await assertRejects(
      () => call(swamp, "start", { factory: "team", externalRefs }),
      Error,
      message,
    );
    assertEquals(swamp.versionsWritten(ITEM), 0);
  }
});

Deno.test("pinning: editing the factory does not change a running work item; reset with repin adopts the edit", async () => {
  const swamp = await started();
  const before = (await runOf(swamp)).definition.digest;
  const edited = await buildDefinition();
  edited.description = "edited after start";
  swamp.factory("team", edited);

  await call(swamp, "reset", { confirm: "reset", ...await expected(swamp) });
  assertEquals(
    (await runOf(swamp)).definition.digest,
    before,
    "reset keeps the pinned definition",
  );

  await call(swamp, "reset", {
    confirm: "reset",
    repin: "true",
    ...await expected(swamp),
  });
  const run = await runOf(swamp);
  assert(run.definition.digest !== before);
  assertEquals(run.definition.version, 2);
  assertEquals(run.factory, "team", "a repin keeps the factory");
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(view.definition.digest, run.definition.digest);
  const last = run.journal.at(-1);
  assert(
    last?.type === "reset" && last.repinned?.version === 2,
    "the reset event records the repin",
  );
});

Deno.test("reset: needs confirm=reset", async () => {
  const swamp = await started();
  await assertRejects(
    async () =>
      call(swamp, "reset", { confirm: "yes", ...await expected(swamp) }),
    Error,
    "confirm=reset",
  );
});

// --- writes ------------------------------------------------------------------

Deno.test("record_artifact: a rejected payload is kept as feedback, then the call fails", async () => {
  const swamp = await started();
  await assertRejects(
    async () =>
      call(swamp, "record_artifact", {
        name: "plan",
        payload: JSON.stringify({ summary: "s" }),
        ...await expected(swamp),
      }),
    Error,
    "rejected and kept as retry feedback",
  );
  const run = await runOf(swamp);
  assertEquals(run.validations.artifacts.plan.rejected, { summary: "s" });
  await call(swamp, "status");
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.includes("  rejected artifact 'plan' (stage 'plan' cycle 1): "),
    summary,
  );
});

Deno.test("writes: a stale expectation is refused and writes nothing", async () => {
  const swamp = await started();
  const before = swamp.versionsWritten(ITEM);
  await assertRejects(
    async () =>
      call(swamp, "record_artifact", {
        name: "plan",
        payload: "{}",
        ...await expected(swamp),
        expectedCycle: "2",
      }),
    Error,
    "stale:",
  );
  assertEquals(swamp.versionsWritten(ITEM), before);
});

Deno.test("dispatch: reports the packet, and the dispatch cap refuses a third", async () => {
  const swamp = await started();
  await call(swamp, "dispatch", await expected(swamp));
  const logged = swamp.logs.at(-1)?.props;
  assertEquals(logged?.dispatchId, 1);
  assert(String(logged?.summary).includes("Plan the change."));
  assert(
    String(logged?.summary).includes('packet: {\n  "stage": "plan"'),
    String(logged?.summary),
  );
  await call(swamp, "dispatch", await expected(swamp));
  await assertRejects(
    async () => call(swamp, "dispatch", await expected(swamp)),
    Error,
    "runaway loop suspected",
  );
  await call(swamp, "grant_override", {
    kind: "dispatch",
    ...await expected(swamp),
  });
  await call(swamp, "dispatch", await expected(swamp));
  await assertRejects(
    () => call(swamp, "record_usage", { dispatchId: "3", inputTokens: "100" }),
    Error,
    "totalTokens",
  );
  await call(swamp, "record_usage", {
    dispatchId: "3",
    totalTokens: "65155",
    toolUses: "4",
    durationMs: "90000",
  });
  assertEquals((await runOf(swamp)).dispatches[2].usage, {
    totalTokens: 65155,
    toolUses: 4,
    durationMs: 90000,
    attested: true,
  });
});

async function atPlanReview(): Promise<FakeSwamp> {
  const swamp = await started();
  await call(swamp, "record_artifact", {
    name: "plan",
    payload: JSON.stringify({
      summary: "Add a list method",
      steps: [{ description: "d", files: ["a.ts"] }],
      testingStrategy: "t",
      versionBump: { needed: false, reason: "r" },
    }),
    ...await expected(swamp),
  });
  await call(swamp, "advance", {
    transition: "submit",
    ...await expected(swamp),
  });
  return swamp;
}

Deno.test("dispatch: a dispatch stage records the subagent prompts it prints", async () => {
  const swamp = await atPlanReview();
  // resultDir is given: the model's default makes a temp directory, which
  // the unit tests have no permission for. It must exist; nothing is
  // written there by dispatch itself.
  await assertRejects(
    async () =>
      call(swamp, "dispatch", {
        resultDir: "/no/such/dir",
        ...await expected(swamp),
      }),
    Error,
    "is not an existing directory",
  );
  const dir = fromFileUrl(new URL(".", import.meta.url)).replace(/\/$/, "");
  await call(swamp, "dispatch", {
    resultDir: dir,
    ...await expected(swamp),
  });
  const logged = swamp.logs.at(-1)?.props;
  const summary = String(logged?.summary);
  const recorded = (await runOf(swamp)).dispatches[0];
  assertEquals(recorded.subagentPrompts?.length, 1);
  const [sent] = recorded.subagentPrompts ?? [];
  assertEquals(logged?.subagentPrompts, recorded.subagentPrompts);
  assert(sent.prompt.startsWith(recorded.prompt ?? "-"), sent.prompt);
  assert(summary.includes(sent.prompt), summary);
  assertEquals(sent.resultPaths, {
    "plan-review": `${dir}/${ITEM}-d1-1-plan-review.json`,
  });
  // The rendered prompt is printed once, inside the subagent prompt.
  assertEquals(summary.split("Try to refute this plan:").length, 2, summary);
  // The status follows the last prompt, so sending the prompts as they are
  // never sends it.
  const statusAt = summary.indexOf(`\n${ITEM}: active at stage 'plan-review'`);
  assert(statusAt > summary.lastIndexOf("--- end subagent 1 prompt ---"));
});

// --- what a write prints ----------------------------------------------------------

/** A write's log: its own line, then exactly what status prints next. */
async function assertEndsWithStatus(swamp: FakeSwamp, line: string) {
  const written = swamp.logs.at(-1)?.props;
  const summary = String(written?.summary);
  await call(swamp, "status");
  const read = swamp.logs.at(-1)?.props;
  assert(summary.startsWith(line), summary);
  assert(summary.endsWith(`\n${String(read?.summary)}`), summary);
  assertEquals(written?.status, read?.status);
}

Deno.test("writes: each write ends with the status that follows it", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await call(swamp, "start", { factory: "team" });
  await assertEndsWithStatus(swamp, `started '${ITEM}' at stage 'plan'`);
  await call(swamp, "dispatch", await expected(swamp));
  await assertEndsWithStatus(swamp, "dispatch 1 for stage 'plan' cycle 1");
  await call(swamp, "record_usage", { dispatchId: "1", totalTokens: "10" });
  await assertEndsWithStatus(swamp, "recorded usage for dispatch 1");
  await call(swamp, "record_artifact", {
    name: "plan",
    payload: JSON.stringify({
      summary: "Add a list method",
      steps: [{ description: "d", files: ["a.ts"] }],
      testingStrategy: "t",
      versionBump: { needed: false, reason: "r" },
    }),
    ...await expected(swamp),
  });
  await assertEndsWithStatus(swamp, "recorded artifact 'plan' version 1");
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(
      "  exit submit -> plan-review: ready",
    ),
  );
  await call(swamp, "grant_override", {
    kind: "dispatch",
    ...await expected(swamp),
  });
  await assertEndsWithStatus(swamp, "granted dispatch override 1");
  await call(swamp, "advance", {
    transition: "submit",
    ...await expected(swamp),
  });
  await assertEndsWithStatus(
    swamp,
    "took 'submit' to stage 'plan-review' cycle 1",
  );
  await call(swamp, "reset", { confirm: "reset", ...await expected(swamp) });
  await assertEndsWithStatus(swamp, "reset: new era ");
});

Deno.test("writes: a status that cannot be read after a committed write is reported, not thrown", async () => {
  const swamp = await atPlanReview();
  const ctx = swamp.context(ITEM);
  const store = {
    ...contextStore(ctx),
    readPayload: () => Promise.reject(new Error("store down")),
  };
  const run = await runOf(swamp);
  const pinned = {
    factory: "team",
    digest: run.definition.digest,
    definition: await buildDefinition(),
  } as Parameters<typeof logWrite>[3]["pinned"];
  await logWrite(ctx, "took 'x'", { a: 1 }, { store, run, pinned }, systemEnv);
  const props = swamp.logs.at(-1)?.props;
  assertEquals(
    props?.summary,
    "took 'x'\nstatus could not be read after this write: store down; " +
      "run status",
  );
  assertEquals(props?.a, 1);
});

Deno.test("dispatch: without resultDir a dispatch stage gets a new directory; other stages none", async () => {
  const made: string[] = [];
  const removed: string[] = [];
  const makeDir = {
    make: () => {
      made.push("/tmp/stagecraft-x");
      return Promise.resolve("/tmp/stagecraft-x");
    },
    remove: (dir: string) => {
      removed.push(dir);
      return Promise.resolve();
    },
    exists: (dir: string) => Promise.resolve(dir === "/mine"),
  };
  const plan = await started();
  await dispatch(
    plan.context(ITEM),
    await expectedArgs(plan),
    systemEnv,
    makeDir,
  );
  assertEquals(made, [], "an interactive stage has no result files");
  assertEquals((await runOf(plan)).dispatches[0].subagentPrompts, undefined);

  const review = await atPlanReview();
  await dispatch(
    review.context(ITEM),
    await expectedArgs(review),
    systemEnv,
    makeDir,
  );
  assertEquals(made.length, 1);
  assertEquals(
    (await runOf(review)).dispatches[0].subagentPrompts?.[0].resultPaths,
    { "plan-review": `/tmp/stagecraft-x/${ITEM}-d1-1-plan-review.json` },
  );
  assertEquals(removed, []);

  // A refused dispatch removes the directory it made, and only that one.
  const stale = { ...await expectedArgs(review), expectedCycle: 9 };
  await assertRejects(
    () =>
      dispatch(
        review.context(ITEM),
        stale,
        systemEnv,
        makeDir,
      ),
    Error,
    "stale:",
  );
  assertEquals(removed, ["/tmp/stagecraft-x"]);
  await assertRejects(
    () =>
      dispatch(
        review.context(ITEM),
        { ...stale, resultDir: "/mine" },
        systemEnv,
        makeDir,
      ),
    Error,
    "stale:",
  );
  assertEquals(removed, ["/tmp/stagecraft-x"], "a given resultDir is kept");

  // A store failure records nothing either, so the made directory goes too.
  const failing = review.context(ITEM);
  failing.writeResource = () => Promise.reject(new Error("store down"));
  removed.length = 0;
  await assertRejects(
    async () =>
      dispatch(failing, await expectedArgs(review), systemEnv, makeDir),
    Error,
    "store down",
  );
  assertEquals(removed, ["/tmp/stagecraft-x"]);
});

Deno.test("dispatch: a dispatch refused at the cap journals the park once, until a dispatch override is granted", async () => {
  const removed: string[] = [];
  const makeDir = {
    make: () => Promise.resolve("/tmp/stagecraft-x"),
    remove: (dir: string) => {
      removed.push(dir);
      return Promise.resolve();
    },
    exists: () => Promise.resolve(false),
  };
  const swamp = await atPlanReview();
  const ctx = () => swamp.context(ITEM);
  await dispatch(ctx(), await expectedArgs(swamp), systemEnv, makeDir);
  await dispatch(ctx(), await expectedArgs(swamp), systemEnv, makeDir);
  assertEquals(removed, []);
  const refuse = async () =>
    await assertRejects(
      async () =>
        dispatch(ctx(), await expectedArgs(swamp), systemEnv, makeDir),
      Error,
      "runaway loop suspected: stage 'plan-review' cycle 1 has had 2 " +
        "dispatch(es), its limit is 2; a person must grant a dispatch " +
        "override to dispatch again",
    );
  await refuse();
  assertEquals(removed, ["/tmp/stagecraft-x"]);
  const parked = (await runOf(swamp)).journal.at(-1);
  assert(parked?.type === "awaiting");
  assertEquals(parked.dispatchOverride, { count: 2, limit: 2, granted: 0 });
  const metrics = swamp.resources.get(ITEM)?.get("metrics")?.at(-1) as {
    eras: { waits: { kind: string; until: string | null }[] }[];
  };
  assertEquals(
    metrics.eras[0].waits.map((w) => [w.kind, w.until]),
    [["dispatch-override", null]],
  );
  await call(swamp, "status");
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(
      "  parked at the dispatch cap: waiting on a person to grant a " +
        "dispatch override",
    ),
  );

  // Refused again: parked already, so nothing is written.
  const before = swamp.versionsWritten(ITEM);
  await refuse();
  assertEquals(swamp.versionsWritten(ITEM), before);

  await call(swamp, "grant_override", {
    kind: "dispatch",
    ...await expected(swamp),
  });
  const cleared = (await runOf(swamp)).journal.slice(-2);
  assertEquals(cleared.map((e) => e.type), ["override", "awaiting"]);
  assert(cleared[1].type === "awaiting");
  assertEquals(cleared[1].dispatchOverride, undefined);
  await call(swamp, "status");
  assert(
    !String(swamp.logs.at(-1)?.props?.summary).includes("parked at"),
  );
});

Deno.test("dispatch: a park that cannot be written is reported after the cap's refusal", async () => {
  const swamp = await started();
  await call(swamp, "dispatch", await expected(swamp));
  await call(swamp, "dispatch", await expected(swamp));
  const failing = swamp.context(ITEM);
  failing.writeResource = () => Promise.reject(new Error("store down"));
  const error = await assertRejects(
    async () => dispatch(failing, await expectedArgs(swamp), systemEnv),
    Error,
  );
  assert(error.message.startsWith("runaway loop suspected"), error.message);
  assert(
    error.message.endsWith(
      "\n(the park could not be journaled: store down)",
    ),
    error.message,
  );
});

Deno.test("dispatch: a relative resultDir is refused, since each reader would resolve it differently", async () => {
  const swamp = await atPlanReview();
  await assertRejects(
    async () =>
      call(swamp, "dispatch", {
        resultDir: "scratch",
        ...await expected(swamp),
      }),
    Error,
    "must be an absolute path",
  );
  assertEquals((await runOf(swamp)).dispatches, []);
});

async function expectedArgs(swamp: FakeSwamp) {
  const e = await expected(swamp);
  return {
    expectedStage: e.expectedStage,
    expectedCycle: Number(e.expectedCycle),
    expectedEra: e.expectedEra,
  };
}

Deno.test("status: a read method that logs where the work item is and what is ready", async () => {
  const swamp = await started();
  await call(swamp, "status");
  assertEquals(model.methods.status.kind, "read");
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(summary.includes(`${ITEM}: active at stage 'plan' cycle 1`), summary);
  assert(
    summary.includes(
      "exit submit -> plan-review: not ready: artifact-exists: artifact 'plan' has not been recorded",
    ),
    summary,
  );
  assert(
    summary.includes("  work: interactive; dispatches this cycle 0 of 2"),
    summary,
  );
});

Deno.test("status: names each exit's human gates, global exits included, and the evidence a person records", async () => {
  const swamp = await started();
  await call(swamp, "record_artifact", {
    name: "plan",
    payload: JSON.stringify({
      summary: "s",
      steps: [{ description: "d", files: ["a.ts"] }],
      testingStrategy: "t",
      versionBump: { needed: false, reason: "r" },
    }),
    ...await expected(swamp),
  });
  await call(swamp, "advance", {
    transition: "submit",
    ...await expected(swamp),
  });

  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(
    Object.fromEntries(
      view.exits.map((e) => [e.name, [e.humanGates, e.humanGatesNotRequired]]),
    ),
    {
      approve: [["plan-approval"], []],
      rework: [[], []],
      revise: [[], []],
      abandon: [["abandon-confirmation"], []],
    },
  );

  await call(swamp, "status");
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.includes("exit approve -> implement [human: plan-approval]: "),
    summary,
  );
  assert(
    summary.includes(
      "exit revise -> plan (manual): not ready: evidence-recorded: evidence 'plan-feedback' has not been recorded",
    ),
    summary,
  );
  assert(summary.includes("\n  a person records: plan-feedback"), summary);
  assertEquals(view.personRecords, ["plan-feedback"]);
  assert(
    summary.includes(
      "exit abandon -> abandoned [human: abandon-confirmation]: ",
    ),
    summary,
  );

  // A conditional approval is required only while its when is true; one whose
  // when cannot be evaluated counts as required, so the driver stops and asks.
  const conditional = fakeSwamp();
  conditional.factory("team", {
    schemaVersion: 1,
    stages: [
      {
        id: "review",
        initial: true,
        artifacts: [{ name: "plan", schema: { type: "object" } }],
        transitions: ["now", "later", "broken"].map((name) => ({
          name,
          to: "done",
          gates: [{
            type: "human-approval",
            config: {
              id: name,
              when: name === "now"
                ? "true"
                : name === "later"
                ? "false"
                : 'artifacts["plan"].payload.risky',
            },
          }],
        })),
      },
      { id: "done", terminal: true },
    ],
  });
  await call(conditional, "start", { factory: "team" }, "conditional-a");
  const gates = await describeStatus(
    conditional.context("conditional-a"),
    systemEnv,
  );
  assertEquals(
    Object.fromEntries(
      gates.exits.map((e) => [e.name, [e.humanGates, e.humanGatesNotRequired]]),
    ),
    {
      now: [["now"], []],
      later: [[], ["later"]],
      broken: [["broken"], []],
    },
  );
  await call(conditional, "status", {}, "conditional-a");
  const lines = String(conditional.logs.at(-1)?.props?.summary);
  assert(lines.includes("exit now -> done [human: now]: not ready"), lines);
  assert(
    lines.includes(
      "exit later -> done [approval not required now: later]: ready",
    ),
    lines,
  );
  assert(
    lines.includes(
      "exit broken -> done [human: broken]: not ready: human-approval: when: could not evaluate",
    ),
    lines,
  );
});

// --- a whole run through the methods ------------------------------------------

Deno.test("build-swamp-extension: start to release through the methods, with CLI string inputs", async () => {
  const swamp = await started();
  const record = async (
    kind: "artifact" | "evidence",
    name: string,
    payload: Record<string, unknown>,
  ) =>
    call(swamp, kind === "artifact" ? "record_artifact" : "record_evidence", {
      name,
      payload: JSON.stringify(payload),
      ...await expected(swamp),
    });
  const go = async (transition: string) =>
    call(swamp, "advance", { transition, ...await expected(swamp) });
  const approve = async (gateId: string) =>
    call(swamp, "approve", { gateId, ...await expected(swamp) });

  await record("artifact", "plan", {
    summary: "Add list",
    steps: [{ description: "Add list", files: ["x.ts"] }],
    testingStrategy: "Unit tests",
    versionBump: { needed: true, reason: "New method" },
  });
  await go("submit");
  await record("artifact", "plan-review", { findings: [] });
  await approve("plan-approval");
  await go("approve");
  await record("artifact", "change-summary", {
    summary: "Added list",
    commit: SHA,
    files: ["x.ts"],
    manifestVersion: "2026.09.28.1",
  });
  await go("submit");
  await record("evidence", "checks", {
    commit: SHA,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await record("evidence", "quality", {
    commit: SHA,
    status: "passed",
    allPassed: true,
  });
  await go("passed");
  await record("artifact", "code-review", { findings: [] });
  await approve("release-approval");
  await go("accept");
  await record("evidence", "release", {
    via: "registry-push",
    commit: SHA,
    url: "https://swamp-club.com/extensions/@me/thing",
    version: "2026.09.28.1",
  });
  await go("released");

  const run = await runOf(swamp);
  assertEquals(run.stage, "done");
  assertEquals(run.status, "terminal");
  await call(swamp, "status");
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(
      "terminal at stage 'done'",
    ),
  );
});

Deno.test("work item: the model's literal type is WORK_ITEM_TYPE", () => {
  assertEquals(model.type, WORK_ITEM_TYPE);
});

Deno.test("status: a run naming no pinned definition version fails clearly", async () => {
  const swamp = await started();
  const runs = swamp.resources.get(ITEM)?.get("run");
  assert(runs !== undefined);
  const latest = structuredClone(runs.at(-1)) as {
    definition: Record<string, unknown>;
  };
  delete latest.definition.version;
  runs.push(latest);
  await assertRejects(
    () => call(swamp, "status"),
    Error,
    "the run names no pinned definition version",
  );
});

Deno.test("build-swamp-extension: plan to done through the work-item operations, with CLI string inputs, retargeted on the way", async () => {
  // This calls the operations the methods wrap, with the methods' own
  // argument schemas and a clock the test moves.
  const item = "build-swamp-extension-abcdefgh";
  let ms = Date.UTC(2026, 8, 28, 12, 0, 0);
  const env: Env = {
    now: () => new Date(ms += 1000).toISOString(),
    newEra: () => "era-1",
  };
  const swamp = fakeSwamp();
  swamp.factory(
    "team",
    parseExample(
      await Deno.readTextFile(
        new URL(
          "../../../.claude/skills/stagecraft/references/examples/build-swamp-extension.yaml",
          import.meta.url,
        ),
      ),
    ).definition,
  );
  const ctx = () => swamp.context(item);
  const { methods } = model;
  const expectation = async () => {
    const view = await describeStatus(ctx(), env);
    return {
      expectedStage: view.expected.expectedStage,
      expectedCycle: String(view.expected.expectedCycle),
      expectedEra: view.expected.expectedEra,
    };
  };
  const record = async (
    kind: "artifact" | "evidence",
    name: string,
    payload: Record<string, unknown>,
  ) =>
    recordProductMethod(
      ctx(),
      kind,
      (kind === "artifact" ? methods.record_artifact : methods.record_evidence)
        .arguments.parse({
          name,
          payload: JSON.stringify(payload),
          ...await expectation(),
        }),
      env,
    );
  const go = async (transition: string) =>
    advanceMethod(
      ctx(),
      methods.advance.arguments.parse({
        transition,
        ...await expectation(),
      }),
      env,
    );
  const approve = async (gateId: string) =>
    decide(
      ctx(),
      "approve",
      methods.approve.arguments.parse({ gateId, ...await expectation() }),
      env,
    );

  await startWorkItem(
    ctx(),
    methods.start.arguments.parse({
      factory: "team",
      externalRefs: JSON.stringify({ builtin: "ext-add-list-r2ne" }),
    }),
    env,
  );
  await record("artifact", "plan", {
    summary: "Add list",
    steps: [{ description: "Add list", files: ["x.ts"] }],
    testingStrategy: "Unit tests",
    versionBump: { needed: true, reason: "New method" },
  });
  await go("submit");
  await record("artifact", "plan-review", { findings: [] });
  await approve("plan-approval");
  await go("approve");

  // Retarget mid-lifecycle (a duplicate's work moving to its primary): the
  // refs and the journal change, and nothing a gate or a cycle reads does.
  const before = await loadRun(contextStore(ctx()));
  assert(before !== null);
  const exitsBefore = (await describeStatus(ctx(), env)).exits;
  await retargetMethod(
    ctx(),
    methods.retarget.arguments.parse({
      externalRefs: '{"builtin": "ext-list-k3xq"}',
      reason: "ext-add-list-r2ne duplicates ext-list-k3xq",
      onBehalfOf: "seth",
      ...await expectation(),
    }),
    env,
  );
  const after = await loadRun(contextStore(ctx()));
  assert(after !== null);
  assertEquals(after.externalRefs, { builtin: "ext-list-k3xq" });
  for (
    const field of [
      "stage",
      "status",
      "era",
      "entries",
      "products",
      "approvals",
      "dispatches",
      "overrides",
    ] as const
  ) {
    assertEquals(after[field], before[field], field);
  }
  assertEquals((await describeStatus(ctx(), env)).exits, exitsBefore);
  const moved = after.journal.at(-1);
  assert(moved?.type === "retargeted");
  assertEquals(moved.from, { builtin: "ext-add-list-r2ne" });
  assertEquals(moved.reason, "ext-add-list-r2ne duplicates ext-list-k3xq");
  assertEquals(moved.actor.asserted, "seth");
  assertEquals([moved.stage, moved.cycle], ["implement", 1]);

  await record("artifact", "change-summary", {
    summary: "Added list",
    commit: SHA,
    files: ["x.ts"],
    manifestVersion: "2026.09.28.1",
  });
  await go("submit");
  await record("evidence", "checks", {
    commit: SHA,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await record("evidence", "quality", {
    commit: SHA,
    status: "passed",
    allPassed: true,
  });
  await go("passed");
  await record("artifact", "code-review", { findings: [] });
  await approve("release-approval");
  await go("accept");
  await record("evidence", "release", {
    via: "registry-push",
    commit: SHA,
    url: "https://registry.example.com/extensions/@me/thing",
    version: "2026.09.28.1",
  });
  await go("released");

  const run = await loadRun(contextStore(ctx()));
  assert(run !== null);
  assertEquals(run.stage, "done");
  assertEquals(run.status, "terminal");
  assertEquals(run.externalRefs, { builtin: "ext-list-k3xq" });
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  for (
    const expected of [
      "- **Tracker:** builtin ext-list-k3xq",
      "- **Previously:** builtin ext-add-list-r2ne",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
});

Deno.test("retarget: refused on a finished work item, and needs a reason and new refs", async () => {
  const swamp = await started();
  const refs = '{"linear": "b"}';
  await assertRejects(
    async () =>
      await call(swamp, "retarget", {
        externalRefs: "{}",
        reason: "moved",
        ...await expected(swamp),
      }),
    Error,
    "at least one",
  );
  await assertRejects(
    async () =>
      await call(swamp, "retarget", {
        externalRefs: refs,
        ...await expected(swamp),
      }),
  );
  await assertRejects(
    async () =>
      await call(swamp, "retarget", {
        externalRefs: refs,
        reason: "moved",
        ...await expected(swamp),
        expectedCycle: "9",
      }),
    Error,
    "stale",
  );
  await call(swamp, "approve", {
    gateId: "abandon-confirmation",
    ...await expected(swamp),
  });
  await call(swamp, "advance", {
    transition: "abandon",
    ...await expected(swamp),
  });
  await assertRejects(
    async () =>
      await call(swamp, "retarget", {
        externalRefs: refs,
        reason: "moved",
        ...await expected(swamp),
      }),
    Error,
    "finished",
  );
  assertEquals((await runOf(swamp)).externalRefs, {});
});
