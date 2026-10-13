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

import { assert, assertEquals, assertRejects } from "@std/assert";
import {
  BUILTIN,
  builtinAdapter,
  type BuiltinOptions,
  type BuiltinStore,
  COMMENT_SPEC,
  COUNTER_SPEC,
  DEFAULT_STATUSES,
  DEFAULT_TYPES,
  ENTRY_SPEC,
} from "./builtin.ts";
import { TrackerError, type TrackerErrorKind } from "../core/adapter.ts";
import { assertTrackerConformance } from "../core/tracker_conformance.ts";
import {
  type Answer,
  ISSUE_SPEC,
  performOperation,
} from "../core/tracker_methods.ts";
import {
  conformancePass,
  type ConformanceState,
  freshConformance,
} from "../core/conformance_round.ts";
import { describeAdapter, errorOf, failureOf } from "../core/operations.ts";
import type { TrackerAdapter } from "../core/adapter.ts";

const NOW = new Date("2026-09-30T00:00:00Z");

/**
 * The tracker instance's data in memory: every version, with its spec.
 * `definitions` are the model definition names in the repository,
 * `highest` what the repository scan reports for any prefix, and
 * `otherTickets` the stable ids other trackers' tickets have.
 */
function memoryStore(
  definitions = new Set<string>(),
  highest = 0,
  otherTickets = new Set<string>(),
) {
  const records = new Map<
    string,
    { spec: string; versions: Record<string, unknown>[] }
  >();
  const store: BuiltinStore = {
    nameTaken: (name) => Promise.resolve(definitions.has(name)),
    ticketIdTaken: (id) => Promise.resolve(otherTickets.has(id)),
    highestNumber: () => Promise.resolve(highest),
    read: (name) =>
      Promise.resolve(
        structuredClone(records.get(name)?.versions.at(-1) ?? null),
      ),
    write: (spec, name, data) => {
      const record = records.get(name) ?? { spec, versions: [] };
      record.versions.push(structuredClone(data));
      records.set(name, record);
      return Promise.resolve({ version: record.versions.length });
    },
    records: (spec, issueId) =>
      Promise.resolve(
        [...records.entries()]
          .filter(([name, r]) =>
            r.spec === spec && name.startsWith(`${spec}-${issueId}-`)
          )
          .map(([, r]) => structuredClone(r.versions.at(-1)!)),
      ),
  };
  const count = (spec: string) =>
    [...records.values()].filter((r) => r.spec === spec).length;
  return { store, records, count };
}

function adapterWith(
  store: BuiltinStore,
  options: Partial<BuiltinOptions> = {},
) {
  return builtinAdapter({
    prefix: "cue",
    statuses: DEFAULT_STATUSES,
    types: DEFAULT_TYPES,
    store,
    now: () => NOW,
    ...options,
  });
}

async function failsWith(
  kind: TrackerErrorKind,
  call: () => Promise<unknown>,
  includes?: string,
): Promise<TrackerError> {
  const error = await assertRejects(call, TrackerError);
  assertEquals(error.kind, kind, error.message);
  if (includes !== undefined) {
    assert(error.message.includes(includes), error.message);
  }
  return error;
}

Deno.test("builtin: meets the tracker adapter contract", async () => {
  const { store, records, count } = memoryStore();
  const adapter = adapterWith(store);
  const issue = await adapter.create({
    title: "Board shortcuts",
    body: "Keys for the board.",
    type: "feature",
  });
  await assertTrackerConformance({
    adapter,
    issue: { id: issue.id, display: issue.display },
    firstKey: issue.id,
    claimBase: (claimed) => claimed.id,
    createType: "bug",
    missing: "cue-missing-aaaa",
    statusNames: ["in_progress", "shipped"],
    closedStatus: "closed",
    commentsPosted: () => count(COMMENT_SPEC),
    history: {
      entriesPosted: () => count(ENTRY_SPEC),
      statusName: "open",
      types: ["bug", "security"],
    },
    assign: {
      user: "seth",
      assignees: () =>
        (records.get(`issue-${issue.id}`)?.versions.at(-1)?.assignees ??
          []) as string[],
    },
  });
});

