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
import { model } from "./mount.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    path: "/data",
    device: "/dev/sdb1",
    fstype: "ext4",
    options: "defaults,noatime",
    ensure: "mounted",
    nodeHost: "mount-1",
    ...overrides,
  });
}

const mounted = [
  { match: "findmnt -n -o SOURCE", stdout: "/dev/sdb1 ext4 rw,relatime\n" },
  { match: "findmnt -n -o TARGET", stdout: "/data\n" },
];

Deno.test("mount apply: changed options on a mounted filesystem remount it", async () => {
  await withFakeSsh([
    ...mounted,
    {
      match: "cat /etc/fstab",
      stdout: "/dev/sdb1\t/data\text4\tdefaults\t0\t0\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assert(
      cmds.includes("mount -o 'remount,defaults,noatime' '/data'"),
      cmds.join("\n"),
    );
    assertEquals(cmds.includes("umount '/data'"), false);
  });
});

Deno.test("mount apply: changed device on a mounted filesystem unmounts and mounts", async () => {
  await withFakeSsh([
    ...mounted,
    {
      match: "cat /etc/fstab",
      stdout: "/dev/sdc1\t/data\text4\tdefaults,noatime\t0\t0\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    const umount = cmds.indexOf("umount '/data'");
    const mount = cmds.indexOf("mount '/data'");
    assert(umount >= 0 && mount > umount, cmds.join("\n"));
  });
});

Deno.test("mount apply: a failed remount records failed state", async () => {
  await withFakeSsh([
    ...mounted,
    {
      match: "cat /etc/fstab",
      stdout: "/dev/sdb1\t/data\text4\tdefaults\t0\t0\n",
    },
    { match: "remount", stdout: "mount: bad option\n", exitCode: 32 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(String(last.data.error), "remount failed");
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

Deno.test("mount check: logs entry and completion without secrets", async () => {
  await withFakeSsh(mounted, async () => {
    const ctx = fakeContext(args(BECOME));
    await model.methods.check.execute({}, ctx);
    const info = ctx.logs.filter((l) => l.level === "info");
    assert(info.some((l) => l.message.startsWith("Checking ")));
    assert(info.some((l) =>
      l.message.endsWith("is {status}") &&
      l.props?.status === ctx.writes[0].data.status
    ));
    assertCleanLogs(ctx.logs, "mount-1");
  });
});

Deno.test("mount apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([...mounted, {
    match: "cat /etc/fstab",
    stdout: "/dev/sdb1\t/data\text4\tdefaults\t0\t0\n",
  }, { match: "remount", stdout: "bad option\n", exitCode: 32 }], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(String(errors[0].props?.error), "remount failed");
    assertCleanLogs(ctx.logs, "mount-1");
  });
});

Deno.test("mount: fstab fields with whitespace are rejected", () => {
  assertThrows(() => args({ device: "/dev/sdb1 /etc" }));
  assertThrows(() => args({ options: "defaults\n/dev/sdc1" }));
  assertThrows(() => args({ path: "/my data" }));
});
