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

import { assert, assertEquals } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import {
  findStage,
  type Lifecycle,
  parseLifecycle,
  type StageSpec,
  type TransitionSpec,
} from "./_lib/lifecycle_schema.ts";
import {
  type PayloadSchema,
  validateArtifactPayload,
  validatePayload,
} from "./_lib/payload_schema.ts";
import type { Json } from "./_lib/canonical.ts";
import { buildCelContext, evaluateCel } from "./_lib/cel_context.ts";
import { makeGateEvaluator } from "./_lib/gates.ts";
import { analyzeLifecycle, formatFinding } from "./_lib/graph.ts";
import {
  advance,
  type Env,
  expectedOf,
  grantOverride,
  recordApproval,
} from "./_lib/run_ops.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  startRun,
  update,
} from "./_lib/run_store.ts";
import { expectNow, testEnv } from "./_lib/test_support.ts";

// ---------------------------------------------------------------------------
// The lifecycles gatorwalk-factory ships, under lifecycles/.
// ---------------------------------------------------------------------------

const LIFECYCLES = new URL("../../lifecycles/", import.meta.url);

async function load(file: string): Promise<Lifecycle> {
  const raw = parseYaml(await Deno.readTextFile(new URL(file, LIFECYCLES)));
  const result = parseLifecycle(raw);
  if (!result.ok) {
    throw new Error(`${file} is invalid:\n${result.errors.join("\n")}`);
  }
  return result.value;
}

function stage(lifecycle: Lifecycle, id: string): StageSpec {
  const found = findStage(lifecycle, id);
  if (found === undefined) throw new Error(`no stage '${id}'`);
  return found;
}

function artifactSchema(lifecycle: Lifecycle, name: string) {
  for (const s of lifecycle.stages) {
    const spec = (s.artifacts ?? []).find((a) => a.name === name);
    if (spec !== undefined) return spec;
  }
  throw new Error(`no artifact '${name}'`);
}

function evidenceSchema(lifecycle: Lifecycle, name: string): PayloadSchema {
  for (const s of lifecycle.stages) {
    const spec = (s.evidence ?? []).find((e) => e.name === name);
    if (spec?.schema !== undefined) return spec.schema;
  }
  throw new Error(`no evidence schema '${name}'`);
}

Deno.test("every file under lifecycles/ is a valid lifecycle", async () => {
  const files: string[] = [];
  for await (const entry of Deno.readDir(LIFECYCLES)) {
    if (entry.isFile && entry.name.endsWith(".yaml")) files.push(entry.name);
  }
  assert(files.length > 0, "no lifecycles found");
  for (const file of files) await load(file);
});

// --- build-swamp-extension -------------------------------------------------

const BUILD = "build-swamp-extension.yaml";
const SWX = "swamp-extensions.yaml";
const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

Deno.test("build-swamp-extension: the stages, in order", async () => {
  const lifecycle = await load(BUILD);
  assertEquals(lifecycle.stages.map((s) => s.id), [
    "plan",
    "plan-review",
    "implement",
    "check",
    "code-review",
    "release",
    "done",
    "abandoned",
  ]);
});

Deno.test("every file under lifecycles/ passes graph analysis, with only the explained warnings", async () => {
  // Graph checks live in the analyser (_lib/graph.ts), not here: it also
  // covers reachability, dead ends and evidence gates on other stages.
  // build-swamp-extension's rework loops set no maxCycles and rely on the
  // default cycle limit; a person grants an override to go round again.
  const expected: Record<string, string[]> = {
    [BUILD]: [
      "default-cycle-bound stages.0 (from stage 'plan')",
      "default-cycle-bound stages.2 (from stage 'implement')",
    ],
    [SWX]: [],
  };
  const files: string[] = [];
  for await (const entry of Deno.readDir(LIFECYCLES)) {
    if (entry.isFile && entry.name.endsWith(".yaml")) files.push(entry.name);
  }
  assertEquals(files.sort(), Object.keys(expected).sort());
  for (const file of files) {
    const report = analyzeLifecycle(await load(file));
    assertEquals(report.errors.map(formatFinding), [], file);
    assertEquals(
      report.warnings.map((w) => `${w.code} ${formatFinding(w).split(":")[0]}`),
      expected[file],
      file,
    );
  }
});

Deno.test("build-swamp-extension: graph analysis stays small", async () => {
  // Measured at 20 structural and 1345 count states. A jump means the
  // lifecycle grew loops that multiply the count pass; see DESIGN.md.
  const report = analyzeLifecycle(await load(BUILD));
  assert(!report.truncated);
  assert(
    report.statesExplored.structural <= 100 &&
      report.statesExplored.counts <= 5000,
    JSON.stringify(report.statesExplored),
  );
});

