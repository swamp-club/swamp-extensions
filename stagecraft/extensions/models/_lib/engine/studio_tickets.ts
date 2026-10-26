// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.6.7";
import type {
  ClaimedCard,
  TicketCard,
  TicketsResponse,
  WorkItemProblem,
} from "./studio_cards.ts";
import { instanceRuns, IssueSchema, latestByName } from "./studio_ticket.ts";
import type { QueryData } from "./studio_work_items.ts";
import { BUILTIN_FIRST_STATUS, TRACKER_TYPES } from "./tracker_binding.ts";
import { FACTORY_TYPE, recordObject, safePart } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The Board's ticket columns, GET /api/tickets?factory=<name> (DESIGN.md,
// "The studio server"; swamp-club #3828): the open tickets on the factory's
// tracker instance that no work item has taken yet, and the ones claim has
// reserved a key for whose start has not run. Like the Ticket tab, it reads
// what the tracker instance recorded, through the data query: no network
// call, no method. Only the built-in tracker for now, whose records are the
// tickets themselves; a record is read by its origin, so an external
// tracker's snapshots could be listed the same way once something writes a
// snapshot of each open ticket.
// ---------------------------------------------------------------------------

/** A model definition's type and raw globalArguments. */
export interface ModelArguments {
  type: string;
  globalArguments: Record<string, unknown>;
}

/** A model definition by name, or null when no model has the name. */
export type ModelLookup = (name: string) => Promise<ModelArguments | null>;

/** Where a factory's tickets are read from, or why they are not. */
export type TicketSource =
  | { supported: false; reason: string }
  | {
    supported: true;
    instance: string;
    kind: string;
    /** The status an open ticket is in; null when it could not be read. */
    firstStatus: string | null;
    /** Why firstStatus is null. */
    problem?: string;
  };

const BUILTIN_TYPE = TRACKER_TYPES.builtin;

/**
 * The first of a built-in tracker instance's statuses: where it files a new
 * ticket. Its statuses argument is a list, or a JSON list as a string; with
 * none, the tracker's default. Throws on anything else, such as a swamp
 * expression the studio cannot evaluate.
 */
export function firstStatus(statuses: unknown): string {
  if (statuses === undefined || statuses === null) return BUILTIN_FIRST_STATUS;
  let list: unknown = statuses;
  if (typeof statuses === "string") {
    try {
      list = JSON.parse(statuses);
    } catch {
      throw new Error(
        `its statuses argument is not a list the studio can read: ${statuses}`,
      );
    }
  }
  if (
    !Array.isArray(list) || list.length === 0 ||
    typeof list[0] !== "string" || list[0] === ""
  ) {
    throw new Error("its statuses argument is not a list of status names");
  }
  return list[0];
}

/**
 * The tracker instance a factory's tickets are read from: the one its
 * tracker argument names. Only a built-in tracker is read for now; any other
 * answers supported false, saying why.
 */
export async function ticketSource(
  lookup: ModelLookup,
  factory: string,
): Promise<TicketSource> {
  const found = await lookup(factory);
  if (found === null || found.type !== FACTORY_TYPE) {
    return { supported: false, reason: `no factory named '${factory}'` };
  }
  const named = found.globalArguments.tracker;
  if (typeof named !== "string" || named === "") {
    return {
      supported: false,
      reason: `factory '${factory}' names no tracker`,
    };
  }
  let instance: string;
  try {
    instance = safePart("tracker", named);
  } catch (e) {
    return {
      supported: false,
      reason: e instanceof Error ? e.message : `${e}`,
    };
  }
  const tracker = await lookup(instance);
  if (tracker === null) {
    return {
      supported: false,
      reason: `factory '${factory}' names tracker '${instance}', but no ` +
        `model has that name`,
    };
  }
  if (tracker.type !== BUILTIN_TYPE) {
    return {
      supported: false,
      reason: `tracker '${instance}' is a ${tracker.type}: the Board lists ` +
        `tickets with no work item only for the built-in tracker ` +
        `(${BUILTIN_TYPE})`,
    };
  }
  try {
    return {
      supported: true,
      instance,
      kind: "builtin",
      firstStatus: firstStatus(tracker.globalArguments.statuses),
    };
  } catch (e) {
    return {
      supported: true,
      instance,
      kind: "builtin",
      firstStatus: null,
      problem: `tracker '${instance}': ${
        e instanceof Error ? e.message : String(e)
      }, so no ticket is shown as open`,
    };
  }
}

