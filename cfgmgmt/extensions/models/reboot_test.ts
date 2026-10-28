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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { model, rebootCommand, rebootTiming } from "./reboot.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const MESSAGE = "it's $(echo pwned) time; `id`";
const SECRET = "hunter2-reboot";
const BEFORE = "2026-10-01 08:00:00";
const AFTER = "2026-10-27 10:05:00";

/** Runs `fn` with the reboot waits shortened so tests do not sleep. */
async function fast(fn: () => Promise<void>): Promise<void> {
  const saved = { ...rebootTiming };
  rebootTiming.settleMs = 0;
  rebootTiming.pollMs = 10;
  try {
    await fn();
  } finally {
    Object.assign(rebootTiming, saved);
  }
}

function logText(ctx: ReturnType<typeof fakeContext>): string {
  return ctx.logs.map((l) => l.message + JSON.stringify(l.props ?? {})).join(
    "\n",
  );
}

Deno.test("reboot: message reaches shutdown as one literal argument", async () => {
  const dir = await Deno.makeTempDir();
  try {
    // A stand-in shutdown that prints its arguments, one per line.
    await Deno.writeTextFile(
      `${dir}/shutdown`,
      '#!/bin/sh\nfor a in "$@"; do printf \'%s\\n\' "$a"; done\n',
      { mode: 0o755 },
    );
    // Drop the nohup/background wrapper so the inner command runs inline.
    const cmd = rebootCommand(MESSAGE)
      .replace(/^nohup /, "")
      .replace(/ >\/dev\/null 2>&1 &$/, "")
      .replace("sleep 1 && ", "");
    const out = await new Deno.Command("sh", {
      args: ["-c", cmd],
      env: { PATH: `${dir}:${Deno.env.get("PATH") ?? ""}` },
    }).output();
    assertEquals(out.code, 0);
    assertEquals(
      new TextDecoder().decode(out.stdout),
      `-r\nnow\n${MESSAGE}\n`,
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("reboot apply: sends the escaped reboot command", async () => {
  await fast(() =>
    withFakeSsh([
      { match: "echo ready", stdout: `ready\n${AFTER}\n` },
      { match: "uptime", stdout: `${BEFORE}\n` },
    ], async (fake) => {
      const ctx = fakeContext(
        model.globalArguments.parse({ nodeHost: "reboot-1", message: MESSAGE }),
      );
      await model.methods.apply.execute({}, ctx);
      const data = ctx.writes[0].data;
      assertEquals(data.status, "applied");
      assertEquals(data.preRebootUptime, BEFORE);
      assertEquals(data.postRebootUptime, AFTER);
      assertEquals(data.changes, ["rebooted host"]);
      const cmds = await fake.commands();
      assert(cmds.includes(rebootCommand(MESSAGE)), cmds.join("\n"));
      assertEquals(
        rebootCommand("bye"),
        "nohup sh -c 'sleep 1 && shutdown -r now '\\''bye'\\''' >/dev/null 2>&1 &",
      );
    })
  );
});

Deno.test("reboot apply: logs entry and completion without the become password", async () => {
  await fast(() =>
    withFakeSsh([
      { match: "echo ready", stdout: `ready\n${AFTER}\n` },
      { match: "uptime", stdout: `${BEFORE}\n` },
    ], async () => {
      const ctx = fakeContext(
        model.globalArguments.parse({
          nodeHost: "reboot-1",
          become: true,
          becomePassword: SECRET,
        }),
      );
      await model.methods.apply.execute({}, ctx);
      assertEquals(ctx.writes[0].data.status, "applied");
      const logs = logText(ctx);
      assertEquals(logs.includes("Rebooting {host}"), true);
      assertEquals(logs.includes("rebooted and is healthy"), true);
      assertEquals(logs.includes(SECRET), false);
    })
  );
});

Deno.test("reboot apply: a host that never reboots times out and records failed", async () => {
  await fast(() =>
    withFakeSsh([
      // Reachable, but still reporting the pre-reboot boot time.
      { match: "echo ready", stdout: `ready\n${BEFORE}\n` },
      { match: "uptime", stdout: `${BEFORE}\n` },
    ], async () => {
      const ctx = fakeContext(
        model.globalArguments.parse({ nodeHost: "reboot-1", timeout: 0.05 }),
      );
      await assertRejects(
        () => model.methods.apply.execute({}, ctx),
        Error,
        "did not come back with a new boot time",
      );
      assertEquals(ctx.writes.length, 1);
      const data = ctx.writes[0].data;
      assertEquals(data.status, "failed");
      assertEquals(data.preRebootUptime, BEFORE);
      assertEquals(data.postRebootUptime, null);
      assertEquals(data.changes, ["rebooted host"]);
      assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    })
  );
});

Deno.test("reboot apply: a refused reboot command fails before waiting", async () => {
  await fast(() =>
    withFakeSsh([
      {
        match: "shutdown",
        exitCode: 1,
        stdout: "sudo: a password is required\n",
      },
      { match: "uptime", stdout: `${BEFORE}\n` },
    ], async (fake) => {
      const ctx = fakeContext(
        model.globalArguments.parse({ nodeHost: "reboot-1", become: true }),
      );
      await assertRejects(
        () => model.methods.apply.execute({}, ctx),
        Error,
        "reboot failed with exit code 1",
      );
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(ctx.writes[0].data.changes, []);
      assertEquals(
        (await fake.commands()).some((c) => c.includes("echo ready")),
        false,
      );
    })
  );
});

Deno.test("reboot apply: a failing health check records failed", async () => {
  await fast(() =>
    withFakeSsh([
      { match: "echo ready", stdout: `ready\n${AFTER}\n` },
      { match: "systemctl is-system-running", exitCode: 1 },
      { match: "uptime", stdout: `${BEFORE}\n` },
    ], async () => {
      const ctx = fakeContext(
        model.globalArguments.parse({
          nodeHost: "reboot-1",
          testCommand: "systemctl is-system-running",
        }),
      );
      await assertRejects(
        () => model.methods.apply.execute({}, ctx),
        Error,
        "Post-reboot test command failed",
      );
      const data = ctx.writes[0].data;
      assertEquals(data.status, "failed");
      assertEquals(data.postRebootUptime, AFTER);
    })
  );
});

Deno.test("reboot check: always non_compliant with the current boot time", async () => {
  await withFakeSsh([
    { match: "uptime", stdout: `${BEFORE}\n` },
  ], async (fake) => {
    const ctx = fakeContext(model.globalArguments.parse({ nodeHost: "r-1" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.preRebootUptime, BEFORE);
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("shutdown"), false, cmd);
    }
  });
});
