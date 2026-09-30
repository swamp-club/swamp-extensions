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
import { STARTERS } from "../_lib/engine/starters.ts";
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

async function buildDefinition(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(BUILD)) as Record<string, unknown>;
}

Deno.test("factory: the globalArguments schema survives swamp's .partial() and takes a definition path", () => {
  // swamp validates globalArguments with schema.partial() on every run; zod
  // throws on .partial() of a refined schema. This guards against adding one.
  const partial = FactoryArgumentsSchema.partial();
  const args = { definition: "factories/team.yaml" };
  assert(partial.safeParse(args).success);
  assert(FactoryArgumentsSchema.safeParse(args).success);
  assertFalse(FactoryArgumentsSchema.safeParse({ definition: "" }).success);
});

Deno.test("factory: validate reports a valid definition", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", await buildDefinition());
  await factory.methods.validate.execute({}, swamp.context("team"));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "definition 'build-swamp-extension' in factories/team.yaml is valid: 8 stages",
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
  assert(String(swamp.logs.at(-1)?.props?.summary).endsWith("2 warning(s)"));
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
  const error = await assertRejects(() =>
    factory.methods.validate.execute({}, swamp.context("team"))
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
  const error = await assertRejects(() =>
    factory.methods.validate.execute({}, swamp.context("team"))
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
  const error = await assertRejects(() =>
    factory.methods.validate.execute({}, swamp.context("team"))
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
      "factory 'team' (factories/team.yaml) is not a valid definition",
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

Deno.test("factory: init copies a starter to the definition file, then validate reads it", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: { definition: "factories/team.yaml" },
    type: FACTORY_TYPE,
  });
  await factory.methods.init.execute(
    { from: "starter" },
    swamp.context("team"),
  );
  assertEquals(swamp.repo.read("factories/team.yaml"), STARTERS.starter);
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "wrote the 'starter' starter to factories/team.yaml for factory 'team'",
    ),
    summary,
  );
  await factory.methods.validate.execute({}, swamp.context("team"));
  assert(
    String(swamp.logs.at(-1)?.props?.summary).startsWith(
      "definition 'starter' in factories/team.yaml is valid",
    ),
  );
});

Deno.test("factory: init never overwrites, and refuses an unknown starter", async () => {
  const swamp = fakeSwamp();
  swamp.factory("team", "name: mine\n");
  await assertRejects(
    () =>
      factory.methods.init.execute({ from: "minimal" }, swamp.context("team")),
    Error,
    "factory 'team': definition file 'factories/team.yaml' already exists",
  );
  assertEquals(swamp.repo.read("factories/team.yaml"), "name: mine\n");
  await assertRejects(
    () => factory.methods.init.execute({ from: "nope" }, swamp.context("team")),
    Error,
    "no starter named 'nope'; the starters are build-swamp-extension, minimal",
  );
  assertFalse(
    factory.methods.init.arguments.safeParse({ from: "nope" }).success,
  );
  await assertRejects(
    () =>
      factory.methods.init.execute(
        { from: "toString" },
        swamp.context("team"),
      ),
    Error,
    "no starter named 'toString'",
  );
});

Deno.test("factory: init offers every example as a starter", () => {
  assertEquals(Object.keys(STARTERS), [
    "build-swamp-extension",
    "minimal",
    "starter",
    "swamp-club-swamp-extensions",
  ]);
});
