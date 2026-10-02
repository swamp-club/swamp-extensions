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

// What can be selected on the page, held by what it is rather than where it
// sits in the file. A document path is positional (`stages.2.transitions.0`),
// so when the agent inserts a stage or an exit above the selection, the same
// path names something else; the page keeps the identity and finds its path
// again after every reload.

import type {
  FactoryDefinition,
  GateSpec,
  TransitionSpec,
} from "../../extensions/models/_lib/engine/definition_schema.ts";
import type { FindingView } from "../../extensions/models/_lib/engine/design_view.ts";
import { pathSegments } from "./model.ts";

/**
 * A gate within its exit. Gates have no names, so a gate is known by its
 * type and the name it is about (the artifact, the approval id, the
 * evidence, ...), and which of the gates sharing those it is.
 */
export interface GateKey {
  type: string;
  key: string | null;
  nth: number;
}

export type Target =
  | { kind: "stage"; stage: string }
  /** The ANY STAGE tile: the global transitions. */
  | { kind: "any" }
  /** An exit; `stage` is null for a global transition. */
  | { kind: "exit"; stage: string | null; exit: string }
  | { kind: "gate"; stage: string | null; exit: string; gate: GateKey }
  | {
    kind: "finding";
    code: string;
    stage: string | null;
    message: string;
    path: string;
  };

/** The name a gate is about, if its type has one. */
export function gateKeyOf(gate: GateSpec): string | null {
  switch (gate.type) {
    case "artifact-exists":
    case "artifact-fresh":
    case "findings-clear":
    case "findings-open":
      return gate.config.artifact;
    case "human-approval":
      return gate.config.id;
    case "evidence-recorded":
      return gate.config.name;
    case "cooldown":
      return gate.config.afterEvidence ?? gate.config.afterArtifact ?? null;
    case "max-cycles":
      return gate.config.stage;
    case "cel":
      return gate.config.expr;
  }
}

export function gateIdentity(gates: GateSpec[], index: number): GateKey {
  const gate = gates[index];
  const key = gateKeyOf(gate);
  const nth = gates.slice(0, index)
    .filter((g) => g.type === gate.type && gateKeyOf(g) === key).length;
  return { type: gate.type, key, nth };
}

function gateIndex(gates: GateSpec[], id: GateKey): number {
  let seen = 0;
  for (let i = 0; i < gates.length; i++) {
    if (gates[i].type !== id.type || gateKeyOf(gates[i]) !== id.key) continue;
    if (seen === id.nth) return i;
    seen++;
  }
  return -1;
}

function exitsOf(
  definition: FactoryDefinition,
  stage: string | null,
): { path: string; list: TransitionSpec[] } | null {
  if (stage === null) {
    return {
      path: "globalTransitions",
      list: definition.globalTransitions ?? [],
    };
  }
  const i = definition.stages.findIndex((s) => s.id === stage);
  if (i < 0) return null;
  return {
    path: `stages.${i}.transitions`,
    list: definition.stages[i].transitions ?? [],
  };
}

/** The document path a target has in this definition, or null if it is gone. */
export function pathOf(
  definition: FactoryDefinition,
  target: Target,
  findings: FindingView[] = [],
): string | null {
  switch (target.kind) {
    case "stage": {
      const i = definition.stages.findIndex((s) => s.id === target.stage);
      return i < 0 ? null : `stages.${i}`;
    }
    case "any":
      return (definition.globalTransitions ?? []).length > 0
        ? "globalTransitions"
        : null;
    case "exit":
    case "gate": {
      const exits = exitsOf(definition, target.stage);
      const j = exits?.list.findIndex((t) => t.name === target.exit) ?? -1;
      if (exits === null || j < 0) return null;
      const exit = `${exits.path}.${j}`;
      if (target.kind === "exit") return exit;
      const k = gateIndex(exits.list[j].gates ?? [], target.gate);
      return k < 0 ? null : `${exit}.gates.${k}`;
    }
    case "finding": {
      const found = findFinding(findings, target);
      return found?.path ?? null;
    }
  }
}

/**
 * The same finding after a reload: by code, stage and message (the path
 * breaking a tie between findings worded alike), else by code, stage and
 * path.
 */
export function findFinding(
  findings: FindingView[],
  target: Extract<Target, { kind: "finding" }>,
): FindingView | undefined {
  const same = (f: FindingView) =>
    f.code === target.code && (f.stage ?? null) === target.stage;
  const worded = findings.filter((f) =>
    same(f) && f.message === target.message
  );
  return worded.find((f) => f.path === target.path) ?? worded[0] ??
    findings.find((f) => same(f) && f.path === target.path);
}

export function findingTarget(f: FindingView): Target {
  return {
    kind: "finding",
    code: f.code,
    stage: f.stage ?? null,
    message: f.message,
    path: f.path,
  };
}

/**
 * The target a document path names: the stage, exit or gate it is in (a
 * path deeper than a gate names the gate), or null for paths outside them.
 */
export function targetAt(
  definition: FactoryDefinition,
  path: string,
): Target | null {
  const [head, i, sub, j, gates, k] = pathSegments(path);
  let stage: string | null;
  let exitsAt: number;
  if (head === "stages" && typeof i === "number") {
    const s = definition.stages[i];
    if (s === undefined) return null;
    stage = s.id;
    if (sub !== "transitions" || typeof j !== "number") {
      return { kind: "stage", stage };
    }
    exitsAt = j;
  } else if (head === "globalTransitions") {
    stage = null;
    if (typeof i !== "number") return { kind: "any" };
    exitsAt = i;
  } else {
    return null;
  }
  const list = stage === null
    ? definition.globalTransitions ?? []
    : definition.stages.find((s) => s.id === stage)?.transitions ?? [];
  const exit = list[exitsAt];
  if (exit === undefined) {
    return stage === null ? { kind: "any" } : { kind: "stage", stage };
  }
  const [g, n] = stage === null ? [sub, j] : [gates, k];
  const gateList = exit.gates ?? [];
  if (g === "gates" && typeof n === "number" && n < gateList.length) {
    return {
      kind: "gate",
      stage,
      exit: exit.name,
      gate: gateIdentity(gateList, n),
    };
  }
  return { kind: "exit", stage, exit: exit.name };
}

/**
 * The selection after a reload: the same target if it is still there, else
 * the stage (or ANY STAGE) it was in, else nothing.
 */
export function follow(
  definition: FactoryDefinition,
  findings: FindingView[],
  target: Target | null,
): Target | null {
  if (target === null) return null;
  if (target.kind === "finding") {
    // The finding as it is now: its path moves when the file does.
    const found = findFinding(findings, target);
    return found === undefined ? null : findingTarget(found);
  }
  if (pathOf(definition, target, findings) !== null) return target;
  if (target.kind === "gate") {
    return follow(definition, findings, {
      kind: "exit",
      stage: target.stage,
      exit: target.exit,
    });
  }
  if (target.kind === "exit") {
    return follow(
      definition,
      findings,
      target.stage === null
        ? { kind: "any" }
        : { kind: "stage", stage: target.stage },
    );
  }
  return null;
}

/** A string equal for equal targets, for comparing and keying. */
export function targetKey(target: Target | null): string {
  return target === null ? "" : JSON.stringify(target);
}

/** The stage (or ANY STAGE) a target is in, if any. */
export function stageOf(target: Target | null): string | null | undefined {
  if (target === null || target.kind === "finding") return undefined;
  if (target.kind === "any") return null;
  return target.stage;
}
