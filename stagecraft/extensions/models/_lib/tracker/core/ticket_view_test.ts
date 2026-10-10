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
  RUN_SCHEMA_VERSION,
  type RunRecord,
  smallDefinition,
  type TrackerEntry,
} from "../../engine/tracker_testing.ts";
import { duplicateDefinition, entriesDefinition } from "./test_support.ts";
import {
  chooseEntry,
  commentFor,
  declaresEntries,
  duplicateMarks,
  projectEntries,
  renderEntry,
  ticketSegments,
  ticketView,
  withoutDollarKeys,
} from "./ticket_view.ts";

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
  doc.stages[0].tracker = { status: "in_progress" };
  doc.stages[1].tracker = { status: "in_review" };
  doc.stages[2].tracker = { status: "shipped" };
  return doc;
}

function runWith(stage: string, journal: JournalEvent[]): RunRecord {
  return {
    schemaVersion: RUN_SCHEMA_VERSION,
    key: KEY,
    externalRefs: {},
    tracker: { instance: "board", kind: "builtin" },
    factory: "team",
    definition: { digest: "sha256:x", version: 1 },
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
  factory: "team",
  definition: { digest: "sha256:x", version: 1 },
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

Deno.test("ticket view: each event a person needs gets a comment", () => {
  const doc = definition();
  assertEquals(
    commentFor(KEY, STARTED, doc),
    `**${KEY}** started in factory \`team\`, at stage **write**.`,
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

Deno.test("ticket view: entering a terminal stage is finishing, whichever it is", () => {
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

Deno.test("ticket view: a human stop lists each exit and what it needs; an empty one says nothing", () => {
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

Deno.test("ticket view: a park at the dispatch cap asks for a dispatch override, and its grant is said", () => {
  const doc = definition();
  const parked = {
    ...BASE,
    stage: "write",
    type: "awaiting" as const,
    exits: [],
    dispatchOverride: { count: 2, limit: 2, granted: 0 },
  };
  assertEquals(
    commentFor(KEY, parked, doc),
    `**${KEY}** is waiting on a person in **write**: dispatch limit ` +
      "reached (2 of 2); a person must grant a dispatch override.",
  );
  assertEquals(
    commentFor(KEY, {
      ...parked,
      stage: "review",
      dispatchOverride: { count: 3, limit: 2, granted: 1 },
      exits: [{
        transition: "ship",
        to: "done",
        manual: false,
        gateIds: ["ship-approval"],
      }],
    }, doc),
    `**${KEY}** is waiting on a person in **review**: dispatch limit ` +
      "reached (3 of 2 plus 1 granted); a person must grant a dispatch " +
      "override.\n\nAlso waiting on a person:\n\n" +
      "- `ship` to **done**: needs approval of `ship-approval`",
  );
  const grant = {
    ...BASE,
    stage: "write",
    type: "override" as const,
    overrideId: 1,
    kind: "dispatch" as const,
    for: "write",
  };
  assertEquals(
    commentFor(KEY, grant, doc),
    `**${KEY}**: user:alice granted a dispatch override in **write**.`,
  );
  assertEquals(
    commentFor(KEY, { ...grant, actor: NOBODY }, doc),
    `**${KEY}**: an unidentified caller granted a dispatch override in ` +
      "**write**.",
  );
});

Deno.test("ticket view: bookkeeping events get no comment", () => {
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

Deno.test("ticket view: comments after the cursor, keyed on their journal version", () => {
  const run = runWith("review", [STARTED, DISPATCHED, SUBMITTED]);
  assertEquals(ticketView(run, definition(), 0), {
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
    ticketView(run, definition(), 1).comments.map((c) => c.journalVersion),
    [3],
  );
  assertEquals(ticketView(run, definition(), 3).comments, []);
});

Deno.test("ticket view: the status is the current stage's key, or none", () => {
  const run = runWith("write", [STARTED]);
  assertEquals(ticketView(run, definition(), 1).status, "in_progress");
  assertEquals(ticketView(run, smallDefinition(), 1).status, null);
  assertEquals(
    ticketView(runWith("gone", [STARTED]), definition(), 1).status,
    null,
    "a stage a repin removed has no key",
  );
});

Deno.test("ticket view: the same run gives the same bodies, none starting with a dollar sign or holding two double quotes", () => {
  const run = runWith("review", [STARTED, SUBMITTED]);
  const first = ticketView(run, definition(), 0);
  assertEquals(ticketView(structuredClone(run), definition(), 0), first);
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

Deno.test("tracker entries: only a definition that declares entries is in entry mode", () => {
  assertEquals(declaresEntries(definition()), false);
  assertEquals(declaresEntries(entriesParsedDefinition()), true);
});

Deno.test("tracker entries: events map to their stage's entries, with the product to read", () => {
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

Deno.test("tracker entries: a declined approval answers nothing; an approved one its gate's entry", () => {
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

Deno.test("tracker entries: the payload chooses between matching entries, and fills the summary", () => {
  const entry = (step: string, status: string): TrackerEntry => ({
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
      meta: { cycle: 1, version: 1, versions: { result: 1 } },
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

Deno.test("tracker entries: linkPr reads the pull request url from the payload, when it holds one", () => {
  const entry: TrackerEntry = {
    on: { record: "pull-request" },
    step: "pr_linked",
    emoji: "x",
    summary: "PR linked: {{url}}",
    linkPr: "url",
  };
  const event = {
    journalVersion: 2,
    candidates: [entry],
    status: "in_progress",
    product: {
      kind: "evidence" as const,
      name: "pull-request",
      version: 1,
      digest: "d",
    },
    meta: { cycle: 1, version: 1, versions: { "pull-request": 1 } },
  };
  const url = "https://git.example.com/o/r/pulls/7";
  assertEquals(renderEntry(entry, event, { url }).pr, url);
  for (const payload of [{}, { url: "" }, { url: 7 }]) {
    assertEquals("pr" in renderEntry(entry, event, payload), false);
  }
});

/** entriesDefinition with entries that read event values: write's first
 * dispatch and its submit, versions on the note and the approval. */
function metaDefinition(): FactoryDefinition {
  const doc = entriesDefinition() as {
    stages: {
      work?: unknown;
      tracker: { entries: Record<string, unknown>[] };
    }[];
  };
  const [write, review] = doc.stages;
  write.work = { mode: "interactive", let: { branch: "'fix-1'" } };
  write.tracker.entries[1].summary = "Noted (v{{$version}}): {{text}}";
  write.tracker.entries.push(
    {
      on: "dispatch",
      step: "writing",
      emoji: "x",
      summary: "Writing on {{$input.branch}}, try {{$cycle}}",
    },
    {
      on: { transition: "submit" },
      step: "submitted",
      emoji: "x",
      summary: "Submitted note v{{$version.note}}",
    },
  );
  review.tracker.entries.find((e) => e.step === "ship_approved")!.summary =
    "Ship approved (note v{{$version.note}})";
  const result = parseDefinition(doc);
  if (!result.ok) throw new Error(result.errors.join("\n"));
  return result.value;
}

const recordedNote = (version: number, era = "era-1"): JournalEvent => ({
  ...RECORDED,
  era,
  version,
  digest: `sha256:n${version}`,
});

/** The summaries publish would write for a run, by ledger key. */
function summaries(run: RunRecord, doc: FactoryDefinition, since = 0) {
  return projectEntries(run, doc, since).map((event) => {
    const payload = event.product === undefined ? {} : { text: "hi" };
    const entry = chooseEntry(event.candidates, payload)!;
    return [
      `${event.journalVersion}${
        event.suffix === undefined ? "" : `-${event.suffix}`
      }`,
      renderEntry(entry, event, payload).summary,
      event.status,
    ];
  });
}

Deno.test("tracker entries: a summary reads the event's cycle, versions and first dispatch", () => {
  const doc = metaDefinition();
  const dispatch = (id: number) => ({
    id,
    era: "era-1",
    stage: "write",
    cycle: 1,
    at: BASE.at,
    actor: ALICE,
    inputs: { branch: `fix-${id}` },
  });
  const approval: JournalEvent = {
    ...BASE,
    stage: "review",
    type: "approval",
    approvalId: 1,
    gateId: "ship-approval",
    decision: "approve",
  };
  const run: RunRecord = {
    ...runWith("review", [
      STARTED,
      DISPATCHED,
      { ...DISPATCHED, dispatchId: 2 },
      recordedNote(1),
      recordedNote(2),
      SUBMITTED,
      recordedNote(3),
      approval,
    ]),
    dispatches: [dispatch(1), dispatch(2)],
    approvals: [{
      id: 1,
      gateId: "ship-approval",
      decision: "approve",
      era: "era-1",
      stage: "review",
      cycle: 1,
      at: BASE.at,
      actor: ALICE,
      products: {
        artifacts: { note: { version: 2, digest: "sha256:n2" } },
        evidence: {},
      },
    }],
  };
  assertEquals(summaries(run, doc), [
    ["1", "Work started", null],
    // Only the stage entry's first dispatch, with what it resolved.
    ["2", "Writing on fix-1, try 1", null],
    // Both in write's first cycle: noted each time, with its version.
    ["4", "Noted (v1): hi", null],
    ["5", "Noted (v2): hi", null],
    // An advance is the transition out of write, then the entry into
    // review, each under its own key; both labelled with review's status.
    ["6-transition", "Submitted note v2", "in_review"],
    ["6", "Review", "in_review"],
    ["7", "Noted (v3): hi", "in_review"],
    // The approval names the version it was given against (2), not the
    // latest one recorded (3).
    ["8", "Ship approved (note v2)", "in_review"],
  ]);
});

Deno.test("tracker entries: product versions start over in a new era", () => {
  const doc = metaDefinition();
  const run = runWith("review", [
    STARTED,
    recordedNote(2),
    {
      ...BASE,
      era: "era-2",
      stage: "write",
      type: "reset",
      previousEra: "era-1",
    },
    { ...SUBMITTED, era: "era-2" },
  ]);
  assertEquals(
    summaries(run, doc, 2).map(([key, summary]) => [key, summary]),
    [["4-transition", "Submitted note v"], ["4", "Review"]],
  );
});

Deno.test("tracker entries: payload keys starting with $ are dropped at any depth, as swamp-club refuses them", () => {
  assertEquals(
    withoutDollarKeys({
      text: "$5 is fine as a value",
      $where: "1",
      nested: { $gt: 1, ok: [{ $x: 1, y: 2 }] },
    }),
    { text: "$5 is fine as a value", nested: { ok: [{ y: 2 }] } },
  );
});

Deno.test("ticketSegments: one segment without a retarget; each retarget of this tracker's ref starts the next", () => {
  const started: JournalEvent = {
    ...BASE,
    stage: "write",
    type: "started",
    factory: "team",
    definition: { digest: "sha256:x", version: 1 },
  };
  const plain = { ...runWith("write", [started]), externalRefs: { t: "A" } };
  assertEquals(ticketSegments(plain, definition(), "t"), [
    {
      issue: "A",
      after: 0,
      through: 1,
      status: "in_progress",
      statusVersion: 1,
    },
  ]);

  const moved = (
    from: Record<string, string>,
    to: Record<string, string>,
    stage = "write",
  ): JournalEvent => ({
    ...BASE,
    stage,
    type: "retargeted",
    from,
    to,
    reason: "a free-text reason",
    actor: NOBODY,
  });
  const run = {
    ...runWith("review", [
      started,
      moved({ t: "A", "t.display": "A-1" }, { t: "B", "t.display": "B-1" }),
      // Another tracker's ref only: no new segment for t.
      moved({ t: "B", "t.display": "B-1" }, {
        t: "B",
        "t.display": "B-1",
        u: "X",
      }),
      {
        ...BASE,
        stage: "write",
        type: "advanced",
        transition: "submit",
        to: "review",
        toCycle: 1,
      },
      moved({ t: "B", "t.display": "B-1", u: "X" }, { u: "X" }, "review"),
    ]),
    externalRefs: { u: "X" },
  };
  const segments = ticketSegments(run, definition(), "t");
  assertEquals(
    segments.map((s) => [s.issue, s.after, s.through, s.status]),
    [["A", 0, 2, "in_progress"], ["B", 2, 5, "in_review"], [
      null,
      5,
      5,
      "in_review",
    ]],
  );
  assertEquals(segments.map((s) => s.statusVersion), [1, 4, 5]);
  assertEquals(
    segments[0].closing?.body,
    `**${KEY}** moved to B-1; its updates continue there.`,
  );
  assertEquals(
    segments[1].opening?.body,
    `**${KEY}** continued here from A-1, at stage **write**.`,
  );
  assertEquals(
    segments[1].closing?.body,
    `**${KEY}** no longer reports to this ticket.`,
  );
  assertEquals(segments[1].opening?.journalVersion, 2);
  assert(
    !segments.some((s) =>
      `${s.opening?.body}${s.closing?.body}`.includes("reason")
    ),
  );
  // The comments leave the retarget to the segments' notes.
  assertEquals(commentFor(KEY, run.journal[1], definition()), null);
  // A ticket the refs gain is linked, not continued.
  assertEquals(
    ticketSegments(run, definition(), "u")[1].opening?.body,
    `**${KEY}** was linked to this ticket at stage **write**.`,
  );
});

// --- duplicate marks --------------------------------------------------------

function duplicateDoc(): FactoryDefinition {
  const parsed = parseDefinition(duplicateDefinition());
  assert(parsed.ok);
  return parsed.value;
}

const recordedDuplicate = (era: string, version: number): JournalEvent => ({
  ...BASE,
  era,
  stage: "write",
  type: "recorded",
  kind: "artifact",
  name: "duplicate-of",
  version,
  digest: `sha256:${version}`,
});

const decided = (decision: "approve" | "decline"): JournalEvent => ({
  ...BASE,
  stage: "write",
  type: "approval",
  approvalId: 1,
  gateId: "duplicate-confirmation",
  decision,
});

Deno.test("duplicate marks: an approval the stage names marks from the product recorded last before it", () => {
  const run = runWith("write", [
    STARTED,
    recordedDuplicate("era-1", 1),
    recordedDuplicate("era-1", 2),
    decided("approve"),
  ]);
  assertEquals(duplicateMarks(run, duplicateDoc()), [{
    journalVersion: 4,
    product: {
      kind: "artifact",
      name: "duplicate-of",
      version: 2,
      digest: "sha256:2",
    },
    field: "primary",
    record: "duplicate-of",
    gateId: "duplicate-confirmation",
  }]);
});

Deno.test("duplicate marks: a decline marks nothing, and a product from an earlier era is not read", () => {
  const declined = runWith("write", [
    STARTED,
    recordedDuplicate("era-1", 1),
    decided("decline"),
  ]);
  assertEquals(duplicateMarks(declined, duplicateDoc()), []);
  const reset = runWith("write", [
    STARTED,
    recordedDuplicate("era-0", 1),
    decided("approve"),
  ]);
  assertEquals(duplicateMarks(reset, duplicateDoc())[0].product, null);
  // A definition without a mark reads none.
  assertEquals(
    duplicateMarks(
      runWith("write", [STARTED, decided("approve")]),
      definition(),
    ),
    [],
  );
});

Deno.test("ticket view: an interrupted or failed dispatch is news; success and checkpoints are not", () => {
  const doc = definition();
  const outcome = (
    value: "succeeded" | "failed" | "interrupted",
    supersededBy?: number,
  ): JournalEvent => ({
    ...BASE,
    stage: "write",
    type: "outcome",
    dispatchId: 1,
    outcome: value,
    ...(supersededBy !== undefined ? { supersededBy } : {}),
  });
  assertEquals(
    commentFor(KEY, outcome("interrupted", 2), doc),
    `**${KEY}**: dispatch 1 in **write** was interrupted; dispatch 2 ` +
      "replaces it.",
  );
  assertEquals(
    commentFor(KEY, outcome("interrupted"), doc),
    `**${KEY}**: dispatch 1 in **write** was interrupted.`,
  );
  assertEquals(
    commentFor(KEY, outcome("failed"), doc),
    `**${KEY}**: dispatch 1 in **write** failed.`,
  );
  assertEquals(commentFor(KEY, outcome("succeeded"), doc), null);
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      stage: "write",
      type: "checkpoint",
      dispatchId: 1,
      version: 1,
    }, doc),
    null,
  );
  assertEquals(
    commentFor(KEY, {
      ...BASE,
      stage: "write",
      type: "awaiting",
      exits: [],
      dispatchOverride: {
        count: 1,
        limit: 2,
        granted: 0,
        interruptions: { count: 4, limit: 3 },
      },
    }, doc),
    `**${KEY}** is waiting on a person in **write**: interruption limit ` +
      "reached (4 of 3); a person must grant a dispatch override.",
  );
});
