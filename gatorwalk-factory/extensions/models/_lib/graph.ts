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

import { canonicalJson, fieldAt, type Json } from "./canonical.ts";
import {
  type GateSpec,
  type Lifecycle,
  maxCyclesFor,
  type StageSpec,
  type TransitionSpec,
} from "./lifecycle_schema.ts";

// ---------------------------------------------------------------------------
// Graph analysis of a parsed lifecycle: the design problems a work item would
// otherwise hit at run time. The schema (lifecycle_schema.ts)
// has already checked shape and references, so every name here resolves.
//
// Two explorations of abstract run states, both breadth-first so each state
// keeps its shortest trace from the initial stage:
//
// - The structural pass explores (stage, set of stages entered). Cycle limits
//   and max-cycles gates are ignored, since a person can always grant a cycle
//   override. What a gate can see depends only on which stages were entered,
//   so every structural finding comes from this pass.
// - The count pass explores (stage, entries per stage) under each stage's
//   cycle limit with no overrides. It only finds transitions that can be taken
//   after an override and never without one.
//
// human-approval and cel gates are unknowns, so they are assumed passable. A
// human-approval gate with `when` may not apply, so it is not a person
// choosing between exits. See DESIGN.md, "Graph validation".
// ---------------------------------------------------------------------------

export type FindingCode =
  | "unreachable-stage"
  | "dead-end"
  | "gate-never-passes"
  | "ambiguous-exit"
  | "escape-only"
  | "default-cycle-bound"
  | "product-missing-on-path"
  | "needs-cycle-override"
  | "exploration-truncated";

export interface GraphFinding {
  code: FindingCode;
  /** Document path, formatted like the schema's errors (`stages.2.transitions.0`). */
  path: string;
  /** The stage the finding is judged from, when there is one. */
  stage?: string;
  message: string;
  /** Stage ids from the initial stage to where the problem shows. */
  trace?: string[];
}

export interface GraphReport {
  errors: GraphFinding[];
  warnings: GraphFinding[];
  statesExplored: { structural: number; counts: number };
  truncated: boolean;
}

export interface AnalyzeOptions {
  /** States each pass may explore before giving up (default 100000). */
  maxStates?: number;
  /**
   * Prune dominated states in the count pass (default true). Tests switch it
   * off to compare with the full exploration; it is not a user setting.
   */
  pruneCounts?: boolean;
}

export const DEFAULT_MAX_STATES = 100_000;

/** A finding as one line: `path (from stage 's'): message`. */
export function formatFinding(finding: GraphFinding): string {
  const from = finding.stage !== undefined
    ? ` (from stage '${finding.stage}')`
    : "";
  return `${finding.path}${from}: ${finding.message}`;
}

type Path = (string | number)[];

interface Edge {
  /** Index into Graph.edges. */
  id: number;
  from: string;
  transition: TransitionSpec;
  path: Path;
  global: boolean;
  /** Target stage. */
  to: string;
  /** Why the transition's own requirements can never all hold, or null. */
  contradiction: string | null;
}

interface Graph {
  stages: Map<string, StageSpec>;
  stageIndex: Map<string, number>;
  initial: string;
  edges: Edge[];
  outgoing: Map<string, Edge[]>;
  artifactProducers: Map<string, Set<string>>;
  evidenceProducers: Map<string, Set<string>>;
  /** Artifact name -> the artifact it reviews. */
  reviews: Map<string, string>;
}

