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
import { findPlaceholders, instantiatePlugin } from "./plugin_instance.ts";

const REVIEW_PLAN = new URL(
  "../../../testdata/plugins/review-plan.yaml",
  import.meta.url,
);

async function reviewPlan(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(REVIEW_PLAN)) as Record<
    string,
    unknown
  >;
}

function errorsOf(result: ReturnType<typeof instantiatePlugin>): string[] {
  return result.ok ? [] : result.errors;
}

function assertMentions(errors: string[], ...needles: string[]) {
  for (const needle of needles) {
    assert(
      errors.some((e) => e.includes(needle)),
      `expected an error mentioning ${JSON.stringify(needle)} in:\n${
        errors.join("\n")
      }`,
    );
  }
}

Deno.test("placeholders: found with their paths; an object with other keys is not one", () => {
  assertEquals(
    findPlaceholders({
      a: { $param: "x" },
      b: [{ c: { $param: "y" } }],
      d: { $param: "z", other: 1 },
      e: { $param: 3 },
    }),
    [{ name: "x", path: ["a"] }, { name: "y", path: ["b", 0, "c"] }],
  );
});

Deno.test("instantiate: defaults fill every placeholder", async () => {
  const result = instantiatePlugin(await reviewPlan());
  assert(result.ok, errorsOf(result).join("\n"));
  const stage = result.plugin.stages[0];
  assertEquals(stage.work?.skills, ["adversarial-review"]);
  assertEquals(stage.transitions?.[0].gates?.[1], {
    type: "findings-clear",
    config: { artifact: "plan-review", blocking: ["critical", "high"] },
  });
  assertEquals(result.params, {
    skills: ["adversarial-review"],
    blocking: ["critical", "high"],
  });
});

Deno.test("instantiate: given values replace defaults, whole", async () => {
  const result = instantiatePlugin(await reviewPlan(), {
    blocking: ["critical"],
  });
  assert(result.ok, errorsOf(result).join("\n"));
  const gate = result.plugin.stages[0].transitions?.[0].gates?.[1];
  assertEquals(gate?.type === "findings-clear" && gate.config.blocking, [
    "critical",
  ]);
  assertEquals(result.plugin.stages[0].work?.skills, ["adversarial-review"]);
});

Deno.test("instantiate: values are checked against the parameters schema", async () => {
  const errors = errorsOf(
    instantiatePlugin(await reviewPlan(), {
      blocking: ["urgent"],
      reviewer: "bob",
    }),
  );
  assertMentions(errors, "params.blocking.0", "params");
  assert(errors.some((e) => e.includes("reviewer")), errors.join("\n"));
});

Deno.test("instantiate: a placeholder must name a declared parameter, outside the contract", async () => {
  const doc = await reviewPlan();
  const stages = doc.stages as { work: Record<string, unknown> }[];
  stages[0].work.constraints = { $param: "tone" };
  const contract = doc.contract as { exits: unknown[] };
  contract.exits.push({ name: { $param: "skills" } });
  assertMentions(
    errorsOf(instantiatePlugin(doc)),
    "stages.0.work.constraints: $param 'tone' is not a parameter the contract declares (skills, blocking)",
    "contract.exits.2.name: a parameter cannot be used in the contract",
  );
});

Deno.test("instantiate: a used parameter with no value and no default is an error", async () => {
  const doc = await reviewPlan();
  const parameters = (doc.contract as { parameters: Record<string, unknown> })
    .parameters;
  delete (parameters.properties as { skills: { default?: unknown } }).skills
    .default;
  assertMentions(
    errorsOf(instantiatePlugin(doc)),
    "stages.0.work.skills: parameter 'skills' has no value and no default",
  );
});

Deno.test("instantiate: values for a plugin without parameters are refused", async () => {
  const doc = await reviewPlan();
  delete (doc.contract as Record<string, unknown>).parameters;
  const stages = doc.stages as {
    work: Record<string, unknown>;
    transitions: { gates: { config: Record<string, unknown> }[] }[];
  }[];
  stages[0].work.skills = ["adversarial-review"];
  stages[0].transitions[0].gates[1].config.blocking = ["critical"];
  assert(instantiatePlugin(doc).ok);
  assertMentions(
    errorsOf(instantiatePlugin(doc, { skills: ["x"] })),
    "params: the plugin declares no parameters",
  );
});

Deno.test("instantiate: an invalid parameters schema reports only its own errors", async () => {
  const doc = await reviewPlan();
  (doc.contract as Record<string, unknown>).parameters = { type: "array" };
  const errors = errorsOf(instantiatePlugin(doc));
  assert(errors.length > 0);
  assert(
    errors.every((e) => e.startsWith("contract.parameters")),
    errors.join("\n"),
  );
});

Deno.test("instantiate: the filled-in document must be a valid plugin", async () => {
  const errors = errorsOf(
    instantiatePlugin(await reviewPlan(), { skills: [] }),
  );
  assertMentions(errors, "params.skills");
  const doc = await reviewPlan();
  const properties = (doc.contract as {
    parameters: { properties: Record<string, Record<string, unknown>> };
  }).parameters.properties;
  // The parameter schema allows a value the plugin schema does not.
  properties.skills = { type: "string", default: "one" };
  assertMentions(errorsOf(instantiatePlugin(doc)), "stages.0.work.skills");
});

Deno.test("instantiate: an object that looks like a placeholder but is not one is an error", async () => {
  const doc = await reviewPlan();
  const stages = doc.stages as { work: Record<string, unknown> }[];
  stages[0].work.mode = "workflow";
  stages[0].work.workflow = {
    name: "review",
    inputs: {
      depth: { $param: 3 },
      tone: { $param: "skills", default: "calm" },
      // A property of this name in user data is not a placeholder.
      schema: { properties: { $param: { type: "string" } } },
    },
  };
  delete stages[0].work.skills;
  const errors = errorsOf(instantiatePlugin(doc));
  assertMentions(
    errors,
    "stages.0.work.workflow.inputs.depth: a parameter placeholder is { $param: <name> }",
    "stages.0.work.workflow.inputs.tone: a parameter placeholder is",
  );
  assert(
    !errors.some((e) => e.includes("inputs.schema")),
    errors.join("\n"),
  );
});
