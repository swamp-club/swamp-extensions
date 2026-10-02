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
import type { TrackerIssue } from "./adapter.ts";
import { duplicateRefusal, primaryOf } from "./duplicates.ts";
import {
  type DataReadingContext,
  keyIsFree,
  loadFactoryDefinition,
  nthKey,
  RUN_SPEC,
  type RunRecord,
  RunRecordSchema,
  shellQuote,
  WORK_ITEM_TYPE,
} from "../../engine/tracker.ts";

export const TICKET_SPEC = "ticket";

export const TicketClaimSchema = z.object({
  tracker: z.string(),
  /** The ticket's stable id. */
  issue: z.string(),
  /** Its display identifier when the key was reserved; it may change since. */
  display: z.string(),
  /** The ticket's current work item, reserved or started. */
  key: z.string(),
  /** The factory the key is started under. */
  factory: z.string(),
  claimedAt: z.string(),
  /** Keys of the ticket's earlier, finished work items, newest first. */
  previous: z.array(z.string()),
});
export type TicketClaim = z.infer<typeof TicketClaimSchema>;

/** What claim needs from swamp's method context. */
export type ClaimContext = DataReadingContext;

/** The ids a work item started from this ticket records. */
export function externalRefsOf(
  tracker: string,
  issue: TrackerIssue,
): Record<string, string> {
  return { [tracker]: issue.id, [`${tracker}.display`]: issue.display };
}

/**
 * The command that starts a claimed key, as claim prints it. It carries the
 * ticket's title, so the run records it; a blank title is left out.
 */
export function startCommand(
  key: string,
  factory: string,
  externalRefs: Record<string, string>,
  title: string,
): string {
  const named = title.trim();
  return `swamp model ${WORK_ITEM_TYPE} method run start ${shellQuote(key)} ` +
    `--input ${shellQuote(`factory=${factory}`)} ` +
    (named === "" ? "" : `--input ${shellQuote(`title=${named}`)} `) +
    `--input ${shellQuote(`externalRefs=${JSON.stringify(externalRefs)}`)}`;
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
  /** The factory, needed only when a new key is reserved. */
  factory?: string;
  /** The ticket's keys are this base: the ticket's id as a key. */
  base: string;
  /** What qualifies the base when another work item has it: the tracker
   * instance's name. */
  qualifier: string;
  /** Report the ticket's work item, or that it has none, and write nothing. */
  dryRun?: boolean;
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
  // A duplicate takes no work: its primary does (DESIGN.md, "Duplicates").
  const primary = primaryOf(issue);
  if (primary !== undefined) throw new Error(duplicateRefusal(issue, primary));
  const raw = await ctx.readResource(req.recordName);
  const prior = raw === null ? null : TicketClaimSchema.parse(raw);
  let previous: string[] = [];

  if (prior !== null) {
    const run = await readClaimedRun(ctx, prior.key);
    if (run === null) {
      // Reserved, never started: the same key and command again, unless the
      // reservation moves to another factory because its own no longer loads.
      if (req.factory !== undefined && req.factory !== prior.factory) {
        const unusable = await loadError(ctx, prior.factory);
        if (unusable === null) {
          throw new Error(
            `${label} is claimed as '${prior.key}' under factory ` +
              `'${prior.factory}', not '${req.factory}'; start it with ` +
              `'${prior.factory}'`,
          );
        }
        const handle = await reassignReservation(
          ctx,
          req,
          req.factory,
          prior,
          unusable,
          label,
        );
        return handle === null ? [] : [handle];
      }
      ctx.logger.info("{summary}", {
        summary: `${label} is claimed as '${prior.key}', not started yet. ` +
          `Start it: ${
            startCommand(prior.key, prior.factory, refs, issue.title)
          }`,
        key: prior.key,
      });
      return [];
    }
    // A retarget moved the work item to another ticket (publish moves the
    // index there): this ticket's work item is gone, as if it had finished.
    // Any other disagreement is refused.
    if (run.externalRefs[tracker] !== issue.id) {
      const retargeted = run.journal.some((e) =>
        e.type === "retargeted" && e.from[tracker] === issue.id
      );
      if (!retargeted) {
        throw new Error(
          `the index names '${prior.key}' for ${label}, but that work item ` +
            `records ${tracker} '${
              run.externalRefs[tracker] ?? "(none)"
            }'; the two disagree, so nothing was claimed`,
        );
      }
    } else if (run.status === "active") {
      ctx.logger.info("{summary}", {
        summary: `${label} is already started: '${prior.key}' at stage ` +
          `'${run.stage}', under factory '${run.factory}'` +
          (req.factory === undefined || req.factory === run.factory
            ? ""
            : `; factory '${req.factory}' was not used`),
        key: prior.key,
      });
      return [];
    }
    previous = [prior.key, ...prior.previous];
  }

  if (req.dryRun === true) {
    ctx.logger.info("{summary}", {
      summary: `${label} has no work item` +
        (previous.length === 0
          ? ""
          : ` (its last one, '${previous[0]}', has finished or moved)`) +
        "; dry run, nothing was claimed",
    });
    return [];
  }

  if (req.factory === undefined) {
    throw new Error(
      `${label} needs a new work item; pass --input factory=<factory>` +
        (prior === null ? "" : ` (its last one used '${prior.factory}')`),
    );
  }
  // Checked in full before anything is reserved, though its name is no part
  // of the key.
  await loadFactoryDefinition(ctx, req.factory);
  // The key is for reading only; externalRefs is the link.
  const key = await nextKey(ctx, req.base, req.qualifier, previous);
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
      factory: req.factory,
      claimedAt: req.now.toISOString(),
      previous,
    } satisfies TicketClaim,
  );
  ctx.logger.info("{summary}", {
    summary: `${label} is claimed as '${key}'` +
      (previous.length === 0
        ? ""
        : ` (its last work item, '${previous[0]}', has finished or moved)`) +
      `. Start it: ${startCommand(key, req.factory, refs, issue.title)}`,
    key,
  });
  return [handle];
}