Deno.test("build-swamp-extension: people decide at plan, quality waiver, release and abandon", async () => {
  const lifecycle = await load(BUILD);
  const approvals = new Set<string>();
  for (
    const t of lifecycle.stages.flatMap((s) => s.transitions ?? [])
      .concat(lifecycle.globalTransitions ?? [])
  ) {
    for (const gate of t.gates ?? []) {
      if (gate.type === "human-approval") approvals.add(gate.config.id);
    }
  }
  assertEquals([...approvals].sort(), [
    "abandon-confirmation",
    "plan-approval",
    "quality-waiver",
    "release-approval",
  ]);
});

Deno.test("build-swamp-extension: every exit to code-review and done is bound to the reviewed commit", async () => {
  const lifecycle = await load(BUILD);
  const bound = (stageId: string, to: string) => {
    let matched = 0;
    for (const t of stage(lifecycle, stageId).transitions ?? []) {
      if (t.to !== to) continue;
      matched++;
      assert(
        (t.gates ?? []).some((g) =>
          g.type === "cel" &&
          g.config.expr.includes('artifacts["change-summary"].payload.commit')
        ),
        `${stageId}.${t.name} is not bound to the change-summary commit`,
      );
    }
    assert(matched > 0, `no transition from ${stageId} to ${to}`);
  };
  bound("check", "code-review");
  bound("release", "done");
});

Deno.test("build-swamp-extension: a person can always send the work back without abandoning it", async () => {
  // A declined approval with no blocking finding must not leave abandon as
  // the only exit (the #916 wedge). Each stage with a human approval has a
  // manual way back, and implement has a manual recheck for flaky checks.
  const lifecycle = await load(BUILD);
  const manual = (stageId: string, to: string) =>
    (stage(lifecycle, stageId).transitions ?? []).some((t) =>
      t.manual === true && t.to === to && (t.gates ?? []).length === 0
    );
  assert(manual("plan-review", "plan"), "plan-review has no manual way back");
  assert(
    manual("code-review", "implement"),
    "code-review has no manual way back",
  );
  assert(manual("implement", "check"), "implement has no manual recheck");
  assert(manual("release", "implement"), "release has no manual way back");
});

Deno.test("build-swamp-extension: a registry push publishes the reviewed version", async () => {
  const released = (stage(await load(BUILD), "release").transitions ?? [])
    .find((t) => t.name === "released");
  assert(released !== undefined);
  assert(
    (released.gates ?? []).some((g) =>
      g.type === "cel" && g.config.expr.includes("manifestVersion")
    ),
  );
});

Deno.test("build-swamp-extension: implement cannot resubmit the commit already checked", async () => {
  const submit = (stage(await load(BUILD), "implement").transitions ?? [])
    .find((t) => t.name === "submit");
  assert(submit !== undefined);
  assert(
    (submit.gates ?? []).some((g) =>
      g.type === "cel" && g.config.expr.includes('!("checks" in evidence)')
    ),
    "implement.submit does not require a new commit after checks",
  );
});

Deno.test("build-swamp-extension: realistic artifacts validate", async () => {
  const lifecycle = await load(BUILD);
  assertEquals(
    validateArtifactPayload(artifactSchema(lifecycle, "plan"), {
      summary: "Add a list method",
      steps: [{ description: "Add list", files: ["extensions/models/x.ts"] }],
      testingStrategy: "Unit test against an in-memory client",
      versionBump: { needed: true, reason: "New method" },
    }),
    null,
  );
  assertEquals(
    validateArtifactPayload(artifactSchema(lifecycle, "change-summary"), {
      summary: "Added list",
      commit: SHA,
      files: ["extensions/models/x.ts"],
      manifestVersion: "2026.09.28.1",
    }),
    null,
  );
  assertEquals(
    validateArtifactPayload(artifactSchema(lifecycle, "code-review"), {
      findings: [{ id: "F1", severity: "low", description: "Naming" }],
    }),
    null,
  );
});

Deno.test("build-swamp-extension: drifted artifacts are rejected", async () => {
  const lifecycle = await load(BUILD);
  const errors = validateArtifactPayload(artifactSchema(lifecycle, "plan"), {
    summary: "Add a list method",
    steps: [{ description: "Add list", file: "x.ts" }],
    testingStrategy: "Unit test",
    versionBump: { needed: "yes", reason: "New method" },
  });
  assert(errors !== null);
  assert(errors.some((e) => e.startsWith("steps.0:")), errors.join("\n"));
  assert(
    errors.some((e) => e.startsWith("versionBump.needed:")),
    errors.join("\n"),
  );
  for (const commit of ["HEAD", "c5aaad329"]) {
    assert(
      validateArtifactPayload(artifactSchema(lifecycle, "change-summary"), {
        summary: "s",
        commit,
        files: ["x.ts"],
      }) !== null,
      `${commit} is not a full commit SHA`,
    );
  }
});

