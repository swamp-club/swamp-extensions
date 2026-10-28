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
import { report } from "./state.ts";
import type { MethodReportContext } from "./_lib/context.ts";
import { jsonRepository, recordingLogger } from "./_lib/fake_report.ts";

const SECRETS = [
  "sudo-pw-123",
  "-----BEGIN PRIVATE KEY-----MIIsecret",
  "DB_PASSWORD=hunter2",
  "file-payload-secret",
  "ghp_tokenvalue",
];

function context(
  data: unknown,
  overrides: Partial<MethodReportContext> = {},
) {
  const logger = recordingLogger();
  const ctx: MethodReportContext = {
    modelType: "@swamp/cfgmgmt/certificate",
    modelId: "m-1",
    definition: { id: "d-1", name: "site-cert" },
    methodName: "apply",
    executionStatus: "succeeded",
    dataHandles: [{ name: "web-1", specName: "state", version: 2 }],
    dataRepository: jsonRepository(data),
    logger,
    globalArgs: {
      nodeHost: "web-1",
      becomePassword: SECRETS[0],
      keyContent: SECRETS[1],
      keyPath: "/etc/ssl/site.key",
      environment: [SECRETS[2]],
      content: SECRETS[3],
      repo: `https://deploy:${SECRETS[4]}@example.com/app.git`,
    },
    methodArgs: {},
    ...overrides,
  };
  return { ctx, logger };
}

const STATE = {
  status: "applied",
  changes: ["deploy certificate"],
  error: null,
  timestamp: "2026-10-27T00:00:00.000Z",
  current: { certExists: true, env: [SECRETS[2]] },
};

Deno.test("state report: renders status, changes and current state", async () => {
  const { ctx } = context(STATE);
  const result = await report.execute(ctx);
  assertStringIncludes(result.markdown, "| **Status** | applied |");
  assertStringIncludes(result.markdown, "- deploy certificate");
  assertStringIncludes(result.markdown, "| certExists | true |");
  assertStringIncludes(result.markdown, "| keyPath | /etc/ssl/site.key |");
  assertEquals(result.json.status, "applied");
});

Deno.test("state report: sensitive arguments and state never reach the output", async () => {
  const { ctx } = context(STATE);
  const result = await report.execute(ctx);
  const rendered = result.markdown + JSON.stringify(result.json);
  for (const secret of SECRETS) {
    assertEquals(rendered.includes(secret), false, secret);
  }
  assertStringIncludes(result.markdown, "| becomePassword | *** |");
  assertStringIncludes(result.markdown, "| keyContent | *** |");
  assertStringIncludes(result.markdown, "| env | *** |");
  assertStringIncludes(
    result.markdown,
    "| repo | https://***@example.com/app.git |",
  );
});

Deno.test("state report: logs entry and completion without secrets", async () => {
  const { ctx, logger } = context(STATE);
  await report.execute(ctx);
  const messages = logger.lines.map((l) => l.message);
  assertEquals(messages, [
    "Rendering state report for {model} {method}",
    "Rendered state report for {model}: {status}",
  ]);
  const logged = JSON.stringify(logger.lines);
  for (const secret of SECRETS) {
    assertEquals(logged.includes(secret), false, secret);
  }
});

Deno.test("state report: a missing state handle yields a diagnostic", async () => {
  const { ctx, logger } = context(STATE, {
    dataHandles: [{ name: "web-1", specName: "logs" }],
  });
  const result = await report.execute(ctx);
  assertEquals(result.json.status, "diagnostic");
  assertStringIncludes(result.markdown, 'No handle with specName="state"');
  assertEquals(logger.lines.some((l) => l.level === "warn"), true);
  for (const secret of SECRETS) {
    assertEquals(result.markdown.includes(secret), false, secret);
  }
});

Deno.test("state report: unreadable state content yields a diagnostic", async () => {
  const { ctx } = context(null);
  const result = await report.execute(ctx);
  assertEquals(result.json.status, "diagnostic");
  assertStringIncludes(result.markdown, "returned null");
});

Deno.test("state report: no data handles yields a diagnostic", async () => {
  const { ctx } = context(STATE, { dataHandles: [] });
  const result = await report.execute(ctx);
  assertEquals(result.json.status, "diagnostic");
});
