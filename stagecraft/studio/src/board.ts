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

// The Board: every work item of a factory, in a column for the stage it is
// in. Columns follow the factory's flow, the order Design mode draws its
// stages (by column, then lane). A work item in a stage the current
// definition no longer has gets a column of its own at the end, so nothing
// vanishes. Terminal stages show a count; their work items show only when
// asked, since finished work is most of a busy factory.
//
// Pure: it lays out cards the server sent; it reads nothing.

import type { BoardCard } from "../../extensions/models/_lib/engine/studio_cards.ts";
import { ANY_ID, type Layout } from "./layout.ts";

/** How many cards a column shows before Show more. */
export const COLUMN_PAGE = 50;

export interface BoardFilter {
  waiting: boolean;
  parked: boolean;
  stalePin: boolean;
  /** Matched against the key and the title, ignoring case. */
  text: string;
}

export const NO_FILTER: BoardFilter = {
  waiting: false,
  parked: false,
  stalePin: false,
  text: "",
};

export interface BoardStage {
  id: string;
  terminal: boolean;
}

export interface BoardColumn {
  stage: string;
  terminal: boolean;
  /** False for a stage the current definition does not have. */
  known: boolean;
  /** Every matching card, before Show more. */
  total: number;
  /** The cards shown: none for a terminal stage unless finished are shown. */
  cards: BoardCard[];
}

/** The stages in the order Design mode draws them: by column, then lane. */
export function stageOrder(
  layout: Layout,
  terminal: (id: string) => boolean,
): BoardStage[] {
  return [...layout.tiles.values()]
    .filter((t) => t.kind === "stage" && t.id !== ANY_ID)
    .sort((a, b) => a.col - b.col || a.lane - b.lane || a.index - b.index)
    .map((t) => ({ id: t.id, terminal: terminal(t.id) }));
}

/** Pinned to a definition other than the factory's current one. */
export function isStale(card: BoardCard, currentDigest: string | null) {
  return currentDigest !== null && card.pinnedDigest !== currentDigest;
}

/**
 * What a card's head line shows: the key, and the ticket's ref only when it
 * differs from the key. The built-in tracker's ticket id is the key itself,
 * so it is never shown twice; a Linear ref (ABC-12) is. A card with no title
 * shows the key as its title instead, and none here.
 */
export function cardHead(
  card: Pick<BoardCard, "key" | "title" | "trackerRef">,
): { key: string; ref: string | null } {
  return {
    key: card.title === null ? "" : card.key,
    ref: refOtherThanKey(card.key, card.trackerRef),
  };
}

/** A tracker ref, unless it is the key itself. */
export function refOtherThanKey(
  key: string,
  ref: string | null,
): string | null {
  return ref === null || ref === key ? null : ref;
}

export function matches(
  card: BoardCard,
  filter: BoardFilter,
  currentDigest: string | null,
): boolean {
  if (filter.waiting && card.waiting === null) return false;
  if (filter.parked && card.parked.length === 0) return false;
  if (filter.stalePin && !isStale(card, currentDigest)) return false;
  const text = filter.text.trim().toLowerCase();
  if (text === "") return true;
  return card.key.toLowerCase().includes(text) ||
    (card.title ?? "").toLowerCase().includes(text);
}

/** When a card's stage entry began, for sorting: unknown sorts last. */
function entered(card: BoardCard): string {
  return card.enteredAt ?? "￿";
}

/**
 * The board's columns. Each column's cards run longest in the stage first,
 * so what has waited longest is on top; `shown` says how many of a column's
 * cards to show (COLUMN_PAGE unless Show more was pressed).
 */
export function boardColumns(
  stages: BoardStage[],
  cards: BoardCard[],
  options: {
    filter: BoardFilter;
    currentDigest: string | null;
    showFinished: boolean;
    shown?: Record<string, number>;
  },
): BoardColumn[] {
  const byStage = new Map<string, BoardCard[]>();
  for (const card of cards) {
    if (!matches(card, options.filter, options.currentDigest)) continue;
    byStage.set(card.stage, [...(byStage.get(card.stage) ?? []), card]);
  }
  const known = new Set(stages.map((s) => s.id));
  const unknown = [...byStage.keys()].filter((id) => !known.has(id)).sort();
  // No stages means no definition is loaded (every definition has one): the
  // columns are then the cards' own stages, and none is called unknown.
  const loaded = stages.length > 0;
  const all: (BoardStage & { known: boolean })[] = [
    ...stages.map((s) => ({ ...s, known: true })),
    ...unknown.map((id) => ({
      id,
      // A finished item keeps the status it finished with.
      terminal: (byStage.get(id) ?? []).every((c) => c.status === "terminal"),
      known: !loaded,
    })),
  ];
  return all.map((s) => {
    const found = (byStage.get(s.id) ?? []).sort((a, b) =>
      entered(a) < entered(b) ? -1 : entered(a) > entered(b) ? 1 : 0
    );
    const hidden = s.terminal && !options.showFinished;
    return {
      stage: s.id,
      terminal: s.terminal,
      known: s.known,
      total: found.length,
      cards: hidden ? [] : found.slice(0, options.shown?.[s.id] ?? COLUMN_PAGE),
    };
  });
}

/** A duration as people read it on a card: 3d 4h, 2h 5m, 45m, <1m. */
export function durationText(ms: number): string {
  const minutes = Math.floor(Math.max(0, ms) / 60000);
  if (minutes < 1) return "<1m";
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  if (days > 0) return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  if (hours > 0) return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  return `${mins}m`;
}

/** How long since an instant, or null when it is not known. */
export function since(at: string | null, now: number): number | null {
  if (at === null) return null;
  const t = Date.parse(at);
  return Number.isNaN(t) ? null : now - t;
}