Deno.test("build-swamp-extension: checks evidence", async () => {
  const schema = evidenceSchema(await load(BUILD), "checks");
  assertEquals(
    validatePayload(schema, {
      commit: SHA,
      status: "passed",
      results: [
        { name: "fmt", status: "passed" },
        { name: "test", status: "passed", detail: "64 passed" },
      ],
    }),
    null,
  );
  assert(
    validatePayload(schema, { commit: SHA, status: "ok", results: [] }) !==
      null,
  );
  const inconsistent = validatePayload(schema, {
    commit: SHA,
    status: "passed",
    results: [{ name: "fmt", status: "passed" }, {
      name: "test",
      status: "failed",
    }],
  });
  assert(inconsistent !== null, "an overall pass with a failed result");
  assertEquals(
    validatePayload(schema, {
      commit: SHA,
      status: "failed",
      results: [{ name: "test", status: "failed" }],
    }),
    null,
  );
});

Deno.test("build-swamp-extension: quality evidence accepts real swamp extension quality --json output", async () => {
  const schema = evidenceSchema(await load(BUILD), "quality");
  // Captured from `swamp extension quality` on @swamp/git (trimmed factors).
  const output = {
    commit: SHA, // added by the agent; the tool does not report it
    status: "passed",
    rubricVersion: 3,
    earnedPoints: 12,
    maxEarnablePoints: 14,
    maxClientEarnablePoints: 12,
    provisionalPoints: 2,
    percentage: 100,
    allPassed: true,
    factors: [
      {
        id: "has-readme",
        label: "Has README or module doc",
        earnedPoints: 2,
        maxPoints: 2,
        status: "earned",
      },
      {
        id: "repository-verified",
        label: "Verified public repository (server confirms on publish)",
        earnedPoints: 0,
        maxPoints: 2,
        status: "provisional",
      },
    ],
    dependencyTrust: { passed: true, audited: [], errors: [], warnings: [] },
    cacheHash:
      "09633447e92280143e3a8b25950c22d296e3914865d2c5ad486583ba59bac67a",
    archiveSize: 55026,
    cacheHit: false,
  };
  assertEquals(validatePayload(schema, output), null);
  const { commit: _commit, ...unbound } = output;
  const errors = validatePayload(schema, unbound);
  assert(errors !== null && errors.some((e) => e.includes('"commit"')));
});

Deno.test("build-swamp-extension: release evidence, by route", async () => {
  const schema = evidenceSchema(await load(BUILD), "release");
  const url =
    "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/327";
  assertEquals(
    validatePayload(schema, {
      via: "registry-push",
      commit: SHA,
      url: "https://swamp-club.com/extensions/@me/thing",
      version: "2026.09.28.1",
    }),
    null,
  );
  // A squash merge: the merge commit differs from the reviewed head.
  assertEquals(
    validatePayload(schema, {
      via: "pull-request",
      commit: SHA,
      mergeCommit: "51d075dd6ae9f9a8659ea710b986bcccf9b9ba7f",
      url,
      pullRequest: url,
      attestationId: "f1a4a927-819e-4142-82b7-a010a62bc821",
    }),
    null,
  );
  const noAttestation = validatePayload(schema, {
    via: "pull-request",
    commit: SHA,
    mergeCommit: "51d075dd6ae9f9a8659ea710b986bcccf9b9ba7f",
    url,
    pullRequest: url,
  });
  assert(noAttestation !== null);
  assert(
    noAttestation.some((e) => e.includes('"attestationId"')),
    noAttestation.join("\n"),
  );
  const unmerged = validatePayload(schema, {
    via: "pull-request",
    commit: SHA,
    url,
    pullRequest: url,
    attestationId: "f1a4a927-819e-4142-82b7-a010a62bc821",
  });
  assert(
    unmerged !== null && unmerged.some((e) => e.includes('"mergeCommit"')),
    "a pull-request release needs its merge commit",
  );
  const noVersion = validatePayload(schema, {
    via: "registry-push",
    commit: SHA,
    url,
  });
  assert(noVersion !== null && noVersion.some((e) => e.includes('"version"')));
});

