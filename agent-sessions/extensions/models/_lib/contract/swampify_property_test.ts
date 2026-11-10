import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import fc from "npm:fast-check@3.23.2";
import {
  readSwampifyCandidateSet,
  readSwampifyCandidateSetSummary,
  readSwampifyComparison,
  readSwampifyComparisonSummary,
  SWAMPIFY_LIMITS,
  swampifyCandidateSetTags,
  swampifyComparisonTags,
} from "./swampify.ts";

const L = SWAMPIFY_LIMITS;

const arbCount = fc.integer({ min: 0, max: 1_000_000 });
const arbAmount = fc.double({ min: 0, max: 1e9, noNaN: true });
const arbHex32 = fc.stringMatching(/^[0-9a-f]{32}$/);
const arbSlug = fc.stringMatching(/^[a-z0-9][a-z0-9-]{0,20}$/);
const arbSessionId = fc.stringMatching(/^[a-z0-9][a-z0-9_-]{0,30}$/);
const arbText = (max: number) => fc.string({ minLength: 1, maxLength: max });

// Two datetimes in order, as toISOString writes them.
const arbOrderedDates = fc.tuple(
  fc.integer({ min: 0, max: 2_000_000_000_000 }),
  fc.integer({ min: 0, max: 100_000_000_000 }),
).map(([start, span]) =>
  [
    new Date(start).toISOString(),
    new Date(start + span).toISOString(),
  ] as const
);

const arbRange = fc.array(arbAmount, { minLength: 3, maxLength: 3 }).map((
  values,
) => {
  const [min, median, max] = [...values].sort((a, b) => a - b);
  return { min, median, max };
});

const arbCost = fc.record({
  tokens: fc.record({
    input: arbRange,
    output: arbRange,
    cacheRead: arbRange,
    cacheWrite: arbRange,
  }),
  toolCalls: arbRange,
  activeMs: arbRange,
});

// A chore's cost and the whole turns around it: the chore is the whole
// turns' cost scaled down, so each of its statistics is at most theirs.
const scale = (r: { min: number; median: number; max: number }, f: number) => ({
  min: r.min * f,
  median: r.median * f,
  max: r.max * f,
});
const arbFraction = fc.double({ min: 0, max: 1, noNaN: true });
const arbHistoryCost = fc.tuple(arbCost, arbFraction).map(([whole, f]) => ({
  chore: {
    tokens: {
      input: scale(whole.tokens.input, f),
      output: scale(whole.tokens.output, f),
      cacheRead: scale(whole.tokens.cacheRead, f),
      cacheWrite: scale(whole.tokens.cacheWrite, f),
    },
    toolCalls: scale(whole.toolCalls, f),
    activeMs: scale(whole.activeMs, f),
  },
  wholeTurns: whole,
}));
const arbUsdRanges = fc.tuple(arbRange, arbFraction).map(([whole, f]) => ({
  chore: scale(whole, f),
  wholeTurns: whole,
}));

const arbRef = fc.record({ harness: arbSlug, sessionId: arbSessionId });

const arbKindFields = fc.oneof(
  fc.constant({ kind: "prompt-repeat", invocation: "interactive" }),
  fc.constant({ kind: "headless-job", invocation: "headless" }),
  fc.record({
    kind: fc.constant("call-sequence"),
    invocation: fc.constantFrom("interactive", "headless"),
    steps: fc.array(arbText(40), { minLength: L.minSteps, maxLength: L.steps }),
  }),
  fc.record({
    kind: fc.constant("covered-cli"),
    invocation: fc.constantFrom("interactive", "headless"),
    program: arbText(20),
  }),
);