function buildGraph(doc: Lifecycle): Graph {
  const stages = new Map<string, StageSpec>();
  const stageIndex = new Map<string, number>();
  const artifactProducers = new Map<string, Set<string>>();
  const evidenceProducers = new Map<string, Set<string>>();
  const reviews = new Map<string, string>();
  const add = (map: Map<string, Set<string>>, name: string, stage: string) =>
    map.set(name, (map.get(name) ?? new Set()).add(stage));
  doc.stages.forEach((stage, i) => {
    stages.set(stage.id, stage);
    stageIndex.set(stage.id, i);
    for (const spec of stage.artifacts ?? []) {
      add(artifactProducers, spec.name, stage.id);
      if (spec.reviews !== undefined) reviews.set(spec.name, spec.reviews);
    }
    for (const spec of stage.evidence ?? []) {
      add(evidenceProducers, spec.name, stage.id);
    }
    if (stage.work?.resultEvidence !== undefined) {
      add(evidenceProducers, stage.work.resultEvidence, stage.id);
    }
  });
  const globals = doc.globalTransitions ?? [];
  const edges: Edge[] = [];
  const outgoing = new Map<string, Edge[]>();
  doc.stages.forEach((stage, i) => {
    const out: Edge[] = [];
    if (stage.terminal !== true) {
      const push = (
        transition: TransitionSpec,
        path: Path,
        global: boolean,
      ) => {
        const edge: Edge = {
          id: edges.length,
          from: stage.id,
          transition,
          path,
          global,
          to: transition.to,
          contradiction: contradiction(transition),
        };
        edges.push(edge);
        out.push(edge);
      };
      (stage.transitions ?? []).forEach((t, j) =>
        push(t, ["stages", i, "transitions", j], false)
      );
      globals.forEach((t, k) => push(t, ["globalTransitions", k], true));
    }
    outgoing.set(stage.id, out);
  });
  const initial = doc.stages.find((s) => s.initial === true);
  if (initial === undefined) {
    throw new Error("the document has no initial stage (it was not parsed)");
  }
  return {
    stages,
    stageIndex,
    initial: initial.id,
    edges,
    outgoing,
    artifactProducers,
    evidenceProducers,
    reviews,
  };
}

// --- gates, judged on the stages entered ------------------------------------

type ProductKind = "artifact" | "evidence";

function available(
  g: Graph,
  kind: ProductKind,
  name: string,
  entered: ReadonlySet<string>,
): boolean {
  const producers = kind === "artifact"
    ? g.artifactProducers
    : g.evidenceProducers;
  for (const stage of producers.get(name) ?? []) {
    if (entered.has(stage)) return true;
  }
  return false;
}

function declares(
  g: Graph,
  kind: ProductKind,
  name: string,
  stage: string,
): boolean {
  const producers = kind === "artifact"
    ? g.artifactProducers
    : g.evidenceProducers;
  return producers.get(name)?.has(stage) === true;
}

/** Products a gate reads that earlier stages on the path must produce. */
function pathProducts(g: Graph, gate: GateSpec): [ProductKind, string][] {
  switch (gate.type) {
    case "artifact-exists":
    case "findings-clear":
    case "findings-open":
      return [["artifact", gate.config.artifact]];
    case "artifact-fresh": {
      const subject = g.reviews.get(gate.config.artifact);
      const products: [ProductKind, string][] = [[
        "artifact",
        gate.config.artifact,
      ]];
      if (subject !== undefined) products.push(["artifact", subject]);
      return products;
    }
    case "cooldown":
      return gate.config.afterEvidence !== undefined
        ? [["evidence", gate.config.afterEvidence]]
        : gate.config.afterArtifact !== undefined
        ? [["artifact", gate.config.afterArtifact]]
        : [];
    default:
      return [];
  }
}

/**
 * Why a gate cannot pass in `stage` having entered `entered`, or null if it
 * might. Counts play no part: max-cycles is the count pass's business.
 */
function structuralBlocker(
  g: Graph,
  gate: GateSpec,
  stage: string,
  entered: ReadonlySet<string>,
): string | null {
  // gates.ts accepts only evidence recorded in the current stage and cycle.
  if (
    gate.type === "evidence-recorded" &&
    !declares(g, "evidence", gate.config.name, stage)
  ) {
    return `evidence-recorded on '${gate.config.name}', which stage '${stage}' does not record ` +
      "(the gate only accepts evidence from the current stage and cycle)";
  }
  if (
    gate.type === "artifact-fresh" && gate.config.recordedThisCycle === true &&
    !declares(g, "artifact", gate.config.artifact, stage)
  ) {
    return `artifact-fresh with recordedThisCycle on '${gate.config.artifact}', which stage '${stage}' does not declare`;
  }
  for (const [kind, name] of pathProducts(g, gate)) {
    if (!available(g, kind, name, entered)) {
      return `${gate.type} needs ${kind} '${name}', which no stage entered before this point produces`;
    }
  }
  return null;
}

function edgeBlockers(
  g: Graph,
  edge: Edge,
  entered: ReadonlySet<string>,
): string[] {
  const reasons = (edge.transition.gates ?? []).flatMap((gate) => {
    const reason = structuralBlocker(g, gate, edge.from, entered);
    return reason === null ? [] : [reason];
  });
  return edge.contradiction === null
    ? reasons
    : [edge.contradiction, ...reasons];
}

// --- requireField and match, read as field paths ----------------------------

/**
 * What an evidence-recorded gate demands of the value at one field path, as
 * far as the analysis can tell: one of a set of values, or none of them.
 * Anything a fragment says beyond this is not modelled, so it can only make
 * the real demand narrower, never turn a proven conflict into a false one.
 */
