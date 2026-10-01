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
import { FactoryArgumentsSchema, model as factory } from "./factory.ts";
import { fakeSwamp, parseExample } from "../_lib/engine/fake_swamp.ts";

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

/** An example as data: its definition and scenarios blocks. */
async function readExample(file: string) {
  return parseExample(await Deno.readTextFile(new URL(file, EXAMPLES)));
}

/**
 * A fake repo holding an example as the factory named after it: its
 * definition and saved scenarios in the factory's globalArguments, as the
 * skill writes them in.
 */
async function exampleFactory(file: string, edit = (text: string) => text) {
  const name = file.replace(/\.yaml$/, "");
  const swamp = fakeSwamp();
  const { definition, scenarios } = parseExample(
    edit(await Deno.readTextFile(new URL(file, EXAMPLES))),
  );
  swamp.factory(name, definition, { scenarios });
  return { swamp, name, scenarios };
}

Deno.test("examples: each is a factory's globalArguments once a tracker is named, under swamp's full schema", async () => {
  // swamp model validate and every method check the factory's globalArguments
  // against this schema, so a pasted example must pass it as it is.
  for (const file of await examples()) {
    const doc = parseYaml(await Deno.readTextFile(new URL(file, EXAMPLES)));
    const result = FactoryArgumentsSchema.safeParse({
      ...doc as Record<string, unknown>,
      tracker: "board",
    });
    assert(result.success, `${file}: ${JSON.stringify(result.error?.issues)}`);
  }
});

Deno.test("examples: each passes the factory's validate method, with its saved scenarios and only the explained warnings", async () => {
  for (const file of await examples()) {
    const { swamp, name, scenarios } = await exampleFactory(file);
    // validate throws on a schema or graph error, a truncated analysis, or a
    // saved scenario with a step that did not do what it said.
    await factory.methods.validate.execute({}, swamp.context(name));
    const summary = String(swamp.logs.at(-1)?.props?.summary);
    assert(
      summary.includes(`' in factory '${name}' is valid: `) &&
        summary.includes(`, ${scenarios.length} saved scenario(s) passed; `),
      `${file}: ${summary}`,
    );
    const warnings = swamp.logs
      .filter((l) => l.message === "{warning}")
      .map((l) => `${l.props?.code} ${String(l.props?.warning).split(":")[0]}`);
    assertEquals(warnings, EXPECTED[file], file);
  }
});

Deno.test("examples: every example but minimal has saved scenarios", async () => {
  const withScenarios: string[] = [];
  for (const file of await examples()) {
    if ((await readExample(file)).scenarios.length > 0) {
      withScenarios.push(file);
    }
  }
  assertEquals(
    withScenarios,
    (await examples()).filter((f) => f !== "minimal.yaml"),
  );
});

Deno.test("examples: a changed gate message fails validate, naming the scenario and step", async () => {
  const file = "swamp-club-swamp-extensions.yaml";
  // conformance-review's conforms gate; bug-to-done pins its message.
  const gate = "message: >-\n                  every step not implemented as " +
    "planned needs a justification";
  const message = "needs a justification";
  const { swamp, name, scenarios } = await exampleFactory(file, (text) => {
    assert(text.includes(gate));
    return text.replace(gate, gate.replace(message, "needs a reason"));
  });
  const at = scenarios.findIndex((s) =>
    (s as { scenario?: unknown }).scenario === "bug-to-done"
  );
  assert(at >= 0);
  const error = await assertRejects(
    () => factory.methods.validate.execute({}, swamp.context(name)),
    Error,
  );
  assert(
    error.message.includes(
      `scenarios.${at} (bug-to-done) step 28 (move conforms): ` +
        `expected a refusal mentioning "${message}"`,
    ),
    error.message,
  );
});

Deno.test("examples: each description says what it is for and what to change first", async () => {
  for (const file of await examples()) {
    const description = (await readExample(file)).definition.description;
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

// A reviewer told not to soften, with no bar, rates logistics as high, and a
// high finding sends the work round again with no person involved
// (swamp-club #2781). So each review prompt carries a severity bar and asks
// for fixes in proportion to the change. swamp-club-swamp-extensions.yaml
// reimplements @swamp/issue-lifecycle and keeps that model's review
// guidance, so it is left out.
const RUBRIC_EXAMPLES = ["build-swamp-extension.yaml", "starter.yaml"];

interface ExampleStage {
  id: string;
  work?: { systemPrompt?: string; context?: { inject?: string[] } };
  artifacts?: { name: string; kind?: string }[];
}

async function stagesOf(file: string): Promise<ExampleStage[]> {
  return (await readExample(file)).definition.stages as ExampleStage[];
}

Deno.test("examples: every review prompt carries the severity bar and asks for proportion", async () => {
  for (const file of RUBRIC_EXAMPLES) {
    const reviews = (await stagesOf(file)).filter((stage) =>
      (stage.artifacts ?? []).some((a) => a.kind === "findings")
    );
    assert(reviews.length > 0, `${file} has no review stage`);
    for (const stage of reviews) {
      const prompt = (stage.work?.systemPrompt ?? "").replace(/\s+/g, " ");
      for (
        const phrase of [
          "critical or high only if",
          "are medium at most",
          "against the size of the change",
          "the smallest adequate fix",
          "do not soften the severity of a real defect",
        ]
      ) {
        assert(prompt.includes(phrase), `${file} ${stage.id}: no '${phrase}'`);
      }
      assert(
        !prompt.includes("do not soften them"),
        `${file} ${stage.id}: a bare 'do not soften them' contradicts the bar`,
      );
    }
  }
});

Deno.test("examples: implement receives plan-review, so approving carries its open findings", async () => {
  for (const file of RUBRIC_EXAMPLES) {
    const implement = (await stagesOf(file)).find((s) => s.id === "implement");
    assert(
      implement?.work?.context?.inject?.includes("plan-review"),
      `${file}: implement does not inject plan-review`,
    );
  }
});
