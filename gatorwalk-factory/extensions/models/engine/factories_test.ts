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
  type FactoryDefinition,
  findStage,
  parseDefinition,
  type StageSpec,
  type TransitionSpec,
} from "../_lib/engine/definition_schema.ts";
import {
  type PayloadSchema,
  validateArtifactPayload,
  validatePayload,
} from "../_lib/engine/payload_schema.ts";
import type { Json } from "../_lib/engine/canonical.ts";
import {
  buildCelContext,
  type CelContext,
  evaluateCel,
} from "../_lib/engine/cel_context.ts";
import { buildDispatch } from "../_lib/engine/dispatch.ts";
import { makeGateEvaluator } from "../_lib/engine/gates.ts";
import { analyzeDefinition } from "../_lib/engine/graph.ts";
import {
  advance,
  type Env,
  expectedOf,
  grantOverride,
  recordApproval,
} from "../_lib/engine/run_ops.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  startRun,
  update,
} from "../_lib/engine/run_store.ts";
import { expectNow, testEnv } from "../_lib/engine/test_support.ts";

// ---------------------------------------------------------------------------
// The example factory definitions the skill ships, under its
// references/examples/. examples_test.ts checks that every one validates; this
// file tests how each behaves.
// ---------------------------------------------------------------------------

const DEFINITIONS = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/",
  import.meta.url,
);

async function load(file: string): Promise<FactoryDefinition> {
  const raw = parseYaml(await Deno.readTextFile(new URL(file, DEFINITIONS)));
  const result = parseDefinition(raw);
  if (!result.ok) {
    throw new Error(`${file} is invalid:\n${result.errors.join("\n")}`);
  }
  return result.value;
}

function stage(definition: FactoryDefinition, id: string): StageSpec {
  const found = findStage(definition, id);
  if (found === undefined) throw new Error(`no stage '${id}'`);
  return found;
}

function artifactSchema(definition: FactoryDefinition, name: string) {
  for (const s of definition.stages) {
    const spec = (s.artifacts ?? []).find((a) => a.name === name);
    if (spec !== undefined) return spec;
  }
  throw new Error(`no artifact '${name}'`);
}

function evidenceSchema(
  definition: FactoryDefinition,
  name: string,
): PayloadSchema {
  for (const s of definition.stages) {
    const spec = (s.evidence ?? []).find((e) => e.name === name);
    if (spec?.schema !== undefined) return spec.schema;
  }
  throw new Error(`no evidence schema '${name}'`);
}

const STARTER = "starter.yaml";
const BUILD = "build-swamp-extension.yaml";
const SWX = "swamp-club-swamp-extensions.yaml";

// --- build-swamp-extension -------------------------------------------------

const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";

