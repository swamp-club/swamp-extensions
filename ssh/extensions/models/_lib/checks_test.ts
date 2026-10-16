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

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { resolveOnPath } from "./checks.ts";

/** Make two temp dirs, put `file` in the second, and run `fn(a, b)`. */
async function withBinDirs(
  file: string,
  fn: (a: string, b: string) => Promise<void>,
): Promise<void> {
  const a = await Deno.makeTempDir();
  const b = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(`${b}/${file}`, "");
    await fn(a, b);
  } finally {
    await Deno.remove(a, { recursive: true });
    await Deno.remove(b, { recursive: true });
  }
}

Deno.test("resolveOnPath: posix splits PATH on ':'", async () => {
  await withBinDirs("sshpass", async (a, b) => {
    assertEquals(await resolveOnPath("sshpass", `${a}:${b}`, "linux"), true);
    assertEquals(await resolveOnPath("sshpass", `${a}`, "linux"), false);
    // A ';'-joined PATH is a single (nonexistent) dir on posix.
    assertEquals(await resolveOnPath("sshpass", `${a};${b}`, "darwin"), false);
  });
});

Deno.test("resolveOnPath: windows splits PATH on ';', joins with '\\' and tries PATHEXT", async () => {
  const root = await Deno.makeTempDir();
  try {
    // On Windows "<root>\\bin\\sshpass.EXE" is a file in a bin dir. On posix
    // the backslash is an ordinary filename character, so a file literally
    // named "bin\\sshpass.EXE" in <root> is what the windows join produces
    // for PATH entry "<root>/bin" — exercising the split, join and PATHEXT.
    const windowsHost = Deno.build.os === "windows";
    if (windowsHost) await Deno.mkdir(`${root}\\bin`);
    await Deno.writeTextFile(`${root}/bin\\sshpass.EXE`, "");
    const bin = windowsHost ? `${root}\\bin` : `${root}/bin`;
    const path = `${root}/empty;${bin}`;
    assertEquals(await resolveOnPath("sshpass", path, "windows"), true);
    assertEquals(await resolveOnPath("sshpass.EXE", path, "windows"), true);
    assertEquals(
      await resolveOnPath("sshpass", path, "windows", ".CMD;.BAT"),
      false,
    );
  } finally {
    await Deno.remove(root, { recursive: true });
  }
});

Deno.test("resolveOnPath: missing binary is false", async () => {
  await withBinDirs("other", async (a, b) => {
    assertEquals(await resolveOnPath("sshpass", `${a};${b}`, "windows"), false);
    assertEquals(await resolveOnPath("sshpass", `${a}:${b}`, "linux"), false);
  });
});
