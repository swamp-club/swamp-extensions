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

// The factory definitions the page's tests run on: the skill's examples,
// which users start from, and the test factory.

import { assert } from "@std/assert";
import { loadDefinition } from "./model.ts";

const EXAMPLE_DIR = new URL(
  "../../.claude/skills/gatorwalk-factory/references/examples/",
  import.meta.url,
);

const FILES: Record<string, URL> = {
  "swamp-club-swamp-extensions": new URL(
    "swamp-club-swamp-extensions.yaml",
    EXAMPLE_DIR,
  ),
  "build-swamp-extension": new URL("build-swamp-extension.yaml", EXAMPLE_DIR),
  "minimal": new URL("minimal.yaml", EXAMPLE_DIR),
  "starter": new URL("starter.yaml", EXAMPLE_DIR),
  "feature-factory": new URL(
    "../../testdata/factories/feature-factory.yaml",
    import.meta.url,
  ),
};

export const EXAMPLES = Object.keys(FILES);

export function exampleText(name: string): Promise<string> {
  return Deno.readTextFile(FILES[name]);
}

/** An example, loaded as the page loads it, which must pass the schema. */
export async function loadOk(name: string, text?: string) {
  const loaded = await loadDefinition(
    `factories/${name}.yaml`,
    text ?? await exampleText(name),
  );
  assert(
    loaded.ok,
    `${name}: ${JSON.stringify(!loaded.ok && loaded.problems)}`,
  );
  return loaded;
}
