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

import { z } from "npm:zod@4.3.6";
import { ActorSchema, JournalEventSchema } from "./journal.ts";
import {
  formatIssues,
  type ParseResult,
  WORK_MODES,
} from "./definition_schema.ts";

// ---------------------------------------------------------------------------
// The run record: everything about one work item, in one record under a
// fixed name. Product payloads live in their own records; the run record
// indexes the version and digest of each. Writing the run record is how every
// operation commits, so it is the only source of truth: a payload version it
// does not reference is ignored.
//
// swamp never upgrades stored data (only globalArguments), so the record
// carries its own schemaVersion and parseRun reads every version it knows.
// ---------------------------------------------------------------------------

export const RUN_SCHEMA_VERSION = 1;

/** A recorded product, as the run record indexes it. */
export const ProductRefSchema = z.strictObject({
  version: z.number().int().positive(),
  digest: z.string().min(1),
  stage: z.string().min(1),
  cycle: z.number().int().positive(),
  at: z.string().min(1),
  /** For an artifact that reviews another: the version of the subject it
   * reviewed, which artifact-fresh compares with the subject's current one. */
  subject: z.strictObject({
    name: z.string().min(1),
    version: z.number().int().positive(),
    digest: z.string().min(1),
  }).optional(),
});

export type ProductRef = z.infer<typeof ProductRefSchema>;

/** The latest rejected payload for a product, kept as retry feedback. */
export const ValidationSchema = z.strictObject({
  errors: z.array(z.string()).min(1),
  rejected: z.unknown(),
  stage: z.string().min(1),
  cycle: z.number().int().positive(),
  at: z.string().min(1),
});

export type Validation = z.infer<typeof ValidationSchema>;

/**
 * Token usage for one dispatch, as reported by whoever did the work. A
 * harness often reports one total (Claude Code's subagent_tokens), so the
 * input/output split is optional: a usage has a total, the split, or both.
 * The total is not checked against the split, since a harness total can count
 * tokens (cache reads) the split does not.
 */
export const UsageSchema = z.strictObject({
  totalTokens: z.number().int().nonnegative().optional(),
  inputTokens: z.number().int().nonnegative().optional(),
  outputTokens: z.number().int().nonnegative().optional(),
  toolUses: z.number().int().nonnegative().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  model: z.string().min(1).optional(),
  /** Always true until a driver measures usage itself. */
  attested: z.literal(true),
}).refine(
  (u) =>
    (u.inputTokens === undefined) === (u.outputTokens === undefined) &&
    (u.totalTokens !== undefined || u.inputTokens !== undefined),
  {
    message: "usage needs totalTokens, or inputTokens and outputTokens " +
      "together (or all three)",
  },
);

export type Usage = z.infer<typeof UsageSchema>;

export const DispatchSchema = z.strictObject({
  id: z.number().int().positive(),
  era: z.string().min(1),
  stage: z.string().min(1),
  cycle: z.number().int().positive(),
  at: z.string().min(1),
  actor: ActorSchema,
  /** The stage's work mode when dispatched. Absent on dispatches recorded
   * before it was kept. */
  mode: z.enum(WORK_MODES).optional(),
  /** The stage's resolved inputs and binding values, for replay. */
  inputs: z.record(z.string(), z.unknown()),
  prompt: z.string().optional(),
  command: z.string().optional(),
  /** For a dispatch stage: exactly what each subagent was sent, and where
   * it was told to write each product. */
  subagentPrompts: z.array(z.strictObject({
    skill: z.string().min(1).optional(),
    resultPaths: z.record(z.string(), z.string()),
    prompt: z.string(),
  })).optional(),
  usage: UsageSchema.optional(),
});

export type Dispatch = z.infer<typeof DispatchSchema>;

const VersionedSchema = z.strictObject({
  version: z.number().int().positive(),
  digest: z.string().min(1),
});