Deno.test("build-swamp-extension: a run walks plan to release through the real gates, and every CEL expression evaluates on it", async () => {
  // The schema only syntax-checks CEL. This drives a real run through the
  // runtime and the real gate evaluator, recording each product on the
  // stage that declares it and each approval the gates need, then evaluates
  // every binding and cel gate against the context the runtime builds. It
  // shows every gate on the path can pass on a realistic run, and catches
  // expressions cel-js parses but cannot run (has() on an indexed path).
  const lifecycle = await load(BUILD);
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    lifecycle,
    { key: "wi-1", lifecycleDigest: "sha256:l" },
    actor,
    env,
  );
  const record = async (
    kind: "artifact" | "evidence",
    name: string,
    payload: Record<string, unknown>,
  ) => {
    const result = await recordProduct(
      store,
      lifecycle,
      await expectNow(store),
      kind,
      name,
      payload,
      actor,
      env,
    );
    assert(result.ok, `${kind} ${name}: ${JSON.stringify(result)}`);
  };
  const gates = makeGateEvaluator(lifecycle, store, env);
  const move = async (transition: string) => {
    const result = await update(store, (run) =>
      advance(
        run,
        lifecycle,
        expectedOf(run),
        { transition },
        gates,
        actor,
        env,
      ));
    assert(result.ok, result.ok ? "" : result.reason);
  };
  const approve = async (gateId: string) => {
    const result = await update(store, (run) =>
      recordApproval(
        run,
        lifecycle,
        expectedOf(run),
        { gateId, decision: "approve" },
        actor,
        env,
      ));
    assert(result.ok, result.ok ? "" : result.reason);
  };
  await record("artifact", "plan", {
    summary: "Add list",
    steps: [{ description: "Add list", files: ["x.ts"] }],
    testingStrategy: "Unit tests",
    versionBump: { needed: true, reason: "New method" },
  });
  await move("submit");
  await record("artifact", "plan-review", {
    findings: [{ id: "F1", severity: "low", description: "Naming" }],
  });
  await approve("plan-approval");
  await move("approve");
  await record("artifact", "change-summary", {
    summary: "Added list",
    commit: SHA,
    files: ["x.ts"],
    manifestVersion: "2026.09.28.1",
  });
  await move("submit");
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
  await move("passed");
  await record("artifact", "code-review", { findings: [] });
  await approve("release-approval");
  await move("accept");
  await record("evidence", "release", {
    via: "registry-push",
    commit: SHA,
    url: "https://swamp-club.com/extensions/@me/thing",
    version: "2026.09.28.1",
  });

  const run = await loadRun(store);
  assert(run !== null);
  assertEquals(run.stage, "release");
  const context = await buildCelContext(run, store);
  const results = new Map<string, Json>();
  const celGates = (where: string, transitions: TransitionSpec[]) => {
    for (const t of transitions) {
      for (const gate of t.gates ?? []) {
        if (gate.type !== "cel") continue;
        const result = evaluateCel(gate.config.expr, context);
        assertEquals(typeof result, "boolean", `${where}.${t.name}`);
        results.set(`${where}.${t.name}`, result);
      }
    }
  };
  let bindings = 0;
  for (const s of lifecycle.stages) {
    for (const expr of Object.values(s.work?.bindings ?? {})) {
      evaluateCel(expr, context);
      bindings++;
    }
    celGates(s.id, s.transitions ?? []);
  }
  celGates("global", lifecycle.globalTransitions ?? []);
  assert(
    bindings >= 5 && results.size >= 5,
    `${bindings} bindings, ${results.size} gates`,
  );
  // With this run's data: the checks and release are bound to the reviewed
  // commit, the push publishes the reviewed version, nothing asks for
  // rework, and implement cannot resubmit the commit already checked.
  assertEquals(results.get("check.passed"), true);
  assertEquals(results.get("release.released"), true);
  assertEquals(results.get("code-review.rework"), false);
  assertEquals(results.get("implement.submit"), false);
});

Deno.test("build-swamp-extension: a run that keeps revising the plan stalls at the cycle limit, and continues after an override", async () => {
  const lifecycle = await load(BUILD);
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    lifecycle,
    { key: "wi-2", lifecycleDigest: "sha256:l" },
    actor,
    env,
  );
  const gates = makeGateEvaluator(lifecycle, store, env);
  await recordProduct(
    store,
    lifecycle,
    await expectNow(store),
    "artifact",
    "plan",
    {
      summary: "s",
      steps: [{ description: "d", files: [] }],
      testingStrategy: "t",
      versionBump: { needed: false, reason: "none" },
    },
    actor,
    env,
  );
  const move = (transition: string, manualConfirmed = false) =>
    update(
      store,
      (run) =>
        advance(
          run,
          lifecycle,
          expectedOf(run),
          { transition, manualConfirmed },
          gates,
          actor,
          env,
        ),
    );
  // plan is entered once at start; each revise enters it again. maxCycles
  // defaults to 5, so the fifth revise is refused.
  for (let i = 0; i < 4; i++) {
    assert((await move("submit")).ok);
    const revised = await move("revise", true);
    assert(revised.ok, revised.ok ? "" : revised.reason);
  }
  assert((await move("submit")).ok);
  const stalled = await move("revise", true);
  assert(
    !stalled.ok && stalled.reason.includes("cycle override for 'plan'"),
    stalled.ok ? "" : stalled.reason,
  );
  const granted = await update(
    store,
    (run) =>
      grantOverride(
        run,
        lifecycle,
        expectedOf(run),
        { kind: "cycle", stage: "plan", note: "one more pass" },
        actor,
        env,
      ),
  );
  assert(granted.ok);
  const continued = await move("revise", true);
  assert(continued.ok, continued.ok ? "" : continued.reason);
  assertEquals((await loadRun(store))?.entries.plan, 6);
});

// --- swamp-extensions --------------------------------------------------------