const ClaimSchema = z.object({
  tracker: z.string(),
  issue: z.string(),
  key: z.string(),
  factory: z.string(),
  claimedAt: z.string(),
});
type Claim = z.infer<typeof ClaimSchema>;

/** The records of one spec on the instance, newest of each, as objects. */
async function records(
  query: QueryData,
  instance: string,
  spec: string,
): Promise<{ name: string; data: Record<string, unknown> | null }[]> {
  const found = await query(
    `modelName == "${instance}" && specName == "${spec}"`,
  );
  return latestByName(found).map((record) => {
    const name = (record as { name?: unknown } | null)?.name;
    return {
      name: typeof name === "string" ? name : "(unnamed)",
      data: recordObject(record),
    };
  });
}

function byTime<T>(at: (t: T) => string | null, then: (t: T) => string) {
  return (a: T, b: T) =>
    (at(a) ?? "").localeCompare(at(b) ?? "") || then(a).localeCompare(then(b));
}

/**
 * The factory's ticket columns from its tracker instance's records. A ticket
 * whose newest work item is active is on the Board already, so it is left
 * out. One claim reserved a key for, with no run under that key, is Claimed.
 * Otherwise it is Not started, with its last finished work item if it had
 * one. Either way only a ticket in the instance's first status waits. A
 * record that does not parse is a problem, never a dropped ticket.
 */
export async function readTickets(
  query: QueryData,
  source: TicketSource,
): Promise<TicketsResponse> {
  if (!source.supported) return source;
  const { instance, kind } = source;
  const problems: WorkItemProblem[] = [];
  if (source.problem !== undefined) {
    problems.push({ key: instance, error: source.problem });
  }
  const runs = await instanceRuns(query, instance);
  const claims = new Map<string, Claim>();
  for (const { name, data } of await records(query, instance, "ticket")) {
    if (data?.tracker !== kind) continue;
    const parsed = ClaimSchema.safeParse(data);
    if (!parsed.success) {
      problems.push({ key: name, error: "its claim record does not parse" });
      continue;
    }
    claims.set(parsed.data.issue, parsed.data);
  }
  const notStarted: TicketCard[] = [];
  const claimed: ClaimedCard[] = [];
  for (const { name, data } of await records(query, instance, "issue")) {
    // A query is not limited to this repository's namespace: only a record
    // of this kind of tracker counts, as readTicket checks it.
    if (data?.tracker !== kind) continue;
    const parsed = IssueSchema.safeParse(data);
    if (!parsed.success) {
      problems.push({ key: name, error: "its ticket record does not parse" });
      continue;
    }
    const issue = parsed.data;
    // Only an open ticket waits: one closed by hand is in neither column,
    // claimed or not.
    if (source.firstStatus === null || issue.status.id !== source.firstStatus) {
      continue;
    }
    const newest = runs.byTicket.get(issue.id);
    const claim = claims.get(issue.id);
    const started = claim === undefined ? undefined : runs.byKey.get(claim.key);
    // A retarget moves the work item to another ticket and leaves this one's
    // claim naming its key: that run is no longer this ticket's.
    const reserved = started?.externalRefs[kind] === issue.id
      ? started
      : undefined;
    if (newest?.status === "active" || reserved?.status === "active") {
      continue;
    }
    const finished = newest ?? reserved;
    const card: TicketCard = {
      id: issue.id,
      display: issue.display,
      title: issue.title,
      type: issue.origin === "builtin" ? issue.type : null,
      createdAt: issue.createdAt ?? null,
      relations: (issue.relations ?? []).map((r) => ({
        ...r,
        workItem: runs.byTicket.get(r.issue)?.key ?? null,
      })),
      previous: finished === undefined
        ? null
        : { key: finished.key, stage: finished.stage },
    };
    if (claim !== undefined && started === undefined) {
      claimed.push({
        ...card,
        key: claim.key,
        factory: claim.factory,
        claimedAt: claim.claimedAt,
      });
    } else notStarted.push(card);
  }
  notStarted.sort(byTime((t) => t.createdAt, (t) => t.display));
  claimed.sort(byTime((t) => t.claimedAt, (t) => t.display));
  return {
    supported: true,
    tracker: instance,
    kind,
    notStarted,
    claimed,
    problems,
  };
}
