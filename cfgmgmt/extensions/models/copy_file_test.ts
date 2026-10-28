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
import { model } from "./copy_file.ts";
import { fakeContext, type LogLine, withFakeSsh } from "./_lib/fake_ssh.ts";

// sha256 of "hello\n"
const HELLO_SHA =
  "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03";

async function withSource(fn: (source: string) => Promise<void>) {
  const dir = await Deno.makeTempDir({ prefix: "cfgmgmt-copy-file-" });
  try {
    const source = `${dir}/motd`;
    await Deno.writeTextFile(source, "hello\n");
    await fn(source);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

function args(source: string, overrides: Record<string, unknown> = {}) {
  return model.globalArguments.parse({
    nodeHost: "web-1",
    nodeUser: "deploy",
    source,
    path: "/usr/local/bin/tool",
    ensure: "present",
    mode: "4755",
    ...overrides,
  });
}

Deno.test("copy_file check: a setuid mode matches stat's mode", async () => {
  await withSource(async (source) => {
    await withFakeSsh([
      { match: "stat -c", stdout: "regular file|root|root|4755\n" },
      { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    ], async () => {
      const ctx = fakeContext(args(source));
      await model.methods.check.execute({}, ctx);
      assertEquals(ctx.writes[0].data.status, "compliant");
      const current = ctx.writes[0].data.current as Record<string, unknown>;
      assertEquals(current.mode, "4755");
    });
  });
});

Deno.test("copy_file check: a 3-digit mode matches stat's mode", async () => {
  await withSource(async (source) => {
    await withFakeSsh([
      { match: "stat -c", stdout: "regular file|root|root|755\n" },
      { match: "sha256sum", stdout: `${HELLO_SHA}\n` },
    ], async () => {
      const ctx = fakeContext(args(source, { mode: "755" }));
      await model.methods.check.execute({}, ctx);
      assertEquals(ctx.writes[0].data.status, "compliant");
    });
  });
});

Deno.test("copy_file apply: a failed mkdir records failed state and throws", async () => {
  await withSource(async (source) => {
    await withFakeSsh([
      { match: "stat -c", stdout: "NOTFOUND\n" },
      { match: "mkdir -p", exitCode: 1 },
    ], async (fake) => {
      const ctx = fakeContext(args(source));
      await assertRejects(
        () => model.methods.apply.execute({}, ctx),
        Error,
        "mkdir failed",
      );
      assertEquals(ctx.writes.length, 1);
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(await fake.uploads(), new Map());
    });
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

Deno.test("copy_file apply: uploads the source and logs without secrets", async () => {
  await withSource(async (source) => {
    await withFakeSsh([
      { match: "stat -c", stdout: "NOTFOUND\n" },
    ], async (fake) => {
      const ctx = fakeContext(
        args(source, { become: true, becomePassword: SUDO_PASSWORD }),
      );
      await model.methods.apply.execute({}, ctx);
      assertEquals(ctx.writes[0].data.status, "applied");
      assertEquals([...(await fake.uploads()).values()], ["hello\n"]);
      assertLogged(ctx.logs, "Applying file", "is {status}");

      const checkCtx = fakeContext(args(source));
      await model.methods.check.execute({}, checkCtx);
      assertLogged(checkCtx.logs, "Checking file", "is {status}");
    });
  });
});

Deno.test("copy_file: a missing local source fails before touching the node", async () => {
  for (const method of ["check", "apply"] as const) {
    await withFakeSsh([
      { match: "stat -c", stdout: "NOTFOUND\n" },
    ], async (fake) => {
      const ctx = fakeContext(args("/nonexistent/cfgmgmt-source"));
      await assertRejects(
        () => model.methods[method].execute({}, ctx),
        Error,
        "is not readable",
      );
      assertEquals(ctx.writes.length, 1);
      assertEquals(ctx.writes[0].data.status, "failed");
      assertEquals(await fake.commands(), []);
      assertEquals(ctx.logs.some((l) => l.level === "error"), true);
    });
  }
});