Deno.test("builtin: assign adds a swamp user once, reports it, and reads a ticket written before assignees", async () => {
  const { store, records } = memoryStore();
  const adapter = adapterWith(store);
  const issue = await adapter.create({
    title: "Board shortcuts",
    body: "Keys for the board.",
    type: "feature",
  });
  // A record from before assignees has no field: no one is assigned.
  const name = `issue-${issue.id}`;
  const old = records.get(name)!.versions.at(-1)!;
  delete old.assignees;
  assertEquals((await adapter.fetchIssue(issue.id)).details?.assignees, []);
  const assigner = adapter.capabilities.assign!;
  assertEquals(await assigner.assign(issue.id, "seth"), {
    changed: true,
    user: "seth",
    status: "open",
    dropped: [],
  });
  await assigner.assign(issue.id, "skunk-ape");
  assertEquals(
    (await assigner.assign(issue.id, "seth")).changed,
    false,
  );
  assertEquals((await adapter.fetchIssue(issue.id)).details?.assignees, [
    "seth",
    "skunk-ape",
  ]);
  await failsWith("invalid", () => assigner.assign(issue.id, " "), "no user");
});

Deno.test("builtin: create files <prefix>-1, then <prefix>-2, in the first status", async () => {
  const { store, records } = memoryStore();
  const issue = await adapterWith(store).create({
    title: "Board Shortcuts, for the Keyboard",
    body: "Keys for the board.",
    type: "feature",
  });
  assertEquals(issue.id, "cue-1");
  assertEquals(issue.display, issue.id);
  assertEquals(issue.url, undefined);
  assertEquals(issue.status, { id: "open", name: "open" });
  const record = records.get(`issue-${issue.id}`);
  assertEquals(record?.spec, ISSUE_SPEC);
  assertEquals(record?.versions[0], {
    origin: "builtin",
    tracker: BUILTIN,
    id: issue.id,
    display: issue.id,
    title: "Board Shortcuts, for the Keyboard",
    body: "Keys for the board.",
    type: "feature",
    status: { id: "open", name: "open" },
    relations: [],
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  });
  const second = await adapterWith(store).create({
    title: "\u{1F525}\u{1F525}",
    body: "A title with no ASCII letters is no matter.",
    type: "bug",
  });
  assertEquals(second.id, "cue-2");
  // The counter is the tracker's own record, one per prefix.
  assertEquals(records.get("counter-cue"), {
    spec: COUNTER_SPEC,
    versions: [{ prefix: "cue", next: 2 }, { prefix: "cue", next: 3 }],
  });
});

Deno.test("builtin: a new counter starts above the highest number the repository has", async () => {
  // A recreated tracker: its old work items' definitions, or another
  // tracker's tickets with this prefix, reach up to 41.
  const { store } = memoryStore(new Set(), 41);
  const issue = await adapterWith(store).create({
    title: "x",
    body: "y",
    type: "bug",
  });
  assertEquals(issue.id, "cue-42");
  // Once the counter exists, the scan is not asked again.
  const { store: kept } = memoryStore(new Set(), 41);
  await kept.write(COUNTER_SPEC, "counter-cue", { prefix: "cue", next: 7 });
  assertEquals(
    (await adapterWith(kept).create({ title: "x", body: "y", type: "bug" }))
      .id,
    "cue-7",
  );
});

