// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * The Swampify contracts (swamp-club#4606): a candidate set, the chores an
 * assessment of past coding-agent sessions found worth automating, and a
 * comparison, what one chore cost raw against what it costs with swamp.
 * `assess` writes candidate sets, `compare` writes comparisons, and the
 * dashboard's Swampify panel reads both.
 *
 * The extension owns these contracts, the reverse of the session record:
 * core keeps a copy of this module and its JSON Schemas, unchanged except
 * the zod import specifier, with a test that fails when they drift. So the
 * module imports nothing but zod and uses no Deno or Node APIs.
 *
 * Every object is strict and every string and list is bounded. A new field,
 * even an optional one, is a new version. See swampify.md.
 */

import { z } from "npm:zod@4.6.7";

/** The candidate set version this module writes and reads. */
export const SWAMPIFY_CANDIDATE_SET_SCHEMA_VERSION = 1;

/** Every candidate set version this module reads. */
export const SUPPORTED_SWAMPIFY_CANDIDATE_SET_SCHEMA_VERSIONS:
  readonly number[] = [1];

/** The comparison version this module writes and reads. */
export const SWAMPIFY_COMPARISON_SCHEMA_VERSION = 1;

/** Every comparison version this module reads. */
export const SUPPORTED_SWAMPIFY_COMPARISON_SCHEMA_VERSIONS: readonly number[] =
  [1];

/** Value of the `type` tag that marks a data item as a candidate set. */
export const SWAMPIFY_CANDIDATES_TYPE_TAG = "swampify-candidates";

/** Value of the `type` tag that marks a data item as a comparison. */
export const SWAMPIFY_COMPARISON_TYPE_TAG = "swampify-comparison";

/** The data name of the candidate set; a re-run writes a new version of it. */
export const SWAMPIFY_CANDIDATES_DATA_NAME = "swampify-candidates";

/** Tag key that carries when the item was written, as `toISOString()` writes it. */
export const SWAMPIFY_GENERATED_AT_TAG = "generatedAt";

/** Tag key that carries the item's list summary as compact JSON. */
export const SWAMPIFY_SUMMARY_TAG = "summary";

/** Tag key that carries a comparison's candidate id. */
export const SWAMPIFY_CANDIDATE_ID_TAG = "candidateId";

/** The predicate that lists candidate sets through `data.query`. */
export const SWAMPIFY_CANDIDATES_QUERY_PREDICATE =
  `tags.type == "${SWAMPIFY_CANDIDATES_TYPE_TAG}"`;

/** The predicate that lists comparisons through `data.query`. */
export const SWAMPIFY_COMPARISON_QUERY_PREDICATE =
  `tags.type == "${SWAMPIFY_COMPARISON_TYPE_TAG}"`;

/**
 * The `data.query` select for a list. It reads only the data name and tags,
 * so with a predicate over tags the query never loads a body.
 */
export const SWAMPIFY_LIST_SELECT = `{"name": name, "tags": tags}`;

/**
 * Size bounds, sized on a heavy machine: 368 interactive and 20,759 headless
 * Claude Code sessions in 30 days, whose largest repeat spanned 585 sessions
 * and 182 directories. Counts always carry the true totals; only lists are
 * capped.
 */
export const SWAMPIFY_LIMITS = {
  harnessLength: 32,
  sessionIdLength: 128,
  nameLength: 200,
  pathLength: 1000,
  harnesses: 8,
  scopePaths: 1000,
  candidates: 100,
  sessionRefs: 50,
  excerpts: 5,
  // Interactive prompts' first lines: median 40 characters, p99 465.
  excerptLength: 300,
  minSteps: 2,
  steps: 8,
  stepLength: 200,
  labelLength: 200,
  programLength: 200,
  // The normalised key a candidate id hashes; only the hash is stored.
  keyLength: 4000,
  summaryTagLength: 4096,
} as const;

const L = SWAMPIFY_LIMITS;

// The session record's harness and session id shapes, so a reference names a
// record the way the importer stores it.
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const SESSION_ID = /^[a-z0-9][a-z0-9_-]*$/;
const CANDIDATE_ID = /^[0-9a-f]{32}$/;