const SHA_2 = "8a25dbbfc0e8f3c1d4a2b6e7f9012345678abcde";
const PR_URL =
  "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/346";

/** A clock the test moves: one second per reading, and wait() jumps ahead. */
function movableEnv(): { env: Env; wait: (seconds: number) => void } {
  let ms = Date.UTC(2026, 8, 28, 12, 0, 0);
  let era = 0;
  return {
    env: {
      now: () => new Date(ms += 1000).toISOString(),
      newEra: () => `era-${++era}`,
    },
    wait: (seconds) => {
      ms += seconds * 1000;
    },
  };
}

/** Record, approve and advance on a fresh run, through the real gates. */
async function drive(lifecycle: Lifecycle, env: Env) {
  const store = memoryStore();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    lifecycle,
    { key: "wi-swx", lifecycleDigest: "sha256:l" },
    actor,
    env,
  );
  const gates = makeGateEvaluator(lifecycle, store, env);
  return {
    store,
    record: async (
      kind: "artifact" | "evidence",
      name: string,
      payload: Record<string, unknown>,
    ) => {
      const result = await recordProduct(
        store,
        lifecycle,
        await expectNow(store),
        kind,
        name,
        payload,
        actor,
        env,
      );
      assert(result.ok, `${kind} ${name}: ${JSON.stringify(result)}`);
    },
    approve: async (gateId: string) => {
      const result = await update(store, (run) =>
        recordApproval(
          run,
          lifecycle,
          expectedOf(run),
          { gateId, decision: "approve" },
          actor,
          env,
        ));
      assert(result.ok, result.ok ? "" : result.reason);
    },
    /** Take a transition; returns the refusal reason, or null. */
    tryMove: async (transition: string, manualConfirmed = false) => {
      const result = await update(store, (run) =>
        advance(
          run,
          lifecycle,
          expectedOf(run),
          { transition, manualConfirmed },
          gates,
          actor,
          env,
        ));
      return result.ok ? null : result.reason;
    },
  };
}

const SWX_PLAN = {
  summary: "Fix the retry",
  scopeAnalysis: "Vault extension; one file",
  steps: [{ order: 1, description: "Retry on 503", files: ["x.ts"] }],
  testingStrategy: "A failing test against a mock server",
  potentialChallenges: [],
};

function changeSummary(commit: string) {
  return {
    summary: "Retry on 503",
    commit,
    branch: "fix-retry",
    files: ["x.ts"],
  };
}

Deno.test("swamp-extensions: the stages, in order", async () => {
  const lifecycle = await load(SWX);
  assertEquals(lifecycle.stages.map((s) => s.id), [
    "triage",
    "reproduce",
    "plan",
    "plan-review",
    "implement",
    "conformance-review",
    "verify",
    "attest",
    "pull-request",
    "merge",
    "release",
    "notify",
    "summary",
    "done",
    "abandoned",
  ]);
});

Deno.test("swamp-extensions: graph analysis finishes, and stays small", async () => {
  // Measured at 119 structural and 11132 count states. With the default
  // cycle limit the count pass stops at its cap; triage, plan, implement and
  // pull-request set maxCycles for that reason (swamp-extensions.md, gap 8).
  const report = analyzeLifecycle(await load(SWX));
  assert(!report.truncated);
  assert(
    report.statesExplored.structural <= 200 &&
      report.statesExplored.counts <= 25000,
    JSON.stringify(report.statesExplored),
  );
});

Deno.test("swamp-extensions: people decide at an unreproduced bug, the plan, the checklist, opening the PR and abandon", async () => {
  const lifecycle = await load(SWX);
  const approvals = new Set<string>();
  for (
    const t of lifecycle.stages.flatMap((s) => s.transitions ?? [])
      .concat(lifecycle.globalTransitions ?? [])
  ) {
    for (const gate of t.gates ?? []) {
      if (gate.type === "human-approval") approvals.add(gate.config.id);
    }
  }
  assertEquals([...approvals].sort(), [
    "abandon-confirmation",
    "checklist-confirmed",
    "open-pr",
    "plan-approval",
    "proceed-unreproduced",
  ]);
});

Deno.test("swamp-extensions: triage has one exit per type, and none while confidence is low", async () => {
  const exits = stage(await load(SWX), "triage").transitions ?? [];
  assertEquals(
    exits.map((t) => [t.name, t.to]),
    [
      ["bug", "reproduce"],
      ["feature", "plan"],
      ["platform", "plan"],
      ["security", "plan"],
    ],
  );
  for (const t of exits) {
    const gates = t.gates ?? [];
    assert(
      gates.some((g) =>
        g.type === "evidence-recorded" &&
        g.config.requireField?.type === t.name
      ),
      `${t.name} does not require its type`,
    );
    assert(
      gates.some((g) =>
        g.type === "cel" && g.config.expr.includes('confidence != "low"')
      ),
      `${t.name} does not wait out low confidence`,
    );
  }
});

