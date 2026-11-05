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
  BuiltinArgumentsSchema,
  builtinMethods,
  model,
  ticketRecords,
} from "./builtin.ts";
import { BUILTIN_TYPE } from "../_lib/tracker/backends/builtin.ts";
import type { ExternalRead } from "../_lib/tracker/backends/builtin_peers.ts";
import { RoundRecordSchema } from "../_lib/tracker/core/round_method.ts";
import { TrackerError } from "../_lib/tracker/core/adapter.ts";
import { type FakeSwamp, fakeSwamp } from "../_lib/engine/tracker_testing.ts";
import {
  TRACKED_ITEM,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";

const INSTANCE = "tracker";

/** A model whose reader gives these answers, counting its reads. */
function withReader(answers: Record<string, ExternalRead>) {
  const reads: string[] = [];
  const methods = builtinMethods({
    reader: () => ({
      read: (ref) => {
        const key = `${ref.tracker}:${ref.id}`;
        reads.push(key);
        return Promise.resolve(
          answers[key] ??
            { state: "unresolved", reason: "timeout", detail: "slow" } as const,
        );
      },
    }),
    now: () => new Date("2026-11-05T00:00:00Z"),
  });
  const call = async (
    swamp: FakeSwamp,
    name: keyof typeof methods,
    raw: Record<string, unknown>,
  ) => {
    const method = methods[name];
    const execute = method.execute as (
      args: unknown,
      ctx: ReturnType<FakeSwamp["context"]>,
    ) => Promise<unknown>;
    return await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
  };
  return { call, reads };
}

type MethodName = keyof typeof model.methods;

async function call(
  swamp: FakeSwamp,
  name: MethodName,
  raw: Record<string, unknown>,
) {
  const method = model.methods[name];
  const execute = method.execute as (
    args: unknown,
    ctx: ReturnType<FakeSwamp["context"]>,
  ) => Promise<unknown>;
  return await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
}

function withArgs(globalArgs: Record<string, unknown>): FakeSwamp {
  const swamp = fakeSwamp();
  swamp.globalArgs.set(INSTANCE, globalArgs);
  return swamp;
}

/** The id create logged, from its externalRefs. */
function createdId(swamp: FakeSwamp): string {
  const refs = JSON.parse(String(swamp.logs.at(-1)?.props?.externalRefs));
  return refs.builtin;
}

function record(swamp: FakeSwamp, name: string) {
  return swamp.resources.get(INSTANCE)?.get(name);
}

Deno.test("builtin model: the type literal matches BUILTIN_TYPE", () => {
  assertEquals(model.type, BUILTIN_TYPE);
});

Deno.test("builtin model: create files <prefix>-1, then <prefix>-2, and logs its externalRefs", async () => {
  // A trailing '-' is dropped.
  const swamp = withArgs({ prefix: "cue-" });
  await call(swamp, "create", {
    title: "Board shortcuts",
    body: "Keys for the board.",
    type: "feature",
  });
  const id = createdId(swamp);
  assertEquals(id, "cue-1");
  const refs = JSON.parse(String(swamp.logs.at(-1)?.props?.externalRefs));
  assertEquals(refs, { builtin: id, "builtin.display": id });
  assertEquals(record(swamp, `issue-${id}`)?.[0].origin, "builtin");
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  assertEquals(createdId(swamp), "cue-2");
  assertEquals(record(swamp, "counter-cue")?.at(-1), {
    prefix: "cue",
    next: 3,
  });
});

Deno.test("builtin model: create files under a supplied id, logs it as written, and leaves the counter alone", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await call(swamp, "create", {
    title: "Alert on queue depth",
    body: "Mirrors the Jira ticket.",
    type: "feature",
    id: "SREMON-2131",
  });
  const refs = JSON.parse(String(swamp.logs.at(-1)?.props?.externalRefs));
  assertEquals(refs, {
    builtin: "sremon-2131",
    "builtin.display": "SREMON-2131",
  });
  assert(
    String(swamp.logs.at(-1)?.props?.summary).startsWith(
      "created SREMON-2131 (sremon-2131): ",
    ),
  );
  assertEquals(record(swamp, "issue-sremon-2131")?.[0].display, "SREMON-2131");
  assertEquals(record(swamp, "counter-cue"), undefined);
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  assertEquals(createdId(swamp), "cue-1");
  // An empty id is no id.
  assert(
    !model.methods.create.arguments.safeParse({
      title: "x",
      body: "y",
      type: "bug",
      id: "",
    }).success,
  );
});

