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
import { actorFrom, JournalEventSchema } from "./journal.ts";

Deno.test("actorFrom: the platform's initiatedBy is the principal", () => {
  assertEquals(actorFrom({ tagOverrides: { initiatedBy: "user:alice" } }), {
    principal: "user:alice",
    source: "platform",
  });
});

Deno.test("actorFrom: no initiatedBy (webhook, remote worker, nested run) is recorded as none", () => {
  assertEquals(actorFrom({}), { principal: null, source: "none" });
  assertEquals(actorFrom({ tagOverrides: { initiatedBy: "" } }), {
    principal: null,
    source: "none",
  });
});

Deno.test("actorFrom: an asserted actor is kept beside the principal, not in place of it", () => {
  assertEquals(
    actorFrom({ tagOverrides: { initiatedBy: "user:bot" } }, "linear:jane"),
    { principal: "user:bot", source: "platform", asserted: "linear:jane" },
  );
});

Deno.test("retargeted: the event carries both ref maps and a reason", () => {
  const base = {
    at: "2026-09-30T00:00:00.000Z",
    era: "e",
    stage: "triage",
    cycle: 1,
    actor: { principal: null, source: "none" as const },
    type: "retargeted" as const,
    from: { "swamp-club": "12" },
    to: { "swamp-club": "7" },
  };
  assertEquals(
    JournalEventSchema.safeParse({ ...base, reason: "duplicate" }).success,
    true,
  );
  assertEquals(
    JournalEventSchema.safeParse({ ...base, reason: "" }).success,
    false,
  );
  assertEquals(JournalEventSchema.safeParse(base).success, false);
});