export const ApprovalSchema = z.strictObject({
  id: z.number().int().positive(),
  gateId: z.string().min(1),
  decision: z.enum(["approve", "decline"]),
  note: z.string().optional(),
  era: z.string().min(1),
  stage: z.string().min(1),
  cycle: z.number().int().positive(),
  at: z.string().min(1),
  actor: ActorSchema,
  /** Every product in the era when the decision was made. */
  products: z.strictObject({
    artifacts: z.record(z.string(), VersionedSchema),
    evidence: z.record(z.string(), VersionedSchema),
  }),
});

export type Approval = z.infer<typeof ApprovalSchema>;

/**
 * A person's grant past a circuit breaker. A cycle override lets a stage be
 * entered once more than its maxCycles; a dispatch override lets the current
 * stage and cycle take one more dispatch than its maxDispatchesPerCycle.
 * Grants accumulate: each one adds one, and none resets a count.
 */
export const OverrideSchema = z.strictObject({
  id: z.number().int().positive(),
  kind: z.enum(["cycle", "dispatch"]),
  /** The stage the grant is for: the stage to enter, or the one dispatching. */
  stage: z.string().min(1),
  /** For a dispatch override, the cycle it applies to. */
  cycle: z.number().int().positive().optional(),
  note: z.string().optional(),
  era: z.string().min(1),
  at: z.string().min(1),
  actor: ActorSchema,
});

export type Override = z.infer<typeof OverrideSchema>;

export const RunRecordSchema = z.strictObject({
  schemaVersion: z.literal(RUN_SCHEMA_VERSION),
  /** The work item's key: swamp-generated, stable, not a ticket number. */
  key: z.string().min(1),
  /** Tracker ids (a Linear UUID, a display identifier), kept as data. */
  externalRefs: z.record(z.string(), z.string()),
  /** The factory definition pinned at start: its name, content digest, and the
   * version of the pinned copy the run uses. */
  definition: z.strictObject({
    name: z.string().min(1),
    digest: z.string().min(1),
    version: z.number().int().positive().optional(),
  }),
  /** Changes on reset; every record carries the era it belongs to. */
  era: z.string().min(1),
  status: z.enum(["active", "terminal"]),
  stage: z.string().min(1),
  /** Entries into each stage in this era; the current cycle is entries[stage]. */
  entries: z.record(z.string(), z.number().int().positive()),
  /** The latest product of each name in this era. */
  products: z.strictObject({
    artifacts: z.record(z.string(), ProductRefSchema),
    evidence: z.record(z.string(), ProductRefSchema),
  }),
  /** The latest rejection of each product in this era, until it is recorded. */
  validations: z.strictObject({
    artifacts: z.record(z.string(), ValidationSchema),
    evidence: z.record(z.string(), ValidationSchema),
  }),
  /** Every dispatch, across eras; ids never repeat. */
  dispatches: z.array(DispatchSchema),
  /** Every approval decision, across eras; ids never repeat. */
  approvals: z.array(ApprovalSchema),
  /** Every override grant, across eras; ids never repeat. Defaults to none,
   * so a record written before overrides existed still reads. */
  overrides: z.array(OverrideSchema).default([]),
  journal: z.array(JournalEventSchema),
});

export type RunRecord = z.infer<typeof RunRecordSchema>;

/** Read a stored run record, refusing a schema version this code does not
 * know rather than guessing. */
export function parseRun(raw: unknown): ParseResult<RunRecord> {
  const version = raw !== null && typeof raw === "object"
    ? (raw as Record<string, unknown>).schemaVersion
    : undefined;
  if (version !== RUN_SCHEMA_VERSION) {
    return {
      ok: false,
      errors: [
        `run record schemaVersion ${
          JSON.stringify(version)
        } is not one this runtime reads (${RUN_SCHEMA_VERSION})`,
      ],
    };
  }
  const result = RunRecordSchema.safeParse(raw);
  return result.success
    ? { ok: true, value: result.data }
    : { ok: false, errors: formatIssues(result.error) };
}

/** The current cycle: how many times the current stage has been entered. */
export function currentCycle(run: RunRecord): number {
  return run.entries[run.stage] ?? 1;
}
