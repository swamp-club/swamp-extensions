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

import type { AwaitingExit, JournalEvent } from "./journal.ts";
import type { Lifecycle } from "./lifecycle_schema.ts";
import type { RunRecord } from "./run_record.ts";

// ---------------------------------------------------------------------------
// The projection: what a work item's journal says to its tracker ticket
// (DESIGN.md, "The projection publisher"). Pure: no I/O and no clock, so the
// same run always gives the same comments, and a replay of a delivery key
// asks the ledger for the same write.
// ---------------------------------------------------------------------------

/** A comment for one journal event, keyed on that event's journal version. */
export interface PlannedComment {
  /** The journal's length once this event was written (its index + 1). */
  journalVersion: number;
  body: string;
}

export interface Projection {
  /** Comments for the events after the cursor, in journal order. */
  comments: PlannedComment[];
  /** The status key of the stage the work item is in now, or null when
   * that stage leaves the ticket's status alone. */
  status: string | null;
}

/**
 * The comments for the journal events after `since` (a journal version),
 * and the status key of the current stage in the pinned lifecycle.
 */
export function project(
  run: RunRecord,
  lifecycle: Lifecycle,
  since: number,
): Projection {
  const comments: PlannedComment[] = [];
  for (let i = since; i < run.journal.length; i++) {
    const body = commentFor(run.key, run.journal[i], lifecycle);
    if (body !== null) comments.push({ journalVersion: i + 1, body });
  }
  const stage = lifecycle.stages.find((s) => s.id === run.stage);
  return { comments, status: stage?.projection?.status ?? null };
}

/**
 * The comment a person on the ticket needs for one event, or null. Stage,
 * transition, gate and lifecycle names are all NameSchema (lowercase, no
 * quotes or dollar signs), so no body trips swamp-club's payload rules
 * (swamp-club#2284). An asserted actor is free text and is left out.
 */
export function commentFor(
  key: string,
  event: JournalEvent,
  lifecycle: Lifecycle,
): string | null {
  const item = `**${key}**`;
  switch (event.type) {
    case "started":
      return `${item} started on lifecycle \`${event.lifecycle.name}\`, ` +
        `at stage **${event.stage}**.`;
    case "advanced": {
      const terminal =
        lifecycle.stages.find((s) => s.id === event.to)?.terminal === true;
      return terminal
        ? `${item} finished at **${event.to}** by \`${event.transition}\`.`
        : `${item} entered **${event.to}** (cycle ${event.toCycle}) by ` +
          `\`${event.transition}\`.`;
    }
    case "approval": {
      const who = event.actor.principal ?? "an unidentified caller";
      const did = event.decision === "approve" ? "approved" : "declined";
      return `${item}: ${who} ${did} \`${event.gateId}\` in ` +
        `**${event.stage}**.`;
    }
    case "awaiting":
      if (event.exits.length === 0) return null;
      return `${item} is waiting on a person in **${event.stage}**:\n\n` +
        event.exits.map(exitLine).join("\n");
    case "reset":
      return `${item} was reset: era \`${event.previousEra}\` ended, and ` +
        `era \`${event.era}\` starts at **${event.stage}**` +
        (event.repinned === undefined ? "." : ", on a newly pinned lifecycle.");
    case "dispatched":
    case "usage":
    case "recorded":
    case "rejected":
    case "override":
      return null;
  }
}

function exitLine(exit: AwaitingExit): string {
  const needs = exit.gateIds.length > 0
    ? `approval of ${exit.gateIds.map((g) => `\`${g}\``).join(", ")}`
    : "a person to confirm it";
  const from = exit.readyAt === undefined ? "" : `, from ${exit.readyAt}`;
  return `- \`${exit.transition}\` to **${exit.to}**: needs ${needs}${from}`;
}