Deno.test("builtin: create passes over a name a ticket or a definition already has, and never overwrites", async () => {
  // cue-1 is a work item started by hand; cue-2 a ticket whose counter
  // write was cut short.
  const { store, records } = memoryStore(new Set(["cue-1"]));
  await store.write(ISSUE_SPEC, "issue-cue-2", {
    origin: "builtin",
    id: "cue-2",
  });
  const issue = await adapterWith(store).create({
    title: "x",
    body: "y",
    type: "bug",
  });
  assertEquals(issue.id, "cue-3");
  assertEquals(records.get("issue-cue-2")?.versions.length, 1);
  assertEquals(records.get("counter-cue")?.versions.at(-1), {
    prefix: "cue",
    next: 4,
  });
});

Deno.test("builtin: create files a ticket under a supplied id, displayed as written", async () => {
  const { store, records } = memoryStore();
  const issue = await adapterWith(store).create({
    title: "Alert on queue depth",
    body: "Mirrors the Jira ticket.",
    type: "feature",
    id: "SREMON-2131",
  });
  assertEquals(issue.id, "sremon-2131");
  assertEquals(issue.display, "SREMON-2131");
  assertEquals(records.get("issue-sremon-2131")?.versions[0], {
    origin: "builtin",
    tracker: BUILTIN,
    id: "sremon-2131",
    display: "SREMON-2131",
    title: "Alert on queue depth",
    body: "Mirrors the Jira ticket.",
    type: "feature",
    status: { id: "open", name: "open" },
    relations: [],
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  });
  // The counter is neither read nor moved.
  assertEquals(records.has("counter-cue"), false);
  // Found by either case.
  assertEquals(
    (await adapterWith(store).fetchIssue("SREMON-2131")).id,
    "sremon-2131",
  );
  assertEquals(
    (await adapterWith(store).fetchIssue("sremon-2131")).display,
    "SREMON-2131",
  );
  // A counted create after it is unaffected.
  const counted = await adapterWith(store).create({
    title: "x",
    body: "y",
    type: "bug",
  });
  assertEquals(counted.id, "cue-1");
  assertEquals(counted.display, "cue-1");
  assertEquals(records.get("counter-cue")?.versions, [{
    prefix: "cue",
    next: 2,
  }]);
});

Deno.test("builtin: a supplied id is refused when it is taken, malformed, or the counter's own, and nothing is written", async () => {
  const draft = { title: "x", body: "y", type: "bug" };
  const refused: [string, string, string][] = [
    ["SREMON 2131", "cannot be a ticket id", "a space"],
    ["-abc", "cannot be a ticket id", "a leading '-'"],
    ["abc.12", "cannot be a ticket id", "a '.'"],
    // The Kelvin sign lowercases to an ASCII k.
    ["\u212A-1", "cannot be a ticket id", "a letter outside ASCII"],
    ["a".repeat(65), "longer than 64", "too long"],
    ["2131", "has no letter", "a number alone"],
    ["CUE-7", "own numbered ids", "the counter's form"],
    ["cue-12", "own numbered ids", "the counter's form, lowercase"],
  ];
  for (const [id, includes, why] of refused) {
    const { store, records } = memoryStore();
    const error = await failsWith(
      "invalid",
      () => adapterWith(store).create({ ...draft, id }),
      includes,
    );
    assertEquals(records.size, 0, `${why}: ${error.message}`);
  }
  // The counter's form under another prefix, or with more after the
  // number, is no counted id.
  const { store: other } = memoryStore();
  assertEquals(
    (await adapterWith(other).create({ ...draft, id: "OPS-7" })).id,
    "ops-7",
  );
  assertEquals(
    (await adapterWith(other).create({ ...draft, id: "cue-7-a" })).id,
    "cue-7-a",
  );

  // Taken: this tracker's ticket in any case, another tracker's ticket, or a
  // work item's name.
  const { store, records } = memoryStore(
    new Set(["abc-3"]),
    0,
    new Set(["abc-2"]),
  );
  await adapterWith(store).create({ ...draft, id: "ABC-1" });
  await failsWith(
    "invalid",
    () => adapterWith(store).create({ ...draft, id: "abc-1" }),
    "already a ticket 'abc-1'",
  );
  await failsWith(
    "invalid",
    () => adapterWith(store).create({ ...draft, id: "ABC-2" }),
    "another tracker already has a ticket 'abc-2'",
  );
  await failsWith(
    "invalid",
    () => adapterWith(store).create({ ...draft, id: "Abc-3" }),
    "already a work item's or a model's name",
  );
  assertEquals(records.get("issue-abc-1")?.versions.length, 1);
  assertEquals(records.size, 1);
});