interface Constraint {
  path: string[];
  kind: "in" | "not-in";
  values: Json[];
  /** For the finding: what the gate asks, as written. */
  text: string;
}

type EvidenceGateConfig = Extract<
  GateSpec,
  { type: "evidence-recorded" }
>["config"];

function constraintsOf(config: EvidenceGateConfig): Constraint[] {
  const out: Constraint[] = [];
  for (const [key, value] of Object.entries(config.requireField ?? {})) {
    out.push({
      path: key.split("."),
      kind: "in",
      values: [value as Json],
      text: `'${key}' to be ${JSON.stringify(value)}`,
    });
  }
  for (const [key, schema] of Object.entries(config.match ?? {})) {
    const read = readFragment(schema);
    if (read === null) continue;
    out.push({
      path: key.split("."),
      ...read,
      text: `'${key}' to match ${JSON.stringify(schema)}`,
    });
  }
  return out;
}

/**
 * The set a fragment confines a value to: its own const and enum (both, when
 * both are there), false as the empty set, and a not holding only a const or
 * enum as the values excluded. Null when the fragment says neither.
 */
function readFragment(
  schema: boolean | Record<string, unknown>,
): Pick<Constraint, "kind" | "values"> | null {
  if (schema === false) return { kind: "in", values: [] };
  if (schema === true) return null;
  const own = allowedValues(schema);
  if (own !== null) return { kind: "in", values: own };
  const not = schema.not;
  // Inside a not, any other keyword narrows what is excluded, so only a not
  // of nothing but const, enum and annotations excludes all of their values.
  if (
    not !== null && typeof not === "object" && !Array.isArray(not) &&
    Object.keys(not).every((k) =>
      k === "const" || k === "enum" || ANNOTATIONS.has(k) || k.startsWith("x-")
    )
  ) {
    const excluded = allowedValues(not as Record<string, unknown>);
    if (excluded !== null) return { kind: "not-in", values: excluded };
  }
  return null;
}

/** Keywords that never change what a schema accepts. */
const ANNOTATIONS = new Set([
  "title",
  "description",
  "$comment",
  "default",
  "examples",
  "deprecated",
  "readOnly",
  "writeOnly",
]);

function allowedValues(schema: Record<string, unknown>): Json[] | null {
  let values: Json[] | null = null;
  if (Object.hasOwn(schema, "const")) values = [schema.const as Json];
  if (Array.isArray(schema.enum)) {
    const listed = new Set(schema.enum.map((v) => canonicalJson(v as Json)));
    values = (values ?? (schema.enum as Json[])).filter((v) =>
      listed.has(canonicalJson(v))
    );
  }
  return values;
}

/**
 * The first pair of constraints, one from each list, that no single payload
 * can satisfy, or null. Paths are read with fieldAt as gates.ts reads them:
 * a set of values required at a path above another is narrowed to what each
 * holds at the lower path (a value without it cannot pass there, since a
 * missing field fails). By segment, not by string: 'ab' is not above 'a.b'.
 */
function constraintConflict(
  left: Constraint[],
  right: Constraint[],
): string | null {
  for (const l of left) {
    for (const r of right) {
      if (conflicts(l, r)) return `${l.text} and ${r.text}`;
    }
  }
  return null;
}

function conflicts(a: Constraint, b: Constraint): boolean {
  const [short, long] = a.path.length <= b.path.length ? [a, b] : [b, a];
  if (!short.path.every((segment, i) => long.path[i] === segment)) {
    return false;
  }
  const rest = long.path.slice(short.path.length).join(".");
  let upper = short;
  if (rest !== "") {
    // Excluding whole values above says nothing definite about a field below.
    if (short.kind !== "in") return false;
    upper = {
      ...short,
      values: short.values.flatMap((v) => {
        const held = fieldAt(v, rest);
        return held === undefined ? [] : [held];
      }),
    };
  }
  const [x, y] = upper.kind === "in" ? [upper, long] : [long, upper];
  if (x.kind !== "in") return false; // two exclusions can always both hold
  const other = new Set(y.values.map(canonicalJson));
  return y.kind === "in"
    ? !x.values.some((v) => other.has(canonicalJson(v)))
    : x.values.every((v) => other.has(canonicalJson(v)));
}

/**
 * Why a transition's evidence-recorded gates can never all pass together, or
 * null. gates.ts evaluates every gate of a transition against one context, so
 * gates on the same evidence read the same payload.
 */
