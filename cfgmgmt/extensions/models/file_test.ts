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
import { model } from "./file.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

const base = {
  nodeHost: "web-1",
  nodeUser: "deploy",
  path: "/etc/motd",
  ensure: "present",
  content: "hello\n",
  mode: "0644",
};

// sha256 of "hello\n"
const HELLO_SHA =
  "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({ ...base, ...overrides });
}

Deno.test("file check: matching file is compliant", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].name, "web-1");
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("file check: drift is reported without changing anything", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|600\n" },
    {
      match: "sha256sum",
      stdout:
        "0000000000000000000000000000000000000000000000000000000000000000  /x\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "non_compliant");
    assertEquals(ctx.writes[0].data.changes, [
      "mode: 0600 -> 0644",
      "content differs",
    ]);
    assertEquals(await fake.uploads(), new Map());
    for (const cmd of await fake.commands()) {
      assertEquals(/chmod|chown|rm |mkdir/.test(cmd), false, cmd);
    }
  });
});

Deno.test("file apply: missing file is created, uploaded and chmodded", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals(
      await fake.uploads(),
      new Map([["/etc/motd", "hello\n"]]),
    );
    const cmds = await fake.commands();
    assertEquals(cmds.includes("mkdir -p '/etc'"), true);
    assertEquals(cmds.includes("chmod 0644 '/etc/motd'"), true);
  });
});

Deno.test("file apply: ensure absent removes the file", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ ensure: "absent", content: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals((await fake.commands()).includes("rm -f '/etc/motd'"), true);
  });
});

Deno.test("file apply: a failed write records failed state and throws", async () => {
  await withFakeSsh([
    // The staged install script also runs `stat -c`, so its rule comes first.
    { match: "set -e", exitCode: 1 },
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async () => {
    const ctx = fakeContext(args({ become: true }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertEquals(typeof last.data.error, "string");
  });
});

Deno.test("file check: a 3-digit mode matches stat's mode", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args({ mode: "644" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(ctx.writes[0].data.changes, []);
  });
});

Deno.test("file apply: a setuid mode is not re-chmodded every run", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|4755\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async (fake) => {
    const ctx = fakeContext(args({ mode: "4755" }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    const current = ctx.writes[0].data.current as Record<string, unknown>;
    assertEquals(current.mode, "4755");
    for (const cmd of await fake.commands()) {
      assertEquals(cmd.includes("chmod"), false, cmd);
    }
  });
});

Deno.test("file apply: a failed chmod records failed state and throws", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|600\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    {
      match: "chmod 0644 '/etc/motd'",
      exitCode: 1,
      stdout: "Operation not permitted\n",
    },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "chmod failed with exit code 1",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(
      String(ctx.writes[0].data.error).includes("chmod failed"),
      true,
    );
  });
});

Deno.test("file apply: a failed rm records failed state and throws", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "rm -f", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent", content: undefined }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "rm failed",
    );
    assertEquals(ctx.writes[ctx.writes.length - 1].data.status, "failed");
  });
});

Deno.test("file apply: no content creates a missing file empty", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ content: undefined, mode: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    assertEquals((await fake.commands()).includes("touch '/etc/motd'"), true);
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("file apply: no content leaves an existing file alone", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    {
      match: "sha256sum",
      stdout:
        "0000000000000000000000000000000000000000000000000000000000000000  /x\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args({ content: undefined }));
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "compliant");
    assertEquals(
      (await fake.commands()).some((c) => c.startsWith("touch")),
      false,
    );
  });
});

const SUDO_PASSWORD = "hunter2-sudo-pw";

/** Entry and completion are logged at info, and no secret reaches any line. */
function assertLogged(
  logs: LogLine[],
  entry: string,
  done: string,
  secrets: string[] = [],
) {
  const text = JSON.stringify(logs);
  for (const secret of [SUDO_PASSWORD, ...secrets]) {
    assertEquals(text.includes(secret), false, text);
  }
  const first = logs.find((l) => l.message.startsWith(entry));
  assertEquals(first?.level, "info", text);
  assertEquals(first?.props?.host, "web-1");
  assertEquals(
    logs.some((l) => l.level === "info" && l.message.includes(done)),
    true,
    text,
  );
}