const arbCandidate = fc.record({
  kindFields: arbKindFields,
  label: arbText(60),
  counts: fc.array(fc.integer({ min: 1, max: 1_000_000 }), {
    minLength: 3,
    maxLength: 3,
  }),
  seen: arbOrderedDates,
  perOccurrence: arbCost,
  failureRate: fc.double({ min: 0, max: 1, noNaN: true }),
  refs: fc.array(arbRef, { maxLength: 6 }),
  excerpts: fc.array(
    fc.record({
      source: fc.constantFrom("prompt", "call"),
      session: arbRef,
      text: arbText(80),
      truncated: fc.option(fc.constant(true as const), { nil: undefined }),
    }, { requiredKeys: ["source", "session", "text"] }),
    { maxLength: L.excerpts },
  ),
}).map((c) => {
  // occurrences >= sessions >= session refs; directories may be any count.
  const [directories, sessions, occurrences] = [...c.counts].sort((a, b) =>
    a - b
  );
  return {
    id: "",
    ...c.kindFields,
    label: c.label,
    occurrences,
    sessions: Math.max(sessions, c.refs.length),
    directories,
    firstSeen: c.seen[0],
    lastSeen: c.seen[1],
    perOccurrence: c.perOccurrence,
    failureRate: c.failureRate,
    sessionRefs: c.refs,
    excerpts: c.excerpts,
  };
}).filter((c) => c.occurrences >= c.sessions);

const arbCandidateSet = fc.record({
  generatedAt: fc.date({
    min: new Date(0),
    max: new Date(4_000_000_000_000),
  }).map((d) => d.toISOString()),
  importerVersion: arbText(30),
  window: arbOrderedDates,
  harnesses: fc.uniqueArray(arbSlug, { minLength: 1, maxLength: L.harnesses }),
  all: fc.boolean(),
  include: fc.array(arbText(60), { maxLength: 4 }),
  exclude: fc.array(arbText(60), { maxLength: 4 }),
  candidates: fc.array(arbCandidate, { maxLength: 6 }),
  ids: fc.uniqueArray(arbHex32, { minLength: 6, maxLength: 6 }),
}).map((s) => ({
  schemaVersion: 1,
  generatedAt: s.generatedAt,
  importerVersion: s.importerVersion,
  window: { since: s.window[0], until: s.window[1] },
  scope: {
    harnesses: s.harnesses,
    all: s.all,
    include: s.all ? [] : s.include,
    exclude: s.exclude,
  },
  candidates: s.candidates.map((c, i) => ({ ...c, id: s.ids[i] })),
}));

const arbTokens = fc.record({
  input: arbCount,
  output: arbCount,
  cacheRead: arbCount,
  cacheWrite: arbCount,
});

const arbSide = arbCount.chain((occurrences) =>
  occurrences > 0
    ? fc.record({
      occurrences: fc.constant(occurrences),
      perOccurrence: arbCost,
    })
    : fc.constant({ occurrences })
);

const arbBreakEven = fc.option(
  fc.tuple(arbCount, fc.option(arbCount, { nil: null })),
  { nil: null },
).map((pair) => {
  if (pair === null) return { low: null, high: null };
  const [low, extra] = pair;
  return { low, high: extra === null ? null : low + extra };
});

const arbComparison = fc.record({
  generatedAt: fc.date({ min: new Date(0), max: new Date(4e12) }).map((d) =>
    d.toISOString()
  ),
  importerVersion: arbText(30),
  candidateId: arbHex32,
  target: fc.record({
    kind: fc.constantFrom("behavior", "workflow"),
    name: arbText(60),
  }),
  build: fc.record({ tokens: arbTokens, activeMs: arbAmount }),
  history: arbCount.chain((occurrences) =>
    occurrences > 0
      ? fc.record({
        occurrences: fc.constant(occurrences),
        perOccurrence: arbHistoryCost,
      })
      : fc.constant({ occurrences })
  ),
  swampRun: fc.record({
    wallMs: arbAmount,
    tokens: arbTokens,
    outcome: fc.constantFrom("succeeded", "failed"),
  }),
  forward: fc.record({
    since: fc.date({ min: new Date(0), max: new Date(4e12) }).map((d) =>
      d.toISOString()
    ),
    raw: arbSide,
    swamp: arbSide,
  }),
  breakEven: arbBreakEven,
  usd: fc.option(
    fc.record({
      build: arbAmount,
      historyPerOccurrence: arbUsdRanges,
      swampRun: arbAmount,
    }, { requiredKeys: [] }),
    { nil: undefined },
  ),
}).map(({ usd, ...c }) => {
  // An estimate per occurrence needs history occurrences to estimate.
  const estimate = usd !== undefined && c.history.occurrences === 0
    ? (({ historyPerOccurrence: _, ...rest }) => rest)(usd)
    : usd;
  return {
    schemaVersion: 1,
    ...c,
    ...(estimate === undefined ? {} : { estimatedUsd: estimate }),
  };
});

