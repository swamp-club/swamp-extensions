import {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  readSwampifyCandidateSet,
  readSwampifyCandidateSetSummary,
  readSwampifyComparison,
  readSwampifyComparisonSummary,
  readVersionedGate,
  SWAMPIFY_COMPARISON_QUERY_PREDICATE,
  SWAMPIFY_JSON_SCHEMA_FILES,
  SWAMPIFY_LIMITS,
  swampifyCandidateId,
  swampifyCandidateSetTags,
  swampifyComparisonDataName,
  swampifyComparisonPredicate,
  swampifyComparisonTags,
} from "./swampify.ts";

// Synthetic fixtures only: no text from a real transcript.
const ID_A = "0123456789abcdef0123456789abcdef";
const ID_B = "fedcba9876543210fedcba9876543210";

const range = (min = 1, median = 2, max = 3) => ({ min, median, max });
const cost = () => ({
  tokens: {
    input: range(),
    output: range(),
    cacheRead: range(),
    cacheWrite: range(),
  },
  toolCalls: range(),
  activeMs: range(100, 200, 300),
});

function candidate(extra: Record<string, unknown> = {}) {
  return {
    id: ID_A,
    kind: "prompt-repeat",
    invocation: "interactive",
    label: "Ship the release notes",
    occurrences: 4,
    sessions: 3,
    directories: 2,
    firstSeen: "2026-10-01T09:00:00.000Z",
    lastSeen: "2026-10-20T09:00:00.000Z",
    perOccurrence: cost(),
    failureRate: 0.25,
    sessionRefs: [{ harness: "claude-code", sessionId: "s1" }],
    excerpts: [{
      source: "prompt",
      session: { harness: "claude-code", sessionId: "s1" },
      text: "ship the release notes for demo",
    }],
    ...extra,
  };
}

function candidateSet(
  candidates: unknown[] = [candidate()],
  extra: Record<string, unknown> = {},
) {
  return {
    schemaVersion: 1,
    generatedAt: "2026-10-30T10:00:00.000Z",
    importerVersion: "test",
    window: {
      since: "2026-10-01T00:00:00.000Z",
      until: "2026-10-30T00:00:00.000Z",
    },
    scope: {
      harnesses: ["claude-code", "codex"],
      all: true,
      include: [],
      exclude: ["~/src/client"],
    },
    candidates,
    ...extra,
  };
}

const tokens = { input: 10, output: 20, cacheRead: 30, cacheWrite: 40 };

function comparison(extra: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    generatedAt: "2026-10-30T10:00:00.000Z",
    importerVersion: "test",
    candidateId: ID_A,
    target: { kind: "workflow", name: "release-notes" },
    build: { tokens, activeMs: 60000 },
    history: {
      occurrences: 4,
      perOccurrence: { chore: cost(), wholeTurns: cost() },
    },
    swampRun: { wallMs: 1200, tokens, outcome: "succeeded" },
    forward: {
      since: "2026-10-30T10:00:00.000Z",
      raw: { occurrences: 0 },
      swamp: { occurrences: 1, perOccurrence: cost() },
    },
    breakEven: { low: 2, high: 5 },
    ...extra,
  };
}

function setNote(content: unknown): string {
  const reading = readSwampifyCandidateSet(content);
  assertEquals(reading.kind, "skipped");
  return reading.kind === "skipped" ? reading.note : "";
}

function setIsValid(content: unknown): boolean {
  return readSwampifyCandidateSet(content).kind === "record";
}

function comparisonIsValid(content: unknown): boolean {
  return readSwampifyComparison(content).kind === "record";
}

// The checked-in JSON Schemas are what core copies; a drift means the zod
// schemas changed without regenerating them.
for (const [file, generate] of SWAMPIFY_JSON_SCHEMA_FILES) {
  Deno.test(`swampify: ${file} matches the zod schema`, async () => {
    const checkedIn = JSON.parse(
      await Deno.readTextFile(new URL(`./${file}`, import.meta.url)),
    );
    assertEquals(
      checkedIn,
      generate(),
      `${file} is stale; run \`deno task swampify-schema\``,
    );
  });
}

