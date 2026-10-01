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
import {
  BUILTIN,
  builtinAdapter,
  type BuiltinOptions,
  type BuiltinStore,
  COMMENT_SPEC,
  DEFAULT_STATUSES,
  DEFAULT_TYPES,
  ENTRY_SPEC,
} from "./builtin.ts";
import { TrackerError, type TrackerErrorKind } from "../core/adapter.ts";
import { assertTrackerConformance } from "../core/tracker_conformance.ts";
import { ISSUE_SPEC } from "../core/tracker_methods.ts";

const NOW = new Date("2026-09-30T00:00:00Z");

/** The tracker instance's data in memory: every version, with its spec. */
function memoryStore() {
  const records = new Map<
    string,
    { spec: string; versions: Record<string, unknown>[] }
  >();
  const store: BuiltinStore = {
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
  const { store, count } = memoryStore();
  const adapter = adapterWith(store);
  const issue = await adapter.create({
    title: "Board shortcuts",
    body: "Keys for the board.",
    type: "feature",
  });
  await assertTrackerConformance({
    adapter,
    issue: { id: issue.id, display: issue.display, slug: "unused" },
    claim: {
      naming: () => ({ lead: "cue", first: issue.id }),
      firstKey: issue.id,
    },
    createType: "bug",
    missing: "cue-missing-aaaa",
    statusNames: ["in_progress", "shipped"],
    commentsPosted: () => count(COMMENT_SPEC),
    history: {
      entriesPosted: () => count(ENTRY_SPEC),
      statusName: "open",
      types: ["bug", "security"],
    },
  });
});

Deno.test("builtin: create files a lowercase <prefix>-<slug>-<rnd> ticket in the first status", async () => {
  const { store, records } = memoryStore();
  const issue = await adapterWith(store).create({
    title: "Board Shortcuts, for the Keyboard",
    body: "Keys for the board.",
    type: "feature",
  });
  assertMatch(issue.id, /^cue-board-shortcuts-keyboard-[a-z2-7]{4}$/);
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
});

Deno.test("builtin: an id some ticket already has is drawn again, and never reused", async () => {
  const { store } = memoryStore();
  // Every id looks taken: no ticket is filed, and nothing is overwritten.
  const taken: BuiltinStore = {
    read: () => Promise.resolve({ origin: "builtin" }),
    write: () => Promise.reject(new Error("no write expected")),
  };
  await failsWith(
    "upstream",
    () => adapterWith(taken).create({ title: "x", body: "y", type: "bug" }),
    "free ticket id",
  );
  const reads: string[] = [];
  const counting: BuiltinStore = {
    read: (name) => {
      reads.push(name);
      // The first id drawn is taken; the second is free.
      return reads.length === 1
        ? Promise.resolve({ origin: "builtin" })
        : store.read(name);
    },
    write: store.write,
  };
  const issue = await adapterWith(counting).create({
    title: "x",
    body: "y",
    type: "bug",
  });
  assertEquals(reads.length, 2);
  assertEquals(`issue-${issue.id}`, reads[1]);
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

Deno.test("builtin: a title with no ASCII letters files a <prefix>-<rnd> ticket", async () => {
  const { store } = memoryStore();
  const issue = await adapterWith(store).create({
    title: "\u{1F525}\u{1F525}",
    body: "y",
    type: "bug",
  });
  assertMatch(issue.id, /^cue-[a-z2-7]{4}$/);
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
