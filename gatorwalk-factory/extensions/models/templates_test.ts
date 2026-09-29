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
import { applyStageTemplate } from "./_lib/apply.ts";
import { canonicalJson, digestOf } from "./_lib/canonical.ts";
import { makeGateEvaluator } from "./_lib/gates.ts";
import { analyzeLifecycle, formatFinding } from "./_lib/graph.ts";
import {
  type GateSpec,
  type Lifecycle,
  parseLifecycle,
  type StageTemplate,
} from "./_lib/lifecycle_schema.ts";
import { advance, expectedOf, recordApproval } from "./_lib/run_ops.ts";
import {
  loadRun,
  memoryStore,
  recordProduct,
  startRun,
  update,
} from "./_lib/run_store.ts";
import { instantiateStageTemplate } from "./_lib/stage_template.ts";
import { expectNow, testEnv } from "./_lib/test_support.ts";

// The starter stage templates under templates/: each stands on its own, and
// applied in flow order to testdata/lifecycles/starter-sketch.yaml they give
// testdata/lifecycles/starter-core.yaml, the same lifecycle written by hand.

const TEMPLATES = new URL("../../templates/", import.meta.url);
const TESTDATA = new URL("../../testdata/lifecycles/", import.meta.url);
const SHA = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";
const SHA2 = "d6bbbe43ad0dfc5fce1615b09ff6e6f6639bd9ae";

/** Each starter, and the placeholder of starter-sketch it replaces, in flow
 * order. */
const STARTERS: [file: string, placeholder: string][] = [
  ["plan", "plan"],
  ["review-plan", "plan-review"],
  ["implement", "implement"],
  ["verify", "verify"],
  ["review", "code-review"],
];

async function raw(file: string): Promise<Record<string, unknown>> {
  return parseYaml(
    await Deno.readTextFile(new URL(`${file}.yaml`, TEMPLATES)),
  ) as Record<string, unknown>;
}

async function starter(
  file: string,
  params?: Record<string, unknown>,
): Promise<StageTemplate> {
  const result = instantiateStageTemplate(await raw(file), params);
  if (!result.ok) {
    throw new Error(`${file}.yaml:\n${result.errors.join("\n")}`);
  }
  return result.template;
}

async function lifecycle(file: string): Promise<Lifecycle> {
  const result = parseLifecycle(
    parseYaml(await Deno.readTextFile(new URL(file, TESTDATA))),
  );
  if (!result.ok) {
    throw new Error(`${file} is invalid:\n${result.errors.join("\n")}`);
  }
  return result.value;
}

function gatesOf(
  doc: { stages: { transitions?: { gates?: GateSpec[] }[] }[] },
) {
  return doc.stages.flatMap((s) =>
    (s.transitions ?? []).flatMap((t) => t.gates ?? [])
  );
}

Deno.test("templates: the starter set is exactly plan, review-plan, implement, verify and review", async () => {
  const files: string[] = [];
  for await (const entry of Deno.readDir(TEMPLATES)) {
    if (entry.isFile && entry.name.endsWith(".yaml")) files.push(entry.name);
  }
  assertEquals(
    files.sort(),
    STARTERS.map(([file]) => `${file}.yaml`).sort(),
  );
});

Deno.test("templates: each is valid with its defaults and passes graph analysis on its own", async () => {
  for (const [file] of STARTERS) {
    const template = await starter(file);
    assertEquals(template.name, file);
    const report = analyzeLifecycle(template);
    assertEquals(report.errors.map(formatFinding), [], file);
    assertEquals(report.warnings.map(formatFinding), [], file);
  }
});

