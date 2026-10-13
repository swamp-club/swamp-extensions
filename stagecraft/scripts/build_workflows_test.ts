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

import { assertEquals } from "@std/assert";
import { parse } from "npm:yaml@2.8.3";
import { model as builtin } from "../extensions/models/tracker/builtin.ts";
import { model as publisher } from "../extensions/models/tracker/publisher.ts";
import {
  KINDS,
  workflowName,
  WORKFLOWS_DIR,
  workflowText,
} from "./build_workflows.ts";

Deno.test("workflows: each shipped workflow is what build_workflows writes", async () => {
  for (const k of KINDS) {
    assertEquals(
      await Deno.readTextFile(new URL(k.file, WORKFLOWS_DIR)),
      workflowText(k),
      `${k.file} is stale: run deno task build:workflows`,
    );
  }
});

Deno.test("workflows: every round input is an argument the round method takes, on a tracker and on the publisher", () => {
  for (const k of KINDS) {
    const doc = parse(workflowText(k)) as {
      name: string;
      jobs: {
        steps: {
          task: { methodName: string; inputs: Record<string, unknown> };
        }[];
      }[];
    };
    assertEquals(doc.name, workflowName(k.kind));
    for (const job of doc.jobs) {
      for (const step of job.steps) {
        if (step.task.methodName !== "round") continue;
        for (const model of [builtin, publisher]) {
          const shape = model.methods.round.arguments.shape;
          for (const name of Object.keys(step.task.inputs)) {
            assertEquals(
              name in shape,
              true,
              `${k.file}: round has no ${name}`,
            );
          }
        }
      }
    }
  }
});
