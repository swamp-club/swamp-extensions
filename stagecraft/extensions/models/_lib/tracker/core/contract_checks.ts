// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {
  RELATION_TYPES,
  type RelationType,
  requireCapability,
  type TrackerAdapter,
  TrackerError,
  type TrackerErrorKind,
  type TrackerIssue,
} from "./adapter.ts";
import { checkedAdapter } from "./operations.ts";

// ---------------------------------------------------------------------------
// The tracker contract's checks (swamp-club #3274): what every tracker must
// do itself, checked the same way for each, through its operations alone.
// stagecraft's own adapters run them in their tests (tracker_conformance.ts
// adds the checks of stagecraft's shared methods over each), and a tracker
// written as a separate extension runs them through the shipped
// conformance workflow, which replays them against its operate
// (conformance_round.ts). So they use no test code: their own assertions,
// and probes a fixture answers by reading the ticket back.
// ---------------------------------------------------------------------------

/** What the checks need of a tracker, and how to see what it holds. */
export interface ContractFixture {
  /** The tracker, with a credential it accepts. */
  adapter: TrackerAdapter;
  /** The same tracker with a credential it refuses, where one can be had. */
  badAuth?: TrackerAdapter;
  /** An existing ticket, which starts in neither of `statusNames`. */
  issue: { id: string; display: string };
  /** A type create accepts. */
  createType: string;
  /** A well-formed stable id of no ticket. */
  missing: string;
  /** Two status names the ticket's team has. */
  statusNames: [string, string];
  /** How many comments the tracker has accepted so far. */
  commentsPosted(): number | Promise<number>;
  /**
   * For a tracker with the history capability: how many lifecycle entries
   * it has accepted, and a status name and two ticket types it knows, the
   * ticket starting in neither type.
   */
  history?: {
    entriesPosted(): number | Promise<number>;
    statusName: string;
    types: [string, string];
  };
  /** For a tracker with the assign capability: a user it accepts, and the
   * ticket's assignees as it holds them. */
  assign?: {
    user: string;
    assignees(): string[] | Promise<string[]>;
  };
  /** For a tracker with the pullRequests capability: the url the ticket
   * links, where it can be seen. */
  pullRequests?: {
    linked?(): string | undefined | Promise<string | undefined>;
  };
}

/** A check that failed. */
export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContractError";
  }
}

function check(
  condition: unknown,
  message = "a check failed",
): asserts condition {
  if (!condition) throw new ContractError(message);
}

/** JSON with sorted keys: equal data is equal text. */
function canonical(value: unknown): string {
  return JSON.stringify(
    value,
    (_key, v) =>
      v !== null && typeof v === "object" && !Array.isArray(v)
        ? Object.fromEntries(
          Object.entries(v as Record<string, unknown>).sort(([x], [y]) =>
            x < y ? -1 : x > y ? 1 : 0
          ),
        )
        : v,
  ) ?? "undefined";
}

function same(actual: unknown, expected: unknown, message = ""): void {
  if (canonical(actual) !== canonical(expected)) {
    throw new ContractError(
      `${message === "" ? "" : `${message}: `}expected ${
        canonical(expected)
      }, got ${canonical(actual)}`,
    );
  }
}

async function rejectsWith(
  kind: TrackerErrorKind,
  call: () => Promise<unknown>,
): Promise<TrackerError> {
  let result: unknown;
  try {
    result = await call();
  } catch (error) {
    if (!(error instanceof TrackerError)) throw error;
    if (error.kind !== kind) {
      throw new ContractError(
        `expected a ${kind} failure, got ${error.kind}: ${error.message}`,
      );
    }
    return error;
  }
  throw new ContractError(
    `expected a ${kind} failure, got ${canonical(result)}`,
  );
}

/** A read's activity: present, each item timed, oldest first. */
function assertActivity(issue: TrackerIssue): void {
  const { activity } = issue;
  check(activity !== undefined, `${issue.display}: the read has activity`);
  const times = activity.map((a) => Date.parse(a.at));
  check(times.every((t) => !isNaN(t)), "every activity item has a time");
  check(
    times.every((t, i) => i === 0 || times[i - 1] <= t),
    "activity is oldest first",
  );
}

/**
 * Check the tracker contract (DESIGN.md, "Trackers"): fetch, comment,
 * status, failures by kind, create, each optional capability or its
 * refusal, and relations with their rules. Every result is also checked
 * against the operations' schemas. Throws a ContractError naming the first
 * check that failed; a TrackerError the checks did not ask for is thrown as
 * it came.
 */