function contradiction(transition: TransitionSpec): string | null {
  const byEvidence = new Map<string, Constraint[]>();
  for (const gate of transition.gates ?? []) {
    if (gate.type !== "evidence-recorded") continue;
    const all = byEvidence.get(gate.config.name) ?? [];
    all.push(...constraintsOf(gate.config));
    byEvidence.set(gate.config.name, all);
  }
  for (const [name, all] of byEvidence) {
    for (let i = 0; i < all.length; i++) {
      const conflict = constraintConflict([all[i]], all.slice(i));
      if (conflict !== null) {
        return `evidence-recorded on '${name}' requires ${conflict}, which no payload can hold`;
      }
    }
  }
  return null;
}

// --- breadth-first exploration ----------------------------------------------

interface Node<S> {
  stage: string;
  state: S;
  parent: number;
}

function traceOf<S>(nodes: Node<S>[], index: number): string[] {
  const trace: string[] = [];
  for (let i = index; i >= 0; i = nodes[i].parent) trace.push(nodes[i].stage);
  return trace.reverse();
}

interface StructuralResult {
  nodes: Node<ReadonlySet<string>>[];
  truncated: boolean;
  reached: Map<string, number>;
  /** Edge id -> first node where it is possibly enabled. */
  live: Map<number, number>;
  /** Edge id -> blockers seen from the node with the most stages entered. */
  blocked: Map<number, { node: number; reasons: string[] }>;
}

function exploreStructure(g: Graph, maxStates: number): StructuralResult {
  const nodes: Node<ReadonlySet<string>>[] = [];
  const seen = new Set<string>();
  const order = [...g.stages.keys()];
  const keyOf = (stage: string, entered: ReadonlySet<string>) =>
    `${stage}|${order.map((s) => (entered.has(s) ? "1" : "0")).join("")}`;
  const reached = new Map<string, number>();
  const live = new Map<number, number>();
  const blocked = new Map<number, { node: number; reasons: string[] }>();
  let truncated = false;
  const visit = (
    stage: string,
    entered: ReadonlySet<string>,
    parent: number,
  ) => {
    const key = keyOf(stage, entered);
    if (seen.has(key)) return;
    if (nodes.length >= maxStates) {
      truncated = true;
      return;
    }
    seen.add(key);
    nodes.push({ stage, state: entered, parent });
    if (!reached.has(stage)) reached.set(stage, nodes.length - 1);
  };
  visit(g.initial, new Set([g.initial]), -1);
  for (let i = 0; i < nodes.length; i++) {
    const { stage, state: entered } = nodes[i];
    for (const edge of g.outgoing.get(stage) ?? []) {
      const reasons = edgeBlockers(g, edge, entered);
      if (reasons.length > 0) {
        const prior = blocked.get(edge.id);
        if (
          prior === undefined || nodes[prior.node].state.size < entered.size
        ) {
          blocked.set(edge.id, { node: i, reasons });
        }
        continue;
      }
      if (!live.has(edge.id)) live.set(edge.id, i);
      visit(edge.to, new Set([...entered, edge.to]), i);
    }
  }
  return { nodes, truncated, reached, live, blocked };
}

interface CountResult {
  states: number;
  truncated: boolean;
  /** Stages entered without any cycle override. */
  reached: Set<string>;
  enabled: Set<number>;
  /**
   * Edge id -> why it was refused, from the refusing state with the fewest
   * entries (ties broken by state key), so pruning never changes it.
   */
  refused: Map<number, string>;
}

/**
 * The count pass. With `prune`, a state is dropped when a kept state has the
 * same stage, the same stages entered, and no more entries into any stage: every
 * transition open to the new state is open to the kept one (see countRefusal),
 * so it can discover nothing new. Stages an inverted max-cycles gate counts are
 * compared exactly instead, since more entries can open that gate. Every
 * transition adds one entry, so the search always reaches a dominating state
 * (fewer entries in total) before the states it dominates.
 */
