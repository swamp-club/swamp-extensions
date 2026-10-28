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
import { model } from "./debug_exec.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const SECRET = "hunter2-debug-exec";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    command: "cat /etc/app.conf",
    become: true,
    becomePassword: SECRET,
    ...overrides,
  });
}

function logText(ctx: ReturnType<typeof fakeContext>): string {
  return ctx.logs.map((l) => l.message + JSON.stringify(l.props ?? {})).join(
    "\n",
  );
}

Deno.test("debug_exec run: captures output as data, not in logs", async () => {
  await withFakeSsh([
    { match: "cat /etc/app.conf", stdout: "password=captured-value\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.run.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
    const data = ctx.writes[0].data;
    assertEquals(data.stdout, "password=captured-value\n");
    assertEquals(data.exitCode, 0);
    assertEquals(data.error, null);
    const logs = logText(ctx);
    assertEquals(logs.includes("Running debug command"), true);
    assertEquals(logs.includes("exited with code"), true);
    assertEquals(logs.includes("captured-value"), false);
    assertEquals(logs.includes(SECRET), false);
  });
});

Deno.test("debug_exec run: a non-zero exit is recorded, not thrown", async () => {
  await withFakeSsh([
    { match: "cat /etc/app.conf", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.run.execute({}, ctx);
    assertEquals(ctx.writes[0].data.exitCode, 1);
    assertEquals(ctx.writes[0].data.error, null);
  });
});

Deno.test("debug_exec run: a connection error records null output and throws", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ nodeHost: "-oProxyCommand=x" }));
    await assertRejects(() => model.methods.run.execute({}, ctx));
    const data = ctx.writes[0].data;
    assertEquals(data.stdout, null);
    assertEquals(data.stderr, null);
    assertEquals(data.exitCode, null);
    assertEquals(typeof data.error, "string");
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    assertEquals(logText(ctx).includes(SECRET), false);
  });
});
