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
    lifecycle: z.strictObject({ name: z.string(), digest: z.string() }),
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
    type: z.literal("reset"),
    previousEra: z.string().min(1),
  }),
]);

export type JournalEvent = z.infer<typeof JournalEventSchema>;
