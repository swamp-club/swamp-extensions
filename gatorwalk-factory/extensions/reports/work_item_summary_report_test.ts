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
import { report, type ReportContext } from "./work_item_summary_report.ts";
import { model } from "../models/engine/work_item.ts";
import { type FakeSwamp, fakeSwamp } from "../models/_lib/engine/fake_swamp.ts";
import {
  settableEnv,
  stopsDefinition,
} from "../models/_lib/engine/test_support.ts";
import {
  advanceMethod,
  describeStatus,
  recordProductMethod,
  startWorkItem,
  summary,
  WORK_ITEM_TYPE,
} from "../models/_lib/engine/work_item_ops.ts";

const ITEM = "stops-abcdefgh";

/** A work item waiting in review, driven through the work-item operations. */
async function inReview(): Promise<FakeSwamp> {
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
  await startWorkItem(ctx(), { factory: "team" }, env);
  env.at("2026-09-29T10:10:00.000Z");
  await recordProductMethod(
    ctx(),
    "artifact",
    { name: "plan", payload: { text: "the plan" }, ...await expected() },
    env,
  );
  await advanceMethod(
    ctx(),
    { transition: "submit", ...await expected() },
    env,
  );
  await summary(ctx(), env);
  return swamp;
}

/** A report context over the fake's stored records, as swamp builds it. */
function contextFor(
  swamp: FakeSwamp,
  overrides: Partial<ReportContext> = {},
): ReportContext {
  return {
    modelType: { raw: WORK_ITEM_TYPE, normalized: WORK_ITEM_TYPE },
    modelId: "id-1",
    methodName: "summary",
    executionStatus: "succeeded",
    definition: { name: ITEM },
    dataRepository: {
      getContent: (_type, _modelId, name, version) => {
        const versions = swamp.resources.get(ITEM)?.get(name) ?? [];
        const value = versions[(version ?? versions.length) - 1];
        return Promise.resolve(
          value === undefined
            ? null
            : new TextEncoder().encode(JSON.stringify(value)),
        );
      },
    },
    ...overrides,
  };
}

Deno.test("report: the work-item model runs it by default", () => {
  assertEquals(model.reports, [report.name]);
  assertEquals(report.scope, "method");
});

Deno.test("report: renders what the summary method logs, and the stored metrics", async () => {
  const swamp = await inReview();
  const result = await report.execute(contextFor(swamp));
  assertEquals(result.markdown, swamp.logs.at(-1)?.props?.summary);
  const stored = swamp.resources.get(ITEM)?.get("metrics")?.at(-1);
  const metrics = result.json.metrics as { journalVersion: number };
  // The same journal version, so the same metrics.
  assertEquals(metrics.journalVersion, stored?.journalVersion);
  assertEquals(metrics, stored);
  assert(Array.isArray(result.json.timeline));
});

Deno.test("report: other methods and other model types render nothing", async () => {
  const swamp = await inReview();
  assertEquals(
    await report.execute(contextFor(swamp, { methodName: "status" })),
    { markdown: "", json: {} },
  );
  assertEquals(
    await report.execute(
      contextFor(swamp, { modelType: "@swamp/gatorwalk-factory/factory" }),
    ),
    { markdown: "", json: {} },
  );
});

Deno.test("report: a failed summary persists its reason", async () => {
  const swamp = await inReview();
  const result = await report.execute(
    contextFor(swamp, {
      executionStatus: "failed",
      errorMessage: "the work item has not started",
    }),
  );
  assert(
    result.markdown.includes("_Summary failed: the work item has not started_"),
  );
  assertEquals(result.json, {
    workItem: ITEM,
    error: "the work item has not started",
  });
});
