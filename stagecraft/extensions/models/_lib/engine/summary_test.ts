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
import { fakeSwamp } from "./fake_swamp.ts";
import { contextStore, loadRun } from "./run_store.ts";
import { buildSummary, formatDuration } from "./summary.ts";
import {
  handoffDefinition,
  settableEnv,
  stopsDefinition,
  stopsParsedDefinition,
} from "./test_support.ts";
import {
  advanceMethod,
  decide,
  describeStatus,
  dispatch,
  grantOverrideMethod,
  recordProductMethod,
  recordUsageMethod,
  retargetMethod,
  startWorkItem,
  summary,
} from "./work_item_ops.ts";

const ITEM = "stops-abcdefgh";

async function reviewed() {
  const swamp = fakeSwamp();
  swamp.factory("team", stopsDefinition());
  const env = settableEnv("2026-09-29T10:00:00.000Z");
  const ctx = () => swamp.context(ITEM);
  const expected = async () => {
    const view = await describeStatus(ctx(), env);
    return {
      expectedStage: view.expected.expectedStage,
      expectedCycle: view.expected.expectedCycle,
      expectedEra: view.expected.expectedEra,
    };
  };
  await startWorkItem(
    ctx(),
    { factory: "team", externalRefs: { "linear.display": "ABC-1" } },
    env,
  );
  env.at("2026-09-29T10:10:00.000Z");
  await recordProductMethod(
    ctx(),
    "artifact",
    { name: "plan", payload: { text: "a secret plan" }, ...await expected() },
    env,
  );
  await advanceMethod(
    ctx(),
    { transition: "submit", ...await expected() },
    env,
  );
  env.at("2026-09-29T11:15:30.000Z");
  await decide(
    ctx(),
    "decline",
    { gateId: "go", note: "needs tests | and more", ...await expected() },
    env,
  );
  return { swamp, env, ctx, expected };
}

