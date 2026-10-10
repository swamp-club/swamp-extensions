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

import type { GraphFinding, GraphReport } from "./graph.ts";
import {
  DEFAULT_MAX_CYCLES,
  DEFAULT_MAX_DISPATCHES,
  DEFAULT_MAX_INTERRUPTIONS,
  type FactoryDefinition,
  type GateSpec,
  type TransitionSpec,
} from "./definition_schema.ts";

// ---------------------------------------------------------------------------
// The design view: what the studio shows of a factory definition, derived
// once from the definition and its graph report. Each transition carries its
// gates in words, whether it is a human stop, and whether it loops back, so
// the studio draws the graph rather than re-deriving it. Pure, and reads no
// clock. See DESIGN.md, "The design view".
// ---------------------------------------------------------------------------

export interface GateView {
  type: GateSpec["type"];
  /** The gate in words. */
  text: string;
  /** A person decides it. */
  human: boolean;
  /** For a human-approval gate with `when`: the condition it applies under. */
  when?: string;
  description?: string;
}

export interface TransitionView {
  name: string;
  /** Document path, as graph findings give it. */
  path: string;
  to: string;
  description?: string;
  manual: boolean;
  gates: GateView[];
  /** Taking it needs a person: manual, or an unconditional human approval. */
  humanStop: boolean;
  /** A human approval that applies only under a condition. */
  conditionalHumanStop: boolean;
  /** It closes a cycle (see loopPaths). Never a global transition. */
  loop: boolean;
}

export interface WorkView {
  mode: string;
  description?: string;
  skills: string[];
  /** The workflow, or model.method, a workflow or method stage calls. */
  call?: string;
  bindings: string[];
  inject: string[];
  resultEvidence?: string;
  systemPrompt?: string;
  command?: string;
  constraints?: string;
}

export interface ProductView {
  kind: "artifact" | "evidence";
  name: string;
  description?: string;
  /** For an artifact: kind findings, and what it reviews. */
  findings?: boolean;
  reviews?: string;
}

export interface StageView {
  id: string;
  description?: string;
  initial: boolean;
  terminal: boolean;
  maxCycles: number;
  maxDispatchesPerCycle: number;
  maxInterruptionsPerCycle: number;
  trackerStatus?: string;
  work?: WorkView;
  products: ProductView[];
  transitions: TransitionView[];
}

export interface FindingView extends GraphFinding {
  severity: "error" | "warning";
}

export interface DesignView {
  /** The factory's name: the definition has none of its own. */
  name: string;
  description?: string;
  digest: string;
  stages: StageView[];
  /** Transitions available from every non-terminal stage. */
  globalTransitions: TransitionView[];
  findings: FindingView[];
}

// --- the view ----------------------------------------------------------------

function quoted(names: string[]): string {
  return names.map((n) => `'${n}'`).join(", ");
}

export function describeGate(gate: GateSpec): GateView {
  const view = (text: string, human = false): GateView => {
    const result: GateView = { type: gate.type, text, human };
    if (gate.description !== undefined) result.description = gate.description;
    return result;
  };
  switch (gate.type) {
    case "artifact-exists":
      return view(`artifact '${gate.config.artifact}' is recorded`);
    case "artifact-fresh":
      return view(
        `artifact '${gate.config.artifact}' reviews the current version of ` +
          "its subject" +
          (gate.config.recordedThisCycle === true
            ? ", and was recorded this cycle"
            : ""),
      );
    case "findings-clear":
      return view(
        `artifact '${gate.config.artifact}' has no ${
          gate.config.blocking.join("/")
        } findings`,
      );
    case "findings-open":
      return view(
        `artifact '${gate.config.artifact}' has an open ${
          gate.config.blocking.join("/")
        } finding`,
      );
    case "human-approval": {
      const n = gate.config.minApprovals ?? 1;
      const result = view(
        `${n} human approval${n === 1 ? "" : "s"} ('${gate.config.id}')`,
        true,
      );
      if (gate.config.when !== undefined) result.when = gate.config.when;
      return result;
    }
    case "evidence-recorded": {
      const parts = [`evidence '${gate.config.name}' is recorded`];
      const fields = Object.keys(gate.config.requireField ?? {});
      if (fields.length > 0) parts.push(`with ${quoted(fields)} set`);
      const matched = Object.keys(gate.config.match ?? {});
      if (matched.length > 0) {
        parts.push(`with ${quoted(matched)} matching a schema`);
      }
      return view(parts.join(" "));
    }
    case "cooldown": {
      const after = gate.config.afterEvidence !== undefined
        ? `evidence '${gate.config.afterEvidence}'`
        : `artifact '${gate.config.afterArtifact}'`;
      return view(`${gate.config.seconds}s have passed since ${after}`);
    }
    case "max-cycles":
      return view(
        `stage '${gate.config.stage}' entered ${
          gate.config.invert === true ? "at least" : "fewer than"
        } ${gate.config.limit} time(s)`,
      );
    case "cel":
      return view(
        `cel: ${gate.config.expr}` +
          (gate.config.message !== undefined
            ? ` (${gate.config.message})`
            : ""),
      );
  }
}