const HarnessSchema = z.string().max(L.harnessLength).regex(SLUG);
const SessionIdSchema = z.string().max(L.sessionIdLength).regex(SESSION_ID);
const NameSchema = z.string().min(1).max(L.nameLength);
const CountSchema = z.number().int().nonnegative();
const AmountSchema = z.number().nonnegative();

/** A candidate's id: 32 hex digits from `swampifyCandidateId`. */
export const SwampifyCandidateIdSchema = z.string().regex(CANDIDATE_ID);

/** What kind of repetition a candidate is. */
export const SwampifyCandidateKindSchema = z.enum([
  "prompt-repeat",
  "call-sequence",
  "covered-cli",
  "headless-job",
]);

/** Whether a person steered the sessions a candidate was seen in. */
export const SwampifyInvocationSchema = z.enum(["interactive", "headless"]);

/** A spread of per-occurrence values; `min <= median <= max`. */
export const SwampifyRangeSchema = z.strictObject({
  min: AmountSchema,
  median: AmountSchema,
  max: AmountSchema,
}).superRefine((range, ctx) => {
  if (range.min > range.median || range.median > range.max) {
    ctx.addIssue({
      code: "custom",
      message: "a range needs min <= median <= max",
      path: ["median"],
    });
  }
});

/** What one occurrence cost, as ranges over the occurrences. */
export const SwampifyCostRangeSchema = z.strictObject({
  tokens: z.strictObject({
    input: SwampifyRangeSchema,
    output: SwampifyRangeSchema,
    cacheRead: SwampifyRangeSchema,
    cacheWrite: SwampifyRangeSchema,
  }),
  toolCalls: SwampifyRangeSchema,
  activeMs: SwampifyRangeSchema,
});

// swamp-quality-ignore credentials-sensitive-field
const TokenTotalsSchema = z.strictObject({
  input: CountSchema,
  output: CountSchema,
  cacheRead: CountSchema,
  cacheWrite: CountSchema,
});

/** A session, named as its agent session record is (harness and id). */
export const SwampifySessionRefSchema = z.strictObject({
  harness: HarnessSchema,
  sessionId: SessionIdSchema,
});

/**
 * A short piece of evidence: a prompt that repeats, or a call's text from the
 * session record. The writer redacts it; `truncated` marks one cut to fit.
 */
export const SwampifyExcerptSchema = z.strictObject({
  source: z.enum(["prompt", "call"]),
  session: SwampifySessionRefSchema,
  text: z.string().min(1).max(L.excerptLength),
  truncated: z.literal(true).optional(),
});

// A repeated headless prompt is a headless-job, so a prompt-repeat is always
// interactive; call sequences and covered CLIs can be either.
const KIND_INVOCATION: Readonly<
  Record<SwampifyCandidateKind, SwampifyInvocation | undefined>
> = {
  "prompt-repeat": "interactive",
  "headless-job": "headless",
  "call-sequence": undefined,
  "covered-cli": undefined,
};

/**
 * One chore worth automating. Counts are totals; `directories` counts the
 * distinct working directories its occurrences ran in, which can exceed
 * `sessions`, since a session can change directory. `sessionRefs` and
 * `excerpts` are a bounded sample. `steps` belong to a `call-sequence` and
 * `program` to a `covered-cli`, and to nothing else.
 */
