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
import {
  type FactoryDefinition,
  findStage,
  parseDefinition,
  type StageSpec,
} from "../_lib/engine/tracker_testing.ts";
import { LAB_STATUSES } from "../_lib/tracker/backends/swamp_club.ts";

// ---------------------------------------------------------------------------
// The example factory definitions the skill ships, as the Lab adapter sees
// them. engine/factories_test.ts tests how each behaves.
// ---------------------------------------------------------------------------

const DEFINITIONS = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/",
  import.meta.url,
);

async function load(file: string): Promise<FactoryDefinition> {
  const raw = parseYaml(await Deno.readTextFile(new URL(file, DEFINITIONS)));
  const result = parseDefinition(raw);
  if (!result.ok) {
    throw new Error(`${file} is invalid:\n${result.errors.join("\n")}`);
  }
  return result.value;
}

function stage(definition: FactoryDefinition, id: string): StageSpec {
  const found = findStage(definition, id);
  if (found === undefined) throw new Error(`no stage '${id}'`);
  return found;
}

const STARTER = "starter.yaml";
const BUILD = "build-swamp-extension.yaml";
const SWX = "swamp-club-swamp-extensions.yaml";

Deno.test("every projecting example's status keys are Lab statuses, so the Lab adapter needs no status map", async () => {
  // minimal projects nothing, by design.
  for (const file of [STARTER, BUILD, SWX]) {
    const definition = await load(file);
    const keyed = definition.stages.filter((s) =>
      s.projection?.status !== undefined
    );
    assert(keyed.length > 0, `${file} projects no status`);
    for (const s of keyed) {
      assert(
        (LAB_STATUSES as readonly string[]).includes(
          s.projection?.status ?? "",
        ),
        `${file}: stage '${s.id}' has status key ` +
          `'${s.projection?.status}', not one of ${LAB_STATUSES.join(", ")}`,
      );
    }
    // In stage order the keys only move forward along the Lab's order, so
    // a work item going forward never asks the Lab to move back.
    const order = ["open", "triaged", "in_progress", "shipped"];
    const forward = keyed.filter((s) => s.projection?.status !== "closed")
      .map((s) => order.indexOf(s.projection?.status ?? ""));
    assertEquals(
      forward,
      [...forward].sort((a, b) => a - b),
      `${file}: status keys go backwards in stage order`,
    );
    assertEquals(stage(definition, "done").projection?.status, "shipped");
    assertEquals(stage(definition, "abandoned").projection?.status, "closed");
  }
});
