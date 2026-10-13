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
import { fakeSwamp } from "../../engine/tracker_testing.ts";
import {
  duplicateDefinition,
  linkingDefinition,
  TRACKED_ITEM,
  trackedItem,
} from "./test_support.ts";
import type { TrackerAdapter, TrackerRelation } from "./adapter.ts";
import type { TrackerModelOptions } from "./tracker_methods.ts";
import { type Pass, publishInRounds } from "./publish_rounds.ts";

/** A pass as [the ops it planned, the ticket it reads, whether done]. */
const shape = (
  p: Pass,
) => [p.steps.map((s) => s.due.op), p.read ?? null, p.done];

// publish_trace_test.ts checks that rounds write what publish writes. These
// check that they are rounds: a ticket is read only before any write that
// could change it, and read again after one, and an assign is made before
// what depends on it is planned.

const NOW = new Date("2026-09-29T00:00:00Z");

/** A tracker that logs reads and writes alike, in order. */
function logging() {
  const log: string[] = [];
  const relations = new Map<string, TrackerRelation[]>();
  const status = new Map<string, string>();
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    create: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
    fetchIssue: (id) => {
      log.push(`read ${id}`);
      return Promise.resolve({
        id,
        display: id,
        title: id,
        status: { id: "s", name: status.get(id) ?? "Todo" },
        relations: structuredClone(relations.get(id) ?? []),
      });
    },
    comment: (id) => {
      log.push(`comment ${id}`);
      return Promise.resolve({ id: `c${log.length}` });
    },
    setStatus: (id, name) => {
      log.push(`status ${id} ${name}`);
      status.set(id, name);
      return Promise.resolve({ changed: true, status: { id: name, name } });
    },
    relate: (from, type, to) => {
      log.push(`relate ${from} ${type} ${to}`);
      relations.set(from, [
        ...relations.get(from) ?? [],
        { type, direction: "outgoing", issue: to, display: to },
      ]);
      return Promise.resolve({ changed: true });
    },
    capabilities: {
      history: {
        postEntry: (id, entry) => {
          log.push(`entry ${id} ${entry.step}`);
          return Promise.resolve({ id: `e${log.length}` });
        },
        setType: (id, type) => {
          log.push(`type ${id} ${type}`);
          return Promise.resolve({ changed: true, type });
        },
      },
      assign: {
        assign: (id, user) => {
          log.push(`assign ${id} ${user}`);
          return Promise.resolve({
            changed: true,
            user,
            status: "Todo",
            dropped: [],
          });
        },
      },
    },
  };
  const options: TrackerModelOptions = {
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({
      open: "Todo",
      triaged: "Triaged",
      in_progress: "In Progress",
      in_review: "In Review",
      shipped: "Done",
      closed: "Closed",
    }),
    assignee: () => Promise.resolve("alice"),
    now: () => NOW,
  };
  return { log, options };
}

Deno.test("publish in rounds: a duplicate is read again after it is related, and after it is closed", async () => {
  const swamp = fakeSwamp();
  const { log, options } = logging();
  const item = await trackedItem(swamp, { test: "t1" }, duplicateDefinition());
  await item.record("artifact", "duplicate-of", { primary: "p1" });
  await item.approve("duplicate-confirmation");
  await item.advance("duplicate");
  const passes: Pass[] = [];
  await publishInRounds(
    swamp.context("tracker"),
    { workItem: TRACKED_ITEM },
    options,
    (pass) => passes.push(pass),
  );
  console.log("DUP", JSON.stringify(passes.map(shape)));
  // Rounds, not one pass. The assign ends the first. The primary is read
  // before the mark, the relate is made before the ticket is read again,
  // and the close before the read that finds it a duplicate. The relate
  // touched the primary too, so it is read again on the next pass.
  assertEquals(
    passes.map(shape),
    [
      [["comment", "assign"], null, false],
      [["comment", "comment", "comment"], "p1", false],
      [["relation"], null, false],
      [[], "p1", false],
      [[], "t1", false],
      [["set_status"], null, false],
      [[], "t1", false],
      [[], null, true],
    ],
  );
  const writes = log.filter((l) => !l.startsWith("read"));
  const relate = log.indexOf("relate t1 duplicate_of p1");
  const close = log.indexOf("status t1 Closed");
  // The re-read that finds the relation comes after the relate, and the one
  // that finds the ticket a duplicate (so its status is left alone) after
  // the close.
  assertEquals(log.slice(relate + 1).includes("read t1"), true);
  assertEquals(log.indexOf("read t1", relate) < close, true);
  assertEquals(log.indexOf("read t1", close) > close, true);
  assertEquals(writes.filter((w) => w.startsWith("status")), [
    "status t1 Closed",
  ]);
});

Deno.test("publish in rounds: the assigned entry is planned only once the assign is made", async () => {
  const swamp = fakeSwamp();
  const { log, options } = logging();
  const item = await trackedItem(swamp, { test: "t1" }, linkingDefinition());
  await item.advance("submit");
  const passes: Pass[] = [];
  await publishInRounds(
    swamp.context("tracker"),
    { workItem: TRACKED_ITEM },
    options,
    (pass) => passes.push(pass),
  );
  console.log("ASSIGN", JSON.stringify(passes.map(shape)));
  // The ticket is read (is it a duplicate?), the assign ends its pass, and
  // the entry that says so is planned once the ticket is read again. The
  // cursor is written by the pass that finds every step before it made.
  assertEquals(
    passes.map(shape),
    [
      [[], "t1", false],
      [["lifecycle_entry", "assign"], null, false],
      [[], "t1", false],
      [["lifecycle_entry", "lifecycle_entry", "set_status"], null, false],
      [[], "t1", false],
      [[], null, true],
    ],
  );
  assertEquals(log.filter((l) => !l.startsWith("read")), [
    "entry t1 work_started",
    "assign t1 alice",
    "entry t1 assigned",
    "entry t1 review_started",
    "status t1 In Review",
  ]);
});

Deno.test("publish in rounds: an assign with no user to assign is recorded as skipped, never as a success", async () => {
  let asked = 0;
  const swamp = fakeSwamp();
  const { log, options } = logging();
  const item = await trackedItem(swamp, { test: "t1" }, linkingDefinition());
  await item.advance("submit");
  await publishInRounds(swamp.context("tracker"), { workItem: TRACKED_ITEM }, {
    ...options,
    // No user when the assign is planned; one by the time it is recorded,
    // which must not turn the failed assign into a success.
    assignee: () =>
      asked++ === 0
        ? Promise.reject(new Error("no stored login"))
        : Promise.resolve("alice"),
  });
  assertEquals(log.filter((l) => l.startsWith("assign")), []);
  const record = swamp.resources.get("tracker")?.get(
    `delivery-publish-assign-${TRACKED_ITEM}-1`,
  )?.at(-1) as { result: { skipped?: string } } | undefined;
  assertEquals(record?.result.skipped, "error");
  // The assigned entry, which follows a real assign, is not written.
  assertEquals(log.includes("entry t1 assigned"), false);
});