Deno.test("file: check and apply log entry and completion without secrets or content", async () => {
  const content = "api_key=do-not-log-me\n";
  await withFakeSsh([
    { match: "stat -c", stdout: "NOTFOUND\n" },
  ], async () => {
    const g = args({ content, become: true, becomePassword: SUDO_PASSWORD });
    const checkCtx = fakeContext(g);
    await model.methods.check.execute({}, checkCtx);
    assertLogged(checkCtx.logs, "Checking file", "is {status}", [content]);

    const applyCtx = fakeContext(g);
    await model.methods.apply.execute({}, applyCtx);
    assertLogged(applyCtx.logs, "Applying file", "is applied", [content]);
  });
});

Deno.test("file apply: failure is logged at error without the sudo password", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|600\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    { match: "chmod 0644 '", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(
      args({ become: true, becomePassword: SUDO_PASSWORD }),
    );
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const error = ctx.logs.find((l) => l.level === "error");
    assertEquals(String(error?.props?.error).includes("chmod failed"), true);
    assertEquals(JSON.stringify(ctx.logs).includes(SUDO_PASSWORD), false);
  });
});

Deno.test("file apply: a directory at the path is refused, not written into", async () => {
  await withFakeSsh([
    { match: "test -L", exitCode: 1 },
    { match: "stat -c", stdout: "directory|root|root|755\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "is not a regular file",
    );
    assertEquals(ctx.writes.length, 1);
    assertEquals(ctx.writes[0].data.status, "failed");
    assertEquals(await fake.uploads(), new Map());
  });
});

Deno.test("file apply: a symlink at the path is replaced by the file", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "symbolic link|root|root|777\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    const rm = cmds.indexOf("rm -f '/etc/motd'");
    assertEquals(rm >= 0, true, cmds.join("\n"));
    assertEquals(await fake.uploads(), new Map([["/etc/motd", "hello\n"]]));
  });
});

Deno.test("file apply: a failed symlink probe fails instead of guessing", async () => {
  await withFakeSsh([
    { match: "test -L", exitCode: 255 },
    { match: "stat -c", stdout: "symbolic link|root|root|777\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "ssh to",
    );
    assertEquals(await fake.uploads(), new Map());
  });
});

// A sudo refusal or a dropped connection must never read as "absent": with
// ensure=absent that would report compliant and leave the file in place.
Deno.test("file check: a sudo refusal is a failure, never 'absent'", async () => {
  await withFakeSsh([
    { match: "stat -c", sudoFails: true },
  ], async () => {
    const ctx = fakeContext(
      args({ ensure: "absent", content: undefined, become: true }),
    );
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "sudo as root failed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("file apply: a dropped connection is a failure, never 'absent'", async () => {
  await withFakeSsh([
    { match: "stat -c", exitCode: 255 },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent", content: undefined }));
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "ssh to",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("file check: a failed content hash is a failure, never 'unchanged'", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "regular file|root|root|644\n" },
    { match: "sha256sum", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "sha256sum",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

Deno.test("file check: unparseable stat output is a failure, not 'absent'", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "garbage\n" },
  ], async () => {
    const ctx = fakeContext(args({ ensure: "absent", content: undefined }));
    await assertRejects(
      () => model.methods.check.execute({}, ctx),
      Error,
      "Unexpected stat output",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
  });
});

// With no content to manage, a symlink in the way is replaced by an empty
// file, never just deleted (a symlinked /etc/resolv.conf must not vanish).
Deno.test("file apply: no content replaces a symlink with a file", async () => {
  await withFakeSsh([
    { match: "stat -c", stdout: "symbolic link|root|root|777\n" },
  ], async (fake) => {
    const ctx = fakeContext(
      args({ path: "/etc/resolv.conf", content: undefined, mode: undefined }),
    );
    await model.methods.apply.execute({}, ctx);
    const cmds = await fake.commands();
    const rm = cmds.indexOf("rm -f '/etc/resolv.conf'");
    const touch = cmds.indexOf("touch '/etc/resolv.conf'");
    assertEquals(rm >= 0 && touch > rm, true, cmds.join("\n"));
  });
});