Deno.test("swampify property: a valid candidate set round-trips through JSON and the reader", () => {
  fc.assert(
    fc.property(arbCandidateSet, (set) => {
      const reading = readSwampifyCandidateSet(JSON.parse(JSON.stringify(set)));
      assertEquals(reading.kind, "record", JSON.stringify(reading));
      if (reading.kind === "record") {
        assertEquals<unknown>(reading.record, JSON.parse(JSON.stringify(set)));
      }
    }),
  );
});

Deno.test("swampify property: a valid comparison round-trips through JSON and the reader", () => {
  fc.assert(
    fc.property(arbComparison, (comparison) => {
      const reading = readSwampifyComparison(
        JSON.parse(JSON.stringify(comparison)),
      );
      assertEquals(reading.kind, "record", JSON.stringify(reading));
      if (reading.kind === "record") {
        assertEquals<unknown>(
          reading.record,
          JSON.parse(JSON.stringify(comparison)),
        );
      }
    }),
  );
});

type Json = Record<string, unknown>;

// Each bound, as a way to push one field one past it on a valid candidate set.
const OVER_BOUNDS: ReadonlyArray<readonly [string, (set: Json) => void]> = [
  ["candidates", (s) => {
    const list = s.candidates as Json[];
    s.candidates = Array.from({ length: L.candidates + 1 }, (_, i) => ({
      ...list[0],
      id: i.toString(16).padStart(32, "0"),
    }));
  }],
  ["sessionRefs", (s) => {
    const c = (s.candidates as Json[])[0];
    c.sessions = c.occurrences = L.sessionRefs + 1;
    c.sessionRefs = Array.from(
      { length: L.sessionRefs + 1 },
      (_, i) => ({ harness: "codex", sessionId: `s${i}` }),
    );
  }],
  ["excerpts", (s) => {
    const c = (s.candidates as Json[])[0];
    c.excerpts = Array.from({ length: L.excerpts + 1 }, () => ({
      source: "prompt",
      session: { harness: "codex", sessionId: "s" },
      text: "x",
    }));
  }],
  ["excerpt text", (s) => {
    const c = (s.candidates as Json[])[0];
    c.excerpts = [{
      source: "prompt",
      session: { harness: "codex", sessionId: "s" },
      text: "x".repeat(L.excerptLength + 1),
    }];
  }],
  ["steps", (s) => {
    const c = (s.candidates as Json[])[0];
    c.kind = "call-sequence";
    delete c.program;
    c.steps = Array.from({ length: L.steps + 1 }, () => "x");
  }],
  ["step text", (s) => {
    const c = (s.candidates as Json[])[0];
    c.kind = "call-sequence";
    delete c.program;
    c.steps = ["x", "x".repeat(L.stepLength + 1)];
  }],
  ["label", (s) => {
    (s.candidates as Json[])[0].label = "x".repeat(L.labelLength + 1);
  }],
  ["program", (s) => {
    const c = (s.candidates as Json[])[0];
    c.kind = "covered-cli";
    delete c.steps;
    c.program = "x".repeat(L.programLength + 1);
  }],
  ["harnesses", (s) => {
    (s.scope as Json).harnesses = Array.from(
      { length: L.harnesses + 1 },
      (_, i) => `h${i}`,
    );
  }],
  ["scope paths", (s) => {
    (s.scope as Json).exclude = Array.from(
      { length: L.scopePaths + 1 },
      () => "~/x",
    );
  }],
  ["path length", (s) => {
    (s.scope as Json).exclude = ["x".repeat(L.pathLength + 1)];
  }],
  ["importerVersion", (s) => {
    s.importerVersion = "x".repeat(L.nameLength + 1);
  }],
];

