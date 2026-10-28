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
import { report } from "./node_state.ts";
import type { MethodReportContext } from "./_lib/context.ts";
import { jsonRepository, recordingLogger } from "./_lib/fake_report.ts";

const INFO = {
  hostname: "web-1",
  os: "ubuntu",
  osVersion: "24.04",
  arch: "x86_64",
  kernel: "6.8.0",
  packageManagers: ["apt"],
  gatheredAt: "2026-10-27T00:00:00.000Z",
};

const PASSWORD = "sudo-pw-123";

function context(
  data: unknown,
  overrides: Partial<MethodReportContext> = {},
) {
  const logger = recordingLogger();
  const ctx: MethodReportContext = {
    modelType: { raw: "@swamp/cfgmgmt/node" },
    modelId: "m-1",
    definition: { id: "d-1", name: "web-1" },
    methodName: "gather",
    executionStatus: "succeeded",
    dataHandles: [{ name: "web-1", specName: "info", version: 1 }],
    dataRepository: jsonRepository(data),
    logger,
    globalArgs: { hostname: "web-1", sshUser: "root", sudoPassword: PASSWORD },
    methodArgs: {},
    ...overrides,
  };
  return { ctx, logger };
}

Deno.test("node report: renders gathered facts", async () => {
  const { ctx } = context(INFO);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "| **OS** | ubuntu 24.04 |");
  assertStringIncludes(result.markdown, "| **Package Managers** | apt |");
  assertStringIncludes(result.markdown, "`@swamp/cfgmgmt/node`");
  assertEquals((result.json as Record<string, unknown>).packageManagers, [
    "apt",
  ]);
});

Deno.test("node report: sensitive arguments are redacted", async () => {
  const { ctx } = context(INFO);
  const result = await report.execute(ctx);
  const rendered = result.markdown + JSON.stringify(result.json);
  assertEquals(rendered.includes(PASSWORD), false);
  assertStringIncludes(result.markdown, "| sudoPassword | *** |");
  assertStringIncludes(result.markdown, "| sshUser | root |");
});

Deno.test("node report: logs entry and completion without secrets", async () => {
  const { ctx, logger } = context(INFO);
  await report.execute(ctx);
  assertEquals(logger.lines.map((l) => l.message), [
    "Rendering node report for {model} {method}",
    "Rendered node report for {model}",
  ]);
  assertEquals(JSON.stringify(logger.lines).includes(PASSWORD), false);
});

Deno.test("node report: a missing info handle yields a diagnostic", async () => {
  const { ctx } = context(INFO, {
    dataHandles: [{ name: "web-1", specName: "state" }],
  });
  const result = await report.execute(ctx);
  assertEquals((result.json as Record<string, unknown>).status, "diagnostic");
  assertStringIncludes(result.markdown, 'No handle with specName="info"');
});

Deno.test("node report: unreadable info content yields a diagnostic", async () => {
  const { ctx } = context(null);
  const result = await report.execute(ctx);
  assertEquals((result.json as Record<string, unknown>).status, "diagnostic");
});
