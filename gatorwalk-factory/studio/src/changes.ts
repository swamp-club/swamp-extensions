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

// Changed marks: which stages differ from what this browser last saw. Each
// stage (and the global transitions, as ANY STAGE) has a fingerprint of its
// parsed spec. The page keeps the fingerprints it last showed per factory;
// a stage counts as seen when it is selected, or on Mark all seen. The first
// visit to a factory records a baseline and marks nothing.

import { canonicalJson } from "../../extensions/models/_lib/engine/canonical.ts";
import type { FactoryDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import { ANY_ID } from "./layout.ts";

/** Fingerprints by stage id (ANY_ID for the global transitions). */
export type Seen = Record<string, string>;

/** A 53-bit string hash (cyrb53): enough to tell two versions of a stage apart. */
function hash(text: string): string {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

export function fingerprints(definition: FactoryDefinition): Seen {
  const out: Seen = {};
  for (const stage of definition.stages) {
    out[stage.id] = hash(canonicalJson(stage));
  }
  if ((definition.globalTransitions ?? []).length > 0) {
    out[ANY_ID] = hash(canonicalJson(definition.globalTransitions));
  }
  return out;
}

/** Stages new or different since `seen`; nothing on a first visit. */
export function changedSince(seen: Seen | null, now: Seen): Set<string> {
  if (seen === null) return new Set();
  return new Set(Object.keys(now).filter((id) => seen[id] !== now[id]));
}

/**
 * `seen` with the given stages (or all) brought up to date, and stages that
 * no longer exist dropped. A first visit takes everything as seen.
 */
export function markSeen(
  seen: Seen | null,
  now: Seen,
  ids: string[] | "all",
): Seen {
  if (seen === null || ids === "all") return { ...now };
  const out: Seen = {};
  for (const id of Object.keys(now)) {
    if (ids.includes(id)) out[id] = now[id];
    else if (Object.hasOwn(seen, id)) out[id] = seen[id];
  }
  return out;
}

/** A stored value read back, or null when it is missing or not a Seen. */
export function parseSeen(stored: string | null): Seen | null {
  if (stored === null) return null;
  try {
    const value: unknown = JSON.parse(stored);
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }
    const out: Seen = {};
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return null;
  }
}
