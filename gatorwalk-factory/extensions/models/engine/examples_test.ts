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
import { model as factory } from "./factory.ts";
import { fakeSwamp } from "../_lib/engine/fake_swamp.ts";
import { FACTORY_TYPE } from "../_lib/engine/work_item_ops.ts";

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

Deno.test("examples: each passes the factory's validate method, with only the explained warnings", async () => {
  for (const file of await examples()) {
    const swamp = fakeSwamp();
    swamp.definitions.set("team", {
      globalArguments: parseYaml(
        await Deno.readTextFile(new URL(file, EXAMPLES)),
      ),
      type: FACTORY_TYPE,
    });
    // validate throws on a schema or graph error, or a truncated analysis.
    await factory.methods.validate.execute({}, swamp.context("team"));
    const summary = String(swamp.logs.at(-1)?.props?.summary);
    assert(summary.includes("' in 'team' is valid: "), `${file}: ${summary}`);
    const warnings = swamp.logs
      .filter((l) => l.message === "{warning}")
      .map((l) => `${l.props?.code} ${String(l.props?.warning).split(":")[0]}`);
    assertEquals(warnings, EXPECTED[file], file);
  }
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