Deno.test("build-swamp-extension: the stages, in order", async () => {
  const definition = await load(BUILD);
  assertEquals(definition.stages.map((s) => s.id), [
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

Deno.test("build-swamp-extension: graph analysis stays small", async () => {
  // Measured at 20 structural and 20 count states (1345 before the count pass
  // pruned dominated states). Without an inverted max-cycles gate the count
  // pass is no bigger than the structural one; see DESIGN.md.
  const report = analyzeDefinition(await load(BUILD));
  assert(!report.truncated);
  assert(
    report.statesExplored.structural <= 100 &&
      report.statesExplored.counts <= 50,
    JSON.stringify(report.statesExplored),
  );
});

Deno.test("build-swamp-extension: people decide at plan, quality waiver, release and abandon", async () => {
  const definition = await load(BUILD);
  const approvals = new Set<string>();
  for (
    const t of definition.stages.flatMap((s) => s.transitions ?? [])
      .concat(definition.globalTransitions ?? [])
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
  const definition = await load(BUILD);
  const bound = (stageId: string, to: string) => {
    let matched = 0;
    for (const t of stage(definition, stageId).transitions ?? []) {
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
  const definition = await load(BUILD);
  const manual = (stageId: string, to: string) =>
    (stage(definition, stageId).transitions ?? []).some((t) =>
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
  const definition = await load(BUILD);
  assertEquals(
    validateArtifactPayload(artifactSchema(definition, "plan"), {
      summary: "Add a list method",
      steps: [{ description: "Add list", files: ["extensions/models/x.ts"] }],
      testingStrategy: "Unit test against an in-memory client",
      versionBump: { needed: true, reason: "New method" },
    }),
    null,
  );
  assertEquals(
    validateArtifactPayload(artifactSchema(definition, "change-summary"), {
      summary: "Added list",
      commit: SHA,
      files: ["extensions/models/x.ts"],
      manifestVersion: "2026.09.28.1",
    }),
    null,
  );
  assertEquals(
    validateArtifactPayload(artifactSchema(definition, "code-review"), {
      findings: [{ id: "F1", severity: "low", description: "Naming" }],
    }),
    null,
  );
});

Deno.test("build-swamp-extension: drifted artifacts are rejected", async () => {
  const definition = await load(BUILD);
  const errors = validateArtifactPayload(artifactSchema(definition, "plan"), {
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
      validateArtifactPayload(artifactSchema(definition, "change-summary"), {
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
  const definition = await load(BUILD);
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    definition,
    { key: "wi-1", definitionDigest: "sha256:l" },
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
      definition,
      await expectNow(store),
      kind,
      name,
      payload,
      actor,
      env,
    );
    assert(result.ok, `${kind} ${name}: ${JSON.stringify(result)}`);
  };
  const gates = makeGateEvaluator(definition, store, env);
  const move = async (transition: string) => {
    const result = await update(store, (run) =>
      advance(
        run,
        definition,
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
        definition,
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
  for (const s of definition.stages) {
    for (const expr of Object.values(s.work?.bindings ?? {})) {
      evaluateCel(expr, context);
      bindings++;
    }
    celGates(s.id, s.transitions ?? []);
  }
  celGates("global", definition.globalTransitions ?? []);
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
  const definition = await load(BUILD);
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    definition,
    { key: "wi-2", definitionDigest: "sha256:l" },
    actor,
    env,
  );
  const gates = makeGateEvaluator(definition, store, env);
  await recordProduct(
    store,
    definition,
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
          definition,
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
        definition,
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

// --- swamp-club-swamp-extensions ---------------------------------------------

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
async function drive(definition: FactoryDefinition, env: Env) {
  const store = memoryStore();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    definition,
    // A Lab issue, as a claimed work item has: notify binds it.
    {
      key: "wi-swx",
      definitionDigest: "sha256:l",
      externalRefs: { "swamp-club": "2734", "swamp-club.display": "#2734" },
    },
    actor,
    env,
  );
  const gates = makeGateEvaluator(definition, store, env);
  return {
    store,
    record: async (
      kind: "artifact" | "evidence",
      name: string,
      payload: Record<string, unknown>,
    ) => {
      const result = await recordProduct(
        store,
        definition,
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
          definition,
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
          definition,
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

Deno.test("swamp-club-swamp-extensions: the stages, in order", async () => {
  const definition = await load(SWX);
  assertEquals(definition.stages.map((s) => s.id), [
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

// issue-lifecycle's skill and references tell an agent to run its methods on
// an issue-<N> instance, and under gatorwalk none exists, so following them
// starts a second driver on the Lab issue (swamp-club #2768). The cited files
// are read from the repository root: this holds only while gatorwalk-factory
// lives inside swamp-extensions, so revisit it at go-live.
const REPO_ROOT = new URL("../../../../", import.meta.url);
const CITED =
  /(?:agent-constraints|\.claude|verification)\/[\w./-]+\.(?:md|ya?ml)/g;
const ONE_DRIVER = "gatorwalk drives this issue: do not use the " +
  "issue-lifecycle skill or run any @swamp/issue-lifecycle method, even " +
  "when a request would trigger it.";
const collapse = (text: string) => text.replace(/\s+/g, " ").trim();

Deno.test("swamp-club-swamp-extensions: no stage hands its agent issue-lifecycle's driver", async () => {
  const definition = await load(SWX);
  for (const s of definition.stages) {
    assert(
      !(s.work?.skills ?? []).includes("issue-lifecycle"),
      `${s.id} lists the issue-lifecycle skill`,
    );
    for (const cited of s.work?.systemPrompt?.match(CITED) ?? []) {
      const text = await Deno.readTextFile(new URL(cited, REPO_ROOT));
      assert(
        !text.includes("@swamp/issue-lifecycle") && !text.includes("issue-<N>"),
        `${s.id} cites ${cited}, which drives issue-lifecycle`,
      );
    }
  }
});

Deno.test("swamp-club-swamp-extensions: every agent-run stage tells the agent not to drive issue-lifecycle", async () => {
  const agentRun = (await load(SWX)).stages.filter((s) =>
    s.work?.mode === "interactive" || s.work?.mode === "dispatch"
  );
  assertEquals(agentRun.length, 12);
  for (const s of agentRun) {
    assert(
      collapse(s.work?.systemPrompt ?? "").includes(ONE_DRIVER),
      `${s.id}'s prompt lacks the one-driver guard`,
    );
  }
});

Deno.test("swamp-club-swamp-extensions: graph analysis finishes, and stays small", async () => {
  // Measured at 159 structural and 159 count states at the default cycle
  // limit of 5. Without the count pass pruning dominated states it needs
  // 716,220 there, past its cap (swamp-club-swamp-extensions.md, gap 8).
  const report = analyzeDefinition(await load(SWX));
  assert(!report.truncated);
  assert(
    report.statesExplored.structural <= 200 &&
      report.statesExplored.counts <= 250,
    JSON.stringify(report.statesExplored),
  );
});

Deno.test("swamp-club-swamp-extensions: people decide at a regression claim, an unreproduced bug, the plan, the checklist, opening the PR and abandon", async () => {
  const definition = await load(SWX);
  const approvals = new Set<string>();
  for (
    const t of definition.stages.flatMap((s) => s.transitions ?? [])
      .concat(definition.globalTransitions ?? [])
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
    "regression-review",
  ]);
});

Deno.test("swamp-club-swamp-extensions: triage has one exit per type, and none while confidence is low", async () => {
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
        g.type === "evidence-recorded" &&
        g.config.name === "classification" &&
        JSON.stringify(g.config.match) ===
          JSON.stringify({ confidence: { enum: ["high", "medium"] } }) &&
        g.config.message?.includes("low-confidence") === true
      ),
      `${t.name} does not wait out low confidence`,
    );
  }
  // The type gates prove the four exits exclusive.
  assertEquals(
    analyzeDefinition(await load(SWX)).warnings.filter((w) =>
      w.code === "ambiguous-exit" && w.stage === "triage"
    ),
    [],
  );
});

Deno.test("swamp-club-swamp-extensions: triage's confidence gate lets high and medium through and holds low", async () => {
  const definition = await load(SWX);
  for (const type of ["bug", "feature", "platform", "security"]) {
    const low = await drive(definition, movableEnv().env);
    await low.record("evidence", "classification", {
      type,
      confidence: "low",
      reasoning: "Unsure",
      clarifyingQuestions: ["Which is it?"],
    });
    for (const exit of ["bug", "feature", "platform", "security"]) {
      const refused = await low.tryMove(exit);
      assert(
        refused?.includes("waits for the person's answers") === true,
        `${type} ${exit}: ${refused}`,
      );
    }
    for (const confidence of ["high", "medium"]) {
      const sure = await drive(definition, movableEnv().env);
      await sure.record("evidence", "classification", {
        type,
        confidence,
        reasoning: "Clear",
      });
      assertEquals(await sure.tryMove(type), null, `${type} ${confidence}`);
    }
  }
});

Deno.test("swamp-club-swamp-extensions: every exit from verification to the merge is bound to the change-summary commit", async () => {
  const definition = await load(SWX);
  const bound = (stageId: string, name: string) => {
    const t = (stage(definition, stageId).transitions ?? []).find((t) =>
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
  bound("attest", "complete");
  bound("merge", "complete");
});

Deno.test("swamp-club-swamp-extensions: a person can always send the work back without abandoning it", async () => {
  const definition = await load(SWX);
  const manual = (stageId: string, name: string, to: string) =>
    (stage(definition, stageId).transitions ?? []).some((t) =>
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

Deno.test("swamp-club-swamp-extensions: realistic payloads validate", async () => {
  const definition = await load(SWX);
  const evidence = (name: string, payload: Json) =>
    assertEquals(
      validatePayload(evidenceSchema(definition, name), payload),
      null,
      name,
    );
  const artifact = (name: string, payload: Json) =>
    assertEquals(
      validateArtifactPayload(artifactSchema(definition, name), payload),
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

Deno.test("swamp-club-swamp-extensions: drifted payloads are rejected", async () => {
  const definition = await load(SWX);
  const rejects = (
    kind: "artifact" | "evidence",
    name: string,
    payload: Json,
  ) =>
    kind === "artifact"
      ? validateArtifactPayload(artifactSchema(definition, name), payload)
      : validatePayload(evidenceSchema(definition, name), payload);
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

Deno.test("swamp-club-swamp-extensions: a bug walks triage to done through the real gates, and every CEL expression evaluates on it", async () => {
  // As build-swamp-extension's run, plus the stops this factory definition
  // adds: low confidence holds triage, a failed verification needs a new
  // commit, and the merge waits out the cooldown.
  const definition = await load(SWX);
  const { env, wait } = movableEnv();
  const { store, record, approve, tryMove } = await drive(definition, env);
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
  for (const s of definition.stages) {
    for (const expr of Object.values(s.work?.bindings ?? {})) {
      evaluateCel(expr, context);
      bindings++;
    }
    for (const t of s.transitions ?? []) {
      for (const gate of t.gates ?? []) {
        if (gate.type === "human-approval" && gate.config.when !== undefined) {
          const result = evaluateCel(gate.config.when, context);
          assertEquals(typeof result, "boolean", `${s.id}.${t.name} when`);
          results.set(`${s.id}.${t.name}.${gate.config.id}`, result);
        }
        if (gate.type !== "cel") continue;
        const result = evaluateCel(gate.config.expr, context);
        assertEquals(typeof result, "boolean", `${s.id}.${t.name}`);
        results.set(`${s.id}.${t.name}`, result);
      }
    }
  }
  // Triage's confidence check is a match gate, not CEL.
  assert(
    bindings >= 10 && results.size >= 8,
    `${bindings} bindings, ${results.size} gates`,
  );
  assertEquals(results.get("triage.bug.regression-review"), false);
  assertEquals(results.get("plan-review.rework"), false);
  assertEquals(results.get("implement.submit"), false);
  assertEquals(results.get("conformance-review.conforms"), true);
  assertEquals(results.get("verify.passed"), true);
  assertEquals(results.get("attest.attested"), true);
  assertEquals(results.get("pull-request.opened"), true);
  assertEquals(results.get("attest.complete"), true);
  assertEquals(results.get("merge.complete"), true);
});

Deno.test("swamp-club-swamp-extensions: a regression claim waits for regression-review whatever its verdict; a plain bug does not", async () => {
  const regression = {
    type: "bug",
    confidence: "high",
    reasoning: "The retry stopped firing",
    isRegression: true,
    regressionEvidence: "Passed at 2026.09.20.1",
    regressionCounterEvidence: "The test never covered 503",
    regressionVerdictReasoning: "A bisect lands on the refactor",
  };
  for (const verdict of ["confirmed", "downgraded"]) {
    const definition = await load(SWX);
    const { record, approve, tryMove } = await drive(
      definition,
      movableEnv().env,
    );
    await record("evidence", "classification", {
      ...regression,
      regressionVerdict: verdict,
    });
    const refused = await tryMove("bug");
    assert(
      refused?.includes("awaiting approval 'regression-review'"),
      `${verdict}: ${refused}`,
    );
    await approve("regression-review");
    assertEquals(await tryMove("bug"), null, verdict);
  }
  for (
    const classification of [
      { type: "bug", confidence: "high", reasoning: "r", isRegression: false },
      { type: "bug", confidence: "high", reasoning: "r" },
    ]
  ) {
    const definition = await load(SWX);
    const { record, tryMove } = await drive(definition, movableEnv().env);
    await record("evidence", "classification", classification);
    assertEquals(
      await tryMove("bug"),
      null,
      JSON.stringify(classification),
    );
  }
});

Deno.test("swamp-club-swamp-extensions: a failed pull request goes to a new PR or back to implement, by a person's choice", async () => {
  const definition = await load(SWX);
  const merge = stage(definition, "merge").transitions ?? [];
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
  // The exits that act on the merge outcome wait for CI. complete does not:
  // it is for an open pull request, and issue-lifecycle's complete checks no
  // pull request status.
  for (const t of merge.filter((t) => t.name !== "complete")) {
    assert(
      (t.gates ?? []).some((g) =>
        g.type === "cooldown" && g.config.seconds === 180 &&
        g.config.afterEvidence === "pull-request"
      ),
      `${t.name} does not wait for CI`,
    );
  }
});

// issue-lifecycle's complete from implementing and from pr_open (gap 6): a
// manual exit to notify from attest and from merge.

/** Walk a feature to attest through the real gates, verified at SHA. */
async function walkToAttest(definition: FactoryDefinition, env: Env) {
  const driven = await drive(definition, env);
  const move = async (transition: string, manual = false) => {
    assertEquals(await driven.tryMove(transition, manual), null, transition);
  };
  await driven.record("evidence", "classification", {
    type: "feature",
    confidence: "high",
    reasoning: "A new exit",
  });
  await move("feature");
  await driven.record("artifact", "plan", SWX_PLAN);
  await move("submit");
  await driven.record("artifact", "plan-review", {
    findings: [{
      id: "ADV-1",
      severity: "low",
      category: "test-fidelity",
      description: "Naming",
    }],
  });
  await driven.approve("plan-approval");
  await move("approve");
  await driven.record("artifact", "change-summary", changeSummary(SHA));
  await move("submit");
  await driven.record("artifact", "conformance", {
    steps: [{
      order: 1,
      status: "deviated",
      description: "Retry on 5xx",
      justification: "502 fails the same way",
    }],
  });
  await move("conforms");
  await driven.record("evidence", "verification", {
    status: "succeeded",
    runId: "w1",
    commit: SHA,
    buildStatus: "succeeded",
    buildRunId: "b1",
    reviewsStatus: "succeeded",
    reviewsRunId: "v1",
  });
  await driven.approve("checklist-confirmed");
  await move("passed");
  return { ...driven, move };
}

/** The prUrl notify dispatches with; the packet must be ready. */
async function notifyPrUrl(
  definition: FactoryDefinition,
  store: ReturnType<typeof memoryStore>,
): Promise<Json | undefined> {
  const run = await loadRun(store);
  assert(run !== null);
  assertEquals(run.stage, "notify");
  const packet = buildDispatch(
    definition,
    run,
    await buildCelContext(run, store),
  );
  assert(packet.ready, JSON.stringify(packet));
  return packet.values.prUrl;
}

Deno.test("swamp-club-swamp-extensions: complete from attest after a failed pull request links no pull request", async () => {
  // The failed pull request was for an earlier commit; the thank-you must not
  // call it merged.
  const definition = await load(SWX);
  const { env, wait } = movableEnv();
  const { store, record, approve, move } = await walkToAttest(definition, env);
  await record("evidence", "attestation", {
    attestationId: "a-1",
    commit: SHA,
    buildRunId: "b1",
    reviewsRunId: "v1",
  });
  await approve("open-pr");
  await move("attested");
  await record("evidence", "pull-request", { url: PR_URL, commit: SHA });
  await move("opened");
  await record("evidence", "merge", { status: "failed", reason: "The code" });
  wait(180);
  await move("rework", true);
  await record("artifact", "change-summary", changeSummary(SHA_2));
  await move("submit");
  await record("artifact", "conformance", {
    steps: [{ order: 1, status: "implemented", description: "Retry added" }],
  });
  await move("conforms");
  await record("evidence", "verification", {
    status: "succeeded",
    runId: "w2",
    commit: SHA_2,
    buildStatus: "succeeded",
    buildRunId: "b2",
    reviewsStatus: "succeeded",
    reviewsRunId: "v2",
  });
  await approve("checklist-confirmed");
  await move("passed");
  await move("complete", true);
  assertEquals(await notifyPrUrl(definition, store), null);
});

Deno.test("swamp-club-swamp-extensions: complete leaves attest and merge for notify, by a person's choice, and the release case stays", async () => {
  const definition = await load(SWX);
  for (const stageId of ["attest", "merge"]) {
    const t = (stage(definition, stageId).transitions ?? []).find((t) =>
      t.name === "complete"
    );
    assert(t !== undefined, `no ${stageId}.complete`);
    assertEquals([t.to, t.manual], ["notify", true], stageId);
    const gates = t.gates ?? [];
    const cel = gates.flatMap((g) => g.type === "cel" ? [g.config.expr] : []);
    assert(
      cel.some((e) => e.includes('artifacts["conformance"]')),
      `${stageId}.complete does not require conformance`,
    );
    assert(
      cel.some((e) => e.includes('evidence["verification"].payload.status')),
      `${stageId}.complete does not require verification`,
    );
    // Manual is the person's decision; issue-lifecycle's complete has no
    // approval and no cooldown.
    assertEquals(
      gates.filter((g) => g.type === "human-approval" || g.type === "cooldown"),
      [],
      stageId,
    );
  }
  assertEquals(
    (stage(definition, "release").transitions ?? []).map((t) => [t.name, t.to]),
    [["released", "notify"]],
  );
});

Deno.test("swamp-club-swamp-extensions: complete from attest goes to notify and on to done, once a person confirms it", async () => {
  const definition = await load(SWX);
  const { store, record, tryMove, move } = await walkToAttest(
    definition,
    movableEnv().env,
  );
  assert(
    (await tryMove("complete"))?.includes("a person must confirm it"),
    "complete moved without a person",
  );
  await move("complete", true);
  // notify dispatches with no pull request to link.
  assertEquals(await notifyPrUrl(definition, store), null);
  await record("evidence", "notification", {
    action: "skipped",
    author: "swamp-team",
    reason: "on the swamp-club team",
  });
  await move("notified");
  await record("artifact", "summary", {
    originalProblem: "No complete shortcut",
    deliveredOutcome: "Completed without a pull request",
    outcomeMet: true,
  });
  await move("finish");
  assertEquals((await loadRun(store))?.stage, "done");
});

Deno.test("swamp-club-swamp-extensions: complete from merge is for an open pull request, with no cooldown", async () => {
  const definition = await load(SWX);
  const toMerge = async () => {
    const { env, wait } = movableEnv();
    const driven = await walkToAttest(definition, env);
    await driven.record("evidence", "attestation", {
      attestationId: "a-1",
      commit: SHA,
      buildRunId: "b1",
      reviewsRunId: "v1",
    });
    await driven.approve("open-pr");
    await driven.move("attested");
    await driven.record("evidence", "pull-request", {
      url: PR_URL,
      commit: SHA,
    });
    await driven.move("opened");
    return { ...driven, wait };
  };

  // A failed pull request is no longer open. After a new one opens, complete
  // passes again, although the failed merge is still the latest merge
  // evidence, and without waiting out the cooldown.
  const failed = await toMerge();
  await failed.record("evidence", "merge", { status: "failed", reason: "CI" });
  assert(
    (await failed.tryMove("complete", true))?.includes(
      "a merge outcome is already recorded",
    ),
    "complete after a failed pull request",
  );
  failed.wait(180);
  await failed.move("new-pr", true);
  await failed.record("evidence", "pull-request", { url: PR_URL, commit: SHA });
  await failed.move("opened");
  await failed.move("complete", true);
  assertEquals(await notifyPrUrl(definition, failed.store), PR_URL);

  // A merged pull request goes on to release, not complete.
  const merged = await toMerge();
  await merged.record("evidence", "merge", {
    status: "merged",
    mergeCommit: SHA_2,
  });
  assert(
    (await merged.tryMove("complete", true))?.includes(
      "a merge outcome is already recorded",
    ),
    "complete after a merged pull request",
  );
});

Deno.test("swamp-club-swamp-extensions: complete refuses when conformance or verification is not clear", async () => {
  // A run cannot reach attest or merge with conformance or verification not
  // clear: conforms and passed check them, and a stage records only its own
  // products. So each complete exit's own cel gates, as the yaml has them,
  // are evaluated on a walked run's real context with one product changed.
  const definition = await load(SWX);
  const { store } = await walkToAttest(definition, movableEnv().env);
  const run = await loadRun(store);
  assert(run !== null);
  const context = await buildCelContext(run, store);
  const verification = (ctx: CelContext) =>
    ctx.evidence["verification"].payload as Record<string, Json>;
  const cases: [string, (ctx: CelContext) => void, string][] = [
    ["no conformance", (ctx) => {
      delete ctx.artifacts["conformance"];
    }, "conformance review"],
    ["an unjustified deviation", (ctx) => {
      ctx.artifacts["conformance"].payload = {
        steps: [{ order: 1, status: "deviated", description: "Retry on 5xx" }],
      };
    }, "conformance review"],
    ["no verification", (ctx) => {
      delete ctx.evidence["verification"];
    }, "verification to have passed"],
    ["failed verification", (ctx) => {
      verification(ctx).status = "failed";
    }, "verification to have passed"],
    ["verification of another commit", (ctx) => {
      verification(ctx).commit = SHA_2;
    }, "verification to have passed"],
    ["a failed child", (ctx) => {
      verification(ctx).reviewsStatus = "failed";
    }, "both verify-build and verify-reviews"],
    ["a child without its run id", (ctx) => {
      delete verification(ctx).buildRunId;
    }, "both verify-build and verify-reviews"],
  ];
  for (const stageId of ["attest", "merge"]) {
    const t = (stage(definition, stageId).transitions ?? []).find((t) =>
      t.name === "complete"
    );
    assert(t !== undefined);
    const refusals = (ctx: CelContext) =>
      (t.gates ?? []).flatMap((g) =>
        g.type === "cel" && evaluateCel(g.config.expr, ctx) !== true
          ? [g.config.message ?? g.config.expr]
          : []
      );
    assertEquals(refusals(context), [], `${stageId}: the walked run`);
    for (const [label, change, expected] of cases) {
      const changed = structuredClone(context);
      change(changed);
      const refused = refusals(changed);
      assert(
        refused.some((m) => m.includes(expected)),
        `${stageId}, ${label}: ${JSON.stringify(refused)}`,
      );
    }
  }
});

// --- starter ------------------------------------------------------------------

const STARTER_SHA2 = "d6bbbe43ad0dfc5fce1615b09ff6e6f6639bd9ae";

Deno.test("starter: a run walks from plan to done through the real gates, with a rework round from each review and from verify", async () => {
  const core = await load(STARTER);
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    core,
    { key: "wi-1", definitionDigest: "sha256:l" },
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
      core,
      await expectNow(store),
      kind,
      name,
      payload,
      actor,
      env,
    );
    assert(result.ok, `${kind} ${name}: ${JSON.stringify(result)}`);
  };
  const gates = makeGateEvaluator(core, store, env);
  const move = async (transition: string) =>
    await update(store, (run) =>
      advance(
        run,
        core,
        expectedOf(run),
        { transition },
        gates,
        actor,
        env,
      ));
  const go = async (transition: string, to: string) => {
    const result = await move(transition);
    assert(result.ok, result.ok ? "" : result.reason);
    assertEquals((await loadRun(store))?.stage, to);
  };
  const refused = async (transition: string) => {
    const result = await move(transition);
    assert(!result.ok, `${transition} was not refused`);
  };
  const approve = async (gateId: string) => {
    const result = await update(store, (run) =>
      recordApproval(
        run,
        core,
        expectedOf(run),
        { gateId, decision: "approve" },
        actor,
        env,
      ));
    assert(result.ok, result.ok ? "" : result.reason);
  };
  const plan = {
    summary: "Add list",
    steps: [{ description: "Add list", files: ["x.ts"] }],
    testingStrategy: "Unit tests",
  };

  await record("artifact", "plan", plan);
  await go("submit", "plan-review");
  // A high finding sends the plan back and holds approval.
  await record("artifact", "plan-review", {
    findings: [{ id: "F1", severity: "high", description: "No tests" }],
  });
  await approve("plan-approval");
  await refused("approve");
  await go("rework", "plan");
  await record("artifact", "plan", { ...plan, testingStrategy: "Tests" });
  await go("submit", "plan-review");
  // A low finding blocks nothing: approval, and no rework.
  await record("artifact", "plan-review", {
    findings: [{ id: "F2", severity: "low", description: "Naming" }],
  });
  await refused("rework");
  await refused("approve");
  await approve("plan-approval");
  await go("approve", "implement");

  await record("artifact", "change-summary", {
    summary: "Added list",
    commit: SHA,
    files: ["x.ts"],
  });
  await go("submit", "verify");
  await record("evidence", "checks", {
    commit: SHA,
    status: "failed",
    results: [{ name: "test", status: "failed", detail: "1 failed" }],
  });
  await refused("passed");
  await go("failed", "implement");
  await record("artifact", "change-summary", {
    summary: "Added list, fixed",
    commit: STARTER_SHA2,
    files: ["x.ts"],
  });
  await go("submit", "verify");
  // Checks for another commit do not count.
  await record("evidence", "checks", {
    commit: SHA,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await refused("passed");
  await record("evidence", "checks", {
    commit: STARTER_SHA2,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await go("passed", "code-review");

  await record("artifact", "code-review", {
    findings: [{ id: "C1", severity: "critical", description: "Leak" }],
  });
  await refused("accept");
  await go("rework", "implement");
  await go("submit", "verify");
  await record("evidence", "checks", {
    commit: STARTER_SHA2,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await go("passed", "code-review");
  await record("artifact", "code-review", { findings: [] });
  await approve("release-approval");
  await go("accept", "release");
  await record("evidence", "release", {
    commit: STARTER_SHA2,
    url: "https://example.com/pr/1",
  });
  await go("released", "done");
  assertEquals((await loadRun(store))?.status, "terminal");
});