Deno.test("builtin model: a supplied id another tracker's ticket or a work item has is refused", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await swamp.context("other").writeResource?.("issue", "issue-ops-12", {
    origin: "builtin",
    id: "ops-12",
  });
  swamp.definitions.set("sremon-7", {
    globalArguments: {},
    type: "@swamp/stagecraft/work-item",
  });
  for (
    const [id, says] of [
      ["OPS-12", "another tracker already has a ticket 'ops-12'"],
      ["SREMON-7", "already a work item's or a model's name"],
      ["CUE-3", "own numbered ids"],
    ]
  ) {
    const error = await assertRejects(
      () => call(swamp, "create", { title: "x", body: "y", type: "bug", id }),
      TrackerError,
    );
    assert(error.message.includes(says), error.message);
  }
  assertEquals(record(swamp, "issue-ops-12"), undefined);
  assertEquals(record(swamp, "issue-sremon-7"), undefined);
});

Deno.test("builtin model: a recreated tracker continues above the highest number in the repository", async () => {
  const swamp = withArgs({ prefix: "blog" });
  // Work items from before, by definition name, and a ticket another
  // tracker with this prefix filed.
  for (
    const name of ["blog-7", "blog-41-2", "blogx-90", "blog-old-slug-ab3d"]
  ) {
    swamp.definitions.set(name, {
      globalArguments: {},
      type: "@swamp/stagecraft/work-item",
    });
  }
  await swamp.context("other").writeResource?.("issue", "issue-blog-12", {
    origin: "builtin",
    id: "blog-12",
  });
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  assertEquals(createdId(swamp), "blog-42");
  // A higher ticket elsewhere raises the start too.
  const again = withArgs({ prefix: "blog" });
  await again.context("other").writeResource?.("issue", "issue-blog-99", {
    origin: "builtin",
    id: "blog-99",
  });
  await call(again, "create", { title: "x", body: "y", type: "bug" });
  assertEquals(createdId(again), "blog-100");
});

Deno.test("builtin model: fetch_issue and claim never overwrite the ticket with a snapshot", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  const id = createdId(swamp);
  await call(swamp, "fetch_issue", { issue: id.toUpperCase() });
  assertEquals(record(swamp, `issue-${id}`)?.length, 1);
  assert(String(swamp.logs.at(-1)?.props?.summary).includes("[open]"));
});

Deno.test("builtin model: a ticket's comments are read through the data query, its own and no other's", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  const id = createdId(swamp);
  await call(swamp, "create", { title: "other", body: "z", type: "bug" });
  const other = createdId(swamp);
  await call(swamp, "comment", { issue: id, body: "first" });
  await call(swamp, "comment", { issue: other, body: "elsewhere" });
  const ctx = swamp.context(INSTANCE);
  const found = await ticketRecords(ctx, INSTANCE, "comment", id);
  assertEquals(found.map((r) => r.body), ["first"]);
  // A name that only begins like the id is not the ticket's.
  assertEquals(await ticketRecords(ctx, INSTANCE, "comment", "cue"), []);
});

Deno.test("builtin model: without a data query, fetch_issue still reads the ticket", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  const id = createdId(swamp);
  const { queryData: _, ...ctx } = swamp.context(INSTANCE);
  const method = model.methods.fetch_issue;
  await method.execute(method.arguments.parse({ issue: id }), ctx);
  assert(String(swamp.logs.at(-1)?.props?.summary).includes(id));
});

Deno.test("builtin model: statuses and types are the instance's lists, given as JSON text too", async () => {
  const swamp = withArgs({
    prefix: "cue",
    statuses: JSON.stringify(["todo", "done"]),
    types: ["task"],
  });
  await call(swamp, "create", { title: "x", body: "y", type: "task" });
  const id = createdId(swamp);
  await call(swamp, "set_status", { issue: id, status: "done" });
  await call(swamp, "set_status", { issue: id, status: "todo" });
  assertEquals(record(swamp, `issue-${id}`)?.at(-1)?.status, {
    id: "todo",
    name: "todo",
  });
  const unknown = await assertRejects(
    () => call(swamp, "set_status", { issue: id, status: "open" }),
    TrackerError,
  );
  assert(unknown.message.includes("mapped: todo, done"), unknown.message);
  await assertRejects(
    () => call(swamp, "set_type", { issue: id, type: "bug" }),
    TrackerError,
    "(they are: task)",
  );
});

