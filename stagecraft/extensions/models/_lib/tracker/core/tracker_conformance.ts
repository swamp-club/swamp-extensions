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
import { fakeSwamp, smallDefinition } from "../../engine/tracker_testing.ts";
import {
  duplicateDefinition,
  TRACKED_ITEM,
  trackedItem,
} from "./test_support.ts";
import { type IssueDraft, type TrackerIssue } from "./adapter.ts";
import {
  ticketName,
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
} from "./tracker_methods.ts";
import { checkedAdapter } from "./operations.ts";
import {
  checkTrackerContract,
  type ContractFixture,
} from "./contract_checks.ts";

// ---------------------------------------------------------------------------
// What every tracker adapter stagecraft ships must do, checked the same way
// for each: an adapter's own tests call assertTrackerConformance against
// their local fake of the tracker. It runs the contract's checks
// (contract_checks.ts, which a tracker written as a separate extension also
// passes), then stagecraft's shared methods over the adapter. It covers the
// contract in DESIGN.md, "Trackers", not a tracker's own quirks, which its
// tests cover beside this. Test-only.
// ---------------------------------------------------------------------------

export interface ConformanceFixture extends ContractFixture {
  /** The key the ticket's first claim takes, written out by hand. */
  firstKey: string;
  /** The tracker instance's prefix argument; absent, its name is used. */
  prefix?: string;
  /** How the tracker's model bases a claimed key; absent for the default,
   * the display id as a key. */
  claimBase?: TrackerModelOptions["claimBase"];
  /**
   * The status name a marked duplicate ends in: the one the `closed` key
   * maps to, or the tracker's own for one that closes a duplicate itself.
   */
  closedStatus: string;
}

export async function assertTrackerConformance(
  fixture: ConformanceFixture,
): Promise<void> {
  // The contract, through the tracker's operations alone (contract_checks.ts).
  await checkTrackerContract(fixture);
  // Then stagecraft's shared methods over the tracker, against the fake
  // swamp: the delivery ledger, claim, publish, a keyed relate and
  // duplicates.
  const f: ConformanceFixture = {
    ...fixture,
    adapter: checkedAdapter(fixture.adapter),
  };
  const { adapter } = f;
  const [, second] = f.statusNames;
  const draft = {
    title: "Conformance create",
    body: "Filed by the tracker conformance suite.",
    type: f.createType,
  };

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
  const posts = await f.commentsPosted();
  await methods.comment.execute(commentArgs, ctx);
  await methods.comment.execute(commentArgs, ctx);
  assertEquals(
    await f.commentsPosted(),
    posts + 1,
    "a repeated key posts nothing",
  );

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
  // is the ticket's id as a key, or the base the tracker's model gives.
  const swamp = fakeSwamp();
  swamp.factory("team", smallDefinition());
  if (f.prefix !== undefined) {
    swamp.globalArgs.set("tracker", { prefix: f.prefix });
  }
  const claimer = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({ next: second }),
    claimBase: f.claimBase,
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
  assertEquals(records?.[0].key, f.firstKey);
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
  const beforePublish = await f.commentsPosted();
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  assertEquals(
    await f.commentsPosted(),
    beforePublish + 1,
    "publish posts the started event once",
  );
  assertEquals((await adapter.fetchIssue(f.issue.id)).status.name, second);

  await assertRelationConformance(f, draft);
  await assertDuplicateConformance(f, draft);
}

/**
 * Duplicates (DESIGN.md, "Duplicates"), on new tickets. A person's
 * mark_duplicate relates and closes, once. publish projects an approved
 * duplicate mark the same way, whichever move follows it: the duplicate
 * exit, or a retarget onto the primary, which also moves the ticket index
 * and never reopens the duplicate. A declined approval marks nothing. A
 * ticket marked outside a work item's journal is refused by publish while
 * that work item is at work on it, and by claim.
 */
