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

import { assertEquals, assertThrows } from "@std/assert";
import { fakeSwamp } from "../../engine/tracker_testing.ts";
import { type TrackerAdapter, TrackerError } from "./adapter.ts";
import { TRACKER_CONTRACT_VERSION } from "./operations.ts";
import { type TrackerContext, trackerMethods } from "./tracker_methods.ts";

const INSTANCE = "acme";

function tracker(options: { assignee?: () => Promise<string> } = {}) {
  const calls: string[] = [];
  const state = { failComment: false };
  const adapter: TrackerAdapter = {
    tracker: "acme",
    origin: "snapshot",
    capabilities: {
      assign: {
        assign: (_id, user) =>
          Promise.resolve({ changed: true, user, status: "Todo", dropped: [] }),
      },
    },
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: (id) => {
      calls.push(`fetch ${id}`);
      return Promise.resolve({
        id,
        display: id.toUpperCase(),
        title: "A ticket",
        status: { id: "1", name: "Todo" },
        relations: [],
      });
    },
    comment: (id, body) => {
      calls.push(`comment ${id} ${body}`);
      return state.failComment
        ? Promise.reject(new TrackerError("rate_limited", "acme", "slow down"))
        : Promise.resolve({ id: "c1", url: "u" });
    },
    setStatus: () => Promise.reject(new Error("not used")),
    relate: () => Promise.reject(new Error("not used")),
    unrelate: () => Promise.reject(new Error("not used")),
  };
  const methods = trackerMethods({
    tracker: "acme",
    adapter: () => adapter,
    statuses: () => ({}),
    ...(options.assignee === undefined ? {} : { assignee: options.assignee }),
  });
  return { calls, state, methods };
}

async function operate(
  methods: ReturnType<typeof tracker>["methods"],
  ctx: TrackerContext,
  input: Record<string, unknown>,
) {
  const method = methods.operate;
  return await method.execute(method.arguments.parse(input), ctx);
}

Deno.test("operate: makes the operation and writes its answer; a succeeded answer is never made again", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = tracker();
  const input = {
    operation: "comment",
    request: { issue: "a-1", body: "hello" },
    answer: "answer-delivery-publish-comment-w-1",
  };
  await operate(methods, swamp.context(INSTANCE), input);
  await operate(methods, swamp.context(INSTANCE), input);
  assertEquals(calls, ["comment a-1 hello"]);
  const answers = swamp.resources.get(INSTANCE)?.get(input.answer);
  assertEquals(answers?.length, 1);
  assertEquals(answers?.[0], {
    operation: "comment",
    ok: true,
    result: { id: "c1", url: "u" },
  });
});

Deno.test("operate: a failure is an answer, and the next call tries again", async () => {
  const swamp = fakeSwamp();
  const { calls, state, methods } = tracker();
  state.failComment = true;
  const input = {
    operation: "comment",
    // The request as a JSON string, as from the command line.
    request: JSON.stringify({ issue: "a-1", body: "hello" }),
    answer: "answer-run-3",
  };
  await operate(methods, swamp.context(INSTANCE), input);
  assertEquals(swamp.resources.get(INSTANCE)?.get(input.answer)?.at(-1), {
    operation: "comment",
    ok: false,
    kind: "rate_limited",
    detail: "slow down",
  });
  state.failComment = false;
  await operate(methods, swamp.context(INSTANCE), input);
  assertEquals(calls.length, 2);
  assertEquals(
    swamp.resources.get(INSTANCE)?.get(input.answer)?.at(-1)?.ok,
    true,
  );
});

Deno.test("operate: refuses a request its operation does not take, and an answer name that is not one", () => {
  const { methods } = tracker();
  const parse = (input: Record<string, unknown>) =>
    methods.operate.arguments.parse(input);
  assertThrows(() =>
    parse({ operation: "nope", request: {}, answer: "answer-x" })
  );
  assertThrows(() =>
    parse({ operation: "comment", request: {}, answer: "../x" })
  );
});

Deno.test("describe: records the tracker's name, contract, capabilities and the user publish assigns", async () => {
  const swamp = fakeSwamp();
  const { methods } = tracker({ assignee: () => Promise.resolve("alice") });
  await methods.describe.execute({}, swamp.context(INSTANCE));
  assertEquals(swamp.resources.get(INSTANCE)?.get("description")?.at(-1), {
    tracker: "acme",
    contract: TRACKER_CONTRACT_VERSION,
    origin: "snapshot",
    capabilities: { history: false, assign: true, pullRequests: false },
    closesDuplicates: false,
    assignee: "alice",
  });
});

Deno.test("describe: with no one to assign, the description says nothing of an assignee", async () => {
  const swamp = fakeSwamp();
  const { methods } = tracker({
    assignee: () => Promise.reject(new Error("no stored login")),
  });
  await methods.describe.execute({}, swamp.context(INSTANCE));
  const description = swamp.resources.get(INSTANCE)?.get("description")?.at(
    -1,
  );
  assertEquals(description?.assignee, undefined);
});

Deno.test("operate: a request that does not parse, or that its operation does not take, is a failure answer", async () => {
  const swamp = fakeSwamp();
  const { calls, methods } = tracker();
  for (
    const [request, answer] of [
      ["not json", "answer-bad-1"],
      [{ issue: "a-1" }, "answer-bad-2"],
    ] as const
  ) {
    await operate(methods, swamp.context(INSTANCE), {
      operation: "comment",
      request,
      answer,
    });
    const written = swamp.resources.get(INSTANCE)?.get(answer)?.at(-1);
    assertEquals([written?.ok, written?.kind], [false, "invalid"]);
  }
  assertEquals(calls, []);
});