Deno.test("builtin model: set_type writes once per delivery key", async () => {
  const swamp = withArgs({ prefix: "cue" });
  await call(swamp, "create", { title: "x", body: "y", type: "bug" });
  const id = createdId(swamp);
  const key = { workItem: "cue-x-abcd", journalVersion: "2" };
  await call(swamp, "set_type", { issue: id, type: "feature", ...key });
  await call(swamp, "set_type", { issue: id, type: "feature", ...key });
  assertEquals(record(swamp, `issue-${id}`)?.length, 2);
  assertEquals(record(swamp, `issue-${id}`)?.at(-1)?.type, "feature");
});

Deno.test("builtin model: the prefix defaults to the instance's name and is lowercase and short, and the lists are checked", async () => {
  const unset = withArgs({});
  await call(unset, "create", { title: "x", body: "y", type: "bug" });
  assertEquals(createdId(unset), `${INSTANCE}-1`);
  for (
    const [prefix, ok] of [["CUE", false], ["cue", true], [
      "a".repeat(12),
      true,
    ], ["a".repeat(13), false]] as const
  ) {
    assertEquals(
      BuiltinArgumentsSchema.safeParse({ prefix }).success,
      ok,
      prefix,
    );
  }
  await assertRejects(
    () =>
      call(withArgs({ prefix: "cue", statuses: "[]" }), "create", {
        title: "x",
        body: "y",
        type: "bug",
      }),
    TrackerError,
    "non-empty list",
  );
  await assertRejects(
    () =>
      call(withArgs({ prefix: "cue", types: '["a", "a"]' }), "create", {
        title: "x",
        body: "y",
        type: "a",
      }),
    TrackerError,
    "more than once",
  );
});

Deno.test("builtin model: comments and entries are kept by version count, never by age", () => {
  assertEquals(model.resources.comment.garbageCollection, 1);
  assertEquals(model.resources.entry.garbageCollection, 1);
});

Deno.test("builtin model: publish assigns the ticket to the stored login's user when the work item starts", async () => {
  for (const username of ["seth", undefined]) {
    const swamp = withArgs({ prefix: "cue" });
    const methods = builtinMethods({
      sources: {
        readAuthFile: () =>
          Promise.resolve({
            serverUrl: "https://elsewhere.example",
            apiKey: "k",
            username,
          }),
      },
    });
    const run = async (
      name: "create" | "publish",
      raw: Record<string, unknown>,
    ) => {
      const method = methods[name];
      const execute = method.execute as (
        args: unknown,
        ctx: ReturnType<FakeSwamp["context"]>,
      ) => Promise<unknown>;
      await execute(method.arguments.parse(raw), swamp.context(INSTANCE));
    };
    await run("create", { title: "x", body: "y", type: "bug" });
    const id = createdId(swamp);
    await trackedItem(swamp, { builtin: id }, undefined, { kind: "builtin" });
    await run("publish", { workItem: TRACKED_ITEM });
    const ticket = record(swamp, `issue-${id}`)?.at(-1);
    // Any server's login: a built-in ticket's assignees are swamp users.
    assertEquals(
      ticket?.assignees,
      username === undefined ? undefined : [
        username,
      ],
    );
    const warned = swamp.logs.some((l) =>
      String(l.props?.warning ?? "").includes("no username")
    );
    assertEquals(warned, username === undefined);
  }
});

// ---------------------------------------------------------------------------
// What a ticket's relations are known to be (#4376).
// ---------------------------------------------------------------------------

const RESOLVED: ExternalRead = {
  state: "resolved",
  id: "devswamp-25",
  display: "devswamp-25",
  status: "in_progress",
};

