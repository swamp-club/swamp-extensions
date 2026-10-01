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

import type { TrackerIssue, TrackerRelation } from "./adapter.ts";

// ---------------------------------------------------------------------------
// Duplicates (DESIGN.md, "Duplicates"). Marking a ticket a duplicate is a
// tracker write: relate it duplicate_of its primary, then close it where the
// tracker does not. Moving the duplicate's work item is the engine's: a
// driver retargets it onto the primary, or takes its definition's duplicate
// exit. The tracker never decides that move; it only refuses to project to,
// or claim, a ticket that is a duplicate, and says what the moves are.
// ---------------------------------------------------------------------------

/** The status key a marked duplicate is closed with. */
export const DUPLICATE_STATUS = "closed";

/** The primary a ticket is a duplicate of, as it reads the relation. */
export function primaryOf(issue: TrackerIssue): TrackerRelation | undefined {
  return issue.relations.find((r) =>
    r.type === "duplicate_of" && r.direction === "outgoing"
  );
}

/** Why a duplicate ticket takes no work, and what a driver does instead. */
export function duplicateRefusal(
  issue: TrackerIssue,
  primary: TrackerRelation,
  workItem?: string,
): string {
  const moves = workItem === undefined
    ? `work on ${primary.display} (${primary.issue}) instead`
    : `move '${workItem}' to the primary: retarget it onto ` +
      `${primary.display} (${primary.issue}) when the primary has no work ` +
      "item, or take its definition's duplicate exit when it has one";
  return `${issue.display} is a duplicate of ${primary.display}; ${moves}`;
}
