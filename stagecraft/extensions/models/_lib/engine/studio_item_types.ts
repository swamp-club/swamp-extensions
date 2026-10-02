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

import type { FactoryDefinition } from "./definition_schema.ts";
import type { DispatchPacket } from "./dispatch.ts";
import type { TransitionReadiness } from "./gates.ts";
import type { ProductKind } from "./journal.ts";
import type { Limit } from "./run_ops.ts";
import type { RunRecord } from "./run_record.ts";

// What GET /api/work-items/<key> answers (studio_work_item.ts builds it),
// as the work-item page reads it. Type imports only, from modules the page's
// bundle already holds, so the page can use these without pulling server
// modules into its bundle (studio/build.ts, ENGINE_INPUTS).

/** A product version the run's journal recorded, with its payload. */
export interface PayloadVersion {
  kind: ProductKind;
  name: string;
  version: number;
  digest: string;
  /** null when no stored copy has the digest the journal recorded. */
  payload: Record<string, unknown> | null;
}

/** A relation as the work item's ticket reads it. */
export interface IssueRelation {
  type: string;
  direction: "outgoing" | "incoming";
  issue: string;
  display: string;
}

/**
 * The ticket as its tracker last recorded it: an external tracker's last
 * snapshot (which may be stale), or a built-in ticket.
 */
export interface IssueView {
  origin: "snapshot" | "builtin";
  tracker: string;
  id: string;
  display: string;
  title: string;
  url?: string;
  status: { id: string; name: string };
  relations?: IssueRelation[];
  fetchedAt?: string;
  updatedAt?: string;
}

/** An exit as status reports it. */
export interface StatusExit {
  name: string;
  to: string;
  manual: boolean;
  humanGates: string[];
  humanGatesNotRequired: string[];
  ready: boolean;
  failures: string[];
}

/** What status reports and the page shows (status_view.ts). */
export interface ItemStatus {
  key: string;
  status: RunRecord["status"];
  stage: string;
  cycle: number;
  era: string;
  dispatch: DispatchPacket | null;
  dispatchCap: Limit | null;
  awaitingDispatchOverride: boolean;
  exits: StatusExit[];
  personRecords: string[];
}

/** One work item, as GET /api/work-items/<key> answers. */
export interface WorkItemResponse {
  run: RunRecord;
  /** The factory definition the run is pinned to, checked by digest. */
  pinned: {
    factory: string;
    version: number | null;
    digest: string;
    definition: FactoryDefinition;
  };
  /** Every product version the journal records, with its payload; null
   * unless asked for with ?payloads=1. */
  payloads: PayloadVersion[] | null;
  /** What status reports, less the tracker's lag. */
  status: ItemStatus;
  /** The transition readiness the status was built from. */
  readiness: TransitionReadiness[];
  /** The ticket as its tracker last recorded it, or null. */
  issue: IssueView | null;
  /** When the readiness was evaluated. */
  at: string;
}

/** A comment or lifecycle entry on the ticket, as the Ticket tab shows it. */
export interface TicketActivityView {
  kind: "comment" | "entry";
  id?: string;
  author?: string;
  /** A comment's markdown, or an entry's summary. */
  body: string;
  step?: string;
  at: string;
  /** True when the tracker's delivery ledger records stagecraft posting it. */
  byStagecraft: boolean;
}

/** A relation, with the work item that works the other ticket, if any. */
export interface TicketRelationView extends IssueRelation {
  /** The newest work item on that ticket, in any factory, or null. */
  workItem: string | null;
}

/** The ticket as the Ticket tab shows it, from the tracker's stored record. */
export interface TicketView {
  origin: "snapshot" | "builtin";
  /** The tracker instance and its kind. */
  tracker: string;
  kind: string;
  id: string;
  display: string;
  title: string;
  url?: string;
  status: { id: string; name: string };
  /** null on a snapshot recorded before trackers read descriptions. */
  description: string | null;
  labels: string[];
  assignees: string[];
  createdAt?: string;
  updatedAt?: string;
  /** Oldest first; null on a snapshot recorded before trackers read it. */
  activity: TicketActivityView[] | null;
  relations: TicketRelationView[];
  /** When an external tracker's snapshot was taken; absent for built-in. */
  fetchedAt?: string;
}

/** What GET /api/work-items/<key>/ticket answers. */
export type TicketResponse =
  | { state: "none" }
  | { state: "missing"; tracker: string; kind: string; id: string }
  | { state: "ok"; ticket: TicketView };