export const SwampifyCandidateSchema = z.strictObject({
  id: SwampifyCandidateIdSchema,
  kind: SwampifyCandidateKindSchema,
  invocation: SwampifyInvocationSchema,
  label: z.string().min(1).max(L.labelLength),
  occurrences: CountSchema.min(1),
  sessions: CountSchema.min(1),
  directories: CountSchema,
  firstSeen: z.iso.datetime(),
  lastSeen: z.iso.datetime(),
  perOccurrence: SwampifyCostRangeSchema,
  failureRate: z.number().min(0).max(1),
  sessionRefs: z.array(SwampifySessionRefSchema).max(L.sessionRefs),
  steps: z.array(z.string().min(1).max(L.stepLength)).min(L.minSteps).max(
    L.steps,
  ).optional(),
  program: z.string().min(1).max(L.programLength).optional(),
  excerpts: z.array(SwampifyExcerptSchema).max(L.excerpts),
}).superRefine((candidate, ctx) => {
  const sequence = candidate.kind === "call-sequence";
  if ((candidate.steps !== undefined) !== sequence) {
    ctx.addIssue({
      code: "custom",
      message: sequence
        ? "a call-sequence needs steps"
        : "only a call-sequence has steps",
      path: ["steps"],
    });
  }
  const cli = candidate.kind === "covered-cli";
  if ((candidate.program !== undefined) !== cli) {
    ctx.addIssue({
      code: "custom",
      message: cli
        ? "a covered-cli needs a program"
        : "only a covered-cli has a program",
      path: ["program"],
    });
  }
  const fixed = KIND_INVOCATION[candidate.kind];
  if (fixed !== undefined && candidate.invocation !== fixed) {
    ctx.addIssue({
      code: "custom",
      message: `a ${candidate.kind} is ${fixed}`,
      path: ["invocation"],
    });
  }
  if (candidate.sessions > candidate.occurrences) {
    ctx.addIssue({
      code: "custom",
      message: "more sessions than occurrences",
      path: ["sessions"],
    });
  }
  if (candidate.sessionRefs.length > candidate.sessions) {
    ctx.addIssue({
      code: "custom",
      message: "more session refs than sessions",
      path: ["sessionRefs"],
    });
  }
  if (Date.parse(candidate.firstSeen) > Date.parse(candidate.lastSeen)) {
    ctx.addIssue({
      code: "custom",
      message: "firstSeen is after lastSeen",
      path: ["lastSeen"],
    });
  }
});

/**
 * What an assessment read: which harnesses, and every repo (`all`) or only
 * the `include` list, less `exclude`. Paths show the home directory as `~`.
 */
export const SwampifyScopeSchema = z.strictObject({
  harnesses: z.array(HarnessSchema).min(1).max(L.harnesses),
  all: z.boolean(),
  include: z.array(z.string().min(1).max(L.pathLength)).max(L.scopePaths),
  exclude: z.array(z.string().min(1).max(L.pathLength)).max(L.scopePaths),
}).superRefine((scope, ctx) => {
  if (scope.all && scope.include.length > 0) {
    ctx.addIssue({
      code: "custom",
      message: "include is empty when all is set",
      path: ["include"],
    });
  }
  if (new Set(scope.harnesses).size !== scope.harnesses.length) {
    ctx.addIssue({
      code: "custom",
      message: "duplicate harness",
      path: ["harnesses"],
    });
  }
});

/** Version 1 of the candidate set: one assessment run. */
export const SwampifyCandidateSetV1Schema = z.strictObject({
  schemaVersion: z.literal(1),
  generatedAt: z.iso.datetime(),
  importerVersion: NameSchema,
  window: z.strictObject({
    since: z.iso.datetime(),
    until: z.iso.datetime(),
  }),
  scope: SwampifyScopeSchema,
  candidates: z.array(SwampifyCandidateSchema).max(L.candidates),
}).superRefine((set, ctx) => {
  if (Date.parse(set.window.since) > Date.parse(set.window.until)) {
    ctx.addIssue({
      code: "custom",
      message: "since is after until",
      path: ["window", "until"],
    });
  }
  const ids = new Set<string>();
  set.candidates.forEach((candidate, i) => {
    if (ids.has(candidate.id)) {
      ctx.addIssue({
        code: "custom",
        message: "duplicate candidate id",
        path: ["candidates", i, "id"],
      });
    }
    ids.add(candidate.id);
  });
});

/** Raw occurrences before and after onboarding; `perOccurrence` only with some. */
const SwampifyOccurrencesSchema = z.strictObject({
  occurrences: CountSchema,
  perOccurrence: SwampifyCostRangeSchema.optional(),
});

/** History's cost per occurrence: the chore's own calls, up to its whole turns. */
const SwampifyHistoryCostSchema = z.strictObject({
  chore: SwampifyCostRangeSchema,
  wholeTurns: SwampifyCostRangeSchema,
});

/**
 * Occurrences that recover the build cost: `low` against whole turns, `high`
 * against the chore's own calls, so `low <= high`; `null` when the swamp side
 * never recovers it, and `high` is `null` whenever `low` is.
 */
