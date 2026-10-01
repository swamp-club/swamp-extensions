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
// The tracker adapter contract (DESIGN.md, "Trackers"). Swamp owns the
// lifecycle facts and a tracker is a view of them. An adapter is the only code
// that talks to its tracker; the work-item state piece never makes a network
// call. Each tracker model type (the built-in tracker, the swamp-club Lab and
// Linear) is a thin shell that supplies an adapter to the shared methods in
// tracker_methods.ts.
// ---------------------------------------------------------------------------

/** A ticket as every adapter reports it. */
export interface TrackerIssue {
  /** The stable id: kept in externalRefs under the tracker's name. */
  id: string;
  /** The human identifier, for display only; it may change (ABC-1). */
  display: string;
  title: string;
  /** Where a person reads the ticket; absent for a built-in issue. */
  url?: string;
  status: TrackerStatus;
  /**
   * What only this tracker reports about the ticket (the Lab's body, type,
   * author and comments). Recorded in the snapshot as it is; absent when the
   * tracker has nothing beyond the fields above.
   */
  details?: Record<string, unknown>;
  /** The ticket's relations to other tickets, as the tracker holds them. */
  relations: TrackerRelation[];
}

/**
 * How one ticket relates to another. `X parent_of Y`: X is Y's parent.
 * `X blocked_by Y`: X waits on Y. `X duplicate_of Y`: Y is the canonical.
 * `X related_to Y` links them, with no meaning beyond that.
 */
export const RELATION_TYPES = [
  "parent_of",
  "blocked_by",
  "related_to",
  "duplicate_of",
] as const;
export type RelationType = typeof RELATION_TYPES[number];

/**
 * A relation as one of its two tickets reads it: `outgoing` when this ticket
 * is the relation's subject (X in `X parent_of Y`), `incoming` when it is the
 * object.
 */
export interface TrackerRelation {
  type: RelationType;
  direction: "outgoing" | "incoming";
  /** The other ticket's stable id. */
  issue: string;
  /** The other ticket's human identifier. */
  display: string;
}

export interface RelationChange {
  /** False when the relation was already so: nothing was written. */
  changed: boolean;
}

export interface TrackerStatus {
  id: string;
  name: string;
}

/** What the tracker returned for a comment it accepted. */
export interface TrackerComment {
  id: string;
  /** Where a person reads it; absent for a built-in ticket's comment. */
  url?: string;
}

export interface StatusChange {
  /** False when the ticket was already in the status: nothing was written. */
  changed: boolean;
  status: TrackerStatus;
}

/**
 * One structured entry in a ticket's history, the swamp-club Lab's
 * lifecycle entry. targetStatus is the tracker's own status name and only
 * labels the entry: posting one never moves the ticket.
 */
export interface LifecycleEntry {
  step: string;
  targetStatus: string;
  summary: string;
  emoji: string;
  payload: Record<string, unknown>;
  isVerbose: boolean;
}

export interface PostedEntry {
  id: string;
}

/**
 * The history capability: a tracker that keeps a structured history of each
 * ticket, and a ticket type. An adapter that has it is published in entry
 * mode when the factory definition declares entries (ticket_view.ts); publish
 * never asks one without it.
 */
export interface LifecycleEntryWriter {
  postEntry(issueId: string, entry: LifecycleEntry): Promise<PostedEntry>;
  /** Set the ticket's type; already that type writes nothing. */
  setType(
    issueId: string,
    type: string,
  ): Promise<{ changed: boolean; type: string }>;
}

/** What a linkPr did. */
export interface PullRequestLink {
  /** False when the ticket already linked the url: nothing was written. */
  changed: boolean;
  url: string;
}

/**
 * The pull request capability: a tracker that links a pull request on a
 * ticket. publish links one when an entry reads its url (`linkPr`); a
 * tracker without it is never asked.
 */
export interface PullRequestLinker {
  /** Link the pull request at this url on the ticket, replacing an earlier
   * one where the tracker keeps only one; already linked writes nothing. */
  linkPr(issueId: string, url: string): Promise<PullRequestLink>;
}

/** What an assign did. */
export interface Assignment {
  /** False when the user was already assigned: nothing was written. */
  changed: boolean;
  /** The tracker's user, as assign was given it. */
  user: string;
  /** The ticket's status name when it was read. */
  status: string;
  /**
   * Assignees the tracker took off the ticket to make the write (the Lab
   * drops those no longer on its team). Empty when none were.
   */
  dropped: string[];
  /** What only this tracker reports about the assignment (the Lab's
   * userId). */
  details?: Record<string, unknown>;
}

/**
 * The assign capability: a tracker whose tickets have assignees. publish
 * assigns through it when a work item starts.
 */
