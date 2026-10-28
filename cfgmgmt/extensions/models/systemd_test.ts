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
import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";
import { model } from "./systemd.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    service: "nginx",
    ...overrides,
  });
}

const STOPPED =
  "LoadState=loaded\nActiveState=inactive\nUnitFileState=disabled\n";

Deno.test("systemd apply: failed start keeps the detailed failed record", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: STOPPED },
    { match: "systemctl start", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "running", enabled: true }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    const data = ctx.writes[0].data;
    assertEquals(data.status, "failed");
    assertEquals(data.changes, ["enable service", "start service"]);
    assertEquals(data.current, {
      loaded: true,
      active: "inactive",
      enabled: "disabled",
    });
    assertEquals(typeof data.error, "string");
  });
});

Deno.test("systemd apply: failed daemon-reload is reported, not applied", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: STOPPED },
    { match: "cat '", exitCode: 1 },
    { match: "daemon-reload", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ unitFile: "[Unit]\n" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.writes[0].data.changes, ["create unit file"]);
  });
});

Deno.test("systemd restart: failure keeps the gathered current state", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: STOPPED },
    { match: "systemctl restart", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.restart.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.writes[0].data.changes, ["restart service"]);
    assertEquals(
      (ctx.writes[0].data.current as { loaded: boolean }).loaded,
      true,
    );
  });
});

Deno.test("systemd logs: a journalctl failure throws instead of writing empty logs", async () => {
  await withFakeSsh([
    { match: "journalctl", stdout: "permission denied\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.logs.execute({ lines: 10 }, ctx),
      Error,
      "journalctl failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 0);
  });
});

Deno.test("systemd logs: success writes the journal output", async () => {
  await withFakeSsh([
    { match: "journalctl", stdout: "line 1\n" },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.logs.execute({ lines: 10 }, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.output, "line 1\n");
  });
});

const SECRET = "s3cret-sudo-pw";

/** Every log line, flattened, so a test can assert a secret never appears. */
function logText(logs: { message: string; props?: unknown }[]): string {
  return logs.map((l) => `${l.message} ${JSON.stringify(l.props)}`).join("\n");
}

const RUNNING = "LoadState=loaded\nActiveState=active\nUnitFileState=enabled\n";

Deno.test("systemd check: a running, enabled service is compliant", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: RUNNING },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "running", enabled: true }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
    for (const cmd of await fake.commands()) {
      assertEquals(/systemctl (start|stop|enable|disable)/.test(cmd), false);
    }
  });
});

Deno.test("systemd apply: a stopped service is enabled and started", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: STOPPED },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "running", enabled: true }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(cmds.includes("systemctl enable 'nginx'"), true);
    assertEquals(cmds.includes("systemctl start 'nginx'"), true);
  });
});

Deno.test("systemd restart: an empty stderr still yields a descriptive error", async () => {
  await withFakeSsh([
    { match: "systemctl show", stdout: STOPPED },
    { match: "systemctl restart", exitCode: 5 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.restart.execute({}, ctx),
      Error,
      "systemctl restart failed with exit code 5",
    );
    assertEquals(
      ctx.writes[0].data.error,
      "systemctl restart failed with exit code 5",
    );
  });
});

Deno.test("systemd logs: lines must be a positive integer", () => {
  const schema = model.methods.logs.arguments;
  assertEquals(schema.safeParse({ lines: 10 }).success, true);
  assertEquals(schema.safeParse({ lines: 0 }).success, false);
  assertEquals(schema.safeParse({ lines: 1.5 }).success, false);
});

Deno.test("systemd: methods log entry and completion without leaking secrets", async () => {
  const unit = "[Service]\nEnvironment=TOKEN=unit-file-secret\n";
  await withFakeSsh([
    // The staged-install script also contains `cat `, so its rule comes first.
    { match: "set -e" },
    { match: "systemctl show", stdout: STOPPED },
    { match: "cat ", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(
      args({ unitFile: unit, become: true, becomePassword: SECRET }),
    );
    await model.methods.apply.execute({}, ctx);
    const infos = ctx.logs.filter((l) => l.level === "info");
    assertEquals(infos.length, 2);
    assertStringIncludes(infos[0].message, "{service}");
    assertEquals(infos[0].props?.service, "nginx");
    assertEquals(infos[1].props?.changes, ["create unit file"]);
    const text = logText(ctx.logs);
    assertEquals(text.includes(SECRET), false);
    assertEquals(text.includes("unit-file-secret"), false);
  });
});

Deno.test("systemd logs: a failure is logged at error level", async () => {
  await withFakeSsh([
    { match: "journalctl", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(() => model.methods.logs.execute({ lines: 10 }, ctx));
    const errors = ctx.logs.filter((l) => l.level === "error");
    assertEquals(errors.length, 1);
    assertEquals(errors[0].props?.service, "nginx");
    assertEquals(logText(ctx.logs).includes(SECRET), false);
  });
});
