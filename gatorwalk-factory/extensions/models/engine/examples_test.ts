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
import { parse as parseYaml } from "@std/yaml";
import { model as factory } from "./factory.ts";
import { fakeSwamp } from "../_lib/engine/fake_swamp.ts";

// ---------------------------------------------------------------------------
// The example factory definitions the skill points agents at, under its
// references/examples/. Each must pass the factory's validate method, the
// check a person runs after copying one, so an example cannot rot. How each
// behaves is tested in factories_test.ts.
// ---------------------------------------------------------------------------

const EXAMPLES = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/",
  import.meta.url,
);

/**
 * Every example and the warnings validate logs for it, as
 * `code path (from stage 's')`. The rework loops of starter and
 * build-swamp-extension set no maxCycles and rely on the default cycle limit;
 * a person grants an override to go round again.
 */
const EXPECTED: Record<string, string[]> = {
  "build-swamp-extension.yaml": [
    "default-cycle-bound stages.0 (from stage 'plan')",
    "default-cycle-bound stages.2 (from stage 'implement')",
  ],
  "minimal.yaml": [],
  "starter.yaml": [
    "default-cycle-bound stages.0 (from stage 'plan')",
    "default-cycle-bound stages.2 (from stage 'implement')",
  ],
  "swamp-club-swamp-extensions.yaml": [],
};

async function examples(): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(EXAMPLES)) {
    if (entry.isFile && entry.name.endsWith(".yaml")) files.push(entry.name);
  }
  return files.sort();
}

Deno.test("examples: the set of examples is the one listed here", async () => {
  // A new example needs its expected warnings, and a review of whether it
  // belongs among the examples at all.
  assertEquals(await examples(), Object.keys(EXPECTED).sort());
});

/** Each example's saved scenarios, under scenarios/<example>/, by file name. */
async function scenariosOf(example: string): Promise<Map<string, string>> {
  const dir = new URL(`scenarios/${example}/`, EXAMPLES);
  const out = new Map<string, string>();
  try {
    for await (const entry of Deno.readDir(dir)) {
      if (entry.isFile && entry.name.endsWith(".yaml")) {
        out.set(entry.name, await Deno.readTextFile(new URL(entry.name, dir)));
      }
    }
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
  }
  return out;
}

/**
 * A fake repo holding an example as the factory named after it, with its
 * saved scenarios where validate finds them.
 */
async function exampleFactory(file: string) {
  const name = file.replace(/\.yaml$/, "");
  const swamp = fakeSwamp();
  // The example's text, as init would copy it.
  swamp.factory(name, await Deno.readTextFile(new URL(file, EXAMPLES)));
  const scenarios = await scenariosOf(name);
  for (const [scenario, text] of scenarios) {
    swamp.repo.write(`scenarios/${name}/${scenario}`, text);
  }
  return { swamp, name, scenarios };
}

Deno.test("examples: each passes the factory's validate method, with its saved scenarios and only the explained warnings", async () => {
  for (const file of await examples()) {
    const { swamp, name, scenarios } = await exampleFactory(file);
    // validate throws on a schema or graph error, a truncated analysis, or a
    // saved scenario with a step that did not do what it said.
    await factory.methods.validate.execute({}, swamp.context(name));
    const summary = String(swamp.logs.at(-1)?.props?.summary);
    assert(
      summary.includes(`' in factories/${name}.yaml is valid: `) &&
        summary.endsWith(`, ${scenarios.size} saved scenario(s) passed`),
      `${file}: ${summary}`,
    );
    const warnings = swamp.logs
      .filter((l) => l.message === "{warning}")
      .map((l) => `${l.props?.code} ${String(l.props?.warning).split(":")[0]}`);
    assertEquals(warnings, EXPECTED[file], file);
  }
});

Deno.test("examples: the scenarios directories are for examples, and every example but minimal has scenarios", async () => {
  const dirs: string[] = [];
  for await (const entry of Deno.readDir(new URL("scenarios/", EXAMPLES))) {
    if (entry.isDirectory) dirs.push(entry.name);
  }
  assertEquals(
    dirs.sort(),
    (await examples()).map((f) => f.replace(/\.yaml$/, ""))
      .filter((n) => n !== "minimal"),
  );
});

Deno.test("examples: a changed gate message fails validate, naming the scenario and step", async () => {
  const file = "swamp-club-swamp-extensions.yaml";
  const { swamp, name } = await exampleFactory(file);
  const path = `factories/${name}.yaml`;
  const text = swamp.repo.read(path);
  assert(text !== undefined);
  // conformance-review's conforms gate; bug-to-done pins its message.
  const gate = "message: >-\n                every step not implemented as " +
    "planned needs a justification";
  assert(text.includes(gate));
  const message = "needs a justification";
  swamp.repo.remove(path);
  swamp.repo.write(
    path,
    text.replace(gate, gate.replace(message, "needs a reason")),
  );
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context(name)),
    Error,
  );
  assert(
    error.message.includes(
      `scenarios/${name}/bug-to-done.yaml step 28 (move conforms): ` +
        `expected a refusal mentioning "${message}"`,
    ),
    error.message,
  );
});

Deno.test("examples: each description says what it is for and what to change first", async () => {
  for (const file of await examples()) {
    const doc = parseYaml(
      await Deno.readTextFile(new URL(file, EXAMPLES)),
    ) as { description?: unknown };
    const description = doc.description;
    assert(typeof description === "string", `${file} has no description`);
    assert(
      /\n\nFor\b/.test(description),
      `${file}'s description does not say what it is for`,
    );
    assert(
      /\n\nChange first\b/.test(description),
      `${file}'s description does not say what to change first`,
    );
  }
});

// Agents rewrite factory definition YAML, which drops comments, and the studio
// and the design page show descriptions, not comments; so what is worth keeping
// goes in a description, and no factory definition file carries a comment.
Deno.test("examples and fixtures: no definition file carries a comment", async () => {
  const dirs = [
    EXAMPLES,
    new URL("../../../testdata/factories/", import.meta.url),
  ];
  for (const dir of dirs) {
    for await (const entry of Deno.readDir(dir)) {
      if (!entry.isFile || !entry.name.endsWith(".yaml")) continue;
      const text = await Deno.readTextFile(new URL(entry.name, dir));
      const comments = text.split("\n")
        .map((line, i) => [i + 1, line] as const)
        .filter(([, line]) => /^\s*#/.test(line))
        .map(([n]) => n);
      assertEquals(comments, [], `${entry.name}: comment lines`);
    }
  }
});
