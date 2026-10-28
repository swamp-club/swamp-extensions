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
import { model } from "./user.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const RULES = [
  {
    match: "getent passwd",
    stdout: "alice:x:1000:1000::/home/alice:/bin/sh\n",
  },
  { match: "id -gn", stdout: "alice\n" },
  { match: "id -nG", stdout: "alice docker wheel\n" },
];

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    username: "alice",
    ensure: "present",
    ...overrides,
  });
}

function usermods(cmds: string[]) {
  return cmds.filter((c) => c.startsWith("usermod"));
}

Deno.test("user apply: unchanged groups are not passed to usermod", async () => {
  await withFakeSsh(RULES, async (fake) => {
    const ctx = fakeContext(
      args({ groups: ["wheel", "docker"], shell: "/bin/bash" }),
    );
    await model.methods.apply.execute({}, ctx);
    assertEquals(usermods(await fake.commands()), [
      "usermod -s '/bin/bash' 'alice'",
    ]);
  });
});

Deno.test("user apply: changed groups are passed to usermod", async () => {
  await withFakeSsh(RULES, async (fake) => {
    const ctx = fakeContext(args({ groups: ["wheel"] }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(usermods(await fake.commands()), [
      "usermod -G 'wheel' 'alice'",
    ]);
  });
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

Deno.test("user check: logs entry and completion without the sudo password", async () => {
  await withFakeSsh(RULES, async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Checking user {username} on {host}"],
      ["info", "User {username} on {host} is {status} ({changeCount} changes)"],
    ]);
    assertEquals(ctx.logs[1].props?.status, "compliant");
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("user apply: a failed useradd records failed and logs the error", async () => {
  await withFakeSsh([
    { match: "getent passwd", stdout: "NOTFOUND\n" },
    { match: "useradd", exitCode: 1, stdout: "useradd: boom\n" },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    const last = ctx.logs[ctx.logs.length - 1];
    assertEquals(last.level, "error");
    assertEquals(
      last.message,
      "Applying user {username} on {host} failed: {error}",
    );
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("user apply: a sudo refusal leaves no 'already absent' verdict", async () => {
  await withFakeSsh([
    { match: "getent passwd", sudoFails: true },
  ], async (fake) => {
    const ctx = fakeContext(
      model.globalArguments.parse({
        nodeHost: "web-1",
        username: "olduser",
        ensure: "absent",
        become: true,
      }),
    );
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assertEquals(
      (await fake.commands()).some((c) => c.includes("userdel")),
      false,
    );
  });
});
