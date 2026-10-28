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
import { model } from "./kernel_module.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

const LSMOD = [
  "Module                  Size  Used by",
  "nf_conntrack          172032  1 br_netfilter",
  "ip6_tables             32768  0",
  "",
].join("\n");

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    name: "br_netfilter",
    persist: false,
    ...overrides,
  });
}

Deno.test("kernel_module check: a name in the Used by column is not loaded", async () => {
  await withFakeSsh([{ match: "lsmod", stdout: LSMOD }], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, ["load module"]);
  });
});

Deno.test("kernel_module check: a hyphenated name matches lsmod's underscores", async () => {
  await withFakeSsh([{ match: "lsmod", stdout: LSMOD }], async () => {
    const ctx = fakeContext(args({ name: "ip6-tables" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(
      (ctx.writes[0].data.current as { loaded: boolean }).loaded,
      true,
    );
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

Deno.test("kernel_module check: logs entry and completion without secrets", async () => {
  await withFakeSsh([{ match: "lsmod", stdout: LSMOD }], async () => {
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

Deno.test("kernel_module apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([{ match: "lsmod", stdout: LSMOD }, {
    match: "modprobe",
    stdout: "not found\n",
    exitCode: 1,
  }], async () => {
    const ctx = fakeContext(args(BECOME));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(String(errors[0].props?.error), "modprobe failed");
    assertCleanLogs(ctx.logs, "web-1");
  });
});

Deno.test("kernel_module apply: each module parameter is shell-quoted", async () => {
  await withFakeSsh([{ match: "lsmod", stdout: LSMOD }], async (fake) => {
    const ctx = fakeContext(args({ params: "a=1  b=$(reboot)" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assert(
      cmds.includes("modprobe 'br_netfilter' 'a=1' 'b=$(reboot)'"),
      cmds.join("\n"),
    );
  });
});

Deno.test("kernel_module apply: a failed persistence removal records failed", async () => {
  await withFakeSsh([
    { match: "lsmod", stdout: LSMOD },
    { match: "test -f", stdout: "Y\n" },
    { match: "rm -f", stdout: "read-only file system\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent" }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "remove /etc/modules-load.d/cfgmgmt-br_netfilter.conf failed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("kernel_module: a name that is not a module name is rejected", () => {
  assertThrows(() => args({ name: "../../etc/passwd" }));
  assertThrows(() => args({ name: "overlay; reboot" }));
});
