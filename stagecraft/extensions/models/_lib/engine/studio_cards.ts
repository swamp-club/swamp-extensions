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

// ---------------------------------------------------------------------------
// What the studio server and the page share: the factory views each address
// names, and the shapes the server sends about work items. No imports, so the
// page can use them without bundling the server's reads
// (studio_work_items.ts).
// ---------------------------------------------------------------------------

/** The factory views, each at /f/<factory>/<view>, in the tabs' order. */
export const FACTORY_VIEWS = ["design", "simulate", "board"] as const;

/** A work item whose record could not be read, and why. */
export interface WorkItemProblem {
  key: string;
  error: string;
}

/** An exit only a person can open now, as the card shows it. */
export interface CardExit {
  transition: string;
  to: string;
  manual: boolean;
  gateIds: string[];
}

/** Why a work item cannot go on until a person grants an override. */
export type Park =
  | { kind: "dispatch-cap"; count: number; limit: number; granted: number }
  | {
    kind: "cycle-limit";
    transition: string;
    to: string;
    count: number;
    limit: number;
    granted: number;
  };

/** A work item as the board shows it: only what the card needs. */
export interface BoardCard {
  key: string;
  /** The work's title; null on a run started without one. */
  title: string | null;
  /** The ticket's display id (ABC-12), else its id; null when unbound. */
  trackerRef: string | null;
  status: "active" | "terminal";
  stage: string;
  cycle: number;
  /** When the current stage entry began; null if the journal does not say. */
  enteredAt: string | null;
  /** Held only by a person: since when, and on which exits. */
  waiting: { since: string; exits: CardExit[] } | null;
  parked: Park[];
  /** The digest of the factory definition the work item is pinned to, in the
   * current form (definition_upgrade.ts); the recorded one when it could not
   * be read. */
  pinnedDigest: string;
  /** Why some of the card could not be worked out, if so. */
  problem?: string;
}

/** A relation on a ticket card, with the work item on the other ticket. */
export interface TicketCardRelation {
  type: string;
  direction: "outgoing" | "incoming";
  issue: string;
  display: string;
  /** The newest work item on that ticket, in any factory, or null. */
  workItem: string | null;
}

/** A ticket with no work item on the board, as its card shows it. */
export interface TicketCard {
  id: string;
  display: string;
  title: string;
  /** The ticket's type; null where the record names none. */
  type: string | null;
  /** When the ticket was filed; null where the record does not say. */
  createdAt: string | null;
  relations: TicketCardRelation[];
  /** The ticket's last work item, finished, and the stage it ended in. */
  previous: { key: string; stage: string } | null;
}

/** A ticket claim reserved a key for, whose work item has not started. */
export interface ClaimedCard extends TicketCard {
  key: string;
  /** The factory the key was reserved under. */
  factory: string;
  claimedAt: string;
}

/** What GET /api/tickets?factory=<name> answers. */
export type TicketsResponse =
  | {
    supported: false;
    /** Why the factory's tracker is not read for tickets. */
    reason: string;
  }
  | {
    supported: true;
    /** The tracker instance and its kind. */
    tracker: string;
    kind: string;
    /** Open tickets with no work item, oldest first. */
    notStarted: TicketCard[];
    /** Tickets claimed but not started, oldest claim first. */
    claimed: ClaimedCard[];
    /** Records that could not be read, by ticket, and why. */
    problems: WorkItemProblem[];
  };
