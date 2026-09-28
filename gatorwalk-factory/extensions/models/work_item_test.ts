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
import { parse as parseYaml } from "@std/yaml";
import { model } from "./work_item.ts";
import { type FakeSwamp, fakeSwamp } from "./_lib/fake_swamp.ts";
import { systemEnv } from "./_lib/run_ops.ts";
import type { RunRecord } from "./_lib/run_record.ts";
import { contextStore, loadRun } from "./_lib/run_store.ts";
import {
  describeStatus,
  HOLDER_TYPE,
  type MethodContextLike,
  WORK_ITEM_TYPE,
} from "./_lib/work_item_ops.ts";

const BUILD = new URL(
  "../../lifecycles/build-swamp-extension.yaml",
  import.meta.url,
);
const ITEM = "build-swamp-extension-abcdefgh";
const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

async function buildLifecycle(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(BUILD)) as Record<string, unknown>;
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
  swamp.definitions.set("team", {
    globalArguments: await buildLifecycle(),
    type: HOLDER_TYPE,
    remote,
  });
  await call(swamp, "start", { lifecycle: "team" });
  return swamp;
}

// --- start and the pinned lifecycle ---------------------------------------------

Deno.test("start: pins the holder's lifecycle and starts at its initial stage", async () => {
  const swamp = await started();
  const run = await runOf(swamp);
  assertEquals(run.key, ITEM);
  assertEquals(run.stage, "plan");
  assertEquals(run.lifecycle.version, 1);
  const pinned = swamp.resources.get(ITEM)?.get("lifecycle")?.[0];
  assertEquals(pinned?.holder, "team");
  assertEquals(pinned?.digest, run.lifecycle.digest);
  assertEquals(run.journal[0].actor, {
    principal: "user:alice",
    source: "platform",
  });
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(summary.startsWith(`started '${ITEM}' at stage 'plan'`), summary);
});

Deno.test("start: reads a holder in the remote-worker shape too", async () => {
  const swamp = await started(true);
  assertEquals((await runOf(swamp)).stage, "plan");
});

Deno.test("start: a second start, a missing holder, or an invalid lifecycle is refused and writes nothing", async () => {
  const swamp = await started();
  await assertRejects(
    () => call(swamp, "start", { lifecycle: "team" }),
    Error,
    "has already started",
  );

  const fresh = fakeSwamp();
  await assertRejects(
    () => call(fresh, "start", { lifecycle: "team" }),
    Error,
    "no lifecycle holder named 'team'",
  );
  const broken = await buildLifecycle();
  delete broken.name;
  fresh.definitions.set("team", { globalArguments: broken, type: HOLDER_TYPE });
  await assertRejects(
    () => call(fresh, "start", { lifecycle: "team" }),
    Error,
    "is not a valid lifecycle",
  );
  assertEquals(fresh.versionsWritten(ITEM), 0);
});

Deno.test("pinning: editing the holder does not change a running work item; reset with repin adopts the edit", async () => {
  const swamp = await started();
  const before = (await runOf(swamp)).lifecycle.digest;
  const edited = await buildLifecycle();
  edited.description = "edited after start";
  swamp.definitions.set("team", { globalArguments: edited, type: HOLDER_TYPE });

  await call(swamp, "reset", { confirm: "reset", ...await expected(swamp) });
  assertEquals(
    (await runOf(swamp)).lifecycle.digest,
    before,
    "reset keeps the pinned lifecycle",
  );

  await call(swamp, "reset", {
    confirm: "reset",
    repin: "true",
    ...await expected(swamp),
  });
  const run = await runOf(swamp);
  assert(run.lifecycle.digest !== before);
  assertEquals(run.lifecycle.version, 2);
  const view = await describeStatus(swamp.context(ITEM), systemEnv);
  assertEquals(view.lifecycle.digest, run.lifecycle.digest);
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
  await call(swamp, "record_usage", {
    dispatchId: "3",
    inputTokens: "100",
    outputTokens: "20",
  });
  assertEquals((await runOf(swamp)).dispatches[2].usage?.inputTokens, 100);
});

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

Deno.test("status: a run naming no pinned lifecycle version fails clearly", async () => {
  const swamp = await started();
  const runs = swamp.resources.get(ITEM)?.get("run");
  assert(runs !== undefined);
  const latest = structuredClone(runs.at(-1)) as {
    lifecycle: Record<string, unknown>;
  };
  delete latest.lifecycle.version;
  runs.push(latest);
  await assertRejects(
    () => call(swamp, "status"),
    Error,
    "the run names no pinned lifecycle version",
  );
});
