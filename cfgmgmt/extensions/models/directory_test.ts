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
import { model } from "./directory.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "web-1",
  nodeUser: "deploy",
  path: "/srv/app",
  ensure: "present",
  mode: "755",
};

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

Deno.test("directory check: a 3-digit mode matches stat's mode", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "directory|root|root|755\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    const current = ctx.writes[0].data.current as Record<string, unknown>;
    assertEquals(current.mode, "0755");
  });
});

Deno.test("directory check: a setgid mode matches stat's mode", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "directory|root|root|2775\n" },
  ], async () => {
    const ctx = fakeContext(args({ mode: "2775" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
  });
});

Deno.test("directory apply: path that is a regular file fails instead of reporting applied", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|755\n" },
    { match: "mkdir -p", exitCode: 1, stdout: "File exists\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "mkdir failed with exit code 1: File exists",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    for (const cmd of await fake.commands()) {
      assertEquals(/chmod|chown/.test(cmd), false, cmd);
    }
  });
});

Deno.test("directory apply: a failed chown records failed state and throws", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
    { match: "chown", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ owner: "app" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "chown failed",
    );
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
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

Deno.test("directory: check and apply log entry and completion without secrets", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const g = args({ become: true, becomePassword: SUDO_PASSWORD });
    const checkCtx = fakeContext(g);
    await model.methods.check.execute({}, checkCtx);
    assertEquals(checkCtx.writes[0].data.status, "non_compliant");
    assertLogged(checkCtx.logs, "Checking directory", "is {status}");

    const applyCtx = fakeContext(g);
    await model.methods.apply.execute({}, applyCtx);
    assertEquals(applyCtx.writes[0].data.status, "applied");
    assertLogged(applyCtx.logs, "Applying directory", "is {status}");
    assertEquals(
      applyCtx.logs.some((l) => l.props?.status === "applied"),
      true,
    );
    assertEquals(
      (await fake.commands()).some((c) => c.includes("mkdir -p")),
      true,
    );
  });
});

Deno.test("directory apply: ensure absent refuses to rm -rf a regular file", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "is not a directory; refusing to remove it",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("rm -rf"), false, cmd);
    }
  });
});
