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
  type FakeSwamp,
  fakeSwamp,
  findStage,
  parseDefinition,
  parseExample,
  type StageSpec,
} from "../_lib/engine/tracker_testing.ts";
import { DEFAULT_STATUSES } from "../_lib/tracker/backends/builtin.ts";
import {
  TRACKED_ITEM,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";
import { builtinMethods } from "./builtin.ts";

// ---------------------------------------------------------------------------
// The example factory definitions the skill ships, as the built-in tracker
// sees them. engine/factories_test.ts tests how each behaves.
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

function stage(definition: FactoryDefinition, id: string): StageSpec {
  const found = findStage(definition, id);
  if (found === undefined) throw new Error(`no stage '${id}'`);
  return found;
}

const STARTER = "starter.yaml";
const BUILD = "build-swamp-extension.yaml";
const PROJECTING = [
  STARTER,
  BUILD,
  "content-review.yaml",
  "incident-review.yaml",
  "openapi-models.yaml",
];

Deno.test("every projecting example's status keys are the built-in tracker's default statuses, so it needs no statuses list", async () => {
  // minimal projects nothing, by design.
  for (const file of PROJECTING) {
    const definition = await load(file);
    const keyed = definition.stages.filter((s) =>
      s.tracker?.status !== undefined
    );
    assert(keyed.length > 0, `${file} projects no status`);
    for (const s of keyed) {
      assert(
        (DEFAULT_STATUSES as readonly string[]).includes(
          s.tracker?.status ?? "",
        ),
        `${file}: stage '${s.id}' has status key ` +
          `'${s.tracker?.status}', not one of ${DEFAULT_STATUSES.join(", ")}`,
      );
    }
    // In stage order the keys only move forward, so a work item going
    // forward never moves its ticket back.
    const order = ["open", "in_progress", "shipped"];
    const forward = keyed.filter((s) => s.tracker?.status !== "closed")
      .map((s) => order.indexOf(s.tracker?.status ?? ""));
    assertEquals(
      forward,
      [...forward].sort((a, b) => a - b),
      `${file}: status keys go backwards in stage order`,
    );
    assertEquals(stage(definition, "done").tracker?.status, "shipped");
    assertEquals(stage(definition, "abandoned").tracker?.status, "closed");
  }
});

Deno.test("build-swamp-extension's entries carry versions, counts and attempts to the built-in tracker", async () => {
  const swamp = fakeSwamp();
  swamp.globalArgs.set("tracker", { prefix: "team" });
  // No stored login, so publish assigns no one; the host's is never read.
  const methods = builtinMethods({
    sources: { readAuthFile: () => Promise.resolve(null) },
  });
  const call = async (name: "create" | "publish", raw: unknown) => {
    const method = methods[name];
    const execute = method.execute as (
      args: unknown,
      ctx: ReturnType<FakeSwamp["context"]>,
    ) => Promise<unknown>;
    await execute(method.arguments.parse(raw), swamp.context("tracker"));
  };
  await call("create", {
    title: "Add list",
    body: "A list method.",
    type: "feature",
  });
  const id = JSON.parse(String(swamp.logs.at(-1)?.props?.externalRefs)).builtin;
  const raw = parseExample(
    await Deno.readTextFile(new URL(BUILD, DEFINITIONS)),
  ).definition;
  const item = await trackedItem(swamp, { builtin: id }, raw, {
    kind: "builtin",
  });
  const commit = "c5aaad329c9ceb4edc0504a98ff5d6e5528ac8fd";
  const plan = (summary: string) => ({
    summary,
    steps: [{ description: "Add list", files: ["x.ts"] }],
    testingStrategy: "Unit tests",
    versionBump: { needed: true, reason: "New method" },
  });
  const finding = (id: string, severity: string) => ({
    id,
    severity,
    description: "d",
  });
  await item.record("artifact", "plan", plan("Add list"));
  await item.advance("submit");
  await item.record("evidence", "plan-feedback", { feedback: "Name it ls" });
  await item.advance("revise");
  await item.record("artifact", "plan", plan("Add ls"));
  await item.advance("submit");
  await item.record("artifact", "plan-review", {
    findings: [finding("F1", "low"), finding("F2", "medium")],
  });
  await item.approve("plan-approval");
  await item.advance("approve");
  await item.record("artifact", "change-summary", {
    summary: "Added ls",
    commit,
    files: ["x.ts"],
    manifestVersion: "2026.09.28.1",
  });
  await item.advance("submit");
  await item.dispatch();
  const checks = (status: string) => ({
    commit,
    status,
    results: [{ name: "test", status }],
  });
  await item.record("evidence", "checks", checks("failed"));
  // A failure that was not the code's: back to implement, and the same
  // commit is checked again.
  await item.advance("failed");
  await item.advance("recheck");
  await item.dispatch();
  await item.record("evidence", "checks", checks("passed"));
  await item.record("evidence", "quality", {
    commit,
    status: "passed",
    allPassed: true,
  });
  await item.advance("passed");
  await item.record("artifact", "code-review", {
    findings: [finding("C1", "critical")],
  });
  await call("publish", { workItem: TRACKED_ITEM });
  const summaries = [...(swamp.resources.get("tracker")?.entries() ?? [])]
    .filter(([name]) => name.startsWith(`entry-${id}-`))
    .map(([, versions]) => String(versions.at(-1)?.summary));
  assertEquals(summaries, [
    "Plan generated (v1): Add list",
    "Plan revised (v2), round 2: Add ls",
    "Plan review (plan v2): 0 critical, 0 high, 2 in all",
    "Plan approved (v2)",
    `Checks started on ${commit}, attempt 1`,
    `Checks failed on ${commit}`,
    `Checks started on ${commit}, attempt 2`,
    `Checks passed on ${commit}`,
    "Code review (change v1): 1 critical, 0 high, 1 in all",
  ]);
});
