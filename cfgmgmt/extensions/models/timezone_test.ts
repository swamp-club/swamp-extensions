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
import { model } from "./timezone.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    timezone: "Europe/London",
    ...overrides,
  });
}

const CURRENT = { match: "timedatectl show", stdout: "UTC\n" };
const SET_FAILS = {
  match: "timedatectl set-timezone",
  exitCode: 1,
  stdout: "Failed to connect to bus\n",
};
const LN = "ln -sf /usr/share/zoneinfo/'Europe/London' /etc/localtime";

Deno.test("timezone apply: timedatectl success does not use the fallback", async () => {
  await withFakeSsh([CURRENT], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(
      cmds.includes("timedatectl set-timezone 'Europe/London'"),
      true,
    );
    assertEquals(cmds.some((c) => c.startsWith("ln -sf")), false);
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("timezone apply: failed timedatectl falls back to /etc/localtime", async () => {
  await withFakeSsh([CURRENT, SET_FAILS], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals((await fake.commands()).includes(LN), true);
    assertEquals(
      await fake.uploads(),
      new Map([["/etc/timezone", "Europe/London\n"]]),
    );
  });
});

Deno.test("timezone apply: failed timedatectl and failed fallback records failed", async () => {
  await withFakeSsh([
    CURRENT,
    SET_FAILS,
    { match: "ln -sf", exitCode: 1, stdout: "Read-only file system\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "timedatectl set-timezone failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    const error = String(ctx.writes[0].data.error);
    assertStringIncludes(error, "Failed to connect to bus");
    assertStringIncludes(error, "ln /etc/localtime failed with exit code 1");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("timezone apply: failed ln without timedatectl records failed", async () => {
  await withFakeSsh([
    { match: "timedatectl show", exitCode: 1 },
    { match: "cat /etc/timezone", stdout: "UTC\n" },
    { match: "command -v timedatectl", exitCode: 1 },
    { match: "ln -sf", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "ln /etc/localtime failed with exit code 1",
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

Deno.test("timezone check: logs entry and completion without secrets", async () => {
  await withFakeSsh([CURRENT], async () => {
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

Deno.test("timezone apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([CURRENT, {
    match: "test -f /usr/share/zoneinfo",
    exitCode: 1,
  }], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(String(errors[0].props?.error), "Invalid timezone");
    assertCleanLogs(ctx.logs, "web-1");
  });
});

Deno.test("timezone: a name outside the zoneinfo tree is rejected", () => {
  assertThrows(() => args({ timezone: "../../etc/passwd" }));
  assertThrows(() => args({ timezone: "/etc/passwd" }));
  args({ timezone: "America/Argentina/Buenos_Aires" });
  args({ timezone: "Etc/GMT+5" });
});
