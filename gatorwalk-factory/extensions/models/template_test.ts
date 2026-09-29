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

import { assert, assertRejects } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import {
  model as templateHolder,
  StageTemplateArgumentsSchema,
} from "./template.ts";
import { fakeSwamp } from "./_lib/fake_swamp.ts";
import { HOLDER_TYPE, STAGE_TEMPLATE_TYPE } from "./_lib/work_item_ops.ts";

const REVIEW_PLAN = new URL(
  "../../templates/review-plan.yaml",
  import.meta.url,
);

async function reviewPlan(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(REVIEW_PLAN)) as Record<
    string,
    unknown
  >;
}

Deno.test("template holder: the globalArguments schema survives swamp's .partial() and accepts a stage template with placeholders", async () => {
  const doc = await reviewPlan();
  assert(StageTemplateArgumentsSchema.partial().safeParse(doc).success);
  assert(StageTemplateArgumentsSchema.safeParse(doc).success);
});

Deno.test("template holder: validate fills in defaults and reports a valid stage template", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("review", {
    globalArguments: await reviewPlan(),
    type: STAGE_TEMPLATE_TYPE,
  });
  await templateHolder.methods.validate.execute({}, swamp.context("review"));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "stage template 'review-plan' in 'review' is valid: 1 stages (plan-review), exits approved, rework",
    ),
    summary,
  );
});

Deno.test("template holder: validate checks given parameters, from JSON", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("review", {
    globalArguments: await reviewPlan(),
    type: STAGE_TEMPLATE_TYPE,
  });
  await templateHolder.methods.validate.execute(
    { params: '{"blocking":["critical"]}' },
    swamp.context("review"),
  );
  const error = await assertRejects(() =>
    templateHolder.methods.validate.execute(
      { params: { blocking: ["urgent"] } },
      swamp.context("review"),
    )
  );
  const text = (error as Error).message;
  assert(
    text.includes(
      "template holder 'review' is not a valid stage template with these parameters:",
    ),
    text,
  );
  assert(text.includes("params.blocking.0"), text);
  await assertRejects(
    () =>
      templateHolder.methods.validate.execute(
        { params: "{not json" },
        swamp.context("review"),
      ),
    Error,
    "params is not valid JSON",
  );
});

Deno.test("template holder: validate fails on a graph error", async () => {
  const swamp = fakeSwamp();
  const doc = await reviewPlan();
  (doc.stages as unknown[]).push({
    id: "orphan",
    transitions: [{ name: "out", exit: "approved" }],
  });
  swamp.definitions.set("review", {
    globalArguments: doc,
    type: STAGE_TEMPLATE_TYPE,
  });
  await assertRejects(
    () => templateHolder.methods.validate.execute({}, swamp.context("review")),
    Error,
    "stages.1 (from stage 'orphan'): stage 'orphan' can never be entered",
  );
});

Deno.test("template holder: validate refuses a lifecycle holder", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("review", {
    globalArguments: await reviewPlan(),
    type: HOLDER_TYPE,
  });
  await assertRejects(
    () => templateHolder.methods.validate.execute({}, swamp.context("review")),
    Error,
    `'review' is a ${HOLDER_TYPE}, not a template holder (${STAGE_TEMPLATE_TYPE})`,
  );
});

Deno.test("template holder: the model's literal type is STAGE_TEMPLATE_TYPE", () => {
  assert(templateHolder.type === STAGE_TEMPLATE_TYPE);
});