export const SwampifyBreakEvenSchema = z.strictObject({
  low: CountSchema.nullable(),
  high: CountSchema.nullable(),
}).superRefine(({ low, high }, ctx) => {
  if (low === null ? high !== null : high !== null && low > high) {
    ctx.addIssue({
      code: "custom",
      message: "breakEven needs low <= high, and high null when low is",
      path: ["high"],
    });
  }
});

// Whether every statistic of `inner` is at most the same one of `outer`. A
// chore's calls are part of their turns, so per occurrence the chore never
// costs more than its whole turns, and neither do its min, median or max.
function rangeWithin(inner: SwampifyRange, outer: SwampifyRange): boolean {
  return inner.min <= outer.min && inner.median <= outer.median &&
    inner.max <= outer.max;
}

function costMetrics(
  cost: SwampifyCostRange,
): ReadonlyArray<readonly [readonly string[], SwampifyRange]> {
  return [
    [["tokens", "input"], cost.tokens.input],
    [["tokens", "output"], cost.tokens.output],
    [["tokens", "cacheRead"], cost.tokens.cacheRead],
    [["tokens", "cacheWrite"], cost.tokens.cacheWrite],
    [["toolCalls"], cost.toolCalls],
    [["activeMs"], cost.activeMs],
  ];
}

/**
 * Version 1 of the comparison: one candidate that was swamped. Tokens are
 * the unit; `estimatedUsd` is an estimate from a price table the writer
 * supplies. `breakEven` is the occurrences that recover the build cost,
 * `low` against whole turns and `high` against the chore's own calls; `null`
 * when the swamp side never recovers it.
 */
export const SwampifyComparisonV1Schema = z.strictObject({
  schemaVersion: z.literal(1),
  generatedAt: z.iso.datetime(),
  importerVersion: NameSchema,
  candidateId: SwampifyCandidateIdSchema,
  target: z.strictObject({
    kind: z.enum(["behavior", "workflow"]),
    name: NameSchema,
  }),
  build: z.strictObject({
    tokens: TokenTotalsSchema,
    activeMs: AmountSchema,
  }),
  history: z.strictObject({
    occurrences: CountSchema,
    perOccurrence: SwampifyHistoryCostSchema.optional(),
  }),
  swampRun: z.strictObject({
    wallMs: AmountSchema,
    tokens: TokenTotalsSchema,
    outcome: z.enum(["succeeded", "failed"]),
  }),
  forward: z.strictObject({
    since: z.iso.datetime(),
    raw: SwampifyOccurrencesSchema,
    swamp: SwampifyOccurrencesSchema,
  }),
  breakEven: SwampifyBreakEvenSchema,
  estimatedUsd: z.strictObject({
    build: AmountSchema.optional(),
    historyPerOccurrence: z.strictObject({
      chore: SwampifyRangeSchema,
      wholeTurns: SwampifyRangeSchema,
    }).optional(),
    swampRun: AmountSchema.optional(),
  }).optional(),
}).superRefine((comparison, ctx) => {
  const sides = [
    ["history", comparison.history],
    ["forward.raw", comparison.forward.raw],
    ["forward.swamp", comparison.forward.swamp],
  ] as const;
  for (const [where, side] of sides) {
    if ((side.perOccurrence !== undefined) !== (side.occurrences > 0)) {
      ctx.addIssue({
        code: "custom",
        message: side.occurrences > 0
          ? "occurrences need a perOccurrence cost"
          : "a perOccurrence cost needs occurrences",
        path: [...where.split("."), "perOccurrence"],
      });
    }
  }
  const history = comparison.history.perOccurrence;
  if (history !== undefined) {
    const whole = costMetrics(history.wholeTurns);
    costMetrics(history.chore).forEach(([metric, chore], i) => {
      if (!rangeWithin(chore, whole[i][1])) {
        ctx.addIssue({
          code: "custom",
          message: "the chore costs more than its whole turns",
          path: ["history", "perOccurrence", "chore", ...metric],
        });
      }
    });
  }
  const usd = comparison.estimatedUsd?.historyPerOccurrence;
  if (usd !== undefined && !rangeWithin(usd.chore, usd.wholeTurns)) {
    ctx.addIssue({
      code: "custom",
      message: "the chore costs more than its whole turns",
      path: ["estimatedUsd", "historyPerOccurrence", "chore"],
    });
  }
  if (
    comparison.estimatedUsd?.historyPerOccurrence !== undefined &&
    comparison.history.perOccurrence === undefined
  ) {
    ctx.addIssue({
      code: "custom",
      message: "an estimate per occurrence needs history occurrences",
      path: ["estimatedUsd", "historyPerOccurrence"],
    });
  }
});

