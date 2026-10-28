// Copyright (C) 2026 Adam Jacob
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assertEquals, assertStringIncludes } from "@std/assert";
import { report } from "./workflow_summary.ts";
import type { ReportModelType } from "./_lib/context.ts";
import { jsonRepository, recordingLogger } from "./_lib/fake_report.ts";

Deno.test("workflow summary reads each step's state by its string model type", async () => {
  const state = { status: "applied", changes: ["create file"], error: null };
  const result = await report.execute({
    workflowName: "fleet-banner",
    workflowStatus: "succeeded",
    logger: recordingLogger(),
    stepExecutions: [{
      jobName: "converge",
      stepName: "apply-web-1",
      modelName: "banner",
      modelType: "@swamp/cfgmgmt/file",
      modelId: "m-1",
      methodName: "apply",
      status: "succeeded",
      dataHandles: [{ name: "web-1", specName: "state", version: 1 }],
    }],
    dataRepository: {
      // Like swamp's: ModelType.create() takes a string, not a stand-in object.
      getContent: (type: ReportModelType, modelId, dataName, version) => {
        if (typeof type !== "string") {
          throw new TypeError("ModelType.create() expected a string");
        }
        assertEquals([type, modelId, dataName, version], [
          "@swamp/cfgmgmt/file",
          "m-1",
          "web-1",
          1,
        ]);
        return Promise.resolve(
          new TextEncoder().encode(JSON.stringify(state)),
        );
      },
    },
  });
  assertStringIncludes(result.markdown, "| applied |");
  assertStringIncludes(result.markdown, "| apply | succeeded | applied | 1 |");
});

Deno.test("workflow summary: failed steps, fleet facts and logs", async () => {
  const logger = recordingLogger();
  const info = {
    hostname: "web-1",
    os: "ubuntu",
    osVersion: "24.04",
    arch: "x86_64",
    kernel: "6.8.0",
    packageManagers: ["apt"],
    gatheredAt: "2026-10-27T00:00:00.000Z",
  };
  const result = await report.execute({
    workflowName: "fleet",
    workflowStatus: "failed",
    logger,
    dataRepository: jsonRepository(info),
    stepExecutions: [
      {
        jobName: "facts",
        stepName: "gather-web-1",
        modelName: "web-1",
        modelType: "@swamp/cfgmgmt/node",
        modelId: "m-1",
        methodName: "gather",
        status: "succeeded",
        dataHandles: [{ name: "web-1", specName: "info", version: 1 }],
      },
      {
        jobName: "converge",
        stepName: "apply-user",
        modelName: "alice",
        modelType: "@swamp/cfgmgmt/user",
        modelId: "m-2",
        methodName: "apply",
        status: "failed",
        error: "ssh: connect to host web-1 port 22: Connection refused",
      },
    ],
  });
  assertStringIncludes(result.markdown, "| web-1 | ubuntu | 24.04 |");
  assertStringIncludes(
    result.markdown,
    "- **apply-user** (alice): ssh: connect to host web-1",
  );
  assertEquals(result.json.summary.failed, 1);
  assertEquals(result.json.summary.compliance, { failed: 1 });
  assertEquals(logger.lines.map((l) => l.message), [
    "Summarising {stepCount} steps of {workflow}",
    "Summarised {workflow}: {failed} failed",
  ]);
});