Deno.test("builtin model: fetch_issue records each relation's status, local and external, and leaves the ticket alone", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run, reads } = withReader({
    "devswamp:devswamp-25": RESOLVED,
  });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "create", { title: "b", body: "x", type: "bug" });
  await run(swamp, "set_status", { issue: "ops-2", status: "shipped" });
  await run(swamp, "relate", {
    issue: "ops-1",
    type: "blocked_by",
    to: "ops-2",
  });
  await run(swamp, "relate", {
    issue: "ops-1",
    type: "blocked_by",
    to: "devswamp:devswamp-25",
  });
  await run(swamp, "relate", {
    issue: "ops-1",
    type: "related_to",
    to: "elsewhere:x",
  });
  reads.length = 0;
  const written = record(swamp, "issue-ops-1")?.length;

  await run(swamp, "fetch_issue", { issue: "ops-1" });

  assertEquals(record(swamp, "issue-ops-1")?.length, written);
  assertEquals(reads, ["devswamp:devswamp-25", "elsewhere:x"]);
  assertEquals(record(swamp, "relations-ops-1")?.at(-1), {
    issue: "ops-1",
    checkedAt: "2026-11-05T00:00:00.000Z",
    relations: [
      {
        type: "blocked_by",
        direction: "outgoing",
        issue: "ops-2",
        display: "ops-2",
        external: false,
        state: "resolved",
        status: "shipped",
      },
      {
        type: "blocked_by",
        direction: "outgoing",
        issue: "devswamp:devswamp-25",
        display: "devswamp:devswamp-25",
        external: true,
        state: "resolved",
        status: "in_progress",
      },
      {
        type: "related_to",
        direction: "outgoing",
        issue: "elsewhere:x",
        display: "elsewhere:x",
        external: true,
        state: "unresolved",
        reason: "timeout",
        detail: "slow",
      },
    ],
  });
  assert(
    swamp.logs.some((l) =>
      String(l.props?.summary).includes("elsewhere:x: unresolved (timeout")
    ),
  );
});

Deno.test("builtin model: a ticket with no relations writes no record, and one that lost its relations says so", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run } = withReader({ "devswamp:devswamp-25": RESOLVED });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "fetch_issue", { issue: "ops-1" });
  assertEquals(record(swamp, "relations-ops-1"), undefined);
  const to = {
    issue: "ops-1",
    type: "blocked_by",
    to: "devswamp:devswamp-25",
  };
  await run(swamp, "relate", to);
  await run(swamp, "fetch_issue", { issue: "ops-1" });
  await run(swamp, "unrelate", to);
  await run(swamp, "fetch_issue", { issue: "ops-1" });
  assertEquals(record(swamp, "relations-ops-1")?.length, 2);
  assertEquals(
    (record(swamp, "relations-ops-1")?.at(-1) as { relations: unknown[] })
      .relations,
    [],
  );
});

Deno.test("builtin model: the fetch-issue workflow's calls record the relations once, with one read per ticket", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run, reads } = withReader({
    "devswamp:devswamp-25": RESOLVED,
  });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  const to = {
    issue: "ops-1",
    type: "blocked_by",
    to: "devswamp:devswamp-25",
  };
  await run(swamp, "relate", to);
  reads.length = 0;
  const args = { kind: "fetch_issue", issue: "ops-1", run: "r1" };
  for (let n = 0; n < 6; n++) {
    await run(swamp, "round", args);
    const state = RoundRecordSchema.parse(
      record(swamp, "round-fetch_issue-r1")?.at(-1),
    );
    if (state.done) break;
    for (const op of [...state.ops, ...state.reads]) {
      await run(swamp, "operate", {
        operation: op.operation,
        request: op.request,
        answer: op.answer,
        run: "r1",
      });
    }
  }
  assertEquals(record(swamp, "relations-ops-1")?.length, 1);
  assertEquals(reads, ["devswamp:devswamp-25"]);
});

Deno.test("builtin model: a relations record that cannot be written fails fetch_issue, so an older one never looks current", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run } = withReader({ "devswamp:devswamp-25": RESOLVED });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "relate", {
    issue: "ops-1",
    type: "blocked_by",
    to: "devswamp:devswamp-25",
  });
  await run(swamp, "fetch_issue", { issue: "ops-1" });
  const methods = builtinMethods({
    reader: () => ({ read: () => Promise.resolve(RESOLVED) }),
  });
  const ctx = swamp.context(INSTANCE);
  const failing = {
    ...ctx,
    writeResource: () => Promise.reject(new Error("no space")),
  };
  const method = methods.fetch_issue;
  await assertRejects(
    () =>
      (method.execute as (a: unknown, c: unknown) => Promise<unknown>)(
        method.arguments.parse({ issue: "ops-1" }),
        failing,
      ),
    Error,
    "no space",
  );
});

