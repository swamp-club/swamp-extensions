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
import type { TrackerIssue } from "./adapter.ts";
import { duplicateRefusal, primaryOf } from "./duplicates.ts";

const ticket = (relations: TrackerIssue["relations"]): TrackerIssue => ({
  id: "T2",
  display: "T-2",
  title: "A ticket",
  status: { id: "open", name: "open" },
  relations,
});

Deno.test("duplicates: a ticket's primary is its outgoing duplicate_of, and nothing else", () => {
  const primary = {
    type: "duplicate_of" as const,
    direction: "outgoing" as const,
    issue: "T1",
    display: "T-1",
  };
  assertEquals(primaryOf(ticket([primary])), primary);
  assertEquals(
    primaryOf(ticket([{ ...primary, direction: "incoming" }])),
    undefined,
    "the primary's own side names no primary",
  );
  assertEquals(
    primaryOf(ticket([{ ...primary, type: "related_to" }])),
    undefined,
  );
});

Deno.test("duplicates: the refusal names the primary, and with a work item both moves", () => {
  const primary = {
    type: "duplicate_of" as const,
    direction: "outgoing" as const,
    issue: "T1",
    display: "T-1",
  };
  const plain = duplicateRefusal(ticket([primary]), primary);
  assertEquals(plain, "T-2 is a duplicate of T-1; work on T-1 (T1) instead");
  const moves = duplicateRefusal(ticket([primary]), primary, "t-2-abcd");
  assert(moves.includes("retarget it onto T-1 (T1)"), moves);
  assert(moves.includes("duplicate exit"), moves);
});