Deno.test("swampify property: one past any bound is refused as invalid", () => {
  for (const [name, push] of OVER_BOUNDS) {
    fc.assert(
      fc.property(
        arbCandidateSet.filter((s) => s.candidates.length > 0),
        (set) => {
          const copy = JSON.parse(JSON.stringify(set)) as Json;
          push(copy);
          const reading = readSwampifyCandidateSet(copy);
          assert(
            reading.kind === "skipped" && reading.reason === "invalid",
            `${name}: ${JSON.stringify(reading).slice(0, 200)}`,
          );
        },
      ),
      { numRuns: 20 },
    );
  }
});

Deno.test("swampify property: summary tags fit the tag cap and read back", () => {
  fc.assert(
    fc.property(arbCandidateSet, (set) => {
      const read = readSwampifyCandidateSet(set);
      assert(read.kind === "record");
      const tag = swampifyCandidateSetTags(read.record).summary;
      assert(tag.length <= L.summaryTagLength);
      assert(readSwampifyCandidateSetSummary(tag) !== undefined);
    }),
  );
  fc.assert(
    fc.property(arbComparison, (comparison) => {
      const read = readSwampifyComparison(comparison);
      assert(read.kind === "record");
      const tag = swampifyComparisonTags(read.record).summary;
      assert(tag.length <= L.summaryTagLength);
      assert(readSwampifyComparisonSummary(tag) !== undefined);
    }),
  );
});

// The longest a summary can be: every harness and name at its cap, the name
// written with a character JSON escapes to six, and the largest counts.
Deno.test("swampify property: a summary at every cap still fits the tag", () => {
  const max = Number.MAX_SAFE_INTEGER;
  const zero = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
  const comparison = readSwampifyComparison({
    schemaVersion: 1,
    generatedAt: "2026-10-30T10:00:00.000Z",
    importerVersion: "test",
    candidateId: "0".repeat(32),
    target: { kind: "workflow", name: "\u0001".repeat(L.nameLength) },
    build: { tokens: zero, activeMs: 0 },
    history: { occurrences: 0 },
    swampRun: { wallMs: 0, tokens: zero, outcome: "succeeded" },
    forward: {
      since: "2026-10-30T10:00:00.000Z",
      raw: { occurrences: 0 },
      swamp: { occurrences: 0 },
    },
    breakEven: { low: max, high: max },
  });
  assert(comparison.kind === "record", JSON.stringify(comparison));
  const ctag = swampifyComparisonTags(comparison.record).summary;
  assert(ctag.length <= L.summaryTagLength);
  assert(readSwampifyComparisonSummary(ctag) !== undefined);

  const set = readSwampifyCandidateSet({
    schemaVersion: 1,
    generatedAt: "2026-10-30T10:00:00.000Z",
    importerVersion: "test",
    window: {
      since: "2026-10-01T00:00:00.000Z",
      until: "2026-10-30T00:00:00.000Z",
    },
    scope: {
      harnesses: Array.from(
        { length: L.harnesses },
        (_, i) => `${i}`.padEnd(L.harnessLength, "a"),
      ),
      all: true,
      include: [],
      exclude: [],
    },
    candidates: [],
  });
  assert(set.kind === "record", JSON.stringify(set));
  const tag = swampifyCandidateSetTags(set.record).summary;
  assert(tag.length <= L.summaryTagLength);
  assert(readSwampifyCandidateSetSummary(tag) !== undefined);
});