Deno.test("builtin model: a peer with this instance's name is that peer, not this tracker", async () => {
  const swamp = withArgs({
    prefix: "ops",
    peers: { [INSTANCE]: { repo: "/work/other" } },
  });
  const { call: run, reads } = withReader({
    [`${INSTANCE}:ops-1`]: {
      state: "resolved",
      id: "ops-1",
      display: "ops-1",
      status: "shipped",
    },
  });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "create", { title: "b", body: "x", type: "bug" });
  await run(swamp, "relate", {
    issue: "ops-2",
    type: "blocked_by",
    to: `${INSTANCE}:ops-1`,
  });
  assertEquals(reads, [`${INSTANCE}:ops-1`]);
  // The local ops-1, same id, is untouched, and the record reads the peer's.
  const local = record(swamp, "issue-ops-1")?.at(-1) as {
    relations: unknown[];
  };
  assertEquals(local.relations, []);
  await run(swamp, "fetch_issue", { issue: "ops-2" });
  const entry = (record(swamp, "relations-ops-2")?.at(-1) as {
    relations: { external: boolean; status: string }[];
  }).relations[0];
  assertEquals([entry.external, entry.status], [true, "shipped"]);
});

Deno.test("builtin model: without such a peer, this instance's own name is a local ticket", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run, reads } = withReader({});
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "create", { title: "b", body: "x", type: "bug" });
  await run(swamp, "relate", {
    issue: "ops-2",
    type: "blocked_by",
    to: `${INSTANCE}:ops-1`,
  });
  assertEquals(reads, []);
  assertEquals(
    (record(swamp, "issue-ops-1")?.at(-1) as { relations: unknown[] }).relations
      .length,
    1,
  );
});

Deno.test("builtin model: a claim's read never contacts another tracker", async () => {
  const swamp = withArgs({ prefix: "ops" });
  const { call: run, reads } = withReader({
    "devswamp:devswamp-25": RESOLVED,
  });
  await run(swamp, "create", { title: "a", body: "x", type: "bug" });
  await run(swamp, "relate", {
    issue: "ops-1",
    type: "blocked_by",
    to: "devswamp:devswamp-25",
  });
  reads.length = 0;
  await run(swamp, "claim", { issue: "ops-1", dryRun: true });
  assertEquals(reads, []);
  assertEquals(record(swamp, "relations-ops-1"), undefined);
});

Deno.test("builtin model: peers are checked: one route each, an absolute path, and a token only where it may go", () => {
  const parses = (peers: unknown) =>
    model.globalArguments.safeParse({ peers }).success;
  assert(parses({ devswamp: { repo: "/work/devswamp" } }));
  assert(parses({ devswamp: { repo: "C:\\work\\devswamp" } }));
  assert(parses({ devswamp: { server: "wss://swamp.acme.example" } }));
  assert(parses({ devswamp: { server: "http://other.example:9090" } }));
  assert(parses({
    devswamp: {
      server: "https://swamp.acme.example",
      token: "\${{ vault.get(v, k) }}",
    },
  }));
  assert(parses({ d: { server: "http://127.0.0.1:9090", token: "t" } }));
  assert(parses({ d: { server: "\${{ vars.url }}", token: "t" } }));

  assert(!parses({ devswamp: {} }));
  assert(!parses({ devswamp: { repo: "/a", server: "ws://b" } }));
  assert(!parses({ devswamp: { repo: "../devswamp" } }));
  assert(!parses({ devswamp: { repo: "--config=/x" } }));
  assert(!parses({ devswamp: { server: "--token=x" } }));
  assert(!parses({ devswamp: { server: "file:///etc/passwd" } }));
  assert(!parses({ devswamp: { repo: "/a", token: "t" } }));
  assert(!parses({ devswamp: { server: "http://other.example", token: "t" } }));
  assert(!parses({ devswamp: { server: "ws://other.example", token: "t" } }));
  assert(!parses({ "Dev:swamp": { repo: "/a" } }));
  assert(!parses({ devswamp: { repo: "/a", extra: 1 } }));
});
