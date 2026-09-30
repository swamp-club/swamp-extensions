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
import {
  buildDispatch,
  buildSubagentPrompts,
} from "../_lib/engine/dispatch.ts";
import { analyzeDefinition } from "../_lib/engine/graph.ts";
import type { RunRecord } from "../_lib/engine/run_record.ts";
import { loadRun, type RunStore } from "../_lib/engine/run_store.ts";
import {
  parseScenario,
  runScenario,
  type ScenarioResult,
} from "../_lib/engine/scenario.ts";

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

// The walks through each example are its saved scenarios, under
// references/examples/scenarios/<example>/, which validate runs (see
// examples_test.ts). What stays here inspects CEL results on the run a
// scenario leaves.
const SCENARIOS = new URL("scenarios/", DEFINITIONS);

/** Run a saved scenario, which must pass, and return the run it leaves. */
async function scenario(
  definition: FactoryDefinition,
  example: string,
  name: string,
): Promise<{ result: ScenarioResult; run: RunRecord; store: RunStore }> {
  const file = `${example}/${name}.yaml`;
  const parsed = parseScenario(
    parseYaml(await Deno.readTextFile(new URL(file, SCENARIOS))),
  );
  if (!parsed.ok) throw new Error(`${file}:\n${parsed.errors.join("\n")}`);
  const result = await runScenario(definition, parsed.value);
  assertEquals(result.failures, [], file);
  const run = await loadRun(result.store);
  assert(run !== null);
  return { result, run, store: result.store };
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

const BUILD = "build-swamp-extension.yaml";
const SWX = "swamp-club-swamp-extensions.yaml";
const STARTER = "starter.yaml";

/** The evidence of a stage a person records. */
function byPerson(definition: FactoryDefinition, id: string): string[] {
  return (stage(definition, id).evidence ?? []).flatMap((e) =>
    e.recordedBy === "person" ? [e.name] : []
  );
}

// --- plan feedback, in every example with a plan loop ------------------------

const PLAN_FEEDBACK: [string, string, string][] = [
  [STARTER, "starter", "plan-feedback"],
  [BUILD, "build-swamp-extension", "plan-churn"],
  [SWX, "swamp-club-swamp-extensions", "plan-feedback"],
];

for (const [file, example, name] of PLAN_FEEDBACK) {
  Deno.test(`${example}: revise needs the person's feedback, which the next plan is handed with the last plan and review`, async () => {
    const definition = await load(file);
    assertEquals(byPerson(definition, "plan-review"), ["plan-feedback"]);
    const revise = (stage(definition, "plan-review").transitions ?? []).find(
      (t) => t.name === "revise",
    );
    assertEquals(revise?.gates, [{
      type: "evidence-recorded",
      description: "The person's feedback on this plan is recorded.",
      config: { name: "plan-feedback" },
    }]);

    const { result, store } = await scenario(definition, example, name);
    const frames = result.frames;
    // Every revise taken was opened by feedback recorded in that pass.
    const taken = frames.filter((f) =>
      f.moved?.transition === "revise" && f.moved.to === "plan"
    );
    assert(taken.length > 0);
    for (const f of taken) {
      const back = f.run.journal.findLast((e) => e.type === "advanced");
      assert(back?.type === "advanced");
      const feedback = f.run.journal.findLast((e) =>
        e.type === "recorded" && e.name === "plan-feedback"
      );
      assert(feedback?.type === "recorded");
      assertEquals(feedback.stage, "plan-review");
      assertEquals([feedback.era, feedback.cycle], [back.era, back.cycle]);
    }

    // The next plan's packet injects the last plan, its review and the
    // feedback, which the context holds.
    const replanned = taken[0].run;
    const context = await buildCelContext(replanned, store);
    const packet = buildDispatch(definition, replanned, context);
    assertEquals(packet.stage, "plan");
    for (const product of ["plan", "plan-review", "plan-feedback"]) {
      assert(packet.inject.includes(product), packet.inject.join());
    }
    assert(context.evidence["plan-feedback"] !== undefined);
    assert(context.artifacts["plan"] !== undefined);

    // The reviewer is never asked to write the person's feedback.
    const inReview = frames.find((f) =>
      f.moved?.transition === "submit" && f.moved.to === "plan-review"
    )?.run;
    assert(inReview !== undefined);
    const review = buildDispatch(
      definition,
      inReview,
      await buildCelContext(inReview, store),
    );
    assertEquals(review.products.map((p) => p.name), ["plan-review"]);
    for (
      const { prompt } of buildSubagentPrompts(definition, review, {
        key: "wi-1",
        dispatchId: 1,
        resultDir: "/scratch",
      })
    ) {
      assert(!prompt.includes("plan-feedback"), prompt);
    }
  });
}

Deno.test("plan feedback: after a declined plan, the person's feedback leaves approval declined and opens only revise", async () => {
  for (const [file, example] of [PLAN_FEEDBACK[0], PLAN_FEEDBACK[2]]) {
    const definition = await load(file);
    const { result } = await scenario(definition, example, "plan-feedback");
    const recorded = result.frames.find((f) =>
      f.label.includes("plan-feedback") && !f.refused
    );
    assert(recorded !== undefined, example);
    const awaiting = recorded.run.journal.at(-1);
    assert(awaiting?.type === "awaiting", example);
    assertEquals(awaiting.exits.map((e) => e.transition), ["revise"]);
    assertEquals(
      recorded.readiness.find((r) => r.name === "approve")?.ready,
      false,
    );
  }
});

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
  // A gate on evidence a person records does not wedge it: the person can
  // always record it (plan-review's revise needs their feedback).
  const definition = await load(BUILD);
  const manual = (stageId: string, to: string) =>
    (stage(definition, stageId).transitions ?? []).some((t) =>
      t.manual === true && t.to === to &&
      (t.gates ?? []).every((g) =>
        g.type === "evidence-recorded" &&
        byPerson(definition, stageId).includes(g.config.name)
      )
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
  // The schema only syntax-checks CEL. The plan-to-release scenario drives a
  // real run through the runtime and the real gate evaluator, recording each
  // product on the stage that declares it and each approval the gates need;
  // this evaluates every binding and cel gate against the context the
  // runtime builds on it. It catches expressions cel-js parses but cannot
  // run (has() on an indexed path).
  const definition = await load(BUILD);
  const { run, store } = await scenario(
    definition,
    "build-swamp-extension",
    "plan-to-release",
  );
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

// --- swamp-club-swamp-extensions ---------------------------------------------

const SHA_2 = "8a25dbbfc0e8f3c1d4a2b6e7f9012345678abcde";
const PR_URL =
  "https://git.swamp-club.com/swamp-club/swamp-extensions/pulls/346";

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
    type: "bug",
    confidence: "high",
    reasoning: "The retry never fires",
    isRegression: false,
    regressionEvidence: "Passed at 2026.09.20.1",
    regressionCounterEvidence: "The test never covered 503",
    regressionVerdict: "downgraded",
    regressionVerdictReasoning: "503 was never retried",
  });
  evidence("classification", {
    type: "feature",
    confidence: "low",
    reasoning: "Unclear whether this is new",
    isRegression: false,
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

/** A regression claim's argument, without the flag or the verdict. */
const REGRESSION_CLAIM = {
  type: "bug",
  confidence: "high",
  reasoning: "r",
  regressionEvidence: "e",
  regressionCounterEvidence: "c",
  regressionVerdictReasoning: "v",
};

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
      isRegression: false,
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
    ["a classification without isRegression", "evidence", "classification", {
      type: "bug",
      confidence: "high",
      reasoning: "r",
    }],
    [
      "a downgraded claim recorded as a regression",
      "evidence",
      "classification",
      {
        ...REGRESSION_CLAIM,
        isRegression: true,
        regressionVerdict: "downgraded",
      },
    ],
    ["a confirmed regression recorded as none", "evidence", "classification", {
      ...REGRESSION_CLAIM,
      isRegression: false,
      regressionVerdict: "confirmed",
    }],
    ["a regression without a verdict", "evidence", "classification", {
      ...REGRESSION_CLAIM,
      isRegression: true,
    }],
    ["a downgraded claim introduced somewhere", "evidence", "classification", {
      ...REGRESSION_CLAIM,
      isRegression: false,
      regressionVerdict: "downgraded",
      regressionIntroducedIn: "2026.09.21.1",
    }],
    ["a plain bug introduced somewhere", "evidence", "classification", {
      type: "bug",
      confidence: "high",
      reasoning: "r",
      isRegression: false,
      regressionIntroducedIn: "2026.09.21.1",
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
  // As build-swamp-extension's run, on the bug-to-done scenario, which walks
  // the stops this factory definition adds: low confidence holds triage, a
  // failed verification needs a new commit, and the merge waits out the
  // cooldown.
  const definition = await load(SWX);
  const { run, store } = await scenario(
    definition,
    "swamp-club-swamp-extensions",
    "bug-to-done",
  );
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

/** The run as it first reached notify. */
function notifyFrame(result: ScenarioResult): RunRecord {
  const frame = result.frames.find((f) => f.run.stage === "notify");
  assert(frame !== undefined, "the scenario never reached notify");
  return frame.run;
}

/** The prUrl notify dispatches with; the packet must be ready. */
async function notifyPrUrl(
  definition: FactoryDefinition,
  run: RunRecord,
  store: RunStore,
): Promise<Json | undefined> {
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
  const { result, store } = await scenario(
    definition,
    "swamp-club-swamp-extensions",
    "complete-after-failed-pr",
  );
  assertEquals(
    await notifyPrUrl(definition, notifyFrame(result), store),
    null,
  );
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

Deno.test("swamp-club-swamp-extensions: complete from attest dispatches notify with no pull request to link", async () => {
  // complete-to-done walks on from notify to done.
  const definition = await load(SWX);
  const { result, store } = await scenario(
    definition,
    "swamp-club-swamp-extensions",
    "complete-to-done",
  );
  assertEquals(
    await notifyPrUrl(definition, notifyFrame(result), store),
    null,
  );
});

Deno.test("swamp-club-swamp-extensions: complete from merge after a new pull request links that pull request", async () => {
  // complete-from-merge: the failed pull request is no longer open; a new one
  // opens, and complete from merge passes.
  const definition = await load(SWX);
  const { result, store } = await scenario(
    definition,
    "swamp-club-swamp-extensions",
    "complete-from-merge",
  );
  assertEquals(
    await notifyPrUrl(definition, notifyFrame(result), store),
    PR_URL,
  );
});

Deno.test("swamp-club-swamp-extensions: complete refuses when conformance or verification is not clear", async () => {
  // A run cannot reach attest or merge with conformance or verification not
  // clear: conforms and passed check them, and a stage records only its own
  // products. So each complete exit's own cel gates, as the yaml has them,
  // are evaluated on a walked run's real context with one product changed.
  const definition = await load(SWX);
  const { run, store } = await scenario(
    definition,
    "swamp-club-swamp-extensions",
    "walk-to-attest",
  );
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
