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
import { model, withoutManagedNames } from "./host_entry.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    hostname: "db",
    ip: "10.0.0.5",
    ensure: "present",
    ...overrides,
  });
}

const HOSTS = "127.0.0.1\tlocalhost\n";

Deno.test("host_entry apply: entry is appended to the existing file", async () => {
  await withFakeSsh([
    { match: "cat /etc/hosts", stdout: HOSTS },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const written = (await fake.uploads()).get("/etc/hosts") ?? "";
    assertEquals(written.startsWith(HOSTS), true, written);
    assertEquals(written.endsWith("\n10.0.0.5\tdb\n"), true, written);
  });
});

Deno.test("host_entry apply: a failed read of /etc/hosts fails without rewriting it", async () => {
  await withFakeSsh([
    { match: "test ! -e /etc/hosts", exitCode: 1, stdout: "I/O error\n" },
    { match: "cat /etc/hosts", stdout: HOSTS },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "read /etc/hosts failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("host_entry apply: a failed write records failed state", async () => {
  await withFakeSsh([
    { match: "cat /etc/hosts", stdout: HOSTS },
    { match: "mv ", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

Deno.test("host_entry check: logs entry and completion without the sudo password", async () => {
  await withFakeSsh([
    { match: "cat /etc/hosts", stdout: `${HOSTS}10.0.0.5\tdb\n` },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Checking hosts entry {hostname} on {host}"],
      [
        "info",
        "Hosts entry {hostname} on {host} is {status} ({changeCount} changes)",
      ],
    ]);
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("host_entry apply: a failure is logged at error level", async () => {
  await withFakeSsh([
    { match: "test ! -e /etc/hosts", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.logs[ctx.logs.length - 1];
    assertEquals(last.level, "error");
    assertEquals(
      last.message,
      "Applying hosts entry {hostname} on {host} failed: {error}",
    );
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("host_entry: a shared line keeps its other names", () => {
  const out = withoutManagedNames(
    [
      "127.0.0.1\tlocalhost myapp",
      "198.51.100.5\tmyapp db # managed by swamp",
      "198.51.100.9\tother db legacy",
      "# a comment naming myapp",
      "",
    ],
    { hostname: "myapp", aliases: ["db"] },
  );
  assertEquals(out, [
    "127.0.0.1\tlocalhost",
    "198.51.100.9\tother legacy",
    "# a comment naming myapp",
    "",
  ]);
});

Deno.test("host_entry apply: localhost survives managing a name on its line", async () => {
  await withFakeSsh([
    { match: "/etc/hosts", stdout: "127.0.0.1\tlocalhost myapp\n" },
  ], async (fake) => {
    const ctx = fakeContext(
      model.globalArguments.parse({
        nodeHost: "web-1",
        hostname: "myapp",
        ip: "198.51.100.5",
        ensure: "present",
      }),
    );
    await model.methods.apply.execute({}, ctx);
    assertEquals(
      (await fake.uploads()).get("/etc/hosts"),
      "127.0.0.1\tlocalhost\n198.51.100.5\tmyapp\n",
    );
  });
});
