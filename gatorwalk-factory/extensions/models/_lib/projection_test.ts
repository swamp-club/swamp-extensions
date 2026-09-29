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

import { assert, assertEquals } from "@std/assert";
import type { JournalEvent } from "./journal.ts";
import type { Lifecycle } from "./lifecycle_schema.ts";
import { commentFor, project } from "./projection.ts";
import { RUN_SCHEMA_VERSION, type RunRecord } from "./run_record.ts";
import { ALICE, NOBODY, smallLifecycle } from "./test_support.ts";

const KEY = "small-abcdefgh";
const BASE = {
  at: "2026-09-29T12:00:00.000Z",
  era: "era-1",
  cycle: 1,
  actor: ALICE,
};

/** The small lifecycle, with status keys on write and review. */
function lifecycle(): Lifecycle {
  const doc = smallLifecycle();
  doc.stages[0].projection = { status: "in_progress" };
  doc.stages[1].projection = { status: "in_review" };
  doc.stages[2].projection = { status: "shipped" };
  return doc;
}

function runWith(stage: string, journal: JournalEvent[]): RunRecord {
  return {
    schemaVersion: RUN_SCHEMA_VERSION,
    key: KEY,
    externalRefs: {},
    lifecycle: { name: "small", digest: "sha256:x", version: 1 },
    era: "era-1",
    status: "active",
    stage,
    entries: { [stage]: 1 },
    products: { artifacts: {}, evidence: {} },
    validations: { artifacts: {}, evidence: {} },
    dispatches: [],
    approvals: [],
    overrides: [],
    journal,
  };
}

const STARTED: JournalEvent = {
  ...BASE,
  stage: "write",
  type: "started",
  lifecycle: { name: "small", digest: "sha256:x", version: 1 },
};
const DISPATCHED: JournalEvent = {
  ...BASE,
  stage: "write",
  type: "dispatched",
  dispatchId: 1,
};
const SUBMITTED: JournalEvent = {
  ...BASE,
  stage: "write",
  type: "advanced",
  transition: "submit",
  to: "review",
  toCycle: 1,
};

Deno.test("projection: each event a person needs gets a comment", () => {
  const doc = lifecycle();
  assertEquals(
    commentFor(KEY, STARTED, doc),
    `**${KEY}** started on lifecycle \`small\`, at stage **write**.`,
  );
  assertEquals(
    commentFor(KEY, SUBMITTED, doc),
    `**${KEY}** entered **review** (cycle 1) by \`submit\`.`,
  );
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      stage: "review",
      type: "approval",
      approvalId: 1,
      gateId: "ship-approval",
      decision: "decline",
    }, doc),
    `**${KEY}**: user:alice declined \`ship-approval\` in **review**.`,
  );
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      actor: { ...NOBODY, asserted: 'free "" text' },
      stage: "review",
      type: "approval",
      approvalId: 2,
      gateId: "ship-approval",
      decision: "approve",
    }, doc),
    `**${KEY}**: an unidentified caller approved \`ship-approval\` in ` +
      "**review**.",
    "an asserted actor is free text and is left out",
  );
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      era: "era-2",
      stage: "write",
      type: "reset",
      previousEra: "era-1",
      repinned: { digest: "sha256:y", version: 2 },
    }, doc),
    `**${KEY}** was reset: era \`era-1\` ended, and era \`era-2\` starts at ` +
      "**write**, on a newly pinned lifecycle.",
  );
});

Deno.test("projection: entering a terminal stage is finishing, whichever it is", () => {
  const doc = lifecycle();
  for (const [transition, to] of [["ship", "done"], ["abort", "aborted"]]) {
    assertEquals(
      commentFor(KEY, {
        ...BASE,
        stage: "review",
        type: "advanced",
        transition,
        to,
        toCycle: 1,
      }, doc),
      `**${KEY}** finished at **${to}** by \`${transition}\`.`,
    );
  }
});

Deno.test("projection: a human stop lists each exit and what it needs; an empty one says nothing", () => {
  const doc = lifecycle();
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      stage: "review",
      type: "awaiting",
      exits: [
        {
          transition: "ship",
          to: "done",
          manual: false,
          gateIds: ["ship-approval"],
          readyAt: "2026-09-29T13:00:00.000Z",
        },
        { transition: "force", to: "done", manual: true, gateIds: [] },
      ],
    }, doc),
    `**${KEY}** is waiting on a person in **review**:\n\n` +
      "- `ship` to **done**: needs approval of `ship-approval`, from " +
      "2026-09-29T13:00:00.000Z\n" +
      "- `force` to **done**: needs a person to confirm it",
  );
  assertEquals(
    commentFor(
      KEY,
      { ...BASE, stage: "review", type: "awaiting", exits: [] },
      doc,
    ),
    null,
  );
});

Deno.test("projection: bookkeeping events get no comment", () => {
  const doc = lifecycle();
  const quiet: JournalEvent[] = [
    DISPATCHED,
    { ...BASE, stage: "write", type: "usage", dispatchId: 1 },
    {
      ...BASE,
      stage: "write",
      type: "recorded",
      kind: "artifact",
      name: "summary",
      version: 1,
      digest: "sha256:z",
    },
    {
      ...BASE,
      stage: "write",
      type: "rejected",
      kind: "artifact",
      name: "summary",
      errors: ["text: required"],
    },
    {
      ...BASE,
      stage: "write",
      type: "override",
      overrideId: 1,
      kind: "cycle",
      for: "write",
    },
  ];
  for (const event of quiet) assertEquals(commentFor(KEY, event, doc), null);
});

Deno.test("projection: comments after the cursor, keyed on their journal version", () => {
  const run = runWith("review", [STARTED, DISPATCHED, SUBMITTED]);
  assertEquals(project(run, lifecycle(), 0), {
    comments: [
      { journalVersion: 1, body: commentFor(KEY, STARTED, lifecycle()) ?? "" },
      {
        journalVersion: 3,
        body: commentFor(KEY, SUBMITTED, lifecycle()) ?? "",
      },
    ],
    status: "in_review",
  });
  assertEquals(
    project(run, lifecycle(), 1).comments.map((c) => c.journalVersion),
    [3],
  );
  assertEquals(project(run, lifecycle(), 3).comments, []);
});

Deno.test("projection: the status is the current stage's key, or none", () => {
  const run = runWith("write", [STARTED]);
  assertEquals(project(run, lifecycle(), 1).status, "in_progress");
  assertEquals(project(run, smallLifecycle(), 1).status, null);
  assertEquals(
    project(runWith("gone", [STARTED]), lifecycle(), 1).status,
    null,
    "a stage a repin removed has no key",
  );
});

Deno.test("projection: the same run gives the same bodies, none starting with a dollar sign or holding two double quotes", () => {
  const run = runWith("review", [STARTED, SUBMITTED]);
  const first = project(run, lifecycle(), 0);
  assertEquals(project(structuredClone(run), lifecycle(), 0), first);
  for (const { body } of first.comments) {
    assert(!body.startsWith("$") && !body.includes('""'), body);
  }
});