Deno.test("swampify: reads a valid candidate set and comparison", () => {
  assertEquals(readSwampifyCandidateSet(candidateSet()).kind, "record");
  assertEquals(readSwampifyComparison(comparison()).kind, "record");
});

Deno.test("swampify reader: invalid without an integer schemaVersion of 1 or more", () => {
  for (
    const content of [
      null,
      "text",
      [candidateSet()],
      {},
      candidateSet([], { schemaVersion: "1" }),
      candidateSet([], { schemaVersion: 1.5 }),
      candidateSet([], { schemaVersion: 0 }),
    ]
  ) {
    for (const read of [readSwampifyCandidateSet, readSwampifyComparison]) {
      const reading = read(content);
      assertEquals(reading.kind, "skipped");
      if (reading.kind === "skipped") {
        assertEquals(reading.reason, "invalid");
        assertEquals(reading.schemaVersion, undefined);
      }
    }
  }
});

Deno.test("swampify reader: newer above the current version", () => {
  for (
    const reading of [
      readSwampifyCandidateSet(candidateSet([], { schemaVersion: 2 })),
      readSwampifyComparison(comparison({ schemaVersion: 2 })),
    ]
  ) {
    assertEquals(reading.kind, "skipped");
    if (reading.kind === "skipped") {
      assertEquals(reading.reason, "newer");
      assertEquals(reading.schemaVersion, 2);
      assertStringIncludes(reading.note, "Upgrade");
    }
  }
});

// v1 is the only version, so no stored item can be older yet; the shared
// gate both readers use is checked with a supported list that leaves the
// version out, as a v2 that drops v1 would.
Deno.test("swampify reader: older when the supported versions leave it out", () => {
  const gate = readVersionedGate(
    { schemaVersion: 1 },
    2,
    [2],
    "Run the assessment again.",
  );
  assertEquals(gate.kind, "skipped");
  if (gate.kind === "skipped") {
    assertEquals(gate.reason, "older");
    assertEquals(gate.schemaVersion, 1);
    assertStringIncludes(gate.note, "Run the assessment again.");
  }
  assertEquals(
    readVersionedGate({ schemaVersion: 2 }, 2, [2], "").kind,
    "version",
  );
});

Deno.test("swampify reader: invalid content names the path, never the value", () => {
  const secret = "hunter2-sk-very-secret";
  const note = setNote(
    candidateSet([candidate({ label: secret, extra: secret })]),
  );
  assertStringIncludes(note, "candidates.0");
  assertFalse(note.includes(secret));
  const reading = readSwampifyComparison(comparison({ prompt: secret }));
  assertEquals(reading.kind, "skipped");
  if (reading.kind === "skipped") {
    assertEquals(reading.reason, "invalid");
    assertFalse(reading.note.includes(secret));
  }
});

Deno.test("swampify reader: counts candidates before parsing", () => {
  const many = Array.from(
    { length: SWAMPIFY_LIMITS.candidates + 1 },
    () => "not a candidate",
  );
  assertEquals(
    setNote(candidateSet(many)),
    "does not match version 1: too_big at candidates",
  );
});

Deno.test("swampify reader: counts nested lists before parsing", () => {
  const refs = Array.from(
    { length: SWAMPIFY_LIMITS.sessionRefs + 1 },
    () => "not a ref",
  );
  assertEquals(
    setNote(candidateSet([candidate(), candidate({ sessionRefs: refs })])),
    "does not match version 1: too_big at candidates.1.sessionRefs",
  );
  const paths = Array.from(
    { length: SWAMPIFY_LIMITS.scopePaths + 1 },
    () => 0,
  );
  assertEquals(
    setNote(
      candidateSet([], {
        scope: { harnesses: ["codex"], all: true, include: [], exclude: paths },
      }),
    ),
    "does not match version 1: too_big at scope.exclude",
  );
});

Deno.test("swampify candidate: steps only and always on a call-sequence", () => {
  const steps = ["deno fmt", "deno check"];
  assert(
    setIsValid(candidateSet([candidate({ kind: "call-sequence", steps })])),
  );
  assertFalse(setIsValid(candidateSet([candidate({ kind: "call-sequence" })])));
  assertFalse(setIsValid(candidateSet([candidate({ steps })])));
  assertFalse(
    setIsValid(
      candidateSet([candidate({ kind: "call-sequence", steps: ["x"] })]),
    ),
  );
});

