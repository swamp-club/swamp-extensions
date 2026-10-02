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

import {
  assert,
  assertEquals,
  assertFalse,
  assertMatch,
  assertRejects,
  assertThrows,
} from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { FactoryArgumentsSchema, model as factory } from "./factory.ts";
import { fakeSwamp } from "../_lib/engine/fake_swamp.ts";
import { z } from "npm:zod@4.3.6";
import {
  FACTORY_TYPE,
  nthKey,
  prefixProblem,
  ticketKeyBase,
  trackerPrefix,
} from "../_lib/engine/work_item_ops.ts";

const BUILD = new URL(
  "../../../.claude/skills/stagecraft/references/examples/build-swamp-extension.yaml",
  import.meta.url,
);

/** The build-swamp-extension example's definition block. */
async function buildDefinition(): Promise<Record<string, unknown>> {
  const example = parseYaml(await Deno.readTextFile(BUILD)) as {
    definition: Record<string, unknown>;
  };
  return example.definition;
}

Deno.test("factory: the globalArguments schema survives swamp's .partial() and takes a definition, a tracker and scenarios", async () => {
  // swamp validates globalArguments with schema.partial() before every
  // method; zod throws on .partial() of a refined top level, and swamp then
  // falls back to checking key by key. This guards against adding one.
  const partial = FactoryArgumentsSchema.partial();
  const definition = await buildDefinition();
  const args = { definition, tracker: "board", scenarios: [] };
  assert(partial.safeParse(args).success);
  assert(FactoryArgumentsSchema.safeParse(args).success);
  // Created with only its tracker, before the definition is written in.
  assert(FactoryArgumentsSchema.safeParse({ tracker: "board" }).success);
  assertFalse(FactoryArgumentsSchema.safeParse({ definition }).success);
  // partial() is shallow: a definition that is present is checked in full,
  // refinements included.
  const stages = structuredClone(definition.stages) as {
    transitions: unknown[];
  }[];
  stages[1].transitions.push({ name: "nowhere", to: "missing" });
  const bad = partial.safeParse({ definition: { ...definition, stages } });
  assertFalse(bad.success);
  assert(
    bad.error.issues.some((i) =>
      i.path[0] === "definition" && i.message.includes("'missing'")
    ),
    JSON.stringify(bad.error.issues),
  );
});

Deno.test("factory: definition and scenarios are marked as foreign template text", () => {
  // swamp's template scan reads this mark, so {{name}} placeholders neither
  // warn nor fail swamp model validate (foreign_template_fields.ts in swamp).
  const shape = FactoryArgumentsSchema.shape;
  for (const key of ["definition", "scenarios"] as const) {
    const meta = z.globalRegistry.get(shape[key]) as
      | { foreignTemplate?: boolean }
      | undefined;
    assertEquals(meta?.foreignTemplate, true, key);
  }
});

// --- the tracker binding -----------------------------------------------------

Deno.test("factory: validate names the tracker the factory is bound to", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  assertEquals(swamp.logs.at(-1)?.props?.tracker, {
    instance: "board",
    kind: "builtin",
  });
  assert(
    String(swamp.logs.at(-1)?.props?.summary).endsWith(
      "; tracker 'board' (builtin)",
    ),
  );
});

Deno.test("factory: validate refuses a factory that names no tracker", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), { tracker: null });
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "factory 'team' names no tracker: create a " +
      "@swamp/stagecraft/tracker instance",
  );
});

Deno.test("factory: validate refuses a tracker no model is named", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), { tracker: "board" });
  swamp.definitions.delete("board");
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "factory 'team' names tracker 'board', but no model is named 'board': " +
      "create it with swamp model create @swamp/stagecraft/tracker board",
  );
});

Deno.test("factory: validate refuses a tracker of another kind than the definition's", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("board", {
    globalArguments: {},
    type: "@swamp/stagecraft/linear",
  });
  const definition = await buildDefinition();
  definition.tracker = { kind: "swamp-club" };
  swamp.factory("team", definition, { tracker: "board" });
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "factory 'team' has a definition for a swamp-club tracker, which is a " +
      "@swamp/stagecraft/swamp-club, but its tracker 'board' is a " +
      "@swamp/stagecraft/linear",
  );
});

