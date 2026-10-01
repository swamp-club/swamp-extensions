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
  DESIGN_PAGE_NAME,
  DESIGN_PAGE_SPEC,
  FACTORY_TYPE,
  freshKey,
  generateKey,
  keySlug,
} from "../_lib/engine/work_item_ops.ts";

const BUILD = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/build-swamp-extension.yaml",
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
      "@swamp/gatorwalk-factory/tracker instance",
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
      "create it with swamp model create @swamp/gatorwalk-factory/tracker board",
  );
});

Deno.test("factory: validate refuses a tracker of another kind than the definition's", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("board", {
    globalArguments: {},
    type: "@swamp/gatorwalk-factory/linear",
  });
  const definition = await buildDefinition();
  definition.tracker = { kind: "swamp-club" };
  swamp.factory("team", definition, { tracker: "board" });
  await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context("team")),
    Error,
    "factory 'team' has a definition for a swamp-club tracker, which is a " +
      "@swamp/gatorwalk-factory/swamp-club, but its tracker 'board' is a " +
      "@swamp/gatorwalk-factory/linear",
  );
});

Deno.test("factory: validate reports a valid definition", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "definition 'build-swamp-extension' in factory 'team' is valid: 8 stages",
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
      "stages.0.transitions.1 (from stage 'plan'): transition 'shortcut' (to 'code-review') can never pass",
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
  swamp.factory("team", { schemaVersion: 1, name: "wide", stages });
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

Deno.test("factory: design_page stores the definition as an HTML page", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  const out = await factory.methods.design_page.execute(
    {},
    swamp.context("team"),
  );
  assertEquals(out.dataHandles.length, 1);
  const pages = swamp.files.get("team")?.get(
    `${DESIGN_PAGE_SPEC}/${DESIGN_PAGE_NAME}`,
  );
  assertEquals(pages?.length, 1);
  const html = pages?.[0] ?? "";
  assert(html.startsWith("<!doctype html>"));
  assert(html.includes("<h1>build-swamp-extension</h1>"));
  assertEquals(factory.files[DESIGN_PAGE_SPEC].contentType, "text/html");
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "design page for definition 'build-swamp-extension' in 'team': 8 stages, 0 error(s), 2 warning(s)",
    ),
    summary,
  );
});

Deno.test("factory: design_page renders a definition whose graph has errors", async () => {
  const swamp = fakeSwamp();
  const definition = await buildDefinition();
  const stages = definition.stages as { transitions: unknown[] }[];
  // The same unpassable shortcut validate fails on.
  stages[0].transitions.push({
    name: "shortcut",
    to: "code-review",
    gates: [{ type: "evidence-recorded", config: { name: "checks" } }],
  });
  swamp.factory("team", definition);
  await factory.methods.design_page.execute({}, swamp.context("team"));
  const html =
    swamp.files.get("team")?.get(`${DESIGN_PAGE_SPEC}/${DESIGN_PAGE_NAME}`)
      ?.[0] ??
      "";
  assert(html.includes("gate-never-passes"), "the error is on the page");
  assert(html.includes("1 error(s), 2 warning(s)"));
  assertEquals(swamp.logs.at(-1)?.props?.errors, 1);
});

Deno.test("factory: design_page fails with every schema error, writing nothing", async () => {
  const swamp = fakeSwamp();
  const definition = await buildDefinition();
  const stages = definition.stages as { transitions: unknown[] }[];
  stages[1].transitions.push({ name: "nowhere", to: "missing" });
  stages[2].transitions.push({ name: "elsewhere", to: "absent" });
  swamp.factory("team", definition);
  const error = await assertRejects(() =>
    factory.methods.design_page.execute({}, swamp.context("team"))
  );
  const text = (error as Error).message;
  assert(
    text.includes(
      "factory 'team': globalArguments.definition is not a valid definition",
    ),
    text,
  );
  assert(text.includes("targets unknown stage 'missing'"), text);
  assert(text.includes("targets unknown stage 'absent'"), text);
  assertEquals(swamp.files.size, 0);
});

Deno.test("factory: new_key logs and records an unused key for this factory", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  const output = await factory.methods.new_key.execute(
    factory.methods.new_key.arguments.parse({
      title: "Add JSON output to status",
    }),
    swamp.context("team"),
  );
  const key = String(swamp.logs.at(-1)?.props?.key);
  assertMatch(
    key,
    /^build-swamp-extension-add-json-output-status-[a-z2-7]{4}$/,
  );
  // The key is also recorded, for programs that read --json output.
  assertEquals(swamp.resources.get("team")?.get("key"), [{ key }]);
  assertEquals(output.dataHandles, [{ version: 1 }]);
  assert(!swamp.definitions.has(key));
  assert(
    String(swamp.logs.at(-1)?.props?.next).includes(
      `run start ${key} --input factory=team`,
    ),
  );
});

