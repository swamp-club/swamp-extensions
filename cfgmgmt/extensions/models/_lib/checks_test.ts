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

import { assertEquals } from "@std/assert";
import { getentProbe, statProbe } from "./checks.ts";

/** Runs `script` under sh with stand-in `stat`/`getent` that print `reply`. */
async function run(script: string, reply: string, code: number) {
  const dir = await Deno.makeTempDir();
  try {
    for (const tool of ["stat", "getent"]) {
      await Deno.writeTextFile(
        `${dir}/${tool}`,
        `#!/bin/sh\nprintf '%s\\n' ${JSON.stringify(reply)}${
          code === 0 ? "" : " >&2"
        }\nexit ${code}\n`,
        { mode: 0o755 },
      );
    }
    const out = await new Deno.Command("sh", {
      args: ["-c", script],
      env: { PATH: `${dir}:/usr/bin:/bin` },
      stdout: "piped",
      stderr: "piped",
    }).output();
    return {
      code: out.code,
      stdout: new TextDecoder().decode(out.stdout).trim(),
    };
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

Deno.test("statProbe prints stat's answer for an existing path", async () => {
  const r = await run(statProbe("/etc/motd", "%U"), "root", 0);
  assertEquals(r, { code: 0, stdout: "root" });
});

Deno.test("statProbe reads only a missing path as NOTFOUND", async () => {
  for (
    const msg of [
      "stat: cannot statx '/x': No such file or directory",
      "stat: cannot statx '/f/x': Not a directory",
    ]
  ) {
    assertEquals(await run(statProbe("/x", "%U"), msg, 1), {
      code: 0,
      stdout: "NOTFOUND",
    });
  }
});

Deno.test("statProbe fails on permission denied instead of NOTFOUND", async () => {
  const r = await run(
    statProbe("/secret/x", "%U"),
    "stat: cannot statx '/secret/x': Permission denied",
    1,
  );
  assertEquals(r.code, 1);
  assertEquals(r.stdout, "");
});

Deno.test("getentProbe: exit 2 is NOTFOUND, other failures stay failures", async () => {
  assertEquals(await run(getentProbe("passwd", "bob"), "", 2), {
    code: 0,
    stdout: "NOTFOUND",
  });
  assertEquals((await run(getentProbe("passwd", "bob"), "", 1)).code, 1);
  assertEquals(
    await run(
      getentProbe("passwd", "bob"),
      "bob:x:1000:1000::/home/bob:/bin/sh",
      0,
    ),
    { code: 0, stdout: "bob:x:1000:1000::/home/bob:/bin/sh" },
  );
});

Deno.test("remoteHash reads a digest GNU prefixed with a backslash", async () => {
  const { withFakeSsh } = await import("./fake_ssh.ts");
  const { getConnection } = await import("./ssh.ts");
  const { remoteHash } = await import("./checks.ts");
  const digest = "a".repeat(64);
  await withFakeSsh([
    { match: "sha256sum", stdout: `\\${digest}  /odd\\\\name\n` },
  ], async () => {
    const conn = await getConnection({ host: "web-1", username: "deploy" });
    assertEquals(await remoteHash(conn, "/odd\\name", undefined), digest);
  });
});