Deno.test("swampify candidate: program only and always on a covered-cli", () => {
  assert(
    setIsValid(
      candidateSet([candidate({ kind: "covered-cli", program: "git" })]),
    ),
  );
  assertFalse(setIsValid(candidateSet([candidate({ kind: "covered-cli" })])));
  assertFalse(setIsValid(candidateSet([candidate({ program: "git" })])));
});

Deno.test("swampify candidate: prompt-repeat is interactive and headless-job headless", () => {
  assertFalse(
    setIsValid(candidateSet([candidate({ invocation: "headless" })])),
  );
  assert(
    setIsValid(
      candidateSet([
        candidate({ kind: "headless-job", invocation: "headless" }),
      ]),
    ),
  );
  assertFalse(setIsValid(candidateSet([candidate({ kind: "headless-job" })])));
  for (const invocation of ["interactive", "headless"]) {
    assert(
      setIsValid(
        candidateSet([
          candidate({ kind: "covered-cli", program: "git", invocation }),
        ]),
      ),
    );
  }
});

Deno.test("swampify candidate: counts, dates and ranges are consistent", () => {
  assertFalse(setIsValid(candidateSet([candidate({ sessions: 5 })])));
  // One session can change directory, so directories can exceed sessions.
  assert(setIsValid(candidateSet([candidate({ directories: 4 })])));
  assertFalse(
    setIsValid(
      candidateSet([candidate({
        sessions: 1,
        sessionRefs: [
          { harness: "codex", sessionId: "a" },
          { harness: "codex", sessionId: "b" },
        ],
      })]),
    ),
  );
  assertFalse(
    setIsValid(
      candidateSet([candidate({ lastSeen: "2026-09-01T00:00:00.000Z" })]),
    ),
  );
  assertFalse(setIsValid(candidateSet([candidate({ failureRate: 1.5 })])));
  const bad = cost();
  bad.toolCalls = range(3, 2, 1);
  assertFalse(setIsValid(candidateSet([candidate({ perOccurrence: bad })])));
});

Deno.test("swampify candidate set: window, scope and unique ids", () => {
  assertFalse(
    setIsValid(
      candidateSet([], {
        window: {
          since: "2026-10-30T00:00:00.000Z",
          until: "2026-10-01T00:00:00.000Z",
        },
      }),
    ),
  );
  const scope = (extra: Record<string, unknown>) => ({
    harnesses: ["claude-code"],
    all: false,
    include: ["~/src/api"],
    exclude: [],
    ...extra,
  });
  assert(setIsValid(candidateSet([], { scope: scope({}) })));
  assertFalse(setIsValid(candidateSet([], { scope: scope({ all: true }) })));
  assertFalse(
    setIsValid(
      candidateSet([], { scope: scope({ harnesses: ["codex", "codex"] }) }),
    ),
  );
  assertFalse(setIsValid(candidateSet([candidate(), candidate()])));
  assert(setIsValid(candidateSet([candidate(), candidate({ id: ID_B })])));
});

Deno.test("swampify candidate set: refuses a field the schema does not name", () => {
  assertFalse(setIsValid(candidateSet([], { prompts: [] })));
  assertFalse(setIsValid(candidateSet([candidate({ prompt: "x" })])));
});

Deno.test("swampify comparison: a cost only with occurrences, and always with them", () => {
  assertFalse(
    comparisonIsValid(
      comparison({
        forward: {
          since: "2026-10-30T10:00:00.000Z",
          raw: { occurrences: 0, perOccurrence: cost() },
          swamp: { occurrences: 0 },
        },
      }),
    ),
  );
  assertFalse(comparisonIsValid(comparison({ history: { occurrences: 3 } })));
  assert(comparisonIsValid(comparison({ history: { occurrences: 0 } })));
});

Deno.test("swampify comparison: breakEven low <= high, high null when low is", () => {
  assert(comparisonIsValid(comparison({ breakEven: { low: 3, high: null } })));
  assert(
    comparisonIsValid(comparison({ breakEven: { low: null, high: null } })),
  );
  assertFalse(
    comparisonIsValid(comparison({ breakEven: { low: null, high: 3 } })),
  );
  assertFalse(
    comparisonIsValid(comparison({ breakEven: { low: 6, high: 5 } })),
  );
});

