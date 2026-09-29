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

import { assert, assertEquals, assertMatch, assertRejects } from "@std/assert";
import { parse as parseYaml } from "@std/yaml";
import { HolderArgumentsSchema, model as holder } from "./lifecycle.ts";
import { fakeSwamp } from "./_lib/fake_swamp.ts";
import {
  EJECTED_NAME,
  generateKey,
  HOLDER_TYPE,
  PLUGIN_TYPE,
} from "./_lib/work_item_ops.ts";
import { digestOf } from "./_lib/canonical.ts";
import { parseLifecycle } from "./_lib/lifecycle_schema.ts";

const BUILD = new URL(
  "../../lifecycles/build-swamp-extension.yaml",
  import.meta.url,
);

const TESTDATA = new URL("../../testdata/", import.meta.url);

async function testdata(path: string): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(new URL(path, TESTDATA))) as Record<
    string,
    unknown
  >;
}

async function buildLifecycle(): Promise<Record<string, unknown>> {
  return parseYaml(await Deno.readTextFile(BUILD)) as Record<string, unknown>;
}

Deno.test("holder: the globalArguments schema survives swamp's .partial() and accepts a lifecycle", async () => {
  // swamp validates globalArguments with schema.partial() on every run; zod
  // throws on .partial() of a refined schema. This guards against adding one.
  const partial = HolderArgumentsSchema.partial();
  const lifecycle = await buildLifecycle();
  assert(partial.safeParse(lifecycle).success);
  assert(HolderArgumentsSchema.safeParse(lifecycle).success);
});

Deno.test("holder: validate reports a valid lifecycle", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildLifecycle(),
    type: HOLDER_TYPE,
  });
  await holder.methods.validate.execute({}, swamp.context("team"));
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "lifecycle 'build-swamp-extension' in 'team' is valid: 8 stages",
    ),
    summary,
  );
});

Deno.test("holder: validate logs each graph warning", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildLifecycle(),
    type: HOLDER_TYPE,
  });
  await holder.methods.validate.execute({}, swamp.context("team"));
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

Deno.test("holder: validate fails on a graph error, listing it with its path", async () => {
  const swamp = fakeSwamp();
  const lifecycle = await buildLifecycle();
  const stages = lifecycle.stages as { transitions: unknown[] }[];
  // checks is recorded by the check stage, so plan can never see it.
  stages[0].transitions.push({
    name: "shortcut",
    to: "code-review",
    gates: [{ type: "evidence-recorded", config: { name: "checks" } }],
  });
  swamp.definitions.set("team", {
    globalArguments: lifecycle,
    type: HOLDER_TYPE,
  });
  const error = await assertRejects(() =>
    holder.methods.validate.execute({}, swamp.context("team"))
  );
  const text = (error as Error).message;
  assert(text.includes("lifecycle holder 'team' has design errors:"), text);
  assert(
    text.includes(
      "stages.0.transitions.1 (from stage 'plan'): transition 'shortcut' (to 'code-review') can never pass",
    ),
    text,
  );
  assert(text.includes("warnings:\nstages.0 (from stage 'plan')"), text);
});

Deno.test("holder: validate fails when the graph analysis stops at the state cap", async () => {
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
  swamp.definitions.set("team", {
    globalArguments: { schemaVersion: 1, name: "wide", stages },
    type: HOLDER_TYPE,
  });
  const error = await assertRejects(() =>
    holder.methods.validate.execute({}, swamp.context("team"))
  );
  const text = (error as Error).message;
  assert(
    text.includes(
      "lifecycle holder 'team' could not be checked in full: the graph analysis stopped at its cap of 100000 states",
    ),
    text,
  );
  assert(text.includes("the structural pass stopped at 100000 states"), text);
  assertMatch(text, /stages\.15[^\n]*: stage 'orphan'/);
  assert(!swamp.logs.some((l) => l.message === "{summary}"));
});

Deno.test("holder: validate reads the raw definition, so a platform expression gets the schema's own error", async () => {
  const swamp = fakeSwamp();
  const lifecycle = await buildLifecycle();
  const stages = lifecycle.stages as {
    work: Record<string, unknown>;
    transitions: unknown[];
  }[];
  stages[0].work.systemPrompt = "Plan ${{ model.x }}";
  stages[1].transitions.push({ name: "nowhere", to: "missing" });
  swamp.definitions.set("team", {
    globalArguments: lifecycle,
    type: HOLDER_TYPE,
  });
  const error = await assertRejects(() =>
    holder.methods.validate.execute({}, swamp.context("team"))
  );
  const text = (error as Error).message;
  assert(text.includes("stages.0.work.systemPrompt: contains ${{ }}"), text);
  assert(text.includes("targets unknown stage 'missing'"), text);
});