Deno.test("summary: the method logs the timeline and metrics, with no payload contents", async () => {
  const { swamp, env, ctx } = await reviewed();
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  assert(markdown.startsWith(`# Work item ${ITEM}\n`), markdown);
  for (
    const expected of [
      "## Metrics",
      "## Era 1 (era-1)",
      "### Timeline",
      "### Waits at human stops",
      "- **Tracker:** linear.display ABC-1",
      "artifact 'plan' version 1",
      "awaiting a person: 'approve' [go]",
      // A pipe in a note cannot break the table.
      "declined 'go': needs tests \\| and more",
      "| review (1) | approve [go] | 2026-09-29T10:10:00.000Z | " +
      "2026-09-29T11:15:30.000Z | 1h 5m 30s | declined |",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
  assert(!markdown.includes("a secret plan"));
});

Deno.test("summary: usage shows the harness total, and dispatches without usage by mode", async () => {
  const { swamp, env, ctx, expected } = await reviewed();
  await dispatch(ctx(), await expected(), env);
  await dispatch(ctx(), await expected(), env);
  await recordUsageMethod(
    ctx(),
    {
      dispatchId: 1,
      totalTokens: 65155,
      toolUses: 4,
      durationMs: 90_000,
      model: "claude-opus-5-5",
    },
    env,
  );
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  for (
    const expected of [
      "usage for dispatch 1: 65155 tokens, 4 tool uses, 1m 30s " +
      "(claude-opus-5-5), attested",
      "- **Tokens (attested):** 65155 over 1 dispatch(es); 4 tool uses; " +
      "1m 30s reported; 1 without usage: 1 interactive; claude-opus-5-5: 65155",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
});

Deno.test("summary: a park at the dispatch cap is in the timeline and the waits", async () => {
  const { swamp, env, ctx, expected } = await reviewed();
  await dispatch(ctx(), await expected(), env);
  await dispatch(ctx(), await expected(), env);
  env.at("2026-09-29T11:20:00.000Z");
  await assertRejects(async () => dispatch(ctx(), await expected(), env));
  env.at("2026-09-29T11:30:00.000Z");
  await grantOverrideMethod(
    ctx(),
    { kind: "dispatch", ...await expected() },
    env,
  );
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  for (
    const expected of [
      "awaiting a person: a dispatch override (2 of 2 dispatches)",
      "dispatch override for 'review'",
      "| review (1) | dispatch override | 2026-09-29T11:20:00.000Z | " +
      "2026-09-29T11:30:00.000Z | 10m",
      "| overridden |",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
});

Deno.test("summary: a retargeted work item shows its current refs and the ones before", async () => {
  const { swamp, env, ctx, expected } = await reviewed();
  await retargetMethod(
    ctx(),
    {
      externalRefs: { linear: "uuid-9", "linear.display": "ABC-9" },
      reason: "ABC-1 duplicates ABC-9",
      ...await expected(),
    },
    env,
  );
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  for (
    const expected of [
      "- **Tracker:** linear uuid-9, linear.display ABC-9",
      "- **Previously:** linear.display ABC-1",
      "retargeted from linear.display ABC-1 to linear uuid-9, " +
      "linear.display ABC-9: " +
      "ABC-1 duplicates ABC-9",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
});

Deno.test("summary: waits a person was kept in at once count once; a manual exit is no wait while the agent works", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", handoffDefinition());
  const env = settableEnv("2026-09-29T10:00:00.000Z");
  const ctx = () => swamp.context(ITEM);
  const expected = async () => {
    const view = await describeStatus(ctx(), env);
    return {
      expectedStage: view.expected.expectedStage,
      expectedCycle: view.expected.expectedCycle,
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
      { name, payload, ...await expected() },
      env,
    );
  const move = async (transition: string) =>
    advanceMethod(ctx(), { transition, ...await expected() }, env);
  await startWorkItem(ctx(), { factory: "team" }, env);
  await record("artifact", "change", { text: "the change" });
  await move("built");
  env.at("2026-09-29T10:10:00.000Z");
  await record("evidence", "attestation", { text: "att-1" });
  env.at("2026-09-29T10:20:00.000Z");
  await decide(
    ctx(),
    "approve",
    { gateId: "open-pr", ...await expected() },
    env,
  );
  await move("attested");
  env.at("2026-09-29T10:30:00.000Z");
  await record("evidence", "merge", { status: "merged" });
  env.at("2026-09-29T10:35:00.000Z");
  await move("merged");
  await summary(ctx(), env);
  const markdown = String(swamp.logs.at(-1)?.props?.summary);
  for (
    const expected of [
      "- **Waits at human stops:** 2 (0 open), 10m 0s finished " +
      "(overlaps counted once)",
      "| attest (1) | attested [open-pr] | 2026-09-29T10:10:00.000Z | " +
      "2026-09-29T10:20:00.000Z | 10m 0s | approved |",
      "| attest (1) | complete (manual) | 2026-09-29T10:10:00.000Z | " +
      "2026-09-29T10:20:00.000Z | 10m 0s | cleared |",
    ]
  ) {
    assert(markdown.includes(expected), `missing ${expected}\n${markdown}`);
  }
  assert(!markdown.includes("| merge (1) | complete"), markdown);
});

Deno.test("summary: the same run always renders the same summary", async () => {
  const { swamp } = await reviewed();
  const run = await loadRun(contextStore(swamp.context(ITEM)));
  assert(run !== null);
  assertEquals(
    buildSummary(run, stopsParsedDefinition()),
    buildSummary(structuredClone(run), stopsParsedDefinition()),
  );
});

Deno.test("formatDuration: seconds, minutes and hours; none is a dash", () => {
  assertEquals(formatDuration(null), "–");
  assertEquals(formatDuration(4_000), "4s");
  assertEquals(formatDuration(65_000), "1m 5s");
  assertEquals(formatDuration(3_723_000), "1h 2m 3s");
});
