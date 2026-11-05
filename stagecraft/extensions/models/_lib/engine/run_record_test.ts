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

import { assert, assertEquals } from "@std/assert";
import { start } from "./run_ops.ts";
import {
  currentCycle,
  parseRun,
  RUN_SCHEMA_VERSION,
  UsageSchema,
} from "./run_record.ts";
import {
  ALICE,
  smallDefinition,
  TEST_TRACKER,
  testEnv,
} from "./test_support.ts";

function started() {
  return start(
    smallDefinition(),
    {
      key: "wi-1",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:abc",
    },
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

Deno.test("parseRun: a title is kept; a record without one still reads; an empty one is refused", () => {
  const titled = start(
    smallDefinition(),
    {
      key: "wi-1",
      title: "Add a board view",
      tracker: TEST_TRACKER,
      factory: "team",
      definitionDigest: "sha256:abc",
    },
    ALICE,
    testEnv(),
  );
  const parsed = parseRun(JSON.parse(JSON.stringify(titled)));
  assert(parsed.ok);
  assertEquals(parsed.value.title, "Add a board view");
  assert(!("title" in started()));
  assert(!parseRun({ ...titled, title: "" }).ok);
});

Deno.test("parseRun: an unknown schemaVersion is refused, not guessed", () => {
  const parsed = parseRun({ ...started(), schemaVersion: 3 });
  assert(!parsed.ok);
  assert(parsed.errors[0].includes("schemaVersion 3"), parsed.errors[0]);
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

Deno.test("UsageSchema: a total, the split, or both; never half a split or no tokens", () => {
  const ok = (usage: Record<string, unknown>) =>
    UsageSchema.safeParse({ ...usage, attested: true }).success;
  assert(ok({ totalTokens: 65155 }));
  assert(ok({ inputTokens: 10, outputTokens: 5 }));
  // A harness total may count tokens the split does not; not cross-checked.
  assert(ok({ totalTokens: 900, inputTokens: 10, outputTokens: 5 }));
  assert(ok({ totalTokens: 1, toolUses: 3, durationMs: 1000, model: "m" }));
  assert(!ok({ inputTokens: 10 }));
  assert(!ok({ totalTokens: 10, outputTokens: 5 }));
  assert(!ok({ toolUses: 3, durationMs: 1000 }));
  assert(!ok({}));
});

Deno.test("currentCycle: the entry count of the current stage", () => {
  const run = started();
  assertEquals(currentCycle(run), 1);
  assertEquals(currentCycle({ ...run, entries: { write: 3 } }), 3);
});

/** A run record as a version before 2 stored it. Frozen: never edit it. */
async function v1Record(): Promise<Record<string, unknown>> {
  return JSON.parse(
    await Deno.readTextFile(
      new URL(
        "../../../../testdata/run-records/v1/method-dispatch.json",
        import.meta.url,
      ),
    ),
  );
}

Deno.test("parseRun: a v1 record reads in the current form, and the input is unchanged", async () => {
  const raw = await v1Record();
  const before = structuredClone(raw);
  const parsed = parseRun(raw);
  assert(parsed.ok, parsed.ok ? "" : parsed.errors.join("\n"));
  assertEquals(raw, before);
  assertEquals(parsed.value.schemaVersion, RUN_SCHEMA_VERSION);
  const [called, ran] = parsed.value.dispatches;
  assertEquals(called.mode, "behavior");
  assertEquals(called.behavior, {
    behaviorIdOrName: "agent-wi-1",
    methodName: "generate",
  });
  assert(!("method" in called));
  assertEquals(ran.mode, "workflow");
  assertEquals(ran.workflow, "smoke-tests");
  // What the next write would store reads back unchanged.
  const again = parseRun(JSON.parse(JSON.stringify(parsed.value)));
  assert(again.ok);
  assertEquals(again.value, parsed.value);
});

Deno.test("parseRun: a malformed v1 record is refused, not repaired", async () => {
  const raw = await v1Record();
  assert(!parseRun({ ...raw, dispatches: "none" }).ok);
  assert(!parseRun({ ...raw, dispatches: [7] }).ok);
  assert(!parseRun({ schemaVersion: 1, key: "wi-1" }).ok);
  const dispatches = raw.dispatches as Record<string, unknown>[];
  assert(
    !parseRun({
      ...raw,
      dispatches: [{ ...dispatches[0], method: "not a block" }],
    }).ok,
  );
});

Deno.test("parseRun: a version outside the chain is refused", () => {
  for (const schemaVersion of [0, 1.5, "1"]) {
    const parsed = parseRun({ ...started(), schemaVersion });
    assert(!parsed.ok, String(schemaVersion));
    assert(parsed.errors[0].includes("is not one this runtime reads"));
  }
});
