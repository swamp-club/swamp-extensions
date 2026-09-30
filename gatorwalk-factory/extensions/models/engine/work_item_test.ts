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
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { model } from "./work_item.ts";
import { type FakeSwamp, fakeSwamp } from "../_lib/engine/fake_swamp.ts";
import { type Env, systemEnv } from "../_lib/engine/run_ops.ts";
import type { RunRecord } from "../_lib/engine/run_record.ts";
import { contextStore, loadRun } from "../_lib/engine/run_store.ts";
import {
  advanceMethod,
  decide,
  describeStatus,
  FACTORY_TYPE,
  type MethodContextLike,
  recordProductMethod,
  startWorkItem,
  WORK_ITEM_TYPE,
} from "../_lib/engine/work_item_ops.ts";

const BUILD = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/build-swamp-extension.yaml",
  import.meta.url,
);
const ITEM = "build-swamp-extension-abcdefgh";
const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

async function buildDefinition(): Promise<Record<string, unknown>> {
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
  const pinned = swamp.resources.get(ITEM)?.get("definition")?.[0];
  assertEquals(pinned?.factory, "team");
  assertEquals(pinned?.digest, run.definition.digest);
  assertEquals(run.journal[0].actor, {
    principal: "user:alice",
    source: "platform",
  });
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(summary.startsWith(`started '${ITEM}' at stage 'plan'`), summary);
  assert(summary.includes("factories/team.yaml"), summary);
});

Deno.test("start: reads a factory in the remote-worker shape too", async () => {
  const swamp = await started(true);
  assertEquals((await runOf(swamp)).stage, "plan");
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
  delete broken.name;
  fresh.factory("team", broken);
  await assertRejects(
    () => call(fresh, "start", { factory: "team" }),
    Error,
    "is not a valid definition",
  );
  assertEquals(fresh.versionsWritten(ITEM), 0);
});

Deno.test("start: a factory whose globalArguments hold the definition inline is refused, pointing at the file form", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildDefinition(),
    type: FACTORY_TYPE,
  });
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "--global-arg definition=factories/team.yaml",
  );
  assertEquals(swamp.versionsWritten(ITEM), 0);
});

Deno.test("start: a missing definition file is refused with its path, and away from the repo says to start where the repo is", async () => {
  const swamp = await factoryOnly();
  swamp.repo.remove("factories/team.yaml");
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "factory 'team': definition file 'factories/team.yaml' does not exist",
  );
  swamp.repo.remove(".swamp");
  await assertRejects(
    () => call(swamp, "start", { factory: "team" }),
    Error,
    "Start the work item where the repo is",
  );
  assertEquals(swamp.versionsWritten(ITEM), 0);
});

async function factoryOnly(): Promise<FakeSwamp> {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  return swamp;
}

Deno.test("start: externalRefs as an object (--input-file) or a JSON string (--input) (#2640)", async () => {
  const refs = { linear: "7d2b8c4e-0000-4000-8000-000000000001" };
  for (const externalRefs of [refs, JSON.stringify(refs)]) {
    const swamp = await factoryOnly();
    await call(swamp, "start", { factory: "team", externalRefs });
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
  swamp.repo.write("factories/team.yaml", stringifyYaml(edited));

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
  assert(
    summary.includes("  work: interactive; dispatches this cycle 0 of 2"),
    summary,
  );
});

Deno.test("status: names each exit's human gates, global exits included", async () => {
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
  assert(summary.includes("exit revise -> plan (manual): "), summary);
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
    name: "conditional",
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

Deno.test("swamp-extensions: a feature from triage to done through the work-item operations, with CLI string inputs", async () => {
  // The methods run on the system clock, and merge waits three minutes
  // after the pull request. So this calls the operations the methods wrap,
  // with the methods' own argument schemas and a clock the test moves.
  const item = "swamp-extensions-abcdefgh";
  let ms = Date.UTC(2026, 8, 28, 12, 0, 0);
  const env: Env = {
    now: () => new Date(ms += 1000).toISOString(),
    newEra: () => "era-1",
  };
  const swamp = fakeSwamp();
  swamp.factory(
    "team",
    parseYaml(
      await Deno.readTextFile(
        new URL(
          "../../../.claude/skills/gatorwalk-factory/references/examples/swamp-club-swamp-extensions.yaml",
          import.meta.url,
        ),
      ),
    ),
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
      externalRefs: { lab: "2630" },
    }),
    env,
  );
  await record("evidence", "classification", {
    type: "feature",
    confidence: "high",
    reasoning: "New definition",
    isRegression: false,
  });
  await go("feature");
  await record("artifact", "plan", {
    summary: "Add the definition",
    scopeAnalysis: "gatorwalk-factory only",
    steps: [{ order: 1, description: "Write it", files: ["x.yaml"] }],
    testingStrategy: "FactoryDefinition tests",
  });
  await go("submit");
  await record("artifact", "plan-review", { findings: [] });
  await approve("plan-approval");
  await go("approve");
  await record("artifact", "change-summary", {
    summary: "Added the definition",
    commit: SHA,
    branch: "gw",
    files: ["x.yaml"],
  });
  await go("submit");
  await record("artifact", "conformance", {
    steps: [{ order: 1, status: "implemented", description: "Written" }],
  });
  await go("conforms");
  await record("evidence", "verification", {
    status: "succeeded",
    runId: "w1",
    commit: SHA,
    buildStatus: "succeeded",
    buildRunId: "b1",
    reviewsStatus: "succeeded",
    reviewsRunId: "v1",
  });
  await approve("checklist-confirmed");
  await go("passed");
  await record("evidence", "attestation", {
    attestationId: "a-1",
    commit: SHA,
    buildRunId: "b1",
    reviewsRunId: "v1",
  });
  await approve("open-pr");
  await go("attested");
  await record("evidence", "pull-request", {
    url: "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/346",
    commit: SHA,
  });
  await go("opened");
  await record("evidence", "merge", {
    status: "merged",
    mergeCommit: "8a25dbbfc0e8f3c1d4a2b6e7f9012345678abcde",
  });
  await assertRejects(() => go("merged"), Error, "cooldown");
  ms += 180_000;
  await go("merged");
  await record("evidence", "release", { outcome: "completed" });
  await go("released");
  await record("evidence", "notification", {
    action: "skipped",
    author: "skunk-ape",
    reason: "on the swamp-club team",
  });
  await go("notified");
  await record("artifact", "summary", {
    originalProblem: "No definition for this repo",
    deliveredOutcome: "swamp-club-swamp-extensions.yaml",
    outcomeMet: true,
  });
  await go("finish");

  const run = await loadRun(contextStore(ctx()));
  assert(run !== null);
  assertEquals(run.stage, "done");
  assertEquals(run.status, "terminal");
  assertEquals(run.externalRefs, { lab: "2630" });
});
