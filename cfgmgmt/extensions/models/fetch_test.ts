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
import { model } from "./fetch.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

// sha256 of "hello\n"
const HELLO_SHA =
  "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

function args(overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    url: "https://example.com/hello.txt",
    path: "/opt/hello.txt",
    checksum: `sha256:${HELLO_SHA}`,
    nodeHost: "fetch-1",
    ...overrides,
  });
}

// The staging file name comes from mktemp on the host.
const MKTEMP = {
  match: "mktemp",
  stdout: "/opt/hello.txt.swamp-fetch.AbC123\n",
};

Deno.test("fetch check: sha256:-prefixed checksum and 3-digit mode are compliant", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args({ mode: "644", owner: "root" }));
    await model.methods.check.execute({}, ctx);
    assertEquals(ctx.writes[0].data.changes, []);
    assertEquals(ctx.writes[0].data.status, "compliant");
  });
});

Deno.test("fetch apply: prefixed checksum verifies and the download is kept", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "NOTFOUND\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await model.methods.apply.execute({}, ctx);
    assertEquals(ctx.writes[0].data.status, "applied");
    const cmds = await fake.commands();
    assertEquals(
      cmds.some((c) => c.startsWith("rm -f")),
      false,
      cmds.join("\n"),
    );
  });
});

Deno.test("fetch check: checksum prefix naming another algorithm fails clearly", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async () => {
    const ctx = fakeContext(args({ checksum: "sha1:abc" }));
    await assertRejects(() => model.methods.check.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(
      String(last.data.error),
      "does not match checksumType",
    );
  });
});

Deno.test("fetch apply: a failing chown records failed state", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "root|root|644\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    { match: "chown", stdout: "chown: invalid user\n", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ owner: "nobody-here" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(String(last.data.error), "chown failed");
  });
});

Deno.test("fetch apply: a failing chmod records failed state", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "root|root|600\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    { match: "chmod", exitCode: 1 },
  ], async () => {
    const ctx = fakeContext(args({ mode: "0644" }));
    await assertRejects(() => model.methods.apply.execute({}, ctx));
    const last = ctx.writes[ctx.writes.length - 1];
    assertEquals(last.data.status, "failed");
    assertStringIncludes(String(last.data.error), "chmod failed");
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
  assertEquals(first?.props?.host, "fetch-1");
  assertEquals(
    logs.some((l) => l.level === "info" && l.message.includes(done)),
    true,
    text,
  );
}

Deno.test("fetch: check and apply log entry and completion without secrets", async () => {
  const url = "https://user:url-token@example.com/hello.txt";
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "NOTFOUND\n" },
    { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
  ], async (fake) => {
    const g = args({ url, become: true, becomePassword: SUDO_PASSWORD });
    const checkCtx = fakeContext(g);
    await model.methods.check.execute({}, checkCtx);
    assertLogged(checkCtx.logs, "Checking download", "is {status}", [
      "url-token",
    ]);

    const applyCtx = fakeContext(g);
    await model.methods.apply.execute({}, applyCtx);
    assertEquals(applyCtx.writes[0].data.status, "applied");
    assertLogged(applyCtx.logs, "Applying download", "is {status}", [
      "url-token",
    ]);
    // Commands run through sudo here, so quoting is escaped; match loosely.
    const cmds = await fake.commands();
    assertEquals(
      cmds.some((c) => c.includes("curl") && c.includes(".swamp-fetch")),
      true,
      cmds.join("\n"),
    );
    assertEquals(
      cmds.some((c) => c.includes("mv -f") && c.includes(".swamp-fetch")),
      true,
      cmds.join("\n"),
    );
  });
});

Deno.test("fetch apply: a checksum mismatch discards the download, not the destination", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "root|root|644\n" },
    {
      match: "sha256sum",
      stdout:
        "0000000000000000000000000000000000000000000000000000000000000000  /x\n",
    },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "Checksum verification failed",
    );
    assertEquals(ctx.writes[0].data.status, "failed");
    const cmds = await fake.commands();
    assertEquals(
      cmds.includes("rm -f '/opt/hello.txt.swamp-fetch.AbC123'"),
      true,
      cmds.join("\n"),
    );
    assertEquals(cmds.includes("rm -f '/opt/hello.txt'"), false);
    assertEquals(cmds.some((c) => c.startsWith("mv ")), false);
  });
});

Deno.test("fetch apply: a failed download is discarded and reported", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "NOTFOUND\n" },
    { match: "curl -fsSL", exitCode: 22, stdout: "404\n" },
  ], async (fake) => {
    const ctx = fakeContext(args());
    await assertRejects(
      () => model.methods.apply.execute({}, ctx),
      Error,
      "Download failed",
    );
    assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    const cmds = await fake.commands();
    assertEquals(
      cmds.includes("rm -f '/opt/hello.txt.swamp-fetch.AbC123'"),
      true,
    );
    assertEquals(cmds.some((c) => c.startsWith("mv ")), false);
  });
});

Deno.test("fetch: a url curl or wget could read as an option is refused", () => {
  for (
    const url of ["-o/etc/passwd", "--config=/x", "file:///etc/shadow", ""]
  ) {
    assertEquals(
      model.globalArguments.safeParse({
        nodeHost: "web-1",
        url,
        path: "/opt/x",
      }).success,
      false,
      url,
    );
  }
});

Deno.test("fetch apply: stages through mktemp, never a fixed name", async () => {
  await withFakeSsh([
    MKTEMP,
    { match: "stat -c", stdout: "NOTFOUND\n" },
    { match: "command -v curl", stdout: "/usr/bin/curl\n" },
  ], async (fake) => {
    const ctx = fakeContext(args({ checksum: undefined }));
    await model.methods.apply.execute({}, ctx);
    const cmds = await fake.commands();
    assertEquals(
      cmds.some((c) => c.includes("-o '/opt/hello.txt.swamp-fetch.AbC123'")),
      true,
      cmds.join("\n"),
    );
    assertEquals(
      cmds.some((c) => c.includes("'/opt/hello.txt.swamp-fetch'")),
      false,
    );
  });
});