function exploreCounts(
  g: Graph,
  maxStates: number,
  prune: boolean,
): CountResult {
  const order = [...g.stages.keys()];
  const index = new Map(order.map((s, i) => [s, i]));
  const exact = new Set<number>();
  for (const edge of g.edges) {
    for (const gate of edge.transition.gates ?? []) {
      if (gate.type === "max-cycles" && gate.config.invert === true) {
        exact.add(index.get(gate.config.stage) as number);
      }
    }
  }
  const queue: { stage: string; counts: number[] }[] = [];
  const seen = new Set<string>();
  /** Class key -> the count vectors kept in it. */
  const kept = new Map<string, number[][]>();
  const enabled = new Set<number>();
  const refused = new Map<
    number,
    { total: number; key: string; reason: string }
  >();
  const reached = new Set<string>();
  let truncated = false;
  const visit = (stage: string, counts: number[]) => {
    const key = `${stage}|${counts.join(",")}`;
    if (seen.has(key)) return;
    const classKey = `${stage}|${
      counts.map((c, k) => (exact.has(k) ? `=${c}` : c > 0 ? "1" : "0"))
        .join(",")
    }`;
    const same = kept.get(classKey) ?? [];
    if (prune && same.some((o) => o.every((c, k) => c <= counts[k]))) return;
    if (seen.size >= maxStates) {
      truncated = true;
      return;
    }
    seen.add(key);
    same.push(counts);
    kept.set(classKey, same);
    reached.add(stage);
    queue.push({ stage, counts });
  };
  const start = order.map((s) => (s === g.initial ? 1 : 0));
  visit(g.initial, start);
  for (let i = 0; i < queue.length; i++) {
    const { stage, counts } = queue[i];
    const entered = new Set(order.filter((_, k) => counts[k] > 0));
    for (const edge of g.outgoing.get(stage) ?? []) {
      if (edgeBlockers(g, edge, entered).length > 0) continue;
      const refusal = countRefusal(g, edge, counts, index);
      if (refusal !== null) {
        const total = counts.reduce((a, b) => a + b, 0);
        const key = `${stage}|${counts.join(",")}`;
        const prior = refused.get(edge.id);
        if (
          prior === undefined || total < prior.total ||
          (total === prior.total && key < prior.key)
        ) {
          refused.set(edge.id, { total, key, reason: refusal });
        }
        continue;
      }
      enabled.add(edge.id);
      const next = [...counts];
      next[index.get(edge.to) as number]++;
      visit(edge.to, next);
    }
  }
  return {
    states: seen.size,
    truncated,
    reached,
    enabled,
    refused: new Map([...refused].map(([id, r]) => [id, r.reason])),
  };
}

/**
 * Why the counts refuse an edge: a max-cycles gate or the target's limit.
 *
 * Pruning in exploreCounts relies on this being monotone: fewer entries into a
 * stage never refuse an edge that more entries allow, except for stages an
 * inverted max-cycles gate counts, which are tracked exactly. A new rule that
 * reads the counts another way must keep that, or change the pruning.
 */
function countRefusal(
  g: Graph,
  edge: Edge,
  counts: number[],
  index: Map<string, number>,
): string | null {
  for (const gate of edge.transition.gates ?? []) {
    if (gate.type !== "max-cycles") continue;
    // The same comparison as gates.ts.
    const entries = counts[index.get(gate.config.stage) as number];
    const under = entries < gate.config.limit;
    if (under !== (gate.config.invert !== true)) {
      return `max-cycles on '${gate.config.stage}' (limit ${gate.config.limit}${
        gate.config.invert === true ? ", inverted" : ""
      }) never passes within the stages' cycle limits`;
    }
  }
  // Global transitions are escape hatches the cycle limit never closes
  // (run_ops.ts cycleLimitFor).
  if (edge.global) return null;
  const target = g.stages.get(edge.to) as StageSpec;
  if (counts[index.get(edge.to) as number] + 1 > maxCyclesFor(target)) {
    return `stage '${edge.to}' is always at its cycle limit (${
      maxCyclesFor(target)
    }) by the time this transition could be taken`;
  }
  return null;
}

// --- findings ----------------------------------------------------------------

function formatPath(path: Path): string {
  return path.length > 0 ? path.join(".") : "(root)";
}

function comparePaths(a: Path, b: Path): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = a[i];
    const y = b[i];
    if (x === y) continue;
    if (typeof x === "number" && typeof y === "number") return x - y;
    return String(x) < String(y) ? -1 : 1;
  }
  return a.length - b.length;
}

function describe(edge: Edge): string {
  return `${
    edge.global ? "global transition" : "transition"
  } '${edge.transition.name}' (to '${edge.to}')`;
}

/**
 * A person chooses, so propulsion never has to guess (DESIGN.md). A
 * conditional approval does not count: while its `when` is false no one is
 * asked.
 */
function personChooses(t: TransitionSpec): boolean {
  return t.manual === true ||
    (t.gates ?? []).some((gate) =>
      gate.type === "human-approval" && gate.config.when === undefined
    );
}