function transitionView(t: TransitionSpec, path: string): TransitionView {
  const gates = (t.gates ?? []).map(describeGate);
  const manual = t.manual === true;
  const view: TransitionView = {
    name: t.name,
    path,
    to: t.to,
    manual,
    gates,
    humanStop: manual || gates.some((g) => g.human && g.when === undefined),
    conditionalHumanStop: gates.some((g) => g.human && g.when !== undefined),
    loop: false,
  };
  if (t.description !== undefined) view.description = t.description;
  return view;
}

/**
 * The document paths of transitions that close a cycle: a depth-first walk
 * along stage transitions (not global ones), from the initial stage and then
 * from any stage it never reached, in document order, meets their target on
 * its current path. Leaving them out leaves a graph with no cycles in which
 * every stage keeps the edge the walk entered it by.
 */
function loopPaths(definition: FactoryDefinition): Set<string> {
  const index = new Map(definition.stages.map((s, i) => [s.id, i]));
  const loops = new Set<string>();
  const done = new Set<number>();
  const onPath = new Set<number>();
  const walk = (i: number) => {
    onPath.add(i);
    (definition.stages[i].transitions ?? []).forEach((t, k) => {
      const to = index.get(t.to);
      if (to === undefined) return;
      if (onPath.has(to)) loops.add(`stages.${i}.transitions.${k}`);
      else if (!done.has(to)) walk(to);
    });
    onPath.delete(i);
    done.add(i);
  };
  const initial = definition.stages.findIndex((s) => s.initial === true);
  if (initial >= 0) walk(initial);
  definition.stages.forEach((_, i) => {
    if (!done.has(i)) walk(i);
  });
  return loops;
}

/** Everything the studio shows, derived from the factory definition and its
 * report. */
export function designView(
  factory: string,
  definition: FactoryDefinition,
  report: GraphReport,
  digest: string,
): DesignView {
  const loops = loopPaths(definition);
  const stages = definition.stages.map((s, i): StageView => {
    const view: StageView = {
      id: s.id,
      initial: s.initial === true,
      terminal: s.terminal === true,
      maxCycles: s.maxCycles ?? DEFAULT_MAX_CYCLES,
      maxDispatchesPerCycle: s.maxDispatchesPerCycle ??
        DEFAULT_MAX_DISPATCHES,
      maxInterruptionsPerCycle: s.maxInterruptionsPerCycle ??
        DEFAULT_MAX_INTERRUPTIONS,
      products: [
        ...(s.artifacts ?? []).map((a): ProductView => {
          const p: ProductView = { kind: "artifact", name: a.name };
          if (a.description !== undefined) p.description = a.description;
          if (a.kind === "findings") p.findings = true;
          if (a.reviews !== undefined) p.reviews = a.reviews;
          return p;
        }),
        ...(s.evidence ?? []).map((e): ProductView => {
          const p: ProductView = { kind: "evidence", name: e.name };
          if (e.description !== undefined) p.description = e.description;
          return p;
        }),
      ],
      transitions: (s.transitions ?? []).map((t, k) => {
        const view = transitionView(t, `stages.${i}.transitions.${k}`);
        view.loop = loops.has(view.path);
        return view;
      }),
    };
    if (s.description !== undefined) view.description = s.description;
    if (s.tracker?.status !== undefined) {
      view.trackerStatus = s.tracker.status;
    }
    if (s.work !== undefined) {
      const w = s.work;
      const work: WorkView = {
        mode: w.mode,
        skills: w.skills ?? [],
        bindings: Object.keys(w.bindings ?? {}),
        inject: w.context?.inject ?? [],
      };
      if (w.workflow !== undefined) work.call = w.workflow.name;
      if (w.method !== undefined) {
        work.call = `${w.method.modelIdOrName}.${w.method.methodName}`;
      }
      if (w.resultEvidence !== undefined) {
        work.resultEvidence = w.resultEvidence;
      }
      if (w.description !== undefined) work.description = w.description;
      if (w.systemPrompt !== undefined) work.systemPrompt = w.systemPrompt;
      if (w.command !== undefined) work.command = w.command;
      if (w.constraints !== undefined) work.constraints = w.constraints;
      view.work = work;
    }
    return view;
  });
  const globalTransitions = (definition.globalTransitions ?? []).map((t, k) =>
    transitionView(t, `globalTransitions.${k}`)
  );
  const findings: FindingView[] = [
    ...report.errors.map((f): FindingView => ({ ...f, severity: "error" })),
    ...report.warnings.map((f): FindingView => ({ ...f, severity: "warning" })),
  ];
  const view: DesignView = {
    name: factory,
    digest,
    stages,
    globalTransitions,
    findings,
  };
  if (definition.description !== undefined) {
    view.description = definition.description;
  }
  return view;
}