Deno.test("builtin: a new prefix starts its own counter", async () => {
  const { store } = memoryStore();
  const draft = { title: "x", body: "y", type: "bug" };
  assertEquals((await adapterWith(store).create(draft)).id, "cue-1");
  assertEquals((await adapterWith(store).create(draft)).id, "cue-2");
  const renamed = adapterWith(store, { prefix: "ops" });
  assertEquals((await renamed.create(draft)).id, "ops-1");
  // The old ids are untouched and still found.
  assertEquals(
    (await adapterWith(store).fetchIssue("cue-2")).id,
    "cue-2",
  );
});

Deno.test("builtin: statuses move in any direction, and a declared list replaces the default", async () => {
  const { store } = memoryStore();
  const adapter = adapterWith(store, { statuses: ["todo", "doing", "done"] });
  const issue = await adapter.create({ title: "x", body: "y", type: "bug" });
  assertEquals(issue.status.name, "todo");
  assertEquals((await adapter.setStatus(issue.id, "done")).changed, true);
  assertEquals((await adapter.setStatus(issue.id, "todo")).changed, true);
  assertEquals((await adapter.fetchIssue(issue.id)).status.name, "todo");
  await failsWith(
    "invalid",
    () => adapter.setStatus(issue.id, "open"),
    "todo, doing, done",
  );
});

Deno.test("builtin: a ticket is found in any case, and refs that cannot be ids are invalid", async () => {
  const { store } = memoryStore();
  const adapter = adapterWith(store);
  const issue = await adapter.create({ title: "x", body: "y", type: "bug" });
  assertEquals(
    (await adapter.fetchIssue(issue.id.toUpperCase())).id,
    issue.id,
  );
  await failsWith("invalid", () => adapter.fetchIssue("../x"));
});

Deno.test("builtin: an entry must name a declared status, and a record that is no built-in ticket is refused", async () => {
  const { store } = memoryStore();
  const adapter = adapterWith(store);
  const issue = await adapter.create({ title: "x", body: "y", type: "bug" });
  const entry = {
    step: "triaged",
    targetStatus: "triaged",
    summary: "s",
    emoji: "e",
    payload: {},
    isVerbose: false,
  };
  await failsWith(
    "invalid",
    () => adapter.capabilities.history!.postEntry(issue.id, entry),
    "'triaged' is not a status",
  );
  await store.write(ISSUE_SPEC, "issue-cue-snap-aaaa", {
    origin: "snapshot",
  });
  await failsWith("upstream", () => adapter.fetchIssue("cue-snap-aaaa"));
});

Deno.test("builtin: create refuses an unknown type and an empty title, and writes nothing", async () => {
  const { store, records } = memoryStore();
  const adapter = adapterWith(store);
  await failsWith(
    "invalid",
    () => adapter.create({ title: "x", body: "y", type: "chore" }),
    "bug, feature, security",
  );
  await failsWith(
    "invalid",
    () => adapter.create({ title: " ", body: "y", type: "bug" }),
  );
  assertEquals(records.size, 0);
});