/** Whether two sibling transitions can never both pass. */
function exclusive(a: TransitionSpec, b: TransitionSpec): boolean {
  for (const x of a.gates ?? []) {
    for (const y of b.gates ?? []) {
      if (
        x.type === "evidence-recorded" && y.type === "evidence-recorded" &&
        x.config.name === y.config.name
      ) {
        const conflict = constraintConflict(
          constraintsOf(x.config),
          constraintsOf(y.config),
        );
        if (conflict !== null) return true;
      }
      // An open finding at a severity findings-clear also blocks on fails
      // findings-clear.
      for (const [clear, open] of [[x, y], [y, x]]) {
        if (
          clear.type === "findings-clear" && open.type === "findings-open" &&
          clear.config.artifact === open.config.artifact &&
          open.config.blocking.every((s) => clear.config.blocking.includes(s))
        ) {
          return true;
        }
      }
      if (
        x.type === "max-cycles" && y.type === "max-cycles" &&
        x.config.stage === y.config.stage &&
        x.config.limit === y.config.limit &&
        (x.config.invert === true) !== (y.config.invert === true)
      ) {
        return true;
      }
    }
  }
  return false;
}

/** The findings artifact that one sibling gates with findings-clear and the
 * other with findings-open on severities findings-clear does not block on. */
function findingsMismatch(
  a: TransitionSpec,
  b: TransitionSpec,
): string | undefined {
  for (const [x, y] of [[a, b], [b, a]]) {
    for (const clear of x.gates ?? []) {
      if (clear.type !== "findings-clear") continue;
      for (const open of y.gates ?? []) {
        if (
          open.type === "findings-open" &&
          open.config.artifact === clear.config.artifact &&
          !open.config.blocking.every((s) => clear.config.blocking.includes(s))
        ) {
          return clear.config.artifact;
        }
      }
    }
  }
  return undefined;
}