Deno.test("factory: validate reports a valid definition", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "factory 'team' is valid: 9 stages",
    ),
    summary,
  );
});

Deno.test("factory: validate logs each graph warning", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  const warnings = swamp.logs.filter((l) => l.message === "{warning}");
  assertEquals(
    warnings.map((l) => l.props?.code),
    ["default-cycle-bound", "default-cycle-bound"],
  );
  assert(
    String(warnings[0].props?.warning).startsWith(
      "stages.0 (from stage 'plan'): the loop through 'plan', 'plan-review'",
    ),
  );
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(", 2 warning(s), "),
  );
});

Deno.test("factory: validate warns about a way back with no description", async () => {
  const definition = await buildDefinition();
  const stages = definition.stages as {
    id: string;
    transitions?: { name: string; description?: string }[];
  }[];
  const review = stages.find((s) => s.id === "plan-review");
  const rework = review?.transitions?.find((t) => t.name === "rework");
  assert(rework !== undefined);
  delete rework.description;
  const swamp = fakeSwamp();
  swamp.factory("team", definition);
  await factory.methods.validate.execute({}, swamp.context("team"));
  const warnings = swamp.logs.filter((l) => l.message === "{warning}");
  assertEquals(warnings.map((l) => l.props?.code), [
    "default-cycle-bound",
    "undescribed-way-back",
    "default-cycle-bound",
  ]);
});

// --- saved scenarios ---------------------------------------------------------

const PLAN_TO_REVIEW = `scenario: plan-to-review
steps:
  - record: { artifact: plan }
    payload:
      summary: Add list
      steps: [{ description: Add list, files: [x.ts] }]
      testingStrategy: Unit tests
      versionBump: { needed: true, reason: New method }
  - move: submit
  - move: approve
    expect: { refused: "awaiting approval 'plan-approval'" }
  - expect: { stage: plan-review }
`;

/** The plan-to-review scenario, as data; `edit` changes its text first. */
function planToReview(edit: (text: string) => string = (t) => t): unknown {
  return parseYaml(edit(PLAN_TO_REVIEW));
}

Deno.test("factory: validate runs the saved scenarios and counts them in its summary", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), {
    scenarios: [planToReview()],
  });
  await factory.methods.validate.execute({}, swamp.context("team"));
  const passed = swamp.logs.filter((l) => l.message === "{scenario}");
  assertEquals(passed.map((l) => l.props?.scenario), [
    "scenarios.0 (plan-to-review): passed, 4 steps",
  ]);
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(
      ", 1 saved scenario(s) passed; ",
    ),
  );
});

Deno.test("factory: validate passes with no saved scenarios", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  assert(
    String(swamp.logs.at(-1)?.props?.summary).includes(
      ", 0 saved scenario(s) passed; ",
    ),
  );
});

Deno.test("factory: validate fails on an unexpected step, naming the scenario and step", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), {
    scenarios: [
      planToReview((t) =>
        t.replace("awaiting approval 'plan-approval'", "a different message")
      ),
    ],
  });
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
  );
  assertMatch(
    error.message,
    /1 of 1 saved scenario\(s\) failed:\nscenarios\.0 \(plan-to-review\) step 3 \(move approve\): expected a refusal mentioning "a different message", but it was refused for another reason: .*awaiting approval 'plan-approval'/,
  );
});

Deno.test("factory: validate fails on malformed scenarios, reporting each with its path", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), {
    scenarios: [
      planToReview(),
      parseYaml("scenario: b\nsteps:\n  - move: submit\n    wait: 5\n"),
      { scenario: "c", factory: "team", steps: [{ move: "submit" }] },
    ],
  });
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
  );
  assertEquals(
    error.message,
    "factory 'team' has saved scenarios that are not valid " +
      "(globalArguments.scenarios):\n" +
      "  scenarios.1.steps.0: a step has one verb, not move and wait\n" +
      '  scenarios.2: Unrecognized key: "factory"',
  );
});

