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
  issueRecord,
  productPayloads,
  readWorkItem,
} from "./studio_work_item.ts";
import { queryStore, readRun } from "./studio_work_items.ts";
import {
  LOOPED_REVIEW,
  recordStore,
  scenarioItem,
} from "./studio_work_items_testing.ts";
import { testEnv } from "./test_support.ts";

// One work item's reads for the work-item view, over records a saved
// scenario left, through a query that follows swamp's latest-only rule.

const KEY = "team-plan-churn-abcd";
const BUILD = "build-swamp-extension.yaml";

Deno.test("work item: readRun reads one work item's latest run record", async () => {
  const item = await scenarioItem(BUILD, "plan-churn", KEY);
  assertEquals(await readRun(item.query, KEY), item.run);
  assertEquals(await readRun(item.query, "no-such-item"), null);
});

Deno.test("work item: readRun refuses an unsafe key before querying", async () => {
  const item = await scenarioItem(BUILD, "plan-churn", KEY);
  item.asked.length = 0;
  await assertRejects(() => readRun(item.query, 'x" || true || "'));
  await assertRejects(() => readRun(item.query, "a..b"));
  assertEquals(item.asked, []);
});

Deno.test("work item: readRun counts only a run record whose own key is the key", async () => {
  const store = recordStore();
  const item = await scenarioItem(BUILD, "plan-churn", KEY, store);
  // Another work item's run record under this name (a namespace the query
  // also reaches): not this one's.
  store.put(KEY, "run", { ...item.run, key: "someone-else" });
  // The latest version is the stray one; it is skipped, not taken.
  assertEquals(await readRun(item.query, KEY), null);
});

Deno.test("work item: an unreadable run record is an error, not a missing item", async () => {
  const store = recordStore();
  store.put(KEY, "run", { key: KEY, schemaVersion: 1 });
  await assertRejects(() => readRun(store.query, KEY), Error, "does not parse");
});

Deno.test("work item: productPayloads gives every recorded version, checked by digest", async () => {
  const item = await scenarioItem(BUILD, "plan-churn", KEY);
  const store = queryStore(item.query, KEY);
  const payloads = await productPayloads(store, item.run);
  const recorded = item.run.journal.filter((e) => e.type === "recorded");
  assertEquals(payloads.length, recorded.length);
  assert(payloads.every((p) => p.payload !== null));
  // A stored copy that is not what the journal recorded is not shown as it.
  const first = item.records.find((r) =>
    r.name === "evidence-plan-feedback" && r.version === 1
  );
  assert(first !== undefined);
  first.attributes = { changed: true };
  const after = await productPayloads(store, item.run);
  assertEquals(
    after.find((p) => p.name === "plan-feedback" && p.version === 1)?.payload,
    null,
  );
});

Deno.test("work item: issueRecord reads the ticket from the tracker's records", async () => {
  const item = await scenarioItem(BUILD, "plan-churn", KEY);
  const { instance, kind } = item.run.tracker;
  assertEquals(await issueRecord(item.query, item.run), null);
  const run = { ...item.run, externalRefs: { [kind]: "T-1" } };
  item.put(instance, "issue-T-1", {
    origin: "snapshot",
    tracker: instance,
    id: "T-1",
    display: "ENG-1",
    title: "Add the thing",
    url: "https://tracker.example/ENG-1",
    status: { id: "s1", name: "In Progress" },
    relations: [{
      type: "blocked_by",
      direction: "incoming",
      issue: "T-0",
      display: "ENG-0",
    }],
    fetchedAt: "2026-10-01T00:00:00.000Z",
  }, "@swamp/stagecraft/tracker");
  const issue = await issueRecord(item.query, run);
  assertEquals(issue?.display, "ENG-1");
  assertEquals(issue?.relations?.[0].display, "ENG-0");
  // An id that is not path-safe is never put in a query.
  item.asked.length = 0;
  assertEquals(
    await issueRecord(item.query, { ...run, externalRefs: { [kind]: 'x"' } }),
    null,
  );
  assertEquals(item.asked, []);
});

Deno.test("work item: readWorkItem gives the run, its pinned definition, payloads and status", async () => {
  const item = await scenarioItem(BUILD, LOOPED_REVIEW, KEY);
  const found = await readWorkItem(item.query, KEY, testEnv());
  // Payloads only when asked for.
  assertEquals(found?.payloads, null);
  const withPayloads = await readWorkItem(item.query, KEY, testEnv(), {
    payloads: true,
  });
  assertEquals(withPayloads?.payloads?.length, 4);
  assert(found !== null);
  assertEquals(found.run, item.run);
  assertEquals(found.pinned.version, 1);
  assertEquals(found.pinned.digest, item.run.definition.digest);
  assertEquals(found.status.stage, "plan-review");
  assertEquals(
    found.status.exits.map((e) => e.name),
    found.readiness.map((r) => r.name),
  );
  // The approve exit waits on a person deciding plan-approval.
  const approve = found.status.exits.find((e) => e.name === "approve");
  assertEquals(approve?.humanGates, ["plan-approval"]);
  assertEquals(found.issue, null);
  assertEquals(await readWorkItem(item.query, "no-such-item", testEnv()), null);
});

Deno.test("work item: a pinned definition that fails its digest is an error", async () => {
  const store = recordStore();
  const item = await scenarioItem(BUILD, "plan-churn", KEY, store);
  store.put(KEY, "run", {
    ...item.run,
    definition: { digest: "sha256:0", version: 1 },
  });
  await assertRejects(
    () => readWorkItem(item.query, KEY, testEnv()),
    Error,
    `work item '${KEY}'`,
  );
});
