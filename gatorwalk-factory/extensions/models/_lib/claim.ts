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

// ---------------------------------------------------------------------------
// Start from a ticket (DESIGN.md, "Start from a ticket"). A tracker adapter
// keeps an index from each ticket's stable id to the key of its work item,
// one record per ticket. claim reads it and either reports the ticket's work
// item or reserves a fresh key, writing the index record before the work
// item exists. The driver then runs the start command claim prints. A crash
// in between leaves a reservation with no run, and claiming again hands back
// the same key and command. A work item that has finished lets its ticket
// claim a new one. claim never writes to the tracker.
// ---------------------------------------------------------------------------

import { z } from "npm:zod@4.3.6";
import type { TrackerIssue } from "./tracker.ts";
import { type RunRecord, RunRecordSchema } from "./run_record.ts";
import { RUN_SPEC } from "./run_store.ts";
import {
  freshKey,
  loadHolderLifecycle,
  type MethodContextLike,
  WORK_ITEM_TYPE,
} from "./work_item_ops.ts";

export const TICKET_SPEC = "ticket";

export const TicketClaimSchema = z.object({
  tracker: z.string(),
  /** The ticket's stable id. */
  issue: z.string(),
  /** Its display identifier when the key was reserved; it may change since. */
  display: z.string(),
  /** The ticket's current work item, reserved or started. */
  key: z.string(),
  /** The lifecycle holder the key is started under. */
  holder: z.string(),
  claimedAt: z.string(),
  /** Keys of the ticket's earlier, finished work items, newest first. */
  previous: z.array(z.string()),
});
export type TicketClaim = z.infer<typeof TicketClaimSchema>;

/** A data record as swamp's readModelData returns it: the part claim reads. */
export interface ModelDataRecord {
  version: number;
  attributes: Record<string, unknown>;
}

/** What claim needs from swamp's method context. */
export interface ClaimContext extends MethodContextLike {
  readModelData?(
    modelName: string,
    specName?: string,
  ): Promise<ModelDataRecord[]>;
}

/** The ids a work item started from this ticket records. */
export function externalRefsOf(
  tracker: string,
  issue: TrackerIssue,
): Record<string, string> {
  return { [tracker]: issue.id, [`${tracker}.display`]: issue.display };
}

// Single-quoted for a POSIX shell, so no holder name or display identifier
// can break the printed command.
function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\\''`)}'`;
}

/** The command that starts a claimed key, as claim prints it. */
export function startCommand(
  key: string,
  holder: string,
  externalRefs: Record<string, string>,
): string {
  return `swamp model ${WORK_ITEM_TYPE} method run start ${key} ` +
    `--input ${shellQuote(`lifecycle=${holder}`)} ` +
    `--input ${shellQuote(`externalRefs=${JSON.stringify(externalRefs)}`)} ` +
    "--log";
}

/**
 * The work item's run record, or null when it has not started. Only a record
 * whose own key is this key counts: swamp's readModelData labels every record
 * it returns with the name asked for, including data it attributes to that
 * name from an earlier definition.
 */
export async function readClaimedRun(
  ctx: ClaimContext,
  key: string,
): Promise<RunRecord | null> {
  if (ctx.readModelData === undefined) {
    throw new Error("this method context cannot read another model's data");
  }
  const records = (await ctx.readModelData(key, RUN_SPEC))
    .filter((r) => r.attributes?.key === key)
    .sort((a, b) => b.version - a.version);
  if (records.length === 0) return null;
  const parsed = RunRecordSchema.safeParse(records[0].attributes);
  if (!parsed.success) {
    throw new Error(
      `work item '${key}' has a run record claim cannot read: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

export interface ClaimRequest {
  tracker: string;
  issue: TrackerIssue;
  /** The index record's name for this ticket. */
  recordName: string;
  /** The lifecycle holder, needed only when a new key is reserved. */
  lifecycle?: string;
  now: Date;
}

/**
 * Report the ticket's work item, or reserve a key for a new one. Returns the
 * data handles written: the index record, when it was written.
 */
export async function claimTicket(
  ctx: ClaimContext,
  req: ClaimRequest,
): Promise<unknown[]> {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  const { tracker, issue } = req;
  const refs = externalRefsOf(tracker, issue);
  const label = `${issue.display} (${issue.id})`;
  const raw = await ctx.readResource(req.recordName);
  const prior = raw === null ? null : TicketClaimSchema.parse(raw);
  let previous: string[] = [];

  if (prior !== null) {
    const run = await readClaimedRun(ctx, prior.key);
    if (run === null) {
      // Reserved, never started: the same key and command again.
      if (req.lifecycle !== undefined && req.lifecycle !== prior.holder) {
        throw new Error(
          `${label} is claimed as '${prior.key}' under lifecycle holder ` +
            `'${prior.holder}', not '${req.lifecycle}'; start it with ` +
            `'${prior.holder}'`,
        );
      }
      ctx.logger.info("{summary}", {
        summary: `${label} is claimed as '${prior.key}', not started yet. ` +
          `Start it: ${startCommand(prior.key, prior.holder, refs)}`,
        key: prior.key,
      });
      return [];
    }
    if (run.externalRefs[tracker] !== issue.id) {
      throw new Error(
        `the index names '${prior.key}' for ${label}, but that work item ` +
          `records ${tracker} '${
            run.externalRefs[tracker] ?? "(none)"
          }'; the two disagree, so nothing was claimed`,
      );
    }
    if (run.status === "active") {
      ctx.logger.info("{summary}", {
        summary: `${label} is already started: '${prior.key}' at stage ` +
          `'${run.stage}'`,
        key: prior.key,
      });
      return [];
    }
    previous = [prior.key, ...prior.previous];
  }

  if (req.lifecycle === undefined) {
    throw new Error(
      `${label} needs a new work item; pass --input lifecycle=<holder>` +
        (prior === null ? "" : ` (its last one used '${prior.holder}')`),
    );
  }
  const lifecycle = await loadHolderLifecycle(ctx, req.lifecycle);
  const key = await freshKey(ctx, lifecycle.name);
  // The index first: a crash before the work item starts leaves a
  // reservation that the next claim hands back.
  const handle = await ctx.writeResource(
    TICKET_SPEC,
    req.recordName,
    {
      tracker,
      issue: issue.id,
      display: issue.display,
      key,
      holder: req.lifecycle,
      claimedAt: req.now.toISOString(),
      previous,
    } satisfies TicketClaim,
  );
  ctx.logger.info("{summary}", {
    summary: `${label} is claimed as '${key}'` +
      (previous.length === 0
        ? ""
        : ` (its last work item, '${previous[0]}', has finished)`) +
      `. Start it: ${startCommand(key, req.lifecycle, refs)}`,
    key,
  });
  return [handle];
}