Deno.test("swamp-extensions: every exit from verification to the merge is bound to the change-summary commit", async () => {
  const lifecycle = await load(SWX);
  const bound = (stageId: string, name: string) => {
    const t = (stage(lifecycle, stageId).transitions ?? []).find((t) =>
      t.name === name
    );
    assert(t !== undefined, `no ${stageId}.${name}`);
    assert(
      (t.gates ?? []).some((g) =>
        g.type === "cel" &&
        g.config.expr.includes('artifacts["change-summary"].payload.commit')
      ),
      `${stageId}.${name} is not bound to the change-summary commit`,
    );
  };
  bound("implement", "submit");
  bound("verify", "passed");
  bound("attest", "attested");
  bound("pull-request", "opened");
});

Deno.test("swamp-extensions: a person can always send the work back without abandoning it", async () => {
  const lifecycle = await load(SWX);
  const manual = (stageId: string, name: string, to: string) =>
    (stage(lifecycle, stageId).transitions ?? []).some((t) =>
      t.name === name && t.manual === true && t.to === to
    );
  assert(manual("reproduce", "reclassify", "triage"));
  assert(manual("plan-review", "revise", "plan"));
  assert(manual("implement", "recheck", "verify"));
  assert(manual("conformance-review", "rework", "implement"));
  assert(manual("verify", "revise", "implement"));
  assert(manual("attest", "revise", "implement"));
  assert(manual("merge", "new-pr", "pull-request"));
  assert(manual("merge", "rework", "implement"));
});

Deno.test("swamp-extensions: realistic payloads validate", async () => {
  const lifecycle = await load(SWX);
  const evidence = (name: string, payload: Json) =>
    assertEquals(
      validatePayload(evidenceSchema(lifecycle, name), payload),
      null,
      name,
    );
  const artifact = (name: string, payload: Json) =>
    assertEquals(
      validateArtifactPayload(artifactSchema(lifecycle, name), payload),
      null,
      name,
    );
  evidence("classification", {
    type: "bug",
    confidence: "high",
    reasoning: "The retry never fires",
    isRegression: true,
    regressionEvidence: "Passed at 2026.09.20.1",
    regressionCounterEvidence: "The test never covered 503",
    regressionVerdict: "confirmed",
    regressionVerdictReasoning: "A bisect lands on the refactor",
    regressionIntroducedIn: "2026.09.21.1",
  });
  evidence("classification", {
    type: "feature",
    confidence: "low",
    reasoning: "Unclear whether this is new",
    clarifyingQuestions: ["Did this ever work?"],
  });
  evidence("reproduction", {
    reproduced: true,
    commands: ["deno test extensions/vaults/"],
    observed: "1 failed",
    expected: "retry after 503",
    fixScope: "vault/aws-sm",
    blastRadius: "one vault",
  });
  artifact("plan", SWX_PLAN);
  artifact("plan-review", {
    findings: [{
      id: "ADV-1",
      severity: "high",
      category: "test-fidelity",
      description: "No malformed response",
      resolved: true,
      resolutionNote: "Added",
    }],
  });
  artifact("change-summary", changeSummary(SHA));
  artifact("conformance", {
    steps: [
      { order: 1, status: "implemented", description: "Retry added" },
      {
        order: 2,
        status: "added",
        description: "Logged the retry",
        justification: "Needed to debug",
      },
    ],
  });
  evidence("verification", {
    status: "failed",
    runId: "w1",
    commit: SHA,
    buildStatus: "succeeded",
    buildRunId: "r1",
    reviewsStatus: "failed",
    reviewsRunId: "r2",
  });
  // A child that never started has no run id.
  evidence("verification", {
    status: "failed",
    runId: "w2",
    commit: SHA,
    buildStatus: "failed",
    reviewsStatus: "succeeded",
    reviewsRunId: "r3",
  });
  evidence("attestation", {
    attestationId: "f1a4a927-819e-4142-82b7-a010a62bc821",
    commit: SHA,
    buildRunId: "r1",
    reviewsRunId: "r2",
  });
  evidence("pull-request", { url: PR_URL, commit: SHA });
  evidence("merge", { status: "merged", mergeCommit: SHA_2 });
  evidence("merge", { status: "failed", reason: "CI: no attestation" });
  evidence("release", { outcome: "shipped", version: "2026.09.28.1" });
  evidence("release", { outcome: "completed" });
  evidence("notification", {
    action: "skipped",
    author: "skunk-ape",
    reason: "on the swamp-club team",
  });
  artifact("summary", {
    originalProblem: "The retry never fired",
    deliveredOutcome: "It retries on 503",
    outcomeMet: true,
  });
});

