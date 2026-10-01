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

// Keyboard movement in the graph, which is one tab stop with a roving focus.
//
//   stages      arrows move to the neighbouring tile (left and right in the
//               row, up and down to the nearest tile in the next row);
//               Home and End go to the first and last; Enter steps into
//               the tile's exits
//   exits       Up and Down move between the tile's exits; Enter follows
//               the exit to the stage it leads to; Right steps into the
//               exit's gates; Escape or Left steps back out
//   gates       Up and Down move between the exit's gates; Enter follows
//               their exit; Escape or Left steps back to the exit
//
// Pure: it maps a target and a key to the next target.

import type { FactoryDefinition } from "../../extensions/models/_lib/engine/definition_schema.ts";
import { ANY_ID, type Layout } from "./layout.ts";
import { gateIdentity, type Target, targetKey } from "./selection.ts";

interface NavTile {
  target: Target;
  lane: number;
  col: number;
  /** Each exit, the stage it leads to, and its gates. */
  exits: { target: Target; to: Target; gates: Target[] }[];
}

export interface NavModel {
  /** In reading order: row by row, left to right. */
  tiles: NavTile[];
}

export function navModel(
  definition: FactoryDefinition,
  layout: Layout,
): NavModel {
  const tiles: NavTile[] = [];
  for (const t of layout.tiles.values()) {
    const stage = t.kind === "any" ? null : t.id;
    const list = stage === null
      ? definition.globalTransitions ?? []
      : definition.stages.find((s) => s.id === stage)?.transitions ?? [];
    tiles.push({
      target: t.id === ANY_ID
        ? { kind: "any" }
        : { kind: "stage", stage: t.id },
      lane: t.lane,
      col: t.col,
      exits: list.map((exit) => ({
        target: { kind: "exit", stage, exit: exit.name },
        to: { kind: "stage", stage: exit.to },
        gates: (exit.gates ?? []).map((_, k, gates) => ({
          kind: "gate",
          stage,
          exit: exit.name,
          gate: gateIdentity(gates, k),
        })),
      })),
    });
  }
  tiles.sort((a, b) => a.lane - b.lane || a.col - b.col);
  return { tiles };
}

/** Every target the keyboard can reach, as the mouse can select them. */
export function allTargets(model: NavModel): Target[] {
  return model.tiles.flatMap((t) => [
    t.target,
    ...t.exits.flatMap((e) => [e.target, ...e.gates]),
  ]);
}

function locate(model: NavModel, target: Target) {
  const key = targetKey(target);
  for (let ti = 0; ti < model.tiles.length; ti++) {
    const tile = model.tiles[ti];
    if (targetKey(tile.target) === key) return { ti, ei: -1, gi: -1 };
    for (let ei = 0; ei < tile.exits.length; ei++) {
      const exit = tile.exits[ei];
      if (targetKey(exit.target) === key) return { ti, ei, gi: -1 };
      const gi = exit.gates.findIndex((g) => targetKey(g) === key);
      if (gi >= 0) return { ti, ei, gi };
    }
  }
  return null;
}

/** The tile nearest `col` in a row, the left one on a tie. */
function nearestIn(model: NavModel, lane: number, col: number) {
  let best: NavTile | undefined;
  for (const t of model.tiles) {
    if (t.lane !== lane) continue;
    if (
      best === undefined ||
      Math.abs(t.col - col) < Math.abs(best.col - col)
    ) best = t;
  }
  return best;
}

/**
 * Where a key moves the focus from `current`; null when it does not move
 * (or the key is not a movement key). With nothing focused, any movement
 * key goes to the first tile.
 */
export function navigate(
  model: NavModel,
  current: Target | null,
  key: string,
): Target | null {
  const first = model.tiles[0]?.target ?? null;
  const at = current === null ? null : locate(model, current);
  if (at === null) {
    return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"]
        .includes(key)
      ? first
      : null;
  }
  const tile = model.tiles[at.ti];

  if (at.ei < 0) {
    switch (key) {
      case "ArrowLeft":
      case "ArrowRight": {
        const col = tile.col + (key === "ArrowRight" ? 1 : -1);
        return model.tiles.find((t) => t.lane === tile.lane && t.col === col)
          ?.target ?? null;
      }
      case "ArrowUp":
      case "ArrowDown": {
        const lanes = [...new Set(model.tiles.map((t) => t.lane))];
        const i = lanes.indexOf(tile.lane) + (key === "ArrowDown" ? 1 : -1);
        if (i < 0 || i >= lanes.length) return null;
        return nearestIn(model, lanes[i], tile.col)?.target ?? null;
      }
      case "Home":
        return first;
      case "End":
        return model.tiles.at(-1)?.target ?? null;
      case "Enter":
        return tile.exits[0]?.target ?? null;
    }
    return null;
  }

  const exit = tile.exits[at.ei];
  if (at.gi < 0) {
    switch (key) {
      case "ArrowUp":
        return tile.exits[at.ei - 1]?.target ?? null;
      case "ArrowDown":
        return tile.exits[at.ei + 1]?.target ?? null;
      case "Home":
        return tile.exits[0].target;
      case "End":
        return tile.exits.at(-1)!.target;
      case "Enter":
        return exit.to;
      case "ArrowRight":
        return exit.gates[0] ?? null;
      case "Escape":
      case "ArrowLeft":
        return tile.target;
    }
    return null;
  }

  switch (key) {
    case "ArrowUp":
      return exit.gates[at.gi - 1] ?? null;
    case "ArrowDown":
      return exit.gates[at.gi + 1] ?? null;
    case "Home":
      return exit.gates[0];
    case "End":
      return exit.gates.at(-1)!;
    case "Enter":
      return exit.to;
    case "Escape":
    case "ArrowLeft":
      return exit.target;
  }
  return null;
}
