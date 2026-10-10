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

import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { join } from "@std/path";
import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { digestOf } from "../../extensions/models/_lib/engine/canonical.ts";
import { model as factory } from "../../extensions/models/engine/factory.ts";
import { parseExample } from "../../extensions/models/_lib/engine/fake_swamp.ts";
import { BUILD_DEFINITION, readExample, withRepo } from "../harness.ts";

// ---------------------------------------------------------------------------
// Upgrading stored definitions on the real engine (#3194): swamp runs the
// factory type's upgrades when one of its methods runs and writes the result
// back to the factory's file, and a pinned copy as swamp stores it has the
// digest its run records, so it can be checked before it is upgraded.
// ---------------------------------------------------------------------------

/** The type version before the factory first declared upgrades. */
const BEFORE_UPGRADES = "2026.10.02.1";

Deno.test("definition upgrade: validate upgrades a factory at an older type version and writes it back, meaning unchanged", async () => {
  await withRepo(async (repo) => {
    const { definition } = await readExample(BUILD_DEFINITION);
    await repo.factory("team", definition);
    const path = join(repo.dir, repo.factoryFile("team"));
    const file = parseYaml(await Deno.readTextFile(path)) as {
      typeVersion: string;
      globalArguments: { definition: unknown };
    };
    assertNotEquals(BEFORE_UPGRADES, factory.version);
    await Deno.writeTextFile(
      path,
      stringifyYaml({ ...file, typeVersion: BEFORE_UPGRADES }),
    );
    await repo.factoryMethod("team", "validate");
    const after = parseYaml(await Deno.readTextFile(path)) as typeof file;
    assertEquals(after.typeVersion, factory.version);
    assertEquals(
      await digestOf(after.globalArguments.definition),
      await digestOf(definition),
    );
  });
});

Deno.test("definition upgrade: a pinned copy as swamp stores it has the digest its run records", async () => {
  await withRepo(async (repo) => {
    const { definition } = await readExample(BUILD_DEFINITION);
    await repo.factory("team", definition);
    const key = await repo.newKey("team");
    await repo.workItem(key, "start", { factory: "team" });
    const run = await repo.run(key);
    assert(run.definition.version !== undefined);
    const stored = await repo.data(key, "definition", run.definition.version);
    assertEquals(await digestOf(stored.definition), run.definition.digest);
  });
});

// --- schemaVersion 2: let, passAsInputs and a call's target (#3190) -------------

const VERSIONS = new URL(
  "../../testdata/definition-versions/",
  import.meta.url,
);

async function fixture(path: string) {
  return parseExample(await Deno.readTextFile(new URL(path, VERSIONS)));
}

Deno.test("definition upgrade: validate rewrites a v1 factory's bindings as let and passAsInputs", async () => {
  await withRepo(async (repo) => {
    const { definition, scenarios } = await fixture("v1/call-stages.yaml");
    await repo.factory("team", definition, { scenarios });
    const path = join(repo.dir, repo.factoryFile("team"));
    const file = parseYaml(await Deno.readTextFile(path)) as {
      typeVersion: string;
      globalArguments: { definition: unknown };
    };
    await Deno.writeTextFile(
      path,
      stringifyYaml({ ...file, typeVersion: BEFORE_UPGRADES }),
    );
    await repo.factoryMethod("team", "validate");
    const after = parseYaml(await Deno.readTextFile(path)) as typeof file;
    const expected = JSON.parse(
      await Deno.readTextFile(
        new URL("v1/call-stages.expected.json", VERSIONS),
      ),
    );
    assertEquals(after.globalArguments.definition, expected);
  });
});

Deno.test("definition upgrade: a templated target is filled on dispatch and recorded; a value that is not a name is refused unrecorded", async () => {
  await withRepo(async (repo) => {
    const { definition } = await fixture("v2/templated-target.yaml");
    await repo.factory("team", definition);
    const key = await repo.newKey("team");
    await repo.workItem(key, "start", { factory: "team" });
    await repo.workItem(key, "dispatch", await repo.expected(key));
    const run = await repo.run(key);
    assertEquals(run.dispatches[0].method, {
      modelIdOrName: `agent-${key}`,
      methodName: "generate",
    });
    // Only the passed let values are sent; agent filled the target alone.
    assertEquals(run.dispatches[0].inputs, {
      depth: 2,
      workItem: key,
      feedback: null,
    });

    for (
      const [value, words] of [["null", "needs a non-empty string, not null"], [
        "'two words'",
        "which swamp would not accept",
      ]]
    ) {
      const bad = structuredClone(definition) as {
        stages: { work?: { let?: Record<string, string> } }[];
      };
      bad.stages[0].work!.let!.agent = value;
      await repo.editFactory("team", bad);
      const other = await repo.newKey("team");
      await repo.workItem(other, "start", { factory: "team" });
      const refused = await repo.workItem(
        other,
        "dispatch",
        await repo.expected(other),
        { allowFailure: true },
      );
      assertNotEquals(refused.code, 0, value);
      assert(refused.output.includes(words), refused.output);
      assertEquals((await repo.run(other)).dispatches, [], value);
    }
  });
});
