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

// ---------------------------------------------------------------------------
// The journal: an append-only record of everything that happened to a work
// item, each event with the actor behind it.
//
// An actor records a principal and where it came from. swamp puts the caller
// in tagOverrides.initiatedBy for CLI, serve and workflow runs; webhook runs,
// remote workers and nested runModel calls have none. A caller may also
// assert who it acts for; that is kept, but marked as unverified.
// ---------------------------------------------------------------------------

export const ActorSchema = z.strictObject({
  /** The platform's caller (e.g. user:alice, worker:w1), or null. */
  principal: z.string().min(1).nullable(),
  /** platform: from tagOverrides.initiatedBy; none: the platform gave none. */
  source: z.enum(["platform", "none"]),
  /** Who the caller says it acts for. Not verified. */
  asserted: z.string().min(1).optional(),
});

export type Actor = z.infer<typeof ActorSchema>;

/** Build an actor from a method context's tagOverrides. */
export function actorFrom(
  context: { tagOverrides?: Record<string, string> },
  asserted?: string,
): Actor {
  const principal = context.tagOverrides?.initiatedBy;
  const actor: Actor = principal !== undefined && principal !== ""
    ? { principal, source: "platform" }
    : { principal: null, source: "none" };
  if (asserted !== undefined && asserted !== "") actor.asserted = asserted;
  return actor;
}

export const ProductKindSchema = z.enum(["artifact", "evidence"]);
export type ProductKind = z.infer<typeof ProductKindSchema>;

/** An exit held only by a person: its approval gates are pending, or it is a
 * manual exit whose gates all pass. */
export const AwaitingExitSchema = z.strictObject({
  transition: z.string().min(1),
  to: z.string().min(1),
  manual: z.boolean(),
  /** Its human-approval gates that are pending. */
  gateIds: z.array(z.string().min(1)),
  /** When a cooldown gate lifts after the event was written, the time the
   * exit is actually held by a person from. */
  readyAt: z.string().min(1).optional(),
});

export type AwaitingExit = z.infer<typeof AwaitingExitSchema>;

/** The dispatch cap a parked stage entry hit, when the dispatch was refused:
 * dispatches in this stage and cycle, the definition's limit, and dispatch
 * overrides granted so far. */
export const DispatchOverrideHoldSchema = z.strictObject({
  count: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  granted: z.number().int().nonnegative(),
  /** Interrupted dispatches in this stage and cycle and their limit, when
   * the interruption cap is what refused. */
  interruptions: z.strictObject({
    count: z.number().int().nonnegative(),
    limit: z.number().int().positive(),
  }).optional(),
});

export type DispatchOverrideHold = z.infer<typeof DispatchOverrideHoldSchema>;

/** How a dispatch ended (run_record.ts keeps it on the dispatch). */
export const DISPATCH_OUTCOMES = [
  "succeeded",
  "failed",
  "interrupted",
] as const;
export type DispatchOutcomeValue = typeof DISPATCH_OUTCOMES[number];

const EVENT_BASE = {
  at: z.string().min(1),
  era: z.string().min(1),
  stage: z.string().min(1),
  cycle: z.number().int().positive(),
  actor: ActorSchema,
};

export const JournalEventSchema = z.discriminatedUnion("type", [
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("started"),
    factory: z.string(),
    definition: z.strictObject({
      digest: z.string(),
      version: z.number().int().positive().optional(),
    }),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("dispatched"),
    dispatchId: z.number().int().positive(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("usage"),
    dispatchId: z.number().int().positive(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("outcome"),
    dispatchId: z.number().int().positive(),
    outcome: z.enum(DISPATCH_OUTCOMES),
    /** Set when a later dispatch superseded this one. */
    supersededBy: z.number().int().positive().optional(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("checkpoint"),
    dispatchId: z.number().int().positive(),
    version: z.number().int().positive(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("recorded"),
    kind: ProductKindSchema,
    name: z.string().min(1),
    version: z.number().int().positive(),
    digest: z.string().min(1),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("rejected"),
    kind: ProductKindSchema,
    name: z.string().min(1),
    errors: z.array(z.string()).min(1),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("approval"),
    approvalId: z.number().int().positive(),
    gateId: z.string().min(1),
    decision: z.enum(["approve", "decline"]),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("advanced"),
    transition: z.string().min(1),
    to: z.string().min(1),
    toCycle: z.number().int().positive(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("override"),
    overrideId: z.number().int().positive(),
    kind: z.enum(["cycle", "dispatch"]),
    for: z.string().min(1),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("awaiting"),
    /** Every exit of the stage entry that only a person can open now. Written
     * when the set changes, including to empty; derived from the gates, so
     * its actor is the write that caused the change. */
    exits: z.array(AwaitingExitSchema),
    /** Set while the stage entry is parked at its dispatch cap: a dispatch
     * was refused, and only a person granting a dispatch override lets the
     * next one through. Carried by every awaiting event of the entry until
     * then. */
    dispatchOverride: DispatchOverrideHoldSchema.optional(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("reset"),
    previousEra: z.string().min(1),
    /** Set when the reset adopted a newly pinned factory definition. */
    repinned: z.strictObject({
      digest: z.string().min(1),
      version: z.number().int().positive().optional(),
    }).optional(),
  }),
  z.strictObject({
    ...EVENT_BASE,
    type: z.literal("retargeted"),
    /** The externalRefs before and after: retarget replaces the whole map. */
    from: z.record(z.string(), z.string()),
    to: z.record(z.string(), z.string()),
    reason: z.string().min(1),
  }),
]);

export type JournalEvent = z.infer<typeof JournalEventSchema>;
