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
import {
  BuiltinArgumentsSchema,
  builtinMethods,
  model,
  ticketRecords,
} from "./builtin.ts";
import { BUILTIN_TYPE } from "../_lib/tracker/backends/builtin.ts";
import { TrackerError } from "../_lib/tracker/core/adapter.ts";
import { type FakeSwamp, fakeSwamp } from "../_lib/engine/tracker_testing.ts";
import {
  TRACKED_ITEM,
  trackedItem,
} from "../_lib/tracker/core/test_support.ts";

const INSTANCE = "tracker";

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
