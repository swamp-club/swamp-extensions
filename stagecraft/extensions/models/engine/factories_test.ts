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
import { parseExample } from "../_lib/engine/fake_swamp.ts";
import { buildCelContext, evaluateCel } from "../_lib/engine/cel_context.ts";
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
  "../../../.claude/skills/stagecraft/references/examples/",
  import.meta.url,
);

async function load(file: string): Promise<FactoryDefinition> {
  const raw = parseExample(
    await Deno.readTextFile(new URL(file, DEFINITIONS)),
  ).definition;
  const result = parseDefinition(raw);
  if (!result.ok) {
    throw new Error(`${file} is invalid:\n${result.errors.join("\n")}`);
  }
  return result.value;
}

// The walks through each example are its saved scenarios, in its scenarios
// block, which validate runs (see examples_test.ts). What stays here inspects
// CEL results on the run a scenario leaves.

/** Run a saved scenario, which must pass, and return the run it leaves. */
async function scenario(
  definition: FactoryDefinition,
  example: string,
  name: string,
): Promise<{ result: ScenarioResult; run: RunRecord; store: RunStore }> {
  const file = `${example} scenario ${name}`;
  const { scenarios } = parseExample(
    await Deno.readTextFile(new URL(`${example}.yaml`, DEFINITIONS)),
  );
  const raw = scenarios.find((s) =>
    (s as { scenario?: unknown }).scenario === name
  );
  if (raw === undefined) throw new Error(`no ${file}`);
  const parsed = parseScenario(raw);
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

    // The reviewer is never asked to write the person's feedback; it may
    // read it (swamp-club #2873).
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
      assert(!prompt.includes("-plan-feedback.json"), prompt);
    }
  });
}

Deno.test("plan feedback: every plan prompt adds the feedback only once, since after rework it is the feedback already answered", async () => {
  for (const [file] of PLAN_FEEDBACK) {
    const prompt = stage(await load(file), "plan").work?.systemPrompt ?? "";
    const text = prompt.replace(/\s+/g, " ");
    assert(
      text.includes(
        "Record feedbackIncorporated as the last plan's list, adding the " +
          "feedback word for word unless it is already the list's last entry",
      ),
      `${file}: ${text}`,
    );
  }
});

Deno.test("plan feedback: after a declined plan, the person's feedback leaves approval declined and opens only revise", async () => {
  for (const [file, example] of [PLAN_FEEDBACK[0]]) {
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

// --- incident-review, content-review and openapi-models ---------------------

/** The human-approval gate ids anywhere in a definition, sorted. */
function approvalsOf(definition: FactoryDefinition): string[] {
  const approvals = new Set<string>();
  for (
    const t of definition.stages.flatMap((s) => s.transitions ?? [])
      .concat(definition.globalTransitions ?? [])
  ) {
    for (const gate of t.gates ?? []) {
      if (gate.type === "human-approval") approvals.add(gate.config.id);
    }
  }
  return [...approvals].sort();
}

const SHAPES: {
  file: string;
  stages: string[];
  approvals: string[];
  /** The stage a person sends back from, its feedback, and where it goes. */
  revise: { from: string; feedback: string; to: string };
}[] = [
  {
    file: "incident-review.yaml",
    stages: [
      "timeline",
      "analysis",
      "review",
      "sign-off",
      "publish",
      "done",
      "duplicate",
      "abandoned",
    ],
    approvals: ["abandon-confirmation", "duplicate-confirmation", "sign-off"],
    revise: { from: "sign-off", feedback: "review-feedback", to: "analysis" },
  },
  {
    file: "content-review.yaml",
    stages: [
      "draft",
      "editorial-review",
      "approval",
      "publish",
      "done",
      "duplicate",
      "abandoned",
    ],
    approvals: [
      "abandon-confirmation",
      "duplicate-confirmation",
      "publish-approval",
    ],
    revise: { from: "approval", feedback: "editorial-feedback", to: "draft" },
  },
  {
    file: "openapi-models.yaml",
    stages: [
      "scope",
      "mapping",
      "mapping-review",
      "implement",
      "check",
      "code-review",
      "try-it",
      "release",
      "done",
      "duplicate",
      "abandoned",
    ],
    approvals: [
      "abandon-confirmation",
      "duplicate-confirmation",
      "mapping-approval",
      "quality-waiver",
      "release-approval",
    ],
    revise: {
      from: "mapping-review",
      feedback: "mapping-feedback",
      to: "mapping",
    },
  },
];

for (const { file, stages, approvals, revise } of SHAPES) {
  const example = file.replace(/\.yaml$/, "");

  Deno.test(`${example}: the stages, in order, and where people decide`, async () => {
    const definition = await load(file);
    assertEquals(definition.stages.map((s) => s.id), stages);
    assertEquals(approvalsOf(definition), approvals);
  });

  Deno.test(`${example}: revise needs the person's feedback, which the reworked stage is handed`, async () => {
    const definition = await load(file);
    assertEquals(byPerson(definition, revise.from), [revise.feedback]);
    const back = (stage(definition, revise.from).transitions ?? []).find(
      (t) => t.name === "revise",
    );
    assertEquals([back?.to, back?.manual], [revise.to, true]);
    assert(
      (back?.gates ?? []).some((g) =>
        g.type === "evidence-recorded" && g.config.name === revise.feedback
      ),
      `${example}: revise does not wait for ${revise.feedback}`,
    );
    assert(
      stage(definition, revise.to).work?.context?.inject?.includes(
        revise.feedback,
      ),
      `${example}: ${revise.to} is not handed ${revise.feedback}`,
    );
  });
}

Deno.test("openapi-models: only a person records the live try, and either way to release needs their approval", async () => {
  const definition = await load("openapi-models.yaml");
  assertEquals(byPerson(definition, "try-it"), ["live-try"]);
  const toRelease = (stage(definition, "try-it").transitions ?? []).filter(
    (t) => t.to === "release",
  );
  assertEquals(toRelease.map((t) => t.name), ["tried", "skipped"]);
  for (const t of toRelease) {
    assert(
      (t.gates ?? []).some((g) =>
        g.type === "human-approval" && g.config.id === "release-approval"
      ),
      t.name,
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
    "duplicate",
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

Deno.test("build-swamp-extension: people decide at plan, a duplicate, quality waiver, release and abandon", async () => {
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
    "duplicate-confirmation",
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
  // this evaluates every let value and cel gate against the context the
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
  let lets = 0;
  for (const s of definition.stages) {
    for (const expr of Object.values(s.work?.let ?? {})) {
      evaluateCel(expr, context);
      lets++;
    }
    celGates(s.id, s.transitions ?? []);
  }
  celGates("global", definition.globalTransitions ?? []);
  assert(
    lets >= 5 && results.size >= 5,
    `${lets} let values, ${results.size} gates`,
  );
  // With this run's data: the checks and release are bound to the reviewed
  // commit, the push publishes the reviewed version, nothing asks for
  // rework, and implement cannot resubmit the commit already checked.
  assertEquals(results.get("check.passed"), true);
  assertEquals(results.get("release.released"), true);
  assertEquals(results.get("code-review.rework"), false);
  assertEquals(results.get("implement.submit"), false);
});