Deno.test("factory: validate refuses two saved scenarios with one name", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition(), {
    scenarios: [planToReview(), planToReview()],
  });
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "  scenarios.1.scenario: another scenario is already named 'plan-to-review'",
  );
});

Deno.test("factory: validate fails on a graph error, listing it with its path", async () => {
  const swamp = fakeSwamp();
  const definition = await buildDefinition();
  const stages = definition.stages as { transitions: unknown[] }[];
  // checks is recorded by the check stage, so plan can never see it.
  stages[0].transitions.push({
    name: "shortcut",
    to: "code-review",
    gates: [{ type: "evidence-recorded", config: { name: "checks" } }],
  });
  swamp.factory("team", definition);
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
  );
  const text = (error as Error).message;
  assert(text.includes("factory 'team' has design errors:"), text);
  assert(
    text.includes(
      "stages.0.transitions.2 (from stage 'plan'): transition 'shortcut' (to 'code-review') can never pass",
    ),
    text,
  );
  assert(text.includes("warnings:\nstages.0 (from stage 'plan')"), text);
});

Deno.test("factory: validate fails when the graph analysis stops at the state cap", async () => {
  // 15 stages, each with a manual transition to every other and to done: the
  // structural pass meets 15 * 2^14 (stage, entered set) states, past the
  // default cap of 100,000. Nothing enters the orphan stage.
  const ids = Array.from({ length: 15 }, (_, i) => `s${i}`);
  const stages: Record<string, unknown>[] = ids.map((id, i) => ({
    id,
    ...(i === 0 ? { initial: true } : {}),
    maxCycles: 1,
    transitions: [...ids.filter((other) => other !== id), "done"].map(
      (to) => ({ name: `to-${to}`, to, manual: true }),
    ),
  }));
  stages.push(
    { id: "orphan", transitions: [{ name: "finish", to: "done" }] },
    { id: "done", terminal: true },
  );
  const swamp = fakeSwamp();
  swamp.factory("team", { schemaVersion: 1, stages });
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
  );
  const text = (error as Error).message;
  assert(
    text.includes(
      "factory 'team' could not be checked in full: the graph analysis stopped at its cap of 100000 states",
    ),
    text,
  );
  assert(text.includes("the structural pass stopped at 100000 states"), text);
  assertMatch(text, /stages\.15[^\n]*: stage 'orphan'/);
  assert(!swamp.logs.some((l) => l.message === "{summary}"));
});

Deno.test("factory: validate reads the raw definition, so a platform expression gets the schema's own error", async () => {
  const swamp = fakeSwamp();
  const definition = await buildDefinition();
  const stages = definition.stages as {
    work: Record<string, unknown>;
    transitions: unknown[];
  }[];
  stages[0].work.systemPrompt = "Plan ${{ model.x }}";
  stages[1].transitions.push({ name: "nowhere", to: "missing" });
  swamp.factory("team", definition);
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
  );
  const text = (error as Error).message;
  assert(text.includes("stages.0.work.systemPrompt: contains ${{ }}"), text);
  assert(text.includes("targets unknown stage 'missing'"), text);
});

Deno.test("trackerPrefix: the given prefix, a trailing '-' dropped, else the instance's name cut to 12", () => {
  assertEquals(trackerPrefix("blog", "board"), "blog");
  assertEquals(trackerPrefix("blog-", "board"), "blog");
  assertEquals(trackerPrefix(undefined, "board"), "board");
  assertEquals(trackerPrefix("", "board"), "board");
  // A name is made into a prefix: lowercase, other characters as '-', cut
  // to 12 with no trailing separator.
  assertEquals(trackerPrefix(undefined, "Team_Board"), "team-board");
  assertEquals(trackerPrefix(undefined, "engineering-tickets"), "engineering");
  assertThrows(
    () => trackerPrefix(undefined, "___"),
    Error,
    "has no letters or digits to make a prefix from",
  );
  assertThrows(() => trackerPrefix("Blog", "board"), Error, "lowercase");
  assertThrows(
    () => trackerPrefix("a".repeat(13), "board"),
    Error,
    "longer than 12",
  );
});

