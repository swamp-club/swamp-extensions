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
import { model } from "./selinux.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    mode: "permissive",
    nodeHost: "selinux-1",
    ...overrides,
  });
}

const CONFIG_CMD = "if grep -q '^SELINUX=' /etc/selinux/config; then " +
  "sed -i 's/^SELINUX=.*/SELINUX=permissive/' /etc/selinux/config; " +
  "else printf 'SELINUX=permissive\\n' >> /etc/selinux/config; fi";

Deno.test("selinux apply: config with no SELINUX= line gets one appended", async () => {
  await withFakeSsh([
    { match: "getenforce 2>", stdout: "Permissive\n" },
    { match: "| head -1", stdout: "" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assert(cmds.includes(CONFIG_CMD), cmds.join("\n"));
  });
});

Deno.test("selinux: config command appends the line when missing", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const cfg = `${dir}/config`;
    await Deno.writeTextFile(cfg, "SELINUXTYPE=targeted\n");
    const cmd = CONFIG_CMD.replaceAll("/etc/selinux/config", cfg);
    // Only the append branch runs here: the sed branch uses GNU `sed -i`,
    // which BSD sed on a macOS dev box does not accept.
    const out = await new Deno.Command("sh", { args: ["-c", cmd] }).output();
    assertEquals(out.code, 0);
    assertEquals(
      await Deno.readTextFile(cfg),
      "SELINUXTYPE=targeted\nSELINUX=permissive\n",
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("selinux apply: a failed config update records failed state", async () => {
  await withFakeSsh([
    { match: "getenforce 2>", stdout: "Permissive\n" },
    { match: "| head -1", stdout: "SELINUX=enforcing\n" },
    { match: "sed -i", stdout: "read-only file system\n", exitCode: 4 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(String(last.data.error), "/etc/selinux/config failed");
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

Deno.test("selinux check: logs entry and completion without secrets", async () => {
  await withFakeSsh(
    [{ match: "getenforce 2>", stdout: "Permissive\n" }],
    async () => {
      const ctx = fakeContext(args(BECOME));
      await model.methods.check.execute({}, ctx);
      const info = ctx.logs.filter((l) => l.level === "info");
      assert(info.some((l) => l.message.startsWith("Checking ")));
      assert(info.some((l) =>
        l.message.endsWith("is {status}") &&
        l.props?.status === ctx.writes[0].data.status
      ));
      assertCleanLogs(ctx.logs, "selinux-1");
    },
  );
});

Deno.test("selinux apply: a failure logs an error without secrets", async () => {
  await withFakeSsh([], async () => {
    const ctx = fakeContext(args({ ...BECOME, mode: undefined }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assert(ctx.logs.some((l) => l.message.startsWith("Applying ")));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertStringIncludes(
      String(errors[0].props?.error),
      "Either mode or boolean",
    );
    assertCleanLogs(ctx.logs, "selinux-1");
  });
});