Deno.test("swamp-extensions: drifted payloads are rejected", async () => {
  const lifecycle = await load(SWX);
  const rejects = (
    kind: "artifact" | "evidence",
    name: string,
    payload: Json,
  ) =>
    kind === "artifact"
      ? validateArtifactPayload(artifactSchema(lifecycle, name), payload)
      : validatePayload(evidenceSchema(lifecycle, name), payload);
  const cases: [string, "artifact" | "evidence", string, Json][] = [
    ["low confidence without questions", "evidence", "classification", {
      type: "bug",
      confidence: "low",
      reasoning: "r",
    }],
    ["a regression without its argument", "evidence", "classification", {
      type: "bug",
      confidence: "high",
      reasoning: "r",
      isRegression: true,
      regressionEvidence: "e",
    }],
    ["a regression that is not a bug", "evidence", "classification", {
      type: "feature",
      confidence: "high",
      reasoning: "r",
      isRegression: true,
      regressionEvidence: "e",
      regressionCounterEvidence: "c",
      regressionVerdict: "confirmed",
      regressionVerdictReasoning: "v",
    }],
    ["a finding without a category", "artifact", "plan-review", {
      findings: [{ id: "ADV-1", severity: "low", description: "d" }],
    }],
    ["a short commit", "artifact", "change-summary", changeSummary("8a25dbb")],
    ["a branch with shell characters", "artifact", "change-summary", {
      ...changeSummary(SHA),
      branch: "x;rm -rf ~",
    }],
    ["a misspelt verify outcome field", "evidence", "verification", {
      status: "succeeded",
      runId: "w1",
      commit: SHA,
      buildStatus: "succeeded",
      reviewsStatus: "succeeded",
      comit: SHA,
    }],
    ["an unknown conformance status", "artifact", "conformance", {
      steps: [{ order: 1, status: "done", description: "d" }],
    }],
    ["a verify outcome without its commit", "evidence", "verification", {
      status: "succeeded",
      runId: "w1",
      buildStatus: "succeeded",
      reviewsStatus: "succeeded",
    }],
    ["a verify outcome without a child's status", "evidence", "verification", {
      status: "succeeded",
      runId: "w1",
      commit: SHA,
      buildStatus: "succeeded",
    }],
    ["a merge without its merge commit", "evidence", "merge", {
      status: "merged",
    }],
    ["a failed merge without a reason", "evidence", "merge", {
      status: "failed",
    }],
    ["a notification without a reason", "evidence", "notification", {
      action: "posted",
      author: "a",
    }],
  ];
  for (const [what, kind, name, payload] of cases) {
    assert(rejects(kind, name, payload) !== null, what);
  }
});

