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

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "@std/assert";
import { model } from "./cron.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

const COMMAND = "/usr/bin/backup  --full\t--quiet";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    name: "backup",
    ensure: "present",
    command: COMMAND,
    minute: "0",
    hour: "3",
    nodeHost: "cron-1",
    ...overrides,
  });
}

Deno.test("cron check: command with repeated spaces and tabs is compliant", async () => {
  await withFakeSsh([
    {
      match: "crontab -l",
      stdout: `MAILTO=ops\n# cfgmgmt:backup\n0 3 * * * ${COMMAND}\n`,
    },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
    const current = ctx.writes[0].data.current as { command: string };
    assertEquals(current.command, COMMAND);
  });
});

Deno.test("cron apply: whitespace-exact command is not rewritten", async () => {
  await withFakeSsh([
    {
      match: "crontab -l",
      stdout: `# cfgmgmt:backup\n0 3 * * * ${COMMAND}\n`,
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(await fake.uploads(), new Map());
  });
});

const SECRET = "s3cret-become-pw";
const BECOME = { become: true, becomePassword: SECRET };

/** No log line carries the become password or an interpolated host. */
function assertCleanLogs(logs: LogLine[], host: string) {
  for (const line of logs) {
    const text = line.message + JSON.stringify(line.props ?? {});
    assertEquals(text.includes(SECRET), false, `log leaks secret: ${text}`);
    assertEquals(line.message.includes(host), false, line.message);
  }
}

Deno.test("cron check: logs entry and completion without secrets", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args(BECOME));
    await model.methods.check.execute({}, ctx);
    const info = ctx.logs.filter((l) => l.level === "info");
    assert(info.some((l) => l.message.startsWith("Checking ")));
    assert(info.some((l) =>
      l.message.endsWith("is {status}") &&
      l.props?.status === ctx.writes[0].data.status
    ));
    assertCleanLogs(ctx.logs, "cron-1");
  });
});

Deno.test("cron apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([{
    match: "crontab -l",
    stdout: "sudo: a password is required\n",
    exitCode: 1,
  }], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(
      String(errors[0].props?.error),
      "crontab -l for root failed",
    );
    assertCleanLogs(ctx.logs, "cron-1");
  });
});

Deno.test("cron apply: an unreadable crontab is not replaced", async () => {
  await withFakeSsh([
    { match: "crontab -l", stdout: "permission denied\n", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "crontab -l for root failed with exit code 1",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.startsWith("crontab -u"), false, cmd);
    }
  });
});

Deno.test("cron apply: a user with no crontab gets the entry", async () => {
  await withFakeSsh([
    { match: "crontab -l", stdout: "no crontab for root\n", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const uploaded = [...(await fake.uploads()).values()];
    assertEquals(uploaded, [`# cfgmgmt:backup\n0 3 * * * ${COMMAND}\n`]);
  });
});

Deno.test("cron: schedule fields and command must not break the crontab line", () => {
  assertThrows(() => args({ minute: "0 3" }));
  assertThrows(() => args({ command: "true\n* * * * * evil" }));
  assertThrows(() => args({ name: "a\nb" }));
});
