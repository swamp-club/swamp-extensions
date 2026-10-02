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

// The factories the page's tests run on: the skill's examples, which users
// start from, and the test factory, each as a factory's model definition
// file, the file the page reads.

import { assert } from "@std/assert";
import { loadDefinition } from "./model.ts";

const EXAMPLE_DIR = new URL(
  "../../.claude/skills/stagecraft/references/examples/",
  import.meta.url,
);

const FILES: Record<string, URL> = {
  "build-swamp-extension": new URL("build-swamp-extension.yaml", EXAMPLE_DIR),
  "minimal": new URL("minimal.yaml", EXAMPLE_DIR),
  "starter": new URL("starter.yaml", EXAMPLE_DIR),
  "feature-factory": new URL(
    "../../testdata/factories/feature-factory.yaml",
    import.meta.url,
  ),
};

export const EXAMPLES = Object.keys(FILES);

/** Where a factory's model definition file is, by its name. */
export const modelPath = (name: string) =>
  `models/@swamp/stagecraft/factory/${name}.yaml`;

const HEADER = "type: '@swamp/stagecraft/factory'\n" +
  "typeVersion: 2026.09.30.1\nid: 00000000-0000-4000-8000-000000000000\n";

function indent(text: string, by: number): string {
  return text.replace(/\n$/, "").split("\n")
    .map((line) => line === "" ? "" : `${" ".repeat(by)}${line}`)
    .join("\n") + "\n";
}

/**
 * A factory's model definition file holding `definition` (a definition's own
 * YAML text) under globalArguments.definition, as the agent writes it in. The
 * definition's lines move down by `MODEL_LINES` and right by four spaces.
 */
export function modelFile(definition: string, name = "tiny"): string {
  return `${HEADER}name: ${name}\nglobalArguments:\n  tracker: board\n` +
    `  definition:\n${indent(definition, 4)}`;
}

/** The lines modelFile puts before the definition's first line. */
export const MODEL_LINES = 7;

/**
 * An example's model definition file: its definition and scenarios blocks
 * under globalArguments, beside its tracker.
 */
export async function exampleText(name: string): Promise<string> {
  const text = await Deno.readTextFile(FILES[name]);
  return FILES[name].pathname.includes("/testdata/")
    ? modelFile(text, name)
    : `${HEADER}name: ${name}\nglobalArguments:\n  tracker: board\n` +
      indent(text, 2);
}

/** An example, loaded as the page loads it, which must pass the schema. */
export async function loadOk(name: string, text?: string) {
  const loaded = await loadDefinition(
    modelPath(name),
    text ?? await exampleText(name),
  );
  assert(
    loaded.ok,
    `${name}: ${JSON.stringify(!loaded.ok && loaded.problems)}`,
  );
  return loaded;
}

const PLAN_STAGE = "      - id: plan\n        initial: true\n";

/**
 * build-swamp-extension's model definition file with plan's cycle limit
 * raised from the default 5 to 10, so plan-churn's fifth revise, which the
 * scenario expects refused, goes through.
 */
export function raisePlanLimit(text: string): string {
  assert(text.includes(PLAN_STAGE), "the plan stage is where the test expects");
  return text.replace(PLAN_STAGE, `${PLAN_STAGE}        maxCycles: 10\n`);
}
