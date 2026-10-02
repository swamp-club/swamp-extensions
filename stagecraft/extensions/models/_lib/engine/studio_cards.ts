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
  /** The digest of the factory definition the work item is pinned to. */
  pinnedDigest: string;
  /** Why some of the card could not be worked out, if so. */
  problem?: string;
}
