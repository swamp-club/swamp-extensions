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

import { assert, assertEquals, assertMatch, assertRejects } from "@std/assert";
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
import {
  PROJECTED_ITEM,
  projectedItem,
  smallLifecycle,
} from "./test_support.ts";
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
  /**
   * An existing ticket, which starts in neither of `statusNames`, and the
   * slug its claimed key carries, written out by hand: its display id's
   * words, then its title's.
   */
  issue: { id: string; display: string; slug: string };
  /** A well-formed stable id of no ticket. */
  missing: string;
  /** Two status names the ticket's team has. */
  statusNames: [string, string];
  /** How many comments the fake has accepted so far. */
  commentsPosted(): number;
  /**
   * For an adapter with the optional history capability: how many lifecycle
   * entries the fake has accepted, and a status name and two ticket types it
   * knows, the ticket starting in neither type.
   */
  history?: {
    entriesPosted(): number;
    statusName: string;
    types: [string, string];
  };
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

  // History, where the adapter has it: an entry returns its id, and a type
  // move reports changed, then writes nothing the second time.
  if ((adapter.history === undefined) !== (f.history === undefined)) {
    throw new Error("fixture: history needs both the capability and counts");
  }
  if (adapter.history !== undefined && f.history !== undefined) {
    const entry = {
      step: "conformance",
      targetStatus: f.history.statusName,
      summary: "conformance",
      emoji: "\u{1F50D}",
      payload: { checked: true },
      isVerbose: false,
    };
    const entries = f.history.entriesPosted();
    const written = await adapter.history.postEntry(f.issue.id, entry);
    assert(written.id !== "", "an entry returns its id");
    assertEquals(f.history.entriesPosted(), entries + 1);
    const [type, other] = f.history.types;
    assertEquals(await adapter.history.setType(f.issue.id, type), {
      changed: true,
      type,
    });
    assertEquals(await adapter.history.setType(f.issue.id, type), {
      changed: false,
      type,
    });
    assertEquals(
      (await adapter.history.setType(f.issue.id, other)).changed,
      true,
    );
    await rejectsWith(
      "invalid",
      () => adapter.history!.setType(f.issue.id, "No Such Type"),
    );
    await rejectsWith(
      "auth",
      () => f.badAuth.history!.postEntry(f.issue.id, entry),
    );
    await rejectsWith(
      "not_found",
      () => adapter.history!.postEntry(f.missing, entry),
    );
  }

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
  assertMatch(
    String(records?.[0].key),
    new RegExp(`^small-${f.issue.slug}-[a-z2-7]{4}$`),
  );
  const summary = String(swamp.logs.at(-1)?.props?.summary);
  const refs = JSON.stringify({
    [adapter.tracker]: f.issue.id,
    [`${adapter.tracker}.display`]: f.issue.display,
  });
  assert(summary.includes(refs), summary);

  // Publish, through the shared methods: a work item started on the ticket
  // is read across instances, its started event is posted once, and its
  // stage's key maps to the status the ticket already has, so the move
  // writes nothing. A second publish delivers nothing.
  const published = fakeSwamp();
  await projectedItem(published, { [adapter.tracker]: f.issue.id });
  const publisher = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({ in_progress: second }),
  });
  const publishArgs = publisher.publish.arguments.parse({
    workItem: PROJECTED_ITEM,
  });
  const beforePublish = f.commentsPosted();
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  assertEquals(
    f.commentsPosted(),
    beforePublish + 1,
    "publish posts the started event once",
  );
  assertEquals((await adapter.fetchIssue(f.issue.id)).status.name, second);
}
