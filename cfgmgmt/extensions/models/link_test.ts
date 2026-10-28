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
import { model } from "./link.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    nodeUser: "deploy",
    path: "/etc/nginx/sites-enabled/app",
    ensure: "present",
    target: "/etc/nginx/sites-available/app",
    ...overrides,
  });
}

const MISSING = [
  { match: "test -L", stdout: "NOTLINK\n" },
  { match: "test -e", stdout: "NOTEXISTS\n" },
];

for (const method of ["check", "apply"] as const) {
  Deno.test(`link ${method}: ensure present without a target fails clearly`, async () => {
    await withFakeSsh(MISSING, async (fake) => {
      const ctx = fakeContext(args({ target: undefined }));
      await assertRejects(
        () => model.methods[method].execute({}, ctx),
        Error,
        "target is required when ensure is present",
      );
      assertEquals(ctx.writes.length, 1);
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(
        ctx.writes[0].data.error,
        "target is required when ensure is present",
      );
      assertEquals(await fake.commands(), []);
    });
  });
}

Deno.test("link apply: ensure absent needs no target", async () => {
  await withFakeSsh([
    { match: "test -L", stdout: "ISLINK\n" },
    { match: "readlink", stdout: "/somewhere\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent", target: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      (await fake.commands()).includes("rm -f '/etc/nginx/sites-enabled/app'"),
      true,
    );
  });
});

Deno.test("link apply: a failed ln records failed state and throws", async () => {
  await withFakeSsh([
    ...MISSING,
    { match: "ln -sfn", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "ln failed",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
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

Deno.test("link: check and apply log entry and completion without secrets", async () => {
  await withFakeSsh(MISSING, async (fake) => {
    const g = args({ become: true, becomePassword: SUDO_PASSWORD });
    const checkCtx = fakeContext(g);
    await model.methods.check.execute({}, checkCtx);
    assertEquals(checkCtx.writes[0].data.status, "non_compliant");
    assertLogged(checkCtx.logs, "Checking symlink", "is {status}");

    const applyCtx = fakeContext(g);
    await model.methods.apply.execute({}, applyCtx);
    assertEquals(applyCtx.writes[0].data.status, "applied");
    assertLogged(applyCtx.logs, "Applying symlink", "is {status}");
    assertEquals(
      (await fake.commands()).some((c) => c.includes("ln -sfn")),
      true,
    );
  });
});

Deno.test("link apply: ensure absent refuses to remove a regular file", async () => {
  await withFakeSsh([
    { match: "test -L", stdout: "NOTLINK\n" },
    { match: "test -e", stdout: "EXISTS\n" },
    { match: "stat -c", stdout: "root|root\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent", target: undefined }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "is not a symlink; refusing to remove it",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("rm -f"), false, cmd);
    }
  });
});

Deno.test("link apply: a directory at the path is refused, not linked into", async () => {
  await withFakeSsh([
    { match: "test -L", stdout: "NOTLINK\n" },
    { match: "test -e", stdout: "EXISTS\n" },
    { match: "stat -c", stdout: "root|root\n" },
    { match: "test -d", exitCode: 0 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "refusing to replace it",
    );
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("ln -sfn"), false, cmd);
    }
  });
});

Deno.test("link apply: a regular file at the path is replaced by the link", async () => {
  await withFakeSsh([
    { match: "test -L", stdout: "NOTLINK\n" },
    { match: "test -e", stdout: "EXISTS\n" },
    { match: "stat -c", stdout: "root|root\n" },
    { match: "test -d", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      (await fake.commands()).some((c) => c.includes("ln -sfn")),
      true,
    );
  });
});