Deno.test("swamp-extensions: a bug walks triage to done through the real gates, and every CEL expression evaluates on it", async () => {
  // As build-swamp-extension's run, plus the stops this lifecycle adds: low
  // confidence holds triage, a failed verification needs a new commit, and
  // the merge waits out the cooldown.
  const lifecycle = await load(SWX);
  const { env, wait } = movableEnv();
  const { store, record, approve, tryMove } = await drive(lifecycle, env);
  const move = async (transition: string, manual = false) => {
    const refused = await tryMove(transition, manual);
    assertEquals(refused, null, transition);
  };

  await record("evidence", "classification", {
    type: "bug",
    confidence: "low",
    reasoning: "Maybe a bug",
    clarifyingQuestions: ["Is a 503 retried today?"],
  });
  assert((await tryMove("bug"))?.includes("waits for the person's answers"));
  await record("evidence", "classification", {
    type: "bug",
    confidence: "high",
    reasoning: "The person says 503 was never retried",
  });
  assert((await tryMove("feature")) !== null, "a bug took the feature exit");
  await move("bug");
  await record("evidence", "reproduction", {
    reproduced: true,
    commands: ["deno test extensions/vaults/"],
    observed: "1 failed",
    expected: "retry after 503",
    fixScope: "vault/aws-sm",
  });
  await move("reproduced");
  await record("artifact", "plan", SWX_PLAN);
  await move("submit");
  await record("artifact", "plan-review", {
    findings: [{
      id: "ADV-1",
      severity: "low",
      category: "test-fidelity",
      description: "Naming",
    }],
  });
  await approve("plan-approval");
  await move("approve");

  // The first commit fails verification, and cannot be submitted again.
  // verify-build failed while verify-reviews passed: the two are judged
  // together, so the whole verification failed.
  await record("artifact", "change-summary", changeSummary(SHA));
  await move("submit");
  await record("artifact", "conformance", {
    steps: [{ order: 1, status: "implemented", description: "Retry added" }],
  });
  await move("conforms");
  await record("evidence", "verification", {
    status: "failed",
    runId: "w1",
    commit: SHA,
    buildStatus: "failed",
    buildRunId: "b1",
    reviewsStatus: "succeeded",
    reviewsRunId: "v1",
  });
  assert((await tryMove("passed")) !== null);
  await move("failed");
  assert(
    (await tryMove("submit"))?.includes("commit already verified"),
    "the verified commit was submitted again",
  );

  // recheck only re-verifies that commit: a new one goes through
  // conformance-review, and recheck refuses it.
  await record("artifact", "change-summary", changeSummary(SHA_2));
  assert(
    (await tryMove("recheck", true))?.includes("re-verifies the commit"),
    "a new commit skipped conformance-review",
  );

  await record("artifact", "change-summary", changeSummary(SHA_2));
  await move("submit");
  await record("artifact", "conformance", {
    steps: [{ order: 1, status: "deviated", description: "Retry on 5xx" }],
  });
  assert((await tryMove("conforms"))?.includes("needs a justification"));
  await record("artifact", "conformance", {
    steps: [{
      order: 1,
      status: "deviated",
      description: "Retry on 5xx",
      justification: "502 fails the same way",
    }],
  });
  await move("conforms");
  // A wrapper recorded as succeeded while a child failed is refused: the
  // wrapper fails whenever a child does.
  await record("evidence", "verification", {
    status: "succeeded",
    runId: "w2",
    commit: SHA_2,
    buildStatus: "succeeded",
    buildRunId: "b2",
    reviewsStatus: "failed",
    reviewsRunId: "v2",
  });
  await approve("checklist-confirmed");
  assert(
    (await tryMove("passed"))?.includes("must have succeeded"),
    "a failed child passed verification",
  );
  await record("evidence", "verification", {
    status: "succeeded",
    runId: "w3",
    commit: SHA_2,
    buildStatus: "succeeded",
    buildRunId: "b2",
    reviewsStatus: "succeeded",
    reviewsRunId: "v2",
  });
  await approve("checklist-confirmed");
  await move("passed");
  // An attestation from the failed run is refused.
  await record("evidence", "attestation", {
    attestationId: "a-old",
    commit: SHA_2,
    buildRunId: "b1",
    reviewsRunId: "v2",
  });
  await approve("open-pr");
  assert((await tryMove("attested"))?.includes("this commit's verify-build"));
  await record("evidence", "attestation", {
    attestationId: "a-2",
    commit: SHA_2,
    buildRunId: "b2",
    reviewsRunId: "v2",
  });
  // The approval was bound to the attestation it saw, which has changed.
  assert((await tryMove("attested"))?.includes("no longer count"));
  await approve("open-pr");
  await move("attested");
  await record("evidence", "pull-request", { url: PR_URL, commit: SHA_2 });
  await move("opened");
  await record("evidence", "merge", { status: "merged", mergeCommit: SHA });
  assert((await tryMove("merged")) !== null, "merged before the cooldown");
  wait(180);
  await move("merged");
  await record("evidence", "release", {
    outcome: "shipped",
    version: "2026.09.28.1",
  });
  await move("released");
  await record("evidence", "notification", {
    action: "posted",
    author: "someone-outside",
    reason: "not on the swamp-club team",
  });
  await move("notified");
  await record("artifact", "summary", {
    originalProblem: "503 was never retried",
    deliveredOutcome: "5xx responses are retried",
    outcomeMet: true,
  });
  await move("finish");

  const run = await loadRun(store);
  assert(run !== null);
  assertEquals(run.stage, "done");
  const context = await buildCelContext(run, store);
  const results = new Map<string, Json>();
  let bindings = 0;
  for (const s of lifecycle.stages) {
    for (const expr of Object.values(s.work?.bindings ?? {})) {
      evaluateCel(expr, context);
      bindings++;
    }
    for (const t of s.transitions ?? []) {
      for (const gate of t.gates ?? []) {
        if (gate.type !== "cel") continue;
        const result = evaluateCel(gate.config.expr, context);
        assertEquals(typeof result, "boolean", `${s.id}.${t.name}`);
        results.set(`${s.id}.${t.name}`, result);
      }
    }
  }
  assert(
    bindings >= 10 && results.size >= 10,
    `${bindings} bindings, ${results.size} gates`,
  );
  assertEquals(results.get("triage.bug"), true);
  assertEquals(results.get("plan-review.rework"), false);
  assertEquals(results.get("implement.submit"), false);
  assertEquals(results.get("conformance-review.conforms"), true);
  assertEquals(results.get("verify.passed"), true);
  assertEquals(results.get("attest.attested"), true);
  assertEquals(results.get("pull-request.opened"), true);
});

Deno.test("swamp-extensions: a failed pull request goes to a new PR or back to implement, by a person's choice", async () => {
  const lifecycle = await load(SWX);
  const merge = stage(lifecycle, "merge").transitions ?? [];
  for (const name of ["new-pr", "rework"]) {
    const t = merge.find((t) => t.name === name);
    assert(t?.manual === true, `${name} is not manual`);
    assert(
      (t.gates ?? []).some((g) =>
        g.type === "evidence-recorded" &&
        g.config.requireField?.status === "failed"
      ),
    );
  }
  for (const t of merge) {
    assert(
      (t.gates ?? []).some((g) =>
        g.type === "cooldown" && g.config.seconds === 180 &&
        g.config.afterEvidence === "pull-request"
      ),
      `${t.name} does not wait for CI`,
    );
  }
});
