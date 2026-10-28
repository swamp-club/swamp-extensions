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
import { assertEquals, assertRejects } from "@std/assert";
import { model } from "./line.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    nodeUser: "deploy",
    path: "/etc/ssh/sshd_config",
    regexp: "^PermitRootLogin",
    line: "PermitRootLogin no",
    ...overrides,
  });
}

for (const method of ["check", "apply"] as const) {
  Deno.test(`line ${method}: ensure present without a line fails clearly`, async () => {
    await withFakeSsh([
      { match: "stat -L", stdout: "regular file\n" },
      { match: "cat ", stdout: "PermitRootLogin yes\n" },
    ], async (fake) => {
      const ctx = fakeContext(args({ line: undefined }));
      await assertRejects(
        () => model.methods[method].execute({}, ctx),
        Error,
        "line is required when ensure is present",
      );
      assertEquals(ctx.writes.length, 1);
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(
        ctx.writes[0].data.error,
        "line is required when ensure is present",
      );
      assertEquals(await fake.commands(), []);
      assertEquals(await fake.uploads(), new Map());
    });
  });
}

Deno.test("line apply: ensure absent needs no line", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    { match: "cat ", stdout: "Port 22\nPermitRootLogin yes\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent", line: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      await fake.uploads(),
      new Map([["/etc/ssh/sshd_config", "Port 22\n"]]),
    );
  });
});

Deno.test("line apply: a failed mkdir records failed state and throws", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "NOTFOUND\n" },
    { match: "mkdir -p", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "mkdir failed",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});

const SUDO_PASSWORD = "hunter2-sudo-pw";

/** Entry and completion are logged at info, and no secret reaches any line. */
function assertLogged(
  logs: LogLine[],
  entry: string,
  done: string,
  secrets: string[] = [],
) {
  const text = JSON.stringify(logs);
  for (const secret of [SUDO_PASSWORD, ...secrets]) {
    assertEquals(text.includes(secret), false, text);
  }
  const first = logs.find((l) => l.message.startsWith(entry));
  assertEquals(first?.level, "info", text);
  assertEquals(first?.props?.host, "web-1");
  assertEquals(
    logs.some((l) => l.level === "info" && l.message.includes(done)),
    true,
    text,
  );
}

Deno.test("line apply: replaces the match and logs without secrets or line content", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    { match: "cat ", stdout: "Port 22\nPermitRootLogin yes\n" },
  ], async (fake) => {
    const g = args({ become: true, becomePassword: SUDO_PASSWORD });
    const ctx = fakeContext(g);
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      [...(await fake.uploads()).values()],
      ["Port 22\nPermitRootLogin no\n"],
    );
    assertLogged(ctx.logs, "Applying line in", "is {status}", [
      "PermitRootLogin",
    ]);

    const checkCtx = fakeContext(g);
    await model.methods.check.execute({}, checkCtx);
    assertLogged(checkCtx.logs, "Checking line in", "is {status}", [
      "PermitRootLogin",
    ]);
  });
});

Deno.test("line apply: an unreadable file fails instead of being overwritten", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    { match: "cat ", exitCode: 1, stdout: "Permission denied\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "read /etc/ssh/sshd_config failed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("line apply: ensure absent removes every matching line", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    {
      match: "cat ",
      stdout: "PermitRootLogin yes\nPort 22\nPermitRootLogin no\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent", line: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals((ctx.writes[0].data.changes as string[]).length, 2);
    assertEquals(
      await fake.uploads(),
      new Map([["/etc/ssh/sshd_config", "Port 22\n"]]),
    );
  });
});

Deno.test("line check: an invalid regexp fails before connecting", async () => {
  await withFakeSsh([], async (fake) => {
    const ctx = fakeContext(args({ regexp: "([" }));
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "regexp is not a valid regular expression",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.commands(), []);
  });
});

Deno.test("line: a line regexp does not match is added once, not every run", async () => {
  const lineArgs = args({
    regexp: "^#Banner",
    line: "Banner /etc/issue.net",
  });
  await withFakeSsh([
    { match: "stat -L", stdout: "regular file\n" },
    { match: "cat '", stdout: "Port 22\nBanner /etc/issue.net\n" },
  ], async (fake) => {
    const check = fakeContext(lineArgs);
    await model.methods.check.execute({}, check);
    assertEquals(check.writes[0].data.status, "compliant");
    const apply = fakeContext(lineArgs);
    await model.methods.apply.execute({}, apply);
    assertEquals(apply.writes[0].data.status, "compliant");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("line apply: a directory at the path is refused, not written into", async () => {
  await withFakeSsh([
    { match: "stat -L", stdout: "directory\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "is not a regular file",
    );
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});
