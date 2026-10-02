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
import {
  type IssueDraft,
  RELATION_TYPES,
  type RelationType,
  requireCapability,
  type TrackerAdapter,
  TrackerError,
  type TrackerErrorKind,
  type TrackerIssue,
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
  /** An existing ticket, which starts in neither of `statusNames`. */
  issue: { id: string; display: string };
  /** The key the ticket's first claim takes, written out by hand. */
  firstKey: string;
  /** The tracker instance's prefix argument; absent, its name is used. */
  prefix?: string;
  /** How the tracker's model bases a claimed key; absent for the default,
   * the display id as a key. */
  claimBase?: TrackerModelOptions["claimBase"];
  /** A type create accepts. */
  createType: string;
  /** A well-formed stable id of no ticket. */
  missing: string;
  /** Two status names the ticket's team has. */
  statusNames: [string, string];
  /**
   * The status name a marked duplicate ends in: the one the `closed` key
   * maps to, or the tracker's own for one that closes a duplicate itself.
   */
  closedStatus: string;
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
  /**
   * For an adapter with the optional assign capability: a user the tracker
   * accepts, and the ticket's assignees as the fake holds them.
   */
  assign?: {
    user: string;
    assignees(): string[];
  };
  /**
   * For an adapter with the optional pullRequests capability: the url the
   * ticket links, as the fake holds it.
   */
  pullRequests?: {
    linked(): string | undefined;
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

/** A read's activity: present, each item timed, oldest first. */
function assertActivity(issue: TrackerIssue): void {
  const { activity } = issue;
  assert(activity !== undefined, `${issue.display}: the read has activity`);
  const times = activity.map((a) => Date.parse(a.at));
  assert(times.every((t) => !isNaN(t)), "every activity item has a time");
  assert(
    times.every((t, i) => i === 0 || times[i - 1] <= t),
    "activity is oldest first",
  );
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

  // Read back: the comment is in the ticket's activity, under the id the
  // tracker returned for it, so a delivery record names what a read shows.
  const commented = await adapter.fetchIssue(f.issue.id);
  assertActivity(commented);
  const seen = commented.activity!.find((a) => a.id === posted.id);
  assert(seen !== undefined, "the comment is read back by its id");
  assertEquals([seen.kind, seen.body], ["comment", "conformance"]);

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
  const createdRead = await adapter.fetchIssue(created.id);
  assertEquals(createdRead.id, created.id);
  assertEquals((await adapter.fetchIssue(created.display)).id, created.id);
  // Its content: the body is the description, and it has its times.
  assertEquals(createdRead.description, draft.body);
  for (const at of [createdRead.createdAt, createdRead.updatedAt]) {
    assert(at !== undefined && !isNaN(Date.parse(at)), `a time: ${at}`);
  }
  assertActivity(createdRead);
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
    const withEntry = await adapter.fetchIssue(f.issue.id);
    assertActivity(withEntry);
    const read = withEntry.activity!.find((a) => a.id === written.id);
    assert(read !== undefined, "the entry is read back by its id");
    assertEquals([read.kind, read.step], ["entry", entry.step]);
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

  // Assign, where the adapter has it: the user is added once, and the same
  // assign again writes nothing. Where it has not, asking is refused.
  const assigner = adapter.capabilities.assign;
  if ((assigner === undefined) !== (f.assign === undefined)) {
    throw new Error("fixture: assign needs both the capability and a user");
  }
  if (assigner === undefined) {
    const refused = await rejectsWith(
      "invalid",
      // deno-lint-ignore require-await
      async () => requireCapability(adapter, "assign"),
    );
    assert(refused.message.includes("assign"), refused.message);
  }
  if (assigner !== undefined && f.assign !== undefined) {
    const { user } = f.assign;
    const added = await assigner.assign(f.issue.id, user);
    assertEquals([added.changed, added.user], [true, user]);
    const again = await assigner.assign(f.issue.id, user);
    assertEquals([again.changed, again.dropped], [false, []]);
    assertEquals(
      f.assign.assignees().filter((a) => a === user),
      [user],
      "assigned once",
    );
    const badAssign = badAuth?.capabilities.assign;
    if (badAssign !== undefined) {
      await rejectsWith("auth", () => badAssign.assign(f.issue.id, user));
    }
    await rejectsWith("not_found", () => assigner.assign(f.missing, user));
  }

  // Pull request links, where the adapter has them: linked once, the same
  // url again writes nothing, and another replaces it. Where it has not,
  // asking is refused.
  const linker = adapter.capabilities.pullRequests;
  if ((linker === undefined) !== (f.pullRequests === undefined)) {
    throw new Error(
      "fixture: pullRequests needs both the capability and a probe",
    );
  }
  if (linker === undefined) {
    const refused = await rejectsWith(
      "invalid",
      // deno-lint-ignore require-await
      async () => requireCapability(adapter, "pullRequests"),
    );
    assert(refused.message.includes("pullRequests"), refused.message);
  }
  if (linker !== undefined && f.pullRequests !== undefined) {
    const [one, two] = [
      "https://git.example.com/o/r/pulls/1",
      "https://git.example.com/o/r/pulls/2",
    ];
    assertEquals(await linker.linkPr(f.issue.id, one), {
      changed: true,
      url: one,
    });
    assertEquals(await linker.linkPr(f.issue.id, one), {
      changed: false,
      url: one,
    });
    assertEquals((await linker.linkPr(f.issue.id, two)).changed, true);
    assertEquals(f.pullRequests.linked(), two);
    const badLinker = badAuth?.capabilities.pullRequests;
    if (badLinker !== undefined) {
      await rejectsWith("auth", () => badLinker.linkPr(f.issue.id, one));
    }
    await rejectsWith("not_found", () => linker.linkPr(f.missing, one));
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
  const beforePublish = f.commentsPosted();
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  await publisher.publish.execute(publishArgs, published.context("tracker"));
  assertEquals(
    f.commentsPosted(),
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
 * Relations, on four new tickets: each kind is written, read back on both
 * ends with its direction, and removed, and a repeat of either writes
 * nothing; every shared rule refuses as invalid, whether or not the tracker
 * keeps it itself; a missing ticket is not_found; and a keyed relate
 * through the methods writes once.
 */
async function assertRelationConformance(
  f: ConformanceFixture,
  draft: IssueDraft,
): Promise<void> {
  const { adapter } = f;
  const [a, b, c, d] = [
    await adapter.create({ ...draft, title: "Relation A" }),
    await adapter.create({ ...draft, title: "Relation B" }),
    await adapter.create({ ...draft, title: "Relation C" }),
    await adapter.create({ ...draft, title: "Relation D" }),
  ];
  const relationsOf = async (issue: TrackerIssue) =>
    (await adapter.fetchIssue(issue.id)).relations.map((r) =>
      `${r.direction} ${r.type} ${r.issue}`
    ).sort();
  const relate = (x: TrackerIssue, type: RelationType, y: TrackerIssue) =>
    adapter.relate(x.id, type, y.id);
  const unrelate = (x: TrackerIssue, type: RelationType, y: TrackerIssue) =>
    adapter.unrelate(x.id, type, y.id);

  // Each kind: written once, read on both ends, removed once.
  for (const type of RELATION_TYPES) {
    assertEquals(await relate(a, type, b), { changed: true }, type);
    assertEquals(await relate(a, type, b), { changed: false }, type);
    assertEquals(await relationsOf(a), [`outgoing ${type} ${b.id}`], type);
    assertEquals(await relationsOf(b), [`incoming ${type} ${a.id}`], type);
    assertEquals(await unrelate(a, type, b), { changed: true }, type);
    assertEquals(await unrelate(a, type, b), { changed: false }, type);
    assertEquals(await relationsOf(a), [], type);
    assertEquals(await relationsOf(b), [], type);
  }

  // The rules.
  await rejectsWith("invalid", () => relate(a, "related_to", a));
  await relate(a, "parent_of", b);
  await relate(b, "parent_of", c);
  await rejectsWith("invalid", () => relate(d, "parent_of", b)); // 2nd parent
  await rejectsWith("invalid", () => relate(c, "parent_of", a)); // a cycle
  await unrelate(b, "parent_of", c);
  await unrelate(a, "parent_of", b);
  await relate(d, "duplicate_of", a);
  await rejectsWith("invalid", () => relate(d, "duplicate_of", b)); // 2nd
  await rejectsWith("invalid", () => relate(c, "duplicate_of", d)); // chain
  await rejectsWith("invalid", () => relate(a, "duplicate_of", b)); // has dups
  await unrelate(d, "duplicate_of", a);
  for (const issue of [a, b, c, d]) {
    assertEquals(await relationsOf(issue), [], "every refusal wrote nothing");
  }

  // Missing tickets, either end.
  await rejectsWith(
    "not_found",
    () => adapter.relate(a.id, "related_to", f.missing),
  );
  await rejectsWith(
    "not_found",
    () => adapter.relate(f.missing, "related_to", a.id),
  );
  await rejectsWith(
    "not_found",
    () => adapter.unrelate(a.id, "related_to", f.missing),
  );

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
  await unrelate(a, "blocked_by", b);
  await methods.relate.execute(args, ctx);
  assertEquals(await relationsOf(a), [], "a repeated key relates nothing");
}
