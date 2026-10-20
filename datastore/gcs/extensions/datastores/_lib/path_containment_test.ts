// Copyright (C) 2026 System Initiative, Inc.
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

// Containment and key-path checks with explicit win32 and posix path
// functions, so the Windows behavior is covered on any host
// (swamp-club#2573).

import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import * as posix from "jsr:@std/path@1/posix";
import * as win32 from "jsr:@std/path@1/windows";
import {
  cacheRelativeKey,
  isWithinDir,
  resolveWithinDir,
  toKeyPath,
} from "./path_containment.ts";

const WIN_CACHE = "C:\\Users\\m\\repo\\.swamp\\cache";
const POSIX_CACHE = "/home/m/repo/.swamp/cache";
const ISSUE_KEY = "ns/workflow-runs/wf-1/workflow-run-r1.yaml";

Deno.test("win32: resolveWithinDir accepts keys inside the cache", () => {
  assertEquals(
    resolveWithinDir(WIN_CACHE, ISSUE_KEY, win32),
    `${WIN_CACHE}\\ns\\workflow-runs\\wf-1\\workflow-run-r1.yaml`,
  );
  assertEquals(
    resolveWithinDir(WIN_CACHE, "data\\type\\model\\file.yaml", win32),
    `${WIN_CACHE}\\data\\type\\model\\file.yaml`,
  );
  assertEquals(
    resolveWithinDir(WIN_CACHE, "a/../b.yaml", win32),
    `${WIN_CACHE}\\b.yaml`,
  );
  assertEquals(
    resolveWithinDir(WIN_CACHE, "..foo", win32),
    `${WIN_CACHE}\\..foo`,
  );
  assertEquals(resolveWithinDir(WIN_CACHE, "", win32), WIN_CACHE);
});

Deno.test("win32: resolveWithinDir rejects escapes", () => {
  for (
    const rel of [
      "../escape.yaml",
      "..\\escape.yaml",
      "a/../../escape.yaml",
      "../cache-evil/x.yaml",
      "..",
    ]
  ) {
    assertThrows(
      () => resolveWithinDir(WIN_CACHE, rel, win32),
      Error,
      `Path traversal detected: ${rel}`,
    );
  }
});

Deno.test("win32: isWithinDir rejects siblings, other drives and UNC", () => {
  assertEquals(isWithinDir(WIN_CACHE, `${WIN_CACHE}\\x.yaml`, win32), true);
  assertEquals(isWithinDir(WIN_CACHE, `${WIN_CACHE}/x.yaml`, win32), true);
  assertEquals(
    isWithinDir(WIN_CACHE, "c:\\users\\M\\repo\\.swamp\\CACHE\\x", win32),
    true,
  );
  assertEquals(
    isWithinDir(WIN_CACHE, `${WIN_CACHE}-evil\\x.yaml`, win32),
    false,
  );
  assertEquals(
    isWithinDir(WIN_CACHE, "D:\\Users\\m\\repo\\.swamp\\cache\\x", win32),
    false,
  );
  assertEquals(
    isWithinDir(WIN_CACHE, "\\\\srv\\share\\cache\\x", win32),
    false,
  );
  assertEquals(isWithinDir(WIN_CACHE, "C:\\Users\\m", win32), false);
});

Deno.test("win32: toKeyPath and cacheRelativeKey produce slash keys", () => {
  assertEquals(toKeyPath("_index\\shard.json", win32), "_index/shard.json");
  assertEquals(
    cacheRelativeKey(WIN_CACHE, `${WIN_CACHE}\\ns\\data\\x.yaml`, win32),
    "ns/data/x.yaml",
  );
  assertEquals(cacheRelativeKey(WIN_CACHE, WIN_CACHE, win32), "");
  assertEquals(
    cacheRelativeKey(WIN_CACHE, `${WIN_CACHE}-evil\\x.yaml`, win32),
    undefined,
  );
  assertEquals(cacheRelativeKey(WIN_CACHE, "D:\\x.yaml", win32), undefined);
});

Deno.test("posix: resolveWithinDir accepts keys inside the cache", () => {
  assertEquals(
    resolveWithinDir(POSIX_CACHE, ISSUE_KEY, posix),
    `${POSIX_CACHE}/${ISSUE_KEY}`,
  );
  assertEquals(
    resolveWithinDir(POSIX_CACHE, "..foo", posix),
    `${POSIX_CACHE}/..foo`,
  );
  assertEquals(resolveWithinDir(POSIX_CACHE, "", posix), POSIX_CACHE);
});

Deno.test("posix: resolveWithinDir rejects escapes", () => {
  for (
    const rel of [
      "../escape.yaml",
      "a/../../escape.yaml",
      "../cache-evil/x.yaml",
      "..",
    ]
  ) {
    assertThrows(
      () => resolveWithinDir(POSIX_CACHE, rel, posix),
      Error,
      `Path traversal detected: ${rel}`,
    );
  }
});

Deno.test("posix: isWithinDir and cacheRelativeKey", () => {
  assertEquals(isWithinDir(POSIX_CACHE, `${POSIX_CACHE}-evil/x`, posix), false);
  assertEquals(isWithinDir(POSIX_CACHE, "/home/m", posix), false);
  assertEquals(
    cacheRelativeKey(POSIX_CACHE, `${POSIX_CACHE}/ns/data/x.yaml`, posix),
    "ns/data/x.yaml",
  );
  assertEquals(cacheRelativeKey(POSIX_CACHE, "/elsewhere/x", posix), undefined);
});
