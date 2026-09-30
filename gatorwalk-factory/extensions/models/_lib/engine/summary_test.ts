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
import { fakeSwamp } from "./fake_swamp.ts";
import { contextStore, loadRun } from "./run_store.ts";
import { buildSummary, formatDuration } from "./summary.ts";
import {
  settableEnv,
  stopsDefinition,
  stopsParsedDefinition,
} from "./test_support.ts";
import {
  advanceMethod,
  decide,
  describeStatus,
  FACTORY_TYPE,
  recordProductMethod,
  startWorkItem,
  summary,
} from "./work_item_ops.ts";

const ITEM = "stops-abcdefgh";

async function reviewed() {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: stopsDefinition(),
    type: FACTORY_TYPE,
  });
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
  return { swamp, env, ctx };
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