export type SwampifyCandidateKind = z.infer<typeof SwampifyCandidateKindSchema>;
export type SwampifyInvocation = z.infer<typeof SwampifyInvocationSchema>;
export type SwampifyRange = z.infer<typeof SwampifyRangeSchema>;
export type SwampifyCostRange = z.infer<typeof SwampifyCostRangeSchema>;
export type SwampifyCandidate = z.infer<typeof SwampifyCandidateSchema>;
export type SwampifyCandidateSet = z.infer<typeof SwampifyCandidateSetV1Schema>;
export type SwampifyComparison = z.infer<typeof SwampifyComparisonV1Schema>;

/** Why a stored item was not read. */
export type SwampifySkipReason = "newer" | "older" | "invalid";

/** A stored item that was not read, with a note for the viewer. */
export interface SwampifySkipped {
  readonly kind: "skipped";
  readonly reason: SwampifySkipReason;
  readonly schemaVersion?: number;
  readonly note: string;
}

/** The outcome of reading one stored candidate set. */
export type SwampifyCandidateSetReading =
  | { readonly kind: "record"; readonly record: SwampifyCandidateSet }
  | SwampifySkipped;

/** The outcome of reading one stored comparison. */
export type SwampifyComparisonReading =
  | { readonly kind: "record"; readonly record: SwampifyComparison }
  | SwampifySkipped;

/** The version gate's outcome: a version this reader parses, or a skip. */
export type SwampifyVersionGate =
  | { readonly kind: "version"; readonly version: number }
  | SwampifySkipped;

/**
 * Reads `schemaVersion` off raw content and decides whether a reader parses
 * it: `invalid` with no integer version of 1 or more, `newer` above
 * `newest`, `older` when `supported` leaves it out. Never throws. `rerun`
 * says how to rewrite an older item.
 */
export function readVersionedGate(
  content: unknown,
  newest: number,
  supported: readonly number[],
  rerun: string,
): SwampifyVersionGate {
  const version = isObject(content) ? content.schemaVersion : undefined;
  if (
    typeof version !== "number" || !Number.isInteger(version) || version < 1
  ) {
    return skipped(
      "invalid",
      undefined,
      "no integer schemaVersion of 1 or more",
    );
  }
  if (version > newest) {
    return skipped(
      "newer",
      version,
      `written as version ${version}; this reader reads up to version ${newest}. Upgrade swamp and @swamp/agent-sessions to read it.`,
    );
  }
  if (!supported.includes(version)) {
    return skipped(
      "older",
      version,
      `written as version ${version}, which this reader no longer reads. ${rerun}`,
    );
  }
  return { kind: "version", version };
}

/**
 * Reads one stored candidate set. Never throws: one this module cannot read
 * comes back `skipped` with a note naming field paths, never values, except
 * the integer `schemaVersion`. Every list is counted before parsing, so an
 * oversized set costs only those counts.
 */
export function readSwampifyCandidateSet(
  content: unknown,
): SwampifyCandidateSetReading {
  const gate = readVersionedGate(
    content,
    SWAMPIFY_CANDIDATE_SET_SCHEMA_VERSION,
    SUPPORTED_SWAMPIFY_CANDIDATE_SET_SCHEMA_VERSIONS,
    "Run the assessment again.",
  );
  if (gate.kind === "skipped") return gate;
  const oversized = oversizedList(content as Record<string, unknown>);
  if (oversized !== undefined) {
    return skipped(
      "invalid",
      gate.version,
      `does not match version ${gate.version}: too_big at ${oversized}`,
    );
  }
  const parsed = SwampifyCandidateSetV1Schema.safeParse(content);
  return parsed.success
    ? { kind: "record", record: parsed.data }
    : invalid(gate.version, parsed.error);
}