Deno.test("prefixProblem: lowercase letters, digits and '-', at most 12", () => {
  assertEquals(prefixProblem("blog"), null);
  assertEquals(prefixProblem("2026-ops"), null);
  assertEquals(prefixProblem("a".repeat(12)), null);
  for (const bad of ["", "-blog", "Blog", "blog_x", "a".repeat(13)]) {
    assert(prefixProblem(bad) !== null, bad);
  }
});

Deno.test("ticketKeyBase: a ticket's id as-is, lowercased; a bare number takes the prefix", () => {
  assertEquals(ticketKeyBase("ABC-12", "abc"), "abc-12");
  assertEquals(ticketKeyBase("ABC-12", "other"), "abc-12");
  assertEquals(ticketKeyBase("#2711", "lab"), "lab-2711");
  assertEquals(ticketKeyBase("2711", "lab"), "lab-2711");
  assertEquals(ticketKeyBase("blog-12", "blog"), "blog-12");
  // Other characters become single hyphens, none at either end.
  assertEquals(ticketKeyBase("  Ops/Infra.7 ", "x"), "ops-infra-7");
  assertEquals(ticketKeyBase("Café-3", "x"), "cafe-3");
  assertThrows(
    () => ticketKeyBase("###", "x"),
    Error,
    "has no letters or digits to make a key from",
  );
  // A longer id is cut to 64 characters, with no trailing separator.
  assertEquals(ticketKeyBase("a".repeat(70), "x"), "a".repeat(64));
  assertEquals(ticketKeyBase(`${"a".repeat(63)}-b`, "x"), "a".repeat(63));
});

Deno.test("nthKey: the base, then -n; a qualifier goes between, cut to fit 64", () => {
  assertEquals(nthKey("abc-12", 1), "abc-12");
  assertEquals(nthKey("abc-12", 2), "abc-12-2");
  assertEquals(nthKey("abc-12", 1, "linear"), "abc-12-linear");
  assertEquals(nthKey("abc-12", 3, "linear"), "abc-12-linear-3");
  // The qualifier is made key-safe.
  assertEquals(nthKey("abc-12", 1, "Team_Linear"), "abc-12-team-linear");
  // A long qualifier is cut so the key fits, with no trailing separator.
  const key = nthKey("x".repeat(50), 2, "linear-tracker-for-the-team");
  assertEquals(key, `${"x".repeat(50)}-linear-trac-2`);
  assert(key.length <= 64);
  // An old id that fills 64 characters is cut before the number or the
  // qualifier, never refused.
  const old = `cue-${"board-shortcuts-".repeat(3)}${"x".repeat(7)}-r2ne`;
  assertEquals(old.length, 64);
  assertEquals(nthKey(old, 1), old);
  assertEquals(nthKey(old, 2), `${old.slice(0, 62)}-2`);
  assertEquals(nthKey(old, 1, "linear"), old);
  assertEquals(nthKey("x".repeat(60), 1, "linear"), `${"x".repeat(60)}-lin`);
  for (const k of [nthKey(old, 12), nthKey(old, 3, "linear")]) {
    assert(k.length <= 64, k);
  }
});

Deno.test("factory: validate refuses a definition of another type", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildDefinition(),
    type: "@acme/other",
  });
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "is a @acme/other, not a factory",
  );
});

Deno.test("factory: the model's literal type is FACTORY_TYPE", () => {
  // swamp reads `type` from the source as a string literal, so it cannot be
  // the constant itself; this keeps the two in step.
  assert(factory.type === FACTORY_TYPE);
});

Deno.test("factory: validate refuses a factory with no definition yet, saying where to write one", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", undefined);
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "factory 'team' has no definition: write one under " +
      "globalArguments.definition in its model definition",
  );
});

Deno.test("factory: has no init or new_key method; the skill writes the definition in, and claim names work items", () => {
  assertEquals(Object.keys(factory.methods).sort(), ["validate"]);
});
