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
import { model } from "./sysctl.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    key: "net.ipv4.tcp_rmem",
    value: "4096 87380 6291456",
    nodeHost: "sysctl-1",
    ...overrides,
  });
}

Deno.test("sysctl check: tab-separated multi-value key is compliant", async () => {
  await withFakeSsh([
    { match: "sysctl -n", stdout: "4096\t87380\t6291456\n" },
    {
      match: "cat '/etc/sysctl.d/",
      stdout: "net.ipv4.tcp_rmem = 4096 87380 6291456\n",
    },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("sysctl check: a different multi-value is still drift", async () => {
  await withFakeSsh([
    { match: "sysctl -n", stdout: "4096\t131072\t6291456\n" },
    {
      match: "cat '/etc/sysctl.d/",
      stdout: "net.ipv4.tcp_rmem = 4096 87380 6291456\n",
    },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals((ctx.writes[0].data.changes as string[]).length, 1);
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

Deno.test("sysctl check: logs entry and completion without secrets", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args(BECOME));
    await model.methods.check.execute({}, ctx);
    const info = ctx.logs.filter((l) => l.level === "info");
    assert(info.some((l) => l.message.startsWith("Checking ")));
    assert(info.some((l) =>
      l.message.endsWith("is {status}") &&
      l.props?.status === ctx.writes[0].data.status
    ));
    assertCleanLogs(ctx.logs, "sysctl-1");
  });
});

Deno.test("sysctl apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([{
    match: "sysctl -w",
    stdout: "permission denied\n",
    exitCode: 1,
  }], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(String(errors[0].props?.error), "sysctl -w failed");
    assertCleanLogs(ctx.logs, "sysctl-1");
  });
});

Deno.test("sysctl apply: a slash-separated key persists directly in /etc/sysctl.d", async () => {
  await withFakeSsh([], async (fake) => {
    const ctx = fakeContext(args({ key: "net/ipv4/ip_forward", value: "1" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      [...(await fake.uploads()).keys()],
      ["/etc/sysctl.d/99-cfgmgmt-net-ipv4-ip_forward.conf"],
    );
  });
});

Deno.test("sysctl apply: a failed removal of the persistence file records failed", async () => {
  await withFakeSsh([
    {
      match: "cat '/etc/sysctl.d/",
      stdout: "net.ipv4.tcp_rmem = 4096 87380 6291456\n",
    },
    { match: "rm -f", stdout: "read-only file system\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "remove /etc/sysctl.d/99-cfgmgmt-net-ipv4-tcp_rmem.conf failed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});