/**
 * The path of the first list on raw candidate-set content that is over its
 * cap, read from array lengths alone, so an oversized list is refused before
 * the parser walks its elements. `undefined` when every list fits.
 */
function oversizedList(content: Record<string, unknown>): string | undefined {
  const over = (value: unknown, max: number) =>
    Array.isArray(value) && value.length > max;
  const scope = isObject(content.scope) ? content.scope : {};
  const scopeLists = [
    ["harnesses", L.harnesses],
    ["include", L.scopePaths],
    ["exclude", L.scopePaths],
  ] as const;
  for (const [key, max] of scopeLists) {
    if (over(scope[key], max)) return `scope.${key}`;
  }
  const candidates = content.candidates;
  if (!Array.isArray(candidates)) return undefined;
  if (candidates.length > L.candidates) return "candidates";
  const candidateLists = [
    ["sessionRefs", L.sessionRefs],
    ["excerpts", L.excerpts],
    ["steps", L.steps],
  ] as const;
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (!isObject(candidate)) continue;
    for (const [key, max] of candidateLists) {
      if (over(candidate[key], max)) return `candidates.${i}.${key}`;
    }
  }
  return undefined;
}

/**
 * Reads one stored comparison. Never throws, and notes name field paths,
 * never values, as `readSwampifyCandidateSet` does.
 */
