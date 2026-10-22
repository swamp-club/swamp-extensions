// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals } from "@std/assert";
import { discoverLockfiles } from "./audit_deps.ts";

const root = new URL("../", import.meta.url).pathname;

Deno.test("discoverLockfiles finds lockfiles at any depth and skips dot-dirs and node_modules", async () => {
  const dir = await Deno.makeTempDir();
  try {
    for (
      const rel of [
        "deno.lock",
        "cve/a/deno.lock",
        "workflows/b/deno.lock",
        ".hidden/deno.lock",
        "node_modules/c/deno.lock",
      ]
    ) {
      const path = `${dir}/${rel}`;
      await Deno.mkdir(path.substring(0, path.lastIndexOf("/")), {
        recursive: true,
      });
      await Deno.writeTextFile(path, "{}");
    }
    assertEquals(await discoverLockfiles(dir), [
      "cve/a/deno.lock",
      "deno.lock",
      "workflows/b/deno.lock",
    ]);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("discoverLockfiles finds every tracked lockfile in the repository", async () => {
  // A lockfile the audit never sees is never checked for vulnerable
  // dependencies, and nothing fails to say so (swamp-club #3715).
  const { stdout } = await new Deno.Command("git", {
    args: ["ls-files", "--", "deno.lock", "**/deno.lock"],
    cwd: root,
  }).output();
  const tracked = new TextDecoder().decode(stdout).split("\n").filter(Boolean);
  assert(tracked.length > 0, "git ls-files found no lockfiles");
  const discovered = new Set(await discoverLockfiles(root));
  const missing = tracked.filter((path) => !discovered.has(path));
  assertEquals(missing, [], "tracked lockfiles the audit skips");
});
