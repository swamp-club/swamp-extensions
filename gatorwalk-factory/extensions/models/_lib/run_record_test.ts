// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
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
import { start } from "./run_ops.ts";
import { currentCycle, parseRun } from "./run_record.ts";
import { ALICE, smallLifecycle, testEnv } from "./test_support.ts";

function started() {
  return start(
    smallLifecycle(),
    { key: "wi-1", lifecycleDigest: "sha256:abc" },
    ALICE,
    testEnv(),
  );
}

Deno.test("parseRun: a started run round-trips through JSON", () => {
  const run = started();
  const parsed = parseRun(JSON.parse(JSON.stringify(run)));
  assert(parsed.ok);
  assertEquals(parsed.value, run);
});

Deno.test("parseRun: an unknown schemaVersion is refused, not guessed", () => {
  const parsed = parseRun({ ...started(), schemaVersion: 2 });
  assert(!parsed.ok);
  assert(parsed.errors[0].includes("schemaVersion 2"), parsed.errors[0]);
  assert(!parseRun(null).ok);
});

Deno.test("parseRun: a malformed record is refused with paths", () => {
  const parsed = parseRun({ ...started(), stage: "" });
  assert(!parsed.ok);
  assert(
    parsed.errors.some((e) => e.startsWith("stage:")),
    parsed.errors.join(),
  );
});

Deno.test("currentCycle: the entry count of the current stage", () => {
  const run = started();
  assertEquals(currentCycle(run), 1);
  assertEquals(currentCycle({ ...run, entries: { write: 3 } }), 3);
});