Deno.test("templates: each contract's inputs, outputs and exits", async () => {
  const contracts: Record<string, unknown> = {};
  for (const [file] of STARTERS) {
    const { contract } = await starter(file);
    const ports = (list?: { kind: string; name: string }[]) =>
      (list ?? []).map((p) => `${p.kind} ${p.name}`);
    contracts[file] = {
      inputs: ports(contract.inputs),
      outputs: ports(contract.outputs),
      exits: contract.exits.map((e) => e.name),
      parameters: Object.keys(contract.parameters?.properties ?? {}),
    };
  }
  assertEquals(contracts, {
    "plan": {
      inputs: [],
      outputs: ["artifact plan"],
      exits: ["submitted"],
      parameters: ["skills"],
    },
    "review-plan": {
      inputs: ["artifact plan"],
      outputs: ["artifact plan-review"],
      exits: ["approved", "rework"],
      parameters: ["skills", "blocking"],
    },
    "implement": {
      inputs: ["artifact plan"],
      outputs: ["artifact change-summary"],
      exits: ["submitted"],
      parameters: ["skills"],
    },
    "verify": {
      inputs: ["artifact change-summary"],
      outputs: ["evidence checks"],
      exits: ["passed", "failed"],
      parameters: ["command"],
    },
    "review": {
      inputs: ["artifact plan", "artifact change-summary"],
      outputs: ["artifact code-review"],
      exits: ["accepted", "rework"],
      parameters: ["skills", "blocking"],
    },
  });
});

Deno.test("templates: none has an approval; approvals are the lifecycle's", async () => {
  for (const [file] of STARTERS) {
    const types = gatesOf(await starter(file)).map((g) => g.type);
    assert(!types.includes("human-approval"), `${file} has an approval`);
  }
});

Deno.test("templates: parameters reach the stages", async () => {
  for (const file of ["review-plan", "review"]) {
    const template = await starter(file, {
      skills: ["my-review"],
      blocking: ["critical"],
    });
    assertEquals(template.stages[0].work?.skills, ["my-review"]);
    // One blocking set drives both exits, so they never pass together.
    const blocking = gatesOf(template).flatMap((g) =>
      g.type === "findings-clear" || g.type === "findings-open"
        ? [[g.type, g.config.blocking]]
        : []
    );
    assertEquals(blocking, [
      ["findings-clear", ["critical"]],
      ["findings-open", ["critical"]],
    ], file);
  }
  const verify = await starter("verify", { command: "make check" });
  assertEquals(verify.stages[0].work?.command, "make check");
  for (const file of ["plan", "implement"]) {
    const template = await starter(file, { skills: ["tdd"] });
    assertEquals(template.stages[0].work?.skills, ["tdd"], file);
  }
});

Deno.test("templates: applied in flow order to starter-sketch, they give starter-core, as written by hand", async () => {
  let composed = await lifecycle("starter-sketch.yaml");
  for (const [file, placeholder] of STARTERS) {
    const result = applyStageTemplate(composed, await starter(file), {
      replace: placeholder,
    });
    if (!result.ok) {
      throw new Error(`applying ${file}:\n${result.errors.join("\n")}`);
    }
    composed = result.lifecycle;
  }
  const core = await lifecycle("starter-core.yaml");
  // Canonical JSON, so a difference prints as a readable diff.
  assertEquals(
    JSON.parse(canonicalJson(composed)),
    JSON.parse(canonicalJson(core)),
  );
  assertEquals(await digestOf(composed), await digestOf(core));

  // starter-core stands as a lifecycle; its rework loops rely on the default
  // cycle limit, as build-swamp-extension's do.
  const report = analyzeLifecycle(core);
  assertEquals(report.errors.map(formatFinding), []);
  assertEquals(
    report.warnings.map((w) => `${w.code} ${formatFinding(w).split(":")[0]}`),
    [
      "default-cycle-bound stages.0 (from stage 'plan')",
      "default-cycle-bound stages.2 (from stage 'implement')",
    ],
  );
});

Deno.test("templates: a run walks starter-core from plan to done through the real gates, with a rework round from each review and from verify", async () => {
  const core = await lifecycle("starter-core.yaml");
  const store = memoryStore();
  const env = testEnv();
  const actor = { principal: "user:alice", source: "platform" as const };
  await startRun(
    store,
    core,
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
    commit: SHA2,
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
    commit: SHA2,
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
    commit: SHA2,
    status: "passed",
    results: [{ name: "test", status: "passed" }],
  });
  await go("passed", "code-review");
  await record("artifact", "code-review", { findings: [] });
  await approve("release-approval");
  await go("accept", "release");
  await record("evidence", "release", {
    commit: SHA2,
    url: "https://example.com/pr/1",
  });
  await go("released", "done");
  assertEquals((await loadRun(store))?.status, "terminal");
});
