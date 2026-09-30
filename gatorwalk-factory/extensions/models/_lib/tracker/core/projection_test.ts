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
import {
  ALICE,
  type FactoryDefinition,
  type JournalEvent,
  NOBODY,
  parseDefinition,
  type ProjectionEntry,
  RUN_SCHEMA_VERSION,
  type RunRecord,
  smallDefinition,
} from "../../engine/tracker_testing.ts";
import { entriesDefinition } from "./test_support.ts";
import {
  chooseEntry,
  commentFor,
  declaresEntries,
  project,
  projectEntries,
  renderEntry,
  withoutDollarKeys,
} from "./projection.ts";

const KEY = "small-abcdefgh";
const BASE = {
  at: "2026-09-29T12:00:00.000Z",
  era: "era-1",
  cycle: 1,
  actor: ALICE,
};

/** The small factory definition, with status keys on write and review. */
function definition(): FactoryDefinition {
  const doc = smallDefinition();
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
    definition: { name: "small", digest: "sha256:x", version: 1 },
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
  definition: { name: "small", digest: "sha256:x", version: 1 },
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
  const doc = definition();
  assertEquals(
    commentFor(KEY, STARTED, doc),
    `**${KEY}** started on definition \`small\`, at stage **write**.`,
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
      "**write**, on a newly pinned definition.",
  );
});

Deno.test("projection: entering a terminal stage is finishing, whichever it is", () => {
  const doc = definition();
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
  const doc = definition();
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
  const doc = definition();
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
  assertEquals(project(run, definition(), 0), {
    comments: [
      { journalVersion: 1, body: commentFor(KEY, STARTED, definition()) ?? "" },
      {
        journalVersion: 3,
        body: commentFor(KEY, SUBMITTED, definition()) ?? "",
      },
    ],
    status: "in_review",
  });
  assertEquals(
    project(run, definition(), 1).comments.map((c) => c.journalVersion),
    [3],
  );
  assertEquals(project(run, definition(), 3).comments, []);
});

Deno.test("projection: the status is the current stage's key, or none", () => {
  const run = runWith("write", [STARTED]);
  assertEquals(project(run, definition(), 1).status, "in_progress");
  assertEquals(project(run, smallDefinition(), 1).status, null);
  assertEquals(
    project(runWith("gone", [STARTED]), definition(), 1).status,
    null,
    "a stage a repin removed has no key",
  );
});

Deno.test("projection: the same run gives the same bodies, none starting with a dollar sign or holding two double quotes", () => {
  const run = runWith("review", [STARTED, SUBMITTED]);
  const first = project(run, definition(), 0);
  assertEquals(project(structuredClone(run), definition(), 0), first);
  for (const { body } of first.comments) {
    assert(!body.startsWith("$") && !body.includes('""'), body);
  }
});

// --- entries -----------------------------------------------------------------

function entriesParsedDefinition(): FactoryDefinition {
  const result = parseDefinition(entriesDefinition());
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

const RECORDED: JournalEvent = {
  ...BASE,
  stage: "write",
  type: "recorded",
  kind: "artifact",
  name: "note",
  version: 1,
  digest: "sha256:n",
};

Deno.test("projection entries: only a definition that declares entries is in entry mode", () => {
  assertEquals(declaresEntries(definition()), false);
  assertEquals(declaresEntries(entriesParsedDefinition()), true);
});

Deno.test("projection entries: events map to their stage's entries, with the product to read", () => {
  const doc = entriesParsedDefinition();
  const events = projectEntries(
    runWith("review", [STARTED, DISPATCHED, RECORDED, SUBMITTED]),
    doc,
    0,
  );
  assertEquals(
    events.map((e) => [e.journalVersion, e.candidates.map((c) => c.step)]),
    [[1, ["work_started"]], [3, ["noted"]], [4, ["review_started"]]],
  );
  assertEquals(events[1].product, {
    kind: "artifact",
    name: "note",
    version: 1,
    digest: "sha256:n",
  });
  // write has no key and nothing came before; review names in_review.
  assertEquals(events.map((e) => e.status), [null, null, "in_review"]);
  // After the cursor only, but labels still count what came before.
  assertEquals(
    projectEntries(runWith("review", [STARTED, SUBMITTED, RECORDED]), doc, 2)
      .map((e) => [e.journalVersion, e.status]),
    [[3, "in_review"]],
  );
});

Deno.test("projection entries: a declined approval answers nothing; an approved one its gate's entry", () => {
  const doc = entriesParsedDefinition();
  const approval = (decision: "approve" | "decline"): JournalEvent => ({
    ...BASE,
    stage: "review",
    type: "approval",
    approvalId: 1,
    gateId: "ship-approval",
    decision,
  });
  assertEquals(
    projectEntries(runWith("review", [approval("decline")]), doc, 0),
    [],
  );
  assertEquals(
    projectEntries(runWith("review", [approval("approve")]), doc, 0)
      .map((e) => e.candidates.map((c) => c.step)),
    [["ship_approved"]],
  );
});

Deno.test("projection entries: the payload chooses between matching entries, and fills the summary", () => {
  const entry = (step: string, status: string): ProjectionEntry => ({
    on: { record: "result" },
    match: { status },
    step,
    emoji: "x",
    summary: "{{status}} at {{absent}}!",
  });
  const candidates = [entry("passed", "passed"), entry("failed", "failed")];
  assertEquals(chooseEntry(candidates, { status: "failed" })?.step, "failed");
  assertEquals(chooseEntry(candidates, { status: "other" }), null);
  const rendered = renderEntry(
    { ...candidates[0], setsType: "status" },
    {
      journalVersion: 2,
      candidates,
      status: "in_review",
      product: { kind: "evidence", name: "result", version: 1, digest: "d" },
    },
    { status: "passed" },
  );
  assertEquals(rendered, {
    step: "passed",
    emoji: "x",
    // An absent field reads as empty text rather than blocking the entry.
    summary: "passed at !",
    status: "in_review",
    isVerbose: false,
    payload: { status: "passed" },
    type: "passed",
  });
});

Deno.test("projection entries: payload keys starting with $ are dropped at any depth, as swamp-club refuses them", () => {
  assertEquals(
    withoutDollarKeys({
      text: "$5 is fine as a value",
      $where: "1",
      nested: { $gt: 1, ok: [{ $x: 1, y: 2 }] },
    }),
    { text: "$5 is fine as a value", nested: { ok: [{ y: 2 }] } },
  );
});