export interface ClaimMove {
  tracker: string;
  /** The ticket a retarget moved the work item to. */
  issue: { id: string; display: string };
  /** Its index record's name. */
  recordName: string;
  /** The work item, and the factory it runs in. */
  key: string;
  factory: string;
  now: Date;
}

/**
 * Point the ticket index of the ticket a retarget moved a work item to at
 * that work item (DESIGN.md, "Retargeting"). The old ticket's record keeps
 * the key, and claim there sees the work item has moved. Refused when the
 * new ticket already has another work item, reserved or active: one ticket
 * has one work item at a time. Returns the handles written.
 */
export async function moveClaim(
  ctx: ClaimContext,
  move: ClaimMove,
): Promise<unknown[]> {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  const raw = await ctx.readResource(move.recordName);
  const prior = raw === null ? null : TicketClaimSchema.parse(raw);
  if (prior?.key === move.key) return [];
  const label = `${move.issue.display} (${move.issue.id})`;
  let previous: string[] = [];
  if (prior !== null) {
    const run = await readClaimedRun(ctx, prior.key);
    if (
      run === null ||
      (run.status === "active" &&
        run.externalRefs[move.tracker] === move.issue.id)
    ) {
      throw new Error(
        `'${move.key}' was retargeted to ${label}, which already has work ` +
          `item '${prior.key}' (${run === null ? "reserved" : "active"}); ` +
          "one ticket has one work item at a time, so nothing was published " +
          "to it. Finish or abandon one of them",
      );
    }
    previous = [prior.key, ...prior.previous];
  }
  const handle = await ctx.writeResource(
    TICKET_SPEC,
    move.recordName,
    {
      tracker: move.tracker,
      issue: move.issue.id,
      display: move.issue.display,
      key: move.key,
      factory: move.factory,
      claimedAt: move.now.toISOString(),
      previous,
    } satisfies TicketClaim,
  );
  ctx.logger.info("{summary}", {
    summary: `${label} is now '${move.key}''s ticket in the index`,
  });
  return [handle];
}

/**
 * The key for a ticket's next work item: the base for its first, `<base>-<n>`
 * for its nth (DESIGN.md, "Keys are stagecraft's"). When another work item
 * already has that name, the tracker instance's name qualifies it
 * (`abc-12-linear`), and a ticket whose earlier key was qualified keeps the
 * qualifier, so one ticket's keys stay one family. Refused when the
 * qualified key is taken too.
 */
export async function nextKey(
  ctx: ClaimContext,
  base: string,
  qualifier: string,
  previous: readonly string[],
): Promise<string> {
  const n = previous.length + 1;
  const qualified = nthKey(base, 1, qualifier);
  // A base that already fills the key's length leaves no room to qualify.
  const keepsQualifier = qualified !== base &&
    previous.some((k) =>
      k === qualified || new RegExp(`^${qualified}-[0-9]+$`).test(k)
    );
  const plain = nthKey(base, n);
  if (!keepsQualifier && await keyIsFree(ctx, plain)) return plain;
  const key = nthKey(base, n, qualifier);
  if (await keyIsFree(ctx, key)) return key;
  throw new Error(
    `the keys '${plain}' and '${key}' are both taken by other work items, ` +
      "so nothing was claimed; two trackers with the same prefix reached the " +
      "same id. Give one of them another prefix (its prefix global argument)",
  );
}

/** Why a factory does not load, or null when it does. */
async function loadError(
  ctx: ClaimContext,
  factory: string,
): Promise<string | null> {
  try {
    await loadFactoryDefinition(ctx, factory);
    return null;
  } catch (error) {
    return (error instanceof Error ? error.message : String(error))
      .split("\n")[0];
  }
}

/**
 * Move a reservation that never started to another factory, because its own
 * no longer loads. The key stays: the failed start may have left a
 * definition under it, which a fresh key would orphan. Returns the handle
 * written, or null on a dry run.
 */
async function reassignReservation(
  ctx: ClaimContext,
  req: ClaimRequest,
  factory: string,
  prior: TicketClaim,
  unusable: string,
  label: string,
): Promise<unknown | null> {
  if (ctx.writeResource === undefined) {
    throw new Error("this method context has no writeResource");
  }
  await loadFactoryDefinition(ctx, factory);
  const because = `its reserved factory '${prior.factory}' no longer loads ` +
    `(${unusable})`;
  if (req.dryRun === true) {
    ctx.logger.info("{summary}", {
      summary: `${label} is claimed as '${prior.key}', not started yet; ` +
        `${because}, so a claim would move it to factory '${factory}'. ` +
        "Dry run, nothing was claimed",
      key: prior.key,
    });
    return null;
  }
  const handle = await ctx.writeResource(
    TICKET_SPEC,
    req.recordName,
    {
      ...prior,
      display: req.issue.display,
      factory,
      claimedAt: req.now.toISOString(),
    } satisfies TicketClaim,
  );
  ctx.logger.info("{summary}", {
    summary: `${label} is claimed as '${prior.key}', now under factory ` +
      `'${factory}': ${because}. Start it: ` +
      startCommand(
        prior.key,
        factory,
        externalRefsOf(req.tracker, req.issue),
        req.issue.title,
      ),
    key: prior.key,
  });
  return handle;
}
