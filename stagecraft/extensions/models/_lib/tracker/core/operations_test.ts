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

import { assertEquals, assertRejects, assertThrows } from "@std/assert";
import { type TrackerAdapter, TrackerError } from "./adapter.ts";
import {
  checkedAdapter,
  describeAdapter,
  errorOf,
  failureOf,
  OPERATIONS,
  TRACKER_CONTRACT_VERSION,
} from "./operations.ts";

function adapter(overrides: Partial<TrackerAdapter> = {}): TrackerAdapter {
  return {
    tracker: "acme",
    origin: "snapshot",
    capabilities: {},
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: (id) =>
      Promise.resolve({
        id,
        display: id.toUpperCase(),
        title: "A ticket",
        status: { id: "1", name: "Todo" },
        relations: [],
      }),
    comment: () => Promise.resolve({ id: "c1" }),
    setStatus: (_id, name) =>
      Promise.resolve({ changed: true, status: { id: name, name } }),
    relate: () => Promise.resolve({ changed: true }),
    unrelate: () => Promise.resolve({ changed: false }),
    ...overrides,
  };
}

Deno.test("checkedAdapter: a result that meets the contract passes through unchanged", async () => {
  const checked = checkedAdapter(adapter());
  assertEquals((await checked.fetchIssue("a-1")).display, "A-1");
  assertEquals(await checked.comment("a-1", "hi"), { id: "c1" });
});

Deno.test("checkedAdapter: a result that does not meet the contract fails, naming the operation", async () => {
  const checked = checkedAdapter(adapter({
    // No relations, and a status with no id.
    fetchIssue: (id) =>
      Promise.resolve({
        id,
        display: id,
        title: "t",
        status: { name: "x" },
      }) as ReturnType<TrackerAdapter["fetchIssue"]>,
    comment: () =>
      Promise.resolve({ url: "u" }) as ReturnType<TrackerAdapter["comment"]>,
  }));
  const fetched = await assertRejects(() => checked.fetchIssue("a-1"));
  assertEquals((fetched as Error).message.startsWith("acme fetch_issue"), true);
  const commented = await assertRejects(() => checked.comment("a-1", "hi"));
  assertEquals((commented as Error).message.startsWith("acme comment"), true);
});

Deno.test("checkedAdapter: a TrackerError passes through as it was thrown", async () => {
  const checked = checkedAdapter(adapter({
    comment: () => Promise.reject(new TrackerError("auth", "acme", "no key")),
  }));
  const error = await assertRejects(
    () => checked.comment("a-1", "hi"),
    TrackerError,
  );
  assertEquals(error.kind, "auth");
});

Deno.test("checkedAdapter: keeps exactly the capabilities the adapter has", () => {
  const plain = checkedAdapter(adapter());
  assertEquals(Object.keys(plain.capabilities), []);
  const history = checkedAdapter(adapter({
    capabilities: {
      history: {
        postEntry: () => Promise.resolve({ id: "e" }),
        setType: (_id, type) => Promise.resolve({ changed: true, type }),
      },
    },
  }));
  assertEquals(Object.keys(history.capabilities), ["history"]);
});

Deno.test("describeAdapter: names the tracker, the contract and what it offers", () => {
  assertEquals(describeAdapter(adapter({ closesDuplicates: true })), {
    tracker: "acme",
    contract: TRACKER_CONTRACT_VERSION,
    origin: "snapshot",
    capabilities: { history: false, assign: false, pullRequests: false },
    closesDuplicates: true,
  });
  assertThrows(() => describeAdapter(adapter({ tracker: "Not A Name" })));
});

Deno.test("failures as data: a TrackerError and its record are the same failure", () => {
  const error = new TrackerError("invalid", "acme", "no way", "unreachable");
  const failure = failureOf(error);
  assertEquals(failure, {
    ok: false,
    kind: "invalid",
    reason: "unreachable",
    detail: "no way",
  });
  const back = errorOf("acme", failure);
  assertEquals([back.kind, back.reason, back.message], [
    "invalid",
    "unreachable",
    error.message,
  ]);
});

Deno.test("operations: every request and result schema is an object", () => {
  for (const [name, { request, result }] of Object.entries(OPERATIONS)) {
    assertEquals(request.def.type, "object", `${name} request`);
    assertEquals(result.def.type, "object", `${name} result`);
  }
});
