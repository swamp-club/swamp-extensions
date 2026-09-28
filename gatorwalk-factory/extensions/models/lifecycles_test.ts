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
import { evaluate } from "cel-js";
import {
  findStage,
  type Lifecycle,
  parseLifecycle,
  type StageSpec,
  transitionsFrom,
  type TransitionSpec,
} from "./_lib/lifecycle_schema.ts";
import {
  type PayloadSchema,
  validateArtifactPayload,
  validatePayload,
} from "./_lib/payload_schema.ts";

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

Deno.test("build-swamp-extension: done is reachable from every stage", async () => {
  const lifecycle = await load(BUILD);
  const reachesDone = (from: string): boolean => {
    const seen = new Set([from]);
    const queue = [from];
    while (queue.length > 0) {
      const id = queue.shift() as string;
      if (id === "done") return true;
      for (const t of transitionsFrom(lifecycle, stage(lifecycle, id))) {
        if (t.to !== undefined && !seen.has(t.to)) {
          seen.add(t.to);
          queue.push(t.to);
        }
      }
    }
    return false;
  };
  for (const s of lifecycle.stages) {
    if (s.terminal === true) continue;
    assert(reachesDone(s.id), `done is unreachable from '${s.id}'`);
  }
});

Deno.test("build-swamp-extension: evidence gates sit on the stage that records the evidence", async () => {
  // evidence-recorded only accepts evidence from the current stage and cycle,
  // so a gate on evidence declared elsewhere could never pass. A global
  // transition leaves from any stage, so it can gate on no evidence at all.
  const lifecycle = await load(BUILD);
  for (const t of lifecycle.globalTransitions ?? []) {
    assert(
      !(t.gates ?? []).some((g) => g.type === "evidence-recorded"),
      `global transition ${t.name} gates on evidence`,
    );
  }
  for (const s of lifecycle.stages) {
    const own = new Set([
      ...(s.evidence ?? []).map((e) => e.name),
      ...(s.work?.resultEvidence !== undefined ? [s.work.resultEvidence] : []),
    ]);
    for (const t of s.transitions ?? []) {
      for (const gate of t.gates ?? []) {
        if (gate.type !== "evidence-recorded") continue;
        assert(
          own.has(gate.config.name),
          `${s.id}.${t.name} gates on '${gate.config.name}', which ${s.id} does not record`,
        );
      }
    }
  }
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

Deno.test("build-swamp-extension: every CEL expression evaluates against a sample run", async () => {
  // The schema only syntax-checks CEL. This evaluates every binding and cel
  // gate, which catches expressions cel-js parses but cannot run (has() on
  // an indexed path, for one). The context shape is provisional until the
  // runtime defines the CEL vocabulary.
  const lifecycle = await load(BUILD);
  const context = {
    artifacts: {
      plan: { payload: { summary: "Add list" } },
      "plan-review": { payload: { findings: [{ severity: "high" }] } },
      "code-review": { payload: { findings: [] } },
      "change-summary": {
        payload: {
          commit: SHA,
          summary: "Added list",
          manifestVersion: "2026.09.28.1",
        },
      },
    },
    evidence: {
      checks: { payload: { commit: SHA } },
      quality: { payload: { commit: SHA } },
      release: {
        payload: { via: "registry-push", commit: SHA, version: "2026.09.28.1" },
      },
    },
  };
  let evaluated = 0;
  const gates = (where: string, transitions: TransitionSpec[]) => {
    for (const t of transitions) {
      for (const gate of t.gates ?? []) {
        if (gate.type !== "cel") continue;
        const result = evaluate(gate.config.expr, context);
        assertEquals(typeof result, "boolean", `${where}.${t.name}`);
        evaluated++;
      }
    }
  };
  for (const s of lifecycle.stages) {
    for (const expr of Object.values(s.work?.bindings ?? {})) {
      evaluate(expr, context);
      evaluated++;
    }
    gates(s.id, s.transitions ?? []);
  }
  gates("global", lifecycle.globalTransitions ?? []);
  assert(evaluated >= 10, `only ${evaluated} expressions evaluated`);
});