export interface Assigner {
  /** Add the tracker's user to the ticket's assignees, keeping those
   * already there; already assigned writes nothing. */
  assign(issueId: string, user: string): Promise<Assignment>;
}

/** A new ticket, as create takes it. */
export interface IssueDraft {
  title: string;
  body: string;
  /** The ticket's type, from the tracker's own set. */
  type: string;
}

/**
 * Who owns a ticket's facts (identity, title, type, status). `snapshot`: an
 * external tracker does, and swamp keeps its last read of them. `builtin`:
 * the adapter's own records are the facts, so nothing overwrites them with a
 * read.
 */
export const ISSUE_ORIGINS = ["builtin", "snapshot"] as const;
export type IssueOrigin = typeof ISSUE_ORIGINS[number];

/**
 * What a tracker offers beside the contract. A capability is present or
 * absent; asking for an absent one is refused (requireCapability), never
 * degraded silently.
 */
export interface TrackerCapabilities {
  /** Lifecycle entries and the ticket type, where the tracker has them. */
  readonly history?: LifecycleEntryWriter;
  /** Ticket assignees, where the tracker has them. */
  readonly assign?: Assigner;
  /** Pull requests linked on a ticket, where the tracker has them. */
  readonly pullRequests?: PullRequestLinker;
}
export type CapabilityName = keyof TrackerCapabilities;

export interface TrackerAdapter {
  /** The tracker's name, which is also its externalRefs key. */
  readonly tracker: string;
  readonly origin: IssueOrigin;
  readonly capabilities: TrackerCapabilities;
  /**
   * True when marking a ticket duplicate_of another moves it to a closed
   * status by itself (Linear's reserved Duplicate status). Otherwise marking
   * a duplicate closes it through the `closed` status key (duplicates.ts).
   */
  readonly closesDuplicates?: boolean;
  /**
   * File a new ticket. An external tracker files it first and its id is
   * used. Not idempotent: a retry after the tracker accepted it but before
   * the caller saw the reply files a second ticket.
   */
  create(draft: IssueDraft): Promise<TrackerIssue>;
  /** Fetch by stable id or by display identifier. */
  fetchIssue(ref: string): Promise<TrackerIssue>;
  /** Comment on a ticket, by stable id. */
  comment(issueId: string, body: string): Promise<TrackerComment>;
  /** Move a ticket, by stable id, to the tracker's status of this name. */
  setStatus(issueId: string, statusName: string): Promise<StatusChange>;
  /**
   * Relate one ticket to another, both by stable id, under the rules every
   * tracker shares (relations.ts); already related writes nothing.
   */
  relate(from: string, type: RelationType, to: string): Promise<RelationChange>;
  /** Remove a relation, both by stable id; already absent writes nothing. */
  unrelate(
    from: string,
    type: RelationType,
    to: string,
  ): Promise<RelationChange>;
}

export const TRACKER_ERROR_KINDS = [
  "auth",
  "not_found",
  "rate_limited",
  "invalid",
  "upstream",
] as const;
export type TrackerErrorKind = typeof TRACKER_ERROR_KINDS[number];

/**
 * Why an `invalid` status move was refused, when the reason is where the
 * ticket is now: the tracker knows the status but cannot move there from
 * here (the Lab only moves forward). The publisher skips such a move
 * rather than failing.
 */
export type TrackerErrorReason = "unreachable";

/**
 * A failure every tracker reports the same way. Messages never carry a
 * credential.
 */
export class TrackerError extends Error {
  constructor(
    readonly kind: TrackerErrorKind,
    readonly tracker: string,
    /** The message without the tracker and kind in front. */
    readonly detail: string,
    readonly reason?: TrackerErrorReason,
  ) {
    super(`${tracker} ${kind}: ${detail}`);
    this.name = "TrackerError";
  }
}

/**
 * The capability, or TrackerError `invalid` naming the tracker and the
 * capability it lacks.
 */
export function requireCapability<K extends CapabilityName>(
  adapter: TrackerAdapter,
  name: K,
): NonNullable<TrackerCapabilities[K]> {
  const capability = adapter.capabilities[name];
  if (capability === undefined) {
    throw new TrackerError(
      "invalid",
      adapter.tracker,
      `this tracker lacks the '${name}' capability`,
    );
  }
  return capability as NonNullable<TrackerCapabilities[K]>;
}

/**
 * The key a delivery is idempotent on: a work item and its journal version,
 * the length of its run record's journal. The journal only grows (reset
 * carries it forward), so one key names one moment of one work item.
 */
export interface DeliveryKey {
  workItem: string;
  journalVersion: number;
}
