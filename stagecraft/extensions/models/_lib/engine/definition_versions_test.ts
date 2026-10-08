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

// ---------------------------------------------------------------------------
// The factory definitions of every schemaVersion stagecraft has shipped, frozen
// in testdata/definition-versions/v<N>/ (#3194). Each must still read: upgrade
// to the current form its <name>.expected.json holds, pass the schema, and
// pass its saved scenarios, so a work item on it dispatches as it did. A format
// change adds its upgrade step, fixtures at its new version, and updates every
// expected form; the completeness check refuses a version with no fixture.
// ---------------------------------------------------------------------------

import { assert, assertEquals } from "@std/assert";
import { DEFINITION_SCHEMA_VERSION } from "./definition_schema.ts";
import {
  readDefinition,
  upgradeFactoryArguments,
} from "./definition_upgrade.ts";
import { parseExample } from "./fake_swamp.ts";
import { parseScenario, runScenario } from "./scenario.ts";

const VERSIONS = new URL(
  "../../../../testdata/definition-versions/",
  import.meta.url,
);

/** The fixtures of version `v`, by name. */
async function fixtures(v: number): Promise<string[]> {
  const names: string[] = [];
  try {
    for await (const entry of Deno.readDir(new URL(`v${v}/`, VERSIONS))) {
      if (entry.isFile && entry.name.endsWith(".yaml")) {
        names.push(entry.name.slice(0, -".yaml".length));
      }
    }
  } catch (e) {
    if (!(e instanceof Deno.errors.NotFound)) throw e;
  }
  return names.sort();
}

Deno.test("definition versions: every schemaVersion stagecraft has shipped has a fixture", async () => {
  for (let v = 1; v <= DEFINITION_SCHEMA_VERSION; v++) {
    assert(
      (await fixtures(v)).length > 0,
      `testdata/definition-versions/v${v}/ needs a factory at schemaVersion ${v}`,
    );
  }
});

for (let v = 1; v <= DEFINITION_SCHEMA_VERSION; v++) {
  for (const name of await fixtures(v)) {
    Deno.test(`definition versions: v${v}/${name} upgrades to its expected form and its scenarios pass`, async () => {
      const dir = new URL(`v${v}/`, VERSIONS);
      const { definition, scenarios } = parseExample(
        await Deno.readTextFile(new URL(`${name}.yaml`, dir)),
      );
      assertEquals(definition.schemaVersion, v, "the fixture's own version");
      const args = upgradeFactoryArguments({ definition, scenarios });
      assertEquals(
        args.definition,
        JSON.parse(
          await Deno.readTextFile(new URL(`${name}.expected.json`, dir)),
        ),
      );
      const read = readDefinition(args.definition);
      assert(read.ok, read.ok ? "" : read.errors.join("\n"));
      const saved = args.scenarios as unknown[];
      assert(saved.length > 0, "a fixture carries saved scenarios");
      for (const raw of saved) {
        const scenario = parseScenario(raw);
        assert(scenario.ok, scenario.ok ? "" : scenario.errors.join("\n"));
        const result = await runScenario(read.value, scenario.value);
        assert(
          result.passed,
          `${scenario.value.scenario}: ${JSON.stringify(result.failures)}`,
        );
      }
    });
  }
}
