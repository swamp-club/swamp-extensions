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

import { assert, assertEquals, assertRejects } from "@std/assert";
import { fakeSwamp } from "./fake_swamp.ts";
import {
  type TrackerAdapter,
  TrackerError,
  type TrackerErrorKind,
} from "./tracker.ts";
import {
  ticketName,
  type TrackerContext,
  trackerMethods,
} from "./tracker_methods.ts";
import { smallLifecycle } from "./test_support.ts";
import { HOLDER_TYPE } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// What every tracker adapter must do, checked the same way for each: an
// adapter's own tests call assertTrackerConformance against their local fake
// of the tracker. It covers the contract in DESIGN.md, "Trackers", not a
// tracker's own quirks, which its tests cover beside this. Test-only.
// ---------------------------------------------------------------------------

export interface ConformanceFixture {
  /** An adapter with a credential the fake accepts. */
  adapter: TrackerAdapter;
  /** The same tracker with a credential the fake refuses. */
  badAuth: TrackerAdapter;
  /** An existing ticket, which starts in neither of `statusNames`. */
  issue: { id: string; display: string };
  /** A well-formed stable id of no ticket. */
  missing: string;
  /** Two status names the ticket's team has. */
  statusNames: [string, string];
  /** How many comments the fake has accepted so far. */
  commentsPosted(): number;
}

async function rejectsWith(
  kind: TrackerErrorKind,
  call: () => Promise<unknown>,
): Promise<TrackerError> {
  const error = await assertRejects(call, TrackerError);
  assertEquals(error.kind, kind, error.message);
  return error;
}

export async function assertTrackerConformance(
  f: ConformanceFixture,
): Promise<void> {
  const { adapter } = f;

  // Fetch: the stable id and the display identifier find the same ticket.
  const byId = await adapter.fetchIssue(f.issue.id);
  const byDisplay = await adapter.fetchIssue(f.issue.display);
  assertEquals(byId.id, f.issue.id);
  assertEquals(byDisplay.id, f.issue.id);
  assertEquals(byId.display, f.issue.display);
  assert(!f.statusNames.includes(byId.status.name), "fixture: bad start");

  // Comment: the tracker's id for it comes back.
  const before = f.commentsPosted();
  const posted = await adapter.comment(f.issue.id, "conformance");
  assert(posted.id !== "", "a comment returns its id");
  assertEquals(f.commentsPosted(), before + 1);

  // Status: a move reports changed; the same move again writes nothing.
  const [first, second] = f.statusNames;
  assertEquals((await adapter.setStatus(f.issue.id, first)).changed, true);
  const again = await adapter.setStatus(f.issue.id, first);
  assertEquals(again, { changed: false, status: again.status });
  assertEquals(again.status.name, first);

  // Failures, by kind.
  const unknown = await rejectsWith(
    "invalid",
    () => adapter.setStatus(f.issue.id, "No Such Status"),
  );
  assert(unknown.message.includes(second), "lists the valid status names");
  // A write, not a read: some trackers (the swamp-club Lab) serve reads to
  // anyone, so a bad credential only shows once the adapter writes.
  await rejectsWith("auth", () => f.badAuth.comment(f.issue.id, "x"));
  await rejectsWith("not_found", () => adapter.fetchIssue(f.missing));
  await rejectsWith("not_found", () => adapter.comment(f.missing, "x"));

  // The ledger, through the shared methods: one delivery key, one write.
  const methods = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({ next: second }),
  });
  const ctx: TrackerContext = fakeSwamp().context("tracker");
  const key = { workItem: "conformance-abcdefgh", journalVersion: "3" };
  const commentArgs = methods.comment.arguments.parse({
    issue: f.issue.id,
    body: "delivered once",
    ...key,
  });
  const posts = f.commentsPosted();
  await methods.comment.execute(commentArgs, ctx);
  await methods.comment.execute(commentArgs, ctx);
  assertEquals(f.commentsPosted(), posts + 1, "a repeated key posts nothing");

  const statusArgs = methods.set_status.arguments.parse({
    issue: f.issue.id,
    status: "next",
    ...key,
  });
  await methods.set_status.execute(statusArgs, ctx);
  await methods.set_status.execute(statusArgs, ctx);
  assertEquals((await adapter.fetchIssue(f.issue.id)).status.name, second);

  // Claim: the display identifier and the stable id find one index record,
  // named by the stable id, and the start command carries both ids.
  const swamp = fakeSwamp();
  swamp.definitions.set("team", {
    globalArguments: smallLifecycle(),
    type: HOLDER_TYPE,
  });
  const claim = (issue: string) =>
    methods.claim.execute(
      methods.claim.arguments.parse({ issue, lifecycle: "team" }),
      swamp.context("tracker"),
    );
  await claim(f.issue.display);
  await claim(f.issue.id);
  const records = swamp.resources.get("tracker")?.get(ticketName(f.issue.id));
  assertEquals(records?.length, 1, "one reservation per ticket");
  assertEquals(records?.[0].issue, f.issue.id);
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  const refs = JSON.stringify({
    [adapter.tracker]: f.issue.id,
    [`${adapter.tracker}.display`]: f.issue.display,
  });
  assert(summary.includes(refs), summary);
}
