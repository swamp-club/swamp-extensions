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
import { model } from "./exec.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

Deno.test("exec apply: failed command keeps its output and exit code", async () => {
  await withFakeSsh([
    { match: "run-migrations", stdout: "migrating...\n", exitCode: 3 },
  ], async () => {
    const ctx = fakeContext(model.globalArguments.parse({
      nodeHost: "web-1",
      command: "run-migrations",
    }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.exitCode, 3);
    assertEquals(data.stdout, "migrating...\n");
    assertEquals(data.changes, ["exec: run-migrations"]);
  });
});

const SECRET = "hunter2-exec-secret";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    command: "run-migrations",
    become: true,
    becomePassword: SECRET,
    ...overrides,
  });
}

function assertNoSecretInLogs(
  logs: { message: string; props?: Record<string, unknown> }[],
  secrets: string[],
) {
  for (const line of logs) {
    const text = line.message + JSON.stringify(line.props ?? {});
    for (const s of secrets) {
      assertEquals(text.includes(s), false, `log leaks ${s}: ${text}`);
    }
  }
}

Deno.test("exec check: guards decide compliance and the command never runs", async () => {
  await withFakeSsh([
    { match: "test -f /done", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args({ notIf: "test -f /done" }));
    await model.methods.check.execute({}, ctx);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "non_compliant");
    assertEquals(data.changes, ["exec: run-migrations"]);
    assertEquals(data.stdout, null);
    assertEquals(data.exitCode, null);
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("run-migrations"), false, cmd);
    }
  });
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ notIf: "test -f /done" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("exec apply: success records output and logs without secrets", async () => {
  await withFakeSsh([
    { match: "run-migrations", stdout: `token=${SECRET}-out\n` },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "applied");
    assertEquals(data.exitCode, 0);
    assertEquals(data.error, null);
    assertEquals(
      ctx.logs.some((l) => l.message.startsWith("Running exec command")),
      true,
    );
    assertEquals(
      ctx.logs.some((l) => l.message.includes("applied with exit code")),
      true,
    );
    assertNoSecretInLogs(ctx.logs, [SECRET]);
  });
});

Deno.test("exec apply: onlyIf guard skips the command", async () => {
  await withFakeSsh([
    { match: "test -d /srv", exitCode: 1 },
  ], async (fake) => {
    const ctx = fakeContext(args({ onlyIf: "test -d /srv" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.exitCode, null);
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("run-migrations"), false, cmd);
    }
  });
});

Deno.test("exec apply: a failed command logs an error without its output", async () => {
  await withFakeSsh([
    { match: "run-migrations", stdout: "secret-output\n", exitCode: 2 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "command exited with code 2",
    );
    assertEquals(ctx.writes[0].data.error, "command exited with code 2");
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    assertNoSecretInLogs(ctx.logs, [SECRET, "secret-output"]);
  });
});

Deno.test("exec apply: an invalid host records failed with no command output", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ nodeHost: "-oProxyCommand=x" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.stdout, null);
    assertEquals(data.exitCode, null);
    assertEquals(typeof data.error, "string");
  });
});
