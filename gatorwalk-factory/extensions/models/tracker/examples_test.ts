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
import {
  type FactoryDefinition,
  findStage,
  parseDefinition,
  parseExample,
  type StageSpec,
} from "../_lib/engine/tracker_testing.ts";
import { DEFAULT_STATUSES } from "../_lib/tracker/backends/builtin.ts";

// ---------------------------------------------------------------------------
// The example factory definitions the skill ships, as the built-in tracker
// sees them. engine/factories_test.ts tests how each behaves.
// ---------------------------------------------------------------------------

const DEFINITIONS = new URL(
  "../../../.claude/skills/gatorwalk-factory/references/examples/",
  import.meta.url,
);

async function load(file: string): Promise<FactoryDefinition> {
  const raw = parseExample(
    await Deno.readTextFile(new URL(file, DEFINITIONS)),
  ).definition;
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

Deno.test("every projecting example's status keys are the built-in tracker's default statuses, so it needs no statuses list", async () => {
  // minimal projects nothing, by design.
  for (const file of [STARTER, BUILD]) {
    const definition = await load(file);
    const keyed = definition.stages.filter((s) =>
      s.tracker?.status !== undefined
    );
    assert(keyed.length > 0, `${file} projects no status`);
    for (const s of keyed) {
      assert(
        (DEFAULT_STATUSES as readonly string[]).includes(
          s.tracker?.status ?? "",
        ),
        `${file}: stage '${s.id}' has status key ` +
          `'${s.tracker?.status}', not one of ${DEFAULT_STATUSES.join(", ")}`,
      );
    }
    // In stage order the keys only move forward, so a work item going
    // forward never moves its ticket back.
    const order = ["open", "in_progress", "shipped"];
    const forward = keyed.filter((s) => s.tracker?.status !== "closed")
      .map((s) => order.indexOf(s.tracker?.status ?? ""));
    assertEquals(
      forward,
      [...forward].sort((a, b) => a - b),
      `${file}: status keys go backwards in stage order`,
    );
    assertEquals(stage(definition, "done").tracker?.status, "shipped");
    assertEquals(stage(definition, "abandoned").tracker?.status, "closed");
  }
});