/** Strongly connected components (Tarjan), over the given adjacency. */
function components(
  nodes: string[],
  next: (stage: string) => string[],
): string[][] {
  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const out: string[][] = [];
  let counter = 0;
  const connect = (v: string) => {
    index.set(v, counter);
    low.set(v, counter);
    counter++;
    stack.push(v);
    onStack.add(v);
    for (const w of next(v)) {
      if (!index.has(w)) {
        connect(w);
        low.set(v, Math.min(low.get(v) as number, low.get(w) as number));
      } else if (onStack.has(w)) {
        low.set(v, Math.min(low.get(v) as number, index.get(w) as number));
      }
    }
    if (low.get(v) === index.get(v)) {
      const component: string[] = [];
      let w: string;
      do {
        w = stack.pop() as string;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      out.push(component);
    }
  };
  for (const v of nodes) if (!index.has(v)) connect(v);
  return out;
}

/**
 * Analyse a parsed lifecycle. Errors are problems a work item will hit;
 * warnings are designs worth a second look.
 */
export function analyzeLifecycle(
  doc: Lifecycle,
  options: AnalyzeOptions = {},
): GraphReport {
  const maxStates = options.maxStates ?? DEFAULT_MAX_STATES;
  const g = buildGraph(doc);
  const structure = exploreStructure(g, maxStates);
  const counts = exploreCounts(g, maxStates, options.pruneCounts !== false);
  const errors: { finding: GraphFinding; path: Path }[] = [];
  const warnings: { finding: GraphFinding; path: Path }[] = [];
  const incomplete = structure.truncated
    ? " (the exploration was incomplete, so this may be wrong)"
    : "";
  // Conclusions that rest on having seen every state are errors only when
  // the structural pass finished.
  const complete = structure.truncated ? warnings : errors;
  const report = (
    to: { finding: GraphFinding; path: Path }[],
    code: FindingCode,
    path: Path,
    message: string,
    extra: { stage?: string; trace?: string[] } = {},
  ) =>
    to.push({
      path,
      finding: { code, path: formatPath(path), ...extra, message },
    });
  const trace = (node: number) => traceOf(structure.nodes, node);
  const stagePath = (id: string): Path => [
    "stages",
    g.stageIndex.get(id) as number,
  ];
  const reachedTrace = (id: string) =>
    trace(structure.reached.get(id) as number);

  // Live edges between stages.
  const liveEdges = g.edges.filter((e) => structure.live.has(e.id));
  const liveTargets = (stage: string, withGlobals: boolean) =>
    liveEdges.filter((e) => e.from === stage && (withGlobals || !e.global)).map(
      (e) => e.to,
    );

  // Stages that can finish: reach a terminal stage over live edges.
  const finishers = (withGlobals: boolean): Set<string> => {
    const done = new Set<string>();
    for (const [id, stage] of g.stages) {
      if (stage.terminal === true) done.add(id);
    }
    let changed = true;
    while (changed) {
      changed = false;
      for (const e of liveEdges) {
        if (withGlobals || !e.global) {
          if (done.has(e.to) && !done.has(e.from)) {
            done.add(e.from);
            changed = true;
          }
        }
      }
    }
    return done;
  };
  const canFinish = finishers(true);
  const canFinishAlone = finishers(false);

  for (const [id, stage] of g.stages) {
    if (!structure.reached.has(id)) {
      report(
        complete,
        "unreachable-stage",
        stagePath(id),
        `stage '${id}' can never be entered from initial stage '${g.initial}'${incomplete}`,
        { stage: id },
      );
      continue;
    }
    if (stage.terminal !== true && !canFinish.has(id)) {
      report(
        complete,
        "dead-end",
        stagePath(id),
        `no transition that can pass leads from stage '${id}' to a terminal stage${incomplete}`,
        { stage: id, trace: reachedTrace(id) },
      );
    }
  }

  // Transitions that can never pass, judged from each stage they leave.
  for (const edge of g.edges) {
    if (!structure.reached.has(edge.from) || structure.live.has(edge.id)) {
      continue;
    }
    const blocked = structure.blocked.get(edge.id);
    const reasons = blocked?.reasons ?? [];
    report(
      complete,
      "gate-never-passes",
      edge.path,
      `${describe(edge)} can never pass from stage '${edge.from}': ${
        reasons.join("; ")
      }${incomplete}`,
      {
        stage: edge.from,
        ...(blocked !== undefined ? { trace: trace(blocked.node) } : {}),
      },
    );
  }

  // Ambiguous exits, by the propulsion rule.
  for (const [id] of g.stages) {
    if (!structure.reached.has(id)) continue;
    const siblings = (g.outgoing.get(id) ?? []).filter((e) =>
      structure.live.has(e.id) && !personChooses(e.transition)
    );
    for (let i = 0; i < siblings.length; i++) {
      for (let j = i + 1; j < siblings.length; j++) {
        const a = siblings[i];
        const b = siblings[j];
        if (a.to === b.to || exclusive(a.transition, b.transition)) continue;
        const cel = [a, b].some((e) =>
          (e.transition.gates ?? []).some((gate) => gate.type === "cel")
        );
        const severities = findingsMismatch(a.transition, b.transition);
        report(
          warnings,
          "ambiguous-exit",
          a.path,
          `${describe(a)} and ${
            describe(b)
          } from stage '${id}' can both pass with no person choosing between them` +
            (cel ? "; their cel gates could not be compared" : "") +
            (severities !== undefined
              ? `; findings-open on '${severities}' counts severities its ` +
                "findings-clear does not block on, so both can pass"
              : "") +
            "; make one manual, give it a human-approval gate without when, or make their gates exclusive",
          { stage: id, trace: reachedTrace(id) },
        );
      }
    }
  }

  // Loops, over the live graph without global transitions.
  const reachedIds = [...g.stages.keys()].filter((id) =>
    structure.reached.has(id)
  );
  const inLoop = new Set<string>();
  for (
    const component of components(reachedIds, (s) => liveTargets(s, false))
  ) {
    const members = new Set(component);
    const sorted = component.sort((x, y) =>
      (g.stageIndex.get(x) as number) - (g.stageIndex.get(y) as number)
    );
    const first = sorted[0];
    const names = sorted.map((s) => `'${s}'`).join(", ");
    const loopEdges = liveEdges.filter((e) =>
      !e.global && members.has(e.from) && members.has(e.to)
    );
    if (loopEdges.length === 0) continue;
    for (const s of sorted) inLoop.add(s);
    if (
      sorted.every((s) => canFinish.has(s)) &&
      !sorted.some((s) => canFinishAlone.has(s))
    ) {
      report(
        warnings,
        "escape-only",
        stagePath(first),
        `the loop through ${names} reaches a terminal stage only through a global transition`,
        { stage: first, trace: reachedTrace(first) },
      );
    }
    const bounded = sorted.some((s) =>
      g.stages.get(s)?.maxCycles !== undefined
    ) ||
      loopEdges.some((e) =>
        (e.transition.gates ?? []).some((gate) => gate.type === "max-cycles")
      );
    if (!bounded) {
      report(
        warnings,
        "default-cycle-bound",
        stagePath(first),
        `the loop through ${names} is bounded only by the default cycle limit; set maxCycles on one of its stages or gate it with max-cycles`,
        { stage: first, trace: reachedTrace(first) },
      );
    }
  }
  // A stage outside any loop whose only way to finish is a global transition.
  for (const id of reachedIds) {
    const stage = g.stages.get(id) as StageSpec;
    if (
      stage.terminal === true || canFinishAlone.has(id) ||
      !canFinish.has(id) || inLoop.has(id)
    ) {
      continue;
    }
    report(
      warnings,
      "escape-only",
      stagePath(id),
      `stage '${id}' reaches a terminal stage only through a global transition`,
      { stage: id, trace: reachedTrace(id) },
    );
  }

  // Products a stage reads that one path to it produces and another does not.
  // A gate no path satisfies is already gate-never-passes; an inject no path
  // satisfies is reported here too.
  const refsOf = (id: string) => {
    const stage = g.stages.get(id) as StageSpec;
    const index = g.stageIndex.get(id) as number;
    const refs: {
      path: Path;
      kind: ProductKind;
      name: string;
      what: string;
      gate: boolean;
    }[] = [];
    (stage.work?.context?.inject ?? []).forEach((name, j) => {
      const kind: ProductKind = g.artifactProducers.has(name)
        ? "artifact"
        : "evidence";
      refs.push({
        path: ["stages", index, "work", "context", "inject", j],
        kind,
        name,
        what: "injects",
        gate: false,
      });
    });
    (stage.transitions ?? []).forEach((t, j) =>
      (t.gates ?? []).forEach((gate, k) => {
        for (const [kind, name] of pathProducts(g, gate)) {
          refs.push({
            path: ["stages", index, "transitions", j, "gates", k],
            kind,
            name,
            what: `transition '${t.name}' (${gate.type}) needs`,
            gate: true,
          });
        }
      })
    );
    return refs;
  };
  for (const id of reachedIds) {
    const visits = structure.nodes.flatMap((node, i) =>
      node.stage === id ? [i] : []
    );
    for (const ref of refsOf(id)) {
      const lacking = visits.find((i) =>
        !available(g, ref.kind, ref.name, structure.nodes[i].state)
      );
      if (lacking === undefined) continue;
      const someHave = visits.some((i) =>
        available(g, ref.kind, ref.name, structure.nodes[i].state)
      );
      if (ref.gate && !someHave) continue;
      report(
        warnings,
        "product-missing-on-path",
        ref.path,
        `stage '${id}' ${ref.what} ${ref.kind} '${ref.name}', which ${
          someHave ? "this path to it does not" : "no path to it"
        } produce${someHave ? "" : "s"}`,
        { stage: id, trace: trace(lacking) },
      );
    }
  }

  // Transitions that only a cycle override opens.
  if (counts.truncated) {
    report(
      warnings,
      "exploration-truncated",
      [],
      `the count pass stopped at ${maxStates} states, so transitions that need a cycle override were not checked`,
    );
  } else {
    for (const edge of g.edges) {
      // A stage that only an override reaches is the finding on the way in,
      // not on every transition out of it.
      if (
        !structure.live.has(edge.id) || counts.enabled.has(edge.id) ||
        !counts.reached.has(edge.from)
      ) {
        continue;
      }
      report(
        warnings,
        "needs-cycle-override",
        edge.path,
        `${
          describe(edge)
        } from stage '${edge.from}' can be taken only after a person grants a cycle override: ${
          counts.refused.get(edge.id) ?? "the cycle limits close it"
        }`,
        { stage: edge.from },
      );
    }
  }
  if (structure.truncated) {
    report(
      warnings,
      "exploration-truncated",
      [],
      `the structural pass stopped at ${maxStates} states; its findings are warnings, not errors`,
    );
  }

  const sort = (list: { finding: GraphFinding; path: Path }[]) =>
    list.sort((a, b) =>
      comparePaths(a.path, b.path) ||
      (a.finding.stage ?? "").localeCompare(b.finding.stage ?? "") ||
      a.finding.code.localeCompare(b.finding.code)
    ).map((x) => x.finding);
  return {
    errors: sort(errors),
    warnings: sort(warnings),
    statesExplored: {
      structural: structure.nodes.length,
      counts: counts.states,
    },
    truncated: structure.truncated || counts.truncated,
  };
}
