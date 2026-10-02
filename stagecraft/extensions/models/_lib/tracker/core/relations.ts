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
import {
  RELATION_TYPES,
  type RelationType,
  TrackerError,
  type TrackerIssue,
  type TrackerRelation,
} from "./adapter.ts";

// ---------------------------------------------------------------------------
// The rules every tracker's relations keep, so the built-in tracker, the
// swamp-club Lab and Linear mean the same thing by each one. They are the
// Lab's (swamp-club lib/domain/lab/relationship.ts): one parent per child, no
// parent cycles (walked 10 deep), one canonical per duplicate, and no
// duplicate chains. The Lab enforces them itself, Linear does not, so every
// adapter checks them here before it writes. The check reads, then the
// adapter writes: two relates racing on Linear can both pass.
// ---------------------------------------------------------------------------

export const TrackerRelationSchema = z.object({
  type: z.enum(RELATION_TYPES),
  direction: z.enum(["outgoing", "incoming"]),
  issue: z.string(),
  display: z.string(),
});

/** How deep the parent-cycle walk goes, as the Lab's does. */
const MAX_PARENT_DEPTH = 10;

/** The relation `from type to`, as `from` reads it, if it has it. */
export function findRelation(
  issue: TrackerIssue,
  type: RelationType,
  to: string,
): TrackerRelation | undefined {
  return issue.relations.find((r) =>
    r.type === type && r.direction === "outgoing" && r.issue === to
  );
}

/**
 * Whether either ticket shows `from type to`. One side may hold it where the
 * other cannot show it: Linear reads only a parent's first 250 children, but
 * a child's own parent field always.
 */
export function hasRelation(
  from: TrackerIssue,
  type: RelationType,
  to: TrackerIssue,
): boolean {
  return findRelation(from, type, to.id) !== undefined ||
    to.relations.some((r) =>
      r.type === type && r.direction === "incoming" && r.issue === from.id
    );
}

export interface RelateCheck {
  /** True when either ticket already shows the relation: write nothing. */
  exists: boolean;
  from: TrackerIssue;
  to: TrackerIssue;
}

/**
 * Both tickets, fetched (a missing one is not_found before anything is
 * written), and whether the relation exists already. A new relation that
 * would break a rule is refused as invalid. An existing one is reported
 * before any rule runs: the Lab would refuse a repeated parent_of as a
 * second parent.
 */
export async function checkRelate(
  fetch: (id: string) => Promise<TrackerIssue>,
  tracker: string,
  fromId: string,
  type: RelationType,
  toId: string,
): Promise<RelateCheck> {
  const refuse = (detail: string): never => {
    throw new TrackerError("invalid", tracker, detail);
  };
  const from = await fetch(fromId);
  const to = await fetch(toId);
  if (from.id === to.id) {
    refuse(`${from.display} cannot be related to itself`);
  }
  if (hasRelation(from, type, to)) return { exists: true, from, to };
  const parentOf = (issue: TrackerIssue) =>
    issue.relations.find((r) =>
      r.type === "parent_of" && r.direction === "incoming"
    );
  if (type === "parent_of") {
    const parent = parentOf(to);
    if (parent !== undefined) {
      refuse(
        `${to.display} already has a parent, ${parent.display}; unrelate ` +
          "it first",
      );
    }
    // Up from the new parent: reaching the child would close a cycle.
    const seen = new Set([to.id]);
    let current = from;
    for (let depth = 0; depth < MAX_PARENT_DEPTH; depth++) {
      const up = parentOf(current);
      if (up === undefined) break;
      if (seen.has(up.issue)) {
        refuse(
          `${from.display} parent_of ${to.display} would form a circular ` +
            "parent chain",
        );
      }
      seen.add(up.issue);
      current = await fetch(up.issue);
    }
  }
  if (type === "duplicate_of") {
    const other = from.relations.find((r) =>
      r.type === "duplicate_of" && r.direction === "outgoing"
    );
    if (other !== undefined) {
      refuse(
        `${from.display} is already a duplicate of ${other.display}; ` +
          "unrelate that first",
      );
    }
    const chain = to.relations.find((r) =>
      r.type === "duplicate_of" && r.direction === "outgoing"
    );
    if (chain !== undefined) {
      refuse(
        `${to.display} is a duplicate of ${chain.display}; mark ` +
          `${from.display} a duplicate of ${chain.display} instead`,
      );
    }
    const duplicates = from.relations.filter((r) =>
      r.type === "duplicate_of" && r.direction === "incoming"
    );
    if (duplicates.length > 0) {
      refuse(
        `${duplicates.map((r) => r.display).join(", ")} ${
          duplicates.length === 1 ? "is a duplicate" : "are duplicates"
        } of ${from.display}; re-point ${
          duplicates.length === 1 ? "it" : "them"
        } before marking ${from.display} a duplicate`,
      );
    }
  }
  return { exists: false, from, to };
}