Deno.test("builtin: finishing a half-written relation checks the rules again", async () => {
  const { store } = memoryStore();
  const board = builtinAdapter({
    prefix: "cue",
    statuses: DEFAULT_STATUSES,
    types: DEFAULT_TYPES,
    store,
    now: () => NOW,
  });
  const draft = { title: "Ticket", body: "b", type: "bug" };
  const [p1, p2, child, other] = [
    await board.create(draft),
    await board.create(draft),
    await board.create(draft),
    await board.create(draft),
  ];
  // A crash after p1's side of `p1 parent_of child` was written.
  const half = async (from: string, to: string) => {
    const raw = await store.read(`issue-${from}`);
    await store.write(ISSUE_SPEC, `issue-${from}`, {
      ...raw,
      relations: [{
        type: "parent_of",
        direction: "outgoing",
        issue: to,
        display: to,
      }],
    });
  };
  await half(p1.id, child.id);
  // The child shows no parent, so p2 may become its parent...
  assertEquals(await board.relate(p2.id, "parent_of", child.id), {
    changed: true,
  });
  // ...and finishing p1's half relation is then refused, not a second parent.
  const refused = await assertRejects(
    () => board.relate(p1.id, "parent_of", child.id),
    TrackerError,
    "already has a parent",
  );
  assertEquals(refused.kind, "invalid");
  // With no conflict, a re-run finishes the half relation.
  await half(p1.id, other.id);
  assertEquals(await board.relate(p1.id, "parent_of", other.id), {
    changed: true,
  });
  assertEquals((await board.fetchIssue(other.id)).relations, [{
    type: "parent_of",
    direction: "incoming",
    issue: p1.id,
    display: p1.id,
  }]);
});

/**
 * The conformance workflow's passes, made in-process: each call the pass
 * plans is made on the adapter, and its answer fed to the next pass.
 */
async function conformanceByPasses(
  adapter: TrackerAdapter,
  inputs: Parameters<typeof conformancePass>[1],
): Promise<{ state: ConformanceState; calls: number }> {
  const tracker = describeAdapter(adapter);
  let state = freshConformance();
  let answer: Answer | undefined;
  for (let n = 0; n < 500; n++) {
    const pass = await conformancePass(
      tracker,
      inputs,
      state,
      answer,
      (f) => errorOf(adapter.tracker, { ok: false, ...f } as never),
      (error) => {
        const { ok: _ok, ...f } = failureOf(
          error instanceof TrackerError
            ? error
            : new TrackerError("upstream", adapter.tracker, String(error)),
        );
        return f;
      },
    );
    state = pass.state;
    if (pass.next === undefined) break;
    try {
      answer = { result: await performOperation(adapter, pass.next) };
    } catch (error) {
      answer = { error };
    }
  }
  return { state, calls: state.calls.length };
}

Deno.test("conformance passes: the built-in tracker passes the contract's checks replayed one call at a time", async () => {
  const { store } = memoryStore();
  const { state, calls } = await conformanceByPasses(adapterWith(store), {
    statusNames: ["in_progress", "shipped"],
    createType: "bug",
    missing: "cue-missing-aaaa",
    entryStatus: "open",
    types: ["feature", "security"],
    user: "seth",
  });
  assertEquals([state.done, state.passed, state.failure], [
    true,
    true,
    undefined,
  ]);
  // The workflow's bound on rounds must cover this, with room.
  assert(calls > 50 && calls < 150, `${calls} calls`);
});

Deno.test("conformance passes: a tracker that breaks the contract fails, naming the check", async () => {
  const { store } = memoryStore();
  const real = adapterWith(store);
  // Moving a ticket to the status it already has reports a change.
  const broken: TrackerAdapter = {
    ...real,
    capabilities: real.capabilities,
    setStatus: async (id, name) => ({
      ...await real.setStatus(id, name),
      changed: true,
    }),
  };
  const { state } = await conformanceByPasses(broken, {
    statusNames: ["in_progress", "shipped"],
    createType: "bug",
    missing: "cue-missing-aaaa",
    entryStatus: "open",
    types: ["feature", "security"],
    user: "seth",
  });
  assertEquals([state.done, state.passed], [true, false]);
  assert(state.failure?.includes("expected"), state.failure);
});
