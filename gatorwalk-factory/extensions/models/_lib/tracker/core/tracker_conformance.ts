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
import { fakeSwamp, smallDefinition } from "../../engine/tracker_testing.ts";
import { TRACKED_ITEM, trackedItem } from "./test_support.ts";
import {
  requireCapability,
  type TrackerAdapter,
  TrackerError,
  type TrackerErrorKind,
} from "./adapter.ts";
import {
  deliveries,
  ticketName,
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
} from "./tracker_methods.ts";

// ---------------------------------------------------------------------------
// What every tracker adapter must do, checked the same way for each: an
// adapter's own tests call assertTrackerConformance against their local fake
// of the tracker. It covers the contract in DESIGN.md, "Trackers", not a
// tracker's own quirks, which its tests cover beside this. Test-only.
// ---------------------------------------------------------------------------

export interface ConformanceFixture {
  /** An adapter with a credential the fake accepts. */
  adapter: TrackerAdapter;
  /**
   * The same tracker with a credential the fake refuses; absent for a
   * tracker that has no credential (the built-in one).
   */
  badAuth?: TrackerAdapter;
  /**
   * An existing ticket, which starts in neither of `statusNames`, and the
   * words its claimed key carries before the random suffix, written out by
   * hand: its display id's words, then its title's.
   */
  issue: { id: string; display: string; slug: string };
  /**
   * How the tracker's model names a claimed work item, and the key the
   * ticket's first claim must take; absent for the default naming.
   */
  claim?: {
    naming: NonNullable<TrackerModelOptions["claimKey"]>;
    firstKey: string;
  };
  /** A type create accepts. */
  createType: string;
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
  const { badAuth } = f;
  if (badAuth !== undefined) {
    await rejectsWith("auth", () => badAuth.comment(f.issue.id, "x"));
  }
  await rejectsWith("not_found", () => adapter.fetchIssue(f.missing));
  await rejectsWith("not_found", () => adapter.comment(f.missing, "x"));

  // Create: the new ticket is found by its stable id and its display
  // identifier; a type the tracker does not have is refused.
  const draft = {
    title: "Conformance create",
    body: "Filed by the tracker conformance suite.",
    type: f.createType,
  };
  const created = await adapter.create(draft);
  assert(created.id !== "", "create returns the stable id");
  assertEquals(created.title, draft.title);
  assertEquals((await adapter.fetchIssue(created.id)).id, created.id);
  assertEquals((await adapter.fetchIssue(created.display)).id, created.id);
  await rejectsWith(
    "invalid",
    () => adapter.create({ ...draft, type: "No Such Type" }),
  );

  // History, where the adapter has it: an entry returns its id, and a type
  // move reports changed, then writes nothing the second time. Where it has
  // not, asking for it is refused as invalid, naming the capability.
  const history = adapter.capabilities.history;
  if ((history === undefined) !== (f.history === undefined)) {
    throw new Error("fixture: history needs both the capability and counts");
  }
  if (history === undefined) {
    const refused = await rejectsWith(
      "invalid",
      () =>
        deliveries({
          tracker: adapter.tracker,
          adapter: () => adapter,
          statuses: () => ({}),
        }, () => new Date()).setType(fakeSwamp().context("tracker"), {
          issue: f.issue.id,
          type: f.createType,
          key: null,
          replay: false,
        }),
    );
    assert(refused.message.includes("history"), refused.message);
    await rejectsWith(
      "invalid",
      // deno-lint-ignore require-await
      async () => requireCapability(adapter, "history"),
    );
  }
  if (history !== undefined && f.history !== undefined) {
    const entry = {
      step: "conformance",
      targetStatus: f.history.statusName,
      summary: "conformance",
      emoji: "\u{1F50D}",
      payload: { checked: true },
      isVerbose: false,
    };
    const entries = f.history.entriesPosted();
    const written = await history.postEntry(f.issue.id, entry);
    assert(written.id !== "", "an entry returns its id");
    assertEquals(f.history.entriesPosted(), entries + 1);
    const [type, other] = f.history.types;
    assertEquals(await history.setType(f.issue.id, type), {
      changed: true,
      type,
    });
    assertEquals(await history.setType(f.issue.id, type), {
      changed: false,
      type,
    });
    assertEquals((await history.setType(f.issue.id, other)).changed, true);
    await rejectsWith(
      "invalid",
      () => history.setType(f.issue.id, "No Such Type"),
    );
    const badHistory = badAuth?.capabilities.history;
    if (badHistory !== undefined) {
      await rejectsWith("auth", () => badHistory.postEntry(f.issue.id, entry));
    }
    await rejectsWith(
      "not_found",
      () => history.postEntry(f.missing, entry),
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
  // named by the stable id, and the start command carries both ids. The key
  // is the display id's words and the title's, then a random suffix, or the
  // name the tracker's model gives a ticket's first work item.
  const swamp = fakeSwamp();
  swamp.factory("team", smallDefinition());
  const claimer = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({ next: second }),
    claimKey: f.claim?.naming,
  });
  const claim = (issue: string) =>
    claimer.claim.execute(
      claimer.claim.arguments.parse({ issue, factory: "team" }),
      swamp.context("tracker"),
    );
  await claim(f.issue.display);
  await claim(f.issue.id);
  const records = swamp.resources.get("tracker")?.get(ticketName(f.issue.id));
  assertEquals(records?.length, 1, "one reservation per ticket");
  assertEquals(records?.[0].issue, f.issue.id);
  if (f.claim === undefined) {
    assertMatch(
      String(records?.[0].key),
      new RegExp(`^${f.issue.slug}-[a-z2-7]{4}$`),
    );
  } else {
    assertEquals(records?.[0].key, f.claim.firstKey);
  }
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
  await trackedItem(
    published,
    { [adapter.tracker]: f.issue.id },
    undefined,
    { kind: adapter.tracker },
  );
  const publisher = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({ in_progress: second }),
  });
  const publishArgs = publisher.publish.arguments.parse({
    workItem: TRACKED_ITEM,
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
