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
import { model } from "./authorized_key.ts";
import { fakeContext, withFakeSsh } from "./_lib/fake_ssh.ts";

const AK = "/home/alice/.ssh/authorized_keys";
const TARGET = "ssh-ed25519 AAAAC3NzaTARGET alice@laptop";
// A different key whose body has the target's body as a prefix.
const LONGER = "ssh-ed25519 AAAAC3NzaTARGETXYZ bob@laptop";
const OTHER = "ssh-rsa AAAAB3NzaOTHER carol@desk";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    user: "alice",
    key: TARGET,
    ensure: "absent",
    ...overrides,
  });
}

function rules(file: string) {
  return [
    {
      match: "getent passwd",
      stdout: "alice:x:1000:1000::/home/alice:/bin/bash\n",
    },
    // Order matters: the first rule whose text the command contains answers.
    // `cat '` is the read (become quoting turns ' into '\'', which still
    // contains it); the file probe and the later commands name
    // authorized_keys; the remaining stat is the ~/.ssh probe.
    { match: "cat '", stdout: file },
    { match: "authorized_keys", stdout: "regular file\n" },
    { match: "stat -c", stdout: "directory\n" },
  ];
}

Deno.test("authorized_key apply: a malformed key is rejected without touching the file", async () => {
  const file = `${OTHER}\n${LONGER}\n`;
  await withFakeSsh(rules(file), async (fake) => {
    const ctx = fakeContext(args({ key: "AAAA" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(String(last.data.error), "not a valid SSH public key");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("authorized_key apply: removal matches exact key tokens and restores perms", async () => {
  const file = `${OTHER}\nfrom="10.0.0.1" ${TARGET}\n${LONGER}\n`;
  await withFakeSsh(rules(file), async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(
      await fake.uploads(),
      new Map([[AK, `${OTHER}\n${LONGER}\n`]]),
    );
    const cmds = await fake.commands();
    // Permissions are restored, as alice, in a command that first refuses
    // symlinks (quoting differs under sudo, so match the parts).
    const secure = cmds.find((c) => c.includes("chmod 600"));
    assertEquals(secure !== undefined, true, cmds.join("\n"));
    assertStringIncludes(secure!, "[ ! -L ");
    assertStringIncludes(secure!, "sudo -n -u 'alice'");
  });
});

Deno.test("authorized_key check: a key whose body only contains ours is not a match", async () => {
  await withFakeSsh(rules(`${LONGER}\n`), async () => {
    const ctx = fakeContext(args({ ensure: "present" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, ["add key"]);
  });
});

Deno.test("authorized_key apply: a failed chmod after removal fails the run", async () => {
  const file = `${TARGET}\n`;
  await withFakeSsh([
    { match: "chmod 600", exitCode: 1 },
    ...rules(file),
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
  });
});

const SECRET = "sudo-pw-s3cret";

/** Every logged message and prop, as one string, for leak checks. */
function logged(ctx: { logs: unknown[] }): string {
  return JSON.stringify(ctx.logs);
}

Deno.test("authorized_key apply: logs entry and completion without key or password", async () => {
  await withFakeSsh(rules(`${OTHER}\n`), async () => {
    const ctx = fakeContext(
      args({ ensure: "present", become: true, becomePassword: SECRET }),
    );
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(ctx.logs.map((l) => [l.level, l.message]), [
      ["info", "Applying authorized key for {user} on {host}"],
      [
        "info",
        "Authorized key for {user} on {host} is {status} ({changeCount} changes)",
      ],
    ]);
    const all = logged(ctx);
    assertEquals(all.includes(SECRET), false);
    assertEquals(all.includes("AAAAC3NzaTARGET"), false);
  });
});

Deno.test("authorized_key check: a failure is logged at error level", async () => {
  await withFakeSsh(
    [{ match: "getent passwd", stdout: "NOTFOUND\n" }],
    async () => {
      const ctx = fakeContext(args());
      await assertRejects(
        () => model.methods.check.execute({}, ctx),
        Error,
        "User alice not found",
      );
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(ctx.logs[ctx.logs.length - 1].level, "error");
    },
  );
});

Deno.test("authorized_key apply: an unreadable file fails instead of dropping keys", async () => {
  await withFakeSsh([
    {
      match: "getent passwd",
      stdout: "alice:x:1000:1000::/home/alice:/bin/bash\n",
    },
    { match: "cat '", exitCode: 1 },
    { match: "authorized_keys", stdout: "regular file\n" },
    { match: "stat -c", stdout: "directory\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});

// The managed user owns ~/.ssh. A link there must never turn root's writes
// into writes on a file the user chose (alice: authorized_keys -> sudoers).
Deno.test("authorized_key apply: a symlinked authorized_keys is refused", async () => {
  await withFakeSsh([
    {
      match: "getent passwd",
      stdout: "alice:x:1000:1000::/home/alice:/bin/bash\n",
    },
    { match: "authorized_keys", stdout: "symbolic link\n" },
    { match: "stat -c", stdout: "directory\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "refusing to manage it",
    );
    assertEquals(await fake.uploads(), new Map());
    assertEquals(
      (await fake.commands()).some((c) => /chmod|chown|mkdir/.test(c)),
      false,
    );
  });
});

Deno.test("authorized_key apply: a symlinked ~/.ssh is refused", async () => {
  await withFakeSsh([
    {
      match: "getent passwd",
      stdout: "alice:x:1000:1000::/home/alice:/bin/bash\n",
    },
    { match: "stat -c", stdout: "symbolic link\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "refusing to manage it",
    );
    assertEquals(await fake.uploads(), new Map());
  });
});

// Root never works inside the user's ~/.ssh: with become, every command
// touching it runs as the account's owner.
Deno.test("authorized_key apply: file work runs as the account owner", async () => {
  await withFakeSsh(rules(`${OTHER}\n`), async (fake) => {
    const ctx = fakeContext(args({ ensure: "present", become: true }));
    await model.methods.apply.execute({}, ctx);
    const cmds = await fake.commands();
    const touching = cmds.filter((c) =>
      /mkdir|chmod|cat '|set -e/.test(c) && c.includes("/home/alice/.ssh")
    );
    assertEquals(touching.length >= 4, true, cmds.join("\n"));
    for (const c of touching) {
      assert(c.startsWith("sudo -n -u 'alice' -- sh -c"), c);
    }
  });
});

// The default connection is root without become: the owner's files must
// still be written as the owner, or sshd rejects root-owned keys.
Deno.test("authorized_key apply: root without become still works as the owner", async () => {
  await withFakeSsh(rules(`${OTHER}\n`), async (fake) => {
    const ctx = fakeContext(
      args({ ensure: "present", become: false, nodeUser: "root" }),
    );
    await model.methods.apply.execute({}, ctx);
    const touching = (await fake.commands()).filter((c) =>
      /mkdir|chmod|cat '|set -e/.test(c) && c.includes("/home/alice/.ssh")
    );
    assertEquals(touching.length >= 4, true);
    for (const c of touching) {
      assert(c.startsWith("sudo -n -u 'alice' -- sh -c"), c);
    }
  });
});

Deno.test("authorized_key apply: connecting as the owner needs no sudo", async () => {
  await withFakeSsh(rules(`${OTHER}\n`), async (fake) => {
    const ctx = fakeContext(
      args({ ensure: "present", become: false, nodeUser: "alice" }),
    );
    await model.methods.apply.execute({}, ctx);
    const touching = (await fake.commands()).filter((c) =>
      c.includes("/home/alice/.ssh")
    );
    assertEquals(touching.some((c) => c.startsWith("sudo")), false);
  });
});