export async function checkTrackerContract(
  fixture: ContractFixture,
): Promise<void> {
  const f: ContractFixture = {
    ...fixture,
    adapter: checkedAdapter(fixture.adapter),
    ...(fixture.badAuth === undefined
      ? {}
      : { badAuth: checkedAdapter(fixture.badAuth) }),
  };
  const { adapter } = f;

  // Fetch: the stable id and the display identifier find the same ticket.
  const byId = await adapter.fetchIssue(f.issue.id);
  const byDisplay = await adapter.fetchIssue(f.issue.display);
  same(byId.id, f.issue.id);
  same(byDisplay.id, f.issue.id);
  same(byId.display, f.issue.display);
  check(!f.statusNames.includes(byId.status.name), "fixture: bad start");

  // Comment: the tracker's id for it comes back.
  const before = await f.commentsPosted();
  const posted = await adapter.comment(f.issue.id, "conformance");
  check(posted.id !== "", "a comment returns its id");
  same(await f.commentsPosted(), before + 1);

  // Read back: the comment is in the ticket's activity, under the id the
  // tracker returned for it, so a delivery record names what a read shows.
  const commented = await adapter.fetchIssue(f.issue.id);
  assertActivity(commented);
  const seen = commented.activity!.find((a) => a.id === posted.id);
  check(seen !== undefined, "the comment is read back by its id");
  same([seen.kind, seen.body], ["comment", "conformance"]);

  // Status: a move reports changed; the same move again writes nothing.
  const [first, second] = f.statusNames;
  same((await adapter.setStatus(f.issue.id, first)).changed, true);
  const again = await adapter.setStatus(f.issue.id, first);
  same(again, { changed: false, status: again.status });
  same(again.status.name, first);

  // Failures, by kind.
  const unknown = await rejectsWith(
    "invalid",
    () => adapter.setStatus(f.issue.id, "No Such Status"),
  );
  check(unknown.message.includes(second), "lists the valid status names");
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
  check(created.id !== "", "create returns the stable id");
  same(created.title, draft.title);
  const createdRead = await adapter.fetchIssue(created.id);
  same(createdRead.id, created.id);
  same((await adapter.fetchIssue(created.display)).id, created.id);
  // Its content: the body is the description, and it has its times.
  same(createdRead.description, draft.body);
  for (const at of [createdRead.createdAt, createdRead.updatedAt]) {
    check(at !== undefined && !isNaN(Date.parse(at)), `a time: ${at}`);
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
    const entries = await f.history.entriesPosted();
    const written = await history.postEntry(f.issue.id, entry);
    check(written.id !== "", "an entry returns its id");
    same(await f.history.entriesPosted(), entries + 1);
    const withEntry = await adapter.fetchIssue(f.issue.id);
    assertActivity(withEntry);
    const read = withEntry.activity!.find((a) => a.id === written.id);
    check(read !== undefined, "the entry is read back by its id");
    same([read.kind, read.step], ["entry", entry.step]);
    const [type, other] = f.history.types;
    same(await history.setType(f.issue.id, type), {
      changed: true,
      type,
    });
    same(await history.setType(f.issue.id, type), {
      changed: false,
      type,
    });
    same((await history.setType(f.issue.id, other)).changed, true);
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
    check(refused.message.includes("assign"), refused.message);
  }
  if (assigner !== undefined && f.assign !== undefined) {
    const { user } = f.assign;
    const added = await assigner.assign(f.issue.id, user);
    same([added.changed, added.user], [true, user]);
    const again = await assigner.assign(f.issue.id, user);
    same([again.changed, again.dropped], [false, []]);
    same(
      (await f.assign.assignees()).filter((a) => a === user),
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
    check(refused.message.includes("pullRequests"), refused.message);
  }
  if (linker !== undefined && f.pullRequests !== undefined) {
    const [one, two] = [
      "https://git.example.com/o/r/pulls/1",
      "https://git.example.com/o/r/pulls/2",
    ];
    same(await linker.linkPr(f.issue.id, one), {
      changed: true,
      url: one,
    });
    same(await linker.linkPr(f.issue.id, one), {
      changed: false,
      url: one,
    });
    same((await linker.linkPr(f.issue.id, two)).changed, true);
    if (f.pullRequests.linked !== undefined) {
      same(
        await f.pullRequests.linked(),
        two,
        "the second url replaces the first",
      );
    }
    const badLinker = badAuth?.capabilities.pullRequests;
    if (badLinker !== undefined) {
      await rejectsWith("auth", () => badLinker.linkPr(f.issue.id, one));
    }
    await rejectsWith("not_found", () => linker.linkPr(f.missing, one));
  }

  // Relations, on four new tickets: each kind is written, read back on both
  // ends with its direction, and removed, and a repeat of either writes
  // nothing; every shared rule refuses as invalid, whether or not the
  // tracker keeps it itself; a missing ticket is not_found.
  const draftForRelations = {
    title: "Conformance create",
    body: "Filed by the tracker conformance suite.",
    type: f.createType,
  };
  const [a, b, c, d] = [
    await adapter.create({ ...draftForRelations, title: "Relation A" }),
    await adapter.create({ ...draftForRelations, title: "Relation B" }),
    await adapter.create({ ...draftForRelations, title: "Relation C" }),
    await adapter.create({ ...draftForRelations, title: "Relation D" }),
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
    same(await relate(a, type, b), { changed: true }, type);
    same(await relate(a, type, b), { changed: false }, type);
    same(await relationsOf(a), [`outgoing ${type} ${b.id}`], type);
    same(await relationsOf(b), [`incoming ${type} ${a.id}`], type);
    same(await unrelate(a, type, b), { changed: true }, type);
    same(await unrelate(a, type, b), { changed: false }, type);
    same(await relationsOf(a), [], type);
    same(await relationsOf(b), [], type);
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
    same(await relationsOf(issue), [], "every refusal wrote nothing");
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
}