Deno.test("factory: new_key needs a title", () => {
  assert(!factory.methods.new_key.arguments.safeParse({}).success);
  assert(!factory.methods.new_key.arguments.safeParse({ title: "" }).success);
});

Deno.test("keySlug: punctuation and separators become single hyphens", () => {
  assertEquals(
    keySlug("  Fix: status's --json output (again)!  ", 58),
    "fix-status-s-json-output-again",
  );
  assertEquals(keySlug("v2.0 / API_v3", 58), "v2-0-api-v3");
});

Deno.test("keySlug: accents are removed and other scripts dropped", () => {
  assertEquals(keySlug("Café crème brûlée", 58), "cafe-creme-brulee");
  assertEquals(keySlug("Straße 日本語 report", 58), "stra-e-report");
});

Deno.test("keySlug: a title with nothing sluggable is refused", () => {
  for (const title of ["日本語", "!!! ---", "   "]) {
    assertThrows(
      () => keySlug(title, 58),
      Error,
      "has no letters or digits to make a key from",
    );
  }
});

Deno.test("keySlug: stop words are dropped, unless nothing else is left", () => {
  assertEquals(
    keySlug("Add the JSON output to the status of a run", 58),
    "add-json-output-status-run",
  );
  assertEquals(keySlug("To be or not to be", 58), "not");
  assertEquals(keySlug("To be or to be", 58), "to-be-or-to-be");
});

Deno.test("keySlug: a display id leads and keeps every word", () => {
  assertEquals(
    keySlug("Drive a Lab issue", 58, "#2734"),
    "2734-drive-lab-issue",
  );
  assertEquals(keySlug("Fix the build", 58, "OR-12"), "or-12-fix-build");
  // The id alone is enough when the title slugs to nothing.
  assertEquals(keySlug("日本語", 58, "#7"), "7");
});

Deno.test("keySlug: a long title is cut at a word boundary", () => {
  const title = "Implement retries with exponential backoff for every " +
    "outbound HTTP call the tracker adapters make";
  const slug = keySlug(title, 30);
  assertEquals(slug, "implement-retries-exponential");
  assert(slug.length <= 30);
  // A first word longer than the budget is cut mid-word.
  assertEquals(keySlug("Supercalifragilistic", 5), "super");
});

Deno.test("generateKey: fits swamp's instance-name rules with a long definition name", () => {
  const title = "Implement retries with exponential backoff for every call";
  for (const definition of ["team", "x".repeat(50), "x".repeat(80)]) {
    const key = generateKey(definition, title);
    assert(key.length <= 64, key);
    assertMatch(key, /^[a-z0-9][a-z0-9_-]*$/);
    assertMatch(key, /-[a-z2-7]{4}$/);
  }
  // The factory definition name stays whole when it fits.
  assertMatch(
    generateKey("team", title),
    /^team-implement-retries-exponential-backoff-every-call-[a-z2-7]{4}$/,
  );
  // An 80-character name is cut to 55, leaving 3 characters of slug.
  assertMatch(generateKey("x".repeat(80), title), /^x{55}-imp-[a-z2-7]{4}$/);
  // A cut name never ends in a separator, so none doubles.
  assertMatch(
    generateKey(`${"x".repeat(54)}-${"y".repeat(10)}`, title),
    /^x{54}-impl-[a-z2-7]{4}$/,
  );
});

Deno.test("freshKey: retries a key another definition has, and gives up after five", async () => {
  const seen: string[] = [];
  const takenFirst = (taken: number) => ({
    definitionRepository: {
      findByNameGlobal: (name: string) => {
        seen.push(name);
        return Promise.resolve(
          seen.length <= taken ? { definition: {}, type: "x" } : null,
        );
      },
    },
  });
  const key = await freshKey(takenFirst(2), "team", "Fix the build");
  assertEquals(seen.length, 3);
  assertEquals(key, seen[2]);
  assertMatch(key, /^team-fix-build-[a-z2-7]{4}$/);

  seen.length = 0;
  await assertRejects(
    () => freshKey(takenFirst(5), "team", "Fix the build"),
    Error,
    "could not find a free work-item key",
  );
  assertEquals(seen.length, 5);
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

Deno.test("factory: has no init method; the skill writes the definition in", () => {
  assertEquals(Object.keys(factory.methods).sort(), [
    "design_page",
    "new_key",
    "validate",
  ]);
});

Deno.test("generateKey: a title with no ASCII letters is refused, unless a bare key is allowed", () => {
  assertThrows(
    () => generateKey("build", "🔥🔥"),
    Error,
    "no letters or digits",
  );
  assertMatch(
    generateKey("2800", "🔥🔥", "", { allowBare: true }),
    /^2800-[a-z2-7]{4}$/,
  );
  // A title with words keeps its slug either way.
  assertMatch(
    generateKey("2800", "Fix login", "", { allowBare: true }),
    /^2800-fix-login-[a-z2-7]{4}$/,
  );
});
