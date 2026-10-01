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
import { assertEquals } from "@std/assert";
import { changedSince, fingerprints, markSeen, parseSeen } from "./changes.ts";
import { ANY_ID } from "./layout.ts";
import { loadOk } from "./test_support.ts";

Deno.test("changes: the first visit marks nothing and takes everything as seen", async () => {
  const now = fingerprints((await loadOk("minimal")).definition);
  assertEquals(changedSince(null, now).size, 0);
  assertEquals(markSeen(null, now, []), now);
});

Deno.test("changes: an edited stage and a new stage are marked until seen", () => {
  const seen = { a: "1", b: "2", gone: "3" };
  const now = { a: "1", b: "9", c: "4" };
  assertEquals([...changedSince(seen, now)].sort(), ["b", "c"]);
  const after = markSeen(seen, now, ["b"]);
  assertEquals(after, { a: "1", b: "9" });
  assertEquals([...changedSince(after, now)], ["c"]);
  assertEquals(changedSince(markSeen(after, now, "all"), now).size, 0);
});

Deno.test("changes: fingerprints follow a stage's spec, and the global transitions", async () => {
  const { definition } = await loadOk("swamp-club-swamp-extensions");
  const before = fingerprints(definition);
  const plan = definition.stages.find((s) => s.id === "plan")!;
  plan.transitions = [...plan.transitions ?? [], {
    name: "shortcut",
    to: "implement",
  }];
  const after = fingerprints(definition);
  assertEquals([...changedSince(before, after)], ["plan"]);
  assertEquals(
    Object.hasOwn(before, ANY_ID),
    (definition.globalTransitions ?? []).length > 0,
  );
});

Deno.test("changes: stored values that are missing or damaged read as a first visit", () => {
  assertEquals(parseSeen(null), null);
  assertEquals(parseSeen("{not json"), null);
  assertEquals(parseSeen("[1]"), null);
  assertEquals(parseSeen('{"a":"1","b":2}'), { a: "1" });
});
