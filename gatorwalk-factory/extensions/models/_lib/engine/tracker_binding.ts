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

// ---------------------------------------------------------------------------
// The tracker a factory is bound to, as the engine knows it (DESIGN.md, "The
// seam"). A factory definition names the kind of tracker it is written for,
// the factory names the tracker instance, and a work item pins both at
// start. The engine never calls a tracker: it checks the instance's model
// type against the kind, and status reads the instance's publish cursor as
// data. Tracker code gets the cursor's shape from here, through tracker.ts,
// so the two sides read and write one schema.
// ---------------------------------------------------------------------------

export const TRACKER_KINDS = ["builtin", "swamp-club", "linear"] as const;

export type TrackerKind = typeof TRACKER_KINDS[number];

/** A factory definition that names no tracker kind is for the built-in one. */
export const DEFAULT_TRACKER_KIND: TrackerKind = "builtin";

/** The model type a tracker instance of each kind has. A tracker test checks
 * each adapter model's type against it. */
export const TRACKER_TYPES: Readonly<Record<TrackerKind, string>> = {
  "builtin": "@swamp/gatorwalk-factory/tracker",
  "swamp-club": "@swamp/gatorwalk-factory/swamp-club",
  "linear": "@swamp/gatorwalk-factory/linear",
};

/** The tracker a work item was started against: pinned in its run record. */
export const TrackerBindingSchema = z.strictObject({
  /** The tracker instance's name. */
  instance: z.string().min(1),
  kind: z.enum(TRACKER_KINDS),
});

export type TrackerBinding = z.infer<typeof TrackerBindingSchema>;

/** The resource spec of a publish cursor, on the tracker instance. */
export const CURSOR_SPEC = "cursor";

/** The record name of a work item's publish cursor. */
export function cursorName(workItem: string): string {
  return `${CURSOR_SPEC}-${workItem}`;
}

/**
 * How far publish has delivered a work item to its ticket: every journal
 * event up to journalVersion, and the last status key it wrote.
 */
export const CursorSchema = z.object({
  workItem: z.string(),
  issue: z.string(),
  journalVersion: z.number().int().nonnegative(),
  /** The status key last delivered (or skipped as unreachable), or null. */
  status: z.string().nullable(),
  at: z.string(),
});

export type Cursor = z.infer<typeof CursorSchema>;
