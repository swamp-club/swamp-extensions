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
import { model } from "./debug_file.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const SECRET = "hunter2-debug-file";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    path: "/etc/app.conf",
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

Deno.test("debug_file run: captures content as data, not in logs", async () => {
  await withFakeSsh([
    { match: "cat ", stdout: "api_key=file-content-value\n" },
    { match: "stat -c", stdout: "27\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.run.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
    assertEquals(ctx.writes[0].data, {
      ...ctx.writes[0].data,
      exists: true,
      content: "api_key=file-content-value\n",
      size: 27,
      error: null,
    });
    const logs = logText(ctx);
    assertEquals(logs.includes("Reading {path} on {host}"), true);
    assertEquals(logs.includes("Read {path} on {host}"), true);
    assertEquals(logs.includes("file-content-value"), false);
    assertEquals(logs.includes(SECRET), false);
  });
});

Deno.test("debug_file run: a missing file is recorded as not existing", async () => {
  await withFakeSsh([
    { match: "cat ", exitCode: 1 },
    { match: "test -e", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.run.execute({}, ctx);
    const data = ctx.writes[0].data;
    assertEquals(data.exists, false);
    assertEquals(data.content, null);
    assertEquals(data.size, null);
    assertEquals(data.error, "File not found");
  });
});

Deno.test("debug_file run: an unreadable file is recorded as existing", async () => {
  await withFakeSsh([
    { match: "cat ", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.run.execute({}, ctx);
    assertEquals(ctx.writes[0].data.exists, true);
    assertEquals(ctx.writes[0].data.error, "File is not readable");
  });
});

Deno.test("debug_file run: a connection error records unknown existence and throws", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ nodeHost: "-oProxyCommand=x" }));
    await assertRejects(() => model.methods.run.execute({}, ctx));
    const data = ctx.writes[0].data;
    assertEquals(data.exists, null);
    assertEquals(data.content, null);
    assertEquals(typeof data.error, "string");
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    assertEquals(logText(ctx).includes(SECRET), false);
  });
});
