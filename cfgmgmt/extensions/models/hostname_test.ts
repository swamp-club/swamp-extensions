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
} from "@std/assert";
import { model } from "./hostname.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    name: "new-host",
    ...overrides,
  });
}

const OLD = { match: "--static", stdout: "old-host\n" };
const ETC = { match: "cat /etc/hostname", stdout: "old-host\n" };

Deno.test("hostname apply: hostnamectl success does not use the fallback", async () => {
  await withFakeSsh([OLD, ETC], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(cmds.includes("hostnamectl set-hostname 'new-host'"), true);
    assertEquals(cmds.includes("hostname 'new-host'"), false);
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("hostname apply: failed hostnamectl falls back to /etc/hostname + hostname", async () => {
  await withFakeSsh([
    OLD,
    ETC,
    {
      match: "hostnamectl set-hostname",
      exitCode: 1,
      stdout: "Failed to connect to bus\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      await fake.uploads(),
      new Map([["/etc/hostname", "new-host\n"]]),
    );
    assertEquals(
      (await fake.commands()).includes("hostname 'new-host'"),
      true,
    );
  });
});

Deno.test("hostname apply: failed hostnamectl and failed fallback records failed", async () => {
  await withFakeSsh([
    OLD,
    ETC,
    {
      match: "hostnamectl set-hostname",
      exitCode: 1,
      stdout: "Failed to connect to bus\n",
    },
    { match: "hostname 'new-host'", exitCode: 1, stdout: "not permitted\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "hostnamectl set-hostname failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    const error = String(ctx.writes[0].data.error);
    assertStringIncludes(error, "Failed to connect to bus");
    assertStringIncludes(error, "hostname failed with exit code 1");
  });
});

Deno.test("hostname apply: failed hostname without hostnamectl records failed", async () => {
  await withFakeSsh([
    OLD,
    ETC,
    { match: "command -v hostnamectl", exitCode: 1 },
    { match: "hostname 'new-host'", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "hostname failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
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

Deno.test("hostname check: logs entry and completion without secrets", async () => {
  await withFakeSsh([OLD, ETC], async () => {
    const ctx = fakeContext(args(BECOME));
    await model.methods.check.execute({}, ctx);
    const info = ctx.logs.filter((l) => l.level === "info");
    assert(info.some((l) => l.message.startsWith("Checking ")));
    assert(info.some((l) =>
      l.message.endsWith("is {status}") &&
      l.props?.status === ctx.writes[0].data.status
    ));
    assertCleanLogs(ctx.logs, "web-1");
  });
});

Deno.test("hostname apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([
    OLD,
    ETC,
    { match: "command -v hostnamectl", exitCode: 1 },
    // Under sudo the command follows the sudo marker inside `sh -c '...'`.
    { match: "; hostname ", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(String(errors[0].props?.error), "hostname failed");
    assertCleanLogs(ctx.logs, "web-1");
  });
});