async function assertDuplicateConformance(
  f: ConformanceFixture,
  draft: IssueDraft,
): Promise<void> {
  const { adapter } = f;
  const second = f.statusNames[1];
  const methods = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({
      in_progress: second,
      in_review: second,
      shipped: second,
      closed: f.closedStatus,
    }),
  });
  const ticket = (title: string) => adapter.create({ ...draft, title });
  const duplicateOf = async (issue: TrackerIssue) =>
    (await adapter.fetchIssue(issue.id)).relations.find((r) =>
      r.type === "duplicate_of" && r.direction === "outgoing"
    )?.issue;
  const statusOf = async (issue: TrackerIssue) =>
    (await adapter.fetchIssue(issue.id)).status.name;
  const publish = (swamp: ReturnType<typeof fakeSwamp>) =>
    methods.publish.execute(
      methods.publish.arguments.parse({ workItem: TRACKED_ITEM }),
      swamp.context("tracker"),
    );
  const refsOf = (issue: TrackerIssue) => ({
    [adapter.tracker]: issue.id,
    [`${adapter.tracker}.display`]: issue.display,
  });

  // A person marks a duplicate, by display ids: related and closed, once.
  const primary = await ticket("Duplicate primary");
  const marked = await ticket("Marked by a person");
  const markArgs = methods.mark_duplicate.arguments.parse({
    issue: marked.display,
    primary: primary.display,
  });
  const person = fakeSwamp().context("tracker");
  await methods.mark_duplicate.execute(markArgs, person);
  assertEquals(await duplicateOf(marked), primary.id);
  assertEquals(await statusOf(marked), f.closedStatus);
  await methods.mark_duplicate.execute(markArgs, person);
  assertEquals(
    await duplicateOf(marked),
    primary.id,
    "marking again is a no-op",
  );

  // The agent path, then the duplicate exit: marked and closed.
  const exited = await ticket("Duplicate that exits");
  const exits = fakeSwamp();
  const exiting = await trackedItem(
    exits,
    refsOf(exited),
    duplicateDefinition(),
    { kind: adapter.tracker },
  );
  await exiting.record("artifact", "duplicate-of", { primary: primary.id });
  await exiting.approve("duplicate-confirmation");
  await exiting.advance("duplicate");
  await publish(exits);
  assertEquals(await duplicateOf(exited), primary.id);
  assertEquals(await statusOf(exited), f.closedStatus);

  // The agent path, then a retarget onto a primary with no work item: the
  // duplicate stays closed, the primary takes the work and its status, and
  // the ticket index names the work item on the primary.
  const moved = await ticket("Duplicate whose work moves");
  const target = await ticket("Primary that takes the work");
  const moves = fakeSwamp();
  const moving = await trackedItem(
    moves,
    refsOf(moved),
    duplicateDefinition(),
    { kind: adapter.tracker },
  );
  await moving.record("artifact", "duplicate-of", { primary: target.id });
  await moving.approve("duplicate-confirmation");
  await moving.retarget(refsOf(target));
  await publish(moves);
  await publish(moves);
  assertEquals(await duplicateOf(moved), target.id);
  assertEquals(await statusOf(moved), f.closedStatus, "never reopened");
  assertEquals(await statusOf(target), second);
  const index = moves.resources.get("tracker")?.get(ticketName(target.id));
  assertEquals(index?.at(-1)?.key, TRACKED_ITEM);

  // A declined approval marks nothing.
  const declined = await ticket("Not a duplicate after all");
  const declines = fakeSwamp();
  const declining = await trackedItem(
    declines,
    refsOf(declined),
    duplicateDefinition(),
    { kind: adapter.tracker },
  );
  await declining.record("artifact", "duplicate-of", { primary: primary.id });
  await declining.decline("duplicate-confirmation");
  await publish(declines);
  assertEquals(await duplicateOf(declined), undefined);

  // Marked outside the work item's journal: publish refuses while the work
  // item is at work there, and claim refuses the duplicate.
  const outside = await ticket("Marked while at work");
  const works = fakeSwamp();
  works.factory("team", smallDefinition());
  const working = await trackedItem(
    works,
    refsOf(outside),
    duplicateDefinition(),
    { kind: adapter.tracker },
  );
  await publish(works);
  await methods.mark_duplicate.execute(
    methods.mark_duplicate.arguments.parse({
      issue: outside.id,
      primary: primary.id,
    }),
    works.context("tracker"),
  );
  await working.advance("submit");
  const refused = await assertRejects(() => publish(works), Error);
  assert(
    refused.message.includes(`is a duplicate of ${primary.display}`),
    refused.message,
  );
  const claimRefused = await assertRejects(
    () =>
      methods.claim.execute(
        methods.claim.arguments.parse({ issue: outside.id, factory: "team" }),
        works.context("tracker"),
      ),
    Error,
  );
  assert(
    claimRefused.message.includes(`work on ${primary.display}`),
    claimRefused.message,
  );

  // The driver moves that work item to a primary with none: the publish
  // finishes the person's duplicate without reopening it.
  const elsewhere = await ticket("Primary for the work marked while at work");
  await working.retarget(refsOf(elsewhere));
  await publish(works);
  assertEquals(await statusOf(outside), f.closedStatus, "never reopened");
  assertEquals(await statusOf(elsewhere), second);
}

/**
 * A keyed relate through the methods writes once, even once the relation
 * has been removed by hand. (The relations themselves, and their rules, are
 * the contract's: contract_checks.ts.)
 */
async function assertRelationConformance(
  f: ConformanceFixture,
  draft: IssueDraft,
): Promise<void> {
  const { adapter } = f;
  const [a, b] = [
    await adapter.create({ ...draft, title: "Relation A" }),
    await adapter.create({ ...draft, title: "Relation B" }),
  ];
  const relationsOf = async (issue: TrackerIssue) =>
    (await adapter.fetchIssue(issue.id)).relations.map((r) =>
      `${r.direction} ${r.type} ${r.issue}`
    ).sort();
  // The ledger: a repeat of the key writes nothing, even once the relation
  // has been removed by hand.
  const methods = trackerMethods({
    tracker: adapter.tracker,
    adapter: () => adapter,
    statuses: () => ({}),
  });
  const ctx: TrackerContext = fakeSwamp().context("tracker");
  const args = methods.relate.arguments.parse({
    issue: a.id,
    type: "blocked_by",
    to: b.id,
    workItem: "conformance-abcdefgh",
    journalVersion: "4",
  });
  await methods.relate.execute(args, ctx);
  await adapter.unrelate(a.id, "blocked_by", b.id);
  await methods.relate.execute(args, ctx);
  assertEquals(await relationsOf(a), [], "a repeated key relates nothing");
}