Deno.test("swampify comparison: estimatedUsd takes only its named, non-negative fields", () => {
  assert(
    comparisonIsValid(
      comparison({
        estimatedUsd: {
          build: 1.2,
          historyPerOccurrence: { chore: range(), wholeTurns: range() },
          swampRun: 0,
        },
      }),
    ),
  );
  assert(comparisonIsValid(comparison({ estimatedUsd: {} })));
  assertFalse(comparisonIsValid(comparison({ estimatedUsd: { build: -1 } })));
  assertFalse(comparisonIsValid(comparison({ estimatedUsd: { total: 1 } })));
  assertFalse(
    comparisonIsValid(
      comparison({
        history: { occurrences: 0 },
        estimatedUsd: {
          historyPerOccurrence: { chore: range(), wholeTurns: range() },
        },
      }),
    ),
  );
});

Deno.test("swampifyCandidateId: stable, and changes with kind, invocation or key", async () => {
  const id = await swampifyCandidateId(
    "prompt-repeat",
    "interactive",
    "ship it",
  );
  // Pinned so a change to how ids are built shows here: it would orphan
  // every stored comparison.
  assertEquals(
    id,
    await swampifyCandidateId("prompt-repeat", "interactive", "ship it"),
  );
  assertEquals(id, PINNED_ID);
  const others = await Promise.all([
    swampifyCandidateId("headless-job", "interactive", "ship it"),
    swampifyCandidateId("prompt-repeat", "headless", "ship it"),
    swampifyCandidateId("prompt-repeat", "interactive", "ship it!"),
  ]);
  assertEquals(new Set([id, ...others]).size, 4);
  assert(
    readSwampifyCandidateSet(candidateSet([candidate({ id })])).kind ===
      "record",
  );
});

const PINNED_ID = "d41cf8466e71165065e87f114efcc01b";

Deno.test("swampifyCandidateId: refuses an empty or oversized key and unknown enums", async () => {
  await assertRejects(() =>
    swampifyCandidateId("prompt-repeat", "interactive", "")
  );
  await assertRejects(() =>
    swampifyCandidateId(
      "prompt-repeat",
      "interactive",
      "x".repeat(SWAMPIFY_LIMITS.keyLength + 1),
    )
  );
  await assertRejects(() =>
    // @ts-expect-error: an unknown kind, as untyped callers could pass
    swampifyCandidateId("chore", "interactive", "x")
  );
  await assertRejects(() =>
    // @ts-expect-error: an unknown invocation
    swampifyCandidateId("prompt-repeat", "unknown", "x")
  );
});

Deno.test("swampify: comparison data name and predicate take only a candidate id", () => {
  assertEquals(swampifyComparisonDataName(ID_A), `swampify-comparison-${ID_A}`);
  assertEquals(
    swampifyComparisonPredicate(ID_A),
    `${SWAMPIFY_COMPARISON_QUERY_PREDICATE} && tags.candidateId == "${ID_A}"`,
  );
  for (const bad of ["", ID_A.toUpperCase(), `${ID_A}" || true`, "../x"]) {
    assertThrows(() => swampifyComparisonDataName(bad));
    assertThrows(() => swampifyComparisonPredicate(bad));
  }
});

Deno.test("swampify tags: carry generatedAt and a summary the reader accepts", () => {
  const set = readSwampifyCandidateSet(
    candidateSet([
      candidate(),
      candidate({
        id: ID_B,
        kind: "headless-job",
        invocation: "headless",
      }),
    ], { generatedAt: "2026-10-30T10:00:00Z" }),
  );
  assert(set.kind === "record");
  const tags = swampifyCandidateSetTags(set.record);
  assertEquals(tags.generatedAt, "2026-10-30T10:00:00.000Z");
  assertEquals(readSwampifyCandidateSetSummary(tags.summary), {
    since: "2026-10-01T00:00:00.000Z",
    until: "2026-10-30T00:00:00.000Z",
    harnesses: ["claude-code", "codex"],
    candidates: 2,
    interactive: 1,
    headless: 1,
    kinds: {
      "prompt-repeat": 1,
      "call-sequence": 0,
      "covered-cli": 0,
      "headless-job": 1,
    },
  });
  assertFalse(tags.summary.includes("Ship the release notes"));

  const read = readSwampifyComparison(comparison());
  assert(read.kind === "record");
  const ctags = swampifyComparisonTags(read.record);
  assertEquals(ctags.candidateId, ID_A);
  assertEquals(readSwampifyComparisonSummary(ctags.summary), {
    candidateId: ID_A,
    target: { kind: "workflow", name: "release-notes" },
    outcome: "succeeded",
    historyOccurrences: 4,
    forwardRaw: 0,
    forwardSwamp: 1,
    breakEven: { low: 2, high: 5 },
  });
});

