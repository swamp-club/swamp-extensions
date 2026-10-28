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
import { membersCommand, model } from "./group.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    groupname: "devs",
    ensure: "present",
    ...overrides,
  });
}

Deno.test("group apply: groupadd escapes the group name", async () => {
  await withFakeSsh([
    { match: "getent group", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ groupname: "web ops; rm -rf /" }));
    await model.methods.apply.execute({}, ctx);
    const cmds = await fake.commands();
    assertEquals(
      cmds.includes("groupadd 'web ops; rm -rf /'"),
      true,
      cmds.join("\n"),
    );
  });
});

Deno.test("group membersCommand: an empty member list clears members with gpasswd -M ''", () => {
  assertEquals(membersCommand([], "devs"), "gpasswd -M '' 'devs'");
  assertEquals(
    membersCommand(["alice", "bob"], "devs"),
    "gpasswd -M 'alice,bob' 'devs'",
  );
});

Deno.test("group apply: emptying members sends gpasswd -M ''", async () => {
  await withFakeSsh([
    { match: "getent group", stdout: "devs:x:1001:alice,bob\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ members: [] }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(cmds.includes("gpasswd -M '' 'devs'"), true, cmds.join("\n"));
  });
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

Deno.test("group check: logs entry and completion without the sudo password", async () => {
  await withFakeSsh([
    { match: "getent group", stdout: "devs:x:2000:alice,bob\n" },
  ], async () => {
    const ctx = fakeContext(
      args({ members: ["bob"], become: true, becomePassword: SECRET }),
    );
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Checking group {groupname} on {host}"],
      [
        "info",
        "Group {groupname} on {host} is {status} ({changeCount} changes)",
      ],
    ]);
    assertEquals(ctx.logs[1].props?.changeCount, 1);
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});

Deno.test("group apply: a failed groupadd records failed and logs the error", async () => {
  await withFakeSsh([
    { match: "getent group", stdout: "NOTFOUND\n" },
    { match: "groupadd", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ become: true, becomePassword: SECRET }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "groupadd failed",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(ctx.logs[ctx.logs.length - 1].level, "error");
    assertEquals(logged(ctx).includes(SECRET), false);
  });
});
