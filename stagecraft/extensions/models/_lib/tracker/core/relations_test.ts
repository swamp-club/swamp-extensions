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

import { assertEquals, assertRejects } from "@std/assert";
import {
  type RelationType,
  TrackerError,
  type TrackerIssue,
  type TrackerRelation,
} from "./adapter.ts";
import { checkRelate } from "./relations.ts";

// checkRelate over tickets in memory; tracker_conformance.ts checks the same
// rules through each adapter.

/** Tickets t0..t<n>, related as given: [from, type, to]. */
function tickets(n: number, links: [number, RelationType, number][]) {
  const issues = new Map<string, TrackerIssue>();
  for (let i = 0; i < n; i++) {
    issues.set(`t${i}`, {
      id: `t${i}`,
      display: `T-${i}`,
      title: `Ticket ${i}`,
      status: { id: "open", name: "open" },
      relations: [],
    });
  }
  const side = (
    type: RelationType,
    direction: TrackerRelation["direction"],
    other: number,
  ): TrackerRelation => ({
    type,
    direction,
    issue: `t${other}`,
    display: `T-${other}`,
  });
  for (const [from, type, to] of links) {
    issues.get(`t${from}`)!.relations.push(side(type, "outgoing", to));
    issues.get(`t${to}`)!.relations.push(side(type, "incoming", from));
  }
  const reads: string[] = [];
  const fetch = (id: string) => {
    reads.push(id);
    const issue = issues.get(id);
    return issue === undefined
      ? Promise.reject(new TrackerError("not_found", "test", id))
      : Promise.resolve(issue);
  };
  const check = (from: number | string, type: RelationType, to: number) =>
    checkRelate(
      fetch,
      "test",
      typeof from === "string" ? from : `t${from}`,
      type,
      `t${to}`,
    );
  return { check, reads, issues };
}

async function refused(call: () => Promise<unknown>, includes: string) {
  const error = await assertRejects(call, TrackerError, includes);
  assertEquals(error.kind, "invalid");
}

Deno.test("relations: an existing relation is reported before any rule runs", async () => {
  // t0 is already t1's parent: a second parent_of from t0 is no new parent.
  const { check } = tickets(2, [[0, "parent_of", 1]]);
  assertEquals((await check(0, "parent_of", 1)).exists, true);
});

Deno.test("relations: a missing end is not_found, before any rule", async () => {
  const { check } = tickets(1, []);
  const error = await assertRejects(
    () => check("t9", "related_to", 0),
    TrackerError,
  );
  assertEquals(error.kind, "not_found");
});

Deno.test("relations: no self relation, of any kind", async () => {
  const { check } = tickets(1, []);
  await refused(() => check(0, "related_to", 0), "cannot be related to itself");
});

Deno.test("relations: one parent per child", async () => {
  const { check } = tickets(3, [[0, "parent_of", 2]]);
  await refused(() => check(1, "parent_of", 2), "already has a parent, T-0");
});

Deno.test("relations: no parent cycle, however far up it closes", async () => {
  // t0 -> t1 -> ... -> t5: t5 parent_of t0 closes the loop five levels up.
  const chain = [0, 1, 2, 3, 4].map((i) =>
    [i, "parent_of", i + 1] as [number, RelationType, number]
  );
  const { check } = tickets(6, chain);
  await refused(() => check(5, "parent_of", 0), "circular parent chain");
});

Deno.test("relations: the parent walk stops at ten levels, as the Lab's does", async () => {
  // t0 -> ... -> t11: the loop closes eleven levels up from t11, past the
  // walk, so it is not seen.
  const chain = Array.from(
    { length: 11 },
    (_, i) => [i, "parent_of", i + 1] as [number, RelationType, number],
  );
  const { check, reads } = tickets(12, chain);
  assertEquals((await check(11, "parent_of", 0)).exists, false);
  // The two ends, then one read per level walked.
  assertEquals(reads.length, 2 + 10);
});

Deno.test("relations: one canonical per duplicate", async () => {
  const { check } = tickets(3, [[0, "duplicate_of", 1]]);
  await refused(
    () => check(0, "duplicate_of", 2),
    "already a duplicate of T-1",
  );
});

Deno.test("relations: no duplicate chains, either way", async () => {
  const { check } = tickets(3, [[1, "duplicate_of", 2]]);
  // The canonical is itself a duplicate: point at its canonical instead.
  await refused(
    () => check(0, "duplicate_of", 1),
    "mark T-0 a duplicate of T-2 instead",
  );
  // The duplicate has duplicates of its own: re-point them first.
  await refused(() => check(2, "duplicate_of", 0), "re-point it");
});

Deno.test("relations: blocked_by and related_to have no rule beyond self", async () => {
  const { check } = tickets(2, [[0, "blocked_by", 1], [1, "related_to", 0]]);
  assertEquals((await check(1, "blocked_by", 0)).exists, false);
  assertEquals((await check(0, "related_to", 1)).exists, false);
});

Deno.test("relations: a relation only the target shows still exists", async () => {
  // Linear lists a parent's first 250 children only, but the child's own
  // parent field always: t0's side is missing, t1's shows the relation.
  const { check, issues } = tickets(2, [[0, "parent_of", 1]]);
  issues.get("t0")!.relations = [];
  assertEquals((await check(0, "parent_of", 1)).exists, true);
});