Deno.test("swampify summary readers: refuse oversize, non-JSON and mismatched tags", () => {
  for (
    const read of [
      readSwampifyCandidateSetSummary,
      readSwampifyComparisonSummary,
    ]
  ) {
    assertEquals(read(undefined), undefined);
    assertEquals(read(42), undefined);
    assertEquals(read("{not json"), undefined);
    assertEquals(read(JSON.stringify({ extra: 1 })), undefined);

    assertEquals(
      read(" ".repeat(SWAMPIFY_LIMITS.summaryTagLength + 1)),
      undefined,
    );
  }
});

Deno.test("swampify summary reader: counts add up and harnesses match the scope's rules", () => {
  const summary = {
    since: "2026-10-01T00:00:00.000Z",
    until: "2026-10-30T00:00:00.000Z",
    harnesses: ["claude-code"],
    candidates: 2,
    interactive: 1,
    headless: 1,
    kinds: {
      "prompt-repeat": 1,
      "call-sequence": 0,
      "covered-cli": 0,
      "headless-job": 1,
    },
  };
  const read = (extra: Record<string, unknown>) =>
    readSwampifyCandidateSetSummary(JSON.stringify({ ...summary, ...extra }));
  assert(read({}) !== undefined);
  assertEquals(read({ headless: 2 }), undefined);
  assertEquals(
    read({ kinds: { ...summary.kinds, "covered-cli": 1 } }),
    undefined,
  );
  // Two prompt-repeats cannot both be interactive when only one is.
  assertEquals(
    read({
      kinds: { ...summary.kinds, "prompt-repeat": 2, "headless-job": 0 },
    }),
    undefined,
  );
  assertEquals(
    read({
      kinds: { ...summary.kinds, "prompt-repeat": 0, "headless-job": 2 },
    }),
    undefined,
  );
  assertEquals(read({ harnesses: [] }), undefined);
  assertEquals(read({ harnesses: ["codex", "codex"] }), undefined);
});

Deno.test("swampify comparison: the chore never costs more than its whole turns", () => {
  const over = cost();
  over.tokens.output = range(1, 2, 4);
  assertFalse(
    comparisonIsValid(
      comparison({
        history: {
          occurrences: 4,
          perOccurrence: { chore: over, wholeTurns: cost() },
        },
      }),
    ),
  );
  const cheaper = cost();
  cheaper.activeMs = range(10, 20, 30);
  assert(
    comparisonIsValid(
      comparison({
        history: {
          occurrences: 4,
          perOccurrence: { chore: cheaper, wholeTurns: cost() },
        },
      }),
    ),
  );
  assertFalse(
    comparisonIsValid(
      comparison({
        estimatedUsd: {
          historyPerOccurrence: { chore: range(2, 3, 4), wholeTurns: range() },
        },
      }),
    ),
  );
});

Deno.test("swampify comparison summary: breakEven follows the comparison's rule", () => {
  const summary = {
    candidateId: ID_A,
    target: { kind: "behavior", name: "notes" },
    outcome: "succeeded",
    historyOccurrences: 3,
    forwardRaw: 0,
    forwardSwamp: 0,
  };
  const read = (breakEven: unknown) =>
    readSwampifyComparisonSummary(JSON.stringify({ ...summary, breakEven }));
  assert(read({ low: 2, high: 5 }) !== undefined);
  assert(read({ low: 2, high: null }) !== undefined);
  assertEquals(read({ low: 6, high: 5 }), undefined);
  assertEquals(read({ low: null, high: 3 }), undefined);
});