export function readSwampifyComparison(
  content: unknown,
): SwampifyComparisonReading {
  const gate = readVersionedGate(
    content,
    SWAMPIFY_COMPARISON_SCHEMA_VERSION,
    SUPPORTED_SWAMPIFY_COMPARISON_SCHEMA_VERSIONS,
    "Run the comparison again.",
  );
  if (gate.kind === "skipped") return gate;
  const parsed = SwampifyComparisonV1Schema.safeParse(content);
  return parsed.success
    ? { kind: "record", record: parsed.data }
    : invalid(gate.version, parsed.error);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invalid(version: number, error: z.ZodError): SwampifySkipped {
  const first = error.issues[0];
  const where = first && first.path.length > 0
    ? first.path.map(String).join(".")
    : "the record";
  return skipped(
    "invalid",
    version,
    `does not match version ${version}: ${
      first?.code ?? "invalid"
    } at ${where}`,
  );
}

function skipped(
  reason: SwampifySkipReason,
  schemaVersion: number | undefined,
  note: string,
): SwampifySkipped {
  return schemaVersion === undefined
    ? { kind: "skipped", reason, note }
    : { kind: "skipped", reason, schemaVersion, note };
}

/**
 * A candidate's id: the first 32 hex digits of SHA-256 over
 * `[kind, invocation, key]` as JSON. `key` is the candidate's normalised key
 * before redaction, so a change to the redaction rules never changes an id;
 * only the hash is stored. A re-run with the same key keeps the id. Throws
 * when `kind` or `invocation` is not one the schema accepts, or `key` is
 * empty or longer than `SWAMPIFY_LIMITS.keyLength`.
 */
export async function swampifyCandidateId(
  kind: SwampifyCandidateKind,
  invocation: SwampifyInvocation,
  key: string,
): Promise<string> {
  if (!SwampifyCandidateKindSchema.safeParse(kind).success) {
    throw new Error("unknown candidate kind");
  }
  if (!SwampifyInvocationSchema.safeParse(invocation).success) {
    throw new Error("candidate invocation must be interactive or headless");
  }
  if (key.length === 0 || key.length > L.keyLength) {
    throw new Error(`candidate key must be 1 to ${L.keyLength} characters`);
  }
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(JSON.stringify([kind, invocation, key])),
  );
  return Array.from(
    new Uint8Array(digest),
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("").slice(0, 32);
}

/**
 * The data name of a candidate's comparison. Throws on anything but a
 * candidate id, so nothing else reaches a name.
 */
export function swampifyComparisonDataName(candidateId: string): string {
  if (!SwampifyCandidateIdSchema.safeParse(candidateId).success) {
    throw new Error("candidate id must be 32 lowercase hex digits");
  }
  return `swampify-comparison-${candidateId}`;
}

/**
 * The predicate that lists one candidate's comparison. Throws on anything
 * but a candidate id, so nothing else reaches the predicate.
 */
export function swampifyComparisonPredicate(candidateId: string): string {
  if (!SwampifyCandidateIdSchema.safeParse(candidateId).success) {
    throw new Error("candidate id must be 32 lowercase hex digits");
  }
  return `${SWAMPIFY_COMPARISON_QUERY_PREDICATE} && tags.${SWAMPIFY_CANDIDATE_ID_TAG} == "${candidateId}"`;
}

/**
 * Version 1 of a candidate set's list summary, stored as compact JSON in its
 * `summary` tag. It holds counts only: no labels or excerpts.
 */
export const SwampifyCandidateSetSummaryV1Schema = z.strictObject({
  since: z.iso.datetime(),
  until: z.iso.datetime(),
  harnesses: z.array(HarnessSchema).min(1).max(L.harnesses),
  candidates: CountSchema.max(L.candidates),
  interactive: CountSchema,
  headless: CountSchema,
  kinds: z.strictObject({
    "prompt-repeat": CountSchema,
    "call-sequence": CountSchema,
    "covered-cli": CountSchema,
    "headless-job": CountSchema,
  }),
}).superRefine((summary, ctx) => {
  if (summary.interactive + summary.headless !== summary.candidates) {
    ctx.addIssue({
      code: "custom",
      message: "interactive and headless do not add up to candidates",
      path: ["headless"],
    });
  }
  // A prompt-repeat is interactive and a headless-job headless.
  if (summary.kinds["prompt-repeat"] > summary.interactive) {
    ctx.addIssue({
      code: "custom",
      message: "more prompt-repeat candidates than interactive ones",
      path: ["kinds", "prompt-repeat"],
    });
  }
  if (summary.kinds["headless-job"] > summary.headless) {
    ctx.addIssue({
      code: "custom",
      message: "more headless-job candidates than headless ones",
      path: ["kinds", "headless-job"],
    });
  }
  const kinds = Object.values(summary.kinds).reduce((a, b) => a + b, 0);
  if (kinds !== summary.candidates) {
    ctx.addIssue({
      code: "custom",
      message: "kinds do not add up to candidates",
      path: ["kinds"],
    });
  }
  if (new Set(summary.harnesses).size !== summary.harnesses.length) {
    ctx.addIssue({
      code: "custom",
      message: "duplicate harness",
      path: ["harnesses"],
    });
  }
});

/** Version 1 of a comparison's list summary. */
export const SwampifyComparisonSummaryV1Schema = z.strictObject({
  candidateId: SwampifyCandidateIdSchema,
  target: z.strictObject({
    kind: z.enum(["behavior", "workflow"]),
    name: NameSchema,
  }),
  outcome: z.enum(["succeeded", "failed"]),
  historyOccurrences: CountSchema,
  forwardRaw: CountSchema,
  forwardSwamp: CountSchema,
  breakEven: SwampifyBreakEvenSchema,
});

export type SwampifyCandidateSetSummary = z.infer<
  typeof SwampifyCandidateSetSummaryV1Schema
>;
export type SwampifyComparisonSummary = z.infer<
  typeof SwampifyComparisonSummaryV1Schema
>;

/** Derives a candidate set's list summary from the set. */
export function swampifyCandidateSetSummary(
  set: SwampifyCandidateSet,
): SwampifyCandidateSetSummary {
  const kinds = {
    "prompt-repeat": 0,
    "call-sequence": 0,
    "covered-cli": 0,
    "headless-job": 0,
  };
  let interactive = 0;
  for (const candidate of set.candidates) {
    kinds[candidate.kind]++;
    if (candidate.invocation === "interactive") interactive++;
  }
  return {
    since: set.window.since,
    until: set.window.until,
    harnesses: [...set.scope.harnesses],
    candidates: set.candidates.length,
    interactive,
    headless: set.candidates.length - interactive,
    kinds,
  };
}

/** Derives a comparison's list summary from the comparison. */
export function swampifyComparisonSummary(
  comparison: SwampifyComparison,
): SwampifyComparisonSummary {
  return {
    candidateId: comparison.candidateId,
    target: { ...comparison.target },
    outcome: comparison.swampRun.outcome,
    historyOccurrences: comparison.history.occurrences,
    forwardRaw: comparison.forward.raw.occurrences,
    forwardSwamp: comparison.forward.swamp.occurrences,
    breakEven: { ...comparison.breakEven },
  };
}

/**
 * The list tags a candidate set is written with, next to the output spec's
 * `type` tag. Derived from the set so they cannot drift from it.
 */
export function swampifyCandidateSetTags(
  set: SwampifyCandidateSet,
): Record<string, string> {
  return {
    [SWAMPIFY_GENERATED_AT_TAG]: new Date(set.generatedAt).toISOString(),
    [SWAMPIFY_SUMMARY_TAG]: JSON.stringify(swampifyCandidateSetSummary(set)),
  };
}

/**
 * The list tags a comparison is written with, next to the output spec's
 * `type` tag. Derived from the comparison so they cannot drift from it.
 */
export function swampifyComparisonTags(
  comparison: SwampifyComparison,
): Record<string, string> {
  return {
    [SWAMPIFY_GENERATED_AT_TAG]: new Date(comparison.generatedAt)
      .toISOString(),
    [SWAMPIFY_CANDIDATE_ID_TAG]: comparison.candidateId,
    [SWAMPIFY_SUMMARY_TAG]: JSON.stringify(
      swampifyComparisonSummary(comparison),
    ),
  };
}

function readSummaryTag<T>(
  value: unknown,
  schema: z.ZodType<T>,
): T | undefined {
  if (typeof value !== "string" || value.length > L.summaryTagLength) {
    return undefined;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return undefined;
  }
  const summary = schema.safeParse(parsed);
  return summary.success ? summary.data : undefined;
}

/**
 * Reads a candidate set's `summary` tag. Never throws: a value that is too
 * long, is not JSON, or does not match comes back `undefined`, and the
 * reader opens the set instead. Tags are self-reported, so a reader always
 * validates the body with `readSwampifyCandidateSet` when it opens it.
 */
export function readSwampifyCandidateSetSummary(
  value: unknown,
): SwampifyCandidateSetSummary | undefined {
  return readSummaryTag(value, SwampifyCandidateSetSummaryV1Schema);
}

/** Reads a comparison's `summary` tag, as `readSwampifyCandidateSetSummary` does. */
export function readSwampifyComparisonSummary(
  value: unknown,
): SwampifyComparisonSummary | undefined {
  return readSummaryTag(value, SwampifyComparisonSummaryV1Schema);
}

function jsonSchema(schema: z.ZodType): Record<string, unknown> {
  return z.toJSONSchema(schema, { unrepresentable: "any" }) as Record<
    string,
    unknown
  >;
}

/** The JSON Schema of the current candidate set version. */
export function swampifyCandidateSetJsonSchema(): Record<string, unknown> {
  return jsonSchema(SwampifyCandidateSetV1Schema);
}

/** The JSON Schema of the candidate set's list summary. */
export function swampifyCandidateSetSummaryJsonSchema(): Record<
  string,
  unknown
> {
  return jsonSchema(SwampifyCandidateSetSummaryV1Schema);
}

/** The JSON Schema of the current comparison version. */
export function swampifyComparisonJsonSchema(): Record<string, unknown> {
  return jsonSchema(SwampifyComparisonV1Schema);
}

/** The JSON Schema of the comparison's list summary. */
export function swampifyComparisonSummaryJsonSchema(): Record<
  string,
  unknown
> {
  return jsonSchema(SwampifyComparisonSummaryV1Schema);
}

/**
 * Every checked-in JSON Schema file beside this module and the function
 * that generates it; the generator writes them and a test checks them.
 */
export const SWAMPIFY_JSON_SCHEMA_FILES: ReadonlyArray<
  readonly [string, () => Record<string, unknown>]
> = [
  ["swampify-candidate-set.schema.json", swampifyCandidateSetJsonSchema],
  [
    "swampify-candidate-set-summary.schema.json",
    swampifyCandidateSetSummaryJsonSchema,
  ],
  ["swampify-comparison.schema.json", swampifyComparisonJsonSchema],
  [
    "swampify-comparison-summary.schema.json",
    swampifyComparisonSummaryJsonSchema,
  ],
];