Deno.test("holder: new_key logs and records an unused key for this lifecycle", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildLifecycle(),
    type: HOLDER_TYPE,
  });
  const output = await holder.methods.new_key.execute(
    {},
    swamp.context("team"),
  );
  const key = String(swamp.logs.at(-1)?.props?.key);
  assertMatch(key, /^build-swamp-extension-[a-z2-7]{8}$/);
  // The key is also recorded, for programs that read --json output.
  assertEquals(swamp.resources.get("team")?.get("key"), [{ key }]);
  assertEquals(output.dataHandles, [{ version: 1 }]);
  assert(!swamp.definitions.has(key));
  assert(
    String(swamp.logs.at(-1)?.props?.next).includes(
      `run start ${key} --input lifecycle=team`,
    ),
  );
});

Deno.test("generateKey: fits swamp's instance-name rules", () => {
  const key = generateKey("x".repeat(80));
  assert(key.length <= 64);
  assertMatch(key, /^[a-z0-9][a-z0-9_-]*$/);
});

Deno.test("holder: validate refuses a definition of another type", async () => {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await buildLifecycle(),
    type: "@acme/other",
  });
  await assertRejects(
    () => holder.methods.validate.execute({}, swamp.context("team")),
    Error,
    "is a @acme/other, not a lifecycle holder",
  );
});

Deno.test("holder: the model's literal type is HOLDER_TYPE", () => {
  // swamp reads `type` from the source as a string literal, so it cannot be
  // the constant itself; this keeps the two in step.
  assert(holder.type === HOLDER_TYPE);
});

// --- eject ------------------------------------------------------------------------

async function ejectSwamp() {
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: await testdata("lifecycles/eject-target.yaml"),
    type: HOLDER_TYPE,
  });
  swamp.definitions.set("review-plan", {
    globalArguments: await testdata("plugins/review-plan.yaml"),
    type: PLUGIN_TYPE,
  });
  return swamp;
}

Deno.test("holder: eject writes the composed lifecycle as a record and logs it, leaving the holder alone", async () => {
  const swamp = await ejectSwamp();
  const before = structuredClone(swamp.definitions.get("team"));
  const out = await holder.methods.eject.execute(
    {
      plugin: "review-plan",
      replace: "review",
      params: '{"blocking":["critical"]}',
      names: { stages: { review: "plan-review" } },
    },
    swamp.context("team"),
  );
  assertEquals(out.dataHandles.length, 1);
  assertEquals(swamp.definitions.get("team"), before);
  const record = swamp.resources.get("team")?.get(EJECTED_NAME)?.[0];
  assert(record !== undefined);
  assertEquals(record.holder, "team");
  assertEquals(record.plugin, "review-plan");
  const parsed = parseLifecycle(record.lifecycle);
  assert(parsed.ok, parsed.ok ? "" : parsed.errors.join("\n"));
  assertEquals(record.digest, await digestOf(parsed.value));
  assertEquals(parsed.value.stages.map((s) => s.id), [
    "plan",
    "plan-review",
    "implement",
    "done",
  ]);
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  assert(
    summary.startsWith(
      "ejected plugin 'review-plan' from 'review-plan' into lifecycle 'plan-then-build' in place of stage 'review': 4 stages, 0 warning(s).",
    ),
    summary,
  );
  // The logged text is the same lifecycle, ready to paste.
  const logged = JSON.parse(summary.slice(summary.indexOf("\n{") + 1));
  assertEquals(logged, record.lifecycle);
});

Deno.test("holder: eject reports every error and writes nothing", async () => {
  const swamp = await ejectSwamp();
  const error = await assertRejects(() =>
    holder.methods.eject.execute(
      {
        plugin: "review-plan",
        replace: "review",
        exits: { rework: "nowhere" },
        names: '{"stages":{"nope":"x"}}',
      },
      swamp.context("team"),
    )
  );
  const text = (error as Error).message;
  assert(
    text.includes(
      "cannot eject plugin holder 'review-plan' into lifecycle holder 'team':",
    ),
    text,
  );
  assert(text.includes("names.stages.nope"), text);
  assert(text.includes("goes to 'nowhere'"), text);
  assertEquals(swamp.versionsWritten("team"), 0);
});

Deno.test("holder: eject checks its inputs' shape and the plugin holder's type", async () => {
  const swamp = await ejectSwamp();
  await assertRejects(
    () =>
      holder.methods.eject.execute(
        { plugin: "review-plan", replace: "review", exits: { rework: 3 } },
        swamp.context("team"),
      ),
    Error,
    "exits.rework",
  );
  await assertRejects(
    () =>
      holder.methods.eject.execute(
        { plugin: "team", replace: "review" },
        swamp.context("team"),
      ),
    Error,
    "not a plugin holder",
  );
});
